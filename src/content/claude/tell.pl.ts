import type { Part, Section } from "../../components/claude/types";

// Ostatnia część /claude: ten sam system opowiedziany w trzech długościach i pytania, które ludzie o niego zadają.
// Tylko fakty, które artykuł wyżej już podaje: każda liczba zapisana cyframi stoi też w artykule (sprawdza to
// src/content/claude/content.test.ts), więc zmiana faktu oznacza zmianę w dwóch miejscach.

export const tellPartPl: Part = {
  title: "W skrócie i pytania",
  blurb:
    "Cały system w 30 sekund, 3 minuty albo 15, i odpowiedzi na to, o co pytają klienci, rekruterzy i programiści.",
};

export const tellSectionsPl: Section[] = [
  {
    id: "in-30-seconds",
    part: 6,
    title: "W 30 sekund",
    paragraphs: [
      "Piszę oprogramowanie z agentami AI, a każdy, kto to robi, zna haczyk: AI potrafi się pomylić i mimo to napisać, że skończyło. Dlatego zbudowałem Higher Mind, system jakości, który leży pod każdym projektem. Kontrole uruchamiają się same na każdym kroku, od polecenia do produkcji. Przy ryzykownych zmianach osobni recenzenci AI sprawdzają każdy jedną specjalność, od czystej karty. Wszystko, czego nie da się cofnąć, jak płatności, logowanie czy klucze, czeka na mnie. Każda kontrola wzięła się z prawdziwej wpadki w moich projektach: na razie 170. Kod jest otwarty, a system mówi wprost, gdzie się kończy.",
    ],
  },
  {
    id: "in-3-minutes",
    part: 6,
    title: "W 3 minuty",
    paragraphs: [
      "Najpierw problem. Agenci AI piszą kod szybko, ale zawyżają sukces: w jednym badaniu 75,8% zgłoszonych przez nich sukcesów nie miało dowodu. Kiedy zrobiłem audyt własnych projektów, każda reguła zapisana tylko tekstem była łamana na dużą skalę: 6 z 7 repozytoriów nie miało zapisów decyzji architektonicznych, dziennik zmian był 105 commitów w tyle, a 79% commitów szło prosto na gałąź główną.",
      "Przestałem więc pisać reguły i zamieniłem je w mechanizmy. Całość niosą trzy idee. Kontrole zamiast spisanych reguł: wszystko, co ważne, uruchamia się samo, gdy coś się dzieje; taką kontrolę nazywam bramką. Każda wpadka staje się kontrolą: 170 prawdziwych wpadek jest zapisanych jako blizny, czyli wpadki spisane razem z przyczyną, a każda bramka wskazuje tę, z której się wzięła. Dowód zamiast deklaracji: „gotowe” znaczy, że komenda się wykonała i jej wynik sprawdzono, a każdy raport kończy się słowem VERIFIED, UNVERIFIED albo FAILED.",
      "W praktyce każda zmiana dostaje poziom ryzyka liczony z tego, co naprawdę się zmieniło, nigdy z tego, jak brzmiała prośba. Dokumentacja jest nisko, płatności i logowanie wysoko, a im wyższy poziom, tym więcej sprawdzania. Ryzykowną zmianę czyta kilku recenzentów AI, niezależnie, każdy pod swoim kątem: kod, bezpieczeństwo, dane, utrzymanie. Ich uwagi łączy skrypt, nie model, a osobny weryfikator próbuje je obalić. Zmiana wchodzi do głównego kodu beze mnie tylko z dowodem recenzji, a logowanie, płatności, zmiany struktury bazy danych i zależności dalej czekają na moją frazę.",
      "I uczciwie: system jest sprawdzony w skali jednego właściciela i kilkudziesięciu repozytoriów, nie dużej firmy. Recenzenci kosztują tokeny, przy najbardziej ryzykownych zmianach osiem do dziesięciu razy tyle co jedna recenzja, więc darmowe kontrole skryptów idą pierwsze. Potok wydań nie miał jeszcze próby na żywym projekcie, a zaplanowane rutyny są wyłączone, dopóki nie naprawię ich konfiguracji.",
    ],
  },
  {
    id: "in-15-minutes",
    part: 6,
    title: "W 15 minut: sześć kroków do opowiedzenia",
    lead: "Plan 15-minutowej opowieści, po kilka zdań na krok do rozwinięcia, w kolejności, w jakiej ją opowiadam: skąd się wzięło, czym jest, jedna zmiana od początku do końca, czego mnie nauczyło, gdzie się kończy i dokąd zmierza.",
    items: [
      {
        label: "Skąd się wzięło.",
        body: "W moich projektach kod piszą agenci AI, a ja odpowiadam za specyfikację, recenzję i wdrożenie. Audyt własnych repozytoriów pokazał, że reguły zapisane tekstem nie przetrwają prawdziwej pracy: 6 z 7 repozytoriów nie miało zapisów decyzji architektonicznych, przegląd kodu odbył się w 2,5% sesji, a 79% commitów szło prosto na gałąź główną. Agent może zapomnieć regułę, więc spisana reguła nie wystarcza.",
      },
      {
        label: "Czym jest.",
        body: "PG, skrót od Prompt-Guard, zaczęło się od reguł dopisywanych do każdego polecenia i urosło w cały system jakości. Nazwa Higher Mind pochodzi z mojego drugiego projektu, przewodnika po praktycznej duchowości: reguła, którą zamierzasz stosować, jest przekonaniem, a kontrola, która uruchamia się sama, jest praktyką. Ma 11 hooków, małych programów odpalanych w stałych momentach, bramki gita przy commicie i pushu, 9 recenzentów AI ze specjalnościami, 51 narzędzi bez tokenów AI i katalog 170 blizn. To publiczne repozytorium, które zainstalujesz w pięć minut.",
      },
      {
        label: "Jedna zmiana od początku do końca.",
        body: "Powiedzmy, że proszę o kody rabatowe w sklepie. Po każdej edycji pliku agent od razu dostaje z powrotem błędy stylu i typów. Każda komenda w terminalu przechodzi przez strażnika, który blokuje te groźne, jak przepisywanie historii czy kasowanie poza katalogami builda. Commit i push przechodzą przez własne bramki. Na końcu sesji ostatnia kontrola liczy poziom ryzyka: kody rabatowe dotykają płatności, więc wychodzi najwyższy, T3, a sesja nie zamknie się, dopóki recenzenci kodu, bezpieczeństwa, danych i utrzymania jej nie sprawdzą. Uwaga bez dowodu odpada, resztę łączy skrypt, a weryfikator próbuje je obalić. Taka zmiana scala się dopiero po mojej frazie.",
      },
      {
        label: "Czego mnie nauczyło.",
        body: "Kto pisał kod, człowiek czy model, nie widzi własnych błędów, więc recenzenci zaczynają od czystej karty. Kontrola bez własnego testu może być martwa: moja bramka push czytała dane wejściowe dwa razy i przez sześć dni nic nie robiła, więc teraz każdy hook gita ma test uruchamiający cały skrypt. A blokada, która zatrzymuje zwykłą pracę dużo częściej, niż łapie błąd, szkodzi. Dlatego wersja 1.8.0 postawiła jedną regułę ponad innymi: bez incydentu nie ma nowej blokady. Nowa kontrola najpierw tylko obserwuje i zapisuje.",
      },
      {
        label: "Gdzie się kończy.",
        body: "Strażnik jest zbudowany przeciw pomyłkom i przeciw poleceniom przemyconym z zewnątrz, nie przeciw agentowi, który uparł się go obejść; to zadanie piaskownicy systemu operacyjnego. Scalanie bez mojej frazy opiera się na recenzji jednego modelu, czyli dowodzie probabilistycznym. 14 października uznałem PG za na razie kompletne: przepisanie parsera strażnika przeszło dziewięć rund recenzji, które wciąż znajdowały przypadki niespotykane w prawdziwej pracy. Wysiłek rósł, ochrona nie.",
      },
      {
        label: "Dokąd zmierza.",
        body: "Proporcja. Rutyny patrzą tylko na repozytoria z prawdziwą pracą w ostatnich 30 dniach: dziś 12 z 47. Zmiany w PG trafiają do nowych repozytoriów przez szablon, a stare repozytoria projektów zostają nietknięte, chyba że poproszę. Samo PG zmienia się teraz tylko po incydencie, który się prześlizgnął, gdy aktualizacja narzędzia albo modelu zepsuje hook, albo gdy poproszę.",
      },
    ],
  },
  {
    id: "faq-clients",
    part: 6,
    title: "Pytania klientów",
    faq: [
      {
        label: "Dlaczego miałoby mnie obchodzić, jak sprawdzany jest kod?",
        body: "Bo coraz więcej kodu pisze AI, a AI potrafi się pomylić i mimo to napisać, że skończyło. Z tym systemem zmiana trafia do twojego produktu dopiero po automatycznych kontrolach, przy ryzykownych zmianach dopiero po niezależnych recenzentach, a to, czego nie da się cofnąć, czeka na człowieka. Widać też, co sprawdzono: każdy raport kończy się słowem statusu i dowodem.",
      },
      {
        label: "Czy to znaczy, że moja aplikacja nie będzie miała błędów?",
        body: "Nie, i nikt nie powinien tego obiecywać. PG obniża ryzyko i łapie rodzaje wpadek, które już raz się zdarzyły. Recenzje też się mylą, a scalanie bez mojej frazy opiera się na dowodzie probabilistycznym. Granice są spisane jawnie, w ostatniej sekcji części powyżej.",
      },
      {
        label: "A jeśli AI skasuje mi bazę danych?",
        body: "Każda komenda, która rozmawia z bazą, jest śledzona do miejsca, w które celuje. Komenda, która skasowałaby albo wyczyściła dane, jest blokowana, chyba że baza jest na pewno na mojej maszynie, a komenda, której strażnik nie umie przeczytać, liczy się jako groźna. Wymazywanie historii projektu i masowe kasowanie też są zablokowane. To zatrzymuje pomyłki i przemycone polecenia; nie jest obroną przed zdeterminowanym atakującym.",
      },
      {
        label: "Czy całe to sprawdzanie spowolni moje zmiany?",
        body: "Sprawdzanie jest proporcjonalne do ryzyka. Teksty, style i dokumentacja przechodzą tylko kontrole skryptów; płatności, logowanie i dane dostają pełną recenzję. W wersji 1.8.0 usunąłem blokady, które zatrzymywały zwykłą pracę częściej, niż łapały błędy: na przykład zmiana może mieć teraz do 1500 linii kodu, zanim trzeba ją podzielić.",
      },
      {
        label: "Kto ma ostatnie słowo przy ryzykownych zmianach?",
        body: "Ja. Logowanie, płatności, zmiany struktury bazy, zewnętrzne biblioteki, ustawienia automatycznych testów i instrukcje samych agentów nigdy nie trafiają na produkcję same; czekają, aż wpiszę frazę na czacie. Te same słowa powtórzone w odpowiedzi agenta niczego nie odblokowują, a każde użycie trafia do dziennika.",
      },
      {
        label: "Gdzie są hasła i klucze?",
        body: "W sejfie na moim własnym sprzęcie: 157 kluczy, tokenów i loginów. Pośrednik podaje wartość prosto do procesu, który jej potrzebuje, więc nigdy nie pojawia się na czacie, w kodzie ani w logach. Sekret wpisany w komendę jest blokowany, a automatyczne skany trzymają sekrety z dala od kodu.",
      },
      {
        label: "Czy ktoś inny przejmie mój projekt?",
        body: "To jest cel projektowy. Każda decyzja o stylu odpowiada na jedno pytanie: czy doświadczony inżynier, który nigdy nie widział repozytorium, uruchomi je w 15 minut i w kolejne 15 znajdzie miejsce do zmiany? Nowe repozytoria startują z szablonu z automatycznymi testami, a decyzje architektoniczne są zapisane razem z dowodami.",
      },
      {
        label: "Czy to sprawdzanie dużo kosztuje?",
        body: "Kosztuje użycie AI, więc wydaję je celowo. Najpierw idą zwykłe kontrole skryptów, które nie używają AI. Recenzenci AI pracują tylko tam, gdzie jest ryzyko: około czterech razy tyle co jedna recenzja przy wspólnym kawałku kodu, osiem do dziesięciu przy najbardziej ryzykownych zmianach, jak płatności. Zmiany tekstów i dokumentacji nie dostają ich wcale.",
      },
    ],
  },
  {
    id: "faq-recruiters",
    part: 6,
    title: "Pytania rekruterów",
    faq: [
      {
        label: "Co zbudowałeś sam, a co zrobiło AI?",
        body: "Kod piszą agenci AI. Moja część to specyfikacja, recenzja i wdrożenie: zdefiniowałem problem na podstawie audytu, podjąłem decyzje architektoniczne, ustawiłem granice i zgody, i to ja decyduję, co jest na tyle ryzykowne, żeby czekać na mnie. Nie twierdzę, że napisałem ten kod ręcznie.",
      },
      {
        label: "Jaka była największa wpadka?",
        body: "Kontrola, która nigdy się nie uruchomiła. Bramka push czytała dane wejściowe dwa razy, więc przez sześć dni nic nie widziała i niczego nie chroniła, a nic tego nie zauważyło, bo nic nie testowało samej bramki. Teraz każdy hook gita ma test, który uruchamia cały skrypt na prawdziwych danych, więc bramka, która przestaje blokować, czerwieni test.",
      },
      {
        label: "Czego się nauczyłeś, budując to?",
        body: "Reguły zapisane tekstem nie działają; działają mechanizmy odpalane zdarzeniem. Kto pisał kod, człowiek czy model, nie widzi własnych błędów, więc recenzenci zaczynają od czystej karty. I proporcja się liczy: od wersji 1.8.0 nie ma nowej blokady bez incydentu za nią.",
      },
      {
        label: "Skąd wiesz, że to działa?",
        body: "Każda bramka ma test dowodzący, że blokuje, a cały zestaw testów ma 606 sprawdzeń. Testy mutacyjne podkładają małe błędy, żeby dowieść, że testy je łapią. Zanim nowa reguła strażnika mogła cokolwiek zablokować, przeszła przez 40 824 prawdziwe komendy.",
      },
      {
        label: "Co zrobiłbyś inaczej?",
        body: "Mierzyłbym, zanim zacznę blokować. Przez tygodnie każde ryzyko, które zauważyłem, dostawało nową bramkę, aż dziennik bramek pokazał, że niektóre zatrzymywały zwykłą pracę dużo częściej, niż łapały błąd. Od 1.8.0 nowa kontrola zaczyna od samego obserwowania.",
      },
      {
        label: "Skąd nazwa Higher Mind?",
        body: "Z mojego drugiego długiego projektu, darmowego przewodnika po praktycznej duchowości, którego zasadą jest praktyka ponad przekonaniem. Reguła, którą zamierzasz stosować, jest przekonaniem; kontrola, która uruchamia się sama, jest praktyką. PG to taki wyższy umysł nad każdą sesją kodowania.",
      },
      {
        label: "Czy inni mogą tego używać?",
        body: "Tak. Cały system to publiczne repozytorium oczyszczone z prywatnych danych, które zainstalujesz w pięć minut z Node 20+, gitem i Claude Code. Instalator nigdy nie nadpisuje zmienionego przez ciebie pliku i kończy się samotestem, a zielony wynik jest dowodem.",
      },
      {
        label: "Jak szybko to się zmienia?",
        body: "Piętnaście publicznych wersji w 33 dni, każda odpowiadała na coś prawdziwego: audyt, porównanie z 35 projektami open source, wpadkę albo tarcie w mojej własnej pracy. Od 14 października system jest w trybie utrzymania: zmienia się po incydencie, zepsutym hooku albo na moją prośbę, nie dla samej zmiany.",
      },
    ],
  },
  {
    id: "faq-developers",
    part: 6,
    title: "Pytania programistów",
    faq: [
      {
        label: "Czy to nie jest przesada?",
        body: "Jest ciężkie i sprawdzone w skali jednego właściciela, nie dużej firmy. Ale samo się rozlicza: od 1.8.0 nie ma nowej blokady bez incydentu, nowa kontrola zaczyna od obserwowania, a limity, które przeszkadzały, podniosłem, jak rozmiar zmiany, dziś 1500 linii kodu. 14 października przestałem dodawać mechanizmy, bo kolejne zaczęły kosztować więcej, niż chroniły.",
      },
      {
        label: "Czym to się różni od CI i linterów?",
        body: "CI to jedna z warstw. PG pilnuje też agenta w trakcie pracy: przy poleceniu, po każdej edycji, przy każdej komendzie w terminalu i na końcu sesji, a potem przy commicie i pushu. Do tego recenzenci z czystą kartą, katalog blizn, w którym każda bramka wskazuje prawdziwą wpadkę, i dowód zamiast deklaracji.",
      },
      {
        label: "A jeśli recenzent AI się pomyli albo da się oszukać?",
        body: "Recenzenci pracują niezależnie i tylko czytają; uwaga bez dowodu odpada; łączy je skrypt, nie model; a weryfikator próbuje obalić każdą. Słabe miejsce to recenzja w CI: to jeden model, dowód probabilistyczny, który spreparowany diff może próbować zagadać. Dlatego ryzykowne ścieżki zawsze czekają na moją frazę.",
      },
      {
        label: "Czy agent nie może po prostu obejść bramek?",
        body: "Drobne bramki jakości może przepuścić sam, a każde przepuszczenie trafia do dziennika. Kroki, których nie da się cofnąć, wymagają mojej frazy, wpisanej przeze mnie; te same słowa w odpowiedzi agenta niczego nie odblokowują. Warstwa kontrolna jest zaplombowana sumami kontrolnymi. Ale strażnik jest zbudowany przeciw pomyłkom i przemyconym poleceniom, nie przeciw zdeterminowanemu agentowi: uruchomienie dowolnego skryptu może zrobić wszystko, a to zadanie piaskownicy.",
      },
      {
        label: "Ile to kosztuje w tokenach?",
        body: "Około czterech razy tyle co jedna recenzja przy T2 i osiem do dziesięciu przy T3, z darmowymi kontrolami skryptów na początku, żeby żaden recenzent nie oglądał czerwonego lintu. Pełne reguły idą do polecenia raz na sesję, potem jednolinijkowe przypomnienie. Okno kontekstu zostaje na 400k, bo w moich transkryptach okno 1M zużywało około 2,3 razy więcej tygodniowego limitu.",
      },
      {
        label: "Dlaczego osobni recenzenci zamiast jednego dobrego modelu?",
        body: "Kto napisał kod, nie widzi własnych błędów, więc recenzenci dostają tylko zmianę i zadanie i nigdy nie widzą swoich uwag nawzajem: agenci, którzy dyskutują, dryfują do większości. Każdy dostaje własny wycinek diffu, bo recenzenci, którym dano diff na 9799 linii, czytali około 10–30% z niego.",
      },
      {
        label: "Jak testowane są same bramki?",
        body: "Każda bramka ma test, który dowodzi, że blokuje, a skrypt sprawdza, że każda spisana reguła ma bramkę. Testy mutacyjne dowodzą, że testy łapią podłożone błędy. Hooki, bramki gita i ustawienia są zaplombowane sumami kontrolnymi, a zmiana poza oknem, które otworzyłem, wychodzi na starcie następnej sesji.",
      },
      {
        label: "Czy to wytrzyma duży kod?",
        body: "W dużych systemach spójność rozjeżdża się przez niespisane założenia, więc są spisane tam, gdzie skrypt je przeczyta: każdy dokument architektury ma blok warstw i zakazanych importów, a bramka push blokuje nowy cykl importów. Plik, który importuje ponad 40 innych, jest oznaczany przed edycją. Stare cykle tylko ostrzegają.",
      },
      {
        label: "Dlaczego część jest po polsku?",
        body: "Reguły wstrzykiwane do polecenia mają pełną wersję angielską, a każdy komunikat blokady ma linię po angielsku z furtką. Doktryna i listy kontrolne recenzentów są nadal po polsku; model czyta je bez kłopotu, a README jest w obu językach.",
      },
    ],
  },
];
