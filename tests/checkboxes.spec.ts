import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
    await page.goto('/pettypes')
    await page.getByRole('button',{name: "Veterinarians"}).click()
    await page.locator('.dropdown-menu').getByRole('link', { name: 'All' }).click()


})

test('Validate Selected Specialities', async ({page}) => {

       
    const specialties = page.locator('.control-group').locator('.selected-specialties')
       expect(page.getByRole('heading')).toHaveText("Veterinarians")
       await page.getByRole('row',{name:'Helen Leary'}).getByRole('button',{name: "Edit Vet"}).click()
       await expect(specialties).toHaveText("radiology")
       await specialties.click()

       expect(page.getByRole('checkbox',{name: "radiology"})).toBeChecked()
       expect(page.getByRole('checkbox',{name: "surgery"})).not.toBeChecked()
       expect(page.getByRole('checkbox',{name: "dentistry"})).not.toBeChecked()

       await page.getByRole('checkbox',{name: "surgery"}).check()
       await page.getByRole('checkbox',{name: "radiology"}).uncheck()
       await expect(specialties).toHaveText("surgery")
       await page.getByRole('checkbox',{name: "dentistry"}).check()
       await expect(specialties).toHaveText("surgery, dentistry")
       await specialties.click()
       await page.getByRole('button',{name: "Save Vet"}).click()
})

test('Select all specialties', async ({page}) => {   
    const specialties = page.locator('.control-group').locator('.selected-specialties')
    
    await page.getByRole('row',{name:'Rafael Ortega'}).getByRole('button',{name: "Edit Vet"}).click()
    await expect(specialties).toHaveText("surgery")
    await specialties.click()

    const allSpecialtiesBoxes = page.getByRole("checkbox")

    for (const i of await  allSpecialtiesBoxes.all()) {

        await i.check()
        expect(i).toBeChecked()
    }
    await specialties.click()
    await expect(specialties).toHaveText("surgery, dentistry, radiology")

})

test('Unselect all specialties', async ({page}) => {   
    const specialties = page.locator('.control-group').locator('.selected-specialties')
    await page.getByRole('row',{name:'Linda Douglas'}).getByRole('button',{name: "Edit Vet"}).click()
    await expect(specialties).toHaveText("dentistry, surgery")

    await specialties.click()
    const allSpecialtiesBoxes = page.getByRole("checkbox")

    for (const i of await  allSpecialtiesBoxes.all()) {

        await i.uncheck()
        expect(i).not.toBeChecked()
    }
    
    await expect(specialties).toBeEmpty()

})

