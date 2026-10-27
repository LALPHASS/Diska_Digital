import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { ContactForm } from '@/components/forms/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { Asterisk } from '@/components/ui/Brand';
export function ContactSection() {
  const whatsapp = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`;
  return <section id="contact" className="contact-section section-pad">
    <div className="shell">
      <Reveal className="contact-heading">
        <span className="eyebrow">
          <span className="section-index">05 /</span>
           Et maintenant ?
        </span>
        <h2>
          On fait quelque chose
          <br />
          <span className="serif">de grand, ensemble ?</span>
          <Asterisk />
        </h2>
      </Reveal>
      <div className="contact-layout">
        <Reveal className="contact-copy">
          <span className="status-label">
            <span className="status-dot" />
            À l’écoute de votre prochain projet
          </span>
          <p>
            Une idée précise, une envie de changement
            <br />
            ou simplement une question.
            <br />
            Nous serons ravis d’en parler.
          </p>
          <a className="contact-email" href={`mailto:${CONTACT_INFO.email}`}>
            {CONTACT_INFO.email}
            <ArrowUpRight size={21} />
          </a>
          <a className="whatsapp-link" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} />
            Échangeons sur WhatsApp
            <ArrowUpRight size={17} />
          </a>
          <div className="contact-details">
            <div>
              <span className="eyebrow">Retrouvez-nous</span>
              <span>
                {CONTACT_INFO.address}
              </span>
            </div>
            <div>
              <span className="eyebrow">Appelez-nous</span>
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal className="form-panel">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  </section>;
}
