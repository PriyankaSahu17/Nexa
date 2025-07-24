// import { createOptimizedPicture } from '../../scripts/aem.js';
// import { moveInstrumentation } from '../../scripts/scripts.js';

// export default function decorate(block) {

//     const ul = document.createElement('ul');
//     ul.className = 'carousel-list';

//     const slides = [...block.children];
//     const totalSlides = slides.length;

//     slides.forEach((row) => {
//         const li = document.createElement('li');
//         moveInstrumentation(row, li);

//         while (row.firstElementChild) li.append(row.firstElementChild);

//         [...li.children].forEach((div) => {
//             if (div.children.length === 1 && div.querySelector('picture')) {
//                 div.className = 'carousel-image';
//             } else {
//                 div.className = 'carousel-content';
//             }
//         });

//         ul.append(li);
//     });

//     ul.querySelectorAll('picture > img').forEach((img) => {
//         const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
//         img.closest('picture').replaceWith(optimizedPic);
//     });

//     const prevBtn = document.createElement('button');
//     prevBtn.className = 'carousel-button prev';
//     prevBtn.innerHTML = '&#8592;';

//     const nextBtn = document.createElement('button');
//     nextBtn.className = 'carousel-button next';
//     nextBtn.innerHTML = '&#8594;';

//     const dotsWrapper = document.createElement('div');
//     dotsWrapper.className = 'pagination';

//     slides.forEach((_, index) => {
//         const dot = document.createElement('div');
//         dot.className = 'dot';
//         if (index === 0) dot.classList.add('active');
//         dotsWrapper.append(dot);
//     });

//     let currentIndex = 0;

//     const updateCarousel = () => {
//         const visibleSlides = window.innerWidth < 768 ? 1 : 2;
//         const offset = 100 / visibleSlides;
//         ul.style.transform = `translateX(-${offset * currentIndex}%)`;

//         dotsWrapper.querySelectorAll('.dot').forEach((dot, i) => {
//             dot.classList.toggle('active', i === currentIndex);
//         });

//         prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
//         nextBtn.style.display = currentIndex >= totalSlides - visibleSlides ? 'none' : 'flex';
//     };

//     nextBtn.addEventListener('click', () => {
//         const visibleSlides = window.innerWidth < 768 ? 1 : 2;
//         if (currentIndex < totalSlides - visibleSlides) {
//             currentIndex++;
//             updateCarousel();
//         }
//     });

//     prevBtn.addEventListener('click', () => {
//         if (currentIndex > 0) {
//             currentIndex--;
//             updateCarousel();
//         }
//     });

//     window.addEventListener('resize', updateCarousel);
//     updateCarousel();

//     // Directly append to the block
//     block.append(prevBtn, ul, nextBtn, dotsWrapper);
// }
import { createOptimizedPicture } from '../../scripts/aem.js';
import Splide from '@splidejs/splide';
export default function decorate(block) {
    console.log('🚀 Carousel block executing...');
    const carousel= document.createElement('div');
    carousel.className = 'splide';
    
    const track= document.createElement('div');
    carousel.className = 'splide__track';

    const ul= document.createElement('ul');
    carousel.className = 'splide__list';

    const slides = [...block.children];
    slides.forEach((row) => {
        const li = document.createElement('li');
        li.className = 'splide__slide';

        while (row.firstElementChild) li.append(row.firstElementChild);

        [...li.children].forEach((div) => {
            if (div.children.length === 1 && div.querySelector('picture')) {
                div.className = 'carousel-image';
            } else {
                div.className = 'carousel-content';
            }
        });

        ul.append(li);
    });
    ul.querySelectorAll('picture > img').forEach((img) => {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        img.closest('picture').replaceWith(optimizedPic);
      });
      track.textContent = '';
      track.append(ul);

    carousel.append(track);
    block.textContent = ''; 
    block.append(carousel);
}