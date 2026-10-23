<<<<<<< HEAD
function PokemonCard({ pokemon, isSelected, onSelect }) {
  return (
    <div
      className={isSelected ? "card selected" : "card"}
      onClick={() => onSelect(pokemon)}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>

      <div className="types">
        {pokemon.types.map((type) => (
          <span key={type} className="badge">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
=======
import { useRef } from "react";
import { themeFor, TYPE_WEAKNESS, TYPE_RESISTANCE } from "./typeData.js";

const cap = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Energy dots: one filled circle per cost point.
function Energy({ n }) {
  return (
    <span className="energy">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

const MAX_TILT = 14; // degrees

/**
 * p        – cleaned Pokémon object from App.jsx
 * onClick  – (pokemon, rectOfCard) => void   (grid usage)
 * flat     – true when shown inside the detail view (no hover lift / entry pop;
 *            the tilt is driven by the detail view instead)
 */
function PokemonCard({ p, onClick, index = 0, flat = false }) {
  const ref = useRef(null);
  const main = p.types[0];
  const theme = themeFor(main);
  const weak = TYPE_WEAKNESS[main] || [];
  const resist = TYPE_RESISTANCE[main] || [];

  // Attacks are the first two API moves; damage and cost come from base stats.
  const atk1 = {
    name: cap(p.moves[0] || "Tackle"),
    cost: 1,
    dmg: Math.max(10, Math.round(p.attack / 10) * 5),
  };
  const atk2 = {
    name: cap(p.moves[1] || p.abilities[0] || "Slam"),
    cost: p.spAtk > 90 ? 3 : 2,
    dmg: Math.max(20, Math.round(p.spAtk / 5) * 5),
  };
  const retreat = Math.min(4, Math.max(1, Math.ceil((100 - p.speed) / 30)));

  // Mouse-follow 3D tilt + glare (grid cards only).
  const handleMove = (e) => {
    if (flat) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--rx", `${-(y - 0.5) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const handleLeave = () => {
    if (flat) return;
    const el = ref.current;
    ["--rx", "--ry", "--mx", "--my"].forEach((k) => el.style.removeProperty(k));
  };
  const open = () => onClick && onClick(p, ref.current.getBoundingClientRect());

  return (
    <article
      ref={ref}
      className={`card ${flat ? "flat" : ""}`}
      onClick={flat ? undefined : open}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      tabIndex={flat ? -1 : 0}
      onKeyDown={(e) => !flat && e.key === "Enter" && open()}
      style={{
        "--from": theme.from,
        "--to": theme.to,
        "--ink": theme.ink,
        animationDelay: flat ? undefined : `${Math.min(index, 14) * 55}ms`,
      }}
    >
      <div className="card-shine" />
      <div className="card-inner">
        <header className="card-head">
          <h3>{p.name}</h3>
          <span className="hp">
            {p.hp}
            <small>HP</small>
          </span>
        </header>

        {/* Artwork is clipped inside this frame so it can never spill out */}
        <div className="art">
          <div className="art-ring" />
          <img src={p.image} alt={p.name} loading="lazy" draggable="false" />
          <span className="dex-no">#{String(p.id).padStart(3, "0")}</span>
        </div>

        <p className="meta">
          <em>{p.types.map(cap).join(" / ")} Pokémon</em>, Length{" "}
          <b>{(p.height / 10).toFixed(1)} m</b>, Weight{" "}
          <b>{(p.weight / 10).toFixed(1)} kg</b>
        </p>

        <div className="attack">
          <Energy n={atk1.cost} />
          <span className="atk-name">{atk1.name}</span>
          <span className="atk-dmg">{atk1.dmg}</span>
        </div>
        <div className="attack">
          <Energy n={atk2.cost} />
          <span className="atk-name">{atk2.name}</span>
          <span className="atk-dmg">{atk2.dmg}</span>
        </div>

        <p className="flavor">
          {cap(p.abilities[0] || "—")}
          {p.abilities[1] ? ` · ${cap(p.abilities[1])}` : ""}
        </p>

        <footer className="card-foot">
          <div>
            <span>weakness</span>
            <div className="chips">
              {weak.slice(0, 2).map((t) => (
                <i key={t} className="chip" style={{ background: themeFor(t).to }} title={t} />
              ))}
            </div>
          </div>
          <div>
            <span>resistance</span>
            <div className="chips">
              {resist.slice(0, 2).map((t) => (
                <i key={t} className="chip" style={{ background: themeFor(t).to }} title={t} />
              ))}
              {resist.length === 0 && <em>—</em>}
            </div>
          </div>
          <div>
            <span>retreat cost</span>
            <Energy n={retreat} />
          </div>
        </footer>
      </div>
    </article>
  );
}

export default PokemonCard;
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
