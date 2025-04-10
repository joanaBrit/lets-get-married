import { useTranslation } from "react-i18next";
import { NavLinkData } from "../@types";
import { getConfig } from "../utils";
import "./Header.scss";
import { Drawer, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { LanguageSelector } from "../components/LanguageSelector";

export function Header() {
  const navLinks: Array<NavLinkData> = JSON.parse(getConfig("NavLinks"));
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const onNav = (e: MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setShowDrawer(false);
  };

  return (
    <nav>
      {getConfig("CoupleName")}
      <div className="spacer"></div>
      <div data-visibility="desktop">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNav(e, link.href)}
          >
            {t("navLinks." + link.labelKey)}
          </a>
        ))}
      </div>
      <span data-visibility="desktop">
        <LanguageSelector />
      </span>
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
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => onNav(e, link.href)}
              >
                {t("navLinks." + link.labelKey)}
              </a>
            ))}
          </div>
        </nav>
      </Drawer>
    </nav>
  );
}
