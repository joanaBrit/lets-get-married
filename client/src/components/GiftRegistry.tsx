import { useState, memo } from "react";
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
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface BankDetails {
  sortCode?: string;
  accountNumber?: string;
  recipientName?: string;
  iban?: string;
}

interface GiftRegistryProps {
  currencies: string[];
}

interface BankDetailsSectionProps {
  account: BankDetails;
  currency: string;
  onCopyToClipboard: (
    text: string,
    label: string,
    event: React.MouseEvent
  ) => void;
}

interface BankDetailRowProps {
  value?: string;
  labelKey: string;
  copyLabel: string;
  onCopyToClipboard: (
    text: string,
    label: string,
    event: React.MouseEvent
  ) => void;
}

const BankDetailRow = memo(
  ({ value, labelKey, copyLabel, onCopyToClipboard }: BankDetailRowProps) => {
    const { t } = useTranslation();

    if (!value) return null;

    return (
      <div className="bank-detail-row">
        <span className="bank-detail-label">{t(labelKey)}:</span>
        <div className="bank-detail-value-container">
          <span className="bank-detail-value">{value}</span>
          <Button
            size="small"
            onClick={(e) => onCopyToClipboard(value, copyLabel, e)}
            className="bank-detail-copy-button"
          >
            <CopyIcon />
          </Button>
        </div>
      </div>
    );
  }
);

const BankDetailsSection = memo(
  ({ account, currency, onCopyToClipboard }: BankDetailsSectionProps) => {
    const { t } = useTranslation();

    return (
      <Accordion className="nested-accordion bank-account">
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <div className="currency-header">
            <span className="currency-title">
              {`${currency.toUpperCase()} ${t(`giftRegistry.bankDetails.title`)}`}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="bank-details-container">
            <BankDetailRow
              value={account.recipientName}
              labelKey="giftRegistry.bankDetails.recipientName"
              copyLabel="Recipient Name"
              onCopyToClipboard={onCopyToClipboard}
            />
            <BankDetailRow
              value={account.sortCode}
              labelKey="giftRegistry.bankDetails.sortCode"
              copyLabel="Sort Code"
              onCopyToClipboard={onCopyToClipboard}
            />
            <BankDetailRow
              value={account.accountNumber}
              labelKey="giftRegistry.bankDetails.accountNumber"
              copyLabel="Account Number"
              onCopyToClipboard={onCopyToClipboard}
            />
            <BankDetailRow
              value={account.iban}
              labelKey="giftRegistry.bankDetails.iban"
              copyLabel="IBAN"
              onCopyToClipboard={onCopyToClipboard}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }
);

export function GiftRegistry({ currencies = [] }: GiftRegistryProps) {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  // Generic function to get banking details for any currency
  const getBankingDetails = (currency: string): BankDetails | null => {
    const sortCode = import.meta.env[
      `VITE_BANKING_${currency}_SC` as keyof ImportMetaEnv
    ];
    const accountNumber = import.meta.env[
      `VITE_BANKING_${currency}_ACCOUNT` as keyof ImportMetaEnv
    ];
    const recipientName = import.meta.env[
      `VITE_BANKING_${currency}_NAME` as keyof ImportMetaEnv
    ];
    const iban = import.meta.env[
      `VITE_BANKING_${currency}_IBAN` as keyof ImportMetaEnv
    ];

    // Return account details if any fields are present
    if (sortCode || accountNumber || recipientName || iban) {
      return {
        ...(sortCode && { sortCode }),
        ...(accountNumber && { accountNumber }),
        ...(recipientName && { recipientName }),
        ...(iban && { iban }),
      };
    }
    return null;
  };

  // Get accounts for all specified currencies
  const accounts = currencies
    .map((currency) => ({
      currency: currency.toUpperCase(),
      details: getBankingDetails(currency.toUpperCase()),
    }))
    .filter((account) => account.details !== null);

  const copyToClipboard = async (
    text: string,
    label: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent accordion from collapsing
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setShowCopiedAlert(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <Accordion defaultExpanded className="accordion-card gift-registry">
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <h6 className="title">{t("giftRegistry.title")}</h6>
        </AccordionSummary>
        <AccordionDetails>
          <div className="content">
            <p className="message">{t("giftRegistry.message")}</p>

            {accounts.length === 0 ? (
              <p className="no-accounts-placeholder">
                {t("giftRegistry.noAccountDetails")}
              </p>
            ) : (
              <>
                <p className="optional">{t("giftRegistry.optional")}</p>
                <div className="bank-accounts">
                  {accounts.map(({ currency, details }) => (
                    <BankDetailsSection
                      key={currency}
                      account={details!}
                      currency={currency}
                      onCopyToClipboard={copyToClipboard}
                    />
                  ))}
                </div>
              </>
            )}
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
