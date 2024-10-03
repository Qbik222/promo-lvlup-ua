"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function () {
  var apiURL = 'https://fav-prom.com/api_level_up_game_ua';
  var PROMO_START_DATE = new Date("2024-10-01T21:00:00Z");
  var PROMO_DURATION_WEEKS = 4;
  var unauthMsgs = document.querySelectorAll('.unauth-msg'),
    participateBtns = document.querySelectorAll('.btn-join'),
    redirectBtns = document.querySelectorAll('.took-part'),
    weeksSelector = document.querySelectorAll('.table__list-item'),
    weeksContainer = document.querySelector('.table__list'),
    questItems = document.querySelectorAll('.slide'),
    questIcons = document.querySelectorAll('.quests__icons-item'),
    topResultsTable = document.getElementById('top-users');
  var locale = 'en';
  var ukLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  if (ukLeng) locale = 'uk';
  if (enLeng) locale = 'en';
  var DEBUG = false;
  var regPromo = false;
  var i18nData = {};
  var selectedWeekTabId = 0;
  var userId; //=10030026;
  // userId = 10030026;

  function loadTranslations() {
    return fetch("".concat(apiURL, "/translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
      i18nData = json;
      translate();
    });
  }
  function translate() {
    var elems = document.querySelectorAll('[data-translate]');
    if (elems && elems.length) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        var translated = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.innerHTML = translated;
        elem.removeAttribute('data-translate');
        var dataDecor = elem.getAttribute('data-decor');
        if (dataDecor) {
          elem.removeAttribute('data-decor');
          elem.setAttribute('data-decor', translated);
        }
      });
    }
    if (locale === 'en') {
      mainPage.classList.add('en');
    }
    refreshLocalizedClass();

    // Після перекладу викликаємо функцію спостереження
    var typeAnim = document.querySelectorAll('.type-anim');
    observeElements(typeAnim); // Запускаємо спостереження тільки після завершення перекладу
  }

  function refreshLocalizedClass(element, baseCssClass) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(baseCssClass + lang);
    }
    element.classList.add(baseCssClass + locale);
  }
  var request = function request(link, extraOptions) {
    return fetch(apiURL + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      return res.json();
    });
  };
  var mainPage = document.querySelector('.fav-page');
  setTimeout(function () {
    return mainPage.classList.add('_overflow-hidden');
  }, 1000);

  //Yura Code
  window.addEventListener("orientationchange", function () {
    location.reload();
  });
  var week = localStorage.getItem("week") ? parseInt(localStorage.getItem("week")) : 1;
  var infoSlidesMob = document.querySelectorAll(".slide__info-mob");
  var infoSlidesMobPopup = document.querySelectorAll(".slide__info-bottom");
  var slideBtnLeft = document.querySelector(".slide__move-left");
  var slideBtnRight = document.querySelector(".slide__move-right");
  infoSlidesMob.forEach(function (item, indexItem) {
    item.addEventListener("click", function () {
      infoSlidesMobPopup.forEach(function (popup, indexPopup) {
        if (indexItem === indexPopup) {
          popup.classList.toggle("_active");
          popup.parentElement.parentElement.parentElement.classList.toggle("_active");
          item.classList.toggle("_active");
        }
      });
    });
  });
  slideBtnLeft.addEventListener("click", function () {
    infoSlidesMob.forEach(function (item) {
      if (item.parentElement.parentElement.parentElement !== null) {
        item.style.pointerEvents = "none";
        setTimeout(function () {
          item.style.pointerEvents = "initial";
        }, 1000);
      }
    });
    infoSlidesMobPopup.forEach(function (item) {
      if (item.parentElement.parentElement.parentElement !== null) {
        item.classList.remove("_active");
        item.parentElement.parentElement.parentElement.classList.remove("_active");
        item.classList.remove("_active");
      }
    });
  });
  slideBtnRight.addEventListener("click", function () {
    infoSlidesMob.forEach(function (item) {
      if (item.parentElement.parentElement.parentElement !== null) {
        item.style.pointerEvents = "none";
        setTimeout(function () {
          item.style.pointerEvents = "initial";
        }, 1000);
      }
    });
    infoSlidesMobPopup.forEach(function (item) {
      if (item.parentElement.parentElement.parentElement !== null) {
        item.classList.remove("_active");
        item.parentElement.parentElement.parentElement.classList.remove("_active");
        item.classList.remove("_active");
      }
    });
  });

  /// гліч слайдер
  function createSlider(slides, leftBtn, rightBtn, slidesIcons, current, path, img, week, coverflow, coverflowOffWidth, subtitles, copySlides) {
    var coverflowToggler = true;
    if (window.innerWidth < coverflowOffWidth) {
      coverflowToggler = false;
    }

    // function coverFlowClasses(right, left, slides){
    //     slides.forEach((slide, i) =>{
    //         if(coverflowToggler){
    //             if(current === i){
    //                 if(slide.previousElementSibling === null){
    //                     slides[slides.length -1].classList.add(right)
    //                 }else{
    //                     slide.previousElementSibling.classList.add(right)
    //                 }
    //                 if(slide.nextSibling === null){
    //                     slides[0].classList.add(left)
    //                 }
    //                 else{
    //                     slide.nextSibling.classList.add(left)
    //                 }
    //             }
    //         }
    //     })
    // }
    function coverFlowClasses(right, left, slides) {
      slides.forEach(function (slide, i) {
        if (coverflowToggler) {
          if (current === i) {
            var prevIndex = (i - 1 + slides.length) % slides.length;
            slides[prevIndex].classList.add(right);
            var nextIndex = (i + 1) % slides.length;
            slides[nextIndex].classList.add(left);
          }
        }
      });
    }
    slides = document.querySelectorAll(slides);
    subtitles = document.querySelectorAll(subtitles);
    leftBtn = document.querySelector(leftBtn);
    rightBtn = document.querySelector(rightBtn);
    slidesIcons = document.querySelectorAll(slidesIcons);
    var glitchLayers = [];
    slides.forEach(function (slide) {
      glitchLayers = [].concat(_toConsumableArray(glitchLayers), _toConsumableArray(slide.querySelectorAll(".glitch__layer")));
    });
    if (slides[current]) slides[current].classList.add("_active");
    if (coverflow) {
      coverFlowClasses("right-cover", "left-cover", slides);
    }
    function subtitlesInit(subtitles, slides) {
      // console.log(slides)
      slides.forEach(function (slide, slideIndex) {
        if (slide.classList.contains("_active")) {
          subtitles.forEach(function (subtitle, subtitleIndex) {
            subtitle.classList.remove("_active");
            if (slideIndex === subtitleIndex) {
              subtitle.classList.add("_active");
            }
          });
        }
      });
    }
    function updateGlitchLayers(path, index, direction) {
      glitchLayers.forEach(function (layer) {
        layer.classList.forEach(function (className) {
          if (className.startsWith("slide-info-glitch")) {
            layer.classList.remove("slide-info-glitch");
          }
          if (className.startsWith("quest")) {
            layer.classList.remove(className);
          }
        });
        var questNumber = getSlideNum(slides[current]);
        if (layer.parentElement.parentElement.classList[0] !== "slide__info") {
          // console.log(direction)
          // if (copySlides) {
          //     let nextClass, prevClass, currentClass;
          //
          //     if (slides[current].nextSibling) {
          //         nextClass = slides[current].nextSibling.classList[1];
          //     }
          //     if (slides[current].previousElementSibling) {
          //         prevClass = slides[current].previousElementSibling.classList[1];
          //     }
          //     currentClass = slides[current].classList[1];
          //
          //     switch (true) {
          //         case (direction === "right" && nextClass && nextClass !== currentClass):
          //             layer.classList.add(nextClass);
          //             break;
          //
          //         case (direction === "left" && prevClass && prevClass !== currentClass):
          //             layer.classList.add(prevClass);
          //             break;
          //
          //         case (direction === "left" && slides[current].previousElementSibling === null):
          //             layer.classList.add(`${slides[slides.length - 1].classList[1]}`);
          //             break;
          //
          //         case (direction === "right" && slides[current].nextSibling === null):
          //             layer.classList.add(`${slides[1].classList[1]}`);
          //             break;
          //
          //         default:
          //             layer.classList.add(currentClass);
          //             break;
          //     }
          // }

          if (copySlides) {
            var nextClass, prevClass, currentClass;

            // Визначаємо класи для поточного слайда, попереднього і наступного
            currentClass = slides[current].classList[1];

            // Визначаємо індекси для наступного і попереднього слайда
            var nextIndex = (current + 1) % slides.length; // Наступний слайд (якщо current — останній, тоді повертаємось до початку)
            var prevIndex = (current - 1 + slides.length) % slides.length; // Попередній слайд (якщо current — перший, тоді переходимо на останній)

            // Визначаємо класи для наступного і попереднього слайда
            nextClass = slides[nextIndex].classList[1];
            prevClass = slides[prevIndex].classList[1];
            switch (true) {
              case direction === "right" && nextClass !== currentClass:
                layer.classList.add(nextClass);
                break;
              case direction === "left" && prevClass !== currentClass:
                layer.classList.add(prevClass);
                break;
              case direction === "left" && current === 0:
                layer.classList.add(slides[slides.length - 1].classList[1]);
                break;
              case direction === "right" && current === slides.length - 1:
                layer.classList.add(slides[0].classList[1]);
                break;
              default:
                layer.classList.add(currentClass);
                break;
            }
          } else {
            layer.style.background = path;
          }
        } else {
          layer.classList.add("slide-info-glitch");
        }
      });
    }
    function getSlideNum(slide) {
      var questClass = _toConsumableArray(slide.classList).find(function (className) {
        return className.startsWith("quest");
      });
      if (questClass) {
        return parseInt(questClass.replace("quest", ""));
      }
      return 1;
    }
    function moveSlider(slides, direction) {
      if (direction === "left") {
        --current;
        if (current < 0) current = slides.length - 1;
      } else if (direction === "right") {
        ++current;
        if (current > slides.length - 1) current = 0;
      }
      slides.forEach(function (slide, i) {
        slide.classList.toggle("_active", i === current);
        slide.classList.remove("glitch");
      });
      SlideIconsInit(slidesIcons, current);
    }
    function SlideIconsInit(icons, current) {
      var wrapper = icons[0].parentElement.parentElement;
      // console.log(wrapper)

      icons.forEach(function (icon, iconIndex) {
        icon.classList.toggle("_current", current === iconIndex);
        if (current === iconIndex) {
          var iconOffsetLeft = icon.offsetLeft;
          var iconWidth = icon.offsetWidth;
          var wrapperWidth = wrapper.offsetWidth;
          wrapper.scrollTo({
            left: iconOffsetLeft - wrapperWidth / 2 + iconWidth / 2,
            behavior: 'smooth'
          });
        }
      });
    }
    function handleClick(direction) {
      slides[current].classList.add("glitch");
      coverFlowClasses("glitch", "glitch", slides);
      rightBtn.style.pointerEvents = "none";
      leftBtn.style.pointerEvents = "none";
      var nextSlideIndex = direction === "left" ? current === 0 ? slides.length : current : current === slides.length - 1 ? 1 : current + 2;
      if (week === 2) {
        updateGlitchLayers("url(\"".concat(path).concat(nextSlideIndex + 6, "/").concat(img, "\") no-repeat 0 0/contain"), nextSlideIndex, direction);
      } else {
        updateGlitchLayers("url(\"".concat(path).concat(nextSlideIndex, "/").concat(img, "\") no-repeat 0 0/contain"), nextSlideIndex, direction);
      }
      setTimeout(function () {
        glitchLayers.forEach(function (layer) {
          layer.classList.forEach(function (className) {
            if (className.startsWith("slide-info-glitch") || className.startsWith("quest")) {
              layer.classList.remove(className);
            }
          });
        });
        moveSlider(slides, direction);
        rightBtn.style.pointerEvents = "initial";
        leftBtn.style.pointerEvents = "initial";
        subtitlesInit(subtitles, slides);
        if (coverflow) {
          slides.forEach(function (slide) {
            slide.classList.remove("right-cover");
            slide.classList.remove("left-cover");
            slide.classList.remove("glitch");
          });
          coverFlowClasses("right-cover", "left-cover", slides);
        }
      }, 1000);
    }
    leftBtn.addEventListener("click", function () {
      return handleClick("left");
    });
    rightBtn.addEventListener("click", function () {
      return handleClick("right");
    });
    slidesIcons.forEach(function (icon, i) {
      icon.addEventListener("click", function (e) {
        if (e.target.classList.contains("_current")) return;
        setTimeout(function () {
          slidesIcons.forEach(function (item) {
            return item.classList.remove("_current");
          });
        }, 1000);
        slides[current].classList.add("glitch");
        current = i;
        if (week === 2) {
          updateGlitchLayers("url(\"".concat(path).concat(current + 7, "/").concat(img, "\") no-repeat 0 0/contain"), current + 1);
        } else {
          updateGlitchLayers("url(\"".concat(path).concat(current + 1, "/").concat(img, "\") no-repeat 0 0/contain"), current + 1);
        }
        setTimeout(function () {
          SlideIconsInit(slidesIcons, current);
          slides.forEach(function (slide, index) {
            slide.classList.toggle("_active", index === current);
            slide.classList.remove("glitch");
            subtitlesInit(subtitles, slides);
          });
          rightBtn.style.pointerEvents = "initial";
          leftBtn.style.pointerEvents = "initial";
        }, 1000);
      });
    });
    SlideIconsInit(slidesIcons, current);
    subtitlesInit(subtitles, slides);
  }
  function setPopups(popups, popupBtns, closeBtns) {
    popups = document.querySelectorAll(popups);
    popupBtns = document.querySelectorAll(popupBtns);
    closeBtns = document.querySelectorAll(closeBtns);
    popupBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        popups.forEach(function (popup) {
          popup.classList.remove("active");
          if (e.target.parentElement === popup.parentElement) {
            popup.classList.toggle("active");
          }
        });
      });
    });
    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        popups.forEach(function (popup) {
          popup.classList.remove("active");
        });
      });
    });
  }
  var slides = document.querySelectorAll(".slide");
  var slidesIcons = document.querySelectorAll(".quests__icons-item");
  // if(week === 1){
  //     slides.forEach((slide, i) =>{
  //
  //         if(i >= 6 || slide.classList.contains(`quest${i}`)){
  //             slide.remove()
  //         }
  //     })
  //     slidesIcons.forEach((icon, i) =>{
  //         if(i >= 6 || icon.classList.contains(`quest${i}`)){
  //             icon.remove()
  //         }
  //     })
  // }
  // if(week === 2){
  //     for (let i = 1; i <= 6; i++){
  //         let week1 = document.querySelectorAll(`.quest${i}`)
  //         week1.forEach(item => {
  //             item.remove()
  //         })
  //
  //     }
  // }
  var questsPath = "https://fav-prom.com/html/level-up-game-ua/img/quests/slide";
  function checkMediaQueries(oldPath, newPath) {
    var mediaQuery600 = window.matchMedia("(max-width: 600px)");
    var mediaQuery950Landscape = window.matchMedia("(max-width: 950px) and (max-height: 600px) and (orientation: landscape)");
    if (mediaQuery600.matches) {
      oldPath = newPath;
    } else if (mediaQuery950Landscape.matches) {
      oldPath = newPath;
    } else {
      oldPath = newPath;
    }
    return oldPath;
  }
  questsPath = checkMediaQueries(questsPath, "https://fav-prom.com/html/level-up-game-ua/img/quests/mob/slide");
  createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 0, questsPath, "pers.png", null, false, null, ".quests__subtitle", true);
  createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 0, "https://fav-prom.com/html/level-up-game-ua/img/prize/slide", "prize.png", null, true, 1150, false);
  setPopups(".guide__info", ".guide__info-btn", ".guide__info-close");
  setPopups(".prize__slide-popup", ".prize__slide-info-btn", ".prize__slide-close");
  setPopups(".table__info-popup", ".table__info", ".table__info-close");
  var prizeRightBtn = document.querySelector(".prize__move-right");
  var prizeLeftBtn = document.querySelector(".prize__move-left");
  var prizePopups = document.querySelectorAll(".prize__slide-popup");
  function closeDrop(drops) {
    drops.forEach(function (drop) {
      drop.classList.remove("active");
    });
  }
  prizeRightBtn.addEventListener("click", function () {
    closeDrop(prizePopups);
  });
  prizeLeftBtn.addEventListener("click", function () {
    closeDrop(prizePopups);
  });

  /// анімація динамічного набору текст
  function dynamicTypewriter(element, speed, callback) {
    var textArray = element.textContent.trim().split(' ');
    var litArr = textArray.join(' ').split(/(\s+)/).filter(function (_char) {
      return _char.trim() !== '' || _char === ' ';
    });
    var wordIndex = 0;
    var charIndex = 0;
    var currentText = '';
    element.classList.add("_opacity");
    function typeWord() {
      if (wordIndex === litArr.length) {
        element.classList.remove('typewriter-cursor');
        return;
      }
      var currentWord = textArray[wordIndex];
      if (currentWord === undefined) return;
      if (charIndex < currentWord.length) {
        currentText += currentWord.charAt(charIndex);
        element.innerText = currentText;
        charIndex++;
        setTimeout(typeWord, speed);
      } else {
        currentText += ' ';
        element.innerText = currentText;
        charIndex = 0;
        wordIndex++;
        setTimeout(typeWord, speed);
      }
    }
    element.classList.add('typewriter-cursor');
    typeWord();
  }
  function observeElements(typeElems) {
    var options = {
      root: null,
      threshold: 0.5
    };
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          dynamicTypewriter(entry.target, 35, function () {});
          observer.unobserve(entry.target);
        }
      });
    }, options);
    typeElems.forEach(function (item) {
      observer.observe(item);
    });
  }
  var typeAnim = document.querySelectorAll('.type-anim');
  observeElements(typeAnim);

  /// progress bar анімація
  function progressAnim(start, elem, elemWrap, currentPosition) {
    if (currentPosition <= 100) {
      elem.style.width = "".concat(currentPosition, "%");
      elemWrap.innerText = "".concat(currentPosition, "%");
      ++currentPosition;
      setTimeout(function () {
        return progressAnim(start, elem, elemWrap, currentPosition);
      }, 70);
    } else if (currentPosition >= 100) {
      currentPosition = start;
      setTimeout(function () {
        return progressAnim(start, elem, elemWrap, currentPosition);
      }, 70);
    }
  }
  var progressBar = document.querySelector(".info__progress-bar");
  var progressWrap = document.querySelector(".info__progress-text");
  progressAnim(40, progressBar, progressWrap, 40);

  // popups
  var tablePopupBtn = document.querySelector(".table__btn");
  var closePopups = document.querySelector(".popups__close");
  var popupsWrap = document.querySelector(".popups");
  tablePopupBtn.addEventListener("click", function () {
    popupsWrap.classList.add("_table");
    document.body.classList.add("_overflow-hidden");
  });
  closePopups.addEventListener("click", function () {
    popupsWrap.classList.remove("_table");
    popupsWrap.classList.remove("_done");
    document.body.classList.remove("_overflow-hidden");
  });

  // for test

  // document.querySelector(".dark-btn").addEventListener("click", () =>{
  //     document.body.classList.toggle("dark")
  // })
  // document.querySelector(".en-lng").addEventListener("click", () =>{
  //     document.querySelector(".fav-page").classList.toggle("en")
  // })
  //
  // const donePopupBtn = document.querySelector(".done-popup")
  //
  // donePopupBtn.addEventListener("click", () =>{
  //     popupsWrap.classList.toggle("_done")
  //     document.body.classList.toggle("_overflow-hidden")
  //
  // })
  //
  // const week1 = document.querySelector(".week1");
  // const week2 = document.querySelector(".week2");
  //
  // week1.addEventListener("click", () => {
  //     localStorage.setItem("week", 1);
  //     location.reload();
  // });
  //
  // week2.addEventListener("click", () => {
  //     localStorage.setItem("week", 2);
  //     location.reload();
  // });

  // main logic
  function getUsers(week) {
    var url = resolveUsersUrl(week);
    return request(url).then(function (users) {
      return users.map(function (userOrId) {
        return typeof userOrId === 'number' ? {
          userid: userOrId
        } : userOrId;
      });
    });
  }
  function resolveUsersUrl(week) {
    return week ? "/users/".concat(week) : '/users';
  }
  var InitPage = function InitPage() {
    weeksSelector.forEach(function (w, i) {
      return w.addEventListener('click', function (e) {
        if (i === selectedWeekTabId) {
          return;
        }
        weeksSelector.forEach(function (s) {
          return s.classList.remove('active');
        });
        w.classList.add('active');
        selectedWeekTabId = i;
        refreshUsers(selectedWeekTabId + 1);
      });
    });
    refreshUsers();
  };
  var questsCache = {};
  function getQuests() {
    if (DEBUG) {
      var quests = [{
        questNumber: 11,
        points: 100,
        maxPoints: 100,
        status: 'closed'
      }, {
        questNumber: 12,
        points: 10,
        maxPoints: 100,
        status: 'active',
        registered: true
      }];
      return Promise.resolve(quests);
    }
    var url = userId ? "/quests/".concat(userId) : '/quests';
    var cached = questsCache[url];
    if (cached) {
      return Promise.resolve(cached);
    }
    return request(url).then(function (quests) {
      questsCache[url] = quests;
      return quests;
    });
  }
  var activeFound = false;
  function initQuestBtns() {
    questItems.forEach(function (item) {
      var questNumber = +item.dataset.quest;
      var playBtn = item.querySelector('.play-btn');
      var regBtn = item.querySelector('.btn-quest');
      regBtn.addEventListener('click', function (e) {
        registerInQuest(questNumber).then(function (res) {
          playBtn.classList.remove('hide');
          regBtn.classList.add('hide');
        });
      });
    });
  }
  function refreshQuests() {
    getQuests().then(function (quests) {
      var questsById = {};
      (quests || []).forEach(function (q) {
        questsById[q.questNumber] = q;
      });

      // const sliderNextBtn = document.querySelector('.slide__move-right');
      questItems.forEach(function (item, idx) {
        var questNumber = +item.dataset.quest;
        var quest = questsById[questNumber];
        var questIcon = questIcons[idx];

        // refresh status
        item.classList.remove('_lock', '_done', '_undone');
        questIcon.classList.remove('_lock', '_done', '_undone');
        if (!quest) {
          item.classList.add('_lock');
          questIcon.classList.add('_lock');
          return;
        }
        var status = quest.status;
        var finished = quest.points >= quest.maxPoints;
        if (finished) {
          item.classList.add('_done');
          questIcon.classList.add('_done');
        } else if (status === 'active') {
          // item.classList.add('_active');
          // questIcon.classList.add('_active');
        } else if (status === 'future') {
          item.classList.add('_lock');
          questIcon.classList.add('_lock');
        } else {
          item.classList.add('_undone');
          questIcon.classList.add('_undone');
        }
        if (status === 'active') {
          activeFound = true;
        }

        // move slider to active
        // if (!activeFound) {
        //     sliderNextBtn.click();
        // }

        if (!userId) {
          return;
        }

        // update progress bar
        var maxProgress = item.querySelector('.total-progress');
        var progressDiv = item.querySelector('.current-progress');
        var progressBar = item.querySelector('.slide__progress-bar');
        var points = Math.min(quest.points, quest.maxPoints);
        var progress = Math.floor(points / quest.maxPoints * 100);
        progressBar.style.width = "".concat(progress, "%");
        progressDiv.innerHTML = "".concat(points);
        maxProgress.innerHTML = "".concat(quest.maxPoints);

        // update btns
        var playBtn = item.querySelector('.play-btn');
        var regBtn = item.querySelector('.btn-quest');
        var promoRegBtn = item.querySelector('.btn-join');
        if (!regPromo) {
          promoRegBtn && promoRegBtn.classList.remove('hide');
        } else {
          promoRegBtn && promoRegBtn.classList.add('hide');
          if (quest.registered) {
            playBtn.classList.remove('hide');
          } else {
            regBtn.classList.remove('hide');
          }
        }
      });
    });
  }
  function init() {
    refreshWeekTabs();
    initQuestBtns();
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      checkUserAuth().then(setupPage);
    } else {
      checkUserAuth().then(setupPage);
      var c = 0;
      var i = setInterval(function () {
        if (c < 50) {
          if (!!window.g_user_id) {
            userId = window.g_user_id;
            checkUserAuth().then(setupPage);
            clearInterval(i);
          }
        } else {
          clearInterval(i);
        }
      }, 200);
    }
    participateBtns.forEach(function (authBtn, i) {
      authBtn.addEventListener('click', function (e) {
        e.preventDefault();
        participate();
      });
    });
  }
  function setupPage() {
    InitPage();
    refreshQuests();
  }
  function participate() {
    if (!userId) {
      return;
    }
    var params = {
      userid: userId
    };
    request('/user', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      participateBtns.forEach(function (item) {
        return item.classList.add('hide');
      });
      redirectBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
      regPromo = true;
      setupPage();
    });
  }
  function registerInQuest(questNumber) {
    var params = {
      userid: userId,
      questNumber: questNumber
    };
    return request('/quest', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }
  function refreshUsers(week) {
    getUsers(week).then(function (users) {
      renderUsers(users);
      translate();
    });
  }
  var renderUsers = function renderUsers(users) {
    topResultsTable.classList.remove('hide');
    // resultsTableOther.classList.remove('hide');

    if (users && users.length) {
      var topUsers = users.slice(0, 10);
      var currentUser = userId && users.find(function (user) {
        return user.userid === userId;
      });
      var currentUserIndex = currentUser && users.indexOf(currentUser);
      if (currentUserIndex > 10) {
        topUsers.push(currentUser);
      }
      populateUsersTable(topUsers, userId, topResultsTable, users);

      //     const currentUserQuestIndex = currentUser && questUsers.indexOf(currentUser);

      //     let otherUsers;
      //     if (!currentUserIndex || currentUserIndex < 10) {
      //         otherUsers = users.slice(10, 13);
      //     } else {
      //         otherUsers = users.slice(Math.max(currentUserIndex - 1, 10), currentUserIndex + 2);
      //     }

      //     let otherQuestUsers;
      //     if (!currentUserQuestIndex || currentUserQuestIndex < 10) {
      //         otherQuestUsers = questUsers.slice(10, 13);
      //     } else {
      //         otherQuestUsers = questUsers.slice(Math.max(currentUserQuestIndex - 1, 10), currentUserQuestIndex + 2);
      //     }

      //     if (otherUsers && otherUsers.length) {
      //         populateUsersTable(otherUsers, userId, resultsTableOther, users);
      //         populateUsersTable(otherQuestUsers, userId, questTableOther, questUsers, true);
      //     }
    }
  };

  function populateUsersTable(users, currentUserId, table, allUsers, quest) {
    table.innerHTML = '';
    if (users && users.length) {
      users.forEach(function (user, index) {
        var checkCurrentUser = currentUserId && currentUserId === user.userid;
        var additionalUserRow = document.createElement('div');
        if (checkCurrentUser) {
          additionalUserRow.classList.add('you');
        }
        var place = allUsers.indexOf(user) + 1;
        var placeClass;
        if (table.id === 'top-users' || table.id === 'questsTable') {
          if (index === 0) {
            placeClass = 'gold';
          } else if (index === 1) {
            placeClass = 'silver';
          } else if (index === 2) {
            placeClass = 'bronze';
          }
        }
        var prizeKey = getPrizeTranslationKey(place);
        additionalUserRow.classList.add('table__row');
        if (placeClass) {
          additionalUserRow.classList.add(placeClass);
        }
        additionalUserRow.innerHTML = "\n                    <div class=\"table__row-item\">".concat(place, "</div>\n                    <div class=\"table__row-item\">").concat(checkCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n                    <div class=\"table__row-item\">").concat(user.points && !isNaN(user.points) ? user.points : 0, "</div>\n                    <div class=\"table__row-item magenta\">").concat(prizeKey ? translateKey(prizeKey) : ' - ', "</div>\n                ");
        table.append(additionalUserRow);
      });
    }
  }
  function getPrizeTranslationKey(place) {
    if (place <= 10) {
      return "prize_".concat(place);
    } else if (place <= 20) {
      return "prize_11-20";
    } else if (place <= 30) {
      return "prize_21-30";
    } else if (place <= 40) {
      return "prize_31-40";
    } else if (place <= 50) {
      return "prize_41-50";
    } else if (place <= 70) {
      return "prize_51-70";
    } else if (place <= 100) {
      return "prize_71-100";
    } else if (place <= 150) {
      return "prize_101-150";
    } else if (place <= 200) {
      return "prize_151-200";
    } else if (place <= 250) {
      return "prize_201-250";
    } else if (place <= 300) {
      return "prize_251-300";
    } else if (place <= 350) {
      return "prize_301-350";
    } else if (place <= 400) {
      return "prize_351-400";
    } else if (place <= 450) {
      return "prize_401-450";
    } else if (place <= 500) {
      return "prize_451-500";
    } else if (place <= 550) {
      return "prize_501-550";
    } else if (place <= 600) {
      return "prize_551-600";
    } else if (place <= 650) {
      return "prize_601-650";
    } else if (place <= 700) {
      return "prize_651-700";
    } else if (place <= 750) {
      return "prize_701-750";
    }
  }
  function translateKey(key) {
    if (!key) {
      return;
    }
    return i18nData[key] || key;
  }
  function maskUserId(userId) {
    return "**" + userId.toString().slice(2);
  }
  var checkUserAuth = function checkUserAuth() {
    if (regPromo) {
      return Promise.resolve(true);
    }
    if (userId) {
      var _iterator = _createForOfIteratorHelper(unauthMsgs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var unauthMes = _step.value;
          unauthMes.classList.add('hide');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return request("/favuser/".concat(userId, "?nocache=1")).then(function (res) {
        if (res._id) {
          regPromo = true;
          participateBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          redirectBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
        } else {
          participateBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
        }
        return !!res._id;
      });
    } else {
      var _iterator2 = _createForOfIteratorHelper(participateBtns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var participateBtn = _step2.value;
          participateBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(unauthMsgs),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _unauthMes = _step3.value;
          _unauthMes.classList.remove('hide');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return Promise.resolve(false);
    }
  };
  loadTranslations().then(init);
  function refreshWeekTabs() {
    var recentWeekRanges = calculateRecentPromoWeeks();
    selectedWeekTabId = recentWeekRanges.length - 1;
    if (!recentWeekRanges || recentWeekRanges.length === 0) {
      // promo not started yet
      weeksContainer.classList.add('hide');
      return;
    }
    for (var i = 0; i < weeksSelector.length; i++) {
      var weekRange = recentWeekRanges[i];
      var weekSelector = weeksSelector[i];
      if (!weekRange) {
        weekSelector.classList.add('hide');
      }
    }
    weeksSelector.forEach(function (w, i) {
      w.classList.remove('active');
      if (i === selectedWeekTabId) {
        w.classList.add('active');
      }
    });
  }
  function calculateRecentPromoWeeks() {
    var currStart = PROMO_START_DATE;
    var currEnd = PROMO_START_DATE;
    var today = new Date();
    var recentWeeks = [];
    var weekCnt = 0;
    var weekDiff = 7;
    while (currEnd <= today && weekCnt < PROMO_DURATION_WEEKS) {
      currStart = currEnd;
      currEnd = new Date(currEnd.getTime());
      currEnd.setDate(currEnd.getDate() + weekDiff);
      recentWeeks.push(new WeekRange(currStart, currEnd));
      weekDiff = 7;
      weekCnt++;
    }
    return recentWeeks;
  }
  function formatDate(date) {
    if (!date) {
      return '';
    }
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    return day + "." + month;
  }
  var WeekRange = /*#__PURE__*/function () {
    function WeekRange(start, end) {
      _classCallCheck(this, WeekRange);
      this.start = start;
      this.end = end;
    }
    _createClass(WeekRange, [{
      key: "toString",
      value: function toString() {
        return "<p>" + formatDate(this.start) + "</p> - <p>" + formatDate(subtractMinutes(this.end, 1)) + "</p>";
      }
    }]);
    return WeekRange;
  }();
  function subtractMinutes(date, minutes) {
    var dateCopy = new Date(date);
    dateCopy.setMinutes(date.getMinutes() - minutes);
    return dateCopy;
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwiUFJPTU9fU1RBUlRfREFURSIsIkRhdGUiLCJQUk9NT19EVVJBVElPTl9XRUVLUyIsInVuYXV0aE1zZ3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJ0aWNpcGF0ZUJ0bnMiLCJyZWRpcmVjdEJ0bnMiLCJ3ZWVrc1NlbGVjdG9yIiwid2Vla3NDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwicXVlc3RJdGVtcyIsInF1ZXN0SWNvbnMiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsImxvY2FsZSIsInVrTGVuZyIsImVuTGVuZyIsIkRFQlVHIiwicmVnUHJvbW8iLCJpMThuRGF0YSIsInNlbGVjdGVkV2Vla1RhYklkIiwidXNlcklkIiwibG9hZFRyYW5zbGF0aW9ucyIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJ0cmFuc2xhdGUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwidHJhbnNsYXRlZCIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsImRhdGFEZWNvciIsInNldEF0dHJpYnV0ZSIsIm1haW5QYWdlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwidHlwZUFuaW0iLCJvYnNlcnZlRWxlbWVudHMiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwibGFuZyIsInJlbW92ZSIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiaGVhZGVycyIsInNldFRpbWVvdXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsImluZm9TbGlkZXNNb2JQb3B1cCIsInNsaWRlQnRuTGVmdCIsInNsaWRlQnRuUmlnaHQiLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImNyZWF0ZVNsaWRlciIsInNsaWRlcyIsImxlZnRCdG4iLCJyaWdodEJ0biIsInNsaWRlc0ljb25zIiwiY3VycmVudCIsInBhdGgiLCJpbWciLCJjb3ZlcmZsb3ciLCJjb3ZlcmZsb3dPZmZXaWR0aCIsInN1YnRpdGxlcyIsImNvcHlTbGlkZXMiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsImkiLCJwcmV2SW5kZXgiLCJuZXh0SW5kZXgiLCJnbGl0Y2hMYXllcnMiLCJzdWJ0aXRsZXNJbml0Iiwic2xpZGVJbmRleCIsImNvbnRhaW5zIiwic3VidGl0bGUiLCJzdWJ0aXRsZUluZGV4IiwidXBkYXRlR2xpdGNoTGF5ZXJzIiwiaW5kZXgiLCJkaXJlY3Rpb24iLCJsYXllciIsImNsYXNzTmFtZSIsInN0YXJ0c1dpdGgiLCJxdWVzdE51bWJlciIsImdldFNsaWRlTnVtIiwibmV4dENsYXNzIiwicHJldkNsYXNzIiwiY3VycmVudENsYXNzIiwiYmFja2dyb3VuZCIsInF1ZXN0Q2xhc3MiLCJmaW5kIiwicmVwbGFjZSIsIm1vdmVTbGlkZXIiLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwid3JhcHBlciIsImljb24iLCJpY29uSW5kZXgiLCJpY29uT2Zmc2V0TGVmdCIsIm9mZnNldExlZnQiLCJpY29uV2lkdGgiLCJvZmZzZXRXaWR0aCIsIndyYXBwZXJXaWR0aCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJoYW5kbGVDbGljayIsIm5leHRTbGlkZUluZGV4IiwiZSIsInRhcmdldCIsInNldFBvcHVwcyIsInBvcHVwcyIsInBvcHVwQnRucyIsImNsb3NlQnRucyIsImJ0biIsInF1ZXN0c1BhdGgiLCJjaGVja01lZGlhUXVlcmllcyIsIm9sZFBhdGgiLCJuZXdQYXRoIiwibWVkaWFRdWVyeTYwMCIsIm1hdGNoTWVkaWEiLCJtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlIiwibWF0Y2hlcyIsInByaXplUmlnaHRCdG4iLCJwcml6ZUxlZnRCdG4iLCJwcml6ZVBvcHVwcyIsImNsb3NlRHJvcCIsImRyb3BzIiwiZHJvcCIsImR5bmFtaWNUeXBld3JpdGVyIiwic3BlZWQiLCJjYWxsYmFjayIsInRleHRBcnJheSIsInRleHRDb250ZW50IiwidHJpbSIsInNwbGl0IiwibGl0QXJyIiwiam9pbiIsImZpbHRlciIsIl9jaGFyIiwid29yZEluZGV4IiwiY2hhckluZGV4IiwiY3VycmVudFRleHQiLCJ0eXBlV29yZCIsImN1cnJlbnRXb3JkIiwidW5kZWZpbmVkIiwiY2hhckF0IiwiaW5uZXJUZXh0IiwidHlwZUVsZW1zIiwib3B0aW9ucyIsInJvb3QiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJvYnNlcnZlIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtV3JhcCIsImN1cnJlbnRQb3NpdGlvbiIsIndpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1dyYXAiLCJ0YWJsZVBvcHVwQnRuIiwiY2xvc2VQb3B1cHMiLCJwb3B1cHNXcmFwIiwiYm9keSIsImdldFVzZXJzIiwidXJsIiwicmVzb2x2ZVVzZXJzVXJsIiwidXNlcnMiLCJtYXAiLCJ1c2VyT3JJZCIsInVzZXJpZCIsIkluaXRQYWdlIiwidyIsInMiLCJyZWZyZXNoVXNlcnMiLCJxdWVzdHNDYWNoZSIsImdldFF1ZXN0cyIsInF1ZXN0cyIsInBvaW50cyIsIm1heFBvaW50cyIsInN0YXR1cyIsInJlZ2lzdGVyZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNhY2hlZCIsImFjdGl2ZUZvdW5kIiwiaW5pdFF1ZXN0QnRucyIsImRhdGFzZXQiLCJxdWVzdCIsInBsYXlCdG4iLCJyZWdCdG4iLCJyZWdpc3RlckluUXVlc3QiLCJyZWZyZXNoUXVlc3RzIiwicXVlc3RzQnlJZCIsInEiLCJpZHgiLCJxdWVzdEljb24iLCJmaW5pc2hlZCIsIm1heFByb2dyZXNzIiwicHJvZ3Jlc3NEaXYiLCJNYXRoIiwibWluIiwicHJvZ3Jlc3MiLCJmbG9vciIsInByb21vUmVnQnRuIiwiaW5pdCIsInJlZnJlc2hXZWVrVGFicyIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImNoZWNrVXNlckF1dGgiLCJzZXR1cFBhZ2UiLCJjIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjbGVhckludGVydmFsIiwiYXV0aEJ0biIsInByZXZlbnREZWZhdWx0IiwicGFydGljaXBhdGUiLCJwYXJhbXMiLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwicmVuZGVyVXNlcnMiLCJ0b3BVc2VycyIsInNsaWNlIiwiY3VycmVudFVzZXIiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJwdXNoIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwbGFjZUNsYXNzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsImlzTmFOIiwidHJhbnNsYXRlS2V5IiwiYXBwZW5kIiwidG9TdHJpbmciLCJ1bmF1dGhNZXMiLCJfaWQiLCJwYXJ0aWNpcGF0ZUJ0biIsInJlY2VudFdlZWtSYW5nZXMiLCJjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzIiwid2Vla1JhbmdlIiwid2Vla1NlbGVjdG9yIiwiY3VyclN0YXJ0IiwiY3VyckVuZCIsInRvZGF5IiwicmVjZW50V2Vla3MiLCJ3ZWVrQ250Iiwid2Vla0RpZmYiLCJnZXRUaW1lIiwic2V0RGF0ZSIsImdldERhdGUiLCJXZWVrUmFuZ2UiLCJmb3JtYXREYXRlIiwiZGF0ZSIsImRheSIsInBhZFN0YXJ0IiwibW9udGgiLCJnZXRNb250aCIsImVuZCIsInN1YnRyYWN0TWludXRlcyIsIm1pbnV0ZXMiLCJkYXRlQ29weSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFDVCxJQUFNQSxNQUFNLEdBQUcsMkNBQTJDO0VBQzFELElBQU1DLGdCQUFnQixHQUFHLElBQUlDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztFQUN6RCxJQUFNQyxvQkFBb0IsR0FBRyxDQUFDO0VBRTlCLElBQ0lDLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR0YsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDeERFLFlBQVksR0FBR0gsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERHLGFBQWEsR0FBR0osUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztJQUM5REksY0FBYyxHQUFHTCxRQUFRLENBQUNNLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDdkRDLFVBQVUsR0FBR1AsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7SUFDaERPLFVBQVUsR0FBR1IsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztJQUM3RFEsZUFBZSxHQUFHVCxRQUFRLENBQUNVLGNBQWMsQ0FBQyxXQUFXLENBQUM7RUFFMUQsSUFBSUMsTUFBTSxHQUFHLElBQUk7RUFFakIsSUFBTUMsTUFBTSxHQUFHWixRQUFRLENBQUNNLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDaEQsSUFBTU8sTUFBTSxHQUFHYixRQUFRLENBQUNNLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFFaEQsSUFBSU0sTUFBTSxFQUFFRCxNQUFNLEdBQUcsSUFBSTtFQUN6QixJQUFJRSxNQUFNLEVBQUVGLE1B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QUssSUFBSSxFQUFFLEVBQUU7TUFDcEI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEVBQUUsRUFBRTtNQUNwQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksRUFBRSxFQUFFO01BQ3BCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxFQUFFLEVBQUU7TUFDcEI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEVBQUUsRUFBRTtNQUNwQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksR0FBRyxFQUFFO01BQ3JCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxHQUFHLEVBQUU7TUFDckI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEdBQUcsRUFBRTtNQUNyQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksR0FBRyxFQUFFO01BQ3JCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxHQUFHLEVBQUU7TUFDckI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEdBQUcsRUFBRTtNQUNyQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksR0FBRyxFQUFFO01BQ3JCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxHQUFHLEVBQUU7TUFDckI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEdBQUcsRUFBRTtNQUNyQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksR0FBRyxFQUFFO01BQ3JCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxHQUFHLEVBQUU7TUFDckI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEdBQUcsRUFBRTtNQUNyQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksR0FBRyxFQUFFO01BQ3JCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxHQUFHLEVBQUU7TUFDckI7SUFDSjtFQUNKO0VBR0EsU0FBU00sWUFBWSxDQUFD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dCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2xldmVsX3VwX2dhbWVfdWEnO1xuICAgIGNvbnN0IFBST01PX1NUQVJUX0RBVEUgPSBuZXcgRGF0ZShcIjIwMjQtMTAtMDFUMjE6MDA6MDBaXCIpO1xuICAgIGNvbnN0IFBST01PX0RVUkFUSU9OX1dFRUtTID0gNDtcblxuICAgIGNvbnN0XG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICB3ZWVrc1NlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19saXN0LWl0ZW0nKSxcbiAgICAgICAgd2Vla3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVfX2xpc3QnKSxcbiAgICAgICAgcXVlc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpLFxuICAgICAgICBxdWVzdEljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0c19faWNvbnMtaXRlbScpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyk7XG5cbiAgICBsZXQgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICBpZiAodWtMZW5nKSBsb2NhbGUgPSAndWsnO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCBERUJVRyA9IGZhbHNlO1xuICAgIGxldCByZWdQcm9tbyA9IGZhbHNlO1xuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCBzZWxlY3RlZFdlZWtUYWJJZCA9IDA7XG4gICAgbGV0IHVzZXJJZDsgIC8vPTEwMDMwMDI2O1xuICAgIC8vIHVzZXJJZCA9IDEwMDMwMDI2O1xuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKTtcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVkID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSB0cmFuc2xhdGVkO1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YURlY29yID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGVjb3InKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YURlY29yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWRlY29yJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWRlY29yJywgdHJhbnNsYXRlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZSA9PT0gJ2VuJykge1xuICAgICAgICAgICAgbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnZW4nKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcblxuICAgICAgICAvLyDQn9GW0YHQu9GPINC/0LXRgNC10LrQu9Cw0LTRgyDQstC40LrQu9C40LrQsNGU0LzQviDRhNGD0L3QutGG0ZbRjiDRgdC/0L7RgdGC0LXRgNC10LbQtdC90L3Rj1xuICAgICAgICBjb25zdCB0eXBlQW5pbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBlLWFuaW0nKTtcbiAgICAgICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTsgLy8g0JfQsNC/0YPRgdC60LDRlNC80L4g0YHQv9C+0YHRgtC10YDQtdC20LXQvdC90Y8g0YLRltC70YzQutC4INC/0ZbRgdC70Y8g0LfQsNCy0LXRgNGI0LXQvdC90Y8g0L/QtdGA0LXQutC70LDQtNGDXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQsIGJhc2VDc3NDbGFzcykge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNzc0NsYXNzICsgbGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDc3NDbGFzcyArIGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbiAgICB9XG5cbiAgICBsZXQgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2LXBhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ19vdmVyZmxvdy1oaWRkZW4nKSwgMTAwMCk7XG5cbiAgICAvL1l1cmEgQ29kZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgKCkgPT57XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpID8gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpKSA6IDE7XG5cbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1tb2JcIilcbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLWJvdHRvbVwiKVxuICAgIGNvbnN0IHNsaWRlQnRuTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHNsaWRlQnRuUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIpXG5cbiAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goKGl0ZW0sIGluZGV4SXRlbSkgPT57XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goKHBvcHVwLCBpbmRleFBvcHVwKT0+e1xuICAgICAgICAgICAgICAgIGlmIChpbmRleEl0ZW0gPT09IGluZGV4UG9wdXApe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBwb3B1cC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgc2xpZGVCdG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuICAgIHNsaWRlQnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbi8vLyDQs9C70ZbRhyDRgdC70LDQudC00LXRgFxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcihzbGlkZXMsIGxlZnRCdG4sIHJpZ2h0QnRuLCBzbGlkZXNJY29ucywgY3VycmVudCwgcGF0aCwgaW1nLCB3ZWVrLCBjb3ZlcmZsb3csIGNvdmVyZmxvd09mZldpZHRoLCBzdWJ0aXRsZXMsIGNvcHlTbGlkZXMpe1xuICAgICAgICBsZXQgY292ZXJmbG93VG9nZ2xlciA9IHRydWVcbiAgICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG4gICAgICAgICAgICBjb3ZlcmZsb3dUb2dnbGVyID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgICAgIC8vICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgICAgICAvLyAgICAgICAgIGlmKGNvdmVyZmxvd1RvZ2dsZXIpe1xuICAgICAgICAvLyAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKSB7XG4gICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJmbG93VG9nZ2xlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZJbmRleCA9IChpIC0gMSArIHNsaWRlcy5sZW5ndGgpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1twcmV2SW5kZXhdLmNsYXNzTGlzdC5hZGQocmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IChpICsgMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW25leHRJbmRleF0uY2xhc3NMaXN0LmFkZChsZWZ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXMpO1xuICAgICAgICBzdWJ0aXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN1YnRpdGxlcyk7XG4gICAgICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgICAgIH0pO1xuICAgICAgICBpZihzbGlkZXNbY3VycmVudF0pc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNsaWRlcylcbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgc2xpZGVJbmRleCkgPT57XG4gICAgICAgICAgICAgICAgaWYoc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2FjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlcy5mb3JFYWNoKChzdWJ0aXRsZSwgc3VidGl0bGVJbmRleCkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGVJbmRleCA9PT0gc3VidGl0bGVJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGUuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlR2xpdGNoTGF5ZXJzKHBhdGgsIGluZGV4LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBxdWVzdE51bWJlciA9IGdldFNsaWRlTnVtKHNsaWRlc1tjdXJyZW50XSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFswXSAhPT0gXCJzbGlkZV9faW5mb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRpcmVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGNvcHlTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBuZXh0Q2xhc3MsIHByZXZDbGFzcywgY3VycmVudENsYXNzO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5leHRDbGFzcyA9IHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZy5jbGFzc0xpc3RbMV07XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwcmV2Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3RbMV07XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjdXJyZW50Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgJiYgbmV4dENsYXNzICYmIG5leHRDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChuZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIChkaXJlY3Rpb24gPT09IFwibGVmdFwiICYmIHByZXZDbGFzcyAmJiBwcmV2Q2xhc3MgIT09IGN1cnJlbnRDbGFzcyk6XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQocHJldkNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAoZGlyZWN0aW9uID09PSBcImxlZnRcIiAmJiBzbGlkZXNbY3VycmVudF0ucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCk6XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXS5jbGFzc0xpc3RbMV19YCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICYmIHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZyA9PT0gbnVsbCk6XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzWzFdLmNsYXNzTGlzdFsxXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChjdXJyZW50Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3B5U2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENsYXNzLCBwcmV2Q2xhc3MsIGN1cnJlbnRDbGFzcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JLQuNC30L3QsNGH0LDRlNC80L4g0LrQu9Cw0YHQuCDQtNC70Y8g0L/QvtGC0L7Rh9C90L7Qs9C+INGB0LvQsNC50LTQsCwg0L/QvtC/0LXRgNC10LTQvdGM0L7Qs9C+INGWINC90LDRgdGC0YPQv9C90L7Qs9C+XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0WzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQktC40LfQvdCw0YfQsNGU0LzQviDRltC90LTQtdC60YHQuCDQtNC70Y8g0L3QsNGB0YLRg9C/0L3QvtCz0L4g0ZYg0L/QvtC/0LXRgNC10LTQvdGM0L7Qs9C+INGB0LvQsNC50LTQsFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IChjdXJyZW50ICsgMSkgJSBzbGlkZXMubGVuZ3RoOyAvLyDQndCw0YHRgtGD0L/QvdC40Lkg0YHQu9Cw0LnQtCAo0Y/QutGJ0L4gY3VycmVudCDigJQg0L7RgdGC0LDQvdC90ZbQuSwg0YLQvtC00ZYg0L/QvtCy0LXRgNGC0LDRlNC80L7RgdGMINC00L4g0L/QvtGH0LDRgtC60YMpXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldkluZGV4ID0gKGN1cnJlbnQgLSAxICsgc2xpZGVzLmxlbmd0aCkgJSBzbGlkZXMubGVuZ3RoOyAvLyDQn9C+0L/QtdGA0LXQtNC90ZbQuSDRgdC70LDQudC0ICjRj9C60YnQviBjdXJyZW50IOKAlCDQv9C10YDRiNC40LksINGC0L7QtNGWINC/0LXRgNC10YXQvtC00LjQvNC+INC90LAg0L7RgdGC0LDQvdC90ZbQuSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JLQuNC30L3QsNGH0LDRlNC80L4g0LrQu9Cw0YHQuCDQtNC70Y8g0L3QsNGB0YLRg9C/0L3QvtCz0L4g0ZYg0L/QvtC/0LXRgNC10LTQvdGM0L7Qs9C+INGB0LvQsNC50LTQsFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENsYXNzID0gc2xpZGVzW25leHRJbmRleF0uY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkNsYXNzID0gc2xpZGVzW3ByZXZJbmRleF0uY2xhc3NMaXN0WzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIChkaXJlY3Rpb24gPT09IFwicmlnaHRcIiAmJiBuZXh0Q2xhc3MgIT09IGN1cnJlbnRDbGFzcyk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQobmV4dENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIChkaXJlY3Rpb24gPT09IFwibGVmdFwiICYmIHByZXZDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChwcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgJiYgY3VycmVudCA9PT0gMCk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXS5jbGFzc0xpc3RbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICYmIGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChzbGlkZXNbMF0uY2xhc3NMaXN0WzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGN1cnJlbnRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFNsaWRlTnVtKHNsaWRlKSB7XG4gICAgICAgICAgICBjb25zdCBxdWVzdENsYXNzID0gWy4uLnNsaWRlLmNsYXNzTGlzdF0uZmluZChjbGFzc05hbWUgPT4gY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSk7XG4gICAgICAgICAgICBpZiAocXVlc3RDbGFzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChxdWVzdENsYXNzLnJlcGxhY2UoXCJxdWVzdFwiLCBcIlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBpY29uc1swXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3cmFwcGVyKVxuXG4gICAgICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBpY29uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWNvbk9mZnNldExlZnQgPSBpY29uLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGljb25XaWR0aCA9IGljb24ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJXaWR0aCA9IHdyYXBwZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogaWNvbk9mZnNldExlZnQgLSAod3JhcHBlcldpZHRoIC8gMikgKyAoaWNvbldpZHRoIC8gMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXggKyA2fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcbiAgICAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwibGVmdFwiKSk7XG4gICAgICAgIHJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcInJpZ2h0XCIpKTtcblxuICAgICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9jdXJyZW50XCIpKSByZXR1cm5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9jdXJyZW50XCIpKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyA3fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG5cbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgICAgICBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBvcHVwcylcbiAgICAgICAgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cEJ0bnMpXG4gICAgICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgICAgIHBvcHVwQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQucGFyZW50RWxlbWVudCA9PT0gcG9wdXAucGFyZW50RWxlbWVudCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGNsb3NlQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVcIik7XG4gICAgY29uc3Qgc2xpZGVzSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiKTtcbiAgICAvLyBpZih3ZWVrID09PSAxKXtcbiAgICAvLyAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcbiAgICAvL1xuICAgIC8vICAgICAgICAgaWYoaSA+PSA2IHx8IHNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgIC8vICAgICAgICAgICAgIHNsaWRlLnJlbW92ZSgpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+e1xuICAgIC8vICAgICAgICAgaWYoaSA+PSA2IHx8IGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgLy8gICAgICAgICAgICAgaWNvbi5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbiAgICAvLyBpZih3ZWVrID09PSAyKXtcbiAgICAvLyAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKXtcbiAgICAvLyAgICAgICAgIGxldCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5xdWVzdCR7aX1gKVxuICAgIC8vICAgICAgICAgd2VlazEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAvLyAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpXG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vXG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgbGV0IHF1ZXN0c1BhdGggPSBcImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbGV2ZWwtdXAtZ2FtZS11YS9pbWcvcXVlc3RzL3NsaWRlXCJcbiAgICBmdW5jdGlvbiBjaGVja01lZGlhUXVlcmllcyhvbGRQYXRoLCBuZXdQYXRoKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk2MDAgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDYwMHB4KVwiKTtcbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTk1MExhbmRzY2FwZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTUwcHgpIGFuZCAobWF4LWhlaWdodDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIik7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5NjAwLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2xkUGF0aFxuICAgIH1cbiAgICBxdWVzdHNQYXRoID0gY2hlY2tNZWRpYVF1ZXJpZXMocXVlc3RzUGF0aCwgXCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2xldmVsLXVwLWdhbWUtdWEvaW1nL3F1ZXN0cy9tb2Ivc2xpZGVcIilcblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAwLCBxdWVzdHNQYXRoLCBcInBlcnMucG5nXCIsIG51bGwsIGZhbHNlLCBudWxsLCBcIi5xdWVzdHNfX3N1YnRpdGxlXCIsIHRydWUpXG4gICAgY3JlYXRlU2xpZGVyKFwiLnByaXplX19zbGlkZVwiLCBcIi5wcml6ZV9fbW92ZS1sZWZ0XCIsIFwiLnByaXplX19tb3ZlLXJpZ2h0XCIsIFwiLnByaXplX19pY29ucy1pdGVtXCIsIDAsIFwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9sZXZlbC11cC1nYW1lLXVhL2ltZy9wcml6ZS9zbGlkZVwiLCBcInByaXplLnBuZ1wiLCBudWxsLCB0cnVlICwgMTE1MCwgZmFsc2UpXG4gICAgc2V0UG9wdXBzKFwiLmd1aWRlX19pbmZvXCIsIFwiLmd1aWRlX19pbmZvLWJ0blwiLCBcIi5ndWlkZV9faW5mby1jbG9zZVwiKVxuICAgIHNldFBvcHVwcyhcIi5wcml6ZV9fc2xpZGUtcG9wdXBcIiwgXCIucHJpemVfX3NsaWRlLWluZm8tYnRuXCIsIFwiLnByaXplX19zbGlkZS1jbG9zZVwiKVxuICAgIHNldFBvcHVwcyhcIi50YWJsZV9faW5mby1wb3B1cFwiLCBcIi50YWJsZV9faW5mb1wiLCBcIi50YWJsZV9faW5mby1jbG9zZVwiKVxuXG4gICAgY29uc3QgcHJpemVSaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtcmlnaHRcIilcbiAgICBjb25zdCBwcml6ZUxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBwcml6ZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIpXG5cbiAgICBmdW5jdGlvbiBjbG9zZURyb3AoZHJvcHMpe1xuICAgICAgICBkcm9wcy5mb3JFYWNoKGRyb3AgPT57XG4gICAgICAgICAgICBkcm9wLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpemVSaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuICAgIHByaXplTGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuXG4vLy8g0LDQvdGW0LzQsNGG0ZbRjyDQtNC40L3QsNC80ZbRh9C90L7Qs9C+INC90LDQsdC+0YDRgyDRgtC10LrRgdGCXG4gICAgZnVuY3Rpb24gZHluYW1pY1R5cGV3cml0ZXIoZWxlbWVudCwgc3BlZWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHRleHRBcnJheSA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyhcXHMrKS8pLmZpbHRlcihmdW5jdGlvbiAoX2NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfY2hhci50cmltKCkgIT09ICcnIHx8IF9jaGFyID09PSAnICc7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd29yZEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNoYXJJbmRleCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICcnO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9vcGFjaXR5XCIpXG5cbiAgICAgICAgZnVuY3Rpb24gdHlwZVdvcmQoKSB7XG4gICAgICAgICAgICBpZiAod29yZEluZGV4ID09PSBsaXRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdGV4dEFycmF5W3dvcmRJbmRleF07XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRXb3JkID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY2hhckluZGV4IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gY3VycmVudFdvcmQuY2hhckF0KGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9ICcgJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgd29yZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgdHlwZVdvcmQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvYnNlcnZlRWxlbWVudHModHlwZUVsZW1zKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICByb290OiBudWxsLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNUeXBld3JpdGVyKGVudHJ5LnRhcmdldCwgMzUsICgpID0+IHt9KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0eXBlRWxlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB0eXBlQW5pbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBlLWFuaW0nKTtcbiAgICBvYnNlcnZlRWxlbWVudHModHlwZUFuaW0pO1xuXG4vLy8gcHJvZ3Jlc3MgYmFyINCw0L3RltC80LDRhtGW0Y9cbiAgICBmdW5jdGlvbiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pe1xuICAgICAgICBpZihjdXJyZW50UG9zaXRpb24gPD0gMTAwKXtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgIGVsZW1XcmFwLmlubmVyVGV4dCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgKytjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9ZWxzZSBpZihjdXJyZW50UG9zaXRpb24gPj0gMTAwKXtcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHN0YXJ0XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtYmFyXCIpXG4gICAgY29uc3QgcHJvZ3Jlc3NXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy10ZXh0XCIpXG5cbiAgICBwcm9ncmVzc0FuaW0oNDAsIHByb2dyZXNzQmFyLCBwcm9ncmVzc1dyYXAsIDQwKVxuXG4vLyBwb3B1cHNcbiAgICBjb25zdCB0YWJsZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fYnRuXCIpXG4gICAgY29uc3QgY2xvc2VQb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19fY2xvc2VcIilcbiAgICBjb25zdCBwb3B1cHNXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNcIilcblxuICAgIHRhYmxlUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5hZGQoXCJfdGFibGVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiX292ZXJmbG93LWhpZGRlblwiKVxuICAgIH0pXG4gICAgY2xvc2VQb3B1cHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfdGFibGVcIilcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuXG4vLyBmb3IgdGVzdFxuXG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgLy8gICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmtcIilcbiAgICAvLyB9KVxuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW4tbG5nXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiZW5cIilcbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gY29uc3QgZG9uZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb25lLXBvcHVwXCIpXG4gICAgLy9cbiAgICAvLyBkb25lUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgIC8vICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC50b2dnbGUoXCJfZG9uZVwiKVxuICAgIC8vICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG4gICAgLy9cbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gY29uc3Qgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsxXCIpO1xuICAgIC8vIGNvbnN0IHdlZWsyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMlwiKTtcbiAgICAvL1xuICAgIC8vIHdlZWsxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAxKTtcbiAgICAvLyAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyB3ZWVrMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMik7XG4gICAgLy8gICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gbWFpbiBsb2dpY1xuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHdlZWspIHtcbiAgICAgICAgY29uc3QgdXJsID0gcmVzb2x2ZVVzZXJzVXJsKHdlZWspO1xuICAgICAgICByZXR1cm4gcmVxdWVzdCh1cmwpXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5tYXAodXNlck9ySWQgPT4gdHlwZW9mIHVzZXJPcklkID09PSAnbnVtYmVyJyA/IHt1c2VyaWQ6IHVzZXJPcklkfSA6IHVzZXJPcklkKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVzZXJzVXJsKHdlZWspIHtcbiAgICAgICAgcmV0dXJuIHdlZWsgPyBgL3VzZXJzLyR7d2Vla31gIDogJy91c2Vycyc7XG4gICAgfVxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4gdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBpO1xuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICByZWZyZXNoVXNlcnMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdHNDYWNoZSA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UXVlc3RzKCkge1xuICAgICAgICBpZiAoREVCVUcpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXN0cyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0TnVtYmVyOiAxMSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIG1heFBvaW50czogMTAwLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjbG9zZWQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0TnVtYmVyOiAxMixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4UG9pbnRzOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShxdWVzdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybCA9IHVzZXJJZCA/IGAvcXVlc3RzLyR7dXNlcklkfWAgOiAnL3F1ZXN0cyc7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IHF1ZXN0c0NhY2hlW3VybF07XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVxdWVzdCh1cmwpLnRoZW4ocXVlc3RzID0+IHtcbiAgICAgICAgICAgIHF1ZXN0c0NhY2hlW3VybF0gPSBxdWVzdHM7XG4gICAgICAgICAgICByZXR1cm4gcXVlc3RzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgYWN0aXZlRm91bmQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGluaXRRdWVzdEJ0bnMoKSB7XG4gICAgICAgIHF1ZXN0SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXN0TnVtYmVyID0gK2l0ZW0uZGF0YXNldC5xdWVzdDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXlCdG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ0bicpO1xuICAgICAgICAgICAgY29uc3QgcmVnQnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYnRuLXF1ZXN0Jyk7XG4gICAgICAgICAgICByZWdCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgICAgICByZWdpc3RlckluUXVlc3QocXVlc3ROdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ0J0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hRdWVzdHMoKSB7XG4gICAgICAgIGdldFF1ZXN0cygpLnRoZW4ocXVlc3RzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXN0c0J5SWQgPSB7fTtcbiAgICAgICAgICAgIChxdWVzdHMgfHwgW10pLmZvckVhY2gocSA9PiB7XG4gICAgICAgICAgICAgICAgcXVlc3RzQnlJZFtxLnF1ZXN0TnVtYmVyXSA9IHE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY29uc3Qgc2xpZGVyTmV4dEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9fbW92ZS1yaWdodCcpO1xuICAgICAgICAgICAgcXVlc3RJdGVtcy5mb3JFYWNoKChpdGVtLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVzdE51bWJlciA9ICtpdGVtLmRhdGFzZXQucXVlc3Q7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlc3QgPSBxdWVzdHNCeUlkW3F1ZXN0TnVtYmVyXTtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVzdEljb24gPSBxdWVzdEljb25zW2lkeF07XG5cbiAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHN0YXR1c1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnX2xvY2snLCAnX2RvbmUnLCAnX3VuZG9uZScpO1xuICAgICAgICAgICAgICAgIHF1ZXN0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdfbG9jaycsICdfZG9uZScsICdfdW5kb25lJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ19sb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0SWNvbi5jbGFzc0xpc3QuYWRkKCdfbG9jaycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHF1ZXN0LnN0YXR1cztcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5pc2hlZCA9IHF1ZXN0LnBvaW50cyA+PSBxdWVzdC5tYXhQb2ludHM7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgcXVlc3RJY29uLmNsYXNzTGlzdC5hZGQoJ19kb25lJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uY2xhc3NMaXN0LmFkZCgnX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyBxdWVzdEljb24uY2xhc3NMaXN0LmFkZCgnX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnZnV0dXJlJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ19sb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0SWNvbi5jbGFzc0xpc3QuYWRkKCdfbG9jaycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnX3VuZG9uZScpO1xuICAgICAgICAgICAgICAgICAgICBxdWVzdEljb24uY2xhc3NMaXN0LmFkZCgnX3VuZG9uZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtb3ZlIHNsaWRlciB0byBhY3RpdmVcbiAgICAgICAgICAgICAgICAvLyBpZiAoIWFjdGl2ZUZvdW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHNsaWRlck5leHRCdG4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHByb2dyZXNzIGJhclxuICAgICAgICAgICAgICAgIGNvbnN0IG1heFByb2dyZXNzID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudG90YWwtcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc0RpdiA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc0JhciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnNsaWRlX19wcm9ncmVzcy1iYXInKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludHMgPSBNYXRoLm1pbihxdWVzdC5wb2ludHMsIHF1ZXN0Lm1heFBvaW50cyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHBvaW50cyAvIHF1ZXN0Lm1heFBvaW50cyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc30lYDtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Rpdi5pbm5lckhUTUwgPSBgJHtwb2ludHN9YDtcbiAgICAgICAgICAgICAgICBtYXhQcm9ncmVzcy5pbm5lckhUTUwgPSBgJHtxdWVzdC5tYXhQb2ludHN9YDtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBidG5zXG4gICAgICAgICAgICAgICAgY29uc3QgcGxheUJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnBsYXktYnRuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnQnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYnRuLXF1ZXN0Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvbW9SZWdCdG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tam9pbicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZWdQcm9tbykge1xuICAgICAgICAgICAgICAgICAgICBwcm9tb1JlZ0J0biAmJiBwcm9tb1JlZ0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbW9SZWdCdG4gJiYgcHJvbW9SZWdCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3QucmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHJlZnJlc2hXZWVrVGFicygpO1xuICAgICAgICBpbml0UXVlc3RCdG5zKCk7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKS50aGVuKHNldHVwUGFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja1VzZXJBdXRoKCkudGhlbihzZXR1cFBhZ2UpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpLnRoZW4oc2V0dXBQYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBQYWdlKCkge1xuICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICByZWZyZXNoUXVlc3RzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICByZWdQcm9tbyA9IHRydWU7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJJblF1ZXN0KHF1ZXN0TnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZCwgcXVlc3ROdW1iZXI6IHF1ZXN0TnVtYmVyfTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QoJy9xdWVzdCcsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGdldFVzZXJzKHdlZWspLnRoZW4odXNlcnMgPT4ge1xuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclVzZXJzID0gKHVzZXJzKSA9PiB7XG4gICAgICAgIHRvcFJlc3VsdHNUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIC8vIHJlc3VsdHNUYWJsZU90aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJJZCAmJiB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IHVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgJiYgdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcik7XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXJJbmRleCA+IDEwKSB7XG4gICAgICAgICAgICAgICAgdG9wVXNlcnMucHVzaChjdXJyZW50VXNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodG9wVXNlcnMsIHVzZXJJZCwgdG9wUmVzdWx0c1RhYmxlLCB1c2Vycyk7XG5cbiAgICAgICAgICAgIC8vICAgICBjb25zdCBjdXJyZW50VXNlclF1ZXN0SW5kZXggPSBjdXJyZW50VXNlciAmJiBxdWVzdFVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICAvLyAgICAgbGV0IG90aGVyVXNlcnM7XG4gICAgICAgICAgICAvLyAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoMTAsIDEzKTtcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoY3VycmVudFVzZXJJbmRleCAtIDEsIDEwKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAgICAgLy8gICAgIGxldCBvdGhlclF1ZXN0VXNlcnM7XG4gICAgICAgICAgICAvLyAgICAgaWYgKCFjdXJyZW50VXNlclF1ZXN0SW5kZXggfHwgY3VycmVudFVzZXJRdWVzdEluZGV4IDwgMTApIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgb3RoZXJRdWVzdFVzZXJzID0gcXVlc3RVc2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIG90aGVyUXVlc3RVc2VycyA9IHF1ZXN0VXNlcnMuc2xpY2UoTWF0aC5tYXgoY3VycmVudFVzZXJRdWVzdEluZGV4IC0gMSwgMTApLCBjdXJyZW50VXNlclF1ZXN0SW5kZXggKyAyKTtcbiAgICAgICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgICAgIC8vICAgICBpZiAob3RoZXJVc2VycyAmJiBvdGhlclVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgLy8gICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJRdWVzdFVzZXJzLCB1c2VySWQsIHF1ZXN0VGFibGVPdGhlciwgcXVlc3RVc2VycywgdHJ1ZSk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCB0YWJsZSwgYWxsVXNlcnMsIHF1ZXN0KSB7XG4gICAgICAgIHRhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgneW91Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcblxuICAgICAgICAgICAgICAgIGxldCBwbGFjZUNsYXNzO1xuICAgICAgICAgICAgICAgIGlmICh0YWJsZS5pZCA9PT0gJ3RvcC11c2VycycgfHwgdGFibGUuaWQgPT09ICdxdWVzdHNUYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZUNsYXNzID0gJ2dvbGQnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZUNsYXNzID0gJ3NpbHZlcic7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ2xhc3MgPSAnYnJvbnplJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVfX3JvdycpO1xuICAgICAgICAgICAgICAgIGlmIChwbGFjZUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocGxhY2VDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2NoZWNrQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHt1c2VyLnBvaW50cyAmJiAhaXNOYU4odXNlci5wb2ludHMpID8gdXNlci5wb2ludHMgOiAwfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtIG1hZ2VudGFcIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfJHtwbGFjZX1gO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTIwYDtcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAzMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8yMS0zMGA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzEtNDBgO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQxLTUwYDtcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA3MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS03MGA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzcxLTEwMGA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0xNTBgO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xNTEtMjAwYDtcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjAxLTI1MGA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzI1MS0zMDBgO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDM1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8zMDEtMzUwYDtcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA0MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzUxLTQwMGA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQwMS00NTBgO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV80NTEtNTAwYDtcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1NTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTAxLTU1MGA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzU1MS02MDBgO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDY1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82MDEtNjUwYDtcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA3MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNjUxLTcwMGA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzcwMS03NTBgO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJlZ1Byb21vKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfT9ub2NhY2hlPTFgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdQcm9tbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzLl9pZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hXZWVrVGFicygpIHtcbiAgICAgICAgY29uc3QgcmVjZW50V2Vla1JhbmdlcyA9IGNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MoKTtcbiAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSByZWNlbnRXZWVrUmFuZ2VzLmxlbmd0aCAtIDE7XG4gICAgICAgIGlmICghcmVjZW50V2Vla1JhbmdlcyB8fCByZWNlbnRXZWVrUmFuZ2VzLmxlbmd0aCA9PT0gMCkgeyAvLyBwcm9tbyBub3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgICAgIHdlZWtzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2Vla3NTZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgd2Vla1JhbmdlID0gcmVjZW50V2Vla1Jhbmdlc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHdlZWtTZWxlY3RvciA9IHdlZWtzU2VsZWN0b3JbaV07XG4gICAgICAgICAgICBpZiAoIXdlZWtSYW5nZSkge1xuICAgICAgICAgICAgICAgIHdlZWtTZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2goKHcsIGkpID0+IHtcbiAgICAgICAgICAgIHcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc2VsZWN0ZWRXZWVrVGFiSWQpIHtcbiAgICAgICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzKCkge1xuICAgICAgICBsZXQgY3VyclN0YXJ0ID0gUFJPTU9fU1RBUlRfREFURTtcbiAgICAgICAgbGV0IGN1cnJFbmQgPSBQUk9NT19TVEFSVF9EQVRFO1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHJlY2VudFdlZWtzID0gW107XG4gICAgICAgIGxldCB3ZWVrQ250ID0gMDtcbiAgICAgICAgbGV0IHdlZWtEaWZmID0gNztcbiAgICAgICAgd2hpbGUgKGN1cnJFbmQgPD0gdG9kYXkgJiYgd2Vla0NudCA8IFBST01PX0RVUkFUSU9OX1dFRUtTKSB7XG4gICAgICAgICAgICBjdXJyU3RhcnQgPSBjdXJyRW5kO1xuICAgICAgICAgICAgY3VyckVuZCA9IG5ldyBEYXRlKGN1cnJFbmQuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIGN1cnJFbmQuc2V0RGF0ZShjdXJyRW5kLmdldERhdGUoKSArIHdlZWtEaWZmKTtcbiAgICAgICAgICAgIHJlY2VudFdlZWtzLnB1c2gobmV3IFdlZWtSYW5nZShjdXJyU3RhcnQsIGN1cnJFbmQpKTtcbiAgICAgICAgICAgIHdlZWtEaWZmID0gNztcbiAgICAgICAgICAgIHdlZWtDbnQrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjZW50V2Vla3M7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgY29uc3QgbW9udGggPSAoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgICAgICByZXR1cm4gZGF5ICsgXCIuXCIgKyBtb250aDtcbiAgICB9XG5cbiAgICBjbGFzcyBXZWVrUmFuZ2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgICAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiPHA+XCIgKyBmb3JtYXREYXRlKHRoaXMuc3RhcnQpICsgXCI8L3A+IC0gPHA+XCIgKyBmb3JtYXREYXRlKHN1YnRyYWN0TWludXRlcyh0aGlzLmVuZCwgMSkpICsgXCI8L3A+XCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJ0cmFjdE1pbnV0ZXMoZGF0ZSwgbWludXRlcykge1xuICAgICAgICBjb25zdCBkYXRlQ29weSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBkYXRlQ29weS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpIC0gbWludXRlcyk7XG4gICAgICAgIHJldHVybiBkYXRlQ29weTtcbiAgICB9XG59KSgpO1xuIl19
