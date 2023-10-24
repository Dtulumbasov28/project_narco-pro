// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

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

!(function () {
  function e() {
    // auto Oglav
    var generateOglav = function () {
      var generated_classname = "generated-oglav"; // класс для сгенерированного
      var beforeHTML =
        '<div class="' +
        generated_classname +
        '"><p class="oglav_heading">Содержание</p><ol>'; //то, что мы будем добавлять перед группой ссылок - можно задать контейнер
      var generedLinks = "";
      var afterHTML = "</ol></div>"; //то, что мы будем добавлять после группы ссылок - можно закрыть контейнер
      var injectIn = ".article__oglav"; //место для добавления оглавления
      var searchContent = ".article__oglav";
      var glavs = ".article-content__text h2, .article-content__text h3"; //что считать за главы - h2, h3. Указываем с контейнером
      var addH2 = "";
      var addH3 = ""; //добавляемый класс к h3. Будем использовать для красоты и отступов
      var forbidUrls = ["/"]; //массив
      var stope = ".oglav"; //.page-node .content .field-item a[href^=#]
      var whitelist = ".article-content__text h2"; //Белый лист. Будем работать, если этот элемент есть на странице
      var methodAdd = 1; //метод добавления. 1 - prepend, 2 - append, 3 - добавить после элемента, 4 - добавить перед элементом
      var stylingList = 2; //стилизация. 1 - обычный див с <a>, 2 - нумерованный список <ol>, 3 - ненумерованный список <ul>
      var smoothSelector = "." + generated_classname + " a"; // селектор для плавного скролла ссылок оглавления
      var fromTopSelector = 140; //селектор шапки, чтобы правильно отступать. Или число
      var fromTopSelector_add = 0; // добавка к отступу
      var fromTopSelector_mob = 0; //селектор мобильной шапки, чтобы правильно отступать. Или число
      var fromTopSelector_mob_add = 20; // добавка к мобильному отступу
      var mobile_start = 1240; // откуда начинать считать мобильники

      var smoothScroll = function (params) {
        var smoothSelector = params.smoothSelector;
        var fromTopSelector = params.fromTopSelector;
        var fromTopSelector_add = params.fromTopSelector_add || 0;
        var fromTopSelector_mob = params.fromTopSelector_mob || "";
        var fromTopSelector_mob_add = params.fromTopSelector_mob_add || 0;
        var mobile_start = params.mobile_start || 0;

        jQuery(smoothSelector).click(function () {
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            var target = jQuery(this.hash);
            target = target.length
              ? target
              : jQuery("[name=" + this.hash.slice(1) + "]");

            var header_height = 0;

            // проверить, мобильные или пк
            if (document.documentElement.clientWidth <= mobile_start) {
              fromTopSelector = fromTopSelector_mob;
              fromTopSelector_add = fromTopSelector_mob_add;
            }

            if (typeof fromTopSelector == "number") {
              header_height = fromTopSelector;
            } else if (
              fromTopSelector != "" &&
              jQuery(fromTopSelector).length > 0
            ) {
              header_height = jQuery(fromTopSelector).outerHeight();
            }

            fromtop = target.offset().top - header_height - fromTopSelector_add;
            //console.log(fromtop);
            if (target.length) {
              jQuery("html,body").animate(
                {
                  scrollTop: fromtop,
                },
                0
              );
              return false;
            }
          }
        });
      };

      var createOglav = function () {
        if (whitelist !== "" || jQuery(whitelist).length > 0) {
          //дополнительная проверка белым листом.
          //console.log('проверка белым элементом прошла');
          if (
            jQuery.inArray(window.location.pathname, forbidUrls) == -1 &&
            jQuery(glavs).length > 0 &&
            jQuery(injectIn).length > 0 &&
            jQuery(searchContent).length > 0 &&
            jQuery(stope).length == false
          ) {
            //Если текущая ссылка не в списке запрещенных, если есть элементы для построения оглавления, если есть место для врезки оглавления, если есть место где искать сам контент и если нет стоп-крана
            //console.log('ввсе проверки прошли');
            jQuery(glavs).each(function (i) {
              //console.log('выборка h2/h3 прошла, начинаем присваивать id');
              var current = jQuery(this);
              var current_text = current.text();

              //console.log(current_text);

              // удалим ":" из конца
              if (current_text.slice(-1) == ":") {
                current_text = current_text.slice(0, -1);
                //console.log('Удалили ":"');
              }

              current.attr("id", "zagol-" + i); //добавляем id вида zagol-1
              //console.log('id назначен');
              if (current.is("h3")) {
                current.addClass(addH3);
                //console.log('Добавлен класс эл-у h3');
                generedLinks +=
                  '<li><a class="oglav-h3" href="#zagol-' +
                  i +
                  '">' +
                  current_text +
                  "</a></li>";
                //продолжение реализации списков

                if (stylingList > 1) {
                  //подготовка к проверке следующего элемента в массиве выбранных (glavs)
                  var curElInd = jQuery(glavs).index(current);
                  if (
                    jQuery(glavs)
                      .eq(curElInd + 1)
                      .is("h2") ||
                    current == jQuery(glavs).last()
                  ) {
                    generedLinks += "</li>"; //закрываем
                  }
                }

                //console.log('добавили в строку наш h3');
              } else {
                switch (
                  stylingList //реализация стилизации под список
                ) {
                  case 1:
                    generedLinks +=
                      '<a href="#zagol-' + i + '">' + current_text + "</a>";
                    break;
                  case 2:
                  case 3:
                    generedLinks += "<li>";
                    generedLinks +=
                      '<a href="#zagol-' + i + '">' + current_text + "</a>";
                    //подготовка к проверке следующего элемента в массиве выбранных (glavs)
                    var curElInd = jQuery(glavs).index(current);
                    if (
                      jQuery(glavs)
                        .eq(curElInd + 1)
                        .is("h3") ||
                      current == jQuery(glavs).last()
                    ) {
                      generedLinks += "</li>";
                    }

                    break;
                }
                //console.log('добавили в строку наш h2');
              }
            });
            switch (
              methodAdd //выбираем, как добавлять наш итог
            ) {
              case 1:
                jQuery(injectIn + ":first").prepend(
                  beforeHTML + generedLinks + afterHTML
                ); // финал. Добавляем готовое оглавление
                console.log("добавили наше оглавление к эл-у в начале");
                break;
              case 2:
                jQuery(injectIn + ":first").append(
                  beforeHTML + generedLinks + afterHTML
                ); // финал. Добавляем готовое оглавление
                //console.log('добавили наше оглавление к эл-у в конце');
                break;
              case 3:
                jQuery(injectIn + ":first").after(
                  beforeHTML + generedLinks + afterHTML
                ); // финал. Добавляем готовое оглавление
                //console.log('добавили наше оглавление после эл-а');
                break;
              case 4:
                jQuery(injectIn + ":first").before(
                  beforeHTML + generedLinks + afterHTML
                ); // финал. Добавляем готовое оглавление
                //console.log('добавили наше оглавление перед эл-ом');
                break;
            }

            // теперь нам нужно подвязать плавный скролл
            var smoothScroll_obj = {
              smoothSelector: smoothSelector,
              fromTopSelector: fromTopSelector,
              fromTopSelector_add: fromTopSelector_add,
              fromTopSelector_mob: fromTopSelector_mob,
              fromTopSelector_mob_add: fromTopSelector_mob_add,
              mobile_start: mobile_start,
            };
            smoothScroll(smoothScroll_obj);
          }
        }
      };
      jQuery(document).ready(createOglav);
    };
    generateOglav();
  }
  "interactive" == document.readyState || "complete" == document.readyState
    ? e()
    : document.addEventListener("DOMContentLoaded", function () {
        e();
      });
})();
console.log(111);
