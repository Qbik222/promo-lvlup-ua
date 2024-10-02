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
    function coverFlowClasses(right, left, slides) {
      slides.forEach(function (slide, i) {
        if (coverflowToggler) {
          if (current === i) {
            if (slide.previousElementSibling === null) {
              slides[slides.length - 1].classList.add(right);
            } else {
              slide.previousElementSibling.classList.add(right);
            }
            if (slide.nextSibling === null) {
              slides[0].classList.add(left);
            } else {
              slide.nextSibling.classList.add(left);
            }
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
          if (copySlides) {
            var nextClass, prevClass, currentClass;
            if (slides[current].nextSibling) {
              nextClass = slides[current].nextSibling.classList[1];
            }
            if (slides[current].previousElementSibling) {
              prevClass = slides[current].previousElementSibling.classList[1];
            }
            currentClass = slides[current].classList[1];
            switch (true) {
              case direction === "right" && nextClass && nextClass !== currentClass:
                layer.classList.add(nextClass);
                break;
              case direction === "left" && prevClass && prevClass !== currentClass:
                layer.classList.add(prevClass);
                break;
              case direction === "left" && slides[current].previousElementSibling === null:
                layer.classList.add("".concat(slides[slides.length - 1].classList[1]));
                break;
              case direction === "right" && slides[current].nextSibling === null:
                layer.classList.add("".concat(slides[1].classList[1]));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNnIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicGFydGljaXBhdGVCdG4iLCJyZWRpcmVjdEJ0bnMiLCJsb2NhbGUiLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwiZWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtYWluUGFnZSIsImNsYXNzTGlzdCIsImFkZCIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsInR5cGVBbmltIiwib2JzZXJ2ZUVsZW1lbnRzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsImxhbmciLCJyZW1vdmUiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImhlYWRlcnMiLCJpbml0Iiwid2luZG93Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsImkiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJjbGVhckludGVydmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwidXNlcmlkIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXRUaW1lb3V0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsImluZm9TbGlkZXNNb2JQb3B1cCIsInNsaWRlQnRuTGVmdCIsInNsaWRlQnRuUmlnaHQiLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImNyZWF0ZVNsaWRlciIsInNsaWRlcyIsImxlZnRCdG4iLCJyaWdodEJ0biIsInNsaWRlc0ljb25zIiwiY3VycmVudCIsInBhdGgiLCJpbWciLCJjb3ZlcmZsb3ciLCJjb3ZlcmZsb3dPZmZXaWR0aCIsInN1YnRpdGxlcyIsImNvcHlTbGlkZXMiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJuZXh0U2libGluZyIsImdsaXRjaExheWVycyIsInN1YnRpdGxlc0luaXQiLCJzbGlkZUluZGV4IiwiY29udGFpbnMiLCJzdWJ0aXRsZSIsInN1YnRpdGxlSW5kZXgiLCJ1cGRhdGVHbGl0Y2hMYXllcnMiLCJpbmRleCIsImRpcmVjdGlvbiIsImxheWVyIiwiY2xhc3NOYW1lIiwic3RhcnRzV2l0aCIsInF1ZXN0TnVtYmVyIiwiZ2V0U2xpZGVOdW0iLCJuZXh0Q2xhc3MiLCJwcmV2Q2xhc3MiLCJjdXJyZW50Q2xhc3MiLCJiYWNrZ3JvdW5kIiwicXVlc3RDbGFzcyIsImZpbmQiLCJyZXBsYWNlIiwibW92ZVNsaWRlciIsIlNsaWRlSWNvbnNJbml0IiwiaWNvbnMiLCJ3cmFwcGVyIiwiaWNvbiIsImljb25JbmRleCIsImljb25PZmZzZXRMZWZ0Iiwib2Zmc2V0TGVmdCIsImljb25XaWR0aCIsIm9mZnNldFdpZHRoIiwid3JhcHBlcldpZHRoIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsImhhbmRsZUNsaWNrIiwibmV4dFNsaWRlSW5kZXgiLCJ0YXJnZXQiLCJzZXRQb3B1cHMiLCJwb3B1cHMiLCJwb3B1cEJ0bnMiLCJjbG9zZUJ0bnMiLCJidG4iLCJxdWVzdHNQYXRoIiwiY2hlY2tNZWRpYVF1ZXJpZXMiLCJvbGRQYXRoIiwibmV3UGF0aCIsIm1lZGlhUXVlcnk2MDAiLCJtYXRjaE1lZGlhIiwibWVkaWFRdWVyeTk1MExhbmRzY2FwZSIsIm1hdGNoZXMiLCJ0YWJsZVRhYnMiLCJ0YWJsZXMiLCJ0YWIiLCJ0YWJJbmRleCIsInRhYmxlIiwidGFibGVJbmRleCIsInByaXplUmlnaHRCdG4iLCJwcml6ZUxlZnRCdG4iLCJwcml6ZVBvcHVwcyIsImNsb3NlRHJvcCIsImRyb3BzIiwiZHJvcCIsImR5bmFtaWNUeXBld3JpdGVyIiwic3BlZWQiLCJjYWxsYmFjayIsInRleHRBcnJheSIsInRleHRDb250ZW50IiwidHJpbSIsInNwbGl0IiwibGl0QXJyIiwiam9pbiIsImZpbHRlciIsIl9jaGFyIiwid29yZEluZGV4IiwiY2hhckluZGV4IiwiY3VycmVudFRleHQiLCJ0eXBlV29yZCIsImN1cnJlbnRXb3JkIiwidW5kZWZpbmVkIiwiY2hhckF0IiwiaW5uZXJUZXh0IiwidHlwZUVsZW1zIiwib3B0aW9ucyIsInJvb3QiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJvYnNlcnZlIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtV3JhcCIsImN1cnJlbnRQb3NpdGlvbiIsIndpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1dyYXAiLCJ0YWJsZVBvcHVwQnRuIiwiY2xvc2VQb3B1cHMiLCJwb3B1cHNXcmFwIiwiZG9uZVBvcHVwQnRuIiwid2VlazEiLCJ3ZWVrMiIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztFQUUxRCxJQUNJQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNqREMsY0FBYyxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDcERFLFlB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LENBQUM7RUFDRjlFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDb0QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7SUFDN0RyRCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQ3dCLFNBQVMsQ0FBQ3FELE1BQU0sQ0FBQyxJQUFJLENBQUM7RUFDOUQsQ0FBQyxDQUFDO0VBRUYsSUFBTThILFlBQVksR0FBRzVNLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUUxRDJNLFlBQVksQ0FBQ3ZKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQ3hDc0osVUFBVSxDQUFDbEwsU0FBUyxDQUFDcUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQzlFLFFBQVEsQ0FBQzRELElBQUksQ0FBQ25DLFNBQVMsQ0FBQ3FELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztFQUV0RCxDQUFDLENBQUM7RUFFRixJQUFNK0gsS0FBSyxHQUFHN00sUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzlDLElBQU02TSxLQUFLLEdBQUc5TSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFOUM0TSxLQUFLLENBQUN4SixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ2MsWUFBWSxDQUFDNEksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0IvSSxRQUFRLENBQUNDLE1BQU0sRUFBRTtFQUNyQixDQUFDLENBQUM7RUFFRjZJLEtBQUssQ0FBQ3pKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ2xDYyxZQUFZLENBQUM0SSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQi9JLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUNOLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2xldmVsX3VwX2dhbWVfdWEnO1xuXG4gICAgY29uc3RcbiAgICAgICAgdW5hdXRoTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2stcGFydCcpO1xuXG4gICAgbGV0IGxvY2FsZSA9ICd1ayc7XG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgaWYgKHVrTGVuZykgbG9jYWxlID0gJ3VrJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IHVzZXJJZDtcbiAgICAvLyB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpO1xuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxlID09PSAnZW4nKSB7XG4gICAgICAgICAgICBtYWluUGFnZS5jbGFzc0xpc3QuYWRkKCdlbicpO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuXG4gICAgICAgIC8vINCf0ZbRgdC70Y8g0L/QtdGA0LXQutC70LDQtNGDINCy0LjQutC70LjQutCw0ZTQvNC+INGE0YPQvdC60YbRltGOINGB0L/QvtGB0YLQtdGA0LXQttC10L3QvdGPXG4gICAgICAgIGNvbnN0IHR5cGVBbmltID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYW5pbScpO1xuICAgICAgICBvYnNlcnZlRWxlbWVudHModHlwZUFuaW0pOyAvLyDQl9Cw0L/Rg9GB0LrQsNGU0LzQviDRgdC/0L7RgdGC0LXRgNC10LbQtdC90L3RjyDRgtGW0LvRjNC60Lgg0L/RltGB0LvRjyDQt9Cw0LLQtdGA0YjQtdC90L3RjyDQv9C10YDQtdC60LvQsNC00YNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgaWYgKHBhcnRpY2lwYXRlQnRuKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHt9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZSgpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHsgdXNlcmlkOiB1c2VySWQgfTtcbiAgICAgICAgcmVxdWVzdCgnL3VzZXInLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1VzZXJBdXRoKCkge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICB1bmF1dGhNc2cuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9P25vY2FjaGU9MWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHVuYXV0aE1zZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKCkudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXYtcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnX292ZXJmbG93LWhpZGRlbicpLCAxMDAwKTtcblxuICAgIC8vWXVyYSBDb2RlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCAoKSA9PntcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9KVxuXG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLW1vYlwiKVxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2JQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tYm90dG9tXCIpXG4gICAgY29uc3Qgc2xpZGVCdG5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3Qgc2xpZGVCdG5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtcmlnaHRcIilcblxuICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaCgoaXRlbSwgaW5kZXhJdGVtKSA9PntcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaCgocG9wdXAsIGluZGV4UG9wdXApPT57XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SXRlbSA9PT0gaW5kZXhQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzbGlkZUJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG4gICAgc2xpZGVCdG5SaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgfSlcblxuLy8vINCz0LvRltGHINGB0LvQsNC50LTQtdGAXG4gZnVuY3Rpb24gY3JlYXRlU2xpZGVyKHNsaWRlcywgbGVmdEJ0biwgcmlnaHRCdG4sIHNsaWRlc0ljb25zLCBjdXJyZW50LCBwYXRoLCBpbWcsIHdlZWssIGNvdmVyZmxvdywgY292ZXJmbG93T2ZmV2lkdGgsIHN1YnRpdGxlcywgY29weVNsaWRlcyl7XG4gICAgIGxldCBjb3ZlcmZsb3dUb2dnbGVyID0gdHJ1ZVxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKXtcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgICAgICAgICAgaWYoY292ZXJmbG93VG9nZ2xlcil7XG4gICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IGkpe1xuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLTFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5uZXh0U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIHN1YnRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc3VidGl0bGVzKTtcbiAgICAgbGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGVmdEJ0bik7XG4gICAgIHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyaWdodEJ0bik7XG4gICAgIHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXNJY29ucyk7XG4gICAgIGxldCBnbGl0Y2hMYXllcnMgPSBbXTtcbiAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzID0gWy4uLmdsaXRjaExheWVycywgLi4uc2xpZGUucXVlcnlTZWxlY3RvckFsbChcIi5nbGl0Y2hfX2xheWVyXCIpXTtcbiAgICAgfSk7XG4gICAgIGlmKHNsaWRlc1tjdXJyZW50XSlzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpe1xuICAgICAgICAgLy8gY29uc29sZS5sb2coc2xpZGVzKVxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PntcbiAgICAgICAgICAgICBpZihzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoXCJfYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgc3VidGl0bGVzLmZvckVhY2goKHN1YnRpdGxlLCBzdWJ0aXRsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZUluZGV4ID09PSBzdWJ0aXRsZUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgsIGRpcmVjdGlvbikge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgbGV0IHF1ZXN0TnVtYmVyID0gZ2V0U2xpZGVOdW0oc2xpZGVzW2N1cnJlbnRdKTtcblxuICAgICAgICAgICAgIGlmIChsYXllci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzBdICE9PSBcInNsaWRlX19pbmZvXCIpIHtcbiAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGlyZWN0aW9uKVxuICAgICAgICAgICAgICAgICBpZiAoY29weVNsaWRlcykge1xuICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRDbGFzcywgcHJldkNsYXNzLCBjdXJyZW50Q2xhc3M7XG5cbiAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXNbY3VycmVudF0ubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0ubmV4dFNpYmxpbmcuY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tjdXJyZW50XS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJldkNsYXNzID0gc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgY3VycmVudENsYXNzID0gc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdFsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgJiYgbmV4dENsYXNzICYmIG5leHRDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChuZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgJiYgcHJldkNsYXNzICYmIHByZXZDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChwcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgJiYgc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGAke3NsaWRlc1tzbGlkZXMubGVuZ3RoIC0gMV0uY2xhc3NMaXN0WzFdfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICYmIHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZyA9PT0gbnVsbCk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzWzFdLmNsYXNzTGlzdFsxXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGN1cnJlbnRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGdldFNsaWRlTnVtKHNsaWRlKSB7XG4gICAgICAgICBjb25zdCBxdWVzdENsYXNzID0gWy4uLnNsaWRlLmNsYXNzTGlzdF0uZmluZChjbGFzc05hbWUgPT4gY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSk7XG4gICAgICAgICBpZiAocXVlc3RDbGFzcykge1xuICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChxdWVzdENsYXNzLnJlcGxhY2UoXCJxdWVzdFwiLCBcIlwiKSk7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gMTtcbiAgICAgfVxuXG5cblxuICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICB9KTtcblxuICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBpY29uc1swXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAvLyBjb25zb2xlLmxvZyh3cmFwcGVyKVxuXG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBpY29uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgY29uc3QgaWNvbk9mZnNldExlZnQgPSBpY29uLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgIGNvbnN0IGljb25XaWR0aCA9IGljb24ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJXaWR0aCA9IHdyYXBwZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgIHdyYXBwZXIuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgbGVmdDogaWNvbk9mZnNldExlZnQgLSAod3JhcHBlcldpZHRoIC8gMikgKyAoaWNvbldpZHRoIC8gMiksXG4gICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXggKyA2fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICB9LCAxMDAwKTtcbiAgICAgfVxuXG4gICAgIGxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwibGVmdFwiKSk7XG4gICAgIHJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcInJpZ2h0XCIpKTtcblxuICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9jdXJyZW50XCIpKSByZXR1cm5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9jdXJyZW50XCIpKTtcbiAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIGN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyA3fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEsKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgfSk7XG4gICAgIH0pO1xuICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG5cbiB9XG4gZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBzKVxuICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgcG9wdXBCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwb3B1cC5wYXJlbnRFbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuIH1cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgLy8gaWYod2VlayA9PT0gMSl7XG4gICAgLy8gICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgLy9cbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAvLyAgICAgICAgICAgICBzbGlkZS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PntcbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBpY29uLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgIC8vICAgICAgICAgICAgIGljb24ucmVtb3ZlKClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG4gICAgLy8gaWYod2VlayA9PT0gMil7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XG4gICAgLy8gICAgICAgICBsZXQgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucXVlc3Qke2l9YClcbiAgICAvLyAgICAgICAgIHdlZWsxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvL1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIGxldCBxdWVzdHNQYXRoID0gXCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2xldmVsLXVwLWdhbWUtdWEvaW1nL3F1ZXN0cy9zbGlkZVwiXG4gICAgZnVuY3Rpb24gY2hlY2tNZWRpYVF1ZXJpZXMob2xkUGF0aCwgbmV3UGF0aCkge1xuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5NjAwID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2MDBweClcIik7XG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk1MHB4KSBhbmQgKG1heC1oZWlnaHQ6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXCIpO1xuICAgICAgICBpZiAobWVkaWFRdWVyeTYwMC5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2xkUGF0aFxuICAgIH1cbiAgICBxdWVzdHNQYXRoID0gY2hlY2tNZWRpYVF1ZXJpZXMocXVlc3RzUGF0aCwgXCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2xldmVsLXVwLWdhbWUtdWEvaW1nL3F1ZXN0cy9tb2Ivc2xpZGVcIilcblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAxLHF1ZXN0c1BhdGgsIFwicGVycy5wbmdcIiwgbnVsbCwgZmFsc2UsIG51bGwsIFwiLnF1ZXN0c19fc3VidGl0bGVcIiwgdHJ1ZSlcbiAgICBjcmVhdGVTbGlkZXIoXCIucHJpemVfX3NsaWRlXCIsIFwiLnByaXplX19tb3ZlLWxlZnRcIiwgXCIucHJpemVfX21vdmUtcmlnaHRcIiwgXCIucHJpemVfX2ljb25zLWl0ZW1cIiwgMSxcImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbGV2ZWwtdXAtZ2FtZS11YS9pbWcvcHJpemUvc2xpZGVcIiwgXCJwcml6ZS5wbmdcIiwgbnVsbCwgdHJ1ZSAsIDExNTAsIGZhbHNlKVxuICAgIHNldFBvcHVwcyhcIi5ndWlkZV9faW5mb1wiLCBcIi5ndWlkZV9faW5mby1idG5cIiwgXCIuZ3VpZGVfX2luZm8tY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIsIFwiLnByaXplX19zbGlkZS1pbmZvLWJ0blwiLCBcIi5wcml6ZV9fc2xpZGUtY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIudGFibGVfX2luZm8tcG9wdXBcIiwgXCIudGFibGVfX2luZm9cIiwgXCIudGFibGVfX2luZm8tY2xvc2VcIilcblxuICAgIGNvbnN0IHRhYmxlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2xpc3QtaXRlbVwiKVxuICAgIGNvbnN0IHRhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2l0ZW1cIilcblxuICAgIHRhYmxlVGFicy5mb3JFYWNoKCh0YWIsIHRhYkluZGV4KSA9PntcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCgodGFibGUsIHRhYmxlSW5kZXgpID0+e1xuICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZih0YWJsZUluZGV4ID09PSAgdGFiSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgcHJpemVSaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtcmlnaHRcIilcbiAgICBjb25zdCBwcml6ZUxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBwcml6ZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIpXG5cbiAgICBmdW5jdGlvbiBjbG9zZURyb3AoZHJvcHMpe1xuICAgICAgICBkcm9wcy5mb3JFYWNoKGRyb3AgPT57XG4gICAgICAgICAgICBkcm9wLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpemVSaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuICAgIHByaXplTGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuXG4vLy8g0LDQvdGW0LzQsNGG0ZbRjyDQtNC40L3QsNC80ZbRh9C90L7Qs9C+INC90LDQsdC+0YDRgyDRgtC10LrRgdGCXG4gICAgZnVuY3Rpb24gZHluYW1pY1R5cGV3cml0ZXIoZWxlbWVudCwgc3BlZWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHRleHRBcnJheSA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyhcXHMrKS8pLmZpbHRlcihmdW5jdGlvbiAoX2NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfY2hhci50cmltKCkgIT09ICcnIHx8IF9jaGFyID09PSAnICc7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd29yZEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNoYXJJbmRleCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICcnO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9vcGFjaXR5XCIpXG5cbiAgICAgICAgZnVuY3Rpb24gdHlwZVdvcmQoKSB7XG4gICAgICAgICAgICBpZiAod29yZEluZGV4ID09PSBsaXRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdGV4dEFycmF5W3dvcmRJbmRleF07XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRXb3JkID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY2hhckluZGV4IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gY3VycmVudFdvcmQuY2hhckF0KGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9ICcgJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgd29yZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgdHlwZVdvcmQoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gb2JzZXJ2ZUVsZW1lbnRzKHR5cGVFbGVtcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vdDogbnVsbCxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwZXdyaXRlcihlbnRyeS50YXJnZXQsIDM1LCAoKSA9PiB7fSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdHlwZUVsZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdHlwZUFuaW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwZS1hbmltJyk7XG4gICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTtcblxuLy8vIHByb2dyZXNzIGJhciDQsNC90ZbQvNCw0YbRltGPXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKXtcbiAgICAgICAgaWYoY3VycmVudFBvc2l0aW9uIDw9IDEwMCl7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICBlbGVtV3JhcC5pbm5lclRleHQgPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgICsrY3VycmVudFBvc2l0aW9uXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFBvc2l0aW9uID49IDEwMCl7XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBzdGFydFxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLWJhclwiKVxuICAgIGNvbnN0IHByb2dyZXNzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtdGV4dFwiKVxuXG4gICAgcHJvZ3Jlc3NBbmltKDQwLCBwcm9ncmVzc0JhciwgcHJvZ3Jlc3NXcmFwLCA0MClcblxuLy8gcG9wdXBzXG4gICAgY29uc3QgdGFibGVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX2J0blwiKVxuICAgIGNvbnN0IGNsb3NlUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2Nsb3NlXCIpXG4gICAgY29uc3QgcG9wdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzXCIpXG5cbiAgICB0YWJsZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QuYWRkKFwiX3RhYmxlXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9vdmVyZmxvdy1oaWRkZW5cIilcbiAgICB9KVxuICAgIGNsb3NlUG9wdXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX3RhYmxlXCIpXG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cblxuLy8gZm9yIHRlc3RcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuLWxuZ1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIikuY2xhc3NMaXN0LnRvZ2dsZShcImVuXCIpXG4gICAgfSlcblxuICAgIGNvbnN0IGRvbmVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9uZS1wb3B1cFwiKVxuXG4gICAgZG9uZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QudG9nZ2xlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuICAgIGNvbnN0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMVwiKTtcbiAgICBjb25zdCB3ZWVrMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazJcIik7XG5cbiAgICB3ZWVrMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMSk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgd2VlazIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbn0pKCk7XG4iXX0=
