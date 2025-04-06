import { useTranslation } from "react-i18next";
import { StyledButton } from "../components/StyledButton";

export function Venue() {
  const { t } = useTranslation();
  return (
    <div>
      <h2>Venue</h2>
      <p>{t("venue.description")}</p>
      <StyledButton>{t("venue.readMore")}</StyledButton>
    </div>
  );
}
