# Image Assets Manifest — myspiritway.org CloudFront Mirror Plan

Every image hosted on Systeme.io's CloudFront CDN (`d1yei2z3i6k35z.cloudfront.net`) that appears across the live myspiritway.org pages. When/if Kamil's Systeme.io subscription expires, those URLs will eventually 404 — this manifest is the recovery plan: download each one and re-host it under `/public/images/` in this repo.

**Source CDN host:** `d1yei2z3i6k35z.cloudfront.net`
**Account prefix:** `/6584575/` (Kamil's Systeme.io workspace ID) plus a small number of platform-common assets under `/systeme-common/`.
**Status:** **Manifest only.** No binaries have been mirrored yet — that work is deferred to a dedicated pass (see "How to mirror" at the bottom).

Pages audited: 12 (one returned no CloudFront images — `kursmarketing` is hosted with Unsplash hero only).

---

## 1. Home — `/` (https://www.myspiritway.org/)

The linktree-style landing page. Mostly card thumbnails + the OG share image.

| URL                                                                                               | alt                     | context                                                                                 | Recommended mirror filename      |
| ------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------- | -------------------------------- |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65ff15fd13741_FB_IMG_1696238558446.jpg`            | MySpiritWay - Main Page | OG share image (meta `og:image`)                                                        | `og-myspiritway-home.jpg`        |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/69123fae6467a_Untitleddesign9.png`                 | (none)                  | Hero — Kamil Jan portrait / brand mark above bio                                        | `hero-kamiljan-portrait.png`     |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/691b494212723_ChatGPTImageNov17202504_10_59PM.png` | (none)                  | Marketing card 1 — links to /clarity (FREE Clarity Call)                                | `card-clarity-call.png`          |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/691b4a9020aa6_ChatGPTImageNov17202504_17_10PM.png` | (none)                  | Marketing card 2 — links to /spiritual-marketing (Marketing Services)                   | `card-marketing-services.png`    |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/691b4b5767076_ChatGPTImageNov17202504_20_31PM.png` | (none)                  | Marketing card 3 — Articles / Blog tile                                                 | `card-articles-blog.png`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/691b4c7d405d3_ChatGPTImageNov17202504_24_44PM.png` | (none)                  | Marketing card 4 — YouTube Playlist tile                                                | `card-youtube-playlist.png`      |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/691b492380237_ChatGPTImageNov17202504_10_59PM.png` | (none)                  | Mobile-variant Clarity Call card (separate upload, near-identical to card-clarity-call) | `card-clarity-call-mobile.png`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/69125643ec811_6857e82d4ad8b_Beztytułu.png`         | (none)                  | Practical Spirituality section — SPS guidebook cover thumbnail (links to /sps2)         | `sps-guidebook-cover.png`        |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/691487b9efd2c_myspiritway-privacy-policy.pdf`      | (PDF, not img)          | Footer Privacy Policy PDF link                                                          | `myspiritway-privacy-policy.pdf` |

---

## 2. SPS Complete — `/sps` (https://www.myspiritway.org/sps)

Long-form guidebook page. Heavy use of classical / alchemical art illustrations alongside hero portrait and brand marks.

| URL                                                                                                                                                 | alt    | context                                                            | Recommended mirror filename           |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ | ------------------------------------- |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d211fd285ac_Snapinsta.app_234080060_361649882303649_4034891747535150283_n_1080.jpg`                | (none) | Hero — Kamil portrait (same shot reused on /dmt)                   | `hero-kamiljan-portrait-square.jpg`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65f2f02aa5584_PRACTICALSPI.png`                                                                      | (none) | "Practical Spirituality" brand wordmark / title image              | `wordmark-practical-spirituality.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67bf446952d4b_Untitleddesign1.jpg`                                                                   | (none) | Section intro image                                                | `sps-section-intro.jpg`               |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67c331b0998e8_images.png`                                                                            | (none) | Inline graphic                                                     | `sps-inline-graphic.png`              |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eda8397d647_europe.mpi.p1.100.jpg`                                                                 | (none) | Map of Europe — religious/spiritual demographics figure            | `sps-europe-religion-map.jpg`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67ee8fffb5c3d_WilliamPrestonakaBro.WilliamPreston17421818-TheEyeOfProvidence..jpg`                   | (none) | Illustration — William Preston "Eye of Providence"                 | `art-eye-of-providence.jpg`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67ee99e952620_Oversoul-Alex-Grey-2.webp`                                                             | (none) | Illustration — Alex Grey "Oversoul"                                | `art-alex-grey-oversoul.webp`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67ee9ca45ca9e_The-Green-Lion-Devouring-the-Sun-D.-Stolcius-von-Stolcenberg-Viridarium-chymicum.webp` | (none) | Alchemical art — Green Lion Devouring the Sun (Stolcius)           | `art-green-lion-devouring-sun.webp`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eea0188fc9a_Jacobs-Dream-1805-2.webp`                                                              | (none) | Classical art — Jacob's Dream (1805)                               | `art-jacobs-dream.webp`               |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eea5f6ec0f0_PainttheUniverse.jpg`                                                                  | (none) | Illustration — Paint the Universe                                  | `art-paint-the-universe.jpg`          |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eea7c228bf1_At_Eternitys_Gate_-_Vincent_Van_Gogh.jpg`                                              | (none) | Van Gogh — At Eternity's Gate                                      | `art-van-gogh-at-eternitys-gate.jpg`  |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eea7f0a692c_Emblem21MichaelMaierAtalantaFugiens1617.webp`                                          | (none) | Alchemical art — Michael Maier, Atalanta Fugiens, Emblem 21 (1617) | `art-atalanta-fugiens-emblem21.webp`  |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eecd95d0a3e_Michelangelo_-_Creation_of_Adam_cropped.jpg`                                           | (none) | Michelangelo — Creation of Adam (cropped)                          | `art-creation-of-adam.jpg`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eece9a60b84_Zrzutekranu2025-04-03180801.png`                                                       | (none) | Diagram / screenshot — section illustration                        | `sps-diagram-screenshot-1.png`        |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67eee31f2c27a_ENBwGi2X0AAxG85-1424540358.jpeg`                                                       | (none) | Illustration                                                       | `sps-illustration-extra.jpeg`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6810c129f1983_65f2f1ab9ea9a_Untitleddesign.png`                                                      | (none) | MySpiritWay logo / brand mark (footer / CTA)                       | `brand-myspiritway-logo.png`          |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6857fcb59df54_Beztytułu.png`                                                                         | (none) | Cover / section graphic                                            | `sps-cover-section.png`               |

---

## 3. SPS Short — `/sps2` (https://www.myspiritway.org/sps2)

The short-form guidebook. Topic header illustrations + payment QR codes in support section.

| URL                                                                                                                              | alt     | context                                        | Recommended mirror filename             |
| -------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------- | --------------------------------------- |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65b3f0ce5db2f_Untitleddesign5.png`                                                | (none)  | Wire Transfer / payment section icon           | `payment-wire-transfer-icon.png`        |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65f2f02aa5584_PRACTICALSPI.png`                                                   | (none)  | "Practical Spirituality" wordmark              | `wordmark-practical-spirituality.png`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg`                                           | (none)  | Footer brand image / logo                      | `footer-brand-myspiritway.jpg`          |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67d98f462827f_484172646_1141710261026737_3886101644250262580_n.jpg`               | (none)  | BTC payment QR code                            | `payment-btc-qr.jpg`                    |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c09f82966_bmc_qr.png`                                                         | (none)  | Buy Me a Coffee QR code                        | `payment-buymeacoffee-qr.png`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c468cb494_486068020_1685111692420873_2519918393272156060_n.jpg`               | (none)  | ETH payment QR code                            | `payment-eth-qr.jpg`                    |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c500b4308_qrcode.png`                                                         | (none)  | Ko-Fi QR code                                  | `payment-kofi-qr.png`                   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/684edbe4ba0e7_ChatGPTImageJun15202504_42_35PM.png`                                | (none)  | Section graphic                                | `sps2-section-graphic-1.png`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/684ee1640efb0_ChatGPTImageJun15202505_06_00PM.png`                                | (none)  | Section graphic                                | `sps2-section-graphic-2.png`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/684eeaf2962e3_ChatGPTImageJun15202505_46_45PM.png`                                | (none)  | Section graphic                                | `sps2-section-graphic-3.png`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/684eeba14ef85_683494b851212_398144160_6738014629569555_892258626759783772_n1.jpg` | (none)  | Kamil Jan portrait variant                     | `sps2-kamil-portrait.jpg`               |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6857e82d4ad8b_Beztytułu.png`                                                      | (none)  | SPS guidebook cover (also reused on home)      | `sps-guidebook-cover.png`               |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685af2e564313_whatiscoreofsufferingfin.jpg`                                       | (none)  | Topic header — "What is the Core of Suffering" | `topic-core-of-suffering.jpg`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685af6cac5f67_spirituality.jpg`                                                   | (none)  | Topic header — "What is Spirituality"          | `topic-what-is-spirituality.jpg`        |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685af6d741941_concioussnes.jpg`                                                   | (none)  | Topic header — "What is Consciousness"         | `topic-what-is-consciousness.jpg`       |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685af6ea84dac_evolution.jpg`                                                      | (none)  | Topic header — "What is Evolution"             | `topic-what-is-evolution.jpg`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685af721245c4_levels.jpg`                                                         | (none)  | Topic header — "Levels of Consciousness"       | `topic-levels-of-consciousness.jpg`     |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685af72fb4840_peak.jpg`                                                           | (none)  | Topic header — "Peak Experiences"              | `topic-peak-experiences.jpg`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685b0321428de_central.jpg`                                                        | (none)  | Topic header — "Why Evolution is Central"      | `topic-why-evolution-central.jpg`       |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685efe8bc78a2_completelasting.jpg`                                                | (none)  | Topic header — "Complete Lasting Happiness"    | `topic-complete-lasting-happiness.jpg`  |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/685effdf518c2_practicalspirituality.jpg`                                          | (none)  | Topic header — "Practical Spirituality"        | `topic-practical-spirituality.jpg`      |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686270e127181_12.jpg`                                                             | (none)  | Section illustration #12                       | `sps2-section-12.jpg`                   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686270fd5e121_13.jpg`                                                             | (none)  | Section illustration #13                       | `sps2-section-13.jpg`                   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6862710fa65fe_14.jpg`                                                             | (none)  | Section illustration #14                       | `sps2-section-14.jpg`                   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6863b6fb88085_pathfixed.jpg`                                                      | (none)  | Section illustration — "Path"                  | `sps2-section-path.jpg`                 |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686429b84e8da_sessions.jpg`                                                       | (none)  | Section illustration — Activation Sessions     | `sps2-section-sessions.jpg`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6864313032e02_midset.jpg`                                                         | (none)  | Section illustration — Mindset                 | `sps2-section-mindset.jpg`              |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686436b92a88c_best.jpg`                                                           | (none)  | Section illustration — "Best"                  | `sps2-section-best.jpg`                 |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6866d601e02ad_healthyway.jpg`                                                     | (none)  | Section illustration — "Healthy Way"           | `sps2-section-healthyway.jpg`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68681cb009070_cultivate.jpg`                                                      | (none)  | Section illustration — "Cultivate"             | `sps2-section-cultivate.jpg`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a60c812398_coreofsuffering.mp3`                                                | (audio) | MP3 narration — Core of Suffering              | `audio-coreofsuffering.mp3`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a60ddf410c_whatisspirituality.mp3`                                             | (audio) | MP3 narration — What is Spirituality           | `audio-whatisspirituality.mp3`          |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a60f50dc4b_whatisconcioussnes.mp3`                                             | (audio) | MP3 narration — What is Consciousness          | `audio-whatisconsciousness.mp3`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a611270d91_whatisevolution.mp3`                                                | (audio) | MP3 narration — What is Evolution              | `audio-whatisevolution.mp3`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a6128aa3e1_whatarelevelsofconcioussness.mp3`                                   | (audio) | MP3 narration — Levels of Consciousness        | `audio-levelsofconsciousness.mp3`       |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a61b3d669e_peakexperiences.mp3`                                                | (audio) | MP3 narration — Peak Experiences               | `audio-peakexperiences.mp3`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a61e1a7a4b_whyevolutioncentral.mp3`                                            | (audio) | MP3 narration — Why Evolution is Central       | `audio-whyevolutioncentral.mp3`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a62033c8f5_whatislifehappines.mp3`                                             | (audio) | MP3 narration — Life Happiness                 | `audio-whatislifehappiness.mp3`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/686a7983601f8_whatisthepracticalspirtiaulity.mp3`                                 | (audio) | MP3 narration — Practical Spirituality         | `audio-whatispracticalspirituality.mp3` |

> Note: the SPS2 page also references the same brand/footer assets cataloged in §1 (`660c0839aab6d_FB_IMG_1696238558446.jpg` etc.) — those are deduplicated above.

---

## 4. DMT — `/dmt` (https://www.myspiritway.org/dmt)

Dynamic Meditation Technique landing page. Hero + 8 benefit icons + testimonial avatars.

| URL                                                                                                                                  | alt                                | context                                                                          | Recommended mirror filename             |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------- |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65ff0b44b6dea_FB_IMG_1696238558446.ico`                                               | DMT - Dynamic Meditation Technique | OG share image (favicon-style)                                                   | `og-dmt.ico`                            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d211fd285ac_Snapinsta.app_234080060_361649882303649_4034891747535150283_n_1080.jpg` | (none)                             | Hero — Kamil Jan portrait (top of page)                                          | `hero-kamiljan-portrait-square.jpg`     |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65b37a3b275af_kamiljanmyspiritway2.jpg`                                               | (none)                             | About Creator section — second Kamil portrait                                    | `about-kamiljan-portrait-2.jpg`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d219599b42f_1.png`                                                                  | (none)                             | Benefit icon 1 — EMOTIONAL RELEASE                                               | `dmt-benefit-1-emotional-release.png`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d21960d6041_2.png`                                                                  | (none)                             | Benefit icon 2 — TRAUMA PROCESSING                                               | `dmt-benefit-2-trauma-processing.png`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d21968b3d16_3.png`                                                                  | (none)                             | Benefit icon 3 — DEEP TRANSFORMATION                                             | `dmt-benefit-3-deep-transformation.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d2196fccdb9_4.png`                                                                  | (none)                             | Benefit icon 4 — INTUITIVE GUIDANCE                                              | `dmt-benefit-4-intuitive-guidance.png`  |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d219791ef44_5.png`                                                                  | (none)                             | Benefit icon 5 — EXPERIENCE DEEP MEDITATION                                      | `dmt-benefit-5-deep-meditation.png`     |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d2198006766_6.png`                                                                  | (none)                             | Benefit icon 6 — POWERFUL ENERGY HEALING                                         | `dmt-benefit-6-energy-healing.png`      |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d219a504083_7.png`                                                                  | (none)                             | Benefit icon 7 — SUPERCHARGE MANIFESTATION                                       | `dmt-benefit-7-manifestation.png`       |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d219ad056f4_8.png`                                                                  | (none)                             | Benefit icon 8 — SPIRITUAL AWAKENING                                             | `dmt-benefit-8-spiritual-awakening.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/systeme-common/5dcedd71685e4_images1.png`                                                     | (none)                             | Testimonial — default 5-star rating image (Systeme.io shared asset, repeated 5x) | `testimonial-stars-5.png`               |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/662807e164f79_1.png`                                                                  | (none)                             | Testimonial avatar 1 — Radek Polewczak                                           | `testimonial-avatar-radek.png`          |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/662808019289f_2.png`                                                                  | (none)                             | Testimonial avatar 2 — Nikola Turek                                              | `testimonial-avatar-nikola.png`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg`                                               | (none)                             | Footer brand image / logo                                                        | `footer-brand-myspiritway.jpg`          |

---

## 5. DMT Practice — `/dmtpractice` (https://www.myspiritway.org/dmtpractice)

The actual guided-practice landing (recording + payment options).

| URL                                                                                                                | alt    | context                      | Recommended mirror filename      |
| ------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------- | -------------------------------- |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67d98f462827f_484172646_1141710261026737_3886101644250262580_n.jpg` | (none) | BTC payment QR               | `payment-btc-qr.jpg`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c468cb494_486068020_1685111692420873_2519918393272156060_n.jpg` | (none) | ETH payment QR               | `payment-eth-qr.jpg`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65b3f0ce5db2f_Untitleddesign5.png`                                  | (none) | Wire transfer / payment icon | `payment-wire-transfer-icon.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c09f82966_bmc_qr.png`                                           | (none) | Buy Me a Coffee QR           | `payment-buymeacoffee-qr.png`    |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c500b4308_qrcode.png`                                           | (none) | Ko-Fi QR                     | `payment-kofi-qr.png`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg`                             | (none) | Footer brand image / logo    | `footer-brand-myspiritway.jpg`   |

---

## 6. IYSS — `/iyss` (https://www.myspiritway.org/iyss)

Integrate Your Shattered Self squeeze page. Hero orb illustration + 6 benefit icons + guide portrait.

| URL                                                                                                                                                                                                                         | alt    | context                                           | Recommended mirror filename           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------- | ------------------------------------- |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67420ebe3e1cb_DALLE2024-11-2317.19.54-Amesmerizingsceneofagoldenglowingorbemittingradiantlightsurroundedbydarkness.Theorbisatthecenterandintricatesacredgeometrysh.webp`     | (none) | Hero — golden glowing orb with sacred geometry    | `iyss-hero-golden-orb.webp`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/674222f6f28b5_DALLE2024-11-2318.45.59-AsimpleminimalisticiconrepresentingReleaseEmotionalTrauma.Thedesignfeaturesahumansilhouettewithasoftglowingheartandgentleupwa.webp`    | (none) | Benefit icon — Release Emotional Trauma           | `iyss-benefit-release-trauma.webp`    |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/674233af3a819_DALLE2024-11-2319.43.10-AminimalisticiconrepresentingSupportCompleteLifeSatisfaction.Theiconfeaturesahumansilhouettesurroundedbyaradiantcircularglowsym.webp`  | (none) | Benefit icon — Reduce Stress / Deeply Relax       | `iyss-benefit-reduce-stress.webp`     |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6742339ed3995_DALLE2024-11-2319.43.14-AminimalisticiconrepresentingAccelerateSpiritualGrowth.Thedesignfeaturesahumansilhouettewithsoftradiantlightbeamsemanatingupward.webp` | (none) | Benefit icon — Accelerate Spiritual Growth        | `iyss-benefit-spiritual-growth.webp`  |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6742230908f5b_DALLE2024-11-2318.46.05-AcleanandminimalisticiconrepresentingDeepSelf-Awareness.Thedesignfeaturesahumansilhouettewithaglowinglightradiatingfromthehead.webp`   | (none) | Benefit icon — Deep Self-Awareness                | `iyss-benefit-self-awareness.webp`    |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6742337e4a852_DALLE2024-11-2319.43.22-AminimalisticiconrepresentingEnvisionaPositiveFuture.Thedesignfeaturesahumansilhouettestandingwithanoutstretchedarmpointingtowar.webp` | (none) | Benefit icon — Envision a Positive Future         | `iyss-benefit-positive-future.webp`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6742338ff1dc8_DALLE2024-11-2319.48.59-AminimalisticiconrepresentingSupportCompleteLifeSatisfaction.Theiconfeaturesacleanandmodernwheeldividedintobalancedsectionssymb.webp`  | (none) | Benefit icon — Support Complete Life Satisfaction | `iyss-benefit-life-satisfaction.webp` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67423572662b3_Untitleddesign1.jpg`                                                                                                                                           | (none) | "Meet Your Guide" — Kamil Jan portrait            | `iyss-guide-kamiljan.jpg`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg`                                                                                                                                      | (none) | Footer brand image / logo                         | `footer-brand-myspiritway.jpg`        |

---

## 7. About — `/aboutkamiljan` (https://www.myspiritway.org/aboutkamiljan)

| URL                                                                                           | alt    | context                         | Recommended mirror filename    |
| --------------------------------------------------------------------------------------------- | ------ | ------------------------------- | ------------------------------ |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65f2f1ab9ea9a_Untitleddesign.png`              | (none) | Hero — MySpiritWay brand mark   | `brand-myspiritway-design.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67f16bad13d72_Zrzutekranu2025-04-05174257.jpg` | (none) | About section — Kamil Jan photo | `about-kamiljan-photo.jpg`     |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg`        | (none) | Footer brand image / logo       | `footer-brand-myspiritway.jpg` |

---

## 8. Support — `/support_myspiritway` (https://www.myspiritway.org/support_myspiritway)

| URL                                                                                                                | alt    | context                       | Recommended mirror filename      |
| ------------------------------------------------------------------------------------------------------------------ | ------ | ----------------------------- | -------------------------------- |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65f2f1ab9ea9a_Untitleddesign.png`                                   | (none) | Hero — MySpiritWay brand mark | `brand-myspiritway-design.png`   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67d98f462827f_484172646_1141710261026737_3886101644250262580_n.jpg` | (none) | BTC payment QR                | `payment-btc-qr.jpg`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c468cb494_486068020_1685111692420873_2519918393272156060_n.jpg` | (none) | ETH payment QR                | `payment-eth-qr.jpg`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65b3f0ce5db2f_Untitleddesign5.png`                                  | (none) | Wire transfer / payment icon  | `payment-wire-transfer-icon.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c09f82966_bmc_qr.png`                                           | (none) | Buy Me a Coffee QR            | `payment-buymeacoffee-qr.png`    |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/67e9c500b4308_qrcode.png`                                           | (none) | Ko-Fi QR                      | `payment-kofi-qr.png`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg`                             | (none) | Footer brand image / logo     | `footer-brand-myspiritway.jpg`   |

---

## 9. Contact — `/contact-myspiritway` (https://www.myspiritway.org/contact-myspiritway)

| URL                                                                                    | alt    | context                       | Recommended mirror filename    |
| -------------------------------------------------------------------------------------- | ------ | ----------------------------- | ------------------------------ |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/65f2f1ab9ea9a_Untitleddesign.png`       | (none) | Hero — MySpiritWay brand mark | `brand-myspiritway-design.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg` | (none) | Footer brand image / logo     | `footer-brand-myspiritway.jpg` |

---

## 10. Clarity Call — `/clarity` (https://www.myspiritway.org/clarity)

The FREE Clarity Call sales page. Heavier visual treatment — arrows, calendar tiles, ChatGPT-generated module illustrations.

| URL                                                                                                                        | alt            | context                                                                        | Recommended mirror filename                |
| -------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68e6a291984f9_arrow_down_spiritual_business.jpg`                            | (none)         | Decorative downward arrow (used 3x as section separator)                       | `clarity-arrow-down.jpg`                   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/690f6b705eae5_Untitled1080x1080px.jpg`                                      | (none)         | Hero / section graphic 1080×1080 (used 2x)                                     | `clarity-hero-1080.jpg`                    |
| `https://d1yei2z3i6k35z.cloudfront.net/systeme-common/5dd111c650cbd_images3.png`                                           | (none)         | Testimonial quote mark (Systeme.io shared asset, repeated 4x for testimonials) | `testimonial-quote-mark.png`               |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6904d7dc6d030_calendar.jpg`                                                 | (none)         | "How to Book" step 1 — Calendar icon                                           | `clarity-step1-calendar.jpg`               |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/690f6e8da5eb5_Untitled718x610px.jpg`                                        | (none)         | "How to Book" step 2 — Prep Questions illustration                             | `clarity-step2-prep-questions.jpg`         |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/690f6f4b25705_Google-Meet-PWA-Chromebook-Chrome-OS.webp`                    | (none)         | "How to Book" step 3 — Google Meet confirmation icon                           | `clarity-step3-google-meet.webp`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6910723bdd520_Untitleddesign11.jpg`                                         | (none)         | "How to Book" step 4 — Clarity Meeting illustration (desktop variant)          | `clarity-step4-meeting.jpg`                |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/69107fa7c94d2_Untitled718x610px2.jpg`                                       | (none)         | "How to Book" step 2 mobile variant                                            | `clarity-step2-prep-questions-mobile.jpg`  |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68e6a764052e2_kamiljanpracticalmarketing.jpg`                               | (none)         | "Who You'll Meet" — Kamil Jan portrait                                         | `clarity-kamiljan-portrait.jpg`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6901318f3d2e8_Purpouse2.png`                                                | (none)         | Bottom checklist signup graphic (used 2x desktop+mobile)                       | `clarity-purpose-checklist.png`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68e2a609e5e5a_660c0839aab6d_FB_IMG_1696238558446-removebg-preview.png`      | (none)         | Footer brand mark (transparent)                                                | `footer-brand-myspiritway-transparent.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68e7a5fae467d_MySpiritWay_Privacy_Terms_Disclaimer_UPDATED-claritycall.pdf` | (PDF, not img) | Footer Privacy/Terms/Disclaimer PDF (updated for Clarity Call)                 | `myspiritway-privacy-terms-disclaimer.pdf` |

---

## 11. Spiritual Marketing — `/spiritual-marketing` (https://www.myspiritway.org/spiritual-marketing)

The paid services pricing page. Testimonial cards + path/plan illustrations + guarantee badges.

| URL                                                                                                                         | alt    | context                                                                 | Recommended mirror filename                |
| --------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------- | ------------------------------------------ |
| `https://d1yei2z3i6k35z.cloudfront.net/systeme-common/5dcedd1ad5420_images2.png`                                            | (none) | Testimonial quote mark (Systeme.io shared asset, repeated 3x)           | `testimonial-quote-mark-2.png`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68ecee9666ca3_kamiljanpciture3.jpg`                                          | (none) | "Kamil Jan — Spiritual Business Mentor" portrait                        | `marketing-kamiljan-portrait-3.jpg`        |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68e6a291984f9_arrow_down_spiritual_business.jpg`                             | (none) | Decorative downward arrow                                               | `clarity-arrow-down.jpg`                   |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/690762ac46571_gears.gif`                                                     | (none) | Animated GIF — "gears" illustrating the 7-module system                 | `marketing-gears-animation.gif`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/69077edd7d292_ChatGPTImageNov2202503_54_57PM.png`                            | (none) | Plan illustration — Single-Problem Fix                                  | `marketing-plan-single-fix.png`            |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/69077f8495a4a_ChatGPTImageNov2202503_57_48PM.png`                            | (none) | Plan illustration — Weekly Guidance (used 2x)                           | `marketing-plan-weekly-guidance.png`       |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/690ba1cc581d4_ChatGPTImageNov5202507_07_02PM.png`                            | (none) | Plan illustration — Done-For-You Setup                                  | `marketing-plan-dfy-setup.png`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6907dc6a52bd3_BlackandWhiteGradientModernComingSoonSquareInstagramPost1.jpg` | (none) | "We deeply believe in quality" intro card (jpg variant)                 | `marketing-quality-intro.jpg`              |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/690759398cbd7_ChatGPTImageNov2202501_14_24PM.png`                            | (none) | Trust badge — 10+ Years of Experience                                   | `marketing-badge-10-years.png`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6922dbedbc565_ChatGPTImageNov23202510_03_17AM.png`                           | (none) | Trust badge — Only 10 Open Slots                                        | `marketing-badge-10-slots.png`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/69075892d453f_ChatGPTImageNov2202501_11_38PM.png`                            | (none) | Trust badge — Price Will Go Up                                          | `marketing-badge-price-up.png`             |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/69073b4a35c17_ChatGPTImageNov2202511_06_21AM.png`                            | (none) | Trust badge — Money Back Guarantee                                      | `marketing-badge-money-back.png`           |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/6907dd6e39806_BlackandWhiteGradientModernComingSoonSquareInstagramPost1.png` | (none) | "We deeply believe in quality" intro card (png variant — repeat of jpg) | `marketing-quality-intro.png`              |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/690394aa43dbe_6810c129f1983_65f2f1ab9ea9a_Untitleddesign.png`                | (none) | Bottom CTA — "Ready to move from insight to implementation?" brand mark | `marketing-cta-brand.png`                  |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68e2a609e5e5a_660c0839aab6d_FB_IMG_1696238558446-removebg-preview.png`       | (none) | Footer brand mark (transparent, used 2x)                                | `footer-brand-myspiritway-transparent.png` |
| `https://d1yei2z3i6k35z.cloudfront.net/6584575/68e7a5fae467d_MySpiritWay_Privacy_Terms_Disclaimer_UPDATED-claritycall.pdf`  | (PDF)  | Footer Privacy/Terms/Disclaimer PDF                                     | `myspiritway-privacy-terms-disclaimer.pdf` |

---

## 12. Kurs Marketing — `/kursmarketing` (https://www.myspiritway.org/kursmarketing)

Polish-language digital marketing course landing page operated by Mountain All Service ehf.

**No CloudFront images.** This page's only image asset is an Unsplash photo (`https://images.unsplash.com/photo-1552664730-d307ca884978`) used as the certification hero. No mirroring is needed from CloudFront — Unsplash URLs are stable and externally hosted.

---

## Summary

| Page                             |                                               Unique CloudFront URLs |
| -------------------------------- | -------------------------------------------------------------------: |
| `/` (home)                       |                                                      9 (incl. 1 PDF) |
| `/sps`                           |                                                                   17 |
| `/sps2`                          |                                                    39 (incl. 9 MP3s) |
| `/dmt`                           |                                                                   15 |
| `/dmtpractice`                   |                                                                    6 |
| `/iyss`                          |                                                                    9 |
| `/aboutkamiljan`                 |                                                                    3 |
| `/support_myspiritway`           |                                                                    7 |
| `/contact-myspiritway`           |                                                                    2 |
| `/clarity`                       |                                                     12 (incl. 1 PDF) |
| `/spiritual-marketing`           |                                                     16 (incl. 1 PDF) |
| `/kursmarketing`                 |                                                                    0 |
| **Total references**             |                                                              **135** |
| **Unique URLs across all pages** | **~95** (many assets reused — footer logo, payment QRs, brand marks) |

---

## How to Mirror

When Kamil's Systeme.io subscription expires and the CloudFront URLs start returning 404, run the following one-shot rescue pass (deferred from this task — binary upload via the GitHub API is fiddly and deserves its own dedicated agent run):

1. **Spin up a local clone** of `kamiljan11/comfy-container`, create branch `chore/mirror-cdn-images`.
2. **Download each unique URL** in this manifest into `public/images/<recommended-filename>` using `curl`/`wget`. For example:
   ```bash
   mkdir -p public/images
   curl -L "https://d1yei2z3i6k35z.cloudfront.net/6584575/65d211fd285ac_Snapinsta.app_234080060_361649882303649_4034891747535150283_n_1080.jpg" \
     -o public/images/hero-kamiljan-portrait-square.jpg
   ```
   (The audio MP3s and PDFs go into `public/audio/` and `public/docs/` respectively — same idea.)
3. **Search & replace** the CloudFront URLs across the TanStack route files (`src/routes/spirituality/**/*.tsx`) with the new relative paths, e.g. replace
   `https://d1yei2z3i6k35z.cloudfront.net/6584575/65d211fd285ac_Snapinsta.app_234080060_361649882303649_4034891747535150283_n_1080.jpg`
   with
   `/images/hero-kamiljan-portrait-square.jpg`.
   ripgrep + sed makes this trivial:
   ```bash
   rg -l "d1yei2z3i6k35z\.cloudfront\.net" src/ | xargs sed -i 's|...|...|g'
   ```
4. **Commit** as `chore: mirror Systeme.io CDN images locally — break dependency on d1yei2z3i6k35z.cloudfront.net` and open a PR. Verify each page in dev that no broken-image icons remain.
5. **Bonus:** add a tiny script (`scripts/check-cdn-refs.mjs`) that fails CI if any new `d1yei2z3i6k35z.cloudfront.net` URLs creep back in.

Until then this manifest stands as the authoritative source-of-truth list for what needs to come down.
