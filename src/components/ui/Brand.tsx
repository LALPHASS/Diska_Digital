import Image from 'next/image';
export function Brand({
  light = false
}: {
  light?: boolean;
}) {
  return <span className={`brand${light ? ' brand-light' : ''}`}>
    <Image src="/logo.webp" alt="" width={42} height={35} className="brand-mark" />
    <span>
      diska
      <span className="brand-second">
        digital
        <span className="brand-dot">.</span>
      </span>
    </span>
  </span>;
}
export function Asterisk({
  className = ''
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
    <path d="M50 4v92M4 50h92M17.5 17.5l65 65M17.5 82.5l65-65" stroke="currentColor" strokeWidth="16" />
  </svg>;
}
