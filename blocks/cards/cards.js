import { createOptimizedPicture } from '../../scripts/aem.js';
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'outer-car-box';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'car-box';
    while (row.firstElementChild) li.append(row.firstElementChild);

    const children = [...li.children];
    li.textContent = '';

    let firstImageDone = false;
    let carImageEl = null;
    let carLogoEl = null;
    let manualDropdownP = null;
    children.forEach((div) => {
      
      if (div.children.length === 1 && div.querySelector('picture')) {
        if (!firstImageDone) {
          div.className = 'car-image';
          carImageEl = div;
          firstImageDone = true;
        } else if (!carLogoEl) {
          div.className = 'car-logo';
          carLogoEl = div;
        }
      } else {
        manualDropdownP = div.querySelector('p');
      }
    });
    li.appendChild(carImageEl);

    const carContentBox = document.createElement('div');
    carContentBox.className = 'car-content';
    carContentBox.appendChild(carLogoEl);

    const manualDropdown = document.createElement('div');
    manualDropdown.className = 'manual-dropdown';

    const select = document.createElement('select');
    select.id = `manual-dropdown`;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = 'Select Type';
    select.appendChild(placeholder);
    if (manualDropdownP) {
      const labels = manualDropdownP.textContent
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      labels.forEach((label) => {
        const opt = document.createElement('option');
        opt.textContent = label;
        select.appendChild(opt);
      });
    }

    manualDropdown.appendChild(select);
    carContentBox.appendChild(manualDropdown);

    li.appendChild(carContentBox);
    ul.appendChild(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
