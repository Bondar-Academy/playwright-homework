import { expect, Page } from "@playwright/test";

export class UpdatePetType {
    private readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async updatePetType() {
        await this.page
            .getByRole('row')
            .filter({ has: this.page.locator('[id="0"]') })
            .getByRole('button', { name: 'Edit' })
            .click()

        await expect(this.page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible()

        await this.page.waitForTimeout(1000)
        await this.page.locator('#name').fill('rabbit')

        await this.page.getByRole('button', { name: 'Update' }).click()
        await expect(this.page.locator('[id="0"]')).toHaveValue('rabbit')

        await this.page
            .getByRole('row')
            .filter({ has: this.page.locator('[id="0"]') })
            .getByRole('button', { name: 'Edit' })
            .click()

        await this.page.waitForTimeout(1000)

        await this.page.locator('#name').fill('cat')
        await this.page.getByRole('button', { name: 'Update' }).click()
        await expect(this.page.locator('[id="0"]')).toHaveValue('cat')

        await expect(this.page.locator('[id="0"]')).toHaveValue('cat')

    }

}
