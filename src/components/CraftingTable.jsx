import { useState } from "react";
import "./CraftingTable.css";

function Icon({ id, name }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const letters = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return <div className="mc-fallback">{letters}</div>;
  }
  return (
    <img
      src={`/items/${id}.png`}
      alt={name}
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}

function Slot({ item, items, onHover, onLeave }) {
  if (!item) return <div className="mc-slot" />;
  const data = items[item.id] || { name: item.id.replace(/_/g, " ") };
  return (
    <div
      className="mc-slot"
      onMouseEnter={(e) => onHover(e, data)}
      onMouseMove={(e) => onHover(e, data)}
      onMouseLeave={onLeave}
    >
      {/* texture lets an item borrow another item's png (e.g. drilldiamond -> drill) */}
      <Icon id={data.texture || item.id} name={data.name} />
      {item.count > 1 && <span className="mc-count">{item.count}</span>}
    </div>
  );
}

/**
 * Crafting recipe:   <CraftingTable grid={[...9]} result={{ id }} items={{...}} />
 * Single item slot:  <CraftingTable title="Carpenter at spawn" result={{ id }} items={{...}} />
 *
 * Leave out `grid` and you get one slot with no grid or arrow, for items that
 * are bought, dropped or event-exclusive. `title` is the label at the top
 * (defaults to "Crafting", or "Obtain" for a single slot).
 */
export default function CraftingTable({ grid, result, items = {}, title }) {
  const [tip, setTip] = useState(null);

  const onHover = (e, data) =>
    setTip({ x: e.clientX + 14, y: e.clientY - 34, data });
  const onLeave = () => setTip(null);

  const single = !grid;
  const cells = single ? [] : Array.from({ length: 9 }, (_, i) => grid[i] || null);

  // lore can be a string (with \n) or an array of lines; CSS has white-space: pre-line
  const lore = tip?.data.lore
    ? Array.isArray(tip.data.lore)
      ? tip.data.lore.join("\n")
      : tip.data.lore
    : null;

  return (
    <div className="mc-crafting not-content">
      <div className="mc-title">{title || (single ? "Obtain" : "Crafting")}</div>
      <div className="mc-body">
        {!single && (
          <>
            <div className="mc-grid">
              {cells.map((c, i) => (
                <Slot key={i} item={c} items={items} onHover={onHover} onLeave={onLeave} />
              ))}
            </div>
            <div className="mc-arrow">➜</div>
          </>
        )}
        <Slot item={result} items={items} onHover={onHover} onLeave={onLeave} />
      </div>

      {tip && (
        <div className="mc-tooltip" style={{ left: tip.x, top: tip.y }}>
          <div className="mc-tip-name">{tip.data.name}</div>
          {lore && <div className="mc-tip-lore">{lore}</div>}
        </div>
      )}
    </div>
  );
}