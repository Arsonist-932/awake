"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggleBar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  const themes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "system", icon: Laptop, label: "System" },
  ];

  return (
    <div className="flex items-center justify-center gap-1 rounded-lg">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`flex items-center justify-center rounded-md p-2 transition-all duration-200 hover:bg-background hover:shadow-sm ${
            theme === id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={label}
          aria-label={`Change to ${label.toLowerCase()} theme`}
        >
          <Icon size={ICON_SIZE} />
        </button>
      ))}
    </div>
  );
}
