import { useTranslation } from "react-i18next";
import { StyledButton } from "../components/StyledButton";

export function OurStory() {
  const { t } = useTranslation();
  return (
    <div>
      <StyledButton>{t("ourStory.title")}</StyledButton>
    </div>
  );
}
