import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Pet type can be renamed and renamed back", async ({ page }) => {
  const firstRow = page.locator("#pettypes tbody").getByRole("row").first();
  const firstRowName = firstRow.getByRole("textbox");
  const firstRowEdit = firstRow.getByRole("button", {
    name: "Edit",
    exact: true,
  });
  const nameInput = page.locator("#name");
  const updateButton = page.getByRole("button", { name: "Update" });

  
  await page.getByRole("link", { name: "Pet Types" }).click();
  await expect(page.getByRole("heading", { name: "Pet Types" })).toBeVisible();
  await expect(firstRowName).toHaveValue("cat"); 

  
  
  await firstRowEdit.click();
  await expect(page.getByText("Edit Pet Type")).toBeVisible();
  await expect(nameInput).toHaveValue("cat"); 

  
  await nameInput.fill("rabbit");
  await expect(nameInput).toHaveValue("rabbit"); 
  await updateButton.click();
  await expect(firstRowName).toHaveValue("rabbit");

  
  await firstRowEdit.click();
  await expect(nameInput).toHaveValue("rabbit");
  await nameInput.fill("cat");
  await expect(nameInput).toHaveValue("cat");
  await updateButton.click();
  await expect(firstRowName).toHaveValue("cat");
});
