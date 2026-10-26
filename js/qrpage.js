/* SoftForge: página QR code. Mostra SOMENTE o QR do site (usa js/qrcode.js, MIT).
   O endereço é o do próprio site. Se precisar de outro, preencha siteUrl em js/config.js. */
(() => {
  const root = document.getElementById("qr"); if (!root || typeof qrcode !== "function") return;
  const own = () => { const h = location.href.split("#")[0]; if (window.SF_HASH) return h; try { return new URL("../", location.href).href; } catch (_) { return h; } };
  const cfg = String((window.SF_CONFIG || {}).siteUrl || "").trim();
  const url = /^https?:\/\//i.test(cfg) ? cfg : own();
  root.innerHTML = '<div class="qr"><div class="qr__box"><canvas id="qc" role="img" aria-label="QR code para abrir o site SoftForge no celular"></canvas></div></div>';
  const cv = root.querySelector("#qc"), ctx = cv.getContext("2d");
  try {
    const q = qrcode(0, "M"); q.addData(url); q.make();
    const n = q.getModuleCount(), z = Math.max(4, Math.floor(640 / (n + 8))), m = 4;
    cv.width = cv.height = (n + 2 * m) * z;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height); ctx.fillStyle = "#000";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) ctx.fillRect((c + m) * z, (r + m) * z, z, z);
  } catch (_) { root.textContent = ""; }
})();
