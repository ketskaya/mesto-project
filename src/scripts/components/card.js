import { deleteCard, likeCard, unlikeCard } from './api.js';

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

  // Проверка: ставил ли текущий пользователь лайк
  const isLikedByCurrentUser = cardData.likes.some(user => user._id === currentUserId);
  if (isLikedByCurrentUser) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработка клика по лайку
  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeAction = isLiked ? unlikeCard : likeCard;

    likeAction(cardData._id)
      .then(updatedCard => {
        likeCount.textContent = updatedCard.likes.length;
        if (updatedCard.likes.some(user => user._id === currentUserId)) {
          likeButton.classList.add('card__like-button_is-active');
        } else {
          likeButton.classList.remove('card__like-button_is-active');
        }
      })
      .catch(err => {
        console.error('Ошибка при обновлении лайка:', err);
      });
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
