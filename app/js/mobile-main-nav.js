var showmenu = document.querySelector('.main-nav');
var linksandw = document.querySelector('.main-nav__toggle');
var closesandw = document.querySelector('.main-nav__toggle--close');
var hiddenmenu = document.querySelector('.main-nav--closed');
var strips = document.querySelector('.main-nav__toggle-strips');
var navitem = document.querySelector('.main-nav__item');
var navitemact = document.querySelector('.main-nav__item--active');
linksandw.addEventListener('click', function(event) {
  event.preventDefault();
  linksandw.classList.toggle('main-nav__toggle--close');
  strips.classList.toggle('main-nav__toggle-strips');
  showmenu.classList.toggle('main-nav--closed');
  navitem.classList.toggle('main-nav__item--active');
});
