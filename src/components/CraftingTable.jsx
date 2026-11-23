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
      <Icon id={item.id} name={data.name} />
      {item.count > 1 && <span className="mc-count">{item.count}</span>}
    </div>
  );
}

export default function CraftingTable({ grid, result, items = {} }) {
  const [tip, setTip] = useState(null);

  const onHover = (e, data) =>
    setTip({ x: e.clientX + 14, y: e.clientY - 34, data });
  const onLeave = () => setTip(null);

  const cells = Array.from({ length: 9 }, (_, i) => grid[i] || null);

  return (
    <div className="mc-crafting not-content">
      <div className="mc-title">Crafting</div>
      <div className="mc-body">
        <div className="mc-grid">
          {cells.map((c, i) => (
            <Slot key={i} item={c} items={items} onHover={onHover} onLeave={onLeave} />
          ))}
        </div>
        <div className="mc-arrow">➜</div>
        <Slot item={result} items={items} onHover={onHover} onLeave={onLeave} />
      </div>

      {tip && (
        <div className="mc-tooltip" style={{ left: tip.x, top: tip.y }}>
          <div className="mc-tip-name">{tip.data.name}</div>
          {tip.data.lore && <div className="mc-tip-lore">{tip.data.lore}</div>}
        </div>
      )}
    </div>
  );
}