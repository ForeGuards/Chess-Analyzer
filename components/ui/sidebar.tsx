"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarContextValue {
  open: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
  open: true,
  toggleSidebar: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const isMobile = window.innerWidth < 768
    setOpen(!isMobile)
    
    const handleResize = () => {
      setOpen(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: "icon" | "full"
}

export function Sidebar({
  className,
  collapsible = "full",
  ...props
}: SidebarProps) {
  const { open, toggleSidebar } = useSidebar()

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const isMobile = window.innerWidth < 768
      
      if (isMobile && open && !target.closest('[data-state="open"]')) {
        toggleSidebar()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside as any)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside as any)
    }
  }, [open, toggleSidebar])

  return (
    <div
      data-state={open ? "open" : "collapsed"}
      className={cn(
        "fixed top-0 left-0 z-40 h-screen flex flex-col border-r bg-background transition-all duration-300",
        open ? "w-64" : "w-16",
        className
      )}
      {...props}
    />
  )
}

export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-shrink-0", className)} {...props} />
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto py-2", className)} {...props} />
}

export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-shrink-0", className)} {...props} />
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()
  return (
    <div
      className={cn(
        "relative",
        !open && "w-full flex justify-center",
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenuButton({
  className,
  children,
  asChild,
  ...props
}: {
  className?: string
  children: React.ReactNode
  asChild?: boolean
  [key: string]: any
}) {
  const { open } = useSidebar()
  
  if (asChild) {
    return (
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
          !open && "justify-center px-0",
          className
        )}
        {...props}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              className: cn(
                child.props.className,
                !open && "w-full flex justify-center"
              )
            } as React.HTMLAttributes<HTMLElement>)
          }
          return child
        })}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
        !open && "justify-center px-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("", className)}
      {...props}
    />
  )
} 