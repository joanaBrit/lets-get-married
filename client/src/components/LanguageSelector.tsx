import { Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./LanguageSelector.scss";
import { i18n } from "i18next";

const languageIconMap: Record<string, string> = {
  en: "/assets/united-kingdom.png",
  pt: "/assets/portugal.png",
};
const languageMap: Record<string, string> = {
  en: "English",
  pt: "Português",
};

const FlagIcon = (props: { lang: string }) => (
  <img height={24} width={24} src={languageIconMap[props.lang]}></img>
);
const LanguageOption = (props: {
  i18n: i18n;
  lang: string;
  onSelect: () => void;
}) => (
  <a
    className="lang-option"
    onClick={() => {
      props.i18n.changeLanguage(props.lang);
      props.onSelect();
    }}
  >
    <FlagIcon lang={props.lang} />
    <span>{languageMap[props.lang]}</span>
  </a>
);

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const closePopover = () => {
    console.log("1");
    setAnchor(null);
  };
  return (
    <>
      <Button
        className="lang-selector"
        variant="outlined"
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
        startIcon={<FlagIcon lang={i18n.language} />}
      >
        {i18n.language.toUpperCase()}
      </Button>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={closePopover}
      >
        <div className="lang-selector">
          <LanguageOption
            i18n={i18n}
            lang="en"
            onSelect={() => closePopover()}
          />
          <LanguageOption i18n={i18n} lang="pt" onSelect={closePopover} />
        </div>
      </Popover>
    </>
  );
}
