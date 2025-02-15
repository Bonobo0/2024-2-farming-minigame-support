"use client";
import Link from "next/link";
import { useLoading } from "../LoadingProvider";

export default function NavLink({ href, children, className = "" }) {
  const { setLoading } = useLoading();

  const handleClick = () => {
    setLoading(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
