import { Client, Account } from 'appwrite';

// Validate required environment variables
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

// Check if Appwrite is configured
const isAppwriteConfigured = Boolean(APPWRITE_ENDPOINT && APPWRITE_PROJECT_ID);

if (!isAppwriteConfigured) {
  console.warn(
    '⚠️ Appwrite is not configured. Please set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID environment variables.'
  );
}

export const client = new Client();

// Only configure client if environment variables are available
if (isAppwriteConfigured) {
  try {
    client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
  } catch (error) {
    console.error('Failed to initialize Appwrite client:', error);
  }
} else {
  // Provide a fallback configuration to prevent runtime errors
  // This will cause API calls to fail gracefully with clear error messages
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('unconfigured');
}

export const account = new Account(client);
export { ID } from 'appwrite';
