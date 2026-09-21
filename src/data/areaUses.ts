import { type Lang } from "../i18n";
import { type ServicePoint } from "./services";

/**
 * "What can be automated here": concrete, one-line examples per area page.
 *
 * Added after comparing the area pages with letsautomate.pl (2026-09-21):
 * theirs list a dozen uses per area, ours only named the problems and how I
 * build. A reader scanning for "can he do X for us" needs the list. The copy is
 * our own, and every item is something I build (possibilities, not claimed
 * client results), so no numbers appear here.
 */

type Uses = Record<string, ServicePoint[]>;

const PL: Uses = {
  "sprzedaz-i-marketing": [
    {
      title: "Leady w jednym miejscu",
      body: "Zapytania z formularza, maila i reklam trafiają do CRM razem z informacją, skąd przyszły. Nikt ich nie przepisuje.",
    },
    {
      title: "Pierwsza odpowiedź w kilka minut",
      body: "Klient dostaje potwierdzenie i propozycję terminu od razu, także wieczorem i w weekend.",
    },
    {
      title: "Wycena z kalkulatora",
      body: "Cena liczona z cennika i marż, oferta w PDF gotowa do wysłania bez składania jej w arkuszu.",
    },
    {
      title: "Oferty, na które nikt nie odpisał",
      body: "Po kilku dniach system sam przypomina się klientowi, a handlowiec widzi, kto odpowiedział.",
    },
    {
      title: "Spotkania z kalendarza",
      body: "Klient wybiera wolny termin z kalendarza handlowca zamiast wymieniać pięć maili.",
    },
    {
      title: "Raport sprzedaży bez zestawień",
      body: "Wyniki handlowców i źródła leadów liczone z danych, a nie z tabelek składanych w piątek.",
    },
    {
      title: "Porządek w kontaktach",
      body: "Duplikaty wyłapywane po mailu i telefonie, brakujące dane uzupełniane przy wpisie.",
    },
    {
      title: "Powiadomienia na telefon",
      body: "Nowy lead, zaakceptowana oferta albo utknięta sprawa trafia do właściwej osoby, gdy się dzieje.",
    },
  ],
  "obsluga-klienta": [
    {
      title: "Status zamówienia bez pytania",
      body: "Klient dostaje wiadomość przy każdej zmianie etapu, więc nie musi dzwonić.",
    },
    {
      title: "Asystent do powtarzalnych pytań",
      body: "Godziny, ceny, dostawa: asystent odpowiada z Waszych danych, trudniejsze sprawy oddaje człowiekowi.",
    },
    {
      title: "Jedna skrzynka na wszystkie kanały",
      body: "Mail, formularz i WhatsApp w jednej kolejce, więc zgłoszenie nie ginie między kanałami.",
    },
    {
      title: "Zgłoszenie do właściwej osoby",
      body: "System przydziela sprawę według tematu i pilnuje terminu odpowiedzi.",
    },
    {
      title: "Przypomnienia SMS",
      body: "Przypomnienie o wizycie albo odbiorze wysłane dzień wcześniej, z możliwością odpowiedzi.",
    },
    {
      title: "Prośba o opinię",
      body: "Wysyłana raz, po zamknięciu sprawy, a nie przy każdej zmianie statusu.",
    },
    {
      title: "Zwroty i reklamacje etapami",
      body: "Każda reklamacja ma swoje etapy i osobę prowadzącą, a klient widzi, na czym stoi.",
    },
    {
      title: "Szkic odpowiedzi od AI",
      body: "Pracownik dostaje gotowy szkic na podstawie historii klienta, poprawia go i wysyła.",
    },
  ],
  "administracja-i-dokumenty": [
    {
      title: "Dokumenty z szablonu",
      body: "Umowy, protokoły i wnioski wypełniane danymi z systemu i zapisywane jako DOCX albo PDF.",
    },
    {
      title: "Odczyt faktur i dokumentów",
      body: "AI wyciąga dane z dokumentu, reguły je sprawdzają, a wątpliwe przypadki zatwierdza człowiek.",
    },
    {
      title: "Obieg akceptacji",
      body: "Wniosek trafia do osoby, która ma go zatwierdzić, a decyzja zostaje zapisana z datą.",
    },
    {
      title: "Terminy, które nie mijają",
      body: "Przypomnienie o płatności, końcu umowy albo przeglądzie przychodzi, zanim termin minie.",
    },
    {
      title: "Porządek w plikach",
      body: "Dokumenty nazywane według jednej reguły i odkładane do właściwych folderów automatycznie.",
    },
    {
      title: "Zestawienia dla księgowości",
      body: "Co miesiąc przygotowane z danych, które już są w systemie, zamiast przepisywane z maili.",
    },
    {
      title: "Rejestr umów i zleceń",
      body: "Wyszukiwarka po kliencie, dacie i statusie zamiast folderu na wspólnym dysku.",
    },
    {
      title: "Formularz zamiast maila",
      body: "Zgłoszenie z wymaganymi polami, więc nikt nie musi dopytywać o brakujące dane.",
    },
  ],
  "hr-i-rekrutacja": [
    {
      title: "Zgłoszenia z kilku źródeł",
      body: "Formularz, skrzynka i portale ogłoszeniowe w jednej liście, bez podwójnych kandydatów.",
    },
    {
      title: "Odpowiedź dla kandydata od razu",
      body: "Potwierdzenie i informacja o kolejnym kroku wychodzą w chwili zgłoszenia.",
    },
    {
      title: "Rozmowy z kalendarza",
      body: "Kandydat wybiera termin z wolnych okienek rekrutera, bez wymiany maili.",
    },
    {
      title: "Wstępne porządkowanie CV",
      body: "AI układa zgłoszenia według kryteriów ustalonych przez rekrutera. Decyzja zostaje przy człowieku.",
    },
    {
      title: "Onboarding z listą zadań",
      body: "Dostępy, sprzęt i szkolenia, każde zadanie z osobą odpowiedzialną i terminem.",
    },
    {
      title: "Wnioski urlopowe",
      body: "Wniosek z akceptacją przełożonego i kalendarzem zespołu, bez tabelki na boku.",
    },
    {
      title: "Badania i szkolenia okresowe",
      body: "Przypomnienie dla pracownika i kadr, zanim ważność się skończy.",
    },
    {
      title: "Odpowiedź także dla odrzuconych",
      body: "Każdy kandydat dostaje informację po zakończeniu rekrutacji, a nie ciszę.",
    },
  ],
  "dane-i-raporty": [
    {
      title: "Dashboard na żywo",
      body: "Aktualne liczby zamiast raportu z zeszłego tygodnia, dla każdego z odpowiednim zakresem danych.",
    },
    {
      title: "Dane z kilku systemów razem",
      body: "CRM, księgowość i arkusze połączone w jednym miejscu, bez ręcznego sklejania.",
    },
    {
      title: "Raport wysyłany sam",
      body: "Co tydzień do właściwych osób, w tej samej formie i o tej samej porze.",
    },
    {
      title: "Alert, gdy coś odbiega od normy",
      body: "Spadek sprzedaży albo zalegające zamówienia widać od razu, a nie na koniec miesiąca.",
    },
    {
      title: "Czyszczenie danych",
      body: "Duplikaty, brakujące pola i różne formaty zapisu poprawiane przy imporcie.",
    },
    {
      title: "Arkusze od wielu osób w jednej bazie",
      body: "Pliki od handlowców albo oddziałów zbierane i łączone automatycznie.",
    },
    {
      title: "Rentowność zlecenia",
      body: "Czas, koszt i przychód policzone razem dla każdego zlecenia, nie szacowane.",
    },
    {
      title: "Pytania do danych zwykłym językiem",
      body: "AI odpowiada na pytanie o liczby i pokazuje, z których danych je wzięła.",
    },
  ],
  "nietypowe-procesy-ai": [
    {
      title: "Dokumenty o nietypowym układzie",
      body: "AI odczytuje dane z dokumentów, których nie da się opisać szablonem, a reguły je sprawdzają.",
    },
    {
      title: "Klasyfikacja po treści",
      body: "Wiadomości i zgłoszenia przypisywane do kategorii według tego, co w nich jest, nie według tematu maila.",
    },
    {
      title: "Asystent znający Wasze dokumenty",
      body: "Odpowiada z instrukcji i cenników firmy i podaje, skąd wziął odpowiedź.",
    },
    {
      title: "Agent głosowy do prostych rozmów",
      body: "Odbiera telefon, zbiera dane i umawia termin. Resztę przekazuje człowiekowi.",
    },
    {
      title: "Porównanie dokumentów",
      body: "Wskazuje różnice między wersjami umowy albo ofertami kilku dostawców.",
    },
    {
      title: "Treści z danych katalogu",
      body: "Opisy produktów przygotowane z danych technicznych, do zatwierdzenia przed publikacją.",
    },
    {
      title: "Kontrola danych przed importem",
      body: "Mechaniczne porównanie źródła z bazą, zanim ktokolwiek uzna przeniesienie za skończone.",
    },
    {
      title: "Proces, którego nie ma w żadnym narzędziu",
      body: "Zaczynamy od tego, jak robicie to dziś, i sprawdzamy, która część opłaca się automatyzować.",
    },
  ],
};

const EN: Uses = {
  "sprzedaz-i-marketing": [
    {
      title: "Leads in one place",
      body: "Enquiries from the form, email and ads land in the CRM with their source attached. Nobody retypes them.",
    },
    {
      title: "A first reply in minutes",
      body: "The client gets an acknowledgement and a proposed time straight away, evenings and weekends included.",
    },
    {
      title: "Quotes from a calculator",
      body: "Price worked out from the price list and margins, the PDF offer ready to send without building it in a spreadsheet.",
    },
    {
      title: "Offers nobody answered",
      body: "After a few days the system follows up on its own, and the salesperson sees who replied.",
    },
    {
      title: "Meetings from the calendar",
      body: "The client picks a free slot in the salesperson's calendar instead of trading five emails.",
    },
    {
      title: "Sales reports without spreadsheets",
      body: "Results by salesperson and lead source counted from the data, not from tables put together on Friday.",
    },
    {
      title: "Clean contacts",
      body: "Duplicates caught by email and phone, missing details filled in at entry.",
    },
    {
      title: "Alerts on the phone",
      body: "A new lead, an accepted offer or a stuck case reaches the right person when it happens.",
    },
  ],
  "obsluga-klienta": [
    {
      title: "Order status without asking",
      body: "The client gets a message at every stage change, so they don't have to call.",
    },
    {
      title: "An assistant for repeat questions",
      body: "Hours, prices, delivery: it answers from your data and hands harder cases to a person.",
    },
    {
      title: "One inbox for every channel",
      body: "Email, form and WhatsApp in one queue, so a request doesn't get lost between them.",
    },
    {
      title: "The request goes to the right person",
      body: "The system assigns it by topic and keeps an eye on the reply deadline.",
    },
    {
      title: "SMS reminders",
      body: "A reminder about the appointment or pickup the day before, and the client can reply to it.",
    },
    {
      title: "Asking for a review",
      body: "Sent once, after the case is closed, not on every status change.",
    },
    {
      title: "Returns and complaints in stages",
      body: "Each complaint has its stages and an owner, and the client can see where it stands.",
    },
    {
      title: "A draft reply from AI",
      body: "The team member gets a draft based on the client's history, edits it and sends it.",
    },
  ],
  "administracja-i-dokumenty": [
    {
      title: "Documents from a template",
      body: "Contracts, reports and applications filled in with data from the system and saved as DOCX or PDF.",
    },
    {
      title: "Reading invoices and documents",
      body: "AI pulls the data out, rules check it, and a person approves the doubtful cases.",
    },
    {
      title: "Approval flow",
      body: "A request goes to whoever has to approve it, and the decision is recorded with a date.",
    },
    {
      title: "Deadlines that don't slip",
      body: "A reminder about a payment, a contract ending or an inspection arrives before the date passes.",
    },
    {
      title: "Tidy files",
      body: "Documents named by one rule and filed in the right folder automatically.",
    },
    {
      title: "Statements for the accountant",
      body: "Prepared every month from data already in the system instead of copied out of emails.",
    },
    {
      title: "A register of contracts and jobs",
      body: "Search by client, date and status instead of a folder on the shared drive.",
    },
    {
      title: "A form instead of an email",
      body: "Requests with the required fields, so nobody has to chase missing details.",
    },
  ],
  "hr-i-rekrutacja": [
    {
      title: "Applications from several sources",
      body: "The form, the inbox and job boards in one list, with no duplicate candidates.",
    },
    {
      title: "An instant reply to the candidate",
      body: "An acknowledgement and the next step go out the moment they apply.",
    },
    {
      title: "Interviews from the calendar",
      body: "The candidate picks from the recruiter's free slots, no email back and forth.",
    },
    {
      title: "A first sort of CVs",
      body: "AI orders applications by criteria the recruiter sets. The decision stays with a person.",
    },
    {
      title: "Onboarding with a task list",
      body: "Access, equipment and training, each task with an owner and a date.",
    },
    {
      title: "Leave requests",
      body: "Requests with the manager's approval and the team calendar, no side spreadsheet.",
    },
    {
      title: "Periodic checks and training",
      body: "A reminder to the employee and HR before anything expires.",
    },
    {
      title: "An answer for rejected candidates too",
      body: "Everyone hears back when the process ends, instead of silence.",
    },
  ],
  "dane-i-raporty": [
    {
      title: "A live dashboard",
      body: "Current numbers instead of last week's report, each person seeing the data they should.",
    },
    {
      title: "Data from several systems together",
      body: "CRM, accounting and spreadsheets joined in one place without manual stitching.",
    },
    {
      title: "A report that sends itself",
      body: "Every week to the right people, in the same format, at the same time.",
    },
    {
      title: "An alert when something is off",
      body: "A drop in sales or orders piling up shows straight away, not at month end.",
    },
    {
      title: "Cleaning the data",
      body: "Duplicates, missing fields and mixed formats fixed on import.",
    },
    {
      title: "Spreadsheets from many people in one database",
      body: "Files from salespeople or branches collected and merged automatically.",
    },
    {
      title: "Profit per job",
      body: "Time, cost and revenue counted together for each job, not estimated.",
    },
    {
      title: "Questions to the data in plain language",
      body: "AI answers a question about the numbers and shows which data it used.",
    },
  ],
  "nietypowe-procesy-ai": [
    {
      title: "Documents with an unusual layout",
      body: "AI reads data from documents no template can describe, and rules check the result.",
    },
    {
      title: "Sorting by content",
      body: "Messages and requests filed by what they say, not by the email subject.",
    },
    {
      title: "An assistant that knows your documents",
      body: "It answers from the company's manuals and price lists and says where the answer came from.",
    },
    {
      title: "A voice agent for simple calls",
      body: "It picks up, collects the details and books a time. Everything else goes to a person.",
    },
    {
      title: "Comparing documents",
      body: "It points out the differences between contract versions or offers from several suppliers.",
    },
    {
      title: "Content from catalogue data",
      body: "Product descriptions written from technical data, approved before they go live.",
    },
    {
      title: "Checking data before an import",
      body: "A mechanical comparison of the source against the database before anyone calls the move done.",
    },
    {
      title: "A process no tool covers",
      body: "We start from how you do it today and check which part is worth automating.",
    },
  ],
};

export const AREA_USES: Record<Lang, Uses> = { pl: PL, en: EN };
