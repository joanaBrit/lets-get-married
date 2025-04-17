export interface RsvpData {
  isAccept: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vegetarian?: 'on';
  vegan?: 'on';
  foodAllergies?: 'on';
  requests?: string;
  [key: string]: string | boolean | undefined;
}

interface Guest {
  isAccepted: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vegetarian: boolean;
  vegan: boolean;
  foodAllergies: boolean;
  requests?: string;
}

export interface ProcessedData {
  guests: Guest[];
  stats: {
    totalGuests: number;
    vegetarianCount: number;
    veganCount: number;
    allergiesCount: number;
  };
}

export function processRsvpData(data: RsvpData[]): ProcessedData {
  const guests: Guest[] = [];

  // Process each RSVP submission
  data.forEach(rsvp => {
    // Add the primary guest
    guests.push({
      isAccepted: rsvp.isAccept,
      firstName: rsvp.firstName,
      lastName: rsvp.lastName,
      email: rsvp.email,
      phone: rsvp.phone,
      vegetarian: rsvp.vegetarian === 'on',
      vegan: rsvp.vegan === 'on',
      foodAllergies: rsvp.foodAllergies === 'on',
      requests: rsvp.requests
    });

    // Process additional guests
    let guestIndex = 1;
    while (true) {
      const firstNameKey = `firstName${guestIndex}`;
      if (!rsvp[firstNameKey]) break;

      guests.push({
        isAccepted: rsvp.isAccept,
        firstName: rsvp[firstNameKey] as string,
        lastName: rsvp[`lastName${guestIndex}`] as string,
        email: rsvp[`email${guestIndex}`] as string,
        phone: rsvp[`phone${guestIndex}`] as string,
        vegetarian: rsvp[`vegetarian${guestIndex}`] === 'on',
        vegan: rsvp[`vegan${guestIndex}`] === 'on',
        foodAllergies: rsvp[`foodAllergies${guestIndex}`] === 'on',
        requests: rsvp[`requests${guestIndex}`] as string
      });

      guestIndex++;
    }
  });

  // Calculate stats for accepted guests only
  const acceptedGuests = guests.filter(g => g.isAccepted);
  const stats = {
    totalGuests: acceptedGuests.length,
    vegetarianCount: acceptedGuests.filter(g => g.vegetarian).length,
    veganCount: acceptedGuests.filter(g => g.vegan).length,
    allergiesCount: acceptedGuests.filter(g => g.foodAllergies).length
  };

  return { guests, stats };
}