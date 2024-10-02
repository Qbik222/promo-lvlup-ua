"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
  var unauthMsg = document.querySelector('.unauth-msg'),
    participateBtn = document.querySelector('.btn-join'),
    redirectBtns = document.querySelector('.took-part');
  var locale = 'uk';
  var ukLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  if (ukLeng) locale = 'uk';
  if (enLeng) locale = 'en';
  var i18nData = {};
  var userId;
  // userId = 100300268;

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
        elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
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
  function init() {
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      setupPage();
    } else {
      setupPage();
      var c = 0;
      var i = setInterval(function () {
        if (c < 50) {
          if (!!window.g_user_id) {
            userId = window.g_user_id;
            setupPage();
            checkUserAuth();
            clearInterval(i);
          }
        } else {
          clearInterval(i);
        }
      }, 200);
    }
    checkUserAuth();
    if (participateBtn) {
      participateBtn.addEventListener('click', function (e) {
        e.preventDefault();
        participate();
      });
    }
  }
  function setupPage() {}
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
      participateBtn.classList.add('hide');
      redirectBtns.classList.remove('hide');
      setupPage();
    });
  }
  function checkUserAuth() {
    if (userId) {
      unauthMsg.classList.add('hide');
      request("/favuser/".concat(userId, "?nocache=1")).then(function (res) {
        if (res.userid) {
          participateBtn.classList.add('hide');
          redirectBtns.classList.remove('hide');
        } else {
          participateBtn.classList.remove('hide');
        }
      });
    } else {
      participateBtn.classList.add('hide');
      unauthMsg.classList.remove('hide');
    }
  }
  loadTranslations().then(init);
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
  createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1, questsPath, "pers.png", null, false, null, ".quests__subtitle", true);
  createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 1, "https://fav-prom.com/html/level-up-game-ua/img/prize/slide", "prize.png", null, true, 1150, false);
  setPopups(".guide__info", ".guide__info-btn", ".guide__info-close");
  setPopups(".prize__slide-popup", ".prize__slide-info-btn", ".prize__slide-close");
  setPopups(".table__info-popup", ".table__info", ".table__info-close");
  var tableTabs = document.querySelectorAll(".table__list-item");
  var tables = document.querySelectorAll(".table__item");
  tableTabs.forEach(function (tab, tabIndex) {
    tab.addEventListener("click", function (e) {
      tableTabs.forEach(function (item) {
        item.classList.remove("active");
        tab.classList.add("active");
      });
      tables.forEach(function (table, tableIndex) {
        table.classList.remove("active");
        if (tableIndex === tabIndex) {
          table.classList.add("active");
        }
      });
    });
  });
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

  document.querySelector(".dark-btn").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
  document.querySelector(".en-lng").addEventListener("click", function () {
    document.querySelector(".fav-page").classList.toggle("en");
  });
  var donePopupBtn = document.querySelector(".done-popup");
  donePopupBtn.addEventListener("click", function () {
    popupsWrap.classList.toggle("_done");
    document.body.classList.toggle("_overflow-hidden");
  });
  var week1 = document.querySelector(".week1");
  var week2 = document.querySelector(".week2");
  week1.addEventListener("click", function () {
    localStorage.setItem("week", 1);
    location.reload();
  });
  week2.addEventListener("click", function () {
    localStorage.setItem("week", 2);
    location.reload();
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNnIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicGFydGljaXBhdGVCdG4iLCJyZWRpcmVjdEJ0bnMiLCJsb2NhbGUiLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwiZWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtYWluUGFnZSIsImNsYXNzTGlzdCIsImFkZCIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsInR5cGVBbmltIiwib2JzZXJ2ZUVsZW1lbnRzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsImxhbmciLCJyZW1vdmUiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImhlYWRlcnMiLCJpbml0Iiwid2luZG93Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsImkiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJjbGVhckludGVydmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwidXNlcmlkIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXRUaW1lb3V0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsImluZm9TbGlkZXNNb2JQb3B1cCIsInNsaWRlQnRuTGVmdCIsInNsaWRlQnRuUmlnaHQiLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImNyZWF0ZVNsaWRlciIsInNsaWRlcyIsImxlZnRCdG4iLCJyaWdodEJ0biIsInNsaWRlc0ljb25zIiwiY3VycmVudCIsInBhdGgiLCJpbWciLCJjb3ZlcmZsb3ciLCJjb3ZlcmZsb3dPZmZXaWR0aCIsInN1YnRpdGxlcyIsImNvcHlTbGlkZXMiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsInByZXZJbmRleCIsIm5leHRJbmRleCIsImdsaXRjaExheWVycyIsInN1YnRpdGxlc0luaXQiLCJzbGlkZUluZGV4IiwiY29udGFpbnMiLCJzdWJ0aXRsZSIsInN1YnRpdGxlSW5kZXgiLCJ1cGRhdGVHbGl0Y2hMYXllcnMiLCJpbmRleCIsImRpcmVjdGlvbiIsImxheWVyIiwiY2xhc3NOYW1lIiwic3RhcnRzV2l0aCIsInF1ZXN0TnVtYmVyIiwiZ2V0U2xpZGVOdW0iLCJuZXh0Q2xhc3MiLCJwcmV2Q2xhc3MiLCJjdXJyZW50Q2xhc3MiLCJiYWNrZ3JvdW5kIiwicXVlc3RDbGFzcyIsImZpbmQiLCJyZXBsYWNlIiwibW92ZVNsaWRlciIsIlNsaWRlSWNvbnNJbml0IiwiaWNvbnMiLCJ3cmFwcGVyIiwiaWNvbiIsImljb25JbmRleCIsImljb25PZmZzZXRMZWZ0Iiwib2Zmc2V0TGVmdCIsImljb25XaWR0aCIsIm9mZnNldFdpZHRoIiwid3JhcHBlcldpZHRoIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsImhhbmRsZUNsaWNrIiwibmV4dFNsaWRlSW5kZXgiLCJ0YXJnZXQiLCJzZXRQb3B1cHMiLCJwb3B1cHMiLCJwb3B1cEJ0bnMiLCJjbG9zZUJ0bnMiLCJidG4iLCJxdWVzdHNQYXRoIiwiY2hlY2tNZWRpYVF1ZXJpZXMiLCJvbGRQYXRoIiwibmV3UGF0aCIsIm1lZGlhUXVlcnk2MDAiLCJtYXRjaE1lZGlhIiwibWVkaWFRdWVyeTk1MExhbmRzY2FwZSIsIm1hdGNoZXMiLCJ0YWJsZVRhYnMiLCJ0YWJsZXMiLCJ0YWIiLCJ0YWJJbmRleCIsInRhYmxlIiwidGFibGVJbmRleCIsInByaXplUmlnaHRCdG4iLCJwcml6ZUxlZnRCdG4iLCJwcml6ZVBvcHVwcyIsImNsb3NlRHJvcCIsImRyb3BzIiwiZHJvcCIsImR5bmFtaWNUeXBld3JpdGVyIiwic3BlZWQiLCJjYWxsYmFjayIsInRleHRBcnJheSIsInRleHRDb250ZW50IiwidHJpbSIsInNwbGl0IiwibGl0QXJyIiwiam9pbiIsImZpbHRlciIsIl9jaGFyIiwid29yZEluZGV4IiwiY2hhckluZGV4IiwiY3VycmVudFRleHQiLCJ0eXBlV29yZCIsImN1cnJlbnRXb3JkIiwidW5kZWZpbmVkIiwiY2hhckF0IiwiaW5uZXJUZXh0IiwidHlwZUVsZW1zIiwib3B0aW9ucyIsInJvb3QiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJvYnNlcnZlIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtV3JhcCIsImN1cnJlbnRQb3NpdGlvbiIsIndpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1dyYXAiLCJ0YWJsZVBvcHVwQnRuIiwiY2xvc2VQb3B1cHMiLCJwb3B1cHNXcmFwIiwiZG9uZVBvcHVwQnRuIiwid2VlazEiLCJ3ZWVrMiIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztFQUUxRCxJQUNJQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNqREMsY0FBYyxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDcERFLFlBQVksR0FBR0gsUUFBUSxD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L0IvSSxRQUFRLENBQUNDLE1BQU0sRUFBRTtFQUNyQixDQUFDLENBQUM7QUFDTixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9sZXZlbF91cF9nYW1lX3VhJztcblxuICAgIGNvbnN0XG4gICAgICAgIHVuYXV0aE1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHBhcnRpY2lwYXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1qb2luJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29rLXBhcnQnKTtcblxuICAgIGxldCBsb2NhbGUgPSAndWsnO1xuXG4gICAgY29uc3QgdWtMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG4gICAgLy8gdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKTtcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZSA9PT0gJ2VuJykge1xuICAgICAgICAgICAgbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnZW4nKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcblxuICAgICAgICAvLyDQn9GW0YHQu9GPINC/0LXRgNC10LrQu9Cw0LTRgyDQstC40LrQu9C40LrQsNGU0LzQviDRhNGD0L3QutGG0ZbRjiDRgdC/0L7RgdGC0LXRgNC10LbQtdC90L3Rj1xuICAgICAgICBjb25zdCB0eXBlQW5pbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBlLWFuaW0nKTtcbiAgICAgICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTsgLy8g0JfQsNC/0YPRgdC60LDRlNC80L4g0YHQv9C+0YHRgtC10YDQtdC20LXQvdC90Y8g0YLRltC70YzQutC4INC/0ZbRgdC70Y8g0LfQsNCy0LXRgNGI0LXQvdC90Y8g0L/QtdGA0LXQutC70LDQtNGDXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQsIGJhc2VDc3NDbGFzcykge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNzc0NsYXNzICsgbGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDc3NDbGFzcyArIGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuXG4gICAgICAgIGlmIChwYXJ0aWNpcGF0ZUJ0bikge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBhZ2UoKSB7fVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7IHVzZXJpZDogdXNlcklkIH07XG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHJlZGlyZWN0QnRucy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tVc2VyQXV0aCgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgdW5hdXRoTXNnLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfT9ub2NhY2hlPTFgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB1bmF1dGhNc2cuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpLnRoZW4oaW5pdCk7XG5cbiAgICBsZXQgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2LXBhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ19vdmVyZmxvdy1oaWRkZW4nKSwgMTAwMCk7XG5cbiAgICAvL1l1cmEgQ29kZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgKCkgPT57XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpID8gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpKSA6IDE7XG5cbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1tb2JcIilcbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLWJvdHRvbVwiKVxuICAgIGNvbnN0IHNsaWRlQnRuTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHNsaWRlQnRuUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIpXG5cbiAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goKGl0ZW0sIGluZGV4SXRlbSkgPT57XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goKHBvcHVwLCBpbmRleFBvcHVwKT0+e1xuICAgICAgICAgICAgICAgIGlmIChpbmRleEl0ZW0gPT09IGluZGV4UG9wdXApe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBwb3B1cC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgc2xpZGVCdG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuICAgIHNsaWRlQnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbi8vLyDQs9C70ZbRhyDRgdC70LDQudC00LXRgFxuIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcihzbGlkZXMsIGxlZnRCdG4sIHJpZ2h0QnRuLCBzbGlkZXNJY29ucywgY3VycmVudCwgcGF0aCwgaW1nLCB3ZWVrLCBjb3ZlcmZsb3csIGNvdmVyZmxvd09mZldpZHRoLCBzdWJ0aXRsZXMsIGNvcHlTbGlkZXMpe1xuICAgICBsZXQgY292ZXJmbG93VG9nZ2xlciA9IHRydWVcbiAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG4gICAgICAgICBjb3ZlcmZsb3dUb2dnbGVyID0gZmFsc2VcbiAgICAgfVxuXG4gICAgIC8vIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgIC8vICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgICAvLyAgICAgICAgIGlmKGNvdmVyZmxvd1RvZ2dsZXIpe1xuICAgICAvLyAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgIC8vICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAvLyAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgIC8vICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAvLyAgICAgICAgIH1cbiAgICAgLy8gICAgIH0pXG4gICAgIC8vIH1cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKSB7XG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICAgICBpZiAoY292ZXJmbG93VG9nZ2xlcikge1xuICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZJbmRleCA9IChpIC0gMSArIHNsaWRlcy5sZW5ndGgpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1twcmV2SW5kZXhdLmNsYXNzTGlzdC5hZGQocmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IChpICsgMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW25leHRJbmRleF0uY2xhc3NMaXN0LmFkZChsZWZ0KTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXMpO1xuICAgICBzdWJ0aXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN1YnRpdGxlcyk7XG4gICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgIH0pO1xuICAgICBpZihzbGlkZXNbY3VycmVudF0pc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKXtcbiAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNsaWRlcylcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgc2xpZGVJbmRleCkgPT57XG4gICAgICAgICAgICAgaWYoc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2FjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgIHN1YnRpdGxlcy5mb3JFYWNoKChzdWJ0aXRsZSwgc3VidGl0bGVJbmRleCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGVJbmRleCA9PT0gc3VidGl0bGVJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGUuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgIH0pXG4gICAgIH1cbiAgICAgZnVuY3Rpb24gdXBkYXRlR2xpdGNoTGF5ZXJzKHBhdGgsIGluZGV4LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgIGxldCBxdWVzdE51bWJlciA9IGdldFNsaWRlTnVtKHNsaWRlc1tjdXJyZW50XSk7XG5cbiAgICAgICAgICAgICBpZiAobGF5ZXIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFswXSAhPT0gXCJzbGlkZV9faW5mb1wiKSB7XG4gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRpcmVjdGlvbilcbiAgICAgICAgICAgICAgICAgLy8gaWYgKGNvcHlTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBuZXh0Q2xhc3MsIHByZXZDbGFzcywgY3VycmVudENsYXNzO1xuICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5leHRDbGFzcyA9IHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZy5jbGFzc0xpc3RbMV07XG4gICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgIC8vICAgICBpZiAoc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwcmV2Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3RbMV07XG4gICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgIC8vICAgICBjdXJyZW50Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAvLyAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgJiYgbmV4dENsYXNzICYmIG5leHRDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChuZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIChkaXJlY3Rpb24gPT09IFwibGVmdFwiICYmIHByZXZDbGFzcyAmJiBwcmV2Q2xhc3MgIT09IGN1cnJlbnRDbGFzcyk6XG4gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQocHJldkNsYXNzKTtcbiAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSAoZGlyZWN0aW9uID09PSBcImxlZnRcIiAmJiBzbGlkZXNbY3VycmVudF0ucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCk6XG4gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXS5jbGFzc0xpc3RbMV19YCk7XG4gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICYmIHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZyA9PT0gbnVsbCk6XG4gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzWzFdLmNsYXNzTGlzdFsxXX1gKTtcbiAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgIC8vICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChjdXJyZW50Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgIGlmIChjb3B5U2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENsYXNzLCBwcmV2Q2xhc3MsIGN1cnJlbnRDbGFzcztcblxuICAgICAgICAgICAgICAgICAgICAgLy8g0JLQuNC30L3QsNGH0LDRlNC80L4g0LrQu9Cw0YHQuCDQtNC70Y8g0L/QvtGC0L7Rh9C90L7Qs9C+INGB0LvQsNC50LTQsCwg0L/QvtC/0LXRgNC10LTQvdGM0L7Qs9C+INGWINC90LDRgdGC0YPQv9C90L7Qs9C+XG4gICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0WzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAvLyDQktC40LfQvdCw0YfQsNGU0LzQviDRltC90LTQtdC60YHQuCDQtNC70Y8g0L3QsNGB0YLRg9C/0L3QvtCz0L4g0ZYg0L/QvtC/0LXRgNC10LTQvdGM0L7Qs9C+INGB0LvQsNC50LTQsFxuICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IChjdXJyZW50ICsgMSkgJSBzbGlkZXMubGVuZ3RoOyAvLyDQndCw0YHRgtGD0L/QvdC40Lkg0YHQu9Cw0LnQtCAo0Y/QutGJ0L4gY3VycmVudCDigJQg0L7RgdGC0LDQvdC90ZbQuSwg0YLQvtC00ZYg0L/QvtCy0LXRgNGC0LDRlNC80L7RgdGMINC00L4g0L/QvtGH0LDRgtC60YMpXG4gICAgICAgICAgICAgICAgICAgICBsZXQgcHJldkluZGV4ID0gKGN1cnJlbnQgLSAxICsgc2xpZGVzLmxlbmd0aCkgJSBzbGlkZXMubGVuZ3RoOyAvLyDQn9C+0L/QtdGA0LXQtNC90ZbQuSDRgdC70LDQudC0ICjRj9C60YnQviBjdXJyZW50IOKAlCDQv9C10YDRiNC40LksINGC0L7QtNGWINC/0LXRgNC10YXQvtC00LjQvNC+INC90LAg0L7RgdGC0LDQvdC90ZbQuSlcblxuICAgICAgICAgICAgICAgICAgICAgLy8g0JLQuNC30L3QsNGH0LDRlNC80L4g0LrQu9Cw0YHQuCDQtNC70Y8g0L3QsNGB0YLRg9C/0L3QvtCz0L4g0ZYg0L/QvtC/0LXRgNC10LTQvdGM0L7Qs9C+INGB0LvQsNC50LTQsFxuICAgICAgICAgICAgICAgICAgICAgbmV4dENsYXNzID0gc2xpZGVzW25leHRJbmRleF0uY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgcHJldkNsYXNzID0gc2xpZGVzW3ByZXZJbmRleF0uY2xhc3NMaXN0WzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIChkaXJlY3Rpb24gPT09IFwicmlnaHRcIiAmJiBuZXh0Q2xhc3MgIT09IGN1cnJlbnRDbGFzcyk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQobmV4dENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIChkaXJlY3Rpb24gPT09IFwibGVmdFwiICYmIHByZXZDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChwcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgJiYgY3VycmVudCA9PT0gMCk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXS5jbGFzc0xpc3RbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICYmIGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChzbGlkZXNbMF0uY2xhc3NMaXN0WzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGN1cnJlbnRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGdldFNsaWRlTnVtKHNsaWRlKSB7XG4gICAgICAgICBjb25zdCBxdWVzdENsYXNzID0gWy4uLnNsaWRlLmNsYXNzTGlzdF0uZmluZChjbGFzc05hbWUgPT4gY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSk7XG4gICAgICAgICBpZiAocXVlc3RDbGFzcykge1xuICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChxdWVzdENsYXNzLnJlcGxhY2UoXCJxdWVzdFwiLCBcIlwiKSk7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gMTtcbiAgICAgfVxuXG5cblxuICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICB9KTtcblxuICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBpY29uc1swXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAvLyBjb25zb2xlLmxvZyh3cmFwcGVyKVxuXG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBpY29uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgY29uc3QgaWNvbk9mZnNldExlZnQgPSBpY29uLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgIGNvbnN0IGljb25XaWR0aCA9IGljb24ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJXaWR0aCA9IHdyYXBwZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgIHdyYXBwZXIuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgbGVmdDogaWNvbk9mZnNldExlZnQgLSAod3JhcHBlcldpZHRoIC8gMikgKyAoaWNvbldpZHRoIC8gMiksXG4gICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXggKyA2fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICB9LCAxMDAwKTtcbiAgICAgfVxuXG4gICAgIGxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwibGVmdFwiKSk7XG4gICAgIHJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcInJpZ2h0XCIpKTtcblxuICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9jdXJyZW50XCIpKSByZXR1cm5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9jdXJyZW50XCIpKTtcbiAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIGN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyA3fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEsKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgfSk7XG4gICAgIH0pO1xuICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG5cbiB9XG4gZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBzKVxuICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgcG9wdXBCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwb3B1cC5wYXJlbnRFbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuIH1cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgLy8gaWYod2VlayA9PT0gMSl7XG4gICAgLy8gICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgLy9cbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAvLyAgICAgICAgICAgICBzbGlkZS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PntcbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBpY29uLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgIC8vICAgICAgICAgICAgIGljb24ucmVtb3ZlKClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG4gICAgLy8gaWYod2VlayA9PT0gMil7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XG4gICAgLy8gICAgICAgICBsZXQgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucXVlc3Qke2l9YClcbiAgICAvLyAgICAgICAgIHdlZWsxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvL1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIGxldCBxdWVzdHNQYXRoID0gXCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2xldmVsLXVwLWdhbWUtdWEvaW1nL3F1ZXN0cy9zbGlkZVwiXG4gICAgZnVuY3Rpb24gY2hlY2tNZWRpYVF1ZXJpZXMob2xkUGF0aCwgbmV3UGF0aCkge1xuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5NjAwID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2MDBweClcIik7XG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk1MHB4KSBhbmQgKG1heC1oZWlnaHQ6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXCIpO1xuICAgICAgICBpZiAobWVkaWFRdWVyeTYwMC5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2xkUGF0aFxuICAgIH1cbiAgICBxdWVzdHNQYXRoID0gY2hlY2tNZWRpYVF1ZXJpZXMocXVlc3RzUGF0aCwgXCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2xldmVsLXVwLWdhbWUtdWEvaW1nL3F1ZXN0cy9tb2Ivc2xpZGVcIilcblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAxLHF1ZXN0c1BhdGgsIFwicGVycy5wbmdcIiwgbnVsbCwgZmFsc2UsIG51bGwsIFwiLnF1ZXN0c19fc3VidGl0bGVcIiwgdHJ1ZSlcbiAgICBjcmVhdGVTbGlkZXIoXCIucHJpemVfX3NsaWRlXCIsIFwiLnByaXplX19tb3ZlLWxlZnRcIiwgXCIucHJpemVfX21vdmUtcmlnaHRcIiwgXCIucHJpemVfX2ljb25zLWl0ZW1cIiwgMSxcImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbGV2ZWwtdXAtZ2FtZS11YS9pbWcvcHJpemUvc2xpZGVcIiwgXCJwcml6ZS5wbmdcIiwgbnVsbCwgdHJ1ZSAsIDExNTAsIGZhbHNlKVxuICAgIHNldFBvcHVwcyhcIi5ndWlkZV9faW5mb1wiLCBcIi5ndWlkZV9faW5mby1idG5cIiwgXCIuZ3VpZGVfX2luZm8tY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIsIFwiLnByaXplX19zbGlkZS1pbmZvLWJ0blwiLCBcIi5wcml6ZV9fc2xpZGUtY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIudGFibGVfX2luZm8tcG9wdXBcIiwgXCIudGFibGVfX2luZm9cIiwgXCIudGFibGVfX2luZm8tY2xvc2VcIilcblxuICAgIGNvbnN0IHRhYmxlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2xpc3QtaXRlbVwiKVxuICAgIGNvbnN0IHRhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2l0ZW1cIilcblxuICAgIHRhYmxlVGFicy5mb3JFYWNoKCh0YWIsIHRhYkluZGV4KSA9PntcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCgodGFibGUsIHRhYmxlSW5kZXgpID0+e1xuICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZih0YWJsZUluZGV4ID09PSAgdGFiSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgcHJpemVSaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtcmlnaHRcIilcbiAgICBjb25zdCBwcml6ZUxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBwcml6ZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIpXG5cbiAgICBmdW5jdGlvbiBjbG9zZURyb3AoZHJvcHMpe1xuICAgICAgICBkcm9wcy5mb3JFYWNoKGRyb3AgPT57XG4gICAgICAgICAgICBkcm9wLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpemVSaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuICAgIHByaXplTGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuXG4vLy8g0LDQvdGW0LzQsNGG0ZbRjyDQtNC40L3QsNC80ZbRh9C90L7Qs9C+INC90LDQsdC+0YDRgyDRgtC10LrRgdGCXG4gICAgZnVuY3Rpb24gZHluYW1pY1R5cGV3cml0ZXIoZWxlbWVudCwgc3BlZWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHRleHRBcnJheSA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyhcXHMrKS8pLmZpbHRlcihmdW5jdGlvbiAoX2NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfY2hhci50cmltKCkgIT09ICcnIHx8IF9jaGFyID09PSAnICc7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd29yZEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNoYXJJbmRleCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICcnO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9vcGFjaXR5XCIpXG5cbiAgICAgICAgZnVuY3Rpb24gdHlwZVdvcmQoKSB7XG4gICAgICAgICAgICBpZiAod29yZEluZGV4ID09PSBsaXRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdGV4dEFycmF5W3dvcmRJbmRleF07XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRXb3JkID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY2hhckluZGV4IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gY3VycmVudFdvcmQuY2hhckF0KGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9ICcgJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgd29yZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgdHlwZVdvcmQoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gb2JzZXJ2ZUVsZW1lbnRzKHR5cGVFbGVtcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vdDogbnVsbCxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwZXdyaXRlcihlbnRyeS50YXJnZXQsIDM1LCAoKSA9PiB7fSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdHlwZUVsZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdHlwZUFuaW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwZS1hbmltJyk7XG4gICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTtcblxuLy8vIHByb2dyZXNzIGJhciDQsNC90ZbQvNCw0YbRltGPXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKXtcbiAgICAgICAgaWYoY3VycmVudFBvc2l0aW9uIDw9IDEwMCl7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICBlbGVtV3JhcC5pbm5lclRleHQgPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgICsrY3VycmVudFBvc2l0aW9uXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFBvc2l0aW9uID49IDEwMCl7XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBzdGFydFxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLWJhclwiKVxuICAgIGNvbnN0IHByb2dyZXNzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtdGV4dFwiKVxuXG4gICAgcHJvZ3Jlc3NBbmltKDQwLCBwcm9ncmVzc0JhciwgcHJvZ3Jlc3NXcmFwLCA0MClcblxuLy8gcG9wdXBzXG4gICAgY29uc3QgdGFibGVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX2J0blwiKVxuICAgIGNvbnN0IGNsb3NlUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2Nsb3NlXCIpXG4gICAgY29uc3QgcG9wdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzXCIpXG5cbiAgICB0YWJsZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QuYWRkKFwiX3RhYmxlXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9vdmVyZmxvdy1oaWRkZW5cIilcbiAgICB9KVxuICAgIGNsb3NlUG9wdXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX3RhYmxlXCIpXG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cblxuLy8gZm9yIHRlc3RcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuLWxuZ1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIikuY2xhc3NMaXN0LnRvZ2dsZShcImVuXCIpXG4gICAgfSlcblxuICAgIGNvbnN0IGRvbmVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9uZS1wb3B1cFwiKVxuXG4gICAgZG9uZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QudG9nZ2xlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuICAgIGNvbnN0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMVwiKTtcbiAgICBjb25zdCB3ZWVrMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazJcIik7XG5cbiAgICB3ZWVrMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMSk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgd2VlazIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbn0pKCk7XG4iXX0=
