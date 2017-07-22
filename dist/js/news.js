var newsbtn = document.querySelector('.news__to-all');
var newsbtnhid = document.querySelector('.news__to-all--hid');
var newsitem2 = document.querySelector('.news__item:nth-child(n+2)');
var newsitem3 = document.querySelector('.news__item:nth-child(n+3)');
var newsitemshow = document.querySelector('.news__item--show:nth-child(n+3)');
newsbtn.addEventListener('click', function (event) {
  event.preventDefault();
  newsitem2.classList.add('news__item--show2');
  newsitem3.classList.add('news__item--show');
  newsbtn.classList.add('news__to-all--hid');
});