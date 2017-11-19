var linklogin = document.querySelector('.main-nav__user-login');
var modallogin = document.querySelector('.modal-content');
var closelogin = modallogin.querySelector('.modal-content__close');
var form = modallogin.querySelector('form');
var login = modallogin.querySelector('[name=login]');
var password = modallogin.querySelector('[name=password]');
var overlay = document.querySelector('.modal-overlay');
var storage = localStorage.getItem('login');
linklogin.addEventListener('click', function (event) {
  event.preventDefault();
  modallogin.classList.add('modal-content--show');
  overlay.classList.add('modal-overlay--show');
  if (storage) {
    login.value = storage;
  }
});
closelogin.addEventListener('click', function (event) {
  event.preventDefault();
  modallogin.classList.remove('modal-content--show');
  overlay.classList.remove('modal-overlay--show');
  modallogin.classList.remove('modal-content--error');
});
form.addEventListener('submit', function (event) {
  if (!login.value || !password.value) {
    event.preventDefault();
    modallogin.classList.add('modal-content--error');
  }
  else {
    localStorage.setItem('login', login.value);
  }
});
window.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    if (modallogin.classList.contains('modal-content--show')) {
      modallogin.classList.remove('modal-content--show');
      overlay.classList.remove('modal-overlay--show');
      modallogin.classList.remove('modal-content--error');
    }
  }
});
