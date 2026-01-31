import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI; 

const baseConfig = defineConfig({ 
  use: { 
    viewport: isCI ? { width: 1920, height: 1080 } : null,

    launchOptions: {
      slowMo: 1000,
      args: isCI 
        ? ['--window-size=1920,1080']
        : ['--start-maximized'] 

    },

    deviceScaleFactor: undefined
  }, 
});

export default defineConfig({
  testDir: './src/tests',
  outputDir: "./test-results/failure",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,

    reporter: [
    ['list'], 
    ['html', { 
      title: 'Automation Report',
      outputFolder: "./test-results/report"
    }],
  ],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    trace: 'retain-on-failure',

    screenshot: {
      mode:'only-on-failure',
    },
    
    video: {
      mode: 'retain-on-failure',
      size: { width: 1920, height: 1080 }
    },

    
    ignoreHTTPSErrors: true, 
    actionTimeout: 30 * 1_000, 
  },
  timeout: 60 * 60_000,

  expect: {
    timeout: 40 * 1_000
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      teardown: 'cleanup', 
    },
    {
      name: 'cleanup',
      testMatch: /auth\.teardown\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
        // ...baseConfig.use,
      },
      dependencies: ['setup'],
    },
  ],
});
