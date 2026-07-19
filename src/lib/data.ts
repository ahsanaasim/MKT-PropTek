import type {
  Bid,
  ChatMessage,
  Job,
  MembershipPlan,
  NotificationItem,
  TimelineEvent,
  User,
} from "./types";

export const currentPoster: User = {
  id: "u-poster-1",
  name: "Ava Meridian",
  email: "ava@meridianprops.com",
  role: "poster",
  company: "Meridian Properties",
  phone: "(415) 555-0142",
  location: "San Francisco, CA",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  membership: "plus",
  rating: 4.8,
  certifications: [],
};

export const currentTeam: User = {
  id: "u-team-1",
  name: "Coastal Clean Crew",
  email: "hello@coastalclean.co",
  role: "team",
  company: "Coastal Clean LLC",
  phone: "(628) 555-0198",
  location: "Oakland, CA",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  membership: "pro",
  rating: 4.9,
  certifications: [
    {
      id: "cert-1",
      type: "Hazardous Waste Handling",
      provider: "CalEPA",
      certificationId: "CA-HH-98211",
      expiresAt: "2027-03-15",
      verified: true,
      fileName: "hazmat-cert.pdf",
    },
    {
      id: "cert-2",
      type: "Bonded & Insured",
      provider: "State Farm Commercial",
      certificationId: "SF-BI-44102",
      expiresAt: "2026-12-01",
      verified: true,
      fileName: "insurance.pdf",
    },
  ],
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop`;

export const jobs: Job[] = [
  {
    id: "job-101",
    title: "Post-renovation debris clear-out",
    description:
      "Full property clean-out after kitchen remodel. Includes haul-away of cabinets, drywall scraps, and packaging. Need before/after photos.",
    address: "1428 Valencia St",
    city: "San Francisco",
    lat: 37.7516,
    lng: -122.4209,
    budget: 850,
    deadline: "2026-07-24T17:00:00Z",
    urgency: true,
    status: "bidding",
    paymentStatus: "pending",
    posterId: "u-poster-1",
    images: [img("1600585154340-be6161a56a0c"), img("1600607687939-ce8a6c25118c")],
    pdfs: ["scope-of-work.pdf"],
    requirements: ["Insured", "Truck access", "Same-day haul"],
    bidCount: 4,
    createdAt: "2026-07-16T10:00:00Z",
  },
  {
    id: "job-102",
    title: "Estate clean-out — 3BR townhome",
    description:
      "Respectful estate clean-out. Donate usable items, recycle metals, dispose of remaining waste. Family will walk through Sunday.",
    address: "88 Clipper St",
    city: "San Francisco",
    lat: 37.7489,
    lng: -122.4321,
    budget: 2200,
    deadline: "2026-07-30T18:00:00Z",
    urgency: false,
    status: "in_progress",
    paymentStatus: "held",
    posterId: "u-poster-1",
    teamId: "u-team-1",
    teamName: "Coastal Clean Crew",
    images: [img("1560448204-e02f11c3d0e2"), img("1505693416388-ac5ce068fe85")],
    pdfs: ["inventory.pdf"],
    requirements: ["Donation partner", "Photo documentation"],
    bidCount: 6,
    createdAt: "2026-07-10T09:30:00Z",
  },
  {
    id: "job-103",
    title: "Garage purge & organize",
    description:
      "Clear garage clutter, sort recyclables, leave space broom-clean. Prefer eco-certified team.",
    address: "512 Maple Ave",
    city: "Berkeley",
    lat: 37.8715,
    lng: -122.273,
    budget: 475,
    deadline: "2026-07-22T16:00:00Z",
    urgency: false,
    status: "open",
    paymentStatus: "pending",
    posterId: "u-poster-1",
    images: [img("1558618666-fcd25c85f82e")],
    pdfs: [],
    requirements: ["Eco-certified"],
    bidCount: 2,
    createdAt: "2026-07-17T14:00:00Z",
  },
  {
    id: "job-104",
    title: "Commercial unit turn — Suite 4B",
    description:
      "Retail unit turnaround: remove fixtures, wipe surfaces, haul cardboard. Certificate of completion required.",
    address: "2100 Market St",
    city: "San Francisco",
    lat: 37.7665,
    lng: -122.429,
    budget: 1600,
    deadline: "2026-07-26T12:00:00Z",
    urgency: true,
    status: "completion_submitted",
    paymentStatus: "held",
    posterId: "u-poster-1",
    teamId: "u-team-2",
    teamName: "Bay Area Haulers",
    images: [img("1497366216548-37526070297c")],
    pdfs: ["floor-plan.pdf"],
    requirements: ["COI", "After-hours access"],
    bidCount: 3,
    createdAt: "2026-07-08T11:00:00Z",
  },
  {
    id: "job-105",
    title: "Yard waste & green bin overflow",
    description: "Storm debris and overgrown brush removal from backyard and side yard.",
    address: "77 Rosewood Dr",
    city: "Oakland",
    lat: 37.8044,
    lng: -122.2712,
    budget: 320,
    deadline: "2026-07-21T15:00:00Z",
    urgency: false,
    status: "approved",
    paymentStatus: "pending",
    posterId: "u-poster-2",
    teamId: "u-team-1",
    teamName: "Coastal Clean Crew",
    images: [img("1416879595882-3373a0480b5b")],
    pdfs: [],
    requirements: ["Green waste certified"],
    bidCount: 5,
    createdAt: "2026-07-05T08:00:00Z",
    completedAt: "2026-07-18T16:30:00Z",
  },
  {
    id: "job-106",
    title: "Hoarder unit soft clean (stage 1)",
    description:
      "Sensitive soft clean of studio unit. Biohazard screening first. Staged over two visits.",
    address: "901 Mission St #12",
    city: "San Francisco",
    lat: 37.7825,
    lng: -122.407,
    budget: 3400,
    deadline: "2026-08-05T17:00:00Z",
    urgency: false,
    status: "paid",
    paymentStatus: "released",
    posterId: "u-poster-1",
    teamId: "u-team-1",
    teamName: "Coastal Clean Crew",
    images: [img("1581578731548-c64695cc6952")],
    pdfs: ["safety-protocol.pdf"],
    requirements: ["Biohazard certified", "NDA"],
    bidCount: 2,
    createdAt: "2026-06-20T10:00:00Z",
    completedAt: "2026-07-12T14:00:00Z",
  },
  {
    id: "job-107",
    title: "Move-out deep clean + junk",
    description: "Tenant move-out: junk haul plus wipe-down of kitchen and baths.",
    address: "333 Castro St",
    city: "San Francisco",
    lat: 37.763,
    lng: -122.435,
    budget: 690,
    deadline: "2026-07-28T17:00:00Z",
    urgency: false,
    status: "awarded",
    paymentStatus: "held",
    posterId: "u-poster-3",
    teamId: "u-team-1",
    teamName: "Coastal Clean Crew",
    images: [img("1522708323590-d24dbb6b0267")],
    pdfs: [],
    requirements: ["Same-week availability"],
    bidCount: 7,
    createdAt: "2026-07-14T13:00:00Z",
  },
  {
    id: "job-108",
    title: "Construction dumpster overflow",
    description: "Overflow haul from dumpster site. Need weekend window.",
    address: "45 Pier Blvd",
    city: "Emeryville",
    lat: 37.8313,
    lng: -122.2852,
    budget: 1100,
    deadline: "2026-07-25T09:00:00Z",
    urgency: true,
    status: "open",
    paymentStatus: "pending",
    posterId: "u-poster-2",
    images: [img("1504307651254-16764d2220b8")],
    pdfs: ["site-access.pdf"],
    requirements: ["Weekend", "Heavy equipment"],
    bidCount: 1,
    createdAt: "2026-07-18T07:00:00Z",
  },
];

export const bids: Bid[] = [
  {
    id: "bid-1",
    jobId: "job-101",
    teamId: "u-team-1",
    teamName: "Coastal Clean Crew",
    teamAvatar: currentTeam.avatar,
    teamRating: 4.9,
    amount: 790,
    estimatedDays: 1,
    notes: "Can start tomorrow morning with a 16ft box truck.",
    submittedAt: "2026-07-17T09:00:00Z",
    certifications: ["Hazardous Waste Handling", "Bonded & Insured"],
    status: "pending",
  },
  {
    id: "bid-2",
    jobId: "job-101",
    teamId: "u-team-2",
    teamName: "Bay Area Haulers",
    teamAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    teamRating: 4.6,
    amount: 820,
    estimatedDays: 2,
    notes: "Includes donation drop for reusable lumber.",
    submittedAt: "2026-07-17T11:30:00Z",
    certifications: ["Bonded & Insured"],
    status: "pending",
  },
  {
    id: "bid-3",
    jobId: "job-101",
    teamId: "u-team-3",
    teamName: "Sparkle Exit Pros",
    teamAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    teamRating: 4.4,
    amount: 760,
    estimatedDays: 1,
    notes: "Same-day photo package included.",
    submittedAt: "2026-07-17T15:10:00Z",
    certifications: ["Eco-certified"],
    status: "pending",
  },
  {
    id: "bid-4",
    jobId: "job-101",
    teamId: "u-team-4",
    teamName: "GreenLane Cleanup",
    teamAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    teamRating: 4.7,
    amount: 875,
    estimatedDays: 1,
    notes: "Premium recycling stream + landfill diversion report.",
    submittedAt: "2026-07-18T08:20:00Z",
    certifications: ["Green waste certified", "Bonded & Insured"],
    status: "pending",
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "tl-1",
    jobId: "job-102",
    title: "Job posted",
    description: "Estate clean-out listed for bids.",
    timestamp: "2026-07-10T09:30:00Z",
    actor: "Ava Meridian",
    actorAvatar: currentPoster.avatar,
  },
  {
    id: "tl-2",
    jobId: "job-102",
    title: "Bid awarded",
    description: "Coastal Clean Crew selected at $2,050.",
    timestamp: "2026-07-12T16:00:00Z",
    actor: "Ava Meridian",
    actorAvatar: currentPoster.avatar,
  },
  {
    id: "tl-3",
    jobId: "job-102",
    title: "Work started",
    description: "Team checked in on site.",
    timestamp: "2026-07-15T08:45:00Z",
    actor: "Coastal Clean Crew",
    actorAvatar: currentTeam.avatar,
  },
  {
    id: "tl-4",
    jobId: "job-102",
    title: "Deadline approaching",
    description: "Completion due in 5 days.",
    timestamp: "2026-07-18T09:00:00Z",
    actor: "PropTek",
    actorAvatar: currentPoster.avatar,
    alert: true,
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    jobId: "job-102",
    senderId: "u-poster-1",
    senderName: "Ava Meridian",
    senderAvatar: currentPoster.avatar,
    role: "poster",
    text: "Hi team — family walkthrough is Sunday at 11am. Can you stage donation piles by then?",
    timestamp: "2026-07-16T10:12:00Z",
  },
  {
    id: "msg-2",
    jobId: "job-102",
    senderId: "u-team-1",
    senderName: "Coastal Clean Crew",
    senderAvatar: currentTeam.avatar,
    role: "team",
    text: "Absolutely. We'll label Keep / Donate / Dispose zones tonight.",
    timestamp: "2026-07-16T10:28:00Z",
  },
  {
    id: "msg-3",
    jobId: "job-102",
    senderId: "u-team-1",
    senderName: "Coastal Clean Crew",
    senderAvatar: currentTeam.avatar,
    role: "team",
    text: "Attached the first before photos from the garage.",
    timestamp: "2026-07-16T18:05:00Z",
    attachment: {
      name: "garage-before.jpg",
      type: "jpg",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    },
  },
  {
    id: "msg-4",
    jobId: "job-102",
    senderId: "u-poster-1",
    senderName: "Ava Meridian",
    senderAvatar: currentPoster.avatar,
    role: "poster",
    text: "Looks great — please keep the blue wardrobe until Sunday.",
    timestamp: "2026-07-16T19:40:00Z",
    edited: true,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n-1",
    type: "bid",
    title: "4 new bids on Valencia clear-out",
    body: "Compare pricing and timing before awarding.",
    timestamp: "2026-07-18T08:30:00Z",
    read: false,
    actionLabel: "View bids",
    href: "/poster/job/job-101",
  },
  {
    id: "n-2",
    type: "job",
    title: "Completion submitted — Suite 4B",
    body: "Bay Area Haulers uploaded before/after proof.",
    timestamp: "2026-07-18T07:15:00Z",
    read: false,
    actionLabel: "Review",
    href: "/poster/job/job-104",
  },
  {
    id: "n-3",
    type: "payment",
    title: "Payment held for estate clean-out",
    body: "$2,050 secured in escrow until approval.",
    timestamp: "2026-07-15T12:00:00Z",
    read: true,
    actionLabel: "Details",
    href: "/poster/job/job-102",
  },
  {
    id: "n-4",
    type: "dispute",
    title: "Dispute window open",
    body: "You have 48 hours to dispute completion on Suite 4B.",
    timestamp: "2026-07-18T07:20:00Z",
    read: false,
  },
  {
    id: "n-5",
    type: "system",
    title: "Plus membership renews soon",
    body: "Your plan renews on Aug 1 — manage billing in Profile.",
    timestamp: "2026-07-17T09:00:00Z",
    read: true,
    href: "/profile",
  },
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    period: "month",
    features: ["3 active jobs", "Standard support", "Basic chat"],
  },
  {
    id: "plus",
    name: "Plus",
    price: 29,
    period: "month",
    features: ["15 active jobs", "Priority bids alerts", "Reports export", "Saved filters"],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    period: "month",
    features: [
      "Unlimited jobs",
      "Team certifications vault",
      "Advanced analytics",
      "Dedicated support",
    ],
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Jordan Hale",
    role: "Property manager",
    quote:
      "PropTek turned our turnovers into a gallery of trusted crews. We award faster and pay with confidence.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
  },
  {
    id: "t2",
    name: "Sam Ortiz",
    role: "Cleanup team lead",
    quote:
      "Bidding feels like browsing a storefront — clear photos, fair budgets, and payments that actually release.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Homeowner",
    quote:
      "I posted once, compared immersive bids, and watched the timeline update like a product journey.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  },
];

export const faqs = [
  {
    q: "How does payment work?",
    a: "Funds are held in escrow when a bid is awarded and released after you approve completion and leave a rating.",
  },
  {
    q: "Who can post jobs?",
    a: "Property managers, landlords, and homeowners can post cleanup jobs with photos, budget, and deadlines.",
  },
  {
    q: "What certifications can teams upload?",
    a: "Insurance, hazmat, green waste, and bonded credentials — shown as trust badges on bids.",
  },
  {
    q: "Can I dispute a completion?",
    a: "Yes. Open a dispute with a reason and evidence before payment is released.",
  },
];

export const reportSeries = {
  completedJobs: [
    { label: "Mar", value: 8 },
    { label: "Apr", value: 11 },
    { label: "May", value: 9 },
    { label: "Jun", value: 14 },
    { label: "Jul", value: 12 },
  ],
  revenue: [
    { label: "Mar", value: 6200 },
    { label: "Apr", value: 8100 },
    { label: "May", value: 7400 },
    { label: "Jun", value: 9800 },
    { label: "Jul", value: 9100 },
  ],
  membershipGrowth: [
    { label: "Mar", value: 42 },
    { label: "Apr", value: 51 },
    { label: "May", value: 58 },
    { label: "Jun", value: 67 },
    { label: "Jul", value: 74 },
  ],
  completionDays: [
    { label: "Mar", value: 4.2 },
    { label: "Apr", value: 3.8 },
    { label: "May", value: 3.5 },
    { label: "Jun", value: 3.1 },
    { label: "Jul", value: 2.9 },
  ],
  teamRatings: [
    { team: "Coastal Clean Crew", rating: 4.9, jobs: 28 },
    { team: "Bay Area Haulers", rating: 4.6, jobs: 21 },
    { team: "GreenLane Cleanup", rating: 4.7, jobs: 17 },
    { team: "Sparkle Exit Pros", rating: 4.4, jobs: 12 },
  ],
};

export function getJob(id: string) {
  return jobs.find((j) => j.id === id);
}

export function getBidsForJob(jobId: string) {
  return bids.filter((b) => b.jobId === jobId);
}

export function getTimelineForJob(jobId: string) {
  return timelineEvents.filter((e) => e.jobId === jobId);
}

export function getChatForJob(jobId: string) {
  return chatMessages.filter((m) => m.jobId === jobId);
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function statusLabel(status: string) {
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
