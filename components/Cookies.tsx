import { useState } from 'react';
import CookieConsent from "react-cookie-consent";
import mixpanel from 'mixpanel-browser';

export const Cookies = () => {
  console.log(mixpanel.has_opted_out_tracking())
  return (
    <>
      <CookieConsent
        debug={true}
        enableDeclineButton
        declineButtonText="Decline"
        declineButtonStyle={{ margin: "0.5rem", padding: ".75rem", borderRadius: "9999px", backgroundColor: "black", border: "1px solid gray" }}
        flipButtons
        location="bottom"
        buttonText="Accept"
        buttonClasses="btn btn-white"
        style={{ background: "#000" }}
        buttonStyle={{ margin: "0.5rem", padding: "0.75rem", color: "#000", backgroundColor: "#fff", borderRadius: "9999px" }}
        expires={150}
        onAccept={() => mixpanel.opt_in_tracking()}
        onDecline={() => mixpanel.opt_out_tracking()}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
    </>
  )
}