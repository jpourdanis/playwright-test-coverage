import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { convertHexToRGB, extractHexColor } from "../helper";

const { Given, When, Then } = createBdd();

let homePage: HomePage;

Given("I am on the home page", async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

When("I click the {string} color button", async ({}, color: string) => {
  await homePage.clickColorButton(color);
});

Then("the active color text should be {string}", async ({}, hex: string) => {
  await expect(homePage.currentColorText).toContainText(hex);
});

Then("the background color should be {string}", async ({}, rgb: string) => {
  await expect(homePage.header).toHaveCSS("background-color", rgb);
});
