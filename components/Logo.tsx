import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/trichomia-logo-dark.svg"
        alt="Trichomia"
        width={139}
        height={35}
        priority
      />
    </Link>
  );
}
