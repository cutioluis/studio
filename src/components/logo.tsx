import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex min-w-0 items-center gap-2 text-base font-bold leading-tight sm:text-2xl text-foreground transition-colors hover:text-accent ${className}`}>
      <Image
        src="/images/logo-ceciglam.png"
        alt=""
        width={140}
        height={140}
        className="h-12 w-12 shrink-0 sm:h-20 sm:w-20"
      />
      <span>CECIGLAM ACADEMIA</span>
    </Link>
  );
}
