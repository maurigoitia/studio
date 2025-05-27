
import Link from 'next/link';
import { PawPrint } from 'lucide-react'; // Using PawPrint as a placeholder for the abstract pet icon

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="bg-primary p-1.5 rounded-lg group-hover:bg-primary/90 transition-colors shadow-sm">
        {/* Placeholder for the abstract pet icon. You can replace PawPrint with an SVG or another icon if you have one. */}
        <PawPrint className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
        PetSync
      </span>
    </Link>
  );
}
