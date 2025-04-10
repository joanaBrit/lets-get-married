import { Alert, Dialog, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../components/StyledButton";

import { FormEventHandler, useEffect, useRef, useState } from "react";
import "./RSVPDialog.scss";
import { Verified } from "@mui/icons-material";

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
  const { t } = useTranslation();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formObject: Record<string, any> = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    //@ts-ignore
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
          <form onSubmit={handleSubmit} ref={formRef}>
            <TextField
              required
              label={t("rsvp.firstName")}
              name="firstName"
              variant="standard"
            />
            <TextField
              required
              label={t("rsvp.lastName")}
              name="lastName"
              variant="standard"
            />
            <TextField
              required
              label={t("rsvp.email")}
              name="email"
              variant="standard"
            />
            <TextField
              label={t("rsvp.phone")}
              name="phone"
              variant="standard"
            />
            <TextField
              label={t("rsvp.plus")}
              type="number"
              defaultValue={0}
              name="plus"
              variant="standard"
            />
            <div>
              <StyledButton type="submit" onClick={handleSubmit}>
                {t("rsvp.yes")}
              </StyledButton>
              <StyledButton type="submit" onClick={handleSubmit}>
                {t("rsvp.no")}
              </StyledButton>
            </div>
          </form>
        </>
      )}
    </Dialog>
  );
}
