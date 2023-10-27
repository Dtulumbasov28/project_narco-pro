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
    var elHeaders = document.querySelectorAll(
      ".article-content__text h2, .article-content__text h3, .article-content__text h4"
    );
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
function universalForm() {
  // проверяем наличие формы
  var form = document.querySelector("#popup-universal");
  if (!form) {
    console.log("Не найдена универсальная форма");
    return false;
  }

  var interested = form.querySelector(".popup__input-title");
  var srcUrl = form.querySelector(".popup__input-url");

  // сброс до дефолтных
  document.body.addEventListener("click", function (e) {
    var btn = e.target.closest(".button__modal");
    if (btn) {
      if (interested) interested.value = "";
      if (srcUrl) srcUrl.value = window.location.href;
    }
  });

  // Наличие мест в пансионате
  document.body.addEventListener("click", function (e) {
    var positions_btn = e.target.closest(".button__modal");

    if (positions_btn) {
      var target_pension = positions_btn.closest(".price-item, .main-card, .service-slider__item, .service-pinned__item, .promotions__slide") || "";
      if (target_pension) {
        target_pension = target_pension.querySelector(".price-item__name, .main-card__heading, .service-slider__heading, .service-pinned__heading, .promotions__slide-heading");
        if (target_pension) {
          target_pension = target_pension.textContent;
        }
      }

      if (interested) {
        if (target_pension) {
          interested.value = target_pension;
        } else {
          interested.value = "";
        }
      }
    }
  });
}
universalForm();
