import { useState } from 'react';
import CookieConsent from "react-cookie-consent";
import mixpanel from 'mixpanel-browser';

export const Cookies = () => {
  const isDebug = process.env.NODE_ENV == "development" ? true : false;
  return (
    <>
      <CookieConsent
        debug={isDebug}
        enableDeclineButton
        declineButtonText="Decline"
        declineButtonStyle={{ margin: "0.5rem", padding: ".25rem", borderRadius: "9999px", backgroundColor: "black", border: "1px solid gray" }}
        flipButtons
        location="bottom"
        buttonText="Accept"
        buttonClasses="btn btn-white"
        style={{ background: "#000" }}
        buttonStyle={{ margin: "0.5rem", padding: "0.25rem", color: "#000", backgroundColor: "#fff", borderRadius: "9999px" }}
        expires={150}
        onAccept={() => mixpanel.opt_in_tracking()}
        onDecline={() => mixpanel.opt_out_tracking()}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
    </>
  )
}