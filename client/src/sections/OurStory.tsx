import { t } from "i18next";
import { StyledButton } from "../components/StyledButton";

export function OurStory() {
  return (
    <div>
      <StyledButton>{t("ourStory.title")}</StyledButton>
    </div>
  );
}
