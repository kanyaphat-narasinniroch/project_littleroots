// Shared footer — works when opening files directly (file://), no server needed.
// Usage: <div id="site-footer"></div> + <script src="footer.js"></script>
(function () {
  var host = document.getElementById("site-footer");
  if (!host) return;
  host.innerHTML = `<!-- Footer (Warm Natural Little Roots Botanical Theme) -->
<footer class="little-roots-footer">
<div class="container">
<!-- Top Strip: Logo, Slogan, and Pixel Plants Sprite Banner -->
<div class="footer-top-strip">
<div class="footer-branding">
<svg fill="none" height="36" viewBox="0 0 64 64" width="36">
<rect fill="#387B3E" height="64" rx="14" width="64"></rect>
<rect fill="#B3E678" height="8" width="8" x="28" y="16"></rect>
<rect fill="#88D455" height="8" width="8" x="20" y="24"></rect>
<rect fill="#88D455" height="8" width="8" x="36" y="24"></rect>
<rect fill="#3D7527" height="8" width="8" x="28" y="24"></rect>
<rect fill="#6C4724" height="16" width="8" x="28" y="32"></rect>
</svg>
<div>
<h4 style="font-size: 1.3rem; font-weight: 700; color: rgb(35, 59, 34); line-height: 1.1;">Little Roots</h4>
<span style="font-size: 0.78rem; color: rgb(105, 125, 103);">Thai Botanical Garden</span>
</div>
</div>
<div class="footer-tagline-quote">
<span>🍃 ต้นไม้แต่ละชนิด มีมากกว่าที่ตาคิด</span>
</div>
<!-- 8-Bit Pixel Flora Mini Sprites Row -->
<div class="pixel-plant-icons-row" title="คอลเลกชันต้นไม้พิกเซล">
<span class="pixel-mini-item">🪴</span>
<span class="pixel-mini-item">🌸</span>
<span class="pixel-mini-item">🌼</span>
<span class="pixel-mini-item">🌿</span>
<span class="pixel-mini-item">🌾</span>
<span class="pixel-mini-item">🍀</span>
<span class="pixel-mini-item">🌷</span>
<span class="pixel-mini-item">🍃</span>
</div>
</div>
<!-- Links Columns -->
<div class="footer-columns-grid">
<div class="footer-col">
<h5>เกี่ยวกับ Little Roots</h5>
<p style="font-size: 0.88rem; color: rgb(97, 115, 94); line-height: 1.6;">
            สารานุกรมและแหล่งเรียนรู้ธรรมชาติวิทยาสำหรับเยาวชน เชื่อมโยงความรู้เรื่องพืชสมุนไพร พืชอาหาร และความหลากหลายทางชีวภาพของไทย
          </p>
<div class="social-pills-row">
<a class="social-circle-btn" href="#" title="Facebook">f</a>
<a class="social-circle-btn" href="#" title="Instagram">📷</a>
<a class="social-circle-btn" href="#" title="YouTube">▶</a>
<a class="social-circle-btn" href="#" title="Website">🌐</a>
</div>
</div>
<div class="footer-col">
<h5>สมุนไพรไทย</h5>
<ul>
<li><a href="index.html#herb-home">สมุนไพรประจำบ้าน</a></li>
<li><a href="index.html#herb-special">สมุนไพรเฉพาะทาง</a></li>
<li><a href="index.html#herb-health">สมุนไพรบำรุงสุขภาพ</a></li>
<li><a href="index.html#herbs">ตำรับยาสมุนไพรพื้นบ้าน</a></li>
</ul>
</div>
<div class="footer-col">
<h5>พืชกินได้</h5>
<ul>
<li><a href="index.html#food-veg">ผักพื้นบ้านและผักริมรั้ว</a></li>
<li><a href="index.html#food-fruit">ผลไม้พื้นเมืองหายาก</a></li>
<li><a href="index.html#food-spice">เครื่องเทศและพืชแต่งกลิ่น</a></li>
<li><a href="index.html#food">ผักสวนครัวปลูกง่าย</a></li>
</ul>
</div>
<div class="footer-col">
<h5>พืชเศรษฐกิจ</h5>
<ul>
<li><a href="index.html#eco-field">พืชไร่และพืชแปรรูป</a></li>
<li><a href="index.html#eco-fiber">พืชเส้นใยและงานจักสาน</a></li>
<li><a href="index.html#eco-industry">พืชสกัดและอุตสาหกรรม</a></li>
<li><a href="index.html#economic">เกษตรผสมผสานสร้างอาชีพ</a></li>
</ul>
</div>
<div class="footer-col">
<h5>ไม้ประดับ &amp; ถิ่นเดียว</h5>
<ul>
<li><a href="index.html#orn-flower">ไม้ดอกไทยและกล้วยไม้</a></li>
<li><a href="index.html#orn-lucky">ไม้มงคลและความเชื่อ</a></li>
<li><a href="index.html#orn-garden">ไม้จัดสวนในบ้าน</a></li>
<li><a href="index.html#rare">พืชหายากและพืชถิ่นเดียว</a></li>
</ul>
</div>
</div>
<!-- Bottom Copyright & Navigation Links -->
<div class="footer-bottom-bar">
<div>
          © 2025 Little Roots Thai Botanical Garden. รวบรวมเพื่อการศึกษาและการเรียนรู้ธรรมชาติของเด็กไทย
        </div>
<div style="display: flex; gap: 16px;">
<a href="index.html" style="color: rgb(97, 115, 94);">หน้าหลัก</a>
<a href="herb.html" style="color: rgb(97, 115, 94);">พืชกินได้</a>
<a href="index.html#economic" style="color: rgb(97, 115, 94);">เศรษฐกิจ</a>
<a href="#" style="color: rgb(97, 115, 94);">Contact</a>
<a href="#" style="color: rgb(97, 115, 94);">Links</a>
</div>
</div>
</div>
</footer>
`;
})();
