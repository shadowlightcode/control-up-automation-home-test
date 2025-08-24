### What the project does
1. Provides tests examples of UI tests
2. Provides tests examples of API Tests

### TechStack
1. Playwright – UI web automation
2. TypeScript – Strongly typed scripting
3. Prettier – formatting
4. dotenv – Environment variable management
5. UI tests 
6. REST API tests

# How to install & run tests 

### Clone the repo
`git clone https://github.com/your-username/automation-project.git`
`cd automation-project`

### Install dependencies
1. npm install
2. Install Playwright browser Chrome (first time only):
`npx playwright install chromium`
3. Create `.env` file in the root of the project 
4. Add next to your local `.env`:
`#WEB UI`
`BASE_URL = https://www.saucedemo.com/`
`STANDARD_USER_NAME = standard_user`
`PASSWORD = secret_sauce`

### Run tests
1. UI:
`npx playwright test --project=ui-tests --ui`

1. API:
`npx playwright test --project=api-tests --ui`




