//Hamburguer icon

const menuLinks = document.querySelectorAll('.navigation__item-anchor');
const menu = document.querySelector('.navigation__menu-input');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.checked = false;
  });
});