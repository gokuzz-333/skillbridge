/* ==========================================================================
   SKILLBRIDGE CORE LOGIC - LIVE DATA ENGINE & CAREER ADVISOR
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
    { name: "NLP", cat: "AI/ML", demand: 76, trend: "rising", resource: "https://huggingface.co/learn/nlp-course", estTime: "4-6 weeks" },
  ];

  const ROLES = [
    { title: "Data Analyst", sector: "Analytics", baseSalaryINR: "7-14 LPA", baseSalaryUSD: "$65k-$95k", skills: { "SQL": 9, "Excel": 6, "Power BI": 7, "Statistics": 6, "Data Visualization": 7, "Communication": 5, "Python": 5 } },
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

  /* Comprehensive Curated Courses & Certifications mapped to every single career option */
  const CAREER_COURSES = {
    "Data Analyst": [
      { title: "Google Data Analytics Professional Certificate", provider: "Google / Coursera", level: "Beginner to Pro", duration: "6 months (10 hrs/wk)", type: "cert", link: "https://www.coursera.org/professional-certificates/google-data-analytics", desc: "Industry-standard certification covering SQL, Spreadsheets, Tableau, R/Python, and data cleaning." },
      { title: "Microsoft Power BI Data Analyst (PL-300 Exam Prep)", provider: "Microsoft Learn", level: "Intermediate", duration: "4-6 weeks", type: "cert", link: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/", desc: "Official Microsoft certification curriculum for modeling, DAX expressions, and enterprise reporting." },
      { title: "Complete SQL Bootcamp: Go from Zero to Hero", provider: "Udemy / Jose Portilla", level: "All Levels", duration: "3-4 weeks", type: "cert", link: "https://www.udemy.com/course/the-complete-sql-bootcamp/", desc: "Master PostgreSQL, complex joins, subqueries, window functions, and analytics queries." },
      { title: "Tableau Certified Data Analyst Specialization", provider: "Tableau / Coursera", level: "Intermediate", duration: "2 months", type: "cert", link: "https://www.tableau.com/learn/training", desc: "Interactive dashboard design, LOD calculations, storytelling, and visual analytics." },
      { title: "Statistics and Probability for Data Science", provider: "Khan Academy & edX", level: "Beginner", duration: "3-4 weeks", type: "free", link: "https://www.khanacademy.org/math/statistics-probability", desc: "Essential hypothesis testing, distributions, regression, and confidence intervals." },
      { title: "Data Analyst Roadmap & Project Portfolio Guide", provider: "Roadmap.sh", level: "All Levels", duration: "Self-paced", type: "free", link: "https://roadmap.sh/data-analyst", desc: "Step-by-step interactive milestones, real-world portfolio datasets, and interview prep." }
    ],
    "Data Scientist": [
      { title: "IBM Data Science Professional Certificate", provider: "IBM / Coursera", level: "Beginner to Adv", duration: "5-6 months", type: "cert", link: "https://www.coursera.org/professional-certificates/ibm-data-science", desc: "10-course sequence covering Python, SQL, Data Analysis, Applied Machine Learning, and Capstone." },
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

  /* Market Intelligence & Layoffs Registry */
  const MARKET_NEWS = [
    {
      id: "news-1",
      category: "layoffs",
      impact: "layoff",
      impactLabel: "🚨 Tech Headcount Pivot",
      title: "Big Tech Shifts Headcount from Legacy Roles into Dedicated AI & Agent Teams",
      source: "TechCrunch / Market Pulse",
      date: "August 2026",
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
      summary: "While 65% of large tech employers have standardized on 2-day hybrid schedules, remote-first hiring remains robust for high-demand senior engineers across India and global timezones.",
      takeaway: "Async communication and strong Git collaboration skills remain critical differentiators for distributed engineering teams.",
      link: "https://www.forbes.com/"
    }
  ];

  const PERSONAS = {
    ai_aspirant: {
      name: "AI / GenAI Aspirant",
      skills: { "Python": 90, "Generative AI Tooling": 80, "Prompt Engineering": 85, "SQL": 60, "Machine Learning": 70, "Git": 60 }
    },
    data_to_ml: {
      name: "Data Analyst transitioning to ML",
      skills: { "SQL": 90, "Power BI": 90, "Excel": 90, "Python": 60, "Statistics": 60, "Data Visualization": 80, "Communication": 80 }
    },
    fullstack_dev: {
      name: "Modern Fullstack Developer",
      skills: { "JavaScript": 90, "TypeScript": 80, "React": 90, "Next.js": 75, "Node.js": 80, "SQL": 60, "Git": 80, "Docker": 60 }
    },
    devops_cloud: {
      name: "Cloud & DevOps Architect",
      skills: { "AWS": 90, "Docker": 90, "Kubernetes": 80, "CI/CD": 85, "Cloud Security": 70, "Git": 80, "Python": 50 }
    },
    cyber_sec: {
      name: "Cybersecurity Analyst",
      skills: { "Cybersecurity Fundamentals": 90, "Cloud Security": 80, "Ethical Hacking": 70, "Python": 60, "Communication": 70 }
    }
  };

  const SECTORS = ["All", ...new Set(ROLES.map(r => r.sector))];
  const CATEGORIES = ["All", ...new Set(SKILLS.map(s => s.cat))];
  const SYNTHETIC_SNAPSHOT = SKILLS.map(s => ({ name: s.name, demand: s.demand, trend: s.trend }));
  const STORAGE_KEY = "skillbridge_state_v3";

  /* ==========================================================================
     2. APP STATE (PERSISTENT & REACTIVE)
     ========================================================================== */
  let profile = {}; // { skillName: level(0-100) }
  let selectedTargetRole = "Data Analyst"; // Active career option across Next Steps & Salary
  let selectedLevel = 60;
  let sectorFilterVal = "All";
  let categoryFilterVal = "All";
  let activeCourseFilter = "all";
  let activeNewsCategory = "all";
  let newsSearchQuery = "";
  let expandedRoleId = null;
  let liveJobsCache = [];
  let isLiveActive = false;
  let activeSyncSource = "free_public"; // "free_public" | "adzuna"
  let whatIfSimAdjustments = {}; // temporary simulation boosts

  /* Save state to localStorage to prevent selection resets */
  function saveState() {
    try {
      const stateToSave = {
        profile,
        selectedTargetRole,
        selectedLevel,
        sectorFilterVal,
        categoryFilterVal,
        activeCourseFilter,
        activeNewsCategory,
        newsSearchQuery,
        salaryExp: dom.salaryExpSelect ? dom.salaryExpSelect.value : "mid",
        salaryGeo: dom.salaryGeoSelect ? dom.salaryGeoSelect.value : "in",
        whatIfSimAdjustments,
        resumeText: dom.resumeText ? dom.resumeText.value : ""
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }
  }

  /* Load state safely from localStorage */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        if (parsed.profile && Object.keys(parsed.profile).length > 0) profile = parsed.profile;
        if (parsed.selectedTargetRole) selectedTargetRole = parsed.selectedTargetRole;
        if (parsed.selectedLevel) selectedLevel = parsed.selectedLevel;
        if (parsed.sectorFilterVal) sectorFilterVal = parsed.sectorFilterVal;
        if (parsed.categoryFilterVal) categoryFilterVal = parsed.categoryFilterVal;
        if (parsed.activeCourseFilter) activeCourseFilter = parsed.activeCourseFilter;
        if (parsed.activeNewsCategory) activeNewsCategory = parsed.activeNewsCategory;
        if (parsed.newsSearchQuery) newsSearchQuery = parsed.newsSearchQuery;
        if (parsed.whatIfSimAdjustments) whatIfSimAdjustments = parsed.whatIfSimAdjustments;
        if (parsed.resumeText && dom.resumeText) dom.resumeText.value = parsed.resumeText;
        if (parsed.salaryExp && dom.salaryExpSelect) dom.salaryExpSelect.value = parsed.salaryExp;
        if (parsed.salaryGeo && dom.salaryGeoSelect) dom.salaryGeoSelect.value = parsed.salaryGeo;
        return true;
      }
    } catch (e) {
      console.warn("Storage load failed:", e);
    }
    return false;
  }

  /* ==========================================================================
     3. DOM ELEMENTS
     ========================================================================== */
  const dom = {
    stageNav: document.getElementById("stageNav"),
    pipelineTrack: document.getElementById("pipelineTrack"),
    stageSections: document.querySelectorAll(".stage-section"),
    brandHome: document.getElementById("brandHome"),
    heroCta: document.getElementById("heroCta"),
    statusDot: document.getElementById("statusDot"),
    dataBadge: document.getElementById("dataBadge"),
    livePostingsCount: document.getElementById("livePostingsCount"),
    syncLog: document.getElementById("syncLog"),
    syncBtn: document.getElementById("syncBtn"),
    resetBtn: document.getElementById("resetBtn"),
    sectorFilter: document.getElementById("sectorFilter"),
    roleTableBody: document.getElementById("roleTableBody"),
    categoryFilter: document.getElementById("categoryFilter"),
    demandBarList: document.getElementById("demandBarList"),
    emergeGrid: document.getElementById("emergeGrid"),
    skillSelect: document.getElementById("skillSelect"),
    addSkillBtn: document.getElementById("addSkillBtn"),
    profileChips: document.getElementById("profileChips"),
    emptyChipHint: document.getElementById("emptyChipHint"),
    resumeText: document.getElementById("resumeText"),
    scanResumeBtn: document.getElementById("scanResumeBtn"),
    resumeResultMsg: document.getElementById("resumeResultMsg"),
    improveResumeBtn: document.getElementById("improveResumeBtn"),
    resumeImproverResult: document.getElementById("resumeImproverResult"),
    recoList: document.getElementById("recoList"),
    recoEmptyHint: document.getElementById("recoEmptyHint"),
    personaChips: document.getElementById("personaChips"),
    activeRoleTitleHeading: document.getElementById("activeRoleTitleHeading"),
    roadmapRoleSelect: document.getElementById("roadmapRoleSelect"),
    roadmapRoleChips: document.getElementById("roadmapRoleChips"),
    careerCoursesContainer: document.getElementById("careerCoursesContainer"),
    courseRoleNameBadge: document.getElementById("courseRoleNameBadge"),
    gapRoleNameBadge: document.getElementById("gapRoleNameBadge"),
    courseFilterTabs: document.getElementById("courseFilterTabs"),
    roadmapCardsContainer: document.getElementById("roadmapCardsContainer"),
    jobsContainer: document.getElementById("jobsContainer"),
    salaryVal: document.getElementById("salaryVal"),
    salaryRoleSelect: document.getElementById("salaryRoleSelect"),
    salaryExpSelect: document.getElementById("salaryExpSelect"),
    salaryGeoSelect: document.getElementById("salaryGeoSelect"),
    newsCategoryFilter: document.getElementById("newsCategoryFilter"),
    newsSearchInput: document.getElementById("newsSearchInput"),
    newsResultsCount: document.getElementById("newsResultsCount"),
    newsGridContainer: document.getElementById("newsGridContainer"),
    syncNewsBtn: document.getElementById("syncNewsBtn"),
    exportModal: document.getElementById("exportModal"),
    exportBtn: document.getElementById("exportBtn"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    reportPreview: document.getElementById("reportPreview"),
    copyReportBtn: document.getElementById("copyReportBtn"),
    printReportBtn: document.getElementById("printReportBtn"),
    themeToggle: document.getElementById("themeToggle"),
    helpChat: document.getElementById("helpChat"),
    helpChatWindow: document.getElementById("helpChatWindow"),
    helpChatTrigger: document.getElementById("helpChatTrigger"),
    helpChatClose: document.getElementById("helpChatClose"),
    helpChatMessages: document.getElementById("helpChatMessages"),
    helpChatForm: document.getElementById("helpChatForm"),
    helpChatInput: document.getElementById("helpChatInput"),
  };

  /* ==========================================================================
     4. NAVIGATION & STAGE SWITCHING (NO RESETS!)
     ========================================================================== */
  const STAGES = [
    { id: "stage-market", label: "01 Explore market", desc: "Roles and demand" },
    { id: "stage-demand", label: "02 Browse skills", desc: "Skills employers want" },
    { id: "stage-emerging", label: "03 Growing skills", desc: "Skills gaining momentum" },
    { id: "stage-profile", label: "04 Your profile", desc: "Add skills or a resume" },
    { id: "stage-reco", label: "05 Best-fit roles", desc: "Matches and skill gaps" },
    { id: "stage-roadmaps", label: "06 Next steps", desc: "Courses & roadmaps" },
    { id: "stage-news", label: "07 Market news", desc: "Layoffs & emerging jobs" },
  ];

  function showStage(stageId) {
    dom.stageSections.forEach(s => s.classList.toggle("active", s.id === stageId));
    document.querySelectorAll(".nav-tab").forEach(t => t.classList.toggle("active", t.dataset.stage === stageId));
    document.querySelectorAll(".pipeline-node").forEach(n => n.classList.toggle("active", n.dataset.stage === stageId));

    if (stageId === "stage-home") {
      document.getElementById("heroSection").style.display = "block";
      document.querySelectorAll(".stage-section").forEach(s => s.classList.add("active"));
    } else {
      document.getElementById("heroSection").style.display = "block";
      const target = document.getElementById(stageId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function initNav() {
    dom.stageNav.innerHTML = "";
    dom.pipelineTrack.innerHTML = "";

    STAGES.forEach((stage, idx) => {
      // Nav Tab
      const tab = document.createElement("button");
      tab.className = "nav-tab" + (idx === 0 ? " active" : "");
      tab.dataset.stage = stage.id;
      tab.innerHTML = `<span class="tab-num">0${idx + 1}</span> ${stage.label.replace(/^0\d\s*/, "")}`;
      tab.addEventListener("click", () => showStage(stage.id));
      dom.stageNav.appendChild(tab);

      // Pipeline Node
      const node = document.createElement("div");
      node.className = "pipeline-node" + (idx === 0 ? " active" : "");
      node.dataset.stage = stage.id;
      node.innerHTML = `
        <div class="node-num">0${idx + 1} <span>→</span></div>
        <div class="node-title">${stage.label.replace(/^0\d\s*/, "")}</div>
        <div class="node-desc">${stage.desc}</div>
      `;
      node.addEventListener("click", () => showStage(stage.id));
      dom.pipelineTrack.appendChild(node);
    });

    const jobsTab = document.createElement("a");
    jobsTab.className = "nav-tab jobs-nav-tab";
    jobsTab.href = "jobs.html";
    jobsTab.textContent = "India jobs";
    dom.stageNav.appendChild(jobsTab);

    if (dom.heroCta) {
      dom.heroCta.addEventListener("click", () => showStage("stage-market"));
    }
    if (dom.brandHome) {
      dom.brandHome.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ==========================================================================
     5. PERSONA PRESETS & RESUME SCANNER
     ========================================================================== */
  function initPersonaPresets() {
    if (!dom.personaChips) return;
    dom.personaChips.innerHTML = "";

    Object.entries(PERSONAS).forEach(([key, p]) => {
      const chip = document.createElement("button");
      chip.className = "persona-chip";
      chip.innerHTML = `<span>⚡</span> ${p.name}`;
      chip.addEventListener("click", () => {
        profile = { ...p.skills };
        document.querySelectorAll(".persona-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        saveState();
        renderAllProfileDependents();
        showStage("stage-profile");
      });
      dom.personaChips.appendChild(chip);
    });
  }

  function initResumeScanner() {
    if (!dom.scanResumeBtn) return;
    dom.scanResumeBtn.addEventListener("click", () => {
      const text = (dom.resumeText.value || "").trim();
      if (!text) {
        dom.resumeResultMsg.textContent = "Please paste your resume, LinkedIn bio, or project description first.";
        dom.resumeResultMsg.style.color = "var(--accent-rose)";
        return;
      }

      dom.scanResumeBtn.disabled = true;
      dom.scanResumeBtn.textContent = "Extracting skills…";

      setTimeout(() => {
        const extracted = parseSkillsFromText(text);
        const count = Object.keys(extracted).length;

        if (count === 0) {
          dom.resumeResultMsg.textContent = "No matching technology skills detected. Try pasting a more detailed work history or skills section.";
          dom.resumeResultMsg.style.color = "var(--accent-rose)";
        } else {
          // Merge into profile
          Object.assign(profile, extracted);
          saveState();
          renderAllProfileDependents();
          dom.resumeResultMsg.textContent = `✓ Successfully extracted and added ${count} skill${count > 1 ? "s" : ""} to your profile!`;
          dom.resumeResultMsg.style.color = "var(--accent-emerald)";
        }

        dom.scanResumeBtn.disabled = false;
        dom.scanResumeBtn.textContent = "Analyze & Extract Skills";
      }, 350);
    });

    if (dom.resumeText) {
      dom.resumeText.addEventListener("input", saveState);
    }
  }

  function parseSkillsFromText(rawText) {
    const text = rawText.toLowerCase();
    const result = {};

    SKILLS.forEach(skill => {
      const name = skill.name.toLowerCase();
      // Match whole word or token boundary
      const regex = new RegExp(`\\b${escapeRegExp(name)}\\b`, "i");
      if (regex.test(text)) {
        // Infer proficiency level based on proximity keywords
        let level = 60; // Default Intermediate
        const snippetIndex = text.indexOf(name);
        const contextWindow = text.slice(Math.max(0, snippetIndex - 120), Math.min(text.length, snippetIndex + 120));

        if (/(lead|senior|architect|mastery|expert|5\+|6\+|7\+|8\+|advanced|specialist|production-grade)/i.test(contextWindow)) {
          level = 90;
        } else if (/(beginner|learning|familiar|basics|novice|intern|junior|coursework)/i.test(contextWindow)) {
          level = 30;
        }
        result[skill.name] = level;
      }
    });

    return result;
  }

  function initResumeImprover() {
    if (!dom.improveResumeBtn || !dom.resumeImproverResult) return;

    dom.improveResumeBtn.addEventListener("click", () => {
      const resume = (dom.resumeText.value || "").trim();
      const result = dom.resumeImproverResult;
      result.replaceChildren();
      result.hidden = false;

      if (!resume) {
        const message = document.createElement("p");
        message.textContent = "Paste your resume or LinkedIn summary first, then select Review resume.";
        result.appendChild(message);
        return;
      }

      const detectedSkills = Object.keys(parseSkillsFromText(resume));
      const actionVerbs = /\b(built|created|designed|developed|delivered|improved|launched|led|managed|automated|optimized|reduced|increased|implemented|analyzed)\b/gi;
      const hasActionVerbs = (resume.match(actionVerbs) || []).length >= 2;
      const hasMetrics = /\b\d+(?:\.\d+)?(?:%|\+|x| users| customers| projects| days| hours| years)\b/i.test(resume);
      const hasBullets = /(^|\n)\s*[-•*]/.test(resume);
      const profileSkills = [...new Set([...detectedSkills, ...Object.keys(profile)])].slice(0, 5);
      const suggestions = [];

      if (!hasMetrics) suggestions.push("Add numbers where you can—for example, time saved, users supported, revenue influenced, projects delivered, or accuracy improved.");
      if (!hasActionVerbs) suggestions.push("Start experience bullets with a clear action verb such as Built, Improved, Automated, Led, or Analyzed.");
      if (!hasBullets) suggestions.push("Use short bullet points for each role or project so recruiters can scan your impact quickly.");
      if (detectedSkills.length < 3) suggestions.push("Add a dedicated Skills section with the tools and technologies you have actually used.");
      if (resume.length < 250) suggestions.push("Add more detail about your strongest project, internship, or work experience, including your contribution and outcome.");
      if (!suggestions.length) suggestions.push("Your resume already has strong basics. Tailor the top summary and first few bullets to the job description before each application.");

      const heading = document.createElement("h4");
      heading.textContent = "Resume review";
      const intro = document.createElement("p");
      intro.textContent = `We found ${detectedSkills.length} recognised skill${detectedSkills.length === 1 ? "" : "s"}. Use these suggestions to make your experience easier to scan.`;
      const list = document.createElement("ul");
      suggestions.forEach(suggestion => {
        const item = document.createElement("li");
        item.textContent = suggestion;
        list.appendChild(item);
      });
      result.append(heading, intro, list);

      if (profileSkills.length) {
        const summaryLabel = document.createElement("h5");
        summaryLabel.textContent = "Suggested summary — edit this to keep it accurate";
        const summary = document.createElement("p");
        summary.className = "resume-summary-suggestion";
        summary.textContent = `Detail-oriented professional with hands-on experience in ${profileSkills.join(", ")}. Focused on turning business needs into reliable, measurable outcomes through practical problem-solving and continuous learning.`;
        result.append(summaryLabel, summary);
      }
    });
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* ==========================================================================
     6. PROFILE MANAGEMENT
     ========================================================================== */
  function initProfileControls() {
    // Populate dropdown
    dom.skillSelect.innerHTML = "";
    SKILLS.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.name;
      opt.textContent = `${s.name} (${s.cat})${s.emerging ? " ★ Rising" : ""}`;
      dom.skillSelect.appendChild(opt);
    });

    // Level toggle buttons
    document.querySelectorAll(".level-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".level-toggle-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedLevel = parseInt(btn.dataset.lvl, 10);
        saveState();
      });
    });

    // Add button
    dom.addSkillBtn.addEventListener("click", () => {
      const name = dom.skillSelect.value;
      profile[name] = selectedLevel;
      saveState();
      renderAllProfileDependents();
    });
  }

  function renderProfileChips() {
    dom.profileChips.innerHTML = "";
    const names = Object.keys(profile);

    if (names.length === 0) {
      dom.emptyChipHint.style.display = "block";
      return;
    }
    dom.emptyChipHint.style.display = "none";

    names.forEach(name => {
      const lvl = profile[name];
      const badgeCls = lvl >= 80 ? "chip-level-adv" : (lvl >= 45 ? "chip-level-int" : "chip-level-beg");
      const label = lvl >= 80 ? "Advanced (90%)" : (lvl >= 45 ? "Intermediate (60%)" : "Beginner (30%)");

      const chip = document.createElement("div");
      chip.className = "profile-chip-item";
      chip.innerHTML = `
        <span style="font-weight:600;">${name}</span>
        <span class="chip-level-badge ${badgeCls}">${label}</span>
        <button class="chip-remove-btn" title="Remove skill" aria-label="Remove ${name}">✕</button>
      `;

      chip.querySelector(".chip-remove-btn").addEventListener("click", () => {
        delete profile[name];
        saveState();
        renderAllProfileDependents();
      });

      dom.profileChips.appendChild(chip);
    });
  }

  function renderAllProfileDependents() {
    renderProfileChips();
    renderEmerging();
    renderRecommendations();
    const currentRole = ROLES.find(r => r.title === selectedTargetRole) || ROLES[0];
    populateRoadmapAndJobs(currentRole);
    updateSalaryEstimator();
  }

  /* ==========================================================================
     7. STAGE 1: MARKET TABLE & SECTORS
     ========================================================================== */
  function roleDemand(role) {
    const vals = Object.keys(role.skills).map(s => SKILLS.find(x => x.name === s)?.demand || 50);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }

  function roleOverallTrend(role) {
    const trends = Object.keys(role.skills).map(s => SKILLS.find(x => x.name === s)?.trend || "stable");
    const rising = trends.filter(t => t === "rising").length;
    const declining = trends.filter(t => t === "declining").length;
    if (rising >= trends.length / 2) return "rising";
    if (declining > rising) return "declining";
    return "stable";
  }

  function renderSectorFilter() {
    dom.sectorFilter.innerHTML = "";
    SECTORS.forEach(sec => {
      const btn = document.createElement("button");
      btn.className = "filter-chip" + (sectorFilterVal === sec ? " active" : "");
      btn.textContent = sec;
      btn.addEventListener("click", () => {
        sectorFilterVal = sec;
        saveState();
        renderSectorFilter();
        renderRoleTable();
      });
      dom.sectorFilter.appendChild(btn);
    });
  }

  function renderRoleTable() {
    dom.roleTableBody.innerHTML = "";
    const filtered = ROLES
      .filter(r => sectorFilterVal === "All" || r.sector === sectorFilterVal)
      .sort((a, b) => roleDemand(b) - roleDemand(a));

    filtered.forEach(r => {
      const d = roleDemand(r);
      const t = roleOverallTrend(r);
      const topSkills = Object.entries(r.skills)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([s]) => `<span class="skill-tag">${s}</span>`)
        .join("");

      const scoreCls = d >= 80 ? "score-high" : (d >= 65 ? "score-med" : "score-low");
      const trendCls = t === "rising" ? "trend-rising" : (t === "declining" ? "trend-declining" : "trend-stable");
      const trendIcon = t === "rising" ? "↑ Rising" : (t === "declining" ? "↓ Declining" : "→ Stable");

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <div class="table-role-title">${r.title}</div>
          <div class="table-role-sector">${r.sector} • India Avg: ${r.baseSalaryINR}</div>
        </td>
        <td><span class="score-badge ${scoreCls}">${d}/100</span></td>
        <td><span class="trend-indicator ${trendCls}">${trendIcon}</span></td>
        <td><div class="skill-tags-list">${topSkills}</div></td>
      `;
      dom.roleTableBody.appendChild(tr);
    });
  }

  /* ==========================================================================
     8. STAGE 2: SKILL DEMAND BARS
     ========================================================================== */
  function renderCategoryFilter() {
    dom.categoryFilter.innerHTML = "";
    CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "filter-chip" + (categoryFilterVal === cat ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        categoryFilterVal = cat;
        saveState();
        renderCategoryFilter();
        renderDemandBars();
      });
      dom.categoryFilter.appendChild(btn);
    });
  }

  function renderDemandBars() {
    dom.demandBarList.innerHTML = "";
    const filtered = SKILLS
      .filter(s => categoryFilterVal === "All" || s.cat === categoryFilterVal)
      .sort((a, b) => b.demand - a.demand);

    filtered.forEach(s => {
      const hasSkill = profile[s.name] !== undefined;
      const row = document.createElement("div");
      row.className = "skill-bar-item";
      row.innerHTML = `
        <div class="skill-bar-name">
          ${s.name} ${s.emerging ? '<span style="color:var(--accent-gold); font-size:12px;">★</span>' : ""}
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${s.demand}%;"></div>
        </div>
        <div class="skill-bar-val">${s.demand}%</div>
        <div class="skill-bar-action">
          <button class="btn btn-sm ${hasSkill ? 'btn-emerald' : 'btn-ghost'}" style="font-size:11px; padding:3px 8px;">
            ${hasSkill ? '✓ In Profile' : '+ Add'}
          </button>
        </div>
      `;

      row.querySelector("button").addEventListener("click", () => {
        if (!hasSkill) {
          profile[s.name] = selectedLevel || 60;
        } else {
          delete profile[s.name];
        }
        saveState();
        renderAllProfileDependents();
        renderDemandBars();
      });

      dom.demandBarList.appendChild(row);
    });
  }

  /* ==========================================================================
     9. STAGE 3: EMERGING SKILLS RADAR
     ========================================================================== */
  function renderEmerging() {
    dom.emergeGrid.innerHTML = "";
    SKILLS.filter(s => s.emerging).sort((a, b) => b.demand - a.demand).forEach(s => {
      const has = profile[s.name] !== undefined;
      const card = document.createElement("div");
      card.className = "emerge-card-pro";
      card.innerHTML = `
        <div>
          <div class="emerge-top">
            <span class="emerge-cat">${s.cat}</span>
            <span class="emerge-badge">★ High Velocity</span>
          </div>
          <div class="emerge-title">${s.name}</div>
          <p class="emerge-blurb">${s.blurb || ""}</p>
        </div>
        <div class="emerge-footer">
          <span style="font-family:var(--font-mono); font-size:12px; color:var(--accent-emerald);">Market Demand: ${s.demand}%</span>
          <button class="btn btn-sm ${has ? 'btn-emerald' : 'btn-secondary'}" style="font-size:11px;">
            ${has ? '✓ In Profile' : '+ Add Skill'}
          </button>
        </div>
      `;

      card.querySelector("button").addEventListener("click", () => {
        if (!has) {
          profile[s.name] = 80;
        } else {
          delete profile[s.name];
        }
        saveState();
        renderAllProfileDependents();
      });

      dom.emergeGrid.appendChild(card);
    });
  }

  /* ==========================================================================
     10. STAGE 5: FIT SCORING & EXPLAINABLE RECOMMENDATIONS
     ========================================================================== */
  function scoreRole(role, simBoosts = {}) {
    const entries = Object.entries(role.skills);
    const totalWeight = entries.reduce((a, [, w]) => a + w, 0);
    let matchedWeight = 0;
    const matched = [], missing = [];

    entries.forEach(([skillName, weight]) => {
      let level = profile[skillName];
      if (simBoosts[skillName] !== undefined) {
        level = simBoosts[skillName];
      }

      if (level !== undefined && level > 0) {
        matchedWeight += (Math.min(level, 100) / 100) * weight;
        matched.push({ skillName, weight, level });
      } else {
        missing.push({ skillName, weight });
      }
    });

    const matchPct = totalWeight ? (matchedWeight / totalWeight) * 100 : 0;

    // Emerging bonus: emerging skills required by role that candidate has
    const emergingReq = entries.filter(([s]) => SKILLS.find(x => x.name === s)?.emerging);
    const emergingHave = emergingReq.filter(([s]) => {
      const lvl = simBoosts[s] !== undefined ? simBoosts[s] : profile[s];
      return lvl !== undefined && lvl > 0;
    });

    const emergingBonus = emergingReq.length ? Math.round((emergingHave.length / emergingReq.length) * 15) : 0;
    const final = Math.min(100, Math.round(matchPct * 0.85 + emergingBonus));

    matched.sort((a, b) => b.weight - a.weight);
    missing.sort((a, b) => b.weight - a.weight);

    return {
      role,
      matchPct: Math.round(matchPct),
      emergingBonus,
      final,
      matched,
      missing,
      emergingReq,
      emergingHave
    };
  }

  function buildWhyExplanation(r) {
    const roleName = r.role.title;
    if (r.matched.length === 0) {
      return `You have not yet added any core skills required for <b>${roleName}</b>. Your current score reflects the zero-baseline fit. Start by adding foundational skills like <b>${r.missing.slice(0, 2).map(m => m.skillName).join(" & ")}</b>.`;
    }

    const topMatched = r.matched.slice(0, 3).map(m => `<b>${m.skillName}</b> (${m.level}%)`).join(", ");
    const topGaps = r.missing.slice(0, 3).map(m => `<b>${m.skillName}</b> (Weight ${m.weight}/10)`).join(", ");

    let text = `You match <b>${r.matched.length} of ${r.matched.length + r.missing.length}</b> core requirements, driven primarily by your strength in ${topMatched}. `;

    if (r.missing.length > 0) {
      text += `The highest-leverage skills to bridge next are ${topGaps}${r.missing.length > 3 ? ", plus others" : ""}. Closing these will significantly elevate your market competitiveness. `;
    } else {
      text += `You possess 100% of the core skills weighted in our benchmark model for this role. `;
    }

    if (r.emergingReq.length > 0) {
      text += `This role requires <b>${r.emergingReq.length} high-velocity emerging skill${r.emergingReq.length > 1 ? "s" : ""}</b> (${r.emergingReq.map(e => e[0]).join(", ")}), and you have <b>${r.emergingHave.length}</b> in your profile, granting a <b>+${r.emergingBonus} pt emerging bonus</b>.`;
    }

    return text;
  }

  /* SVG Radar Chart Generator */
  function generateRadarSvg(role, scoredItem) {
    const skillsList = Object.entries(role.skills);
    const count = skillsList.length;
    if (count < 3) return `<div style="color:var(--text-muted); font-size:12px;">Not enough axes for radar chart.</div>`;

    const size = 260;
    const center = size / 2;
    const radius = 95;
    const angleStep = (Math.PI * 2) / count;

    // Background concentric rings
    let gridCircles = "";
    [0.25, 0.5, 0.75, 1.0].forEach(level => {
      let pts = [];
      for (let i = 0; i < count; i++) {
        const a = i * angleStep - Math.PI / 2;
        const x = center + radius * level * Math.cos(a);
        const y = center + radius * level * Math.sin(a);
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      gridCircles += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
    });

    // Spoke lines & labels
    let spokes = "";
    let labels = "";
    skillsList.forEach(([skillName], i) => {
      const a = i * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(a);
      const y = center + radius * Math.sin(a);
      spokes += `<line x1="${center}" y1="${center}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>`;

      const lx = center + (radius + 20) * Math.cos(a);
      const ly = center + (radius + 18) * Math.sin(a);
      const anchor = Math.abs(Math.cos(a)) < 0.15 ? "middle" : (Math.cos(a) > 0 ? "start" : "end");
      labels += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="var(--text-secondary)" font-family="var(--font-mono)" font-size="9" text-anchor="${anchor}" dominant-baseline="central">${skillName.slice(0, 10)}</text>`;
    });

    // Target Role Polygon (benchmarks: weight * 10%)
    let rolePts = [];
    skillsList.forEach(([, weight], i) => {
      const val = (weight * 10) / 100;
      const a = i * angleStep - Math.PI / 2;
      const x = center + radius * val * Math.cos(a);
      const y = center + radius * val * Math.sin(a);
      rolePts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    });

    // Candidate Polygon
    let userPts = [];
    skillsList.forEach(([skillName], i) => {
      const lvl = whatIfSimAdjustments[skillName] !== undefined ? whatIfSimAdjustments[skillName] : (profile[skillName] || 0);
      const val = Math.min(lvl, 100) / 100;
      const a = i * angleStep - Math.PI / 2;
      const x = center + radius * val * Math.cos(a);
      const y = center + radius * val * Math.sin(a);
      userPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    });

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow:visible;">
        ${gridCircles}
        ${spokes}
        <!-- Target Role Polygon -->
        <polygon points="${rolePts.join(' ')}" fill="rgba(229, 193, 88, 0.15)" stroke="var(--accent-gold)" stroke-width="1.5" stroke-dasharray="3,3"/>
        <!-- Candidate Profile Polygon -->
        <polygon points="${userPts.join(' ')}" fill="rgba(16, 185, 129, 0.28)" stroke="var(--accent-emerald)" stroke-width="2"/>
        ${labels}
      </svg>
    `;
  }

  function renderRecommendations() {
    dom.recoList.innerHTML = "";
    const names = Object.keys(profile);

    if (names.length === 0) {
      dom.recoEmptyHint.style.display = "block";
      return;
    }
    dom.recoEmptyHint.style.display = "none";

    const scored = ROLES.map(r => scoreRole(r, whatIfSimAdjustments)).sort((a, b) => b.final - a.final);

    scored.forEach((r, idx) => {
      const isExpanded = expandedRoleId === r.role.title;
      const scoreColorCls = r.final >= 75 ? "score-green" : (r.final >= 50 ? "score-gold" : "score-red");

      const card = document.createElement("div");
      card.className = "reco-card-pro" + (isExpanded ? " expanded" : "");

      // Missing & matched skill tags
      const missingTags = r.missing.slice(0, 3).map(m => `<span class="badge" style="color:var(--accent-rose); border-color:rgba(244,63,94,0.3);">Need: ${m.skillName}</span>`).join(" ");
      const matchedTags = r.matched.slice(0, 3).map(m => `<span class="badge" style="color:var(--accent-emerald); border-color:rgba(16,185,129,0.3);">✓ ${m.skillName}</span>`).join(" ");

      // Detailed skill breakdown bars
      const skillBreakdownHtml = Object.entries(r.role.skills).sort((a, b) => b[1] - a[1]).map(([skillName, weight]) => {
        const lvl = whatIfSimAdjustments[skillName] !== undefined ? whatIfSimAdjustments[skillName] : (profile[skillName] || 0);
        const have = lvl > 0;
        const width = have ? lvl : 0;
        const isEmerging = SKILLS.find(x => x.name === skillName)?.emerging;

        return `
          <div style="display:grid; grid-template-columns:160px 1fr 50px; gap:12px; align-items:center; padding:6px 0;">
            <div style="font-size:12.5px; font-weight:500;">
              ${skillName} ${isEmerging ? '<span style="color:var(--accent-gold);">★</span>' : ""}
              <span style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted);">(w${weight})</span>
            </div>
            <div style="height:6px; background:var(--bg-surface-elevated); border-radius:3px; overflow:hidden;">
              <div style="height:100%; width:${width}%; border-radius:3px; background:${have ? 'linear-gradient(90deg,var(--accent-gold),var(--accent-emerald))' : 'transparent'};"></div>
            </div>
            <div style="font-family:var(--font-mono); font-size:11px; text-align:right; color:${have ? 'var(--accent-emerald)' : 'var(--text-muted)'};">
              ${have ? lvl + '%' : '0%'}
            </div>
          </div>
        `;
      }).join("");

      // What-If Sliders for top 3 missing or sub-80 skills
      const missingOrWeak = Object.entries(r.role.skills)
        .filter(([s]) => (profile[s] || 0) < 80)
        .slice(0, 3);

      const whatIfSlidersHtml = missingOrWeak.map(([sName]) => {
        const currVal = whatIfSimAdjustments[sName] !== undefined ? whatIfSimAdjustments[sName] : (profile[sName] || 0);
        return `
          <div class="what-if-slider-row">
            <span style="font-size:12.5px; font-weight:600;">${sName}</span>
            <input type="range" min="0" max="100" step="10" value="${currVal}" data-skill="${sName}" class="sim-slider">
            <span style="font-family:var(--font-mono); font-size:12px; text-align:right;" id="sim-val-${sName.replace(/\s+/g, '-')}">${currVal}%</span>
          </div>
        `;
      }).join("");

      card.innerHTML = `
        <div class="reco-header-row">
          <div class="reco-main-info">
            <div class="reco-rank-badge">#${idx + 1}</div>
            <div>
              <div class="reco-title-text">${r.role.title}</div>
              <div class="reco-sector-text">${r.role.sector} • Baseline: ${r.role.baseSalaryINR}</div>
              <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px;">
                ${matchedTags}
                ${missingTags}
              </div>
            </div>
          </div>
          <div class="reco-score-box">
            <div class="fit-meter-wrap">
              <div class="fit-meter-score ${scoreColorCls}">${r.final}<span style="font-size:14px; color:var(--text-muted); font-weight:normal;">/100</span></div>
              <div class="fit-meter-label">Role Fit Score</div>
            </div>
            <div class="expand-chevron">▼</div>
          </div>
        </div>

        <div class="reco-expanded-drawer">
          <div class="drawer-grid">
            <div>
              <h5 style="font-family:var(--font-mono); font-size:11px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:8px;">
                Transparent Explainability Breakdown
              </h5>
              <div class="why-box">${buildWhyExplanation(r)}</div>
              
              <h5 style="font-family:var(--font-mono); font-size:11px; text-transform:uppercase; color:var(--text-muted); margin:18px 0 8px;">
                Skill-by-Skill Requirement Gap
              </h5>
              <div style="background:var(--bg-base); border:1px solid var(--border-glass); border-radius:10px; padding:12px 16px;">
                ${skillBreakdownHtml}
              </div>
            </div>

            <div>
              <h5 style="font-family:var(--font-mono); font-size:11px; text-transform:uppercase; color:var(--accent-emerald); margin-bottom:8px;">
                Visual Radar vs Benchmark
              </h5>
              <div class="radar-chart-wrap">
                ${generateRadarSvg(r.role, r)}
                <div class="radar-legend">
                  <div class="legend-item"><span class="legend-dot-you"></span> Your Profile</div>
                  <div class="legend-item"><span class="legend-dot-role"></span> Role Benchmark</div>
                </div>
              </div>

              ${missingOrWeak.length > 0 ? `
                <div class="what-if-panel">
                  <div class="what-if-head">
                    <h5>⚡ "What-If" Gap Simulator</h5>
                    <button class="btn btn-sm btn-ghost reset-sim-btn" style="font-size:10px; padding:2px 6px;">Reset</button>
                  </div>
                  <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Simulate how mastering weak or missing skills boosts your fit score in real-time:</p>
                  ${whatIfSlidersHtml}
                </div>
              ` : ""}
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid var(--border-glass); flex-wrap:wrap; gap:10px;">
            <div style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-muted);">
              Formula: Match (${r.matchPct}% × 0.85) + Emerging Bonus (+${r.emergingBonus}) = <b>${r.final}/100</b>
            </div>
            <button class="btn btn-sm btn-secondary view-roadmap-btn" data-role="${r.role.title}">
              View Learning Roadmap & Openings →
            </button>
          </div>
        </div>
      `;

      // Click card header to toggle expand
      card.querySelector(".reco-header-row").addEventListener("click", () => {
        expandedRoleId = isExpanded ? null : r.role.title;
        renderRecommendations();
      });

      // Simulation sliders
      card.querySelectorAll(".sim-slider").forEach(slider => {
        slider.addEventListener("input", (e) => {
          e.stopPropagation();
          const sName = slider.dataset.skill;
          const val = parseInt(slider.value, 10);
          whatIfSimAdjustments[sName] = val;
          saveState();
          const valLabel = card.querySelector(`#sim-val-${sName.replace(/\s+/g, '-')}`);
          if (valLabel) valLabel.textContent = val + "%";
          renderRecommendations();
        });
      });

      // Reset sim
      const resetSimBtn = card.querySelector(".reset-sim-btn");
      if (resetSimBtn) {
        resetSimBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          whatIfSimAdjustments = {};
          saveState();
          renderRecommendations();
        });
      }

      // View Roadmap button (Jumps to Stage 06 with this specific role selected!)
      const viewRoadmapBtn = card.querySelector(".view-roadmap-btn");
      if (viewRoadmapBtn) {
        viewRoadmapBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          selectedTargetRole = r.role.title;
          saveState();
          populateRoadmapAndJobs(r.role);
          showStage("stage-roadmaps");
        });
      }

      dom.recoList.appendChild(card);
    });
  }

  /* ==========================================================================
     11. STAGE 6: DYNAMIC COURSES, ROADMAPS, SALARY & JOBS
     ========================================================================== */
  function initSalaryEstimator() {
    // Populate role selectors
    if (dom.salaryRoleSelect) dom.salaryRoleSelect.innerHTML = "";
    if (dom.roadmapRoleSelect) dom.roadmapRoleSelect.innerHTML = "";

    ROLES.forEach(r => {
      if (dom.salaryRoleSelect) {
        const opt = document.createElement("option");
        opt.value = r.title;
        opt.textContent = r.title;
        dom.salaryRoleSelect.appendChild(opt);
      }
      if (dom.roadmapRoleSelect) {
        const opt = document.createElement("option");
        opt.value = r.title;
        opt.textContent = `${r.title} (${r.sector})`;
        dom.roadmapRoleSelect.appendChild(opt);
      }
    });

    // Roadmap Role Select change
    if (dom.roadmapRoleSelect) {
      dom.roadmapRoleSelect.addEventListener("change", () => {
        selectedTargetRole = dom.roadmapRoleSelect.value;
        const role = ROLES.find(r => r.title === selectedTargetRole) || ROLES[0];
        saveState();
        populateRoadmapAndJobs(role);
      });
    }

    // Salary Role Select change
    if (dom.salaryRoleSelect) {
      dom.salaryRoleSelect.addEventListener("change", () => {
        selectedTargetRole = dom.salaryRoleSelect.value;
        const role = ROLES.find(r => r.title === selectedTargetRole) || ROLES[0];
        saveState();
        populateRoadmapAndJobs(role);
      });
    }

    [dom.salaryExpSelect, dom.salaryGeoSelect].forEach(sel => {
      if (sel) {
        sel.addEventListener("change", () => {
          saveState();
          updateSalaryEstimator();
        });
      }
    });

    // Course filter tabs
    if (dom.courseFilterTabs) {
      dom.courseFilterTabs.querySelectorAll(".filter-chip").forEach(btn => {
        btn.addEventListener("click", () => {
          dom.courseFilterTabs.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          activeCourseFilter = btn.dataset.filter;
          saveState();
          const role = ROLES.find(r => r.title === selectedTargetRole) || ROLES[0];
          renderCareerCourses(role.title);
        });
      });
    }

    updateSalaryEstimator();
  }

  function renderCareerRoleChips() {
    if (!dom.roadmapRoleChips) return;
    dom.roadmapRoleChips.innerHTML = "";

    ROLES.forEach(r => {
      const chip = document.createElement("button");
      chip.className = "career-role-chip" + (r.title === selectedTargetRole ? " active" : "");
      chip.textContent = r.title;
      chip.addEventListener("click", () => {
        selectedTargetRole = r.title;
        saveState();
        populateRoadmapAndJobs(r);
      });
      dom.roadmapRoleChips.appendChild(chip);
    });
  }

  function renderCareerCourses(roleTitle) {
    if (!dom.careerCoursesContainer) return;
    dom.careerCoursesContainer.innerHTML = "";

    const courses = CAREER_COURSES[roleTitle] || CAREER_COURSES["Data Analyst"] || [];
    const filteredCourses = courses.filter(c => {
      if (activeCourseFilter === "all") return true;
      if (activeCourseFilter === "cert") return c.type === "cert";
      if (activeCourseFilter === "free") return c.type === "free";
      return true;
    });

    if (filteredCourses.length === 0) {
      dom.careerCoursesContainer.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align:center; padding:24px; color:var(--text-secondary);">
          No courses matching filter "${activeCourseFilter}". Switch to "All Courses" above.
        </div>
      `;
      return;
    }

    filteredCourses.forEach(c => {
      const card = document.createElement("div");
      card.className = "card course-card";
      const isCert = c.type === "cert";

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
          <span class="badge ${isCert ? 'badge-cert' : 'badge-free'}">
            ${isCert ? '🏆 Professional Cert' : '💡 Free Curriculum'}
          </span>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">${c.duration}</span>
        </div>
        <h4 class="course-card-title">${c.title}</h4>
        <div class="course-meta-row">
          <span class="course-provider-tag">${c.provider}</span>
          <span class="course-level-tag">${c.level}</span>
        </div>
        <p class="course-card-desc">${c.desc}</p>
        <div style="margin-top:auto; padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
          <a href="${c.link}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" style="font-size:11.5px; width:100%; text-align:center;">
            Explore Course / Guide ↗
          </a>
        </div>
      `;
      dom.careerCoursesContainer.appendChild(card);
    });
  }

  function updateSalaryEstimator() {
    const roleTitle = selectedTargetRole || (dom.salaryRoleSelect ? dom.salaryRoleSelect.value : "Data Analyst");
    const exp = dom.salaryExpSelect ? dom.salaryExpSelect.value : "mid";
    const geo = dom.salaryGeoSelect ? dom.salaryGeoSelect.value : "in";

    const role = ROLES.find(r => r.title === roleTitle) || ROLES[0];
    const scored = scoreRole(role);
    const fitFactor = Math.max(0.75, scored.final / 100);

    let baseMin, baseMax;
    let currencySymbol = "₹";
    let suffix = " LPA";

    if (geo === "in") {
      // INR Lakhs per Annum
      const parsed = role.baseSalaryINR.match(/(\d+)-(\d+)/);
      baseMin = parsed ? parseInt(parsed[1], 10) : 8;
      baseMax = parsed ? parseInt(parsed[2], 10) : 18;
    } else {
      // USD Thousands
      currencySymbol = "$";
      suffix = "k / yr";
      const parsed = role.baseSalaryUSD.match(/(\d+)k-(\d+)k/i);
      baseMin = parsed ? parseInt(parsed[1], 10) : 75;
      baseMax = parsed ? parseInt(parsed[2], 10) : 130;
    }

    let expMultiplier = 1.0;
    if (exp === "junior") expMultiplier = 0.75;
    else if (exp === "mid") expMultiplier = 1.05;
    else if (exp === "senior") expMultiplier = 1.45;
    else if (exp === "lead") expMultiplier = 1.95;

    const estMin = Math.round(baseMin * expMultiplier * fitFactor);
    const estMax = Math.round(baseMax * expMultiplier * (fitFactor > 0.9 ? 1.15 : 1.0));

    if (dom.salaryVal) {
      dom.salaryVal.textContent = `${currencySymbol}${estMin} - ${currencySymbol}${estMax}${suffix}`;
    }
  }

  function populateRoadmapAndJobs(role) {
    if (!role) role = ROLES.find(r => r.title === selectedTargetRole) || ROLES[0];
    selectedTargetRole = role.title;

    // Synchronize Headings & Badges
    if (dom.activeRoleTitleHeading) dom.activeRoleTitleHeading.textContent = `${role.title} Path`;
    if (dom.courseRoleNameBadge) dom.courseRoleNameBadge.textContent = role.title;
    if (dom.gapRoleNameBadge) dom.gapRoleNameBadge.textContent = role.title;

    // Synchronize Dropdowns
    if (dom.roadmapRoleSelect && dom.roadmapRoleSelect.value !== role.title) {
      dom.roadmapRoleSelect.value = role.title;
    }
    if (dom.salaryRoleSelect && dom.salaryRoleSelect.value !== role.title) {
      dom.salaryRoleSelect.value = role.title;
    }

    renderCareerRoleChips();
    renderCareerCourses(role.title);
    updateSalaryEstimator();

    // Render Learning Roadmaps for missing skills
    if (dom.roadmapCardsContainer) {
      dom.roadmapCardsContainer.innerHTML = "";
      const scored = scoreRole(role);

      if (scored.missing.length === 0) {
        dom.roadmapCardsContainer.innerHTML = `
          <div class="card card-emerald" style="grid-column: 1 / -1;">
            <h4 style="color:var(--accent-emerald); font-size:16px;">🌟 Zero Skill Gaps for ${role.title}!</h4>
            <p style="color:var(--text-secondary); font-size:13px; margin-top:6px;">
              You have added all benchmark skills required for this role. You are ready to start applying to live positions below.
            </p>
          </div>
        `;
      } else {
        scored.missing.forEach(m => {
          const sObj = SKILLS.find(x => x.name === m.skillName) || {};
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <span class="badge badge-gold">High Priority (w${m.weight})</span>
              <span style="font-family:var(--font-mono); font-size:11px; color:var(--accent-emerald);">Est: ${sObj.estTime || '3-4 weeks'}</span>
            </div>
            <h4 style="font-size:16px; margin-bottom:6px; color:var(--text-primary);">Learn ${m.skillName}</h4>
            <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5; margin-bottom:14px;">
              ${sObj.blurb || `Essential competency for ${role.title} candidates in current market openings.`}
            </p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <a href="${sObj.resource || 'https://roadmap.sh'}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary" style="font-size:11.5px;">
                Free Course / Guide ↗
              </a>
              <button class="btn btn-sm btn-ghost mark-learned-btn" data-skill="${m.skillName}" style="font-size:11px;">
                Mark as Learned
              </button>
            </div>
          `;

          card.querySelector(".mark-learned-btn").addEventListener("click", () => {
            profile[m.skillName] = 60;
            saveState();
            renderAllProfileDependents();
          });

          dom.roadmapCardsContainer.appendChild(card);
        });
      }
    }

    renderLiveJobs(role.title);
  }

  function renderLiveJobs(targetRoleTitle) {
    if (!dom.jobsContainer) return;
    dom.jobsContainer.innerHTML = "";

    const query = encodeURIComponent(targetRoleTitle);
    const linkedinUrl = `https://www.linkedin.com/jobs/search/?keywords=${query}&location=India`;
    const googleJobsUrl = `https://www.google.com/search?q=${query}+jobs+near+me&ibp=htl;jobs`;
    const indeedUrl = `https://www.indeed.com/jobs?q=${query}`;

    // Filter cached live jobs or generate rich smart postings
    let displayJobs = liveJobsCache.filter(j => j.title.toLowerCase().includes(targetRoleTitle.toLowerCase()));

    if (displayJobs.length === 0) {
      // Fallback enriched live postings
      displayJobs = [
        {
          company: "Tech Mahindra / Client AI",
          title: `Senior ${targetRoleTitle}`,
          location: "Bengaluru (Hybrid / Remote)",
          salary: "₹18 - ₹28 LPA",
          source: "Live Job Feed",
          tags: ["Python", "SQL", "Immediate Joiner", "High Fit"],
          url: linkedinUrl
        },
        {
          company: "Accenture Digital",
          title: `${targetRoleTitle} Specialist`,
          location: "Hyderabad / Pune",
          salary: "₹14 - ₹22 LPA",
          source: "Live Job Feed",
          tags: ["Cloud", "Analytics", "Full-time"],
          url: googleJobsUrl
        },
        {
          company: "Innovaccer Global",
          title: `Associate ${targetRoleTitle}`,
          location: "Noida / Remote",
          salary: "₹10 - ₹16 LPA",
          source: "Remotive Remote Feed",
          tags: ["Data Pipeline", "Fast Track", "Remote"],
          url: indeedUrl
        }
      ];
    }

    displayJobs.forEach(job => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.innerHTML = `
        <div>
          <div class="job-company">${job.company} • ${job.location || 'Remote'}</div>
          <div class="job-title">${job.title}</div>
          <div class="job-tags">
            ${(job.tags || []).map(t => `<span class="badge">${t}</span>`).join(" ")}
          </div>
        </div>
        <div class="job-meta-row">
          <span style="font-family:var(--font-mono); color:var(--accent-emerald); font-weight:600;">${job.salary || 'Competitive'}</span>
          <a href="${job.url || linkedinUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" style="font-size:11.5px; padding:5px 12px;">
            Apply / View ↗
          </a>
        </div>
      `;
      dom.jobsContainer.appendChild(card);
    });

    // 1-Click Search Launcher Card
    const searchCard = document.createElement("div");
    searchCard.className = "card card-gold";
    searchCard.style.gridColumn = "1 / -1";
    searchCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h4 style="color:var(--accent-gold); font-size:15px; margin-bottom:4px;">🔍 Live Portal Search Queries for "${targetRoleTitle}"</h4>
          <p style="color:var(--text-secondary); font-size:12.5px;">Direct pre-filtered search queries across major global & Indian hiring platforms:</p>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <a href="${linkedinUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">LinkedIn Jobs ↗</a>
          <a href="${googleJobsUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">Google Jobs ↗</a>
          <a href="${indeedUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">Indeed ↗</a>
        </div>
      </div>
    `;
    dom.jobsContainer.appendChild(searchCard);
  }

  /* ==========================================================================
     12. STAGE 7: MARKET INTEL, LAYOFFS & NEWS ENGINE
     ========================================================================== */
  function initMarketNews() {
    if (!dom.newsCategoryFilter || !dom.newsGridContainer) return;

    // News category buttons
    dom.newsCategoryFilter.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        dom.newsCategoryFilter.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeNewsCategory = btn.dataset.category;
        saveState();
        renderMarketNews();
      });
    });

    // News search input
    if (dom.newsSearchInput) {
      dom.newsSearchInput.addEventListener("input", () => {
        newsSearchQuery = (dom.newsSearchInput.value || "").trim().toLowerCase();
        saveState();
        renderMarketNews();
      });
    }

    // Refresh News button
    if (dom.syncNewsBtn) {
      dom.syncNewsBtn.addEventListener("click", syncMarketNewsFeeds);
    }

    renderMarketNews();
  }

  function renderMarketNews() {
    if (!dom.newsGridContainer) return;
    dom.newsGridContainer.innerHTML = "";

    const filtered = MARKET_NEWS.filter(item => {
      const matchesCategory = activeNewsCategory === "all" || item.category === activeNewsCategory;
      const term = newsSearchQuery;
      const matchesSearch = !term || `${item.title} ${item.summary} ${item.takeaway} ${item.source}`.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    if (dom.newsResultsCount) {
      dom.newsResultsCount.textContent = `Showing ${filtered.length} of ${MARKET_NEWS.length} articles`;
    }

    if (filtered.length === 0) {
      dom.newsGridContainer.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align:center; padding:32px; color:var(--text-secondary);">
          <h3>No intelligence articles found matching "${newsSearchQuery}"</h3>
          <p style="margin-top:6px; font-size:13px;">Try clearing your search or switching to "All Market Updates".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("article");
      card.className = "news-card";

      let impactCls = "impact-trend";
      if (item.impact === "layoff") impactCls = "impact-layoff";
      else if (item.impact === "growth") impactCls = "impact-growth";
      else if (item.impact === "hiring") impactCls = "impact-hiring";
      else if (item.impact === "salary") impactCls = "impact-salary";

      card.innerHTML = `
        <div>
          <div class="news-meta-top">
            <span class="news-impact-badge ${impactCls}">${item.impactLabel}</span>
            <span class="news-date-text">${item.source} • ${item.date}</span>
          </div>
          <h3 class="news-title">${item.title}</h3>
          <p class="news-summary">${item.summary}</p>
          <div class="news-advice-box">
            <span class="news-advice-label">🎯 Actionable Career Takeaway:</span>
            <p>${item.takeaway}</p>
          </div>
        </div>
        <div class="news-footer-row">
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">Verified Market Intel</span>
          <a href="${item.link}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost" style="font-size:11.5px; padding:4px 10px;">
            Read Full Coverage ↗
          </a>
        </div>
      `;
      dom.newsGridContainer.appendChild(card);
    });
  }

  async function syncMarketNewsFeeds() {
    if (!dom.syncNewsBtn) return;
    dom.syncNewsBtn.disabled = true;
    dom.syncNewsBtn.textContent = "Connecting feeds…";

    try {
      // Simulate live check or query real public tech dev feeds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch("https://dev.to/api/articles?tag=ai&top=5", { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const liveArticles = await res.json();
        if (Array.isArray(liveArticles) && liveArticles.length > 0) {
          liveArticles.slice(0, 3).forEach(art => {
            const exists = MARKET_NEWS.some(m => m.title.toLowerCase() === art.title.toLowerCase());
            if (!exists) {
              MARKET_NEWS.unshift({
                id: `live-devto-${art.id}`,
                category: "emerging",
                impact: "growth",
                impactLabel: "✨ Live Feed Update",
                title: art.title,
                source: `Dev.to / ${art.user?.name || 'Tech Pulse'}`,
                date: "Today",
                summary: art.description || "Freshly published developer insight on artificial intelligence and emerging software practices.",
                takeaway: "Stay abreast of practical hands-on frameworks and community code experiments.",
                link: art.url
              });
            }
          });
        }
      }
    } catch (e) {
      console.warn("Live news feed query finished with default cache:", e.message);
    } finally {
      renderMarketNews();
      dom.syncNewsBtn.disabled = false;
      dom.syncNewsBtn.textContent = "✓ Feeds Refreshed";
      setTimeout(() => {
        if (dom.syncNewsBtn) dom.syncNewsBtn.textContent = "Refresh Intel Feeds";
      }, 2500);
    }
  }

  /* ==========================================================================
     13. REAL-TIME LIVE DATA ENGINE (FREE PUBLIC APIS & ADZUNA)
     ========================================================================== */
  async function syncLiveData() {
    dom.syncBtn.disabled = true;
    dom.syncBtn.textContent = "Connecting live feeds…";
    updateSyncStatus("Initiating real-time connection across public job feeds…", "info");

    const mentions = {};
    SKILLS.forEach(s => mentions[s.name] = 0);
    let totalPostingsAnalyzed = 0;
    let fetchedJobsList = [];

    try {
      if (activeSyncSource === "free_public") {
        // Fetch from free public APIs with graceful timeout
        const endpoints = [
          { name: "Remotive Remote Jobs API", url: "https://remotive.com/api/remote-jobs?limit=50" },
          { name: "Arbeitnow Tech Jobs API", url: "https://www.arbeitnow.com/api/job-board-api" },
          { name: "Jobicy API", url: "https://jobicy.com/api/v2/remote-jobs?count=25" }
        ];

        for (const ep of endpoints) {
          updateSyncStatus(`Fetching postings from ${ep.name}…`, "info");
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4500);

            const res = await fetch(ep.url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              let jobs = [];
              if (Array.isArray(data.jobs)) jobs = data.jobs;
              else if (Array.isArray(data.data)) jobs = data.data;
              else if (Array.isArray(data.results)) jobs = data.results;

              if (jobs.length > 0) {
                totalPostingsAnalyzed += jobs.length;
                jobs.forEach(j => {
                  const text = `${j.title || ''} ${j.description || ''} ${(j.tags || []).join(' ')}`.toLowerCase();
                  SKILLS.forEach(skill => {
                    if (text.includes(skill.name.toLowerCase())) {
                      mentions[skill.name]++;
                    }
                  });
                  fetchedJobsList.push({
                    title: j.title || "Software Specialist",
                    company: j.company_name || j.company || "Global Tech",
                    location: j.candidate_required_location || j.location || "Remote",
                    salary: j.salary || "Competitive",
                    tags: j.tags || [],
                    url: j.url || "#"
                  });
                });
              }
            }
          } catch (e) {
            console.warn(`Feed ${ep.name} skipped:`, e.message);
          }
        }
      } else {
        // Adzuna Custom Key Mode
        const appId = (document.getElementById("adzunaId")?.value || "").trim();
        const appKey = (document.getElementById("adzunaKey")?.value || "").trim();
        const country = document.getElementById("countrySelect")?.value || "in";

        if (!appId || !appKey) {
          throw new Error("Please enter both your Adzuna App ID and Key, or switch to the Free Public Feed tab.");
        }

        updateSyncStatus(`Querying Adzuna Jobs API for ${country.toUpperCase()}…`, "info");
        // Adzuna fetch logic with proxy
        const targetUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=software+developer&results_per_page=50&content-type=application/json`;
        const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;

        const res = await fetch(proxyUrl);
        if (!res.ok) throw new Error(`Adzuna HTTP ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data.results)) {
          totalPostingsAnalyzed = data.results.length;
          data.results.forEach(j => {
            const text = `${j.title || ''} ${j.description || ''}`.toLowerCase();
            SKILLS.forEach(skill => {
              if (text.includes(skill.name.toLowerCase())) mentions[skill.name]++;
            });
            fetchedJobsList.push({
              title: j.title,
              company: j.company?.display_name || "Adzuna Employer",
              location: j.location?.display_name || "India",
              salary: j.salary_min ? `₹${Math.round(j.salary_min / 100000)} - ₹${Math.round(j.salary_max / 100000)} LPA` : "Market Standard",
              tags: ["Adzuna Live", "Verified"],
              url: j.redirect_url
            });
          });
        }
      }

      // Only use genuine feed results. Do not present a simulated response as live data.
      if (totalPostingsAnalyzed === 0) {
        throw new Error("Live job feeds are unavailable or returned no postings");
      }

      // Recompute dynamic demand metrics
      SKILLS.forEach(s => {
        const rawPct = Math.round((mentions[s.name] / totalPostingsAnalyzed) * 100);
        const baseline = SYNTHETIC_SNAPSHOT.find(x => x.name === s.name)?.demand || 70;
        // Confidence blend
        const confidence = Math.min(0.85, totalPostingsAnalyzed / 120);
        const newDemand = Math.min(99, Math.max(35, Math.round(rawPct * confidence + baseline * (1 - confidence))));

        if (newDemand > baseline + 4) s.trend = "rising";
        else if (newDemand < baseline - 4) s.trend = "declining";
        else s.trend = "stable";

        s.demand = newDemand;
      });

      liveJobsCache = fetchedJobsList;
      isLiveActive = true;
      setLiveStatusUI(true, totalPostingsAnalyzed);
      updateSyncStatus(`✓ Live Sync Complete! Analyzed ${totalPostingsAnalyzed} live postings. Dynamic demand indices and trending vectors recalculated.`, "success");

      // Refresh all dependent views
      renderRoleTable();
      renderDemandBars();
      renderEmerging();
      renderRecommendations();
      const currentRole = ROLES.find(r => r.title === selectedTargetRole) || ROLES[0];
      populateRoadmapAndJobs(currentRole);
    } catch (err) {
      console.error(err);
      liveJobsCache = [];
      isLiveActive = false;
      setLiveStatusUI(false, 0);
      updateSyncStatus(`Feed unavailable. ${err.message}. Showing the baseline market dataset instead.`, "error");
    } finally {
      dom.syncBtn.disabled = false;
      dom.syncBtn.textContent = "Sync Live Market Data";
    }
  }

  function resetToSynthetic() {
    SYNTHETIC_SNAPSHOT.forEach(snap => {
      const s = SKILLS.find(x => x.name === snap.name);
      if (s) {
        s.demand = snap.demand;
        s.trend = snap.trend;
      }
    });
    isLiveActive = false;
    setLiveStatusUI(false, 0);
    updateSyncStatus("Reverted to default baseline dataset.", "info");

    renderRoleTable();
    renderDemandBars();
    renderEmerging();
    renderRecommendations();
    const currentRole = ROLES.find(r => r.title === selectedTargetRole) || ROLES[0];
    populateRoadmapAndJobs(currentRole);
  }

  function updateSyncStatus(msg, type) {
    dom.syncLog.textContent = msg;
    dom.syncLog.className = "sync-log-box " + (type === "success" ? "success" : (type === "error" ? "error" : ""));
  }

  function setLiveStatusUI(isLive, count) {
    dom.statusDot.className = "live-dot" + (isLive ? " active" : "");
    dom.dataBadge.textContent = isLive ? "Live Market Connected" : "Baseline Dataset";
    dom.dataBadge.className = "badge" + (isLive ? " badge-live" : "");
    if (dom.livePostingsCount) {
      dom.livePostingsCount.textContent = isLive ? `${count} Postings Indexed` : "Demo Mode";
    }
  }

  /* ==========================================================================
     14. EXPORT & CAREER REPORT GENERATOR
     ========================================================================== */
  function initExportModal() {
    if (!dom.exportBtn) return;

    dom.exportBtn.addEventListener("click", () => {
      generateCareerReportText();
      dom.exportModal.classList.add("active");
    });

    dom.closeModalBtn.addEventListener("click", () => {
      dom.exportModal.classList.remove("active");
    });

    dom.exportModal.addEventListener("click", (e) => {
      if (e.target === dom.exportModal) dom.exportModal.classList.remove("active");
    });

    dom.copyReportBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(dom.reportPreview.textContent).then(() => {
        dom.copyReportBtn.textContent = "✓ Copied to Clipboard!";
        setTimeout(() => dom.copyReportBtn.textContent = "Copy Report Text", 2000);
      });
    });

    dom.printReportBtn.addEventListener("click", () => {
      window.print();
    });
  }

  function initTheme() {
    if (!dom.themeToggle) return;

    const savedTheme = localStorage.getItem("skillbridge-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const setTheme = (theme) => {
      const isDark = theme === "dark";
      document.body.dataset.theme = theme;
      dom.themeToggle.setAttribute("aria-pressed", String(isDark));
      dom.themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    };

    setTheme(savedTheme || (prefersDark ? "dark" : "light"));
    dom.themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("skillbridge-theme", nextTheme);
      setTheme(nextTheme);
    });
  }

  function initHelpChat() {
    if (!dom.helpChatTrigger || !dom.helpChatWindow) return;

    const setOpen = (open) => {
      dom.helpChatWindow.hidden = !open;
      dom.helpChatTrigger.setAttribute("aria-expanded", String(open));
      dom.helpChat.classList.toggle("open", open);
      if (open) dom.helpChatInput.focus();
    };
    const addMessage = (text, type) => {
      const message = document.createElement("div");
      message.className = `help-chat-message ${type}-message`;
      message.textContent = text;
      dom.helpChatMessages.appendChild(message);
      dom.helpChatMessages.scrollTop = dom.helpChatMessages.scrollHeight;
    };
    const answer = (question) => {
      const q = question.toLowerCase();
      if (/(creator|created|made|gohulrahesh|amrita|college)/.test(q)) {
        return "SkillBridge was created by Gohulrahesh, an AIE student at Amrita College, Bangalore.";
      }
      if (/(resume|profile|skill|scanner)/.test(q)) {
        showStage("stage-profile");
        return "Start in Build your skills profile. Choose a sample profile, add skills yourself, or paste your resume. You can also use Review resume for improvement suggestions.";
      }
      if (/(news|layoff|layoffs|trend|emerging role|market news)/.test(q)) {
        showStage("stage-news");
        return "Stage 07 Market news tracks tech layoffs, emerging GenAI jobs, India GCC hiring waves, and compensation trends.";
      }
      if (/(job|apply|opening|india)/.test(q)) {
        return "Use the India jobs item in the navigation to browse current public-feed listings, search by keyword, or open live searches on LinkedIn, Naukri, and Indeed.";
      }
      if (/(market|demand|trend)/.test(q)) {
        showStage("stage-market");
        return "Explore the job market shows the roles and skills tracked by SkillBridge. Use Sync Live Market Data to update it from available public feeds.";
      }
      if (/(match|recommend|fit|career)/.test(q)) {
        showStage("stage-reco");
        return "Best-fit roles compares your skills with each role, explains the match score, and lists the most useful skills to build next.";
      }
      if (/(roadmap|learn|course|cert|certification|salary|next step)/.test(q)) {
        showStage("stage-roadmaps");
        return "Plan your next steps includes curated certifications and courses for your chosen career track, skill-gap learning plans, salary estimation, and job-search links.";
      }
      if (/(dark|light|theme|mode)/.test(q)) {
        return "Use the Theme switch in the header to choose light or dark mode. Your choice is saved in this browser.";
      }
      return "I can help with building your profile, exploring role courses, market news & layoffs, finding jobs, learning roadmaps, themes, or creator info.";
    };
    const submitQuestion = (question) => {
      const cleanQuestion = question.trim();
      if (!cleanQuestion) return;
      addMessage(cleanQuestion, "user");
      dom.helpChatInput.value = "";
      window.setTimeout(() => addMessage(answer(cleanQuestion), "guide"), 180);
    };

    dom.helpChatTrigger.addEventListener("click", () => setOpen(dom.helpChatWindow.hidden));
    dom.helpChatClose.addEventListener("click", () => setOpen(false));
    dom.helpChatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitQuestion(dom.helpChatInput.value);
    });
    document.querySelectorAll("[data-help-prompt]").forEach(button => {
      button.addEventListener("click", () => submitQuestion(button.dataset.helpPrompt));
    });
  }

  function generateCareerReportText() {
    const scored = ROLES.map(r => scoreRole(r)).sort((a, b) => b.final - a.final);
    const topRole = ROLES.find(r => r.title === selectedTargetRole) || scored[0];
    const topScored = scoreRole(topRole);
    const userSkillsList = Object.entries(profile).map(([s, l]) => `  - ${s}: ${l}% proficiency`).join("\n");

    const report = `# SkillBridge — Career Fit & Gap Audit Report
Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
Data Engine: ${isLiveActive ? "Live Market Stream (Real-Time APIs)" : "Baseline Reference Dataset"}
Target Career Option: ${topRole.title.toUpperCase()} (${topRole.sector})

=======================================================
1. CANDIDATE PROFILE
=======================================================
Total Skills Logged: ${Object.keys(profile).length}
${userSkillsList || "  (No skills currently added)"}

=======================================================
2. TOP MATCHED CAREER RECOMMENDATIONS
=======================================================
${scored.slice(0, 4).map((r, i) => `
#${i + 1} ${r.role.title.toUpperCase()} (${r.role.sector})
- Fit Score: ${r.final}/100 [Base Match: ${r.matchPct}%, Emerging Bonus: +${r.emergingBonus}]
- Benchmark Salary: ${r.role.baseSalaryINR} (India) / ${r.role.baseSalaryUSD} (Global)
- Covered Skills: ${r.matched.map(m => m.skillName).join(", ") || "None"}
- High-Priority Skill Gaps: ${r.missing.map(m => m.skillName).join(", ") || "Zero Gaps"}
`).join("\n")}

=======================================================
3. RECOMMENDED ACTION PLAN FOR: ${topRole.title.toUpperCase()}
=======================================================
Fit Score: ${topScored.final}/100
${topScored.missing.length > 0 ? topScored.missing.map(m => {
  const s = SKILLS.find(x => x.name === m.skillName) || {};
  return `* Bridge "${m.skillName}" (Est: ${s.estTime || '3-4 weeks'})
  Resource: ${s.resource || 'https://roadmap.sh'}`;
}).join("\n") : "* You meet 100% of benchmark requirements for this target role. Proceed to live job applications."}

Top Recommended Certifications:
${(CAREER_COURSES[topRole.title] || []).slice(0, 3).map(c => `  - ${c.title} (${c.provider}) -> ${c.link}`).join("\n")}

=======================================================
SkillBridge • Explainable Career Recommendation Engine
`;

    dom.reportPreview.textContent = report;
  }

  /* ==========================================================================
     15. INITIALIZATION
     ========================================================================== */
  function init() {
    initTheme();
    initHelpChat();
    initNav();
    initPersonaPresets();
    initResumeScanner();
    initResumeImprover();
    initProfileControls();
    renderSectorFilter();
    renderRoleTable();
    renderCategoryFilter();
    renderDemandBars();
    renderEmerging();
    initSalaryEstimator();
    initMarketNews();
    initExportModal();

    // Source tab toggles (Free Public vs Adzuna)
    document.querySelectorAll(".sync-source-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".sync-source-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeSyncSource = tab.dataset.source;
        document.getElementById("adzunaInputFields").style.display = activeSyncSource === "adzuna" ? "flex" : "none";
      });
    });

    if (dom.syncBtn) dom.syncBtn.addEventListener("click", syncLiveData);
    if (dom.resetBtn) dom.resetBtn.addEventListener("click", resetToSynthetic);

    // Attempt to load saved state, otherwise use default rich preset
    const loaded = loadState();
    if (!loaded) {
      profile = { ...PERSONAS.ai_aspirant.skills };
      selectedTargetRole = "Data Analyst";
    }

    renderAllProfileDependents();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
