import  { useState, useEffect } from "react";
import "./Style.css";

const weddingDate = new Date("2026-12-02T18:30:00+05:30");

export default function Countdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, weddingDate.getTime() - now);

  const units = [
    ["Days", Math.floor(remaining / 864e5)],
    ["Hours", Math.floor(remaining / 36e5) % 24],
    ["Minutes", Math.floor(remaining / 6e4) % 60],
    ["Seconds", Math.floor(remaining / 1e3) % 60],
  ];

  return (
    <section className="band">
     <div className="center">
  <h2>Until the “I do”</h2>

  <div className="count">
    {units.map(([label, value]) => (
      <div key={label}>
        <span>{String(value).padStart(2, "0")}</span>
        <small>{label}</small>
      </div>
    ))}
  </div>
</div>

    </section>
  );
}