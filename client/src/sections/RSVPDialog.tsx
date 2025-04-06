import { Dialog, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../components/StyledButton";

import { FormEventHandler, useRef } from "react";
import "./RSVPDialog.scss";
import { Rsvp } from "@mui/icons-material";

export function RSVPDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
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
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
        <TextField label={t("rsvp.phone")} name="phone" variant="standard" />
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
    </Dialog>
  );
}
