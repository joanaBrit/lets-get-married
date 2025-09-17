/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RSVP_ENDPOINT: string;
  // Banking environment variables (generic pattern: VITE_BANKING_{CURRENCY}_{FIELD})
  readonly [key: `VITE_BANKING_${string}_SC`]: string;
  readonly [key: `VITE_BANKING_${string}_ACCOUNT`]: string;
  readonly [key: `VITE_BANKING_${string}_NAME`]: string;
  readonly [key: `VITE_BANKING_${string}_IBAN`]: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
