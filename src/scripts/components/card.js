import { deleteCard } from './api.js';

// Функция создания карточки
function createCard(cardData, templateSelector, handleImageClick, currentUserId) {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.cloneNode(true).querySelector('li');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Лайк
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Удаление карточки (только своей)
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      deleteCard(cardData._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((err) => {
          console.error('Ошибка при удалении карточки:', err);
        });
    });
  }

  // Открытие изображения в попапе
  image.addEventListener('click', () => {
    handleImageClick(cardData);
  });

  return cardElement;
}

export { createCard };
