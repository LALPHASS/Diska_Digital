import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Asterisk } from '@/components/ui/Brand';
export function AboutSection() {
  return <section id="about" className="about-section section-pad">
    <div className="shell about-layout">
      <Reveal className="about-art">
        <span className="eyebrow">Diska Digital / Le studio</span>
        <div className="about-monogram">
          d
          <span>.</span>
          <Asterisk />
        </div>
        <div className="about-art-footer">
          <span>
            Bamako,
            <br />
            Mali.
          </span>
          <span className="mono">
            CRÉATIVITÉ LOCALE.
            <br />
            VISION SANS FRONTIÈRES.
          </span>
        </div>
      </Reveal>
      <Reveal className="about-copy">
        <span className="eyebrow">
          <span className="section-index">03 /</span>
           L’esprit Diska
        </span>
        <h2>
          Ancrés ici.
          <br />
          <span className="serif">Ouverts sur demain.</span>
        </h2>
        <p className="about-lead">Nous croyons aux entreprises qui osent faire les choses à leur manière.</p>
        <p>Basée à Bamako, Diska Digital réunit créativité et savoir-faire technologique pour rendre les entreprises plus visibles, plus modernes et plus efficaces.</p>
        <p>Notre point de départ, c’est vous. Votre histoire, vos défis, vos ambitions. Notre rôle : les transformer en solutions qui ont du sens, à l’écran comme sur le terrain.</p>
        <a className="text-link" href="#contact">
          Faisons connaissance
          <ArrowUpRight size={18} />
        </a>
      </Reveal>
    </div>
  </section>;
}
