# 🎯 How to Run Your Playwright Automation Test

## **Step 1: Open Terminal in VS Code**

- Press `Ctrl + `` (backtick) to open the integrated terminal
- Or go to **Terminal** → **New Terminal**

## **Step 2: Run the Test**

### **Option A: Run with Headed Mode (See Chrome Browser) - RECOMMENDED**

```bash
npx playwright test tests/test-working.spec.ts --project=chrome --headed
```

**What happens:**

- ✅ Chrome browser opens automatically
- ✅ You see the automation running in real-time
- ✅ All 92 diary entries will be created
- ✅ Progress visible on screen

---

### **Option B: Run in Headless Mode (No Browser Window)**

```bash
npx playwright test tests/test-working.spec.ts --project=chrome
```

**What happens:**

- Test runs in background without showing browser
- Faster execution
- Results shown in report after completion

---

### **Option C: Run with UI Mode (Interactive Testing)**

```bash
npx playwright test tests/test-working.spec.ts --project=chrome --ui
```

**What happens:**

- Opens Playwright Inspector
- Can pause, step through, and watch each action
- Best for debugging

---

### **Option D: Run and Debug with Trace**

```bash
npx playwright test tests/test-working.spec.ts --project=chrome --headed --trace on
```

**What happens:**

- Runs with browser visible
- Creates detailed trace file
- Can replay test actions later

---

## **Step 3: View Test Results**

After test completes:

### View HTML Report:

```bash
npx playwright show-report
```

### View Test Details:

- Check `test-results/` folder for screenshots and traces
- Check `playwright-report/` for detailed report

---

## **📊 What to Expect**

### **During Test Execution:**

✅ Chrome opens automatically (with `--headed` flag)
✅ Logs in with credentials:

- Email: `vijays.23.becs@acharya.ac.in`
- Password: `Vijay@2003`
  ✅ Navigates to "Project Diary"
  ✅ Creates 92 diary entries, one by one with:
- Date selection
- Diary description
- Outcome text
- JavaScript skill added
- 3 hours recorded
- Each entry saved

### **Expected Time:**

- ~5-10 minutes (depending on network/VTU system speed)
- 3 seconds wait between entries for saving

---

## **🔧 Troubleshooting**

### **If "Chrome not found" error:**

```bash
npx playwright install chrome
```

### **If port 3000 is busy:**

Playwright uses random ports, this usually won't be an issue.

### **If VTU login fails:**

- Check internet connection
- Verify credentials are correct
- VTU server might be down

### **If test stops midway:**

- Check error in terminal
- Review `test-results/` folder for screenshots showing where it failed
- Check console logs for specific error

---

## **✨ QUICK START COMMAND**

**Copy and paste this to run immediately:**

```bash
npm run test:headed
```

Or from project root:

```bash
npx playwright test tests/test-working.spec.ts --project=chrome --headed
```

---

## **📱 Key Shortcuts During Test**

- `Ctrl + C` - Stop the test immediately
- `--headed` - Show browser window (can watch it)
- `--workers=1` - Run tests sequentially (slower but safer)
