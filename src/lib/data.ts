export type IconName =
  | "target"
  | "search"
  | "megaphone"
  | "pen"
  | "chart"
  | "mail"
  | "rocket"
  | "smile"
  | "trending"
  | "dollar"
  | "compass"
  | "bulb"
  | "layers"
  | "users";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  deliverables: string[];
  metric: string;
  metricLabel: string;
  timeline: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  services: string[];
  year: string;
  image?: string;
  accent: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  quote: { text: string; author: string; role: string };
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  cover?: string;
  coverClass?: string;
  excerpt: string;
  author: string;
  sections: { heading: string; body: string[] }[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  brand: string;
};

export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services", menu: "services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Resources", href: "#resources", menu: "resources" },
];

export const BRANDS = [
  { name: "Slimfinity", mark: "orbit" },
  { name: "kanba", mark: "diamond" },
  { name: "HEXLAB", mark: "hex" },
  { name: "Cloudward", mark: "cloud" },
  { name: "BULLSEYE", mark: "bullseye" },
  { name: "Vertoz", mark: "wave" },
  { name: "Nexora", mark: "spark" },
  { name: "Lumen", mark: "circle" },
];

export const SERVICES: Service[] = [
  {
    slug: "strategy-planning",
    title: "Strategy & Planning",
    short: "Clear plans built for your business goals.",
    description:
      "We start with the numbers, not the noise. Our strategists audit your funnel, map your audience, and turn ambition into a focused growth roadmap your whole team can rally behind.",
    icon: "target",
    deliverables: ["Full-funnel audit", "Audience & market research", "Positioning workshop", "90-day growth roadmap", "KPI & measurement framework"],
    metric: "3.2x",
    metricLabel: "average pipeline lift",
    timeline: "2–3 week sprint",
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    short: "Rank higher and get found by the right audience.",
    description:
      "Sustainable organic growth comes from relevance and technical excellence. We combine deep keyword research, content architecture, and on-page fixes that compound month after month.",
    icon: "search",
    deliverables: ["Technical SEO audit", "Keyword & intent mapping", "On-page optimization", "Content clusters & briefs", "Monthly performance reporting"],
    metric: "184%",
    metricLabel: "average organic growth",
    timeline: "3-month minimum",
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    short: "Engage your audience and build your online brand.",
    description:
      "We build social channels people actually want to follow. Platform-native creative, a consistent voice, and community management keep your brand top of mind and part of the conversation.",
    icon: "megaphone",
    deliverables: ["Channel strategy", "Monthly content calendar", "Short-form video & design", "Community management", "Creator partnerships"],
    metric: "+212%",
    metricLabel: "average engagement",
    timeline: "Monthly retainer",
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    short: "Create content that attracts, educates & converts.",
    description:
      "Every asset has a job. From thought-leadership to conversion copy, our writers and designers create content that earns attention and moves buyers closer to yes.",
    icon: "pen",
    deliverables: ["Editorial strategy", "Long-form articles", "Lead magnets & guides", "Email nurture copy", "Design & illustration"],
    metric: "41%",
    metricLabel: "of pipeline influenced",
    timeline: "4-week first sprint",
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    short: "High-performing ads that drive leads and sales.",
    description:
      "Creative and media buying under one roof. We test fast, kill what fails, and scale what works across Google, Meta, LinkedIn, and the next channel worth your budget.",
    icon: "chart",
    deliverables: ["Channel & budget plan", "Creative concepting", "Campaign builds", "Weekly optimization", "Attribution setup"],
    metric: "4.8x",
    metricLabel: "average ROAS",
    timeline: "Ongoing, from 30 days",
  },
  {
    slug: "email-lifecycle",
    title: "Email & Lifecycle",
    short: "Nurture leads and turn subscribers into customers.",
    description:
      "Your list is your most valuable channel. We design lifecycle journeys that welcome, educate, retain, and win back customers automatically.",
    icon: "mail",
    deliverables: ["Lifecycle mapping", "Automated flows", "Newsletter programme", "Segmentation strategy", "A/B testing roadmap"],
    metric: "+38%",
    metricLabel: "revenue per subscriber",
    timeline: "4–6 week build",
  },
];

export const STATS = [
  { value: 250, suffix: "+", label: "Projects Completed", icon: "rocket" as IconName },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: "smile" as IconName },
  { value: 3.5, suffix: "X", label: "Average ROI Growth", icon: "trending" as IconName, decimals: 1 },
  { value: 120, suffix: "%", label: "Revenue Growth", icon: "dollar" as IconName },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    icon: "compass" as IconName,
    description:
      "We dig into your data, interview your customers, and audit the competitive landscape. We leave with the uncomfortable truths and the biggest opportunities.",
    points: ["Stakeholder workshops", "Analytics & funnel audit", "Customer interviews", "Competitor teardown"],
    duration: "Week 1",
  },
  {
    step: "02",
    title: "Strategize",
    icon: "bulb" as IconName,
    description:
      "Insight becomes a plan. We define positioning, channel roles, budgets, and the KPIs that will tell us—objectively—whether it is working.",
    points: ["Positioning & messaging", "Channel strategy", "90-day roadmap", "KPI framework"],
    duration: "Week 2",
  },
  {
    step: "03",
    title: "Create",
    icon: "layers" as IconName,
    description:
      "Our strategists, writers, designers, and media buyers work as one pod. Concepts move from idea to live campaign without endless handovers.",
    points: ["Creative concepts", "Campaign production", "Landing pages", "Tracking & QA"],
    duration: "Weeks 3–5",
  },
  {
    step: "04",
    title: "Scale",
    icon: "trending" as IconName,
    description:
      "We measure ruthlessly, iterate weekly, and put budget behind what earns its place. Then we scale—new channels, new markets, new tests.",
    points: ["Weekly optimization", "Experiment roadmap", "Live reporting", "Quarterly planning"],
    duration: "Ongoing",
  },
];

export const WORK: CaseStudy[] = [
  {
    slug: "lumen-skincare",
    client: "Lumen Skincare",
    title: "From quiet label to category leader.",
    summary:
      "A creative-led paid social engine and a full-funnel content system took Lumen from a best-kept secret to a category-defining skincare brand.",
    services: ["Paid Social", "Creative", "Lifecycle"],
    year: "2025",
    image: "/images/work-lumen.jpg",
    accent: "#6d3fd4",
    metrics: [
      { value: "+218%", label: "Revenue" },
      { value: "4.1x", label: "Blended ROAS" },
      { value: "-32%", label: "Cost per acquisition" },
    ],
    challenge:
      "Lumen had a cult product and beautiful packaging, but its growth depended on a single retail partner. Paid social was expensive and creative was stale—the brand needed a direct relationship with its customer.",
    approach: [
      "Built a customer insight panel and rewrote the brand's creative territories around real routines.",
      "Launched a weekly creative testing engine producing 24 new ad concepts per month.",
      "Connected a welcome, replenishment, and win-back flow across email and SMS.",
    ],
    quote: {
      text: "Maven gave us the confidence and the system to grow on our own terms. We finally know what's working and why.",
      author: "Sofia Alvarez",
      role: "Founder, Lumen Skincare",
    },
  },
  {
    slug: "northstar",
    client: "Northstar",
    title: "Making money feel simple.",
    summary:
      "A search-first content strategy turned a challenger fintech into the most cited source in its category—and its cheapest acquisition channel.",
    services: ["SEO", "Content", "Digital PR"],
    year: "2025",
    image: "/images/work-northstar.jpg",
    accent: "#3b2b6f",
    metrics: [
      { value: "4.2x", label: "Organic sessions" },
      { value: "+156%", label: "Qualified leads" },
      { value: "12", label: "New markets" },
    ],
    challenge:
      "Northstar was entering crowded markets with a small brand footprint and a content library that answered the wrong questions. Organic traffic was flat while paid costs climbed.",
    approach: [
      "Rebuilt the content architecture around intent and product-led entry points.",
      "Created a data-driven editorial engine with subject matter experts and original research.",
      "Earned coverage in the publications its customers already trusted.",
    ],
    quote: {
      text: "They think like operators, not an agency. Every piece of content has a clear commercial job.",
      author: "Elias Brandt",
      role: "VP Growth, Northstar",
    },
  },
  {
    slug: "solstice-studio",
    client: "Solstice Studio",
    title: "A store that sells itself.",
    summary:
      "A full replatform and obsessive conversion programme cut friction, raised average order value, and made the Solstice storefront a competitive advantage.",
    services: ["Web Design", "CRO", "Analytics"],
    year: "2024",
    accent: "#a078e8",
    metrics: [
      { value: "+64%", label: "Conversion rate" },
      { value: "-41%", label: "Bounce rate" },
      { value: "2.3s", label: "Largest paint" },
    ],
    challenge:
      "Solstice had outgrown its theme. Mobile shoppers dropped at checkout, the brand story was buried, and the team had no reliable way to test improvements.",
    approach: [
      "Ran a heuristic and analytics audit to find the highest-leverage friction points.",
      "Designed a mobile-first experience with a clearer product story and a faster path to purchase.",
      "Installed a testing culture with a prioritised CRO roadmap and monthly experiments.",
    ],
    quote: {
      text: "The site finally feels like us—and it performs. Our conversion rate has never been higher.",
      author: "Mara Lindqvist",
      role: "Creative Director, Solstice",
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Maven transformed our online presence. Their strategy and execution delivered exceptional results—and their team felt like an extension of ours from day one.",
    name: "James Carter",
    role: "Chief Executive Officer, Hexlab",
    avatar: "/images/avatar-james.jpg",
    rating: 5,
    brand: "HEXLAB",
  },
  {
    quote:
      "We have worked with big agencies before, but never this level of clarity. Maven found the 20% of work driving 80% of growth and built a system around it.",
    name: "Sarah Whitman",
    role: "VP Marketing, Northstar",
    avatar: "/images/avatar-sarah.jpg",
    rating: 5,
    brand: "Northstar",
  },
  {
    quote:
      "The creative is outstanding and the numbers back it up. In one quarter, paid social went from our weakest channel to our most profitable.",
    name: "Daniel Kim",
    role: "Founder, Lumen Skincare",
    avatar: "/images/avatar-daniel.jpg",
    rating: 5,
    brand: "Lumen",
  },
];

export const ARTICLE_CATEGORIES = ["All", "Strategy", "Social Media", "SEO", "Email"];

export const ARTICLES: Article[] = [
  {
    slug: "marketing-strategies-2026",
    title: "7 Marketing Strategies to Scale Your Business in 2026",
    category: "Strategy",
    date: "May 10, 2026",
    readTime: "5 min read",
    cover: "/images/blog-strategy.jpg",
    excerpt:
      "Forget vanity metrics. These are the seven plays we're using to help ambitious brands compound growth this year.",
    author: "Maya Chen, Strategy Director",
    sections: [
      {
        heading: "Start with the problem, not the channel",
        body: [
          "The most common growth mistake we see is channel-first thinking. A team decides to invest in social or search before defining the precise job the business needs done. The result is activity that looks impressive in a slide deck and does nothing for the P&L.",
          "Before you choose a channel, write down the constraint. Is awareness the bottleneck? Conversion? Retention? The answer changes everything about where your next dollar should go.",
        ],
      },
      {
        heading: "Build a measurement spine",
        body: [
          "You cannot scale what you cannot see. We recommend a simple three-layer measurement model: platform metrics for in-flight optimization, blended metrics for budget decisions, and incrementality tests for the decisions that really matter.",
          "Instrument your funnel early. It is far cheaper than re-learning your customer economics after you have spent six months guessing.",
        ],
      },
      {
        heading: "Make creative a system",
        body: [
          "Creative is the largest lever in modern performance marketing. The winning teams treat it as a production system with clear hypotheses, a testing cadence, and a feedback loop from customer conversations.",
          "Aim for two to three genuinely new concepts each month rather than twenty variations of the same idea. Diversity of insight beats diversity of edits.",
        ],
      },
      {
        heading: "Compounding beats spiking",
        body: [
          "Search and content are slow, then suddenly fast. Paid social is fast, then expensive if you stop. The best growth portfolios blend both: one for near-term demand capture, one for long-term brand and margin.",
          "Give compounding channels a fair window. A 90-day runway with clear milestones is usually enough to see whether the trajectory is real.",
        ],
      },
    ],
  },
  {
    slug: "build-a-brand-on-social",
    title: "How to Build a Brand That Stands Out on Social Media",
    category: "Social Media",
    date: "Jul 14, 2026",
    readTime: "6 min read",
    cover: "/images/blog-social.jpg",
    excerpt:
      "Attention is not the goal. Belonging is. Here is how to build a social presence that people seek out, save, and share.",
    author: "Theo Martin, Social Lead",
    sections: [
      {
        heading: "Pick a point of view",
        body: [
          "Scrolling is a series of micro-decisions. Your audience is asking one question: is this for me? A strong point of view gives them a fast answer and gives your team a filter for every post.",
          "Write your social POV in one sentence. If you cannot, neither can your audience.",
        ],
      },
      {
        heading: "Design for the platform, not the deck",
        body: [
          "Content that looks like a repurposed billboard rarely performs. Build native formats—short vertical video, conversational carousels, honest founder posts—and let the insight lead the format.",
          "The goal is not to be everywhere. It is to be unmistakable on two channels, with a repeatable production rhythm the team can sustain.",
        ],
      },
      {
        heading: "Turn community into content",
        body: [
          "The best social strategies have a participation loop. Ask questions, feature customers, reply generously, and turn real conversations into your next campaign.",
          "Community compounds in a way that paid reach never will. Measure it with saves, replies, direct conversations, and assisted conversions—not impressions alone.",
        ],
      },
    ],
  },
  {
    slug: "seo-trends-2026",
    title: "SEO Trends to Watch in 2026 and Beyond",
    category: "SEO",
    date: "Jun 28, 2026",
    readTime: "4 min read",
    cover: "/images/blog-seo.jpg",
    excerpt:
      "AI answers are changing the search page, but intent-driven content is more valuable than ever. What smart brands are doing differently.",
    author: "Nina Patel, Head of Search",
    sections: [
      {
        heading: "Answer, then expand",
        body: [
          "Search engines increasingly extract direct answers. Structure content so the first 100 words resolve the query plainly, then expand with the nuance and first-hand experience that only your brand can provide.",
          "Pages that only restate the consensus are the easiest to replace. Pages with original data, specific examples, and credible authors are the hardest.",
        ],
      },
      {
        heading: "Optimize for the whole journey",
        body: [
          "Ranking is not the finish line. Map every important query to the next useful step—a comparison, a tool, a demo, a newsletter—and measure assisted revenue rather than session counts.",
          "Internal linking remains one of the most underused levers. Connect clusters so both readers and crawlers understand what you are the authority on.",
        ],
      },
      {
        heading: "Build a brand worth searching for",
        body: [
          "As zero-click answers grow, brand demand becomes the moat. Search creates discovery; brand creates the recall that turns a result into a visit.",
          "Invest in distinctive assets—a recognizable voice, a named framework, a recurring report. These are the things AI summarisers will attribute back to you.",
        ],
      },
    ],
  },
  {
    slug: "paid-media-playbook",
    title: "The Paid Media Playbook We Use to Scale Accounts",
    category: "Strategy",
    date: "Jun 09, 2026",
    readTime: "7 min read",
    cover: "/images/work-northstar.jpg",
    excerpt:
      "Fewer, better campaigns. A practical framework for spending with intent, learning faster, and protecting margin as you scale.",
    author: "Ravi Menon, Media Director",
    sections: [
      {
        heading: "Consolidate before you split",
        body: [
          "Sophisticated platforms need data density to learn. Fragmented campaigns starve the algorithm and make results hard to interpret. Start with a clean account structure and enough budget per test to learn something real.",
        ],
      },
      {
        heading: "Create a testing hierarchy",
        body: [
          "Test the biggest variables first: offer, then concept, then format, then message. Testing button colours before validating the offer is the most expensive way to learn nothing.",
          "Write your hypothesis and the decision rule before the test starts. If the result would not change your next action, do not run it.",
        ],
      },
      {
        heading: "Scale the budget, not the anxiety",
        body: [
          "Increase spend in planned increments and watch marginal CAC, not average CAC. When efficiency holds, continue; when it breaks, find the constraint before you find a new channel.",
        ],
      },
    ],
  },
  {
    slug: "email-that-people-want",
    title: "Email That People Actually Want to Open",
    category: "Email",
    date: "May 22, 2026",
    readTime: "4 min read",
    cover: "/images/blog-social.jpg",
    excerpt:
      "The unsubscribe button is feedback. Use it. A field guide to useful, welcome, revenue-generating email.",
    author: "Clara Nwosu, Lifecycle Lead",
    sections: [
      {
        heading: "Earn the next open",
        body: [
          "Every email must answer a simple question for the reader: why is this worth my time today? Promotional calendars that ignore that question train your list to stop paying attention.",
          "Balance selling with teaching and delighting. A rough three-to-one value-to-offer ratio is a good starting point for most brands.",
        ],
      },
      {
        heading: "Build journeys, not blasts",
        body: [
          "Lifecycle flows consistently outperform broadcast for revenue per send. Welcome, browse abandonment, replenishment, and win-back are usually the first four worth building properly.",
          "Keep the experience coherent across email and SMS, and suppress hard every time someone tells you no.",
        ],
      },
    ],
  },
  {
    slug: "brand-metrics-that-matter",
    title: "The Brand Metrics That Actually Move Revenue",
    category: "Strategy",
    date: "May 04, 2026",
    readTime: "5 min read",
    coverClass: "brand",
    excerpt:
      "Brand-building is not a leap of faith. These five signals prove your brand is doing commercial work.",
    author: "Maya Chen, Strategy Director",
    sections: [
      {
        heading: "Measure memory, not just reach",
        body: [
          "Reach tells you who could have seen the work. Brand recall, prompted awareness, and share of search tell you whether they remembered it when it mattered.",
          "Track branded search volume as a weekly leading indicator. It is imperfect, but it is free, fast, and remarkably directional.",
        ],
      },
      {
        heading: "Distinctive assets pay compound interest",
        body: [
          "A consistent palette, character, sound, or catchphrase makes advertising cheaper because recognition arrives before the explanation does.",
          "Audit your recent assets for consistency. If you removed the logo, would anyone know it was you?",
        ],
      },
      {
        heading: "Connect brand to demand",
        body: [
          "Use holdout tests or geo experiments to understand how brand investment lifts branded and unbranded response over time. Pair that with qualitative tracking so the numbers have meaning.",
        ],
      },
    ],
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Strategy & Planning", href: "#services" },
      { label: "SEO", href: "#services" },
      { label: "Social Media Marketing", href: "#services" },
      { label: "Content Marketing", href: "#services" },
      { label: "Paid Advertising", href: "#services" },
      { label: "Email Marketing", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Work", href: "#work" },
      { label: "Case Studies", href: "#work" },
      { label: "Careers", href: "#about" },
      { label: "Blog", href: "#insights" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "#insights" },
      { label: "Free Audit", href: "#newsletter" },
      { label: "Newsletter", href: "#newsletter" },
      { label: "Brand Guidelines", href: "#about" },
      { label: "FAQs", href: "#faq" },
      { label: "Privacy Policy", href: "#legal" },
    ],
  },
];

export const FAQS = [
  {
    q: "How quickly can we start?",
    a: "Most engagements kick off within five to ten working days. After a short discovery call, we send a scope, a timeline, and a clear set of first milestones.",
  },
  {
    q: "What does a typical engagement cost?",
    a: "Project sprints start at $12k; ongoing growth partnerships typically range from $6k to $18k per month depending on scope and number of channels. Every proposal is tied to an outcome, not a headcount.",
  },
  {
    q: "Do you work with in-house teams?",
    a: "Absolutely. Around half of our partnerships are hybrid. We bring the strategy, experimentation, and specialist firepower while your team owns the brand and the daily rhythms.",
  },
  {
    q: "How do you report on results?",
    a: "You get a live dashboard, a weekly note from your lead strategist, and a monthly business review focused on decisions rather than vanity metrics.",
  },
  {
    q: "Are there long-term contracts?",
    a: "Our initial sprint is three months so we can prove the system works. After that, we work on rolling monthly agreements with a 30-day notice period.",
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
];

export const CONTACT = {
  email: "hello@mavenmarketing.com",
  phone: "+1 (212) 555-0148",
  address: "123 Growth St, New York, NY 10001",
  hours: "Mon–Fri, 9:00–18:00 EST",
};
