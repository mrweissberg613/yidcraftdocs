import CraftingTable from "./CraftingTable.jsx";
import { ITEMS } from "../data/items.js";

/**
 * Builds a CraftingTable from a recipe written the way the plugin writes it.
 *
 * Shaped:     <Recipe pattern={["iPi", "iRi", " i "]} keys={{ i: "iron_ingot", ... }} result="drill" />
 * Shapeless:  <Recipe ingredients={["cobblestone"]} result="pebble" count={4} />
 *
 * Spaces in a pattern are empty slots. Rows shorter than 3 are left-aligned.
 */
export default function Recipe({
  pattern,
  keys = {},
  ingredients,
  result,
  count = 1,
}) {
  const grid = Array(9).fill(null);

  if (pattern) {
    pattern.forEach((row, r) => {
      [...row].forEach((ch, c) => {
        if (ch !== " " && keys[ch]) grid[r * 3 + c] = { id: keys[ch] };
      });
    });
  } else if (ingredients) {
    ingredients.forEach((id, i) => {
      grid[i] = { id };
    });
  }

  return (
    <CraftingTable grid={grid} result={{ id: result, count }} items={ITEMS} />
  );
}