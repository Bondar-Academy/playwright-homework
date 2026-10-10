import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Pet type can be renamed and renamed back", async ({ page }) => {
  const firstRow = page.locator("#pettypes tbody").getByRole("row").first();
  const firstPetTypeInputField = firstRow.getByRole("textbox");
  const firstRowEditButton = firstRow.getByRole("button", {
    name: "Edit",
  });
  const petTypeNameInputField = page.locator("#name");

  await page.getByRole("link", { name: "Pet Types" }).click();
  await expect(page.getByRole("heading")).toHaveText("Pet Types");
  await expect(firstPetTypeInputField).toHaveValue("cat");

  await firstRowEditButton.click();
  await expect(page.getByRole("heading")).toHaveText("Edit Pet Type");
  await expect(petTypeNameInputField).toHaveValue("cat");

  await petTypeNameInputField.fill("rabbit");
  await expect(petTypeNameInputField).toHaveValue("rabbit");
  await page.getByRole("button", { name: "Update" }).click()
  await expect(firstPetTypeInputField).toHaveValue("rabbit");

  await firstRowEditButton.click();
  await expect(petTypeNameInputField).toHaveValue("rabbit");
  await petTypeNameInputField.fill("cat");
  await expect(petTypeNameInputField).toHaveValue("cat");
  await page.getByRole("button", { name: "Update" }).click()
  await expect(firstPetTypeInputField).toHaveValue("cat");
});
