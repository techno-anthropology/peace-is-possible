// Single source of truth for every word on the site.
// Testimonials, Ronnie's story and the articles are kept word for word from the
// current Shopify site. Everything else is tightened, deduplicated copy.

export const site = {
  name: "Peace is Possible Recovery Coaching",
  shortName: "Peace is Possible",
  url: "https://peaceispossiblerecovery.com",
  // The Shopify store: checkout, the contact inbox and policy pages. At the
  // domain cutover this becomes the store's new Shopify domain.
  store: "https://peaceispossiblerecovery.com",
  city: "Colorado Springs",
  region: "CO",
  serviceArea: "In person in Colorado Springs and online",
  instagram: "https://www.instagram.com/peaceispossiblecoaching/",
  facebook: "https://www.facebook.com/profile.php?id=61570439260340",
  referralForm: "https://forms.gle/c3dxpnSF4RphiLon6",
  appUrl: "https://skills.peaceispossiblerecovery.com",
  logoMark: "/brand/logo-mark.png",
  logoFull: "/brand/logo-full.png",
} as const;

export type CoachId = "ronnie" | "sara";

export const booking = {
  ronnie: {
    coach: "ronnie" as CoachId,
    label: "My relationship with food",
    detail: "Binge eating, bulimia, restriction, ARFID, or addiction. Talk with Ronnie.",
    url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2WxIGsUQpUzgvCBFprSt-Wl4olapHM4-bso_R7h2vnsAIzRyEpZJDWWDX5P48vtKz_BXf2ExF3",
  },
  sara: {
    coach: "sara" as CoachId,
    label: "Nutrition or performance",
    detail: "Nourishment, metabolic health, training goals. Talk with Sara.",
    url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ10RpTWlXlRDmQvnpH_tdX6DBTcm3ZRkgPywJvVbjURqWu1McFFSDSTNvIkpKwOcXGg1KQ7gVeX",
  },
} as const;

// One label per intent, used everywhere (nav, hero, footer).
export const ctas = {
  book: "Book a free call",
  app: "Open the free app",
  shop: "Shop coffee",
  refer: "Refer a client",
} as const;

export type NavItem = { slug: string; label: string };

// Paths mirror the live Shopify URLs so rankings carry over.
export const nav: NavItem[] = [
  { slug: "/pages/eating-disorder-recovery-coaching", label: "Coaching" },
  { slug: "/pages/coaches", label: "Coaches" },
  { slug: "/pages/about", label: "Ronnie's story" },
  { slug: "/pages/testimonials", label: "Testimonials" },
  { slug: "/pages/resource-library", label: "Resources" },
  { slug: "/collections/all", label: "Shop" },
];

// Old pages folded into new ones. next.config.ts serves these as permanent redirects.
export const redirects = [
  { from: "/pages/our-approach", to: "/pages/eating-disorder-recovery-coaching" },
  { from: "/pages/eating-disorder-support-groups", to: "/pages/resource-library#support-groups" },
  { from: "/pages/mindfulness-in-recovery-blog", to: "/blogs/news/mindfulness-in-eating-disorder-recovery" },
  { from: "/collections/shop-specialty-coffee", to: "/collections/all#coffee" },
  { from: "/collections/merchandise", to: "/collections/all#merch" },
];

// Every top-level page: its path (matching the live Shopify URL) and search snippet.
export const seo = {
  home: {
    path: "/",
    title: "Eating Disorder Recovery Coaching in Colorado Springs | Peace is Possible",
    description:
      "One-on-one eating disorder and addiction recovery coaching with daily text check-ins. In person in Colorado Springs and online. Book a free phone consultation.",
  },
  coaching: {
    path: "/pages/eating-disorder-recovery-coaching",
    title: "Eating Disorder Recovery Coaching in Colorado Springs & Online | Peace is Possible",
    description:
      "Weekly coaching and daily text support for binge eating, bulimia, ARFID, restriction and more. $100 a week with a sliding scale. In person or online.",
  },
  binge: {
    path: "/pages/binge-eating-recovery-coaching",
    title: "Binge Eating Recovery Coaching in Colorado Springs | Peace is Possible",
    description:
      "Compassionate, lived-experience coaching for binge eating. Weekly sessions, daily check-ins, no diets or shame. In person in Colorado Springs or online.",
  },
  coaches: {
    path: "/pages/coaches",
    title: "Our Coaches: Eating Disorder & Nutrition Coaching in Colorado Springs",
    description:
      "Meet Ronnie Sullivan, recovery coach and founder, and Sara Potter, certified nutritionist. Both coach from their own recovery.",
  },
  about: {
    path: "/pages/about",
    title: "Ronnie's Recovery Story | Peace is Possible Recovery Coaching",
    description:
      "How Ronnie Sullivan recovered from bulimia and binge eating, and why he started Peace is Possible in Colorado Springs.",
  },
  testimonials: {
    path: "/pages/testimonials",
    title: "Client Testimonials | Peace is Possible Recovery Coaching",
    description: "What clients say about eating disorder recovery coaching with Ronnie in Colorado Springs.",
  },
  resources: {
    path: "/pages/resource-library",
    title: "Eating Disorder Resources & Support Groups in Colorado Springs",
    description:
      "Free meditations, recovery articles, coping ideas, local and online eating disorder support groups, and recommended books.",
  },
  shop: {
    path: "/collections/all",
    title: "Specialty Coffee & Merch That Funds Recovery | Peace is Possible",
    description:
      "Light-roast specialty coffee and merch. Every purchase funds sliding-scale eating disorder recovery coaching.",
  },
  contact: {
    path: "/pages/contact",
    title: "Contact & Referrals | Peace is Possible Recovery Coaching",
    description: "Questions about coaching, or referring a client? Reach Peace is Possible in Colorado Springs.",
  },
  articles: {
    path: "/blogs/news",
    title: "Recovery Articles | Peace is Possible Recovery Coaching",
    description: "Ronnie's articles on mindfulness, self-compassion, intention and authenticity in eating disorder recovery.",
  },
} as const;

export const home = {
  hero: {
    headline: "Make peace with food.",
    sub: "Eating disorder recovery coaching from someone who has been there. Weekly sessions, daily support, in Colorado Springs or online.",
  },
  intro: {
    title: "A personal alternative to treatment centers",
    body: [
      "I'm Ronnie. For ten years I couldn't stop binge eating. I felt hopeless, ashamed and out of control.",
      "Recovery gave me a life with connection, community and healthy habits. Now I help others find the same. You don't need a diagnosis. If you want a better relationship with food, you're in the right place.",
    ],
  },
  steps: [
    {
      title: "Weekly coaching session",
      body: "An hour, one-on-one. We look at your goals, what's working and what isn't, and pick one small experiment to try this week. Confidential and judgment-free.",
      icon: "ChatsCircle",
    },
    {
      title: "Daily check-ins",
      body: "A text from Ronnie every day for support, accountability and help in hard moments. Text anytime. You don't have to do this alone.",
      icon: "ChatTeardropText",
    },
    {
      title: "Movement and nutrition",
      body: "How you eat and move are connected. We build a plan that meets your goals and feels good to follow.",
      icon: "Plant",
    },
  ],
  coffee: {
    title: "Coffee that funds recovery",
    body: "We sell specialty light-roast coffee to pay for a sliding scale. Buy a bag and you help someone afford coaching.",
  },
};

export const coaching = {
  h1: "Eating disorder recovery coaching in Colorado Springs and online",
  lede:
    "Your healing isn't one-size-fits-all. We pair weekly one-on-one coaching with daily check-ins, so you have support while you practice new skills in real life.",
  isolation:
    "Eating disorders grow in isolation. Recovery grows in connection. We help with binge eating, anorexia, bulimia, ARFID, rumination, orthorexia, overeating and alcohol use, and with nutrition goals.",
  whoFor: [
    "You feel stuck in cycles of binge eating or struggle with food choices",
    "ARFID makes it hard to add new foods",
    "You want to eat enough and stop restricting",
    "Guilt, shame, anxiety or constant thoughts about food wear you down",
    "You want a more flexible, kinder relationship with eating",
    "You want to practice consistency, mindfulness and self-trust",
    "You want help following through on your treatment team's plan between appointments",
  ],
  whoForNote:
    "You don't need the perfect words for what you're going through. On a free call we'll talk about what you're looking for and whether coaching fits.",
  services: [
    { title: "Weekly one-on-one sessions", body: "For eating disorders and nutrition. Each session ends with one low-stakes experiment for the week." },
    { title: "Daily text check-ins", body: "Accountability and support between sessions. Text when things get hard, or to share a win." },
    { title: "Optional monthly family sessions", body: "Help the people close to you understand how to support you." },
    { title: "Movement support", body: "Accountability for movement that serves your mood and goals." },
    { title: "Skills for everyday life", body: "Mindfulness, reflection, planning, and ways to respond to hard moments with compassion." },
    { title: "Online resources", body: "Meditations, readings and guides, plus our free coping skills app." },
    { title: "Care coordination", body: "We work alongside your therapist and dietitian with clear roles." },
  ],
  approach:
    "Peace is Possible is built on compassion, mindfulness, intention, authenticity, connection and joy. Coaching is a partnership. Your experience and goals lead, and we find steps that feel realistic. Ronnie's own recovery from eating disorders and addiction means you'll be understood.",
  pricing: {
    price: "$100",
    unit: "per week",
    includes: "Weekly session plus daily text support",
    sliding:
      "Sliding-scale rates are available. Coffee and merch sales fund them. If cost is a worry, tell us on the call and we'll find an option.",
  },
  // Sara's services, from the live Shopify products.
  nutrition: [
    { name: "Nutrition coaching with daily support", price: "$100", unit: "per month", body: "Real-time support for a steadier, more trusting relationship with food. No rigid meal plans.", url: `${site.store}/products/in-person-nutrition-coaching-monthly` },
    { name: "Single nutrition session", price: "$90", unit: "one session", body: "In person or remote. We look at your habits, challenges and goals and map a realistic path.", url: `${site.store}/products/one-on-one-nutrition-coaching-single-session` },
    { name: "Monthly personalized targets", price: "$75", unit: "per month", body: "Nutrition targets built around your goals and where you are in recovery, reviewed each month.", url: `${site.store}/products/remote-nutrition-coaching-monthly` },
  ],
  disclaimer: {
    title: "Is coaching the right level of support?",
    body: [
      "Recovery coaching is non-clinical support. It does not provide psychotherapy, medical care, diagnosis or eating disorder treatment. Eating disorders can carry serious medical and mental-health risks, and coaching does not replace care from qualified healthcare professionals.",
      "If you're in treatment now, coaching can work alongside it with clear roles. If you need a medical assessment, specialized treatment or urgent support, contact a qualified professional or local emergency services.",
    ],
  },
  faq: [
    {
      q: "How much does recovery coaching cost?",
      a: "$100 a week for a one-hour session plus daily text check-ins. Sliding-scale rates are available for people with lower incomes.",
    },
    {
      q: "Do you coach online or only in Colorado Springs?",
      a: "Both. Sessions are in person in Colorado Springs or online by video.",
    },
    {
      q: "Do I need an eating disorder diagnosis?",
      a: "No. Whether you have a diagnosis or just want a better relationship with food, you're welcome.",
    },
    {
      q: "Is coaching the same as therapy?",
      a: "No. Coaching is non-clinical. It can work alongside therapy and a dietitian, and we coordinate with them.",
    },
    {
      q: "How do I start?",
      a: "Book a free phone consultation. Choose Ronnie for eating disorder and addiction recovery, or Sara for nutrition.",
    },
  ],
};

export const binge = {
  h1: "Binge eating recovery coaching in Colorado Springs",
  lede:
    "If you eat past the point of comfort, eat in private, or keep promising that tomorrow will be different, you deserve compassion, not judgment. You are not weak or broken, and you don't need a diagnosis to ask for help.",
  sections: [
    {
      title: "What is binge eating disorder?",
      body: [
        "Binge eating disorder (BED) is a recognized eating disorder. It involves repeated episodes of eating an unusually large amount of food while feeling a loss of control. People may eat fast, eat when not hungry, keep going until uncomfortably full, or prefer to eat alone. Distress, shame or guilt often follow.",
        "It happens to people of any body size, gender or background. You can't tell by looking at someone, and it is not a moral failing.",
      ],
    },
    {
      title: "What research tells us",
      body: [
        "The National Institute of Mental Health names BED as the most common eating disorder in the United States. A large U.S. study estimated lifetime prevalence at about 2.8% of adults.",
        "Diagnosis looks at more than eating a lot: repeated episodes, loss of control, distress, and how often and how long it happens. Only a qualified clinician can diagnose. This page is for education.",
      ],
    },
    {
      title: "You don't have to get worse to deserve support",
      body: [
        "Binge eating can be a response to stress, loneliness, restriction, hard emotions, or a long day of holding it all together. Or you might not know what sets it off. Either way, you can start now.",
        "We won't treat food as a test of character or hand you stricter rules. We'll get curious about your patterns and build a steadier, more flexible relationship with food.",
      ],
    },
  ],
  support: [
    {
      title: "Coaching from lived experience",
      body: "I'm Ronnie, and I spent years struggling with binge eating. I know how isolating it is when food takes over. I won't assume your story matches mine, but I'll meet you with empathy and no judgment.",
    },
    {
      title: "Personalized one-on-one sessions",
      body: "We start with your goals, strengths and circumstances, then notice patterns around eating and emotions and try coping strategies that fit you.",
    },
    {
      title: "Daily text check-ins",
      body: "Encouragement and a place for questions between sessions. Text support is coaching, not crisis care, and does not replace clinical treatment.",
    },
    {
      title: "Nutrition support with Sara",
      body: "Sara Potter, certified nutritionist, focuses on nourishment and rebuilding trust with food, never restriction or shame.",
    },
  ],
  limits:
    "Coaching offers accountability, reflection and encouragement. It is not diagnosis, psychotherapy or medical care. If you're experiencing severe restriction, purging, fainting or other physical symptoms, please get a medical assessment.",
  sources: [
    { label: "NIMH: Eating Disorders Statistics", url: "https://www.nimh.nih.gov/health/statistics/eating-disorders" },
    { label: "Kessler et al., prevalence of binge-eating disorder", url: "https://doi.org/10.1001/archgenpsychiatry.2013.104" },
    { label: "American Psychiatric Association: What Are Eating Disorders?", url: "https://www.psychiatry.org/patients-families/eating-disorders/what-are-eating-disorders" },
    { label: "NICE guideline: Eating disorders, recognition and treatment", url: "https://www.nice.org.uk/guidance/ng69/chapter/recommendations" },
  ],
  closing: "You are more than your hardest moments with food. If personal coaching sounds helpful, we'd be glad to talk.",
};

export type Coach = {
  id: CoachId;
  name: string;
  role: string;
  photo: string;
  credentials: string[];
  focus: string[];
  short: string;
  bio: string[];
};

export const coaches: Coach[] = [
  {
    id: "ronnie",
    name: "Ronnie Sullivan",
    role: "Founder and recovery coach",
    photo: "/people/ronnie.webp",
    credentials: ["Qualified Behavioral Health Assistant", "Project HEAL Healers Circle member", "Former Peace Corps volunteer", "Georgetown University graduate"],
    focus: ["Binge eating", "Bulimia", "Addiction", "Restriction and ARFID"],
    short: "Recovered from bulimia, binge eating and addiction. Coaches with daily support.",
    bio: [
      "My recovery from eating disorders and addiction was a rough road. For years I couldn't stop binge eating and felt hopeless and out of control.",
      "After a decade of learning and growing, I help people in Colorado Springs and online recover from eating disorders and addiction. You'll learn to treat yourself like you'd treat a best friend, and food can add to your joy instead of taking from it.",
      "You can recover. I'd be honored to help.",
    ],
  },
  {
    id: "sara",
    name: "Sara Potter",
    role: "Community health connector and nutrition coach",
    photo: "/people/sara.webp",
    credentials: ["Certified nutritionist", "CrossFit coach", "Yoga teacher", "Coaching since 2010"],
    focus: ["Nutrition", "Metabolic health", "Performance", "Rebuilding trust with food"],
    short: "Certified nutritionist who healed from bulimia. Nutrition without restriction.",
    bio: [
      "Sara's approach to nutrition isn't about restriction. It's about rebuilding your relationship with food, learning to nourish your body, and building habits that last.",
      "Whether you're working on metabolic health, training for a goal, or healing your relationship with food, she meets you where you are. Her biggest growth came from her own recovery from bulimia.",
      "Sara believes that when one person heals, families and communities change too.",
    ],
  },
];

// Kept word for word from /pages/about.
export const story = {
  h1: "Ronnie's journey",
  opening:
    "I stepped out of my friend’s car in front of my apartment after a Halloween party in Washington D.C. I had no cash or cards because my Dad was holding onto them to prevent me from binge eating. I walked past my apartment, only half-aware that I was approaching the dumpster behind Starbucks and eating disposed pastries. Until guilt, shame, and desperation woke me up.",
  invite: "Have you been there, too? Let me help you.",
  chapters: [
    {
      title: "Why I started Peace is Possible",
      body: [
        "Peace is Possible Recovery Coaching supports individuals struggling with eating disorders to make progress toward recovery. We help establish a healthier relationship with food, the body, emotions, and other people. Clients receive multi-faceted support to change behavior patterns, build healthy coping habits, navigate family and social dynamics, and gain self-awareness.",
        "My name is Ronnie, and I created Peace is Possible because I deeply suffered from bulimia and binge eating, and I want to share the life-saving practices, tools, and principles that freed me from shame, depression, and self-hate.",
      ],
    },
    {
      title: "2014: Undergrad",
      body: [
        "I started struggling with bulimia and binge eating in 2014 during undergrad. Even though I was seeing a therapist, I couldn’t control my urges to eat past the point of fullness. I was distracted by the desire to consume food, rushing to find it between classes. I felt immense shame and diminished confidence.",
      ],
    },
    {
      title: "Peace Corps, Paraguay",
      body: [
        "After graduating, I began Peace Corps service in Paraguay, and the shift in environment helped me adopt healthy habits. However, the stress and isolation eventually caught up with me. For the last two weeks of my service, I binged on food and alcohol, isolating myself in a deep depression. I left the house only to buy junk food and rushed home before people saw me. The guilt ate away at me, so I numbed myself by gorging until I fell into a “food coma.” I was medically evacuated just a month before completing my service. Despite my accomplishments, I felt like a failure.",
      ],
    },
    {
      title: "2019: Finding Overeaters Anonymous",
      body: [
        "When I returned to the U.S. in March 2019, I began seeing a new therapist who introduced me to Overeaters Anonymous (OA). That’s when my recovery journey deepened. The process was rocky, and I relapsed countless times, often deceiving my family and canceling social plans because of sickness from binging. But I learned something valuable after each relapse. By the summer, I had begun to abstain from these behaviors just in time to start grad school at Georgetown University.",
      ],
    },
    {
      title: "Georgetown",
      body: [
        "Grad school brought immense stress, with constant reading, studying, and writing papers on global poverty, conflict, and climate change. I spent evenings commuting to OA meetings, but I found comfort in food and alcohol once again.",
        "Desperate for help, I sought more support. My Dad came to live with me for two months, holding onto my credit cards and money so I couldn’t buy food. He shopped for me, met me before and after classes, and helped me through moments when I felt compulsions to binge. Slowly, changes began to happen. I spent more time at OA meetings, started working out with friends, developed mindfulness practices, and adopted a more positive outlook.",
      ],
    },
    {
      title: "Today",
      body: [
        "After months of painstaking effort, I slowly gained peace. While there have been challenging times since, they taught me the importance of community, balance, and spiritual nourishment.",
        "Today, I have the healthiest relationship with food since childhood. I can enjoy foods that once triggered me and treat food as fuel for athletic performance. I can go to BBQs, restaurants, and the grocery store without anxiety.",
      ],
    },
    {
      title: "Why I can help",
      body: [
        "Apart from my own experience in recovery, I am confident that I can help you find peace. Friends and acquaintances often tell me I make them feel calm, understood, and appreciated. This is partially due to my demeanor, but also due to my application of coaching skills, studied in undergrad and honed during Peace Corps. For example, I worked with community members to help them establish the town's first public library, free IT classes, an organized and publicized farmers market, environmental education, school recycling programs, a volunteer youth-literacy program, Boy and Girl Scouts leadership and community service projects, and the construction of a flood-proof bridge. I love, and am adept at helping people reach their goals.",
        "If you earnestly want to recover and are open-minded to trying new approaches, I’m confident we can make progress together. Peace is Possible.",
      ],
    },
  ],
};

// Kept word for word. Clients are anonymous on the live site; `short` is a
// verbatim excerpt for compact layouts.
export const testimonials = [
  {
    short: "With Ronnie’s guidance, I’ve finally been able to take the leap into mindful eating.",
    full: "I found Ronnie through a Google search while looking for support in transitioning from chronic dieting to intuitive eating—something I had struggled with for years. With Ronnie’s guidance, I’ve finally been able to take the leap into mindful eating. His support goes beyond food—he’s helped me build a life structured around the things I love. Thanks to his coaching, I’m now living a much happier and more balanced life.",
    tag: "From chronic dieting to intuitive eating",
  },
  {
    short: "He is so knowledgeable and totally nonjudgmental.",
    full: "Peace is Possible provided me with excellent companionship, care, and attention in my journey. Though I wasn’t sure what to expect, Ronnie did a great job working with me to discover and clarify my goals, and then move towards them. He is so knowledgeable and totally nonjudgmental. I would highly recommend Peace is Possible to any friend in need.",
    tag: "Coaching client",
  },
  {
    short: "His check-ins were extremely helpful in holding me accountable!",
    full: "I had a GREAT experience working with Ronnie! He was so thorough, kind, and knowledgeable. His check-ins were extremely helpful in holding me accountable! 5 stars!",
    tag: "Coaching client",
  },
  {
    short: "He meets every client where they are at with patience, compassion, and authenticity.",
    full: "Ronnie's coaching is extraordinary. He meets every client where they are at with patience, compassion, and authenticity. No matter your goals or current challenges, he will create a path to success that feels accessible and builds back confidence in daily habits.",
    tag: "Coaching client",
  },
  {
    short: "Working with Ronnie has changed my relationship with food in huge ways.",
    full: "Working with Ronnie has changed my relationship with food in huge ways. I am so grateful for his guidance and dedication to making sure even small success are celebrated and challenges are fully supported. His knowledge and skill, paired with his empathy and openness about his own journey make for an inspiring yet attainable path towards a healthier mindset around food and self image that have helped me become a much healthier person in sustainable ways. His holistic, multifaceted approach has taught me practical skills that carry over into many areas of living a better life and being the best person I can be for myself and my loved ones.",
    tag: "Coaching client",
  },
  {
    short: "He's attuned, compassionate, grounding and thoughtful.",
    full: "Ronnie has been a coach of mine for the last 7 months. The weekly in-person check-ins and the daily check-ins have helped me enormously in my own recovery journey. He's attuned, compassionate, grounding and thoughtful. His services are well worth the investment. Also his coffee is fire!",
    tag: "Client for 7 months",
  },
  {
    short: "It goes to a great cause and you get very high-quality coffee.",
    full: "I personally know, Ronnie. He has an absolute heart of gold. He is doing this purely out of the desire to help others. If you don’t need his coaching services, however, please purchase his coffee. That’s my true review comes in. I have been drinking his coffee for a few months now and it is probably some of the best coffee beans I’ve had. And I’m 2/3rds into this life. I’ve drunken a lot of coffee over the decades. Very high-quality beans to the point where I am able to drink this particular coffee black. If you know me, you know, I do not drink my coffee black. It goes to a great cause and you get very high-quality coffee. I highly recommend it.",
    tag: "Coffee customer",
  },
];

export const app = {
  title: "Free coping skills app",
  body: "Pick how you're feeling right now and get coping strategies matched to it. Free, works in your browser, nothing to install.",
  video: "/media/app-demo.mp4",
  poster: "/media/app-demo-poster.webp",
  // Source is 540x962, a 9:16 phone recording.
  aspect: 540 / 962,
};

export const podcast = {
  title: "Ronnie and Sara on Be Encouraged",
  body: "Ronnie and Sara talk recovery, nutrition and community on Be Encouraged with Frank & Lisa, episode 135.",
  youtubeId: "A3EDbLHfzNI",
  thumb: "/media/podcast-thumb.webp",
  videoTitle: "Ep #135 with Big Table City Director Sara Potter & Recovery Coach Ronnie Sullivan",
};

export const credentials = [
  { src: "/brand/qbha.png", alt: "Colorado Skills Institute microcredential: Qualified Behavioral Health Assistant" },
  { src: "/brand/healers-circle.png", alt: "Proud member of Project HEAL's Healers Circle" },
  { src: "/brand/pride.png", alt: "LGBTQ+ friendly: Progress Pride flag" },
];

export type ResourceLink = { label: string; url: string; note?: string };

export const resources = {
  h1: "Eating disorder resources",
  lede:
    "Meditations, articles, coping ideas, support groups and books. Take what helps. You don't have to try everything.",
  caution:
    "These resources are general support, not individual medical or mental-health care. If something raises distress or urges, choose something else and talk it over with your treatment team.",
  meditations: [
    { label: "Body awareness meditation", url: "https://www.tarabrach.com/meditation-space-loving-awareness-3/" },
    { label: "Self-compassion meditation", url: "https://www.tarabrach.com/meditation-rain-self-compassion/" },
    { label: "Relaxation meditation", url: "https://www.tarabrach.com/meditation-open-awareness-presence-3/" },
    { label: "Loving-kindness meditation", url: "https://www.tarabrach.com/meditation-embodied-metta/" },
  ] as ResourceLink[],
  compulsion: [
    "Try a meditation or a few slow, comfortable breaths.",
    "Journal about your feelings, goals or gratitude.",
    "Take a gentle walk, if it fits your recovery plan.",
    "Call or text someone you trust.",
    "Read a spiritual book or another book that comforts you.",
    "Pray to a power greater than yourself, if that means something to you.",
    "Get curious about your emotions instead of judging them.",
    "Take a warm shower or try another soothing sensory activity.",
    "Listen to a calming song or try a grounding exercise.",
  ],
  supportGroupsIntro:
    "We don't run group sessions, but one-on-one coaching gives you the same compassion, connection and accountability many people look for in a group. We also keep this list of trusted groups and can help you find one that fits.",
  supportGroups: [
    { label: "Edenology Recovery Dharma", url: "https://www.edenologyco.com/recovery" },
    { label: "Overeaters Anonymous meetings (Southern Colorado)", url: "https://www.oasoutherncolorado.org/oa-meetings/" },
    { label: "The Phoenix", url: "https://thephoenix.org/explore-events" },
    { label: "Purple Mountain Recovery", url: "https://www.purplemountainrecovery.org/services-6" },
    { label: "ED Care", url: "https://eatingdisorder.care/locations/denver/" },
  ] as ResourceLink[],
  learn: [{ label: "Types of eating disorders (NIMH)", url: "https://www.nimh.nih.gov/health/publications/eating-disorders" }] as ResourceLink[],
  books: [
    { label: "The Big Book of Alcoholics Anonymous", url: "https://www.aa.org/the-big-book" },
    { label: "Overeaters Anonymous: The Twelve Steps and Twelve Traditions", url: "https://bookstore.oa.org/books/the-twelve-steps-and-twelve-traditions-of-overeaters-anonymous-second-edition-990-2.asp" },
    { label: "Overeaters Anonymous: Voices of Recovery", url: "https://bookstore.oa.org/books/voices-of-recovery-a-daily-reader-second-edition-987-2-bk.asp" },
    { label: "Dharma Punx by Noah Levine", url: "https://www.againstthestream.com/dharma-punx-merch/dharma-punx-book" },
    { label: "Radical Compassion by Tara Brach", url: "https://www.tarabrach.com/books/radical-compassion/" },
    { label: "Your True Home by Thich Nhat Hanh", url: "https://www.goodreads.com/book/show/11968230-your-true-home" },
  ] as ResourceLink[],
  social: [{ label: "Holiday tips for recovery", url: "https://www.instagram.com/p/DCfF8l1SPqB/" }] as ResourceLink[],
  local: [
    { label: "Red Jasper Mental Health", url: "https://www.redjaspermentalhealth.com/", note: "Chronic illness and caregiver burnout" },
  ] as ResourceLink[],
};

export const contact = {
  h1: "Get in touch",
  lede: "Questions about coaching? Send a note. The fastest way to start is a free phone call.",
  referTitle: "Referring a client?",
  referBody: "Therapists, dietitians and treatment teams can refer clients with our short form. We coordinate care with clear roles.",
};

export const crisis = {
  title: "Need help right now?",
  body: "Coaching is not crisis care. If you're in danger or thinking about suicide, call or text 988 (Suicide & Crisis Lifeline), or call 911.",
  lines: [
    { label: "988 Suicide & Crisis Lifeline", detail: "Call or text 988", href: "tel:988" },
    { label: "ANAD Eating Disorders Helpline", detail: "Call 1-888-375-7767", href: "tel:18883757767" },
  ],
};

export const footer = {
  blurb: "LGBTQ+ friendly eating disorder and addiction recovery coaching. In person in Colorado Springs and online.",
  legal: [
    { label: "Privacy policy", url: `${site.store}/policies/privacy-policy` },
    { label: "Refund policy", url: `${site.store}/policies/refund-policy` },
    { label: "Terms of service", url: `${site.store}/policies/terms-of-service` },
    { label: "Your privacy choices", url: `${site.store}/pages/data-sharing-opt-out` },
  ],
};
