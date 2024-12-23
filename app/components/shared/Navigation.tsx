"use client"

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "@/hooks/useTheme";

const Navigation: FC = () => {
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-2 ml-5">
            <span className="font-bold">DocuNest</span>
          </Link>
        </div>

        <div className="md:flex md:flex-1 flex justify-center items-center">
          <div className="flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-2 text-lg font-semibold hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun
              className={`h-5 w-5 ${
                theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
              } transition-all`}
            />
            <Moon
              className={`absolute h-5 w-5 ${
                theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
              } transition-all`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;