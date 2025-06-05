import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <span className="text-2xl font-bold">PetSync</span>
    </Link>
  );
}
