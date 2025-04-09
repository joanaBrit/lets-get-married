import { ReactNode, useState } from "react";
import { Agenda, Header, OurStory, Splash } from "./sections";
import { Venue } from "./sections/Venue";
import { RSVPDialogContext } from "./contexts";

import { RSVPDialog } from "./sections/RSVPDialog";
import { Footer } from "./sections/Footer";

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
      <Agenda />
      <OurStory />
      <Footer />
    </RSVPDialogContextProvider>
  );
}
