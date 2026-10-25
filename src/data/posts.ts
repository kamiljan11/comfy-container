import { type Lang } from "../i18n";

/**
 * Blog posts. Content is data, not JSX, so a post is added here and nowhere
 * else: /blog lists this array and /blog/$slug renders one entry.
 *
 * Text blocks may carry links written as [label](https://…); `inlineSegments` in
 * src/lib/inline.ts turns them into anchors. Every fact in a post has to come
 * from its source (for claude-autoshutdown: the repo README and code, checked
 * on 2026-09-21).
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; id: string; text: string }
  | { t: "list"; items: string[] }
  | { t: "code"; code: string }
  | { t: "img"; src: string; alt: string; caption: string; width: number; height: number }
  /** one of Kamil's own videos; `poster` is a local copy of its thumbnail (ADR 0009) */
  | { t: "youtube"; id: string; title: string; poster: string };

export type PostBody = {
  title: string;
  description: string;
  lead: string;
  blocks: Block[];
};

export type Post = {
  slug: string;
  /** ISO date, shown as the publication date */
  date: string;
  repo?: string;
  /**
   * Set when the full text was published elsewhere (ADR 0007). The post is then
   * a short teaser in our own words and links out; it never copies the article.
   */
  external?: { url: string; source: string };
  /** Thumbnail on the /blog list; every post has one (ADR 0007, revision). */
  cover: { src: string; width: number; height: number; alt: Record<Lang, string> };
  body: Record<Lang, PostBody>;
};

const GLOS_WNUCZKA = "https://torzeszow.pl/news/oszusci-moga-podrobic-glos-wnuczka";
const CZATBOT =
  "https://torzeszow.pl/news/czatbot-musi-powiedziec-ze-nie-jest-czlowiekiem-od-28-pazdziernika-mozna-zlozyc-skarge";
const LEKARZ =
  "https://torzeszow.pl/news/lekarz-rodzinny-sprawdzal-diagnoze-w-chatgpt-przepisy-czy-tak-wolno";
const ANNA =
  "https://torzeszow.pl/news/przed-wizyta-u-kardiologa-dzwoni-anna-z-116-117-to-automat-ktory-nie-zapyta-o-pesel";
const MIT_NANDA = "https://www.media.mit.edu/groups/nanda/overview/";
const FORTUNE =
  "https://fortune.com/2025/08/19/shadow-ai-economy-mit-study-genai-divide-llm-chatbots/";
const VIDEO_95 = {
  t: "youtube",
  id: "DogPvuwTPBI",
  poster: "/blog/95-procent-firm-bez-zwrotu-z-ai/cover.webp",
} as const;

const MONITOR = {
  t: "img",
  src: "/blog/claude-autoshutdown/monitor.webp",
  width: 1600,
  height: 970,
} as const;

export const POSTS: Post[] = [
  {
    // every fact below is from the video as published on YouTube on 2026-10-25
    // (its description and the Polish captions, checked on 2026-10-25)
    slug: "95-procent-firm-bez-zwrotu-z-ai",
    date: "2026-10-25",
    // the video's own thumbnail (our design), copied locally, never hotlinked
    cover: {
      src: "/blog/95-procent-firm-bez-zwrotu-z-ai/cover.webp",
      width: 1280,
      height: 720,
      alt: {
        pl: "Kamil Jan mówi do kamery, obok napis: 95% firm bez zwrotu z AI, 3 zasady, które działają.",
        en: "Kamil Jan talking to the camera next to the Polish caption: 95% of companies with no return from AI, 3 rules that work.",
      },
    },
    body: {
      pl: {
        title: "95% firm nie widzi zysku z AI. Byłem w tych 95%",
        description:
          "Nowy film: trzy zasady, których trzymam się przy wdrożeniach AI w firmach, historia aplikacji z 64 ekranami i jednym zleceniem oraz 5 pytań, które zadaję, zanim cokolwiek zbuduję.",
        lead: "Według badania MIT 95% firm, które inwestują w AI, nie widzi z tego zwrotu. Przez długi czas sam byłem w tych 95%: budowałem narzędzia, które nie zarobiły ani złotówki. Nagrałem o tym film.",
        blocks: [
          { ...VIDEO_95, title: "95% firm nie widzi zysku z AI. Byłem w tych 95%" },
          {
            t: "p",
            text: "To 95% nie znaczy, że AI nie działa. W tym samym badaniu w ponad 90% firm pracownicy używają AI na własną rękę, z prywatnych kont. Kłopot zaczyna się wtedy, gdy AI ma obsługiwać codzienne procesy całej firmy: zamówienia, faktury, obieg dokumentów. Tym kawałkiem się zajmuję.",
          },
          { t: "h2", id: "trzy-zasady", text: "Trzy zasady" },
          {
            t: "list",
            items: [
              "**Buduję tylko tam, gdzie coś mocno boli.** Firma zapłaci za rozwiązanie, gdy umie policzyć, ile dziś kosztuje ją problem. Głośne nie znaczy drogie, a prawdziwy ból bywa cichy: ktoś od lat robi nudną rzecz i przestał ją zauważać.",
              "**Wdrażam tak, żeby po miesiącu ludzie dalej z tego korzystali.** Większość projektów nie umiera przy budowaniu, tylko między próbnym wdrożeniem a zwykłym poniedziałkiem.",
              "**Biorę jeden proces na raz, a nie całą firmę.** Wpadkę przy jednym procesie i jednej osobie poprawia się w dzień albo dwa. Wpadka w całej firmie dotyka wszystkich i projekt ląduje w szufladzie.",
            ],
          },
          { t: "h2", id: "64-ekrany", text: "Aplikacja z 64 ekranami i jednym zleceniem" },
          {
            t: "p",
            text: "W filmie opowiadam o własnej wpadce. Aplikacja do prowadzenia warsztatu samochodowego miała około 64 ekranów. Kiedy zajrzałem do niej po jakimś czasie, było w niej jedno zlecenie. Funkcji nie brakowało. Brakowało zmiany sposobu pracy, bo ludzie dalej robili wszystko po staremu. Ta aplikacja przeszła od tamtej pory dużą zmianę, opisałem ją w [case studies](/case-studies#ai-native-workshop-management).",
          },
          { t: "h2", id: "po-oddaniu", text: "Co robię po oddaniu narzędzia" },
          {
            t: "p",
            text: "Siadam z ludźmi, którzy będą z niego korzystać, i patrzę, gdzie się potykają. W aplikacji buduję panel wdrożeniowca: kto w tym tygodniu się logował, ile zamówień przeszło przez system w porównaniu ze zwykłym tygodniem firmy i na którym kroku ludzie najczęściej przerywają. Dzięki temu ciche wracanie do starego sposobu widać po kilku dniach, a nie po kilku miesiącach.",
          },
          {
            t: "p",
            text: "Jeśli ktoś sprzedaje Ci wdrożenie, zapytaj, co robi w drugim tygodniu po oddaniu.",
          },
          { t: "h2", id: "5-pytan", text: "5 pytań przed wdrożeniem AI" },
          {
            t: "list",
            items: [
              "Kto dziś robi to ręcznie i ile godzin tygodniowo na to idzie?",
              "Ile kosztuje jeden błąd w tym procesie?",
              "Kto będzie z tego korzystał w poniedziałek o 8 rano?",
              "Kto w firmie będzie tego pilnował na co dzień?",
              "Po jakiej jednej liczbie poznamy za 30 dni, że to działa?",
            ],
          },
          {
            t: "p",
            text: "Jeśli na któreś nie umiesz odpowiedzieć, jeszcze nie czas na budowanie. Każde z tych pytań dotyczy jednego procesu, a nie całej firmy.",
          },
          { t: "h2", id: "zrodla", text: "Źródła i kulisy" },
          {
            t: "p",
            text: `Badanie: MIT NANDA, „The GenAI Divide: State of AI in Business 2025” (lipiec 2025), dostęp przez [stronę projektu](${MIT_NANDA}); omówienie w [Fortune](${FORTUNE}). Wyniki są wstępne i badanie ma swoje słabe strony, mówię o tym w filmie. Sprawdź je sam, zanim komuś je zacytujesz.`,
          },
          {
            t: "p",
            text: "Film zmontował AI (Claude Code) na moim laptopie z Linuxem, na darmowych narzędziach open source. Narzędzie jest na GitHubie: [video-pipeline](https://github.com/kamiljan11/video-pipeline).",
          },
        ],
      },
      en: {
        title: "95% of companies see no return from AI. I was one of them",
        description:
          "A new video (in Polish): the three rules I follow when bringing AI into a company, the story of an app with 64 screens and one job order, and the 5 questions I ask before I build anything.",
        lead: "According to an MIT study, 95% of companies investing in AI see no return from it. For a long time I was one of them: I built tools that never earned a single złoty. I made a video about it. It is in Polish, so here is the short version.",
        blocks: [
          { ...VIDEO_95, title: "95% of companies see no return from AI. I was one of them" },
          {
            t: "p",
            text: "The 95% does not mean AI does not work. In the same study, employees in over 90% of companies use AI on their own, from private accounts. The trouble starts when AI has to run a whole company's daily processes: orders, invoices, document flow. That is the part I work on.",
          },
          { t: "h2", id: "three-rules", text: "Three rules" },
          {
            t: "list",
            items: [
              "**Build only where it really hurts.** A company pays for a solution when it can count what the problem costs today. Loud is not the same as expensive, and the real pain is often quiet.",
              "**Roll out so people still use it a month later.** Most projects do not die while being built. They die between the pilot and an ordinary Monday.",
              "**One process at a time, not the whole company.** A slip in one process for one person takes a day or two to fix. A slip across the company hits everyone and the project ends up in a drawer.",
            ],
          },
          { t: "h2", id: "64-screens", text: "An app with 64 screens and one job order" },
          {
            t: "p",
            text: "My own failure: a car workshop app with about 64 screens. When I looked at it some time after handing it over, it held one job order. No feature was missing. What was missing was a change in how people worked. The app has changed a lot since, see the [case studies](/case-studies#ai-native-workshop-management).",
          },
          { t: "h2", id: "five-questions", text: "5 questions before an AI rollout" },
          {
            t: "list",
            items: [
              "Who does this by hand today, and how many hours a week does it take?",
              "What does one mistake in this process cost?",
              "Who will use it on Monday at 8 a.m.?",
              "Who in the company will look after it day to day?",
              "Which one number will tell us in 30 days that it works?",
            ],
          },
          {
            t: "p",
            text: `If you cannot answer one of them, it is not time to build yet. Source: MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (July 2025), via the [project page](${MIT_NANDA}); coverage in [Fortune](${FORTUNE}). The findings are preliminary, which I say in the video.`,
          },
        ],
      },
    },
  },
  {
    // every fact below is from the article as published on toRzeszów.pl on
    // 2026-10-18 (published blocks via the read-only panel client, checked
    // against the live page on 2026-10-22, not the draft)
    slug: "anna-z-116-117-to-automat",
    date: "2026-10-18",
    external: { url: ANNA, source: "toRzeszów.pl" },
    // the article's main picture is our own AI illustration (laptop file
    // foto/anna/anna_a.png, pixel-matched to the portal image), not a portal
    // or agency photo, with the title on it
    cover: {
      src: "/blog/anna-z-116-117-to-automat/cover.webp",
      width: 1200,
      height: 630,
      alt: {
        pl: "Starsza kobieta w swetrze rozmawia przez telefon stacjonarny w przedpokoju, z napisem: Przed wizytą dzwoni Anna z 116 117. To automat.",
        en: "An older woman in a cardigan talking on a landline phone in a hallway, with the Polish title: before a visit, Anna calls from 116 117, and it is a bot.",
      },
    },
    body: {
      pl: {
        title: "Przed wizytą u kardiologa dzwoni Anna z 116 117. Mój tekst na toRzeszów.pl",
        description:
          "Od 1 października 2026 roku wirtualna asystentka Anna z Ministerstwa Zdrowia dzwoni z numeru 116 117 i przypomina o wizytach z centralnej e-rejestracji. Napisałem dla toRzeszów.pl, jak odróżnić ją od oszusta.",
        lead: "Napisałem dla toRzeszów.pl tekst o automacie, który dzwoni do pacjentów przed wizytą, i o tym, jak go odróżnić od oszusta. Tu krótko, co w nim jest.",
        blocks: [
          {
            t: "p",
            text: "Anna to program Ministerstwa Zdrowia. Dzwoni **7 dni i 1 dzień przed wizytą** z numeru **116 117** do pacjentów, którym wizytę umówiła placówka, na przykład do kardiologa albo na mammografię. Chodzi o osoby bez smartfona i internetu, które podały w przychodni telefon stacjonarny. W rozmowie można wizytę potwierdzić albo odwołać.",
          },
          {
            t: "p",
            text: "Sam buduję automatyczne telefony i SMS-y, więc patrzę też na to, czego automatowi nie wolno. **Anna nie umawia nowych wizyt i nie zmienia terminów.** Uważam to za dobrą decyzję: gdy program źle usłyszy odpowiedź, nikt nie trafi na wizytę w innym terminie.",
          },
          { t: "h2", id: "co-radze", text: "Co radzę w tekście" },
          {
            t: "list",
            items: [
              "**Podaj przychodni aktualny numer telefonu**, także stacjonarnego, jeśli z niego korzystasz.",
              "**Zapamiętaj numer 116 117.** Z niego dzwoni prawdziwa asystentka.",
              "**Nie podawaj przez telefon PESEL-u ani danych z dowodu i nie płać.** Anna nigdy o to nie prosi, a sam numer na wyświetlaczu można podrobić.",
              "**Odwołaj wizytę, jeśli nie przyjdziesz**: w rozmowie z Anną, przez IKP, w aplikacji mojeIKP albo dzwoniąc do placówki.",
            ],
          },
          {
            t: "p",
            text: "W tekście są też liczby NFZ o nieodwołanych wizytach i koszt umowy na tego asystenta. Najlepiej pokazać te rady rodzicom albo dziadkom przed ich najbliższą wizytą.",
          },
        ],
      },
      en: {
        title: "Before a cardiology visit, Anna calls from 116 117. My article on toRzeszów.pl",
        description:
          "Since 1 October 2026 a virtual assistant called Anna, run by the Polish Ministry of Health, calls patients from 116 117 to remind them of visits. I wrote for toRzeszów.pl how to tell her from a scammer. The article is in Polish.",
        lead: "I wrote an article for toRzeszów.pl, a local news site in Rzeszów, about a phone bot that reminds patients of their visits, and how to tell it from a scammer. The article is in Polish, so here is the short version.",
        blocks: [
          {
            t: "p",
            text: "Anna calls **7 days and 1 day before a visit** from **116 117** to patients without a smartphone or internet whose clinic booked the visit and who gave a landline number. The patient can confirm or cancel the visit. She cannot book or move appointments.",
          },
          {
            t: "p",
            text: "The real Anna **never asks for a national ID number, ID card details or a payment**. If a caller does, it is not Anna, even when the screen shows 116 117.",
          },
        ],
      },
    },
  },
  {
    // every fact below is from the article as published on toRzeszów.pl on
    // 2026-10-13 (published blocks via the read-only panel client, checked
    // against the live page on 2026-10-15, not the draft)
    slug: "lekarz-sprawdzal-diagnoze-w-chatgpt",
    date: "2026-10-13",
    external: { url: LEKARZ, source: "toRzeszów.pl" },
    // the article's own photo (Pexels 39192328, Vitaly Gariev, Pexels licence
    // allows changes), taken from Pexels, not from torzeszow.pl, with the title on it
    cover: {
      src: "/blog/lekarz-sprawdzal-diagnoze-w-chatgpt/cover.webp",
      width: 1200,
      height: 630,
      alt: {
        pl: "Starszy lekarz w białym fartuchu ze stetoskopem pisze na klawiaturze, z napisem: Lekarz rodzinny sprawdzał diagnozę w ChatGPT.",
        en: "An older doctor in a white coat with a stethoscope typing on a keyboard, with the Polish title: a family doctor checked a diagnosis in ChatGPT.",
      },
    },
    body: {
      pl: {
        title: "Lekarz rodzinny sprawdzał diagnozę w ChatGPT. Mój tekst na toRzeszów.pl",
        description:
          "Podczas wizyty lekarz rodzinny wpisał moje objawy do ChatGPT, żeby sprawdzić swoją diagnozę. Sprawdziłem przepisy i napisałem o tym dla toRzeszów.pl: Kodeks Etyki Lekarskiej pozwala na AI, ale o ogólnodostępnych czatach nie mówi ani słowa.",
        lead: "Napisałem dla toRzeszów.pl tekst o wizycie, na której lekarz sprawdzał moją diagnozę w czacie, i o tym, co mówią na to przepisy. Tu krótko, co w nim jest.",
        blocks: [
          {
            t: "p",
            text: "Było to mniej więcej pół roku temu. Lekarz wpisał moje objawy do czatu, a potem sprawdzał, czy ten potwierdzi jego diagnozę. **Mojego imienia ani numeru PESEL przy tym nie podał.**",
          },
          {
            t: "p",
            text: "Od 1 stycznia 2025 roku **art. 12 Kodeksu Etyki Lekarskiej** pozwala lekarzom korzystać z AI pod kilkoma warunkami, a ostateczną decyzję zawsze podejmuje lekarz. O ogólnodostępnych czatach, takich jak ChatGPT, **nie wspominają ani Kodeks, ani komentarz** Komisji Etyki Lekarskiej NRL. Moim zdaniem to luka.",
          },
          { t: "h2", id: "co-robic", text: "Co możesz zrobić jako pacjent" },
          {
            t: "list",
            items: [
              "**Zapytaj lekarza.** Masz prawo do informacji o rozpoznaniu i metodach diagnostycznych.",
              "**Wyraź zgodę albo odmów, gdy o wyniku decyduje algorytm.** Zgoda jest potrzebna, gdy algorytm ma główną rolę albo podaje wynik bez udziału lekarza lub przy jego minimalnym udziale.",
              "**Pilnuj swoich danych.** Jeśli do czatu trafia twoje imię, PESEL albo wyniki badań, zapytaj, z jakiego narzędzia lekarz korzysta i czy przychodnia ma z dostawcą umowę o przetwarzaniu danych.",
              "**Złóż skargę, jeśli lekarz nie dochował tajemnicy.** Rozpatruje ją okręgowy rzecznik odpowiedzialności zawodowej przy Okręgowej Izbie Lekarskiej w Rzeszowie.",
            ],
          },
          {
            t: "p",
            text: "W tekście są też zasady, które Ministerstwo Cyfryzacji dało urzędnikom, i badanie, w którym lekarzy przyznających się do AI oceniano gorzej.",
          },
        ],
      },
      en: {
        title: "My family doctor checked a diagnosis in ChatGPT. My article on toRzeszów.pl",
        description:
          "During a visit my family doctor typed my symptoms into ChatGPT to check his diagnosis. I looked at what the Polish rules say and wrote about it for toRzeszów.pl. The article is in Polish.",
        lead: "I wrote an article for toRzeszów.pl, a local news site in Rzeszów, about a visit where my doctor checked his diagnosis in a chatbot, and what the rules say about it. The article is in Polish, so here is the short version.",
        blocks: [
          {
            t: "p",
            text: "About six months ago my family doctor typed my symptoms into a chatbot to see whether it confirmed his diagnosis. **He did not enter my name or my national ID number.**",
          },
          {
            t: "p",
            text: "Since 1 January 2025 **article 12 of the Polish Code of Medical Ethics** lets doctors use AI under some conditions, and the final decision always stays with the doctor. Neither the Code nor its official commentary mentions **general-purpose chatbots** like ChatGPT. My advice to patients: ask your doctor whether they use AI and what they type into it.",
          },
        ],
      },
    },
  },
  {
    // every fact below is from the article as published on toRzeszów.pl on
    // 2026-10-10 (published blocks via the read-only panel client, checked
    // against the live page on 2026-10-15, not the draft)
    slug: "czatbot-musi-powiedziec-ze-nie-jest-czlowiekiem",
    date: "2026-10-10",
    external: { url: CZATBOT, source: "toRzeszów.pl" },
    // the article's main picture is our own AI illustration (vault file
    // czatbot-v6-miniatura-czlowiek-robot-AI.jpg), not a portal or agency
    // photo, with the title on it
    cover: {
      src: "/blog/czatbot-musi-powiedziec-ze-nie-jest-czlowiekiem/cover.webp",
      width: 1200,
      height: 630,
      alt: {
        pl: "Mężczyzna z telefonem przy uchu i robot ze słuchawkami przy biurku infolinii, z napisem: Czatbot musi powiedzieć, że nie jest człowiekiem.",
        en: "A man on the phone and a robot with a headset at a call centre desk, with the Polish title: a chatbot must say it is not human.",
      },
    },
    body: {
      pl: {
        title: "Czatbot musi powiedzieć, że nie jest człowiekiem. Mój tekst na toRzeszów.pl",
        description:
          "Od 2 sierpnia 2026 roku czatbot i automat w słuchawce mają informować, że rozmawiamy ze sztuczną inteligencją. Od 28 października firmę, której bot tego nie robi, można zgłosić do nowej komisji. Napisałem o tym dla toRzeszów.pl.",
        lead: "Napisałem dla toRzeszów.pl tekst o tym, jak sprawdzić, czy po drugiej stronie czatu albo infolinii siedzi człowiek. Tu krótko, co w nim jest.",
        blocks: [
          {
            t: "p",
            text: "Od **2 sierpnia 2026 roku** unijny AI Act każe tak projektować systemy rozmawiające z ludźmi, żeby człowiek był informowany, że rozmawia z AI. Chodzi o okienko czatu na stronie sklepu, banku, przychodni czy urzędu i o voicebota, który odbiera telefon albo sam dzwoni. Informacja ma paść **najpóźniej przy pierwszym kontakcie**.",
          },
          {
            t: "p",
            text: "Polska ustawa o systemach sztucznej inteligencji tworzy nowy organ nadzoru, Komisję Rozwoju i Bezpieczeństwa Sztucznej Inteligencji (KRiBSI). **Od 28 października** skargę do niej może złożyć każdy: osoba prywatna, firma albo inna organizacja.",
          },
          { t: "h2", id: "co-robic", text: "Co radzę w tekście" },
          {
            t: "list",
            items: [
              "**Zapytaj na początku rozmowy:** „Czy rozmawiam z człowiekiem, czy z automatem?”. Uczciwie ustawiony bot od razu odpowie, że jest programem.",
              "**Zanotuj szczegóły**, jeśli odpowiedź jest wymijająca: datę, godzinę, numer telefonu albo adres strony i nazwę firmy.",
              "**Dopiero wtedy rozważ skargę do KRiBSI.** Zasadą jest forma elektroniczna, a komisja dopiero rusza, więc sprawdź, gdzie przyjmuje zgłoszenia.",
              "**Jeśli prowadzisz firmę, przeczytaj powitanie swojego czatbota** i zadzwoń na własną infolinię.",
            ],
          },
          {
            t: "p",
            text: "W tekście piszę też, ile grozi firmie za bota, który nie mówi, że jest programem, i dlaczego jedno uczciwe zdanie na powitanie kosztuje przy tym grosze.",
          },
        ],
      },
      en: {
        title: "A chatbot must say it is not human. My article on toRzeszów.pl",
        description:
          "Since 2 August 2026 EU rules say a chatbot or a phone bot must tell people they are talking to AI. From 28 October anyone in Poland can complain to a new commission. I wrote about it for toRzeszów.pl. The article is in Polish.",
        lead: "I wrote an article for toRzeszów.pl, a local news site in Rzeszów, on how to tell whether a person or a program is on the other end of a chat or a hotline. The article is in Polish, so here is the short version.",
        blocks: [
          {
            t: "p",
            text: "Under the EU AI Act, systems that talk with people must be designed so that people are told they are talking to AI, **at the latest at the first interaction**. That covers chat windows on shop, bank, clinic and public office websites, and voicebots that answer or make phone calls.",
          },
          {
            t: "p",
            text: "Poland's new AI act creates a supervisory body, the Commission for the Development and Safety of AI (KRiBSI). **From 28 October 2026** anyone can file a complaint with it. The main advice: ask at the very start whether you are talking to a person, and if the answer dodges the question, note the date, time, phone number or website and the company name.",
          },
        ],
      },
    },
  },
  {
    // every fact below is from the article as published on toRzeszów.pl on
    // 2026-10-01 (checked against the live page, not the draft)
    slug: "oszusci-moga-podrobic-glos-wnuczka",
    date: "2026-10-01",
    external: { url: GLOS_WNUCZKA, source: "toRzeszów.pl" },
    // the article's own photo (Pexels 7544758, Pexels licence allows changes),
    // taken from Pexels, not from torzeszow.pl, with the title on it
    cover: {
      src: "/blog/oszusci-moga-podrobic-glos-wnuczka/cover.webp",
      width: 1200,
      height: 630,
      alt: {
        pl: "Starsza kobieta z telefonem przy uchu i napis: Oszuści mogą podrobić głos wnuczka. Pomoże jedno rodzinne hasło.",
        en: "An older woman with a phone at her ear and the Polish title: scammers can fake a grandchild's voice; one family password helps.",
      },
    },
    body: {
      pl: {
        title: "Oszuści mogą podrobić głos wnuczka. Mój tekst na toRzeszów.pl",
        description:
          "Rzeszowscy seniorzy stracili w 2025 roku ponad 3,2 mln zł na oszustwach „na legendę”. Teraz oszuści mogą podrobić głos bliskiej osoby. Napisałem dla toRzeszów.pl, jak rodzina może się przed tym obronić.",
        lead: "Napisałem dla toRzeszów.pl tekst o oszustwach „na wnuczka” w czasach, gdy program potrafi podrobić głos bliskiej osoby. Tu krótko, co w nim jest.",
        blocks: [
          {
            t: "p",
            text: "Komendant miejski policji w Rzeszowie relacjonował radnym, że w 2025 roku wszczęto **100 postępowań** w sprawach oszustw „na legendę”, czyli na wnuczka, na policjanta albo na pracownika banku. Straty, głównie seniorów, wyniosły **3 252 247 zł**.",
          },
          {
            t: "p",
            text: "Do tej pory oszust liczył na to, że zdenerwowana osoba nie rozpozna przez telefon obcego głosu. Teraz może użyć sztucznej inteligencji. W jednym z testów McAfee wystarczyły **trzy sekundy nagrania**, żeby podrobiony głos w 85 proc. zgadzał się z oryginałem.",
          },
          { t: "h2", id: "co-robic", text: "Co radzę w tekście" },
          {
            t: "list",
            items: [
              "**Rodzinne hasło.** Słowo albo pytanie, które znają tylko najbliżsi i które nigdy nie padło w nagraniu ani w internecie. Program podrabiający głos go nie zna.",
              "**Rozłączyć się i samemu oddzwonić** na numer zapisany w telefonie. Tak radzą policja i banki.",
              "**Zgłosić na 112** każdy telefon, w którym ktoś żąda pieniędzy albo danych.",
              "**Porozmawiać z rodzicami i dziadkami jeszcze dziś.** Według CBOS z narzędzi generatywnej AI korzystało w ostatnich trzech miesiącach tylko 8 proc. seniorów.",
            ],
          },
          {
            t: "p",
            text: "W tekście są też sygnały, po których według NASK można rozpoznać podrobiony głos, i powód, dla którego sam nie opierałbym na nich obrony. Sama obrona nic nie kosztuje i wymaga jednej rozmowy z rodziną.",
          },
        ],
      },
      en: {
        title: "Scammers can fake a grandchild's voice. My article on toRzeszów.pl",
        description:
          "Rzeszów police counted over 3.2 million zł lost in 2025 to phone scams where callers pose as a relative or a police officer. Now scammers can clone a relative's voice. I wrote about it for the local news site toRzeszów.pl. The article is in Polish.",
        lead: "I wrote an article for toRzeszów.pl, a local news site in Rzeszów, about phone scams at a time when software can copy a relative's voice. The article is in Polish, so here is the short version.",
        blocks: [
          {
            t: "p",
            text: "In 2025 Rzeszów police opened **100 cases** over scams where the caller poses as a grandchild, a police officer or a bank employee. Losses, mostly of older people, came to **3,252,247 zł**.",
          },
          {
            t: "p",
            text: "In one McAfee test, **three seconds of recording** were enough for a cloned voice to match the original by 85%.",
          },
          {
            t: "p",
            text: "The main advice: agree on a **family password** that has never been said in a recording or written online, hang up and call back on a number saved in your phone, and report to 112 every call that asks for money or personal data.",
          },
        ],
      },
    },
  },
  {
    slug: "claude-autoshutdown",
    date: "2026-09-21",
    repo: "https://github.com/kamiljan11/claude-autoshutdown",
    cover: {
      src: MONITOR.src,
      width: MONITOR.width,
      height: MONITOR.height,
      alt: {
        pl: "Okno Claude AutoShutdown: tabela sesji Claude i lista warunków wyłączenia komputera",
        en: "The Claude AutoShutdown window: a table of Claude sessions and the list of shutdown conditions",
      },
    },
    body: {
      pl: {
        title: "Komputer gaśnie, kiedy Claude Code skończy pracę",
        description:
          "Małe narzędzie na Windows, które wyłącza, hibernuje albo usypia komputer dopiero wtedy, gdy każda sesja Claude Code i każdy jej subagent skończyły pracę. Jak rozpoznaje koniec pracy i dlaczego nie patrzy na CPU.",
        lead: "Zostawiam wieczorem agentów z dłuższą robotą. Rano komputer albo chodził całą noc na pusto, albo zgasł w połowie edycji, bo wyłączył go zegar. Napisałem narzędzie, które czeka na koniec pracy.",
        blocks: [
          { t: "h2", id: "problem", text: "Problem: zegar nie wie, co robi agent" },
          {
            t: "p",
            text: "Claude Code nie ma opcji „wyłącz komputer, jak skończysz”. Zostają dwa wyjścia i oba są złe. Można zostawić komputer włączony do rana i płacić za prąd, gdy nic się nie dzieje. Można też ustawić wyłączenie po czasie albo usypianie po bezczynności. Tylko że Windows liczy bezczynność po ruchach myszki i klawiatury, a agent nie rusza myszką. Timer tnie według zegara.",
          },
          {
            t: "p",
            text: "Claude AutoShutdown zamienia „wyłącz o trzeciej” na „wyłącz, kiedy praca się skończy”. Tak to wygląda w trakcie pracy: dwie sesje jeszcze pracują, więc nic się nie wyłączy.",
          },
          {
            ...MONITOR,
            alt: "Okno Claude AutoShutdown: tabela czterech sesji Claude (dwie WORKING, dwie IDLE) i lista warunków wyłączenia, z których pięć jest na czerwono",
            caption:
              "Monitor na żywo. Na dole warunki: wszystkie muszą być zielone, zanim cokolwiek się stanie.",
          },
          { t: "h2", id: "jak-rozpoznaje", text: "Jak rozpoznaje, że praca się skończyła" },
          {
            t: "p",
            text: "Nie zgaduje z obciążenia systemu. Co 10 sekund czyta to, co Claude Code sam zapisuje na dysku: rejestr sesji w `~/.claude/sessions/`, transkrypt każdej sesji i transkrypty wszystkich subagentów, także tych zagnieżdżonych, które powstają przy rozgałęzionych workflowach.",
          },
          {
            t: "p",
            text: "Z ostatnich wpisów transkryptu wynika stan tury. Odpowiedź modelu zakończona normalnie zamyka turę; wywołanie narzędzia, wiadomość użytkownika albo podsumowanie po kompaktowaniu zostawia ją otwartą. Cokolwiek innego jest nieznane i też blokuje wyłączenie. Lista jest zamknięta: nowy typ wpisu, którego program nie zna, nigdy nie zostanie uznany za „skończone”.",
          },
          {
            t: "p",
            text: "Sesja liczy się jako żywa tylko wtedy, gdy jej proces działa i czas startu procesu zgadza się z zapisanym co do sekundy. Dzięki temu Windows, który nadał ten sam numer PID nowemu programowi, nie oszuka monitora. Działający `claude.exe`, którego nie ma w rejestrze, też blokuje wyłączenie.",
          },
          { t: "h2", id: "cpu", text: "Dlaczego nie patrzy na CPU" },
          {
            t: "p",
            text: "To było pierwsze, co przyszło mi do głowy, i pierwsze, co odrzuciłem po pomiarze. Sesja czekająca na mnie zużywała od 0,9 do 2,0% procesora, z pikami do 5,0%. Sesja, która pracowała: 2,7%, z pikami do 5,3%. Rozkłady się pokrywają, więc żaden próg ich nie rozdzieli. Większość pracy agenta dzieje się po stronie serwera, a lokalnie proces głównie czeka.",
          },
          {
            t: "p",
            text: "Druga pułapka była mniej oczywista. Program czyta końcówkę transkryptu, żeby ustalić stan tury. Na początku czytał 256 KB. Na moim komputerze było 494 pojedynczych wpisów większych niż 256 KB, największy miał 5,1 MB. Taki wpis nie mieścił się w oknie odczytu, więc sesja wychodziła jako „nieznana”. Teraz okno zaczyna od 256 KB i rośnie do 16 MB, aż znajdzie cały wpis.",
          },
          { t: "h2", id: "tryby", text: "Wyłączenie, hibernacja, uśpienie" },
          {
            t: "p",
            text: "W ustawieniach wybierasz, co ma się stać na końcu:",
          },
          {
            t: "list",
            items: [
              "`shutdown`: wyłączenie (`shutdown /s /t 0 /f`),",
              "`hibernate`: hibernacja (`shutdown /h`),",
              "`sleep`: uśpienie przez `SetSuspendState` z Windows API,",
              "`lock`: tylko blokada ekranu,",
              "`nothing`: nic, do testów.",
            ],
          },
          {
            t: "p",
            text: "Jedna uwaga z README: jeśli hibernacja jest w Windows włączona, uśpienie często i tak kończy się hibernacją. Tak działa Windows.",
          },
          { t: "h2", id: "bezpieczniki", text: "Bezpieczniki" },
          {
            t: "p",
            text: "Program, który sam gasi komputer, musi się bardziej bać wyłączenia za wcześnie niż za późno. Dlatego wyłączenie przechodzi przez 17 niezależnych bramek. Najważniejsze:",
          },
          {
            t: "list",
            items: [
              "startuje rozbrojony, uzbrojenie wymaga kliknięcia i potwierdzenia,",
              "każdy warunek musi być zielony 3 razy z rzędu, a każda sesja cicha od co najmniej 300 sekund,",
              "Ty też musisz być nieaktywny przez 600 sekund, więc nie wyłączy komputera, przy którym siedzisz,",
              "przed akcją jest 90 sekund odliczania z przyciskiem Anuluj (działa też Esc), a po anulowaniu 60 sekund przerwy,",
              "plik `STOP` w katalogu programu blokuje wszystko, bez względu na resztę,",
              "błąd skanera blokuje wyłączenie: „nic nie widzę” nie znaczy „wszystko skończone”,",
              "procesy z listy `guard_patterns`, na przykład render w ffmpeg, też blokują,",
              "przykładowy config ma `dry_run: true`, więc na start program tylko zapisuje w logu, co by zrobił.",
            ],
          },
          { t: "h2", id: "instalacja", text: "Instalacja" },
          {
            t: "p",
            text: "Tylko Windows. Najprościej pobrać plik `.exe` z [Releases](https://github.com/kamiljan11/claude-autoshutdown/releases). Nie jest podpisany, więc SmartScreen za pierwszym razem ostrzeże. Ze źródeł potrzebny jest Python 3.14, bez żadnych dodatkowych pakietów:",
          },
          {
            t: "code",
            code: "git clone https://github.com/kamiljan11/claude-autoshutdown.git\ncd claude-autoshutdown\npython -m pytest -q",
          },
          {
            t: "p",
            text: "Program uruchamiasz przez `Claude AutoShutdown.vbs` (bez okna konsoli). Nie potrzebuje uprawnień administratora: do wyłączenia własnego komputera wystarczy zwykłe konto.",
          },
          { t: "h2", id: "ograniczenia", text: "Czego nie robi" },
          {
            t: "list",
            items: [
              "Sesja, która czeka na Twoją zgodę na użycie narzędzia, ma otwartą turę, więc blokuje wyłączenie. Celowo.",
              "Jeśli przerwiesz agenta klawiszem Esc w trakcie wywołania narzędzia, tura zostaje otwarta i program nie rozpozna, że sesja jest porzucona.",
              "Nie wie nic o pracy poza Claude Code, na przykład o trwającym `git push`. Na to są `guard_patterns`.",
              "Nie ma instalatora.",
            ],
          },
          {
            t: "p",
            text: "Kod jest na licencji MIT: [github.com/kamiljan11/claude-autoshutdown](https://github.com/kamiljan11/claude-autoshutdown). README opisuje każdą bramkę i każdy pomiar, o którym tu piszę.",
          },
        ],
      },
      en: {
        title: "Shut the PC down when Claude Code is done with its work",
        description:
          "A small Windows tool that shuts down, hibernates or sleeps the computer only after every Claude Code session and every subagent has finished. How it tells work is over, and why it ignores CPU.",
        lead: "I leave agents running longer jobs in the evening. In the morning the PC had either run idle all night, or a timer had killed it halfway through an edit. So I wrote a tool that waits for the work to end.",
        blocks: [
          { t: "h2", id: "problem", text: "The problem: a timer can't see the agent" },
          {
            t: "p",
            text: "Claude Code has no \"shut down when you're done\". That leaves two options, both bad. Leave the machine on until morning and pay for power while nothing happens. Or set a shutdown timer or idle sleep. But Windows measures idle time by mouse and keyboard, and an agent doesn't move the mouse. The timer cuts by the clock.",
          },
          {
            t: "p",
            text: 'Claude AutoShutdown turns "shut down at 3" into "shut down when the work is finished". Here it is mid-run: two sessions are still working, so nothing will happen.',
          },
          {
            ...MONITOR,
            alt: "Claude AutoShutdown window: a table of four Claude sessions (two WORKING, two IDLE) and a list of shutdown conditions, five of them red",
            caption: "The live monitor. The conditions at the bottom all have to be green first.",
          },
          { t: "h2", id: "how", text: "How it knows the work is over" },
          {
            t: "p",
            text: "It doesn't guess from system load. Every 10 seconds it reads what Claude Code itself writes to disk: the session registry in `~/.claude/sessions/`, each session's transcript, and every subagent transcript, including the nested ones that workflow fan-outs create.",
          },
          {
            t: "p",
            text: 'The last records of a transcript give the state of the turn. A model reply that ended normally closes the turn; a tool call, a user message or a post-compaction summary leaves it open. Anything else is unknown, and unknown blocks too. The list is closed: a record type the program has never seen can never count as "done".',
          },
          {
            t: "p",
            text: "A session counts as alive only if its process is running and the process start time matches the recorded one to the second, so Windows reusing a PID for another program can't fool it. A running `claude.exe` that isn't in the registry also blocks shutdown.",
          },
          { t: "h2", id: "cpu", text: "Why not CPU" },
          {
            t: "p",
            text: "It was my first idea and the first one I dropped after measuring. A session waiting for me used 0.9 to 2.0% CPU, peaking at 5.0%. A working session: 2.7%, peaking at 5.3%. The ranges overlap, so no threshold separates them. Most of an agent's work happens on the server; locally the process mostly waits.",
          },
          {
            t: "p",
            text: "The second trap was less obvious. The program reads the end of a transcript to get the turn state, and at first it read 256 KB. My machine had 494 single records bigger than that, the largest 5.1 MB. A record that didn't fit in the window made the session read as unknown. The window now starts at 256 KB and grows up to 16 MB until it holds the whole record.",
          },
          { t: "h2", id: "modes", text: "Shut down, hibernate, sleep" },
          { t: "p", text: "In Settings you pick what happens at the end:" },
          {
            t: "list",
            items: [
              "`shutdown`: power off (`shutdown /s /t 0 /f`),",
              "`hibernate`: hibernate (`shutdown /h`),",
              "`sleep`: sleep through the Windows `SetSuspendState` API,",
              "`lock`: just lock the screen,",
              "`nothing`: nothing, for testing.",
            ],
          },
          {
            t: "p",
            text: "One note from the README: with hibernation enabled in Windows, sleep often ends up as hibernation anyway. That's how Windows behaves.",
          },
          { t: "h2", id: "safety", text: "The brakes" },
          {
            t: "p",
            text: "A program that powers off your machine should fear shutting down too early far more than too late. So a shutdown has to pass 17 independent gates. The main ones:",
          },
          {
            t: "list",
            items: [
              "it starts disarmed; arming takes a click and a confirmation,",
              "every condition must be green 3 times in a row, and every session quiet for at least 300 seconds,",
              "you must be idle for 600 seconds too, so it won't power off a machine you're sitting at,",
              "a 90-second countdown with Cancel (Esc works too) comes first, then a 60-second cooldown after any cancel,",
              "a `STOP` file in the program folder blocks everything, no matter what else is true,",
              'a scanner error blocks shutdown: "I can\'t see anything" is not "everything is done",',
              "processes listed in `guard_patterns`, say an ffmpeg render, block it as well,",
              "the example config ships with `dry_run: true`, so at first it only logs what it would have done.",
            ],
          },
          { t: "h2", id: "install", text: "Install" },
          {
            t: "p",
            text: "Windows only. The easy way is the `.exe` from [Releases](https://github.com/kamiljan11/claude-autoshutdown/releases). It isn't code-signed, so SmartScreen warns on first run. From source you need Python 3.14 and no extra packages:",
          },
          {
            t: "code",
            code: "git clone https://github.com/kamiljan11/claude-autoshutdown.git\ncd claude-autoshutdown\npython -m pytest -q",
          },
          {
            t: "p",
            text: "Start it with `Claude AutoShutdown.vbs` (no console window). No admin rights needed: a normal account may shut down its own machine.",
          },
          { t: "h2", id: "limits", text: "What it doesn't do" },
          {
            t: "list",
            items: [
              "A session waiting for your answer to a permission prompt has an open turn, so it blocks shutdown. On purpose.",
              "If you interrupt an agent with Esc in the middle of a tool call, the turn stays open and the app won't see the session as abandoned.",
              "It knows nothing about work outside Claude Code, like a running `git push`. That's what `guard_patterns` is for.",
              "There is no installer.",
            ],
          },
          {
            t: "p",
            text: "The code is MIT-licensed: [github.com/kamiljan11/claude-autoshutdown](https://github.com/kamiljan11/claude-autoshutdown). The README documents every gate and every measurement mentioned here.",
          },
        ],
      },
    },
  },
];

export function findPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
