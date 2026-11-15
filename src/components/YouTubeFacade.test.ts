// The facade before the click: our poster and a labelled button, no player and
// nothing pointing at the YouTube embed (ADR 0009). The click itself is covered
// by e2e/blog.spec.ts, which also checks that no request reaches YouTube first.
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { YouTubeFacade } from "./YouTubeFacade";

const props = {
  id: "DogPvuwTPBI",
  title: "95% firm nie widzi zysku z AI",
  poster: "/blog/95-procent-firm-bez-zwrotu-z-ai/cover.webp",
};

function html(lang: "pl" | "en") {
  return renderToString(createElement(YouTubeFacade, { ...props, lang }));
}

describe("YouTubeFacade", () => {
  it("renders the local poster in a button, without the player", () => {
    const out = html("pl");
    expect(out).toContain("<button");
    expect(out).toContain(`src="${props.poster}"`);
    expect(out).not.toContain("<iframe");
    expect(out).not.toContain("youtube-nocookie");
  });

  it("labels the button with the video title in the page language", () => {
    expect(html("pl")).toContain(`aria-label="Odtwórz film: ${props.title}"`);
    expect(html("en")).toContain(`aria-label="Play the video: ${props.title}"`);
  });

  it("says where the video loads from and links the watch page", () => {
    const pl = html("pl");
    expect(pl).toContain("Po kliknięciu film ładuje się z YouTube (Google).");
    expect(pl).toContain('href="https://www.youtube.com/watch?v=DogPvuwTPBI"');
    expect(html("en")).toContain("Open on YouTube");
  });
});
