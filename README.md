# Run the Project

```bash
git clone https://github.com/Vijay417-sys/internship_dairy.git
cd internship_dairy
npm install
npx playwright install chromium
npx playwright test tests/test-working.spec.ts --project=chrome
