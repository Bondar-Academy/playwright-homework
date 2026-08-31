import { chromium, type FullConfig } from '@playwright/test';

const fs = require('fs').promises;
const filePath = '.auth/user.json';

async function browserAuthorize(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;

    let user: any;

    try {
        const data = await fs.readFile(filePath);
        user = JSON.parse(data);

    } catch (err: any) {
        if (err.code === 'ENOENT') {
            console.log('User auth file does not exist, creating new file');

            user = {
                cookies: [],
                origins: []
            };

            await fs.writeFile(
                filePath,
                JSON.stringify(user, null, 2)
            );

        } else {
            console.error('Error processing user.json file:', err);
            throw err;
        }
    }

    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome'
    });

    const context = await browser.newContext();

    await context.addCookies(user.cookies);

    const page = await context.newPage();

    console.log(
        `\x1b[2m\tSign in started to '${baseURL}'\x1b[0m`
    );

    // Start listening for Auth0 token before opening the application
    const tokenResponsePromise = page.waitForResponse(
        response =>
            response.url().includes('/oauth/token') &&
            response.ok()
    );

    await page.goto(baseURL!);

    // Login only if the authentication page is displayed
    if (await page.locator('.login').isVisible()) {
        await page.locator('#username').fill(process.env.EMAIL!);
        await page.locator('#password').fill(process.env.PASSWORD!);

        await page
            .getByRole('button', { name: 'Continue' })
            .click();
    }

    // Capture access token
    const tokenResponse = await tokenResponsePromise;
    const responseJsonBody = await tokenResponse.json();

    process.env['ACCESS_TOKEN'] = responseJsonBody.access_token;

    console.log(
        `\x1b[2m\tSign in processed\x1b[0m`
    );

    // Save authenticated session
    await page.context().storageState({
        path: storageState as string
    });

    await browser.close();
}

export default browserAuthorize;