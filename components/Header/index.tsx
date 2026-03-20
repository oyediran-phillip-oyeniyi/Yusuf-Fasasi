"use client"


import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"


const Header = ()=>{

    const pathname = usePathname()
    return (
        <header>
            <div className="main-container inner">
                <Link href="/">
                    <Image src="/yfc.png" loading="eager" alt="Logo" width={132} height={80} className="lg:scale-125"/>
                </Link>

                <nav className="mb-3 flex items-center lg:text-lg">
                    <Link href="/" className={`nav-link ${pathname === "/" && "is-active p-2 py-5 bg-white text-black rounded-md is-home" }`}>
                        Home
                    </Link>

                    <Link href="/coins" className={`nav-link ${pathname === "/coins" && "is-active p-2 py-5 bg-white text-black rounded-md"}`}>All Coins</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header