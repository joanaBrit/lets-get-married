import { Button } from "@mui/material";
import { ComponentProps } from "react";

export const StyledButton = (props: ComponentProps<typeof Button>) => {
  return <Button variant="outlined" {...props} />;
};
