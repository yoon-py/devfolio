'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

function useTypingAnimation(texts: string[], speed = 80, pause = 2000) {
  const stateRef = useRef({
    displayed: '',
    textIndex: 0,
    charIndex: 0,
    deleting: false,
  });
  const listenersRef = useRef(new Set<() => void>());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const notify = useCallback(() => {
    listenersRef.current.forEach((cb) => cb());
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    const current = texts[s.textIndex];

    if (!s.deleting && s.charIndex <= current.length) {
      s.displayed = current.slice(0, s.charIndex);
      s.charIndex++;
      notify();
      timerRef.current = setTimeout(tick, speed);
    } else if (!s.deleting && s.charIndex > current.length) {
      s.deleting = true;
      timerRef.current = setTimeout(tick, pause);
    } else if (s.deleting && s.charIndex > 0) {
      s.charIndex--;
      s.displayed = current.slice(0, s.charIndex);
      notify();
      timerRef.current = setTimeout(tick, speed / 2);
    } else if (s.deleting && s.charIndex === 0) {
      s.deleting = false;
      s.textIndex = (s.textIndex + 1) % texts.length;
      timerRef.current = setTimeout(tick, speed);
    }
  }, [texts, speed, pause, notify]);

  // Start animation on first subscribe (client only)
  if (typeof window !== 'undefined' && !startedRef.current) {
    startedRef.current = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      stateRef.current.displayed = texts[0];
    } else {
      setTimeout(tick, speed);
    }
  }

  const getSnapshot = useCallback(() => stateRef.current.displayed, []);
  const getServerSnapshot = useCallback(() => '', []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function HeroSection({ config }: Props) {
  const { locale, t } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const taglineRaw = locale === 'en' && config.taglineEn ? config.taglineEn : config.tagline;

  const taglines = taglineRaw.includes('|')
    ? taglineRaw.split('|').map((s) => s.trim())
    : [taglineRaw];
  const typed = useTypingAnimation(taglines);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative"
      style={{
        background: 'var(--gh-bg)',
        backgroundImage:
          'radial-gradient(circle at 1px 1px, var(--gh-border) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="w-full max-w-2xl terminal-frame animate-fade-up">
        <div className="terminal-titlebar">
          <div className="terminal-dot" style={{ background: '#ff5f57' }} />
          <div className="terminal-dot" style={{ background: '#febc2e' }} />
          <div className="terminal-dot" style={{ background: '#28c840' }} />
          <span className="font-mono text-xs ml-2" style={{ color: 'var(--gh-muted)' }}>~/{name.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
        <div className="p-6 sm:p-8 text-center">
          <p className="font-mono text-sm mb-4" style={{ color: 'var(--gh-green)' }}>
            <span style={{ color: 'var(--gh-blue)' }}>~$</span> whoami
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, var(--gh-blue), var(--gh-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {name}
          </h1>
          <p className="font-mono text-lg mb-2 h-8" style={{ color: 'var(--gh-muted)' }}>
            {typed}
            <span className="cursor-blink ml-0.5" style={{ color: 'var(--gh-green)' }}>▌</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-8 animate-fade-up animate-fade-up-d1">
        {config.githubUsername && (
          <a
            href={`https://github.com/${config.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-lg border transition-all duration-200 hover:scale-105"
            style={{ borderColor: 'var(--gh-border)', color: 'var(--gh-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gh-blue)'; e.currentTarget.style.color = 'var(--gh-blue)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--gh-border)'; e.currentTarget.style.color = 'var(--gh-muted)'; }}
          >
            <Github className="w-5 h-5" />
          </a>
        )}
        {config.linkedinUrl && (
          <a
            href={config.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-lg border transition-all duration-200 hover:scale-105"
            style={{ borderColor: 'var(--gh-border)', color: 'var(--gh-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gh-blue)'; e.currentTarget.style.color = 'var(--gh-blue)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--gh-border)'; e.currentTarget.style.color = 'var(--gh-muted)'; }}
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {config.email && (
          <a
            href={`mailto:${config.email}`}
            aria-label="Email"
            className="p-2.5 rounded-lg border transition-all duration-200 hover:scale-105"
            style={{ borderColor: 'var(--gh-border)', color: 'var(--gh-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gh-green)'; e.currentTarget.style.color = 'var(--gh-green)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--gh-border)'; e.currentTarget.style.color = 'var(--gh-muted)'; }}
          >
            <Mail className="w-5 h-5" />
          </a>
        )}
        {config.resumeUrl && (
          <a
            href={config.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--gh-blue), var(--gh-purple))', color: '#fff' }}
          >
            <Download className="w-4 h-4" />
            {t('hero.resume')}
          </a>
        )}
      </div>
    </section>
  );
}
