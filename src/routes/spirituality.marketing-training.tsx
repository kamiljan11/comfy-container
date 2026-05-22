import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/marketing-training')({ component: MarketingTrainingPage })

const AUDIENCE = [
  {
    title: 'Nauczyciel duchowy',
    desc: 'Chcesz dotrzeć do większej liczby uczniów, ale boisz się, że marketing zniszczy esencję tego, co robisz.',
  },
  {
    title: 'Coach / healer',
    desc: 'Masz dar i klientów, ale brak systemu sprawia, że ciągle gonisz nowych i zaczynasz każdy miesiąc od zera.',
  },
  {
    title: 'Twórca świadomy',
    desc: 'Publikujesz wartościowe treści, ale nie zamieniają się one w realne dochody ani stabilną praktykę.',
  },
] as const

const MODULES = [
  {
    title: 'Pozycjonowanie marki',
    desc: 'Jak mówić o swojej pracy, żeby trafiać do właściwych ludzi — bez upraszczania, bez ezoterycznego żargonu.',
  },
  {
    title: 'Pipeline tworzenia treści',
    desc: 'YouTube / IG / email — zrównoważony rytm publikacji, który nie prowadzi do wypalenia.',
  },
  {
    title: 'Lejki sprzedażowe',
    desc: 'Jak prowadzić ludzi od pierwszego kontaktu do zakupu — bez sztucznych presji i manipulacji.',
  },
  {
    title: 'Praktyczne wdrożenie',
    desc: 'Konkretne kroki, które możesz wprowadzić od jutra — bez czekania na "idealny moment".',
  },
] as const

const PRINCIPLES = [
  'Struktura wspiera ducha — nie tłumi go.',
  'Najpierw klarowność, potem skala.',
  'Jeden komunikat lepszy niż trzy mgliste.',
  'Treść regularna pokona treść doskonałą.',
  'Sprzedaj uczciwie albo nie sprzedawaj wcale.',
] as const

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Zapis i wstępne materiały',
    desc: 'Od razu po zapisaniu się dostajesz dokumenty wprowadzające — żebyś mógł zacząć myśleć w tych ramach jeszcze przed pierwszą sesją.',
  },
  {
    n: '02',
    title: 'Sesje na żywo',
    desc: 'Cykl spotkań online — każda sesja ma swój temat, materiały i zadania do wdrożenia między spotkaniami.',
  },
  {
    n: '03',
    title: 'Wsparcie społeczności',
    desc: 'Grupa WhatsApp / Discord z innymi uczestnikami — pytania, feedback, wspólne wdrożenia.',
  },
  {
    n: '04',
    title: 'Wdrożenie',
    desc: 'Pracujesz na realnym kliencie lub własnym produkcie podczas trwania szkolenia — wychodzisz z konkretem, nie z notatkami.',
  },
] as const

function MarketingTrainingPage() {
  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-b-3xl overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 100%, rgba(50,150,180,0.35), transparent 60%),' +
              'linear-gradient(180deg, #0a1f28 0%, #102f3a 45%, #0a2933 80%, #06090a 100%)',
          }}
        />
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4 mt-4">
          Szkolenie (PL)
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Marketing dla świadomych twórców.<br />
          <span className="italic font-light text-amber-200">Bez manipulacji. Bez wypalenia.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
          Szkolenie dla nauczycieli duchowych, coachów, healerów i twórców świadomych — wszystkich, którzy
          chcą rozwijać swoją działalność, ale nie chcą sprzedawać poprzez sztuczną presję ani manipulację.
          Dostajesz konkretne narzędzia i frameworki: jak pozycjonować markę, jak budować treść, jak
          prowadzić ludzi do zakupu w sposób uczciwy. Wszystko zgodnie z Twoimi wartościami — bo struktura
          ma wspierać to, co robisz, a nie zastępować to czymś, czym nie jesteś.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#signup" className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
            Zapisz mnie →
          </a>
          <Link to="/spirituality/clarity" className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all">
            Umów Clarity Call
          </Link>
        </div>
      </section>

      {/* ── Dla kogo ─────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Dla kogo</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Dla kogo jest to szkolenie?
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{a.title}</h3>
              <p className="text-sm text-white/75 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Co dostaniesz ─────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Program</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Co dostaniesz?
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {MODULES.map((m, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{m.title}</h3>
              <p className="text-sm text-white/75 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5 zasad ───────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Zasady</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          5 zasad ze szkolenia.
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {PRINCIPLES.map((p, i) => (
            <li key={i} className="flex items-start gap-4 text-base md:text-lg text-white/85 leading-relaxed">
              <span className="text-amber-300 mt-1 flex-shrink-0" aria-hidden>✦</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Jak to wygląda ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Proces</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-12">
          Jak to wygląda krok po kroku.
        </h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {PROCESS_STEPS.map((s) => (
            <li key={s.n} className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <div className="text-3xl font-bold text-amber-300/80 mb-3">{s.n}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Signup ────────────────────────────────────────────────────────── */}
      <section id="signup" className="py-16 border-t border-white/5">
        <NewsletterSignup
          source="marketing-training-pl"
          tag="marketing-training-pl"
          heading="Zapisz się na szkolenie"
          subheading="Wyślę Ci materiały wprowadzające + harmonogram nadchodzących spotkań."
          buttonLabel="Zapisz mnie"
        />
      </section>

      {/* ── Original landing ──────────────────────────────────────────────── */}
      <section className="py-12 border-t border-white/5">
        <p className="text-sm text-white/50 italic mb-4">
          Pełna treść szkolenia migrowana z Systeme.io. Oryginalny landing:
        </p>
        <a
          href="https://www.myspiritway.org/spiritual-marketing-blog"
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-md border border-white/15 bg-white/[0.04] px-5 py-2 text-sm text-white/80 hover:bg-white/10 transition-all"
        >
          Otwórz oryginalny landing →
        </a>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrowane z myspiritway.org/spiritual-marketing-blog. <Link to="/spirituality" className="underline hover:text-white/60">Wróć do strony głównej spirituality →</Link>
      </p>
    </SpiritualityLayout>
  )
}
