export interface CvNavItem {
    label: string;
    href: string;
}

export interface CvFeatureCard {
    title: string;
    num: string;
    icon: string;
    items: string[];
    href?: string;
}

export interface CvData {
    hero: {
        displayName: string;
        subtitle: string;
        ctaLabel: string;
        ctaHref: string;
        navItems: CvNavItem[];
    };
    about: {
        sectionLabel: string;
        headingLead: string;
        headingRole: string;
        headingSkills: string;
        bio: string;
    };
    features: {
        headingPrimary: string;
        headingSecondary: string;
        canvasLabel: string;
        canvasVideoSrc: string;
        cards: CvFeatureCard[];
    };
}

export const cvData: CvData = {
    hero: {
        displayName: "LUAN",
        subtitle: "Frontend Developer with 5 years of experience building scalable web applications using React/Next.js.",
        ctaLabel: "Get My CV",
        ctaHref: "/cv.pdf",
        navItems: [
            { label: "About", href: "#about" },
            { label: "Collective", href: "#features" },
            { label: "Projects", href: "#projects" },
            { label: "LinkedIn", href: "https://linkedin.com/in/kaidevhere/" },
            { label: "Inquiries", href: "mailto:luanvuforwork@gmail.com" }
        ]
    },
    about: {
        sectionLabel: "Profile",
        headingLead: "I am Nguyen Vu Luan,",
        headingRole: "a professional Web Developer.",
        headingSkills: "I specialize in React, TypeScript, and high-performance web systems .",
        bio: "Currently expanding into backend development with NestJS to become a full-stack developer. I leverage AI tools to accelerate development and solve complex problems independently."
    },
    features: {
        headingPrimary: "Building high-quality digital experiences.",
        headingSecondary: "From Japanese job boards to Fintech solutions.",
        canvasLabel: "Explore my creative technical canvas.",
        canvasVideoSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4",
        cards: [
            {
                title: "KaigoSearch Plus.",
                num: "01",
                icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
                items: [
                    "Next.js & Supabase SSR ",
                    "Advanced filtering systems ",
                    "SEO Optimized content ",
                    "React Query integration "
                ],
                href: "https://kaigosearch-plus.jp/"
            },
            {
                title: "Fintech & CRM.",
                num: "02",
                icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
                items: [
                    "Loan Origination System ",
                    "Customer Relationship Management ",
                    "Data analysis optimization ",
                    "Cross-functional coordination "
                ]
            },
            {
                title: "Digital Entertainment.",
                num: "03",
                icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
                items: [
                    "SM Entertainment Digital Passes ",
                    "Video-based talent showcasing ",
                    "Naver Map API integration ",
                    "EformSign implementation "
                ],

            }
        ]
    }
};