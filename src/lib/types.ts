export type UserRole = "poster" | "team";

export type JobStatus =
  | "draft"
  | "open"
  | "bidding"
  | "awarded"
  | "in_progress"
  | "completion_submitted"
  | "approved"
  | "paid"
  | "disputed"
  | "cancelled";

export type PaymentStatus = "pending" | "held" | "released" | "failed" | "refunded";

export type ScreenState =
  | "ready"
  | "loading"
  | "empty"
  | "error"
  | "plan_limit"
  | "permission_denied";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  phone: string;
  location: string;
  avatar: string;
  membership: "free" | "plus" | "pro";
  rating: number;
  certifications: Certification[];
}

export interface Certification {
  id: string;
  type: string;
  provider: string;
  certificationId: string;
  expiresAt: string;
  verified: boolean;
  fileName: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  budget: number;
  deadline: string;
  urgency: boolean;
  status: JobStatus;
  paymentStatus: PaymentStatus;
  posterId: string;
  teamId?: string;
  teamName?: string;
  images: string[];
  pdfs: string[];
  requirements: string[];
  bidCount: number;
  createdAt: string;
  completedAt?: string;
}

export interface Bid {
  id: string;
  jobId: string;
  teamId: string;
  teamName: string;
  teamAvatar: string;
  teamRating: number;
  amount: number;
  estimatedDays: number;
  notes: string;
  submittedAt: string;
  certifications: string[];
  status: "pending" | "approved" | "rejected" | "withdrawn";
}

export interface TimelineEvent {
  id: string;
  jobId: string;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  actorAvatar: string;
  alert?: boolean;
}

export interface ChatMessage {
  id: string;
  jobId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  role: UserRole;
  text: string;
  timestamp: string;
  attachment?: { name: string; type: "jpg" | "pdf"; url: string };
  edited?: boolean;
}

export interface NotificationItem {
  id: string;
  type: "job" | "bid" | "payment" | "dispute" | "system";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  href?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  features: string[];
  highlighted?: boolean;
}
