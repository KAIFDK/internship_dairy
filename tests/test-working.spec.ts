import { test, expect } from "@playwright/test";

test("bulk create diary entries from dates array (working copy)", async ({ page }) => {
  test.setTimeout(600000); // 10 minutes



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
  const internshipText = "Java Full Stack With Cloud and Devops Essentials";

  // Same month mapping as Project Diary (0–11 for selectOption)
  const monthValueMap: Record<string, string> = {
    January: "0",
    February: "1",
    March: "2",
    April: "3",
    May: "4",
    June: "5",
    July: "6",
    August: "7",
    September: "8",
    October: "9",
    November: "10",
    December: "11",
  };

  // Login once
  await page.goto("https://vtu.internyet.in/sign-in");
  await page
    .getByRole("textbox", { name: "Enter your email address" })
    .fill("add your mail");
  await page.getByRole("textbox", { name: "Password" }).fill("add your password");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForLoadState("networkidle");

  try {
    await page.getByRole("button", { name: "I Understand" }).click();
  } catch {
    // ignore if modal not present
  }

  // Navigate to Internship Diary page (same pattern as Project Diary)
  await page.getByRole("link", { name: "Internship Diary", exact: true }).click();
  await page.waitForLoadState("networkidle");

  for (let i = 0; i < formattedDates.length; i++) {
    const dateLabel = formattedDates[i];
    const diaryText =
      dairyDescriptions[i] ??
      dairyDescriptions[i % dairyDescriptions.length] ??
      "Worked on project tasks.";
    const outcomeText =
      outcomes[i] ??
      outcomes[i % outcomes.length] ??
      "Completed work and testing.";

    // Parse month for "Choose the Month" dropdown (same as Project Diary)
    const monthMatch = dateLabel.match(/,\s*([A-Za-z]+)\s+\d+/);
    const monthName = monthMatch ? monthMatch[1] : null;
    const monthValue = monthName
      ? monthValueMap[monthName] ?? monthValueMap["March"]
      : monthValueMap["March"];

    try {
      // Open the Create form first so combobox and date picker are visible (required on first iteration and after Save)
      await page.getByRole("link", { name: /Create/i }).first().click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);

      // Wait for combobox to be ready, then open it (with retries for slow load)
      const combo = page.getByRole("combobox", { name: /Select Internship/i });
      await combo.waitFor({ state: "visible", timeout: 15000 });
      await page.waitForTimeout(500);

      let internshipSelected = false;
      for (let attempt = 1; attempt <= 5 && !internshipSelected; attempt++) {
        await combo.click();
        await page.waitForTimeout(600);

        // Try 1: role="option" with exact or partial internship name (handles "DevOps" vs "Devops" etc.)
        const optionByRole = page.getByRole("option", { name: /Java Full Stack.*Cloud.*Devops|DevOps.*Essentials/i }).first();
        if ((await optionByRole.count()) > 0) {
          try {
            await optionByRole.click({ timeout: 3000 });
            internshipSelected = true;
            break;
          } catch {
            // option may have closed; retry
          }
        }

        // Try 2: any element containing the internship text (for custom dropdowns)
        const optionByText = page.getByText(internshipText, { exact: false }).first();
        if (!internshipSelected && (await optionByText.count()) > 0) {
          try {
            await optionByText.click({ timeout: 2000 });
            internshipSelected = true;
            break;
          } catch {
            // try next
          }
        }

        // Try 3: first available option (fallback so at least one internship is chosen)
        const anyOption = page.locator('[role="option"]').first();
        if (!internshipSelected && (await anyOption.count()) > 0) {
          try {
            await anyOption.click({ timeout: 2000 });
            internshipSelected = true;
            console.log(`Selected first available internship (attempt ${attempt})`);
            break;
          } catch {
            // retry opening dropdown
          }
        }

        await page.waitForTimeout(400);
      }

      if (!internshipSelected) {
        throw new Error("Could not select internship: dropdown did not show options or option click failed. Check combobox label and option text on the page.");
      }

      // Open date picker (same as Project Diary)
      await page.getByRole("button", { name: "Pick a Date" }).click();

      // Select month (same as Project Diary)
      await page.getByLabel("Choose the Month").selectOption(monthValue);

      // Click the exact date button – full label e.g. "Tuesday, August 5th," (same as Project Diary)
      await page.getByRole("button", { name: dateLabel }).click();

      // Continue to the form (same as Project Diary)
      await page.getByRole("button", { name: "Continue" }).click();
      await page.waitForTimeout(500);

      // Fill form – use same label pattern as Project Diary (Internship Diary uses same/similar labels)
      await page
        .getByRole("textbox", { name: /Briefly describe the work you|describe/i })
        .first()
        .fill(diaryText);

      await page.getByPlaceholder("e.g.").first().fill("8");

      await page
        .getByRole("textbox", { name: /What did you learn or ship|learn or ship/i })
        .first()
        .fill(outcomeText);

      // Add skills (same as Project Diary – all 6 skills)
      await page
        .locator("div")
        .filter({ hasText: /^Add skills$/ })
        .nth(2)
        .click();
      await page.getByRole("option", { name: "JavaScript" }).first().click();
      await page.getByRole("option", { name: "React" }).first().click();
      await page.getByRole("option", { name: "Java Spring Boot" }).first().click();
      await page.getByRole("option", { name: "Java" }).first().click();
      await page.getByRole("option", { name: "HTML" }).first().click();
      await page.getByRole("option", { name: "CSS" }).first().click();

      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(3000);

      await page.getByRole("link", { name: "Create" }).click();
      await page.waitForTimeout(5000);

      console.log(`Saved entry for ${dateLabel}`);
    } catch (err) {
      console.error(`Failed processing date ${dateLabel} (index ${i}):`, err);
    }
  }
});
