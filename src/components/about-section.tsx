'use client';

import { AnimatedReveal } from './animated-reveal';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

const levelWidth: Record<string, string> = {
  beginner: 'w-1/3',
  intermediate: 'w-2/3',
  advanced: 'w-full',
};

interface Props {
  config: SiteConfig;
}

export function AboutSection({ config }: Props) {
  const { locale, t } = useLocale();
  const about = locale === 'en' && config.aboutEn ? config.aboutEn : config.about;

  return (
    <section id="about" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('about.title')}
          </h2>
        </AnimatedReveal>

        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedReveal>
            <p className="text-gray-400 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {about}
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={100}>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-4">{t('about.skills')}</h3>
              {config.skills.map((skill, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="text-xs text-gray-500">
                      {t(`level.${skill.level}`)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--gh-border)' }}>
                    <div
                      className={`h-full rounded-full ${levelWidth[skill.level]}`}
                      style={{ background: 'linear-gradient(90deg, var(--gh-blue), var(--gh-purple))' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
