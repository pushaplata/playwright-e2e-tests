import { test as base } from '@playwright/test';

export type EnvConfig = {
  envName: string,
  appURL: string,
  apiURL: string,
  nopcommerceWeb: string,
  dbConfig:{},
  
};

export const test = base.extend<EnvConfig>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  envName: ['test', { option: true }],
  appURL: ['<provide URL>', { option: true }],
  apiURL: ['<provide API URL>', { option: true }],
  dbConfig: [{}, { option: true }],
  nopcommerceWeb: ['<provide URL>', { option: true }]
});