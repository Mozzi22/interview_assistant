import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'

const projectDescriptions = [
  { title: 'technicalQuestions', desc: '5,200+' },
  { title: 'codingTasks', desc: '150+ Middle+' },
  { title: 'archCases', desc: '80+' }
]

const Home = () => {
  const t = useTranslations('Main')
  const locale = useLocale()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="space-y-4 max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('interviewAssistant')}
        </h1>
        <p className="text-lg md:text-xl text-text-muted">
          {t('interviewAssistantDesc')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/practice"
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          {t('startPracticing')}
        </Link>
        <a
          href={`https://nataliia-fe-portfolio.vercel.app/${locale}/about`}
          target="_blank"
          className="px-8 py-4 bg-card text-foreground rounded-full font-semibold shadow-md border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          {t('learnMore')}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl px-4">
        {projectDescriptions.map((feature, i) => (
          <div
            key={i}
            className="p-6 backdrop-blur-md rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow bg-card"
          >
            <h3 className="text-xl font-bold mb-2 text-foreground">
              {t(feature.title)}
            </h3>
            <p className="text-text-muted">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
