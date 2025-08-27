"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconMenu2, IconSearch, IconUser, IconHeart, IconShoppingCart } from "@tabler/icons-react"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 h-full">
    

        {/* Logo */}
        <div className="flex items-center ml-2 lg:ml-0">
          <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2  text-center">Thefty Cent</h1>
        </div>

        {/* Right side icons */}
        <div className="ml-auto flex items-center gap-4">
              {/* Shopping cart */}
          <button className="relative p-2 rounded-md hover:bg-gray-100">
            <IconShoppingCart className="h-5 w-5" />
            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span> */}
          </button>
        </div>
      </div>

     
    </header>


  )
}
