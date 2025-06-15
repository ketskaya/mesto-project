// Универсальные функции открытия и закрытия модальных окон
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Обработчик закрытия попапа по нажатию клавиши Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Добавляем закрытие по клику на оверлей
function setOverlayCloseHandler(popup, onCloseCallback) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      onCloseCallback(popup);
    }
  });
}

export { openModal, closeModal, closeByEsc, setOverlayCloseHandler };
