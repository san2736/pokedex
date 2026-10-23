import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PokemonCard from "./PokemonCard.jsx";
import { themeFor, TYPE_WEAKNESS, TYPE_RESISTANCE } from "./typeData.js";

const cap = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const MAX_TILT = 12;

/**
 * Click-to-open view:
 *  1. a card back flies from the clicked card to the centre,
 *  2. flips over to reveal the card,
 *  3. the spec panel slides out beside it,
 *  4. the card keeps tilting with the mouse (same hover feel as the grid).
 */
function DetailModal({ p, origin, onClose }) {
  const slotRef = useRef(null);
  const flipRef = useRef(null);
  const closing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const theme = themeFor(p.types[0]);
  const weak = TYPE_WEAKNESS[p.types[0]] || [];
  const resist = TYPE_RESISTANCE[p.types[0]] || [];
  const total = p.hp + p.attack + p.defense + p.spAtk + p.spDef + p.speed;

  // Start / end poses of the flight, measured from the clicked card.
  const flightFrames = () => {
    if (!origin || !flipRef.current) return null;
    const r = flipRef.current.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (r.left + r.width / 2);
    const dy = origin.top + origin.height / 2 - (r.top + r.height / 2);
    const s = origin.width / r.width;
    return [
      { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotateY(180deg)` },
      { transform: "translate(0px, 0px) scale(1) rotateY(0deg)" },
    ];
  };

  useLayoutEffect(() => {
    const el = flipRef.current;
    const frames = flightFrames();
    if (!frames) {
      setRevealed(true);
      return;
    }
    const anim = el.animate(frames, {
      duration: 950,
      easing: "cubic-bezier(.22,.85,.3,1)",
      fill: "both",
    });
    anim.onfinish = () => {
      anim.cancel();
      setRevealed(true);
    };
    return () => anim.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    setRevealed(false);
    setLeaving(true);

    const el = flipRef.current;
    const slot = slotRef.current;
    ["--rx", "--ry"].forEach((k) => slot.style.removeProperty(k));
    el.style.transition = "none";
    const frames = flightFrames();
    if (!frames) return onClose();
    const anim = el.animate([...frames].reverse(), {
      duration: 650,
      easing: "cubic-bezier(.5,0,.75,.2)",
      fill: "both",
    });
    anim.onfinish = onClose;
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (e) => {
    if (!revealed) return;
    const slot = slotRef.current;
    const r = slot.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    slot.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
    slot.style.setProperty("--rx", `${-(y - 0.5) * 2 * MAX_TILT}deg`);
    slot.style.setProperty("--mx", `${x * 100}%`);
    slot.style.setProperty("--my", `${y * 100}%`);
  };
  const handleLeave = () => {
    const slot = slotRef.current;
    ["--rx", "--ry"].forEach((k) => slot.style.removeProperty(k));
  };

  const stats = [
    ["HP", p.hp],
    ["Attack", p.attack],
    ["Defense", p.defense],
    ["Sp. Atk", p.spAtk],
    ["Sp. Def", p.spDef],
    ["Speed", p.speed],
  ];

  return createPortal(
    <div
      className={`overlay ${leaving ? "out" : ""} ${revealed ? "revealed" : ""}`}
      onClick={close}
      style={{ "--from": theme.from, "--to": theme.to, "--ink": theme.ink }}
    >
      <div className="stage">
        {/* ---- the card: back -> flip -> front ---- */}
        <div
          className="card-slot"
          ref={slotRef}
          onClick={(e) => e.stopPropagation()}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <div className="flipper" ref={flipRef}>
            <div className="face back">
              <div className="back-art">
                <span className="back-word top">POKÉDEX</span>
                <div className="back-ball" />
                <span className="back-word bottom">POKÉDEX</span>
              </div>
            </div>
            <div className="face front">
              <div className="card-scale">
                <PokemonCard p={p} flat />
              </div>
            </div>
          </div>
        </div>

        {/* ---- the spec panel ---- */}
        <aside className="detail" onClick={(e) => e.stopPropagation()}>
          <button className="detail-close" onClick={close} aria-label="Close">
            ×
          </button>

          <h2>
            {p.name} <small>#{String(p.id).padStart(3, "0")}</small>
          </h2>
          <div className="modal-types">
            {p.types.map((t) => (
              <span key={t} style={{ background: themeFor(t).to }}>
                {t}
              </span>
            ))}
          </div>

          <h4>
            Base stats <em>total {total}</em>
          </h4>
          <div className="stat-list">
            {stats.map(([label, val], i) => (
              <div className="stat" key={label}>
                <span>{label}</span>
                <div className="stat-track">
                  <div
                    className="stat-bar"
                    style={{
                      width: revealed ? `${Math.min(100, (val / 160) * 100)}%` : "0%",
                      transitionDelay: `${i * 70}ms`,
                    }}
                  />
                </div>
                <b>{val}</b>
              </div>
            ))}
          </div>

          <div className="facts">
            <div>
              <span>Height</span>
              <b>{(p.height / 10).toFixed(1)} m</b>
            </div>
            <div>
              <span>Weight</span>
              <b>{(p.weight / 10).toFixed(1)} kg</b>
            </div>
            <div>
              <span>Base EXP</span>
              <b>{p.baseExp}</b>
            </div>
          </div>

          <h4>Abilities</h4>
          <p className="tags">
            {p.abilities.map((a) => (
              <span key={a}>{cap(a)}</span>
            ))}
          </p>

          <h4>Moves</h4>
          <p className="tags">
            {p.moves.map((m) => (
              <span key={m}>{cap(m)}</span>
            ))}
          </p>

          <div className="matchups">
            <div>
              <h4>Weak to</h4>
              <p className="tags">
                {weak.map((t) => (
                  <span key={t} className="typed" style={{ background: themeFor(t).to }}>
                    {t}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <h4>Resists</h4>
              <p className="tags">
                {resist.length ? (
                  resist.slice(0, 4).map((t) => (
                    <span key={t} className="typed" style={{ background: themeFor(t).to }}>
                      {t}
                    </span>
                  ))
                ) : (
                  <span>—</span>
                )}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>,
    document.body
  );
}

export default DetailModal;
