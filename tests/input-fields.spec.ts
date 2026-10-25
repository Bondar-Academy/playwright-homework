import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Update petType', async ({ page }) => {
  await page.getByText(' Pet Types').click()
  await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible()

  await page.getByRole('row', { name: 'cat' }).getByRole('button', { name: 'Edit' }).click()
  await expect(page.getByRole('heading')).toHaveText('Edit Pet Type')

  await expect(page.locator('#name')).toHaveValue('cat')
  await page.locator('#name').fill('rabbit')

  await page.getByRole('button', { name: 'Update' }).click()
  await expect(page.locator('[id="0"]')).toHaveValue('rabbit')

  await page.getByRole('row', { name: 'rabbit' }).getByRole('button', { name: 'Edit' }).click()

  await expect(page.locator('#name')).toHaveValue('rabbit')

  await page.locator('#name').fill('cat')
  await page.getByRole('button', { name: 'Update' }).click()
  await expect(page.locator('[id="0"]')).toHaveValue('cat')

});
