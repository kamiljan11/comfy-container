import { expect, it } from "vitest";
import { hasWholeNumber, numbersIn, stringsIn } from "./wholeNumber";

it("numbersIn reads grouped and decimal numbers as one token", () => {
  expect(numbersIn("1,500 lines, 40 824 commands, 2.3 times, 75,8% and 9 reviewers")).toEqual([
    "1,500",
    "40 824",
    "2.3",
    "75,8",
    "9",
  ]);
});

it("stringsIn keeps the words and leaves out numbers stored as data", () => {
  const text = stringsIn({ title: "Six rounds", bars: [{ label: "r1", value: 6 }], day: 9 });
  expect(text).toContain("Six rounds");
  expect(text).toContain("r1");
  expect(hasWholeNumber(text, "6")).toBe(false);
  expect(hasWholeNumber(text, "9")).toBe(false);
});

it("hasWholeNumber accepts a whole number and rejects a piece of a longer one", () => {
  expect(hasWholeNumber("at 15 minutes", "15")).toBe(true);
  expect(hasWholeNumber("150 rows", "15")).toBe(false);
  expect(hasWholeNumber("version 1.15", "15")).toBe(false);
  expect(hasWholeNumber("lasts 15.5 minutes", "15")).toBe(false);
  expect(hasWholeNumber("in 15. Then", "15")).toBe(true);
  expect(hasWholeNumber("15, 16", "15")).toBe(true);
  expect(hasWholeNumber("12 of 47", "12 of 47")).toBe(true);
});
