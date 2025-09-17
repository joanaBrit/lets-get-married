import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Card, Alert, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import { TransportInfo } from "./components/BusInfo";
import { LiveAnnouncement } from "./components/LiveAnnouncement";
import { UserBadges } from "./components/UserBadges";
import "./GuestArea.scss";
import { UserData } from "./@types";
import { MediaUpload } from "./components/MediaUpload";
import { GiftRegistry } from "./components/GiftRegistry";
import { Schedule } from "./components/Schedule";

export function GuestArea() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = searchParams.get("id");

  useEffect(() => {
    if (!userId) {
      setError("No user ID provided in URL");
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_RSVP_ENDPOINT}/user?id=${userId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setUserData(data);

        const userLang = data.lang || "en";
        i18n.changeLanguage(userLang);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching user data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userId) {
    return (
      <div className="guest-area">
        <div className="error-container">
          <Alert severity="warning">{t("guestArea.noUserId")}</Alert>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="guest-area">
        <div className="loading-container">
          <CircularProgress
            size={48}
            thickness={4}
            sx={{
              color: "var(--theme-primary)",
              marginBottom: "var(--spacing-md)",
            }}
          />
          <p className="loading-text">{t("guestArea.loading")}</p>
          <p className="loading-subtext">{t("guestArea.loadingSubtext")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="guest-area">
        <div className="error-container">
          <Alert severity="error">{error}</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="guest-area">
      {userData ? (
        <>
          {/* Welcome Section */}
          <div className="welcome-section">
            <h2 className="main-greeting">
              {t("guestArea.greeting", { firstName: userData.firstName })}
            </h2>
            {/* User Badges - without card container */}
            <UserBadges userData={userData} />

            {/* Special requests details */}
            {userData.requests && (
              <Card className="special-requests-card">
                <p className="label">{t("guestArea.specialRequestsLabel")}</p>
                <p className="content">{userData.requests}</p>
              </Card>
            )}
          </div>

          <TransportInfo isOnBus={!!userData.bus} />
          <Schedule />
          <LiveAnnouncement />
          <MediaUpload
            userId={userData.id}
            maxFiles={20}
            maxFileSize={100}
            uploadEnabled={false}
          />
          <GiftRegistry currencies={["EUR", "GBP"]} />
        </>
      ) : (
        <Alert severity="info">{t("guestArea.noUserData")}</Alert>
      )}
    </div>
  );
}
