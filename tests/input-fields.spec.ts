import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
    await page.goto('/pettypes')
    const petTypes_table_title = await page.locator('app-pettype-list').getByText('Pet Types').textContent()
    expect(petTypes_table_title).toEqual("Pet Types")

})

test('Update Pet Type', async ({page}) => {
    
    const petType_Update_button =   page.getByRole('button',{name:'Update'})
    const petType_firstrow_input = page.locator('tbody').getByRole('row').first().locator('input')
    const nameTextBox = page.getByRole('textbox')
   

    await page.getByRole('row',{name: 'Cat'}).getByRole('button',{name:'Edit'}).click()   //to pick up the row with Cat in it

    await expect(nameTextBox).toHaveValue('cat')
    await nameTextBox.clear()
    await nameTextBox.pressSequentially('rabbit',{delay:1})
   
    
    await  petType_Update_button.click()
    await expect(petType_firstrow_input).toHaveValue('rabbit')
    
    await page.getByRole('row',{name: 'rabbit'}).getByRole('button',{name:'Edit'}).click()  
    await expect(nameTextBox).toHaveValue('rabbit')
    await nameTextBox.clear()
    await nameTextBox.pressSequentially('cat',{delay:1})
    await petType_Update_button.click()
    
    await expect(petType_firstrow_input).toHaveValue('cat')
    
    })

test('Cancel Pet Type Update', async ({page}) => {
 
    const petType_Cancel_button =   page.getByRole('button',{name:'Cancel'})
    const petType_firstrow_input = page.locator('tbody').getByRole('row').first().locator('input')
    const nameTextBox = page.getByRole('textbox')

    await page.getByRole('row',{name: 'Dog'}).getByRole('button',{name:'Edit'}).click() 
    await expect(nameTextBox).toHaveValue('dog')
    await nameTextBox.clear()
    await nameTextBox.fill('moose')
    await expect(nameTextBox).toHaveValue('moose')
    await petType_Cancel_button.click()
    await expect(page.getByRole('row',{name: 'Dog'})).toHaveCount(1)

})

test('Validate Pet type name', async ({page}) => {
  
    const petType_Cancel_button =   page.getByRole('button',{name:'Cancel'})
    const petType_Update_button =   page.getByRole('button',{name:'Update'})
    const petType_firstrow_input = page.locator('tbody').getByRole('row').first().locator('input')
    const nameTextBox = page.getByRole('textbox')

    await page.getByRole('row',{name: 'lizard'}).getByRole('button',{name:'Edit'}).click() 
    await expect(nameTextBox).toHaveValue('lizard')
    await nameTextBox.clear()
    expect(page.locator('.help-block')).toHaveText('Name is required')
    petType_Update_button.click()
    expect(page.locator('h2')).toHaveText('Edit Pet Type')
    await petType_Cancel_button.click()

    await expect(page).toHaveURL('https://petclinic.bondaracademy.com/pettypes')

})