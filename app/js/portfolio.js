var portfBtn = document.querySelector('.portfolio__to-all');
portfBtn.addEventListener('click', function (event) {
  event.preventDefault();
    portfBtn.classList.toggle('portfolio__to-all--show');
});
