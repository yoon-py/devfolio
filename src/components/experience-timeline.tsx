'use client';

import { AnimatedReveal } from './animated-reveal';
import type { ExperienceItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  experience: ExperienceItem[];
}

export function ExperienceTimeline({ experience }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="experience" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('experience.title')}
          </h2>
        </AnimatedReveal>

        <div className="relative ml-4 sm:ml-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'var(--gh-blue)', opacity: 0.3 }} />

          <div className="space-y-8">
            {experience.map((item, i) => {
              const title = locale === 'en' && item.titleEn ? item.titleEn : item.title;
              const company = locale === 'en' && item.companyEn ? item.companyEn : item.company;
              const period = locale === 'en' && item.periodEn ? item.periodEn : item.period;
              const description = locale === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

              return (
                <AnimatedReveal key={i} delay={i * 100}>
                  <div className="relative pl-8">
                    {/* Node dot */}
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full -translate-x-[5px] ring-4" style={{ background: 'var(--gh-blue)', '--tw-ring-color': 'var(--gh-bg)' } as Record<string, string>} />

                    <div className="p-4 rounded-xl" style={{ border: '1px solid var(--gh-border)', background: 'var(--gh-surface)' }}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                        <h3 className="font-semibold text-gray-100">
                          {title}
                        </h3>
                        <span className="font-mono text-xs text-gray-500">
                          {period}
                        </span>
                      </div>
                      <p className="text-sm text-blue-400/80 mb-2">
                        {company}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-400">
                        {description}
                      </p>
                    </div>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
