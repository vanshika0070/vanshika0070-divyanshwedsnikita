export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* Decorative background */}
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-pretitle">
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Couple's names */}
        <h1 className="hero-names">
          <span>Divyansh</span>

          <span className="hero-ampersand">
            weds
          </span>

          <span>Nikita</span>
        </h1>

        {/* Wedding date */}
        <div className="hero-date">
          <span className="date-line"></span>

          <p>Wednesday, 2 December 2026</p>

          <span className="date-line"></span>
        </div>

        {/* Scroll indicator */}
        <a
          href="#events"
          className="hero-scroll"
          aria-label="Scroll to wedding events"
        >
          <span>Scroll to walk in</span>
        </a>

      </div>
    </section>
  );
}