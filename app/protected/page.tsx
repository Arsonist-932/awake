"use client";
import React from "react";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

// Dashboard Component
const HypnotherapyDashboard: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <Button asChild>
        <Link href="/dashboard/admin">
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Dashboard admin</span>
          </div>
        </Link>
      </Button>

      <Button asChild>
        <Link href="/dashboard/client">
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Dashboard client</span>
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default HypnotherapyDashboard;
