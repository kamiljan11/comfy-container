import { REPO_URL } from "../../lib/skillsCatalog";
import type { Content } from "../../components/claude/types";
import { explainPl, explainUiPl } from "./explain.pl";
import { tellPartPl, tellSectionsPl } from "./tell.pl";

// Każdą liczbę na tej stronie przeliczyłem 14 października 2026 (źródła i komendy: docs/CLAUDE-PAGE-NUMBERS.md). Liczba, której nie przeliczałem, mówi to wprost i ma własną datę.

export const pl: Content = {
  title: "Coding Higher Mind: system AI, na którym stoi ta praca",
  role: "Warstwa meta pod każdym projektem, który buduję z AI: wzmocnione polecenia, automatyczne kontrole na każdym kroku, recenzenci AI podzieleni na specjalizacje i pętla, która zamienia błędy w kontrole. Policzone tam, gdzie się da; szacunki są oznaczone jako szacunki. Open source.",
  tocLabel: "Spis treści",
  mapTitle: "Jak ułożona jest ta strona",
  mapLead:
    "Siedem części. Wybierz tę, której szukasz; każda sekcja ma własny link, a mały kwadrat oznacza te z wykresem. Mało czasu? Ostatnia część opowiada cały system w 30 sekund.",
  versionLine:
    "PG v1.8.0, stan na 14 października 2026. Piętnaście wersji publicznych w 33 dni i od tego dnia system jest skończony: przeszedł w tryb utrzymania, a sekcja „Gdzie kończy się ulepszanie” wyjaśnia, co to znaczy i dlaczego.",
  intro:
    "Moje CV mówi, że kod piszą agenci AI, a ja odpowiadam za specyfikację, recenzję i wdrożenie. Takie twierdzenie wymaga dowodu, więc ta strona pokazuje sam system: co działa w tle, czego pilnuje, jak uczy się na własnych błędach i gdzie się kończy. PG (Prompt-Guard) nie jest projektem; leży pod wszystkimi projektami. Jakiekolwiek repozytorium otworzy agent na moim komputerze, obowiązują te same zasady: zmiana napisana przez AI nie trafi do produktu bez automatycznych kontroli, AI pokazuje dowód, zanim powie „gotowe”, a z haseł i kluczy korzysta, nigdy ich nie widząc. Wszystko poniżej działa dziś, chyba że sekcja mówi inaczej. Dwie rzeczy nie działają: potok wydań z wersji 1.7.0 nie miał jeszcze pierwszego ćwiczenia na projekcie testowym, a zaplanowane rutyny są wyłączone, dopóki nie naprawię ich ustawień po przeprowadzce na nowy komputer. Cały system to publiczne repozytorium, które zainstalujesz w pięć minut.",
  repoCta: "github.com/kamiljan11/coding-higher-mind →",
  stats: [
    { n: "170", label: "awarii zamienionych w kontrole" },
    { n: "11", label: "hooków na 7 rodzajach zdarzeń" },
    { n: "9", label: "wyspecjalizowanych recenzentów AI" },
    { n: "51", label: "narzędzi bez tokenów AI" },
    { n: "606", label: "sprawdzeń w testach bramek" },
    { n: "15", label: "wersji publicznych w 33 dni" },
    { n: "31 / 47", label: "repo pod ścisłą ochroną gałęzi" },
    { n: "157", label: "kluczy i haseł, których AI nie widzi" },
  ],
  statsNote:
    "Policzone 14 października 2026: hooki, narzędzia, recenzenci i blizny w publicznym repozytorium; testy, ochrona gałęzi i sekrety na moim komputerze i na GitHubie.",
  parts: [
    { title: "Czym to jest", blurb: "System na jednej mapie i trzy idee, na których stoi." },
    {
      title: "Jak pilnowana jest zmiana",
      blurb:
        "Od polecenia do produkcji: bramki, poziomy ryzyka, wyjątki, scalanie, recenzja, nauka.",
    },
    {
      title: "Architektura i wydania",
      blurb: "Jak decyzje projektowe zostają podjęte na stałe i jak wydanie wychodzi oraz wraca.",
    },
    {
      title: "Proporcja i koniec ulepszeń",
      blurb: "Rachunek za kontekst, skalibrowane bramki i granica, za którą więcej reguł szkodzi.",
    },
    {
      title: "Zaufanie i codzienna praca",
      blurb: "Słowa statusu, sekrety, rutyny, pamięć i to, czy całość wytrzymuje skalę.",
    },
    { title: "Historia i użycie", blurb: "Piętnaście wersji, instalacja i uczciwe granice." },
    tellPartPl,
  ],
  sections: [
    /* ── Część 1: czym to jest ── */
    {
      id: "map",
      part: 0,
      title: "Cała maszyna na jednej mapie",
      lead: "Ja wyznaczam kierunek. Pracę wykonują dwa narzędzia AI. PG leży pod oboma, a każda zmiana przechodzi jego kontrole, zanim trafi do jakiegokolwiek projektu.",
      figure: "arch",
      items: [
        {
          label: "Claude Code:",
          body: "narzędzie w terminalu do wszystkiego, co jest kodem: aplikacji, stron, automatyzacji i ich CI. Sięga do GitHuba, poczty, przeglądarki i pulpitu przez konektory MCP. Tu działają hooki i bramki gita.",
        },
        {
          label: "Claude Desktop (Cowork):",
          body: "narzędzie do operacji: poczta, dokumenty, research, outreach i projektowanie. Nie ma hooków, więc zasady pracy jadą jako tekst w każdym poleceniu, a słowo statusu na końcu raportu jest główną ochroną.",
        },
        {
          label: "73 skille:",
          body: "wersjonowane pakiety instrukcji, do których trafiają zadania: 56 w narzędziu do kodu i 58 na pulpicie, z czego 41 zainstalowanych w obu. Router dopasowuje zadanie według stałych reguł i przed startem ogłasza, jakie kroki uruchomi.",
        },
        {
          label: "Właściwy model do zadania:",
          body: "główna sesja planuje i sprawdza. Agenci pomocniczy dostają model dopasowany do zadania: najmniejszy do wyszukiwania, średni do pisania i recenzji według listy, najmocniejszy do trudnego rozumowania oraz do bezpieczeństwa, danych i weryfikacji przy ryzykownych zmianach. Moc obliczeniowa to tygodniowy budżet, a system wydaje go świadomie.",
        },
      ],
    },
    {
      id: "mind",
      part: 0,
      title: "Mapa myśli: z czego składa się „wyższy umysł”",
      lead: "PG to skrót od Prompt-Guard: zaczęło się od protokołu wstrzykiwanego w każde polecenie, a urosło w cały system jakości. „Wyższy umysł” pochodzi z mojego drugiego długiego projektu, darmowego przewodnika po praktycznej duchowości, którego zasada brzmi: praktyka ponad wiarę. Tutaj znaczy to tyle: reguła, której zamierzasz przestrzegać, to wiara; kontrola, która uruchamia się sama, to praktyka.",
      figure: "mind",
    },
    {
      id: "ideas",
      part: 0,
      title: "Trzy idee, na których stoi całość",
      items: [
        {
          label: "Kontrole, nie spisane reguły:",
          body: "audyt, od którego wszystko się zaczęło, pokazał, że każda reguła zapisana tylko jako tekst w skali się sypała: 6 z 7 repozytoriów nie miało żadnego zapisu decyzji architektonicznych, changelog był 105 commitów do tyłu, recenzja kodu odbyła się w 2,5% sesji, a 79% commitów szło prosto na główną gałąź. Agent może zapomnieć regułę, więc spisana reguła nie wystarcza. Wszystko, co ważne, uruchamia się samo, gdy coś się dzieje (to jest bramka), każda bramka ma test dowodzący, że blokuje, a skrypt sprawdza, czy każda spisana reguła ma swoją bramkę.",
        },
        {
          label: "Każda awaria staje się kontrolą (blizna → bramka):",
          body: "170 prawdziwych awarii z moich projektów jest skatalogowanych, każda z numerem reguły. Nazywam je bliznami. Każdy punkt listy kontrolnej wskazuje bliznę, z której powstał; ten nawyk wziąłem z Google SRE. Analiza incydentu kończy się nową bramką albo nową blizną, nigdy „bądźmy ostrożniejsi”.",
        },
        {
          label: "Dowód, nie deklaracja:",
          body: "„gotowe” znaczy, że komenda się wykonała, zwróciła kod wyjścia, a stan po niej został sprawdzony. Każdy raport kończy się jednym słowem: VERIFIED, UNVERIFIED albo FAILED. Agenci AI mierzalnie zawyżają sukces (w jednym benchmarku 75,8% zgłoszonych sukcesów nie miało dowodu) i ustępują pod naciskiem. Słowo statusu to przeciwwaga.",
        },
      ],
    },

    /* ── Część 2: jak pilnowana jest zmiana ── */
    {
      id: "life-of-a-change",
      part: 1,
      title: "Życie jednej zmiany",
      lead: "Dziewięć punktów kontroli uruchamia się samo w stałych momentach, od polecenia do produkcji. Nikt nie musi pamiętać o sprawdzaniu, a czerwony wynik zatrzymuje zmianę tam, gdzie jest.",
      figure: "pipe",
      items: [
        {
          label: "Gdy wysyłam polecenie:",
          body: "hook dokleja do niego zasady pracy. Gdy zadanie jest niejasne, agent pyta, zamiast zgadywać. Fakt wymaga najpierw otwartego źródła. Wszystko, co blokuje pracę, trafia do pierwszej linii raportu, a na „jak idzie?” nigdy nie pada „dobrze”: pada cel, budżet, ryzyka i decyzje, które należą do mnie.",
        },
        {
          label: "Po każdej edycji pliku, także zrobionej w terminalu:",
          body: "zmieniony plik jest sprawdzany pod kątem stylu i typów, a błędy wracają od razu do agenta, który go edytował, w tej samej sesji.",
        },
        {
          label: "Przy każdej komendzie w terminalu:",
          body: "strażnik blokuje te groźne: pomijanie kontroli (--no-verify), przepisywanie albo wyrzucanie historii (force-push, twardy reset), rekursywne kasowanie poza folderami builda, scalanie innym skryptem niż ten, który żąda dowodu recenzji, sekrety wpisane w komendę i pobrany skrypt uruchomiony prosto w powłoce (curl | sh). Czyta komendę tak, jak przeczyta ją powłoka, więc widzi też komendy schowane w sh -c, $(…), w heredocach, których treść powłoka wykona, w zakodowanym PowerShellu albo w sztuczkach typu rm${IFS}-rf.",
        },
        {
          label: "Gdy sesja się kończy:",
          body: "bramka stop mierzy poziom ryzyka z tego, co się faktycznie zmieniło (ścieżki i rozmiar, nigdy treść polecenia), uruchamia lint, typy i testy na wszystkim, co się zmieniło, i nie zamyka sesji na poziomie T2 lub wyższym, dopóki wymagani recenzenci jej nie sprawdzą. Werdykt testów pochodzi z kodu wyjścia: błąd importu albo zero uruchomionych testów to czerwień, nie „pominięte”.",
        },
        {
          label: "Przy każdym commicie:",
          body: "konwencjonalny opis; skan sekretów; świeżość bazy (klon na niezwiązanej historii jest blokowany); powtórzony tekst w nowym kodzie; nowa zależność musi istnieć w npm albo PyPI i nie może być literówką od popularnego pakietu; zakomentowany kod; nowe TODO bez wpisu w rejestrze; kolumna z danymi osobowymi bez wpisu w spisie prywatności; lint migracji SQL (zabezpieczenie wierszy z USING i WITH CHECK, higiena funkcji uprzywilejowanych, klucze najemcy); parser GitHuba na plikach workflow; usunięty krok bezpieczeństwa w CI.",
        },
        {
          label: "Przy każdym pushu:",
          body: "nic nie idzie prosto na główną gałąź. Zmiana powyżej 1500 linii kodu jest dzielona, a jeden temat, na przykład migracja, zostaje razem. Nowy cykl importów albo import łamiący warstwy zapisane w dokumencie architektury jest blokowany. Jeśli ktoś inny commitował na tę samą gałąź w ostatniej dobie, dostajesz ostrzeżenie.",
        },
        {
          label: "W CI i przy scalaniu:",
          body: "te same kontrole idą jeszcze raz, do tego skaner sekretów (gitleaks) i testy mutacyjne na zmienionych plikach: narzędzie celowo podsadza drobne błędy, a test, który nie łapie żadnego, jest teatrem. 31 z moich 47 repozytoriów ma ścisłą ochronę gałęzi wygenerowaną z nazw zadań CI. Pull request scala się tylko wtedy, gdy jego kontrole przeszły na aktualnym wyniku scalenia: raz zielone kontrole na nieaktualnej bazie zepsuły główną gałąź.",
        },
      ],
    },
    {
      id: "tiers",
      part: 1,
      title: "Poziom ryzyka: mierzony ze zmiany, nigdy deklarowany",
      lead: "Ilość sprawdzania jest proporcjonalna i to też jest egzekwowane. Prototyp nie dostaje upomnień o zapisy architektury; zmiana w płatnościach nie zamknie się bez recenzji bezpieczeństwa.",
      figure: "tiers",
      items: [
        {
          label: "Dla każdego repozytorium:",
          body: "minimalny poziom, etap życia (prototyp, proof of concept, MVP, produkcja) i opcjonalny adres do testów QA. Przejście na produkcję wymaga pisemnego przeglądu gotowości w tym samym commicie. Gdy adres QA jest ustawiony, recenzent QA staje się obowiązkowy przy zmianach T3 dotykających interfejsu.",
        },
        {
          label: "Wcześniejszy commit niczego nie zmienia:",
          body: "commit zrobiony przed końcem sesji dalej liczy się do jej poziomu, a recenzja, którą skrypt agregujący uzna za niepełną, nie zamyka sesji.",
        },
      ],
    },
    {
      id: "exceptions",
      part: 1,
      title: "Wyjątki: kto może przepuścić bramkę",
      lead: "Bramkę, przez którą nie da się przejść, ludzie i agenci obchodzą, więc każda ma przejście. O tym, kto może go użyć, decyduje to, czy krok da się cofnąć, a nie to, czy akurat siedzę przy komputerze.",
      figure: "exceptions",
      items: [
        {
          label: "Dowód, nie deklaracja:",
          body: "pierwsza recenzja tego mechanizmu podrobiła dowód recenzji dwoma pustymi plikami. Teraz liczą się tylko zapisy pracy prawdziwych recenzentów-podagentów, każde ich znalezisko musi zostać w wyniku, a jedna recenzja nigdy nie daje drugiego wyjątku, nawet gdy ktoś skopiuje jej folder. Komenda, która próbuje wyjść poza repozytorium (zmiana katalogu, zmienna, nakładka na powłokę), wyjątku nie dostaje.",
        },
        {
          label: "Moja fraza to tylko moja fraza:",
          body: "wyjątek poziomu C istnieje dopiero, gdy wpiszę „pozwol ALLOW_…” w czacie. Te same słowa powtórzone w odpowiedzi agenta albo w raporcie podagenta niczego nie odblokowują, a każde użycie trafia do dziennika.",
        },
        {
          label: "Skok zegara:",
          body: "raz zegar systemowy na chwilę przeskoczył na rok 2022. Plik z moim wyjątkiem dostał datę sprzed czterech lat i sprzątanie usunęło go jako stary, choć zostało mu pół godziny ważności. Ważność jest teraz czytana z treści pliku, nie z daty zapisu.",
        },
        {
          label: "Wyłącznik:",
          body: "jeden przełącznik przywraca tryb ścisły, w którym każdy wyjątek wymaga mojej frazy, a sam przełącznik jest chroniony tak jak bramki.",
        },
      ],
    },
    {
      id: "merge",
      part: 1,
      title: "Scalanie pull requesta: bez mojej frazy, ale tylko z dowodem",
      lead: "Wpisywanie frazy przy każdym rutynowym pull requeście stało się wąskim gardłem. Teraz skrypt scalający decyduje na podstawie ryzyka zmiany i dołączonego do niej dowodu.",
      figure: "merge",
      items: [
        {
          label: "Co jest dowodem:",
          body: "recenzja, która wskazuje dokładnie ten diff po jego sumie kontrolnej, z werdyktem przeliczonym ze znalezisk i z zapisów pracy samych recenzentów, a nie ze streszczenia; ważna dwie godziny. Wszystko, co dotyka logowania, płatności, migracji, zależności, CI albo instrukcji samych agentów, dalej czeka na mnie.",
        },
        {
          label: "Drugi dowód, do którego agent nie sięga:",
          body: "recenzję trzymaną na komputerze agenta ten agent mógłby w teorii podrobić, więc pull request może też dostać recenzję w CI: czysta maszyna, narzędzia tylko do odczytu, konfiguracja wzięta z gałęzi bazowej. Skrypt scalający czyta ten przebieg przez API GitHuba i trzyma 90 dni werdyktów, więc przeredagowanie zmiany, żeby rzucić kośćmi jeszcze raz, na tej samej gałęzi nie działa. Jest ustawiona w trzech repozytoriach.",
        },
        {
          label: "Sesje się nie mieszają:",
          body: "gdy dwie sesje pracują w jednym repozytorium, commit liczy się dla sesji, chyba że jest twardy dowód, że pochodzi z tej drugiej; w razie wątpliwości się liczy.",
        },
        {
          label: "Uczciwe granice:",
          body: "recenzja w CI to jeden model, czyli dowód probabilistyczny, który spreparowany diff może próbować zagadać. Dlatego ta kontrola nie jest wymaganym statusem w ochronie gałęzi (GitHub liczy pominięte zadanie jako zaliczone) i dlatego jeden plik przywraca scalanie wyłącznie z frazą. Zaplanowany tydzień obserwacji recenzenta w CI nie ma jeszcze zapisanego wyniku.",
        },
      ],
    },
    {
      id: "review",
      part: 1,
      title: "Recenzja jak w software housie, nie jak w czacie",
      lead: "Każdy recenzent AI odpowiada za jedną specjalizację i zaczyna z czystą kartą. Ich uwagi łączy skrypt, nie model: problem blokuje tylko wtedy, gdy zgłosi go niezależnie dość recenzentów albo gdy weryfikator go odtworzy, a problem bez dowodu odpada. Zadaniem weryfikatora jest obalać.",
      figure: "review",
      items: [
        {
          label: "Dziewięciu wyspecjalizowanych recenzentów:",
          body: "kod, bezpieczeństwo, dane, operacje, UX, produkt, QA, weryfikator i adwokat diabła. Każdy pracuje z krótkiej listy ponumerowanych reguł, a każda reguła ma komendę do uruchomienia, zasady wagi, stały format wyniku i rozpisany przykład fałszywego alarmu, który trzeba odrzucić. Recenzenci tylko czytają; poprawki robi główna sesja.",
        },
        {
          label: "Każdy recenzent czyta swój wycinek:",
          body: "jeden audyt pokazał, że recenzenci z diffem na 9799 linii czytali z niego około 10–30%, a zepsuty blok CSS przeszedł obok trzech z nich. Teraz skrypt tnie diff według działów, a drugi skrypt uruchamia 21 mechanicznych reguł wyszukiwania i oddaje trafienia recenzentowi do oceny.",
        },
        {
          label: "Dlaczego czysta karta:",
          body: "kto pisał kod, człowiek czy model, nie widzi własnych błędów. Recenzenci dostają tylko zmianę i zadanie i nigdy nie widzą swoich uwag nawzajem, bo agenci, którzy dyskutują, dryfują ku większości, nawet gdy rację miała mniejszość.",
        },
        {
          label: "Decyzje z adwokatem diabła:",
          body: "decyzje architektoniczne przechodzą stałe kroki: fakty, stanowiska, obowiązkowy dysydent, agregacja w kodzie i spisany zapis decyzji. Wstrzyknięty sprzeciw to jedyna interwencja, która w badaniach zmniejsza porażki wynikające z cichej zgody w grupach agentów.",
        },
        {
          label: "Kalibracja co miesiąc:",
          body: "ten sam błąd jest pakowany dwa razy, raz goły i raz z przekonującym opisem, a świeży recenzenci sprawdzają oba w losowej kolejności. Gdy werdykty się różnią, długość albo opis ich przekrzywia, i wtedy człowiek poprawia listę kontrolną.",
        },
      ],
    },
    {
      id: "learning",
      part: 1,
      title: "Każda awaria staje się kontrolą: jak system się uczy",
      lead: "Awaria nie jest zamknięta, kiedy jest naprawiona. Jest zamknięta, kiedy nie może się powtórzyć bez tego, że zauważy to skrypt.",
      figure: "loop",
      items: [
        {
          label: "Nieaktualna baza zepsuła główną gałąź:",
          body: "dwa pull requesty przeszły kontrole, ale każdy na swojej starszej kopii głównej gałęzi; scalone razem zepsuły plik workflow. Teraz scalanie wymaga kontroli na aktualnym wyniku scalenia, ścisła ochrona gałęzi jest generowana dla każdego repozytorium, a blizna zapisuje mechanizm.",
        },
        {
          label: "Kontrola, która nigdy się nie uruchomiła:",
          body: "bramka pusha czytała swoje wejście dwa razy i przez sześć dni nie robiła nic. Teraz każdy hook gita ma test, który uruchamia cały skrypt na prawdziwym wejściu, a cotygodniowy audyt sprawdza, czy każda bramka dalej blokuje.",
        },
        {
          label: "45 kopii danych firmy:",
          body: "rozsianych po 11 plikach, a każda przeszła lint, typy, testy i recenzję. Teraz kontrola duplikatów działa na dodanych liniach (od 1.8.0: ten sam tekst sześć razy w co najmniej trzech plikach).",
        },
        {
          label: "Faktura, która zmieniła sprzedawcę:",
          body: "wartość domyślna po cichu podmieniła sprzedawcę po usunięciu profilu. Ciche wartości zastępcze w polu, które ma konsekwencje, są teraz blokerem w liście recenzenta kodu: gdy nie ma dopasowania, kod musi zatrzymać się z nazwanym błędem.",
        },
      ],
    },
    {
      id: "guarding-the-guards",
      part: 1,
      title: "Pilnowanie strażników",
      lead: "System jakości, który agent może po cichu wyłączyć, jest dekoracją. Dlatego reguły najpierw chronią same siebie.",
      items: [
        {
          label: "Pieczęć na warstwie kontrolnej:",
          body: "hooki, bramki gita, ustawienia i narzędzia bramek są zapieczętowane sumami kontrolnymi. Zmiana poza oknem, które sam otworzyłem, pokazuje się na starcie następnej sesji i w cotygodniowym audycie.",
        },
        {
          label: "Rozszerzenia pod tym samym nadzorem:",
          body: "mody Claude Code działają wewnątrz narzędzia i omijają hooki, więc instalacja, włączenie albo aktualizacja moda wymaga mojej frazy. Wyłączenie jest zawsze dozwolone.",
        },
        {
          label: "Żadnego przypadkowego usunięcia tabeli produkcyjnej:",
          body: "każda komenda, która rozmawia z bazą danych, jest śledzona do miejsca, w które celuje, łącznie z adresami połączeń, zmiennymi środowiska ustawionymi w tej samej linii i nakładkami typu docker exec albo ssh. Niszczący SQL jest blokowany, chyba że cel jest dowodnie na moim komputerze, a SQL, którego strażnik nie widzi, liczy się jako niszczący.",
        },
        {
          label: "Żadnego przepisywania reguł łatką:",
          body: "nakładanie łatek, rozpakowywanie archiwów i edytory sterowane skryptem są zablokowane w folderze PG i w każdym folderze nad nim. W każdym repozytorium łatka dotykająca .git/config albo .claude/ jest blokowana ze wskazówką, żeby użyć git apply, które takich ścieżek odmawia.",
        },
        {
          label: "Uczciwa granica:",
          body: "strażnik jest zbudowany przeciw pomyłkom i przeciw instrukcjom przemyconym z zewnątrz, na przykład ze strony, którą agent czyta. Nie zatrzyma agenta zdeterminowanego, żeby go obejść, bo uruchomienie dowolnego skryptu może zrobić wszystko. To zadanie sandboxa i uprawnień systemu operacyjnego i jest to zapisane w pliku znanych ograniczeń.",
        },
      ],
    },

    /* ── Część 3: architektura i wydania ── */
    {
      id: "architecture",
      part: 2,
      title: "Jak zapada decyzja o architekturze i jak zostaje podjęta na stałe",
      lead: "Większość projektów decyduje o architekturze raz, w dokumencie, którego nikt więcej nie otwiera. Tutaj każda decyzja to wiersz z dowodem, a skrypt porównuje kod z tymi wierszami na starcie każdej sesji i zanim sesja może się zakończyć.",
      figure: "matrix",
      items: [
        {
          label: "Jeden wiersz na obszar:",
          body: "62 wiersze: 37 obszarów projektowania systemów (dane, skalowanie, kolejki, cache, logowanie, limity zapytań, wydania i inne) i 25 warstw narzędzi od frontendu po płatności, fakturowanie i wysyłkę paczek. Każdy wiersz to decyzja z dowodem, „nie dotyczy” z uzasadnieniem albo „nie teraz” z mierzalnym sygnałem powrotu, na przykład „ponad 50 zapytań na sekundę”.",
        },
        {
          label: "Rada zamiast jednego architekta:",
          body: "dwunastu agentów pracuje równolegle, po jednym na grupę obszarów. Grupy, których decyzji trudno się potem pozbyć (kształt danych, identyfikatory, pliki, tożsamość, region, odtwarzanie po awarii), dostają najmocniejszy model i muszą być rozstrzygnięte nawet w małych projektach.",
        },
        {
          label: "Skąd macierz:",
          body: "audyt z 6 października policzył 437 nazwanych opcji z kursu projektowania systemów: PG umiał wybrać spośród 46% z nich, kolejne 26% znał tylko z nazwy, a 28% nie znał wcale. Nic też nie zmuszało architekta do przejścia przez wszystkie obszary. Tego samego dnia na aplikacji klienta rada wypełniła wszystkie 37 wierszy i wypisała około 60 luk z dowodami; przynajmniej jedna okazała się fałszywym alarmem, więc luki dalej przegląda człowiek.",
        },
        {
          label: "Kod pilnuje uczciwości:",
          body: "skrypt bez AI porównuje projekt z jego decyzjami na starcie każdej sesji i wypisuje od jednej do trzech linii tylko wtedy, gdy coś nie gra: nierozstrzygnięty obszar, technologię, o której decyzje milczą, albo dowód wskazujący na plik, którego już nie ma. W nowych projektach sesja nie może się zakończyć, zostawiając rozjazd; w starych to podpowiedź.",
        },
        {
          label: "Skalowanie dopiero, gdy liczby każą:",
          body: "wiersze „nie teraz” trzymają swoje progi, a drabina w siedmiu krokach prowadzi od jednego serwera przez kolejki i cache do replik bazy do odczytu, więc decyzja o skalowaniu wynika z danych, nie ze strachu.",
        },
      ],
    },
    {
      id: "release",
      part: 2,
      title: "Potok wydań z AI w pętli, dla jednoosobowej firmy",
      lead: "Duże firmy mają zespół wydań, dyżury i drugiego inżyniera przy każdej zmianie. Ja nie mam, więc tę pracę wykonuje potok, a części wymagające osądu robi AI.",
      figure: "release",
      items: [
        {
          label: "Kiedy nie wracać:",
          body: "awaria bazy danych, zapora blokująca maszynę testową albo przekierowanie to nie błędy nowej wersji, więc zamiast powrotu włącza się alarm. Gdy wydanie zmieniło strukturę bazy albo funkcje serwerowe, powrót uruchomiłby stary kod na nowej strukturze, więc potok staje i pyta mnie. Po jednym automatycznym powrocie nic więcej nie cofa się samo, dopóki człowiek nie zamknie incydentu.",
        },
        {
          label: "AI na dyżurze, bez kluczy do budynku:",
          body: "gdy bramka zrobi się czerwona, świeża instancja Claude na mojej subskrypcji czyta wyniki testów i zmiany z tego wydania i wpisuje diagnozę do incydentu. Może tylko czytać; komentarz publikuje osobny, zaufany krok.",
        },
        {
          label: "Maszyny sprawdzają to, co maszyny umieją:",
          body: "build, typy, testy, licencje, skan wycieków sekretów i zapytania testowe to zwykłe skrypty bez tokenów AI. Recenzenci AI biorą to, co wymaga osądu, a ja to, czego nie da się cofnąć: ryzykowne scalenia, pieniądze i klucze.",
        },
      ],
    },
    {
      id: "release-review",
      part: 2,
      title: "Sześć rund recenzji, zanim potok wyszedł",
      lead: "Wersja 1.7.0 przeszła sześć pełnych rund recenzji AI i dwie mniejsze kontrole ostatnich poprawek. Uwagi blokujące trzeba naprawić przed wydaniem; poważne naprawia się w tej samej rundzie.",
      figure: "rounds",
      items: [
        {
          label: "Czym były uwagi blokujące:",
          body: "dwiema dziurami bezpieczeństwa, których nie widziałem. Skrypt testowy i jego lista dozwolonych adresów były czytane ze zmiany, która uruchomiła przebieg, więc atakujący mógł podsunąć własne; a AI na dyżurze mogło przeczytać token z pliku ustawień repozytorium i wkleić go do komentarza w incydencie. Ostatnie kontrole znalazły regułę bezpieczeństwa bez testu. Wszystko naprawione przed wydaniem.",
        },
        {
          label: "Uczciwa granica:",
          body: "potok nie działał jeszcze na żywym projekcie. Plan to ćwiczenie na kopii testowej w obie strony: zielony build musi trafić na domenę, a czerwony nie może.",
        },
      ],
    },

    /* ── Część 4: proporcja ── */
    {
      id: "context",
      part: 3,
      title: "Te same zasady za mniejszy rachunek za kontekst",
      lead: "Każda wiadomość do modelu niesie tekst tła, który model czyta najpierw, a płaci się za niego w tokenach. Zmierzyłem udział PG i go przyciąłem, nie wyrzucając żadnej reguły.",
      figure: "context",
      items: [
        {
          label: "Pełne zasady raz na sesję:",
          body: "hook polecenia wysyła pełny protokół raz, potem jednolinijkowe przypomnienie. Po kompresji rozmowy albo w nowej sesji wysyła wszystko od nowa, a gdy nie jest pewien, co już poszło, też wysyła wszystko.",
        },
        {
          label: "Pamięć aktualna i dalej kompletna:",
          body: "najnowsze punkty kontrolne idą pierwsze, niedokończona praca z innych sesji jest wypisana z tytułu, a każdy skrócony plik zachowuje listę pozostałych sekcji. Kontrola budżetu robi się czerwona, gdy tekst startowy znowu urośnie.",
        },
        {
          label: "Okno kontekstu wybrane świadomie:",
          body: "Claude mieści milion tokenów, ale każda wiadomość wysyła całość od nowa. W moich zapisach pracy okno 1M zużywało około 2,3 razy więcej tygodniowego limitu niż 400k, więc okno zostaje na 400k. Próba z 600k rusza 17 października z regułą ustaloną z góry: zostaje, jeśli tydzień skończy się poniżej 90% limitu i nic się nie zablokuje.",
        },
      ],
    },
    {
      id: "proportionality",
      part: 3,
      title: "Proporcjonalność: mniej blokad przy tym samym bezpieczeństwie",
      lead: "Wersja 1.8.0. Przez tygodnie każde ryzyko, które zauważyłem, dostawało nową bramkę. Potem dziennik bramek pokazał koszt: część z nich zatrzymywała moją zwykłą pracę dużo częściej, niż łapała błąd. Dlatego jedna reguła stoi teraz nad pozostałymi: bez incydentu nie ma nowej blokady.",
      figure: "calib",
      items: [
        {
          label: "Nowa kontrola najpierw obserwuje:",
          body: "nowa bramka tylko zapisuje, co by zablokowała. Blokować może dopiero po prawdziwym incydencie, a zmiany w PG trafiają do nowych repozytoriów przez szablon, podczas gdy stare repozytoria projektów są dla agentów tylko do odczytu, chyba że poproszę.",
        },
        {
          label: "Rutyny patrzą tylko na żywą pracę:",
          body: "skrypt czyta historię GitHuba i zostawia repozytoria z prawdziwą pracą w ostatnich 30 dniach, pomijając dni, w których PG przeczesywał całą flotę, tę samą zmianę rozesłaną wszędzie i boty od zależności. Dziś to 12 z 47.",
        },
        {
          label: "Czystsze liczby:",
          body: "testy pisały do tego samego dziennika co prawdziwa praca i zawyżały liczniki, z których kalibruję. Teraz testy piszą do własnego dziennika, a cotygodniowa kontrola zdrowia liczy ich ślady osobno.",
        },
        {
          label: "Zrecenzowane przed wydaniem:",
          body: "cztery rundy niezależnych recenzentów. Wyłapali między innymi, że jedna czkawka GitHuba mogła po cichu kosztować miesiąc kontroli podatności, a pusta odpowiedź GitHuba wyglądałaby jak spokojny miesiąc; oba przypadki kończą się teraz widoczną porażką.",
        },
      ],
    },
    {
      id: "where-improving-stops",
      part: 3,
      title: "Gdzie kończy się ulepszanie",
      lead: "14 października zdecydowałem, że PG jest na razie skończony. Nie dlatego, że nic nie da się dodać, tylko dlatego, że dokładanie zaczęło kosztować więcej, niż chroniło.",
      figure: "limits",
      items: [
        {
          label: "Sygnał, który to pokazał:",
          body: "przepisanie parsera powłoki w strażniku komend przeszło dziewięć rund recenzji AI. Każda runda znajdowała nowe przypadki brzegowe i żaden z nich nie zdarzył się nigdy w prawdziwej pracy. To asymptota: wysiłek rośnie, ochrona nie. Parser zamknąłem, a strażnik, który działa dziś, zostaje taki, jaki jest.",
        },
        {
          label: "Przed czym strażnik ma chronić:",
          body: "przed pomyłkami agenta i instrukcjami przemyconymi z zewnątrz. Nie przed celowym atakującym: tej walki nie da się wygrać regułami tekstowymi, bo zapisanie skryptu do pliku i uruchomienie go omija każdy parser. Nazwanie modelu zagrożenia zakończyło spór o parser jednym zdaniem.",
        },
        {
          label: "Co znaczy tryb utrzymania:",
          body: "PG zmienia się tylko po incydencie, który przeszedł mimo bramek, gdy aktualizacja narzędzia albo modelu zepsuje hook, albo gdy o to poproszę. Cotygodniowa kontrola zdrowia dalej uruchamia swoje skrypty; żaden nowy mechanizm nie powstaje dla samego siebie. Jakość pracy ma wynikać z kontroli, które istnieją, a nie z ich liczby.",
        },
      ],
    },

    /* ── Część 5: zaufanie i codzienna praca ── */
    {
      id: "status",
      part: 4,
      title:
        "VERIFIED · UNVERIFIED · FAILED: słowo, które nie pozwala AI mówić tego, co chcesz usłyszeć",
      lead: "Każdy merytoryczny raport kończy się jednym z trzech słów. To najmniejsza część systemu i najłatwiejsza do przeniesienia gdzie indziej, zwłaszcza do Claude Desktop, gdzie polecenie jest jedyną ochroną.",
      items: [
        {
          label: "VERIFIED:",
          body: "twierdzenie przychodzi z dowodem, zacytowanym, a nie opisanym: komenda i jej kod wyjścia, status HTTP, linia z wyniku testów, diff, ścieżka do zrzutu ekranu.",
        },
        {
          label: "UNVERIFIED:",
          body: "praca jest zrobiona, ale brakuje dowodu. Raport mówi, czego brakuje, jak to sprawdzić i co zmieniłoby wniosek. Raport bez słowa statusu liczy się jako UNVERIFIED.",
        },
        {
          label: "FAILED / BLOCKED:",
          body: "co się stało, słowo w słowo, bez łagodzenia. Wszystko, co blokuje pracę (brak dostępu, decyzji, danych, sekretu albo zepsute narzędzie), idzie do pierwszej linii, nigdy na koniec.",
        },
        {
          label: "Po co to jest:",
          body: "gdy użytkownik naciska błędnym twierdzeniem, modele zgadzają się w około 58% przypadków, a przewidują 61–77% sukcesu przy osiąganych 22–35%. Słowo statusu zmusza każde twierdzenie do pokazania dowodu albo przyznania, że go nie ma, a „jesteś pewien?” każe modelowi jeszcze raz sprawdzić dowody, zamiast grzecznie zmienić odpowiedź.",
        },
        {
          label: "W Claude Desktop i zadaniach w tle:",
          body: "każde polecenie w tle dostaje siedmioliniowy blok weryfikacji: nie zakładaj, że polecenie jest prawdziwe; możesz odmówić i zgłosić porażkę; przeformułuj twierdzenia na neutralne pytania; zero sukcesu bez dowodu; zaatakuj własny wynik przed raportem; sprawdź ponownie, gdy ktoś podważa; zakończ słowem statusu. Blok leży w repozytorium, gotowy do wklejenia.",
        },
      ],
    },
    {
      id: "vault",
      part: 4,
      title: "Hasła i klucze, których AI nigdy nie widzi",
      figure: "vault",
      items: [
        {
          label: "Sejf na moim własnym sprzęcie:",
          body: "157 kluczy API, tokenów i loginów leży w sejfie, który sam hostuję. Pośrednik przekazuje wartość prosto do procesu, który jej potrzebuje, jako zmienną środowiska, więc nigdy nie pojawia się w czacie, w kodzie ani w logach. Strażnik komend blokuje sekret wpisany w komendę, a skany przy commicie i w CI pilnują, żeby tak zostało.",
        },
      ],
    },
    {
      id: "routines",
      part: 4,
      title: "Rutyny: część, która działa, kiedy nikt nie pisze",
      lead: "Najpierw skrypt, model dopiero wtedy, gdy skrypt coś znajdzie. Wszystko, co mogłoby samo szukać sobie roboty, jest wyłączone z założenia.",
      figure: "cadence",
      items: [
        {
          label: "Dlaczego są wyłączone:",
          body: "po przeprowadzce na nowy komputer 3 października większość rutyn startowała w folderze, któremu aplikacja już nie ufa, a reszta stawała na pytaniu o uprawnienia, na które nie miał kto odpowiedzieć. Żadna nie wykonała prawdziwej pracy, więc wszystkie są wyłączone do czasu naprawy ustawień. Wrócą trzy: recenzja pull requestów, cotygodniowa kontrola zdrowia i nadzór podatności. Trzy, które pracują tylko nad samym PG, zostają wyłączone.",
        },
        {
          label: "Recenzja pull requestów (dni robocze):",
          body: "przegląda otwarte pull requesty w aktywnych repozytoriach tak, jak zrobiłby to starszy inżynier. Mechaniczne poprawki lądują jako osobne commity z dowodem; uwagi o projekcie i bezpieczeństwie zostają komentarzami do mojej decyzji.",
        },
        {
          label: "Kontrola zdrowia (co tydzień):",
          body: "skrypty sprawdzają, czy system jakości jest dalej wpięty: hooki zarejestrowane, bramki dalej blokują, które wyjątki były użyte i która rutyna zaczęła, ale nie skończyła. Nieudany albo przerwany przebieg dowolnej rutyny to czerwień.",
        },
        {
          label: "Nadzór podatności (co miesiąc):",
          body: "skrypt czyta alerty podatności z samego GitHuba (włączone w 44 z 47 repozytoriów) i audytuje plik blokady zależności. Odróżnia „brak skanu” od „brak znalezisk”, więc pusty albo nieudany odczyt nigdy nie liczy się jako spokojny miesiąc. Poprawki to aktualizacje patch albo minor, zawsze jako pull request z dowodem.",
        },
      ],
    },
    {
      id: "fleet",
      part: 4,
      title: "47 repozytoriów i 12, które żyją",
      lead: "Większość moich projektów jest skończona. PG dalej pilnuje wszystkich, ale rutyny poświęcają czas tylko tam, gdzie dzieje się praca.",
      figure: "waffle",
    },
    {
      id: "memory",
      part: 4,
      title: "Pamięć, pomiary i retrospektywa, która przebudowała system",
      items: [
        {
          label: "Trwała pamięć:",
          body: "lokalna baza ponad 2300 notatek; potrzebna część ładuje się na starcie każdej sesji, a każda sesja zapisuje notatkę na koniec, więc następna zaczyna od punktu kontrolnego, a nie od zera. Jedna uczciwa luka: sesje uruchomione w tymczasowym folderze roboczym nie zawsze zostawiają zapis pracy dla tej notatki, a kontrola zdrowia to zgłasza.",
        },
        {
          label: "Telemetria, nie odczucia:",
          body: "każda pominięta kontrola jest zapisana z powodem, a skrypty przeszukują zapisy pracy agentów i historię gita: korekty na sesję, powtarzające się błędy narzędzi, poprawki w ciągu doby od poprzedniego commita do tego samego pliku i pliki, które zmieniają się najczęściej. To liczby decydują, co staje się bramką.",
        },
        {
          label: "Retrospektywa, która miała znaczenie:",
          body: "dwanaście pętli naprawczych w jednej sesji prześledzono do przyczyn i trzy miały tę samą wadę: system deklarował kontrolę, której fizycznie nie miał. Odpowiedź była strukturalna: każda bramka dostała test dowodzący, że blokuje, a sprawdzanie, czy każda reguła ma bramkę, stało się skryptem.",
        },
        {
          label: "Ta sama metoda zastosowana do mnie:",
          body: "moja praktyka czytania kodu jest zbudowana jak reszta systemu, codziennie, weryfikowalnie i publicznie: github.com/kamiljan11/code-reading-quest.",
        },
      ],
    },
    {
      id: "scale",
      part: 4,
      title: "Czy to wytrzymuje skalę?",
      items: [
        {
          label: "Uczciwa odpowiedź:",
          body: "jedna funkcja jest łatwa. System na 200 tysięcy linii z niespisanymi założeniami o architekturze to miejsce, gdzie spójność się rozjeżdża. Dlatego założenia są zapisane tam, gdzie skrypt może je przeczytać: dokument architektury każdego repozytorium ma czytelny dla maszyny blok warstw i zakazanych importów, a bramka pusha blokuje nowy cykl importów albo złamaną warstwę. Stare cykle tylko ostrzegają, a historycznego długu nikt nie sprząta automatycznie.",
        },
        {
          label: "Sprawdzenie zasięgu przed edycją:",
          body: "plik importowany przez ponad 40 innych jest oznaczany, a krok projektowy pyta: kto to wywołuje, co jeszcze czyta te dane i na jaki poziom ryzyka wpada zmiana.",
        },
        {
          label: "Czytelne dla człowieka:",
          body: "indeks narzędzi generuje się z nagłówków samych narzędzi, a narzędzie bez opisu pokazuje się jako dług. Każda decyzja o stylu odpowiada na jedno pytanie: czy starszy inżynier, który nigdy nie widział repozytorium, uruchomi je w 15 minut, w kolejne 15 znajdzie miejsce do zmiany i zrozumie dlaczego?",
        },
      ],
    },

    /* ── Część 6: historia i użycie ── */
    {
      id: "history",
      part: 5,
      title: "Piętnaście wersji w 33 dni",
      lead: "Każde wydanie odpowiadało na coś prawdziwego: audyt, porównanie z innymi projektami, awarię albo tarcie w mojej własnej pracy. Szczegóły każdej wersji są w publicznym changelogu.",
      figure: "versions",
      items: [
        {
          label: "Porównanie z 35 projektami open source (26 września):",
          body: "agenci przeszli przez 35 publicznych repozytoriów z podobnym pomysłem i wypisali 23 rzeczy, które inni zrobili lepiej, każdą z plikiem i linią. Projekt zmian przeszedł recenzję bezpieczeństwa przed pierwszą linią kodu (15 problemów, z czego 3 zepsułyby samą recenzję), a każda nowa reguła strażnika przeszła przez 40 824 prawdziwe komendy z 2853 plików zapisów pracy, zanim mogła cokolwiek zablokować.",
        },
        {
          label: "Sześć poprawek jednego dnia (28 września):",
          body: "bramka stop ufała wynikom testów zamiast kodom wyjścia, więc zepsuta konfiguracja testów mogła przejść jako „pominięte”. Sześć wydań później werdykt pochodzi wyłącznie z kodu wyjścia.",
        },
      ],
    },
    {
      id: "install",
      part: 5,
      title: "Zainstaluj u siebie",
      lead: "Cały system to publiczne repozytorium oczyszczone z prywatnych danych. Potrzebujesz Node 20+, gita i Claude Code.",
      code: [
        "git clone " + REPO_URL + ".git",
        "node install.mjs --dry-run   # pokazuje plan, niczego nie rusza",
        "node install.mjs --yes       # kopiuje do ~/.claude, scala hooki, dopisuje blok do CLAUDE.md, podpina hooki gita",
      ],
      items: [
        {
          label: "Co obiecuje instalator:",
          body: "nigdy nie nadpisze pliku, który zmieniłeś (druga wersja ląduje obok twojej), scala twoje ustawienia zamiast je zastępować i dopisuje swoje reguły między znacznikami, więc aktualizacja wymienia tylko ten blok. Hooki gita są opcjonalne. Na koniec uruchamia autotest, a dowodem jest zielony wynik, nie słowo instalatora.",
        },
        {
          label: "Co zawiera publiczne 1.8.0:",
          body: "11 hooków, 3 bramki gita, 51 narzędzi bez tokenów z 28 zestawami testów, 9 działów recenzentów, doktrynę ze 170 bliznami, szablon repozytorium z CI i parsowanymi blokami granic, definicje rutyn dla obu narzędzi, 18 skilli, deinstalator i dokumentację z diagramami z tej strony: 409 plików.",
        },
        {
          label: "Język:",
          body: "zasady pracy mają pełną wersję angielską (PG_LANG=en, ustawiane z języka systemu), a każdy komunikat blokady ma angielską linię z wyjściem awaryjnym. Doktryna i listy recenzentów są dalej po polsku (model czyta je bez problemu); README jest w obu językach.",
        },
      ],
      link: { href: REPO_URL, text: "Otwórz repozytorium →" },
    },
    {
      id: "honest-limits",
      part: 5,
      title: "Uczciwe granice",
      paragraphs: [
        "Korzystam z modeli bazowych przez ich dostawców; nie trenuję ich. Niezawodność jest sprawdzona w skali jednego właściciela i kilkudziesięciu repozytoriów, nie dużej firmy. Działy recenzentów kosztują tokeny (mniej więcej cztery pojedyncze recenzje przy T2 i osiem do dziesięciu przy T3), dlatego darmowe kontrole skryptowe idą pierwsze. Scalanie bez mojej frazy opiera się na recenzji jednego modelu, czyli na dowodzie probabilistycznym. Część bramek zależy od tego, czy repozytorium ma to, co sprawdzają, i pomija się z zapisanym powodem, gdy nie ma.",
        "Dwie części są zaprojektowane, ale jeszcze nie przećwiczone: potok wydań nie miał ćwiczenia na żywym projekcie, a rutyny są wyłączone do czasu naprawy ustawień. Strażnik zatrzymuje pomyłki, nie zdeterminowanego atakującego. Sens tej strony nie polega na tym, że nic nie może pójść źle. Polega na tym, że sposoby, w jakie praca z AI idzie źle, są rozbrajane jawnie, i na tym, że wiem, gdzie dokładanie reguł przestaje się opłacać.",
      ],
    },
    ...tellSectionsPl,
  ],
  figures: {
    arch: {
      kamil: "KAMIL",
      kamilSub: "spec · architektura · review · wdrożenie",
      code: "Claude Code",
      codeSub1: "kod · CI · produkcja",
      codeSub2: "GitHub · przeglądarka · mail (MCP)",
      cowork: "Claude Desktop (Cowork)",
      coworkSub1: "poczta · dokumenty · research",
      coworkSub2: "outreach · design · operacje",
      shared: "te same reguły · ta sama pamięć",
      vault: "SEJF",
      vaultSub: "157 sekretów",
      vaultNote1: "klucze trafiają do procesu,",
      vaultNote2: "nigdy do czatu",
      memory: "PAMIĘĆ",
      memorySub: "2300+ notatek",
      memoryNote1: "ładowana na starcie sesji,",
      memoryNote2: "sesje same się opisują",
      gates: "PG · BRAMKI",
      gatesList:
        "prompt · edycja · komenda · stop · commit · push · CI · review · dowód z produkcji",
      projects: "KAŻDY PROJEKT",
      projectsSub: "47 repozytoriów: aplikacje, strony, automatyzacje",
      caption:
        "PG to warstwa meta: te same bramki leżą pod każdym projektem, jakikolwiek by był. Ja wyznaczam kierunek; dowody wracają w górę.",
    },
    mind: {
      center: "WYŻSZY UMYSŁ",
      centerSub: "PG · PROMPT-GUARD",
      branches: [
        {
          title: "Warstwa promptu",
          leaves: ["protokół w każdym prompcie", "skompresowane raporty", "router skilli"],
        },
        {
          title: "Hooki na zdarzeniach",
          leaves: ["edycja → lint + typy", "strażnik komend", "bramka stop: tier z diffu"],
        },
        {
          title: "Bramki gita",
          leaves: [
            "sekrety · świeżość bazy",
            "zależności · duplikaty · TODO",
            "lint SQL · granice",
          ],
        },
        {
          title: "Działy recenzentów",
          leaves: [
            "kod · bezpieczeństwo · dane · ops",
            "ux · produkt · qa",
            "weryfikator · adwokat diabła",
          ],
        },
        {
          title: "Doktryna",
          leaves: ["projekt przed kodem", "„gotowe” wg poziomu ryzyka", "170 blizn"],
        },
        {
          title: "Szablon repo",
          leaves: [
            "CI + testy mutacyjne",
            "parsowane granice",
            "matryca QA · prywatność · runbook",
          ],
        },
        {
          title: "Rutyny",
          leaves: ["recenzent PR · kontrola zdrowia", "nadzór podatności", "wstrzymane do naprawy"],
        },
        {
          title: "Samotesty",
          leaves: ["każda bramka ma test", "pokrycie reguła → bramka", "cotygodniowy audyt"],
        },
      ],
      caption:
        "Osiem części, jedna zasada: nic ważnego nie istnieje tylko jako tekst. Każda reguła ma automatyczną kontrolę.",
    },
    pipe: {
      stages: [
        "prompt",
        "edycja",
        "komenda",
        "koniec sesji",
        "commit",
        "push",
        "CI",
        "merge",
        "produkcja",
      ],
      gates: [
        "protokół w prompcie",
        "lint + typy",
        "strażnik + no-verify",
        "tier + testy + recenzenci",
        "opis · sekrety · zależności · SQL",
        "bez main + rozmiar + cykle",
        "mutacje + sekrety",
        "tylko aktualny merge-ref",
        "200 z prawdziwej domeny",
      ],
      live: "LIVE",
      blocked:
        "żadnego cichego omijania: bramkę jakości można przejść tylko z wpisem w dzienniku · ryzykowne kroki dopiero po recenzji podagentów · kroki nieodwracalne i same bramki dopiero po moim „pozwol ALLOW_…” w czacie · rutynowy pull request scala się bez mojej frazy tylko z dowodem recenzji",
      caption:
        "Dziewięć punktów kontroli na drodze zmiany. Decyzje podejmuję ja; kontrole pilnują, żeby nic nie umknęło.",
    },
    tiers: {
      costTitle: "koszt recenzji",
      rungs: [
        {
          tier: "T0",
          trigger: "dokumentacja, teksty, style, zasoby",
          reviewers: "tylko kontrole skryptowe",
          cost: 0,
          costLabel: "0 tokenów AI",
        },
        {
          tier: "T1",
          trigger: "jeden odizolowany komponent albo helper",
          reviewers: "recenzja kodu zalecana",
          cost: 1,
          costLabel: "≈ 1 recenzja",
        },
        {
          tier: "T2",
          trigger: "wspólna logika, API, zależności, CI, > 150 linii",
          reviewers: "kod + operacje (+ UX, + dane)",
          cost: 4,
          costLabel: "≈ 4 recenzje",
        },
        {
          tier: "T3",
          trigger: "logowanie, uprawnienia, płatności, sekrety, migracje, cron, > 600 linii",
          reviewers: "kod + bezpieczeństwo + dane + operacje → weryfikator",
          cost: 9,
          costLabel: "≈ 8–10 recenzji",
        },
      ],
      caption:
        "Poziom wynika ze ścieżek i rozmiaru zmiany, nigdy z polecenia. Bezpieczeństwo, dane i weryfikację przy T3 recenzuje najmocniejszy model.",
    },
    exceptions: {
      whoLabel: "kto decyduje",
      windowLabel: "na jak długo",
      examplesLabel: "na przykład",
      levels: [
        {
          level: "A · agent",
          who: "agent naprawia problem albo świadomie idzie dalej; każde przejście trafia do dziennika z nazwą bramki",
          window: "jedno przejście, zapisane",
          examples:
            "rozmiar zmiany, TODO bez wpisu, zakomentowany kod, powtórzony tekst, granice modułów, format commita",
          tone: "a",
        },
        {
          level: "B · po recenzji",
          who: "agent, ale dopiero gdy podagenci zrecenzowali dokładnie ten kod, a on poprawił ich uwagi",
          window: "15 minut, jedna komenda, jedno repozytorium",
          examples:
            "kasowanie plików, twardy reset, czyszczenie repozytorium, nieznana zależność, kolumna z danymi osobowymi",
          tone: "n",
        },
        {
          level: "C · tylko ja",
          who: "ja, frazą wpisaną w czacie",
          window: "30 minut, 3 użycia (60 minut przy pracy nad samym PG)",
          examples:
            "zmiany w bramkach, push na main, sekrety w commicie, osłabione CI, force-push, usunięcie repozytorium",
          tone: "b",
        },
      ],
      caption:
        "Poziom C obejmuje to, czego nie da się cofnąć albo co wyłączyłoby inne kontrole. Gdyby agent mógł zatwierdzać zmiany we własnych bramkach, A i B nic by nie znaczyły.",
    },
    merge: {
      start: "pull request",
      checks: "wszystkie kontrole zielone na aktualnym wyniku scalenia",
      autoLabel: "scala się sam",
      phraseLabel: "czeka na moją frazę",
      branches: [
        { when: "sama dokumentacja", needs: "recenzja niepotrzebna", auto: true },
        {
          when: "zwykła zmiana kodu (T1)",
          needs: "recenzja kodu dokładnie tego diffu",
          auto: true,
        },
        { when: "wspólna logika (T2)", needs: "recenzja kodu i operacji", auto: true },
        {
          when: "T3, logowanie, płatności, migracje, zależności, CI, instrukcje agentów",
          needs: "moje „pozwol ALLOW_MERGE”",
          auto: false,
        },
      ],
      caption:
        "Włączone od 4 października. Recenzja musi wskazać diff po sumie kontrolnej i jest ważna dwie godziny.",
    },
    review: {
      orchestrator: "ORKIESTRATOR",
      gates: "SKRYPTY",
      gatesSub: "lint · typy · testy · SQL",
      finders: ["kod", "bezpieczeństwo", "dane · operacje", "ux · produkt · qa"],
      aggregate: "AGREGACJA",
      aggregateSub: "k-z-n · z dowodem",
      verifier: "WERYFIKATOR",
      verifierSub: "odtwórz albo obal",
      fixer: "FIX + BRAMKI",
      rule: "zero czatu między agentami · uwaga bez wykonanej komendy się nie liczy",
      caption:
        "Recenzenci dostają tylko kod po kontrolach skryptowych. Uwagi łączy skrypt. Weryfikator szuka błędów, a nie potwierdzeń.",
    },
    rounds: {
      blockingLabel: "blokujące",
      majorLabel: "poważne",
      rounds: [
        { label: "runda 1", blocking: 1, major: 11 },
        { label: "runda 2", blocking: 1, major: 13 },
        { label: "runda 3", blocking: 0, major: 11 },
        { label: "runda 4", blocking: 0, major: 8 },
        { label: "runda 5", blocking: 0, major: 9 },
        { label: "runda 6", blocking: 0, major: 8 },
        { label: "kontrole końcowe", blocking: 1, major: 2 },
      ],
      caption:
        "Wydanie 1.7.0: uwagi w każdej rundzie recenzji. Rundy 1–6 prowadziło trzech albo czterech recenzentów; dwie kontrole końcowe poprawek dwóch.",
    },
    loop: {
      steps: [
        "incydent albo powtórzona korekta",
        "analiza przyczyn: pięć „dlaczego”",
        "blizna + numer reguły",
        "bramka + test, że blokuje",
        "każda reguła ma bramkę",
        "cotygodniowy audyt",
      ],
      caption:
        "Pętla napędza się sama: cotygodniowy audyt wyłapuje kontrole, które przestały działać, i każda z nich staje się nową blizną.",
    },
    matrix: {
      rows: [
        {
          title: "Wiersze w każdej macierzy projektu",
          total: "62",
          segments: [
            { label: "obszary projektowania systemów", value: 37, tone: "a" },
            { label: "warstwy narzędzi w stacku", value: 25, tone: "n" },
          ],
        },
        {
          title: "Nazwane opcje z kursu, przed 1.5.0",
          total: "437",
          unit: "%",
          segments: [
            { label: "PG wiedział, kiedy wybrać", value: 46, tone: "a" },
            { label: "tylko nazwa", value: 26, tone: "n" },
            { label: "brak", value: 28, tone: "b" },
          ],
        },
        {
          title: "Obszary, w których proces wymuszał decyzję, przed 1.5.0",
          total: "37",
          segments: [
            { label: "tak", value: 15, tone: "a" },
            { label: "częściowo", value: 11, tone: "n" },
            { label: "nie", value: 11, tone: "b" },
          ],
        },
        {
          title: "Pierwszy prawdziwy przebieg: aplikacja klienta, 6 października",
          total: "37 wierszy",
          segments: [
            { label: "decyzja", value: 31, tone: "a" },
            { label: "nie dotyczy", value: 5, tone: "n" },
            { label: "nie teraz, z sygnałem", value: 1, tone: "b" },
          ],
        },
      ],
      caption:
        "Audyt zmierzył lukę; macierz ją zamyka, bo każdy obszar staje się wierszem, który sprawdza skrypt.",
    },
    release: {
      steps: [
        {
          title: "build i testy",
          detail: "kontrole, które przechodzi już każdy pull request",
          tone: "a",
        },
        {
          title: "sondowanie podglądu",
          detail: "automatyczne zapytania na ścieżkach, które nie mogą się zepsuć",
          tone: "a",
        },
        {
          title: "10 minut czekania",
          detail: "nowy build testowany poza ruchem, zanim domena się przełączy",
          tone: "a",
        },
        { title: "15 minut obserwacji", detail: "żywa strona sprawdzana co 30 sekund", tone: "a" },
      ],
      rollback:
        "trzy nieudane sprawdzenia z rzędu (około minuty) przywracają ostatnią dobrą wersję, raz; potem decyduje człowiek",
      caption: "Zaprojektowane i zrecenzowane; jeszcze nie przećwiczone na żywym projekcie.",
    },
    context: {
      beforeLabel: "przed",
      afterLabel: "po",
      rows: [
        {
          label: "Zasady doklejane do kolejnego polecenia o kodzie",
          before: 4.9,
          after: 0.9,
          beforeText: "4,9 KB",
          afterText: "0,9 KB",
        },
        {
          label: "Pamięć ładowana na starcie sesji",
          before: 35,
          after: 25,
          beforeText: "35 KB",
          afterText: "25 KB",
        },
        {
          label: "Tygodniowy limit zużyty na zapytanie: okno 1M (przed) vs 400k (po)",
          before: 2.3,
          after: 1,
          beforeText: "≈ 2,3×",
          afterText: "1×",
        },
      ],
      caption:
        "Wersje 1.4.0 i 1.8.0. Kilobajty zmierzone na doklejanym tekście; proporcja okien oszacowana z moich zapisów pracy.",
    },
    calib: {
      gateLabel: "bramka",
      beforeLabel: "przed 1.8.0",
      afterLabel: "od 1.8.0",
      rows: [
        {
          gate: "rozmiar zmiany",
          before: "400 linii kodu",
          after: "1500; jeden temat zostaje razem",
        },
        {
          gate: "powtórzony tekst",
          before: "3 razy w 2 plikach",
          after: "6 razy w 3 plikach; dane startowe pomijane",
        },
        {
          gate: "kasowanie cache builda",
          before: "zablokowane",
          after: "dozwolone; .. i linki dalej blokowane",
        },
        {
          gate: "lint po edycji",
          before: "każdy plik",
          after: "pomija jednorazowe skrypty poza projektem",
        },
        {
          gate: "changelog",
          before: "linia w każdym pull requeście",
          after: "zbierany z tytułów przy wydaniu",
        },
        { gate: "zasięg rutyn", before: "każde repozytorium", after: "tylko aktywne: 12 z 47" },
      ],
      caption:
        "Progi przestrojone według dziennika bramek, z odsianymi przebiegami testów. Każda zmiana mówi, jak ją cofnąć.",
    },
    limits: {
      triggersTitle: "PG dalej się zmienia, gdy",
      triggers: [
        {
          label: "przejdzie incydent:",
          body: "prawdziwa awaria, którą bramka powinna była złapać.",
        },
        {
          label: "zmieni się narzędzie albo model:",
          body: "aktualizacja psuje hook albo zmienia zachowanie agenta.",
        },
        { label: "poproszę:", body: "świadoma decyzja, a nie rutyna, która szuka sobie roboty." },
      ],
      wallsTitle: "Żadna reguła nie sięga",
      walls: [
        {
          label: "zdeterminowanego atakującego:",
          body: "zapisanie skryptu do pliku i uruchomienie go bije każdą regułę tekstową; to zadanie systemu operacyjnego.",
        },
        {
          label: "sensu kodu:",
          body: "sprawdzanie wzorców nie odróżni dobrej logiki od złej; od tego są recenzja i testy.",
        },
        {
          label: "miary, która stała się celem:",
          body: "gdy celem jest liczba bramek albo zielonych przebiegów, przestaje ona mierzyć jakość.",
        },
      ],
      signalTitle: "Sygnał stopu:",
      signal:
        "dwie rundy z rzędu, które znajdują tylko przypadki brzegowe niewidziane w prawdziwej pracy. Przepisywanie parsera trafiło na niego po dziewięciu.",
      caption:
        "Decyzja z 14 października 2026. Jakość pracy ma wynikać z kontroli, które istnieją, a nie z ich liczby.",
    },
    vault: {
      vault: "SEJF",
      vaultSub: "157 sekretów · self-hosted",
      bridge: "POŚREDNIK",
      bridgeSub: "przekazuje do procesu",
      target: "PROCES DOCELOWY",
      targetSub: "deploy · wywołanie API · CI",
      never: ["czat ✕", "kod ✕", "logi ✕"],
      caption: "Agent może użyć hasła lub klucza, którego nigdy nie zobaczy.",
    },
    cadence: {
      status: "Stan na 14 października: wszystkie rutyny PG wyłączone do czasu naprawy ustawień.",
      rows: [
        { name: "Recenzja pull requestów", dots: 5, freq: "dni robocze · wraca" },
        { name: "Kontrola zdrowia", dots: 1, freq: "co tydzień · wraca" },
        { name: "Nadzór podatności", dots: 1, freq: "co miesiąc · wraca" },
        { name: "Kalibracja recenzentów", dots: 1, freq: "co miesiąc · zostaje wył." },
        { name: "Przegląd podobnych projektów", dots: 1, freq: "co miesiąc · zostaje wył." },
        { name: "Przegląd modeli", dots: 1, freq: "co miesiąc · zostaje wył." },
        { name: "Sprzątanie repozytorium", dots: 0, freq: "tylko ręcznie", manual: true },
      ],
      caption:
        "Kropki pokazują planowaną częstotliwość. Trzy, które zostają wyłączone, pracują tylko nad samym PG, a ten jest w trybie utrzymania.",
    },
    waffle: {
      groups: [
        { label: "aktywne w ostatnich 30 dniach", count: 12, tone: "a" },
        { label: "skończone albo w spoczynku", count: 34, tone: "n" },
        { label: "nigdy nie sprawdzane przez rutyny", count: 1, tone: "b" },
      ],
      facts: [
        { n: "33", label: "z ochroną gałęzi, w tym 31 ścisłą" },
        { n: "44", label: "z włączonymi alertami podatności GitHuba" },
      ],
      caption: "Jeden kwadrat to jedno repozytorium; policzone z GitHuba 14 października 2026.",
    },
    versions: {
      ticks: [
        { day: 0, label: "12 wrz" },
        { day: 19, label: "1 paź" },
        { day: 32, label: "14 paź" },
      ],
      points: [
        { v: "1.0.0", date: "12 wrz", day: 0, theme: "pierwszy publiczny eksport Prompt-Guard" },
        {
          v: "1.1.0",
          date: "13 wrz",
          day: 1,
          theme: "pełny protokół po angielsku, dwujęzyczne blokady",
        },
        {
          v: "1.2.0",
          date: "27 wrz",
          day: 15,
          theme: "przebudowa po porównaniu z 35 projektami open source",
        },
        {
          v: "1.2.1–1.2.6",
          date: "28 wrz",
          day: 16,
          patches: 6,
          theme: "sześć poprawek: werdykt testów tylko z kodu wyjścia",
        },
        { v: "1.3.0", date: "5 paź", day: 23, theme: "pull requesty scalane z dowodem recenzji" },
        {
          v: "1.4.0",
          date: "5 paź",
          day: 23,
          theme: "te same zasady za mniejszy rachunek za kontekst",
        },
        {
          v: "1.5.0",
          date: "6 paź",
          day: 24,
          theme: "wiersz dla każdego obszaru projektowania systemów",
        },
        {
          v: "1.6.0",
          date: "10 paź",
          day: 28,
          theme: "rozszerzenia pod nadzorem, każda warstwa stacku",
        },
        {
          v: "1.7.0",
          date: "11 paź",
          day: 29,
          theme: "architektura podjęta na stałe, potok wydań",
        },
        { v: "1.8.0", date: "14 paź", day: 32, theme: "proporcjonalność, potem tryb utrzymania" },
      ],
      caption:
        "Pasek ma jedną komórkę na dzień; wypełniona komórka to wydanie, a liczba oznacza kilka wydań tego dnia.",
    },
  },
  explain: explainPl,
  explainUi: explainUiPl,
  colophon:
    "Ta strona przeszła przez proces, który opisuje: szkic napisał agent, tekst przeszedł przez opisane wyżej bramki i recenzję AI, a ja go zrecenzowałem i opublikowałem. Liczby pochodzą z komend uruchomionych w dniu publikacji, nie z pamięci.",
};
