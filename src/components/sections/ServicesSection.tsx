import { ArrowUpRight, Plus } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Asterisk } from '@/components/ui/Brand';
const services = [{
  title: 'Digital & Web',
  description: 'Des sites et des applications qui font plus que vous représenter. Nous concevons des expériences claires, rapides et utiles, au service de vos objectifs.',
  tags: ['Sites vitrines', 'Applications web', 'E-commerce', 'UI / UX']
}, {
  title: 'Design & Communication',
  description: 'Une identité qui se reconnaît et des messages qui se retiennent. Du premier logo au dernier support imprimé, nous donnons une forme cohérente à votre marque.',
  tags: ['Identité visuelle', 'Design graphique', 'Print', 'Communication']
}, {
  title: 'IT & Maintenance',
  description: 'Votre technologie doit simplifier votre quotidien. Nous vous accompagnons dans la gestion, la maintenance et l’évolution de votre infrastructure informatique.',
  tags: ['Support informatique', 'Maintenance', 'Réseaux', 'Infrastructure']
}, {
  title: 'Équipement informatique',
  description: 'Le bon matériel, pour le bon usage. Nous vous aidons à choisir les équipements adaptés à votre activité et à vos besoins, avec un conseil concret.',
  tags: ['Ordinateurs', 'Périphériques', 'Conseil', 'Installation']
}];
export function ServicesSection() {
  return <section id="services" className="services-section section-pad">
    <div className="shell services-layout">
      <Reveal className="services-copy">
        <span className="eyebrow">
          <span className="section-index">02 /</span>
           Nos expertises
        </span>
        <h2>
          Créatifs.
          <br />
          Techniques.
          <br />
          <span className="serif">Et complémentaires.</span>
        </h2>
        <p>
          Votre projet n’entre pas dans une case.
          <br />
          Nous non plus.
        </p>
        <div className="services-symbol">
          <Asterisk />
          <span className="mono">
            4 EXPERTISES
            <br />
            1 MÊME VISION
          </span>
        </div>
      </Reveal>
      <div className="service-list">
        {services.map((service, index) => <details key={service.title} className="service-item" open={index === 0}>
          <summary>
            <span className="mono service-number">
              0
              {index + 1}
            </span>
            <h3>
              {service.title}
            </h3>
            <Plus size={24} />
          </summary>
          <div className="service-content">
            <p>
              {service.description}
            </p>
            <div className="tags">
              {service.tags.map(tag => <span key={tag}>
                {tag}
              </span>)}
            </div>
            <a className="text-link" href="#contact">
              Discutons de vos besoins
              <ArrowUpRight size={16} />
            </a>
          </div>
        </details>)}
      </div>
    </div>
  </section>;
}
