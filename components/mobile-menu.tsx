'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Link className="text-sm font-medium" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium" href="#">
            Learn
          </Link>
          <Link className="text-sm font-medium" href="#">
            Analysis
          </Link>
          <Link className="text-sm font-medium" href="#">
            Practice
          </Link>
          <Link className="text-sm font-medium" href="#">
            Pricing
          </Link>
          <Button className="w-full">Sign In</Button>
          <Button className="w-full" variant="outline">Try Now</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}