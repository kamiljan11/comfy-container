import { describe, expect, it } from "vitest";
import { embedUrl, isVideoId, watchUrl } from "./youtube";

describe("youtube", () => {
  it("accepts only 11-character video ids", () => {
    expect(isVideoId("DogPvuwTPBI")).toBe(true);
    expect(isVideoId("a-b_C123456")).toBe(true);
    expect(isVideoId("DogPvuwTPB")).toBe(false);
    expect(isVideoId("DogPvuwTPBI1")).toBe(false);
    expect(isVideoId("DogPvuw/PBI")).toBe(false);
    expect(isVideoId("")).toBe(false);
  });

  it("builds the privacy-enhanced player URL", () => {
    expect(embedUrl("DogPvuwTPBI")).toBe(
      "https://www.youtube-nocookie.com/embed/DogPvuwTPBI?autoplay=1&rel=0",
    );
  });

  it("builds the watch page URL", () => {
    expect(watchUrl("DogPvuwTPBI")).toBe("https://www.youtube.com/watch?v=DogPvuwTPBI");
  });

  it("refuses anything that is not a video id instead of building a URL from it", () => {
    expect(() => embedUrl('x" onload="')).toThrow();
    expect(() => watchUrl("../../evil")).toThrow();
  });
});
