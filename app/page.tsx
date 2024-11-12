'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Zap, Moon, Sun, Laptop, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"

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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link className="flex items-center space-x-2" href="#">
            <Zap className="h-6 w-6" />
            <span className="inline-block font-semibold">Chess Analyzer</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
              Home
            </Link>
            <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
              Learn
            </Link>
            <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
              Analysis
            </Link>
            <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
              Practice
            </Link>
            <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
              <Link href="/sign-up">
                <Button variant="outline">Try Now</Button>
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
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
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">Sign In</Button>
                  <Link href="/sign-up">
                    <Button className="w-full" variant="outline">Try Now</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  The ultimate chess analysis tool
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore the most advanced chess engine available. Analyze your game with the help of Stockfish, the strongest
                  open-source chess engine.
                </p>
              </div>
              <div className="w-full max-w-[1600px] mx-auto">
                <Image
                  src="/images/chess-hero.jpg"
                  alt="Chess players analyzing a game"
                  width={1600}
                  height={800}
                  className="rounded-lg object-cover w-full aspect-[2/1]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Analyze your game like a grandmaster</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative">
                <Image
                  src="/images/deep-analysis.jpg"
                  alt="Deep analysis visualization"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Deep analysis</h3>
                  <p className="text-muted-foreground">Get the best move suggestions and see the eval bar in action.</p>
                </div>
              </div>
              <div className="group relative">
                <Image
                  src="/images/open-source-engine.jpg"
                  alt="Open source engine visualization"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Open-source engine</h3>
                  <p className="text-muted-foreground">Stockfish is the strongest open-source chess engine available.</p>
                </div>
              </div>
              <div className="group relative">
                <Image
                  src="/images/game-insights.jpg"
                  alt="Game insights visualization"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Game Insights</h3>
                  <p className="text-muted-foreground">Learn from your mistakes and improve your game with detailed insights.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Get started today</h2>
            <p className="text-center text-muted-foreground mb-8">
              Join millions of members and play more than 50 million games per day on our website and mobile apps!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative">
                <Image
                  src="/images/unlimited-games.jpg"
                  alt="Unlimited games visualization"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Unlimited games</h3>
                  <p className="text-muted-foreground">Play as many games as you want, whenever you want!</p>
                </div>
              </div>
              <div className="group relative">
                <Image
                  src="/images/play-anywhere.jpg"
                  alt="Play anywhere visualization"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Play anywhere</h3>
                  <p className="text-muted-foreground">Enjoy the same great experience across all your devices.</p>
                </div>
              </div>
              <div className="group relative">
                <Image
                  src="/images/awesome-experience.jpg"
                  alt="Awesome experience visualization"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-[4/3]"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Awesome experience</h3>
                  <p className="text-muted-foreground">Experience stunning visuals, easy-to-use features, and more!</p>
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
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Chess Analyzer. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}