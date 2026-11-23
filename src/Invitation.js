import React from "react";
import "./Style.css";

export default function Invitation() {
  return (
    <section className="invitation" id="invitation">
      <div className="invitation-content">

        

        <div className="divider">
          <span></span>
          <span className="divider-icon">✦</span>
          <span></span>
        </div>

        {/* Family invitation */}
        <p className="invitation-family">Manav Family</p>

        <p className="invitation-text">
          With immense joy and the blessings of the Almighty,
cordially invite you to celebrate the wedding of their beloved son
        </p>

            {/* Groom */}
        <h2 className="invitation-name">Divyansh</h2>

        <p className="invitation-parents">
          S/o Smt.Vandna &amp; Sh.Dinesh Manav 
        </p>

        <span className="invitation-and">and</span>


        {/* Bride */}
        <h2 className="invitation-name">Nikita</h2>

        <p className="invitation-parents">
          D/o Smt.Sangeeta &amp; Sh.Rohtas Verma
        </p>


        {/* Blessing */}
        <p className="invitation-blessing">
          With the blessings of Lord Ganesha
        </p>




        <div className="divider">
          <span></span>
          <span className="divider-icon">✦</span>
          <span></span>
        </div>

      </div>
    </section>
  );
}