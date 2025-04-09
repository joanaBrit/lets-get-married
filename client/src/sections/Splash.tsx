import { useContext } from "react";
import { getConfig } from "../utils";
import "./Splash.scss";
import { StyledButton } from "../components/StyledButton";
import { RSVPDialogContext } from "../contexts";

export function Splash() {
  const rsvp = useContext(RSVPDialogContext);
  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1>{getConfig("CoupleName")}</h1>
        <h2>
          {getConfig("EventStartDate").toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          <span data-visibility="desktop">
            {" • "}
            {getConfig("EventLocation")}
          </span>
        </h2>
        <h2 data-visibility="mobile">{getConfig("EventLocation")}</h2>
        <StyledButton onClick={() => rsvp.open()}>RSVP</StyledButton>
      </div>
    </div>
  );
}
