import '../pages/index.css';
import { resetFormErrors } from './validate.js';
import { initialCards } from './cards.js';
import avatarImage from '../images/avatar.jpg';

// Установка аватара
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarImage})`;

// Попапы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Плавное открытие и закрытие попапов
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.classList.add('popup_is-animated'));

// Универсальный обработчик закрытия попапа при нажатии клавиши Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Открыть попап
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// Закрыть попап
function closeModal(popup) {
  const form = popup.querySelector('.popup__form');
  if (form) {
    resetFormErrors(form);
  }
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Добавляем закрытие по клику на оверлей
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
      resetFormErrors(popup.querySelector('form'));
    }
  });
});

// Кнопка закрытия попапа с картинкой
const imageCloseButton = imagePopup.querySelector('.popup__close');
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));

// DOM-элементы профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements['name'];
const jobInput = profileFormElement.elements['description'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Открытие попапа + автозаполнение
function handleEditButtonClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  resetFormErrors(profileFormElement);
  openModal(profilePopup);
}

// Обработка сохранения формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

// Обработчики
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
profileEditButton.addEventListener('click', handleEditButtonClick);
profileCloseButton.addEventListener('click', () => closeModal(profilePopup));

// DOM-элементы формы добавления карточки
const addCardButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const cardFormElement = document.forms['new-place'];
const cardNameInput = cardFormElement.elements['place-name'];
const cardLinkInput = cardFormElement.elements['link'];

// Открытие формы добавления карточки
function handleAddCardButtonClick() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openModal(cardPopup);
}

// Отправка формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const newCard = createCard(newCardData);
  placesList.prepend(newCard);
  closeModal(cardPopup);
}

// Обработчики
addCardButton.addEventListener('click', handleAddCardButtonClick);
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData) {
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
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openModal(imagePopup);
  });

  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  placesList.appendChild(card);
});
