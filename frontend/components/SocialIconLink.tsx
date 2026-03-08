import Link from "next/link";
import { StaticImageData } from "next/image";
import RoundIcon from "./RoundIcon";

type SocialIconLinkProps = {
  href: string;
  src: StaticImageData;
  alt: string;
};

export default function SocialIconLink({ href, src, alt }: SocialIconLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex"
    >
      <RoundIcon src={src} alt={alt} />
    </Link>
  );
}