import { type Lang } from "../i18n";

/**
 * Service pages under /uslugi — SEO landing pages, deliberately kept out of the
 * main navigation. The homepage sells a person to hire; these sell the work.
 * Keeping them unlinked from the header means a recruiter reading the site
 * front-to-back never lands in an agency pitch, while search still indexes them.
 *
 * Every proof line here maps to something that is actually running in
 * production. Nothing on these pages is a number I cannot point at.
 */

export type ServiceProblem = { tag: string; title: string; body: string };
export type ServicePoint = { title: string; body: string };
export type ServiceProof = { sector: string; title: string; metric: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  micro: string[];
  problemsEyebrow: string;
  problemsTitle: string;
  problemsLead: string;
  problems: ServiceProblem[];
  answerEyebrow: string;
  answerTitle: string;
  answerLead: string;
  points: ServicePoint[];
  proofsTitle: string;
  proofs: ServiceProof[];
  faqTitle: string;
  faq: ServiceFaq[];
};

const PL: Service[] = [
  {
    slug: "systemy-dla-firm",
    navLabel: "Systemy dla firm",
    metaTitle: "Systemy i aplikacje wewnętrzne dla firm — Kamil Jan",
    metaDescription:
      "Buduję systemy odwzorowujące realny proces firmy: etapy zamówienia, reguły cenowe, uprawnienia w bazie. Wdrożenia działające w produkcji, obsługiwane z telefonu.",
    eyebrow: "SYSTEMY DLA FIRM",
    h1: "System, który zna Twój proces lepiej niż arkusz",
    lead: "Buduję aplikacje odwzorowujące to, jak Twoja firma naprawdę pracuje — z etapami, regułami cenowymi i uprawnieniami, które dziś istnieją głównie w czyjejś głowie. Jedno miejsce zamiast pięciu. Stan widoczny bez dzwonienia po ludziach.",
    micro: ["Jedno źródło stanu", "Obsługa z telefonu", "Rośnie razem z firmą"],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć rzeczy, które psują się razem z firmą",
    problemsLead:
      "Żadna z nich nie boli przy dziesięciu zamówieniach miesięcznie. Wszystkie zaczynają boleć przy stu.",
    problems: [
      {
        tag: "Dane",
        title: "Stan zamówienia w trzech miejscach naraz",
        body: "Arkusz mówi jedno, wątek na czacie drugie, a osoba prowadząca trzecie. Kiedy klient dzwoni z pytaniem o status, ktoś musi obdzwonić trzy osoby, żeby odpowiedzieć.",
      },
      {
        tag: "Efektywność",
        title: "Ta sama liczba przepisywana cztery razy",
        body: "Z zapytania do arkusza, z arkusza do oferty, z oferty do faktury, z faktury do zestawienia. Każde przepisanie to szansa na literówkę, za którą ktoś zapłaci.",
      },
      {
        tag: "Procesy",
        title: "Zlecenie stoi w etapie, którego nikt nie pilnuje",
        body: "Nie ma sygnału, że coś utknęło. Dowiadujesz się od klienta, któremu skończyła się cierpliwość — albo nie dowiadujesz się wcale, bo klient po prostu odszedł.",
      },
      {
        tag: "Ryzyko",
        title: "Dwie osoby zmieniają to samo i obie mają rację",
        body: "Bez miejsca, które rozstrzyga, wygrywa ten, kto zapisał później. Czasem to nie jest wersja poprawna, a dowiadujesz się o tym przy fakturze.",
      },
      {
        tag: "Technologia",
        title: "Gotowe narzędzie każe zmienić sposób pracy",
        body: "Płacisz abonament za dopasowanie firmy do cudzego procesu. Wasz prawdziwy proces i tak żyje obok — w arkuszu, którego to narzędzie miało się pozbyć.",
      },
      {
        tag: "Zasoby",
        title: "Firma stoi na pamięci jednej osoby",
        body: "Wiedza o tym, jak to naprawdę działa, siedzi w głowie kogoś, kto kiedyś pojedzie na urlop. To nie jest ryzyko teoretyczne, tylko kwestia terminu.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Proces zapisany w bazie, nie w ustaleniach",
    answerLead:
      "Zaczynam od tego, co ludzie już robią. Dopiero potem decyduję, co z tego da się zapisać tak, żeby pilnowało się samo.",
    points: [
      {
        title: "Stan jako maszyna, nie jako pole tekstowe",
        body: "W platformie MAS Group zamówienie ma 13 nazwanych etapów i wyłącznie dozwolone przejścia między nimi. Nie da się przeskoczyć etapu ani wysłać tego samego SMS-a dwa razy, bo powiadomienie wychodzi z jednego konkretnego przejścia i znikąd indziej.",
      },
      {
        title: "Uprawnienia pilnowane przez bazę, nie przez ekran",
        body: "Kto co widzi, rozstrzygają polityki Postgresa. Ukryty przycisk da się obejść, politykę bazy — nie. Kosztowało mnie to jedną awarię na produkcji: dwie polityki odwołały się do siebie nawzajem i zapętliły zapytania. Naprawione funkcją SECURITY DEFINER, a wnioskiem jest zestaw testów per rola, który dziś pisałbym od pierwszego dnia.",
      },
      {
        title: "Zbudowane pod telefon w terenie",
        body: "Zespół handlowy MAS Group prowadzi cały proces z telefonu, między jednym klientem a drugim. System, który działa w takich warunkach, działa wszędzie.",
      },
      {
        title: "Jeden proces naraz, nie plan na pół roku",
        body: "Wybieramy ten, który kosztuje najwięcej, i doprowadzam go do produkcji. Reszta czeka, aż pierwszy zacznie zwracać się w liczbach, które da się pokazać.",
      },
      {
        title: "Zostaję po uruchomieniu",
        body: "System bez zespołu, który go używa, to koszt, nie inwestycja. Szkolę ludzi i jestem wtedy, gdy pojawia się pierwszy przypadek, którego nikt nie przewidział.",
      },
    ],
    proofsTitle: "Działa w produkcji",
    proofs: [
      {
        sector: "Handel B2B",
        title: "Trzy branże, jeden proces od wyceny do dostawy",
        metric: "13 etapów, obsługa z telefonu przez zespół nietechniczny",
      },
      {
        sector: "Logistyka",
        title: "Wpłaty na kontener, który może się nie zapełnić",
        metric: "Ścieżka zwrotu jako jawna maszyna stanów w Postgresie",
      },
      {
        sector: "Doradztwo",
        title: "Pipeline dziewięciu etapów generujący umowy dotacyjne",
        metric: "Dokumenty DOCX i PDF gotowe do podpisu",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile to kosztuje?",
        a: "Zależy od liczby procesów, integracji i tego, czy system ma zastąpić jedno narzędzie czy pięć. Po rozmowie i obejrzeniu procesu dostajesz widełki dla swojego przypadku — bez zobowiązań i bez wysyłania oferty, zanim zrozumiem, o czym mówimy.",
      },
      {
        q: "Czym to się różni od gotowego SaaS-a?",
        a: "SaaS wymusza swój proces i liczy za użytkownika. System pisany pod firmę odwzorowuje proces, który już macie, i nie drożeje z każdą kolejną osobą w zespole. Cena wejścia jest wyższa, koszt utrzymania niższy, a granica możliwości leży dużo dalej.",
      },
      {
        q: "Ile trwa wdrożenie?",
        a: "Pierwszy działający kawałek — tygodnie, nie miesiące, bo zaczynam od jednego procesu. Pełny system rośnie etapami i każdy z nich trafia do produkcji osobno, więc korzyść pojawia się przed końcem prac.",
      },
      {
        q: "Co się stanie, jeśli przestaniemy współpracować?",
        a: "Kod i dane są Twoje, w Twoim repozytorium i Twojej bazie. Nie buduję niczego, co da się uruchomić wyłącznie u mnie — to byłoby zabezpieczenie mojego interesu Twoim kosztem.",
      },
    ],
  },

  {
    slug: "automatyzacja-procesow",
    navLabel: "Automatyzacja procesów",
    metaTitle: "Automatyzacja procesów i powtarzalnych zadań — Kamil Jan",
    metaDescription:
      "Automatyzuję powtarzalne zadania tam, gdzie zwracają się w mierzalnym czasie: obieg dokumentów, powiadomienia, przepisywanie danych między narzędziami.",
    eyebrow: "AUTOMATYZACJA PROCESÓW",
    h1: "Przestań płacić ludziom za przenoszenie danych",
    lead: "Automatyzuję powtarzalne zadania tam, gdzie zwracają się w czasie, który da się policzyć. Nie każdy proces warto automatyzować i mówię wprost, kiedy nie warto — także wtedy, gdy oznacza to mniejsze zlecenie.",
    micro: ["Zwrot policzony przed startem", "Wdrożenie etapami", "Zero ukrytych zależności"],
    problemsEyebrow: "CENA RĘCZNEJ ROBOTY",
    problemsTitle: "Sześć kosztów, których nie widać na fakturze",
    problemsLead: "Ręczna praca nie ma osobnej pozycji w księgach. Ma za to bardzo konkretną cenę.",
    problems: [
      {
        tag: "Dane",
        title: "Skalowanie oznacza zatrudnianie",
        body: "Dwa razy więcej zamówień wymaga dwa razy więcej rąk do tych samych czynności. Rośnie nie tylko koszt, ale i liczba miejsc, w których coś może wypaść.",
      },
      {
        tag: "Efektywność",
        title: "Proces czeka, aż ktoś kliknie",
        body: "Każdy ręczny krok to potencjalne opóźnienie. Zlecenie leży, bo osoba odpowiedzialna jest na urlopie, na spotkaniu albo po prostu nie zauważyła maila.",
      },
      {
        tag: "Procesy",
        title: "Ten sam proces, trzy różne wykonania",
        body: "Trzy osoby robią to samo na trzy sposoby. Efekt jest za każdym razem trochę inny, a przy reklamacji nikt nie wie, którą wersję zastosowano.",
      },
      {
        tag: "Ryzyko",
        title: "Monotonia produkuje błędy",
        body: "Przy setnym powtórzeniu tej samej czynności uwaga spada i to jest fizjologia, nie brak staranności. Kosztuje najczęściej w dokumentach i w kwotach.",
      },
      {
        tag: "Technologia",
        title: "Narzędzia nie rozmawiają, więc rozmawia człowiek",
        body: "CRM nie widzi magazynu, magazyn nie widzi księgowości. Spina to osoba, która ręcznie przenosi dane — i jest jedynym miejscem, gdzie te systemy się spotykają.",
      },
      {
        tag: "Zasoby",
        title: "Najdroższe godziny na najprostszych zadaniach",
        body: "Specjalista, który zna rynek i klientów, spędza pół dnia na kopiowaniu pozycji z maila do arkusza. Płacisz za wiedzę, dostajesz przepisywanie.",
      },
    ],
    answerEyebrow: "PODEJŚCIE",
    answerTitle: "Najpierw liczba, potem automat",
    answerLead:
      "Automatyzacja bez policzonego zwrotu to hobby za Twoje pieniądze. Zaczynam od arytmetyki.",
    points: [
      {
        title: "Liczymy, zanim cokolwiek powstanie",
        body: "Ile razy w miesiącu, ile minut za każdym razem, ile kosztuje godzina osoby, która to robi. Jeśli liczby nie domykają się w rozsądnym czasie, mówię o tym zamiast wystawiać ofertę.",
      },
      {
        title: "Automatyzacja odporna na nietypowy przypadek",
        body: "Prawdziwy proces ma wyjątki: zamówienie bez NIP-u, załącznik w formacie, którego nikt się nie spodziewał, klient, który odpowiada na trzytygodniowego maila. Automat, który przy takim wejściu cicho przestaje działać, jest gorszy niż ręczna robota, bo nikt nie zauważy.",
      },
      {
        title: "Widoczna awaria zamiast cichej",
        body: "Każda ścieżka błędu ma log z kontekstem, a człowiek dostaje sygnał. Automatyzacja, której nie da się zdiagnozować o trzeciej w nocy, jest niedokończona.",
      },
      {
        title: "Deterministycznie tam, gdzie się da",
        body: "Jeśli odpowiedź da się wyliczyć z reguły albo odczytać z tabeli, nie pytam modelu językowego. Szybciej, taniej i za każdym razem tak samo.",
      },
      {
        title: "Etapami, z korzyścią po każdym",
        body: "Nie wielki projekt na kwartał, tylko kolejne kawałki wchodzące do użytku jeden po drugim. Po każdym widać, co się zmieniło w liczbach.",
      },
    ],
    proofsTitle: "Przykłady z produkcji",
    proofs: [
      {
        sector: "Handel B2B",
        title: "Logistyka od zamówienia po odprawę bez ręcznego pilnowania",
        metric: "Powiadomienia wychodzą z przejść w maszynie stanów",
      },
      {
        sector: "Motoryzacja",
        title: "Wycena z historii czasów pracy warsztatu",
        metric: "Liczby z własnych danych, nie z oszacowania",
      },
      {
        sector: "Usługi cyfrowe",
        title: "Od zapytania do umowy PDF bez przepisywania",
        metric: "Dziesięć rynków, właściwy VAT w każdym",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile kosztuje automatyzacja jednego procesu?",
        a: "Rozpiętość jest duża, bo prosty obieg maila i integracja trzech systemów z regułami biznesowymi to zupełnie inna robota. Po obejrzeniu procesu dostajesz widełki i szacowany zwrot — jeśli ten drugi nie wygląda dobrze, powiem to wprost.",
      },
      {
        q: "Czy to się opłaca przy małym zespole?",
        a: "Czasem tak, czasem nie. Przy dwóch osobach i dziesięciu zamówieniach miesięcznie zwykle nie — i wtedy tak mówię. Opłaca się tam, gdzie czynność się powtarza, kosztuje uwagę i rośnie razem z firmą.",
      },
      {
        q: "Co jeśli proces się zmieni?",
        a: "Zmieni się na pewno. Buduję tak, żeby zmiana reguły była zmianą konfiguracji, a nie przepisywaniem od nowa — ale mówię też uczciwie, które zmiany będą kosztowne, zanim zaczniemy.",
      },
      {
        q: "Czym to się różni od gotowego narzędzia no-code?",
        a: "Gotowe narzędzia świetnie radzą sobie z prostym połączeniem A z B. Kończą się tam, gdzie zaczyna się realna logika biznesowa, obsługa wyjątków i odpowiedzialność za to, co się stanie przy nietypowym wejściu.",
      },
    ],
  },

  {
    slug: "ai-w-procesach",
    navLabel: "AI w procesach",
    metaTitle: "AI w firmie — wdrożenia oparte na Twoich danych — Kamil Jan",
    metaDescription:
      "Wdrażam AI tam, gdzie liczy z Twoich danych, a nie zgaduje. Odpowiedzi z własnych liczb firmy, deterministyczne tam, gdzie wystarczy tabela, sekrety poza zasięgiem modelu.",
    eyebrow: "SZTUCZNA INTELIGENCJA",
    h1: "Nie kolejny chatbot: AI, które liczy z Twoich danych",
    lead: "Model, który zgaduje, jest groźniejszy niż brak modelu, bo brzmi wiarygodnie. Buduję rozwiązania, w których AI pracuje na Twoich liczbach i Twoich regułach — a tam, gdzie odpowiedź musi być zawsze identyczna, w ogóle nie pyta modelu.",
    micro: ["Odpowiedzi z Twoich danych", "Koszt pod kontrolą", "Granice powiedziane wprost"],
    problemsEyebrow: "DLACZEGO PILOTAŻE UMIERAJĄ",
    problemsTitle: "Sześć powodów, dla których AI nie weszło do produkcji",
    problemsLead:
      "Prawie nigdy nie chodzi o model. Prawie zawsze o to, że nie wpięto go w proces, który ludzie faktycznie wykonują.",
    problems: [
      {
        tag: "Dane",
        title: "Masz je, ale model ich nie widzi",
        body: "Pytanie idzie do modelu, który nie zna Twoich cen, Twoich klientów ani tego, ile ta robota trwa u Ciebie. Odpowiedź brzmi sensownie i właśnie dlatego jest niebezpieczna.",
      },
      {
        tag: "Efektywność",
        title: "Demo zachwyciło, produkcja nie nastąpiła",
        body: "Test wypadł świetnie, zespół był na szkoleniu, pół roku później nikt tego nie używa. Demo nie musi znosić nietypowego przypadku, codzienna praca musi.",
      },
      {
        tag: "Procesy",
        title: "AI obok procesu zamiast w procesie",
        body: "Ktoś kopiuje dane do okna czatu i przepisuje odpowiedź z powrotem. To nie jest automatyzacja, tylko dodatkowy ręczny etap z lepszą nazwą.",
      },
      {
        tag: "Ryzyko",
        title: "Model, który zmyśli cenę, wyśle ją klientowi",
        body: "Przy wycenie, umowie albo rozliczeniu pomyłka nie jest usterką wyświetlania, tylko pieniędzmi i odpowiedzialnością. Potrzebna jest granica, za którą model nie sięga.",
      },
      {
        tag: "Technologia",
        title: "Rachunek za tokeny rośnie szybciej niż korzyść",
        body: "Każde pytanie idzie do modelu, także to, na które odpowiedź od lat leży w tabeli. Płacisz za wyszukiwanie, które baza zrobiłaby szybciej i za darmo.",
      },
      {
        tag: "Zasoby",
        title: "Nikt nie wie, czy to naprawdę działa",
        body: "Brakuje sposobu sprawdzenia, jak często odpowiedź była trafna. Bez tego „mamy AI” jest deklaracją, a nie wynikiem.",
      },
    ],
    answerEyebrow: "PODEJŚCIE",
    answerTitle: "AI wbudowane w proces, nie doklejone obok",
    answerLead:
      "Zaczynam od pytania, na które firma musi umieć odpowiedzieć. Potem sprawdzam, czy do tego w ogóle potrzebny jest model.",
    points: [
      {
        title: "Odpowiedź z Twoich danych, nie z internetu",
        body: "W systemie warsztatowym wycena bierze się z historii czasów pracy tego konkretnego warsztatu. Model nie zgaduje, ile trwa wymiana — czyta, ile trwała u Ciebie.",
      },
      {
        title: "Gdzie wystarczy tabela, nie ma modelu",
        body: "Wyszukiwarka 12 857 kodów diagnostycznych odpowiada z bazy: natychmiast, zawsze tak samo i za zero tokenów. Model jest drogi i zmienny, więc trafia tylko tam, gdzie naprawdę wnosi wartość.",
      },
      {
        title: "Zamknięty świat faktów",
        body: "Asystent na tej stronie nie potrafi wymyślić kwalifikacji, których nie mam, bo sięga wyłącznie po fakty zapisane wcześniej. Ta sama zasada chroni Twoje ceny i warunki przed kreatywnością modelu.",
      },
      {
        title: "Sekrety, których model nigdy nie widzi",
        body: "Klucze i tokeny leżą w vaulcie na własnym sprzęcie i trafiają prosto do procesu docelowego. Nie pojawiają się w czacie, w kodzie ani w logach, a skan przy każdym commicie pilnuje, żeby tak zostało.",
      },
      {
        title: "Granice powiedziane, zanim zapytasz",
        body: "Korzystam z modeli przez API — nie trenuję ich ani nie dostrajam. Formalnego zestawu testów jakości modelu jeszcze nie mam i mówię to od razu, bo dowiedzenie się o tym później kosztowałoby Cię więcej.",
      },
    ],
    proofsTitle: "Działa w produkcji",
    proofs: [
      {
        sector: "Motoryzacja",
        title: "Wycena liczona z historii warsztatu, nie z oszacowania modelu",
        metric: "12 857 kodów diagnostycznych z tabeli, zero tokenów",
      },
      {
        sector: "Portfolio",
        title: "Asystent odpowiadający wyłącznie z zapisanych faktów",
        metric: "Nie potrafi wymyślić kwalifikacji, których nie ma",
      },
      {
        sector: "Własna infrastruktura",
        title: "Agenty na harmonogramie z audytem samego systemu",
        metric: "Skan zależności bez udziału modelu, gdy nie ma znalezisk",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile kosztuje wdrożenie AI w procesie?",
        a: "Samo wpięcie modelu w istniejący proces jest zwykle najtańszą częścią. Koszt robi to, co wokół: dostęp do danych, obsługa wyjątków i sprawdzenie, czy odpowiedzi są trafne. Widełki dostajesz po obejrzeniu konkretnego procesu.",
      },
      {
        q: "Czym to się różni od ChatGPT w przeglądarce?",
        a: "ChatGPT nie zna Twoich cen, historii zleceń ani reguł. Wdrożenie w procesie oznacza, że model pracuje na Twoich danych, ma zapisane granice i nie jest pytany tam, gdzie odpowiedź wynika z tabeli.",
      },
      {
        q: "Czy AI oznacza zwolnienia?",
        a: "W firmach, z którymi pracowałem, oznaczało przesunięcie ludzi z przepisywania danych na robotę, której nikt nie miał czasu robić. Jeśli celem jest redukcja etatów, powiem wprost, że to nie jest projekt, w którym będę pomocny.",
      },
      {
        q: "Jak sprawdzicie, czy to działa?",
        a: "Ustalamy przed startem, co znaczy trafna odpowiedź w Twoim procesie, i sprawdzamy to na realnych przypadkach. Nie mam jeszcze formalnego zestawu testów jakości modelu — to jest luka, o której mówię otwarcie.",
      },
    ],
  },

  {
    slug: "integracje",
    navLabel: "Integracje narzędzi",
    metaTitle: "Integracje systemów i przepływ danych między narzędziami — Kamil Jan",
    metaDescription:
      "Łączę systemy, które nie rozmawiają ze sobą: CRM, ERP, magazyn, księgowość, płatności. Dane płyną bez ręcznego przepisywania, a awarie są widoczne.",
    eyebrow: "INTEGRACJE",
    h1: "Twoje narzędzia spina dziś człowiek. Niech spina je kod",
    lead: "Łączę systemy, które każdy z osobna działa dobrze, a razem wymagają osoby przenoszącej dane. Integracja to nie tylko połączenie — to też decyzja, co się dzieje, gdy druga strona przestaje odpowiadać.",
    micro: ["Dane płyną same", "Awarie widoczne", "Odporne na aktualizacje"],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć objawów systemów, które się nie znają",
    problemsLead:
      "Każdy z tych objawów kosztuje kilka minut. Kilka minut razy kilkaset zdarzeń to etat.",
    problems: [
      {
        tag: "Dane",
        title: "Każdy system ma własną wersję prawdy",
        body: "Klient ma inny adres w CRM, inny w księgowości i jeszcze inny na liście wysyłkowej. Który jest aktualny, wie tylko osoba, która wprowadzała ostatnią zmianę.",
      },
      {
        tag: "Efektywność",
        title: "Kopiuj-wklej jako etat",
        body: "Godziny na przenoszenie tych samych pozycji między aplikacjami. To zajęcie, które nie wymaga niczyich kompetencji, a zajmuje czas kogoś, kto je ma.",
      },
      {
        tag: "Procesy",
        title: "Proces zatrzymuje się między narzędziami",
        body: "W jednym systemie zamówienie jest opłacone, w drugim wciąż czeka. Ruszy dopiero, gdy ktoś zauważy i przeklika ręcznie.",
      },
      {
        tag: "Ryzyko",
        title: "Decyzje na danych sprzed tygodnia",
        body: "Synchronizacja odbywa się wtedy, gdy ktoś ją zrobi. Do tego czasu raporty pokazują stan, który już nie istnieje.",
      },
      {
        tag: "Technologia",
        title: "Integracja padła i nikt nie wie od kiedy",
        body: "Połączenie działało, dostawca zmienił API, transfer przestał chodzić po cichu. Wyjdzie przy zamknięciu miesiąca, gdy brakuje danych.",
      },
      {
        tag: "Zasoby",
        title: "Ktoś w firmie jest żywym interfejsem",
        body: "Jedna osoba zna wszystkie przejścia między systemami i wie, co trzeba kliknąć, żeby dane doszły. Bez niej proces staje.",
      },
    ],
    answerEyebrow: "PODEJŚCIE",
    answerTitle: "Połączenie to najłatwiejsza część",
    answerLead:
      "Trudne jest to, co się dzieje, gdy druga strona zwróci błąd, zmieni format albo zamilknie na godzinę.",
    points: [
      {
        title: "Awaria widoczna od razu, nie na koniec miesiąca",
        body: "Każda ścieżka błędu ma log z kontekstem: co, dla kogo i dlaczego się nie udało. Integracja, która pada po cichu, jest gorsza od jej braku, bo dajesz jej zaufanie, na które nie zasłużyła.",
      },
      {
        title: "Ponowienia i zabezpieczenie przed duplikatem",
        body: "Sieć bywa zawodna i to jest normalne. Nienormalne jest wystawienie klientowi dwóch faktur, bo ponowienie poszło dwa razy. Operacje muszą znosić powtórzenie.",
      },
      {
        title: "Jedno miejsce, które rozstrzyga",
        body: "Przy każdym polu ustalamy, który system jest źródłem. Bez tego synchronizacja dwukierunkowa zamienia się w wojnę na nadpisywanie.",
      },
      {
        title: "Odporność na zmiany po drugiej stronie",
        body: "Dostawcy zmieniają API i nie pytają o zgodę. Zmiana formatu ma zatrzymać transfer z czytelnym komunikatem, a nie zapisać śmieci do bazy.",
      },
      {
        title: "Poświadczenia poza kodem",
        body: "Klucze do integracji siedzą w vaulcie i trafiają do procesu jako zmienne środowiskowe. Skan przy commicie blokuje przypadkowe wrzucenie klucza do repozytorium.",
      },
    ],
    proofsTitle: "Działa w produkcji",
    proofs: [
      {
        sector: "Handel B2B",
        title: "Zamówienie, powiadomienia SMS i odprawa w jednym przepływie",
        metric: "Zdarzenia wychodzą z przejść, nie z ręcznego kliknięcia",
      },
      {
        sector: "Logistyka",
        title: "Płatności i zwroty spięte ze stanem kampanii kontenerowej",
        metric: "Stan rozstrzyga baza, nie zadanie cykliczne",
      },
      {
        sector: "Usługi cyfrowe",
        title: "Wycena, umowa i podpis w jednej ścieżce",
        metric: "Dziesięć rynków, reguły VAT per kraj",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Z jakimi systemami potrafisz się połączyć?",
        a: "Z każdym, który udostępnia API albo eksport danych — CRM-y, systemy księgowe i magazynowe, bramki płatnicze, poczta, kalendarze, narzędzia do podpisu elektronicznego. Przy systemach zamkniętych sprawdzam wykonalność przed wyceną, zamiast obiecywać w ciemno.",
      },
      {
        q: "Co jeśli dostawca zmieni API?",
        a: "Prędzej czy później zmieni. Integracja ma wtedy zatrzymać się głośno, z komunikatem wskazującym, co się zmieniło. Cichy transfer zapisujący niepoprawne dane jest scenariuszem, przed którym się zabezpiecza w pierwszej kolejności.",
      },
      {
        q: "Ile trwa integracja?",
        a: "Proste połączenie dwóch systemów z jasnym API to kwestia dni. Czas zjadają wyjątki, mapowanie pól i ustalenie, co jest źródłem prawdy — czyli dokładnie ta część, którą pominięcie mści się później.",
      },
      {
        q: "Czy integracja to lepszy pomysł niż wymiana systemu?",
        a: "Zwykle tak, jeśli obecne narzędzia robią swoją robotę i problem leży wyłącznie w przepływie danych. Wymiana systemu to koszt, migracja i szkolenie zespołu od nowa — sensowne dopiero, gdy narzędzie realnie blokuje rozwój.",
      },
    ],
  },

  {
    slug: "doradztwo-ai",
    navLabel: "Doradztwo",
    metaTitle: "Doradztwo w automatyzacji i AI — od czego zacząć — Kamil Jan",
    metaDescription:
      "Wskazuję, gdzie automatyzacja i AI zwrócą się najszybciej, a gdzie nie warto ich wdrażać. Mapa procesów, priorytety i szacowany zwrot przed decyzją o budowie.",
    eyebrow: "DORADZTWO",
    h1: "Zanim wydasz na automatyzację, sprawdź, czy się zwróci",
    lead: "Wskazuję miejsca, w których automatyzacja i AI zwrócą się najszybciej — oraz te, w których nie warto ich ruszać. To druga lista bywa cenniejsza, bo oszczędza budżet, który już miał być wydany.",
    micro: ["Priorytety wg zwrotu", "Konkretny plan", "Bez zobowiązania do budowy"],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć powodów, dla których projekt stoi w miejscu",
    problemsLead:
      "Najczęściej nie brakuje chęci ani budżetu. Brakuje pierwszego kroku, o którym wiadomo, że jest właściwy.",
    problems: [
      {
        tag: "Strategia",
        title: "Wiadomo, że trzeba, nie wiadomo od czego",
        body: "Temat wraca na każdym spotkaniu zarządu i za każdym razem kończy się tym samym: warto się tym zająć. Bez pierwszego kroku nic się nie zmienia.",
      },
      {
        tag: "Efektywność",
        title: "Nie ma jak zmierzyć, czy się opłaciło",
        body: "Po wdrożeniu wszyscy mówią, że jest lepiej, ale nikt nie potrafi pokazać liczby. Przy kolejnej decyzji budżetowej to się mści.",
      },
      {
        tag: "Procesy",
        title: "Dziesięć kandydatów, zero priorytetów",
        body: "Wszystko wygląda na warte automatyzacji. Bez porównania kosztu do zwrotu wybór pada na proces najbardziej widoczny, a nie najbardziej kosztowny.",
      },
      {
        tag: "Ryzyko",
        title: "Obawa przed wydaniem pieniędzy w błoto",
        body: "Znasz kogoś, kto wdrożył system i wrócił do arkusza. Ryzyko jest realne i najczęściej wynika z wyboru złego procesu na start.",
      },
      {
        tag: "Technologia",
        title: "Każdy dostawca mówi, że jego narzędzie to załatwi",
        body: "Rynek jest pełen rozwiązań, które robią wszystko. Trudno odróżnić te, które sprawdzą się u Ciebie, od tych, które sprawdziły się w prezentacji.",
      },
      {
        tag: "Zespół",
        title: "Ludzie boją się, że automatyzują sobie stanowiska",
        body: "Bez rozmowy o tym wprost projekt dostaje cichy opór, którego nie widać w harmonogramie, za to widać w tym, że nikt nie używa gotowego narzędzia.",
      },
    ],
    answerEyebrow: "JAK TO WYGLĄDA",
    answerTitle: "Rozmowa, mapa, priorytety, decyzja",
    answerLead:
      "Efektem jest dokument, z którym możesz pójść do kogokolwiek — także do kogoś innego niż ja.",
    points: [
      {
        title: "Zaczynamy od procesu, nie od technologii",
        body: "Godzina rozmowy z osobami, które wykonują pracę, mówi więcej niż tydzień analizy narzędzi. Interesuje mnie, gdzie proces czeka, gubi dane albo wymaga trzech osób.",
      },
      {
        title: "Zwrot policzony, nie oszacowany hurtowo",
        body: "Ile razy w miesiącu, ile minut, ile kosztuje godzina. Prosta arytmetyka, która natychmiast pokazuje, które pomysły odpadają.",
      },
      {
        title: "Lista rzeczy, których nie warto robić",
        body: "Równie ważna jak lista rekomendacji. Procesy zbyt rzadkie, zbyt zmienne albo takie, gdzie człowiek jest po prostu tańszy — mówię o nich wprost.",
      },
      {
        title: "Rekomendacja wraz z tym, co może pójść źle",
        body: "Każda propozycja ma nazwane ryzyko i koszt wycofania się. Wdrożenie bez ścieżki odwrotu to nie jest plan, tylko zakład.",
      },
      {
        title: "Bez zobowiązania, że budujemy razem",
        body: "Dokument jest Twój i możesz go zrealizować z kimkolwiek. Doradztwo, którego jedynym celem jest sprzedaż własnego wdrożenia, nie jest doradztwem.",
      },
    ],
    proofsTitle: "Skąd to wiem",
    proofs: [
      {
        sector: "Własne firmy",
        title: "Sam prowadzę operacje, które automatyzuję",
        metric: "Handel B2B, warsztat, logistyka, agencja",
      },
      {
        sector: "Wdrożenia",
        title: "Systemy oddane zespołom, które prowadzą je beze mnie",
        metric: "Zespół terenowy MAS Group na co dzień bez mojego udziału",
      },
      {
        sector: "Warsztat",
        title: "Zbudowane dla branży, w której nie byłem specjalistą",
        metric: "Mechanik definiował, co znaczy poprawna odpowiedź",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile kosztuje doradztwo?",
        a: "Pierwsza rozmowa jest bezpłatna i często wystarcza, żeby wskazać dwa lub trzy oczywiste miejsca. Pełne mapowanie procesów z priorytetami i wyliczeniem zwrotu wyceniam po tej rozmowie, gdy wiem, jaka jest skala.",
      },
      {
        q: "Czy skończy się na strategii, czy pomożesz też wdrożyć?",
        a: "Mogę zrobić jedno i drugie, ale to są osobne decyzje. Dostajesz dokument, z którym możesz pójść do dowolnego wykonawcy — również dlatego, żeby rekomendacja nie była podejrzana o to, że sprzedaje moją własną robotę.",
      },
      {
        q: "Skąd wiesz, jak działa moja branża?",
        a: "Nie zakładam, że wiem. System warsztatowy zbudowałem, nie będąc mechanikiem — od tego, że pracujący mechanik definiował, co jest poprawną odpowiedzią. To samo podejście stosuję wszędzie: wiedzę branżową ma klient, ja mam metodę.",
      },
      {
        q: "Co dostaję na koniec?",
        a: "Mapę procesu z zaznaczonymi miejscami strat, listę rekomendacji uszeregowaną według zwrotu, listę rzeczy, których nie warto ruszać, oraz szacunki kosztu i czasu dla dwóch albo trzech pierwszych kroków.",
      },
    ],
  },

  {
    slug: "wdrozenie-i-szkolenie",
    navLabel: "Wdrożenie i szkolenie",
    metaTitle: "Wdrożenie systemu i szkolenie zespołu z AI — Kamil Jan",
    metaDescription:
      "Doprowadzam system do momentu, w którym zespół używa go bez mojego udziału. Szkolenia z AI i automatyzacji oparte na procesach, które ludzie faktycznie wykonują.",
    eyebrow: "WDROŻENIE I SZKOLENIE",
    h1: "System, którego zespół faktycznie zaczyna używać",
    lead: "Zbudowanie systemu to połowa roboty. Druga połowa to doprowadzenie do momentu, w którym ludzie używają go bez przypominania — i ta połowa decyduje, czy projekt był inwestycją czy kosztem.",
    micro: ["Nauka na waszym procesie", "Materiały zostają u Was", "Wsparcie po starcie"],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć powodów, dla których gotowy system leży odłogiem",
    problemsLead: "Najdroższy system to ten, który działa poprawnie i z którego nikt nie korzysta.",
    problems: [
      {
        tag: "Wiedza",
        title: "Szkolenie było, umiejętności nie ma",
        body: "Dwie godziny prezentacji i nagranie, do którego nikt nie wróci. Ludzie wiedzą, że narzędzie istnieje, ale nie wiedzą, co kliknąć we wtorek rano.",
      },
      {
        tag: "Efektywność",
        title: "Powrót do arkusza po dwóch tygodniach",
        body: "Przy pierwszej sytuacji nietypowej ktoś otwiera stary plik, bo tak jest szybciej. Po miesiącu firma pracuje w dwóch systemach naraz.",
      },
      {
        tag: "Procesy",
        title: "System nie pasuje do tego, jak ludzie pracują",
        body: "Zaprojektowany przy stole, z osobami, które procesu nie wykonują. Detale, które decydują o użyteczności, wychodzą dopiero w terenie.",
      },
      {
        tag: "Ryzyko",
        title: "Cichy opór zamiast otwartego sprzeciwu",
        body: "Nikt nie mówi, że nie chce. Po prostu wypełnianie danych schodzi na koniec dnia, a potem na jutro. Efektu nie widać w harmonogramie, widać w pustych rekordach.",
      },
      {
        tag: "Technologia",
        title: "Pytania po starcie nie mają adresata",
        body: "Wykonawca zamknął projekt i zniknął. Pierwszy nietypowy przypadek trafia w próżnię, a zaufanie do narzędzia spada z każdym takim dniem.",
      },
      {
        tag: "Zespół",
        title: "Ludzie boją się, że sami się zastępują",
        body: "Dopóki nikt nie powie wprost, po co to robimy i co się zmieni w ich pracy, wyobraźnia wypełni lukę najgorszą wersją.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Wdrożenie kończy się wtedy, gdy nie jestem potrzebny",
    answerLead:
      "Buduję po to, żeby oddać. To jest jedyny sposób, żeby system przetrwał odejście wykonawcy.",
    points: [
      {
        title: "Nauka na waszych danych, nie na przykładach",
        body: "Ludzie uczą się na własnych zleceniach i własnych klientach. Przykładowe dane produkują poczucie, że wszystko zrozumiałe, aż do pierwszego prawdziwego przypadku.",
      },
      {
        title: "Osobno dla tych, którzy klikają, osobno dla tych, którzy decydują",
        body: "Zespół potrzebuje wiedzieć, co robić w konkretnej sytuacji. Osoba zarządzająca potrzebuje wiedzieć, co system pokazuje i czego nie pokaże. To są dwie różne rozmowy.",
      },
      {
        title: "Rozmowa o obawach, zanim staną się oporem",
        body: "Pytanie „czy to mnie zastąpi” pada zawsze, tylko nie zawsze na głos. Lepiej odpowiedzieć na nie na początku niż tłumaczyć potem, dlaczego nikt nie wypełnia danych.",
      },
      {
        title: "Materiały, które zostają u Was",
        body: "Krótkie instrukcje dla realnych sytuacji, nie stustronicowy podręcznik. Coś, co nowa osoba przeczyta pierwszego dnia i będzie umiała zacząć.",
      },
      {
        title: "Jestem przy pierwszych nietypowych przypadkach",
        body: "Najwięcej uczy się w tygodniach po starcie, gdy pojawia się to, czego nikt nie przewidział. Zamykanie projektu w dniu uruchomienia to zostawianie klienta w najtrudniejszym momencie.",
      },
    ],
    proofsTitle: "Robione w praktyce",
    proofs: [
      {
        sector: "Handel B2B",
        title: "Zespół terenowy prowadzi cały proces bez mojego udziału",
        metric: "Osoby nietechniczne, praca z telefonu",
      },
      {
        sector: "Motoryzacja",
        title: "System oddany warsztatowi, w którym pracuje na co dzień",
        metric: "Definicję poprawnej odpowiedzi ustalał mechanik",
      },
      {
        sector: "Własna praktyka",
        title: "Ta sama metoda zastosowana do siebie",
        metric: "Codzienna praktyka czytania kodu prowadzona publicznie",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile trwa wdrożenie zespołu?",
        a: "Sama nauka obsługi to zwykle jedna lub dwie sesje. Realne wdrożenie liczy się w tygodniach po starcie, bo dopiero wtedy pojawiają się sytuacje, których nikt nie przewidział — i to one decydują, czy zespół zaufa narzędziu.",
      },
      {
        q: "Czy szkolicie też z narzędzi, których nie budowaliście?",
        a: "Tak, jeśli chodzi o pracę z AI i automatyzacją w codziennych zadaniach. Szkolenie z konkretnego systemu zewnętrznego ma sens tylko wtedy, gdy najpierw go poznam — inaczej byłoby czytaniem cudzej dokumentacji na głos.",
      },
      {
        q: "Co, jeśli zespół nie chce nowego systemu?",
        a: "To najczęstszy powód, dla którego wdrożenia się nie udają, i trzeba się nim zająć wprost. Zwykle za oporem stoi konkretna obawa: o pracę, o kontrolę albo o to, że nowe narzędzie doda roboty zamiast ją zdjąć. Każda z nich ma inną odpowiedź.",
      },
      {
        q: "Co zostaje po zakończeniu współpracy?",
        a: "Działający system, dokumentacja pisana pod realne sytuacje, przeszkolony zespół i dostęp do wszystkiego po Waszej stronie. Celem jest to, żebyście mnie nie potrzebowali — a nie żebyście dzwonili przy każdej zmianie.",
      },
    ],
  },
];

const EN: Service[] = [
  {
    slug: "systemy-dla-firm",
    navLabel: "Internal systems",
    metaTitle: "Internal business systems built around your process — Kamil Jan",
    metaDescription:
      "I build systems that mirror how a company actually works: order stages, pricing rules, permissions enforced in the database. Running in production, operated from phones.",
    eyebrow: "INTERNAL SYSTEMS",
    h1: "A system that knows your process better than the spreadsheet does",
    lead: "I build applications that mirror how your company actually works — the stages, the pricing rules and the permissions that today live mostly in someone's head. One place instead of five. Status you can see without phoning three people.",
    micro: ["One source of state", "Works from a phone", "Grows with the company"],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six things that break as the company grows",
    problemsLead: "None of these hurt at ten orders a month. All of them hurt at a hundred.",
    problems: [
      {
        tag: "Data",
        title: "Order status lives in three places at once",
        body: "The spreadsheet says one thing, the chat thread another, and the person running the job a third. When a customer calls, somebody has to ring three people to answer.",
      },
      {
        tag: "Efficiency",
        title: "The same number retyped four times",
        body: "Enquiry to spreadsheet, spreadsheet to quote, quote to invoice, invoice to the monthly report. Every retype is a chance at a typo somebody pays for.",
      },
      {
        tag: "Process",
        title: "A job sits in a stage nobody owns",
        body: "Nothing signals that it stalled. You find out from a customer who ran out of patience — or you don't find out, because they simply left.",
      },
      {
        tag: "Risk",
        title: "Two people change the same thing and both are right",
        body: "With nothing to settle it, whoever saved last wins. Sometimes that isn't the correct version, and you learn which at invoicing.",
      },
      {
        tag: "Tooling",
        title: "Off-the-shelf software makes you change how you work",
        body: "You pay a subscription to bend the company around someone else's process. The real process keeps running beside it, in the spreadsheet the tool was meant to replace.",
      },
      {
        tag: "People",
        title: "The company runs on one person's memory",
        body: "How it really works sits with somebody who will eventually take a holiday. That isn't a theoretical risk, it's a date in the calendar.",
      },
    ],
    answerEyebrow: "HOW I BUILD",
    answerTitle: "The process written into the database, not into an agreement",
    answerLead:
      "I start from what people already do. Only then do I decide what can be written down so that it enforces itself.",
    points: [
      {
        title: "State as a machine, not as a text field",
        body: "In the MAS Group platform an order has 13 named stages and only the transitions I declared legal. A stage can't be skipped and the same SMS can't fire twice, because the notification leaves from one specific transition and nowhere else.",
      },
      {
        title: "Permissions enforced by the database, not by the screen",
        body: "Who sees what is decided by Postgres policies. A hidden button can be bypassed; a database policy can't. This cost me one production outage: two policies referenced each other into infinite recursion. Fixed with a SECURITY DEFINER function, and the lesson is a per-role test suite I would now write from day one.",
      },
      {
        title: "Built for a phone in the field",
        body: "The MAS Group sales team runs the whole process from their phones, between customers. A system that survives that survives anywhere.",
      },
      {
        title: "One process at a time, not a six-month plan",
        body: "We pick the one that costs the most and I take it to production. The rest waits until the first one starts paying back in numbers you can point at.",
      },
      {
        title: "I stay after launch",
        body: "A system without a team using it is a cost, not an investment. I train the people and I'm there when the first case nobody predicted shows up.",
      },
    ],
    proofsTitle: "Running in production",
    proofs: [
      {
        sector: "B2B trade",
        title: "Three verticals, one quote-to-delivery process",
        metric: "13 stages, run from phones by a non-technical team",
      },
      {
        sector: "Logistics",
        title: "Deposits toward a container that might never fill",
        metric: "Refund path as an explicit state machine in Postgres",
      },
      {
        sector: "Consulting",
        title: "A nine-stage pipeline generating funding contracts",
        metric: "DOCX and PDF ready for signature",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does it cost?",
        a: "It depends on how many processes and integrations are involved, and whether the system replaces one tool or five. After a conversation and a look at the process you get a range for your case — not a proposal written before I understand what we're talking about.",
      },
      {
        q: "How is this different from off-the-shelf SaaS?",
        a: "SaaS imposes its process and charges per seat. A system built for the company mirrors the process you already have and doesn't get more expensive with every new hire. Higher entry cost, lower running cost, and the ceiling sits much further away.",
      },
      {
        q: "How long does it take?",
        a: "The first working piece takes weeks rather than months, because I start with a single process. The full system grows in stages and each one ships separately, so the benefit arrives before the work ends.",
      },
      {
        q: "What happens if we stop working together?",
        a: "The code and the data are yours, in your repository and your database. I don't build anything that only runs on my side — that would be protecting my position at your expense.",
      },
    ],
  },

  {
    slug: "automatyzacja-procesow",
    navLabel: "Process automation",
    metaTitle: "Process and task automation with a measured payback — Kamil Jan",
    metaDescription:
      "I automate repetitive work where it pays back in time you can measure: document flows, notifications, data moved between tools. Failures are visible, not silent.",
    eyebrow: "PROCESS AUTOMATION",
    h1: "Stop paying people to move data between windows",
    lead: "I automate repetitive work where it pays back in time you can actually count. Not every process is worth automating, and I say so plainly when it isn't — including when that means a smaller job for me.",
    micro: ["Payback counted first", "Shipped in stages", "No hidden coupling"],
    problemsEyebrow: "THE COST OF MANUAL WORK",
    problemsTitle: "Six costs that never appear on an invoice",
    problemsLead: "Manual work has no line in the accounts. It has a very specific price.",
    problems: [
      {
        tag: "Data",
        title: "Scaling means hiring",
        body: "Twice the orders needs twice the hands doing the same steps. What grows isn't only cost — it's the number of places something can fall through.",
      },
      {
        tag: "Efficiency",
        title: "The process waits for somebody to click",
        body: "Every manual step is a potential delay. A job sits because the person is on leave, in a meeting, or simply didn't notice the email.",
      },
      {
        tag: "Process",
        title: "One process, three different executions",
        body: "Three people do the same thing three ways. The result differs slightly each time, and when a complaint arrives nobody knows which version was applied.",
      },
      {
        tag: "Risk",
        title: "Monotony produces errors",
        body: "At the hundredth repetition attention drops. That's physiology, not carelessness — and it usually costs in documents and in amounts.",
      },
      {
        tag: "Tooling",
        title: "The tools don't talk, so a person does",
        body: "The CRM can't see the warehouse and the warehouse can't see accounting. A human bridges them, and is the only place those systems actually meet.",
      },
      {
        tag: "People",
        title: "The most expensive hours on the simplest work",
        body: "A specialist who knows the market spends half a day copying line items from an email into a spreadsheet. You pay for judgement and receive transcription.",
      },
    ],
    answerEyebrow: "APPROACH",
    answerTitle: "The arithmetic comes before the automation",
    answerLead:
      "Automation without a calculated payback is a hobby funded by your budget. I start with the numbers.",
    points: [
      {
        title: "We count before anything gets built",
        body: "How many times a month, how many minutes each time, what an hour of that person costs. If the numbers don't close in a reasonable time, I say so instead of writing a proposal.",
      },
      {
        title: "Automation that survives the unusual case",
        body: "Real processes have exceptions: an order without a tax number, an attachment in a format nobody expected, a customer replying to a three-week-old email. An automation that quietly stops on those is worse than manual work, because nobody notices.",
      },
      {
        title: "Loud failure instead of silent failure",
        body: "Every error path logs with context and a human gets a signal. An automation you can't debug at three in the morning isn't finished.",
      },
      {
        title: "Deterministic wherever possible",
        body: "If the answer follows from a rule or sits in a table, I don't ask a language model. Faster, cheaper, and identical every time.",
      },
      {
        title: "In stages, with a benefit after each one",
        body: "Not a quarter-long project, but pieces going into use one after another. After each one you can see what changed in the numbers.",
      },
    ],
    proofsTitle: "Examples from production",
    proofs: [
      {
        sector: "B2B trade",
        title: "Logistics from order to customs without manual chasing",
        metric: "Notifications fire from state transitions",
      },
      {
        sector: "Automotive",
        title: "Quotes computed from the shop's own labour history",
        metric: "Numbers from your data, not from an estimate",
      },
      {
        sector: "Digital services",
        title: "From enquiry to contract PDF with no retyping",
        metric: "Ten markets, the right VAT in each",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does automating one process cost?",
        a: "The range is wide, because a simple email flow and an integration of three systems with business rules are different jobs. After looking at the process you get a range and an estimated payback — and if the second one looks weak, I'll tell you.",
      },
      {
        q: "Is it worth it for a small team?",
        a: "Sometimes yes, sometimes no. At two people and ten orders a month, usually not — and that's what I'll say. It pays where the task repeats, costs attention, and grows with the company.",
      },
      {
        q: "What if the process changes?",
        a: "It will. I build so that changing a rule is a configuration change rather than a rewrite — while being honest up front about which changes will be expensive.",
      },
      {
        q: "How is this different from off-the-shelf no-code tools?",
        a: "No-code handles connecting A to B very well. It runs out where real business logic starts, along with exception handling and responsibility for what happens on unusual input.",
      },
    ],
  },

  {
    slug: "ai-w-procesach",
    navLabel: "AI in your process",
    metaTitle: "AI in business — grounded in your own data — Kamil Jan",
    metaDescription:
      "I deploy AI where it computes from your data instead of guessing. Answers grounded in your numbers, deterministic where a table suffices, secrets the model never sees.",
    eyebrow: "ARTIFICIAL INTELLIGENCE",
    h1: "Not another chatbot: AI that computes from your data",
    lead: "A model that guesses is more dangerous than no model, because it sounds credible. I build systems where AI works from your numbers and your rules — and where the answer must be identical every time, it doesn't ask a model at all.",
    micro: ["Grounded in your data", "Cost under control", "Limits stated up front"],
    problemsEyebrow: "WHY PILOTS DIE",
    problemsTitle: "Six reasons AI never reached production",
    problemsLead:
      "It's almost never the model. It's almost always that nobody wired it into the work people actually do.",
    problems: [
      {
        tag: "Data",
        title: "You have it, the model can't see it",
        body: "The question goes to a model that doesn't know your prices, your customers, or how long that job takes at your place. The answer sounds sensible, which is exactly what makes it dangerous.",
      },
      {
        tag: "Efficiency",
        title: "The demo impressed, production never happened",
        body: "The test went well, the team had a session, and six months later nobody uses it. A demo doesn't have to survive the unusual case. Daily work does.",
      },
      {
        tag: "Process",
        title: "AI beside the process instead of inside it",
        body: "Somebody pastes data into a chat window and copies the answer back. That isn't automation, it's an extra manual step with a better name.",
      },
      {
        tag: "Risk",
        title: "A model that invents a price will send it to a customer",
        body: "On a quote, a contract or a settlement, a mistake isn't a rendering bug — it's money and liability. You need a boundary the model can't reach past.",
      },
      {
        tag: "Tooling",
        title: "The token bill grows faster than the benefit",
        body: "Every question goes to the model, including the ones whose answer has been sitting in a table for years. You pay for a lookup a database would do faster and for free.",
      },
      {
        tag: "People",
        title: "Nobody knows whether it actually works",
        body: 'There\'s no way to check how often the answer was right. Without that, "we have AI" is a statement rather than a result.',
      },
    ],
    answerEyebrow: "APPROACH",
    answerTitle: "AI built into the process, not bolted beside it",
    answerLead:
      "I start from the question the business has to be able to answer. Then I check whether a model is needed at all.",
    points: [
      {
        title: "Answers from your data, not from the internet",
        body: "In the workshop system a quote comes from that specific shop's labour-time history. The model doesn't guess how long a replacement takes — it reads how long it took at your place.",
      },
      {
        title: "Where a table is enough, there is no model",
        body: "A 12,857-code diagnostic lookup answers from the database: instantly, identically, at zero tokens. Models are expensive and variable, so they go only where they genuinely add something.",
      },
      {
        title: "A closed world of facts",
        body: "The assistant on this site cannot invent a qualification I don't have, because the only facts it can reach are the ones written down beforehand. The same principle protects your prices and terms from a model's creativity.",
      },
      {
        title: "Secrets the model never sees",
        body: "Keys and tokens live in a vault on my own hardware and are injected straight into the target process. They never appear in chat, code or logs, and a scan on every commit keeps it that way.",
      },
      {
        title: "Limits stated before you ask",
        body: "I use foundation models via API — I don't train or fine-tune them. There is no formal eval harness yet, and I say so immediately, because finding that out later would cost you more.",
      },
    ],
    proofsTitle: "Running in production",
    proofs: [
      {
        sector: "Automotive",
        title: "Quotes computed from shop history, not model estimation",
        metric: "12,857 diagnostic codes from a table, zero tokens",
      },
      {
        sector: "Portfolio",
        title: "An assistant answering only from recorded facts",
        metric: "Cannot invent a qualification that isn't there",
      },
      {
        sector: "Own infrastructure",
        title: "Scheduled agents auditing the system itself",
        metric: "Deterministic dependency scan, no model when clean",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does deploying AI into a process cost?",
        a: "Wiring the model in is usually the cheapest part. The cost sits in everything around it: access to the data, exception handling, and checking whether the answers are right. You get a range once I've seen the specific process.",
      },
      {
        q: "How is this different from ChatGPT in a browser?",
        a: "ChatGPT doesn't know your prices, your job history or your rules. Deploying into a process means the model works from your data, has written boundaries, and isn't asked at all where the answer follows from a table.",
      },
      {
        q: "Does AI mean redundancies?",
        a: "In the companies I've worked with it meant moving people off retyping data and onto work nobody had time for. If the goal is headcount reduction, I'll say plainly that this isn't a project I'll be useful on.",
      },
      {
        q: "How will we know it works?",
        a: "We agree up front what a correct answer means in your process and check it against real cases. I don't have a formal eval harness yet — that's a gap I state openly rather than paper over.",
      },
    ],
  },

  {
    slug: "integracje",
    navLabel: "Integrations",
    metaTitle: "System integrations and data flow between tools — Kamil Jan",
    metaDescription:
      "I connect systems that don't talk: CRM, ERP, warehouse, accounting, payments. Data moves without retyping, and failures are loud rather than silent.",
    eyebrow: "INTEGRATIONS",
    h1: "A person is bridging your tools. Let code do it",
    lead: "I connect systems that each work fine alone and together need somebody to carry data across. Integration isn't only the connection — it's also deciding what happens when the other side stops answering.",
    micro: ["Data moves itself", "Failures are visible", "Survives API changes"],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six symptoms of systems that don't know each other",
    problemsLead:
      "Each symptom costs a few minutes. A few minutes times a few hundred events is a full-time job.",
    problems: [
      {
        tag: "Data",
        title: "Every system holds its own version of the truth",
        body: "The customer has one address in the CRM, another in accounting and a third on the mailing list. Which is current is known only to whoever edited last.",
      },
      {
        tag: "Efficiency",
        title: "Copy-paste as a job description",
        body: "Hours moving the same records between applications. Work that requires nobody's expertise, done by somebody who has plenty.",
      },
      {
        tag: "Process",
        title: "The process halts between tools",
        body: "In one system the order is paid; in the other it's still waiting. It moves when somebody notices and clicks it through by hand.",
      },
      {
        tag: "Risk",
        title: "Decisions made on last week's data",
        body: "Synchronisation happens when somebody runs it. Until then reports show a state that no longer exists.",
      },
      {
        tag: "Tooling",
        title: "The integration broke and nobody knows when",
        body: "It worked, the vendor changed their API, the transfer stopped quietly. You find out at month-end, when the data isn't there.",
      },
      {
        tag: "People",
        title: "Somebody is a human interface",
        body: "One person knows every crossing between systems and what to click so the data arrives. Without them the process stops.",
      },
    ],
    answerEyebrow: "APPROACH",
    answerTitle: "The connection is the easy part",
    answerLead:
      "The hard part is what happens when the other side returns an error, changes a format, or goes quiet for an hour.",
    points: [
      {
        title: "Failure visible immediately, not at month-end",
        body: "Every error path logs with context: what failed, for whom, and why. An integration that fails silently is worse than none, because you've given it trust it hasn't earned.",
      },
      {
        title: "Retries that can't duplicate",
        body: "Networks are unreliable and that's normal. Issuing a customer two invoices because a retry ran twice is not. Operations have to tolerate being repeated.",
      },
      {
        title: "One place that settles it",
        body: "For each field we decide which system is the source. Without that, two-way sync turns into a war of overwrites.",
      },
      {
        title: "Resilient to changes on the other side",
        body: "Vendors change APIs without asking. A format change should stop the transfer with a readable message, not write nonsense into your database.",
      },
      {
        title: "Credentials outside the code",
        body: "Integration keys live in a vault and reach the process as environment variables. A commit-time scan blocks a key from accidentally entering the repository.",
      },
    ],
    proofsTitle: "Running in production",
    proofs: [
      {
        sector: "B2B trade",
        title: "Orders, SMS notifications and customs in one flow",
        metric: "Events fire from transitions, not from a manual click",
      },
      {
        sector: "Logistics",
        title: "Payments and refunds tied to container campaign state",
        metric: "State settled by the database, not by a cron job",
      },
      {
        sector: "Digital services",
        title: "Quote, contract and signature in one path",
        metric: "Ten markets, per-country VAT rules",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "Which systems can you connect to?",
        a: "Anything with an API or a data export — CRMs, accounting and warehouse systems, payment gateways, mail, calendars, e-signature tools. For closed systems I check feasibility before quoting rather than promising blind.",
      },
      {
        q: "What if the vendor changes their API?",
        a: "They will, eventually. The integration should then stop loudly, with a message pointing at what changed. A silent transfer writing incorrect data is the first scenario worth defending against.",
      },
      {
        q: "How long does an integration take?",
        a: "A simple connection between two systems with clean APIs is a matter of days. The time goes into exceptions, field mapping and deciding what the source of truth is — exactly the part that punishes you later if skipped.",
      },
      {
        q: "Is integrating better than replacing the system?",
        a: "Usually yes, if the current tools do their job and the problem is only the flow between them. Replacing means cost, migration and retraining — worth it only when a tool genuinely blocks growth.",
      },
    ],
  },

  {
    slug: "doradztwo-ai",
    navLabel: "Advisory",
    metaTitle: "Automation and AI advisory — where to start — Kamil Jan",
    metaDescription:
      "I identify where automation and AI pay back fastest, and where they aren't worth deploying. Process map, priorities and estimated return before you commit to building.",
    eyebrow: "ADVISORY",
    h1: "Before you spend on automation, find out whether it pays back",
    lead: "I identify where automation and AI will pay back fastest — and where they aren't worth touching. That second list is often the more valuable one, because it saves a budget that was already being spent.",
    micro: ["Priorities by payback", "A concrete plan", "No obligation to build"],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six reasons the project isn't moving",
    problemsLead:
      "It's rarely a shortage of will or budget. It's the absence of a first step you're confident is the right one.",
    problems: [
      {
        tag: "Strategy",
        title: "Everyone agrees it's needed, nobody knows where to start",
        body: "It comes back at every leadership meeting and ends the same way: worth looking into. Without a first step nothing changes.",
      },
      {
        tag: "Efficiency",
        title: "No way to measure whether it paid off",
        body: "After the rollout everyone says it's better, but nobody can show the number. That comes back to bite at the next budget decision.",
      },
      {
        tag: "Process",
        title: "Ten candidates, no priorities",
        body: "Everything looks worth automating. Without comparing cost to return, the winner is the most visible process rather than the most expensive one.",
      },
      {
        tag: "Risk",
        title: "Fear of spending money for nothing",
        body: "You know someone who rolled out a system and went back to the spreadsheet. That risk is real, and it usually comes from picking the wrong process to start with.",
      },
      {
        tag: "Tooling",
        title: "Every vendor says their tool handles it",
        body: "The market is full of solutions that do everything. Telling apart the ones that will work at your place from the ones that worked in a slide deck is hard.",
      },
      {
        tag: "Team",
        title: "People fear they're automating away their own jobs",
        body: "Left unaddressed, the project picks up quiet resistance — invisible in the schedule, very visible in the fact that nobody uses the finished tool.",
      },
    ],
    answerEyebrow: "WHAT IT LOOKS LIKE",
    answerTitle: "Conversation, map, priorities, decision",
    answerLead:
      "The output is a document you can take to anyone — including someone other than me.",
    points: [
      {
        title: "We start from the process, not the technology",
        body: "An hour with the people who do the work tells me more than a week of evaluating tools. I'm looking for where the process waits, loses data, or needs three people.",
      },
      {
        title: "Payback calculated, not estimated in bulk",
        body: "How many times a month, how many minutes, what an hour costs. Simple arithmetic that immediately eliminates several ideas.",
      },
      {
        title: "A list of things not worth doing",
        body: "As important as the recommendations. Processes too rare, too variable, or where a person is simply cheaper — I name them explicitly.",
      },
      {
        title: "Each recommendation with what could go wrong",
        body: "Every proposal carries a named risk and a cost of backing out. A rollout without a way back isn't a plan, it's a bet.",
      },
      {
        title: "No obligation to build it with me",
        body: "The document is yours and you can execute it with anyone. Advisory whose only purpose is selling the adviser's own build isn't advisory.",
      },
    ],
    proofsTitle: "Where this comes from",
    proofs: [
      {
        sector: "Own companies",
        title: "I run the operations I automate",
        metric: "B2B trade, a workshop, logistics, an agency",
      },
      {
        sector: "Deployments",
        title: "Systems handed to teams that run them without me",
        metric: "MAS Group's field team, daily, unaided",
      },
      {
        sector: "Workshop",
        title: "Built for a trade I wasn't an expert in",
        metric: "A working mechanic defined what a correct answer is",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does advisory cost?",
        a: "The first conversation is free and often enough to point at two or three obvious places. Full process mapping with priorities and payback figures gets quoted after that call, once I know the scale.",
      },
      {
        q: "Does it end at strategy, or do you help build?",
        a: "I can do both, but they're separate decisions. You get a document you can take to any contractor — partly so the recommendation can't be suspected of selling my own work.",
      },
      {
        q: "How would you know how my industry works?",
        a: "I don't assume I do. I built the workshop system without being a mechanic, by having a working mechanic define what a correct answer looks like. Same approach everywhere: the client brings the domain, I bring the method.",
      },
      {
        q: "What do I get at the end?",
        a: "A process map with the losses marked, a list of recommendations ranked by payback, a list of things not worth touching, and cost and time estimates for the first two or three steps.",
      },
    ],
  },

  {
    slug: "wdrozenie-i-szkolenie",
    navLabel: "Rollout & training",
    metaTitle: "System rollout and team training on AI and automation — Kamil Jan",
    metaDescription:
      "I take a system to the point where the team uses it without me. Training on AI and automation grounded in the processes people actually perform.",
    eyebrow: "ROLLOUT & TRAINING",
    h1: "A system the team actually starts using",
    lead: "Building the system is half the work. The other half is getting to the point where people use it without being reminded — and that half decides whether the project was an investment or a cost.",
    micro: ["Learning on your own data", "Materials stay with you", "Support after launch"],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six reasons a finished system sits unused",
    problemsLead: "The most expensive system is the one that works correctly and nobody opens.",
    problems: [
      {
        tag: "Knowledge",
        title: "There was training, there is no skill",
        body: "Two hours of presentation and a recording nobody revisits. People know the tool exists but not what to click on a Tuesday morning.",
      },
      {
        tag: "Efficiency",
        title: "Back to the spreadsheet within a fortnight",
        body: "At the first unusual case somebody opens the old file because it's quicker. A month later the company is running two systems at once.",
      },
      {
        tag: "Process",
        title: "The system doesn't match how people work",
        body: "Designed around a table with people who don't perform the process. The details that decide usability only surface in the field.",
      },
      {
        tag: "Risk",
        title: "Quiet resistance instead of open objection",
        body: "Nobody says they don't want it. Data entry just slides to the end of the day, then to tomorrow. It doesn't show in the schedule, it shows in empty records.",
      },
      {
        tag: "Tooling",
        title: "Questions after launch have no address",
        body: "The contractor closed the project and left. The first unusual case lands in a void, and trust in the tool drops with every such day.",
      },
      {
        tag: "Team",
        title: "People fear they're replacing themselves",
        body: "Until somebody says plainly why we're doing this and what changes in their work, imagination fills the gap with the worst version.",
      },
    ],
    answerEyebrow: "HOW I DO IT",
    answerTitle: "A rollout ends when I'm not needed",
    answerLead:
      "I build in order to hand over. It's the only way a system survives the contractor leaving.",
    points: [
      {
        title: "Learning on your data, not on examples",
        body: "People learn on their own jobs and their own customers. Sample data creates a feeling that everything is clear, right up until the first real case.",
      },
      {
        title: "Separately for those who click and those who decide",
        body: "The team needs to know what to do in a specific situation. A manager needs to know what the system shows and what it won't. Two different conversations.",
      },
      {
        title: "Talking about fears before they become resistance",
        body: 'The question "will this replace me" always gets asked, just not always out loud. Better answered at the start than explained later, when nobody is entering data.',
      },
      {
        title: "Materials that stay with you",
        body: "Short instructions for real situations, not a hundred-page manual. Something a new hire reads on day one and can then start.",
      },
      {
        title: "I'm there for the first unusual cases",
        body: "The most is learned in the weeks after launch, when the unpredicted shows up. Closing a project on go-live day leaves the client alone at the hardest moment.",
      },
    ],
    proofsTitle: "Done in practice",
    proofs: [
      {
        sector: "B2B trade",
        title: "A field team running the whole process without me",
        metric: "Non-technical people, working from phones",
      },
      {
        sector: "Automotive",
        title: "A system handed to the workshop that uses it daily",
        metric: "A mechanic defined what a correct answer is",
      },
      {
        sector: "Own practice",
        title: "The same method applied to myself",
        metric: "Daily code-reading practice kept in public",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "How long does training a team take?",
        a: "Learning the tool itself is usually one or two sessions. The real rollout is measured in the weeks after launch, because that's when the unpredicted cases appear — and those decide whether the team trusts the tool.",
      },
      {
        q: "Do you train on tools you didn't build?",
        a: "Yes, for working with AI and automation in everyday tasks. Training on a specific third-party system only makes sense once I've learned it properly — otherwise it's reading someone else's documentation aloud.",
      },
      {
        q: "What if the team doesn't want the new system?",
        a: "That's the most common reason rollouts fail, and it has to be addressed directly. Behind the resistance there's usually a specific fear: about the job, about control, or that the tool adds work instead of removing it. Each one has a different answer.",
      },
      {
        q: "What's left when we finish?",
        a: "A working system, documentation written for real situations, a trained team, and access to everything on your side. The goal is that you don't need me — not that you call me for every change.",
      },
    ],
  },
];

export const SERVICES: Record<Lang, Service[]> = { en: EN, pl: PL };

export function getService(lang: Lang, slug: string): Service | undefined {
  return SERVICES[lang].find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = PL.map((s) => s.slug);
