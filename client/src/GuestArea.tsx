import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Card, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BusInfo } from "./components/BusInfo";
import { LiveAnnouncement } from "./components/LiveAnnouncement";
import { UserBadges } from "./components/UserBadges";
import "./GuestArea.scss";
import { UserData } from "./@types";


export function GuestArea() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = searchParams.get('id');

  useEffect(() => {
    if (!userId) {
      setError('No user ID provided in URL');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_RSVP_ENDPOINT}/user?id=${userId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userId) {
    return (
      <div className="guest-area">
        <h4 className="title">{t('guestArea.title')}</h4>
        <div className="error-container">
          <Alert severity="warning">
            {t('guestArea.noUserId')}
          </Alert>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="guest-area">
        <h4 className="title">{t('guestArea.title')}</h4>
        <div className="loading-container">
          <p className="loading-text">{t('guestArea.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="guest-area">
        <h4 className="title">{t('guestArea.title')}</h4>
        <div className="error-container">
          <Alert severity="error">{error}</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="guest-area">
      <h4 className="title">
        {t('guestArea.title')}
      </h4>
      
      {userData ? (
        <>
          {/* Welcome Card */}
          <Card className="welcome-card">
            <h3 className="greeting">
              {t('guestArea.greeting', { firstName: userData.firstName })}
            </h3>
            
            {/* User Badges */}
            <UserBadges userData={userData} />
            
            {/* Special requests details */}
            {userData.requests && (
              <div className="special-requests">
                <p className="label">
                  {t('guestArea.specialRequestsLabel')}
                </p>
                <p className="content">
                  {userData.requests}
                </p>
              </div>
            )}
          </Card>
          
          {userData.bus && <BusInfo />}
          
          {/* <MediaUpload userId={userData.id} maxFiles={20} maxFileSize={100} /> */}
          
          {/* Live Announcements */}
          <LiveAnnouncement />
        </>
      ) : (
        <Alert severity="info">{t('guestArea.noUserData')}</Alert>
      )}
    </div>
  );
}
