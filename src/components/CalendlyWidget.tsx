import { useMemo } from 'react';

interface CalendlyWidgetProps {
  url?: string;
  height?: string;
  className?: string;
}

const CalendlyWidget = ({
  url = 'https://calendly.com/i-taurel-aui/wbl-programs-info-session?primary_color=1c9551',
  height = '700px',
  className = ''
}: CalendlyWidgetProps) => {
  const iframeSrc = useMemo(() => {
    const sep = url.includes('?') ? '&' : '?';
    const domain = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    return `${url}${sep}embed_domain=${encodeURIComponent(domain)}&embed_type=Inline`;
  }, [url]);

  return (
    <div className={className}>
      <iframe
        title="Schedule a meeting"
        src={iframeSrc}
        width="100%"
        height={height}
        frameBorder={0}
        style={{ border: 0, minWidth: '320px' }}
      />
    </div>
  );
};

export default CalendlyWidget;
