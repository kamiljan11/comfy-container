import { useEffect, useRef, useState } from "react";
import { type Lang } from "../i18n";
import { embedUrl, watchUrl } from "../lib/youtube";

/**
 * A YouTube video in a blog post (ADR 0009). Until the reader clicks, this is
 * our own poster image and a button: the browser makes no request to YouTube,
 * so the page keeps its "no third-party cookies" promise. The click swaps in
 * the youtube-nocookie player, which then starts playing; focus moves into it
 * so a keyboard or screen reader user is not thrown back to the top of the page.
 */

const COPY: Record<Lang, { play: string; note: string; open: string }> = {
  pl: {
    play: "Odtwórz film",
    note: "Po kliknięciu film ładuje się z YouTube (Google).",
    open: "Otwórz na YouTube",
  },
  en: {
    play: "Play the video",
    note: "After the click the video loads from YouTube (Google).",
    open: "Open on YouTube",
  },
};

export function YouTubeFacade({
  id,
  title,
  poster,
  lang,
}: {
  id: string;
  title: string;
  poster: string;
  lang: Lang;
}) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing]);
  const c = COPY[lang];
  return (
    <figure className="post-video">
      <div className="post-video-frame">
        {playing ? (
          <iframe
            ref={frame}
            src={embedUrl(id)}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="post-video-play"
            onClick={() => setPlaying(true)}
            aria-label={`${c.play}: ${title}`}
          >
            <img src={poster} alt="" width={1280} height={720} loading="lazy" decoding="async" />
            <span className="post-video-icon" aria-hidden="true" />
          </button>
        )}
      </div>
      <figcaption>
        {c.note}{" "}
        <a href={watchUrl(id)} target="_blank" rel="noreferrer">
          {c.open} ↗
        </a>
      </figcaption>
    </figure>
  );
}
