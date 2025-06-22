// TYPES DASHBOARD

export interface Appointment {
  id: string;
  clientName: string;
  clientId: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: "confirmed" | "pending" | "cancelled";
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateCreated: string;
  totalSessions: number;
  lastSession?: string;
  notes?: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  audioFile: string;
  category: string;
  duration: number;
  uploadDate: string;
  downloads: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  active: boolean;
  priceHistory: { price: number; date: string }[];
}

export interface AnalyticsData {
  totalViews: number;
  monthlyViews: number;
  topPages: { page: string; views: number }[];
  viewsData: { date: string; views: number }[];
}

export interface FormData {
  title: "";
  description: "";
  image: "";
  audio: "";
  categories: "";
}
