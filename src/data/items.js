// Names and lore for every item that shows up in a wiki recipe or item slot.
// Keys are the file names in /public/items/<id>.png.
// Lore uses \n for a new line (CraftingTable.css has white-space: pre-line).

export const ITEMS = {
  // --- Foods ---
  matzah: { name: "Matzah", lore: "Nice stale Matzah" },
  challah: { name: "Challah", lore: "Freshly made Challah like Bubbie made it" },
  gefilte_fish: { name: "Gefilte Fish", lore: "Hand-prepared traditional gefilte fish" },
  ozen_haman: { name: "Ozen Haman", lore: "A three cornered pastry for Purim,\nfilled with chocolate." },
  rimon: { name: "Rimon", lore: "A pomegranate, one of the seven species.\nAcacia trees in the savanna bear them." },
  grapes: { name: "Grapes", lore: "One of the seven species.\nFound growing on vines." },
  grape_juice: { name: "Grape Juice", lore: "For kiddush and havdalah.\nLeave it in a barrel a while and it becomes wine." },
  wine: { name: "Wine", lore: "For kiddush and havdalah.\nAged in a barrel." },
  strawberry: { name: "Strawberry", lore: "A sweet and juicy fruit, perfect for a refreshing snack." },
  apple_honey: { name: "Apple & Honey", lore: "A nice sweet apple for a nice sweet new year" },
  honey_cookie: { name: "Honey Cookie", lore: "A nice sweet Cookie for a nice sweet new year" },

  // --- Headwear ---
  kippah: { name: "Kippah", lore: "Wear it on your head. Dye it any colour,\nor wear it over a helmet: put both\nin a crafting table. +1 Armor" },
  tichel: { name: "Tichel", lore: "A headscarf. Dye it any colour,\nor wear it over a helmet: put both\nin a crafting table. +1 Armor" },
  black_hat: { name: "Black Hat", lore: "A black felt hat. Wear it over a\nhelmet too: put both in a crafting\ntable. +2 Armor" },
  sheitel: { name: "Sheitel", lore: "A wig, for a married woman. Dye it\nany colour, or wear it over a helmet:\nput both in a crafting table. +2 Armor" },
  diamond_black_hat: { name: "Diamond Black Hat", lore: "Keeps everything the helmet had\nand adds the hat's armor on top." },
  diamond_helmet: { name: "Any Helmet", lore: "Any helmet works" },

  // --- Tefillin, tzitzis and mitzvos ---
  kosher_hide: { name: "Kosher Hide", lore: "The hide of a kosher animal.\nKlaf and batim are made from it." },
  klaf: { name: "Klaf", lore: "Parchment from a kosher hide,\nready for a sofer." },
  parshiyos_shel_yad: { name: "Parshiyos for the Shel Yad", lore: "The four parshiyos, written by a sofer\non one klaf." },
  parshiyos_shel_rosh: { name: "Parshiyos for the Shel Rosh", lore: "The four parshiyos, written by a sofer,\neach on its own klaf." },
  tefillin_shel_yad: { name: "Tefillin Shel Yad", lore: "Right click by day, with the Shel Rosh\nwith you, to put on tefillin.\nNot on Shabbos or Yom Tov." },
  tefillin_shel_rosh: { name: "Tefillin Shel Rosh", lore: "Goes on after the Shel Yad." },
  tallis_katan: { name: "Tallis Katan", lore: "Tzitzis on its four corners.\nWear it in the leggings slot, or tie it\nonto a chestplate or leggings at a\ncrafting table. By day, the bracha.\n+1 Armor while worn." },
  tzitzis_chestplate: { name: "Chestplate with Tzitzis" },
  tzitzis_leggings: { name: "Leggings with Tzitzis" },
  chai_necklace: { name: "Chai Necklace", lore: "A small gold Chai on a thin chain.\nWear it in the leggings slot, or tie it\nonto a chestplate at a crafting table.\n+1 Armor while worn." },
  chai_chestplate: { name: "Chestplate with Chai Necklace" },
  shabbos_candles: { name: "Shabbos Candles", lore: "A pair of candles for Shabbos.\nGive them to someone who will light them." },
  menorah: { name: "Chanukah Menorah", lore: "On the nights of Chanukah, after dark,\nright click the top of a block to light it.\nOne more light each night, added from the right." },

  // --- Tools ---
  shechita_knife: { name: "Shechita Knife", lore: "Used for kosher slaughter" },
  drill: { name: "Drill", lore: "⛏ Ability\nMines 3 blocks at once." },
  drilldiamond: { name: "Diamond Drill", lore: "⛏ Ability\nMines a 3x3 area." },

  // --- Blocks and furniture ---
  pebble: { name: "Pebble" },
  chessboard_block: { name: "Chessboard Block" },
  wooden_chair: { name: "Wooden Chair" },
  bench: { name: "Bench" },

  // --- Ingredients ---
  iron_ingot: { name: "Iron Ingot" },
  iron_pickaxe: { name: "Iron Pickaxe" },
  iron_sword: { name: "Iron Sword" },
  iron_chestplate: { name: "Any Chestplate", lore: "Any chestplate works" },
  iron_leggings: { name: "Any Leggings", lore: "Any leggings work" },
  redstone: { name: "Redstone Dust" },
  redstone_block: { name: "Block of Redstone" },
  diamond: { name: "Diamond" },
  diamond_block: { name: "Block of Diamond" },
  cobblestone: { name: "Cobblestone" },
  white_terracotta: { name: "White Terracotta" },
  black_terracotta: { name: "Black Terracotta" },
  wheat: { name: "Wheat" },
  water_bucket: { name: "Water Bucket" },
  egg: { name: "Egg" },
  cooked_cod: { name: "Cooked Cod" },
  bone: { name: "Bone" },
  cocoa_beans: { name: "Cocoa Beans" },
  glass_bottle: { name: "Glass Bottle" },
  wool: { name: "Any Wool", lore: "Any colour works" },
  white_wool: { name: "White Wool" },
  black_wool: { name: "Black Wool" },
  string: { name: "String" },
  leather: { name: "Leather" },
  ink_sac: { name: "Ink Sac" },
  feather: { name: "Feather" },
  black_dye: { name: "Black Dye" },
  gold_nugget: { name: "Gold Nugget" },
  white_candle: { name: "White Candle" },
};