/**
 * tests/internship-diary.spec.ts
 *
 * Production-quality Playwright script for bulk-creating VTU Internship Diary entries.
 *
 * Navigation flow (EXACT STEPS matching manual workflow):
 *  1. Go to sign-in page
 *  2. Fill email/password → Sign In
 *  3. After login, dashboard opens — dismiss "I Understand" modal if present
 *  4. Click "Internship Diary" from the LEFT SIDEBAR (no extra URL navigation!)
 *  5. Choose internship → pick date → Continue → fill form → add skills → Save
 *  6. After Save, click "Internship Diary" sidebar link again for next entry
 */
import { test, expect, Page, BrowserContext } from "@playwright/test";

// ──────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ──────────────────────────────────────────────────────────────────────────────
const CONFIG = {
  email: "mohammadkaif_csd@ksit.edu.in",
  password: "Mdkaifad@123",
  signInUrl: "https://vtu.internyet.in/sign-in",
  internshipRegex: /Android App Development With Generative AI/i,
  skills: [
    "Kotlin",
    "Java",
    "Android Studio",
    "Git",
    "GitHub"
  ],
  hoursPerDay: "8",
};
// ──────────────────────────────────────────────────────────────────────────────
// DATA — 22 entries in each array
// ──────────────────────────────────────────────────────────────────────────────


const formattedDates = [
  "Thursday, February 26th",
  "Friday, February 27th",
  "Saturday, February 28th",

  "Monday, March 2nd",
  "Tuesday, March 3rd",
  "Wednesday, March 4th",
  "Thursday, March 5th",
  "Friday, March 6th",
  "Saturday, March 7th",

  "Monday, March 9th",
  "Tuesday, March 10th",
  "Wednesday, March 11th",
  "Thursday, March 12th",
  "Friday, March 13th",
  "Saturday, March 14th",

  "Monday, March 16th",
  "Tuesday, March 17th",
  "Wednesday, March 18th",
  "Thursday, March 19th",
  "Friday, March 20th",
  "Saturday, March 21st",

  "Monday, March 23rd",
  "Tuesday, March 24th",
  "Wednesday, March 25th",
  "Thursday, March 26th",
  "Friday, March 27th",
  "Saturday, March 28th",

  "Monday, March 30th",
  "Tuesday, March 31st",

  "Wednesday, April 1st",
  "Thursday, April 2nd",
  "Friday, April 3rd",
  "Saturday, April 4th",

  "Monday, April 6th",
  "Tuesday, April 7th",
  "Wednesday, April 8th",
  "Thursday, April 9th",
  "Friday, April 10th",
  "Saturday, April 11th",

  "Monday, April 13th",
  "Tuesday, April 14th",
  "Wednesday, April 15th",
  "Thursday, April 16th",
  "Friday, April 17th",
  "Saturday, April 18th",

  "Monday, April 20th",
  "Tuesday, April 21st",
  "Wednesday, April 22nd",
  "Thursday, April 23rd",
  "Friday, April 24th",
  "Saturday, April 25th",

  "Monday, April 27th",
  "Tuesday, April 28th",
  "Wednesday, April 29th",
  "Thursday, April 30th",

  "Friday, May 1st",
  "Saturday, May 2nd",
  "Monday, May 4th",
  "Tuesday, May 5th",
  "Wednesday, May 6th",
  "Thursday, May 7th",
  "Friday, May 8th"
];

const dairyDescriptions = [

  "Today the internship project based on Android application development using Generative AI was introduced. Android Studio, SDK tools, emulator setup, and project structure were configured successfully. The workflow of AI-assisted app development and the importance of Generative AI tools in accelerating coding tasks were explained in detail.",

  "The fundamentals of Android application architecture were explored including Activities, Fragments, layouts, and manifest files. XML layouts were designed using ConstraintLayout and simple user interface screens were created.",

  "Kotlin programming basics were practiced including variables, functions, loops, conditions, and classes. Generative AI tools were used to generate Kotlin examples and explain syntax-related issues during coding practice.",

  "Material Design principles for Android development were studied. Components such as buttons, text fields, cards, and navigation bars were implemented to build responsive user interfaces.",

  "Event handling in Android applications was practiced using button click listeners and Toast messages. Navigation between activities and passing data through intents were implemented successfully.",

  "RecyclerView and Adapter concepts were explored for displaying dynamic lists in Android applications. AI-generated code suggestions were analyzed to understand efficient adapter implementation.",

  "Firebase authentication setup was introduced and login functionality using email and password authentication was integrated into the Android application.",

  "REST API integration was explored using Retrofit. The application successfully communicated with Generative AI APIs and displayed AI-generated responses inside the app interface.",

  "Debugging and exception handling techniques in Android Studio were practiced. Logcat analysis and runtime issue fixing methods were studied with AI-generated debugging assistance.",

  "The concepts of HTTP methods, JSON parsing, and API communication were studied in depth. GET and POST requests were implemented and tested using sample APIs.",

  "SharedPreferences and SQLite database integration were practiced for local data storage and user session management within the Android application.",

  "Android Jetpack components including ViewModel and LiveData were studied to improve lifecycle-aware data handling and maintain scalable architecture.",

  "Prompt engineering techniques for Generative AI applications were explored. Different prompts were tested to generate optimized AI responses inside the Android app.",

  "Navigation Components and fragment management were implemented for smooth transitions between multiple screens within the application.",

  "Room Database integration was introduced as a modern local database solution for Android applications. CRUD operations were implemented successfully.",

  "The concept of MVVM architecture was explored in detail. Separate layers for UI, business logic, and data management were implemented for better maintainability.",

  "Image loading and optimization techniques were studied using Glide and Picasso libraries. AI-generated image suggestions were displayed inside the application.",

  "Asynchronous operations using Coroutines were practiced to improve application responsiveness during API calls and database operations.",

  "Dark mode implementation and theme customization features were added to enhance user experience and accessibility.",

  "Form validation techniques were implemented to ensure accurate user input and secure data submission inside the application.",

  "The integration of speech-to-text functionality was explored using Android speech recognition APIs for voice-enabled AI interactions.",

  "Text-to-speech functionality was implemented to convert AI-generated text responses into spoken audio output for improved accessibility.",

  "Push notifications using Firebase Cloud Messaging were configured and tested successfully for real-time updates.",

  "File upload and image picker functionality were added to allow users to upload images for AI-based analysis within the application.",

  "Camera integration was implemented using Android Camera APIs. Captured images were processed through Generative AI services for analysis.",

  "AI chatbot conversation flow and response management techniques were designed and optimized for better user interaction.",

  "Secure API handling techniques including environment variables and token-based authentication were implemented for application security.",

  "Search functionality with dynamic filtering and AI-assisted recommendations was integrated inside the application.",

  "Pagination and lazy loading techniques were implemented for efficient data loading and smoother scrolling experience.",

  "Error dialogs and retry mechanisms were developed to improve application stability during network failures.",

  "The concept of dependency injection using Hilt was introduced and integrated into the Android project for scalable architecture management.",

  "Unit testing and debugging techniques were practiced using JUnit and Android testing libraries to improve code quality.",

  "UI animations and transitions were implemented to improve the visual appearance and user interaction experience.",

  "Generative AI was used to generate automated summaries and smart recommendations inside the Android application.",

  "Profile management features including image upload, user settings, and personalization options were implemented.",

  "Cloud Firestore database integration was completed for real-time data synchronization between users and the server.",

  "Offline support and caching mechanisms were implemented to ensure application functionality without internet connectivity.",

  "Performance optimization techniques such as memory management and reducing unnecessary API calls were practiced.",

  "Third-party authentication using Google Sign-In was integrated successfully into the Android application.",

  "Real-time chat functionality using Firebase and Generative AI responses was implemented and tested successfully.",

  "The Android app dashboard UI was redesigned using Material Design principles for better usability and navigation.",

  "AI-based recommendation systems were integrated to suggest content dynamically based on user activity and preferences.",

  "Data binding and view binding techniques were implemented to reduce boilerplate code and improve UI handling.",

  "Location services and Google Maps integration were explored for location-aware AI-based recommendations.",

  "Media playback functionality including audio and video integration was implemented inside the application.",

  "Background services and WorkManager were explored for handling scheduled tasks and notifications efficiently.",

  "Application security concepts such as encrypted storage and secure authentication were studied and implemented.",

  "Accessibility features including scalable fonts and voice accessibility support were integrated for better usability.",

  "Analytics tracking using Firebase Analytics was configured to monitor user interactions and application performance.",

  "Application crash handling and logging systems were improved using Firebase Crashlytics integration.",

  "Generative AI-based image caption generation functionality was implemented successfully within the application.",

  "AI-powered text summarization and smart reply features were integrated for intelligent user interactions.",

  "Cloud deployment and backend API hosting concepts were explored to support scalable Android applications.",

  "The Android application UI was refined further with responsive layouts and improved visual consistency.",

  "Final testing and bug fixing sessions were conducted to identify and resolve application issues before deployment.",

  "Play Store deployment requirements and APK generation processes were studied and practiced.",

  "Application documentation and project presentation preparation activities were completed successfully.",

  "The complete Android application workflow was reviewed and optimized for final project submission.",

  "Advanced AI integration techniques and response optimization methods were explored for improving chatbot quality.",

  "User feedback collection and performance evaluation methods were implemented to analyze application usability.",

  "The project source code was cleaned, documented, and prepared for final deployment and maintenance.",

  "Final application testing on multiple devices and screen sizes was performed to ensure compatibility.",

  "The Android Generative AI project was successfully completed and demonstrated with all major features functioning properly."
];

const outcomes = [

  "The development environment was configured successfully and a clear understanding of AI-assisted Android application development workflow was achieved.",

  "The structure of Android applications became clear and confidence in designing user interfaces improved significantly.",

  "Kotlin programming fundamentals became easier to understand and AI-assisted debugging skills improved.",

  "Responsive UI designing skills improved and understanding of Material Design concepts became stronger.",

  "Interactive Android features were implemented successfully and activity communication concepts became clear.",

  "Dynamic data handling using RecyclerView was understood properly and list rendering skills improved.",

  "Secure user authentication functionality was added successfully using Firebase services.",

  "The Android application became capable of communicating with Generative AI APIs and displaying intelligent responses.",

  "Debugging confidence improved and application runtime stability became stronger.",

  "API integration concepts became clear and networking implementation skills improved.",

  "The application successfully stored and retrieved local data, improving offline usability.",

  "Lifecycle-aware architecture handling became clearer and application scalability improved.",

  "Understanding of prompt engineering and AI response optimization increased significantly.",

  "Multi-screen navigation functionality was implemented successfully within the Android application.",

  "Database handling and CRUD operation implementation skills improved significantly.",

  "The project architecture became more organized and maintainable using MVVM structure.",

  "Image optimization and efficient media handling skills improved successfully.",

  "Asynchronous programming concepts became clearer and application responsiveness improved.",

  "User interface customization and accessibility features were enhanced successfully.",

  "Form validation logic improved application reliability and secure data handling.",

  "Voice-enabled interaction capability was added successfully to the Android application.",

  "The application successfully converted AI-generated text responses into speech output.",

  "Real-time notification functionality was integrated successfully using Firebase services.",

  "Users became capable of uploading files and images for AI-based analysis inside the application.",

  "Camera functionality and AI-based image processing features were implemented successfully.",

  "AI chatbot interaction flow became smoother and more user-friendly.",

  "Application security improved through proper API key management and authentication methods.",

  "Search and filtering functionality enhanced user experience and data accessibility.",

  "Large data handling became more efficient through pagination and lazy loading implementation.",

  "Application stability improved through proper error handling and retry logic.",

  "Dependency injection concepts became clear and project scalability improved.",

  "Code quality and debugging practices improved through testing implementation.",

  "Application UI became more visually appealing through animation and transition effects.",

  "AI-powered recommendation and summarization features enhanced application intelligence.",

  "User personalization and profile management functionality was completed successfully.",

  "Real-time cloud data synchronization was implemented successfully using Firestore.",

  "Offline usability improved significantly through caching and local storage techniques.",

  "Application performance and memory optimization techniques improved overall efficiency.",

  "Third-party authentication integration was completed successfully.",

  "Real-time AI-assisted chat functionality was implemented successfully.",

  "Dashboard navigation and usability became more organized and user-friendly.",

  "Dynamic recommendation systems improved personalized user experience.",

  "UI management became easier and cleaner through data binding implementation.",

  "Location-aware functionality and map integration were implemented successfully.",

  "Media handling and playback features enhanced application functionality.",

  "Background task execution became more efficient using WorkManager services.",

  "Application security standards improved through encrypted storage implementation.",

  "Accessibility support improved overall usability for different users.",

  "User activity monitoring and analytics tracking were configured successfully.",

  "Crash monitoring and application reliability improved through Firebase Crashlytics.",

  "AI-powered image caption generation functionality was implemented successfully.",

  "Smart AI-based text summarization and reply generation features enhanced user interaction.",

  "Backend hosting and deployment concepts became clearer for scalable applications.",

  "The Android application interface became more responsive and visually optimized.",

  "Most application bugs were resolved successfully through final testing.",

  "The APK generation and Play Store deployment workflow became clear.",

  "Project presentation and documentation skills improved successfully.",

  "The complete Android application workflow was optimized for final delivery.",

  "Advanced Generative AI integration concepts became clearer through implementation practice.",

  "User feedback analysis improved understanding of application usability and improvements.",

  "The project source code became cleaner, more maintainable, and deployment-ready.",

  "Cross-device compatibility testing improved application stability and responsiveness.",

  "The Android application project using Generative AI was completed successfully with all major modules functioning properly."
];
// const outcomes = [
//   "Ability to work with JavaScript array methods and string methods to manipulate data effectively",
//   "Understanding the difference between var, let and const and how variable scope works in JavaScript",
//   "Knowledge of arrow functions and normal functions and understanding their differences and use cases",
//   "Improved logical thinking and problem solving ability through practice problems in JavaScript",
//   "Strong foundation in Java programming including primitive and non primitive data types",
//   "Understanding of different types of variables in Java such as instance variables, static variables and local variables",
//   "Knowledge about JVM memory management including heap area, stack area and method area",
//   "Understanding object initialization using constructors and the purpose of constructors in Java",
//   "Ability to implement constructor overloading and understand different types of constructors",
//   "Clear understanding of the this keyword and how it is used to resolve variable shadowing",
//   "Knowledge of Java packages and how they help organize large applications",
//   "Understanding method declaration, method rules and how methods are used to structure Java programs",
//   "Overall improvement in programming fundamentals, coding practices and understanding of modern software development concepts",
//   "Understanding object creation in Java and how instance variables are initialized",
//   "Understanding constructors in Java and how they are used to initialize objects",
//   "Knowledge of different types of constructors including default and parameterized",
//   "Ability to implement constructor overloading with multiple parameters",
//   "Understanding variable shadowing and local variables hiding instance variables",
//   "Clear understanding of the this keyword and how it resolves shadowing",
//   "Knowledge of Java packages and project structure organization",
//   "Understanding implicit and explicit packages and import mechanisms",
//   "Understanding method declaration, parameters, and return types in Java",
// ];

const MONTH_VALUE: Record<string, string> = {
  January: "0", February: "1", March: "2", April: "3",
  May: "4", June: "5", July: "6", August: "7",
  September: "8", October: "9", November: "10", December: "11",
};

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Click the "Internship Diary" link in the LEFT SIDEBAR.
 * After login the user is already on the dashboard — just click the sidebar link.
 * After Save the user is still within the dashboard app — just click the sidebar link again.
 * NO extra page.goto() calls — those crash the page!
 */
async function clickInternshipDiaryLink(page: Page): Promise<void> {
  const link = page.getByRole("link", { name: "Internship Diary", exact: true });
  await link.waitFor({ state: "visible", timeout: 15000 });
  await link.click();
  await page.waitForTimeout(2000);
  console.log("✓ Clicked Internship Diary sidebar link");
}

/** Select the internship from the combobox. Retries up to 3 times. */
async function selectInternship(page: Page): Promise<void> {
  const combobox = page.getByRole("combobox", { name: /Select Internship/i });
  await combobox.waitFor({ state: "visible", timeout: 15000 });

  let selected = false;
  for (let attempt = 1; attempt <= 3 && !selected; attempt++) {
    await combobox.click();
    await page.waitForTimeout(600);

    // Try exact match first
    const option = page.getByRole("option", { name: CONFIG.internshipRegex }).first();
    if (await option.count() > 0) {
      try {
        await option.click({ timeout: 3000 });
        selected = true;
      } catch {
        /* retry */
      }
    }

    // Fallback: click any first available option
    if (!selected) {
      const anyOption = page.locator('[role="option"]').first();
      if (await anyOption.count() > 0) {
        try {
          await anyOption.click({ timeout: 2000 });
          selected = true;
        } catch { /* retry */ }
      }
    }
    if (!selected) await page.waitForTimeout(400);
  }

  if (!selected) throw new Error("Could not select internship after 3 attempts");
  await page.waitForTimeout(400);
}

/** Open date picker → select month → click date. */
async function pickDate(page: Page, dateLabel: string): Promise<void> {
  const monthMatch = dateLabel.match(/,\s*([A-Za-z]+)\s+\d+/);
  const monthName = monthMatch ? monthMatch[1] : "March";
  const monthValue = MONTH_VALUE[monthName] ?? "2";

  await page.getByRole("button", { name: /Pick a Date/i }).waitFor({ state: "visible", timeout: 10000 });
  await page.getByRole("button", { name: /Pick a Date/i }).click();
  await page.waitForTimeout(400);

  await page.getByLabel("Choose the Month").selectOption(monthValue);
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: dateLabel }).click();
  await page.waitForTimeout(300);
}

/** Fill description, hours, learnings. */
async function fillForm(page: Page, description: string, outcome: string): Promise<void> {
  await page.getByRole("textbox", { name: /Briefly describe the work/i }).fill(description);
  await page.getByPlaceholder("e.g.").fill(CONFIG.hoursPerDay);
  await page.getByRole("textbox", { name: /What did you learn or ship/i }).fill(outcome);
}

/**
 * Add all skills using the React-Select CHEVRON (▼) button.
 *
 * Root cause of previous failure: the React-Select input gets a new ID and
 * becomes disabled after each skill is selected (React re-renders the component).
 * Fix: click the .react-select__dropdown-indicator (chevron ▼) which is always
 * stable and gets a fresh reference each iteration of the loop.
 */
async function addSkills(page: Page, entryIndex: number): Promise<void> {
  for (const skill of CONFIG.skills) {
    // Fresh reference to chevron each time — React re-renders after each selection
    const chevron = page.locator('.react-select__dropdown-indicator').last();
    await chevron.waitFor({ state: 'visible', timeout: 5000 });
    await chevron.click();
    await page.waitForTimeout(500);

    // Wait for dropdown options to appear
    await page.locator('.react-select__option').first()
      .waitFor({ state: 'visible', timeout: 5000 })
      .catch(() => {});

    // Click the option that matches the skill name
    const option = page.locator('.react-select__option').filter({ hasText: skill }).first();
    if (await option.count() > 0) {
      await option.click();
      await page.waitForTimeout(350);
      console.log(`  ✓ [${entryIndex}] ${skill}`);
    } else {
      console.warn(`  ⚠ [${entryIndex}] Skill "${skill}" not found, skipping`);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    }
  }

  // Ensure dropdown is closed before proceeding to Save
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
}


/**
 * Scroll to Save button and click it.
 * The Save button is bottom-right — needs scroll into view.
 */
async function clickSave(page: Page, context: BrowserContext): Promise<void> {
  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.waitFor({ state: "visible", timeout: 10000 });

  // Scroll it into full view
  await saveBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Watch for any popup tab
  const newPagePromise = context.waitForEvent("page", { timeout: 5000 }).catch(() => null);

  try {
    await saveBtn.click({ timeout: 3000 });
  } catch {
    console.log("  → Using force click for Save");
    await saveBtn.click({ force: true });
  }

  // Close any new tab the Save action opened
  const newTab = await newPagePromise;
  if (newTab && !newTab.isClosed()) {
    await newTab.waitForLoadState("domcontentloaded").catch(() => { });
    await newTab.close();
    console.log("  → Closed extra tab after Save");
  }

  await page.waitForTimeout(3000);
  console.log("  ✓ Saved");
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN TEST
// ──────────────────────────────────────────────────────────────────────────────
test("bulk create diary entries", async ({ page, context }) => {
  test.setTimeout(600000); // 10 minutes

  // Validate arrays match
  expect(dairyDescriptions.length).toBe(formattedDates.length);
  expect(outcomes.length).toBe(formattedDates.length);
  console.log(`📋 Creating ${formattedDates.length} diary entries`);

  // ── STEP 1: Go to sign-in page ──
  await page.goto(CONFIG.signInUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  // ── STEP 2: Fill login form and sign in ──
  await page.getByRole("textbox", { name: "Enter your email address" }).fill(CONFIG.email);
  await page.getByRole("textbox", { name: "Password" }).fill(CONFIG.password);
  await page.getByRole("button", { name: "Sign In" }).click();

  // Wait for redirect away from sign-in
  await page.waitForURL((url) => !url.toString().includes("sign-in"), { timeout: 20000 }).catch(() => { });
  await page.waitForTimeout(2000);
  console.log("✓ Logged in");

  // ── STEP 3: Dismiss "I Understand" modal if present ──
  try {
    const modal = page.getByRole("button", { name: "I Understand" });
    if (await modal.isVisible({ timeout: 3000 })) {
      await modal.click();
      await page.waitForTimeout(800);
      console.log("✓ Dismissed modal");
    }
  } catch {
    // no modal
  }

  // ── STEP 4: Click "Internship Diary" from the LEFT SIDEBAR ──
  await clickInternshipDiaryLink(page);

  // ── STEP 5: Create all 22 entries ──
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < formattedDates.length; i++) {
    const dateLabel = formattedDates[i];
    const description = dairyDescriptions[i];
    const outcome = outcomes[i];

    console.log(`\n── Entry ${i + 1}/${formattedDates.length}: ${dateLabel} ──`);

    try {
      // 5a. Select the internship from dropdown
      await selectInternship(page);
      console.log("  ✓ Internship selected");

      // 5b. Pick the date
      await pickDate(page, dateLabel);
      console.log("  ✓ Date selected");

      // 5c. Click Continue
      await page.getByRole("button", { name: "Continue" }).click();
      await page.waitForTimeout(1500);
      console.log("  ✓ Continued to form");

      // 5d. Fill description, hours, outcome
      await fillForm(page, description, outcome);
      console.log("  ✓ Form filled");

      // 5e. Add all 7 skills via React-Select
      await addSkills(page, i + 1);
      console.log("  ✓ Skills added");

      // 5f. Scroll to Save and click it
      await clickSave(page, context);
      successCount++;
      console.log(`✅ [${i + 1}/${formattedDates.length}] SAVED: ${dateLabel}`);

      // 5g. Click "Internship Diary" sidebar link again for next entry
      await clickInternshipDiaryLink(page);

    } catch (err) {
      failCount++;
      console.error(`❌ [${i + 1}/${formattedDates.length}] FAILED: ${dateLabel}`);
      console.error("  Error:", (err as Error).message);

      // Try to recover by clicking sidebar link
      try {
        if (page.isClosed()) {
          console.error("  ⛔ Page closed — stopping.");
          break;
        }
        await clickInternshipDiaryLink(page);
      } catch {
        console.error("  ⛔ Recovery failed — stopping.");
        break;
      }
    }
  }

  // Summary
  console.log(`\n${"═".repeat(50)}`);
  console.log(`📊 ${successCount} saved, ${failCount} failed out of ${formattedDates.length}`);
  console.log(`${"═".repeat(50)}`);
});
