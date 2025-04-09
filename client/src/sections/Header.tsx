import { useTranslation } from "react-i18next";
import { NavLinkData } from "../@types";
import { getConfig } from "../utils";
import "./Header.scss";
import { Drawer, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { LanguageSelector } from "../components/LanguageSelector";

export function Header() {
  const navLinks: Array<NavLinkData> = JSON.parse(getConfig("NavLinks"));
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  return (
    <nav>
      {getConfig("CoupleName")}
      <div className="spacer"></div>
      <div data-visibility="desktop">
        {navLinks.map((link) => (
          <a href={link.href}>{t("navLinks." + link.labelKey)}</a>
        ))}
      </div>
      <select data-visibility="desktop">
        <option>English</option>
        <option>Português</option>
      </select>
      <IconButton
        data-visibility="mobile"
        onClick={() => setShowDrawer(!showDrawer)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        anchor="left"
      >
        <nav className="drawer">
          <div>
            {getConfig("CoupleName")}
            <LanguageSelector />
          </div>

          <div style={{ display: "grid" }}>
            {navLinks.map((link) => (
              <a href={link.href}>{t("navLinks." + link.labelKey)}</a>
            ))}
          </div>
        </nav>
      </Drawer>
    </nav>
  );
}
