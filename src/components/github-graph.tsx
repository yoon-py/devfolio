'use client';

import { AnimatedReveal } from './animated-reveal';
import { useLocale } from '@/lib/i18n';

interface Props {
  username: string;
}

export function GithubGraph({ username }: Props) {
  const { t } = useLocale();

  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <div
            className="rounded-xl p-4 overflow-x-auto"
            style={{ border: '1px solid var(--gh-border)', background: 'var(--gh-surface)' }}
          >
            <img
              src={`https://ghchart.rshah.org/58a6ff/${username}`}
              alt={`${username} ${t('github.alt')}`}
              className="w-full max-w-full"
              loading="lazy"
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
