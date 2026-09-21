// The consultation form lives on every service and area page now (Kamil: a form
// on the page, not a trip to /kontakt). Submits are intercepted: nothing here
// may send a real lead.
import { test, expect } from "@playwright/test";

test("a service page carries the form, and its hero button scrolls to it", async ({ page }) => {
  await page.goto("/uslugi/integracje?lang=pl");
  await page.waitForLoadState("networkidle");

  const form = page.locator("#sl-cta .kontakt-form");
  await expect(form).toHaveCount(1);
  await expect(form.locator('input[name="email"]')).toHaveAttribute("type", "email");

  const hero = page.locator(".sl-hero .sl-btn");
  await expect(hero).toHaveAttribute("href", "#sl-cta");
  await hero.click();
  await expect(page.locator("#sl-cta")).toBeInViewport();
  expect(new URL(page.url()).pathname).toBe("/uslugi/integracje");
});

test("a failed send says so and offers the email address", async ({ page }) => {
  await page.goto("/obszary/obsluga-klienta?lang=pl");
  await page.waitForLoadState("networkidle");
  await page.route("**/_serverFn/**", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: "{}" }),
  );

  const form = page.locator("#sl-cta .kontakt-form");
  await form.locator('input[name="name"]').fill("E2E");
  await form.locator('input[name="email"]').fill("e2e@example.com");
  await form.locator('textarea[name="message"]').fill("Sprawdzam stan błędu formularza.");
  await form.locator('button[type="submit"]').click();

  const alert = form.locator(".kontakt-error");
  await expect(alert).toBeVisible();
  await expect(alert.locator('a[href="mailto:hello@kamiljan.com"]')).toHaveCount(1);
});

test("/kontakt still shows the same form", async ({ page }) => {
  await page.goto("/kontakt?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".kontakt-card .kontakt-form")).toHaveCount(1);
});
