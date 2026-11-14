// Shared header — works when opening files directly (file://), no server needed.
// Usage: <div id="site-header"></div> + <script src="header.js"></script>
// Highlight active menu with <body data-nav="herbs|food|economic|ornamental|rare">
(function () {
  var host = document.getElementById("site-header");
  if (!host) return;
  host.innerHTML = `<!-- Top Header Navigation (Little Roots Theme) -->
<header class="top-header">
<div class="container header-inner">
<!-- Brand Logo -->
<a class="brand-logo" href="index.html">
<svg class="logo-icon-svg" fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
<rect fill="#4B8C49" height="64" rx="16" width="64"></rect>
<!-- Pixel Art Leaves -->
<rect fill="#B3E678" height="8" width="8" x="28" y="14"></rect>
<rect fill="#88D455" height="8" width="8" x="20" y="22"></rect>
<rect fill="#88D455" height="8" width="8" x="36" y="22"></rect>
<rect fill="#589F3A" height="8" width="8" x="28" y="22"></rect>
<rect fill="#6FB743" height="8" width="8" x="12" y="30"></rect>
<rect fill="#6FB743" height="8" width="8" x="44" y="30"></rect>
<rect fill="#3D7527" height="8" width="8" x="28" y="30"></rect>
<rect fill="#6C4724" height="14" width="8" x="28" y="38"></rect>
<rect fill="#6C4724" height="8" width="8" x="20" y="44"></rect>
<rect fill="#6C4724" height="8" width="8" x="36" y="44"></rect>
</svg>
<div class="brand-text">
<span class="brand-title">Little Roots</span>
<span class="brand-subtitle">Thai Botanical Garden</span>
</div>
</a>
<!-- Categories Quick Navigation -->
<nav class="header-nav">
<a class="nav-pill" data-nav="herbs" href="index.html#herbs">
<span class="nav-pill-icon">🌿</span>
<div class="nav-pill-text">
<span class="nav-pill-title">สมุนไพร</span>
<span class="nav-pill-sub">Medicinal</span>
</div>
</a>
<a class="nav-pill" data-nav="food" href="herb.html">
<span class="nav-pill-icon">🥕</span>
<div class="nav-pill-text">
<span class="nav-pill-title">พืชกินได้</span>
<span class="nav-pill-sub">Edible</span>
</div>
</a>
<a class="nav-pill" data-nav="economic" href="index.html#economic">
<span class="nav-pill-icon">🌾</span>
<div class="nav-pill-text">
<span class="nav-pill-title">พืชเศรษฐกิจ</span>
<span class="nav-pill-sub">Economic</span>
</div>
</a>
<a class="nav-pill" data-nav="ornamental" href="index.html#ornamental">
<span class="nav-pill-icon">🌸</span>
<div class="nav-pill-text">
<span class="nav-pill-title">ไม้ประดับ</span>
<span class="nav-pill-sub">Ornamental</span>
</div>
</a>
<a class="nav-pill" data-nav="rare" href="index.html#rare">
<span class="nav-pill-icon">🌺</span>
<div class="nav-pill-text">
<span class="nav-pill-title">พืชถิ่นเดียว</span>
<span class="nav-pill-sub">Endemic</span>
</div>
</a>
</nav>
</div>
</header>
`;
  var key = document.body.dataset.nav;
  var pill = key && host.querySelector('.nav-pill[data-nav="' + key + '"]');
  if (pill) pill.classList.add("active");
})();

// Fade the page out before going to another page (pairs with the page-in animation in style.css)
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest("a[href]");
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
  var url = new URL(a.href, location.href);
  if (url.protocol !== location.protocol || url.pathname === location.pathname) return; // external link or same-page anchor
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(function () { location.href = a.href; }, 150);
});
window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); }); // back button

// Reveal the page only after the web fonts are ready (prevents the font-swap flicker).
// Gives up after 1.2s, and also reveals at once if the fonts cannot load (e.g. offline).
(function () {
  var root = document.documentElement;
  var done = false;
  function reveal() {
    if (done) return;
    done = true;
    root.classList.remove("fonts-loading");
  }
  setTimeout(reveal, 1200);
  if (!document.fonts || !document.fonts.load) { reveal(); return; }
  var thai = "กขabc";
  Promise.all([
    document.fonts.load("400 1rem Mali", thai),
    document.fonts.load("600 1rem Mali", thai),
    document.fonts.load("700 1rem Mali", thai),
    document.fonts.load("400 1rem Prompt", thai)
  ]).then(function () {
    try { sessionStorage.setItem("fonts-ready", "1"); } catch (e) {}
    reveal();
  }, reveal);
})();
