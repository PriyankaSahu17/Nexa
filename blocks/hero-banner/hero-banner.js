export default function decorate(block) {
  // --- structure your content ---
  const content = document.createElement('div');
  content.className = 'hero-banner-content';
  const brand = document.createElement('div');
  brand.className = 'hero-banner-brand';

  const cta = document.createElement('div');
  cta.className = 'hero-banner-cta';

  const classes = ['logo', 'tagline', 'terms', 'cta-primary', 'cta-secondary', 'fallback-image'];
  classes.forEach((c, i) => {
    const section = block.children[i];
    if (section) section.classList.add(c);
  });
  const logo = block.querySelector('.logo');
  const tagline = block.querySelector('.tagline');
  const terms = block.querySelector('.terms');
  const ctaPrimary = block.querySelector('.cta-primary');
  const ctaFirst= ctaPrimary.querySelector('a');
  ctaFirst.classList.add('cta-primary');
  const ctaSecondary = block.querySelector('.cta-secondary');
  const ctaSecond = ctaSecondary.querySelector('a');
  ctaSecond.classList.add('cta-secondary');
  const fallbackImage = block.querySelector('.fallback-image'); // e.g. <picture> or <img>

  brand.append(logo, tagline);
  cta.append(ctaFirst, ctaSecond);

  block.textContent = '';
  content.append(brand, cta, terms);

  // --- video setup ---
  const desktopVideo = '../assets/E_vitara_desktop.mp4';
  const mobileVideo = '../assets/E_vitara_mobile.mp4';
  const breakpoint = 768;

  const video = document.createElement('video');
  video.className = 'hero-banner-video';
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;             // will only autoplay if muted + inline on iOS
  video.preload = 'metadata';

  // if you captured an <img> or <picture> as fallback, try to use it as poster
  const posterImg = fallbackImage?.querySelector('img')?.src || fallbackImage?.getAttribute?.('src');
  if (posterImg) video.setAttribute('poster', posterImg);

  const source = document.createElement('source');
  source.type = 'video/mp4';
  video.appendChild(source);
  block.append(content);
  block.append(video);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

  const pickSrc = () => (mql.matches ? mobileVideo : desktopVideo);

  function applySrc() {
    if (prefersReducedMotion) {
      // don’t autoplay heavy videos for users who prefer reduced motion
      video.pause();
      video.removeAttribute('src');
      source.removeAttribute('src');
      // show fallback image element if you have it
      if (fallbackImage && !fallbackImage.isConnected) {
        block.insertBefore(fallbackImage, video);
      }
      return;
    }

    const targetSrc = pickSrc();
    if (source.src.endsWith(targetSrc)) return;

    source.src = targetSrc;
    video.load();
    video.play().catch(() => {
      // Autoplay could be blocked – show fallback
      if (fallbackImage && !fallbackImage.isConnected) {
        block.insertBefore(fallbackImage, video);
      }
    });
  }

  // initial load
  applySrc();

  // update on resize (only when breakpoint crossing matters)
  mql.addEventListener ? mql.addEventListener('change', applySrc) : window.addEventListener('resize', applySrc);

  // optional: handle video errors -> show fallback
  video.addEventListener('error', () => {
    if (fallbackImage && !fallbackImage.isConnected) {
      block.insertBefore(fallbackImage, video);
    }
  });
}
