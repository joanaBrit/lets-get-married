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
  sortCode: string;
  accountNumber: string;
  recipientName: string;
  iban: string;
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
          <div className="bank-details">
            <div className="detail-row">
              <span className="label">
                {t(`giftRegistry.bankDetails.recipientName`)}:
              </span>
              <div className="value-with-copy">
                <span className="value">{account.recipientName}</span>
                <Button
                  size="small"
                  onClick={(e) =>
                    onCopyToClipboard(
                      account.recipientName,
                      account.recipientName,
                      e
                    )
                  }
                  className="copy-button"
                >
                  <CopyIcon />
                </Button>
              </div>
            </div>

            <div className="detail-row">
              <span className="label">
                {t(`giftRegistry.bankDetails.sortCode`)}:
              </span>
              <div className="value-with-copy">
                <span className="value">{account.sortCode}</span>
                <Button
                  size="small"
                  onClick={(e) =>
                    onCopyToClipboard(account.sortCode, "Sort Code", e)
                  }
                  className="copy-button"
                >
                  <CopyIcon />
                </Button>
              </div>
            </div>

            <div className="detail-row">
              <span className="label">
                {t(`giftRegistry.bankDetails.accountNumber`)}:
              </span>
              <div className="value-with-copy">
                <span className="value">{account.accountNumber}</span>
                <Button
                  size="small"
                  onClick={(e) =>
                    onCopyToClipboard(
                      account.accountNumber,
                      "Account Number",
                      e
                    )
                  }
                  className="copy-button"
                >
                  <CopyIcon />
                </Button>
              </div>
            </div>

            <div className="detail-row">
              <span className="label">
                {t(`giftRegistry.bankDetails.iban`)}:
              </span>
              <div className="value-with-copy">
                <span className="value">{account.iban}</span>
                <Button
                  size="small"
                  onClick={(e) => onCopyToClipboard(account.iban, "IBAN", e)}
                  className="copy-button"
                >
                  <CopyIcon />
                </Button>
              </div>
            </div>
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

    // Only return account details if all required fields are present
    if (sortCode && accountNumber && recipientName && iban) {
      return {
        sortCode,
        accountNumber,
        recipientName,
        iban,
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
