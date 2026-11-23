
import "./Style.css";

/* ========================================
   OTHER EVENTS DATA
======================================== */

const otherEvents = {
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
};

/* ========================================
   OTHER EVENTS COMPONENT
======================================== */

export default function OtherEvents() {
  if (!otherEvents.otherEvents.length) return null;

  return (

    
    <section id="other-events" className="block eve">

      
        <div className="divider">
          <span></span>
          <span className="divider-icon">✦</span>
          <span></span>
        </div>

        
      <div className="center">
        <p className="eyebrow">Before the big day</p>
        <h2>The Beginning</h2>
      </div>

      <ol className="events">
        {otherEvents.otherEvents.map((event) => (
          <li key={event.name}>
            <div className="when">
              <b>{event.day}</b>
              <span>{event.time}</span>
            </div>

            <div>
              <h3>{event.name}</h3>
              <p>{event.note}</p>
            </div>
          </li>
        ))}
      </ol>


      
        <div className="divider">
          <span></span>
          <span className="divider-icon">✦</span>
          <span></span>
        </div>
    </section>
  );
}


