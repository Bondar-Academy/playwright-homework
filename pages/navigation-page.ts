import { expect, Page } from "@playwright/test";


export class NavigationPage {
    private readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async selectPetType() {
        await this.page.getByText(' Pet Types').click()
        await expect(this.page.getByRole('heading', { name: 'Pet Types' })).toBeVisible()
    }

}