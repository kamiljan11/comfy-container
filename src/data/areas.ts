import { type Lang } from "../i18n";
import { type Service } from "./services";
import { AREA_USES } from "./areaUses";

/**
 * Area pages under /obszary — one per business function (the six letsautomate.pl
 * also uses; Kamil chose the same set). Same shape as a service page so the
 * service layout renders both. Written and fact-checked by the 2026-09-13 area
 * workflow: every claim and number was verified against caseStudies.ts /
 * services.ts. The metric tiles these pages once ended with were removed on
 * 2026-09-21; the case studies carry that evidence now.
 */

const PL: Service[] = [
  {
    slug: "sprzedaz-i-marketing",
    navLabel: "Sprzedaż i marketing",
    metaTitle: "Automatyzacja sprzedaży i marketingu | Kamil Jan",
    metaDescription:
      "Automatyzacja sprzedaży i marketingu: każdy lead z zapisanym źródłem, oferta i umowa z jednego cennika, wysyłka e-maili z bezpiecznymi limitami.",
    eyebrow: "SPRZEDAŻ I MARKETING",
    h1: "Od leada do podpisanej umowy bez przepisywania po drodze",
    lead: "Automatyzuję drogę od pierwszego kontaktu do podpisanej umowy: skąd przyszedł lead, kto i kiedy się do niego odzywa, skąd bierze się cena w ofercie i co dzieje się po podpisie. Handlowiec ma rozmawiać z klientem, a nie przepisywać dane między pocztą, arkuszem i CRM-em.",
    micro: [
      "Wiadomo, skąd jest każdy lead",
      "Jedna cena wszędzie",
      "Automat, który wie, kiedy przestać",
    ],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć miejsc, w których gubi się sprzedaż",
    problemsLead:
      "Transakcje rzadko przepadają przez produkt. Częściej przez to, co dzieje się między pierwszym kontaktem a podpisem.",
    problems: [
      {
        tag: "Dane",
        title: "Nie wiadomo, która reklama przyniosła klienta",
        body: "Lead przychodzi mailem albo telefonem i nikt nie zapisuje, skąd. Po miesiącu budżet reklamowy dzieli się według przeczucia, bo dane nie dają odpowiedzi.",
      },
      {
        tag: "Efektywność",
        title: "Oferta składana ręcznie po każdej rozmowie",
        body: "Spotkanie kończy się obietnicą, że wycena przyjdzie mailem, a wieczorem ktoś liczy ją w arkuszu. Cena powiedziana przy stole i cena w mailu nie zawsze są tą samą liczbą.",
      },
      {
        tag: "Procesy",
        title: "Kontakt z klientem czeka na czyjeś wolne popołudnie",
        body: "Przypomnienie wychodzi wtedy, gdy ktoś znajdzie chwilę. W pierwszym pracowitym tygodniu nikt jej nie znajduje, a lead, który w poniedziałek był ciepły, w piątek już nie jest.",
      },
      {
        tag: "Ryzyko",
        title: "Masowa wysyłka pali domenę, z której idą faktury",
        body: "Kupiona lista i narzędzie do wysyłki dają mnóstwo maili w jedno popołudnie. Odbite wiadomości i zgłoszenia spamu obciążają jednak tę samą domenę, z której firma wysyła oferty i faktury, a na małym rynku nie ma drugiej szansy.",
      },
      {
        tag: "Technologia",
        title: "Podpisane, ale niezafakturowane",
        body: "Podpis elektroniczny, fakturowanie i CRM działają osobno i żadne z nich nie wie, co zrobiły pozostałe. Klient podpisał, faktura nie wyszła i nikt tego nie widzi, dopóki nie zabraknie wpłaty.",
      },
      {
        tag: "Zespół",
        title: "Kolejność kroków zna tylko najlepszy handlowiec",
        body: "Kiedy wysłać fakturę zaliczkową, co obiecać w sprawie terminu, jak rozmawiać o zmianie zakresu. Ta wiedza siedzi w jednej głowie, a nowa osoba uczy się jej na błędach przy prawdziwych klientach.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Automat pilnuje kolejności, człowiek prowadzi rozmowę",
    answerLead:
      "Każdy mechanizm poniżej rozwiązuje jeden konkretny moment, w którym sprzedaż się rozjeżdża: od pierwszego kontaktu po podpis.",
    points: [
      {
        title: "Lead trafia do bazy razem ze źródłem",
        body: "Źródło leada, czyli kampania i kraj, zapisuje się na samym rekordzie w chwili zgłoszenia, więc pytanie „która reklama to przyniosła” ma odpowiedź w danych, a nie w czyjejś pamięci. Leady lądują w jednym panelu, a powiadomienie daje zespołowi znać, gdy transakcja potrzebuje człowieka.",
      },
      {
        title: "Jedna cena w rozmowie, ofercie i umowie",
        body: "Cały cennik siedzi w jednym miejscu, z którego czyta konfigurator, oferta, umowa i asystent AI. Rozmowa kończy się wyceną na ekranie zamiast obietnicą wysłania czegoś później, a cena nie rozjedzie się między rozmową a fakturą. Handlowiec może wycenić ofertę w aplikacji na własnym telefonie, czasem jeszcze przy kliencie.",
      },
      {
        title: "Umowa z danych, podpis i faktura spięte ze stanem",
        body: "Dane klienta i wybrany pakiet na wejściu, poprawna umowa na wyjściu: bez szablonu przerabianego ręcznie za każdym razem. Podpis elektroniczny i fakturowanie zgłaszają się automatycznie do jednego systemu, który pilnuje stanu transakcji, więc nie utknie ona po cichu jako podpisana, ale niezafakturowana.",
      },
      {
        title: "Wysyłka z hamulcami zamontowanymi przed silnikiem",
        body: "Wysyłka trzyma się twardych limitów: ograniczona liczba maili na domenę odbiorcy w całej historii, ograniczona liczba nowych firm dziennie, tylko w godzinach pracy i z pominięciem dni świątecznych. Każdy przebieg zaczyna się od sprawdzenia odbitych wiadomości z ostatnich dni. Gdy klient odpisze, automat kończy pracę, a rozmowę przejmuje człowiek.",
      },
      {
        title: "Etapy sprzedaży zapisane jako zdarzenia w systemie",
        body: "Każdy etap lejka sprzedażowego ma zapisane, co zrobić teraz i mniej więcej co powiedzieć klientowi, a każde przejście do kolejnego etapu zostawia ślad w historii. Przed ryzykownym skokiem, na przykład startem prac bez podpisanej umowy, system zatrzymuje się i prosi o potwierdzenie.",
      },
      {
        title: "Kreacja reklamowa zaczyna się od researchu, nie od promptu",
        body: "Zanim powstanie obraz, jest brief marki pobrany z działającej strony, profil klienta z obawami uszeregowanymi według wagi i decyzja, co ta grupa uzna za wiarygodne. Tekst zaczyna od problemu czytelnika, nie od oferty, a każdą kreację zatwierdza albo odrzuca człowiek.",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile to kosztuje?",
        a: "Zależy od tego, ile narzędzi trzeba spiąć i czy CRM już jest, czy dopiero ma powstać. Po obejrzeniu, jak dziś wygląda droga od leada do umowy, dostajesz widełki dla swojego przypadku. Pierwsza, 30-minutowa rozmowa jest bezpłatna.",
      },
      {
        q: "Czy automat będzie pisał do klientów w moim imieniu?",
        a: "Pierwszy kontakt i przypomnienia: tak, w granicach, które ustalimy. Rozmowę z człowiekiem: nie, automatyzacja kończy się w chwili, gdy ktoś odpisze. Wykrywanie odpowiedzi i blokada kolejnych wiadomości muszą działać od pierwszego dnia wysyłki, żeby firma, która odmówiła, nie dostawała kolejnych maili.",
      },
      {
        q: "Mamy już CRM. Trzeba go wymieniać?",
        a: "Zwykle nie. Jeśli CRM da się połączyć z innymi systemami, podpinam do niego formularze, ofertę, podpis i fakturowanie. Wymianę proponuję dopiero wtedy, gdy narzędzie realnie blokuje sprzedaż, i mówię o tym przed wyceną.",
      },
      {
        q: "Czy AI napisze nam reklamy i maile?",
        a: "Pomoże, jeśli dostanie brief. Kreacja bez researchu marki i klienta wygląda sztucznie, dlatego research idzie przed promptem. Maile pisze się według spisanych reguł, a każda wiadomość przed wysyłką przechodzi kontrolę, bo model potrafi dopisać zdanie, którego nikt nie potwierdził. Danych o tym, jak konkretnie Twoje reklamy sprzedadzą, nie mam i nie będę udawał, że mam.",
      },
      {
        q: "Kto to zbuduje?",
        a: "Kod piszą agenci AI, a ja odpowiadam za specyfikację, architekturę, przegląd kodu, wdrożenie i działanie na produkcji. Gdy projekt potrzebuje większego zespołu, dołącza CetusPro, software house z Rzeszowa.",
      },
    ],
  },
  {
    slug: "obsluga-klienta",
    navLabel: "Obsługa klienta",
    metaTitle: "Automatyzacja obsługi klienta | Kamil Jan",
    metaDescription:
      "Automatyzacja obsługi klienta na Twoich danych: statusy wysyłane z systemu, odpowiedzi tylko z zapisanych faktów i człowiek tam, gdzie jest potrzebny.",
    eyebrow: "OBSŁUGA KLIENTA",
    h1: "Klient nie powinien dzwonić, żeby dowiedzieć się, gdzie jest jego zamówienie",
    lead: "Automatyzuję tę część obsługi klienta, która się powtarza: statusy zamówień, potwierdzenia, akceptacje wycen i odpowiedzi na pytania zadawane każdego dnia. Rozmowy, które naprawdę potrzebują człowieka, zostają przy ludziach, a to, kiedy automat oddaje sprawę człowiekowi, jest zapisaną regułą, a nie decyzją modelu.",
    micro: [
      "Statusy wysyłane z systemu",
      "Odpowiedzi tylko z Twoich danych",
      "Reszta trafia do człowieka",
    ],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć miejsc, w których obsługa klienta traci czas i zaufanie",
    problemsLead:
      "Pojedynczo żadne z nich nie wygląda groźnie. Razem decydują o tym, czy klient wraca, czy szuka kogoś innego.",
    problems: [
      {
        tag: "Dane",
        title: "Pytanie o status uruchamia śledztwo",
        body: "Klient pyta, gdzie jest zamówienie, a odpowiedź leży w arkuszu, w wątku na czacie i w pamięci osoby, która akurat jest na urlopie. Żeby odpowiedzieć na proste pytanie, trzeba złapać trzy osoby.",
      },
      {
        tag: "Efektywność",
        title: "To samo zdanie po raz czterdziesty",
        body: "„Zamówienie wyszło”, „przesyłka przeszła odprawę”, „część dotarła”. Te same wiadomości pisane ręcznie, jedna po drugiej, zjadają dzień komuś, kto mógłby zająć się klientem z prawdziwym problemem.",
      },
      {
        tag: "Procesy",
        title: "Odpowiedź klienta ginie w skrzynce",
        body: "Klient akceptuje wycenę albo odmawia, ale nikt nie przenosi tego do systemu. Zamówienie stoi, a ciepły kontakt stygnie, bo decyzja utknęła w mailu, którego nikt nie oznaczył.",
      },
      {
        tag: "Ryzyko",
        title: "Automat, który obiecał za dużo",
        body: "Chatbot podał termin dostawy, którego nikt nie potwierdził, albo cenę z nieaktualnego cennika. Potem ktoś musi dzwonić i to odkręcać, a zaufanie traci się szybciej, niż się je buduje.",
      },
      {
        tag: "Technologia",
        title: "Ta sama wiadomość poszła dwa razy",
        body: "Ponowna próba po błędzie sieci, podwójne kliknięcie, dwa systemy wysyłające to samo. Klient dostaje zdublowane SMS-y albo kolejnego maila, choć już napisał, że nie jest zainteresowany.",
      },
      {
        tag: "Zespół",
        title: "Obsługa stoi na jednej osobie",
        body: "Tylko ona wie, co obiecano któremu klientowi i na jakim etapie jest jego sprawa. Gdy jej nie ma, klienci słyszą „oddzwonimy” i czekają.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Automat mówi to, co system już wie. Resztę oddaje człowiekowi",
    answerLead:
      "Nie zaczynam od chatbota. Zaczynam od tego, skąd bierze się odpowiedź na pytanie klienta, i dopiero potem decyduję, co może ją wysłać bez udziału człowieka.",
    points: [
      {
        title: "Status wysyłany z przejścia, nie z pamięci",
        body: "Zamówienie przechodzi przez nazwane etapy zapisane w systemie, a nie w niczyjej głowie. SMS o zmianie statusu wychodzi z jednego konkretnego etapu i znikąd indziej, więc nie może pójść dwa razy ani z etapu, którego zamówienie naprawdę nie osiągnęło. Gdy klient pyta, gdzie jest zamówienie, aktualizacje ma już w telefonie, a nikt nie musiał pamiętać o ich wysłaniu.",
      },
      {
        title: "Powtarzalne rozmowy bez człowieka, ale z granicą",
        body: "Połączenia i SMS-y o statusie mogą działać bez nadzoru człowieka, po polsku i po angielsku. Połączenie o statusie to stały skrypt czytany przez syntezator mowy, bez udziału modelu językowego. W dwukierunkowym agencie głosowym model tylko formułuje zdania i wybiera ścieżkę, a każdą zmianę zamówienia i każdą wysyłkę wykonuje zwykły, przewidywalny kod. Ten rodzaj agenta wciąż wymaga dopracowania i nie nazywam go gotowym produktem.",
      },
      {
        title: "Akceptacja jednym kliknięciem, zapisana przez system",
        body: "Oferta idzie mailem z linkiem. Kliknięcie zmienia status zamówienia i zapisuje godzinę akceptacji, a dalej idą faktura i SMS do klienta. Decyzja klienta nie czeka, aż ktoś ręcznie przeniesie ją z maila do arkusza zamówień.",
      },
      {
        title: "Asystent, który mówi „nie wiem”",
        body: "Asystent na kamiljan.com odpowiada wyłącznie z faktów, które wcześniej spisałem i zatwierdziłem. Gdy czegoś tam nie ma, mówi to wprost i kieruje do mnie, zamiast zgadywać. Ta sama zasada obowiązuje przy asystencie dla Twoich klientów: odpowiada z Twoich cen i warunków, a nie z ogólnej wiedzy modelu.",
      },
      {
        title: "Wykrywanie odpowiedzi przed pierwszą wysyłką",
        body: "Wykrywanie odpowiedzi i blokada kolejnych wiadomości po reakcji klienta muszą działać, zanim wyjdzie pierwsza wysyłka, a nie zostać dopisane później. Bez tego ciepły kontakt czeka na odpowiedź zbyt długo, a klient, który już odmówił, dostaje kolejne wiadomości.",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Czy chatbot zastąpi mój zespół obsługi?",
        a: "Nie i nie po to go buduję. Automat przejmuje powtarzalne wiadomości i pytania, na które odpowiedź jest już w systemie. Rozmowa wymagająca decyzji, reklamacja albo nietypowa sytuacja trafia do człowieka, a to przekazanie jest zapisaną regułą, a nie oceną modelu.",
      },
      {
        q: "Co, jeśli asystent poda klientowi błędną informację?",
        a: "Dlatego projektuję go tak, żeby nie wychodził poza zapisane fakty i nie wykonywał żadnych działań sam. Cenę i termin podaje z systemu albo wcale, a zmianę zamówienia wykonuje zwykły kod, nie model. Gdy nie zna odpowiedzi, mówi to i przekazuje sprawę dalej. Nie mam jeszcze formalnego zestawu testów jakości modelu i mówię o tym od razu.",
      },
      {
        q: "Od czego zacząć?",
        a: "Od jednego pytania, które klienci zadają najczęściej, na przykład „gdzie jest moje zamówienie?”. Jeśli odpowiedź da się odczytać z systemu, wysyłamy ją automatycznie z właściwego etapu. Pierwsza rozmowa trwa 30 minut i jest bezpłatna: przechodzimy przez jeden proces, a ja mówię wprost, od czego zacząć.",
      },
      {
        q: "Ile to kosztuje?",
        a: "Zależy od liczby kanałów, od tego, skąd płyną dane, i od tego, czy system pod spodem już wie, na jakim etapie jest sprawa klienta. Widełki podaję po obejrzeniu procesu. Większe wdrożenia realizuję z rzeszowskim software house'em CetusPro: ich developerzy dołączają, gdy projekt wymaga większego zespołu.",
      },
      {
        q: "Kto napisze kod?",
        a: "Kod piszą agenty AI. Ja odpowiadam za specyfikację, architekturę, przegląd tego, co wraca, wdrożenie i za to, co dzieje się na produkcji, gdy klient po drugiej stronie dostaje wiadomość. W ten sposób powstały wszystkie systemy opisane na tej stronie.",
      },
    ],
  },
  {
    slug: "administracja-i-dokumenty",
    navLabel: "Administracja i dokumenty",
    metaTitle: "Automatyzacja administracji i dokumentów | Kamil Jan",
    metaDescription:
      "Automatyzacja administracji i dokumentów: umowy i faktury składane z danych, które firma już ma, akceptacje zapisane w systemie, terminy pod kontrolą.",
    eyebrow: "ADMINISTRACJA I DOKUMENTY",
    h1: "Umowa nie powinna zależeć od tego, kto ją dziś przepisywał",
    lead: "Automatyzuję obieg dokumentów w firmie: umowy i faktury składane z danych, które już leżą w CRM albo w arkuszu, akceptacje zapisane w systemie zamiast w wątku mailowym, terminy widoczne w systemie, a nie w czyimś kalendarzu. Najpierw dbam o to, żeby system nie wypuścił złego dokumentu. Szybkość przychodzi przy okazji.",
    micro: [
      "Dokument z danych, nie z kopii",
      "Akceptacja zapisana w systemie",
      "Terminy pilnowane automatycznie",
    ],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć rzeczy, które dzieją się w każdym biurze",
    problemsLead:
      "Administracja rzadko psuje się spektakularnie. Psuje się po cichu: jedną literówką, jednym przegapionym terminem, jednym dokumentem w złej wersji.",
    problems: [
      {
        tag: "Dane",
        title: "Pięć wersji tego samego wzoru umowy",
        body: "Na dysku leżą „umowa_final”, „umowa_final2” i „umowa_nowa”. Nikt nie jest pewien, która ma aktualne warunki, więc każdy bierze tę, którą otwierał ostatnio, a klient dostaje zapisy, które już nie obowiązują.",
      },
      {
        tag: "Efektywność",
        title: "Dane klienta przepisywane do każdego dokumentu",
        body: "Nazwa firmy, NIP, adres i kwota już są w CRM i w ofercie. Mimo to ktoś składa umowę, protokół i fakturę, przepisując je pole po polu między oknami. Za każdym razem od nowa.",
      },
      {
        tag: "Procesy",
        title: "Dokument czeka na podpis, tylko nie wiadomo u kogo",
        body: "Umowa poszła do akceptacji mailem i utknęła w skrzynce osoby, która jest w delegacji. Dowiadujesz się, gdy klient pyta, dlaczego wciąż jej nie dostał.",
      },
      {
        tag: "Ryzyko",
        title: "Puste pole, które wygląda jak odpowiedź",
        body: "Brakujący numer, zła stawka VAT albo pominięta klauzula nie wyglądają na szkic. Wyglądają na gotowy dokument i jako gotowy wychodzą, a wracają jako korekta, odrzucony wniosek albo spór.",
      },
      {
        tag: "Technologia",
        title: "Własne dokumenty zamknięte w cudzym programie",
        body: "Umowy, klienci i historia zleceń siedzą w abonamencie, który nie ma eksportu ani dostępnego API. Żeby odzyskać własne dane, ktoś musi je przepisywać z ekranu.",
      },
      {
        tag: "Zespół",
        title: "Terminy żyją w kalendarzu jednej osoby",
        body: "Koniec umowy, ważność ubezpieczenia, termin płatności. Przypomnienie istnieje tylko wtedy, gdy ktoś je sobie ustawił, i wyjeżdża razem z nim na urlop.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Dokument ma wynikać z danych, nie z przepisywania",
    answerLead:
      "Przy każdym polu w dokumencie pytam, skąd ono się bierze. Jeśli ta informacja już gdzieś w firmie leży, nikt nie powinien wpisywać jej drugi raz.",
    points: [
      {
        title: "Umowa składana z rekordu, nie z kopii wzoru",
        body: "Dane z rekordu trafiają do szablonu z nazwanymi polami, a wychodzi gotowy dokument w Wordzie i w PDF-ie. Tak może powstawać każda umowa czy oferta: osoba w terenie generuje ją sama z telefonu, a brak wymaganego pola zatrzymuje generowanie, zamiast wypuścić dokument z dziurą. Szablon ma swoją historię zmian, więc każda poprawka klauzuli jest widoczna.",
      },
      {
        title: "Akceptacja jako zdarzenie w systemie",
        body: "Zgoda nie powinna wynikać z wątku mailowego. Klient klika link w ofercie, a system zmienia status zamówienia i zapisuje godzinę: tak może działać akceptacja wyceny nawet wtedy, gdy zamówienia prowadzone są w arkuszu. Każde zlecenie może mieć swój nazwany etap, a powiadomienia wychodzą ze zmiany etapu, więc stan widać bez przeszukiwania skrzynek.",
      },
      {
        title: "Wystawiony dokument się nie zmienia",
        body: "Podpisana umowa to tekst, który podpisano, a nie to, co wygeneruje dzisiejszy wzór. Każda podpisana umowa przechowuje własną treść, więc zmiana warunków w nowym szablonie nie rusza dokumentów podpisanych wcześniej. Numer faktury jest unikalny i po wystawieniu nie da się go zmienić. Pilnuje tego system, a nie ekran, bo ekran to miejsce, w którym zmęczony człowiek klika dwa razy.",
      },
      {
        title: "Terminy widoczne, zanim miną",
        body: "Data końca ubezpieczenia czy przeglądu to pole w systemie, a nie wpis w czyimś kalendarzu. Panel może pokazywać pojazdy albo umowy, którym termin mija w ciągu 30 dni. Jedno zastrzeżenie warto powiedzieć wprost: jeśli te daty wpisuje się ręcznie, alert jest tak dobry jak ostatnio wpisana data.",
      },
      {
        title: "Dane należą do firmy, nie do abonamentu",
        body: "Gdy firma trzyma klientów, rezerwacje i wzory umów w płatnym programie bez eksportu i bez dostępu do własnych danych, odzyskanie ich wymaga osobnego projektu: wyciągnięcia danych, zbudowania zamiennika i sprawdzenia migracji wiersz po wierszu, nie na oko. Sprawdzanie na oko łatwo gubi pojedyncze wpisy, dlatego liczy się mechaniczne porównanie przed uznaniem migracji za skończoną. Dane powinny leżeć w bazie firmy, a eksport ma być jednym zapytaniem, nie osobnym projektem.",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile to kosztuje?",
        a: "Zależy od liczby rodzajów dokumentów, systemów, z których biorą dane, i od tego, czy potrzebny jest podpis elektroniczny. Pierwsza rozmowa trwa 30 minut i jest bezpłatna. Widełki dostajesz po obejrzeniu jednego konkretnego obiegu, nie wcześniej.",
      },
      {
        q: "Czy musimy zmieniać CRM albo program księgowy?",
        a: "Zwykle nie. Jeśli narzędzie udostępnia choćby eksport danych, dokumenty mogą brać dane stamtąd. Czasem najlepszym systemem jest arkusz, w którym ktoś już pracuje: przy kilkudziesięciu zamówieniach i jednej osobie obsługującej kanał sprzedaży arkusz Google bez dodatkowej infrastruktury radzi sobie z wycenami, akceptacjami, fakturami VAT i SMS-ami.",
      },
      {
        q: "Czy podpis elektroniczny i archiwum będą zgodne z przepisami?",
        a: "Podpisu elektronicznego nie buduję sam, tylko podłączam wyspecjalizowanego dostawcę, bo w tej dziedzinie taka firma jest dalej niż ja. Które dokumenty wymagają podpisu kwalifikowanego i jak długo je przechowywać, ustalamy z Twoim prawnikiem albo księgową. Nie jestem prawnikiem i nie udaję, że nim jestem. Moja część to system, który te ustalenia wymusza: unikalna numeracja, brak edycji po wystawieniu, dostęp tylko dla uprawnionych.",
      },
      {
        q: "Kto będzie widział dane z dokumentów?",
        a: "Tylko ci, którzy powinni, i pilnuje tego system, a nie ukryty przycisk. Różne role, na przykład handlowiec, audytor i administrator, mogą pracować na tych samych danych, a mimo to każdy widzi tylko swoją część. Brakująca reguła oznacza brak dostępu, a nie pełny dostęp. Uprawnienia sprawdzam na działającym systemie, nie tylko w dokumentacji, która go opisuje.",
      },
      {
        q: "Kto to buduje i co, jeśli projekt jest większy?",
        a: "Kod piszą agenty AI, a ja odpowiadam za wszystko dookoła: specyfikację, architekturę, review, wdrożenie i działanie na produkcji. Większe wdrożenia realizuję z rzeszowskim software house'em CetusPro: ich developerzy dołączają, gdy projekt wymaga większego zespołu.",
      },
    ],
  },
  {
    slug: "hr-i-rekrutacja",
    navLabel: "HR i rekrutacja",
    metaTitle: "Automatyzacja HR i rekrutacji | Kamil Jan",
    metaDescription:
      "Automatyzacja HR i rekrutacji: kandydaci w jednym miejscu, onboarding i offboarding z etapami, dokumenty kadrowe z danych. Decyzje o ludziach zostają u ludzi.",
    eyebrow: "HR I REKRUTACJA",
    h1: "HR, który ma czas dla ludzi, a nie dla arkuszy",
    lead: "Automatyzuję w HR i rekrutacji to, co jest powtarzalną logistyką: zbieranie zgłoszeń, obieg dokumentów, listy zadań przy przyjęciu i odejściu pracownika, wnioski urlopowe. Decyzji o ludziach nie oddaję automatowi. Podejmuje je człowiek: tylko na pełnych danych i bez szukania ich w kilku miejscach.",
    micro: [
      "Kandydat w jednym miejscu",
      "Decyzja zostaje u człowieka",
      "Dostęp pilnowany przez bazę",
    ],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć miejsc, w których HR traci czas i kandydatów",
    problemsLead:
      "Rekrutacja i kadry to w dużej części logistyka: przenoszenie danych, pilnowanie terminów, zbieranie podpisów. Tę część da się zapisać w systemie. Rozmów z ludźmi zapisać się nie da.",
    problems: [
      {
        tag: "Dane",
        title: "Kandydat w skrzynce, w arkuszu i na portalu naraz",
        body: "CV przychodzą mailem, z portalu z ogłoszeniami i z polecenia, a każde źródło ląduje gdzie indziej. Nikt nie wie, czy ta sama osoba nie aplikowała już w zeszłym miesiącu i jak to się skończyło.",
      },
      {
        tag: "Efektywność",
        title: "Te same dane pracownika wpisywane kilka razy",
        body: "Z formularza do umowy, z umowy do systemu kadrowo-płacowego, stamtąd do listy dostępów i grafiku. Każde przepisanie to kolejna szansa na błąd w nazwisku, dacie albo stawce.",
      },
      {
        tag: "Procesy",
        title: "Onboarding zależy od tego, kto akurat pamięta",
        body: "Laptop, konta, szkolenie BHP, badania wstępne, umowa do podpisu. Lista istnieje w czyjejś głowie albo w starym mailu, więc nowa osoba pierwszego dnia czeka na dostępy zamiast pracować.",
      },
      {
        tag: "Ryzyko",
        title: "Były pracownik wciąż ma dostęp",
        body: "Przy odejściu łatwo pominąć jedno narzędzie. Poczta, CRM albo dysk z danymi klientów zostają otwarte, dopóki ktoś przypadkiem tego nie zauważy, a dane osobowe kandydatów leżą w skrzynce dłużej, niż ktokolwiek planował.",
      },
      {
        tag: "Technologia",
        title: "Kupiony system HR, a praca i tak w arkuszu",
        body: "Gotowe narzędzie ma własny model procesu, który nie pokrywa się z Waszym. Wniosek idzie przez system, akceptacja przez czat, a zestawienie na koniec miesiąca i tak ktoś składa ręcznie.",
      },
      {
        tag: "Zespół",
        title: "Rekruter, zamiast rozmawiać, umawia terminy",
        body: "Najwięcej czasu zjada nie ocena kandydatów, tylko korespondencja: potwierdzenia, przypomnienia, szukanie terminu pasującego trzem osobom. W tym czasie dobry kandydat przyjmuje inną ofertę.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Automat od logistyki, człowiek od decyzji",
    answerLead:
      "Najpierw oddzielam to, co w HR jest powtarzalną logistyką, od tego, co jest oceną człowieka. Automatyzuję wyłącznie pierwszą część.",
    points: [
      {
        title: "Jedna baza kandydatów, zasilana automatycznie",
        body: "Zgłoszenia z formularza na stronie, ze skrzynki rekrutacyjnej i z portali trafiają automatycznie do jednego miejsca. System wyłapuje duplikaty po e-mailu i telefonie, kandydat od razu dostaje potwierdzenie, a propozycja terminu rozmowy wychodzi z kalendarza, nie z ręcznie pisanego maila.",
      },
      {
        title: "Przyjęcie i odejście jako etapy, nie lista w mailu",
        body: "Onboarding i offboarding mają nazwane etapy i tylko dozwolone przejścia między nimi, tak jak dobrze zaprojektowany proces zamówień. Zadanie dla IT, prośba o podpis czy przypomnienie wychodzą z jednego konkretnego przejścia, więc etapu nie da się przeskoczyć, a to samo zadanie nie wyjdzie dwa razy. Przy odejściu lista kont do zamknięcia tworzy się sama.",
      },
      {
        title: "Dokumenty kadrowe z danych, nie z ręcznie wypełnianego szablonu",
        body: "Umowy, aneksy i skierowania na badania generuje system z danych pracownika: szablon Word z nazwanymi polami, wynik w PDF. Brak wymaganego pola zatrzymuje generowanie, zamiast wypuścić dokument z luką. Na tej samej zasadzie mogą działać inne dokumenty generowane z danych, na przykład oferty czy umowy, z których zespoły sprzedażowe korzystają na co dzień w terenie.",
      },
      {
        title: "Wnioski i akceptacje w jednym obiegu",
        body: "Wniosek urlopowy albo o zwrot kosztów trafia do właściwego przełożonego, a po akceptacji do kalendarza zespołu i zestawienia dla kadr i płac. Przełożony dostaje przypomnienie, gdy wniosek czeka za długo, a nikt nie składa listy ręcznie na koniec miesiąca.",
      },
      {
        title: "Dostęp do danych osobowych pilnowany przez bazę",
        body: "Wynagrodzenia, zwolnienia lekarskie i oceny okresowe widzą tylko uprawnione role, a rozstrzygają o tym polityki bazy danych, nie ukryty przycisk. Dane kandydatów, którzy nie dostali pracy, system usuwa po upływie ustalonego przez Was okresu przechowywania.",
      },
      {
        title: "AI porządkuje, człowiek ocenia",
        body: "Model może przenieść doświadczenie i języki z CV do jednolitej karty albo streścić zgłoszenie. Nie odrzuca kandydatów i nie wystawia im ocen. Asystent na tej stronie działa podobnie: odpowiada tylko z zapisanych faktów, a gdy czegoś nie wie, mówi to wprost zamiast zgadywać.",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile kosztuje automatyzacja w HR?",
        a: "Zależy od liczby procesów i systemów do spięcia: samo przyjmowanie zgłoszeń to inna skala niż onboarding z kontami, dokumentami i zestawieniem dla płac. Pierwsza rozmowa jest bezpłatna, a widełki dostajesz po obejrzeniu procesu, nie wcześniej.",
      },
      {
        q: "Czy AI będzie odrzucać kandydatów?",
        a: "Nie w systemach, które buduję. Model może uporządkować zgłoszenie albo streścić CV, ale decyzja, kto przechodzi dalej, zostaje u osoby, która za nią odpowiada. Filtr odrzucający po słowach kluczowych odrzuca też tych, którzy opisali swoje doświadczenie innymi słowami.",
      },
      {
        q: "Czy zastąpisz nasz system kadrowo-płacowy?",
        a: "Nie i nie będę tego proponował. Naliczanie wynagrodzeń i przepisy prawa pracy to robota dla wyspecjalizowanego systemu i osoby, która go zna. Buduję to, co dzieje się wokół: zbieranie danych, obieg akceptacji i przekazanie gotowego zestawienia do systemu płacowego.",
      },
      {
        q: "Skąd wiesz, jak działa HR?",
        a: "Nie jestem specjalistą od kadr i nie udaję, że znam prawo pracy: treść umów i regulaminów ustala Wasz dział kadr albo prawnik. Rekrutację znam od strony pracodawcy, który samodzielnie zatrudnia i buduje zespół. Poza tym pracuję na tej samej zasadzie co zawsze: to osoba, która wykonuje daną pracę, definiuje, co jest w niej poprawnym wynikiem, a ja zamieniam tę wiedzę w system.",
      },
      {
        q: "Co z danymi osobowymi kandydatów i pracowników?",
        a: "Kod zostaje w Waszym repozytorium, a dane w Waszej bazie. O dostępie decydują uprawnienia w bazie, nie w interfejsie. Okresy przechowywania ustala Wasz inspektor ochrony danych albo prawnik; system pilnuje, żeby były dotrzymane. Klucze do integracji leżą w vaulcie, nie w kodzie.",
      },
      {
        q: "A jeśli projekt jest większy niż jedna osoba?",
        a: "Wtedy dołącza rzeszowski software house CetusPro. Specyfikacja, architektura i review zostają po mojej stronie, tak samo jak przy mniejszych wdrożeniach.",
      },
    ],
  },
  {
    slug: "dane-i-raporty",
    navLabel: "Dane i raporty",
    metaTitle: "Automatyzacja danych i raportów w firmie | Kamil Jan",
    metaDescription:
      "Automatyzacja danych i raportów: zestawienia liczone z jednego źródła, a nie sklejane z arkuszy. Brak świeżych danych widać od razu, a nie przy decyzji.",
    eyebrow: "DANE I RAPORTY",
    h1: "Raport z jednego źródła zamiast z pięciu arkuszy",
    lead: "Buduję zestawienia i panele liczone z tych samych danych, na których firma pracuje na co dzień, bez sklejania plików i ręcznego poprawiania formuł. A gdy dane przestaną spływać, raport ma to powiedzieć wprost, a nie pokazywać liczby sprzed tygodnia jako aktualne.",
    micro: ["Jedno źródło liczb", "Brak danych widać od razu", "Bez sklejania arkuszy"],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć powodów, dla których nikt nie ufa raportowi",
    problemsLead:
      "Raport, którego liczby trzeba sprawdzać, nie oszczędza czasu. Przenosi tylko pracę z tworzenia zestawienia na jego weryfikację.",
    problems: [
      {
        tag: "Dane",
        title: "Dwa raporty, dwie różne sprzedaże",
        body: "Handlowcy liczą z CRM-u, księgowość z faktur, a zarząd dostaje obie liczby na tym samym spotkaniu. Spotkanie zaczyna się od ustalania, która z nich jest prawdziwa, a nie od decyzji.",
      },
      {
        tag: "Efektywność",
        title: "Poniedziałek zaczyna się od eksportu",
        body: "Ktoś pobiera pliki z trzech systemów, skleja je w arkuszu i naprawia formuły, które znowu się rozjechały. Raport jest gotowy w południe i już wtedy opisuje miniony tydzień.",
      },
      {
        tag: "Procesy",
        title: "Rozliczenie odtwarzane na koniec miesiąca",
        body: "Prowizje, zwroty i należności liczy się wstecz, z maili i notatek, bo w trakcie miesiąca nikt nie zapisywał ich w jednym miejscu. Każde takie odtwarzanie kończy się dyskusją.",
      },
      {
        tag: "Ryzyko",
        title: "Zielony panel na martwych danych",
        body: "Źródło przestało zasilać raport, ale wykres wygląda normalnie, tylko się nie rusza. Nic nie świeci na czerwono, więc nikt tego nie zauważa, a decyzje zapadają na podstawie stanu, który już nie istnieje.",
      },
      {
        tag: "Technologia",
        title: "Arkusz, który urósł ponad swoje możliwości",
        body: "Zaczynał jako prosta lista, a dziś ma tysiąc wierszy, kilka zakładek i komórki, w których mieści się po parę informacji naraz. Działa, dopóki ktoś nie doda kolumny w złym miejscu.",
      },
      {
        tag: "Zespół",
        title: "Tylko jedna osoba wie, skąd bierze się ta liczba",
        body: "Raport składa ktoś, kto zna wszystkie wyjątki i ręczne korekty. Gdy jest na urlopie, raportu nie ma, a gdy raport jest, nikt inny nie potrafi go obronić.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Raport jako widok na dane, nie osobny dokument",
    answerLead:
      "Zaczynam od pytania, na które raport ma odpowiadać, i od tego, gdzie dziś rodzi się każda liczba. Potem wybieramy jedno zestawienie, które kosztuje najwięcej ręcznej pracy, i doprowadzam je do produkcji, zanim dojdą kolejne.",
    points: [
      {
        title: "Zdarzenie zapisane w chwili, gdy się dzieje",
        body: "Każda zmiana statusu zamówienia trafia do historii: z jakiego etapu, na jaki, kiedy i kto ją zrobił. Prowizja jest przypięta do zamówienia, z którego wynika, więc na koniec miesiąca nikt nie musi jej odtwarzać.",
      },
      {
        title: "Panel czyta ten sam stan, na którym działa proces",
        body: "Stan każdej sprawy, na przykład zamówienia albo wpłaty, jest jawnie zapisany w systemie, a panel pokazuje go na żywo. Sprawa w złym stanie jest widoczna od razu, a nie dopiero wtedy, gdy klient napisze z pytaniem, gdzie są jego pieniądze.",
      },
      {
        title: "Dane poprawiane przy wpisaniu, nie przy użyciu",
        body: "Gdy proces działa w arkuszu Google, poprawki mogą wskoczyć od razu przy edycji komórki: format numeru telefonu poprawia się sam, a dane stałego klienta uzupełniają się po jego numerze identyfikacyjnym. Wiersz jest poprawny w chwili zapisu, więc SMS nie trafia na źle zapisany numer, a stałego klienta nikt nie wpisuje od nowa.",
      },
      {
        title: "Stare liczby nie udają aktualnych",
        body: "Dwa typowe sposoby, w jakie panel kłamie: pokazuje metryki, których dane źródłowe dawno usunięto, albo zadanie synchronizacji zgłasza sukces, nie zapisując niczego. Dlatego liczby w panelu powinny być przeliczane ze źródła za każdym razem, a żaden przebieg nie powinien ogłaszać sukcesu, dopóki nie odczyta z powrotem tego, co zapisał.",
      },
      {
        title: "Uzgodnienie wiersz po wierszu, nie ocena na oko",
        body: "Przy przenoszeniu danych z płatnego systemu bez eksportu sprawdzanie na oko łatwo gubi pojedyncze wpisy, w tym takie, które później okazują się ważne, na przykład przyszłe rezerwacje pokazane jako wolne terminy. Wyłapuje to dopiero mechaniczne porównanie danych źródłowych z nową bazą. Import liczy się jako skończony wtedy, gdy takie porównanie się domyka, a nie wtedy, gdy ekran wygląda dobrze.",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile to kosztuje?",
        a: "Zależy od liczby źródeł i od tego, czy dane da się pobrać przez API, czy tylko z ręcznego eksportu. Pierwsza, 30-minutowa rozmowa jest bezpłatna. Po obejrzeniu, skąd dziś biorą się Twoje liczby, dostajesz widełki dla swojego przypadku, a nie ofertę napisaną w ciemno.",
      },
      {
        q: "Czy musimy porzucić arkusze?",
        a: "Nie zawsze. Przy kilkudziesięciu zamówieniach i jednej osobie obsługującej cały proces arkusz Google bywa właściwym narzędziem. Przestaje wystarczać, gdy jedna komórka zaczyna mieścić kilka informacji naraz, bo wtedy automat, który go czyta, zaczyna się mylić i pomijać wpisy, które powinien przetworzyć. Od tego momentu dane powinny należeć do bazy, a arkusz może zostać jako widok na nie.",
      },
      {
        q: "Czy do raportów potrzebne jest AI?",
        a: "Zwykle nie. Suma, średnia i porównanie z poprzednim miesiącem to zapytanie do bazy, które za każdym razem daje ten sam wynik i nie zużywa ani jednego tokenu. Model językowy ma sens tam, gdzie odpowiedzi nie da się policzyć wprost, na przykład przy krótkim streszczeniu zapytania od klienta. Wtedy pracuje na Twoich danych i nie jest pytany o liczby, które są w tabeli.",
      },
      {
        q: "Co, jeśli nasze dane są w złym stanie?",
        a: "To częsty punkt wyjścia i pierwsza część pracy, a nie przeszkoda. Zaczynam od mechanicznego porównania źródeł z tym, co trafia do raportu, bo sprawdzanie na oko regularnie przepuszcza brakujące wpisy. Lepiej poznać skalę problemu przed zbudowaniem panelu niż po.",
      },
      {
        q: "Czy budujesz hurtownie danych i systemy BI dla dużych firm?",
        a: "Nie, i nie będę udawał, że jest inaczej. Dobrze znam bazy operacyjne, na których firma pracuje na co dzień: uprawnienia, historię zdarzeń i raporty liczone prosto z nich. Hurtownia danych dla dużej organizacji to pokrewna, ale osobna specjalizacja. Jeśli jej potrzebujesz, powiem to na pierwszej rozmowie, zamiast brać projekt, którego nie dowiozę.",
      },
      {
        q: "Kto napisze kod i co, jeśli projekt jest większy?",
        a: "Kod piszą agenty AI. Ja odpowiadam za specyfikację, decyzję o architekturze, review, wdrożenie i za to, co się dzieje, gdy coś przestanie działać na produkcji. Gdy projekt potrzebuje więcej rąk, dołączają developerzy CetusPro, software house'u z Rzeszowa.",
      },
    ],
  },
  {
    slug: "nietypowe-procesy-ai",
    navLabel: "Nietypowe procesy",
    metaTitle: "Nietypowe procesy: automatyzacja, reguły i AI | Kamil Jan",
    metaDescription:
      "Automatyzacja procesów, których nie obsłuży gotowe narzędzie: rozliczenia komisowe, depozyty, umowy o dofinansowanie. Reguły w bazie, AI na krótkiej smyczy.",
    eyebrow: "NIETYPOWE PROCESY",
    h1: "Gdy Twój proces nie pasuje do żadnego gotowego narzędzia",
    lead: "Rozliczenie z dostawcą, którego towar stoi na Twojej półce. Wpłaty na kontener, który może się nie zapełnić. Umowa, w której jedno puste pole blokuje pieniądze. Takie procesy zwykle obsługuje arkusz i czyjaś pamięć. Buduję systemy, w których reguł pilnuje baza danych, a model dostaje tylko tę część pracy, przy której naprawdę pomaga.",
    micro: [
      "Reguły pilnowane przez bazę",
      "Model nie rusza pieniędzy",
      "Wyjątki spisane przed kodem",
    ],
    problemsEyebrow: "ZNASZ TO?",
    problemsTitle: "Sześć miejsc, w których nietypowy proces kosztuje najwięcej",
    problemsLead:
      "Gotowe narzędzia projektuje się pod typowy przypadek. Twoja przewaga często leży dokładnie w tym, co typowe nie jest.",
    problems: [
      {
        tag: "Dane",
        title: "Twój przypadek nie ma pola w żadnym formularzu",
        body: "Prowizja liczona inaczej dla każdego dostawcy, warunek zwrotu, wyjątek dla jednego klienta. Ląduje w dodatkowej kolumnie, w notatce albo w mailu, a tylko jedna osoba wie, gdzie tego szukać.",
      },
      {
        tag: "Efektywność",
        title: "Narzędzie obsługuje typową część, resztę robi się ręcznie",
        body: "Płacisz za system, który prowadzi proces do połowy. Druga połowa toczy się obok, w arkuszu i przez telefon, i zjada czas, który miał zostać zaoszczędzony.",
      },
      {
        tag: "Procesy",
        title: "Dwa zestawienia tego samego miesiąca się nie zgadzają",
        body: "Raport dla partnera powstaje z innych liczb niż te, których użyła kasa. Wiadomo tylko, że się różnią. Nie wiadomo, czyja arytmetyka jest błędna.",
      },
      {
        tag: "Ryzyko",
        title: "Jedno puste pole i pieniądze stoją",
        body: "Na wniosku, umowie albo rozliczeniu puste pole nie wygląda jak szkic, tylko jak udzielona odpowiedź. Wychodzi to dopiero wtedy, gdy ktoś po drugiej stronie odrzuci dokument.",
      },
      {
        tag: "Technologia",
        title: "Tam, gdzie nie ma wzorca, AI zgaduje tym samym pewnym tonem",
        body: "Procesu takiego jak Twój model najpewniej nigdy nie widział. Odpowiedź i tak brzmi przekonująco, a dotyczy Twoich pieniędzy i Twoich klientów.",
      },
      {
        tag: "Zespół",
        title: "Wszystko robi jedna osoba, bez drugiej pary oczu",
        body: "Ta sama osoba sprzedaje, liczy towar i zamyka miesiąc. Pomyłki po długim dniu nie ma kto wyłapać, a zasada czterech oczu zostaje na papierze.",
      },
    ],
    answerEyebrow: "JAK TO ROBIĘ",
    answerTitle: "Reguły w bazie, model na krótkiej smyczy",
    answerLead:
      "Nietypowy proces ma zwykle jedną rzecz, na której się zarabia, i kilka, na których można po cichu stracić. Zaczynam od spisania ich wszystkich, zanim powstanie pierwsza linijka kodu.",
    points: [
      {
        title: "Wyjątki spisane, zanim powstanie schemat",
        body: "Zanim powstanie pierwsza linijka kodu, warto przepuścić specyfikację przez kilka rund recenzji, z założeniem za każdym razem, że dokument jest błędny. Taka recenzja wyłapuje reguły, które inaczej ujawniłyby się dopiero na produkcji, na przykład rozliczenie, które obciążyłoby dostawcę za jego własny towar. Te reguły potem pilnują testy, nie pamięć jednej osoby.",
      },
      {
        title: "Pieniądze idą za stanem, nie za zdarzeniem",
        body: "Gdy kupujący wpłacają depozyt za udział we wspólnym zamówieniu, a zamówienie może się nie zapełnić, zwrot powinien być automatycznym skutkiem zmiany stanu w systemie, a nie przelewem, o którym ktoś musi pamiętać. Nikt nie płaci dwa razy i żaden depozyt nie zostaje w zawieszeniu.",
      },
      {
        title: "Dokument, którego system nie wygeneruje z dziurą",
        body: "Umowę o dofinansowanie albo inny dokument z licznymi warunkami może składać system z danych zlecenia: szablon Word z jawnie przypisanymi polami, zamieniany na PDF. Brak wymaganego pola zatrzymuje generowanie, zamiast wypuścić dokument, który tylko wygląda na kompletny.",
      },
      {
        title: "Model formułuje, kod wykonuje",
        body: "Automatyczne telefony o statusie zamówienia i SMS-y mogą iść same z procesu zamówień, po polsku i po angielsku. Tam, gdzie w rozmowie pracuje model, może wyłącznie sformułować zdanie i wybrać ścieżkę: każdą zmianę zamówienia i każdą wysyłkę wykonuje deterministyczny kod. Dwukierunkowy agent głosowy wymaga więcej dopracowania niż skrypt czytany przez syntezator, ale ta granica nie zmienia się od pierwszej wersji.",
      },
      {
        title: "System tam, gdzie człowiek już pracuje",
        body: "Gdy proces prowadzi osoba, której całym miejscem pracy jest arkusz Google, całe zaplecze może działać właśnie tam: wycena w panelu bocznym, akceptacja oferty jednym kliknięciem w linku z maila, faktura VAT w PDF na dysku i SMS wysyłany automatycznie. Nietypowy proces nie zawsze potrzebuje nowej platformy.",
      },
      {
        title: "Poprawną odpowiedź ustala ktoś z branży",
        body: "Budując system dla branży, której nie znam od środka, nie zgaduję zasad: to osoba pracująca w tym fachu definiuje, co jest poprawną odpowiedzią. Liczby w wycenie powinny wynikać z rzeczywistych, zamkniętych spraw, nie z oszacowania modelu. Swoją branżę znasz Ty: moja robota to zamienić tę wiedzę w reguły.",
      },
    ],
    faqTitle: "Pytania, które padają najczęściej",
    faq: [
      {
        q: "Ile to kosztuje?",
        a: "Zależy od tego, ile wyjątków ma proces i czy przechodzą przez niego pieniądze albo dokumenty dla kogoś z zewnątrz. Pierwsza rozmowa jest bezpłatna. Po obejrzeniu procesu dostajesz widełki dla swojego przypadku, a nie ofertę napisaną w ciemno.",
      },
      {
        q: "Mój proces jest naprawdę nietypowy. Skąd będziesz wiedział, jak działa?",
        a: "Nie zakładam, że wiem. Uczę się z prawdziwych przypadków, nie z opisu procesu: siedzę przy sprawach, które akurat się pojawiają, i rozwiązuję problemy razem z osobą, która na co dzień wykonuje tę pracę, zamiast przeprowadzić jeden wywiad i zniknąć do kodu. To ona definiuje, co jest poprawną odpowiedzią. Ja wnoszę metodę i odpowiedzialność za to, żeby działało w produkcji.",
      },
      {
        q: "Czy AI poradzi sobie tam, gdzie nie ma schematu?",
        a: "Właśnie tam najłatwiej o pomyłkę, która brzmi pewnie. Dlatego model dostaje zadania, w których pomyłka nie przesuwa pieniędzy ani zamówień, czyli sformułowanie wiadomości i wybór ścieżki, a liczy, rozlicza i wysyła deterministyczny kod. Formalnego zestawu testów jakości modelu jeszcze nie mam i mówię to od razu.",
      },
      {
        q: "Czy nie prościej dopasować proces do gotowego narzędzia?",
        a: "Czasem tak, a wtedy mówię to wprost. Jeśli nietypowość wynika z przyzwyczajenia, taniej zmienić przyzwyczajenie i kupić gotowe narzędzie. Budować warto tam, gdzie na tej nietypowej części zarabiasz albo gdzie pomyłka kosztuje pieniądze. Czasem najlepszym systemem okazuje się arkusz ze skryptem.",
      },
    ],
  },
];

const EN: Service[] = [
  {
    slug: "sprzedaz-i-marketing",
    navLabel: "Sales and marketing",
    metaTitle: "Sales and marketing automation | Kamil Jan",
    metaDescription:
      "Sales and marketing automation: every lead with its source, quote and contract from one price list, and email sending that runs on hard limits.",
    eyebrow: "SALES AND MARKETING",
    h1: "From lead to signed contract without retyping anything on the way",
    lead: "I automate the path from first contact to signed contract: where the lead came from, who follows up and when, where the price in the quote comes from, and what happens after the signature. Salespeople should be talking to customers, not moving data between the inbox, a spreadsheet and the CRM.",
    micro: [
      "Every lead with its source",
      "One price everywhere",
      "Automation that knows when to stop",
    ],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six places where sales leak",
    problemsLead:
      "Deals are rarely lost on the product. More often on what happens between the first contact and the signature.",
    problems: [
      {
        tag: "Data",
        title: "Nobody knows which ad brought the customer",
        body: "The lead arrives by email or phone and nobody records where from. A month later the ad budget gets split by gut feeling, because the data has no answer.",
      },
      {
        tag: "Efficiency",
        title: "The quote gets assembled by hand after every call",
        body: "The meeting ends with a promise to send a price, and that evening someone works it out in a spreadsheet. The number said at the table and the number in the email aren't always the same.",
      },
      {
        tag: "Process",
        title: "Following up waits for someone's free afternoon",
        body: "The reminder goes out when somebody finds a moment. In the first busy week nobody does, and the lead that was warm on Monday isn't by Friday.",
      },
      {
        tag: "Risk",
        title: "Bulk sending burns the domain your invoices go out from",
        body: "A bought list and a sending tool produce a lot of email in one afternoon. The bounces and spam complaints land on the same domain the company sends quotes and invoices from, and in a small market there's no second chance.",
      },
      {
        tag: "Tooling",
        title: "Signed, but never invoiced",
        body: "E-signature, billing and the CRM each work on their own, and none of them knows what the others did. The customer signed, the invoice never went out, and nobody notices until the payment is missing.",
      },
      {
        tag: "Team",
        title: "Only the best salesperson knows the order of steps",
        body: "When the deposit invoice goes out, what to promise on timing, how to handle a change in scope. That knowledge lives in one head, and a new hire learns it by making mistakes with real customers.",
      },
    ],
    answerEyebrow: "HOW I BUILD",
    answerTitle: "The system keeps the order of steps, a person has the conversation",
    answerLead:
      "Each mechanism below solves one specific moment where sales tends to slip: from first contact to signature.",
    points: [
      {
        title: "A lead lands in the database with its source",
        body: "A lead's source, the campaign and the country, is written onto the record the moment it comes in, so \"which ad brought this\" has an answer in the data rather than in somebody's memory. Leads land in one dashboard, and a notification tells the team when a deal needs a person.",
      },
      {
        title: "One price in the call, the quote and the contract",
        body: "The whole price list sits in one place that the configurator, the offer, the contract and the AI assistant all read. A call ends with a priced offer on screen instead of a promise to send something over, and the price can't drift between the call and the invoice. A rep can price an offer on their own phone, sometimes with the customer standing there.",
      },
      {
        title: "Contracts from data, signature and billing tied to state",
        body: "Customer details and the chosen package in, the correct contract out, with no template edited by hand each time. E-signature and billing report back automatically into one system that tracks the deal's status, so it can't quietly end up signed but never invoiced.",
      },
      {
        title: "Outreach with the brakes fitted before the engine",
        body: "Sending runs on hard limits: a capped number of emails per recipient domain across the whole history, a capped number of new companies a day, business hours only, public holidays skipped. Every run starts by checking recent days for bounces. When a customer replies, the automation stops and a person takes over.",
      },
      {
        title: "Sales stages recorded as events in the system",
        body: "Every stage of the sales pipeline carries what to do now and roughly what to tell the client, and every move to the next stage leaves a record in the history. Before a risky jump, such as starting work without a signed contract, the system stops and asks for confirmation.",
      },
      {
        title: "Ad creative starts with research, not a prompt",
        body: "Before any image exists there's a brand brief pulled from the live site, a customer profile with concerns ranked by intensity, and a decision about what this audience reads as credible. The copy leads with the reader's problem, not the offer, and a person approves or kills every creative.",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does it cost?",
        a: "It depends on how many tools need connecting and whether a CRM already exists or still has to be built. After a look at how a lead becomes a contract today, you get a range for your case. The first 30-minute conversation is free.",
      },
      {
        q: "Will the automation write to customers on my behalf?",
        a: "First contact and reminders, yes, within limits we agree on. The conversation with a person, no: the automation stops the moment someone replies. Reply detection and a block on further sends have to work from day one, so a company that declined never gets another email.",
      },
      {
        q: "We already have a CRM. Do we need to replace it?",
        a: "Usually not. If the CRM can connect to other tools, I connect the forms, the quote, the signature and billing to it. I suggest replacing it only when the tool genuinely blocks the sales process, and I say so before quoting.",
      },
      {
        q: "Can AI write our ads and emails?",
        a: "It helps, given a brief. Creative built without research on the brand and the audience looks fake, which is why research comes before the prompt. Emails get written to fixed rules, and every message goes through a check before sending, because a model can add a line nobody confirmed. What I don't have is data on exactly how your ads will sell, and I won't pretend otherwise.",
      },
      {
        q: "Who builds it?",
        a: "AI coding agents write the code; I own the spec, the architecture, the review, the deploy and how it runs in production. When a project needs a bigger team, CetusPro joins, a Rzeszów software house.",
      },
    ],
  },
  {
    slug: "obsluga-klienta",
    navLabel: "Customer service",
    metaTitle: "Customer service automation | Kamil Jan",
    metaDescription:
      "Customer service automation built on your data: updates sent by the system, answers only from recorded facts, and a person where one is needed.",
    eyebrow: "CUSTOMER SERVICE",
    h1: "A customer shouldn't have to call to find out where their order is",
    lead: "I automate the part of customer service that repeats: order updates, confirmations, quote approvals and the questions that come in every day. The conversations that genuinely need a person stay with people, and when the automation hands a case over is a written rule, not the model's call.",
    micro: [
      "Updates sent by the system",
      "Answers only from your data",
      "The rest goes to a person",
    ],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six places where customer service loses time and trust",
    problemsLead:
      "None of them looks serious on its own. Together they decide whether a customer comes back or goes looking for someone else.",
    problems: [
      {
        tag: "Data",
        title: "A status question starts an investigation",
        body: "A customer asks where their order is, and the answer sits in a spreadsheet, a chat thread and the memory of someone who happens to be on holiday. Answering a simple question means chasing three people.",
      },
      {
        tag: "Efficiency",
        title: "The same sentence for the fortieth time",
        body: '"Your order shipped." "It cleared customs." "The part has arrived." The same messages typed by hand, one after another, eat the day of someone who could be helping a customer with a real problem.',
      },
      {
        tag: "Process",
        title: "The customer's reply gets lost in the inbox",
        body: "The customer accepts the quote or declines it, but nobody moves that into the system. The order stalls and a warm lead cools, because the decision is stuck in an email nobody flagged.",
      },
      {
        tag: "Risk",
        title: "An automation that promised too much",
        body: "A chatbot gave a delivery date nobody confirmed, or a price from an outdated list. Then somebody has to call and walk it back, and trust is lost faster than it was built.",
      },
      {
        tag: "Tooling",
        title: "The same message went out twice",
        body: "A retry after a network error, a double click, two systems sending the same thing. The customer gets duplicate texts, or another email after already saying they're not interested.",
      },
      {
        tag: "Team",
        title: "Service runs on one person",
        body: "Only they know what each customer was promised and where their case stands. When they're away, customers hear \"we'll call you back\" and wait.",
      },
    ],
    answerEyebrow: "HOW I DO IT",
    answerTitle:
      "The automation says what the system already knows. Everything else goes to a person",
    answerLead:
      "I don't start with a chatbot. I start with where the answer to a customer's question actually comes from, and only then decide what can send it without a human.",
    points: [
      {
        title: "Status sent from a transition, not from memory",
        body: "An order moves through named stages held in the system, not in anyone's head. The status SMS leaves from one specific stage and nowhere else, so it can't go out twice or from a stage the order never really reached. By the time a customer asks where their order is, the updates are already on their phone, and nobody had to remember to send them.",
      },
      {
        title: "Repetitive conversations without a person, but with a boundary",
        body: "Status calls and SMS can run unattended, in Polish and English. A status call is a fixed script read by text-to-speech, with no language model involved. In a two-way voice agent the model only phrases the sentence and picks the route; every order change and every send is done by ordinary, predictable code. This kind of agent still needs hardening, and I don't call it a finished product.",
      },
      {
        title: "Approval in one click, recorded by the system",
        body: "The quote goes out by email with a link. The click changes the order's status and stamps the time of acceptance; the invoice and the SMS to the customer follow. The customer's decision doesn't wait for someone to copy it by hand from an email into the order sheet.",
      },
      {
        title: 'An assistant that says "I don\'t know"',
        body: "The assistant on kamiljan.com answers only from facts I wrote down and approved beforehand. When something isn't there, it says so and points to me instead of guessing. The same rule applies to an assistant for your customers: it answers from your prices and terms, not from the model's general knowledge.",
      },
      {
        title: "Reply detection before the first send",
        body: "Reply detection and a block on further sends have to work before the first message goes out, not get added afterward. Without it a warm lead waits too long for an answer, and a customer who already declined gets more messages.",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "Will a chatbot replace my service team?",
        a: "No, and that's not what I build it for. The automation takes the repetitive messages and the questions whose answer is already in the system. A conversation that needs a decision, a complaint, or an unusual case goes to a person, and that handoff is a written rule, not the model's judgement.",
      },
      {
        q: "What if the assistant tells a customer something wrong?",
        a: "That's why I design it not to reach past recorded facts and not to take any action on its own. A price or a date comes from the system or not at all, and an order change is made by ordinary code, not the model. When it has no answer, it says so and passes the case on. I don't have a formal eval harness for model quality yet, and I say that up front.",
      },
      {
        q: "Where do we start?",
        a: 'With the one question customers ask most, for example "where is my order?". If the answer can be read from the system, we send it automatically from the right stage. The first conversation is 30 minutes and free: we go through one process and I tell you plainly where to start.',
      },
      {
        q: "What does it cost?",
        a: "It depends on how many channels are involved, where the data comes from, and whether the system underneath already knows what stage a customer's case is at. You get a range once I've seen the process. Bigger builds run with CetusPro, a Rzeszów software house whose developers join when a project needs the headcount.",
      },
      {
        q: "Who writes the code?",
        a: "AI coding agents write it. I own the spec, the architecture, the review of what comes back, the deploy, and what happens in production when a customer on the other end receives a message. Every system on this page was built that way.",
      },
    ],
  },
  {
    slug: "administracja-i-dokumenty",
    navLabel: "Admin and documents",
    metaTitle: "Administration and document automation | Kamil Jan",
    metaDescription:
      "Administration and document automation: contracts and invoices built from data you already hold, approvals recorded in the system, deadlines in view.",
    eyebrow: "ADMINISTRATION AND DOCUMENTS",
    h1: "A contract shouldn't depend on who retyped it today",
    lead: "I automate how documents move through a company: contracts and invoices assembled from data already sitting in the CRM or a spreadsheet, approvals recorded in the system instead of an email thread, deadlines visible in the system rather than in someone's calendar. My first goal is a system that won't issue a wrong document. Speed comes as a side effect.",
    micro: [
      "Documents from data, not copies",
      "Approvals recorded in the system",
      "Deadlines tracked automatically",
    ],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six things that happen in every back office",
    problemsLead:
      "Administration rarely breaks dramatically. It breaks quietly: one typo, one missed deadline, one document in the wrong version.",
    problems: [
      {
        tag: "Data",
        title: "Five versions of the same contract template",
        body: "The shared drive holds contract_final, contract_final2 and contract_new. Nobody is sure which one has the current terms, so everyone uses whichever they opened last, and the client receives clauses that no longer apply.",
      },
      {
        tag: "Efficiency",
        title: "Client details retyped into every document",
        body: "Company name, tax ID, address and amount are already in the CRM and the quote. Somebody still assembles the contract, the handover form and the invoice by copying them field by field between windows. Every time, from scratch.",
      },
      {
        tag: "Process",
        title: "A document is waiting for a signature, and nobody knows whose",
        body: "The contract went out for approval by email and stalled in the inbox of someone who is travelling. You find out when the client asks why they still haven't received it.",
      },
      {
        tag: "Risk",
        title: "A blank field that looks like an answer",
        body: "A missing number, the wrong VAT rate or a dropped clause doesn't look like a draft. It looks like a finished document and goes out as one, then comes back as a correction, a rejected application or a dispute.",
      },
      {
        tag: "Tooling",
        title: "Your own records locked in someone else's software",
        body: "Contracts, clients and order history sit in a subscription with no export and no API you can reach. Getting your own data back means someone reading it off the screen.",
      },
      {
        tag: "Team",
        title: "Deadlines live in one person's calendar",
        body: "Contract end dates, insurance expiry, payment terms. A reminder exists only if someone set it for themselves, and it goes on holiday with them.",
      },
    ],
    answerEyebrow: "HOW I DO IT",
    answerTitle: "A document should follow from data, not from retyping",
    answerLead:
      "For every field in a document I ask where it comes from. If that information already sits somewhere in the company, nobody should be typing it a second time.",
    points: [
      {
        title: "A contract built from the record, not from a copied template",
        body: "Data from the record goes into a template with named fields, and a finished Word document and PDF come out. A contract or an offer can be generated this way from a phone by whoever is in the field, and a missing required field stops generation instead of shipping a document with a hole in it. The template keeps its own history, so every clause change is visible.",
      },
      {
        title: "Approval as an event in the system",
        body: "Consent shouldn't be inferred from an email thread. The customer clicks a link in the quote, and the system changes the order's status and records the time, even when orders are run out of a spreadsheet. Every job can sit in a named stage, and notifications fire from stage changes, so you can see where it stands without searching inboxes.",
      },
      {
        title: "An issued document doesn't change",
        body: "A signed contract is the text that was signed, not whatever today's template renders. Each signed contract stores its own wording, so a later change to the terms never touches documents already signed. An invoice number is unique and can't be changed once issued. The system enforces that, not the screen, because the screen is where a tired person clicks twice.",
      },
      {
        title: "Deadlines you see before they pass",
        body: "An insurance or inspection expiry date is a field in the system, not an entry in someone's calendar. A dashboard can show every vehicle or contract whose term lapses within the next 30 days. One caveat worth stating upfront: if those dates are entered by hand, the alert is only as good as the last date someone typed in.",
      },
      {
        title: "The data belongs to the company, not the subscription",
        body: "When clients, bookings and a contract template sit in a paid product with no export and no way to reach the data, getting them back takes a dedicated project: pulling the data out, building the replacement and checking the migration row by row, not by eye. A visual check alone easily drops individual entries, which is why a mechanical comparison has to close before a migration counts as finished. The data should end up in the company's own database, with export a single query away rather than a separate project.",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does it cost?",
        a: "It depends on how many kinds of documents there are, which systems they draw data from, and whether you need electronic signatures. The first conversation takes 30 minutes and is free. You get a range after we've looked at one specific document flow, not before.",
      },
      {
        q: "Do we have to replace our CRM or accounting software?",
        a: "Usually not. If the tool offers a way to reach its data, even just an export, documents can draw from it. Sometimes the best system is the spreadsheet someone already works in: at dozens of orders and one person running the desk, a Google spreadsheet handles quotes, acceptances, VAT invoices and texts at zero infrastructure cost.",
      },
      {
        q: "Will the e-signatures and the archive be legally compliant?",
        a: "I don't build e-signature myself. I connect a specialised provider, because a vendor that does only this is further ahead than I am. Which documents need a qualified signature and how long to keep them, we settle with your lawyer or accountant. I'm not a lawyer and don't pretend to be. My part is a system that enforces what you agree on: unique numbering, no edits after issue, access only for the people entitled to it.",
      },
      {
        q: "Who will see the data in these documents?",
        a: "Only the people who should, and the system enforces it, not a hidden button. Different roles, a salesperson, an auditor, an administrator, can work on the same data while each sees only their slice. A missing rule means no access, not full access. I check permissions against the running system, not only the document that describes it.",
      },
      {
        q: "Who builds it, and what if the project is bigger?",
        a: "AI coding agents write the code. I own everything around it: the spec, the architecture, the review, the deploy and how it runs in production. Bigger builds run with CetusPro, a Rzeszów software house whose developers join when a project needs the headcount.",
      },
    ],
  },
  {
    slug: "hr-i-rekrutacja",
    navLabel: "HR & recruitment",
    metaTitle: "HR and recruitment automation | Kamil Jan",
    metaDescription:
      "HR and recruitment automation: candidates in one place, staged onboarding and offboarding, HR documents built from data. Decisions about people stay human.",
    eyebrow: "HR & RECRUITMENT",
    h1: "HR with time for people, not spreadsheets",
    lead: "I automate the part of HR and recruitment that is repeatable logistics: collecting applications, moving documents, the checklists when someone joins or leaves, leave requests. I don't hand decisions about people to an automation. A person makes them: just with complete data and without hunting through several places for it.",
    micro: [
      "Every candidate in one place",
      "A person makes the call",
      "Access enforced by the database",
    ],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six places HR loses time, and candidates",
    problemsLead:
      "Much of recruitment and HR is logistics: moving data, chasing deadlines, collecting signatures. That part can be written into a system. The conversations with people can't.",
    problems: [
      {
        tag: "Data",
        title: "One candidate in the inbox, the spreadsheet and the job board",
        body: "CVs arrive by email, through a job board and by referral, and each source lands somewhere else. Nobody knows whether the same person applied last month, or how that ended.",
      },
      {
        tag: "Efficiency",
        title: "The same employee data typed in several times",
        body: "Form to contract, contract to the HR and payroll system, from there to the access list and the shift schedule. Every retype is another chance at a wrong name, date or rate.",
      },
      {
        tag: "Process",
        title: "Onboarding depends on who happens to remember",
        body: "Laptop, accounts, health and safety training, the medical check, a contract to sign. The list lives in someone's head or an old email, so the new hire spends day one waiting for access instead of working.",
      },
      {
        tag: "Risk",
        title: "A former employee still has access",
        body: "When someone leaves, one tool is easy to miss. Email, the CRM or a drive full of customer data stays open until somebody notices by accident, and candidates' personal data sits in an inbox longer than anyone planned.",
      },
      {
        tag: "Tooling",
        title: "An HR system was bought, the work still happens in a spreadsheet",
        body: "Off-the-shelf software has its own model of the process, and it doesn't match yours. The request goes through the system, the approval through chat, and somebody still assembles the month-end summary by hand.",
      },
      {
        tag: "Team",
        title: "Recruiters booking slots instead of talking to people",
        body: "Most of the time goes not on assessing candidates but on correspondence: confirmations, reminders, finding a slot that suits three people. Meanwhile a good candidate accepts another offer.",
      },
    ],
    answerEyebrow: "HOW I DO IT",
    answerTitle: "Automation for the logistics, people for the decisions",
    answerLead:
      "First I separate the parts of HR that are repeatable logistics from the parts that are judgement about a person. I automate only the first.",
    points: [
      {
        title: "One candidate database, fed automatically",
        body: "Applications from the website form, the recruitment inbox and job boards reach one place automatically. The system flags duplicates by email and phone, the candidate gets an acknowledgement straight away, and the interview slot comes from the calendar rather than a hand-written email.",
      },
      {
        title: "Joining and leaving as stages, not a list in an email",
        body: "Onboarding and offboarding get named stages and only the transitions declared legal, the same way a well-designed order process works. A task for IT, a signature request or a reminder fires from one specific transition, so a stage can't be skipped and the same task can't go out twice. When someone leaves, the list of accounts to close builds itself.",
      },
      {
        title: "HR documents built from data, not from a template filled by hand",
        body: "Contracts, amendments and medical-check referrals are generated from the employee record: a Word template with named fields, output as PDF. A missing required field stops generation instead of letting a document out with a gap. Other documents generated from data, such as offers or contracts field sales teams use daily, can work on the same principle.",
      },
      {
        title: "Requests and approvals in one flow",
        body: "A leave or expense request goes to the right manager and, once approved, into the team calendar and the summary for payroll. The manager gets a reminder when a request has waited too long, and nobody assembles the list by hand at month-end.",
      },
      {
        title: "Access to personal data enforced by the database",
        body: "Salaries, sick leave and performance reviews are visible only to the roles allowed to see them, and database policies decide that, not a hidden button. Data of candidates who weren't hired is deleted once the retention period you set has passed.",
      },
      {
        title: "AI tidies, a person judges",
        body: "A model can move experience and languages from a CV into a standard card, or summarise an application. It doesn't reject candidates and it doesn't score them. The assistant on this site works the same way: it answers only from recorded facts, and when it doesn't know, it says so instead of guessing.",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does HR automation cost?",
        a: "It depends on how many processes and systems need connecting: taking in applications is a different scale from onboarding with accounts, documents and a payroll summary. The first conversation is free, and you get a range once I've seen the process, not before.",
      },
      {
        q: "Will AI reject candidates?",
        a: "Not in the systems I build. A model can tidy an application or summarise a CV, but the decision on who moves forward stays with the person accountable for it. A keyword filter also rejects the people who described their experience in different words.",
      },
      {
        q: "Will you replace our HR and payroll system?",
        a: "No, and I won't suggest it. Payroll and employment law belong to a specialised system and the person who knows it. I build what happens around it: collecting the data, the approval flow, and handing a finished summary to payroll.",
      },
      {
        q: "How would you know how HR works?",
        a: "I'm not an HR specialist and I don't pretend to know employment law: the content of contracts and policies comes from your HR team or your lawyer. I know recruitment from the employer's side, from a company that hires and builds its own team. Beyond that I work the way I always do: the person who does a given job defines what a correct result looks like, and I turn that knowledge into a system.",
      },
      {
        q: "What about candidates' and employees' personal data?",
        a: "The code stays in your repository and the data in your database. Access is decided by permissions in the database, not in the interface. Retention periods are set by your data protection officer or lawyer; the system makes sure they're kept. Integration keys live in a vault, not in the code.",
      },
      {
        q: "What if the project is bigger than one person?",
        a: "Then CetusPro, a software house from Rzeszów, joins the build. The spec, the architecture and the review stay with me, as they do on smaller builds.",
      },
    ],
  },
  {
    slug: "dane-i-raporty",
    navLabel: "Data & reporting",
    metaTitle: "Data and reporting automation for business | Kamil Jan",
    metaDescription:
      "Data and reporting automation: figures computed from one source, not stitched together from spreadsheets. Stale data shows at once, not at decision time.",
    eyebrow: "DATA & REPORTING",
    h1: "A report built from one source, not five spreadsheets",
    lead: "I build reports and dashboards computed from the same data the company runs on every day, no stitching files together, no hand-fixed formulas. And when data stops arriving, the report should say so plainly instead of showing last week's numbers as current.",
    micro: ["One source of numbers", "Missing data shows at once", "No stitched spreadsheets"],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six reasons nobody trusts the report",
    problemsLead:
      "A report whose figures need checking saves no time. It only moves the work from building the report to verifying it.",
    problems: [
      {
        tag: "Data",
        title: "Two reports, two different sales figures",
        body: "The sales team counts from the CRM, accounting from the invoices, and management gets both numbers in the same meeting. The meeting starts with working out which one is right, not with a decision.",
      },
      {
        tag: "Efficiency",
        title: "Monday starts with an export",
        body: "Someone downloads files from three systems, glues them together in a spreadsheet and repairs the formulas that broke again. The report is ready by noon, and by then it describes last week.",
      },
      {
        tag: "Process",
        title: "Settlements rebuilt at month-end",
        body: "Commissions, refunds and amounts owed get worked out backwards from emails and notes, because nobody recorded them in one place during the month. Every rebuild ends in an argument.",
      },
      {
        tag: "Risk",
        title: "A green dashboard on dead data",
        body: "The source stopped feeding the report, but the chart looks normal. It just doesn't move. Nothing turns red, so nobody notices, and decisions get made on a state that no longer exists.",
      },
      {
        tag: "Tooling",
        title: "A spreadsheet that outgrew itself",
        body: "It started as a simple list. Now it has a thousand rows, a few tabs and cells holding several facts at once. It works until someone adds a column in the wrong place.",
      },
      {
        tag: "Team",
        title: "Only one person knows where that number comes from",
        body: "The report is assembled by someone who knows every exception and manual correction. When they're on holiday there is no report, and when there is one, nobody else can defend it.",
      },
    ],
    answerEyebrow: "HOW I BUILD",
    answerTitle: "The report as a view of the data, not a separate document",
    answerLead:
      "I start from the question the report has to answer and from where each number is born today. Then we pick the one report that costs the most manual work, and I take it to production before the next one starts.",
    points: [
      {
        title: "An event recorded the moment it happens",
        body: "Every order status change goes into a history: from which stage, to which, when, and by whom. Commissions attach to the order that generated them, so nobody has to rebuild them at month-end.",
      },
      {
        title: "The dashboard reads the same state the process runs on",
        body: "The state of every case, an order or a payment, is recorded explicitly in the system, and the dashboard shows it live. A case stuck in the wrong state is visible straight away, not when a customer writes to ask where their money went.",
      },
      {
        title: "Data fixed on entry, not at the point of use",
        body: "When a process runs in Google Sheets, fixes can happen the moment a cell is edited: the phone number format corrects itself, and a returning customer's details fill in from their ID number. The row is correct the moment it's saved, so texts don't go to a badly formatted number and nobody retypes a repeat customer.",
      },
      {
        title: "Stale numbers don't pass as current",
        body: "Two common ways a dashboard lies: it keeps showing metrics whose source data was deleted long ago, or a sync job reports success while writing nothing. Numbers should be recomputed from source every time, and no run should claim success until it reads back what it wrote.",
      },
      {
        title: "Reconciled row by row, not judged by eye",
        body: "When data moves off a paid system with no export, a visual check alone easily drops individual entries, including ones that turn out to matter, such as future bookings shown as free slots. Only a mechanical comparison of the source data against the new database catches that. An import counts as finished when that comparison closes, not when the screen looks right.",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does it cost?",
        a: "It depends on how many sources there are and whether the data comes out through an API or only a manual export. The first 30-minute conversation is free. Once I've seen where your numbers come from today, you get a range for your case rather than a proposal written blind.",
      },
      {
        q: "Do we have to give up spreadsheets?",
        a: "Not always. At dozens of orders and one person running the whole process, a Google Sheet can be the right tool. It stops being enough when one cell starts holding several facts, because that's when the automation reading it starts getting confused and skipping entries it should process. Past that point the data belongs in a database, and the sheet can stay on as a view.",
      },
      {
        q: "Do reports need AI?",
        a: "Usually not. A sum, an average and a comparison with last month are a database query that gives the same result every time and costs zero tokens. A language model makes sense where the answer can't be computed directly, such as a short summary of a customer enquiry. Then it works from your data and is never asked for numbers a table already holds.",
      },
      {
        q: "What if our data is in bad shape?",
        a: "That's a common starting point and the first part of the job, not an obstacle. I begin with a mechanical comparison of the sources against what reaches the report, because a visual check regularly lets missing entries through. Better to learn the size of the problem before building a dashboard than after.",
      },
      {
        q: "Do you build data warehouses and BI for large companies?",
        a: "No, and I won't pretend otherwise. I know operational databases well, the ones a company runs on every day: permissions, event history, and reports computed straight from them. An enterprise data warehouse is an adjacent but separate specialism. If that's what you need, I'll say so on the first call rather than take on a project I can't deliver.",
      },
      {
        q: "Who writes the code, and what if the project is bigger?",
        a: "AI coding agents write the code. I own the spec, the architecture call, the review, the deploy, and what happens when something breaks in production. When a project needs more hands, developers from CetusPro, a Rzeszów software house, join in.",
      },
    ],
  },
  {
    slug: "nietypowe-procesy-ai",
    navLabel: "Unusual processes",
    metaTitle: "Unusual processes: automation, rules and AI | Kamil Jan",
    metaDescription:
      "Automating processes no off-the-shelf tool fits: consignment settlements, pooled deposits, funding contracts. Rules in the database, AI on a short leash.",
    eyebrow: "UNUSUAL PROCESSES",
    h1: "When your process doesn't fit any off-the-shelf tool",
    lead: "Settling with a supplier whose stock sits on your shelf. Deposits toward a container that might never fill. A contract where one blank field holds up the money. Processes like these usually run on a spreadsheet and somebody's memory. I build systems where the database enforces the rules and the model gets only the part of the work where it genuinely helps.",
    micro: [
      "Rules enforced by the database",
      "The model never moves money",
      "Exceptions written down before code",
    ],
    problemsEyebrow: "SOUND FAMILIAR?",
    problemsTitle: "Six places where an unusual process costs the most",
    problemsLead:
      "Off-the-shelf tools are built for the typical case. Your edge often sits exactly in the part that isn't typical.",
    problems: [
      {
        tag: "Data",
        title: "Your case has no field in any form",
        body: "A commission calculated differently per supplier, a refund condition, an exception for one customer. It ends up in an extra column, a note or an email, and only one person knows where to look.",
      },
      {
        tag: "Efficiency",
        title: "The tool handles the typical part, the rest is done by hand",
        body: "You pay for a system that runs the process halfway. The other half happens beside it, in a spreadsheet and on the phone, and eats the time it was meant to save.",
      },
      {
        tag: "Process",
        title: "Two reports for the same month disagree",
        body: "The report for your partner is built from different numbers than the till used. All anyone can tell is that they differ, not whose arithmetic is wrong.",
      },
      {
        tag: "Risk",
        title: "One blank field and the money stalls",
        body: "On an application, a contract or a settlement, a blank field doesn't look like a draft. It looks like an answer given, and it surfaces only when someone on the other side rejects the document.",
      },
      {
        tag: "Tooling",
        title: "Where there's no pattern, AI guesses in the same confident tone",
        body: "A model has most likely never seen a process like yours. The answer still sounds convincing, and it concerns your money and your customers.",
      },
      {
        tag: "Team",
        title: "One person does everything, with no second pair of eyes",
        body: "The same person sells, counts the stock and closes the month. Nobody catches the mistake made at the end of a long day, and the four-eyes rule exists only on paper.",
      },
    ],
    answerEyebrow: "HOW I DO IT",
    answerTitle: "Rules in the database, the model on a short leash",
    answerLead:
      "An unusual process usually has one thing that makes the money and several where money can be lost quietly. I start by writing all of them down before the first line of code exists.",
    points: [
      {
        title: "Exceptions written down before the schema",
        body: "Before the first line of code, a spec is worth running through several rounds of review, each time assuming the document is wrong. That kind of review catches rules that would otherwise only surface in production, such as a settlement that would invoice a supplier for their own goods. Tests hold those rules afterward, not one person's memory.",
      },
      {
        title: "Money follows state, not events",
        body: "When buyers pay a deposit for a slot in a shared order that might not fill, the refund should be an automatic result of a state change in the system, not a transfer somebody has to remember. Nobody is charged twice and no deposit is left in limbo.",
      },
      {
        title: "A document the system won't produce with a hole in it",
        body: "A funding contract, or any document with many conditions, can be built from the order data: a Word template with explicit field bindings, rendered to PDF. A missing required field stops generation instead of producing a document that only looks complete.",
      },
      {
        title: "The model phrases, code acts",
        body: "Automated status calls and texts can fire from the order flow on their own, in English and Polish. Where a model takes part in a call it can only phrase a sentence and pick a route: every order change and every send is done by deterministic code. A two-way voice agent needs more hardening than a script read by text-to-speech, but that boundary hasn't moved since the first version.",
      },
      {
        title: "The system goes where the person already works",
        body: "When a process is run by someone whose whole working world is a spreadsheet, the whole back office can live there too: pricing in a sidebar, one-click offer acceptance from a link in the email, VAT invoices as PDFs in Drive and a text sent automatically. An unusual process doesn't always need a new platform.",
      },
      {
        title: "Someone from the trade defines the correct answer",
        body: "Building a system for a trade I don't know from the inside means not guessing the rules: the person who does that work defines what a correct answer is. Labour times in a quote should come from real, closed jobs, not a model's estimate. You know your trade: my job is turning that knowledge into rules.",
      },
    ],
    faqTitle: "Questions I get asked",
    faq: [
      {
        q: "What does it cost?",
        a: "It depends on how many exceptions the process has and whether money or documents pass through it to someone outside the company. The first conversation is free. After looking at the process you get a range for your case, not a proposal written blind.",
      },
      {
        q: "My process really is unusual. How will you know how it works?",
        a: "I don't assume I do. I learn from real cases, not from a description of the process: sitting with the work as it comes in and solving problems alongside the person who does it every day, instead of one interview and disappearing to write code. That person defines what a correct answer is. I bring the method and the responsibility for it working in production.",
      },
      {
        q: "Can AI handle work that has no pattern?",
        a: "That's exactly where a confident-sounding mistake is easiest. So the model gets the jobs where a mistake can't move money or change an order, namely phrasing a message and picking a route, while deterministic code does the counting, the settling and the sending. I don't have a formal eval harness yet, and I say so up front.",
      },
      {
        q: "Wouldn't it be simpler to fit the process to an off-the-shelf tool?",
        a: "Sometimes, and then I'll say so. If the unusual part is just habit, it's cheaper to change the habit and buy the tool. Building pays where the unusual part is where you make money or where a mistake costs money. Sometimes the best system turns out to be a spreadsheet with a script.",
      },
    ],
  },
];

const withUses = (list: Service[], lang: Lang): Service[] =>
  list.map((a) => ({ ...a, uses: AREA_USES[lang][a.slug] ?? [] }));

export const AREAS: Record<Lang, Service[]> = { en: withUses(EN, "en"), pl: withUses(PL, "pl") };

export function getArea(lang: Lang, slug: string): Service | undefined {
  return AREAS[lang].find((a) => a.slug === slug);
}

export const AREA_SLUGS = PL.map((a) => a.slug);
