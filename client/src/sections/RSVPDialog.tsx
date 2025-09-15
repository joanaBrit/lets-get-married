import { Alert, Dialog, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../components/StyledButton";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { Verified } from "@mui/icons-material";
import { GuestDetails } from "./GuestDetails";

import "./RSVPDialog.scss";

export function RSVPDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitStatus, setSubmitStatus] = useState<{ ok: boolean } | null>(
    null
  );
  const [showGuestIndex, setShowGuestIndex] = useState(0);
  const [additional, setAdditional] = useState(0);
  const { t } = useTranslation();

  const handleSubmit = (e: MouseEvent, isAccept: boolean) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formObject: Record<string, any> = { isAccept };

    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    localStorage.setItem("user_email", formObject.email);

    fetch(import.meta.env.VITE_RSVP_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(formObject),
    }).then((r) => {
      if (r.ok) {
        setSubmitStatus({ ok: r.ok });
      }
    });
  };

  useEffect(() => {
    if (submitStatus?.ok) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [submitStatus]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      {submitStatus?.ok ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <Verified sx={{ fontSize: 60 }} color="success" />
          <div>{t("rsvp.success")}</div>
        </div>
      ) : (
        <>
          {submitStatus && !submitStatus.ok && (
            <Alert severity="error">{t("rsvp.failed")}</Alert>
          )}

          {additional > 0 && (
            <Tabs
              onChange={(_e, v) => setShowGuestIndex(v)}
              value={showGuestIndex}
              variant="scrollable"
              scrollButtons="auto"
            >
              {Array.from({ length: additional + 1 }, (_v, i) => (
                <Tab
                  key={i}
                  label={[t("rsvp.guest"), i + 1].join(" ")}
                  onClick={() => setShowGuestIndex(i)}
                />
              ))}
            </Tabs>
          )}
          <form ref={formRef}>
            <GuestDetails isMainGuest hidden={showGuestIndex !== 0} />
            {...Array.from({ length: additional }, (_v, i) => (
              <GuestDetails
                key={i}
                index={i + 1}
                hidden={showGuestIndex !== i + 1}
              />
            ))}
            <StyledButton
              variant="outlined"
              onClick={() => setAdditional(additional + 1)}
              style={{ marginBottom: "1rem" }}
            >
              {t("rsvp.plus")}
            </StyledButton>

            <StyledButton type="submit" onClick={(e) => handleSubmit(e, true)}>
              {t("rsvp.yes")}
            </StyledButton>
            <StyledButton type="submit" onClick={(e) => handleSubmit(e, false)}>
              {t("rsvp.no")}
            </StyledButton>
          </form>
        </>
      )}
    </Dialog>
  );
}
