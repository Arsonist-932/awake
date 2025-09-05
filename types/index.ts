// This file contains type definitions for the application.
// These types are used throughout the application to ensure type safety and consistency.

/****** NAVBAR ******/
export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/****** ERROR COMPONENT ******/
export interface ErrorAPIProps {
  error: string;
  onClick: () => void;
}

/****** Search and Filter Props ******/
export interface SearchProps {
  name?: string;
  value: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

export interface FilterProps {
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
