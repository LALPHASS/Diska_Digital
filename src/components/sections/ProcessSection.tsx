import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
const steps = [{
  title: 'On vous écoute.',
  description: 'Vos besoins, votre contexte, votre ambition. Nous posons les bonnes questions avant de dessiner les réponses.',
  label: 'Audit & découverte'
}, {
  title: 'On trace la voie.',
  description: 'Une direction claire, des priorités partagées et une feuille de route adaptée à votre projet.',
  label: 'Stratégie & conception'
}, {
  title: 'On donne forme.',
  description: 'Design, développement, production. Nous construisons avec soin et avançons avec vous, étape après étape.',
  label: 'Création & exécution'
}, {
  title: 'On reste à vos côtés.',
  description: 'La mise en ligne est un début. Nous accompagnons vos outils et vos besoins au fil de leur évolution.',
  label: 'Suivi & support'
}];
export function ProcessSection() {
  return <section id="process" className="process-section section-pad">
    <div className="shell">
      <Reveal className="process-heading">
        <span className="eyebrow">
          <span className="section-index">04 /</span>
           De l’idée à la réalité
        </span>
        <h2>
          De la méthode.
          <br />
          <span className="serif">De la place pour l’audace.</span>
        </h2>
      </Reveal>
      <div className="process-grid">
        {steps.map((step, i) => <Reveal key={step.title} delay={i * 0.08} className="process-step">
          <div className="process-step-top">
            <span className="serif">
              0
              {i + 1}
            </span>
            <ArrowRight size={24} />
          </div>
          <span className="eyebrow">
            {step.label}
          </span>
          <h3>
            {step.title}
          </h3>
          <p>
            {step.description}
          </p>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
