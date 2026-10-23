import { Page } from "@playwright/test"
import { NavigationPage } from "./navigation-page"
import { UpdatePetType } from "./update-pet.types"

export class PageManager {
    readonly navigateTo: NavigationPage
    readonly updatePetType: UpdatePetType

    constructor(page: Page) {
        this.navigateTo = new NavigationPage(page)
        this.updatePetType = new UpdatePetType(page)
    }
}