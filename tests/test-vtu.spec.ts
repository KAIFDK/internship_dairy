// tests/test-vtu.spec.ts
import { test } from "@playwright/test";

const INTERNSHIP_REGEX =  /Android App Development With Generative AI/i;
const SKILLS = ["Kotlin",
    "Java",
    "Android Studio",
    "Git",
    "GitHub"];

test("bulk create diary entries from dates array", async ({ page, context }) => {
  test.setTimeout(1200000); // 20 minutes (78 entries with retry waits)

  // ── 22 dates ──────────────────────────────────────────────────────────────


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
  console.log(`Dates: ${formattedDates.length}, Descs: ${dairyDescriptions.length}, Outcomes: ${outcomes.length}`);

  const monthValueMap: Record<string, string> = {
    January: "0", February: "1", March: "2", April: "3",
    May: "4", June: "5", July: "6", August: "7",
    September: "8", October: "9", November: "10", December: "11",
  };

  // ── Helper: Click the "Internship Diary" sidebar link ────────────────
  // NO page.goto() — direct URL gives 404 and crashes the page!
  // We are already on the dashboard after login/save, just click the link.
  async function goToDiaryPage() {
    const diaryLink = page.getByRole("link", { name: "Internship Diary", exact: true });
    try {
      await diaryLink.waitFor({ state: "visible", timeout: 10000 });
      await diaryLink.click();
    } catch {
      const navLink = page.getByRole("link", { name: /Internship Diary/i }).first();
      await navLink.waitFor({ state: "visible", timeout: 10000 });
      await navLink.click();
    }
    await page.waitForTimeout(2000);
  }

  // ── LOGIN ────────────────────────────────────────────────────────────────
  await page.goto("https://vtu.internyet.in/sign-in", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  await page.getByRole("textbox", { name: "Enter your email address" }).fill("add your mail");
  await page.getByRole("textbox", { name: "Password" }).fill("add your password");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Wait until we leave the sign-in page
  await page.waitForURL((url) => !url.toString().includes("sign-in"), { timeout: 20000 }).catch(() => { });
  await page.waitForTimeout(2000);

  // Dismiss any "I Understand" modal
  try {
    const modal = page.getByRole("button", { name: "I Understand" });
    if (await modal.isVisible({ timeout: 3000 })) await modal.click();
  } catch {
    // not present
  }
  await page.waitForTimeout(1000);

  // Navigate to Internship Diary using the dashboard link
  await goToDiaryPage();
  console.log("✓ On Internship Diary page");

  // ── MAIN LOOP ─────────────────────────────────────────────────────────────
  for (let i = 0; i < formattedDates.length; i++) {
    const dateLabel = formattedDates[i];
    const diaryText = dairyDescriptions[i] ?? "Worked on project tasks.";
    const outcomeText = outcomes[i] ?? "Completed work and testing.";

    const monthMatch = dateLabel.match(/,\s*([A-Za-z]+)\s+\d+/);
    const monthName = monthMatch ? monthMatch[1] : "March";
    const monthValue = monthValueMap[monthName] ?? "2";

    try {
      // ── Step 1: Select internship ──────────────────────────────────────
      const combobox = page.getByRole("combobox", { name: /Select Internship/i });
      // Wait for the combobox to be visible AND enabled (not disabled)
      await combobox.waitFor({ state: "visible", timeout: 20000 });
      // Poll until enabled (max 20 seconds) — form may still be loading after navigation
      for (let wait = 0; wait < 40; wait++) {
        const disabled = await combobox.getAttribute('data-disabled');
        const isDisabled = await combobox.isDisabled();
        if (disabled === null && !isDisabled) break;
        await page.waitForTimeout(500);
      }
      await combobox.click();
      await page.waitForTimeout(800);

      const internshipOption = page.getByRole("option", { name: INTERNSHIP_REGEX }).first();
      if (await internshipOption.count() > 0) {
        await internshipOption.click();
      } else {
        // Skip disabled options — pick first enabled [role="option"]
        const allOptions = page.locator('[role="option"]:not([data-disabled]):not([aria-disabled="true"])');
        await allOptions.first().waitFor({ state: "visible", timeout: 5000 });
        await allOptions.first().click();
      }
      await page.waitForTimeout(500);

      // ── Step 2: Date picker ─────────────────────────────────────────────
      const datePicker = page.getByRole("button", { name: /Pick a Date/i });
      await datePicker.waitFor({ state: "visible", timeout: 10000 });
      await datePicker.click();
      await page.waitForTimeout(400);

      await page.getByLabel("Choose the Month").selectOption(monthValue);
      await page.waitForTimeout(300);

      await page.getByRole("button", { name: dateLabel }).click();
      await page.waitForTimeout(300);

      // ── Step 3: Continue ────────────────────────────────────────────────
      await page.getByRole("button", { name: "Continue" }).click();
      await page.waitForTimeout(1500);

      // ── Step 4: Fill form ───────────────────────────────────────────────
      await page.getByRole("textbox", { name: /Briefly describe the work/i }).fill(diaryText);
      await page.getByPlaceholder("e.g.").fill("8");
      await page.getByRole("textbox", { name: /What did you learn or ship/i }).fill(outcomeText);

      // ── Step 5: Add ALL 7 skills ────────────────────────────────────────
      // Use the React-Select chevron (▼) — stable across re-renders.
      // Re-open it fresh for each skill since React re-renders after each pick.
      for (const skill of SKILLS) {
        // Open the dropdown — try input first, then chevron
        const skillInput = page.locator('.react-select__input input').last();
        const chevron = page.locator('.react-select__dropdown-indicator').last();
        const isInputVisible = await skillInput.isVisible().catch(() => false);
        if (isInputVisible) {
          await skillInput.click({ force: true });
        } else {
          await chevron.waitFor({ state: 'visible', timeout: 8000 });
          await chevron.click();
        }
        await page.waitForTimeout(600);

        // Wait for options list to appear (up to 6 seconds)
        const optionList = page.locator('.react-select__menu');
        const menuVisible = await optionList.isVisible().catch(() => false);
        if (!menuVisible) {
          // Try clicking the chevron as fallback
          await chevron.click().catch(() => {});
          await page.waitForTimeout(600);
        }
        await page.locator('.react-select__option').first()
          .waitFor({ state: 'visible', timeout: 6000 })
          .catch(() => {});

        // Exact text match first, then partial match
        let option = page.locator('.react-select__option').filter({ hasText: new RegExp(`^${skill}$`) }).first();
        if (await option.count() === 0) {
          option = page.locator('.react-select__option').filter({ hasText: skill }).first();
        }
        if (await option.count() > 0) {
          await option.scrollIntoViewIfNeeded().catch(() => {});
          await option.click();
          await page.waitForTimeout(400);
          console.log(`  ✓ [${i + 1}] ${skill}`);
        } else {
          console.warn(`  ⚠ [${i + 1}] Skill "${skill}" not found, skipping`);
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        }
      }

      // Ensure dropdown is closed before Save
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);

      // ── Step 6: Save ────────────────────────────────────────────────────
      const saveBtn = page.getByRole("button", { name: "Save" });
      await saveBtn.waitFor({ state: "visible", timeout: 10000 });
      await saveBtn.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      try {
        await saveBtn.click({ timeout: 5000 });
      } catch {
        console.log("  → Force clicking Save button");
        await saveBtn.click({ force: true });
      }
      await page.waitForTimeout(3000);

      console.log(`✅ [${i + 1}/${formattedDates.length}] Saved: ${dateLabel}`);

      // ── Step 7: Back to diary page for next entry ───────────────────────
      await goToDiaryPage();

    } catch (err) {
      console.error(`❌ [${i + 1}/${formattedDates.length}] Failed: ${dateLabel}`, err);
      try {
        await goToDiaryPage();
      } catch {
        console.error("Cannot recover. Stopping loop.");
        break;
      }
    }
  } // end for loop
});
