
import { useEffect, useRef, useState } from "react";

const W = {
  groom: "Divyansh",
  bride: "Nikita",
  gateImage: "/images/gate-image.jpg",
};

export default function Gate({ onComplete, onMusicStart }) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [sealOpening, setSealOpening] = useState(false);

  const openingTimerRef = useRef(null);

  const openInvitation = () => {
    if (envelopeOpened || sealOpening) return;

    setSealOpening(true);

    // Start music when doors begin opening
    onMusicStart?.();

    setEnvelopeOpened(true);

    // Show Hero after door animation finishes
    openingTimerRef.current = setTimeout(() => {
      onComplete?.();
    }, 1700);
  };

  useEffect(() => {
    return () => {
      clearTimeout(openingTimerRef.current);
    };
  }, []);

  return (
    <div className="gate">
      <div className="envelope-scene">
        <div
          className={`envelope ${
            envelopeOpened ? "envelope-open" : ""
          }`}
        >
          <div className="envelope-back" />

          <div className="envelope-pocket">
            <div
              className="gate-left"
              style={{
                backgroundImage: `url("${W.gateImage}")`,
              }}
            />

            <div
              className="gate-right"
              style={{
                backgroundImage: `url("${W.gateImage}")`,
              }}
            />
          </div>

          <button
            className={`wax-seal ${
              sealOpening ? "seal-opening" : ""
            }`}
            onClick={openInvitation}
            disabled={sealOpening || envelopeOpened}
            aria-label="Open wedding invitation"
          >
            <span>
              {W.groom[0]}&{W.bride[0]}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
