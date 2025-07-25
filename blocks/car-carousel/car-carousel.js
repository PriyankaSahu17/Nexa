import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';
    document.body.appendChild(script);
    const carousel = document.createElement('div');
    carousel.className = 'splide';

    const track = document.createElement('div');
    track.className = 'splide__track';

    const ul = document.createElement('ul');
    ul.className = 'splide__list';
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        li.className = 'splide__slide';
        while (row.firstElementChild) li.append(row.firstElementChild);
        [...li.children].forEach((div) => {
            if (div.children.length === 1 && div.querySelector('picture')) div.className = 'carousel-image';
            else div.className = 'carousel-body';
        });
        ul.append(li);
    });
    ul.querySelectorAll('picture > img').forEach((img) => {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        img.closest('picture').replaceWith(optimizedPic);
    });
    block.textContent = '';
    track.append(ul);
    carousel.append(track);
    block.append(carousel);
    script.onload = () => {
        new Splide('.splide', {
            type: 'slide',
            perPage: 1,
            perMove: 1,
            gap: 20,
            pagination: true,
            arrows: true,
            height: '25rem',
            mediaQuery: 'min',
            arrowPath: 'M10 20 L35 20 M25 10 L35 20 L25 30',
            breakpoints: {
                768: {
                    perPage: 2,
                    pagination: false,
                    height: '30rem',
                },

            },
        }).mount();
    };

}
