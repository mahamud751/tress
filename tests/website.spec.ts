import { test, expect } from "@playwright/test";

test("desktop reference layout and quote flow", async ({ page }) => {
  await page.setViewportSize({ width: 898, height: 1000 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Make spacefor somethingbetter.",
  );
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.getByLabel("Adjust before and after garden comparison").fill("65");
  await expect(
    page.getByLabel("Adjust before and after garden comparison"),
  ).toHaveAttribute("aria-valuetext", "65% before, 35% after");
  await page.getByLabel("Your name").fill("Test Gardener");
  await page.getByLabel("Phone or email").fill("test@example.com");
  await page.getByLabel("Postcode", { exact: true }).fill("M20 4AB");
  await page.getByRole("button", { name: "Request a Free Quote" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open text message" }),
  ).toHaveAttribute("href", /sms:\+447970390235\?body=.*Test%20Gardener/);
  await expect(page.getByRole("dialog")).toContainText(
    "Your request hasn’t been sent yet.",
  );
  await page.getByRole("button", { name: "Close quote details" }).click();
  expect(errors).toEqual([]);
});

test("mobile layout and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#contact$/);
  await page.locator("#stump-photo").setInputFiles({
    name: "stump.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not an image"),
  });
  await expect(page.locator(".quote-form").getByRole("alert")).toHaveText(
    "Choose a JPG, PNG or HEIC photo under 10MB.",
  );
});

test("responsive layouts stay within the viewport", async ({ page }) => {
  for (const width of [320, 540, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    if (width === 1440)
      await page.screenshot({
        path: "test-results/wide-desktop.png",
        fullPage: true,
      });
  }
});
