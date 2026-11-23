import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./Style.css";

const Music = forwardRef(function Music({ src }, ref) {
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const audioRef = useRef(null);
  const nextAudioRef = useRef(null);

  const fadeRef = useRef(null);
  const loopRef = useRef(null);

  const switchingRef = useRef(false);
  const mutedRef = useRef(false);
  const startedRef = useRef(false);

  const TARGET_VOLUME = 0.4;
  const CROSSFADE_TIME = 2500;
  const START_BEFORE_END = 4;

  const clearFade = () => {
    if (fadeRef.current !== null) {
      clearTimeout(fadeRef.current);
      fadeRef.current = null;
    }
  };

  /* ========================================
     START BACKGROUND MUSIC
  ======================================== */

  const startMusic = async () => {
    if (!src || startedRef.current) return;

    startedRef.current = true;

    const first = new Audio(src);
    const second = new Audio(src);

    first.preload = "auto";
    second.preload = "auto";

    first.volume = 0;
    second.volume = 0;

    audioRef.current = first;
    nextAudioRef.current = second;

    try {
      await first.play();

      setStarted(true);

      /* INITIAL FADE IN */

      const fadeInStart = performance.now();

      const fadeIn = () => {
        if (audioRef.current !== first) return;

        const progress = Math.min(
          (performance.now() - fadeInStart) / 2000,
          1
        );

        first.volume = mutedRef.current
          ? 0
          : TARGET_VOLUME * progress;

        if (progress < 1) {
          fadeRef.current = setTimeout(fadeIn, 25);
        } else {
          fadeRef.current = null;
        }
      };

      fadeIn();

      /* CROSSFADE LOOP */

      loopRef.current = setInterval(async () => {
        const current = audioRef.current;
        const next = nextAudioRef.current;

        if (
          !current ||
          !next ||
          switchingRef.current ||
          !Number.isFinite(current.duration) ||
          current.duration <= 0
        )
          return;

        const remaining = current.duration - current.currentTime;

        if (remaining > START_BEFORE_END) return;

        switchingRef.current = true;

        try {
          next.currentTime = 0;
          next.volume = 0;

          await next.play();

          const startTime = performance.now();
          const startingVolume = current.volume;

          clearFade();

          const crossfade = () => {
            const progress = Math.min(
              (performance.now() - startTime) / CROSSFADE_TIME,
              1
            );

            current.volume = mutedRef.current
              ? 0
              : startingVolume * (1 - progress);

            next.volume = mutedRef.current
              ? 0
              : TARGET_VOLUME * progress;

            if (progress < 1) {
              fadeRef.current = setTimeout(crossfade, 25);
            } else {
              current.pause();
              current.currentTime = 0;
              current.volume = 0;

              audioRef.current = next;
              nextAudioRef.current = current;

              switchingRef.current = false;
              fadeRef.current = null;
            }
          };

          crossfade();
        } catch (error) {
          console.log("Crossfade failed:", error);
          switchingRef.current = false;
        }
      }, 500);
    } catch (error) {
      console.log("Music playback failed:", error);

      first.pause();
      second.pause();

      audioRef.current = null;
      nextAudioRef.current = null;

      startedRef.current = false;
    }
  };

  /* ========================================
     MUTE / UNMUTE
  ======================================== */

  const toggleMusic = () => {
    const newMuted = !mutedRef.current;

    mutedRef.current = newMuted;
    setMuted(newMuted);

    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : TARGET_VOLUME;
    }

    if (nextAudioRef.current) {
      nextAudioRef.current.volume = 0;
    }
  };

  /* ========================================
     EXPOSE START FUNCTION
  ======================================== */

  useImperativeHandle(ref, () => ({
    start: startMusic,
  }));

  /* ========================================
     CLEANUP
  ======================================== */

  useEffect(() => {
    return () => {
      clearFade();
      clearInterval(loopRef.current);

      audioRef.current?.pause();
      nextAudioRef.current?.pause();

      audioRef.current = null;
      nextAudioRef.current = null;
    };
  }, []);

  /* ========================================
     MUSIC BUTTON
  ======================================== */

  if (!started) return null;

  return (
    <button
      className="mute"
      onClick={toggleMusic}
      aria-label={muted ? "Turn music on" : "Turn music off"}
      title={muted ? "Turn music on" : "Turn music off"}
    >
      {muted ? <FaVolumeMute /> : <FaVolumeUp />}
    </button>
  );
});

export default Music;