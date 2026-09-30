/* ==========================================================================
   SKILLBRIDGE CORE LOGIC — UNIFIED CAREER INTELLIGENCE & ROADMAP ENGINE
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     1. DATA DEFINITIONS & SEED DICTIONARIES
     ========================================================================== */
  const SKILLS = [
    { name: "Python", cat: "Programming", demand: 94, trend: "rising", resource: "https://docs.python.org/3/tutorial/", estTime: "4-6 weeks" },
    { name: "SQL", cat: "Data", demand: 89, trend: "stable", resource: "https://mode.com/sql-tutorial/", estTime: "3-4 weeks" },
    { name: "Excel", cat: "Data", demand: 68, trend: "declining", resource: "https://www.excel-easy.com/", estTime: "1-2 weeks" },
    { name: "Power BI", cat: "Analytics", demand: 80, trend: "rising", resource: "https://learn.microsoft.com/en-us/power-bi/", estTime: "3-4 weeks" },
    { name: "Tableau", cat: "Analytics", demand: 74, trend: "stable", resource: "https://www.tableau.com/learn/training", estTime: "3-4 weeks" },
    { name: "Machine Learning", cat: "AI/ML", demand: 88, trend: "rising", resource: "https://www.coursera.org/learn/machine-learning", estTime: "8-10 weeks" },
    { name: "Deep Learning", cat: "AI/ML", demand: 79, trend: "rising", resource: "https://course.fast.ai/", estTime: "8-12 weeks" },
    { name: "Generative AI Tooling", cat: "AI/ML", demand: 95, trend: "rising", emerging: true, blurb: "Working fluently with LLM APIs, LangChain/LlamaIndex, RAG pipelines and eval frameworks.", resource: "https://deeplearning.ai/short-courses/", estTime: "4-6 weeks" },
    { name: "Prompt Engineering", cat: "AI/ML", demand: 82, trend: "rising", emerging: true, blurb: "Structuring structured prompts, chain-of-thought, few-shot contexts for deterministic output.", resource: "https://www.promptingguide.ai/", estTime: "2-3 weeks" },
    { name: "Statistics", cat: "Data", demand: 76, trend: "stable", resource: "https://www.statlearning.com/", estTime: "4-6 weeks" },
    { name: "Java", cat: "Programming", demand: 67, trend: "stable", resource: "https://dev.java/learn/", estTime: "6-8 weeks" },
    { name: "C", cat: "Programming", demand: 60, trend: "stable", resource: "https://en.cppreference.com/w/c", estTime: "4-6 weeks" },
    { name: "C++", cat: "Programming", demand: 72, trend: "rising", resource: "https://isocpp.org/", estTime: "6-8 weeks" },
    { name: "JavaScript", cat: "Programming", demand: 82, trend: "stable", resource: "https://javascript.info/", estTime: "4-6 weeks" },
    { name: "TypeScript", cat: "Programming", demand: 86, trend: "rising", emerging: true, blurb: "Type-safe JavaScript for scalable enterprise web architectures.", resource: "https://www.typescriptlang.org/docs/", estTime: "2-3 weeks" },
    { name: "React", cat: "Programming", demand: 81, trend: "rising", resource: "https://react.dev/learn", estTime: "4-6 weeks" },
    { name: "Next.js", cat: "Programming", demand: 78, trend: "rising", emerging: true, blurb: "React framework with Server Components, SSR and edge routing.", resource: "https://nextjs.org/learn", estTime: "2-3 weeks" },
    { name: "Node.js", cat: "Programming", demand: 73, trend: "stable", resource: "https://nodejs.org/en/learn", estTime: "3-5 weeks" },
    { name: "AWS", cat: "Cloud", demand: 85, trend: "rising", resource: "https://aws.amazon.com/training/", estTime: "6-8 weeks" },
    { name: "Azure", cat: "Cloud", demand: 78, trend: "rising", resource: "https://learn.microsoft.com/azure/", estTime: "5-7 weeks" },
    { name: "GCP", cat: "Cloud", demand: 70, trend: "rising", resource: "https://cloud.google.com/training", estTime: "4-6 weeks" },
    { name: "Docker", cat: "Cloud", demand: 76, trend: "rising", resource: "https://docs.docker.com/get-started/", estTime: "2-3 weeks" },
    { name: "Kubernetes", cat: "Cloud", demand: 74, trend: "rising", emerging: true, blurb: "Orchestrating container fleets at scale — high demand across cloud teams.", resource: "https://kubernetes.io/docs/tutorials/", estTime: "4-6 weeks" },
    { name: "CI/CD", cat: "Cloud", demand: 68, trend: "stable", resource: "https://docs.github.com/en/actions", estTime: "2-3 weeks" },
    { name: "Cybersecurity Fundamentals", cat: "Security", demand: 80, trend: "rising", resource: "https://tryhackme.com/", estTime: "4-6 weeks" },
    { name: "Ethical Hacking", cat: "Security", demand: 64, trend: "stable", resource: "https://www.hackthebox.com/", estTime: "8-12 weeks" },
    { name: "Cloud Security", cat: "Security", demand: 77, trend: "rising", emerging: true, blurb: "Securing IAM, CSPM, and multi-cloud perimeter configurations.", resource: "https://cloudsecurityalliance.org/", estTime: "4-6 weeks" },
    { name: "UI Design", cat: "Design", demand: 68, trend: "stable", resource: "https://refactoringui.com/", estTime: "3-4 weeks" },
    { name: "UX Research", cat: "Design", demand: 65, trend: "stable", resource: "https://www.nngroup.com/articles/", estTime: "4-5 weeks" },
    { name: "Figma", cat: "Design", demand: 72, trend: "rising", resource: "https://help.figma.com/hc/en-us", estTime: "2-3 weeks" },
    { name: "Data Visualization", cat: "Analytics", demand: 73, trend: "rising", resource: "https://d3js.org/", estTime: "3-4 weeks" },
    { name: "A/B Testing", cat: "Product", demand: 62, trend: "stable", resource: "https://cxl.com/blog/ab-testing-guide/", estTime: "2-3 weeks" },
    { name: "Product Roadmapping", cat: "Product", demand: 64, trend: "stable", resource: "https://www.productplan.com/learn/", estTime: "2-3 weeks" },
    { name: "Agile/Scrum", cat: "Soft", demand: 66, trend: "stable", resource: "https://www.scrumguides.org/", estTime: "1-2 weeks" },
    { name: "Communication", cat: "Soft", demand: 88, trend: "stable", resource: "https://hbr.org/topic/subject/communication", estTime: "Ongoing" },
    { name: "Stakeholder Management", cat: "Soft", demand: 65, trend: "stable", resource: "https://www.mindtools.com/pages/article/newPPM_07.htm", estTime: "2-3 weeks" },
    { name: "SEO", cat: "Marketing", demand: 56, trend: "declining", resource: "https://moz.com/beginners-guide-to-seo", estTime: "2-3 weeks" },
    { name: "Digital Ads", cat: "Marketing", demand: 62, trend: "stable", resource: "https://skillshop.withgoogle.com/", estTime: "2-3 weeks" },
    { name: "Content Strategy", cat: "Marketing", demand: 54, trend: "stable", resource: "https://contentmarketinginstitute.com/", estTime: "2-3 weeks" },
    { name: "Business Analysis", cat: "Analytics", demand: 66, trend: "stable", resource: "https://www.iiba.org/", estTime: "4-6 weeks" },
    { name: "Git", cat: "Programming", demand: 75, trend: "stable", resource: "https://git-scm.com/book/en/v2", estTime: "1-2 weeks" },
    { name: "MLOps", cat: "AI/ML", demand: 75, trend: "rising", emerging: true, blurb: "Deploying, versioning, and monitoring machine learning models in production.", resource: "https://madewithml.com/", estTime: "4-6 weeks" },
    { name: "Data Engineering", cat: "Data", demand: 83, trend: "rising", resource: "https://github.com/datastacktv/data-engineer-roadmap", estTime: "6-8 weeks" },
    { name: "NLP", cat: "AI/ML", demand: 76, trend: "rising", resource: "https://huggingface.co/learn/nlp-course", estTime: "4-6 weeks" }
  ];

  const ROLES = [
    { title: "Software Engineer", sector: "Engineering", baseSalaryINR: "8-20 LPA", baseSalaryUSD: "$80k-$130k", skills: { "Java": 8, "C++": 7, "Python": 7, "SQL": 7, "Git": 8, "Data Structures": 9, "CI/CD": 5 } },
    { title: "Full Stack Developer", sector: "Engineering", baseSalaryINR: "8-18 LPA", baseSalaryUSD: "$75k-$120k", skills: { "JavaScript": 9, "TypeScript": 7, "React": 8, "Node.js": 8, "SQL": 5, "Git": 6, "CI/CD": 4 } },
    { title: "Data Analyst", sector: "Analytics", baseSalaryINR: "7-14 LPA", baseSalaryUSD: "$65k-$95k", skills: { "SQL": 9, "Excel": 6, "Power BI": 8, "Statistics": 6, "Data Visualization": 7, "Communication": 5, "Python": 5 } },
    { title: "Data Scientist", sector: "AI/ML", baseSalaryINR: "12-24 LPA", baseSalaryUSD: "$95k-$145k", skills: { "Python": 9, "Statistics": 8, "Machine Learning": 9, "SQL": 6, "Data Visualization": 5, "Deep Learning": 5 } },
    { title: "Machine Learning Engineer", sector: "AI/ML", baseSalaryINR: "15-30 LPA", baseSalaryUSD: "$120k-$175k", skills: { "Python": 9, "Machine Learning": 9, "Deep Learning": 8, "MLOps": 7, "AWS": 6, "Git": 5, "NLP": 5 } },
    { title: "AI Solutions / Prompt Engineer", sector: "AI/ML", baseSalaryINR: "14-28 LPA", baseSalaryUSD: "$110k-$165k", skills: { "Prompt Engineering": 9, "Generative AI Tooling": 9, "Python": 6, "Communication": 6, "NLP": 6 } },
    { title: "DevOps / Platform Engineer", sector: "Engineering", baseSalaryINR: "10-22 LPA", baseSalaryUSD: "$90k-$140k", skills: { "Docker": 9, "Kubernetes": 8, "CI/CD": 9, "AWS": 7, "Git": 6, "Cloud Security": 5 } },
    { title: "Cloud Engineer", sector: "Engineering", baseSalaryINR: "9-20 LPA", baseSalaryUSD: "$85k-$130k", skills: { "AWS": 9, "Azure": 6, "GCP": 5, "Docker": 6, "Kubernetes": 7, "CI/CD": 6 } },
    { title: "Cybersecurity Analyst", sector: "Security", baseSalaryINR: "8-18 LPA", baseSalaryUSD: "$80k-$125k", skills: { "Cybersecurity Fundamentals": 9, "Ethical Hacking": 7, "Cloud Security": 7, "Communication": 4, "Python": 5 } },
    { title: "Product Manager", sector: "Product", baseSalaryINR: "14-28 LPA", baseSalaryUSD: "$105k-$160k", skills: { "Product Roadmapping": 9, "Stakeholder Management": 8, "A/B Testing": 6, "Agile/Scrum": 7, "Communication": 8, "Data Visualization": 4 } },
    { title: "UI/UX Designer", sector: "Design", baseSalaryINR: "7-16 LPA", baseSalaryUSD: "$70k-$110k", skills: { "UI Design": 9, "UX Research": 8, "Figma": 9, "Communication": 5 } },
    { title: "Business Analyst", sector: "Analytics", baseSalaryINR: "8-16 LPA", baseSalaryUSD: "$70k-$105k", skills: { "Business Analysis": 9, "SQL": 6, "Excel": 6, "Stakeholder Management": 7, "Communication": 7, "Power BI": 5 } }
  ];

  /* Curated Courses Registry */
  const CAREER_COURSES = {
    "Software Engineer": [
      { title: "Harvard CS50: Introduction to Computer Science", provider: "Harvard University / edX", level: "All Levels", duration: "10-12 weeks", type: "free", link: "https://cs50.harvard.edu/x/", desc: "Comprehensive foundation in C, Python, SQL, algorithms, memory management, and data structures." },
      { title: "Data Structures & Algorithms Specialization", provider: "UC San Diego / Coursera", level: "Intermediate", duration: "3-4 months", type: "cert", link: "https://www.coursera.org/specializations/data-structures-algorithms", desc: "Core algorithmic paradigms: divide & conquer, greedy, graph traversal, and dynamic programming." },
      { title: "Java Programming and Software Engineering Fundamentals", provider: "Duke University / Coursera", level: "Beginner to Int", duration: "3 months", type: "cert", link: "https://www.coursera.org/specializations/java-programming", desc: "Object-oriented software design, testing, arrays, structured data, and algorithm analysis." }
    ],
    "Full Stack Developer": [
      { title: "Meta Front-End & Back-End Developer Certificates", provider: "Meta / Coursera", level: "Beginner to Adv", duration: "6-8 months", type: "cert", link: "https://www.coursera.org/professional-certificates/meta-front-end-developer", desc: "React, JavaScript/TypeScript, NodeJS, REST APIs, Databases, and Version Control." },
      { title: "Full Stack Open: Modern Web Development", provider: "University of Helsinki", level: "Intermediate", duration: "8-12 weeks", type: "free", link: "https://fullstackopen.com/en/", desc: "Deep dive into React, Redux, Node.js, Express, MongoDB, GraphQL, TypeScript, and CI/CD." },
      { title: "Next.js 15 & React Server Components Course", provider: "Next.js Learn / Vercel", level: "Intermediate", duration: "3 weeks", type: "free", link: "https://nextjs.org/learn", desc: "App Router, SSR, Streaming, Server Actions, Database integration, and Vercel edge deployment." }
    ],
    "Data Analyst": [
      { title: "Google Data Analytics Professional Certificate", provider: "Google / Coursera", level: "Beginner to Pro", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-data-analytics", desc: "Industry-standard certification covering SQL, Spreadsheets, Tableau, R/Python, and data cleaning." },
      { title: "Microsoft Power BI Data Analyst (PL-300 Exam Prep)", provider: "Microsoft Learn", level: "Intermediate", duration: "4-6 weeks", type: "cert", link: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/", desc: "Official Microsoft curriculum for modeling, DAX expressions, and enterprise reporting." },
      { title: "Tableau Certified Data Analyst Specialization", provider: "Tableau / Coursera", level: "Intermediate", duration: "2 months", type: "cert", link: "https://www.tableau.com/learn/training", desc: "Interactive dashboard design, LOD calculations, storytelling, and visual analytics." }
    ],
    "Data Scientist": [
      { title: "IBM Data Science Professional Certificate", provider: "IBM / Coursera", level: "Beginner to Adv", duration: "5-6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/ibm-data-science", desc: "10-course sequence covering Python, SQL, Applied Machine Learning, and Capstone." },
      { title: "Applied Data Science with Python Specialization", provider: "Univ. of Michigan / Coursera", level: "Intermediate", duration: "4 months", type: "cert", link: "https://www.coursera.org/specializations/data-science-python", desc: "Pandas, Matplotlib, Scikit-learn, Text Mining, and Network Analysis in Python." }
    ],
    "Machine Learning Engineer": [
      { title: "Machine Learning Specialization", provider: "Andrew Ng / DeepLearning.AI", level: "Beginner to Int", duration: "3 months", type: "cert", link: "https://www.coursera.org/specializations/machine-learning-introduction", desc: "Supervised Learning, Neural Networks, Decision Trees, and Reinforcement Learning." },
      { title: "Machine Learning Engineering for Production (MLOps)", provider: "DeepLearning.AI", level: "Advanced", duration: "3 months", type: "cert", link: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-specialization/", desc: "Data pipelines, model deployment, drift monitoring, feature stores, and CI/CD for ML." }
    ],
    "AI Solutions / Prompt Engineer": [
      { title: "Generative AI with Large Language Models", provider: "AWS & DeepLearning.AI", level: "Intermediate", duration: "4-6 weeks", type: "cert", link: "https://www.coursera.org/learn/generative-ai-with-llms", desc: "Transformer architecture, RLHF, fine-tuning, RAG, and LLM application lifecycles." },
      { title: "LangChain & LlamaIndex for Production LLM Apps", provider: "DeepLearning.AI Short Courses", level: "Intermediate", duration: "2-3 weeks", type: "free", link: "https://www.deeplearning.ai/short-courses/", desc: "Building deterministic agents, Vector store retrieval, memory chains, and function calling." }
    ],
    "DevOps / Platform Engineer": [
      { title: "Certified Kubernetes Administrator (CKA) Complete Course", provider: "Linux Foundation / Udemy", level: "Intermediate to Adv", duration: "6-8 weeks", type: "cert", link: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/", desc: "Cluster architecture, pod networking, storage, troubleshooting, and security policies." },
      { title: "Docker & Kubernetes: The Practical Guide", provider: "Academind / Udemy", level: "Beginner to Int", duration: "4-6 weeks", type: "cert", link: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/", desc: "Multi-container architectures, volume mounts, Swarm, Kubernetes services, and Ingress." }
    ],
    "Cloud Engineer": [
      { title: "AWS Certified Solutions Architect - Associate (SAA-C03)", provider: "AWS / Stephane Maarek", level: "Intermediate", duration: "6-8 weeks", type: "cert", link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", desc: "High-availability architecture, VPC networking, EC2, S3, IAM, Serverless, and cost optimization." },
      { title: "Google Cloud Associate Cloud Engineer Certification", provider: "Google Cloud Training", level: "Intermediate", duration: "6 weeks", type: "cert", link: "https://cloud.google.com/learn/certification/associate-cloud-engineer", desc: "GCP Console, Cloud SDK, Compute Engine, GKE, Cloud Run, and IAM perimeter control." }
    ],
    "Cybersecurity Analyst": [
      { title: "Google Cybersecurity Professional Certificate", provider: "Google / Coursera", level: "Beginner to Int", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-cybersecurity", desc: "SIEM tools (Splunk, Chronicle), Linux, SQL, Python for security automation, and incident response." },
      { title: "CompTIA Security+ (SY0-701) Complete Prep", provider: "Professor Messer / CompTIA", level: "Intermediate", duration: "6-8 weeks", type: "free", link: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-training/", desc: "Threats, attacks, vulnerabilities, cryptography, identity management, and compliance." }
    ],
    "Product Manager": [
      { title: "Google Project Management Professional Certificate", provider: "Google / Coursera", level: "Beginner to Int", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-project-management", desc: "Agile, Scrum, sprint planning, risk management, stakeholder communication, and documentation." }
    ],
    "UI/UX Designer": [
      { title: "Google UX Design Professional Certificate", provider: "Google / Coursera", level: "Beginner to Pro", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-ux-design", desc: "User research, wireframing, low/high-fidelity prototyping in Figma, and usability audits." }
    ],
    "Business Analyst": [
      { title: "IBM Business Data Analyst Specialization", provider: "IBM / Coursera", level: "Beginner to Int", duration: "3-4 months", type: "cert", link: "https://www.coursera.org/specializations/ibm-business-data-analyst", desc: "Business metrics, SQL queries, Excel financial modeling, Cognos analytics, and dashboards." }
    ]
  };

  /* Market News with High-Res Curated Tech Imagery */
  const MARKET_NEWS = [
    {
      id: "news-1",
      category: "layoffs",
      impact: "layoff",
      impactLabel: "🚨 Tech Headcount Pivot",
      title: "Big Tech Shifts Headcount from Legacy Roles into Dedicated AI & Agent Teams",
      source: "TechCrunch / Market Pulse",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      summary: "Major technology employers have shifted from wide-scale pandemic reductions to surgical team realignments. Generalist software teams are contracting while AI infrastructure, RAG pipeline, and cloud security hiring expands.",
      takeaway: "Traditional front-end or manual testing roles are facing heightened contraction. Broaden your skills with TypeScript, API design, and AI tooling to stay in demand.",
      link: "https://techcrunch.com/"
    },
    {
      id: "news-2",
      category: "emerging",
      impact: "growth",
      impactLabel: "🚀 High Growth Demand",
      title: "The Surge in 'AI Systems Engineers': Agentic LLM Architecture Becomes Top Priority",
      source: "VentureBeat & Wired Tech",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      summary: "Job openings for engineers who can integrate LLM APIs, LangChain, vector databases, and automated agent workflows have surged 46% year-over-year.",
      takeaway: "Employers are willing to pay top percentiles for developers who know how to connect LLMs to production databases with deterministic guardrails.",
      link: "https://venturebeat.com/category/ai/"
    },
    {
      id: "news-3",
      category: "hiring",
      impact: "hiring",
      impactLabel: "🇮🇳 India GCC Expansion",
      title: "Global Capability Centers (GCCs) in India Cross 1,600 Hubs, Fueling Senior Tech Hiring",
      source: "Economic Times & NASSCOM",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
      summary: "Bengaluru, Hyderabad, Pune, and NCR are witnessing accelerated hiring from Fortune 500 GCCs. Demand is particularly intense for Cloud Architects, Data Engineers, and Platform DevOps.",
      takeaway: "India GCCs offer competitive global-scale compensation packages (₹18-35 LPA for mid-senior engineers). Ensure your cloud & system architecture credentials are up to date.",
      link: "https://economictimes.indiatimes.com/tech"
    },
    {
      id: "news-4",
      category: "salary",
      impact: "salary",
      impactLabel: "💰 Compensation Surge",
      title: "2026 Salary Index: Cloud Security and MLOps Engineers Command 35% Premium",
      source: "Levels.fyi & Industry Benchmarks",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      summary: "Specialized roles in Cloud Security Posture (CSPM), Kubernetes Fleet Management, and MLOps deployment pipelines are experiencing the steepest salary growth across the software market.",
      takeaway: "Bridging one high-demand cloud or MLOps gap significantly increases compensation leverage compared to generic full-stack roles.",
      link: "https://www.levels.fyi/"
    },
    {
      id: "news-5",
      category: "layoffs",
      impact: "layoff",
      impactLabel: "📉 Sector Normalization",
      title: "Layoff Volatility Drops 60% as Tech Sector Stabilizes into Sustainable Growth",
      source: "Layoffs.fyi / Bloomberg",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      summary: "Layoff rates in enterprise SaaS and IT services have reached their lowest quarterly volatility in three years. Hiring budgets have re-opened with a strict focus on ROI and efficiency.",
      takeaway: "Showcase measurable impact on your resume—such as costs saved, infrastructure automated, or deployment time reduced.",
      link: "https://layoffs.fyi/"
    },
    {
      id: "news-6",
      category: "emerging",
      impact: "growth",
      impactLabel: "✨ Emerging Trend",
      title: "Cybersecurity Shortage Intensifies: 4 Million Unfilled Positions Worldwide",
      source: "ISC2 Global Cybersecurity Study",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      summary: "The global shortage of certified cybersecurity analysts, SOC operators, and ethical hackers continues to grow. Zero Trust architecture and multi-cloud IAM compliance lead hiring requirements.",
      takeaway: "Pursuing entry-to-intermediate certifications like CompTIA Security+ or Google Cybersecurity provides one of the fastest routes to an in-demand tech career.",
      link: "https://www.isc2.org/research"
    }
  ];

  /* Portfolio Project Ideas Mapped to Roles */
  const PROJECT_IDEAS = {
    "Software Engineer": [
      {
        title: "High-Throughput In-Memory Key-Value Store",
        closesGaps: ["Java", "C++", "Data Structures"],
        stack: "C++ / Java, TCP Sockets, Multi-threading, LRU Cache",
        difficulty: "Intermediate to Adv",
        timeEst: "1-2 weeks",
        desc: "Implement a Redis-like distributed key-value storage engine supporting concurrency, TTL expiration, and persistence to disk.",
        portfolioOutcome: "Demonstrates memory management, low-level socket programming, and lock-free concurrency."
      }
    ],
    "Full Stack Developer": [
      {
        title: "Real-Time Collaborative Markdown & Task SaaS",
        closesGaps: ["Next.js", "TypeScript", "React", "Node.js"],
        stack: "Next.js 15, TypeScript, TailwindCSS, PostgreSQL / Supabase",
        difficulty: "Intermediate",
        timeEst: "1-2 weeks",
        desc: "Full-stack web application featuring OAuth authentication, Server Actions, optimistic UI updates, and real-time multiplayer editing.",
        portfolioOutcome: "Deployed live on Vercel with automated GitHub CI/CD testing."
      }
    ],
    "Data Analyst": [
      {
        title: "Executive E-Commerce Sales & Profit Dashboard",
        closesGaps: ["Power BI", "SQL", "Data Visualization"],
        stack: "Power BI, PostgreSQL, DAX Expressions",
        difficulty: "Intermediate",
        timeEst: "4-6 days",
        desc: "Design an interactive, cross-filtering KPI dashboard analyzing customer retention, product margins, and cohort seasonality.",
        portfolioOutcome: "Includes a shareable Power BI interactive web report and documented SQL ETL scripts on GitHub."
      }
    ],
    "Data Scientist": [
      {
        title: "Real Estate Valuation & Price Forecasting Engine",
        closesGaps: ["Machine Learning", "Statistics", "Python"],
        stack: "Scikit-Learn, XGBoost, Streamlit, Pandas",
        difficulty: "Intermediate to Adv",
        timeEst: "1-2 weeks",
        desc: "End-to-end regression model with feature engineering, cross-validation, and an interactive Streamlit UI for real-time house valuations.",
        portfolioOutcome: "Deployed live on Streamlit Cloud with comprehensive model evaluation metrics."
      }
    ],
    "AI Solutions / Prompt Engineer": [
      {
        title: "Multi-Document Enterprise RAG Agent with Guardrails",
        closesGaps: ["Generative AI Tooling", "Prompt Engineering", "Python"],
        stack: "LangChain, OpenAI API / Llama 3, ChromaDB, FastAPI",
        difficulty: "Intermediate to Adv",
        timeEst: "1 week",
        desc: "Build a retrieval-augmented generation engine that ingests financial PDFs, embeds vectors, and answers citations with deterministic validation.",
        portfolioOutcome: "Production REST API with comprehensive evaluation suite and Dockerfile."
      }
    ],
    "DevOps / Platform Engineer": [
      {
        title: "GitOps Kubernetes Microservice Pipeline with Terraform",
        closesGaps: ["Docker", "Kubernetes", "CI/CD", "AWS"],
        stack: "Terraform, Docker, Minikube / EKS, GitHub Actions, Helm",
        difficulty: "Advanced",
        timeEst: "2 weeks",
        desc: "Provision AWS VPC infrastructure with Terraform, containerize a 3-tier microservice, and deploy with Helm and automated canary rollouts.",
        portfolioOutcome: "Complete infrastructure-as-code repository with reproducible architecture diagrams."
      }
    ]
  };

  const REAL_PROFILE_KEY = "skillbridge_user_profile_v5";

  const defaultEmptyProfile = {
    name: "",
    status: "Student",
    education: {
      degree: "",
      field: "",
      gradYear: "",
      institution: ""
    },
    skills: {}, // empty for new users
    careerInterests: [], // empty for new users
    targetRole: null, // null for new users
    resumeUploaded: false,
    resumeFileName: ""
  };

  const DEMO_PROFILE = {
    name: "Aarav Patel (Demo Profile)",
    status: "Student",
    education: {
      degree: "B.Tech",
      field: "Computer Science & Engineering",
      gradYear: "2026",
      institution: "National Institute of Technology"
    },
    skills: { "Python": 90, "SQL": 90, "JavaScript": 80, "React": 75, "Git": 80, "Docker": 60, "Statistics": 60 },
    careerInterests: ["Full Stack Developer", "Data Scientist"],
    targetRole: "Full Stack Developer",
    resumeUploaded: true,
    resumeFileName: "Aarav_Patel_Resume.pdf"
  };

  /* ==========================================================================
     2. APP STATE (ISOLATED REAL VS DEMO MODE)
     ========================================================================== */
  const state = {
    isDemoMode: false,
    hasRealProfile: false,
    profile: { ...defaultEmptyProfile },
    activePage: "welcome", // welcome | wizard | dashboard | career-match | skills-gaps | roadmap | jobs | market | methodology
    wizardStep: 1,
    wizardDraft: { ...defaultEmptyProfile },
    roadmapTasksCompleted: {},
    trackedApplications: [],
    salaryExp: "mid",
    salaryGeo: "in",
    activeNewsCategory: "all",
    newsSearchQuery: "",
    activeCourseFilter: "all",
    selectedLevel: 60
  };

  function getActiveProfile() {
    return state.isDemoMode ? DEMO_PROFILE : state.profile;
  }

  function saveRealProfile() {
    if (state.isDemoMode) return; // Never save demo data to user storage
    try {
      localStorage.setItem(REAL_PROFILE_KEY, JSON.stringify({
        profile: state.profile,
        hasRealProfile: state.hasRealProfile,
        roadmapTasksCompleted: state.roadmapTasksCompleted,
        trackedApplications: state.trackedApplications
      }));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }

  function loadRealProfile() {
    try {
      const saved = localStorage.getItem(REAL_PROFILE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.profile && parsed.profile.name) {
          state.profile = parsed.profile;
          state.hasRealProfile = true;
          if (parsed.roadmapTasksCompleted) state.roadmapTasksCompleted = parsed.roadmapTasksCompleted;
          if (parsed.trackedApplications) state.trackedApplications = parsed.trackedApplications;
        }
      }
    } catch (e) {
      console.warn("Storage load error", e);
    }
  }

  /* ==========================================================================
     3. PROFILE COMPLETION & SCORE CALCULATORS
     ========================================================================== */
  function calculateProfileCompletion(p) {
    let score = 0;
    const checks = {
      name: Boolean(p.name && p.name.trim()),
      education: Boolean(p.education && p.education.degree && p.education.field),
      skills: Object.keys(p.skills || {}).length > 0,
      role: Boolean(p.targetRole || (p.careerInterests && p.careerInterests.length > 0)),
      resume: Boolean(p.resumeUploaded)
    };

    if (checks.name) score += 20;
    if (checks.education) score += 20;
    if (checks.skills) score += 30;
    if (checks.role) score += 20;
    if (checks.resume) score += 10;

    return { score, checks };
  }

  function calculateRoleFit(role, userSkills) {
    if (!role || !userSkills || Object.keys(userSkills).length === 0) {
      return {
        role: role || { title: "None", sector: "None", baseSalaryINR: "—", baseSalaryUSD: "—" },
        fitScore: 0,
        corePct: 0,
        emergingBonus: 0,
        matchedSkills: [],
        missingSkills: role ? Object.entries(role.skills).map(([n, w]) => ({ name: n, weight: w })) : []
      };
    }

    let totalWeight = 0;
    let earnedPoints = 0;
    const missingSkills = [];
    const matchedSkills = [];

    const roleReqs = role.skills || {};
    for (const [skillName, weight] of Object.entries(roleReqs)) {
      totalWeight += weight;
      const userLevel = (userSkills[skillName] !== undefined ? userSkills[skillName] : 0);

      if (userLevel > 0) {
        earnedPoints += (userLevel / 100) * weight;
        matchedSkills.push({ name: skillName, weight, level: userLevel });
      } else {
        missingSkills.push({ name: skillName, weight });
      }
    }

    let corePct = totalWeight > 0 ? (earnedPoints / totalWeight) * 100 : 0;
    
    // Emerging skills velocity bonus (+4 to +12 pts)
    let emergingCount = 0;
    for (const skillName of Object.keys(userSkills)) {
      const skillObj = SKILLS.find(s => s.name === skillName);
      if (skillObj && skillObj.emerging && userSkills[skillName] > 0) emergingCount++;
    }
    const emergingBonus = Math.min(12, emergingCount * 4);
    const finalScore = Math.min(100, Math.round(corePct * 0.88 + emergingBonus));

    return {
      role,
      fitScore: finalScore,
      corePct: Math.round(corePct),
      emergingBonus,
      matchedSkills,
      missingSkills: missingSkills.sort((a, b) => b.weight - a.weight)
    };
  }

  /* ==========================================================================
     4. NAVIGATION & PAGE ROUTING
     ========================================================================== */
  function showPage(pageId) {
    // If a non-onboarded user tries to click deep tabs without a profile, prompt onboarding
    if (!state.hasRealProfile && !state.isDemoMode && pageId !== "welcome" && pageId !== "wizard" && pageId !== "methodology" && pageId !== "market") {
      pageId = "welcome";
    }

    state.activePage = pageId;

    // Desktop Tabs
    document.querySelectorAll(".main-nav .nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.page === pageId);
    });

    // Mobile Tabs
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.page === pageId);
    });

    // View Pages
    document.querySelectorAll(".view-page").forEach(page => {
      page.classList.toggle("active", page.id === `view-${pageId}`);
    });

    // Demo Mode Banner visibility
    const banner = document.getElementById("demoModeBanner");
    if (banner) banner.style.display = state.isDemoMode ? "block" : "none";

    const headerModeBadge = document.getElementById("headerModeBadge");
    if (headerModeBadge) {
      headerModeBadge.textContent = state.isDemoMode ? "DEMO MODE" : "Career AI";
      headerModeBadge.style.color = state.isDemoMode ? "var(--accent-rose)" : "";
      headerModeBadge.style.borderColor = state.isDemoMode ? "rgba(225,29,72,0.4)" : "";
    }

    // Refresh active profile name in header
    const currentProfile = getActiveProfile();
    const headerProfileName = document.getElementById("headerProfileName");
    if (headerProfileName) {
      headerProfileName.textContent = currentProfile.name ? currentProfile.name.split(" ")[0] : "My Profile";
    }

    // Render active view contents
    if (pageId === "dashboard") renderDashboard();
    if (pageId === "career-match") renderCareerMatch();
    if (pageId === "skills-gaps") renderSkillsAndGaps();
    if (pageId === "roadmap") renderRoadmap();
    if (pageId === "jobs") renderJobs();
    if (pageId === "market") renderMarket();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ==========================================================================
     5. VIEW RENDERING FUNCTIONS
     ========================================================================== */

  /* View 3: Dashboard */
  function renderDashboard() {
    const p = getActiveProfile();
    const hasSkills = Object.keys(p.skills || {}).length > 0;
    const targetRoleName = p.targetRole || (p.careerInterests && p.careerInterests[0]) || null;
    const activeRole = targetRoleName ? ROLES.find(r => r.title === targetRoleName) : null;
    const fitData = activeRole ? calculateRoleFit(activeRole, p.skills) : null;

    // Greeting
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const displayName = p.name ? p.name.split(" ")[0] : "Candidate";

    const greetingEl = document.getElementById("dashGreetingName");
    if (greetingEl) greetingEl.textContent = `${timeOfDay}, ${displayName} 👋`;

    const activeRoleBadge = document.getElementById("dashActiveRoleBadge");
    if (activeRoleBadge) {
      activeRoleBadge.textContent = activeRole ? `Target: ${activeRole.title}` : "Target: Select Career";
    }

    // Profile Completion Checklist & Progress
    const comp = calculateProfileCompletion(p);
    const compPctEl = document.getElementById("dashProfileCompPct");
    const compBarEl = document.getElementById("dashProfileCompBar");
    if (compPctEl) compPctEl.textContent = `${comp.score}%`;
    if (compBarEl) compBarEl.style.width = `${comp.score}%`;

    const chkName = document.getElementById("chkName");
    const chkEdu = document.getElementById("chkEdu");
    const chkSkills = document.getElementById("chkSkills");
    const chkRole = document.getElementById("chkRole");
    const chkResume = document.getElementById("chkResume");

    if (chkName) chkName.innerHTML = comp.checks.name ? `✓ Name & Status` : `○ Name & Status`;
    if (chkEdu) chkEdu.innerHTML = comp.checks.education ? `✓ Education Details` : `○ Education Details`;
    if (chkSkills) chkSkills.innerHTML = comp.checks.skills ? `✓ Skills (${Object.keys(p.skills).length} added)` : `○ Skills (0 added)`;
    if (chkRole) chkRole.innerHTML = comp.checks.role ? `✓ Target: ${p.targetRole || p.careerInterests[0]}` : `○ Target Career`;
    if (chkResume) chkResume.innerHTML = comp.checks.resume ? `✓ Resume Scanned` : `○ Resume Scanned`;

    // Prominent "Your Next Best Action" Card
    const nextTitle = document.getElementById("dashNextActionTitle");
    const nextDesc = document.getElementById("dashNextActionDesc");
    const nextBtn = document.getElementById("dashNextActionBtn");

    if (!hasSkills) {
      if (nextTitle) nextTitle.textContent = "Add your verified skills";
      if (nextDesc) nextDesc.textContent = "You have 0 skills logged. Add your programming languages and tools to calculate career readiness.";
      if (nextBtn) { nextBtn.textContent = "Add Skills Now →"; nextBtn.onclick = () => showPage("skills-gaps"); }
    } else if (!activeRole) {
      if (nextTitle) nextTitle.textContent = "Choose your target career path";
      if (nextDesc) nextDesc.textContent = "Select your target role below to calculate your skill gaps, compensation range, and custom roadmap.";
      if (nextBtn) { nextBtn.textContent = "Select Target Career →"; nextBtn.onclick = () => document.getElementById("dashRoleSelect")?.focus(); }
    } else if (fitData && fitData.missingSkills.length > 0) {
      const topGap = fitData.missingSkills[0];
      const gapSkillObj = SKILLS.find(s => s.name === topGap.name) || { demand: 80 };
      if (nextTitle) nextTitle.textContent = `Close your #1 Skill Gap: Learn ${topGap.name}`;
      if (nextDesc) nextDesc.innerHTML = `<strong>${topGap.name}</strong> is required in <strong>${gapSkillObj.demand}%</strong> of ${activeRole.title} openings. Bridging this skill will raise your match score by <strong>+${Math.round(topGap.weight * 2.2)}%</strong>.`;
      if (nextBtn) { nextBtn.textContent = `Start ${topGap.name} Roadmap →`; nextBtn.onclick = () => showPage("roadmap"); }
    } else {
      if (nextTitle) nextTitle.textContent = `Ready to Apply for ${activeRole ? activeRole.title : "Tech"} Roles!`;
      if (nextDesc) nextDesc.textContent = "You meet the core competencies for your chosen career track. Explore qualified job postings and track your applications.";
      if (nextBtn) { nextBtn.textContent = "Browse Matching Jobs →"; nextBtn.onclick = () => showPage("jobs"); }
    }

    // 4 Metrics Cards
    const readinessScore = document.getElementById("dashReadinessScore");
    const readinessBar = document.getElementById("dashReadinessBar");
    const readinessSub = document.getElementById("dashReadinessSub");

    if (activeRole && fitData) {
      if (readinessScore) readinessScore.textContent = `${fitData.fitScore}%`;
      if (readinessBar) {
        readinessBar.style.width = `${fitData.fitScore}%`;
        readinessBar.style.background = fitData.fitScore >= 75 ? "var(--accent-emerald)" : fitData.fitScore >= 50 ? "var(--accent-gold)" : "var(--accent-rose)";
      }
      if (readinessSub) {
        readinessSub.textContent = fitData.fitScore >= 75 ? `Strong match for ${activeRole.title}` : fitData.fitScore >= 50 ? `Solid foundation — ${fitData.missingSkills.length} key gaps` : `Emerging candidate — follow roadmap`;
      }
    } else {
      if (readinessScore) readinessScore.textContent = "—";
      if (readinessBar) readinessBar.style.width = "0%";
      if (readinessSub) readinessSub.textContent = "Select career to compute";
    }

    // Skills Count
    const skillsCountEl = document.getElementById("dashSkillsCount");
    const skillsPreviewEl = document.getElementById("dashSkillsListPreview");
    const skillKeys = Object.keys(p.skills || {});
    if (skillsCountEl) skillsCountEl.textContent = skillKeys.length;
    if (skillsPreviewEl) skillsPreviewEl.textContent = skillKeys.length ? `${skillKeys.slice(0, 4).join(", ")}...` : "No skills added yet";

    // Gaps Count
    const gapsCountEl = document.getElementById("dashGapsCount");
    const topGapText = document.getElementById("dashTopGapText");
    if (activeRole && fitData) {
      if (gapsCountEl) gapsCountEl.textContent = fitData.missingSkills.length;
      if (topGapText) topGapText.textContent = fitData.missingSkills[0] ? `Top Gap: ${fitData.missingSkills[0].name}` : "All core skills covered!";
    } else {
      if (gapsCountEl) gapsCountEl.textContent = "—";
      if (topGapText) topGapText.textContent = "Select target career";
    }

    // Roadmap Progress
    const totalTasks = 8;
    const completedTasks = Object.values(state.roadmapTasksCompleted).filter(Boolean).length;
    const roadmapProgressText = document.getElementById("dashRoadmapProgressText");
    if (roadmapProgressText) roadmapProgressText.textContent = `${completedTasks} / ${totalTasks}`;

    // Target Role Switcher Dropdown & Chips
    const roleSelect = document.getElementById("dashRoleSelect");
    if (roleSelect) {
      roleSelect.innerHTML = `<option value="">-- Choose a Target Career --</option>` + ROLES.map(r => `
        <option value="${r.title}" ${r.title === (p.targetRole || "") ? "selected" : ""}>${r.title} (${r.sector})</option>
      `).join("");

      roleSelect.onchange = (e) => {
        const chosen = e.target.value || null;
        if (state.isDemoMode) {
          DEMO_PROFILE.targetRole = chosen;
        } else {
          state.profile.targetRole = chosen;
          saveRealProfile();
        }
        renderDashboard();
      };
    }

    const roleChipsContainer = document.getElementById("dashRoleChips");
    if (roleChipsContainer) {
      roleChipsContainer.innerHTML = ROLES.map(r => `
        <button class="career-role-chip ${r.title === p.targetRole ? "active" : ""}" data-role="${r.title}" type="button">
          ${r.title}
        </button>
      `).join("");

      roleChipsContainer.querySelectorAll(".career-role-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const chosen = chip.dataset.role;
          if (state.isDemoMode) {
            DEMO_PROFILE.targetRole = chosen;
          } else {
            state.profile.targetRole = chosen;
            saveRealProfile();
          }
          renderDashboard();
        });
      });
    }
  }

  /* View 4: Career Match */
  function renderCareerMatch() {
    const p = getActiveProfile();
    const hasSkills = Object.keys(p.skills || {}).length > 0;
    const targetRoleName = p.targetRole || (p.careerInterests && p.careerInterests[0]) || (hasSkills ? ROLES[0].title : null);
    const activeRole = targetRoleName ? ROLES.find(r => r.title === targetRoleName) : null;
    const fitData = activeRole ? calculateRoleFit(activeRole, p.skills) : null;

    const heroTitle = document.getElementById("matchHeroTitle");
    const heroSector = document.getElementById("matchHeroSector");
    const heroPct = document.getElementById("matchHeroPct");
    const corePct = document.getElementById("matchFormulaCorePct");
    const emergingBonus = document.getElementById("matchFormulaEmergingBonus");
    const formulaFinal = document.getElementById("matchFormulaFinal");
    const havePills = document.getElementById("matchHavePills");
    const missPills = document.getElementById("matchMissPills");
    const callout = document.getElementById("matchBiggestGapCallout");
    const whyBox = document.getElementById("matchHeroExplanationText");

    if (!activeRole || !hasSkills) {
      if (heroTitle) heroTitle.textContent = "No Career Selected Yet";
      if (heroSector) heroSector.textContent = "Add skills in your profile and choose a career to calculate your fit score.";
      if (heroPct) heroPct.textContent = "—";
      if (corePct) corePct.textContent = "—";
      if (emergingBonus) emergingBonus.textContent = "—";
      if (formulaFinal) formulaFinal.textContent = "—";
      if (havePills) havePills.innerHTML = `<span style="color:var(--text-muted); font-size:12px;">No skills added yet</span>`;
      if (missPills) missPills.innerHTML = `<span style="color:var(--text-muted); font-size:12px;">Select career to view gaps</span>`;
      if (callout) callout.innerHTML = `<p style="font-size:12.5px; color:var(--text-secondary);">Add skills to unlock gap calculations.</p>`;
      if (whyBox) whyBox.innerHTML = `<span>Complete your profile to see your explainable score breakdown.</span>`;
    } else {
      if (heroTitle) heroTitle.textContent = activeRole.title;
      if (heroSector) heroSector.textContent = `${activeRole.sector} Sector • India Benchmark: ₹${activeRole.baseSalaryINR} • Global: ${activeRole.baseSalaryUSD}`;
      if (heroPct) heroPct.textContent = `${fitData.fitScore}%`;
      if (corePct) corePct.textContent = `${fitData.corePct}%`;
      if (emergingBonus) emergingBonus.textContent = `+${fitData.emergingBonus} pts`;
      if (formulaFinal) formulaFinal.textContent = `${fitData.fitScore} / 100`;

      if (havePills) {
        havePills.innerHTML = fitData.matchedSkills.length
          ? fitData.matchedSkills.map(s => `<span class="badge badge-cert">✓ ${s.name} (${s.level}%)</span>`).join(" ")
          : `<span style="font-size:12px; color:var(--text-muted);">None detected yet</span>`;
      }

      if (missPills) {
        missPills.innerHTML = fitData.missingSkills.length
          ? fitData.missingSkills.map(s => `<span class="badge" style="color:var(--accent-rose); border-color:rgba(225,29,72,0.3);">⚠️ ${s.name} (Wt: ${s.weight}/10)</span>`).join(" ")
          : `<span class="badge badge-free">✓ 100% of core skills covered!</span>`;
      }

      const topGap = fitData.missingSkills[0];
      if (callout) {
        if (topGap) {
          callout.innerHTML = `<strong>Biggest Current Gap: ${topGap.name}</strong><p>Acquiring ${topGap.name} is your highest-leverage step, increasing your qualification score by +${Math.round(topGap.weight * 2.2)} points.</p>`;
        } else {
          callout.innerHTML = `<strong>Excellent Fit!</strong><p>Your verified skills match 100% of the foundational competencies for ${activeRole.title}.</p>`;
        }
      }

      if (whyBox) {
        whyBox.innerHTML = `
          <span class="why-label">Explainable Breakdown:</span>
          Your score of <strong>${fitData.fitScore}%</strong> is derived from covering <strong>${fitData.matchedSkills.length} of ${Object.keys(activeRole.skills).length}</strong> weighted competencies for ${activeRole.title}.
          ${fitData.emergingBonus > 0 ? ` Includes a <strong>+${fitData.emergingBonus} point</strong> emerging velocity bonus for modern tech tools.` : ""}
        `;
      }
    }

    // Ranked list of all 12 roles
    const recoListContainer = document.getElementById("recoList");
    if (recoListContainer) {
      if (!hasSkills) {
        recoListContainer.innerHTML = `
          <div class="card" style="grid-column:1 / -1; padding:30px; text-align:center;">
            <h4>No skills added yet</h4>
            <p style="color:var(--text-secondary); font-size:13px; margin:8px 0 16px;">Add your programming languages, frameworks, or tools to see how your profile ranks across all 12 tech tracks.</p>
            <button class="btn btn-primary btn-sm" onclick="SkillBridgeApp.showPage('skills-gaps')" type="button">Add Skills Now →</button>
          </div>
        `;
      } else {
        const ranked = ROLES.map(r => calculateRoleFit(r, p.skills)).sort((a, b) => b.fitScore - a.fitScore);
        recoListContainer.innerHTML = ranked.map(m => {
          const isTarget = m.role.title === p.targetRole;
          const scoreClass = m.fitScore >= 75 ? "score-high" : m.fitScore >= 50 ? "score-med" : "score-low";
          return `
            <div class="card reco-card ${isTarget ? "card-gold" : ""}">
              <div class="reco-header">
                <div>
                  <span class="reco-rank-badge ${scoreClass}">${m.fitScore}% Fit</span>
                  <h4 class="reco-role-title">${m.role.title} ${isTarget ? '<span class="badge badge-cert">Target</span>' : ''}</h4>
                  <div class="reco-sector-text">${m.role.sector} • ₹${m.role.baseSalaryINR}</div>
                </div>
                <button class="btn btn-sm ${isTarget ? "btn-emerald" : "btn-secondary"} select-role-action-btn" data-role="${m.role.title}" type="button">
                  ${isTarget ? "Active ✓" : "Set Target"}
                </button>
              </div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:8px;">
                <strong>Matched:</strong> ${m.matchedSkills.map(s => s.name).join(", ") || "None"}
              </div>
            </div>
          `;
        }).join("");

        recoListContainer.querySelectorAll(".select-role-action-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const chosen = btn.dataset.role;
            if (state.isDemoMode) {
              DEMO_PROFILE.targetRole = chosen;
            } else {
              state.profile.targetRole = chosen;
              saveRealProfile();
            }
            renderCareerMatch();
          });
        });
      }
    }

    renderCompareMatrix();
  }

  function renderCompareMatrix() {
    const select1 = document.getElementById("compareRole1");
    const select2 = document.getElementById("compareRole2");
    const select3 = document.getElementById("compareRole3");

    if (!select1 || !select2 || !select3) return;

    if (!select1.options.length) {
      const optionsHtml = ROLES.map(r => `<option value="${r.title}">${r.title}</option>`).join("");
      select1.innerHTML = optionsHtml;
      select2.innerHTML = optionsHtml;
      select3.innerHTML = optionsHtml;

      select1.value = "Software Engineer";
      select2.value = "Full Stack Developer";
      select3.value = "Data Analyst";

      [select1, select2, select3].forEach(sel => {
        sel.addEventListener("change", renderCompareMatrixTable);
      });
    }

    renderCompareMatrixTable();
  }

  function renderCompareMatrixTable() {
    const sel1 = document.getElementById("compareRole1")?.value || "Software Engineer";
    const sel2 = document.getElementById("compareRole2")?.value || "Full Stack Developer";
    const sel3 = document.getElementById("compareRole3")?.value || "Data Analyst";

    const role1 = ROLES.find(r => r.title === sel1) || ROLES[0];
    const role2 = ROLES.find(r => r.title === sel2) || ROLES[1];
    const role3 = ROLES.find(r => r.title === sel3) || ROLES[2];

    const p = getActiveProfile();
    const fit1 = calculateRoleFit(role1, p.skills);
    const fit2 = calculateRoleFit(role2, p.skills);
    const fit3 = calculateRoleFit(role3, p.skills);

    const compHead1 = document.getElementById("compHead1");
    const compHead2 = document.getElementById("compHead2");
    const compHead3 = document.getElementById("compHead3");
    if (compHead1) compHead1.textContent = role1.title;
    if (compHead2) compHead2.textContent = role2.title;
    if (compHead3) compHead3.textContent = role3.title;

    const tbody = document.getElementById("compareMatrixBody");
    if (!tbody) return;

    tbody.innerHTML = `
      <tr>
        <td><strong>Skill Match Score</strong></td>
        <td><span class="score-badge ${fit1.fitScore >= 75 ? "score-high" : "score-med"}">${fit1.fitScore}% Match</span></td>
        <td><span class="score-badge ${fit2.fitScore >= 75 ? "score-high" : "score-med"}">${fit2.fitScore}% Match</span></td>
        <td><span class="score-badge ${fit3.fitScore >= 75 ? "score-high" : "score-med"}">${fit3.fitScore}% Match</span></td>
      </tr>
      <tr>
        <td><strong>Missing Skill Gaps</strong></td>
        <td>${fit1.missingSkills.length ? fit1.missingSkills.map(s => s.name).join(", ") : "0 gaps (100% matched)"}</td>
        <td>${fit2.missingSkills.length ? fit2.missingSkills.map(s => s.name).join(", ") : "0 gaps"}</td>
        <td>${fit3.missingSkills.length ? fit3.missingSkills.map(s => s.name).join(", ") : "0 gaps"}</td>
      </tr>
      <tr>
        <td><strong>Estimated India Salary</strong></td>
        <td><strong>₹${role1.baseSalaryINR}</strong></td>
        <td><strong>₹${role2.baseSalaryINR}</strong></td>
        <td><strong>₹${role3.baseSalaryINR}</strong></td>
      </tr>
      <tr>
        <td><strong>Global Benchmark</strong></td>
        <td>${role1.baseSalaryUSD}</td>
        <td>${role2.baseSalaryUSD}</td>
        <td>${role3.baseSalaryUSD}</td>
      </tr>
    `;
  }

  /* View 5: Skills & Gaps */
  function renderSkillsAndGaps() {
    const p = getActiveProfile();
    const activeRole = p.targetRole ? ROLES.find(r => r.title === p.targetRole) : (p.careerInterests && p.careerInterests[0] ? ROLES.find(r => r.title === p.careerInterests[0]) : null);
    const fitData = activeRole ? calculateRoleFit(activeRole, p.skills) : null;

    const gapTargetRoleHeading = document.getElementById("gapTargetRoleHeading");
    if (gapTargetRoleHeading) {
      gapTargetRoleHeading.textContent = activeRole ? activeRole.title : "Target Career (Select in Dashboard)";
    }

    const profileChipsContainer = document.getElementById("profileChips");
    const emptyChipHint = document.getElementById("emptyChipHint");
    const profileSkillsCount = document.getElementById("profileSkillsCount");

    const entries = Object.entries(p.skills || {});
    if (profileSkillsCount) profileSkillsCount.textContent = entries.length;

    if (profileChipsContainer) {
      if (!entries.length) {
        profileChipsContainer.innerHTML = "";
        if (emptyChipHint) emptyChipHint.style.display = "block";
      } else {
        if (emptyChipHint) emptyChipHint.style.display = "none";
        profileChipsContainer.innerHTML = entries.map(([sName, sLvl]) => {
          const lvlLabel = sLvl >= 90 ? "Adv" : sLvl >= 60 ? "Mid" : "Beg";
          return `
            <div class="skill-chip">
              <span class="skill-name">${sName}</span>
              <span class="skill-level">${lvlLabel} (${sLvl}%)</span>
              <button class="skill-remove-btn" data-skill="${sName}" title="Remove skill" aria-label="Remove ${sName}" type="button">&times;</button>
            </div>
          `;
        }).join("");

        profileChipsContainer.querySelectorAll(".skill-remove-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const skillToRemove = btn.dataset.skill;
            if (state.isDemoMode) {
              delete DEMO_PROFILE.skills[skillToRemove];
            } else {
              delete state.profile.skills[skillToRemove];
              saveRealProfile();
            }
            renderSkillsAndGaps();
          });
        });
      }
    }

    // Populate manual select dropdown
    const skillSelect = document.getElementById("skillsPageSelect");
    if (skillSelect && !skillSelect.options.length) {
      skillSelect.innerHTML = SKILLS.map(s => `<option value="${s.name}">${s.name} (${s.cat})</option>`).join("");
    }

    // Populate Gaps
    if (!activeRole) {
      ["highPriorityGapsContainer", "medPriorityGapsContainer", "optPriorityGapsContainer"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `<div class="card" style="grid-column:1 / -1; padding:20px; text-align:center; color:var(--text-secondary);">Select a target career on your Dashboard to identify priority skill gaps.</div>`;
      });
    } else {
      const highGaps = fitData.missingSkills.filter(s => s.weight >= 8);
      const medGaps = fitData.missingSkills.filter(s => s.weight >= 5 && s.weight < 8);
      const optGaps = fitData.missingSkills.filter(s => s.weight < 5);

      renderGapSection("highPriorityGapsContainer", highGaps, activeRole, "high");
      renderGapSection("medPriorityGapsContainer", medGaps, activeRole, "med");
      renderGapSection("optPriorityGapsContainer", optGaps, activeRole, "opt");
    }
  }

  function renderGapSection(containerId, gapsList, activeRole, priorityTier) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!gapsList.length) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; padding:18px; text-align:center; color:var(--text-secondary);">
          ✓ No missing gaps in this category! All requirements covered.
        </div>
      `;
      return;
    }

    container.innerHTML = gapsList.map(gap => {
      const skillObj = SKILLS.find(s => s.name === gap.name) || { demand: 75, resource: "https://roadmap.sh" };
      return `
        <div class="card gap-detail-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <span class="gap-badge-pill ${priorityTier === "high" ? "badge-high" : priorityTier === "med" ? "badge-med" : "badge-opt"}">
                ${priorityTier === "high" ? "🔴 Critical Gap" : priorityTier === "med" ? "🟡 Key Differentiator" : "🟢 Bonus Skill"}
              </span>
              <span style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-muted); font-weight:700;">
                Weight: ${gap.weight}/10
              </span>
            </div>
            <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">${gap.name}</h4>
            <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5; margin-bottom:12px;">
              Required in <strong>${skillObj.demand}%</strong> of ${activeRole.title} openings.
            </p>
          </div>

          <div class="gap-pathway-box">
            <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--accent-gold); letter-spacing:0.06em;">
              How to Close This Gap:
            </span>
            <ul class="gap-steps-list">
              <li>1. Learn fundamentals via curated tutorial</li>
              <li>2. Practice hands-on coding exercises</li>
              <li>3. Build a portfolio project using ${gap.name}</li>
              <li>4. Add verified project link to your resume</li>
            </ul>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:10px; border-top:1px solid var(--border-glass);">
            <a href="${skillObj.resource}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost" style="font-size:11.5px;">
              Study Guide ↗
            </a>
            <button class="btn btn-sm btn-emerald mark-learned-btn" data-skill="${gap.name}" type="button">
              ✓ Mark Learned
            </button>
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".mark-learned-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const skillName = btn.dataset.skill;
        if (state.isDemoMode) {
          DEMO_PROFILE.skills[skillName] = 60;
        } else {
          state.profile.skills[skillName] = 60;
          saveRealProfile();
        }
        renderSkillsAndGaps();
      });
    });
  }

  /* View 6: Roadmap */
  function renderRoadmap() {
    const p = getActiveProfile();
    const activeRole = p.targetRole ? ROLES.find(r => r.title === p.targetRole) : (p.careerInterests && p.careerInterests[0] ? ROLES.find(r => r.title === p.careerInterests[0]) : null);
    const fitData = activeRole ? calculateRoleFit(activeRole, p.skills) : null;

    const roleBadge = document.getElementById("roadmapRoleHeadingBadge");
    if (roleBadge) roleBadge.textContent = activeRole ? activeRole.title : "Select Career in Dashboard";

    const weeklyContainer = document.getElementById("weeklyRoadmapContainer");
    if (weeklyContainer) {
      if (!activeRole) {
        weeklyContainer.innerHTML = `
          <div class="card" style="grid-column:1 / -1; padding:30px; text-align:center;">
            <h4>No target career selected</h4>
            <p style="color:var(--text-secondary); font-size:13px; margin:8px 0 16px;">Choose a target career track in your Dashboard to generate your customized 4-week learning roadmap.</p>
            <button class="btn btn-primary btn-sm" onclick="SkillBridgeApp.showPage('dashboard')" type="button">Go to Dashboard →</button>
          </div>
        `;
      } else {
        const missingSkills = fitData.missingSkills;
        const skill1 = missingSkills[0]?.name || "Core Practice & Algorithms";
        const skill2 = missingSkills[1]?.name || "Framework & Tooling Integration";

        const weeks = [
          {
            weekNum: "01",
            title: `Week 1: Core Foundation — ${skill1}`,
            tasks: [
              { id: "task-1", label: `Complete structured fundamentals for ${skill1} syntax & core concepts.` },
              { id: "task-2", label: `Solve 10 practice problems / real-world tasks applying ${skill1}.` }
            ]
          },
          {
            weekNum: "02",
            title: `Week 2: Advanced Tooling — ${skill2}`,
            tasks: [
              { id: "task-3", label: `Build an isolated component / module leveraging ${skill2}.` },
              { id: "task-4", label: `Study production deployment patterns & performance optimization.` }
            ]
          },
          {
            weekNum: "03",
            title: `Week 3: Hands-On Portfolio Build — ${activeRole.title} Capstone`,
            tasks: [
              { id: "task-5", label: `Implement portfolio project combining ${skill1} and ${skill2}.` },
              { id: "task-6", label: `Write clean README documentation, architecture diagrams, and deploy live.` }
            ]
          },
          {
            weekNum: "04",
            title: `Week 4: Resume Polish & Job Applications Launch`,
            tasks: [
              { id: "task-7", label: `Incorporate newly built project & verified skills into your resume.` },
              { id: "task-8", label: `Apply to top 5 matching job openings on LinkedIn & Naukri.` }
            ]
          }
        ];

        weeklyContainer.innerHTML = weeks.map(w => `
          <div class="card week-card">
            <div class="week-header">
              <span class="week-number-pill">Week ${w.weekNum}</span>
              <h4 class="week-title">${w.title}</h4>
            </div>
            <div class="week-tasks-list">
              ${w.tasks.map(t => {
                const isChecked = Boolean(state.roadmapTasksCompleted[t.id]);
                return `
                  <label class="task-item-label ${isChecked ? "task-done" : ""}">
                    <input type="checkbox" class="roadmap-task-checkbox" data-task-id="${t.id}" ${isChecked ? "checked" : ""}>
                    <span>${t.label}</span>
                  </label>
                `;
              }).join("")}
            </div>
          </div>
        `).join("");

        weeklyContainer.querySelectorAll(".roadmap-task-checkbox").forEach(box => {
          box.addEventListener("change", (e) => {
            state.roadmapTasksCompleted[e.target.dataset.taskId] = e.target.checked;
            saveRealProfile();
            updateRoadmapProgressBar();
            const itemLabel = e.target.closest(".task-item-label");
            if (itemLabel) itemLabel.classList.toggle("task-done", e.target.checked);
          });
        });
      }
    }

    updateRoadmapProgressBar();

    // Project Recommendations
    renderProjects(activeRole);

    // Curated Courses
    renderCourses(activeRole ? activeRole.title : "Software Engineer");
  }

  function updateRoadmapProgressBar() {
    const totalTasks = 8;
    const completedCount = Object.values(state.roadmapTasksCompleted).filter(Boolean).length;
    const pct = Math.round((completedCount / totalTasks) * 100);

    const progressPctEl = document.getElementById("roadmapProgressPct");
    if (progressPctEl) progressPctEl.textContent = `${pct}% Complete (${completedCount} of ${totalTasks} tasks)`;

    const progressBarEl = document.getElementById("roadmapProgressBar");
    if (progressBarEl) progressBarEl.style.width = `${pct}%`;
  }

  function renderProjects(activeRole) {
    const container = document.getElementById("projectRecommendationsContainer");
    if (!container) return;

    if (!activeRole) {
      container.innerHTML = `<div class="card" style="grid-column:1 / -1; padding:20px; text-align:center; color:var(--text-secondary);">Select a career track to view tailored portfolio projects.</div>`;
      return;
    }

    const projects = PROJECT_IDEAS[activeRole.title] || PROJECT_IDEAS["Software Engineer"];
    container.innerHTML = projects.map(p => `
      <div class="card project-idea-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <span class="badge badge-cert">${p.difficulty}</span>
            <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">${p.timeEst}</span>
          </div>
          <h4 style="font-size:16px; font-weight:700; line-height:1.35; margin-bottom:8px;">${p.title}</h4>
          <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.55; margin-bottom:12px;">${p.desc}</p>
          <div style="font-size:11.5px; color:var(--accent-gold); margin-bottom:8px;"><strong>Stack:</strong> ${p.stack}</div>
          <div style="font-size:11.5px; color:var(--text-muted); margin-bottom:12px;"><strong>Outcome:</strong> ${p.portfolioOutcome}</div>
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${p.closesGaps.map(g => `<span class="badge badge-free">Closes: ${g}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderCourses(roleTitle) {
    const container = document.getElementById("careerCoursesContainer");
    if (!container) return;

    const list = CAREER_COURSES[roleTitle] || CAREER_COURSES["Software Engineer"];
    const filtered = list.filter(c => state.activeCourseFilter === "all" || c.type === state.activeCourseFilter);

    container.innerHTML = filtered.map(c => `
      <div class="course-card">
        <div>
          <div class="course-meta-row">
            <span class="badge ${c.type === "cert" ? "badge-cert" : "badge-free"}">
              ${c.type === "cert" ? "🏆 Certification" : "💡 Free Guide"}
            </span>
            <span class="course-provider-tag">${c.provider}</span>
            <span class="course-level-tag">${c.duration}</span>
          </div>
          <h4 class="course-card-title">${c.title}</h4>
          <p class="course-card-desc">${c.desc}</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:10px; border-top:1px solid var(--border-glass);">
          <span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">${c.level}</span>
          <a href="${c.link}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">Enroll / Open ↗</a>
        </div>
      </div>
    `).join("");
  }

  /* View 7: Jobs & Application Tracker */
  function renderJobs() {
    const p = getActiveProfile();
    const activeRole = p.targetRole ? ROLES.find(r => r.title === p.targetRole) : (p.careerInterests && p.careerInterests[0] ? ROLES.find(r => r.title === p.careerInterests[0]) : null);
    const fitData = activeRole ? calculateRoleFit(activeRole, p.skills) : { fitScore: 50 };

    const query = activeRole ? encodeURIComponent(activeRole.title) : "Software Engineer";
    const portalsContainer = document.getElementById("jobsPortalActions");
    if (portalsContainer) {
      portalsContainer.innerHTML = `
        <a class="btn btn-sm btn-secondary" target="_blank" rel="noopener" href="https://www.linkedin.com/jobs/search/?keywords=${query}&location=India">LinkedIn Search ↗</a>
        <a class="btn btn-sm btn-secondary" target="_blank" rel="noopener" href="https://www.naukri.com/${query.replace(/%20/g, "-")}-jobs-in-india">Naukri Search ↗</a>
        <a class="btn btn-sm btn-secondary" target="_blank" rel="noopener" href="https://in.indeed.com/jobs?q=${query}&l=India">Indeed Search ↗</a>
      `;
    }

    const roleName = activeRole ? activeRole.title : "Software Developer";
    const seedJobs = [
      { id: "job-1", title: `${roleName} — Associate`, company: "PhonePe India", location: "Bengaluru (Hybrid)", match: Math.min(95, fitData.fitScore + 8), tags: ["Core Skills", "Git", "API"], salary: "₹8 - ₹16 LPA" },
      { id: "job-2", title: `Junior ${roleName}`, company: "Flipkart", location: "Bengaluru", match: fitData.fitScore, tags: ["Problem Solving", "Engineering"], salary: "₹10 - ₹18 LPA" },
      { id: "job-3", title: `${roleName} Intern`, company: "Meesho", location: "Remote / India", match: Math.min(92, fitData.fitScore + 5), tags: ["Software", "Development"], salary: "₹35k/mo Stipend" },
      { id: "job-4", title: `Senior ${roleName}`, company: "Razorpay", location: "Bengaluru", match: Math.max(45, fitData.fitScore - 18), tags: ["Architecture", "System Design"], salary: "₹22 - ₹35 LPA" }
    ];

    const qualified = seedJobs.filter(j => j.match >= 70);
    const withGaps = seedJobs.filter(j => j.match < 70);

    const countQual = document.getElementById("countJobsQualified");
    const countGaps = document.getElementById("countJobsGaps");
    const countTracker = document.getElementById("countJobsTracker");

    if (countQual) countQual.textContent = qualified.length;
    if (countGaps) countGaps.textContent = withGaps.length;
    if (countTracker) countTracker.textContent = state.trackedApplications.length;

    renderJobList("jobsQualifiedContainer", qualified);
    renderJobList("jobsGapsContainer", withGaps);
    renderTrackerBoard();
  }

  function renderJobList(containerId, jobList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!jobList.length) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; padding:30px; text-align:center;">
          <h4>No listings in this category right now.</h4>
          <p style="color:var(--text-secondary); font-size:13px;">Use the live search links above to query openings on LinkedIn and Naukri.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = jobList.map(j => `
      <div class="card job-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <span class="badge ${j.match >= 75 ? "badge-free" : "badge-cert"}">${j.match}% Match</span>
            <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">${j.salary}</span>
          </div>
          <h4 style="font-size:16px; font-weight:700; margin-bottom:4px;">${j.title}</h4>
          <div style="font-size:13px; color:var(--text-secondary); margin-bottom:10px;">${j.company} • ${j.location}</div>
          <div class="job-tags" style="margin-bottom:12px;">
            ${j.tags.map(t => `<span class="badge">${t}</span>`).join(" ")}
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:10px; border-top:1px solid var(--border-glass);">
          <button class="btn btn-sm btn-ghost save-to-tracker-btn" data-title="${j.title}" data-company="${j.company}" data-loc="${j.location}" data-match="${j.match}" type="button">
            + Save to Tracker
          </button>
          <a href="https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(j.title)}&location=India" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
            Apply / View ↗
          </a>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".save-to-tracker-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const newApp = {
          id: `app-${Date.now()}`,
          title: btn.dataset.title,
          company: btn.dataset.company,
          location: btn.dataset.loc,
          match: Number(btn.dataset.match),
          status: "Saved",
          notes: "Saved from SkillBridge matching recommendations."
        };
        state.trackedApplications.push(newApp);
        saveRealProfile();
        renderTrackerBoard();
        alert(`Saved ${newApp.title} at ${newApp.company} to your Application Tracker!`);
      });
    });
  }

  function renderTrackerBoard() {
    const statuses = ["Saved", "Applied", "Interview", "Offer"];
    statuses.forEach(st => {
      const colList = document.getElementById(`list${st}`);
      const countEl = document.getElementById(`count${st}`);
      const items = state.trackedApplications.filter(a => a.status === st);

      if (countEl) countEl.textContent = items.length;
      if (colList) {
        if (!items.length) {
          colList.innerHTML = `<div class="tracker-empty-slot">No applications in ${st}</div>`;
        } else {
          colList.innerHTML = items.map(item => `
            <div class="card tracker-card-item">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <strong>${item.title}</strong>
                <span class="badge badge-cert">${item.match}%</span>
              </div>
              <div style="font-size:12px; color:var(--text-secondary); margin:4px 0;">${item.company} • ${item.location}</div>
              <div class="tracker-card-actions">
                <select class="sync-select move-status-select" data-id="${item.id}" style="font-size:11px; padding:3px 6px;">
                  ${statuses.map(s => `<option value="${s}" ${s === item.status ? "selected" : ""}>Move to ${s}</option>`).join("")}
                </select>
                <button class="icon-btn delete-app-btn" data-id="${item.id}" title="Remove" style="font-size:11px; padding:2px 6px;" type="button">&times;</button>
              </div>
            </div>
          `).join("");

          colList.querySelectorAll(".move-status-select").forEach(sel => {
            sel.addEventListener("change", (e) => {
              const targetApp = state.trackedApplications.find(a => a.id === e.target.dataset.id);
              if (targetApp) {
                targetApp.status = e.target.value;
                saveRealProfile();
                renderTrackerBoard();
              }
            });
          });

          colList.querySelectorAll(".delete-app-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              state.trackedApplications = state.trackedApplications.filter(a => a.id !== btn.dataset.id);
              saveRealProfile();
              renderTrackerBoard();
            });
          });
        }
      }
    });
  }

  /* View 8: Market Intelligence & News */
  function renderMarket() {
    renderSalaryEstimator();

    const newsContainer = document.getElementById("newsGridContainer");
    if (!newsContainer) return;

    const query = state.newsSearchQuery.trim().toLowerCase();
    const filtered = MARKET_NEWS.filter(item => {
      const matchCat = state.activeNewsCategory === "all" || item.category === state.activeNewsCategory;
      const matchQ = !query || `${item.title} ${item.summary} ${item.takeaway} ${item.source}`.toLowerCase().includes(query);
      return matchCat && matchQ;
    });

    const resultsCount = document.getElementById("newsResultsCount");
    if (resultsCount) resultsCount.textContent = `${filtered.length} article${filtered.length === 1 ? "" : "s"}`;

    newsContainer.innerHTML = filtered.map(item => `
      <article class="news-card-editorial">
        <div class="news-img-container">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            loading="lazy" 
            class="news-card-img" 
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';"
          />
          <span class="news-impact-badge ${
            item.impact === "layoff" ? "impact-layoff" : 
            item.impact === "growth" ? "impact-growth" : 
            item.impact === "hiring" ? "impact-hiring" : "impact-salary"
          }">
            ${item.impactLabel}
          </span>
        </div>

        <div class="news-body-content">
          <div class="news-meta-top">
            <span style="font-family:var(--font-mono); font-size:11px; color:var(--accent-gold); font-weight:700;">${item.source}</span>
            <span class="news-date-text">${item.date}</span>
          </div>

          <h3 class="news-title">${item.title}</h3>
          <p class="news-summary">${item.summary}</p>

          <div class="news-advice-box">
            <span class="news-advice-label">🎯 Actionable Career Takeaway</span>
            <p>${item.takeaway}</p>
          </div>

          <div class="news-footer-row">
            <span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">Verified Tech Signal</span>
            <a href="${item.link}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost">Read Source ↗</a>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderSalaryEstimator() {
    const p = getActiveProfile();
    const roleSelect = document.getElementById("salaryRoleSelect");
    const expSelect = document.getElementById("salaryExpSelect");
    const geoSelect = document.getElementById("salaryGeoSelect");

    if (roleSelect && !roleSelect.options.length) {
      roleSelect.innerHTML = `<option value="">-- Choose Career Role --</option>` + ROLES.map(r => `
        <option value="${r.title}" ${r.title === (p.targetRole || "Software Engineer") ? "selected" : ""}>${r.title}</option>
      `).join("");

      roleSelect.onchange = (e) => {
        state.selectedSalaryRole = e.target.value;
        renderSalaryEstimator();
      };
    }

    const curRoleTitle = roleSelect?.value || p.targetRole || "Software Engineer";
    const curRole = ROLES.find(r => r.title === curRoleTitle) || ROLES[0];
    const exp = expSelect?.value || state.salaryExp;
    const geo = geoSelect?.value || state.salaryGeo;

    const minEl = document.getElementById("salaryMinVal");
    const medEl = document.getElementById("salaryVal");
    const maxEl = document.getElementById("salaryMaxVal");

    if (geo === "in") {
      if (exp === "junior") {
        if (minEl) minEl.textContent = "₹6 LPA";
        if (medEl) medEl.textContent = "₹8 - ₹12 LPA";
        if (maxEl) maxEl.textContent = "₹16+ LPA";
      } else if (exp === "mid") {
        if (minEl) minEl.textContent = "₹10 LPA";
        if (medEl) medEl.textContent = `₹${curRole.baseSalaryINR}`;
        if (maxEl) maxEl.textContent = "₹25+ LPA";
      } else if (exp === "senior") {
        if (minEl) minEl.textContent = "₹18 LPA";
        if (medEl) medEl.textContent = "₹24 - ₹38 LPA";
        if (maxEl) maxEl.textContent = "₹50+ LPA";
      } else {
        if (minEl) minEl.textContent = "₹32 LPA";
        if (medEl) medEl.textContent = "₹42 - ₹70 LPA";
        if (maxEl) maxEl.textContent = "₹85+ LPA";
      }
    } else {
      if (exp === "junior") {
        if (minEl) minEl.textContent = "$60k / yr";
        if (medEl) medEl.textContent = "$75k - $95k / yr";
        if (maxEl) maxEl.textContent = "$115k+ / yr";
      } else if (exp === "mid") {
        if (minEl) minEl.textContent = "$85k / yr";
        if (medEl) medEl.textContent = `${curRole.baseSalaryUSD} / yr`;
        if (maxEl) maxEl.textContent = "$165k+ / yr";
      } else if (exp === "senior") {
        if (minEl) minEl.textContent = "$135k / yr";
        if (medEl) medEl.textContent = "$155k - $200k / yr";
        if (maxEl) maxEl.textContent = "$240k+ / yr";
      } else {
        if (minEl) minEl.textContent = "$185k / yr";
        if (medEl) medEl.textContent = "$220k - $290k / yr";
        if (maxEl) maxEl.textContent = "$360k+ / yr";
      }
    }
  }

  /* ==========================================================================
     6. 4-STEP PROFILE ONBOARDING WIZARD LOGIC
     ========================================================================== */
  function startProfileWizard(initialDraft = null) {
    state.wizardStep = 1;
    state.wizardDraft = initialDraft 
      ? JSON.parse(JSON.stringify(initialDraft)) 
      : { ...defaultEmptyProfile, skills: {}, careerInterests: [] };

    // Populate Step 1 fields
    const nameInp = document.getElementById("wizName");
    const degreeInp = document.getElementById("wizDegree");
    const fieldInp = document.getElementById("wizField");
    const yearInp = document.getElementById("wizGradYear");
    const instInp = document.getElementById("wizInstitution");

    if (nameInp) nameInp.value = state.wizardDraft.name || "";
    if (degreeInp) degreeInp.value = state.wizardDraft.education.degree || "";
    if (fieldInp) fieldInp.value = state.wizardDraft.education.field || "";
    if (yearInp) yearInp.value = state.wizardDraft.education.gradYear || "";
    if (instInp) instInp.value = state.wizardDraft.education.institution || "";

    document.querySelectorAll("input[name='wizStatus']").forEach(r => {
      r.checked = r.value === (state.wizardDraft.status || "Student");
      r.closest(".status-option-label")?.classList.toggle("active", r.checked);
    });

    renderWizardSkillsList();
    renderWizardRolesGrid();
    showWizardStep(1);
    showPage("wizard");
  }

  function showWizardStep(stepNum) {
    state.wizardStep = stepNum;

    const titles = {
      1: "Step 1 — About You",
      2: "Step 2 — Your Skills",
      3: "Step 3 — Career Interests",
      4: "Step 4 — Profile Review"
    };

    const headerTitle = document.getElementById("wizardHeaderTitle");
    if (headerTitle) headerTitle.textContent = titles[stepNum];

    document.querySelectorAll(".wizard-step").forEach(s => {
      s.classList.toggle("active", Number(s.dataset.step) === stepNum);
    });

    document.querySelectorAll(".wizard-pane").forEach((pane, idx) => {
      pane.classList.toggle("active", idx + 1 === stepNum);
    });

    if (stepNum === 2) {
      renderWizardSkillsList();
    } else if (stepNum === 3) {
      renderWizardRolesGrid();
    } else if (stepNum === 4) {
      renderWizardReview();
    }
  }

  function renderWizardSkillsList() {
    const container = document.getElementById("wizProfileChips");
    const countEl = document.getElementById("wizSkillsTotalCount");
    const emptyMsg = document.getElementById("wizEmptySkillsMsg");
    const entries = Object.entries(state.wizardDraft.skills || {});

    if (countEl) countEl.textContent = entries.length;

    if (container) {
      if (!entries.length) {
        container.innerHTML = "";
        if (emptyMsg) emptyMsg.style.display = "block";
      } else {
        if (emptyMsg) emptyMsg.style.display = "none";
        container.innerHTML = entries.map(([sName, sLvl]) => {
          const lvlLabel = sLvl >= 90 ? "Adv" : sLvl >= 60 ? "Mid" : "Beg";
          return `
            <div class="skill-chip">
              <span>${sName}</span>
              <span class="skill-level">${lvlLabel} (${sLvl}%)</span>
              <button class="skill-remove-btn" data-skill="${sName}" type="button">&times;</button>
            </div>
          `;
        }).join("");

        container.querySelectorAll(".skill-remove-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            delete state.wizardDraft.skills[btn.dataset.skill];
            renderWizardSkillsList();
          });
        });
      }
    }

    const selectEl = document.getElementById("wizSkillSelect");
    if (selectEl && !selectEl.options.length) {
      selectEl.innerHTML = SKILLS.map(s => `<option value="${s.name}">${s.name} (${s.cat})</option>`).join("");
    }
  }

  function renderWizardRolesGrid() {
    const container = document.getElementById("wizRolesGrid");
    if (!container) return;

    const interests = state.wizardDraft.careerInterests || [];
    const targetRole = state.wizardDraft.targetRole;

    container.innerHTML = ROLES.map(r => {
      const isSelected = interests.includes(r.title);
      const isPrimary = targetRole === r.title;
      return `
        <div class="role-select-card ${isSelected ? "active" : ""}" data-role="${r.title}">
          <div class="role-select-icon">🎯</div>
          <h4>${r.title}</h4>
          <span style="font-size:11.5px; color:var(--text-secondary);">${r.sector} Sector</span>
          ${isPrimary ? '<span class="badge badge-cert" style="margin-top:6px;">Primary Target</span>' : ''}
        </div>
      `;
    }).join("") + `
      <div class="role-select-card ${interests.includes("Not sure yet") ? "active" : ""}" data-role="Not sure yet">
        <div class="role-select-icon">🔍</div>
        <h4>Not sure yet</h4>
        <span style="font-size:11.5px; color:var(--text-secondary);">Explore recommendations</span>
      </div>
    `;

    container.querySelectorAll(".role-select-card").forEach(card => {
      card.addEventListener("click", () => {
        const role = card.dataset.role;
        if (role === "Not sure yet") {
          state.wizardDraft.careerInterests = ["Not sure yet"];
          state.wizardDraft.targetRole = null;
        } else {
          state.wizardDraft.careerInterests = state.wizardDraft.careerInterests.filter(x => x !== "Not sure yet");
          if (state.wizardDraft.careerInterests.includes(role)) {
            state.wizardDraft.careerInterests = state.wizardDraft.careerInterests.filter(x => x !== role);
            if (state.wizardDraft.targetRole === role) {
              state.wizardDraft.targetRole = state.wizardDraft.careerInterests[0] || null;
            }
          } else {
            state.wizardDraft.careerInterests.push(role);
            if (!state.wizardDraft.targetRole) state.wizardDraft.targetRole = role;
          }
        }
        renderWizardRolesGrid();
      });
    });
  }

  function renderWizardReview() {
    const draft = state.wizardDraft;
    const nameEl = document.getElementById("revUserName");
    const subEl = document.getElementById("revUserSub");
    const skillsCount = document.getElementById("revSkillsCount");
    const skillsChips = document.getElementById("revSkillsChips");
    const careersChips = document.getElementById("revCareersChips");

    if (nameEl) nameEl.textContent = draft.name || "Candidate";
    if (subEl) {
      subEl.textContent = `${draft.education.degree || "Degree"} • ${draft.education.field || "Major"} • ${draft.status || "Student"}`;
    }

    const skillEntries = Object.entries(draft.skills || {});
    if (skillsCount) skillsCount.textContent = skillEntries.length;
    if (skillsChips) {
      skillsChips.innerHTML = skillEntries.length 
        ? skillEntries.map(([s, lvl]) => `<span class="badge badge-cert">${s} (${lvl}%)</span>`).join(" ")
        : `<span style="color:var(--text-muted); font-size:12px;">No skills added</span>`;
    }

    if (careersChips) {
      const interests = draft.careerInterests || [];
      careersChips.innerHTML = interests.length
        ? interests.map(i => `<span class="badge ${i === draft.targetRole ? "badge-free" : "badge-cert"}">${i} ${i === draft.targetRole ? "(Primary)" : ""}</span>`).join(" ")
        : `<span style="color:var(--text-muted); font-size:12px;">Not selected yet</span>`;
    }
  }

  function extractResumeSkills(rawText) {
    const text = String(rawText || "").toLowerCase();
    const detected = {};

    SKILLS.forEach(skill => {
      const sName = skill.name.toLowerCase();
      if (text.includes(sName) || (sName === "sql" && /\bsql\b/.test(text)) || (sName === "aws" && /\baws\b/.test(text)) || (sName === "c" && /\bc\b/.test(text))) {
        detected[skill.name] = 60; // Default intermediate
      }
    });

    return detected;
  }

  /* ==========================================================================
     7. INITIALIZATION & EVENT BINDINGS
     ========================================================================== */
  function initEvents() {
    // Navigation Tabs
    document.querySelectorAll(".main-nav .nav-tab, .mobile-nav-item").forEach(btn => {
      btn.addEventListener("click", () => showPage(btn.dataset.page));
    });

    // Brand Logo
    const brandHome = document.getElementById("brandHome");
    if (brandHome) {
      brandHome.addEventListener("click", (e) => {
        e.preventDefault();
        showPage(state.hasRealProfile || state.isDemoMode ? "dashboard" : "welcome");
      });
    }

    // Welcome Screen Buttons
    const startWizardBtn = document.getElementById("startProfileWizardBtn");
    if (startWizardBtn) startWizardBtn.addEventListener("click", () => startProfileWizard());

    const welcomeManualBtn = document.getElementById("welcomeManualEntryBtn");
    if (welcomeManualBtn) welcomeManualBtn.addEventListener("click", () => startProfileWizard());

    const welcomeResumeBtn = document.getElementById("welcomeUploadResumeBtn");
    if (welcomeResumeBtn) {
      welcomeResumeBtn.addEventListener("click", () => {
        startProfileWizard();
        setTimeout(() => showWizardStep(2), 50);
      });
    }

    // Demo Mode Triggers
    const welcomeDemoBtn = document.getElementById("welcomeTryDemoBtn");
    const headerDemoBtn = document.getElementById("headerDemoTriggerBtn");
    const activateDemo = () => {
      state.isDemoMode = true;
      state.activePage = "dashboard";
      showPage("dashboard");
    };

    if (welcomeDemoBtn) welcomeDemoBtn.addEventListener("click", activateDemo);
    if (headerDemoBtn) headerDemoBtn.addEventListener("click", activateDemo);

    // Exit Demo Mode
    const exitDemoBtn = document.getElementById("exitDemoBtn");
    if (exitDemoBtn) {
      exitDemoBtn.addEventListener("click", () => {
        state.isDemoMode = false;
        if (state.hasRealProfile) {
          showPage("dashboard");
        } else {
          showPage("welcome");
        }
      });
    }

    const demoCreateRealBtn = document.getElementById("demoCreateRealProfileBtn");
    if (demoCreateRealBtn) {
      demoCreateRealBtn.addEventListener("click", () => {
        state.isDemoMode = false;
        startProfileWizard();
      });
    }

    // Header Profile Button -> Edit Profile
    const headerProfileBtn = document.getElementById("headerProfileBtn");
    const dashEditBtn = document.getElementById("dashEditProfileBtn");
    const dashCompBtn = document.getElementById("dashCompleteProfileBtn");
    const openProfileEditor = () => {
      if (state.isDemoMode) {
        alert("You are in Demo Mode. To edit your own profile, click 'Build My Own Profile'.");
      } else {
        startProfileWizard(state.profile);
      }
    };

    if (headerProfileBtn) headerProfileBtn.addEventListener("click", openProfileEditor);
    if (dashEditBtn) dashEditBtn.addEventListener("click", openProfileEditor);
    if (dashCompBtn) dashCompBtn.addEventListener("click", openProfileEditor);

    const dashRoadmapActionBtn = document.getElementById("dashRoadmapActionBtn");
    if (dashRoadmapActionBtn) dashRoadmapActionBtn.addEventListener("click", () => showPage("roadmap"));

    // Dashboard Jump Cards
    document.querySelectorAll(".dash-stat-card[data-jump]").forEach(card => {
      card.addEventListener("click", () => showPage(card.dataset.jump));
    });

    // Wizard Navigation Buttons
    const wizCancel = document.getElementById("wizardCancelBtn");
    if (wizCancel) {
      wizCancel.addEventListener("click", () => {
        showPage(state.hasRealProfile || state.isDemoMode ? "dashboard" : "welcome");
      });
    }

    // Step 1
    const wizStep1Next = document.getElementById("wizStep1Next");
    const wizStep1Back = document.getElementById("wizStep1Back");
    if (wizStep1Next) {
      wizStep1Next.addEventListener("click", () => {
        const nameVal = document.getElementById("wizName")?.value.trim();
        if (!nameVal) {
          alert("Please enter your name to personalize your profile.");
          document.getElementById("wizName")?.focus();
          return;
        }
        state.wizardDraft.name = nameVal;
        state.wizardDraft.status = document.querySelector("input[name='wizStatus']:checked")?.value || "Student";
        state.wizardDraft.education.degree = document.getElementById("wizDegree")?.value.trim() || "";
        state.wizardDraft.education.field = document.getElementById("wizField")?.value.trim() || "";
        state.wizardDraft.education.gradYear = document.getElementById("wizGradYear")?.value.trim() || "";
        state.wizardDraft.education.institution = document.getElementById("wizInstitution")?.value.trim() || "";
        showWizardStep(2);
      });
    }
    if (wizStep1Back) wizStep1Back.addEventListener("click", () => showPage(state.hasRealProfile ? "dashboard" : "welcome"));

    // Status radio pill clicks
    document.querySelectorAll("input[name='wizStatus']").forEach(radio => {
      radio.addEventListener("change", () => {
        document.querySelectorAll(".status-option-label").forEach(l => l.classList.remove("active"));
        radio.closest(".status-option-label")?.classList.add("active");
      });
    });

    // Step 2 (Skills)
    const wizStep2Next = document.getElementById("wizStep2Next");
    const wizStep2Back = document.getElementById("wizStep2Back");
    if (wizStep2Next) wizStep2Next.addEventListener("click", () => showWizardStep(3));
    if (wizStep2Back) wizStep2Back.addEventListener("click", () => showWizardStep(1));

    // Wizard Manual Add Skill
    const wizAddSkillBtn = document.getElementById("wizAddSkillBtn");
    if (wizAddSkillBtn) {
      wizAddSkillBtn.addEventListener("click", () => {
        const s = document.getElementById("wizSkillSelect")?.value;
        if (s) {
          state.wizardDraft.skills[s] = state.selectedLevel;
          renderWizardSkillsList();
        }
      });
    }

    // Wizard Level Toggle Buttons
    document.querySelectorAll(".level-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".level-toggle-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.selectedLevel = Number(btn.dataset.lvl);
      });
    });

    // Wizard Resume Drop Zone & File Input
    const wizDropZone = document.getElementById("wizDropZone");
    const wizFileInput = document.getElementById("wizFileInput");
    const wizFileStatus = document.getElementById("wizFileUploadStatus");
    if (wizDropZone && wizFileInput) {
      wizDropZone.addEventListener("click", () => wizFileInput.click());
      wizFileInput.addEventListener("change", (e) => {
        if (e.target.files.length) handleWizardResumeFile(e.target.files[0], wizFileStatus);
      });
    }

    // Wizard Extract Text Button
    const wizExtractTextBtn = document.getElementById("wizExtractTextBtn");
    if (wizExtractTextBtn) {
      wizExtractTextBtn.addEventListener("click", () => {
        const txt = document.getElementById("wizResumeTextInput")?.value || "";
        if (!txt.trim()) { alert("Please paste resume text before extracting."); return; }
        const detected = extractResumeSkills(txt);
        showDetectedSkillsReview(detected);
      });
    }

    // Step 3
    const wizStep3Next = document.getElementById("wizStep3Next");
    const wizStep3Back = document.getElementById("wizStep3Back");
    if (wizStep3Next) wizStep3Next.addEventListener("click", () => showWizardStep(4));
    if (wizStep3Back) wizStep3Back.addEventListener("click", () => showWizardStep(2));

    // Step 4 (Finalize)
    const wizFinalizeBtn = document.getElementById("wizFinalizeBtn");
    const wizStep4Back = document.getElementById("wizStep4Back");
    if (wizFinalizeBtn) {
      wizFinalizeBtn.addEventListener("click", () => {
        state.profile = JSON.parse(JSON.stringify(state.wizardDraft));
        state.hasRealProfile = true;
        state.isDemoMode = false;
        saveRealProfile();
        showPage("dashboard");
      });
    }
    if (wizStep4Back) wizStep4Back.addEventListener("click", () => showWizardStep(3));

    // Skills Page Manual Add
    const skillsPageAddBtn = document.getElementById("skillsPageAddBtn");
    if (skillsPageAddBtn) {
      skillsPageAddBtn.addEventListener("click", () => {
        const s = document.getElementById("skillsPageSelect")?.value;
        if (s) {
          if (state.isDemoMode) {
            DEMO_PROFILE.skills[s] = state.selectedLevel;
          } else {
            state.profile.skills[s] = state.selectedLevel;
            saveRealProfile();
          }
          renderSkillsAndGaps();
        }
      });
    }

    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      const savedTheme = localStorage.getItem("skillbridge-theme") || "light";
      document.body.dataset.theme = savedTheme;
      themeToggle.setAttribute("aria-pressed", String(savedTheme === "dark"));

      themeToggle.addEventListener("click", () => {
        const next = document.body.dataset.theme === "dark" ? "light" : "dark";
        document.body.dataset.theme = next;
        localStorage.setItem("skillbridge-theme", next);
        themeToggle.setAttribute("aria-pressed", String(next === "dark"));
      });
    }

    // Settings Modal
    const settingsModalBtn = document.getElementById("settingsModalBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    if (settingsModalBtn && settingsModal) {
      settingsModalBtn.addEventListener("click", () => settingsModal.classList.add("active"));
      if (closeSettingsBtn) closeSettingsBtn.addEventListener("click", () => settingsModal.classList.remove("active"));
    }

    const modalEditProfileBtn = document.getElementById("modalEditProfileBtn");
    if (modalEditProfileBtn) {
      modalEditProfileBtn.addEventListener("click", () => {
        if (settingsModal) settingsModal.classList.remove("active");
        openProfileEditor();
      });
    }

    const modalMethodologyBtn = document.getElementById("modalMethodologyBtn");
    if (modalMethodologyBtn) {
      modalMethodologyBtn.addEventListener("click", () => {
        if (settingsModal) settingsModal.classList.remove("active");
        showPage("methodology");
      });
    }

    const clearStorageBtn = document.getElementById("clearStorageBtn");
    if (clearStorageBtn) {
      clearStorageBtn.addEventListener("click", () => {
        if (confirm("Reset all SkillBridge saved profile data to start clean?")) {
          localStorage.removeItem(REAL_PROFILE_KEY);
          location.reload();
        }
      });
    }

    // Reset Roadmap Checkboxes
    const resetRoadmapProgressBtn = document.getElementById("resetRoadmapProgressBtn");
    if (resetRoadmapProgressBtn) {
      resetRoadmapProgressBtn.addEventListener("click", () => {
        state.roadmapTasksCompleted = {};
        saveRealProfile();
        renderRoadmap();
      });
    }

    // News Filter & Search
    document.querySelectorAll("#newsCategoryFilter .filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("#newsCategoryFilter .filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.activeNewsCategory = chip.dataset.category;
        renderMarket();
      });
    });

    const newsSearchInput = document.getElementById("newsSearchInput");
    if (newsSearchInput) {
      newsSearchInput.addEventListener("input", (e) => {
        state.newsSearchQuery = e.target.value;
        renderMarket();
      });
    }

    // Jobs Subtabs
    document.querySelectorAll(".jobs-subnav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".jobs-subnav-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".jobs-view-section").forEach(s => s.classList.remove("active"));
        btn.classList.add("active");
        const subtab = btn.dataset.subtab;
        const targetSec = document.getElementById(`secJobs${subtab.charAt(0).toUpperCase() + subtab.slice(1)}`);
        if (targetSec) targetSec.classList.add("active");
      });
    });

    initHelpChat();
  }

  function handleWizardResumeFile(file, statusEl) {
    if (!file) return;
    if (statusEl) statusEl.textContent = `Analyzing ${file.name}...`;

    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result || "";
      const detected = extractResumeSkills(content);
      state.wizardDraft.resumeUploaded = true;
      state.wizardDraft.resumeFileName = file.name;
      showDetectedSkillsReview(detected);
      if (statusEl) statusEl.textContent = `✓ Successfully scanned ${file.name}`;
    };
    reader.onerror = function () {
      if (statusEl) statusEl.textContent = "Could not read file. Try pasting text instead.";
    };
    reader.readAsText(file);
  }

  function showDetectedSkillsReview(detected) {
    const box = document.getElementById("wizDetectedSkillsBox");
    const countEl = document.getElementById("wizDetectedCount");
    const chipsEl = document.getElementById("wizDetectedChips");

    const entries = Object.entries(detected);
    if (!entries.length) {
      alert("No matching technical skills detected from the text. Try adding skills manually.");
      return;
    }

    if (box && chipsEl) {
      box.style.display = "block";
      if (countEl) countEl.textContent = entries.length;

      chipsEl.innerHTML = entries.map(([sName]) => `
        <div class="skill-chip">
          <span>✓ ${sName}</span>
          <button class="skill-remove-btn" data-detected="${sName}" type="button">&times;</button>
        </div>
      `).join("");

      // Merge into wizard draft
      Object.assign(state.wizardDraft.skills, detected);
      renderWizardSkillsList();

      chipsEl.querySelectorAll(".skill-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const sName = btn.dataset.detected;
          delete state.wizardDraft.skills[sName];
          btn.closest(".skill-chip")?.remove();
          renderWizardSkillsList();
        });
      });
    }
  }

  function initHelpChat() {
    const trigger = document.getElementById("helpChatTrigger");
    const chatWindow = document.getElementById("helpChatWindow");
    const closeBtn = document.getElementById("helpChatClose");
    const form = document.getElementById("helpChatForm");
    const input = document.getElementById("helpChatInput");
    const messages = document.getElementById("helpChatMessages");

    if (trigger && chatWindow) {
      trigger.addEventListener("click", () => {
        chatWindow.hidden = !chatWindow.hidden;
        trigger.setAttribute("aria-expanded", String(!chatWindow.hidden));
        if (!chatWindow.hidden && input) input.focus();
      });
    }

    if (closeBtn && chatWindow) {
      closeBtn.addEventListener("click", () => {
        chatWindow.hidden = true;
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }

    document.querySelectorAll("[data-help-prompt]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleUserChatMessage(btn.dataset.helpPrompt, messages);
      });
    });

    if (form && input) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (msg) {
          handleUserChatMessage(msg, messages);
          input.value = "";
        }
      });
    }
  }

  function handleUserChatMessage(userText, container) {
    if (!container) return;

    const userBubble = document.createElement("div");
    userBubble.className = "help-chat-message user-message";
    userBubble.textContent = userText;
    container.appendChild(userBubble);

    const p = getActiveProfile();
    const activeRole = p.targetRole ? ROLES.find(r => r.title === p.targetRole) : (p.careerInterests && p.careerInterests[0] ? ROLES.find(r => r.title === p.careerInterests[0]) : null);
    const fitData = activeRole ? calculateRoleFit(activeRole, p.skills) : null;
    const topGap = fitData?.missingSkills[0];

    let reply = "";
    const lower = userText.toLowerCase();

    if (!activeRole) {
      reply = "Please choose a target career on your Dashboard so I can calculate your specific match score and next learning step.";
    } else if (lower.includes("score") || lower.includes("why")) {
      reply = `Your match score for ${activeRole.title} is ${fitData.fitScore}%. You have covered ${fitData.matchedSkills.length} of ${Object.keys(activeRole.skills).length} required skills.`;
    } else if (lower.includes("learn") || lower.includes("first") || lower.includes("gap")) {
      reply = topGap 
        ? `You should prioritize learning ${topGap.name}. It has a hiring weight of ${topGap.weight}/10 in ${activeRole.title} openings. Bridging it will raise your score to ${Math.min(100, fitData.fitScore + Math.round(topGap.weight * 2.2))}%.`
        : `You have covered all core requirements for ${activeRole.title}! Focus on building capstone portfolio projects.`;
    } else if (lower.includes("project")) {
      const proj = (PROJECT_IDEAS[activeRole.title] || PROJECT_IDEAS["Software Engineer"])[0];
      reply = `I recommend building "${proj.title}" using ${proj.stack}. It closes your gaps and gives you a strong GitHub showcase.`;
    } else if (lower.includes("job")) {
      reply = `Based on your ${fitData.fitScore}% fit score, check the Jobs & Tracker tab to view qualified openings matching your current skillset.`;
    } else {
      reply = `As an aspiring ${activeRole.title}, your biggest priority is closing your ${topGap ? topGap.name : "portfolio"} gap. Check your 4-week roadmap tab for step-by-step guidance!`;
    }

    setTimeout(() => {
      const guideBubble = document.createElement("div");
      guideBubble.className = "help-chat-message guide-message";
      guideBubble.textContent = reply;
      container.appendChild(guideBubble);
      container.scrollTop = container.scrollHeight;
    }, 300);
  }

  /* ==========================================================================
     8. APP BOOTSTRAP
     ========================================================================== */
  function init() {
    loadRealProfile();
    initEvents();

    if (state.hasRealProfile) {
      showPage("dashboard");
    } else {
      showPage("welcome");
    }
  }

  window.SkillBridgeApp = {
    showPage,
    startProfileWizard
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
