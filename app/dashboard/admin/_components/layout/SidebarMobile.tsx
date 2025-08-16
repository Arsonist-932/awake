import { Button } from "@/components/ui/button";
import { AlignCenter } from "lucide-react";
import { useEffect, useState } from "react";

import { NavItem } from "@/types";
import { LogoutButton } from "@/components/logout-button";
import { useRouter, useSearchParams } from "next/navigation";
import ThemeToggleBar from "@/components/ThemeToggleBar";
import { navItems } from "./Sidebar";

const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (id: string) => {
    setIsOpen(false);
    setActiveTab(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "dashboard";
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <>
      <Button
        variant={"ghost"}
        className="flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AlignCenter />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 left-0 top-32 z-50 bg-white shadow-lg dark:bg-black">
          <div className="p-4">
            {navItems.map((item: NavItem) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`mb-2 w-full justify-start ${
                    activeTab === item.id
                      ? "hover:bg-foreground/30"
                      : "hover:bg-foreground/30"
                  }`}
                  onClick={() => {
                    handleTabChange(item.id);
                  }}
                >
                  <Icon className="mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          <div className="absolute bottom-0 w-full">
            <div className="flex items-center justify-between gap-3 p-4">
              <p>Theme</p>
              <ThemeToggleBar />
            </div>
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMobile;
