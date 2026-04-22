import Image from "next/image";

type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

export default function Avatar({
  src,
  alt,
  size = 36,
  className = "",
}: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-full bg-[var(--hair)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
        unoptimized
      />
    </span>
  );
}
