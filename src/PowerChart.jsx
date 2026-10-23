import { themeFor } from "./typeData.js";

// Dashboard chart: top Pokémon by total base stats for the current filter.
function PowerChart({ list, onPick }) {
  const ranked = list
    .map((p) => ({
      ...p,
      total: p.hp + p.attack + p.defense + p.spAtk + p.spDef + p.speed,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);
  const max = ranked[0]?.total || 1;

  return (
    <section className="power">
      <h2>
        Power ranking <small>total base stats · top {ranked.length}</small>
      </h2>
      <ul>
        {ranked.map((p) => (
          <li
            key={p.id}
            onClick={(e) =>
              onPick(p, e.currentTarget.querySelector("img").getBoundingClientRect())
            }
          >
            <img src={p.image} alt="" />
            <span className="p-name">{p.name}</span>
            <div className="p-track">
              <div
                className="p-bar"
                style={{
                  width: `${(p.total / max) * 100}%`,
                  background: `linear-gradient(90deg, ${themeFor(p.types[0]).from}, ${themeFor(p.types[0]).to})`,
                }}
              />
            </div>
            <b>{p.total}</b>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PowerChart;
