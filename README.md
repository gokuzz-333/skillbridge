# SkillBridge 🚀

### Explainable Career Recommendation Engine

SkillBridge is an interactive web application that helps students and early-career professionals understand **which career paths best match their current skills**.

Instead of simply suggesting a job role, SkillBridge shows **why** a particular role is recommended by breaking the recommendation down skill-by-skill.

> **From job-market signals → skill demand → emerging skills → personal profile → explainable career recommendations.**

---

## ✨ Features

### 📊 1. Job-Market Data

Explore a collection of technology and analytics roles along with:

* Role demand scores
* Market trends
* Core skills required
* Sector-based filtering
* Role ranking based on skill demand

The prototype includes roles such as:

* Data Analyst
* Data Scientist
* Machine Learning Engineer
* Full Stack Developer
* DevOps Engineer
* Cybersecurity Analyst
* Product Manager
* UI/UX Designer
* Cloud Engineer
* Digital Marketing Analyst
* Business Analyst
* AI Solutions / Prompt Engineer

---

### 📈 2. Skill Demand Analysis

Skills are ranked according to their market demand.

Users can filter skills by categories such as:

* Programming
* Data
* Analytics
* AI/ML
* Cloud
* Security
* Design
* Product
* Soft Skills
* Marketing

The application displays demand scores using interactive visual bars.

---

### 🌱 3. Emerging Skills

SkillBridge identifies skills marked as **emerging** and gives them additional importance during recommendations.

Examples include:

* Generative AI Tooling
* Prompt Engineering
* Kubernetes
* Cloud Security
* MLOps

These skills receive an additional scoring bonus when they are already present in a user's profile.

---

### 👤 4. Personal Skill Profile

Users can build their own skill profile by selecting skills and assigning a proficiency level:

| Level        | Score |
| ------------ | ----: |
| Beginner     |    30 |
| Intermediate |    60 |
| Advanced     |    90 |

Skills can also be removed from the profile at any time.

The profile is stored only in the browser session and is used immediately to calculate recommendations.

---

### 🎯 5. Explainable Career Recommendations

SkillBridge ranks career roles according to how closely they match the user's profile.

Each recommendation provides:

* Overall fit score
* Matching skills
* Missing skills
* Skill weights
* Emerging-skill bonus
* Explanation of why the role received its score

Instead of giving a black-box recommendation, the application allows users to **trace the recommendation back to individual skills**.

---

## 🧮 Recommendation Algorithm

The application calculates a role's match score based on the skills required by that role and the user's proficiency.

### Match Score

```text
match% =
Σ(min(user skill level, 100) × role skill weight)
------------------------------------------------
Σ(role skill weights)
```

An emerging-skill bonus is then added.

The final score is calculated approximately as:

```text
Final Score = Match% × 0.85 + Emerging Skill Bonus
```

The result is capped at **100**.

The implementation gives an emerging-skill bonus of up to **15 points**.

---

## 🔄 Live Job-Market Sync

SkillBridge can optionally connect to the **Adzuna Jobs API** to retrieve current job postings.

The application:

1. Fetches job postings for the supported roles.
2. Searches job titles and descriptions for known skills.
3. Counts how frequently each skill appears.
4. Calculates the percentage of postings mentioning each skill.
5. Blends the live results with the built-in baseline dataset.
6. Updates skill demand and trend values.
7. Recalculates recommendations.

The application first attempts a direct API request and can fall back to public CORS relays when browser CORS restrictions prevent direct access.

> **Important:** For production deployment, a server-side proxy should be used instead of exposing API credentials or routing requests through public CORS proxies.

---

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript**
* **DOM Manipulation**
* **Adzuna Jobs API**
* **Responsive Web Design**
* **Client-side data processing**

The project is currently implemented as a single HTML file containing the HTML, CSS, JavaScript, data, UI logic, and recommendation algorithm.

---

## 📁 Project Structure

```text
SkillBridge/
│
├── index.html
└── README.md
```

The current prototype is intentionally lightweight and does not require a frontend framework.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gokuzz-333/skillbridge.git
```

### 2. Open the project

Navigate into the project directory:

```bash
cd skillbridge
```

### 3. Run the application

Since the project is currently a standalone HTML application, you can open:

```text
index.html
```

directly in a modern browser.

For a better development experience, you can also use VS Code's **Live Server** extension.

---

## 🔑 Enabling Live Data

By default, SkillBridge uses a built-in synthetic dataset.

To enable live job-market data:

1. Create an Adzuna developer account.
2. Obtain an **App ID** and **App Key**.
3. Open SkillBridge.
4. Navigate to **Job Data**.
5. Enter your credentials.
6. Select the desired country.
7. Click **Sync Live Data**.

The interface supports:

* 🇮🇳 India
* 🇺🇸 United States
* 🇬🇧 United Kingdom

The country selector and API integration are implemented directly in the application.

### ⚠️ API Security

Do **not** commit your Adzuna credentials to GitHub.

The current prototype accepts credentials through the browser for demonstration purposes. A production version should move API requests to a backend/serverless function and keep API keys server-side.

---

## 🧠 How It Works

The application follows a six-stage career analysis pipeline:

```text
Job-Market Data
       ↓
Skill Demand
       ↓
Emerging Skills
       ↓
User Skill Profile
       ↓
Skill Gap Analysis
       ↓
Explainable Recommendations
```

The homepage presents this workflow as the core concept of SkillBridge.

---

## 💡 Example

Suppose a user enters:

```text
Python        → Advanced
SQL           → Intermediate
Machine Learning → Intermediate
Git           → Beginner
```

SkillBridge evaluates these skills against each career role.

It could identify stronger matches for roles such as:

```text
1. Data Scientist
2. Machine Learning Engineer
3. AI Solutions / Prompt Engineer
4. Data Analyst
```

The user can then open each recommendation to see:

```text
Matched Skills
      +
Missing Skills
      +
Skill Weights
      +
Emerging Skill Bonus
      ↓
Final Fit Score
```

This makes the recommendation **interpretable rather than a black-box prediction**.

---

## 🎨 UI / Design

SkillBridge uses a dark, data-oriented interface with:

* Responsive layout
* Interactive navigation
* Skill chips
* Demand bars
* Recommendation cards
* Expandable explanations
* Market-status indicators
* Responsive mobile layouts

The application uses **Inter**, **Fraunces**, and **JetBrains Mono** typography.

---

## 📌 Current Limitations

This is currently a **prototype / demonstration build**.

### Data

The default job-market dataset is synthetic and illustrative rather than a continuously updated labour-market database.

### API

Live synchronization depends on the availability and limits of the Adzuna API and any fallback CORS relay.

### Security

API credentials are currently entered client-side. A production implementation should use a backend proxy.

### Recommendation Model

The recommendation algorithm is a weighted skill-matching system rather than a machine-learning model.

---

## 🔮 Future Improvements

Potential future versions could include:

* [ ] User authentication
* [ ] Persistent user profiles
* [ ] Resume/PDF parsing
* [ ] Automatic skill extraction from resumes
* [ ] More job-board integrations
* [ ] Machine-learning-based recommendations
* [ ] Personalized learning roadmaps
* [ ] Course recommendations for missing skills
* [ ] Salary and location analysis
* [ ] Internship recommendations
* [ ] Job application tracking
* [ ] Skill progression tracking
* [ ] Backend API architecture
* [ ] Secure server-side API key management

---

## 🎯 Project Goal

The goal of SkillBridge is to bridge the gap between **what the job market demands** and **what a student currently knows**.

Rather than telling someone:

> "You should become a Data Scientist."

SkillBridge attempts to answer:

> **"Why is Data Scientist a good match for you, what skills are helping your score, what skills are missing, and which emerging skills could give you an advantage?"**

---

## 📜 Disclaimer

SkillBridge is a prototype intended for demonstration and educational purposes.

Career recommendations should not be treated as guaranteed employment outcomes. Market demand can change rapidly, and the quality of recommendations depends on the quality and coverage of the underlying job-market data.

---

## 👨‍💻 Author

**Gohulrahesh**

Built as a project exploring:

* Career recommendation systems
* Explainable recommendation algorithms
* Job-market analytics
* Skill-gap analysis
* Interactive web applications
* Real-time job-market data

---

## ⭐ If You Like the Project

If you find SkillBridge useful or interesting, consider giving the repository a ⭐ on GitHub.
