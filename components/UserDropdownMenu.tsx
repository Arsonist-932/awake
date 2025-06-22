"use client";
import React from "react";
import { Settings, UserCircle, Bell, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import { Button } from "./ui/button";
import Link from "next/link";
import ThemeToggleBar from "./ThemeToggleBar";

export default function UserDropdownMenu({
  user,
}: {
  user?: string | undefined;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative rounded-lg border-none">
            <UserCircle size={24} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64" align="start">
          <DropdownMenuLabel className="flex items-center gap-2 text-sm">
            <UserCircle /> {user ? `Bonjour, ${user}` : "Bonjour, Invité"}
          </DropdownMenuLabel>

          {user && (
            <>
              {/* <PROFIL /> */}
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <Link href={""}>Mon profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <Link href={""}>Mes séances</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <PODCASTS /> */}
              <DropdownMenuLabel className="text-xs">
                PODCASTS
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <Link href={""}>Mes podcasts enregistrés</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <Link href={""}>Mon historique</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <Link href={""}>Mes achats</Link>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />

          {/* <THEME /> */}
          <DropdownMenuLabel className="flex items-center gap-5 text-xs">
            THÈME
            <ThemeToggleBar />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* <SETTINGS /> */}
          <DropdownMenuLabel className="text-xs uppercase">
            réglages
          </DropdownMenuLabel>

          {user && (
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <Link href={""}>Notifications</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href={""}>Paramètres</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Aide</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            {user ? (
              <LogoutButton />
            ) : (
              <div className="flex w-full justify-center gap-2 p-2">
                <Button
                  asChild
                  size="sm"
                  variant={"outline"}
                  className="w-full"
                >
                  <Link href="/auth/login">Sign in</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant={"default"}
                  className="w-full"
                >
                  <Link href="/auth/sign-up">Sign up</Link>
                </Button>
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
