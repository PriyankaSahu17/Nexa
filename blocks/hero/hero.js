// export default function decorate(block) {
//     const carousel= document.createElement('div');
//     carousel.className = 'splide';
    
//     const track= document.createElement('div');
//     carousel.className = 'splide__track';

//     const ul= document.createElement('ul');
//     carousel.className = 'splide__list';

//     const slides = [...block.children];
//     slides.forEach((row) => {
//         const li = document.createElement('li');
//         li.className = 'splide__slide';

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
// }