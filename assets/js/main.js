// Finly Landing Page Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // App Pages Data (Minimalist & Direct)
  const appPages = {
    overview: {
      title: "Overview",
      path: "finly.local / overview",
      tagline: "Live aggregated net worth and multi-asset allocation.",
      image: "assets/images/Overview.png"
    },
    expenses: {
      title: "Expenses",
      path: "finly.local / expenses",
      tagline: "Normalized transaction stream with automated categorisation rules.",
      image: "assets/images/Expenses.png"
    },
    analysis: {
      title: "Analysis",
      path: "finly.local / analysis",
      tagline: "Spending distribution curves and monthly merchant analytics.",
      image: "assets/images/Analysis.png"
    },
    budgets: {
      title: "Budgets",
      path: "finly.local / budgets",
      tagline: "Zero-based envelope budgeting with live visual consumption gauges.",
      image: "assets/images/Budget.png"
    },
    cashflow: {
      title: "Cashflow",
      path: "finly.local / cashflow",
      tagline: "Monthly cash inflows vs outflows and net liquidity forecast.",
      image: "assets/images/Cashflow.png"
    },
    goals: {
      title: "Goals",
      path: "finly.local / goals",
      tagline: "Dedicated savings targets with visual milestone progress bars.",
      image: "assets/images/Goals.png"
    },
    settings: {
      title: "Settings",
      path: "finly.local / settings",
      tagline: "Direct Woob bank connectors and AES-256 local encrypted credentials.",
      image: "assets/images/Setting.png"
    }
  };

  // Preload Images for instant switching
  Object.values(appPages).forEach(p => {
    const img = new Image();
    img.src = p.image;
  });

  const appNavTabs = document.querySelectorAll('.app-nav-tab');
  const appScreenImg = document.getElementById('app-screen-img');
  const appScreenPath = document.getElementById('app-screen-path');
  const appScreenTagline = document.getElementById('app-screen-tagline');

  if (appNavTabs.length && appScreenImg) {
    appNavTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const pageKey = tab.getAttribute('data-page');
        const data = appPages[pageKey];
        if (!data) return;

        // Update active class on all tabs
        appNavTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Instant update image and labels
        appScreenImg.src = data.image;
        appScreenImg.alt = data.title;
        if (appScreenPath) appScreenPath.textContent = data.path;
        if (appScreenTagline) appScreenTagline.textContent = data.tagline;
      });
    });
  }

  // Quickstart / Download Tab Switching Logic
  const quickstartTabBtns = document.querySelectorAll('.quickstart-tab-btn');
  const quickstartPanels = document.querySelectorAll('.quickstart-panel');

  function switchQuickstartTab(targetPanelId) {
    if (!targetPanelId) return;

    // Update panel visibility
    quickstartPanels.forEach(panel => {
      if (panel.id === targetPanelId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    // Update tab bar buttons active state
    quickstartTabBtns.forEach(btn => {
      if (btn.getAttribute('data-target') === targetPanelId && !btn.classList.contains('btn-secondary')) {
        btn.classList.add('active', 'bg-zinc-200', 'dark:bg-zinc-800', 'text-zinc-950', 'dark:text-white');
        btn.classList.remove('text-zinc-600', 'dark:text-zinc-400');
      } else if (!btn.classList.contains('btn-secondary')) {
        btn.classList.remove('active', 'bg-zinc-200', 'dark:bg-zinc-800', 'text-zinc-950', 'dark:text-white');
        btn.classList.add('text-zinc-600', 'dark:text-zinc-400');
      }
    });
  }

  quickstartTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPanelId = btn.getAttribute('data-target');
      switchQuickstartTab(targetPanelId);
    });
  });

  // Copy-to-Clipboard Functionality
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-code-target');
      const targetEl = document.getElementById(targetId);
      
      if (!targetEl) return;
      
      const codeText = targetEl.textContent || targetEl.innerText;
      
      try {
        await navigator.clipboard.writeText(codeText.trim());
        const originalHtml = btn.innerHTML;
        
        btn.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="text-emerald-500 font-medium">Copied</span>
        `;
        
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    });
  });

  // Mobile Hamburger Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // Dark / Light Theme Toggle
  const themeToggleBtns = [
    document.getElementById('theme-toggle-btn'),
    document.getElementById('mobile-theme-toggle-btn')
  ].filter(Boolean);

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('finly-theme', newTheme);
    applyTheme(newTheme);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Restore Theme Preference
  const savedTheme = localStorage.getItem('finly-theme') || 'dark';
  applyTheme(savedTheme);

  // Scroll Spy for Floating Pill Header
  const navPillItems = document.querySelectorAll('.nav-pill-item');
  const sections = ['overview', 'banks', 'app', 'architecture', 'security', 'download']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function updateActiveNavOnScroll() {
    const scrollPosition = window.scrollY + 200;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        const id = section.getAttribute('id');
        navPillItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        break;
      }
    }
  }

  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
  updateActiveNavOnScroll();

  // Dynamic GitHub Release & Download Synchronization
  async function syncGitHubRelease() {
    const REPO = 'louislefo/Finly';
    const GITHUB_API = `https://api.github.com/repos/${REPO}/releases/latest`;
    const GITHUB_RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;

    try {
      const response = await fetch(GITHUB_API, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      
      let release = null;
      if (response.ok) {
        release = await response.json();
      } else {
        // Fallback to latest releases list if direct latest endpoint returns 404
        const listRes = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=1`);
        if (listRes.ok) {
          const list = await listRes.json();
          if (list && list.length > 0) release = list[0];
        }
      }

      if (!release) return;

      const tagName = release.tag_name || 'v1.0.0';
      const releaseUrl = release.html_url || GITHUB_RELEASES_PAGE;
      const assets = release.assets || [];

      // Update all version tags
      document.querySelectorAll('.app-version-text').forEach(el => {
        el.textContent = tagName;
      });

      // Update release links
      document.querySelectorAll('.app-release-link').forEach(el => {
        el.href = releaseUrl;
      });

      // Helper to find asset download url
      function getAssetUrl(matcher, fallbackName) {
        const found = assets.find(a => matcher(a.name.toLowerCase()));
        return found ? found.browser_download_url : `https://github.com/${REPO}/releases/download/${tagName}/${fallbackName}`;
      }

      const winSetupUrl = getAssetUrl(n => n.includes('setup') && n.endsWith('.exe'), 'Finly-Setup.exe');
      const winPortableUrl = getAssetUrl(n => (n.includes('portable') || n === 'finly.exe') && n.endsWith('.exe'), 'Finly-Portable.exe');
      const macDmgUrl = getAssetUrl(n => n.endsWith('.dmg'), 'Finly-macOS.dmg');
      const macZipUrl = getAssetUrl(n => n.includes('macos') && n.endsWith('.zip'), 'Finly-macOS.zip');
      const linuxDebUrl = getAssetUrl(n => n.endsWith('.deb'), 'Finly-Linux-amd64.deb');
      const linuxTarUrl = getAssetUrl(n => n.includes('linux') && (n.endsWith('.tar.gz') || n.endsWith('.tgz')), 'Finly-Linux-x86_64.tar.gz');

      // Update download buttons by ID
      const winSetupBtn = document.getElementById('dl-win-setup');
      if (winSetupBtn) winSetupBtn.href = winSetupUrl;

      const winPortableBtn = document.getElementById('dl-win-portable');
      if (winPortableBtn) winPortableBtn.href = winPortableUrl;

      const macDmgBtn = document.getElementById('dl-mac-dmg');
      if (macDmgBtn) macDmgBtn.href = macDmgUrl;

      const macZipBtn = document.getElementById('dl-mac-zip');
      if (macZipBtn) macZipBtn.href = macZipUrl;

      const linuxDebBtn = document.getElementById('dl-linux-deb');
      if (linuxDebBtn) linuxDebBtn.href = linuxDebUrl;

      const linuxTarBtn = document.getElementById('dl-linux-tar');
      if (linuxTarBtn) linuxTarBtn.href = linuxTarUrl;

      // Smart Hero Download Button (adapts to detected user OS)
      const heroDlBtn = document.getElementById('hero-download-btn');
      const heroDlLabel = document.getElementById('hero-download-label');
      const heroDlBadge = document.getElementById('hero-download-badge');

      if (heroDlBtn) {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes('mac')) {
          heroDlBtn.href = macDmgUrl;
          if (heroDlLabel) heroDlLabel.textContent = 'Download for macOS';
          if (heroDlBadge) heroDlBadge.textContent = '.dmg';
        } else if (ua.includes('linux')) {
          heroDlBtn.href = linuxDebUrl;
          if (heroDlLabel) heroDlLabel.textContent = 'Download for Linux';
          if (heroDlBadge) heroDlBadge.textContent = '.deb';
        } else {
          heroDlBtn.href = winSetupUrl;
          if (heroDlLabel) heroDlLabel.textContent = 'Download for Windows';
          if (heroDlBadge) heroDlBadge.textContent = '.exe';
        }
      }

    } catch (err) {
      console.warn('Could not fetch latest release info:', err);
    }
  }

  syncGitHubRelease();
});

