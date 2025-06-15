// Функция создания карточки
function createCard(cardData, templateSelector, handleImageClick) {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.cloneNode(true).querySelector('li');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  // Лайк
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Удаление карточки
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  // Открытие изображения в попапе
  image.addEventListener('click', () => {
    handleImageClick(cardData);
  });

  return cardElement;
}

export { createCard };
