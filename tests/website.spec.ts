import { test, expect } from "@playwright/test";

test("desktop reference layout and quote flow", async ({ page }) => {
  await page.setViewportSize({ width: 903, height: 1000 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Professional Tree Care & Felling Specialists",
  );
  await expect(page.locator(".service-card")).toHaveCount(6);
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });

  // Choosing a service card preselects it in the quote form.
  await page.getByRole("link", { name: "Crown Reduction: request a quote" }).click();
  await expect(page.getByLabel("Service required")).toHaveValue(
    "Crown Reduction",
  );

  await page.getByLabel("Your name").fill("Test Gardener");
  await page.getByLabel("Phone number").fill("07000 000000");
  await page.getByLabel("Postcode", { exact: true }).fill("M20 4AB");
  await page.getByLabel("Tell us about the work").fill("Oak near the house");
  await page.getByRole("button", { name: "Request a Free Quote" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open text message" }),
  ).toHaveAttribute(
    "href",
    /sms:\+447970390235\?body=.*Test%20Gardener.*Crown%20Reduction/,
  );
  await expect(page.getByRole("dialog")).toContainText(
    "Your request hasn’t been sent yet.",
  );
  await page.getByRole("button", { name: "Close quote details" }).click();

  // Our Work photo viewer.
  await page.getByRole("button", { name: "View Our Work" }).click();
  await expect(page.getByRole("dialog")).toContainText("1 / 3");
  await page.getByRole("button", { name: "Next photo" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Working among the canopy",
  );
  await page.getByRole("button", { name: "Close photo" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
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
  await page.locator("#tree-photos").setInputFiles({
    name: "tree.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not an image"),
  });
  await expect(page.locator(".quote-form").getByRole("alert")).toHaveText(
    "Choose up to 10 JPG, PNG or HEIC photos, each under 10MB.",
  );
});

test("privacy policy page", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Privacy Policy" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy Policy",
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
