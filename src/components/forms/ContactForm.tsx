'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Pencil } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { validateContactForm } from '@/lib/validators';
import type { ContactFormData, ValidationErrors } from '@/types';
export function ContactForm() {
  const [data, setData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [prepared, setPrepared] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  function submit(event: FormEvent) {
    event.preventDefault();
    const validation = validateContactForm(data);
    setErrors(validation.errors);
    if (!validation.isValid) {
      const first = Object.keys(validation.errors)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPrepared(true);
  }
  const body = `Bonjour Diska Digital,\n\n${data.message.trim()}\n\n${data.fullName.trim()}\n${data.email.trim()}`;
  const mailto = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(data.subject.trim())}&body=${encodeURIComponent(body)}`;
  if (prepared) return <div className="form-ready" role="status">
    <span className="form-ready-icon">
      <Check size={26} />
    </span>
    <h3>
      Votre idée est prête
      <br />
      à prendre son envol.
    </h3>
    <p>{`Ouvrez votre messagerie pour envoyer votre message à ${CONTACT_INFO.email}.`}</p>
    <a className="button button-dark" href={mailto}>
      Ouvrir ma messagerie
      <ArrowUpRight size={18} />
    </a>
    <button className="edit-message" onClick={() => setPrepared(false)}>
      <Pencil size={15} />
      Modifier mon message
    </button>
    <p className="form-note">Vous préférez un échange direct ? Le lien WhatsApp est juste à côté.</p>
  </div>;
  const change = (name: keyof ContactFormData, value: string) => {
    setData(previous => ({
      ...previous,
      [name]: value
    }));
    setErrors(previous => ({
      ...previous,
      [name]: undefined
    }));
  };
  return <form ref={form} onSubmit={submit} noValidate className="contact-form">
    <span className="eyebrow">Parlez-nous de votre idée</span>
    <div className="form-row">
      {([{
        name: 'fullName',
        label: 'Votre nom',
        placeholder: 'Comment vous appelez-vous ?',
        type: 'text',
        autoComplete: 'name'
      }, {
        name: 'email',
        label: 'Votre e-mail',
        placeholder: 'vous@entreprise.com',
        type: 'email',
        autoComplete: 'email'
      }] as const).map(field => <div className="form-field" key={field.name}>
        <label htmlFor={field.name}>
          {field.label}
          <span aria-hidden="true"> *</span>
        </label>
        <input id={field.name} name={field.name} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} value={data[field.name]} onChange={event => change(field.name, event.target.value)} required aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} />
        {errors[field.name] && <span className="form-error" id={`${field.name}-error`}>
          {errors[field.name]}
        </span>}
      </div>)}
    </div>
    <div className="form-field">
      <label htmlFor="subject">
        Votre besoin
        <span aria-hidden="true"> *</span>
      </label>
      <select id="subject" name="subject" value={data.subject} onChange={event => change('subject', event.target.value)} required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined}>
        <option value="">Choisissez une expertise</option>
        <option>Digital & Web</option>
        <option>Design & Communication</option>
        <option>IT & Maintenance</option>
        <option>Équipement informatique</option>
        <option>Un projet qui mêle plusieurs expertises</option>
      </select>
      {errors.subject && <span className="form-error" id="subject-error">
        {errors.subject}
      </span>}
    </div>
    <div className="form-field">
      <label htmlFor="message">
        Quelques mots sur votre projet
        <span aria-hidden="true"> *</span>
      </label>
      <textarea id="message" name="message" rows={3} placeholder="Votre idée, votre ambition, ce qui vous ferait avancer…" value={data.message} onChange={event => change('message', event.target.value)} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
      {errors.message && <span className="form-error" id="message-error">
        {errors.message}
      </span>}
    </div>
    <div className="form-submit">
      <span>
        Les grandes choses
        <br />
        commencent par un échange.
      </span>
      <button className="button button-dark" type="submit">
        Préparer mon message
        <ArrowUpRight size={18} />
      </button>
    </div>
    <p className="form-note">Ce formulaire prépare un e-mail dans votre messagerie. Vos informations ne sont pas stockées sur le site.</p>
  </form>;
}
