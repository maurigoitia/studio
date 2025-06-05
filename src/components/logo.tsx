import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
      <span className="text-2xl font-bold">PetSync</span>
    </Link>
  );
}
