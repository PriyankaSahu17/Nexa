export default function decorate(block) {
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
  const fallbackImage = block.querySelector('.fallback-image'); 

  brand.append(logo, tagline);
  cta.append(ctaFirst, ctaSecond);

  block.textContent = '';
  content.append(brand, cta, terms);

  const desktopVideo = '../assets/E_vitara_desktop.mp4';
  const mobileVideo = '../assets/E_vitara_mobile.mp4';
  const breakpoint = 600;

  const video = document.createElement('video');
  video.className = 'hero-banner-video';
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;             
  video.preload = 'metadata';

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
      video.pause();
      video.removeAttribute('src');
      source.removeAttribute('src');
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
      if (fallbackImage && !fallbackImage.isConnected) {
        block.insertBefore(fallbackImage, video);
      }
    });
  }

  applySrc();

  mql.addEventListener ? mql.addEventListener('change', applySrc) : window.addEventListener('resize', applySrc);
  video.addEventListener('error', () => {
    if (fallbackImage && !fallbackImage.isConnected) {
      block.insertBefore(fallbackImage, video);
    }
  });
}
