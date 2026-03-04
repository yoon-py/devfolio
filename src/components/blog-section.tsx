'use client';

import { AnimatedReveal } from './animated-reveal';
import { ExternalLink } from 'lucide-react';
import type { BlogPost } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  posts: BlogPost[];
}

export function BlogSection({ posts }: Props) {
  const { locale, t } = useLocale();

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('blog.title')}
          </h2>
        </AnimatedReveal>

        <div className="space-y-3">
          {posts.map((post, i) => {
            const title = locale === 'en' && post.titleEn ? post.titleEn : post.title;
            return (
              <AnimatedReveal key={i} delay={i * 50}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-800 dark:border-gray-800 hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-200 group-hover:text-white truncate">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 shrink-0 ml-4" />
                </a>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
