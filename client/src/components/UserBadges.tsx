import { Chip } from "@mui/material";
import { 
  Restaurant as RestaurantIcon,
  LocalFlorist as VeganIcon,
  Warning as AllergyIcon,
  RequestPage as RequestIcon
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { UserData } from "../@types";

export function UserBadges({ userData }: {userData: UserData}) {
  const { t } = useTranslation();
  const badges = [];
  
  if (userData.vegetarian === 'on') {
    badges.push(
      <Chip 
        key="vegetarian"
        icon={<RestaurantIcon />}
        label={t('guestArea.badges.vegetarian')}
        color="success"
        variant="outlined"
      />
    );
  }
  
  if (userData.vegan === 'on') {
    badges.push(
      <Chip 
        key="vegan"
        icon={<VeganIcon />}
        label={t('guestArea.badges.vegan')}
        color="success"
        variant="outlined"
      />
    );
  }
  
  if (userData.foodAllergies) {
    badges.push(
      <Chip 
        key="allergies"
        icon={<AllergyIcon />}
        label={t('guestArea.badges.foodAllergies')}
        color="warning"
        variant="outlined"
      />
    );
  }
  
  return (
    <div className="user-badges">
      {badges}
    </div>
  );
}
