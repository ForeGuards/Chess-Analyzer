'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Zap, Moon, Sun, Laptop, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6" />
          <span className="sr-only">Chess Analyzer</span>
          <span className="ml-2 text-lg font-semibold">Chess Analyzer</span>
        </Link>
        <nav className="mx-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Learn
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Analysis
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Practice
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
            <Button>Try Now</Button>
          </div>
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
              <div className="flex flex-col gap-4 py-4">
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
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">Sign In</Button>
                <Button className="w-full">Try Now</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  The ultimate chess analysis tool
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore the most advanced chess engine available. Analyze your game with the help of Stockfish, the strongest
                  open-source chess engine.
                </p>
              </div>
              <div className="w-full max-w-[1400px] mx-auto overflow-hidden rounded-lg">
                <Image
                  src="/images/chess-hero.jpg"
                  alt="Chess players analyzing a game"
                  width={1200}
                  height={600}
                  className="w-full h-auto aspect-[2/1] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Analyze your game like a grandmaster</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative group">
                <Image
                  src="/images/deep-analysis.jpg"
                  alt="Deep analysis visualization"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Deep analysis</h3>
                  <p className="text-gray-500 dark:text-gray-400">Get the best move suggestions and see the eval bar in action.</p>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="/images/open-source-engine.jpg"
                  alt="Open source engine visualization"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Open-source engine</h3>
                  <p className="text-gray-500 dark:text-gray-400">Stockfish is the strongest open-source chess engine available.</p>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="/images/game-insights.jpg"
                  alt="Game insights visualization"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Game Insights</h3>
                  <p className="text-gray-500 dark:text-gray-400">Learn from your mistakes and improve your game with detailed insights.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Get started today</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
              Join millions of members and play more than 50 million games per day on our website and mobile apps!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative group">
                <Image
                  src="/images/unlimited-games.jpg"
                  alt="Unlimited games visualization"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Unlimited games</h3>
                  <p className="text-gray-500 dark:text-gray-400">Play as many games as you want, whenever you want!</p>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="/images/play-anywhere.jpg"
                  alt="Play anywhere visualization"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Play anywhere</h3>
                  <p className="text-gray-500 dark:text-gray-400">Enjoy the same great experience across all your devices.</p>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="/images/awesome-experience.jpg"
                  alt="Awesome experience visualization"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Awesome experience</h3>
                  <p className="text-gray-500 dark:text-gray-400">Experience stunning visuals, easy-to-use features, and more!</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Chess Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}