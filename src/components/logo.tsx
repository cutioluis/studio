import Link from 'next/link';
import type { SVGProps } from 'react';

const SparkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    className={`h-7 w-7 ${props.className || ''}`}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
  </svg>
);

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 text-2xl font-bold text-foreground transition-colors hover:text-accent ${className}`}>
      <SparkIcon className="text-accent" />
      <span>Landing Spark</span>
    </Link>
  );
}
