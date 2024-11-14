'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  ChevronDown, 
  LogOut, 
  Share2, 
  Trophy, 
  Users2, 
  Sun, 
  Moon, 
  FileText, 
  Library, 
  User, 
  Settings, 
  Menu,
  Compass, 
  Newspaper, 
  Layout
} from 'lucide-react'
import Link from "next/link"
import { useTheme } from "next-themes"
import { ThemeProvider } from "next-themes"
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Fix Avatar imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Rest of the imports
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  // Remove: CardDescription, 
  // Remove: CardFooter 
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Update imports to include Sidebar components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  // Remove: SidebarMenuButton,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"

import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

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
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function StatsCard({ 
  value, 
  label, 
  valueColor = "text-foreground" 
}: { 
  value: string | number
  label: string
  valueColor?: string 
}) {
  return (
    <Card className="p-4">
      <CardContent className="p-0 space-y-1">
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}

function DashboardContent() {
  const { open, toggleSidebar } = useSidebar()
  const router = useRouter()

  return (
    <div className="flex min-h-screen">
      <div className={cn(
        "flex-shrink-0 transition-all duration-300",
        open ? "w-64" : "w-16"
      )} />
      
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-border/40 h-[60px] flex items-center px-4">
          <div className="flex items-center justify-between w-full">
            {open ? (
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Trophy className="h-6 w-6" />
                <span className={cn(
                  "transition-all duration-200",
                  !open && "opacity-0 hidden"
                )}>Chess Analyzer</span>
              </Link>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={toggleSidebar}
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
            {open && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={toggleSidebar}
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/analysis" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <BarChart3 className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>Analysis</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/reports" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>Reports</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/playground" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <Layout className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>Playground</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/explore" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <Compass className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>Explore</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/library" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <Library className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>Library</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/teams" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <Users2 className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>Teams</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/tournaments" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <Trophy className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>Tournaments</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/news" className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                !open && "justify-center"
              )}>
                <Newspaper className="h-4 w-4 flex-shrink-0" />
                <span className={cn("flex-1", !open && "hidden")}>News</span>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-border/40 p-2 pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn(
                "w-full h-8 px-2 justify-start",
                !open && "justify-center"
              )}>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className={cn("ml-2", !open && "hidden")}>Blitzmystic</span>
                <ChevronDown className={cn("ml-auto h-4 w-4", !open && "hidden")} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 focus:bg-red-100 dark:focus:bg-red-900/50"
                onClick={async () => {
                  try {
                    if (auth) {
                      await auth.signOut()
                      router.replace('/')
                    }
                  } catch (error) {
                    console.error('Logout error:', error)
                  }
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="sticky top-0 z-50 flex h-[60px] items-center border-b border-border/40 bg-background px-6">
          <div className="flex-1 flex items-center">
            {/* Empty for balance */}
          </div>
          
          <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 absolute left-1/2 transform -translate-x-1/2">
            <Link className="text-sm font-medium" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium whitespace-nowrap" href="/about">
              About Us
            </Link>
            <Link className="text-sm font-medium" href="/learn">
              Learn
            </Link>
            <Link className="text-sm font-medium" href="/practice">
              Practice
            </Link>
            <Link className="text-sm font-medium" href="/pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium" href="/contact">
              Contact
            </Link>
          </nav>

          <div className="flex-1 flex items-center justify-end gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4">
                  <Link className="text-sm font-medium" href="/">
                    Home
                  </Link>
                  <Link className="text-sm font-medium" href="/about">
                    About Us
                  </Link>
                  <Link className="text-sm font-medium" href="/learn">
                    Learn
                  </Link>
                  <Link className="text-sm font-medium" href="/practice">
                    Practice
                  </Link>
                  <Link className="text-sm font-medium" href="/pricing">
                    Pricing
                  </Link>
                  <Link className="text-sm font-medium" href="/contact">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden">
          <div className="px-4 py-6 space-y-6 max-w-[1920px] mx-auto min-w-0 w-full">
            <div className="w-full text-center mb-6 max-w-full">
              <h1 className="text-3xl font-bold mb-2 break-words">Welcome, Blitzmystic!</h1>
              <p className="text-lg text-muted-foreground break-words">Here&apos;s your comprehensive chess performance overview</p>
            </div>
            
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="start-date" className="text-sm font-medium mb-1 block">
                  Start Date
                </Label>
                <Input 
                  type="date" 
                  id="start-date" 
                  placeholder="dd.mm.yyyy"
                  className="w-full" 
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="end-date" className="text-sm font-medium mb-1 block">
                  End Date
                </Label>
                <Input 
                  type="date" 
                  id="end-date" 
                  placeholder="dd.mm.yyyy"
                  className="w-full" 
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 landscape:grid-cols-2 lg:landscape:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <StatsCard value="-" label="Lifetime matches" />
                      <StatsCard value="-" label="Victory percentage" />
                      <StatsCard value="-" label="Current performance" />
                      <StatsCard value="-" label="Peak performance" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Win Rate Chart</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Game Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Game type distribution will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="min-w-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Rating History Chart</p>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-6 md:grid-cols-10 xl:grid-cols-12">
                <Card className="md:col-span-7 xl:col-span-9">
                  <CardHeader>
                    <CardTitle>Recent Games</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">No recent games to display</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-3 xl:col-span-3">
                  <CardHeader>
                    <CardTitle>Tactics & Puzzles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Tactics and puzzles statistics will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-6 md:grid-cols-10 xl:grid-cols-12">
                <Card className="md:col-span-7 xl:col-span-9">
                  <CardHeader>
                    <CardTitle>Chess News</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">No recent news to display</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-3 xl:col-span-3">
                  <CardHeader>
                    <CardTitle>Daily Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                        Check here for daily chess tips and strategies
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="border-t border-border/40 px-6 py-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="ghost" size="sm">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm">
                Terms and Conditions
              </Button>
              <Button variant="ghost" size="sm">
                Affiliate Program
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Chess Analyzer. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <DashboardContent />
        </SidebarProvider>
      </ThemeProvider>
    </ProtectedRoute>
  )
}