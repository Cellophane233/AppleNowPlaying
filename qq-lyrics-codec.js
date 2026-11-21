/*
 * QQ QRC decoder for AppleNowPlaying. No host playback or Node dependency.
 * Modified/ported to JavaScript on 2026-11-17 from Simple Player's
 * backend/tauri/src/modules/qrc_cipher.rs. QQ substitution tables and word order
 * originate in WXRIW/Lyricify-Lyrics-Helper, Decrypter/Qrc/DESHelper.cs.
 * Copyright 2023 XY Wang, WXRIW. SPDX-License-Identifier: Apache-2.0
 * The full Apache-2.0 license is included at the end of this file.
 * The bounded RFC 1950/1951 inflater below is an original implementation.
 */
(function (root) {
    "use strict";

    var LIMIT = 4 * 1024 * 1024;
    var S = [
        [14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7,0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8,4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0,15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13],
        [15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10,3,13,4,7,15,2,8,15,12,0,1,10,6,9,11,5,0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15,13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9],
        [10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8,13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1,13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7,1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12],
        [7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15,13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9,10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4,3,15,0,6,10,10,13,8,9,4,5,11,12,7,2,14],
        [2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9,14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6,4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14,11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3],
        [12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11,10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8,9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6,4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13],
        [4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1,13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6,1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2,6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12],
        [13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7,1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2,7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8,2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]
    ];
    var PC1 = [57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4];
    var PC2 = [14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32];
    var IP = [58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7];
    var P = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25];
    var FP = new Uint8Array(64);
    IP.forEach(function (bit, i) { FP[bit - 1] = i + 1; });

    function bit64(high, low, bit) {
        return bit <= 32 ? (high >>> (32 - bit)) & 1 : (low >>> (64 - bit)) & 1;
    }

    function permute64(high, low, table) {
        var a = 0, b = 0;
        for (var i = 0; i < 32; i++) a = (a << 1) | bit64(high, low, table[i]);
        for (var j = 32; j < 64; j++) b = (b << 1) | bit64(high, low, table[j]);
        return [a, b];
    }

    function readWord(bytes, at) {
        return bytes[at] | (bytes[at + 1] << 8) | (bytes[at + 2] << 16) | (bytes[at + 3] << 24);
    }

    function writeWord(bytes, at, n) {
        for (var i = 0; i < 4; i++) bytes[at + i] = n >>> (i * 8);
    }

    function schedule(key) {
        var high = readWord(key, 0), low = readWord(key, 4), c = 0, d = 0;
        for (var i = 0; i < 28; i++) c = (c << 1) | bit64(high, low, PC1[i]);
        for (var j = 28; j < 56; j++) d = (d << 1) | bit64(high, low, PC1[j]);
        var keys = [], shifts = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];
        shifts.forEach(function (shift) {
            c = ((c << shift) | (c >>> (28 - shift))) & 0xfffffff;
            d = ((d << shift) | (d >>> (28 - shift))) & 0xfffffff;
            var keyBits = new Uint8Array(8);
            for (var k = 0; k < 48; k++) {
                // QQ deliberately uses 59 - bit for D; standard DES uses another index.
                var selected = k < 24 ? ((c << 4) >>> (32 - PC2[k])) & 1 : ((d << 4) >>> (59 - PC2[k])) & 1;
                keyBits[Math.floor(k / 6)] = (keyBits[Math.floor(k / 6)] << 1) | selected;
            }
            keys.push(keyBits);
        });
        return keys;
    }

    var SP = S.map(function (box, index) {
        var table = new Int32Array(64);
        for (var n = 0; n < 64; n++) {
            var row = ((n & 32) >>> 4) | (n & 1);
            var value = box[row * 16 + ((n >>> 1) & 15)] << (28 - index * 4), result = 0;
            for (var p = 0; p < 32; p++) result = (result << 1) | ((value >>> (32 - P[p])) & 1);
            table[n] = result;
        }
        return table;
    });
    var SECRET = "!@#)(*$%123ZXC!@!@#)(NHL";
    var secretBytes = Uint8Array.from(SECRET, function (ch) { return ch.charCodeAt(0); });
    var KEY1 = schedule(secretBytes.subarray(0, 8));
    var KEY2 = schedule(secretBytes.subarray(8, 16));
    var KEY3 = schedule(secretBytes.subarray(16, 24));

    function feistel(r, key) {
        return SP[0][((((r & 1) << 5) | (r >>> 27)) ^ key[0]) & 63]
            ^ SP[1][((r >>> 23) ^ key[1]) & 63]
            ^ SP[2][((r >>> 19) ^ key[2]) & 63]
            ^ SP[3][((r >>> 15) ^ key[3]) & 63]
            ^ SP[4][((r >>> 11) ^ key[4]) & 63]
            ^ SP[5][((r >>> 7) ^ key[5]) & 63]
            ^ SP[6][((r >>> 3) ^ key[6]) & 63]
            ^ SP[7][((((r & 31) << 1) | (r >>> 31)) ^ key[7]) & 63];
    }

    function decryptHex(raw) {
        if (!raw.length || raw.length % 16 || raw.length > LIMIT * 2 || !/^[\da-f]+$/i.test(raw)) {
            throw new Error("无效 QRC 数据");
        }
        var bytes = new Uint8Array(raw.length / 2);
        for (var i = 0; i < bytes.length; i++) bytes[i] = parseInt(raw.slice(i * 2, i * 2 + 2), 16);
        var stages = [KEY3, KEY2, KEY1];
        for (var at = 0; at < bytes.length; at += 8) {
            var pair = permute64(readWord(bytes, at), readWord(bytes, at + 4), IP);
            var left = pair[0], right = pair[1];
            for (var stage = 0; stage < 3; stage++) {
                var keys = stages[stage];
                for (var round = 0; round < 16; round++) {
                    var next = left ^ feistel(right, keys[stage === 1 ? round : 15 - round]);
                    left = right;
                    right = next;
                }
                // Adjacent FP/IP permutations cancel between the three DES stages.
                var swap = left;
                left = right;
                right = swap;
            }
            pair = permute64(left, right, FP);
            writeWord(bytes, at, pair[0]);
            writeWord(bytes, at + 4, pair[1]);
        }
        return bytes;
    }

    function huffman(lengths) {
        var counts = new Uint16Array(16), next = new Uint16Array(16), max = 0, left = 1, code = 0;
        lengths.forEach(function (length) {
            if (length > 15) throw new Error("无效 QRC Huffman 码长");
            if (length) { counts[length]++; max = Math.max(max, length); }
        });
        if (!max) return null;
        for (var bits = 1; bits <= 15; bits++) {
            left = (left << 1) - counts[bits];
            if (left < 0) throw new Error("无效 QRC Huffman 表");
            code = (code + counts[bits - 1]) << 1;
            next[bits] = code;
        }
        var table = new Uint32Array(1 << max);
        lengths.forEach(function (length, symbol) {
            if (!length) return;
            var value = next[length]++, reversed = 0;
            for (var bit = 0; bit < length; bit++) { reversed = (reversed << 1) | (value & 1); value >>>= 1; }
            for (var n = reversed; n < table.length; n += 1 << length) table[n] = (symbol << 5) | length;
        });
        return { table: table, bits: max };
    }

    var fixedLengths = new Uint8Array(288);
    fixedLengths.fill(8, 0, 144); fixedLengths.fill(9, 144, 256);
    fixedLengths.fill(7, 256, 280); fixedLengths.fill(8, 280);
    var fixedLiteral = huffman(fixedLengths), fixedDistance = huffman(new Uint8Array(32).fill(5));
    var LENGTH_BASE = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
    var LENGTH_EXTRA = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
    var DISTANCE_BASE = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
    var DISTANCE_EXTRA = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
    var CODE_ORDER = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];

    function inflateZlib(bytes) {
        if (bytes.length < 6 || (bytes[0] & 15) !== 8 || (bytes[0] >>> 4) > 7
            || (((bytes[0] << 8) | bytes[1]) % 31) || (bytes[1] & 32)) {
            throw new Error("无效 QRC zlib 头");
        }
        var bitPosition = 16, output = new Uint8Array(Math.min(65536, LIMIT)), used = 0;
        function read(count) {
            if (bitPosition + count > bytes.length * 8) throw new Error("QRC 数据不完整");
            var at = bitPosition >>> 3, shift = bitPosition & 7;
            var value = (bytes[at] | (bytes[at + 1] << 8) | (bytes[at + 2] << 16)) >>> shift;
            bitPosition += count;
            return value & ((1 << count) - 1);
        }
        function symbol(tree) {
            if (!tree) throw new Error("无效 QRC Huffman 数据");
            var before = bitPosition, packed = tree.table[read(tree.bits)];
            if (!packed) throw new Error("无效 QRC Huffman 编码");
            bitPosition = before + (packed & 31);
            return packed >>> 5;
        }
        function reserve(count) {
            var needed = used + count;
            if (needed > LIMIT) throw new Error("QRC 解压结果过大");
            if (needed <= output.length) return;
            var larger = new Uint8Array(Math.min(LIMIT, Math.max(needed, output.length * 2)));
            larger.set(output);
            output = larger;
        }
        var finalBlock = 0;
        while (!finalBlock) {
            finalBlock = read(1);
            var type = read(2), literal, distance;
            if (type === 0) {
                bitPosition = (bitPosition + 7) & ~7;
                var length = read(16), complement = read(16);
                if ((length ^ complement) !== 65535) throw new Error("无效 QRC 存储块");
                reserve(length);
                if (bitPosition + length * 8 > bytes.length * 8) throw new Error("QRC 数据不完整");
                output.set(bytes.subarray(bitPosition >>> 3, (bitPosition >>> 3) + length), used);
                used += length;
                bitPosition += length * 8;
                continue;
            }
            if (type === 1) {
                literal = fixedLiteral;
                distance = fixedDistance;
            } else if (type === 2) {
                var literalCount = read(5) + 257, distanceCount = read(5) + 1, codeCount = read(4) + 4;
                if (literalCount > 286) throw new Error("无效 QRC 字面量表");
                var codeLengths = new Uint8Array(19);
                for (var c = 0; c < codeCount; c++) codeLengths[CODE_ORDER[c]] = read(3);
                var codeTree = huffman(codeLengths), lengths = [], total = literalCount + distanceCount;
                while (lengths.length < total) {
                    var entry = symbol(codeTree);
                    if (entry < 16) { lengths.push(entry); continue; }
                    if (entry === 16 && !lengths.length) throw new Error("无效 QRC 重复码长");
                    var repeat = entry === 16 ? read(2) + 3 : entry === 17 ? read(3) + 3 : read(7) + 11;
                    var previous = entry === 16 ? lengths[lengths.length - 1] : 0;
                    if (lengths.length + repeat > total) throw new Error("QRC 码长溢出");
                    while (repeat--) lengths.push(previous);
                }
                if (!lengths[256]) throw new Error("QRC 缺少块终止码");
                literal = huffman(lengths.slice(0, literalCount));
                distance = huffman(lengths.slice(literalCount));
            } else {
                throw new Error("无效 QRC deflate 块");
            }
            while (true) {
                var value = symbol(literal);
                if (value < 256) { reserve(1); output[used++] = value; continue; }
                if (value === 256) break;
                if (value > 285) throw new Error("无效 QRC 匹配长度");
                var li = value - 257, count = LENGTH_BASE[li] + read(LENGTH_EXTRA[li]);
                var di = symbol(distance);
                if (di > 29) throw new Error("无效 QRC 匹配距离");
                var offset = DISTANCE_BASE[di] + read(DISTANCE_EXTRA[di]);
                if (offset > used) throw new Error("无效 QRC 回溯距离");
                reserve(count);
                for (var n = 0; n < count; n++) { output[used] = output[used - offset]; used++; }
            }
        }
        var trailer = (bitPosition + 7) >>> 3;
        if (trailer + 4 > bytes.length) throw new Error("QRC 缺少校验和");
        var expected = ((bytes[trailer] << 24) | (bytes[trailer + 1] << 16) | (bytes[trailer + 2] << 8) | bytes[trailer + 3]) >>> 0;
        var a = 1, b = 0;
        for (var start = 0; start < used; start += 5552) {
            var end = Math.min(used, start + 5552);
            for (var i = start; i < end; i++) { a += output[i]; b += a; }
            a %= 65521; b %= 65521;
        }
        if ((((b << 16) | a) >>> 0) !== expected) throw new Error("QRC 校验失败");
        return output.subarray(0, used);
    }

    function unescapeXml(text) {
        var entities = { quot: '"', apos: "'", lt: "<", gt: ">", amp: "&" };
        return text.replace(/&(#x[\da-f]+|#\d+|quot|apos|lt|gt|amp);/gi, function (whole, name) {
            if (name[0] !== "#") return entities[name.toLowerCase()];
            var code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
            return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : whole;
        });
    }

    async function decode(raw) {
        if (typeof raw !== "string" || raw.length > LIMIT * 2) throw new Error("无效 QRC 数据");
        raw = raw.trim();
        if (raw.charAt(0) === "[") return raw;
        var bytes = inflateZlib(decryptHex(raw));
        var text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        if (/LyricContent\s*=/.test(text)) {
            var match = /LyricContent\s*=\s*"([\s\S]*)"\s*\/?>\s*<\/LyricInfo>/.exec(text) || /LyricContent\s*=\s*"([^"]*)"/.exec(text);
            if (!match) throw new Error("无效 QRC XML");
            text = match[1];
        }
        return unescapeXml(text);
    }

    root.AppleNowPlayingQQCodec = Object.freeze({ decode: decode, inflateZlib: inflateZlib });
})(typeof window !== "undefined" ? window : globalThis);

/*
Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2023 XY Wang, WXRIW

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/
