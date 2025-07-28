export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'hero-banner-content';

  const brand = document.createElement('div');
  brand.className = 'hero-banner-brand';

  const cta = document.createElement('div');
  cta.className = 'hero-banner-cta';

  const classes = ['logo', 'tagline', 'terms', 'cta-primary', 'cta-secondary'];
  classes.forEach((c, i) => {
    const section = block.children[i];
    if (section) section.classList.add(c);
  });

  const logo = block.querySelector('.logo');
  const tagline = block.querySelector('.tagline');
  const terms = block.querySelector('.terms');
  const ctaPrimary = block.querySelector('.cta-primary');
  const ctaFirst = ctaPrimary?.querySelector('a');
  if (ctaFirst) ctaFirst.classList.add('cta-primary');
  const ctaSecondary = block.querySelector('.cta-secondary');
  const ctaSecond = ctaSecondary?.querySelector('a');
  if (ctaSecond) ctaSecond.classList.add('cta-secondary');

  brand.append(logo, tagline);
  if (ctaFirst) cta.append(ctaFirst);
  if (ctaSecond) cta.append(ctaSecond);

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

  // const source = document.createElement('source');
  // source.type = 'video/mp4';
  // video.appendChild(source);

  block.append(content);
  block.append(video);
  const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
  let currentSrc;

  const applySrc = () => {
    const next = mql.matches ? mobileVideo : desktopVideo;
    if (next === currentSrc) return; 
    currentSrc = next;
    video.src = next;
    video.load();
    video.play().catch(() => { });
  };

  applySrc();                         
  mql.addEventListener('change', applySrc); 
}