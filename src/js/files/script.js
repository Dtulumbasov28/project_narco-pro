// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


// Скрыть часть текста на страницах
function resizeScrenText() {
  document.querySelectorAll(".content__container").forEach(function (el) {
    var button = el.querySelector(".content__button");
    if (button)
      button.addEventListener("click", function () {
        el.classList.toggle("disclosed");
        button.textContent = el.classList.contains("disclosed")
          ? "Скрыть текст"
          : "Открыть текст";
      });
  });
}
resizeScrenText();

// Генерация содержаня в статьях
function generatorOglav() {
  var articlePage = document.querySelector(".article");
  if (articlePage) {
    var tpl =
      '<div class="oglav__heading">Содержание</div><ul class="oglav__list">{{contents}}</ul>';
    let contents = "";
    var elHeaders = document.querySelectorAll(".article-content__text h2, .article-content__text h3");
    if (!elHeaders.length) {
    } else {
      elHeaders.forEach((el, index) => {
        if (!el.id) {
          el.id = `title-${index}`;
        }
        var url = `#${el.id}`;
        contents += `<li class="oglav__item"><button data-goto-header data-goto="${url}" class="oglav__link">${el.textContent}</button></li>`;
      });
      document
        .querySelector(".article__oglav")
        .insertAdjacentHTML(
          "afterbegin",
          tpl.replace("{{contents}}", contents)
        );
    }
  }
}
generatorOglav();

// Проброс значения value с кнопки в форму
function formValue() {
  let openModalBtn = document.getElementsByClassName("price-item__order");

  let setAttrInput = document.querySelector("input[type=hidden]");

  for (let i = 0; i < openModalBtn.length; i++) {
    openModalBtn[i].addEventListener("click", function () {
      let val = openModalBtn[i].value; // Получаем value нажатой кнопки
      openModalWindow(val); // Передаём её в функцию
    });
  }

  function openModalWindow(val) {
    // В функции значение из нажатой кнопки
    if (openModalBtn.value === "") {
      setAttrInput.setAttribute("value", "");
    }
    setAttrInput.value = val; // Добавляем это значение
    console.log(setAttrInput);
  }
}
formValue();
