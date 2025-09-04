"use client"

import * as React from "react"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"

export function ModeToggle() {
  const {theme, setTheme} = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={"md:border md:bg-background bg-none "}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden"/>
      <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block"/>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
