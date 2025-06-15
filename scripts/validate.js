// Показать ошибку валидации
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
}

// Скрыть ошибку валидации
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
}

// Проверка валидности одного поля
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Проверка, есть ли невалидные поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Включение или отключение кнопки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

// Установка слушателей на все поля формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
}

// Активация валидации формы
function enableValidation(formSelector) {
  const formElement = document.querySelector(formSelector);
  setEventListeners(formElement);
}

// Очистка ошибок и сброс стилей инпутов
function resetFormErrors(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
  });

  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
}

// Включить валидацию формы редактирования профиля
enableValidation('form[name="edit-profile"]');

// Включить валидацию формы добавления нового места
enableValidation('form[name="new-place"]');