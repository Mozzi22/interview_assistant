import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer className="w-full py-8 border-t border-border mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-text-muted text-sm">
        <p>{t('copyright')}</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://github.com/Mozzi22/"
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            {t('github')}
          </a>
          <a
            href="https://www.linkedin.com/in/nataliia-nikolaieva-3121a6221/"
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            {t('linkedin')}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
