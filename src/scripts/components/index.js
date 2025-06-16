import '../../pages/index.css';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard } from './api.js';
import { enableValidation, resetFormErrors } from './validate.js';
import { openModal, closeModal, setOverlayCloseHandler } from './modal.js';
import { createCard } from './card.js';

// Объект с настройками валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Установка аватара
const profileImage = document.querySelector('.profile__image');

// Попапы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Плавное открытие и закрытие попапов
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.classList.add('popup_is-animated'));

// Универсальный обработчик закрытия по оверлею и очистка ошибок
popups.forEach(popup => {
  setOverlayCloseHandler(popup, (popupElement) => {
    resetFormErrors(popupElement, validationSettings);
    closeModal(popupElement);
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
  resetFormErrors(profileFormElement, validationSettings);
  openModal(profilePopup);
}

// Обработка сохранения формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value.trim();
  const about = jobInput.value.trim();
  updateUserInfo(name, about)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    });
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

// Список для добавления карточек
const placesList = document.querySelector('.places__list');

// Открытие формы добавления карточки
function handleAddCardButtonClick() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  resetFormErrors(cardFormElement, validationSettings);
  openModal(cardPopup);
}

// Обработчик открытия изображения в попапе
function handleCardImageClick(cardData) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(imagePopup);
}

// Отправка формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value.trim(),
    link: cardLinkInput.value.trim()
  };

  if (newCardData.name && newCardData.link) {
    addNewCard(newCardData.name, newCardData.link)
      .then((createdCard) => {
        const newCard = createCard(createdCard, '#card-template', handleCardImageClick);
        placesList.prepend(newCard);
        closeModal(cardPopup);
      })
      .catch((err) => {
        console.error('Ошибка при добавлении карточки:', err);
      });
    }
}

// Обработчики
addCardButton.addEventListener('click', handleAddCardButtonClick);
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Загрузка данных пользователя и карточки с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((cardData) => {
      const card = createCard(cardData, '#card-template', handleCardImageClick);
      placesList.appendChild(card);
    });
  })
  .catch((err) => {
    console.error('Ошибка при инициализации:', err);
  });

// Включить валидацию форм
enableValidation(validationSettings);
