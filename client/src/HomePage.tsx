import { ReactNode, useState } from "react";
import { Accommodation, Agenda, Header, Splash, Travel } from "./sections";
import { Venue } from "./sections/Venue";
import { RSVPDialogContext } from "./contexts";

import { RSVPDialog } from "./sections/RSVPDialog";

const RSVPDialogContextProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <RSVPDialogContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <RSVPDialog open={open} setOpen={setOpen} />
    </RSVPDialogContext.Provider>
  );
};

export function HomePage() {
  return (
    <RSVPDialogContextProvider>
      <Header />
      <Splash />
      <Venue />
      <Travel />
      <Accommodation />
      <Agenda />
    </RSVPDialogContextProvider>
  );
}
