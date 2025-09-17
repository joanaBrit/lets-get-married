import { useState } from "react";
import {
  Button,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  ExpandMore as ExpandIcon,
  Euro as EuroIcon,
  AttachMoney as PoundIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface BankDetails {
  sortCode: string;
  accountNumber: string;
  recipientName: string;
  iban: string;
}

interface GiftRegistryProps {
  eurAccount?: BankDetails;
  gbpAccount?: BankDetails;
}

export function GiftRegistry({ eurAccount, gbpAccount }: GiftRegistryProps) {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setShowCopiedAlert(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const BankDetailsSection = ({
    account,
    currency,
    icon,
  }: {
    account: BankDetails;
    currency: "eur" | "gbp";
    icon: React.ReactNode;
  }) => (
    <Accordion className="bank-account">
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <div className="currency-header">
          {icon}
          <span className="currency-title">
            {t(`giftRegistry.bankDetails.${currency}.title`)}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="bank-details">
          <div className="detail-row">
            <span className="label">
              {t(`giftRegistry.bankDetails.${currency}.recipientName`)}:
            </span>
            <div className="value-with-copy">
              <span className="value">{account.recipientName}</span>
              <Button
                size="small"
                startIcon={<CopyIcon />}
                onClick={() =>
                  copyToClipboard(account.recipientName, account.recipientName)
                }
                className="copy-button"
              >
                {t("giftRegistry.copyToClipboard")}
              </Button>
            </div>
          </div>

          <div className="detail-row">
            <span className="label">
              {t(`giftRegistry.bankDetails.${currency}.sortCode`)}:
            </span>
            <div className="value-with-copy">
              <span className="value">{account.sortCode}</span>
              <Button
                size="small"
                startIcon={<CopyIcon />}
                onClick={() => copyToClipboard(account.sortCode, "Sort Code")}
                className="copy-button"
              >
                {t("giftRegistry.copyToClipboard")}
              </Button>
            </div>
          </div>

          <div className="detail-row">
            <span className="label">
              {t(`giftRegistry.bankDetails.${currency}.accountNumber`)}:
            </span>
            <div className="value-with-copy">
              <span className="value">{account.accountNumber}</span>
              <Button
                size="small"
                startIcon={<CopyIcon />}
                onClick={() =>
                  copyToClipboard(account.accountNumber, "Account Number")
                }
                className="copy-button"
              >
                {t("giftRegistry.copyToClipboard")}
              </Button>
            </div>
          </div>

          <div className="detail-row">
            <span className="label">
              {t(`giftRegistry.bankDetails.${currency}.iban`)}:
            </span>
            <div className="value-with-copy">
              <span className="value">{account.iban}</span>
              <Button
                size="small"
                startIcon={<CopyIcon />}
                onClick={() => copyToClipboard(account.iban, "IBAN")}
                className="copy-button"
              >
                {t("giftRegistry.copyToClipboard")}
              </Button>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );

  // Don't render if no bank details provided
  if (!eurAccount && !gbpAccount) {
    return null;
  }

  return (
    <>
      <Accordion defaultExpanded className="gift-registry">
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <h6 className="title">{t("giftRegistry.title")}</h6>
        </AccordionSummary>
        <AccordionDetails>
          <div className="content">
            <p className="message">{t("giftRegistry.message")}</p>
            <p className="optional">{t("giftRegistry.optional")}</p>

            <div className="bank-accounts">
              {eurAccount && (
                <BankDetailsSection
                  account={eurAccount}
                  currency="eur"
                  icon={<EuroIcon />}
                />
              )}
              {gbpAccount && (
                <BankDetailsSection
                  account={gbpAccount}
                  currency="gbp"
                  icon={<PoundIcon />}
                />
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={showCopiedAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopiedAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowCopiedAlert(false)}
          severity="success"
          variant="filled"
        >
          {copiedText} {t("giftRegistry.copied")}
        </Alert>
      </Snackbar>
    </>
  );
}
