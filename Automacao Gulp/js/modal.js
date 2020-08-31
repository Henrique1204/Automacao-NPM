{
const modalBtn = document.querySelector('.abrir-modal');
const modal = document.querySelector('.modal');

function activeModal(evento) {
  evento.preventDefault();
  if(modal.classList.contains('active')) {
    modal.classList.remove('active');
    modalBtn.innerText = 'Abrir Modal';
  } else {
    modal.classList.add('active');
    modalBtn.innerText = 'Fechar Modal';
  }
}

modalBtn.addEventListener('click', activeModal);
}