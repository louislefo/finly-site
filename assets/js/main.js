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
});

