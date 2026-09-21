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
  | { t: "img"; src: string; alt: string; caption: string; width: number; height: number };

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
  body: Record<Lang, PostBody>;
};

const MONITOR = {
  t: "img",
  src: "/blog/claude-autoshutdown/monitor.webp",
  width: 1600,
  height: 970,
} as const;

export const POSTS: Post[] = [
  {
    slug: "claude-autoshutdown",
    date: "2026-09-21",
    repo: "https://github.com/kamiljan11/claude-autoshutdown",
    body: {
      pl: {
        title: "Komputer gaśnie, kiedy Claude Code naprawdę skończy. Nie o trzeciej w nocy",
        description:
          "Małe narzędzie na Windows, które wyłącza, hibernuje albo usypia komputer dopiero wtedy, gdy każda sesja Claude Code i każdy jej subagent skończyły pracę. Jak rozpoznaje koniec pracy i dlaczego nie patrzy na CPU.",
        lead: "Zostawiam wieczorem agentów z dłuższą robotą. Rano komputer albo chodził całą noc na pusto, albo zgasł w połowie edycji, bo wyłączył go zegar. Napisałem narzędzie, które czeka na koniec pracy, a nie na godzinę.",
        blocks: [
          { t: "h2", id: "problem", text: "Problem: zegar nie wie, co robi agent" },
          {
            t: "p",
            text: "Claude Code nie ma opcji „wyłącz komputer, jak skończysz”. Zostają dwa wyjścia i oba są złe. Można zostawić komputer włączony do rana i płacić za prąd, gdy nic się nie dzieje. Można też ustawić wyłączenie po czasie albo usypianie po bezczynności. Tylko że Windows liczy bezczynność po ruchach myszki i klawiatury, a agent nie rusza myszką. Timer tnie więc według zegara, nie według pracy.",
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
            text: "Z ostatnich wpisów transkryptu wynika stan tury. Odpowiedź modelu zakończona normalnie oznacza turę zamkniętą. Wywołanie narzędzia, wiadomość użytkownika albo podsumowanie po kompaktowaniu oznacza turę otwartą. Cokolwiek innego jest nieznane i też blokuje wyłączenie. Lista jest zamknięta: nowy typ wpisu, którego program nie zna, nigdy nie zostanie uznany za „skończone”.",
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
            text: "Jedna uwaga z README: jeśli hibernacja jest w Windows włączona, uśpienie często i tak kończy się hibernacją. To zachowanie systemu, nie programu.",
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
        title: "Shut the PC down when Claude Code is actually done, not at 3 a.m.",
        description:
          "A small Windows tool that shuts down, hibernates or sleeps the computer only after every Claude Code session and every subagent has finished. How it tells work is over, and why it ignores CPU.",
        lead: "I leave agents running longer jobs in the evening. In the morning the PC had either run idle all night, or a timer had killed it halfway through an edit. So I wrote a tool that waits for the work to end, not for a time.",
        blocks: [
          { t: "h2", id: "problem", text: "The problem: a timer can't see the agent" },
          {
            t: "p",
            text: "Claude Code has no \"shut down when you're done\". That leaves two options, both bad. Leave the machine on until morning and pay for power while nothing happens. Or set a shutdown timer or idle sleep. But Windows measures idle time by mouse and keyboard, and an agent doesn't move the mouse. The timer cuts by the clock, not by the work.",
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
            text: 'The last records of a transcript give the state of the turn. A model reply that ended normally means the turn is closed. A tool call, a user message or a post-compaction summary means it is open. Anything else is unknown, and unknown blocks too. The list is closed: a record type the program has never seen can never count as "done".',
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
            text: "One note from the README: with hibernation enabled in Windows, sleep often ends up as hibernation anyway. That's Windows, not the app.",
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
