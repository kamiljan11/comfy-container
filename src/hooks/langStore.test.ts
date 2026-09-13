import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The store keeps its resolved value in module scope, so every test imports a
 * fresh copy of the module after stubbing the browser globals it reads.
 */

type Storage = { getItem: (k: string) => string | null; setItem: (k: string, v: string) => void };

function stubBrowser(opts: {
  search?: string;
  saved?: string | null;
  browser?: string;
  storage?: Storage;
}) {
  const setItem = vi.fn();
  const storage: Storage = opts.storage ?? {
    getItem: () => opts.saved ?? null,
    setItem,
  };
  vi.stubGlobal("window", { location: { search: opts.search ?? "" } });
  vi.stubGlobal("localStorage", storage);
  vi.stubGlobal("navigator", { language: opts.browser ?? "en-US" });
  return { setItem };
}

async function freshStore() {
  vi.resetModules();
  return (await import("./useLang")).langStore;
}

describe("langStore", () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => vi.unstubAllGlobals());

  it("resolves from ?lang= and saves it, so a plain link keeps the language", async () => {
    const { setItem } = stubBrowser({ search: "?lang=pl", saved: "en" });
    const store = await freshStore();
    expect(store.get()).toBe("pl");
    expect(setItem).toHaveBeenCalledWith("kj-lang", "pl");
  });

  it("uses the saved choice without rewriting it when the URL has none", async () => {
    const { setItem } = stubBrowser({ saved: "pl", browser: "en-GB" });
    const store = await freshStore();
    expect(store.get()).toBe("pl");
    expect(setItem).not.toHaveBeenCalled();
  });

  it("resolves once and serves the cached value afterwards", async () => {
    stubBrowser({ browser: "pl-PL" });
    const store = await freshStore();
    expect(store.get()).toBe("pl");
    vi.stubGlobal("navigator", { language: "en-US" });
    expect(store.get()).toBe("pl");
  });

  it("notifies subscribers and saves on set; unsubscribed listeners stay quiet", async () => {
    const { setItem } = stubBrowser({});
    const store = await freshStore();
    const a = vi.fn();
    const b = vi.fn();
    store.subscribe(a);
    const offB = store.subscribe(b);
    offB();
    store.set("pl");
    expect(store.get()).toBe("pl");
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).not.toHaveBeenCalled();
    expect(setItem).toHaveBeenCalledWith("kj-lang", "pl");
  });

  it("keeps working when storage is blocked: reads as empty, warns on write", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    stubBrowser({
      browser: "pl-PL",
      storage: {
        getItem: () => {
          throw new Error("blocked");
        },
        setItem: () => {
          throw new Error("blocked");
        },
      },
    });
    const store = await freshStore();
    expect(store.get()).toBe("pl");
    expect(() => store.set("en")).not.toThrow();
    expect(store.get()).toBe("en");
    expect(warn).toHaveBeenCalled();
  });
});
