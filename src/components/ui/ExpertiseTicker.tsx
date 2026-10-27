'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Asterisk } from '@/components/ui/Brand';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const expertises = ['Digital & Web', 'Design & Print', 'IT & Maintenance', 'Équipement IT'];

export function ExpertiseTicker() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(host.current);
    const visibility = () => setTabVisible(!document.hidden);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  return (
    <div className={`expertise-ticker${reduced ? ' ticker-static' : ''}`} ref={host}>
      <span className="sr-only">Nos expertises : {expertises.join(', ')}.</span>
      <div className="ticker-window" aria-hidden="true">
        <div className="ticker-track" style={{ animationPlayState: paused || reduced || !visible || !tabVisible ? 'paused' : 'running' }}>
          {[0, 1].map(copy => <div className="ticker-group" key={copy}>
            {expertises.map(expertise => <span className="ticker-item" key={expertise}>{expertise}<Asterisk /></span>)}
          </div>)}
        </div>
      </div>
      {!reduced && <button className="ticker-toggle" type="button" aria-pressed={paused}
        aria-label={paused ? 'Reprendre le défilement des expertises' : 'Mettre en pause le défilement des expertises'}
        onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>}
    </div>
  );
}
