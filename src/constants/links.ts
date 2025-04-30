import { ClockIcon, MessageSquare, BarChart2, FileTextIcon, UserPlusIcon, CreditCardIcon, SettingsIcon, LogOut, Headphones, ChartPieIcon, LucideIcon, MessagesSquareIcon, NewspaperIcon, MegaphoneIcon, LineChartIcon, MessageSquareTextIcon, UsersIcon } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: ChartPieIcon,
    },
    {
        href: "/dashboard/courses",
        label: "My Courses",
        icon: NewspaperIcon
    },
    {
        href: "/dashboard/progress",
        label: "Progress",
        icon: LineChartIcon
    },
    {
        href: "/dashboard/notes",
        label: "Notes",
        icon: FileTextIcon
    },
    {
        href: "/dashboard/practice",
        label: "Practice",
        icon: MessageSquareTextIcon
    },
    {
        href: "/dashboard/billing",
        label: "Billing",
        icon: CreditCardIcon
    },
    {
        href: "/dashboard/settings",
        label: "Settings",
        icon: SettingsIcon
    },
];

export const FOOTER_LINKS = [
    {
        title: "Resources",
        links: [
            { name: "Success Stories", href: "/blog" },
            { name: "FAQ", href: "/help-center" },
            { name: "Student Community", href: "/community" },
            { name: "Learning Guides", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Refund Policy", href: "/refund" },
        ],
    },
];
