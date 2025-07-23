
import { createOptimizedPicture } from '../../scripts/aem.js';


export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'right-separator';

  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'immersive__content';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'immersive__image';

  const wrapper = document.createElement('div');
  wrapper.className = 'immersive_content_wrapper';

  const textContainer = document.createElement('div');
  textContainer.className = 'immersive_content_textContainer';

  const actionContainer = document.createElement('div');
  actionContainer.className = 'immersive__action';


  [...block.children].forEach((row) => {
    const content = row.firstElementChild;

    if (content && content.querySelector('picture')) {
      const img = content.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      imageDiv.append(optimizedPic);
    } else if (content) {

      const h1 = content.querySelector('h1');
      if (h1) {
        h1.classList.add('immersive__heading');
        textContainer.append(h1);
      }

      content.querySelectorAll('p').forEach((p) => {
        const onlyChild = p.children.length === 1 && p.firstElementChild?.tagName === 'A';

        if (onlyChild) {
          const a = p.querySelector('a');
          a.classList.add('immersive__button');
          actionContainer.append(a);
        } else {
          p.classList.add('immersive__paragraph');
          const descDiv = document.createElement('div');
          descDiv.className = 'immersive__description';
          descDiv.append(p);
          textContainer.append(descDiv);
        }
      });
    }
  });

  wrapper.append(textContainer, actionContainer);
  bodyDiv.append(wrapper);
  container.append(bodyDiv, imageDiv);

  block.textContent = '';
  block.append(container);
}

