var newsbtn = document.querySelector('.news__to-all');
newsbtn.addEventListener('click', function(event) {
  event.preventDefault();
  newsbtn.classList.toggle('news__to-all--show');
});
