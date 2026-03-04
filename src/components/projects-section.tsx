'use client';

import { AnimatedReveal } from './animated-reveal';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  Dockerfile: '#384d54',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

interface Props {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('projects.title')}
          </h2>
        </AnimatedReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => {
            const desc = locale === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
            return (
              <AnimatedReveal key={i} delay={i * 50}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block p-4 rounded-xl border transition-all duration-200 group hover:scale-[1.02]"
                  style={{ borderColor: 'var(--gh-border)', background: 'var(--gh-surface)' }}
                >
                  <div className="lang-line" style={{ background: languageColors[project.language] || '#6b7280' }} />
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-mono text-sm font-semibold truncate" style={{ color: 'var(--gh-blue)' }}>
                      {project.name}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" style={{ color: 'var(--gh-muted)' }} />
                  </div>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--gh-muted)' }}>
                    {desc}
                  </p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--gh-muted)' }}>
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[project.language] || '#6b7280',
                        }}
                      />
                      <span className="font-mono">{project.language}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: 'var(--gh-orange)' }} />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {project.forks}
                    </span>
                  </div>
                </a>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
