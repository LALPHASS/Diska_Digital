import { Asterisk } from '@/components/ui/Brand';
import { ArrowUpRight, BarChart3, ShieldCheck, Wifi } from 'lucide-react';
export type VisualKind = 'segu' | 'kanu' | 'signal' | 'network';
export function ProjectVisual({
  kind
}: {
  kind: VisualKind;
}) {
  if (kind === 'segu') return <div className="project-visual visual-segu" aria-hidden="true">
    <div className="segu-orbit" />
    <div className="segu-paper paper-back">
      <span className="paper-meta">UN NOUVEAU REGARD</span>
      <Asterisk />
      <span className="segu-word">ségu.</span>
      <span className="paper-foot">DES RACINES. DE L’AUDACE.</span>
    </div>
    <div className="segu-paper paper-front">
      <span className="paper-meta">IDENTITÉ / EXPLORATION 01</span>
      <span className="segu-word">ségu.</span>
      <div className="segu-symbol">
        <span />
        <span />
        <span />
      </div>
      <span className="paper-foot">LE GOÛT DES BELLES CHOSES.</span>
    </div>
    <div className="segu-card">
      ségu.
      <span>Tout commence par une idée.</span>
    </div>
    <span className="visual-corner">BRAND EXPERIMENT — 01</span>
  </div>;
  if (kind === 'kanu') return <div className="project-visual visual-kanu" aria-hidden="true">
    <div className="web-mockup">
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span>kanu.studio</span>
      </div>
      <div className="web-nav">
        <strong>kanu®</strong>
        <span>Collection &nbsp; À propos</span>
        <ArrowUpRight size={13} />
      </div>
      <div className="web-content">
        <span className="web-eyebrow">LES OBJETS ONT UNE HISTOIRE.</span>
        <strong>
          Le quotidien,
          <br />
          <em>autrement.</em>
        </strong>
        <span className="web-shop">
          Découvrir la collection
          <ArrowUpRight size={10} />
        </span>
      </div>
      <div className="kanu-vase">
        <div />
        <span />
      </div>
      <div className="web-foot">
        <span>Design pensé pour durer.</span>
        <span>01 / 03</span>
      </div>
    </div>
    <div className="phone-mockup">
      <span className="phone-notch" />
      <strong>kanu®</strong>
      <div className="phone-vase" />
      <span>
        Simple.
        <br />
        <em>Essentiel.</em>
      </span>
      <div className="phone-button">Explorer ↗</div>
    </div>
    <span className="visual-corner">DIGITAL EXPERIENCE — 02</span>
  </div>;
  if (kind === 'signal') return <div className="project-visual visual-signal" aria-hidden="true">
    <div className="signal-poster">
      <span className="poster-top">DISKA DIGITAL / ÉTUDE GRAPHIQUE</span>
      <strong>
        Faire
        <br />
        bonne
        <br />
        <em>impression.</em>
      </strong>
      <Asterisk />
      <span className="poster-bottom">DES IDÉES QUI LAISSENT UNE TRACE. ↗</span>
    </div>
    <div className="signal-poster poster-second">
      <Asterisk />
      <strong>
        Penser
        <br />
        plus
        <br />
        <em>loin.</em>
      </strong>
      <span className="poster-bottom">DU PIXEL AU PAPIER.</span>
    </div>
    <span className="visual-corner">PRINT & COMMUNICATION — 03</span>
  </div>;
  return <div className="project-visual visual-network" aria-hidden="true">
    <div className="network-grid" />
    <div className="network-node node-a">
      <Wifi size={28} />
    </div>
    <div className="network-node node-b">
      <ShieldCheck size={27} />
    </div>
    <div className="network-node node-c">
      <BarChart3 size={25} />
    </div>
    <div className="network-center">
      <span className="system-dot" />
      <strong>
        Tout est
        <br />
        <em>connecté.</em>
      </strong>
      <span className="network-label">UN ÉCOSYSTÈME. UNE VISION.</span>
    </div>
    <div className="network-pill">
      <span />
      Infrastructure, pensée ensemble.
    </div>
    <span className="visual-corner">IT & INFRASTRUCTURE — 04</span>
  </div>;
}
