
import { useEffect, useRef, useState } from "react";
import "./Style.css";

/* ========================================
   WEDDING DETAILS
======================================== */

const W = {
  groom: "Divyansh",
  bride: "Nikita",

  date: new Date("2026-12-02T18:30:00+05:30"),

  music: "/audio/wedding-song.mp3",

  heroImage: "",
  gateImage: "/images/gate-image.jpg",

  otherEvents: [
    {
      day: "30 November",
      time: "12:00 PM",
      name: "Haldi",
      note: "Yellow, marigolds and a lot of laughter",
    },
    {
      day: "30 November",
      time: "7:00 PM",
      name: "Mehandi",
      note: "Hues of henna & happy hearts",
    },
    {
      day: "01 December",
      time: "12:00 PM",
      name: "Lagan",
      note: "Auspicious beginnings & blessings",
    },
    {
      day: "01 December",
      time: "01:00 PM",
      name: "Chaak Bhaat",
      note: "Traditions & togetherness",
    },
    {
      day: "02 December",
      time: "04:30 PM",
      name: "Gurchari",
      note: "A grand beginning to the celebrations",
    },
  ],

  wedding: {
    date: "Wednesday, 02 December 2026",
    time: "6:30 PM onwards",
    title: "Wedding",
    note: "Join us as we begin our forever with the blessings of our families.",
    venue: "Bhagat Singh Park",
    address: "Kirti Nagar, New Delhi",
    mapUrl:
      "https://www.google.com/maps/search/bhagat+singh+park+kirti+nagar/@28.6406002,77.1184846,15z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  },

  reception: {
    date: "Friday, 04 December 2026",
    time: "7:30 PM onwards",
    title: "Reception",
    note: "Celebrate the newlyweds with an evening of dinner, music and memories.",
    venue: "The Sultan Farm",
    address: "Bajghera Toll Road, New Delhi",
    mapUrl:
      "https://www.google.com/maps/place/%E0%A4%A5%E0%A5%87+%E0%A4%B8%E0%A5%81%E0%A4%B2%E0%A5%8D%E0%A4%A4%E0%A4%BE%E0%A4%A8/@28.5412717,77.0112755,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1080e1cde71d:0x6206d3b76334cbd5!8m2!3d28.541267!4d77.0138504!16s%2Fg%2F11clyt7bnk?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  },
};

/* ========================================
   REVEAL ANIMATION
======================================== */
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...props
}) {
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      className={`rv ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ========================================
   FLOATING DUST PARTICLES
======================================== */

function Dust() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let animationFrame;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.7 + 0.3,
      velocity: Math.random() * 0.25 + 0.05,
      alpha: Math.random() * 0.5 + 0.2,
      phase: Math.random() * 6,
    }));

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.y -= particle.velocity;
          particle.phase += 0.015;
          particle.x += Math.sin(particle.phase) * 0.25;

          if (particle.y < -5) {
            particle.y = height + 5;
            particle.x = Math.random() * width;
          }
        }

        context.beginPath();

        context.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        context.fillStyle = `rgba(232,213,168,${
          particle.alpha *
          (0.6 + 0.4 * Math.sin(particle.phase * 2))
        })`;

        context.fill();
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dust"
      aria-hidden="true"
    />
  );
}

/* ========================================
   HERO SECTION
======================================== */

function Hero({ play }) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        backgroundRef.current.style.transform =
          `translateY(${window.scrollY * 0.35}px) scale(1.1)`;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundStyle = W.heroImage
    ? {
        backgroundImage: `linear-gradient(rgba(23,13,26,.6),rgba(23,13,26,.88)),url(${W.heroImage})`,
      }
    : undefined;

  return (
    <section
      id="top"
      className={`hero ${play ? "play" : ""}`}
    >
      <div
        ref={backgroundRef}
        className="hero-bg"
        style={backgroundStyle}
      />

      <div className="hero-in">
        <p className="h1 sm it">
          Together with their families
        </p>

        <h1 className="h2 names">
          <span>{W.groom}</span>
          <i>&</i>
          <span>{W.bride}</span>
        </h1>

        <p className="h3 sm">
          invites you to celebrate their union
        </p>
      </div>

      <a
        href="#events"
        className="scroll-down"
        aria-label="Scroll to wedding celebrations"
      >
        <span />
      </a>
    </section>
  );
}

/* ========================================
   COUNTDOWN
======================================== */

function Countdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(
      () => setNow(Date.now()),
      1000
    );

    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(
    0,
    W.date.getTime() - now
  );

  const units = [
    ["Days", Math.floor(remaining / 864e5)],
    ["Hours", Math.floor(remaining / 36e5) % 24],
    ["Minutes", Math.floor(remaining / 6e4) % 60],
    ["Seconds", Math.floor(remaining / 1e3) % 60],
  ];

  return (
    <section className="band">
      <Reveal className="center">
        <h2>Until the “I do”</h2>

        <div className="count">
          {units.map(([label, value]) => (
            <div key={label}>
              <span>
                {String(value).padStart(2, "0")}
              </span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ========================================
   OTHER CELEBRATIONS
======================================== */

function OtherCelebrations() {
  if (!W.otherEvents.length) return null;

  return (
    <section id="events" className="block">
      <Reveal className="center">
        <p className="eyebrow">Before the big day</p>
        <h2>The Beginning</h2>
      </Reveal>

      <ol className="events">
        {W.otherEvents.map((event, index) => (
          <Reveal
            as="li"
            key={event.name}
            delay={index * 80}
          >
            <div className="when">
              <b>{event.day}</b>
              <span>{event.time}</span>
            </div>

            <div>
              <h3>{event.name}</h3>
              <p>{event.note}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ========================================
   WEDDING CEREMONY
======================================== */

function Wedding() {
  const event = W.wedding;

  return (
    <section
      id="wedding"
      className="block function-section"
    >
      <Reveal className="center">
        <p className="eyebrow">A NEW BEGINNING</p>
        <h2>{event.title}</h2>
      </Reveal>

      <Reveal
        className="function-card"
        delay={120}
      >
        <div className="function-flower" aria-hidden="true">
          ✧
        </div>

        <p className="function-date">{event.date}</p>

        <h3>{event.time}</h3>

        <p>{event.note}</p>

        <div className="function-rule" />

        <p className="function-venue">
          {event.venue}
        </p>

        <p className="dim">{event.address}</p>

        <a
          className="cta ghost"
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          View venue
        </a>
      </Reveal>
    </section>
  );
}

/* ========================================
   RECEPTION
======================================== */

function Reception() {
  const event = W.reception;

  return (
    <section
      id="reception"
      className="block function-section"
    >
      <Reveal className="center">
        <p className="eyebrow">Celebrating Togetherness</p>
        <h2>{event.title}</h2>
      </Reveal>

      <Reveal
        className="function-card reception-card"
        delay={120}
      >
        <div className="function-flower" aria-hidden="true">
          ❋
        </div>

        <p className="function-date">{event.date}</p>

        <h3>{event.time}</h3>

        <p>{event.note}</p>

        <div className="function-rule" />

        <p className="function-venue">
          {event.venue}
        </p>

        <p className="dim">{event.address}</p>

        <a
          className="cta ghost"
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          View venue
        </a>
      </Reveal>
    </section>
  );
}

/* ========================================
   MAIN APP
======================================== */

export default function Design() {
  const [opened, setOpened] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);
  const nextAudioRef = useRef(null);

  const fadeRef = useRef(null);
  const loopRef = useRef(null);

  const switchingRef = useRef(false);
  const openingTimerRef = useRef(null);

  /* ========================================
     LOCK SCROLL UNTIL INVITATION OPENS
  ======================================== */

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  /* ========================================
     BACKGROUND MUSIC - SMOOTH LOOP
  ======================================== */

  const playMusic = async () => {
    if (!W.music || audioRef.current) return;

    const first = new Audio(W.music);
    const second = new Audio(W.music);

    first.preload = "auto";
    second.preload = "auto";

    first.volume = 0;
    second.volume = 0;

    audioRef.current = first;
    nextAudioRef.current = second;

    const TARGET_VOLUME = 0.4;
    const CROSSFADE_TIME = 2.5;
    const START_BEFORE_END = 4;

    try {
      await first.play();

      /* INITIAL FADE IN */

      const fadeInStart = performance.now();

      const fadeIn = () => {
        if (
          !audioRef.current ||
          audioRef.current !== first
        ) {
          return;
        }

        const progress = Math.min(
          (performance.now() - fadeInStart) / 2000,
          1
        );

        first.volume = TARGET_VOLUME * progress;

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
        ) {
          return;
        }

        const remaining =
          current.duration - current.currentTime;

        if (remaining > START_BEFORE_END) return;

        switchingRef.current = true;

        try {
          next.currentTime = 0;
          next.volume = 0;

          await next.play();

          const startTime = performance.now();
          const duration = CROSSFADE_TIME * 1000;
          const startingVolume = current.volume;

          clearTimeout(fadeRef.current);

          const crossfade = () => {
            const progress = Math.min(
              (performance.now() - startTime) / duration,
              1
            );

            current.volume = Math.max(
              0,
              startingVolume * (1 - progress)
            );

            next.volume = Math.min(
              TARGET_VOLUME,
              TARGET_VOLUME * progress
            );

            if (progress < 1) {
              fadeRef.current = setTimeout(
                crossfade,
                25
              );
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
          console.log(
            "Crossfade playback failed:",
            error
          );

          switchingRef.current = false;
        }
      }, 50);

    } catch (error) {
      console.log("Audio playback failed:", error);

      audioRef.current = null;
      nextAudioRef.current = null;

      first.pause();
      second.pause();
    }
  };

  /* ========================================
     OPEN INVITATION
  ======================================== */

  const openInvitation = () => {
    if (envelopeOpened) return;

    setEnvelopeOpened(true);

    openingTimerRef.current = setTimeout(() => {
      setOpened(true);
      playMusic();
    }, 1800);
  };

  /* ========================================
     MUSIC ON / OFF
  ======================================== */

  const toggleMusic = () => {
    const newMuted = !muted;

    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }

    if (nextAudioRef.current) {
      nextAudioRef.current.muted = newMuted;
    }

    setMuted(newMuted);
  };

  /* ========================================
     CLEANUP
  ======================================== */

  useEffect(() => {
    return () => {
      clearTimeout(openingTimerRef.current);
      clearTimeout(fadeRef.current);
      clearInterval(loopRef.current);

      audioRef.current?.pause();
      nextAudioRef.current?.pause();

      audioRef.current = null;
      nextAudioRef.current = null;
    };
  }, []);

  /* ========================================
     RETURN
  ======================================== */

  return (
    <>
      <Dust />

      <div className="grain" aria-hidden="true" />

      {/* ========================================
          IMAGE GATE SCREEN
      ======================================== */}

      <div className={`gate ${opened ? "gone" : ""}`}>
        <div className="envelope-scene">

          <div
            className={`envelope ${
              envelopeOpened ? "envelope-open" : ""
            }`}
          >

            {/* Background behind the doors */}

            <div className="envelope-back" />

            {/* TWO IMAGE DOORS */}

            <div className="envelope-pocket">

              {/* LEFT HALF */}

              <div
                className="gate-left"
                style={{
                  backgroundImage: `url("${W.gateImage}")`,
                }}
              />

              {/* RIGHT HALF */}

              <div
                className="gate-right"
                style={{
                  backgroundImage: `url("${W.gateImage}")`,
                }}
              />

            </div>

            {/* WAX SEAL */}

            {!envelopeOpened && (
              <button
                className="wax-seal"
                onClick={openInvitation}
                aria-label="Open wedding invitation"
              >
                <span>
                  {W.groom[0]}&{W.bride[0]}
                </span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* ========================================
          MUSIC CONTROL
      ======================================== */}

      {opened && W.music && (
        <button
          className="mute"
          onClick={toggleMusic}
          aria-label={
            muted ? "Turn music on" : "Turn music off"
          }
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      )}

      {/* ========================================
          MAIN WEDDING WEBSITE
      ======================================== */}

      <main>
        <Hero play={opened} />

        <Countdown />

        <OtherCelebrations />

        <Wedding />

        <Reception />
      </main>

      {/* ========================================
          FOOTER
      ======================================== */}

      <footer className="center">
        <p className="footer-note">
          "With our families' blessings, join us in celebrating a beautiful new beginning."
        </p>

        <p className="fn">
          {W.groom} <i>&</i> {W.bride}
        </p>
      </footer>
    </>
  );
}
