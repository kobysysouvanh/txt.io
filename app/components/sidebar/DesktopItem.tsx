"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          `group flex justify-center gap-x-3 p-3 text-sm rounded-md text-gray-700 hover:bg-red-400 hover:text-white transition duration-300`,
          active && "bg-red-400 text-white cursor-default"
        )}
      >
        <Icon class="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
