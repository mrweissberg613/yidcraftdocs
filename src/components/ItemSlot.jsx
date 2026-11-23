import { useState } from "react";
import "./CraftingTable.css";
import { ITEMS } from "../data/items.js";

/**
 * One item in a little GUI slot, for items that have no crafting recipe
 * (furniture bought from an NPC, event-exclusive items, drops).
 *
 *   <ItemSlot id="wooden_chair" title="Carpenter at spawn" />
 *
 * Same look and hover tooltip as CraftingTable.
 */
export default function ItemSlot({ id, title = "Obtain", count = 1 }) {
  const [tip, setTip] = useState(null);
  const [failed, setFailed] = useState(false);
  const data = ITEMS[id] || { name: id.replace(/_/g, " ") };

  const onHover = (e) => setTip({ x: e.clientX + 14, y: e.clientY - 34 });
  const letters = data.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mc-crafting not-content">
      <div className="mc-title">{title}</div>
      <div className="mc-body">
        <div
          className="mc-slot"
          onMouseEnter={onHover}
          onMouseMove={onHover}
          onMouseLeave={() => setTip(null)}
        >
          {failed ? (
            <div className="mc-fallback">{letters}</div>
          ) : (
            <img
              src={`/items/${id === "wine" ? "grape_juice" : id}.png`}
              alt={data.name}
              draggable="false"
              onError={() => setFailed(true)}
            />
          )}
          {count > 1 && <span className="mc-count">{count}</span>}
        </div>
      </div>

      {tip && (
        <div className="mc-tooltip" style={{ left: tip.x, top: tip.y }}>
          <div className="mc-tip-name">{data.name}</div>
          {data.lore && <div className="mc-tip-lore">{data.lore}</div>}
        </div>
      )}
    </div>
  );
}