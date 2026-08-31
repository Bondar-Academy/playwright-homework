import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Home page is opened and Welcome message is displayed', async ({ page }) => {
    await expect(
        page.locator('.title')
    ).toHaveText('Welcome to Petclinic');
});

test('Update pet type', async ({ page }) => {

    await page.getByRole('link', { name: 'PET TYPES' }).click();
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible();

    const firstPetTypeRow = page.locator('tbody tr').first();
    const firstPetTypeInput = firstPetTypeRow.getByRole('textbox');

    await expect(firstPetTypeInput) .toHaveValue('cat');
    await firstPetTypeRow.getByRole('button', { name: 'Edit' }).click();
    await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible();

    const nameInput = page.getByRole('textbox');

    await expect(nameInput).toHaveValue('cat');
    await nameInput.fill('rabbit');
    await expect(nameInput).toHaveValue('rabbit');
    await page.getByRole('button', { name: 'Update' }).click();
    const rabbitRow = page.locator('tbody tr').first();
    const rabbitInput = rabbitRow.getByRole('textbox');

    await expect(rabbitInput).toHaveValue('rabbit');
    await rabbitRow.getByRole('button', { name: 'Edit' }).click();

    const editNameInput = page.getByRole('textbox');

    await expect(editNameInput).toHaveValue('rabbit');
    await editNameInput.fill('cat');
    await expect(editNameInput).toHaveValue('cat');
    await page.getByRole('button', { name: 'Update' }).click();

    const catRow = page.locator('tbody tr').first();
    const catInput = catRow.getByRole('textbox');

    await expect(catInput).toHaveValue('cat');
});