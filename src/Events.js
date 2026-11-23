
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
      "https://www.google.com/maps?newwindow=1&sca_esv=e14f145c069ef099&output=search&q=the+sultan+farm&source=lnms&fbs=ACAhTvwdifjn2dKXmjtOfBxVFl_kNo0J7LRbgf5U9cgi9kOJRhZo2b70ls_k56Dkh0A5OtJegGIHMIMFCNFtJWuVvm9XohLjxdVeq6V-Ir1IOM_FZOXK_HTbdH11wNdYqIBlGluN1HbZ2Ay2j6wBz6isfpdhOY7odu9uB5b4dht_VtNrZnyoKtyReZOcLtrDQZboJMd-pg8vwkCAIViVa0RbhXBMlgt-0Q&entry=mc&ved=1t:200715&ictx=111"
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










