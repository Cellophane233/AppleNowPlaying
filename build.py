from pathlib import Path
import json
import zipfile

source = Path(__file__).resolve().parent
manifest = json.loads((source / "manifest.json").read_text(encoding="utf-8"))
vendor = source / "vendor" / "extspotify"
css = (vendor / "extspotify.css").read_text(encoding="utf-8") + "\n" + (source / "playing.css").read_text(encoding="utf-8")
script = (source / "playing.js").read_text(encoding="utf-8")
marker = "/* PLAYING_CSS */ ''"
assert script.count(marker) == 1
helpers = "\n".join((source / name).read_text(encoding="utf-8") for name in ("qq-lyrics-codec.js", "qq-lyrics-provider.js", "cover-save.js", "vendor/extspotify/extspotify.js", "ext-lyric-data.js", "ext-lyric-view.js"))
bundle = helpers + "\n" + script.replace(marker, json.dumps(css, ensure_ascii=False))
destination = source.parent / "plugins" / f"{manifest['name']}-{manifest['version']}.plugin"
temporary = destination.with_suffix(".tmp")
with zipfile.ZipFile(temporary, "w", zipfile.ZIP_DEFLATED) as archive:
    archive.write(source / "manifest.json", "manifest.json")
    archive.write(source / "LICENSE", "LICENSE")
    archive.writestr("main.js", bundle)
    archive.write(source / manifest["preview"], manifest["preview"])
    for notice in [vendor / "README.md", vendor / "source.zip", *sorted((vendor / "LICENSES").glob("*"))]:
        archive.write(notice, notice.relative_to(source))
temporary.replace(destination)
print(destination)
