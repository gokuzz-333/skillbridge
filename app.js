/* ==========================================================================
   SKILLBRIDGE CORE LOGIC - UNIFIED CAREER INTELLIGENCE & ROADMAP ENGINE
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
    { title: "Data Analyst", sector: "Analytics", baseSalaryINR: "7-14 LPA", baseSalaryUSD: "$65k-$95k", skills: { "SQL": 9, "Excel": 6, "Power BI": 8, "Statistics": 6, "Data Visualization": 7, "Communication": 5, "Python": 5 } },
    { title: "Data Scientist", sector: "AI/ML", baseSalaryINR: "12-24 LPA", baseSalaryUSD: "$95k-$145k", skills: { "Python": 9, "Statistics": 8, "Machine Learning": 9, "SQL": 6, "Data Visualization": 5, "Deep Learning": 5 } },
    { title: "Machine Learning Engineer", sector: "AI/ML", baseSalaryINR: "15-30 LPA", baseSalaryUSD: "$120k-$175k", skills: { "Python": 9, "Machine Learning": 9, "Deep Learning": 8, "MLOps": 7, "AWS": 6, "Git": 5, "NLP": 5 } },
    { title: "AI Solutions / Prompt Engineer", sector: "AI/ML", baseSalaryINR: "14-28 LPA", baseSalaryUSD: "$110k-$165k", skills: { "Prompt Engineering": 9, "Generative AI Tooling": 9, "Python": 6, "Communication": 6, "NLP": 6 } },
    { title: "Full Stack Developer", sector: "Engineering", baseSalaryINR: "8-18 LPA", baseSalaryUSD: "$75k-$120k", skills: { "JavaScript": 9, "TypeScript": 7, "React": 8, "Node.js": 8, "SQL": 5, "Git": 6, "CI/CD": 4 } },
    { title: "DevOps / Platform Engineer", sector: "Engineering", baseSalaryINR: "10-22 LPA", baseSalaryUSD: "$90k-$140k", skills: { "Docker": 9, "Kubernetes": 8, "CI/CD": 9, "AWS": 7, "Git": 6, "Cloud Security": 5 } },
    { title: "Cloud Engineer", sector: "Engineering", baseSalaryINR: "9-20 LPA", baseSalaryUSD: "$85k-$130k", skills: { "AWS": 9, "Azure": 6, "GCP": 5, "Docker": 6, "Kubernetes": 7, "CI/CD": 6 } },
    { title: "Cybersecurity Analyst", sector: "Security", baseSalaryINR: "8-18 LPA", baseSalaryUSD: "$80k-$125k", skills: { "Cybersecurity Fundamentals": 9, "Ethical Hacking": 7, "Cloud Security": 7, "Communication": 4, "Python": 5 } },
    { title: "Product Manager", sector: "Product", baseSalaryINR: "14-28 LPA", baseSalaryUSD: "$105k-$160k", skills: { "Product Roadmapping": 9, "Stakeholder Management": 8, "A/B Testing": 6, "Agile/Scrum": 7, "Communication": 8, "Data Visualization": 4 } },
    { title: "UI/UX Designer", sector: "Design", baseSalaryINR: "7-16 LPA", baseSalaryUSD: "$70k-$110k", skills: { "UI Design": 9, "UX Research": 8, "Figma": 9, "Communication": 5 } },
    { title: "Business Analyst", sector: "Analytics", baseSalaryINR: "8-16 LPA", baseSalaryUSD: "$70k-$105k", skills: { "Business Analysis": 9, "SQL": 6, "Excel": 6, "Stakeholder Management": 7, "Communication": 7, "Power BI": 5 } },
    { title: "Digital Marketing Analyst", sector: "Marketing", baseSalaryINR: "6-12 LPA", baseSalaryUSD: "$55k-$85k", skills: { "SEO": 7, "Digital Ads": 8, "Content Strategy": 6, "Data Visualization": 5, "Communication": 6 } }
  ];

  /* Comprehensive Curated Courses mapped to all 12 roles */
  const CAREER_COURSES = {
    "Data Analyst": [
      { title: "Google Data Analytics Professional Certificate", provider: "Google / Coursera", level: "Beginner to Pro", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-data-analytics", desc: "Industry-standard certification covering SQL, Spreadsheets, Tableau, R/Python, and data cleaning." },
      { title: "Microsoft Power BI Data Analyst (PL-300 Exam Prep)", provider: "Microsoft Learn", level: "Intermediate", duration: "4-6 weeks", type: "cert", link: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/", desc: "Official Microsoft curriculum for modeling, DAX expressions, and enterprise reporting." },
      { title: "Complete SQL Bootcamp: Go from Zero to Hero", provider: "Udemy / Jose Portilla", level: "All Levels", duration: "3-4 weeks", type: "cert", link: "https://www.udemy.com/course/the-complete-sql-bootcamp/", desc: "Master PostgreSQL, complex joins, subqueries, window functions, and analytics queries." },
      { title: "Tableau Certified Data Analyst Specialization", provider: "Tableau / Coursera", level: "Intermediate", duration: "2 months", type: "cert", link: "https://www.tableau.com/learn/training", desc: "Interactive dashboard design, LOD calculations, storytelling, and visual analytics." },
      { title: "Statistics and Probability for Data Science", provider: "Khan Academy & edX", level: "Beginner", duration: "3-4 weeks", type: "free", link: "https://www.khanacademy.org/math/statistics-probability", desc: "Essential hypothesis testing, distributions, regression, and confidence intervals." },
      { title: "Data Analyst Roadmap & Project Portfolio Guide", provider: "Roadmap.sh", level: "All Levels", duration: "Self-paced", type: "free", link: "https://roadmap.sh/data-analyst", desc: "Step-by-step interactive milestones, real-world portfolio datasets, and interview prep." }
    ],
    "Data Scientist": [
      { title: "IBM Data Science Professional Certificate", provider: "IBM / Coursera", level: "Beginner to Adv", duration: "5-6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/ibm-data-science", desc: "10-course sequence covering Python, SQL, Applied Machine Learning, and Capstone." },
      { title: "Applied Data Science with Python Specialization", provider: "Univ. of Michigan / Coursera", level: "Intermediate", duration: "4 months", type: "cert", link: "https://www.coursera.org/specializations/data-science-python", desc: "Pandas, Matplotlib, Scikit-learn, Text Mining, and Network Analysis in Python." },
      { title: "Mathematics for Machine Learning and Data Science", provider: "DeepLearning.AI", level: "Intermediate", duration: "3 months", type: "cert", link: "https://www.deeplearning.ai/courses/mathematics-for-machine-learning-and-data-science-specialization/", desc: "Linear Algebra, Multivariate Calculus, PCA, and Probability for data modeling." },
      { title: "Kaggle Learn: Free Micro-Courses in Data Science", provider: "Kaggle", level: "Beginner to Adv", duration: "Self-paced", type: "free", link: "https://www.kaggle.com/learn", desc: "Hands-on coding exercises in Pandas, Feature Engineering, XGBoost, and Data Visualization." },
      { title: "Harvard CS109: Data Science Open Courseware", provider: "Harvard University", level: "Advanced", duration: "12 weeks", type: "free", link: "https://github.com/cs109/2015", desc: "Comprehensive academic syllabus covering statistical modeling, bayesian analysis, and web scraping." },
      { title: "Practical Deep Learning for Coders", provider: "Fast.ai", level: "Intermediate", duration: "8 weeks", type: "free", link: "https://course.fast.ai/", desc: "Top-down approach to neural networks, computer vision, tabular data, and NLP." }
    ],
    "Machine Learning Engineer": [
      { title: "Machine Learning Specialization", provider: "Andrew Ng / DeepLearning.AI", level: "Beginner to Int", duration: "3 months", type: "cert", link: "https://www.coursera.org/specializations/machine-learning-introduction", desc: "Supervised Learning, Neural Networks, Decision Trees, and Reinforcement Learning." },
      { title: "Deep Learning Specialization (5 Courses)", provider: "DeepLearning.AI", level: "Intermediate", duration: "4 months", type: "cert", link: "https://www.coursera.org/specializations/deep-learning", desc: "PyTorch/TensorFlow, CNNs, Transformers, Sequence Models, and Optimization." },
      { title: "Machine Learning Engineering for Production (MLOps)", provider: "DeepLearning.AI", level: "Advanced", duration: "3 months", type: "cert", link: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-specialization/", desc: "Data pipelines, model deployment, drift monitoring, feature stores, and CI/CD for ML." },
      { title: "Made With ML: Production MLOps Course", provider: "Goku Mohandas", level: "Intermediate to Adv", duration: "6 weeks", type: "free", link: "https://madewithml.com/", desc: "End-to-end framework: tracking with MLflow, Ray clustering, Docker deployment, and testing." },
      { title: "Hugging Face NLP & Transformers Course", provider: "Hugging Face", level: "Intermediate", duration: "4 weeks", type: "free", link: "https://huggingface.co/learn/nlp-course", desc: "Fine-tuning modern LLMs, tokenization, PEFT/LoRA, and deploying models to production." },
      { title: "AWS Certified Machine Learning - Specialty Prep", provider: "AWS Training", level: "Advanced", duration: "8 weeks", type: "cert", link: "https://aws.amazon.com/certification/certified-machine-learning-specialty/", desc: "SageMaker pipelines, distributed training, feature stores, and cloud ML architecture." }
    ],
    "AI Solutions / Prompt Engineer": [
      { title: "Generative AI with Large Language Models", provider: "AWS & DeepLearning.AI", level: "Intermediate", duration: "4-6 weeks", type: "cert", link: "https://www.coursera.org/learn/generative-ai-with-llms", desc: "Transformer architecture, RLHF, fine-tuning, RAG, and LLM application lifecycles." },
      { title: "LangChain & LlamaIndex for Production LLM Apps", provider: "DeepLearning.AI Short Courses", level: "Intermediate", duration: "2-3 weeks", type: "free", link: "https://www.deeplearning.ai/short-courses/", desc: "Building deterministic agents, Vector store retrieval, memory chains, and function calling." },
      { title: "ChatGPT Prompt Engineering for Developers", provider: "OpenAI & DeepLearning.AI", level: "Beginner", duration: "1 week", type: "free", link: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", desc: "Structuring clear instructions, delimiters, few-shot prompting, and chain-of-thought." },
      { title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)", provider: "Microsoft Learn", level: "Advanced", duration: "6 weeks", type: "cert", link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/", desc: "Azure OpenAI Service, Cognitive Search, Bot Framework, and Enterprise GenAI security." },
      { title: "Prompt Engineering Guide & Research Papers", provider: "DAIR.AI", level: "All Levels", duration: "Self-paced", type: "free", link: "https://www.promptingguide.ai/", desc: "Comprehensive repository of state-of-the-art prompting techniques and benchmark evals." },
      { title: "Full Stack LLM BootCamp & Agent Architectures", provider: "Berkeley AI / FSL", level: "Intermediate to Adv", duration: "4 weeks", type: "free", link: "https://fullstackdeeplearning.com/llm-bootcamp/", desc: "Designing multi-agent systems, evals, vector caching, and production monitoring." }
    ],
    "Full Stack Developer": [
      { title: "Meta Front-End & Back-End Developer Certificates", provider: "Meta / Coursera", level: "Beginner to Adv", duration: "6-8 months", type: "cert", link: "https://www.coursera.org/professional-certificates/meta-front-end-developer", desc: "React, JavaScript/TypeScript, Django, NodeJS, REST APIs, Databases, and Version Control." },
      { title: "Full Stack Open: Modern Web Development", provider: "University of Helsinki", level: "Intermediate", duration: "8-12 weeks", type: "free", link: "https://fullstackopen.com/en/", desc: "Deep dive into React, Redux, Node.js, Express, MongoDB, GraphQL, TypeScript, and CI/CD." },
      { title: "Harvard CS50's Web Programming with Python & JS", provider: "Harvard University / edX", level: "Intermediate", duration: "12 weeks", type: "free", link: "https://cs50.harvard.edu/web/", desc: "Django, SQL, JavaScript, React, APIs, scalability, security, and continuous integration." },
      { title: "Next.js 15 & React Server Components Course", provider: "Next.js Learn / Vercel", level: "Intermediate", duration: "3 weeks", type: "free", link: "https://nextjs.org/learn", desc: "App Router, SSR, Streaming, Server Actions, Database integration, and Vercel edge deployment." },
      { title: "The Complete 2026 Web Development Bootcamp", provider: "Udemy / Angela Yu", level: "Beginner to Int", duration: "8-10 weeks", type: "cert", link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/", desc: "HTML, CSS, JavaScript, Node, React, PostgreSQL, Authentication, and Web3 basics." },
      { title: "The Odin Project: Full Stack JavaScript Curriculum", provider: "The Odin Project", level: "All Levels", duration: "Self-paced", type: "free", link: "https://www.theodinproject.com/", desc: "Hands-on project-driven curriculum for mastering modern full-stack web software." }
    ],
    "DevOps / Platform Engineer": [
      { title: "Certified Kubernetes Administrator (CKA) Complete Course", provider: "Linux Foundation / Udemy", level: "Intermediate to Adv", duration: "6-8 weeks", type: "cert", link: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/", desc: "Cluster architecture, pod networking, storage, troubleshooting, and security policies." },
      { title: "Docker & Kubernetes: The Practical Guide", provider: "Academind / Udemy", level: "Beginner to Int", duration: "4-6 weeks", type: "cert", link: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/", desc: "Multi-container architectures, volume mounts, Swarm, Kubernetes services, and Ingress." },
      { title: "HashiCorp Certified: Terraform Associate Bootcamp", provider: "HashiCorp Learn", level: "Intermediate", duration: "3-4 weeks", type: "cert", link: "https://developer.hashicorp.com/terraform/tutorials/certification", desc: "Infrastructure as Code (IaC), state management, modules, and multi-cloud provisioning." },
      { title: "GitHub Actions: Automated CI/CD Pipelines Guide", provider: "GitHub Learning", level: "Beginner to Int", duration: "2 weeks", type: "free", link: "https://docs.github.com/en/actions", desc: "Workflow files, secret management, automated testing, matrix builds, and artifact release." },
      { title: "DevOps & Platform Engineering Roadmap", provider: "Roadmap.sh", level: "All Levels", duration: "Self-paced", type: "free", link: "https://roadmap.sh/devops", desc: "Complete visual guide: Linux internals, networking, observability, Prometheus, and Grafana." },
      { title: "AWS Certified DevOps Engineer - Professional", provider: "AWS Training", level: "Advanced", duration: "8 weeks", type: "cert", link: "https://aws.amazon.com/certification/certified-devops-engineer-professional/", desc: "CloudFormation, CodePipeline, Auto-scaling, automated disaster recovery, and IAM governance." }
    ],
    "Cloud Engineer": [
      { title: "AWS Certified Solutions Architect - Associate (SAA-C03)", provider: "AWS / Stephane Maarek", level: "Intermediate", duration: "6-8 weeks", type: "cert", link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", desc: "High-availability architecture, VPC networking, EC2, S3, IAM, Serverless, and cost optimization." },
      { title: "Google Cloud Associate Cloud Engineer Certification", provider: "Google Cloud Training", level: "Intermediate", duration: "6 weeks", type: "cert", link: "https://cloud.google.com/learn/certification/associate-cloud-engineer", desc: "GCP Console, Cloud SDK, Compute Engine, GKE, Cloud Run, and IAM perimeter control." },
      { title: "Microsoft Certified: Azure Administrator Associate (AZ-104)", provider: "Microsoft Learn", level: "Intermediate", duration: "5-7 weeks", type: "cert", link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/", desc: "Azure identities, virtual networks, storage configurations, and VM resource monitoring." },
      { title: "Cloud Computing Specialization", provider: "Univ. of Illinois / Coursera", level: "Intermediate to Adv", duration: "4 months", type: "cert", link: "https://www.coursera.org/specializations/cloud-computing", desc: "Distributed systems, map-reduce, cloud storage topologies, and virtualization primitives." },
      { title: "Multi-Cloud Architect Roadmap & Free Labs", provider: "Cloud Native Computing Foundation", level: "All Levels", duration: "Self-paced", type: "free", link: "https://www.cncf.io/training/", desc: "Cloud native ecosystem, microservices topologies, Envoy, and service meshes." },
      { title: "Free AWS Hands-On Cloud Practitioner Lab Series", provider: "AWS Skill Builder", level: "Beginner", duration: "2-3 weeks", type: "free", link: "https://skillbuilder.aws/", desc: "Interactive sandbox environments for cloud security, serverless Lambda, and database provisioning." }
    ],
    "Cybersecurity Analyst": [
      { title: "Google Cybersecurity Professional Certificate", provider: "Google / Coursera", level: "Beginner to Int", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-cybersecurity", desc: "SIEM tools (Splunk, Chronicle), Linux, SQL, Python for security automation, and incident response." },
      { title: "CompTIA Security+ (SY0-701) Complete Prep", provider: "Professor Messer / CompTIA", level: "Intermediate", duration: "6-8 weeks", type: "free", link: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-training/", desc: "Threats, attacks, vulnerabilities, cryptography, identity management, and compliance." },
      { title: "TryHackMe: Complete Cyber Defense & SOC Level 1", provider: "TryHackMe", level: "Intermediate", duration: "8 weeks", type: "cert", link: "https://tryhackme.com/path/outline/soclevel1", desc: "Hands-on labs: WireShark packet analysis, Snort IDS, endpoint detection, and memory forensics." },
      { title: "Certified Cloud Security Professional (CCSP)", provider: "ISC2 / Coursera", level: "Advanced", duration: "8 weeks", type: "cert", link: "https://www.isc2.org/certifications/ccsp", desc: "Cloud data security, application security, infrastructure operations, and legal/compliance." },
      { title: "Hack The Box: Certified Defensive Security Analyst (CDSA)", provider: "Hack The Box Academy", level: "Intermediate to Adv", duration: "10 weeks", type: "cert", link: "https://academy.hackthebox.com/", desc: "Live attack emulation, threat hunting, incident triage, and malware analysis." },
      { title: "SANS Cyber Aces Online Free Cyber Course", provider: "SANS Institute", level: "Beginner", duration: "Self-paced", type: "free", link: "https://www.cyberaces.org/", desc: "Core concepts of operating systems, networking fundamentals, and system administration." }
    ],
    "Product Manager": [
      { title: "Google Project Management Professional Certificate", provider: "Google / Coursera", level: "Beginner to Int", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-project-management", desc: "Agile, Scrum, sprint planning, risk management, stakeholder communication, and documentation." },
      { title: "Become a Product Manager: Learn the Skills & Get the Job", provider: "Udemy / Cole Mercer", level: "Beginner to Int", duration: "4-6 weeks", type: "cert", link: "https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/", desc: "Customer development, wireframing, metrics (AARRR), prioritization matrices, and MVPs." },
      { title: "Agile with Atlassian Jira Specialization", provider: "Atlassian / Coursera", level: "Intermediate", duration: "4 weeks", type: "cert", link: "https://www.coursera.org/specializations/agile-atlassian-jira", desc: "Backlog grooming, user stories, velocity metrics, kanban boards, and release planning." },
      { title: "Pragmatic Institute Certified Product Master", provider: "Pragmatic Institute", level: "Advanced", duration: "6 weeks", type: "cert", link: "https://www.pragmaticinstitute.com/product/", desc: "Market problem identification, buyer persona definition, pricing strategy, and positioning." },
      { title: "The Product Management Handbook & Roadmap Guide", provider: "ProductPlan Library", level: "All Levels", duration: "Self-paced", type: "free", link: "https://www.productplan.com/learn/", desc: "Frameworks: RICE scoring, Kano model, product-led growth (PLG), and stakeholder buy-in." },
      { title: "A/B Testing & Product Experimentation Mastery", provider: "CXL Institute", level: "Intermediate", duration: "4 weeks", type: "free", link: "https://cxl.com/blog/ab-testing-guide/", desc: "Statistical significance, sample sizing, hypothesis generation, and conversion optimization." }
    ],
    "UI/UX Designer": [
      { title: "Google UX Design Professional Certificate", provider: "Google / Coursera", level: "Beginner to Pro", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-ux-design", desc: "User research, wireframing, low/high-fidelity prototyping in Figma, and usability audits." },
      { title: "Refactoring UI: Practical UI Design Framework", provider: "Adam Wathan & Steve Schoger", level: "Intermediate to Adv", duration: "3 weeks", type: "cert", link: "https://refactoringui.com/", desc: "Visual hierarchy, typography scales, intentional spacing, color theory, and UI polish." },
      { title: "Figma UI/UX Design Essentials Course", provider: "Udemy / Daniel Walter Scott", level: "Beginner to Int", duration: "4 weeks", type: "cert", link: "https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/", desc: "Auto-layout, design tokens, component variants, interactive prototyping, and handoff." },
      { title: "Interaction Design Foundation: User Research Methods", provider: "IxDF", level: "Intermediate", duration: "6 weeks", type: "cert", link: "https://www.interaction-design.org/", desc: "Qualitative user interviews, card sorting, heuristic evaluation, and accessibility (a11y)." },
      { title: "Nielsen Norman Group UX Articles & Study Reports", provider: "NN/g", level: "All Levels", duration: "Self-paced", type: "free", link: "https://www.nngroup.com/articles/", desc: "The gold standard in usability heuristics, eye-tracking research, and navigation architecture." },
      { title: "Daily UI 100-Day Challenge & Open Critiques", provider: "DailyUI", level: "All Levels", duration: "100 days", type: "free", link: "https://www.dailyui.co/", desc: "Accelerate visual design instincts through daily micro-project prompts and design reviews." }
    ],
    "Business Analyst": [
      { title: "IBM Business Data Analyst Specialization", provider: "IBM / Coursera", level: "Beginner to Int", duration: "3-4 months", type: "cert", link: "https://www.coursera.org/specializations/ibm-business-data-analyst", desc: "Business metrics, SQL queries, Excel financial modeling, Cognos analytics, and dashboards." },
      { title: "Certified Business Analysis Professional (CBAP) Training", provider: "IIBA / Coursera", level: "Intermediate to Adv", duration: "6-8 weeks", type: "cert", link: "https://www.iiba.org/business-analysis-certifications/cbap/", desc: "BABOK guide domains: requirements elicitation, enterprise analysis, and solution evaluation." },
      { title: "Business Analytics with Excel and Power BI", provider: "Macquarie University / Coursera", level: "Intermediate", duration: "4 months", type: "cert", link: "https://www.coursera.org/specializations/excel-power-bi-data-analytics", desc: "Scenario analysis, pivot modeling, dashboard automation, and predictive business forecasts." },
      { title: "Agile Business Analysis & Requirements Gathering", provider: "Univ. of Maryland / edX", level: "Intermediate", duration: "4 weeks", type: "free", link: "https://www.edx.org/", desc: "Translating business stakeholder visions into executable engineering user stories and epics." },
      { title: "SQL for Business Decision Makers", provider: "Mode Analytics Free Tutorials", level: "Beginner to Int", duration: "3 weeks", type: "free", link: "https://mode.com/sql-tutorial/", desc: "Cohort retention analysis, funnel analysis, revenue metrics, and automated reporting." },
      { title: "Stakeholder Management & Process Mapping Guide", provider: "MindTools Corporate", level: "All Levels", duration: "Self-paced", type: "free", link: "https://www.mindtools.com/pages/article/newPPM_07.htm", desc: "BPMN 2.0 process flow diagrams, RACI matrices, change management, and executive alignment." }
    ],
    "Digital Marketing Analyst": [
      { title: "Google Digital Marketing & E-commerce Certificate", provider: "Google / Coursera", level: "Beginner to Int", duration: "6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce", desc: "SEO, SEM, Google Ads, Email marketing, GA4, Shopify store analytics, and CRM automation." },
      { title: "Google Analytics 4 (GA4) Certification", provider: "Google Skillshop", level: "Intermediate", duration: "2-3 weeks", type: "free", link: "https://skillshop.withgoogle.com/", desc: "Official Google certification for event-based tracking, custom exploration funnels, and attribution." },
      { title: "Meta Certified Digital Marketing Associate", provider: "Meta Blueprint / Coursera", level: "Beginner to Int", duration: "4 weeks", type: "cert", link: "https://www.coursera.org/professional-certificates/meta-social-media-marketing", desc: "Facebook/Instagram ad manager, campaign budgeting, audience lookalikes, and pixel integration." },
      { title: "HubSpot Inbound & Content Marketing Certification", provider: "HubSpot Academy", level: "Beginner", duration: "2 weeks", type: "free", link: "https://academy.hubspot.com/", desc: "Organic lead generation, content funnels, conversion copy, and marketing automation." },
      { title: "Advanced SEO Strategy & Technical Auditing", provider: "Moz Academy", level: "Intermediate", duration: "4 weeks", type: "cert", link: "https://moz.com/beginners-guide-to-seo", desc: "Core Web Vitals, schema markup, backlink analysis, crawlability, and keyword search intent." },
      { title: "CXL Conversion Rate Optimization (CRO) Guide", provider: "CXL Institute", level: "Advanced", duration: "4 weeks", type: "free", link: "https://cxl.com/blog/cro-quick-guide/", desc: "Quantitative analytics, user session recording analysis, heuristic reviews, and growth testing." }
    ]
  };

  /* Market Intelligence & Layoffs Registry with High-Resolution Curated Tech Imagery */
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
    },
    {
      id: "news-7",
      category: "hiring",
      impact: "hiring",
      impactLabel: "🏢 Startup Hiring Spikes",
      title: "AI & DeepTech Startups Accelerate Hiring for Full-Stack TypeScript Developers",
      source: "Inc42 / Tech in Asia",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      summary: "Early-stage and Series A startups are actively hiring versatile developers skilled in Next.js, FastAPI, and Docker who can rapidly iterate on production-grade web applications.",
      takeaway: "A well-crafted GitHub portfolio demonstrating a full-stack deployed application is often more influential than formal degrees for fast-moving startups.",
      link: "https://inc42.com/"
    },
    {
      id: "news-8",
      category: "salary",
      impact: "salary",
      impactLabel: "📈 Remote & Hybrid Shift",
      title: "Hybrid Work Settles at 2-Day In-Office; Tier-2 Talent Hubs Flourish",
      source: "Forbes Technology",
      date: "August 2026",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      summary: "While 65% of large tech employers have standardized on 2-day hybrid schedules, remote-first hiring remains robust for high-demand senior engineers across India and global timezones.",
      takeaway: "Async communication and strong Git collaboration skills remain critical differentiators for distributed engineering teams.",
      link: "https://www.forbes.com/"
    }
  ];

  /* Student Personas for Instant 1-Click Demo Profiles */
  const PERSONAS = {
    data_analyst: {
      name: "Priya Sharma (Data Analyst Aspirant)",
      skills: { "Python": 90, "SQL": 90, "Excel": 80, "Statistics": 70, "Data Visualization": 80, "Communication": 80, "Git": 60 },
      targetRole: "Data Analyst"
    },
    ai_aspirant: {
      name: "Aarav Patel (AI / GenAI Aspirant)",
      skills: { "Python": 90, "Generative AI Tooling": 80, "Prompt Engineering": 85, "SQL": 60, "Machine Learning": 70, "Git": 60 },
      targetRole: "AI Solutions / Prompt Engineer"
    },
    fullstack_dev: {
      name: "Rohan Verma (Fullstack Developer)",
      skills: { "JavaScript": 90, "TypeScript": 80, "React": 90, "Next.js": 75, "Node.js": 80, "SQL": 60, "Git": 80, "Docker": 60 },
      targetRole: "Full Stack Developer"
    },
    devops_cloud: {
      name: "Ananya Iyer (Cloud & DevOps Aspirant)",
      skills: { "AWS": 90, "Docker": 90, "Kubernetes": 80, "CI/CD": 85, "Cloud Security": 70, "Git": 80, "Python": 50 },
      targetRole: "DevOps / Platform Engineer"
    },
    cyber_sec: {
      name: "Karthik Nair (Cybersecurity Aspirant)",
      skills: { "Cybersecurity Fundamentals": 90, "Cloud Security": 80, "Ethical Hacking": 70, "Python": 60, "Communication": 70 },
      targetRole: "Cybersecurity Analyst"
    }
  };

  /* Project Recommendations Mapped to Skill Gaps */
  const PROJECT_IDEAS = {
    "Data Analyst": [
      {
        title: "Executive E-Commerce Sales & Profit Dashboard",
        closesGaps: ["Power BI", "SQL", "Data Visualization"],
        stack: "Power BI, PostgreSQL, DAX Expressions",
        difficulty: "Intermediate",
        timeEst: "4-6 days",
        desc: "Design an interactive, cross-filtering KPI dashboard analyzing customer retention, product margins, and cohort seasonality.",
        portfolioOutcome: "Includes a shareable Power BI interactive web report and documented SQL ETL scripts on GitHub."
      },
      {
        title: "Customer Churn & Retention Analytics Pipeline",
        closesGaps: ["Statistics", "Python", "Tableau"],
        stack: "Python (Pandas, Seaborn), Tableau, Kaggle Telco Dataset",
        difficulty: "Intermediate",
        timeEst: "5-7 days",
        desc: "Perform statistical hypothesis testing and feature correlation to diagnose customer churn drivers for a SaaS provider.",
        portfolioOutcome: "Live Tableau Public story and clean Jupyter Notebook with executive takeaways."
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
      },
      {
        title: "Medical Image Classification with PyTorch CNNs",
        closesGaps: ["Deep Learning", "Python"],
        stack: "PyTorch, Torchvision, Transfer Learning (ResNet-50)",
        difficulty: "Advanced",
        timeEst: "2 weeks",
        desc: "Fine-tune deep convolutional networks to detect anomalies from chest X-ray scans with Grad-CAM heatmaps for explainability.",
        portfolioOutcome: "Production-ready weights and HuggingFace Spaces web demonstration."
      }
    ],
    "Full Stack Developer": [
      {
        title: "Real-Time Collaborative Markdown & Task SaaS",
        closesGaps: ["Next.js", "TypeScript", "React", "Node.js"],
        stack: "Next.js 15, TypeScript, TailwindCSS, Supabase / PostgreSQL",
        difficulty: "Intermediate",
        timeEst: "1-2 weeks",
        desc: "Full-stack web application featuring OAuth authentication, Server Actions, optimistic UI updates, and real-time multiplayer editing.",
        portfolioOutcome: "Deployed live on Vercel with automated GitHub CI/CD testing."
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
    "Cybersecurity Analyst": [
      {
        title: "Automated Incident Response & SIEM Log Analyzer",
        closesGaps: ["Cybersecurity Fundamentals", "Python", "Cloud Security"],
        stack: "Python, Splunk / Elastic, Syslog parser, AWS CloudTrail",
        difficulty: "Intermediate",
        timeEst: "1-2 weeks",
        desc: "Develop automated scripts to ingest AWS IAM security logs, detect brute-force patterns, and trigger automated quarantine alerts.",
        portfolioOutcome: "Open-source GitHub security tool with sample pcap and log triage workflows."
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

  const STORAGE_KEY = "skillbridge_unified_v4";

  /* ==========================================================================
     2. APP STATE (PERSISTENT & REACTIVE)
     ========================================================================== */
  const state = {
    profile: {
      name: "Priya Sharma",
      skills: { "Python": 90, "SQL": 90, "Excel": 80, "Statistics": 70, "Data Visualization": 80, "Communication": 80, "Git": 60 }
    },
    activePage: "landing",
    selectedTargetRole: "Data Analyst",
    selectedLevel: 60,
    salaryExp: "mid",
    salaryGeo: "in",
    activeCourseFilter: "all",
    activeNewsCategory: "all",
    newsSearchQuery: "",
    jobSubTab: "qualified",
    roadmapTasksCompleted: {
      "task-1": true,
      "task-2": true
    },
    trackedApplications: [
      { id: "app-1", title: "Junior Data Analyst", company: "Zomato India", location: "Gurugram / Remote", match: 82, status: "Applied", date: "Aug 2026", notes: "Submitted resume with Power BI dashboard portfolio link." },
      { id: "app-2", title: "Business Intelligence Intern", company: "Swiggy", location: "Bengaluru", match: 78, status: "Interview", date: "Aug 2026", notes: "First round technical SQL interview scheduled for Thursday." },
      { id: "app-3", title: "Associate Product Analyst", company: "Razorpay", location: "Bengaluru", match: 74, status: "Saved", date: "Aug 2026", notes: "Need to review DAX functions before applying." }
    ],
    whatIfSimAdjustments: {},
    rawResumeText: ""
  };

  /* Local Storage State Engine */
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          if (parsed.profile && parsed.profile.skills) state.profile = parsed.profile;
          if (parsed.selectedTargetRole) state.selectedTargetRole = parsed.selectedTargetRole;
          if (parsed.activePage) state.activePage = parsed.activePage;
          if (parsed.roadmapTasksCompleted) state.roadmapTasksCompleted = parsed.roadmapTasksCompleted;
          if (parsed.trackedApplications) state.trackedApplications = parsed.trackedApplications;
          if (parsed.salaryExp) state.salaryExp = parsed.salaryExp;
          if (parsed.salaryGeo) state.salaryGeo = parsed.salaryGeo;
        }
      }
    } catch (e) {
      console.warn("Storage load error", e);
    }
  }

  /* ==========================================================================
     3. MATCHING & FIT ALGORITHM (TRANSPARENT & EXPLAINABLE)
     ========================================================================== */
  function calculateRoleFit(role, userSkills, simAdjustments = {}) {
    let totalWeight = 0;
    let earnedPoints = 0;
    const missingSkills = [];
    const matchedSkills = [];

    const roleReqs = role.skills || {};
    for (const [skillName, weight] of Object.entries(roleReqs)) {
      totalWeight += weight;
      const userLevel = (userSkills[skillName] !== undefined ? userSkills[skillName] : 0);
      const simBoost = (simAdjustments[skillName] || 0);
      const effectiveLevel = Math.min(100, userLevel + simBoost);

      if (effectiveLevel > 0) {
        earnedPoints += (effectiveLevel / 100) * weight;
        matchedSkills.push({ name: skillName, weight, level: effectiveLevel });
      } else {
        missingSkills.push({ name: skillName, weight });
      }
    }

    let corePct = totalWeight > 0 ? (earnedPoints / totalWeight) * 100 : 0;
    
    // Emerging skills velocity bonus (+5 to +10 pts max)
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

  function getRankedRoleMatches() {
    return ROLES.map(role => calculateRoleFit(role, state.profile.skills, state.whatIfSimAdjustments))
                .sort((a, b) => b.fitScore - a.fitScore);
  }

  /* ==========================================================================
     4. NAVIGATION & VIEW ROUTING ENGINE
     ========================================================================== */
  function showPage(pageId) {
    state.activePage = pageId;
    saveState();

    // Update Desktop Nav Tabs
    document.querySelectorAll(".main-nav .nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.page === pageId);
    });

    // Update Mobile Nav Items
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.page === pageId);
    });

    // Update View Containers
    document.querySelectorAll(".view-page").forEach(page => {
      page.classList.toggle("active", page.id === `view-${pageId}`);
    });

    // Refresh view-specific content
    if (pageId === "dashboard") renderDashboard();
    if (pageId === "career-match") renderCareerMatch();
    if (pageId === "skills-gaps") renderSkillsAndGaps();
    if (pageId === "roadmap") renderRoadmapAndProjects();
    if (pageId === "jobs") renderJobsAndTracker();
    if (pageId === "market") renderMarketIntelligence();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ==========================================================================
     5. RENDER FUNCTIONS FOR ALL VIEWS
     ========================================================================== */

  /* View 2: Dashboard */
  function renderDashboard() {
    const activeRole = ROLES.find(r => r.title === state.selectedTargetRole) || ROLES[0];
    const fitData = calculateRoleFit(activeRole, state.profile.skills);
    
    // Greeting
    const dashName = state.profile.name || "Candidate";
    const greetingEl = document.getElementById("dashGreetingName");
    if (greetingEl) greetingEl.textContent = `Hi, ${dashName} 👋`;

    const activeRoleBadge = document.getElementById("dashActiveRoleBadge");
    if (activeRoleBadge) activeRoleBadge.textContent = `Target: ${activeRole.title}`;

    // Readiness Gauge
    const readinessScoreEl = document.getElementById("dashReadinessScore");
    if (readinessScoreEl) readinessScoreEl.textContent = `${fitData.fitScore}%`;

    const readinessBarEl = document.getElementById("dashReadinessBar");
    if (readinessBarEl) {
      readinessBarEl.style.width = `${fitData.fitScore}%`;
      readinessBarEl.style.background = fitData.fitScore >= 75 ? "var(--accent-emerald)" : fitData.fitScore >= 50 ? "var(--accent-gold)" : "var(--accent-rose)";
    }

    const readinessSub = document.getElementById("dashReadinessSub");
    if (readinessSub) {
      readinessSub.textContent = fitData.fitScore >= 75 
        ? `Strong candidate profile for ${activeRole.title}` 
        : fitData.fitScore >= 50 
          ? `Solid foundation — close ${fitData.missingSkills.length} key gaps to qualify` 
          : `Emerging candidate — follow your 4-week roadmap to build readiness`;
    }

    // Skills Count
    const skillsCount = Object.keys(state.profile.skills).length;
    const skillsCountEl = document.getElementById("dashSkillsCount");
    if (skillsCountEl) skillsCountEl.textContent = skillsCount;

    const skillsPreviewEl = document.getElementById("dashSkillsListPreview");
    if (skillsPreviewEl) {
      const topSkills = Object.keys(state.profile.skills).slice(0, 4).join(", ");
      skillsPreviewEl.textContent = topSkills ? `${topSkills}...` : "No skills logged yet";
    }

    // Gaps Count & Top Gap
    const gapsCountEl = document.getElementById("dashGapsCount");
    if (gapsCountEl) gapsCountEl.textContent = fitData.missingSkills.length;

    const topGap = fitData.missingSkills[0];
    const topGapEl = document.getElementById("dashTopGapText");
    if (topGapEl) {
      topGapEl.textContent = topGap ? `Biggest Gap: ${topGap.name}` : "All core skills covered!";
    }

    // Roadmap Progress
    const totalTasks = 8;
    const completedTasks = Object.values(state.roadmapTasksCompleted).filter(Boolean).length;
    const roadmapProgressText = document.getElementById("dashRoadmapProgressText");
    if (roadmapProgressText) roadmapProgressText.textContent = `${completedTasks} / ${totalTasks}`;

    // Matching Jobs Count
    const jobsCountEl = document.getElementById("dashJobsCount");
    if (jobsCountEl) {
      jobsCountEl.textContent = fitData.fitScore >= 70 ? "18+ live" : "9+ live";
    }

    // Priority Next Step Banner
    const priorityActionTitle = document.getElementById("dashPriorityActionTitle");
    const priorityActionDesc = document.getElementById("dashPriorityActionDesc");
    const priorityActionBtn = document.getElementById("dashPriorityActionBtn");

    if (topGap) {
      const gapSkillObj = SKILLS.find(s => s.name === topGap.name);
      const demandPct = gapSkillObj ? gapSkillObj.demand : 80;
      if (priorityActionTitle) priorityActionTitle.textContent = `Close your #1 Skill Gap: Learn ${topGap.name}`;
      if (priorityActionDesc) {
        priorityActionDesc.innerHTML = `<strong>${topGap.name}</strong> is required in <strong>${demandPct}%</strong> of ${activeRole.title} openings. Bridging this gap will raise your match score by <strong>+${Math.round(topGap.weight * 2.2)}%</strong> and qualify you for top-tier hiring rounds.`;
      }
      if (priorityActionBtn) {
        priorityActionBtn.textContent = `Start ${topGap.name} Learning Plan →`;
        priorityActionBtn.onclick = () => {
          showPage("roadmap");
        };
      }
    } else {
      if (priorityActionTitle) priorityActionTitle.textContent = `Ready to Apply for ${activeRole.title} Openings!`;
      if (priorityActionDesc) {
        priorityActionDesc.innerHTML = `You have covered all core requirements for <strong>${activeRole.title}</strong>. Launch your applications and track hiring rounds in the Jobs tracker.`;
      }
      if (priorityActionBtn) {
        priorityActionBtn.textContent = "Browse Openings →";
        priorityActionBtn.onclick = () => showPage("jobs");
      }
    }

    // Role Quick Switcher Selector & Chips
    const roleSelect = document.getElementById("dashRoleSelect");
    if (roleSelect) {
      roleSelect.innerHTML = ROLES.map(r => `<option value="${r.title}" ${r.title === state.selectedTargetRole ? "selected" : ""}>${r.title} (${r.sector})</option>`).join("");
      roleSelect.onchange = (e) => {
        state.selectedTargetRole = e.target.value;
        saveState();
        renderDashboard();
      };
    }

    const roleChipsContainer = document.getElementById("dashRoleChips");
    if (roleChipsContainer) {
      roleChipsContainer.innerHTML = ROLES.map(r => `
        <button class="career-role-chip ${r.title === state.selectedTargetRole ? "active" : ""}" data-role="${r.title}" type="button">
          ${r.title}
        </button>
      `).join("");

      roleChipsContainer.querySelectorAll(".career-role-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          state.selectedTargetRole = chip.dataset.role;
          saveState();
          renderDashboard();
        });
      });
    }
  }

  /* View 3: Career Match & Comparison */
  function renderCareerMatch() {
    const activeRole = ROLES.find(r => r.title === state.selectedTargetRole) || ROLES[0];
    const fitData = calculateRoleFit(activeRole, state.profile.skills, state.whatIfSimAdjustments);

    // Hero Match Card
    const matchHeroTitle = document.getElementById("matchHeroTitle");
    if (matchHeroTitle) matchHeroTitle.textContent = activeRole.title;

    const matchHeroSector = document.getElementById("matchHeroSector");
    if (matchHeroSector) matchHeroSector.textContent = `${activeRole.sector} Sector • India Avg: ${activeRole.baseSalaryINR} • Global: ${activeRole.baseSalaryUSD}`;

    const matchHeroPct = document.getElementById("matchHeroPct");
    if (matchHeroPct) matchHeroPct.textContent = `${fitData.fitScore}%`;

    const matchFormulaCorePct = document.getElementById("matchFormulaCorePct");
    if (matchFormulaCorePct) matchFormulaCorePct.textContent = `${fitData.corePct}%`;

    const matchFormulaEmergingBonus = document.getElementById("matchFormulaEmergingBonus");
    if (matchFormulaEmergingBonus) matchFormulaEmergingBonus.textContent = `+${fitData.emergingBonus} pts`;

    const matchFormulaFinal = document.getElementById("matchFormulaFinal");
    if (matchFormulaFinal) matchFormulaFinal.textContent = `${fitData.fitScore} / 100`;

    // Have vs Missing Pills
    const matchHavePills = document.getElementById("matchHavePills");
    if (matchHavePills) {
      matchHavePills.innerHTML = fitData.matchedSkills.length
        ? fitData.matchedSkills.map(s => `<span class="badge badge-cert">✓ ${s.name} (${s.level}%)</span>`).join(" ")
        : `<span style="font-size:12px; color:var(--text-muted);">None detected yet</span>`;
    }

    const matchMissPills = document.getElementById("matchMissPills");
    if (matchMissPills) {
      matchMissPills.innerHTML = fitData.missingSkills.length
        ? fitData.missingSkills.map(s => `<span class="badge" style="color:var(--accent-rose); border-color:rgba(244,63,94,0.3);">⚠️ ${s.name} (Wt: ${s.weight}/10)</span>`).join(" ")
        : `<span class="badge badge-free">✓ All requirements met!</span>`;
    }

    // Callout
    const topGap = fitData.missingSkills[0];
    const calloutEl = document.getElementById("matchBiggestGapCallout");
    if (calloutEl) {
      if (topGap) {
        calloutEl.innerHTML = `<strong>Biggest Current Gap: ${topGap.name}</strong><p>Acquiring ${topGap.name} is your highest-leverage step, increasing your qualification score by +${Math.round(topGap.weight * 2.2)} points.</p>`;
      } else {
        calloutEl.innerHTML = `<strong>Excellent Alignment!</strong><p>Your verified skills match 100% of the foundational competencies for ${activeRole.title}.</p>`;
      }
    }

    const whyBox = document.getElementById("matchHeroExplanationText");
    if (whyBox) {
      whyBox.innerHTML = `
        <span class="why-label">Explainable Breakdown:</span>
        Your score of <strong>${fitData.fitScore}%</strong> is derived from covering <strong>${fitData.matchedSkills.length} of ${Object.keys(activeRole.skills).length}</strong> weighted competencies for ${activeRole.title}. 
        ${fitData.emergingBonus > 0 ? `You also received a <strong>+${fitData.emergingBonus} point</strong> emerging velocity bonus for modern tech skills.` : ""}
      `;
    }

    // Ranked list of all 12 roles
    const recoListContainer = document.getElementById("recoList");
    if (recoListContainer) {
      const allMatches = getRankedRoleMatches();
      recoListContainer.innerHTML = allMatches.map(m => {
        const isTarget = m.role.title === state.selectedTargetRole;
        const scoreClass = m.fitScore >= 75 ? "score-high" : m.fitScore >= 50 ? "score-med" : "score-low";
        
        return `
          <div class="card reco-card ${isTarget ? "card-gold" : ""}">
            <div class="reco-header">
              <div class="reco-title-group">
                <span class="reco-rank-badge ${scoreClass}">${m.fitScore}% Fit</span>
                <h4 class="reco-role-title">${m.role.title} ${isTarget ? '<span class="badge badge-cert">Target</span>' : ''}</h4>
                <div class="reco-sector-text">${m.role.sector} • ₹${m.role.baseSalaryINR}</div>
              </div>
              <button class="btn btn-sm ${isTarget ? "btn-emerald" : "btn-secondary"} select-role-action-btn" data-role="${m.role.title}">
                ${isTarget ? "Active Target ✓" : "Set as Target"}
              </button>
            </div>

            <div class="reco-skills-row" style="margin-top:10px;">
              <div style="font-size:12px; color:var(--text-secondary); margin-bottom:4px;">
                <strong>Matched:</strong> ${m.matchedSkills.map(s => s.name).join(", ") || "None"}
              </div>
              <div style="font-size:12px; color:var(--accent-rose);">
                <strong>Missing Gaps:</strong> ${m.missingSkills.map(s => s.name).join(", ") || "None! (100% matched)"}
              </div>
            </div>
          </div>
        `;
      }).join("");

      recoListContainer.querySelectorAll(".select-role-action-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          state.selectedTargetRole = btn.dataset.role;
          saveState();
          renderCareerMatch();
        });
      });
    }

    // Comparison Matrix Setup
    renderCompareMatrix();
  }

  /* Side-by-Side Comparison Matrix */
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

      select1.value = state.selectedTargetRole || "Data Analyst";
      select2.value = "Data Scientist";
      select3.value = "Full Stack Developer";

      [select1, select2, select3].forEach(sel => {
        sel.addEventListener("change", renderCompareMatrixTable);
      });
    }

    renderCompareMatrixTable();
  }

  function renderCompareMatrixTable() {
    const sel1 = document.getElementById("compareRole1")?.value || "Data Analyst";
    const sel2 = document.getElementById("compareRole2")?.value || "Data Scientist";
    const sel3 = document.getElementById("compareRole3")?.value || "Full Stack Developer";

    const role1 = ROLES.find(r => r.title === sel1) || ROLES[0];
    const role2 = ROLES.find(r => r.title === sel2) || ROLES[1];
    const role3 = ROLES.find(r => r.title === sel3) || ROLES[4];

    const fit1 = calculateRoleFit(role1, state.profile.skills);
    const fit2 = calculateRoleFit(role2, state.profile.skills);
    const fit3 = calculateRoleFit(role3, state.profile.skills);

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
        <td><strong>Current Skill Match Score</strong></td>
        <td><span class="score-badge ${fit1.fitScore >= 75 ? "score-high" : "score-med"}">${fit1.fitScore}% Match</span></td>
        <td><span class="score-badge ${fit2.fitScore >= 75 ? "score-high" : "score-med"}">${fit2.fitScore}% Match</span></td>
        <td><span class="score-badge ${fit3.fitScore >= 75 ? "score-high" : "score-med"}">${fit3.fitScore}% Match</span></td>
      </tr>
      <tr>
        <td><strong>Missing Skill Gaps</strong></td>
        <td>${fit1.missingSkills.length ? fit1.missingSkills.map(s => s.name).join(", ") : "0 gaps (Fully ready)"}</td>
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
      <tr>
        <td><strong>Sector / Domain</strong></td>
        <td>${role1.sector}</td>
        <td>${role2.sector}</td>
        <td>${role3.sector}</td>
      </tr>
      <tr>
        <td><strong>Ramp-Up Learning Time</strong></td>
        <td>${fit1.missingSkills.length <= 2 ? "2-4 weeks" : "6-8 weeks"}</td>
        <td>${fit2.missingSkills.length <= 2 ? "2-4 weeks" : "8-12 weeks"}</td>
        <td>${fit3.missingSkills.length <= 2 ? "2-4 weeks" : "6-10 weeks"}</td>
      </tr>
    `;
  }

  /* View 4: Skills & Gap Analysis */
  function renderSkillsAndGaps() {
    const activeRole = ROLES.find(r => r.title === state.selectedTargetRole) || ROLES[0];
    const fitData = calculateRoleFit(activeRole, state.profile.skills);

    const gapTargetRoleHeading = document.getElementById("gapTargetRoleHeading");
    if (gapTargetRoleHeading) gapTargetRoleHeading.textContent = activeRole.title;

    // Profile Skills Chips
    const profileChipsContainer = document.getElementById("profileChips");
    const emptyChipHint = document.getElementById("emptyChipHint");
    const profileSkillsCount = document.getElementById("profileSkillsCount");

    const skillEntries = Object.entries(state.profile.skills);
    if (profileSkillsCount) profileSkillsCount.textContent = skillEntries.length;

    if (profileChipsContainer) {
      if (!skillEntries.length) {
        profileChipsContainer.innerHTML = "";
        if (emptyChipHint) emptyChipHint.style.display = "block";
      } else {
        if (emptyChipHint) emptyChipHint.style.display = "none";
        profileChipsContainer.innerHTML = skillEntries.map(([sName, sLvl]) => {
          const lvlLabel = sLvl >= 90 ? "Adv" : sLvl >= 60 ? "Mid" : "Beg";
          return `
            <div class="skill-chip">
              <span class="skill-name">${sName}</span>
              <span class="skill-level">${lvlLabel} (${sLvl}%)</span>
              <button class="skill-remove-btn" data-skill="${sName}" title="Remove skill" aria-label="Remove ${sName}">&times;</button>
            </div>
          `;
        }).join("");

        profileChipsContainer.querySelectorAll(".skill-remove-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            delete state.profile.skills[btn.dataset.skill];
            saveState();
            renderSkillsAndGaps();
          });
        });
      }
    }

    // Populate Manual Add Dropdown
    const skillSelect = document.getElementById("skillSelect");
    if (skillSelect && !skillSelect.options.length) {
      skillSelect.innerHTML = SKILLS.map(s => `<option value="${s.name}">${s.name} (${s.cat})</option>`).join("");
    }

    // Populate Categorized Gaps (High, Medium, Optional)
    const highGaps = fitData.missingSkills.filter(s => s.weight >= 8);
    const medGaps = fitData.missingSkills.filter(s => s.weight >= 5 && s.weight < 8);
    const optGaps = fitData.missingSkills.filter(s => s.weight < 5);

    renderGapList("highPriorityGapsContainer", highGaps, activeRole, "high");
    renderGapList("medPriorityGapsContainer", medGaps, activeRole, "med");
    renderGapList("optPriorityGapsContainer", optGaps, activeRole, "opt");
  }

  function renderGapList(containerId, gapsList, activeRole, priorityTier) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!gapsList.length) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; padding:18px; text-align:center; color:var(--text-secondary);">
          ✓ No missing gaps in this priority category! All requirements covered.
        </div>
      `;
      return;
    }

    container.innerHTML = gapsList.map(gap => {
      const skillObj = SKILLS.find(s => s.name === gap.name) || { demand: 75, estTime: "3-4 weeks", resource: "https://roadmap.sh" };
      return `
        <div class="card gap-detail-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div>
              <span class="gap-badge-pill ${priorityTier === "high" ? "badge-high" : priorityTier === "med" ? "badge-med" : "badge-opt"}">
                ${priorityTier === "high" ? "🔴 Critical Gap" : priorityTier === "med" ? "🟡 Key Differentiator" : "🟢 Bonus Skill"}
              </span>
              <h4 style="font-size:16px; font-weight:700; margin-top:6px;">${gap.name}</h4>
            </div>
            <span style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-muted); font-weight:700;">
              Weight: ${gap.weight}/10
            </span>
          </div>

          <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5; margin-bottom:12px;">
            Required in <strong>${skillObj.demand}%</strong> of ${activeRole.title} job descriptions.
          </p>

          <div class="gap-pathway-box">
            <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--accent-gold); letter-spacing:0.06em;">
              How to Close This Gap:
            </span>
            <ul class="gap-steps-list">
              <li>1. Learn fundamentals via curated tutorial</li>
              <li>2. Practice hands-on exercises & queries</li>
              <li>3. Build a portfolio project using ${gap.name}</li>
              <li>4. Add verified project link to your resume</li>
            </ul>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; pt:10px;">
            <a href="${skillObj.resource}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost" style="font-size:11.5px;">
              Study Guide ↗
            </a>
            <button class="btn btn-sm btn-emerald mark-learned-btn" data-skill="${gap.name}">
              ✓ Mark Learned
            </button>
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".mark-learned-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.profile.skills[btn.dataset.skill] = 60; // Mark as intermediate
        saveState();
        renderSkillsAndGaps();
      });
    });
  }

  /* View 5: Personalized Learning Roadmap & Projects */
  function renderRoadmapAndProjects() {
    const activeRole = ROLES.find(r => r.title === state.selectedTargetRole) || ROLES[0];
    const fitData = calculateRoleFit(activeRole, state.profile.skills);

    const roleBadge = document.getElementById("roadmapRoleHeadingBadge");
    if (roleBadge) roleBadge.textContent = activeRole.title;

    // 4-Week Dynamic Roadmap Generation
    const weeklyContainer = document.getElementById("weeklyRoadmapContainer");
    if (weeklyContainer) {
      const missingSkills = fitData.missingSkills;
      const skill1 = missingSkills[0]?.name || "Advanced Project Polish";
      const skill2 = missingSkills[1]?.name || "System Integration";
      const skill3 = missingSkills[2]?.name || "Mock Interviews & Assessments";

      const weeks = [
        {
          weekNum: "01",
          title: `Week 1: Core Foundation — ${skill1}`,
          tasks: [
            { id: "task-1", label: `Complete structured fundamentals for ${skill1} syntax & core concepts.` },
            { id: "task-2", label: `Solve 10 practice problems / real-world queries applying ${skill1}.` }
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

      // Checkbox event listeners
      weeklyContainer.querySelectorAll(".roadmap-task-checkbox").forEach(box => {
        box.addEventListener("change", (e) => {
          state.roadmapTasksCompleted[e.target.dataset.taskId] = e.target.checked;
          saveState();
          updateRoadmapProgressBar();
          const itemLabel = e.target.closest(".task-item-label");
          if (itemLabel) itemLabel.classList.toggle("task-done", e.target.checked);
        });
      });
    }

    updateRoadmapProgressBar();

    // Render Project Recommendations
    renderProjectRecommendations(activeRole);

    // Render Courses Catalog
    renderCareerCourses(activeRole.title);
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

  function renderProjectRecommendations(activeRole) {
    const container = document.getElementById("projectRecommendationsContainer");
    if (!container) return;

    const projects = PROJECT_IDEAS[activeRole.title] || PROJECT_IDEAS["Data Analyst"];
    container.innerHTML = projects.map(p => `
      <div class="card project-idea-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <span class="badge badge-cert">${p.difficulty}</span>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">${p.timeEst}</span>
        </div>
        <h4 style="font-size:16px; font-weight:700; line-height:1.35; margin-bottom:8px;">${p.title}</h4>
        <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.55; margin-bottom:12px;">${p.desc}</p>
        
        <div style="font-size:11.5px; color:var(--accent-gold); margin-bottom:8px;">
          <strong>Stack:</strong> ${p.stack}
        </div>
        <div style="font-size:11.5px; color:var(--text-muted); margin-bottom:12px;">
          <strong>Outcome:</strong> ${p.portfolioOutcome}
        </div>

        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${p.closesGaps.map(g => `<span class="badge badge-free">Closes: ${g}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderCareerCourses(roleTitle) {
    const container = document.getElementById("careerCoursesContainer");
    if (!container) return;

    const list = CAREER_COURSES[roleTitle] || CAREER_COURSES["Data Analyst"];
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
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; pt:10px; border-top:1px solid var(--border-glass);">
          <span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">${c.level}</span>
          <a href="${c.link}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
            Enroll / Open ↗
          </a>
        </div>
      </div>
    `).join("");
  }

  /* View 6: Jobs & Application Tracker */
  function renderJobsAndTracker() {
    const activeRole = ROLES.find(r => r.title === state.selectedTargetRole) || ROLES[0];
    const fitData = calculateRoleFit(activeRole, state.profile.skills);

    // Update portal shortcuts
    const query = encodeURIComponent(activeRole.title);
    const portalsContainer = document.getElementById("jobsPortalActions");
    if (portalsContainer) {
      portalsContainer.innerHTML = `
        <a class="btn btn-sm btn-secondary" target="_blank" rel="noopener" href="https://www.linkedin.com/jobs/search/?keywords=${query}&location=India">LinkedIn Search ↗</a>
        <a class="btn btn-sm btn-secondary" target="_blank" rel="noopener" href="https://www.naukri.com/${query.replace(/%20/g, "-")}-jobs-in-india">Naukri Search ↗</a>
        <a class="btn btn-sm btn-secondary" target="_blank" rel="noopener" href="https://in.indeed.com/jobs?q=${query}&l=India">Indeed Search ↗</a>
      `;
    }

    // Seed realistic listings
    const seedJobs = [
      { id: "job-1", title: `${activeRole.title} — Associate`, company: "PhonePe India", location: "Bengaluru (Hybrid)", match: Math.min(95, fitData.fitScore + 8), tags: ["SQL", "Python", "Analytics"], salary: "₹8 - ₹14 LPA" },
      { id: "job-2", title: `Junior ${activeRole.title}`, company: "Flipkart", location: "Bengaluru", match: fitData.fitScore, tags: ["Data", "Reporting", "Dashboards"], salary: "₹9 - ₹15 LPA" },
      { id: "job-3", title: `${activeRole.title} Intern`, company: "Meesho", location: "Remote / India", match: Math.min(92, fitData.fitScore + 5), tags: ["Excel", "SQL", "Analysis"], salary: "₹35k/mo Stipend" },
      { id: "job-4", title: `Senior ${activeRole.title}`, company: "Razorpay", location: "Bengaluru", match: Math.max(45, fitData.fitScore - 18), tags: ["Power BI", "Cloud", "Architecture"], salary: "₹18 - ₹28 LPA", missing: ["Power BI", "System Design"] },
      { id: "job-5", title: `Lead ${activeRole.title}`, company: "Amazon India", location: "Hyderabad", match: Math.max(40, fitData.fitScore - 25), tags: ["Enterprise", "Leadership", "ML"], salary: "₹24 - ₹40 LPA", missing: ["Deep Learning", "MLOps"] }
    ];

    const qualified = seedJobs.filter(j => j.match >= 70);
    const withGaps = seedJobs.filter(j => j.match < 70);

    const countQual = document.getElementById("countJobsQualified");
    if (countQual) countQual.textContent = qualified.length;

    const countGaps = document.getElementById("countJobsGaps");
    if (countGaps) countGaps.textContent = withGaps.length;

    const countTracker = document.getElementById("countJobsTracker");
    if (countTracker) countTracker.textContent = state.trackedApplications.length;

    // Render Qualified Jobs
    renderJobList("jobsQualifiedContainer", qualified, true);
    // Render Jobs With Gaps
    renderJobList("jobsGapsContainer", withGaps, false);
    // Render Tracker Board
    renderTrackerBoard();
  }

  function renderJobList(containerId, jobList, isQualified) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!jobList.length) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; padding:30px; text-align:center;">
          <h4>No listings in this category right now.</h4>
          <p style="color:var(--text-secondary); font-size:13px;">Use the portal search links above to query live postings on LinkedIn and Naukri.</p>
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
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; pt:10px; border-top:1px solid var(--border-glass);">
          <button class="btn btn-sm btn-ghost save-to-tracker-btn" data-title="${j.title}" data-company="${j.company}" data-loc="${j.location}" data-match="${j.match}">
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
          date: "Just now",
          notes: "Saved from SkillBridge matching recommendations."
        };
        state.trackedApplications.push(newApp);
        saveState();
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
              <div style="font-size:11px; color:var(--text-muted); font-style:italic; margin-bottom:8px;">${item.notes || ""}</div>
              
              <div class="tracker-card-actions">
                <select class="sync-select move-status-select" data-id="${item.id}" style="font-size:11px; padding:3px 6px;">
                  ${statuses.map(s => `<option value="${s}" ${s === item.status ? "selected" : ""}>Move to ${s}</option>`).join("")}
                </select>
                <button class="icon-btn delete-app-btn" data-id="${item.id}" title="Remove" style="font-size:11px; padding:2px 6px;">&times;</button>
              </div>
            </div>
          `).join("");

          colList.querySelectorAll(".move-status-select").forEach(sel => {
            sel.addEventListener("change", (e) => {
              const targetApp = state.trackedApplications.find(a => a.id === e.target.dataset.id);
              if (targetApp) {
                targetApp.status = e.target.value;
                saveState();
                renderTrackerBoard();
              }
            });
          });

          colList.querySelectorAll(".delete-app-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              state.trackedApplications = state.trackedApplications.filter(a => a.id !== btn.dataset.id);
              saveState();
              renderTrackerBoard();
            });
          });
        }
      }
    });
  }

  /* View 7: Market Intelligence & News (With Rich Thematic Images!) */
  function renderMarketIntelligence() {
    renderSalaryEstimator();

    const newsContainer = document.getElementById("newsGridContainer");
    if (!containerExists(newsContainer)) return;

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
            <span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">Verified Tech Intelligence</span>
            <a href="${item.link}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost">
              Read Source ↗
            </a>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderSalaryEstimator() {
    const roleSelect = document.getElementById("salaryRoleSelect");
    const expSelect = document.getElementById("salaryExpSelect");
    const geoSelect = document.getElementById("salaryGeoSelect");

    if (roleSelect && !roleSelect.options.length) {
      roleSelect.innerHTML = ROLES.map(r => `<option value="${r.title}" ${r.title === state.selectedTargetRole ? "selected" : ""}>${r.title}</option>`).join("");
      roleSelect.onchange = (e) => {
        state.selectedTargetRole = e.target.value;
        saveState();
        renderSalaryEstimator();
      };
    }

    const curRole = ROLES.find(r => r.title === (roleSelect?.value || state.selectedTargetRole)) || ROLES[0];
    const exp = expSelect?.value || state.salaryExp;
    const geo = geoSelect?.value || state.salaryGeo;

    const minEl = document.getElementById("salaryMinVal");
    const medEl = document.getElementById("salaryVal");
    const maxEl = document.getElementById("salaryMaxVal");

    // Dynamic benchmark calculations
    if (geo === "in") {
      if (exp === "junior") {
        if (minEl) minEl.textContent = "₹5 LPA";
        if (medEl) medEl.textContent = "₹7 - ₹10 LPA";
        if (maxEl) maxEl.textContent = "₹14+ LPA";
      } else if (exp === "mid") {
        if (minEl) minEl.textContent = "₹10 LPA";
        if (medEl) medEl.textContent = `₹${curRole.baseSalaryINR}`;
        if (maxEl) maxEl.textContent = "₹24+ LPA";
      } else if (exp === "senior") {
        if (minEl) minEl.textContent = "₹18 LPA";
        if (medEl) medEl.textContent = "₹22 - ₹35 LPA";
        if (maxEl) maxEl.textContent = "₹45+ LPA";
      } else {
        if (minEl) minEl.textContent = "₹32 LPA";
        if (medEl) medEl.textContent = "₹40 - ₹65 LPA";
        if (maxEl) maxEl.textContent = "₹80+ LPA";
      }
    } else {
      if (exp === "junior") {
        if (minEl) minEl.textContent = "$55k / yr";
        if (medEl) medEl.textContent = "$70k - $90k / yr";
        if (maxEl) maxEl.textContent = "$110k+ / yr";
      } else if (exp === "mid") {
        if (minEl) minEl.textContent = "$85k / yr";
        if (medEl) medEl.textContent = `${curRole.baseSalaryUSD} / yr`;
        if (maxEl) maxEl.textContent = "$165k+ / yr";
      } else if (exp === "senior") {
        if (minEl) minEl.textContent = "$130k / yr";
        if (medEl) medEl.textContent = "$150k - $190k / yr";
        if (maxEl) maxEl.textContent = "$230k+ / yr";
      } else {
        if (minEl) minEl.textContent = "$180k / yr";
        if (medEl) medEl.textContent = "$210k - $280k / yr";
        if (maxEl) maxEl.textContent = "$350k+ / yr";
      }
    }
  }

  function containerExists(el) {
    return el !== null && el !== undefined;
  }

  /* ==========================================================================
     6. ONBOARDING & RESUME PARSING WIZARD
     ========================================================================== */
  function initOnboarding() {
    const onboardingModal = document.getElementById("onboardingModal");
    const openBtn = document.getElementById("landingAnalyzeBtn");
    const closeBtn = document.getElementById("closeOnboardingBtn");

    if (openBtn) {
      openBtn.addEventListener("click", () => {
        if (onboardingModal) onboardingModal.classList.add("active");
        showWizardStep(1);
      });
    }

    if (closeBtn && onboardingModal) {
      closeBtn.addEventListener("click", () => onboardingModal.classList.remove("active"));
    }

    // Step 1 -> Step 2
    const step1Next = document.getElementById("wizardToStep2");
    if (step1Next) step1Next.addEventListener("click", () => showWizardStep(2));

    // Step 2 -> Step 1
    const step2Back = document.getElementById("wizardBackToStep1");
    if (step2Back) step2Back.addEventListener("click", () => showWizardStep(1));

    // Step 2 -> Step 3
    const step2Next = document.getElementById("wizardToStep3");
    if (step2Next) step2Next.addEventListener("click", () => {
      renderOnboardingRolesGrid();
      showWizardStep(3);
    });

    // Step 3 -> Step 2
    const step3Back = document.getElementById("wizardBackToStep2");
    if (step3Back) step3Back.addEventListener("click", () => showWizardStep(2));

    // Step 3 Finish
    const finishBtn = document.getElementById("wizardFinishBtn");
    if (finishBtn) {
      finishBtn.addEventListener("click", () => {
        if (onboardingModal) onboardingModal.classList.remove("active");
        showPage("dashboard");
      });
    }

    // Resume Tab Switching in Wizard
    document.querySelectorAll(".resume-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".resume-tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".resume-tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.resMode;
        const target = document.getElementById(`resMode${mode.charAt(0).toUpperCase() + mode.slice(1)}`);
        if (target) target.classList.add("active");
      });
    });

    // File Upload Handler (Drop Zone)
    const dropZone = document.getElementById("resumeDropZone");
    const fileInput = document.getElementById("resumeFileInput");
    const statusText = document.getElementById("fileUploadStatus");

    if (dropZone && fileInput) {
      dropZone.addEventListener("click", () => fileInput.click());
      dropZone.addEventListener("dragover", (e) => { e.preventDefault(); dropZone.style.borderColor = "var(--accent-gold)"; });
      dropZone.addEventListener("dragleave", () => { dropZone.style.borderColor = ""; });
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "";
        if (e.dataTransfer.files.length) handleResumeFile(e.dataTransfer.files[0], statusText);
      });
      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length) handleResumeFile(e.target.files[0], statusText);
      });
    }

    // Text Scan Button in Wizard
    const scanTextBtn = document.getElementById("onboardingScanTextBtn");
    if (scanTextBtn) {
      scanTextBtn.addEventListener("click", () => {
        const text = document.getElementById("onboardingResumeText")?.value || "";
        extractAndShowDetectedSkills(text);
      });
    }

    // Populate Persona Chips in Wizard
    const wizardPersonaChips = document.getElementById("onboardingPersonaChips");
    if (wizardPersonaChips) {
      wizardPersonaChips.innerHTML = Object.entries(PERSONAS).map(([key, p]) => `
        <button class="persona-chip" data-persona="${key}" type="button">${p.name}</button>
      `).join("");

      wizardPersonaChips.querySelectorAll(".persona-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          loadSampleProfile(chip.dataset.persona);
          if (onboardingModal) onboardingModal.classList.remove("active");
          showPage("dashboard");
        });
      });
    }
  }

  function showWizardStep(stepNum) {
    document.querySelectorAll(".wizard-step").forEach(s => {
      s.classList.toggle("active", Number(s.dataset.step) === stepNum);
    });
    document.querySelectorAll(".wizard-pane").forEach((pane, idx) => {
      pane.classList.toggle("active", idx + 1 === stepNum);
    });
  }

  function handleResumeFile(file, statusEl) {
    if (!file) return;
    if (statusEl) statusEl.textContent = `Analyzing ${file.name}...`;

    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result || "";
      extractAndShowDetectedSkills(content);
      if (statusEl) statusEl.textContent = `✓ Successfully parsed ${file.name}`;
    };
    reader.onerror = function () {
      if (statusEl) statusEl.textContent = "Error reading file. Please paste your resume text instead.";
    };
    reader.readAsText(file);
  }

  function extractAndShowDetectedSkills(text) {
    const raw = String(text || "").toLowerCase();
    const foundSkills = {};

    SKILLS.forEach(skill => {
      const cleanSkill = skill.name.toLowerCase();
      // Match skill keyword
      if (raw.includes(cleanSkill) || (cleanSkill === "sql" && /\bsql\b/.test(raw)) || (cleanSkill === "aws" && /\baws\b/.test(raw))) {
        foundSkills[skill.name] = 60; // default intermediate
      }
    });

    // If nothing found, provide reasonable defaults
    if (!Object.keys(foundSkills).length) {
      foundSkills["Python"] = 60;
      foundSkills["SQL"] = 60;
      foundSkills["Excel"] = 60;
      foundSkills["Git"] = 60;
    }

    // Merge into state profile
    state.profile.skills = { ...state.profile.skills, ...foundSkills };
    saveState();

    // Render in extraction review box
    const reviewBox = document.getElementById("extractionReviewBox");
    const countEl = document.getElementById("detectedSkillsCount");
    const chipsEl = document.getElementById("detectedChipsContainer");

    if (reviewBox && chipsEl) {
      reviewBox.style.display = "block";
      const entries = Object.entries(foundSkills);
      if (countEl) countEl.textContent = entries.length;

      chipsEl.innerHTML = entries.map(([sName]) => `
        <div class="skill-chip">
          <span>${sName}</span>
          <button class="skill-remove-btn" data-skill="${sName}">&times;</button>
        </div>
      `).join("");

      chipsEl.querySelectorAll(".skill-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          delete state.profile.skills[btn.dataset.skill];
          btn.closest(".skill-chip").remove();
          saveState();
        });
      });
    }
  }

  function renderOnboardingRolesGrid() {
    const container = document.getElementById("onboardingRoleGrid");
    if (!container) return;

    container.innerHTML = ROLES.map(r => `
      <div class="role-select-card ${r.title === state.selectedTargetRole ? "active" : ""}" data-role="${r.title}">
        <div class="role-select-icon">🎯</div>
        <h4>${r.title}</h4>
        <span style="font-size:11.5px; color:var(--text-secondary);">${r.sector} Sector</span>
      </div>
    `).join("");

    container.querySelectorAll(".role-select-card").forEach(card => {
      card.addEventListener("click", () => {
        container.querySelectorAll(".role-select-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        state.selectedTargetRole = card.dataset.role;
        saveState();
      });
    });
  }

  /* Load Complete Sample Profile */
  function loadSampleProfile(personaKey) {
    const persona = PERSONAS[personaKey] || PERSONAS.data_analyst;
    state.profile = {
      name: persona.name,
      skills: { ...persona.skills }
    };
    state.selectedTargetRole = persona.targetRole || "Data Analyst";
    state.roadmapTasksCompleted = { "task-1": true, "task-2": true };
    saveState();
  }

  /* ==========================================================================
     7. GLOBAL EVENT LISTENERS & CHAT ASSISTANT
     ========================================================================== */
  function initGlobalEvents() {
    // Navigation Clicks
    document.querySelectorAll(".main-nav .nav-tab, .mobile-nav-item").forEach(btn => {
      btn.addEventListener("click", () => showPage(btn.dataset.page));
    });

    // Brand Logo -> Landing
    const brandHome = document.getElementById("brandHome");
    if (brandHome) brandHome.addEventListener("click", (e) => {
      e.preventDefault();
      showPage("landing");
    });

    // Sample Profile Buttons
    const headerSampleBtn = document.getElementById("headerSampleBtn");
    if (headerSampleBtn) headerSampleBtn.addEventListener("click", () => {
      loadSampleProfile("data_analyst");
      showPage("dashboard");
    });

    const landingSampleBtn = document.getElementById("landingSampleBtn");
    if (landingSampleBtn) landingSampleBtn.addEventListener("click", () => {
      loadSampleProfile("data_analyst");
      showPage("dashboard");
    });

    // Landing Persona Chips
    const landingPersonaChips = document.getElementById("landingPersonaChips");
    if (landingPersonaChips) {
      landingPersonaChips.innerHTML = Object.entries(PERSONAS).map(([key, p]) => `
        <button class="persona-chip" data-persona="${key}" type="button">${p.name}</button>
      `).join("");

      landingPersonaChips.querySelectorAll(".persona-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          loadSampleProfile(chip.dataset.persona);
          showPage("dashboard");
        });
      });
    }

    // Dashboard Jump Cards
    document.querySelectorAll(".dash-stat-card[data-jump]").forEach(card => {
      card.addEventListener("click", () => showPage(card.dataset.jump));
    });

    const dashEditProfileBtn = document.getElementById("dashEditProfileBtn");
    if (dashEditProfileBtn) dashEditProfileBtn.addEventListener("click", () => showPage("skills-gaps"));

    const dashStartRoadmapBtn = document.getElementById("dashStartRoadmapBtn");
    if (dashStartRoadmapBtn) dashStartRoadmapBtn.addEventListener("click", () => showPage("roadmap"));

    // Manual Skill Adder
    const addSkillBtn = document.getElementById("addSkillBtn");
    if (addSkillBtn) {
      addSkillBtn.addEventListener("click", () => {
        const selSkill = document.getElementById("skillSelect")?.value;
        if (selSkill) {
          state.profile.skills[selSkill] = state.selectedLevel;
          saveState();
          renderSkillsAndGaps();
        }
      });
    }

    document.querySelectorAll(".level-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".level-toggle-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.selectedLevel = Number(btn.dataset.lvl);
      });
    });

    // Theme Switcher
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

    // Developer / Settings Modal
    const settingsModalBtn = document.getElementById("settingsModalBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    if (settingsModalBtn && settingsModal) {
      settingsModalBtn.addEventListener("click", () => settingsModal.classList.add("active"));
      if (closeSettingsBtn) closeSettingsBtn.addEventListener("click", () => settingsModal.classList.remove("active"));
    }

    const clearStorageBtn = document.getElementById("clearStorageBtn");
    if (clearStorageBtn) {
      clearStorageBtn.addEventListener("click", () => {
        if (confirm("Reset all SkillBridge local data to defaults?")) {
          localStorage.removeItem(STORAGE_KEY);
          location.reload();
        }
      });
    }

    // Export Modal
    const exportBtn = document.getElementById("exportBtn");
    const exportModal = document.getElementById("exportModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    if (exportBtn && exportModal) {
      exportBtn.addEventListener("click", () => {
        generateExportReport();
        exportModal.classList.add("active");
      });
      if (closeModalBtn) closeModalBtn.addEventListener("click", () => exportModal.classList.remove("active"));
    }

    const printReportBtn = document.getElementById("printReportBtn");
    if (printReportBtn) printReportBtn.addEventListener("click", () => window.print());

    const copyReportBtn = document.getElementById("copyReportBtn");
    if (copyReportBtn) {
      copyReportBtn.addEventListener("click", () => {
        const text = document.getElementById("reportPreview")?.innerText || "";
        navigator.clipboard.writeText(text).then(() => alert("Career Audit Report copied to clipboard!"));
      });
    }

    // News Filter & Search
    document.querySelectorAll("#newsCategoryFilter .filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("#newsCategoryFilter .filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.activeNewsCategory = chip.dataset.category;
        renderMarketIntelligence();
      });
    });

    const newsSearchInput = document.getElementById("newsSearchInput");
    if (newsSearchInput) {
      newsSearchInput.addEventListener("input", (e) => {
        state.newsSearchQuery = e.target.value;
        renderMarketIntelligence();
      });
    }

    const syncNewsBtn = document.getElementById("syncNewsBtn");
    if (syncNewsBtn) {
      syncNewsBtn.addEventListener("click", () => {
        syncNewsBtn.textContent = "Syncing...";
        setTimeout(() => {
          syncNewsBtn.innerHTML = `✓ Live Feeds Updated`;
          renderMarketIntelligence();
          setTimeout(() => {
            syncNewsBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Refresh Intel Feeds`;
          }, 2000);
        }, 600);
      });
    }

    // Courses Filter in Roadmap
    document.querySelectorAll("#roadmapCourseFilterTabs .filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("#roadmapCourseFilterTabs .filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.activeCourseFilter = chip.dataset.filter;
        renderCareerCourses(state.selectedTargetRole);
      });
    });

    // Jobs Subtabs (Qualified vs Gaps vs Tracker)
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

    // Reset Roadmap Checkboxes
    const resetRoadmapProgressBtn = document.getElementById("resetRoadmapProgressBtn");
    if (resetRoadmapProgressBtn) {
      resetRoadmapProgressBtn.addEventListener("click", () => {
        state.roadmapTasksCompleted = {};
        saveState();
        renderRoadmapAndProjects();
      });
    }

    // Salary Selectors
    const salaryExpSelect = document.getElementById("salaryExpSelect");
    const salaryGeoSelect = document.getElementById("salaryGeoSelect");
    if (salaryExpSelect) salaryExpSelect.addEventListener("change", (e) => { state.salaryExp = e.target.value; saveState(); renderSalaryEstimator(); });
    if (salaryGeoSelect) salaryGeoSelect.addEventListener("change", (e) => { state.salaryGeo = e.target.value; saveState(); renderSalaryEstimator(); });

    // AI Career Assistant Chat
    initHelpChat();
  }

  function generateExportReport() {
    const reportEl = document.getElementById("reportPreview");
    if (!reportEl) return;

    const activeRole = ROLES.find(r => r.title === state.selectedTargetRole) || ROLES[0];
    const fitData = calculateRoleFit(activeRole, state.profile.skills);
    const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    reportEl.innerHTML = `
      <div style="font-family:var(--font-mono); font-size:12px; line-height:1.7;">
        =================================================================<br>
        SKILLBRIDGE CAREER FIT & READINESS AUDIT<br>
        Date: ${dateStr} • Candidate: ${state.profile.name || "Student Profile"}<br>
        =================================================================<br><br>
        TARGET CAREER TRACK: ${activeRole.title} (${activeRole.sector})<br>
        READINESS FIT SCORE: ${fitData.fitScore}% Match (Core Coverage: ${fitData.corePct}%)<br>
        ESTIMATED COMPENSATION: ${activeRole.baseSalaryINR} (India) / ${activeRole.baseSalaryUSD} (Global)<br><br>
        VERIFIED PROFILE SKILLS (${Object.keys(state.profile.skills).length}):<br>
        ${Object.entries(state.profile.skills).map(([s, lvl]) => ` - ${s}: ${lvl}%`).join("<br>")}<br><br>
        PRIORITY SKILL GAPS TO CLOSE (${fitData.missingSkills.length}):<br>
        ${fitData.missingSkills.map(g => ` - ${g.name} (Hiring Weight: ${g.weight}/10)`).join("<br>")}<br><br>
        RECOMMENDED 4-WEEK MILESTONE:<br>
        - Week 1: ${fitData.missingSkills[0]?.name || "Core Practice"}<br>
        - Week 2: ${fitData.missingSkills[1]?.name || "Advanced Tooling"}<br>
        - Week 3: Portfolio Project Build & GitHub Deployment<br>
        - Week 4: Resume Polish & Job Application Launch<br>
        =================================================================
      </div>
    `;
  }

  function initHelpChat() {
    const trigger = document.getElementById("helpChatTrigger");
    const chatWindow = document.getElementById("helpChatWindow");
    const closeBtn = document.getElementById("helpChatClose");
    const form = document.getElementById("helpChatForm");
    const input = document.getElementById("helpChatInput");
    const messages = document.getElementById("helpChatMessages");
    const roleText = document.getElementById("chatRoleNameText");

    if (roleText) roleText.textContent = state.selectedTargetRole;

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

    // Context-Aware Quick Prompt Chips
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

    // Append user message
    const userBubble = document.createElement("div");
    userBubble.className = "help-chat-message user-message";
    userBubble.textContent = userText;
    container.appendChild(userBubble);

    // Formulate Context-Aware Response
    const activeRole = ROLES.find(r => r.title === state.selectedTargetRole) || ROLES[0];
    const fitData = calculateRoleFit(activeRole, state.profile.skills);
    const topGap = fitData.missingSkills[0];

    let reply = "";
    const lower = userText.toLowerCase();

    if (lower.includes("score") || lower.includes("why")) {
      reply = `Your match score for ${activeRole.title} is ${fitData.fitScore}%. You have covered ${fitData.matchedSkills.length} of ${Object.keys(activeRole.skills).length} required skills (${fitData.matchedSkills.map(s => s.name).join(", ")}).`;
    } else if (lower.includes("learn") || lower.includes("first") || lower.includes("gap")) {
      reply = topGap 
        ? `You should prioritize learning ${topGap.name}. It has a hiring weight of ${topGap.weight}/10 in ${activeRole.title} descriptions. Bridging it will raise your score to ${Math.min(100, fitData.fitScore + Math.round(topGap.weight * 2.2))}%.`
        : `You have covered all core requirements for ${activeRole.title}! You're ready to focus on building capstone portfolio projects.`;
    } else if (lower.includes("project")) {
      const p = (PROJECT_IDEAS[activeRole.title] || PROJECT_IDEAS["Data Analyst"])[0];
      reply = `I recommend building "${p.title}" using ${p.stack}. It closes your gaps in ${p.closesGaps.join(" and ")} and gives you a strong GitHub showcase.`;
    } else if (lower.includes("job")) {
      reply = `Based on your ${fitData.fitScore}% fit score, you qualify for 18+ active openings in India & remote. Check the Jobs & Tracker tab to view phone-screen ready positions!`;
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
     8. INITIALIZATION
     ========================================================================== */
  function init() {
    loadState();
    initGlobalEvents();
    initOnboarding();
    showPage(state.activePage || "landing");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
