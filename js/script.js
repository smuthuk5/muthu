// Mobile nav toggle
(function () {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
  }
})();

// Image loader that tries multiple extensions
(function () {
  function tryLoad(img, basePath) {
    const exts = ['.png', '.jpg', '.jpeg', '.webp'];
    let idx = 0;
    function setSrc() {
      if (idx >= exts.length) return;
      const src = basePath + exts[idx++];
      const test = new Image();
      test.onload = () => { img.src = src; };
      test.onerror = setSrc;
      test.src = src;
    }
    setSrc();
  }
  document.querySelectorAll('img[data-img-base]').forEach((img) => {
    const base = img.getAttribute('data-img-base');
    if (base) tryLoad(img, base);
  });
})();

// Footer year
(() => {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();

// Simple contact form validation (client only)
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formEl = e.target;
    const name = formEl.querySelector('input[name="name"]');
    const email = formEl.querySelector('input[name="email"]');
    const message = formEl.querySelector('textarea[name="message"]');
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert('Please fill in Name, Email, and Message.');
      return;
    }
    alert('Thanks! Your message has been recorded. We will contact you shortly.');
    formEl.reset();
  });
})();

// Hero fading rotator (single interval)
(() => {
  const slides = [
    { src: 'assets/brushcutter-2s.png', href: 'product-brushcutter-2s.html' },
    { src: 'assets/brushcutter-2s-premium.png.png', href: 'product-brushcutter-2s-premium.html' },
    { src: 'assets/brushcutter-4s.png', href: 'product-brushcutter-4s.html' },
    { src: 'assets/chainsaw.png', href: 'product-chainsaw-psm-kawasaqi.html' },
    { src: 'assets/hedge-trimmer.png', href: 'product-hedgetrimmer-psm-ht.html' },
    { src: 'assets/tiller.png', href: 'product-tiller-psm-ppt.html' }
  ];
  let idx = 0;
  function showNext() {
    const img = document.getElementById('heroRotator');
    const link = document.getElementById('heroRotatorLink');
    if (!img) return;
    idx = (idx + 1) % slides.length;
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = slides[idx].src;
      if (link) link.href = slides[idx].href;
      img.style.opacity = 1;
    }, 600);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('heroRotator');
    const link = document.getElementById('heroRotatorLink');
    if (!img) return;
    if (link) link.href = slides[0].href;
    img.style.opacity = 1;
    setInterval(showNext, 3500);
  });
})();
