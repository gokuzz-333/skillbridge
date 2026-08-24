(function () {
  "use strict";

  const state = { jobs: [], location: "india", query: "" };
  const dom = {
    themeToggle: document.getElementById("themeToggle"),
    search: document.getElementById("jobSearch"),
    searchBtn: document.getElementById("searchBtn"),
    refreshBtn: document.getElementById("refreshBtn"),
    filters: document.querySelectorAll("[data-location]"),
    container: document.getElementById("liveJobsContainer"),
    summary: document.getElementById("listingSummary"),
    updated: document.getElementById("jobsUpdated"),
    portals: document.getElementById("portalActions")
  };

  function initTheme() {
    const saved = localStorage.getItem("skillbridge-theme");
    const setTheme = (theme) => {
      const dark = theme === "dark";
      document.body.dataset.theme = theme;
      dom.themeToggle.setAttribute("aria-pressed", String(dark));
      dom.themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
    };
    setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    dom.themeToggle.addEventListener("click", () => {
      const next = document.body.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("skillbridge-theme", next);
      setTheme(next);
    });
  }

  function cleanText(value) {
    return String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function safeUrl(value) {
    try {
      const url = new URL(value);
      return /^https?:$/.test(url.protocol) ? url.href : "#";
    } catch {
      return "#";
    }
  }

  function normaliseJob(raw, source) {
    return {
      title: cleanText(raw.title || raw.jobTitle) || "Untitled role",
      company: cleanText(raw.company_name || raw.company || raw.companyName || raw.company_name_display || "Employer not listed"),
      location: cleanText(raw.candidate_required_location || raw.location || raw.location_name || "Location not listed"),
      description: cleanText(raw.description || raw.jobDescription || raw.jobExcerpt || raw.body || "No description provided."),
      tags: (raw.tags || raw.skills || raw.jobIndustry || []).slice(0, 4).map(cleanText).filter(Boolean),
      url: raw.url || raw.redirect_url || raw.apply_url || "",
      published: raw.publication_date || raw.posted_at || raw.pubDate || raw.created_at || raw.date_posted || "",
      source
    };
  }

  function isIndia(job) {
    return /india|bengaluru|bangalore|mumbai|delhi|gurugram|gurgaon|noida|hyderabad|pune|chennai|kolkata|ahmedabad|remote.*india/i.test(`${job.location} ${job.description}`);
  }

  function isRemote(job) {
    return /remote|anywhere|worldwide|global/i.test(`${job.location} ${job.title} ${job.description}`);
  }

  function matchesQuery(job) {
    const term = state.query.trim().toLowerCase();
    if (!term) return true;
    return `${job.title} ${job.company} ${job.location} ${job.description} ${job.tags.join(" ")}`.toLowerCase().includes(term);
  }

  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Recently posted" : `Posted ${date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;
  }

  function renderPortals() {
    const query = encodeURIComponent(state.query || "jobs in India");
    const links = [
      ["LinkedIn", `https://www.linkedin.com/jobs/search/?keywords=${query}&location=India`],
      ["Naukri", `https://www.naukri.com/${query.replace(/%20/g, "-")}-jobs-in-india`],
      ["Indeed", `https://in.indeed.com/jobs?q=${query}&l=India`]
    ];
    dom.portals.innerHTML = links.map(([name, url]) => `<a class="btn btn-sm btn-secondary" target="_blank" rel="noopener" href="${url}">${name} search ↗</a>`).join("");
  }

  function renderJobs() {
    const visible = state.jobs.filter(job => (state.location === "india" ? isIndia(job) : isRemote(job)) && matchesQuery(job));
    renderPortals();
    dom.container.innerHTML = "";
    dom.summary.textContent = visible.length
      ? `${visible.length} listing${visible.length === 1 ? "" : "s"} match your filters.`
      : "No matching public-feed listings right now. Try the live portal searches above or switch to remote-friendly roles.";

    if (!visible.length) {
      dom.container.innerHTML = `<div class="card job-empty-state"><h3>Continue your search on a job portal</h3><p>Public feeds do not always include every India-based listing. The links above run a live search with your keyword.</p></div>`;
      return;
    }

    visible.slice(0, 30).forEach(job => {
      const card = document.createElement("article");
      card.className = "job-card live-job-card";
      const tags = job.tags.map(tag => `<span class="badge">${escapeHtml(tag)}</span>`).join("");
      const destination = safeUrl(job.url) === "#"
        ? `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}&location=India`
        : safeUrl(job.url);
      card.innerHTML = `
        <div>
          <div class="job-source">${escapeHtml(job.source)}</div>
          <div class="job-company">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</div>
          <h3 class="job-title">${escapeHtml(job.title)}</h3>
          <p class="job-description">${escapeHtml(job.description.slice(0, 180))}${job.description.length > 180 ? "…" : ""}</p>
          <div class="job-tags">${tags}</div>
        </div>
        <div class="job-meta-row"><span>${formatDate(job.published)}</span><a class="btn btn-sm btn-primary" href="${destination}" target="_blank" rel="noopener">View role ↗</a></div>
      `;
      dom.container.appendChild(card);
    });
  }

  async function fetchListings() {
    dom.refreshBtn.disabled = true;
    dom.refreshBtn.textContent = "Refreshing…";
    dom.summary.textContent = "Checking public job feeds…";
    const sources = [
      { name: "Hopin Jobs India", url: "https://api.hopinjobs.com/api/jobs?is_unofficial=true", jobs: data => data.jobs || [] },
      { name: "Arbeitnow", url: "https://www.arbeitnow.com/api/job-board-api", jobs: data => data.data || [] },
      { name: "Remotive", url: "https://remotive.com/api/remote-jobs?limit=100", jobs: data => data.jobs || [] },
      { name: "Jobicy", url: "https://jobicy.com/api/v2/remote-jobs?count=50", jobs: data => data.jobs || [] }
    ];
    const results = await Promise.allSettled(sources.map(async source => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      const response = await fetch(source.url, { signal: controller.signal });
      clearTimeout(timer);
      if (!response.ok) throw new Error(`${source.name} unavailable`);
      const data = await response.json();
      return source.jobs(data).map(job => normaliseJob(job, source.name));
    }));
    state.jobs = results.filter(r => r.status === "fulfilled").flatMap(r => r.value);
    dom.updated.textContent = state.jobs.length ? "Live feeds checked" : "Feeds unavailable";
    renderJobs();
    dom.refreshBtn.disabled = false;
    dom.refreshBtn.textContent = "Refresh live listings";
  }

  function initEvents() {
    const applySearch = () => { state.query = dom.search.value; renderJobs(); };
    dom.searchBtn.addEventListener("click", applySearch);
    dom.search.addEventListener("keydown", event => { if (event.key === "Enter") applySearch(); });
    dom.refreshBtn.addEventListener("click", fetchListings);
    dom.filters.forEach(button => button.addEventListener("click", () => {
      state.location = button.dataset.location;
      dom.filters.forEach(item => item.classList.toggle("active", item === button));
      renderJobs();
    }));
  }

  initTheme();
  initEvents();
  fetchListings();
})();
