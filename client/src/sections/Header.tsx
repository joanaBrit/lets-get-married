import { useTranslation } from "react-i18next";
import { NavLinkData } from "../@types";
import { getConfig } from "../utils";
import "./Header.scss";
import { Drawer, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLocation, useNavigate } from "react-router";

export function Header() {
  const navLinks: Array<NavLinkData> = JSON.parse(getConfig("NavLinks"));
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Only show navigation links on home page
  const isHomePage = location.pathname === "/";

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
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
      >
        {getConfig("CoupleName")}
      </a>
      <div className="spacer"></div>
      {isHomePage && (
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
      )}
      <span>
        <LanguageSelector />
      </span>
      {isHomePage && (
        <IconButton
          data-visibility="mobile"
          onClick={() => setShowDrawer(!showDrawer)}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        anchor="left"
      >
        <nav className="drawer">
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                setShowDrawer(false);
              }}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {getConfig("CoupleName")}
            </a>
            <LanguageSelector />
          </div>

          {isHomePage && (
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
          )}
        </nav>
      </Drawer>
    </nav>
  );
}
