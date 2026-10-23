import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;
const INTRO_SRC = `${BASE}intro.mp4`; // put the video in /public/intro.mp4

/**
 * Full-screen intro.
 * Browsers block sound until the visitor interacts, so the page opens on a
 * "Press Start" screen; the click starts the video (with sound) and unlocks
 * the background theme that App.jsx starts once the intro is over.
 */
function IntroScreen({ onDone }) {
  const [phase, setPhase] = useState("gate"); // gate -> play -> out
  const [progress, setProgress] = useState(0);
  const mainRef = useRef(null);
  const bgRef = useRef(null);
  const finished = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setPhase("out");
    mainRef.current?.pause();
    bgRef.current?.pause();
    setTimeout(onDone, 800);
  };

  const start = () => {
    const v = mainRef.current;
    const bg = bgRef.current;
    setPhase("play");
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {
      // sound refused for some reason -> play silently rather than stall
      v.muted = true;
      v.play().catch(finish);
    });
    bg.play().catch(() => {});
  };

  return (
    <div className={`intro ${phase}`}>
      {/* blurred copy fills the screen behind the portrait video */}
      <video ref={bgRef} className="intro-bg" src={INTRO_SRC} muted playsInline loop preload="auto" />
      <video
        ref={mainRef}
        className="intro-video"
        src={INTRO_SRC}
        playsInline
        preload="auto"
        onEnded={finish}
        onError={onDone} /* no video file -> skip straight to the site */
        onTimeUpdate={(e) =>
          setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))
        }
      />

      {phase === "gate" && (
        <button className="gate" onClick={start}>
          <span className="gate-ball" />
          <span className="gate-title">
            Poké<b>dex</b>
          </span>
          <span className="gate-start">▶ Press to start</span>
        </button>
      )}

      {phase === "play" && (
        <>
          <button className="intro-skip" onClick={finish}>
            Skip ▸▸
          </button>
          <div className="intro-bar">
            <div style={{ width: `${progress * 100}%` }} />
          </div>
        </>
      )}
    </div>
  );
}

export default IntroScreen;
