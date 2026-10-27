'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectVisual, type VisualKind } from '@/components/ui/ProjectVisual';
import { ProjectPreview } from '@/components/ui/ProjectPreview';
const projects: {
  kind: VisualKind;
  title: string;
  category: string;
  description: string;
  tags: string[];
}[] = [{
  kind: 'segu',
  title: 'Ségu. Une identité qui prend racine.',
  category: 'Identité visuelle',
  description: 'Une exploration de marque qui associe couleurs terracotta, formes organiques et typographie affirmée. Un même langage décliné du logo à la papeterie, pour une identité cohérente et reconnaissable.',
  tags: ['Direction artistique', 'Branding', 'Papeterie']
}, {
  kind: 'kanu',
  title: 'Kanu. Le digital, tout simplement.',
  category: 'Expérience web',
  description: 'Un concept de boutique digitale où les objets et leur histoire prennent le premier rôle. Une navigation lisible, des pages de collection épurées et une expérience pensée aussi bien pour le mobile que pour le grand écran.',
  tags: ['UI / UX', 'Site web', 'E-commerce']
}, {
  kind: 'signal',
  title: 'Des idées qui font impression.',
  category: 'Design & Print',
  description: 'Une étude graphique autour de la force du message : des mots qui occupent l’espace, une palette franche et une composition déclinable sur affiches, supports commerciaux et publications digitales.',
  tags: ['Design graphique', 'Affiche', 'Communication']
}, {
  kind: 'network',
  title: 'La technologie qui vous relie.',
  category: 'Solutions IT',
  description: 'Une visualisation de notre approche IT : connecter les équipements, organiser l’infrastructure et penser la maintenance comme un ensemble. Les solutions sont définies après un audit des besoins de chaque entreprise.',
  tags: ['Infrastructure', 'Maintenance', 'Équipement']
}];
export function PortfolioSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected === null) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  const project = selected === null ? null : projects[selected];
  return <section id="portfolio" className="work-section section-pad">
    <div className="shell">
      <Reveal className="section-intro">
        <div>
          <span className="eyebrow">
            <span className="section-index">01 /</span>
             Notre univers créatif
          </span>
          <h2>
            Le sens du détail.
            <br />
            <span className="serif">Le goût de l’impact.</span>
          </h2>
        </div>
        <p>
          Quatre explorations pour vous montrer ce qui nous anime.
          <span className="concept-note">Concepts créatifs, imaginés par Diska Digital.</span>
        </p>
      </Reveal>
      <div className="work-grid">
        {projects.map((item, i) => <Reveal key={item.kind} delay={i % 2 * 0.1} className="project">
          <ProjectPreview kind={item.kind} title={item.title} onOpen={() => setSelected(i)} />
          <div className="project-meta">
            <div>
              <span className="project-category">
                {item.category}
                <span>— Concept</span>
              </span>
              <h3>
                {item.title}
              </h3>
            </div>
            <span className="mono">
              0
              {i + 1}
            </span>
          </div>
        </Reveal>)}
      </div>
      <div className="work-bottom">
        <span className="mono">Une idée ne demande qu’à devenir réelle.</span>
        <a className="text-link" href="#contact">
          Et si la prochaine était la vôtre ?
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
    <dialog className="project-dialog" ref={dialog} onClose={() => setSelected(null)} onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }} aria-labelledby="project-dialog-title">
      {project && <><button className="dialog-close" aria-label="Fermer le concept" onClick={() => dialog.current?.close()}>
          <X />
        </button><ProjectVisual kind={project.kind} /><div className="dialog-copy">
          <span className="eyebrow">Exploration créative · Concept de démonstration</span>
          <h2 id="project-dialog-title">
            {project.title}
          </h2>
          <p>
            {project.description}
          </p>
          <div className="tags">
            {project.tags.map(tag => <span key={tag}>
              {tag}
            </span>)}
          </div>
          <a className="button button-dark" href="#contact" onClick={() => dialog.current?.close()}>
            Créer votre propre projet
            <ArrowUpRight size={18} />
          </a>
        </div></>}
    </dialog>
  </section>;
}
