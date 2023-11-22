import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Home page is opened and Welcome message is displayed', async ({ page, request }) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
});