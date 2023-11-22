import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  fullyParallel: false,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  globalSetup: '.auth/auth-setup.ts',
  use: {
    baseURL: 'https://petclinic.bondaracademy.com',
    trace: 'on-first-retry',
    storageState: '.auth/user.json',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium'
      },
    },
  ],

});
