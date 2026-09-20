document.getElementById("yr").textContent = new Date().getFullYear();

/* ===== Lightbox for project screenshots ===== */
(function(){
  const overlay = document.getElementById('lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const counterEl = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentImages = [];
  let currentIndex = 0;

  function show(i){
    currentIndex = (i + currentImages.length) % currentImages.length;
    const img = currentImages[currentIndex];
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    const multi = currentImages.length > 1;
    prevBtn.style.display = multi ? 'grid' : 'none';
    nextBtn.style.display = multi ? 'grid' : 'none';
    counterEl.style.display = multi ? 'block' : 'none';
    counterEl.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
  }

  function open(images, index){
    currentImages = images;
    show(index);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });
  prevBtn.addEventListener('click', function(){ show(currentIndex - 1); });
  nextBtn.addEventListener('click', function(){ show(currentIndex + 1); });

  document.addEventListener('keydown', function(e){
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  document.querySelectorAll('.proj-media').forEach(function(media){
    const imgs = Array.prototype.slice.call(media.querySelectorAll('img'));
    imgs.forEach(function(img, idx){
      img.addEventListener('click', function(){ open(imgs, idx); });
    });

    // Auto-count the "+N" overflow badge from however many images actually exist
    const moreEl = media.querySelector('.thumb.more');
    if (moreEl) {
      const visibleSlots = media.querySelectorAll('.main-shot, .thumb').length;
      const extra = imgs.length - visibleSlots;
      if (extra > 0) {
        moreEl.setAttribute('data-more', '+' + extra);
      } else {
        moreEl.classList.remove('more');
        moreEl.removeAttribute('data-more');
      }
    }
  });
})();

/* ===== Highlight the nav link of the section currently in view ===== */
(function(){
  const navLinks = document.querySelectorAll('.links a[href^="#"]');
  const sections = Array.prototype.slice.call(navLinks)
    .map(function(a){ return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      navLinks.forEach(function(a){
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-50% 0px -49% 0px' });

  sections.forEach(function(s){ observer.observe(s); });
})();