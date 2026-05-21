import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/marketing-training')({ component: MarketingTrainingPage })

function MarketingTrainingPage() {
  return (
    <SpiritualityLayout eyebrow="Szkolenie (PL)" title="Szkolenie z Marketingu">
      <p className="text-lg text-white/85 leading-relaxed mb-6">Praktyczne szkolenie marketingowe dla świadomych twórców — nauczycieli, coachów, healerów i wszystkich, którzy chcą rozwijać swoją działalność z zachowaniem integralności.</p>
      <p className="text-base text-white/75 leading-relaxed mb-10">Konkretne narzędzia, frameworki i wskazówki — oparte na 12 latach praktyki duchowej + budowaniu biznesów od zera.</p>

      <h2 className="mt-10 mb-6 text-2xl font-bold text-white">Co dostaniesz</h2>
      <ul className="space-y-3 text-white/85 list-disc pl-6">
        <li><strong className="text-white">Pozycjonowanie marki</strong> — jak mówić o swojej pracy żeby trafić do właściwych ludzi.</li>
        <li><strong className="text-white">Tworzenie treści</strong> — zrównoważony pipeline (YouTube/IG/email) bez wypalenia.</li>
        <li><strong className="text-white">Lejki sprzedażowe</strong> — bez sztucznych presji i manipulacji.</li>
        <li><strong className="text-white">Praktyczne wdrożenie</strong> — konkretne kroki które możesz wprowadzić od jutra.</li>
      </ul>

      <div className="mt-12">
        <NewsletterSignup
          source="marketing-training-pl"
          tag="marketing-training-pl"
          heading="Zapisz się na szkolenie"
          subheading="Wyślemy materiały wprowadzające + harmonogram nadchodzących spotkań."
          buttonLabel="Zapisz mnie"
        />
      </div>

      <p className="mt-10 text-sm text-white/40 italic">Pełna treść szkolenia jest migrowana z Systeme.io. Oryginalny landing:</p>
      <a href="https://www.myspiritway.org/spiritual-marketing-blog" target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-md border border-white/15 bg-white/[0.04] px-5 py-2 text-sm text-white/80 hover:bg-white/10">Otwórz oryginalny landing →</a>
    </SpiritualityLayout>
  )
}
