import { ArrowUpRight } from 'lucide-react';
import { Brand } from '@/components/ui/Brand';
export function Footer() {
  return <footer className="site-footer">
    <div className="shell">
      <div className="footer-top">
        <a href="#hero" aria-label="Diska Digital, retour à l’accueil">
          <Brand light />
        </a>
        <span>
          La créativité crée des connexions.
          <br />
          Nous créons la suite avec vous.
        </span>
        <a href="#hero" className="footer-back">
          Retour en haut
          <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        diska digital
        <span>®</span>
      </div>
      <div className="footer-bottom">
        <span>{`© ${new Date().getFullYear()} Diska Digital`}</span>
        <nav aria-label="Navigation de pied de page">
          <a href="#portfolio">Notre univers</a>
          <a href="#services">Expertises</a>
          <a href="#about">Le studio</a>
          <a href="#contact">Contact</a>
        </nav>
        <span>
          Bamako, Mali
          <span className="footer-dot">●</span>
        </span>
      </div>
    </div>
  </footer>;
}
