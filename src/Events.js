
import React from "react";
import "./Style.css";

/* ========================================
   WEDDING DETAILS
======================================== */

const W = {
  otherEvents: [],

  wedding: {
    date: "Wednesday, 02 December 2026",
    time: "6:30 PM onwards",
    title: "Wedding",
    subtitle: "A beautiful beginning to forever",
    note: "Join us as we begin our forever with the blessings of our families.",
    venue: "Bhagat Singh Park",
    address: "Kirti Nagar, New Delhi",
    mapUrl:
      "https://www.google.com/maps/search/bhagat+singh+park+kirti+nagar/@28.6406002,77.1184846,15z/data=!3m1!4b1",
  },

  reception: {
    date: "Friday, 04 December 2026",
    time: "7:30 PM onwards",
    title: "Reception",
    subtitle: "An evening of love and celebration",
    note: "Celebrate the newlyweds with an evening of dinner, music and memories.",
    venue: "The Sultan Farm",
    address: "Bajghera Toll Road, New Delhi",
    mapUrl:
      "https://www.google.com/maps/place/%E0%A4%A5%E0%A5%87+%E0%A4%B8%E0%A5%81%E0%A4%B2%E0%A5%8D%E0%A4%A4%E0%A4%BE%E0%A4%A8/@28.5412717,77.0112755,17z/",
  },
};

/* ========================================
   OTHER CELEBRATIONS
======================================== */

function OtherCelebrations() {
  if (!W.otherEvents.length) return null;

  return (
    <section id="events" className="block eve">
      <div className="center">
        <p className="eyebrow">Before the big day</p>
        <h2>The Beginning</h2>
      </div>

      <ol className="events">
        {W.otherEvents.map((event) => (
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
    </section>
  );
}

/* ========================================
   REUSABLE FUNCTION CARD
======================================== */

function FunctionCard({ event, reception = false }) {
  return (
    <section
      id={reception ? "reception" : "wedding"}
      className="block function-section "
    >

      <div
        className={`function-card ${
          reception ? "reception-card" : ""
        }`}
      >

        <p className="eyebrow">
          {reception
            ? "Celebrating Togetherness"
            : "A NEW BEGINNING"}
        </p>

        <h2>{event.title}</h2>

        <p className="lead">{event.subtitle}</p>


        <div className="function-flower" aria-hidden="true">
          {reception ? "❋" : "✧"}
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
          rel="noopener noreferrer"
        >
          View venue
        </a>
      </div>
    </section>

  );
}

/* ========================================
   MAIN EVENTS COMPONENT
======================================== */

export default function Events() {
  return (
    <>
      <OtherCelebrations />

      <FunctionCard event={W.wedding} />

      <FunctionCard
        event={W.reception}
        reception
      />
    </>
  );
}










