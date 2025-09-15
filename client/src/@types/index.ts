export type NavLinkData = { labelKey: string; href: string };

export interface UserData {
    id: string;
    firstName: string;
    lastName: string; 
    status: 'attending' | 'not_attending';
    bus?: boolean;
    requests?: string; 
    vegetarian?: string;
    vegan?: string;
    foodAllergies?: boolean;
  }
  