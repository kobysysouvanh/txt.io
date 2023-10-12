'use client'

import Link from "next/link";
import clsx from "clsx";


interface MobileItemProps {
    href: string;
    icon: any
    active?: boolean
}

const MobileItem: React.FC<MobileItemProps> = ({
    href, icon: Icon, active
}) => {
  return (
    <Link href={href}
    className={clsx(`group flex gap-x-3 justify-center w-full p-4`, active && 'bg-red-400 text-white')}
    >
        <Icon className="h-8 w-8"/>
    </Link>
  )
}

export default MobileItem