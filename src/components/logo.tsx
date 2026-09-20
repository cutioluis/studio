import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 text-2xl font-bold text-foreground transition-colors hover:text-accent ${className}`}>
      <Image
        src="/images/logo-ceciglam.png"
        alt="Ceciglam Logo"
        width={140}
        height={140}
        className="h-20 w-20"
      />
      <span>CECIGLAM - ACADEMY</span>
    </Link>
  );
}
