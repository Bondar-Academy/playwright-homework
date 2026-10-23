import test, { expect } from "@playwright/test";
import { UpdatePetType } from "../pages/update-pet.types";
import { NavigationPage } from "../pages/navigation-page";
import { PageManager } from "../pages/page-manager";

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Update pet type', async ({page}) => {

  const pom = new PageManager(page)
  await pom.navigateTo.selectPetType()
  await pom.updatePetType.updatePetType()
});
