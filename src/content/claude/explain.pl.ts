import type { ExplainUi, Explains } from "../../components/claude/types";

// Plain-language explanations of the parts of the /claude figures (PL). Ids match the `data-explain`
// attributes the figures draw; Explain.test.ts checks both directions and that EN and PL explain the same parts.
export const explainUiPl: ExplainUi = {
  hint: "Wskaż albo dotknij dowolny element rysunku, albo wybierz go poniżej, żeby zobaczyć, co robi, prostymi słowami.",
  pick: "Elementy tego rysunku",
  close: "Ukryj",
};

export const explainPl: Explains = {
  arch: [
    {
      id: "kamil",
      term: "Człowiek za sterami",
      body: "Ja. Opisuję, co ma powstać, wybieram architekturę, czytam wyniki recenzji i decyduję o wdrożeniu. AI pisze kod, jak ekipa budowlana pracująca według planu, a architekt sam odbiera gotowy dom.",
    },
    {
      id: "code",
      term: "AI piszące kod",
      body: "Claude Code to asystent AI uruchamiany w terminalu. Pisze i zmienia programy, odpala testy i wypuszcza je na produkcję. Przez złącza (MCP) korzysta też z GitHuba, przeglądarki i poczty.",
    },
    {
      id: "cowork",
      term: "AI do pracy biurowej",
      body: "Claude Desktop (Cowork) to ten sam model w roli biurowego pomocnika: pisze maile i dokumenty, szuka informacji, przygotowuje kontakt z klientami i projekty graficzne. Obowiązują go te same reguły i czyta tę samą pamięć.",
    },
    {
      id: "vault",
      term: "Sejf na hasła",
      body: "157 haseł i kluczy API (kodów, którymi programy się ze sobą dogadują) leży w jednym miejscu. Program dostaje klucz tylko w chwili, gdy go potrzebuje, jak od recepcjonisty klucz do pokoju. W czacie klucz nie pojawia się nigdy.",
    },
    {
      id: "memory",
      term: "Wspólny notatnik",
      body: "Ponad 2300 notatek, które AI czyta na początku sesji, żeby pamiętać decyzje sprzed tygodni. Po sesji samo dopisuje krótkie podsumowanie, jak dziennik zmiany w fabryce.",
    },
    {
      id: "gates",
      term: "Automatyczne punkty kontroli",
      body: "PG, czyli system jakości, to rząd kontroli na drodze każdej zmiany: polecenie, edycja, komenda, koniec sesji, commit (zapis zmiany), push (wysłanie na GitHuba), CI (automatyczne testy), recenzja i dowód z działającej strony. Jak kontrola na lotnisku: nie pyta, kim jesteś.",
    },
    {
      id: "projects",
      term: "Wszystkie 47 projektów",
      body: "47 repozytoriów (folderów z kodem pod kontrolą wersji): aplikacje, strony i automatyzacje. Te same kontrole obejmują sklep klienta i małe narzędzie, więc jakość nie zależy od tego, który to projekt.",
    },
  ],
  mind: [
    {
      id: "center",
      term: "Cały system jakości",
      body: "Wyższy Umysł, czyli PG (Prompt-Guard), to zestaw automatycznych kontroli wokół AI piszącego kod. Zaczął się od listy zasad dopisywanych do każdego polecenia, a urósł do ośmiu części. Myśl przewodnia: o regule, którą się tylko zamierza stosować, łatwo zapomnieć. Kontrola uruchamiana sama nie zapomina.",
    },
    {
      id: "branch-0",
      term: "Zasady przy każdym poleceniu",
      body: "Do każdego niebanalnego polecenia AI dostaje krótki protokół: pytaj, gdy coś jest niejasne, sprawdzaj przed twierdzeniem, mów „gotowe” tylko z dowodem. Raporty są zwięzłe, a zadanie trafia do właściwej gotowej umiejętności. Jak lista kontrolna pilota, wręczana automatycznie.",
    },
    {
      id: "branch-1",
      term: "Wyzwalacze przy każdej czynności",
      body: "Małe programy uruchamiane w ustalonych momentach. Po każdej edycji jeden sprawdza kod pod kątem błędów, przed każdą komendą drugi blokuje groźne, np. kasowanie historii, a na końcu sesji trzeci ocenia, jak ryzykowna była zmiana.",
    },
    {
      id: "branch-2",
      term: "Kontrole przy zapisie kodu",
      body: "Git to księga historii kodu. Gdy zmiany są zapisywane lub wysyłane na serwer, kontrole szukają wycieku haseł, nieaktualnej bazy, wymyślonych bibliotek, porzuconych notatek TODO i błędnego kodu bazy danych. Biblioteka musi naprawdę istnieć, więc literówka nie wpuści podróbki.",
    },
    {
      id: "branch-3",
      term: "Recenzenci specjaliści",
      body: "Kilku recenzentów AI, każdy od jednej dziedziny (kod, bezpieczeństwo, dane, utrzymanie, ekrany, produkt, testy), czyta zmianę niezależnie. Do tego weryfikator, który próbuje obalić ich uwagi, i adwokat diabła broniący tezy przeciwnej. Jak umowa czytana osobno przez prawnika i księgową.",
    },
    {
      id: "branch-4",
      term: "Spisane zasady",
      body: "Krótkie dokumenty czytane wtedy, gdy są potrzebne: projekt przed kodem, co znaczy „gotowe” przy danym poziomie ryzyka, oraz 170 „blizn”, czyli prawdziwych porażek z przeszłości. Każda reguła wskazuje błąd, z którego powstała.",
    },
    {
      id: "branch-5",
      term: "Zestaw startowy projektu",
      body: "Każdy nowy projekt dostaje gotowy zestaw: automatyczne testy, testy mutacyjne (celowe psucie kodu, by sprawdzić, czy testy to zauważą), spisane granice między częściami kodu, listę testów, notatki o prywatności i instrukcję utrzymania. Bezpieczeństwa nie dokleja się na końcu.",
    },
    {
      id: "branch-6",
      term: "Zadania cykliczne",
      body: "Prace uruchamiane z zegara, gdy nikt nic nie pisze: przegląd otwartych pull requestów (propozycji zmian), kontrola zdrowia systemu i nadzór nad znanymi lukami w bezpieczeństwie. Teraz wszystkie są wyłączone do czasu naprawy ustawień.",
    },
    {
      id: "branch-7",
      term: "System testuje sam siebie",
      body: "Każda kontrola ma test dowodzący, że naprawdę blokuje swój przypadek. Skrypt sprawdza, czy do każdej spisanej reguły jest kontrola, a cotygodniowy audyt szuka tych, które przestały działać. Jak przycisk testowy w czujniku dymu.",
    },
  ],
  pipe: [
    {
      id: "stage-0",
      term: "Twoje polecenie",
      body: "Zadanie trafia do AI razem z dołączonym protokołem: pytaj, gdy niejasne, sprawdzaj przed twierdzeniem, kończ tylko z dowodem. Dodaje się go automatycznie, więc AI nie może o nim „zapomnieć”. Jak lista kontrolna przed startem samolotu.",
    },
    {
      id: "stage-1",
      term: "Każda edycja sprawdzana",
      body: "Po każdym pliku, który AI zmieni, kod jest przeglądany pod kątem błędów (lint) i błędów typów, czyli elementów, które do siebie nie pasują. Błędy wracają od razu do AI, jak korektor zaznaczający każdy akapit.",
    },
    {
      id: "stage-2",
      term: "Komendy pod kontrolą",
      body: "Zanim AI wykona komendę w terminalu, czyta ją strażnik. Blokuje pominięcie kontroli (przełącznik no-verify), wymuszone nadpisanie historii, kasowanie folderów i ślepe pobieranie skryptów do uruchomienia. Jak bramka na lotnisku: liczy się tylko zawartość bagażu.",
    },
    {
      id: "stage-3",
      term: "Kontrola końca sesji",
      body: "Gdy AI chce skończyć, automatyczna kontrola (bramka) mierzy ryzyko zmiany i odpala testy. Przy średnim i wysokim ryzyku nie zamknie sesji, dopóki nie przejrzą jej recenzenci. Jak brygadzista, który przed końcem zmiany obchodzi halę.",
    },
    {
      id: "stage-4",
      term: "Kontrola przy zapisie",
      body: "Commit zapisuje zmianę w historii. W tej chwili sprawdzany jest opis zmiany, sekrety (wycieki haseł), nowe biblioteki i kod bazy danych. Jak sprawdzanie dokumentów tuż przed wejściem na pokład.",
    },
    {
      id: "stage-5",
      term: "Kontrola przy wysyłce",
      body: "Push wysyła kod na serwer. Blokowane jest wysłanie prosto do głównej wersji, zbyt duże zmiany i cykle zależności, czyli sytuacje, gdy części programu zależą od siebie nawzajem w kółko.",
    },
    {
      id: "stage-6",
      term: "Automatyczne testy",
      body: "CI to robot, który buduje i testuje zmianę na czystej maszynie. Odpala też testy mutacyjne, czyli celowo psuje kod, żeby zobaczyć, czy testy to wychwycą, i jeszcze raz skanuje w poszukiwaniu sekretów.",
    },
    {
      id: "stage-7",
      term: "Dołączenie do głównej wersji",
      body: "Merge dodaje zmianę do głównego kodu. Skrypt scala tylko wtedy, gdy kontrole przeszły na aktualnym wyniku scalenia, a nie na stanie sprzed czyjejś innej zmiany. Zielone CI na starym wyniku kiedyś zepsuło główną wersję.",
    },
    {
      id: "stage-8",
      term: "Dowód z żywej strony",
      body: "Po wdrożeniu skrypt odpytuje prawdziwy adres produkcyjny i oczekuje kodu 200, czyli „w porządku”. Sam udany build nie wystarcza. Jak telefon do restauracji z pytaniem, czy jest otwarta, zamiast czytania szyldu.",
    },
    {
      id: "live",
      term: "Na żywo",
      body: "Zmiana działa u prawdziwych użytkowników. Pasek pod ścieżką mówi, kto może ominąć kontrolę: nikt po cichu. Ryzykowne kroki wymagają recenzji osobnych recenzentów AI, a nieodwracalne mojej frazy wpisanej w czacie.",
    },
  ],
  review: [
    {
      id: "orchestrator",
      term: "Dyrygent recenzji",
      body: "Główna sesja uruchamia recenzję: ocenia ryzyko zmiany, wysyła kod recenzentom i zbiera wyniki. Recenzenci nie rozmawiają ze sobą ani nie spierają się z dyrygentem. Każdy pracuje sam.",
    },
    {
      id: "gates",
      term: "Najpierw skrypty",
      body: "Tanie skrypty sprawdzają lint, typy, testy i SQL, zanim ruszy pierwszy recenzent AI. Recenzenci widzą tylko kod, który już przeszedł, więc tracą czas na prawdziwe problemy, nie na literówki. Jak sprawdzanie pisowni przed redaktorem.",
    },
    {
      id: "finder-0",
      term: "Recenzent kodu",
      body: "Czyta zmianę pod kątem czytelności, poprawności, testów i logowania. Pracuje tylko do odczytu, zaczyna z pustą pamięcią i każdą uwagę musi poprzeć komendą, którą naprawdę uruchomił. Jak kolega, który nie słyszał wcześniejszej dyskusji.",
    },
    {
      id: "finder-1",
      term: "Recenzent bezpieczeństwa",
      body: "Szuka dróg włamania i wycieku danych: dziur w logowaniu, sytuacji, w której jeden klient widzi dane drugiego, odsłoniętych sekretów i błędów w płatnościach. Używany przy zmianach wysokiego ryzyka. Jak ślusarz sprawdzający wszystkie drzwi nowego budynku.",
    },
    {
      id: "finder-2",
      term: "Recenzenci bazy i utrzymania",
      body: "Dział danych sprawdza zmiany w bazie: strukturę, indeksy i bezpieczne cofnięcie. Dział utrzymania patrzy na wdrożenie: limity czasu, ponawianie, logi i sposób wycofania wydania. Jak elektryk i hydraulik oglądający ten sam budynek.",
    },
    {
      id: "finder-3",
      term: "Recenzenci od strony użytkownika",
      body: "UX sprawdza ekrany, języki, dostępność i telefon. Produkt pyta, czy zmiana rozwiązuje nazwany problem i czy obca osoba mogłaby ją przejąć. QA uruchamia aplikację i klika, jak prawdziwy klient.",
    },
    {
      id: "aggregate",
      term: "Uwagi łączy skrypt",
      body: "Zwykły skrypt, nie AI, łączy raporty. Uwaga blokuje zmianę tylko wtedy, gdy znalazło ją niezależnie dość recenzentów albo gdy odtworzy ją weryfikator. Uwaga bez wykonanej komendy jako dowodu odpada.",
    },
    {
      id: "verifier",
      term: "Weryfikator sceptyk",
      body: "Świeże AI, którego jedynym zadaniem jest obalać uwagi. Powtarza komendę z każdej z nich i orzeka: odtworzone albo nie. Szuka błędów w raportach, nie potwierdzeń, co chroni przed sytuacją, gdy wszyscy zgadzają się bez powodu.",
    },
    {
      id: "fixer",
      term: "Poprawka i kontrola od nowa",
      body: "Główna sesja naprawia to, co się potwierdziło, i skrypty ruszają od początku. Recenzja kończy się wtedy, gdy bramki przechodzą na poprawionym kodzie, a nie wtedy, gdy skończy się naprawianie.",
    },
  ],
  loop: [
    {
      id: "step-0",
      term: "Coś idzie źle",
      body: "Zdarza się prawdziwy incydent albo tę samą korektę trzeba zrobić drugi raz. To uruchamia pętlę. Przykład: kontrola przed wysłaniem kodu przez sześć dni nie działała i nikt tego nie zauważył.",
    },
    {
      id: "step-1",
      term: "Szukanie prawdziwej przyczyny",
      body: "Pytam „dlaczego” pięć razy, żeby zejść pod objaw. W przykładzie z wysyłką kontrola nie działała, bo wcześniejsza linijka zużyła jej dane wejściowe, a kontrola zdrowia sprawdzała tylko, czy plik istnieje.",
    },
    {
      id: "step-2",
      term: "Zapisanie blizny",
      body: "Porażka trafia do rejestru jako „blizna” z numerem: co się stało, jaki jest dowód i jaką regułę wywołała. Blizn jest 170. Każda reguła niesie numer błędu, z którego powstała, więc nikt nie musi zgadywać, po co istnieje.",
    },
    {
      id: "step-3",
      term: "Kontrola i test",
      body: "Powstaje kontrola łapiąca dokładnie ten przypadek oraz test dowodzący, że ona blokuje. Kontroli bez takiego testu nie ufam, bo zielony wynik może oznaczać zepsuty alarm.",
    },
    {
      id: "step-4",
      term: "Każda reguła ma kontrolę",
      body: "Skrypt porównuje spisane reguły z istniejącymi kontrolami. Reguła, która istnieje tylko jako tekst, oblewa audyt. Dzięki temu zasady nie wracają do dobrych chęci.",
    },
    {
      id: "step-5",
      term: "Cotygodniowy audyt",
      body: "Raz w tygodniu system sprawdza sam siebie: czy kontrole nadal się odpalają, czy nie ma cichych pominięć. Wszystko, co przestało działać, staje się nowym incydentem w kroku pierwszym, więc pętla napędza się sama. Na razie jest wstrzymana.",
    },
  ],
  vault: [
    {
      id: "vault",
      term: "Własny sejf na hasła",
      body: "157 haseł i kluczy leży na moim własnym serwerze, nie w cudzej chmurze. AI nie może ich przeglądać.",
    },
    {
      id: "bridge",
      term: "Pośrednik z sejfu",
      body: "Gdy zadanie wymaga klucza, pośrednik bierze go z sejfu i podaje prosto temu jednemu programowi, który go potrzebuje. Jak paczka podana przez okienko: AI widzi, że przyszła, ale nigdy jej nie trzyma.",
    },
    {
      id: "target",
      term: "Program używający klucza",
      body: "Wdrożenie, wywołanie API albo uruchomienie CI dostaje klucz jako ukryte ustawienie (zmienną środowiskową), używa go i się kończy. Klucz istnieje tylko wewnątrz tego procesu, dopóki działa.",
    },
    {
      id: "never",
      term: "Gdzie klucza nie ma",
      body: "Klucz nie pojawia się w czacie, w kodzie ani w logach. PG blokuje też sekret wpisany w linię komendy i skanuje każdy zapis pod kątem wycieków, więc wklejenie klucza do publicznego pliku zostaje zatrzymane.",
    },
  ],
  cadence: [
    {
      id: "row-0",
      term: "Codzienny przegląd pull requestów",
      body: "W dni robocze AI czyta otwarte pull requesty (propozycje zmian) w aktywnych projektach i zgłasza problemy. Aktywny znaczy ruszany w ostatnich 30 dniach: przy pierwszym liczeniu 12 z 47. Jedna z trzech rutyn, które mają wrócić.",
    },
    {
      id: "row-1",
      term: "Cotygodniowa kontrola zdrowia",
      body: "Raz w tygodniu skrypt, nie AI, przegląda cały system: czy kontrole się odpalają, czy jakaś rutyna padła, ile razy omijano bramki. Jak przegląd samochodu. Ma wrócić.",
    },
    {
      id: "row-2",
      term: "Miesięczny nadzór podatności",
      body: "Raz w miesiącu sprawdza aktywne projekty pod kątem znanych luk w używanych bibliotekach. Odróżnia „przeskanowano, nic nie ma” od „nie dało się przeskanować”, więc nieudany odczyt nigdy nie wygląda jak czysty wynik. Ma wrócić.",
    },
    {
      id: "row-3",
      term: "Kalibracja recenzentów",
      body: "Raz w miesiącu sprawdza, czy recenzenci AI są spójni: ta sama wada pokazana w dwóch opakowaniach musi dostać ten sam werdykt. Dotyczy tylko samego PG, więc zostaje wyłączona, dopóki PG jest w trybie utrzymania.",
    },
    {
      id: "row-4",
      term: "Przegląd podobnych projektów",
      body: "Raz w miesiącu patrzy, co robią podobne otwarte projekty, żeby wyłapać pomysły warte pożyczenia. Pracuje tylko nad samym PG, więc zostaje wyłączony.",
    },
    {
      id: "row-5",
      term: "Przegląd modeli AI",
      body: "Raz w miesiącu sprawdza, jakie modele AI ma teraz w ofercie Anthropic, i proponuje, który powinien wykonywać które zadanie w systemie, na przykład tańszy do rutynowych kontroli. Dotyczy tylko samego PG, więc zostaje wyłączony.",
    },
    {
      id: "row-6",
      term: "Sprzątanie repozytorium",
      body: "Porządkowanie plików i starych gałęzi robię ręcznie, gdy o to poproszę. Wszystko, co mogłoby samo szukać sobie roboty, jest wyłączone z założenia, więc nic nie rusza starych projektów bez mojej prośby.",
    },
  ],
  tiers: [
    {
      id: "rung-0",
      term: "Najniższe ryzyko: teksty i style",
      body: "Dokumentacja, teksty, style i grafiki. Działają tylko darmowe kontrole skryptowe, bez recenzenta AI, więc bez kosztu. Poprawka literówki nie uruchamia audytu bezpieczeństwa, tak jak draśnięcie na izbie przyjęć dostaje plaster.",
    },
    {
      id: "rung-1",
      term: "Mała, odizolowana zmiana",
      body: "Jeden samodzielny komponent albo funkcja pomocnicza. Zalecana jest recenzja kodu, koszt to około jednej recenzji. Poziom wynika z plików, które się zmieniły, a nie z tego, co AI o nich powie.",
    },
    {
      id: "rung-2",
      term: "Wspólny kod, średnie ryzyko",
      body: "Logika używana w wielu miejscach, API, nowe zewnętrzne biblioteki (zależności), ustawienia automatycznego serwera testów (CI) albo ponad 150 linii. Wymaga recenzentów kodu i utrzymania, a w razie potrzeby UX lub danych. Koszt to około czterech recenzji.",
    },
    {
      id: "rung-3",
      term: "Najwyższe ryzyko",
      body: "Logowanie, uprawnienia, płatności, sekrety, migracje bazy, zadania cykliczne albo ponad 600 linii. Recenzenci kodu, bezpieczeństwa, danych i utrzymania, potem weryfikator. Koszt 8 do 10 recenzji, a bezpieczeństwo i weryfikację robi najmocniejszy model.",
    },
  ],
  exceptions: [
    {
      id: "level-0",
      term: "Decyduje AI",
      body: "Przy drobnych kontrolach, jak rozmiar zmiany, notatka TODO czy forma opisu zmiany, AI może naprawić problem albo świadomie iść dalej. Każde przejście trafia do dziennika z nazwą bramki. Jak kierownik zmiany zatwierdzający mały wydatek.",
    },
    {
      id: "level-1",
      term: "Po recenzji",
      body: "Przy ryzykowniejszych krokach, jak kasowanie plików czy twardy reset (wyrzucenie niezapisanej pracy), osobni recenzenci AI muszą najpierw zrecenzować dokładnie ten kod, a AI poprawić ich uwagi. Dopiero wtedy zgoda trwa 15 minut, na jedną komendę w jednym repozytorium.",
    },
    {
      id: "level-2",
      term: "Tylko ja",
      body: "Przy krokach nieodwracalnych albo wyłączających inne kontrole, jak force-push (wymuszone nadpisanie historii) czy zmiany w bramkach, muszę wpisać frazę w czacie. Trwa 30 minut i 3 użycia. AI nie może jej przyznać samo sobie.",
    },
  ],
  merge: [
    {
      id: "start",
      term: "Propozycja zmiany",
      body: "Pull request to prośba o dołączenie zmiany do głównego kodu. Kiedyś każde scalenie wymagało mojej frazy, teraz decyduje skrypt na podstawie ryzyka zmiany i dołączonego dowodu. Włączone od 4 października.",
    },
    {
      id: "checks",
      term: "Wszystkie kontrole zielone",
      body: "Scalanie zaczyna się tylko wtedy, gdy każda automatyczna kontrola przeszła na aktualnym wyniku scalenia, czyli na kodzie takim, jaki będzie po połączeniu. Zielony wynik na starym stanie wpuścił kiedyś do głównej wersji zmianę, która ją zepsuła.",
    },
    {
      id: "branch-0",
      term: "Sama dokumentacja",
      body: "Zmiana dotyka tylko dokumentacji, więc nie ma czego recenzować. Skrypt scala ją sam, gdy kontrole są zielone.",
    },
    {
      id: "branch-1",
      term: "Zwykły kod: jedna recenzja",
      body: "Zwykła zmiana kodu scala się sama, jeśli istnieje recenzja kodu dokładnie tego diffu (listy zmienionych linii). Recenzja wskazuje diff po sumie kontrolnej i jest ważna dwie godziny, więc nie da się jej użyć do innej zmiany.",
    },
    {
      id: "branch-2",
      term: "Wspólny kod: dwie recenzje",
      body: "Kod używany w wielu miejscach scala się sam po recenzji kodu i recenzji utrzymania tej dokładnie zmiany. Bez takiego dowodu czeka.",
    },
    {
      id: "branch-3",
      term: "Wrażliwe: czeka na mnie",
      body: "Logowanie, płatności, migracje, zależności, ustawienia CI i instrukcje dla agentów AI nigdy nie scalają się same. Czekają, aż wpiszę „pozwol ALLOW_MERGE” (pozwol znaczy: zezwalam).",
    },
  ],
  ideas: [
    {
      id: "idea-0",
      term: "Bramka",
      body: "Bramka to kontrola, która uruchamia się sama w ustalonym momencie, na przykład przed commitem albo pushem, więc nikt nie musi o niej pamiętać. Przykład: pominięcie kontroli przez --no-verify jest blokowane, cokolwiek agent usłyszał. Każda bramka ma test dowodzący, że naprawdę blokuje.",
    },
    {
      id: "idea-1",
      term: "Blizna",
      body: "Blizna to prawdziwa awaria zapisana z przyczyną i numerem reguły, jak protokół z wypadku. Naprawą nigdy nie jest obietnica ostrożności: analiza incydentu kończy się nową bramką albo nową blizną, a każdy punkt listy kontrolnej wskazuje bliznę, z której powstał.",
    },
    {
      id: "idea-2",
      term: "Słowo statusu",
      body: "Każdy raport kończy się jednym słowem. VERIFIED znaczy, że dowód jest zacytowany, UNVERIFIED mówi, czego brakuje i jak to sprawdzić, FAILED mówi, co się stało, słowo w słowo. Agenci AI zgłaszają sukces, którego nie sprawdzili; słowo pokazuje tę różnicę.",
    },
  ],
  guards: [
    {
      id: "core",
      term: "Reguły",
      body: "Hooki, bramki gita, ustawienia i narzędzia bramek to sam system. Gdyby agent mógł je po cichu zmienić, każda inna kontrola na tej stronie byłaby dekoracją, więc są chronione najpierw.",
    },
    {
      id: "guard-0",
      term: "Pieczęć",
      body: "Każdy plik warstwy kontrolnej ma sumę kontrolną, jak plomba na liczniku. Zmiana zrobiona poza oknem, które otworzyłem, zrywa plombę i pokazuje się na starcie następnej sesji i w cotygodniowym audycie.",
    },
    {
      id: "guard-1",
      term: "Rozszerzenia",
      body: "Mody Claude Code działają wewnątrz narzędzia i omijają hooki. Dlatego instalacja, włączenie albo aktualizacja moda wymaga mojej frazy, a wyłączenie jest zawsze dozwolone: bezpieczny kierunek nigdy nie czeka.",
    },
    {
      id: "guard-2",
      term: "Cel bazy danych",
      body: "Każda komenda, która rozmawia z bazą danych, jest śledzona do miejsca, w które celuje, łącznie z adresami połączeń i nakładkami typu docker exec albo ssh. Niszczący SQL przechodzi tylko, gdy cel jest dowodnie na moim komputerze; SQL, którego strażnik nie widzi, liczy się jako niszczący.",
    },
    {
      id: "guard-3",
      term: "Łatki",
      body: "Łatka albo rozpakowane archiwum mogłyby przepisać reguły bez edytora, którego pilnuje strażnik. Dlatego jedno i drugie jest zablokowane w folderze PG i w każdym folderze nad nim, a w każdym repozytorium łatka dotykająca .git/config albo .claude/ jest blokowana.",
    },
    {
      id: "outer",
      term: "Uczciwa granica",
      body: "Strażnik jest zbudowany przeciw pomyłkom i instrukcjom przemyconym z zewnątrz, na przykład ze strony, którą agent czyta. Agent zdeterminowany, żeby go obejść, może uruchomić dowolny skrypt; zatrzymają go tylko piaskownica i uprawnienia systemu operacyjnego.",
    },
  ],
  matrix: [
    {
      id: "row-0",
      term: "Macierz projektu",
      body: "Każdy projekt dostaje tabelę z 62 wierszami: 37 obszarów projektowania systemów, takich jak dane, kolejki czy logowanie, i 25 warstw narzędzi od frontendu po płatności. Każdy wiersz musi mieć decyzję z dowodem, powód, dla którego nie dotyczy, albo mierzalny sygnał, kiedy do niego wrócić.",
    },
    {
      id: "row-1",
      term: "Opcje z kursu",
      body: "Audyt z 6 października wziął 437 nazwanych opcji z kursu projektowania systemów. Przy 46 % z nich PG wiedział, kiedy je wybrać; 26 % znał tylko z nazwy, a 28 % nie znał wcale. Ten pasek to właśnie ta luka, zmierzona przed wersją 1.5.0, która dodała macierz.",
    },
    {
      id: "row-2",
      term: "Decyzje w obszarach, przedtem",
      body: "Z 37 obszarów stary krok projektowania zmuszał AI do decyzji w 15, częściowo w 11, a w 11 wcale. Nic nie kazało mu przejść przez każdy obszar.",
    },
    {
      id: "row-3",
      term: "Pierwszy prawdziwy przebieg",
      body: "Tego samego dnia macierz przeszła przez aplikację klienta: 31 wierszy dostało decyzję, 5 nie dotyczyło, a 1 czeka na mierzalny sygnał. Wszystkie 37 wierszy zostało wypełnionych, a około 60 luk wypisanych z dowodami do przejrzenia przez człowieka.",
    },
  ],
  release: [
    {
      id: "step-0",
      term: "Build i testy",
      body: "Te same automatyczne kontrole, które przechodzi już każda zmiana: kod się buduje, typy się zgadzają, testy są zielone. Cały potok jest zaprojektowany i zrecenzowany, ale nie działał jeszcze na żywym projekcie.",
    },
    {
      id: "step-1",
      term: "Sondowanie podglądu",
      body: "Nowa wersja najpierw działa jako podgląd, zanim wskaże na nią prawdziwy adres. Skrypt otwiera strony, które nie mogą się zepsuć, i sprawdza, czy każda odpowiada poprawnie; czerwony wynik ma nie dopuścić nowej wersji do domeny.",
    },
    {
      id: "step-2",
      term: "10 minut czekania",
      body: "Nowy build jest testowany przez dziesięć minut z dala od prawdziwych odwiedzających, zanim domena zacznie na niego wskazywać, więc problem wychodzi na jaw, zanim ktokolwiek z niego skorzysta.",
    },
    {
      id: "step-3",
      term: "15 minut obserwacji",
      body: "Po przełączeniu skrypt sprawdza żywą stronę co 30 sekund przez 15 minut. Robi to, co robiłby dyżurny inżynier, którego jednoosobowa firma nie ma.",
    },
    {
      id: "back",
      term: "Droga powrotna",
      body: "Trzy nieudane sprawdzenia z rzędu, czyli około minuty błędów, same przywracają ostatnią dobrą wersję, raz. Jeśli wydanie zmieniło strukturę bazy danych albo funkcje serwerowe, potok staje i pyta mnie: stary kod na nowej strukturze tylko by pogorszył sprawę.",
    },
  ],
  rounds: [
    {
      id: "blocking",
      term: "Uwaga blokująca",
      body: "Problem na tyle poważny, że zatrzymuje wydanie. Trzeba go naprawić, zanim cokolwiek wyjdzie. Pełne rundy znalazły dwie dziury w bezpieczeństwie, na przykład tajny klucz dostępu (token), który dyżurne AI mogło wkleić do komentarza; kontrole końcowe znalazły regułę bezpieczeństwa bez testu.",
    },
    {
      id: "major",
      term: "Uwaga poważna",
      body: "Prawdziwa usterka, która sama nie zatrzymuje wydania, ale jest naprawiana w tej samej rundzie, zanim zacznie się następna. Każdy turkusowy słupek pokazuje, ile takich uwag dała jedna runda.",
    },
    {
      id: "round",
      term: "Runda recenzji",
      body: "Jedno pełne przejście przez wydanie 1.7.0: trzech albo czterech recenzentów AI, każdy z własną listą kontrolną, czyta całą zmianę osobno. Skrypt łączy ich uwagi, uwagi są naprawiane, a następna runda zaczyna się na poprawionym kodzie.",
    },
    {
      id: "final",
      term: "Kontrole końcowe",
      body: "Dwie mniejsze kontrole z dwoma recenzentami, które czytają tylko ostatnie poprawki. I tak znalazły problem blokujący: regułę bezpieczeństwa bez testu. Naprawiono ją przed wydaniem, jak pozostałe.",
    },
  ],
  context: [
    {
      id: "row-0",
      term: "Zasady w kolejnym poleceniu",
      body: "Każda wiadomość do modelu niesie tekst w tle, który model czyta najpierw, a za ten tekst się płaci. Kolejne polecenie o kodzie niosło 4,9 KB zasad; teraz pełny protokół idzie raz na sesję, a następne wiadomości dostają jednolinijkowe przypomnienie, 0,9 KB.",
    },
    {
      id: "row-1",
      term: "Pamięć na starcie",
      body: "Notatki ładowane na starcie sesji zeszły z 35 KB do 25 KB. Najnowsze punkty kontrolne idą pierwsze, każdy skrócony plik ma listę tego, co pominął, a kontrola budżetu robi się czerwona, jeśli tekst startowy znów urośnie.",
    },
    {
      id: "row-2",
      term: "Okno kontekstu",
      body: "Okno to ilość tekstu, którą model trzyma naraz. Milion tokenów brzmi lepiej, ale każda wiadomość wysyła wszystko od nowa: w moich zapisach pracy okno 1M zużywało około 2,3 razy więcej tygodniowego limitu niż 400k, więc okno zostaje na 400k.",
    },
  ],
  calib: [
    {
      id: "row-0",
      term: "Rozmiar zmiany",
      body: "Zmiana zbyt duża, żeby ją dobrze zrecenzować, musi zostać podzielona. Próg przestrojono według dziennika bramek: z 400 linii zrobiło się 1500, a zmiana obejmująca jeden temat może zostać w jednym kawałku.",
    },
    {
      id: "row-1",
      term: "Powtórzony tekst",
      body: "Bramka szuka tego samego tekstu wklejanego raz po raz zamiast napisanego raz. Kiedyś reagowała na 3 kopie w 2 plikach; teraz na 6 kopii w 3 plikach, a dane startowe, które powtarzają się celowo, są pomijane.",
    },
    {
      id: "row-2",
      term: "Kasowanie cache builda",
      body: "Cache builda to folder plików, które narzędzie może w każdej chwili odtworzyć. Kasowanie go było blokowane jak każde inne; teraz jest dozwolone, a ścieżki z .. i linki dalej są blokowane, bo mogą wskazywać poza folder.",
    },
    {
      id: "row-3",
      term: "Lint po edycji",
      body: "Lint to automatyczna kontrola stylu i typowych błędów, która rusza po każdej edycji. Jednorazowe skrypty poza projektem są teraz pomijane, bo nigdy nie trafiają do produkcji.",
    },
    {
      id: "row-4",
      term: "Changelog",
      body: "Changelog to lista tego, co zmieniło się w każdym wydaniu. Zamiast linii dopisywanej w każdym pull requeście lista jest teraz zbierana z tytułów pull requestów w chwili wydania.",
    },
    {
      id: "row-5",
      term: "Zasięg rutyn",
      body: "Rutyny to kontrole uruchamiane według harmonogramu. Gdy działają, patrzą tylko na 12 z 47 repozytoriów, w których była prawdziwa praca w ostatnich 30 dniach. Teraz są wyłączone do czasu naprawy ustawień.",
    },
  ],
  limits: [
    {
      id: "trigger-0",
      term: "Incydent",
      body: "Prawdziwa awaria, którą bramka powinna była złapać, a nie złapała. To zmierzona luka, więc jej naprawa jest warta swojej ceny; ryzyko, które tylko mogłoby się zdarzyć, nie wystarcza.",
    },
    {
      id: "trigger-1",
      term: "Aktualizacja narzędzia albo modelu",
      body: "Gdy zmienia się Claude Code albo model, hook (kontrola wpięta w narzędzie) może się zepsuć, a agent zacząć zachowywać się inaczej. Wtedy PG jest dopasowywany do nowego narzędzia; nie dostaje z tego powodu nowego mechanizmu.",
    },
    {
      id: "trigger-2",
      term: "Świadoma prośba",
      body: "Sam decyduję, że coś ma się zmienić. Nie liczy się już rutyna, która szuka sobie roboty: przez tygodnie każde ryzyko, które zauważyłem, dostawało nową bramkę, i dopiero ta zasada to zakończyła.",
    },
    {
      id: "wall-0",
      term: "Zdeterminowany atakujący",
      body: "Strażnik czyta komendy jako tekst. Ktoś, kto chce go obejść, może zapisać skrypt do pliku i go uruchomić, a żadna reguła tekstowa nie zajrzy do środka. Zatrzymanie tego to zadanie systemu operacyjnego: jego piaskownicy, czyli wydzielonej przestrzeni dla programów, i uprawnień.",
    },
    {
      id: "wall-1",
      term: "Sens kodu",
      body: "Sprawdzanie wzorców widzi, jak kod wygląda, a nie czy jego logika jest dobra: dwie linie mogą wyglądać podobnie i robić coś przeciwnego. Dlatego są recenzenci, którzy czytają zmianę, i testy, które ją uruchamiają.",
    },
    {
      id: "wall-2",
      term: "Miara, która stała się celem",
      body: "Gdy liczba staje się celem, przestaje mierzyć to, co miała mierzyć (prawo Goodharta). Więcej bramek albo więcej zielonych przebiegów samo nie znaczy, że praca jest lepsza; dobra ma być praca.",
    },
    {
      id: "signal",
      term: "Sygnał stopu",
      body: "Moment, w którym więcej wysiłku przestaje dawać więcej ochrony: dwie rundy z rzędu, które znajdują tylko przypadki brzegowe niewidziane w prawdziwej pracy. Przepisywanie części strażnika, która czyta komendy, trafiło na niego po dziewięciu rundach i zostało zamknięte.",
    },
  ],
  waffle: [
    {
      id: "group-0",
      term: "Aktywne",
      body: "W 12 repozytoriach była prawdziwa praca w ostatnich 30 dniach. Gdy rutyny działają, poświęcają czas tylko im, a dni, w których PG przeszedł naraz przez wszystkie repozytoria albo ta sama zmiana trafiła wszędzie, nie liczą się jako praca.",
    },
    {
      id: "group-1",
      term: "Skończone albo w spoczynku",
      body: "Większość projektów jest skończona albo wstrzymana. PG dalej pilnuje ich wszystkich, ale rutyny poświęcają czas tylko tam, gdzie trwa praca.",
    },
    {
      id: "group-2",
      term: "Nigdy nie sprawdzane przez rutyny",
      body: "Jedno repozytorium nigdy nie bierze udziału w przebiegach rutyn. Dalej jest tu policzone, więc suma to 47.",
    },
    {
      id: "fact-0",
      term: "Ochrona gałęzi",
      body: "Ustawienie GitHuba, które nie wpuszcza zmiany do głównej gałęzi bez przejścia jej kontroli. Mają ją 33 repozytoria, w tym 31 ścisłą: kontrole muszą przejść na najnowszym kodzie, a nie na starszej kopii.",
    },
    {
      id: "fact-1",
      term: "Alerty podatności",
      body: "GitHub ostrzega, gdy biblioteka używana przez projekt ma znaną dziurę w bezpieczeństwie. Te alerty mają włączone 44 repozytoria.",
    },
  ],
  versions: [
    {
      id: "strip",
      term: "Pasek kalendarza",
      body: "Jedna komórka na dzień, od 12 września do 14 października. Wypełniona komórka to dzień z wydaniem, liczba w niej oznacza kilka wydań tego dnia, a odstępy między nimi zachowują prawdziwą skalę.",
    },
    {
      id: "number",
      term: "Numer wersji",
      body: "Trzy liczby: pierwsza zmienia się, gdy coś przestaje działać po staremu, środkowa, gdy dochodzi coś nowego, ostatnia przy poprawce. Więc 1.2.6 to szósta poprawka po 1.2.0.",
    },
    {
      id: "compare",
      term: "Porównanie z innymi",
      body: "Agenci przeszli przez 35 publicznych projektów o podobnym pomyśle i wypisali 23 rzeczy, które inni robili lepiej, każdą z plikiem i linią. Projekt zmian przeszedł przegląd bezpieczeństwa, zanim powstała jakakolwiek linia kodu.",
    },
    {
      id: "patches",
      term: "Sześć poprawek jednego dnia",
      body: "Bramka końca sesji wierzyła temu, co wypisały testy, a nie ich kodowi wyjścia, czyli liczbie, którą program zwraca na koniec, więc zepsuta konfiguracja testów mogła przejść jako pominięta. Sześć wydań później werdykt pochodzi tylko z kodu wyjścia.",
    },
  ],
  install: [
    {
      id: "step-0",
      term: "Skopiuj repozytorium",
      body: "git clone pobiera publiczne repozytorium na twój komputer. Potrzebne są Node 20 albo nowszy, git i Claude Code; na tym kroku nic się jeszcze nie instaluje.",
    },
    {
      id: "step-1",
      term: "Próba na sucho",
      body: "Instalator wypisuje, co by skopiował, scalił i dodał, i niczego nie zmienia. Najpierw czytasz plan, jak kosztorys przed rozpoczęciem pracy.",
    },
    {
      id: "step-2",
      term: "Instalacja",
      body: "Pliki trafiają do ~/.claude, folderu, z którego Claude Code czyta ustawienia. Plik, który zmieniłeś, nigdy nie jest nadpisywany: nowa wersja ląduje obok twojej, ustawienia są scalane, a reguły stoją między znacznikami, więc aktualizacja wymienia tylko ten blok.",
    },
    {
      id: "step-3",
      term: "Autotest",
      body: "Instalator kończy się uruchomieniem testów samego systemu na twoim komputerze. Zielony wynik jest dowodem, że kontrole tam działają, a nie zapewnieniem instalatora, że wszystko poszło dobrze.",
    },
    {
      id: "back",
      term: "Deinstalator",
      body: "W tym samym repozytorium jest deinstalator, więc wypróbowanie systemu do niczego nie zobowiązuje. Publiczne 1.8.0 ma 409 plików, oczyszczonych z prywatnych danych.",
    },
  ],
};
