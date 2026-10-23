import { useEffect, useRef, useState } from "react";

const THEME_SRC = `${import.meta.env.BASE_URL}theme.mp3`; // put your file in /public/theme.mp3
const VOLUME = 0.35;

/** Looping background theme. Starts when `active` turns true; mute button bottom-left. */
function MusicPlayer({ active }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!active || !ref.current) return;
    ref.current.volume = VOLUME;
    ref.current.play().catch(() => {});
  }, [active]);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  return (
    <>
      <audio ref={ref} src={THEME_SRC} loop preload="auto" onError={() => setAvailable(false)} />
      {active && available && (
        <button
          className="music-btn"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute theme music" : "Mute theme music"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}
    </>
  );
}

export default MusicPlayer;
