/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from "swiper";

import { Navigation } from "swiper/modules";

/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import "swiper/css";

// Инициализация слайдеров
function initSliders() {
  // Перечень слайдеров
  // Проверяем, есть ли слайдер на стронице

  // Указываем скласс нужного слайдера
  // Создаем слайдер
  var promotionSlider = new Swiper(".promotions__slider", {
    // Указываем скласс нужного слайдера
    // Подключаем модули слайдера
    // для конкретного случая
    modules: [Navigation],
    observer: true,
    slidesPerView: 4,
    spaceBetween: 25,
    observeParents: true,
    speed: 800,
    loop: true,
    lazy: true,

    // Кнопки "влево/вправо"
    navigation: {
      prevEl: ".promotions__slider-prev",
      nextEl: ".promotions__slider-next",
    },

    // Брейкпоинты

    breakpoints: {
      0: {
        slidesPerView: 1,
        //   centeredSlides: false,
        //   spaceBetween: 14,
        //   autoHeight: true,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  });
  var staffSlider = new Swiper(".staff__slider", {
    // Указываем скласс нужного слайдера
    // Подключаем модули слайдера
    // для конкретного случая
    modules: [Navigation],
    observer: true,
    slidesPerView: 5,
    spaceBetween: 60,
    observeParents: true,
    speed: 800,
    loop: true,
    lazy: true,

    // Кнопки "влево/вправо"
    navigation: {
      prevEl: ".staff__slider-prev",
      nextEl: ".staff__slider-next",
    },

    // Брейкпоинты

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1240: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
    },
  });
  var conditionSlider = new Swiper(".conditions__slider", {
    // Указываем скласс нужного слайдера
    // Подключаем модули слайдера
    // для конкретного случая
    modules: [Navigation],
    observer: true,
    slidesPerView: 3,
    spaceBetween: 24,
    observeParents: true,
    speed: 800,
    loop: true,
    lazy: true,

    // Кнопки "влево/вправо"
    navigation: {
      prevEl: ".conditions__slider-prev",
      nextEl: ".conditions__slider-next",
    },

    // Брейкпоинты

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
  var serviceSlider = new Swiper(".service-slider__slider", {
    // Указываем скласс нужного слайдера
    // Подключаем модули слайдера
    // для конкретного случая
    modules: [Navigation],
    observer: true,
    slidesPerView: 4,
    spaceBetween: 24,
    observeParents: true,
    speed: 800,
    loop: true,
    lazy: true,

    // Кнопки "влево/вправо"
    navigation: {
      prevEl: ".service-slider__slider-prev",
      nextEl: ".service-slider__slider-next",
    },

    // Брейкпоинты

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1240: {
        slidesPerView: 4,
      },
    },
  });
  var photoSlider = new Swiper(".photo__slider", {
    // Указываем скласс нужного слайдера
    // Подключаем модули слайдера
    // для конкретного случая
    modules: [Navigation],
    observer: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    observeParents: true,
    centeredSlides: true,
    speed: 800,
    loop: true,
    lazy: true,

    // Кнопки "влево/вправо"
    navigation: {
      prevEl: ".photo__slider-prev",
      nextEl: ".photo__slider-next",
    },

    // Брейкпоинты

    //  breakpoints: {
    //    0: {
    //      slidesPerView: 1,
    //    },
    //    768: {
    //      slidesPerView: 2,
    //    },
    //    992: {
    //      slidesPerView: 3,
    //    },
    //    1240: {
    //      slidesPerView: 4,
    //    },
    //  },
  });
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector(".swiper-scrollbar");
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});
