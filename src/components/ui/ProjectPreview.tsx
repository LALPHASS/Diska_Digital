'use client';

import { useEffect, useRef, type PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectVisual, type VisualKind } from '@/components/ui/ProjectVisual';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProjectPreview({ kind, title, onOpen }: {
  kind: VisualKind;
  title: string;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function reset(event: PointerEvent<HTMLButtonElement>) {
    cancelAnimationFrame(frame.current);
    const button = event.currentTarget;
    delete button.dataset.pointing;
    button.style.removeProperty('--preview-tilt-x');
    button.style.removeProperty('--preview-tilt-y');
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    if (reduced || event.pointerType !== 'mouse') return;
    const button = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = button.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      button.dataset.pointing = 'true';
      button.style.setProperty('--preview-x', `${Math.max(62, Math.min(rect.width - 62, x))}px`);
      button.style.setProperty('--preview-y', `${Math.max(30, Math.min(rect.height - 30, y))}px`);
      button.style.setProperty('--preview-tilt-x', `${-(y / rect.height - 0.5) * 4}deg`);
      button.style.setProperty('--preview-tilt-y', `${(x / rect.width - 0.5) * 4}deg`);
    });
  }

  return (
    <button className="project-preview" onClick={onOpen}
      onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}
      aria-label={`Explorer le concept : ${title}`}>
      <ProjectVisual kind={kind} />
      <span className="project-open"><ArrowUpRight size={23} /></span>
      <span className="project-cursor" aria-hidden="true">Explorer <ArrowUpRight size={18} /></span>
    </button>
  );
}
