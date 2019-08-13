import * as ts from 'typesript';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLOCKIFY_API_KEY: string;
      CLOCKIFY_WORKSPACE_ID: string;
      LOGROCKET: string;
      SITE_URL: string;
      SENTRY_PUBLIC_DSN: string;
    }
  }
}