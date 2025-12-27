import { Github, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/yaqiin/quran',
    label: 'Github',
  },
  {
    icon: Mail,
    href: 'mailto:contact@yaqiin.org',
    label: 'Mail',
  },
];

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="yaqiin-container">
        <Separator className="mb-6" />

        {/* Mobile */}
        <div className="flex flex-col items-center gap-4 py-6 md:hidden">
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {currentYear} &copy; {t('copyright')}
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden items-center justify-between py-6 md:flex">
          <p className="text-sm text-muted-foreground">
            {currentYear} &copy; {t('copyright')}
          </p>

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
