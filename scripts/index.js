// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  placesList.appendChild(card);
});
