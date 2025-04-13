import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./GuestDetails.scss";

export const GuestDetails = (props: {
  isMainGuest?: boolean;
  index?: number;
  hidden: boolean;
}) => {
  const { t } = useTranslation();
  const { isMainGuest, index, hidden } = props;
  const indexString = index?.toString() ?? "";

  return (
    <div hidden={hidden} className="form-fields">
      <TextField
        required
        label={t("rsvp.firstName")}
        name={"firstName" + indexString}
        variant="standard"
      />
      <TextField
        required
        label={t("rsvp.lastName")}
        name={"lastName" + indexString}
        variant="standard"
      />

      <TextField
        required={isMainGuest}
        label={t("rsvp.email")}
        name={"email" + indexString}
        variant="standard"
      />
      <TextField
        label={t("rsvp.phone")}
        name={"phone" + indexString}
        variant="standard"
      />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name={"vegetarian" + indexString} />}
          label={t("rsvp.vegetarian")}
        />
        <FormControlLabel
          control={<Checkbox name={"vegan" + indexString} />}
          label={t("rsvp.vegan")}
        />
        <FormControlLabel
          control={<Checkbox name={"foodAllergies" + indexString} />}
          label={t("rsvp.foodAllergies")}
        />
      </FormGroup>

      <TextField
        multiline
        label={t("rsvp.requests") + indexString}
        name={"requests"}
        variant="standard"
      />
    </div>
  );
};
