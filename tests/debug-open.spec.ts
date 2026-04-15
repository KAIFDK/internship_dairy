// tests/debug-open.spec.ts
import { test } from "@playwright/test";

// Skip by default so normal/CI runs don't hang 60s. Run with --grep "debug open" to enable.
test.skip("debug open chrome", async ({ page }) => {
  console.log("Navigating to example.com");
  await page.goto("https://example.com", { waitUntil: "networkidle" });
  console.log("Page opened — waiting 60s so you can inspect the window");
  // wait for 60 seconds so you can manually inspect the browser when running with --headed
  await page.waitForTimeout(60000);
});