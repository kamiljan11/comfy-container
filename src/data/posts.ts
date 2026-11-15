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
  /** one of Kamil's own videos; `poster` is a local image, e.g. the post's cover (ADR 0009) */
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
const SZKOLY =
  "https://torzeszow.pl/news/szkola-moze-dostac-do-750-tys-zl-na-lekcje-o-cyberbezpieczenstwie-wnioski-do-10-listopada";

const MONITOR = {
  t: "img",
  src: "/blog/claude-autoshutdown/monitor.webp",
  width: 1600,
  height: 970,
} as const;

export const POSTS: Post[] = [
  {
    slug: "ai-gotowe-bez-dowodu",
    date: "2026-11-09",
    cover: {
      // thumbnail variant B from the film's render (video-pipeline
      // render/montaz/2026-11-04-v5/out/thumbnails/long_B), picked by Kamil's
      // request on 2026-11-15 because it names the post's three ideas
      src: "/blog/ai-gotowe-bez-dowodu/cover.webp",
      width: 1280,
      height: 720,
      alt: {
        pl: "Napis „3 pomysły” i trzy kafelki ze strzałkami: 1 Szlaban, 2 Blizna, 3 Dowód",
        en: "The Polish caption “3 pomysły” (3 ideas) and three tiles with arrows: 1 Barrier, 2 Scar, 3 Proof",
      },
    },
    body: {
      pl: {
        title: "3 pomysły, żeby AI nie mówiło „gotowe” bez dowodu",
        description:
          "Szlaban zamiast tabliczki, blizna po każdym błędzie i raport z jednym z trzech słów: jak pilnuję AI przy kodzie, z konfiguracją hooka i instalacją.",
        lead: "3 pomysły, na których stoi mój system pilnowania AI przy kodzie: szlaban, blizna i dowód. Badanie agentów kodujących pokazuje, że 3 z 4 nieudanych zadań zgłosili oni jako sukces. Poniżej rozpisuję [film](https://youtu.be/VeM1WTRy8nA) krok po kroku, z działającym hookiem, źródłami i poleceniami instalacji.",
        blocks: [
          {
            t: "p",
            text: "Film jest skondensowany. Tu dostajesz to samo w kolejności, w jakiej możesz to wdrożyć, plus rzeczy, których w nagraniu nie zmieściłem: działającą konfigurację hooka, to, co dokładnie mówi badanie o fałszywych sukcesach, i polecenia instalacji.",
          },
          {
            t: "youtube",
            id: "VeM1WTRy8nA",
            title: "3 pomysły, żeby AI nie mówiło „gotowe” bez dowodu",
            poster: "/blog/ai-gotowe-bez-dowodu/cover.webp",
          },
          {
            t: "h2",
            id: "problem",
            text: "Problem: AI mówi „gotowe”, a nic nie działa",
          },
          {
            t: "p",
            text: "Na pewno to znasz. Prosisz AI o poprawkę, odpisuje radośnie, że wszystko działa, a Ty sprawdzasz i nic nie działa. Długo myślałem, że to moje wrażenie. Potem trafiłem na badanie, które to mierzy.",
          },
          {
            t: "p",
            text: "Autor pracy opisał agentów kodujących, którzy sami oceniali własne zadania. Wśród przebiegów z jawnym raportem statusu aż 75,8% nieudanych zadań agent zgłosił jako sukces. To wynik dla benchmarku AppWorld i czterech rodzin modeli. W innym zestawie, tau2-bench, odsetek wyniósł 45 do 48% nieudanych przebiegów w domenach z jednym sterującym, a w domenie telekomunikacyjnej tylko 3%. Źródło: [Advani, „From Confident Closing to Silent Failure” (arXiv, czerwiec 2026)](https://arxiv.org/abs/2606.09863).",
          },
          {
            t: "p",
            text: "W filmie mówię „w trzech przypadkach na cztery”, bo tak wygląda wynik dla agentów kodujących. Nie czytaj tego jako „AI kłamie w trzech czwartych przypadków”: to odsetek wśród zadań, które już się nie udały.",
          },
          {
            t: "p",
            text: "**Uwaga:** liczba z badania dotyczy konkretnych agentów i konkretnego benchmarku. Twoje narzędzie i Twoje zadania mogą wypaść lepiej albo gorzej. Wniosek zostaje ten sam: raport agenta o własnym sukcesie to deklaracja, nie dowód.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_raport.webp",
            alt: "Raport AI kończy się jednym z trzech słów: sprawdzone, niesprawdzone albo nie wyszło",
            caption: "Raport AI kończy się jednym z trzech słów",
            width: 960,
            height: 540,
          },
          {
            t: "h2",
            id: "autor-bez-redaktora",
            text: "Skąd to się wzięło: autor bez redaktora",
          },
          {
            t: "p",
            text: "W dużej firmie nikt nie wypuszcza kodu sam. To jak z książką: autor pisze, redaktor czyta, korektor wyłapuje błędy, których autor już nie widzi. W kodzie bywa podobnie: jeden pisze, drugi sprawdza, trzeci pilnuje wdrożenia.",
          },
          {
            t: "p",
            text: "U mnie wygląda to inaczej. Razem z Arkiem prowadzimy Cetus Automation przy software house’ie CetusPro. Arek jest u klientów, ustawia procesy i pilnuje wdrożenia, a w większości projektów cały kod piszę ja. Jestem autorem bez redaktora.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_ksiazka.webp",
            alt: "Taśma redaktor, korektor, księgarnia: kto sprawdza tekst, zanim trafi do czytelnika",
            caption: "Autor, redaktor, korektor: tak kod przechodzi przez firmę",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "Najpierw myślałem, że wystarczą dobre zasady, więc je spisałem. Wyglądały świetnie. Potem zrobiłem audyt i okazało się, że większość zmian trafia do gotowej wersji bez żadnego przeglądu. Zasady działały na papierze. Podobny wniosek wypłynął z audytu opisanego w repozytorium systemu: zasady zapisane prozą były łamane na skalę, między innymi 79% commitów szło prosto na główną gałąź, a przegląd kodu odpalał się w 2,5% sesji ([README repozytorium](https://github.com/kamiljan11/coding-higher-mind)).",
          },
          {
            t: "p",
            text: "Dlatego zbudowałem system, który udaje mały zespół: jeden agent pisze, inni robią za redaktora i korektora, a automaty pilnują każdego kroku. Decyzje zostają moje, a każda naprawdę ryzykowna zmiana czeka na moją zgodę, przynajmniej na razie.",
          },
          {
            t: "h2",
            id: "szlaban",
            text: "Pomysł 1: szlaban zamiast tabliczki",
          },
          {
            t: "p",
            text: "Tabliczka z zakazem wjazdu nikogo nie zatrzyma. W Claude Code zasady zapisuje się w pliku z instrukcjami, AI czyta go na początku pracy i wie, że czegoś nie wolno. Po długiej rozmowie potrafi to przeoczyć. Szlaban to coś innego: mały program, który odpala się w konkretnym momencie, sam sprawdza i zatrzymuje ruch.",
          },
          {
            t: "p",
            text: "W Claude Code takie programy nazywają się hookami. Dokumentacja opisuje je jako polecenia uruchamiane na zdarzeniach: PreToolUse przed wykonaniem narzędzia, PostToolUse po udanym wywołaniu i Stop, gdy AI kończy odpowiedź. Kod wyjścia 2 z hooka PreToolUse blokuje wywołanie, a tekst z błędu wraca do AI jako powód ([dokumentacja hooków](https://code.claude.com/docs/en/hooks)). Konfigurację trzymasz w `~/.claude/settings.json` albo w `.claude/settings.json` projektu.",
          },
          {
            t: "p",
            text: "Przykład z filmu, czyli nadpisanie historii zmian, możesz zablokować tak. Najpierw wpis w ustawieniach:",
          },
          {
            t: "code",
            code: '{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Bash",\n        "hooks": [\n          { "type": "command", "command": "~/.claude/hooks/no-force.sh" }\n        ]\n      }\n    ]\n  }\n}',
          },
          {
            t: "p",
            text: "A potem sam skrypt `~/.claude/hooks/no-force.sh` (potrzebuje `jq`, trzeba nadać mu prawo wykonywania):",
          },
          {
            t: "code",
            code: '#!/bin/bash\ninput=$(cat)\ncommand=$(jq -r \'.tool_input.command\' <<<"$input")\nif [[ "$command" =~ git[[:space:]]+push.*(--force|[[:space:]]-f([[:space:]]|$)) ]]; then\n  echo "Zablokowane: zamiast nadpisywać historię, zapisz zmianę jako nowy commit." >&2\n  exit 2\nfi\nexit 0',
          },
          {
            t: "p",
            text: "Sprawdziłem ten skrypt na dwóch poleceniach: `git push --force origin main` kończy się kodem 2 z komunikatem, a zwykły `git push origin feat` przechodzi z kodem 0. To uproszczony szkielet, nie mój pełny strażnik. Prawdziwy blokuje też `--no-verify`, `reset --hard` i kilka innych poleceń, ale idea jest ta sama: AI dostaje powód i wie, co zrobić inaczej.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_force.webp",
            alt: "Terminal pokazuje zablokowane polecenie git push --force i zalecenie zapisania nowej zmiany",
            caption: "Szlaban zatrzymuje nadpisanie historii i podpowiada nową zmianę",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "Dwie rzeczy robią z tego szlaban, a nie dekorację. Każdy ma własny test, który sprawdza, czy naprawdę coś blokuje. I AI nie może go samo wyłączyć: wyjątek wydaje człowiek, wpisując zgodę w rozmowie, tylko na chwilę albo na kilka użyć, a każde użycie zostaje zapisane.",
          },
          {
            t: "h2",
            id: "blizna",
            text: "Pomysł 2: każdy błąd zostawia bliznę",
          },
          {
            t: "p",
            text: "Skąd wiadomo, gdzie postawić szlaban? Z błędów, które już raz się wydarzyły. Po złej sesji większość ludzi mówi „następnym razem będę uważać”, a potem robi to samo, bo samo uważanie niczego nie zmienia. W lotnictwie dawno to zrozumiano: po poważnym wypadku nikt nie mówi pilotom, żeby uważali bardziej, tylko do procedury dochodzi nowy punkt.",
          },
          {
            t: "p",
            text: "U mnie to się nazywa „scar”, czyli blizna: nowe sprawdzenie, żeby ten sam błąd nie przeszedł drugi raz. Gdy zgłaszam AI awarię, system podsuwa mu procedurę: co się stało, dlaczego i jakie sprawdzenie zatrzyma to następnym razem. Takich blizn mam już ponad 100 i każda wyszła z prawdziwego projektu.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_faktura.webp",
            alt: "Faktura, na której po usunięciu profilu cicho podmieniła się nazwa sprzedawcy, i blokada tej podmiany",
            caption: "Cicha podmiana sprzedawcy na fakturze dostała własny szlaban",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "Przykład z filmu: w jednej aplikacji po usunięciu profilu program po cichu podstawił na fakturę innego sprzedawcę. Bez błędu i bez czerwonego okienka. Dziś taka podmiana jest blokowana, a jeśli program nie wie, co wstawić, ma się zatrzymać i powiedzieć to wprost. Wtedy decyzję podejmuje operator.",
          },
          {
            t: "p",
            text: "**Zasób:** jak wygląda taka blizna w praktyce, zobaczysz w pliku `pg/cases.md` w [publicznym repozytorium](https://github.com/kamiljan11/coding-higher-mind). Każda bramka cytuje tam awarię, z której powstała.",
          },
          {
            t: "h2",
            id: "dowod",
            text: "Pomysł 3: „gotowe” bez dowodu to tylko słowo",
          },
          {
            t: "p",
            text: "Trzeci pomysł dotyczy końca pracy. U mnie „gotowe” nie znaczy, że AI tak napisało i ja wierzę. Znaczy, że ktoś to sprawdził. Po każdej zmianie pliku od razu lecą narzędzia, które łapią błędy, trochę jak kompilator. Jeśli coś nie gra, AI dostaje to z powrotem i poprawia, zanim zmiana pójdzie dalej, a przed ogłoszeniem końca pracy sprawdzenia lecą jeszcze raz.",
          },
          {
            t: "p",
            text: "W aplikacjach internetowych jest jeszcze trik z celowym psuciem kodu. Przy zgłaszaniu zmiany program psuje zmienione pliki w wielu miejscach, jedno po drugim, i patrzy, czy testy to wyłapią. Jeśli złapią mniej niż połowę usterek, zmiana dostaje czerwone światło, bo to znaczy, że testy są słabe.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_mutacje.webp",
            alt: "Lista zmienionych plików z celowo wprowadzonymi usterkami i czerwonym znakiem, gdy testy ich nie łapią",
            caption: "Celowo zepsuty kod pokazuje, czy testy w ogóle coś łapią",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "Kontroli nie ma być za dużo. Na katar nikt nie robi rezonansu, więc system sam ocenia ryzyko zmiany, patrząc na to, co się realnie zmieniło, a nie na opis. Literówkę sprawdzają automaty. Gdy zmiana dotyka logowania, haseł, płatności albo bazy danych, AI nie może sama ogłosić końca: zmianę oglądają osobni agenci, od kodu, od bezpieczeństwa, od danych i od działania systemu.",
          },
          {
            t: "p",
            text: "Haczyk, który lubię najbardziej: recenzenci nie widzą mojej rozmowy z AI, pracują równolegle i nie wiedzą, co napisali pozostali. To druga opinia u lekarza, któremu nie mówisz, co powiedział pierwszy. Nie da się ich przegadać, a nie ma kto im przytakiwać.",
          },
          {
            t: "p",
            text: "Jeden agent próbuje obalić uwagi bez dowodu, więc zostają tylko te z dowodem, a przy aplikacjach recenzent sam ją uruchamia i klika jak tester.",
          },
          {
            t: "p",
            text: "Repozytorium opisuje ten układ dokładniej: poziom ryzyka od T0 do T3 liczony z diffu, a nie z prompta, oraz 9 agentów-recenzentów tylko do odczytu, ze świeżym kontekstem i wynikiem w formacie JSON ([README](https://github.com/kamiljan11/coding-higher-mind)).",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_slepi.webp",
            alt: "Cztery osobne kabiny recenzentów: kod, bezpieczeństwo, dane i działanie, każda widzi tylko zmianę",
            caption: "Każdy recenzent widzi tylko zmianę i swoje zadanie",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "Na koniec raport. Każdy kończy się jednym z trzech słów: „sprawdzone”, „niesprawdzone” z dopiskiem, czego brakuje, albo „nie wyszło” z dopiskiem, dlaczego. Ta zasada jest doklejana do każdego małego polecenia, więc AI nie ma jak o niej zapomnieć. Używam jej też w Claude Cowork przy mailach, dokumentach i researchu: ostatnie zdanie raportu mówi mi, na czym AI się oparło.",
          },
          {
            t: "h2",
            id: "przestac",
            text: "Kiedy przestać dokładać blokady i czego system nie robi",
          },
          {
            t: "p",
            text: "Z pilnowaniem łatwo przesadzić. Blokada, która częściej przeszkadza niż łapie błędy, jest jak alarm samochodowy wyjący przy każdym autobusie: po tygodniu nikt nie zwraca na niego uwagi, a gdy zaczynasz blokady obchodzić, cały system traci sens. Moja zasada: nie ma prawdziwego problemu, nie ma nowej blokady. System liczy, które blokady coś złapały, ale sam niczego nie dodaje ani nie wyłącza. Daje mi liczby, a decyzję podejmuję ja.",
          },
          {
            t: "p",
            text: "I uczciwie o granicach. System pilnuje AI w czasie pisania kodu. Nie chroni działającej aplikacji przed hakerami i nie zrobi z niej aplikacji bez błędów. Błędów będzie mniej, a każdy, który raz się zdarzył, dostaje swoje sprawdzenie. Repozytorium ma zresztą własną listę [znanych granic](https://github.com/kamiljan11/coding-higher-mind).",
          },
          {
            t: "p",
            text: "W filmie pokazywałem też wynik własnego pomiaru historii projektów, ale nie mam do niego źródła, które mógłbym tu podać, więc w artykule go nie powtarzam. Liczbę, której nie umiem pokazać, wolę pominąć.",
          },
          {
            t: "h2",
            id: "w-srodku",
            text: "W środku: skille, narada, pamięć, sejf i sygnał stop",
          },
          {
            t: "p",
            text: "Szlabany to nie wszystko. W systemie jest kilkanaście gotowych skilli, czyli instrukcji dla AI na konkretne zadania. Jeden przegląda zmianę jak w software house’ie, drugi pilnuje, żeby AI nie przytakiwało dla świętego spokoju, trzeci szuka przyczyny błędu zamiast łatać objawy, a czwarty każe AI przy kodzie mówić jak jaskiniowiec: krótko, bez lania wody, mniej słów, mniej zużytego limitu.",
          },
          {
            t: "p",
            text: "Przy większych zmianach najpierw powstaje plan, a skrypt sprawdza, czy nie opisuje rzeczy, których w projekcie nie ma. Skill od architektury potrafi powiedzieć wprost: tego jeszcze nie potrzebujesz. Przy ważnych decyzjach agenci robią naradę: każdy osobno przedstawia stanowisko, jeden z założenia jest przeciw, a wspólną decyzję zapisuje się z uzasadnieniem, żeby za pół roku było wiadomo, dlaczego tak, a nie inaczej.",
          },
          {
            t: "p",
            text: "Każda nowa rozmowa z AI jest jak nowy pracownik co rano. Dlatego na koniec pracy system zapisuje krótką notatkę, a na początku nowej rozmowy ją wczytuje. Dokumentacja zaczyna się od pierwszego dnia: opis budowy, słownik pojęć, instrukcja na wypadek awarii. Jeśli kod zaczyna przeczyć opisowi podziału na części, zmiana nie przechodzi.",
          },
          {
            t: "p",
            text: "Klucze do systemów leżą u mnie w sejfie, AI może ich użyć, ale nigdy ich nie zobaczy: nie trafiają do rozmowy ani do kodu. To moja własna konfiguracja, nie część paczki. Na koniec sygnał stop: gdy AI cztery razy z rzędu robi to samo, jak mucha uderzająca w tę samą szybę, system je zatrzymuje, a ono szuka innego rozwiązania.",
          },
          {
            t: "h2",
            id: "co-weziesz",
            text: "Co z tego weźmiesz, nawet bez kodu",
          },
          {
            t: "p",
            text: "Nie musisz być programistą. Dopisz do swojej rozmowy z AI jedno zdanie: każdy raport ma się kończyć słowem „sprawdzone”, „niesprawdzone” albo „nie wyszło”. Zapisanie zasady zajmie minutę, a wiesz potem, na czym stoisz. Nie obiecuję, że to rozwiąże halucynacje, ale odsłania moment, w którym AI dopowiada coś, czego nie sprawdziło.",
          },
          {
            t: "p",
            text: "Jeśli pracujesz w Claude Code, możesz zainstalować system u siebie. Wymagania według [README](https://github.com/kamiljan11/coding-higher-mind): Node 20 lub nowszy, git i Claude Code. Instalator najpierw pokaże, co zmieni, nie nadpisze pliku, który zmieniłeś, i na końcu uruchomi własny samotest:",
          },
          {
            t: "code",
            code: "git clone https://github.com/kamiljan11/coding-higher-mind.git\ncd coding-higher-mind\nnode install.mjs --dry-run   # pokazuje plan, niczego nie dotyka\nnode install.mjs             # kopiuje pliki, dokleja hooki, uruchamia samotest",
          },
          {
            t: "p",
            text: "Gdy system Ci się nie spodoba, `node uninstall.mjs` usuwa rejestracje hooków i blok w `CLAUDE.md`. Pliki kasujesz sam, to Twoja decyzja. Całość jest darmowa i otwarta, a instrukcja po polsku leży w `README.pl.md`. Możesz też zacząć od samych skilli, bez hooków i bez zmian w ustawieniach.",
          },
          {
            t: "p",
            text: "**Zasób:** repozytorium [coding-higher-mind](https://github.com/kamiljan11/coding-higher-mind) i opis całego systemu z rysunkiem na [kamiljan.com/claude](https://kamiljan.com/claude). Jeśli coś zauważysz albo wpadniesz na lepszy pomysł, zapraszam do współtworzenia.",
          },
          {
            t: "h2",
            id: "podsumowanie",
            text: "Podsumowanie",
          },
          {
            t: "list",
            items: [
              "Szlaban zamiast tabliczki: hook sprawdza i zatrzymuje, a wyjątek wydaje tylko człowiek",
              "Każdy błąd zostawia bliznę: nowe sprawdzenie zamiast obietnicy, że będę uważać",
              "„Gotowe” bez dowodu to tylko słowo: raport kończy się słowem sprawdzone, niesprawdzone albo nie wyszło",
              "Nie ma prawdziwego problemu, nie ma nowej blokady",
            ],
          },
          {
            t: "p",
            text: "[Cały film](https://youtu.be/VeM1WTRy8nA) obejrzysz na moim kanale na YouTube, a link do repozytorium znajdziesz w jego opisie. Nie chodzi o to, kto pisze kod, tylko o to, kto go sprawdza.",
          },
          {
            t: "p",
            text: "Czy w Twojej pracy z AI ktoś sprawdza „gotowe”, zanim uznasz sprawę za zamkniętą?",
          },
        ],
      },
      en: {
        title: "3 ideas to stop AI from saying “done” without proof",
        description:
          "A barrier instead of a sign, a scar after every mistake and a report ending in one of three words: how I guard AI while it codes, with a hook config and install steps.",
        lead: "3 ideas my system for guarding AI while it codes stands on: a barrier, a scar and proof. A study of coding agents found that 3 in 4 failed tasks were reported as a success. Below I lay out the [film](https://youtu.be/VeM1WTRy8nA) step by step, with a working hook, sources and install commands.",
        blocks: [
          {
            t: "p",
            text: "The film is condensed. Here you get the same material in the order you can apply it, plus what did not fit into the recording: a working hook configuration, what the study on false successes actually says, and the install commands.",
          },
          {
            t: "youtube",
            id: "VeM1WTRy8nA",
            title: "3 ideas to stop AI from saying “done” without proof",
            poster: "/blog/ai-gotowe-bez-dowodu/cover.webp",
          },
          {
            t: "h2",
            id: "problem",
            text: "The problem: AI says “done” and nothing works",
          },
          {
            t: "p",
            text: "You know this one. You ask AI for a fix, it cheerfully replies that everything works, you check, and nothing does. For a long time I thought it was only my impression. Then I found a study that measures it.",
          },
          {
            t: "p",
            text: "The author looked at coding agents that judged their own tasks. Among the runs with an explicit status report, 75.8% of the failed tasks were reported as a success. That is the AppWorld benchmark and four model families. In another set, tau2-bench, the share was 45 to 48% of failed runs in single-control domains and only 3% in the telecom domain. Source: [Advani, “From Confident Closing to Silent Failure” (arXiv, June 2026)](https://arxiv.org/abs/2606.09863).",
          },
          {
            t: "p",
            text: "In the film I say “in three cases out of four”, because that is the result for coding agents. Do not read it as “AI lies three times out of four”: it is the share among tasks that had already failed.",
          },
          {
            t: "p",
            text: "**Warning:** the number applies to specific agents and one benchmark. Your tool and your tasks may do better or worse. The conclusion holds: an agent’s report about its own success is a claim, not proof.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_raport.webp",
            alt: "An AI report ends with one of three words: verified, unverified or failed, each with a note",
            caption: "An AI report ends with one of three words",
            width: 960,
            height: 540,
          },
          {
            t: "h2",
            id: "autor-bez-redaktora",
            text: "Where it came from: an author without an editor",
          },
          {
            t: "p",
            text: "In a big company nobody ships code alone. It is like a book: the author writes, the editor reads, the proofreader catches the mistakes the author can no longer see. In code it is similar: one writes, another checks, a third watches the rollout.",
          },
          {
            t: "p",
            text: "My setup is different. Together with Arek I run Cetus Automation inside the software house CetusPro. Arek works with clients, sets up processes and watches deployments, and in most projects I write all the code myself. I am an author without an editor.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_ksiazka.webp",
            alt: "An editor, proofreader and bookshop line: who checks the text before it reaches the reader",
            caption: "Author, editor, proofreader: how code goes through a company",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "At first I thought good rules were enough, so I wrote them down. They looked great. Then I ran an audit and found that most changes reached the finished product with no review at all. The rules worked on paper. The audit described in the system’s repository points the same way: rules written as prose were broken at scale, for example 79% of commits went straight to the main branch and code review ran in 2.5% of sessions ([repository README](https://github.com/kamiljan11/coding-higher-mind)).",
          },
          {
            t: "p",
            text: "So I built a system that pretends to be a small team: one agent writes, others act as editor and proofreader, and automated checks watch every step. The decisions stay mine, and every truly risky change waits for my approval, at least for now.",
          },
          {
            t: "h2",
            id: "szlaban",
            text: "Idea 1: a barrier instead of a sign",
          },
          {
            t: "p",
            text: "A no-entry sign stops nobody. In Claude Code, rules go into an instructions file, the AI reads it at the start and knows what is forbidden. After a long conversation it can overlook it. A barrier is different: a small program that fires at a specific moment, checks by itself and stops the traffic.",
          },
          {
            t: "p",
            text: "In Claude Code these programs are called hooks. The documentation describes them as commands that run on events: PreToolUse before a tool runs, PostToolUse after a successful call, and Stop when the AI finishes its answer. Exit code 2 from a PreToolUse hook blocks the call and the error text goes back to the AI as the reason ([hooks documentation](https://code.claude.com/docs/en/hooks)). You keep the configuration in `~/.claude/settings.json` or in the project’s `.claude/settings.json`.",
          },
          {
            t: "p",
            text: "The example from the film, overwriting the change history, can be blocked like this. First the settings entry:",
          },
          {
            t: "code",
            code: '{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Bash",\n        "hooks": [\n          { "type": "command", "command": "~/.claude/hooks/no-force.sh" }\n        ]\n      }\n    ]\n  }\n}',
          },
          {
            t: "p",
            text: "Then the script itself, `~/.claude/hooks/no-force.sh` (it needs `jq` and must be executable):",
          },
          {
            t: "code",
            code: '#!/bin/bash\ninput=$(cat)\ncommand=$(jq -r \'.tool_input.command\' <<<"$input")\nif [[ "$command" =~ git[[:space:]]+push.*(--force|[[:space:]]-f([[:space:]]|$)) ]]; then\n  echo "Blocked: do not rewrite history, record the change as a new commit." >&2\n  exit 2\nfi\nexit 0',
          },
          {
            t: "p",
            text: "I tested this script on two commands: `git push --force origin main` ends with code 2 and the message, while a plain `git push origin feat` passes with code 0. It is a simplified skeleton, not my full guard. The real one also blocks `--no-verify`, `reset --hard` and a few other commands, but the idea is the same: the AI gets a reason and knows what to do instead.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_force.webp",
            alt: "A terminal showing the blocked git push --force command and the advice to record a new change",
            caption: "The barrier stops the history overwrite and suggests a new change",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "Two things make it a barrier and not decoration. Each one has its own test that checks it really blocks something. And the AI cannot switch it off: an exception is granted by a human typing consent in the conversation, only for a moment or a few uses, and every use is logged.",
          },
          {
            t: "h2",
            id: "blizna",
            text: "Idea 2: every mistake leaves a scar",
          },
          {
            t: "p",
            text: "How do you know where to put a barrier? From mistakes that already happened once. After a bad session most people say “next time I will be careful”, and then do the same thing, because being careful changes nothing. Aviation understood this long ago: after a serious accident nobody tells pilots to try harder, a new item is added to the procedure.",
          },
          {
            t: "p",
            text: "In my system it is called a “scar”: a new check so the same mistake does not pass twice. When I report a failure to the AI, the system hands it a procedure: what happened, why, and which check will stop it next time. I now have over 100 such scars, and each one came from a real project.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_faktura.webp",
            alt: "An invoice where the seller name was silently swapped after a profile was deleted, and the block on that swap",
            caption: "The silent seller swap on an invoice got its own barrier",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "The example from the film: in one application, after a profile was deleted, the program quietly put a different seller on the invoice. No error, no red box. Today that swap is blocked, and if the program does not know what to put there, it must stop and say so. Then the operator decides.",
          },
          {
            t: "p",
            text: "**Resource:** you can see what a scar looks like in practice in `pg/cases.md` in the [public repository](https://github.com/kamiljan11/coding-higher-mind). Each gate there cites the failure it came from.",
          },
          {
            t: "h2",
            id: "dowod",
            text: "Idea 3: “done” without proof is just a word",
          },
          {
            t: "p",
            text: "The third idea is about the end of the work. In my setup “done” does not mean the AI wrote it and I believe it. It means someone checked. After every file change, tools run at once and catch errors, a bit like a compiler. If something is wrong, the AI gets it back and fixes it before the change moves on, and before it announces the end of the work the checks run once more.",
          },
          {
            t: "p",
            text: "For web applications there is also a trick with deliberately breaking code. When I submit a change, the program breaks the changed files in many places, one after another, and watches whether the tests catch it. If they catch less than half of the defects, the change gets a red light, because it means the tests are weak.",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_mutacje.webp",
            alt: "A list of changed files with deliberately injected defects and a red mark when tests miss them",
            caption: "Deliberately broken code shows whether the tests catch anything",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "There should not be too much control either. Nobody orders an MRI for a cold, so the system rates the risk of a change itself, looking at what really changed and not at the description. A typo is checked by automated tools. When a change touches login, passwords, payments or the database, the AI cannot declare it finished: separate agents review it, for code, security, data and how the system behaves.",
          },
          {
            t: "p",
            text: "The catch I like most: the reviewers do not see my conversation with the AI, they work in parallel and do not know what the others wrote. It is a second opinion from a doctor you do not tell what the first one said. You cannot talk them round, and nobody is there to agree with them.",
          },
          {
            t: "p",
            text: "One agent tries to knock down findings without proof, so only findings with proof remain, and for applications one reviewer runs the app and clicks through it like a tester.",
          },
          {
            t: "p",
            text: "The repository describes this layout in more detail: a risk tier from T0 to T3 computed from the diff, not from the prompt, and 9 read-only reviewer agents with fresh context and JSON output ([README](https://github.com/kamiljan11/coding-higher-mind)).",
          },
          {
            t: "img",
            src: "/blog/ai-gotowe-bez-dowodu/s_slepi.webp",
            alt: "Four separate reviewer booths: code, security, data and behaviour, each seeing only the change",
            caption: "Each reviewer sees only the change and its own task",
            width: 960,
            height: 540,
          },
          {
            t: "p",
            text: "Finally, the report. Every report ends with one of three words: “verified”, “unverified” with a note on what is missing, or “failed” with a note on why. The rule is attached to every small instruction, so the AI cannot forget it. I use it in Claude Cowork too, for emails, documents and research: the last sentence of the report tells me what the AI relied on.",
          },
          {
            t: "h2",
            id: "przestac",
            text: "When to stop adding blockers, and what the system does not do",
          },
          {
            t: "p",
            text: "It is easy to overdo the guarding. A blocker that gets in the way more often than it catches errors is like a car alarm that goes off for every bus: after a week nobody notices it, and once you start working around blockers the whole system loses its point. My rule: no real problem, no new blocker. The system counts which blockers caught something, but it adds or removes nothing by itself. It gives me numbers and I decide.",
          },
          {
            t: "p",
            text: "And honestly about the limits. The system guards the AI while it writes code. It does not protect a running application from hackers and it will not make an application bug free. There will be fewer bugs, and every one that happened once gets its check. The repository also has its own list of [known limits](https://github.com/kamiljan11/coding-higher-mind).",
          },
          {
            t: "p",
            text: "In the film I also showed a measurement of my own project history, but I have no source for it that I could give here, so I do not repeat it in the article. A number I cannot show is a number I leave out.",
          },
          {
            t: "h2",
            id: "w-srodku",
            text: "Inside: skills, council, memory, vault and the stop signal",
          },
          {
            t: "p",
            text: "Barriers are not everything. The system has more than a dozen ready skills, which are instructions for the AI for specific tasks. One reviews a change the way a software house does, another keeps the AI from agreeing just to keep the peace, a third looks for the cause of a bug instead of patching symptoms, and a fourth makes the AI talk like a caveman while coding: short, no padding, fewer words, less of the limit used.",
          },
          {
            t: "p",
            text: "For bigger changes a plan comes first, and a script checks that it does not describe things missing from the project. The architecture skill can say it plainly: you do not need this yet. For important decisions the agents hold a council: each states a position separately, one is against by design, and the joint decision is written down with its reasoning, so in half a year you know why it was done this way.",
          },
          {
            t: "p",
            text: "Every new conversation with an AI is like a new employee every morning. So at the end of work the system writes a short note and reads it at the start of the next conversation. Documentation starts on day one: how it is built, a glossary, what to do when something breaks. If the code starts to contradict the description of how the project is split, the change does not pass.",
          },
          {
            t: "p",
            text: "My keys to other systems sit in a vault, the AI can use them but never sees them: they reach neither the conversation nor the code. That is my own setup, not part of the package. Last, the stop signal: when the AI does the same thing four times in a row, like a fly hitting the same window, the system stops it and it looks for another solution.",
          },
          {
            t: "h2",
            id: "co-weziesz",
            text: "What you can take from it, even without code",
          },
          {
            t: "p",
            text: "You do not have to be a programmer. Add one sentence to your conversation with the AI: every report must end with the word “verified”, “unverified” or “failed”. Writing the rule takes a minute, and afterwards you know where you stand. I do not promise it fixes hallucinations, but it exposes the moment the AI fills in something it did not check.",
          },
          {
            t: "p",
            text: "If you work in Claude Code you can install the system. Requirements per the [README](https://github.com/kamiljan11/coding-higher-mind): Node 20 or newer, git and Claude Code. The installer shows what it will change first, does not overwrite a file you changed, and runs its own self-test at the end:",
          },
          {
            t: "code",
            code: "git clone https://github.com/kamiljan11/coding-higher-mind.git\ncd coding-higher-mind\nnode install.mjs --dry-run   # shows the plan, touches nothing\nnode install.mjs             # copies files, merges hooks, runs the self-test",
          },
          {
            t: "p",
            text: "If you do not like the system, `node uninstall.mjs` removes the hook registrations and the block in `CLAUDE.md`. You delete the files yourself, that is your decision. The whole thing is free and open, and the Polish instructions are in `README.pl.md`. You can also start with the skills alone, with no hooks and no settings changes.",
          },
          {
            t: "p",
            text: "**Resource:** the repository [coding-higher-mind](https://github.com/kamiljan11/coding-higher-mind) and a description of the whole system with a diagram at [kamiljan.com/claude](https://kamiljan.com/claude). If you notice something or have a better idea, you are welcome to contribute.",
          },
          {
            t: "h2",
            id: "podsumowanie",
            text: "Summary",
          },
          {
            t: "list",
            items: [
              "A barrier instead of a sign: a hook checks and stops, and only a human grants an exception",
              "Every mistake leaves a scar: a new check instead of a promise to be careful",
              "“Done” without proof is just a word: a report ends with verified, unverified or failed",
              "No real problem, no new blocker",
            ],
          },
          {
            t: "p",
            text: "You can watch [the whole film](https://youtu.be/VeM1WTRy8nA) on my YouTube channel, and the repository link is in its description. It is not about who writes the code, it is about who checks it.",
          },
          {
            t: "p",
            text: "In your work with AI, does anyone check “done” before you call the matter closed?",
          },
        ],
      },
    },
  },
  {
    // every fact below is from the video as published on YouTube on 2026-10-25
    // (its description and the Polish captions, re-read in full on 2026-11-15
    // for the full write-up)
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
          "Trzy zasady, których trzymam się przy wdrożeniach AI w firmach, rozpisane krok po kroku: jak znaleźć proces, który boli, jak sprawdzić, czy ludzie dalej z tego korzystają, i 5 pytań przed budowaniem.",
        lead: "Według badania MIT 95% firm, które inwestują w AI, nie widzi z tego zwrotu. Przez długi czas sam byłem w tych 95%: budowałem narzędzia, które wydawały mi się świetne, a żadne nie zarobiło ani złotówki. Poniżej rozpisuję film krok po kroku, z przykładem do policzenia i pytaniami, które możesz zadać u siebie.",
        blocks: [
          { ...VIDEO_95, title: "95% firm nie widzi zysku z AI. Byłem w tych 95%" },
          {
            t: "p",
            text: "Dziś trzymam się trzech zasad. Buduję tylko tam, gdzie coś mocno boli. Wdrażam tak, żeby po miesiącu ludzie dalej z tego korzystali. I biorę jeden proces na raz, a nie całą firmę. Na końcu jest 5 pytań, które zadaję, zanim cokolwiek zbuduję.",
          },
          { t: "h2", id: "ai-dziala", text: "AI działa. Problem zaczyna się w procesach" },
          {
            t: "p",
            text: "Te 95% nie znaczy, że AI nie działa. W tym samym badaniu w ponad 90% firm pracownicy używają AI na własną rękę, tylko że z prywatnych kont. Do prostych zadań czat sprawdza się świetnie. Kłopot zaczyna się wtedy, gdy AI ma obsługiwać codzienne procesy całej firmy: zamówienia, faktury, obieg dokumentów. Tym kawałkiem się zajmuję.",
          },
          {
            t: "p",
            text: "Kiedy razem z partnerem otworzyliśmy bezpłatny pilotaż, pierwsza grupa zapełniła się w półtora tygodnia. Pilotaż był darmowy, więc to jeszcze niczego nie dowodzi. Pokazuje tylko, że firmy chcą spróbować. Sztuką jest zrobić coś, co przetrwa pierwszy miesiąc.",
          },
          { t: "h2", id: "zasada-1", text: "Zasada 1: buduj tam, gdzie mocno boli" },
          {
            t: "p",
            text: "Firma zapłaci za rozwiązanie wtedy, gdy dostaje z niego więcej, niż na nie wydaje. Żeby to wiedzieć, musi umieć policzyć, ile dziś kosztuje ją problem. Dlatego szukam miejsca, przez które ktoś codziennie traci czas i pieniądze, i da się to pokazać na liczbach. Za ból, którego nie da się policzyć, nikt nie zapłaci. A jeśli nawet zapłaci, po miesiącu nikt nie będzie wiedział, czy było warto.",
          },
          {
            t: "p",
            text: "Uważaj na problemy, które tylko wydają się duże, bo głośne nie znaczy drogie. W każdej firmie ktoś na coś narzeka, a kiedy policzysz godziny, wychodzi na przykład 20 minut w tygodniu. Prawdziwy ból często jest cichy: ktoś od lat robi nudną rzecz i przestał ją zauważać.",
          },
          { t: "h2", id: "zaplecze", text: "Dlaczego zaplecze daje szybszy zwrot niż marketing" },
          {
            t: "p",
            text: "Według badania MIT od połowy do 70% budżetów na AI idzie w sprzedaż i marketing. To wygląda logicznie, bo sprzedaż to pieniądze, a efekt łatwo pokazać zarządowi. A jednak zaplecze, czyli faktury, zamówienia i dokumenty, częściej daje szybszy zwrot. Marketing też da się zmierzyć, i to całkiem dobrze. Różnica jest w pewności: oszczędność na zapleczu masz od pierwszego miesiąca, bo to mniej godzin, mniej błędów i mniej płacenia na zewnątrz. Wzrost sprzedaży to często obietnica, która musi się dopiero sprawdzić.",
          },
          {
            t: "p",
            text: "Autorzy badania piszą wprost, że najwyższy zwrot czeka w działach, które firmy często pomijają. Kiedy firma mówi, że chce zacząć z AI, ale nie wie od czego, zaczynamy od zaplecza. Pierwszy projekt ma dać pewny, policzalny wynik i zbudować zaufanie. Kiedy ludzie zobaczą, że to działa, z resztą idzie dużo łatwiej i chętniej z tego korzystają.",
          },
          { t: "h2", id: "jak-znalezc", text: "Jak znaleźć proces, który najbardziej boli" },
          {
            t: "p",
            text: "Weź kartkę i wypisz rzeczy, które ktoś u Ciebie robi ręcznie co tydzień: przepisywanie zamówień, pilnowanie terminów płatności, szukanie dokumentów, raporty w Excelu. Przy każdej dopisz dwie liczby: ile godzin tygodniowo to zajmuje i ile kosztuje jeden błąd.",
          },
          {
            t: "p",
            text: "**Przykład:** ktoś przepisuje zamówienia 5 godzin tygodniowo. To 20 godzin w miesiącu, czyli dwa i pół dnia pracy. Dodaj do tego jedną pomyłkę: zły towar u klienta, reklamację i drugi transport. Masz świetnego kandydata.",
          },
          {
            t: "p",
            text: "Taka lista pokaże Ci tylko to, co ludzie pamiętają, że robią. Najwięcej widać dopiero wtedy, gdy prześledzisz jeden zwykły dzień jednej osoby od rana do wieczora: skąd bierze się zamówienie, gdzie je wpisuje, komu wysyła, na co czeka, co sprawdza dwa razy. Krok po kroku, bez pomijania nudnych fragmentów.",
          },
          {
            t: "p",
            text: "Tak pracujemy z moim partnerem. Arek jedzie do firmy, spędza czas z konkretną osobą i mapuje jej procesy. Ja pomagam od strony technicznej, zwykle przez kamerę. Potem bierzemy kolejną osobę i powtarzamy to samo, aż mamy zmapowaną całą firmę razem z zależnościami między ludźmi. Sama rozmowa pokazuje, jak ludzie myślą, że pracują. Dopiero bycie na miejscu pokazuje, jak pracują naprawdę.",
          },
          { t: "h2", id: "czego-nie", text: "Czego nie opłaca się automatyzować" },
          {
            t: "p",
            text: "Są też procesy, których po prostu nie opłaca się automatyzować, i często doradzamy, żeby czegoś nie robić. Na początku nowe narzędzie spowalnia ludzi, bo muszą się go nauczyć i zmienić nawyki, a to nie jest łatwe. Jeśli coś zajmuje pół godziny w miesiącu i rzadko się sypie, porównaj to z kosztem wdrożenia i przestawienia się. Często bardziej opłaca się żyć z małym problemem. Takie rzeczy zostaw w spokoju, przynajmniej na początku.",
          },
          { t: "h2", id: "64-ekrany", text: "Aplikacja z 64 ekranami i jednym zleceniem" },
          {
            t: "p",
            text: "Teraz moja wpadka. Zbudowałem aplikację do prowadzenia warsztatu samochodowego. Miała około 64 ekranów i byłem z niej bardzo zadowolony. Po oddaniu zajrzałem do niej po jakimś czasie i znalazłem w niej jedno zlecenie. Praktycznie nikt jej nie używał.",
          },
          {
            t: "p",
            text: "Funkcji nie brakowało. Brakowało zmiany sposobu pracy: ludzie dalej robili wszystko po staremu, więc aplikacja nie miała czego obsługiwać. Nauka kosztowała mnie około 40 repozytoriów na GitHubie, z czego może 10 to naprawdę mocne rozwiązania. To, co jest mocne technicznie, nie znaczy, że ktoś tego używa. Ta droga nauczyła mnie rzeczy, których nie wyczytasz w dokumentacji: jak prowadzić ludzi, żeby zobaczyli sens w nowym narzędziu, i jak budować na tyle prosto, żeby używanie ich nie męczyło. Aplikacja przeszła od tamtej pory dużą zmianę, opisałem ją w [case studies](/case-studies#ai-native-workshop-management).",
          },
          {
            t: "h2",
            id: "zasada-2",
            text: "Zasada 2: wdrożenie, które przetrwa zwykły poniedziałek",
          },
          {
            t: "p",
            text: "Większość projektów nie umiera przy budowaniu. Umiera między próbnym wdrożeniem a zwykłym dniem pracy. W pierwszym tygodniu wszyscy są podekscytowani i skupieni, więc wszystko działa. Potem przychodzi zwykły poniedziałek: zamówienie z błędem, ktoś na urlopie, ktoś zrobił coś po swojemu. Jeśli system nie ma na to odpowiedzi, ludzie po cichu wracają do starego sposobu i nikt się o tym nie dowie.",
          },
          {
            t: "p",
            text: "Dlatego u mnie projekt nie kończy się na oddaniu narzędzia. Siadamy z ludźmi, którzy będą z niego korzystać, i sprawdzamy, gdzie się potykają. Trzeba to zrobić wcześnie, zanim się zniechęcą, bo potem trudno to odkręcić.",
          },
          { t: "h2", id: "panel", text: "Panel wdrożeniowca i asystent AI w systemie" },
          {
            t: "p",
            text: "Żeby nie polegać na własnych oczach, buduję w aplikacji panel wdrożeniowca. Pokazuje on:",
          },
          {
            t: "list",
            items: [
              "kto w tym tygodniu się logował, a kto ani razu,",
              "ile zamówień przeszło przez system w porównaniu z tym, ile firma ma w zwykłym tygodniu,",
              "na którym kroku ludzie najczęściej przerywają.",
            ],
          },
          {
            t: "p",
            text: "Do tego dobudowuję asystenta AI, czyli czat, do którego ludzie są już przyzwyczajeni. Ten jest połączony z całym systemem. Patrzę, jakie pytania w nim padają. Jeśli jakieś się powtarza, to znak, że coś jest niedopracowane albo źle zaprojektowane. Raz w miesiącu Arek jedzie na miejsce i rozmawia z ludźmi, bo tego nic nie zastąpi. Dzięki temu ciche wracanie do starego sposobu widać po kilku dniach, a nie po kilku miesiącach.",
          },
          {
            t: "p",
            text: "**Rada:** jeśli ktoś sprzedaje Ci wdrożenie, zapytaj, co robi w drugim tygodniu po oddaniu. Jeśli nic, czyli nie sprawdza, czy narzędzie jest używane, i nie poprawia go, wiesz, w której grupie wylądujesz: w tej, która wydała dużo pieniędzy na rozwiązanie, którego nikt nie używa.",
          },
          { t: "h2", id: "zasada-3", text: "Zasada 3: jeden proces na raz" },
          {
            t: "p",
            text: "Skoro wdrożenie to najtrudniejszy etap, warto zrobić je jak najmniejszym. Kusi, żeby objąć systemem całą firmę albo od razu zbudować rozwiązanie, w którym działa wszystko. Z doświadczenia wiem, że to nigdy nie wyszło nam na dobre. W pierwszych tygodniach zawsze wychodzą rzeczy, których nie dało się wcześniej wiedzieć: źle nazwane pole, brakujący krok, proces, który na mapie wyglądał inaczej niż w praktyce. Ludzie rzadko myślą o tym, jak wygląda ich dzień pracy, więc to wychodzi w praniu.",
          },
          {
            t: "p",
            text: "Przy jednym procesie i jednej osobie wpadkę poprawia się w dzień albo dwa i jedzie się dalej. Równolegle zostaje stary sposób, papier albo Excel, jako zabezpieczenie, więc firma się nie sypie. Gdy bierzesz całą firmę na raz, wpadka dotyka wszystkich, nikt nie wie, skąd się wzięła, ludzie się irytują i trudno im potem znowu zaufać. Projekt ląduje w szufladzie.",
          },
          {
            t: "h2",
            id: "jedno-srodowisko",
            text: "Jedno środowisko zamiast porozrzucanych Exceli",
          },
          {
            t: "p",
            text: "Jeden proces na raz nie znaczy osobnego narzędzia do każdego procesu. W firmach, do których wchodzimy, dane są zwykle porozrzucane między Excelami, skrzynkami mailowymi i starymi systemami, których nikt nie chce ruszać, bo boi się, że wszystko się rozsypie. Dlatego buduję jedno środowisko i wpinam do niego proces po procesie, moduł po module. To, co dotąd żyło w kilku miejscach, żyje w jednym.",
          },
          {
            t: "p",
            text: "Takie środowisko robi dwie rzeczy. Porządkuje chaos, bo dane z różnych miejsc lądują w jednym. I przyzwyczaja ludzi do jednej aplikacji, więc każdy kolejny proces wchodzi łatwiej niż poprzedni. Ludzie nie uczą się nowego narzędzia, tylko dostają nową zakładkę w tym, które już znają.",
          },
          {
            t: "p",
            text: "Zgadza się to z tym, co badanie widzi u firm, którym AI się opłaciło. Wybierały narzędzie dopasowane do konkretnego procesu, a nie ogólny system do wszystkiego. Traktowały wdrożenie jak wspólną pracę z wykonawcą i przechodziły przez pierwsze błędy, zamiast rezygnować po pierwszym.",
          },
          { t: "h2", id: "5-pytan", text: "5 pytań przed wdrożeniem AI" },
          {
            t: "list",
            items: [
              "**Kto dziś robi to ręcznie i ile godzin tygodniowo na to idzie?** To koszt, który da się policzyć.",
              "**Ile kosztuje jeden błąd w tym procesie?** Czasem jedna pomyłka kosztuje więcej niż miesiąc ręcznej pracy.",
              "**Kto będzie z tego korzystał w poniedziałek o 8 rano?** Jeśli nie ma konkretnej osoby, skończysz jak ja z aplikacją z jednym zleceniem.",
              "**Kto w firmie będzie tego pilnował na co dzień?** Bez osoby, która przypomina, zachęca i pierwsza zauważa powrót do Excela, nawet dobre narzędzie powoli umiera.",
              "**Po jakiej jednej liczbie poznamy za 30 dni, że to działa?** Bez niej nie wiesz, czy się udało.",
            ],
          },
          {
            t: "p",
            text: "Jeśli na któreś nie umiesz odpowiedzieć, jeszcze nie czas na budowanie. Najpierw trzeba to poukładać. Zauważ, że każde z tych pytań dotyczy jednego procesu, a nie całej firmy.",
          },
          {
            t: "p",
            text: "Chcesz przejść przez jeden proces ze mną? Napisz przez formularz albo mailem na [kamiljan.com](/). Nie obiecuję, że odpiszę szybko, ale odpiszę osobiście.",
          },
          { t: "h2", id: "zrodla", text: "Źródła i kulisy" },
          {
            t: "p",
            text: `Badanie: MIT NANDA, „The GenAI Divide: State of AI in Business 2025” (lipiec 2025), dostęp przez [stronę projektu](${MIT_NANDA}); omówienie w [Fortune](${FORTUNE}). Wyniki są wstępne i badanie ma swoje słabe strony, mówię o tym w filmie. Sprawdź je sam, zanim komuś je zacytujesz.`,
          },
          {
            t: "p",
            text: "Film zmontował AI (Claude Code) na moim laptopie z Linuxem, na darmowych narzędziach open source. Narzędzie jest na GitHubie: [video-pipeline](https://github.com/kamiljan11/video-pipeline). Wdrożenia robię razem z [Cetus Automation](https://automation.cetuspro.com), ich logo jest na miniaturze.",
          },
        ],
      },
      en: {
        title: "95% of companies see no return from AI. I was one of them",
        description:
          "The three rules I follow when bringing AI into a company, step by step: how to find the process that hurts, how to check people still use the tool a month later, and 5 questions to ask before building.",
        lead: "According to an MIT study, 95% of companies investing in AI see no return from it. For a long time I was one of them: I built tools that seemed great to me, and none of them earned a single złoty. The video is in Polish, so below I lay it out step by step, with an example you can count and questions you can ask in your own company.",
        blocks: [
          { ...VIDEO_95, title: "95% of companies see no return from AI. I was one of them" },
          {
            t: "p",
            text: "Today I follow three rules. I build only where something really hurts. I roll out so that people still use it a month later. And I take one process at a time, not the whole company. At the end are 5 questions I ask before I build anything.",
          },
          { t: "h2", id: "ai-works", text: "AI works. The trouble starts in the processes" },
          {
            t: "p",
            text: "The 95% does not mean AI does not work. In the same study, employees in over 90% of companies use AI on their own, from private accounts. For simple tasks a chat works great. The trouble starts when AI has to run a whole company's daily processes: orders, invoices, document flow. That is the part I work on.",
          },
          {
            t: "p",
            text: "When my partner and I opened a free pilot, the first group filled up in a week and a half. The pilot was free, so that proves nothing yet. It only shows that companies want to try. The hard part is building something that survives the first month.",
          },
          { t: "h2", id: "rule-1", text: "Rule 1: build where it really hurts" },
          {
            t: "p",
            text: "A company pays for a solution when it gets more out of it than it spends. To know that, it has to be able to count what the problem costs today. So I look for the place where someone loses time and money every day, in a way you can show in numbers. Nobody pays for pain you cannot count. And even if they do, a month later nobody knows whether it was worth it.",
          },
          {
            t: "p",
            text: "Watch out for problems that only look big: loud is not the same as expensive. In every company someone complains about something, and when you count the hours it comes to, say, 20 minutes a week. The real pain is often quiet: someone has done a boring task for years and stopped noticing it.",
          },
          {
            t: "h2",
            id: "back-office",
            text: "Why the back office pays back faster than marketing",
          },
          {
            t: "p",
            text: "According to the MIT study, half to 70% of AI budgets go to sales and marketing. That looks logical: sales is money, and the effect is easy to show the board. Yet the back office, meaning invoices, orders and documents, more often pays back faster. Marketing can be measured too, and quite well. The difference is certainty: back-office savings are there from the first month, as fewer hours, fewer mistakes and less paid to outside firms. Sales growth is often a promise that still has to prove itself.",
          },
          {
            t: "p",
            text: "The study's authors say outright that the highest return waits in the departments companies often skip. When a company says it wants to start with AI but does not know where, we start with the back office. The first project should deliver a sure, countable result and build trust. Once people see it works, the rest goes much more easily and they use it more willingly.",
          },
          { t: "h2", id: "find-the-pain", text: "How to find the process that hurts most" },
          {
            t: "p",
            text: "Take a sheet of paper and list the things someone in your company does by hand every week: retyping orders, chasing payment dates, looking for documents, Excel reports. Next to each, write two numbers: how many hours a week it takes and what one mistake costs.",
          },
          {
            t: "p",
            text: "**Example:** someone retypes orders 5 hours a week. That is 20 hours a month, two and a half working days. Add one mistake: the wrong goods at a customer's, a complaint and a second delivery. You have a great candidate.",
          },
          {
            t: "p",
            text: "Such a list shows only what people remember doing. You see the most when you follow one ordinary day of one person from morning to evening: where an order comes from, where they enter it, who they send it to, what they wait for, what they check twice. Step by step, without skipping the boring parts.",
          },
          {
            t: "p",
            text: "That is how my partner and I work. Arek goes to the company, spends time with one specific person and maps their processes. I help on the technical side, usually over a camera. Then we take the next person and repeat, until the whole company is mapped, including the dependencies between people. A conversation alone shows how people think they work. Only being there shows how they really work.",
          },
          { t: "h2", id: "not-worth-it", text: "What is not worth automating" },
          {
            t: "p",
            text: "Some processes are simply not worth automating, and we often advise against doing something. At first a new tool slows people down, because they have to learn it and change habits, which is not easy. If something takes half an hour a month and rarely breaks, weigh it against the cost of rolling out and switching. Often it pays more to live with a small problem. Leave those alone, at least at the start.",
          },
          { t: "h2", id: "64-screens", text: "An app with 64 screens and one job order" },
          {
            t: "p",
            text: "Now my own failure. I built an app for running a car workshop. It had about 64 screens and I was very pleased with it. Some time after handing it over I looked inside and found one job order. Practically nobody used it.",
          },
          {
            t: "p",
            text: "No feature was missing. What was missing was a change in how people worked: they kept doing everything the old way, so the app had nothing to handle. The lesson cost me about 40 repositories on GitHub, maybe 10 of them truly solid. Technically strong does not mean anyone uses it. That road taught me what no documentation will: how to guide people so they see the point of a new tool, and how to build it simply enough that using it does not wear them out. The app has changed a lot since, see the [case studies](/case-studies#ai-native-workshop-management).",
          },
          { t: "h2", id: "rule-2", text: "Rule 2: a rollout that survives an ordinary Monday" },
          {
            t: "p",
            text: "Most projects do not die while being built. They die between the pilot and an ordinary working day. In the first week everyone is excited and focused, so everything works. Then an ordinary Monday comes: an order with a mistake, someone on holiday, someone doing it their own way. If the system has no answer to that, people quietly go back to the old way and nobody finds out.",
          },
          {
            t: "p",
            text: "So for me a project does not end when the tool is handed over. We sit down with the people who will use it and check where they stumble. It has to happen early, before they lose heart, because afterwards it is hard to undo.",
          },
          { t: "h2", id: "panel", text: "A rollout panel and an AI assistant in the system" },
          {
            t: "p",
            text: "So I do not rely on my own eyes, I build a rollout panel into the app. It shows:",
          },
          {
            t: "list",
            items: [
              "who logged in this week and who did not log in once,",
              "how many orders went through the system compared with a normal week for the company,",
              "at which step people most often give up.",
            ],
          },
          {
            t: "p",
            text: "On top of that I add an AI assistant, a chat people are already used to, connected to the whole system. I look at the questions people ask it. If one keeps coming back, something is unfinished or badly designed. Once a month Arek goes on site and talks to people, because nothing replaces that. This way a quiet return to the old way shows up after a few days, not a few months.",
          },
          {
            t: "p",
            text: "**Tip:** if someone sells you a rollout, ask what they do in the second week after handover. If the answer is nothing, no checking whether the tool is used and no fixes, you know which group you will end up in: the one that spent a lot of money on a solution nobody uses.",
          },
          { t: "h2", id: "rule-3", text: "Rule 3: one process at a time" },
          {
            t: "p",
            text: "Since the rollout is the hardest stage, it is worth keeping it as small as possible. It is tempting to cover the whole company, or to build a solution where everything works from day one. From experience, that never ended well for us. The first weeks always bring things nobody could know earlier: a badly named field, a missing step, a process that looked different on the map than in practice. People rarely think about what their working day looks like, so it comes out in the wash.",
          },
          {
            t: "p",
            text: "With one process and one person, a slip takes a day or two to fix and you move on. The old way, paper or Excel, stays in parallel as a safety net, so the company does not fall over. Take the whole company at once and a slip hits everyone, nobody knows where it came from, people get irritated and find it hard to trust the tool again. The project ends up in a drawer.",
          },
          { t: "h2", id: "one-place", text: "One environment instead of scattered spreadsheets" },
          {
            t: "p",
            text: "One process at a time does not mean a separate tool for each process. In the companies we work with, data usually sits scattered across spreadsheets, mailboxes and old systems nobody wants to touch for fear everything will fall apart. So I build one environment and plug processes into it one by one, module by module. What used to live in several places lives in one.",
          },
          {
            t: "p",
            text: "That environment does two things. It tidies up the chaos, because data from different places lands in one. And it gets people used to one app, so each new process goes in more easily than the last. People do not learn a new tool, they get a new tab in one they already know.",
          },
          {
            t: "p",
            text: "This matches what the study sees in companies where AI paid off. They chose tools fitted to a specific process, not a general system for everything. They treated the rollout as joint work with the vendor and got through the first mistakes instead of giving up after the first one.",
          },
          { t: "h2", id: "five-questions", text: "5 questions before an AI rollout" },
          {
            t: "list",
            items: [
              "**Who does this by hand today, and how many hours a week does it take?** That is a cost you can count.",
              "**What does one mistake in this process cost?** Sometimes one slip costs more than a month of manual work.",
              "**Who will use it on Monday at 8 a.m.?** Without a specific person, you end up like me with the one-job-order app.",
              "**Who in the company will look after it day to day?** Without someone who reminds, encourages and is first to spot the return to Excel, even a good tool slowly dies.",
              "**Which one number will tell us in 30 days that it works?** Without it you do not know whether it worked.",
            ],
          },
          {
            t: "p",
            text: "If you cannot answer one of them, it is not time to build yet. Sort that out first. Note that every question is about one process, not the whole company.",
          },
          {
            t: "p",
            text: "Want to go through one process with me? Write through the form or by email at [kamiljan.com](/). I cannot promise a fast reply, but I reply personally.",
          },
          { t: "h2", id: "sources", text: "Sources and behind the scenes" },
          {
            t: "p",
            text: `Study: MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (July 2025), via the [project page](${MIT_NANDA}); coverage in [Fortune](${FORTUNE}). The findings are preliminary and the study has weak points, which I say in the video. Check them yourself before you quote them.`,
          },
          {
            t: "p",
            text: "The video was edited by AI (Claude Code) on my Linux laptop, with free open-source tools. The tool is on GitHub: [video-pipeline](https://github.com/kamiljan11/video-pipeline). I do these rollouts together with [Cetus Automation](https://automation.cetuspro.com), whose logo is on the thumbnail.",
          },
        ],
      },
    },
  },
  {
    // every fact below is from the article as published on toRzeszów.pl on
    // 2026-10-25 (published blocks via the read-only panel client, checked
    // against the live page on 2026-11-05, not the draft)
    slug: "szkola-750-tys-na-cyberbezpieczenstwo",
    date: "2026-10-25",
    external: { url: SZKOLY, source: "toRzeszów.pl" },
    // the article's main picture is our own AI illustration (laptop file
    // foto/szkoly/szkoly_a2.png, pixel-matched to the portal image), not a portal
    // or agency photo, with the title on it
    cover: {
      src: "/blog/szkola-750-tys-na-cyberbezpieczenstwo/cover.webp",
      width: 1200,
      height: 630,
      alt: {
        pl: "Czworo nastolatków i nauczycielka w klasie pochylają się nad smartfonem, z napisem: Szkoła może dostać do 750 tys. zł na lekcje o cyberbezpieczeństwie.",
        en: "Four teenagers and a teacher in a classroom leaning over a smartphone, with the Polish title: a school can get up to 750,000 PLN for cybersecurity lessons.",
      },
    },
    body: {
      pl: {
        title:
          "Szkoła może dostać do 750 tys. zł na lekcje o cyberbezpieczeństwie. Mój tekst na toRzeszów.pl",
        description:
          "Szkoły z Podkarpacia mogą dostać do 750 tys. zł na zajęcia o bezpieczeństwie w sieci, także o oszustach, którzy używają AI. Wnioski do 10 listopada. Napisałem dla toRzeszów.pl, jak nie odpaść na starcie.",
        lead: "Napisałem dla toRzeszów.pl tekst o naborze, w którym szkoły z Podkarpacia mogą dostać pieniądze na lekcje o cyberbezpieczeństwie. Tu krótko, co w nim jest.",
        blocks: [
          {
            t: "p",
            text: "Wojewódzki Urząd Pracy w Rzeszowie ma w puli **20 mln zł** dla szkół podstawowych i ponadpodstawowych. Jeden projekt może być wart **od 200 tys. do 750 tys. zł**, dofinansowanie wynosi do 100 proc., a wnioski urząd przyjmuje **do 10 listopada**. Wśród 11 obszarów tematycznych są bezpieczne korzystanie z AI, AI jako narzędzie cyberprzestępców i dezinformacja, w tym deepfake'i.",
          },
          {
            t: "p",
            text: "Sam potrafię zbudować asystenta, który mówi ludzkim głosem. Dlatego uważam, że uczniowie nie powinni się uczyć rozpoznawania fałszywego nagrania po brzmieniu albo wyglądzie, tylko prostych nawyków: rozłączyć się i oddzwonić, sprawdzić u źródła, nie udostępniać dalej.",
          },
          { t: "h2", id: "co-radze", text: "Co radzę w tekście" },
          {
            t: "list",
            items: [
              "**Ustal z gminą albo starostwem, kto składa wniosek.** Jeśli szkoła i jej organ prowadzący złożą osobne wnioski obejmujące tę samą szkołę, odrzucone zostaną wszystkie.",
              "**Wybierz obszary tematyczne**: w szkole podstawowej co najmniej dwa, w ponadpodstawowej co najmniej trzy.",
              "**Policz uczestników.** Na jedną osobę może przypadać średnio najwyżej 7 500 zł, więc projekt za 750 tys. zł musi objąć co najmniej 100 uczniów i nauczycieli.",
              "**Zaplanuj szkolenie nauczycieli.** Jest obowiązkowe w każdym projekcie.",
            ],
          },
          {
            t: "p",
            text: "W tekście jest też, kto może złożyć wniosek, za co projekt dostanie dodatkowe punkty i dlaczego partnerstwo z firmą albo fundacją jest w tym naborze praktycznie niemożliwe. Najlepiej przesłać go dyrektorowi szkoły albo wychowawcy, bo na wniosek zostało niewiele czasu.",
          },
        ],
      },
      en: {
        title:
          "A school can get up to 750,000 PLN for cybersecurity lessons. My article on toRzeszów.pl",
        description:
          "Schools in the Podkarpacie region can apply for up to 750,000 PLN for lessons on online safety, including scams that use AI. Applications close on 10 November. I wrote for toRzeszów.pl how not to be rejected at the start. The article is in Polish.",
        lead: "I wrote an article for toRzeszów.pl, a local news site in Rzeszów, about a funding call for cybersecurity lessons in schools in the Podkarpacie region. The article is in Polish, so here is the short version.",
        blocks: [
          {
            t: "p",
            text: "The regional labour office in Rzeszów has **20 million PLN** for primary and secondary schools. One project can be worth **200,000 to 750,000 PLN**, funded up to 100 percent, and applications close on **10 November**. The topics include AI used by scammers and deepfakes.",
          },
          {
            t: "p",
            text: "The biggest trap: **each school can be funded only once in this call**. If the municipality and the school both apply for the same school, every application covering it is rejected, so agree first who applies.",
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
