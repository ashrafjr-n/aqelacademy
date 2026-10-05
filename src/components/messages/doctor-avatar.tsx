import Image from "next/image";
import { drMuaffaq } from "@/content/courses";

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

interface DoctorAvatarProps {
  size?: keyof typeof sizeClasses;
}

/** The doctor's photo: students see who they're talking to, and the doctor (the only admin) sees it as his own avatar. */
export function DoctorAvatar({ size = "md" }: DoctorAvatarProps) {
  return (
    <span className={`relative shrink-0 overflow-hidden rounded-full bg-surface ring-2 ring-white ${sizeClasses[size]}`}>
      <Image src={drMuaffaq.image.src} alt="" fill sizes="48px" className="object-cover object-top" />
    </span>
  );
}
