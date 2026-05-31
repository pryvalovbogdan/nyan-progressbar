import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

interface SupportTileProps {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  icon: string;
  accentColor?: string;
}

export function SupportTile({ title, description, href, buttonLabel, icon, accentColor = '#80deea' }: SupportTileProps) {
  return (
    <Card className="flex flex-col border-border bg-card hover:border-[#80deea]/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]">
      <CardHeader className="pb-3">
        <div className="text-4xl mb-2">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ className: 'w-full text-background font-semibold' })}
          style={{ backgroundColor: accentColor }}
        >
          {buttonLabel}
        </a>
      </CardContent>
    </Card>
  );
}
