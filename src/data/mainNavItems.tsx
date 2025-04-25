import { Calendar, CalendarDays, CircleCheckBig, Grid2X2, Inbox } from "lucide-react";

export const navItems = [
  {
    name: "Inbox",
    link: "/dashboard/inbox",
    id: "nav1",
    icon: <Inbox className="w-4 h-4" />,
    isActive: true
  },
  {
    name: "Today",
    link: "/dashboard/today",
    id: "nav2",
    icon: <Calendar className="w-4 h-4" />,
    isActive: false
  },
  {
    name: "Upcoming",
    link: "/dashboard/upcoming",
    id: "nav3",
    icon: <CalendarDays className="w-4 h-4" />,
    isActive: false
  },
  {
    name: "Filters & Labels",
    link: "/dashboard/filters-labels",
    id: "nav4",
    icon: <Grid2X2 className="w-4 h-4" />,
    isActive: false
  },
  {
    name: "Completed",
    link: "/dashboard/completed",
    id: "nav5",
    icon: <CircleCheckBig className="w-4 h-4" />,
    isActive: false
  },
]
