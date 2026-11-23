import { useState, useRef } from "react";

import Gate from "./Gate";
import Hero from "./Hero";
import Invitation from "./Invitation";
import Countdown from "./Countdown";
import OtherEvents from "./OtherEvents";
import Events from "./Events";
import Footer from "./Footer";
import Music from "./Music";

import "./Style.css";

function App() {
  const [opened, setOpened] = useState(false);
  const musicRef = useRef(null);

  const handleMusicStart = () => {
    musicRef.current?.start();
  };

  return (
    <>
      <Music ref={musicRef} src="/audio/wedding-song.mp3" />

      {!opened ? (
        <Gate
          onMusicStart={handleMusicStart}
          onComplete={() => setOpened(true)}
        />
      ) : (
        <>
          <Hero />

          <section className="wedding-section">
            <div className="area">
            <Invitation />
            <Countdown />
            <OtherEvents />
            <Events />
            <Footer />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default App;



