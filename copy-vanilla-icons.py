r"""Copies every vanilla icon the wiki recipes use out of your Minecraft client jar.
These are the real 16x16 textures, so they are crisp (replaces the blurry crops).

Run from the wiki project root:
  python copy-vanilla-icons.py "%APPDATA%\.minecraft\versions\1.21.11\1.21.11.jar"
"""
import sys, os, zipfile

ITEM = [
    # recipes already on the page
    "iron_ingot", "iron_pickaxe", "iron_sword", "redstone", "diamond", "wheat",
    "water_bucket", "egg", "cooked_cod", "bone", "cocoa_beans", "glass_bottle",
    # headwear, tefillin, tzitzis, chai necklace
    "iron_chestplate", "iron_leggings", "diamond_helmet", "string", "leather",
    "ink_sac", "feather", "black_dye", "gold_nugget",
]
BLOCK = [
    "redstone_block", "diamond_block", "cobblestone", "white_terracotta",
    "black_terracotta", "white_wool", "black_wool", "white_candle",
]
# saved under a second name too: the wiki's "Any Wool" slot uses wool.png
ALSO = {"white_wool": "wool"}

if len(sys.argv) < 2:
    sys.exit(__doc__)

jar = os.path.expandvars(sys.argv[1])
out = os.path.join("public", "items")
os.makedirs(out, exist_ok=True)
base = "assets/minecraft/textures/"

with zipfile.ZipFile(jar) as z:
    names = set(z.namelist())
    for kind, ids in (("item", ITEM), ("block", BLOCK)):
        for n in ids:
            path = f"{base}{kind}/{n}.png"
            if path not in names:
                print("MISSING in jar:", path)
                continue
            data = z.read(path)
            for dest in (n, ALSO.get(n)):
                if dest:
                    with open(os.path.join(out, dest + ".png"), "wb") as f:
                        f.write(data)
            print("copied", n)