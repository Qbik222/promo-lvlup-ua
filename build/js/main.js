"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener("DOMContentLoaded", function () {
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
  function createSlider(slides, leftBtn, rightBtn, slidesIcons, current, path, img, week, coverflow, coverflowOffWidth) {
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
    leftBtn = document.querySelector(leftBtn);
    rightBtn = document.querySelector(rightBtn);
    slidesIcons = document.querySelectorAll(slidesIcons);
    var glitchLayers = [];
    slides.forEach(function (slide) {
      glitchLayers = [].concat(_toConsumableArray(glitchLayers), _toConsumableArray(slide.querySelectorAll(".glitch__layer")));
    });
    slides[current].classList.add("_active");
    if (coverflow) {
      coverFlowClasses("right-cover", "left-cover", slides);
    }
    function updateGlitchLayers(path, index) {
      if (week === 2) {
        index += 6;
      }
      console.log(index);
      glitchLayers.forEach(function (layer) {
        layer.classList.forEach(function (className) {
          if (className.startsWith("slide-info-glitch")) {
            layer.classList.remove("slide-info-glitch");
          }
          if (className.startsWith("quest")) {
            layer.classList.remove(className);
          }
        });
        if (layer.parentElement.parentElement.classList[0] !== "slide__info") {
          layer.classList.add("quest".concat(index));
          layer.style.background = path;
        } else {
          layer.classList.add("slide-info-glitch");
        }
      });
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
      icons.forEach(function (icon, iconIndex) {
        icon.classList.toggle("_current", current === iconIndex);
      });
    }
    function handleClick(direction) {
      slides[current].classList.add("glitch");
      coverFlowClasses("glitch", "glitch", slides);
      rightBtn.style.pointerEvents = "none";
      leftBtn.style.pointerEvents = "none";
      var nextSlideIndex = direction === "left" ? current === 0 ? slides.length : current : current === slides.length - 1 ? 1 : current + 2;
      if (week === 2) {
        updateGlitchLayers("url(\"".concat(path).concat(nextSlideIndex + 6, "/").concat(img, "\") no-repeat 0 0/contain"), nextSlideIndex);
      } else {
        updateGlitchLayers("url(\"".concat(path).concat(nextSlideIndex, "/").concat(img, "\") no-repeat 0 0/contain"), nextSlideIndex);
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
          });
          rightBtn.style.pointerEvents = "initial";
          leftBtn.style.pointerEvents = "initial";
        }, 1000);
      });
    });
    SlideIconsInit(slidesIcons, current);
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
  if (week === 1) {
    slides.forEach(function (slide, i) {
      if (i >= 6 || slide.classList.contains("quest".concat(i))) {
        slide.remove();
      }
    });
    slidesIcons.forEach(function (icon, i) {
      if (i >= 6 || icon.classList.contains("quest".concat(i))) {
        icon.remove();
      }
    });
  }
  if (week === 2) {
    for (var i = 1; i <= 6; i++) {
      var _week = document.querySelectorAll(".quest".concat(i));
      _week.forEach(function (item) {
        item.remove();
      });
    }
  }
  var questsPath = "./img/quests/slide";
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
  questsPath = checkMediaQueries(questsPath, "./img/quests/mob/slide");
  createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1, questsPath, "pers.png", week);
  createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 1, "./img/prize/slide", "prize.png", null, true, 1150);
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
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmZvU2xpZGVzTW9iUG9wdXAiLCJzbGlkZUJ0bkxlZnQiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVCdG5SaWdodCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsImkiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGVuZ3RoIiwiYWRkIiwibmV4dFNpYmxpbmciLCJnbGl0Y2hMYXllcnMiLCJ1cGRhdGVHbGl0Y2hMYXllcnMiLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJsYXllciIsImNsYXNzTmFtZSIsInN0YXJ0c1dpdGgiLCJiYWNrZ3JvdW5kIiwibW92ZVNsaWRlciIsImRpcmVjdGlvbiIsIlNsaWRlSWNvbnNJbml0IiwiaWNvbnMiLCJpY29uIiwiaWNvbkluZGV4IiwiaGFuZGxlQ2xpY2siLCJuZXh0U2xpZGVJbmRleCIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNldFBvcHVwcyIsInBvcHVwcyIsInBvcHVwQnRucyIsImNsb3NlQnRucyIsImJ0biIsIndlZWsxIiwicXVlc3RzUGF0aCIsImNoZWNrTWVkaWFRdWVyaWVzIiwib2xkUGF0aCIsIm5ld1BhdGgiLCJtZWRpYVF1ZXJ5NjAwIiwibWF0Y2hNZWRpYSIsIm1lZGlhUXVlcnk5NTBMYW5kc2NhcGUiLCJtYXRjaGVzIiwidGFibGVUYWJzIiwidGFibGVzIiwidGFiIiwidGFiSW5kZXgiLCJ0YWJsZSIsInRhYmxlSW5kZXgiLCJwcml6ZVJpZ2h0QnRuIiwicHJpemVMZWZ0QnRuIiwicHJpemVQb3B1cHMiLCJjbG9zZURyb3AiLCJkcm9wcyIsImRyb3AiLCJkeW5hbWljVHlwZXdyaXRlciIsImVsZW1lbnQiLCJzcGVlZCIsImNhbGxiYWNrIiwidGV4dEFycmF5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwic3BsaXQiLCJsaXRBcnIiLCJqb2luIiwiZmlsdGVyIiwiX2NoYXIiLCJ3b3JkSW5kZXgiLCJjaGFySW5kZXgiLCJjdXJyZW50VGV4dCIsInR5cGVXb3JkIiwiY3VycmVudFdvcmQiLCJ1bmRlZmluZWQiLCJjaGFyQXQiLCJpbm5lclRleHQiLCJvYnNlcnZlRWxlbWVudHMiLCJ0eXBlRWxlbXMiLCJvcHRpb25zIiwicm9vdCIsInRocmVzaG9sZCIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJ0eXBlQW5pbSIsInByb2dyZXNzQW5pbSIsInN0YXJ0IiwiZWxlbSIsImVsZW1XcmFwIiwiY3VycmVudFBvc2l0aW9uIiwid2lkdGgiLCJwcm9ncmVzc0JhciIsInByb2dyZXNzV3JhcCIsInRhYmxlUG9wdXBCdG4iLCJjbG9zZVBvcHVwcyIsInBvcHVwc1dyYXAiLCJib2R5IiwiZG9uZVBvcHVwQnRuIiwid2VlazIiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFDL0NDLE1BQU0sQ0FBQ0QsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsWUFBSztJQUM5Q0UsUUFBUSxDQUFDQyxNQUFNLEVBQUU7RUFDckIsQ0FBQyxDQUFDO0VBRUYsSUFBSUMsSUFBSSxHQUFHQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBR0MsUUFBUSxDQUFDRixZQUFZLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFFcEYsSUFBTUUsYUFBYSxHQUFHVCxRQUFRLENBQUNVLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDO0VBQ25FLElBQU1DLGtCQUFrQixHQUFHWCxRQUFRLENBQUNVLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO0VBQzNFLElBQU1FLFlBQVksR0FBR1osUUFBUSxDQUFDYSxhQUFhLENBQUMsbUJBQW1CLENBQUM7RUFDaEUsSUFBTUMsYUFBYSxHQUFHZCxRQUFRLENBQUNhLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUVsRUosYUFBYSxDQUFDTSxPQUFPLENBQUMsVUFBQ0MsSUFBSSxFQUFFQyxTQUFTLEVBQUk7SUFDdENELElBQUksQ0FBQ2YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7TUFDaENVLGtCQUFrQixDQUFDSSxPQUFPLENBQUMsVUFBQ0csS0FBSyxFQUFFQyxVQUFVLEVBQUc7UUFDNUMsSUFBSUYsU0FBUyxLQUFLRSxVQUFVLEVBQUM7VUFDekJELEtBQUssQ0FBQ0UsU0FBUyxDQUFDQyxNQUFNLENBQUMsU0FBUyxDQUFDO1VBQ2pDSCxLQUFLLENBQUNJLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDQSxhQUFhLENBQUNGLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFNBQVMsQ0FBQztVQUMzRUwsSUFBSSxDQUFDSSxTQUFTLENBQUNDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFcEM7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFDRlQsWUFBWSxDQUFDWCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztJQUN4Q1EsYUFBYSxDQUFDTSxPQUFPLENBQUMsVUFBQUMsSUFBSSxFQUFHO01BQ3pCLElBQUdBLElBQUksQ0FBQ00sYUFBYSxDQUFDQSxhQUFhLENBQUNBLGFBQWEsS0FBSyxJQUFJLEVBQUM7UUFDdkROLElBQUksQ0FBQ08sS0FBSyxDQUFDQyxhQUFhLEdBQUcsTUFBTTtRQUNqQ0MsVUFBVSxDQUFDLFlBQUs7VUFDWlQsSUFBSSxDQUFDTyxLQUFLLENBQUNDLGFBQWEsR0FBRyxTQUFTO1FBQ3hDLENBQUMsRUFBRSxJQUFJLENBQUM7TUFDWjtJQUNKLENBQUMsQ0FBQztJQUNGYixrQkFBa0IsQ0FBQ0ksT0FBTyxDQUFDLFVBQUFDLElBQUksRUFBRztNQUM5QixJQUFHQSxJQUFJLENBQUNNLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDQSxhQUFhLEtBQUssSUFBSSxFQUFDO1FBQ3ZETixJQUFJLENBQUNJLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQ1YsSUFBSSxDQUFDTSxhQUFhLENBQUNBLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDRixTQUFTLENBQUNNLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDMUVWLElBQUksQ0FBQ0ksU0FBUyxDQUFDTSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQ3BDO0lBQ0osQ0FBQyxDQUFDO0VBR04sQ0FBQyxDQUFDO0VBQ0ZaLGFBQWEsQ0FBQ2IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7SUFDekNRLGFBQWEsQ0FBQ00sT0FBTyxDQUFDLFVBQUFDLElBQUksRUFBRztNQUN6QixJQUFHQSxJQUFJLENBQUNNLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDQSxhQUFhLEtBQUssSUFBSSxFQUFDO1FBQ3ZETixJQUFJLENBQUNPLEtBQUssQ0FBQ0MsYUFBYSxHQUFHLE1BQU07UUFDakNDLFVBQVUsQ0FBQyxZQUFLO1VBQ1pULElBQUksQ0FBQ08sS0FBSyxDQUFDQyxhQUFhLEdBQUcsU0FBUztRQUN4QyxDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ1o7SUFDSixDQUFDLENBQUM7SUFDRmIsa0JBQWtCLENBQUNJLE9BQU8sQ0FBQyxVQUFBQyxJQUFJLEVBQUc7TUFDOUIsSUFBR0EsSUFBSSxDQUFDTSxhQUFhLENBQUNBLGFBQWEsQ0FBQ0EsYUFBYSxLQUFLLElBQUksRUFBQztRQUN2RE4sSUFBSSxDQUFDSSxTQUFTLENBQUNNLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaENWLElBQUksQ0FBQ00sYUFBYSxDQUFDQSxhQUFhLENBQUNBLGFBQWEsQ0FBQ0YsU0FBUyxDQUFDTSxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQzFFVixJQUFJLENBQUNJLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFNBQVMsQ0FBQztNQUNwQztJQUNKLENBQUMsQ0FBQztFQUdOLENBQUMsQ0FBQzs7RUFFTjtFQUNDLFNBQVNDLFlBQVksQ0FBQ0MsTUFBTSxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsRUFBRUMsV0FBVyxFQUFFQyxPQUFPLEVBQUVDLElBQUksRUFBRUMsR0FBRyxFQUFFN0IsSUFBSSxFQUFFOEIsU0FBUyxFQUFFQyxpQkFBaUIsRUFBQztJQUNqSCxJQUFJQyxnQkFBZ0IsR0FBRyxJQUFJO0lBQzNCLElBQUduQyxNQUFNLENBQUNvQyxVQUFVLEdBQUdGLGlCQUFpQixFQUFDO01BQ3JDQyxnQkFBZ0IsR0FBRyxLQUFLO0lBQzVCO0lBRUEsU0FBU0UsZ0JBQWdCLENBQUNDLEtBQUssRUFBRUMsSUFBSSxFQUFFYixNQUFNLEVBQUM7TUFDMUNBLE1BQU0sQ0FBQ2IsT0FBTyxDQUFDLFVBQUMyQixLQUFLLEVBQUVDLENBQUMsRUFBSTtRQUN4QixJQUFHTixnQkFBZ0IsRUFBQztVQUNoQixJQUFHTCxPQUFPLEtBQUtXLENBQUMsRUFBQztZQUNiLElBQUdELEtBQUssQ0FBQ0Usc0JBQXNCLEtBQUssSUFBSSxFQUFDO2NBQ3JDaEIsTUFBTSxDQUFDQSxNQUFNLENBQUNpQixNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUN6QixTQUFTLENBQUMwQixHQUFHLENBQUNOLEtBQUssQ0FBQztZQUNqRCxDQUFDLE1BQUk7Y0FDREUsS0FBSyxDQUFDRSxzQkFBc0IsQ0FBQ3hCLFNBQVMsQ0FBQzBCLEdBQUcsQ0FBQ04sS0FBSyxDQUFDO1lBQ3JEO1lBQ0EsSUFBR0UsS0FBSyxDQUFDSyxXQUFXLEtBQUssSUFBSSxFQUFDO2NBQzFCbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDUixTQUFTLENBQUMwQixHQUFHLENBQUNMLElBQUksQ0FBQztZQUNqQyxDQUFDLE1BQ0c7Y0FDQUMsS0FBSyxDQUFDSyxXQUFXLENBQUMzQixTQUFTLENBQUMwQixHQUFHLENBQUNMLElBQUksQ0FBQztZQUN6QztVQUNKO1FBQ0o7TUFDSixDQUFDLENBQUM7SUFDTjtJQUNBYixNQUFNLEdBQUc1QixRQUFRLENBQUNVLGdCQUFnQixDQUFDa0IsTUFBTSxDQUFDO0lBQzFDQyxPQUFPLEdBQUc3QixRQUFRLENBQUNhLGFBQWEsQ0FBQ2dCLE9BQU8sQ0FBQztJQUN6Q0MsUUFBUSxHQUFHOUIsUUFBUSxDQUFDYSxhQUFhLENBQUNpQixRQUFRLENBQUM7SUFDM0NDLFdBQVcsR0FBRy9CLFFBQVEsQ0FBQ1UsZ0JBQWdCLENBQUNxQixXQUFXLENBQUM7SUFDcEQsSUFBSWlCLFlBQVksR0FBRyxFQUFFO0lBQ3JCcEIsTUFBTSxDQUFDYixPQUFPLENBQUMsVUFBQTJCLEtBQUssRUFBSTtNQUNwQk0sWUFBWSxnQ0FBT0EsWUFBWSxzQkFBS04sS0FBSyxDQUFDaEMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsRUFBQztJQUNqRixDQUFDLENBQUM7SUFDRmtCLE1BQU0sQ0FBQ0ksT0FBTyxDQUFDLENBQUNaLFNBQVMsQ0FBQzBCLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDeEMsSUFBR1gsU0FBUyxFQUFDO01BQ1RJLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUVYLE1BQU0sQ0FBQztJQUN6RDtJQUNBLFNBQVNxQixrQkFBa0IsQ0FBQ2hCLElBQUksRUFBRWlCLEtBQUssRUFBRTtNQUNyQyxJQUFHN0MsSUFBSSxLQUFLLENBQUMsRUFBQztRQUNWNkMsS0FBSyxJQUFJLENBQUM7TUFDZDtNQUNBQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsS0FBSyxDQUFDO01BQ2xCRixZQUFZLENBQUNqQyxPQUFPLENBQUMsVUFBQXNDLEtBQUssRUFBSTtRQUMxQkEsS0FBSyxDQUFDakMsU0FBUyxDQUFDTCxPQUFPLENBQUMsVUFBQXVDLFNBQVMsRUFBSTtVQUNqQyxJQUFJQSxTQUFTLENBQUNDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzNDRixLQUFLLENBQUNqQyxTQUFTLENBQUNNLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztVQUMvQztVQUNBLElBQUk0QixTQUFTLENBQUNDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvQkYsS0FBSyxDQUFDakMsU0FBUyxDQUFDTSxNQUFNLENBQUM0QixTQUFTLENBQUM7VUFDckM7UUFDSixDQUFDLENBQUM7UUFDRixJQUFJRCxLQUFLLENBQUMvQixhQUFhLENBQUNBLGFBQWEsQ0FBQ0YsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLGFBQWEsRUFBRTtVQUNsRWlDLEtBQUssQ0FBQ2pDLFNBQVMsQ0FBQzBCLEdBQUcsZ0JBQVNJLEtBQUssRUFBRztVQUNwQ0csS0FBSyxDQUFDOUIsS0FBSyxDQUFDaUMsVUFBVSxHQUFHdkIsSUFBSTtRQUNqQyxDQUFDLE1BQ0k7VUFDRG9CLEtBQUssQ0FBQ2pDLFNBQVMsQ0FBQzBCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QztNQUNKLENBQUMsQ0FBQztJQUNOO0lBRUEsU0FBU1csVUFBVSxDQUFDN0IsTUFBTSxFQUFFOEIsU0FBUyxFQUFFO01BQ25DLElBQUlBLFNBQVMsS0FBSyxNQUFNLEVBQUU7UUFDdEIsRUFBRTFCLE9BQU87UUFDVCxJQUFJQSxPQUFPLEdBQUcsQ0FBQyxFQUFFQSxPQUFPLEdBQUdKLE1BQU0sQ0FBQ2lCLE1BQU0sR0FBRyxDQUFDO01BQ2hELENBQUMsTUFBTSxJQUFJYSxTQUFTLEtBQUssT0FBTyxFQUFFO1FBQzlCLEVBQUUxQixPQUFPO1FBQ1QsSUFBSUEsT0FBTyxHQUFHSixNQUFNLENBQUNpQixNQUFNLEdBQUcsQ0FBQyxFQUFFYixPQUFPLEdBQUcsQ0FBQztNQUNoRDtNQUVBSixNQUFNLENBQUNiLE9BQU8sQ0FBQyxVQUFDMkIsS0FBSyxFQUFFQyxDQUFDLEVBQUs7UUFDekJELEtBQUssQ0FBQ3RCLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFNBQVMsRUFBRXNCLENBQUMsS0FBS1gsT0FBTyxDQUFDO1FBQ2hEVSxLQUFLLENBQUN0QixTQUFTLENBQUNNLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDcEMsQ0FBQyxDQUFDO01BRUZpQyxjQUFjLENBQUM1QixXQUFXLEVBQUVDLE9BQU8sQ0FBQztJQUN4QztJQUVBLFNBQVMyQixjQUFjLENBQUNDLEtBQUssRUFBRTVCLE9BQU8sRUFBRTtNQUNwQzRCLEtBQUssQ0FBQzdDLE9BQU8sQ0FBQyxVQUFDOEMsSUFBSSxFQUFFQyxTQUFTLEVBQUs7UUFDL0JELElBQUksQ0FBQ3pDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFVBQVUsRUFBRVcsT0FBTyxLQUFLOEIsU0FBUyxDQUFDO01BQzVELENBQUMsQ0FBQztJQUNOO0lBRUEsU0FBU0MsV0FBVyxDQUFDTCxTQUFTLEVBQUU7TUFDNUI5QixNQUFNLENBQUNJLE9BQU8sQ0FBQyxDQUFDWixTQUFTLENBQUMwQixHQUFHLENBQUMsUUFBUSxDQUFDO01BQ3ZDUCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFWCxNQUFNLENBQUM7TUFDNUNFLFFBQVEsQ0FBQ1AsS0FBSyxDQUFDQyxhQUFhLEdBQUcsTUFBTTtNQUNyQ0ssT0FBTyxDQUFDTixLQUFLLENBQUNDLGFBQWEsR0FBRyxNQUFNO01BQ3BDLElBQU13QyxjQUFjLEdBQUdOLFNBQVMsS0FBSyxNQUFNLEdBQUkxQixPQUFPLEtBQUssQ0FBQyxHQUFHSixNQUFNLENBQUNpQixNQUFNLEdBQUdiLE9BQU8sR0FBS0EsT0FBTyxLQUFLSixNQUFNLENBQUNpQixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBR2IsT0FBTyxHQUFHLENBQUU7TUFDM0ksSUFBRzNCLElBQUksS0FBSyxDQUFDLEVBQUM7UUFDVjRDLGtCQUFrQixpQkFBU2hCLElBQUksU0FBRytCLGNBQWMsR0FBRyxDQUFDLGNBQUk5QixHQUFHLGdDQUE0QjhCLGNBQWMsQ0FBQztNQUMxRyxDQUFDLE1BQUk7UUFDRGYsa0JBQWtCLGlCQUFTaEIsSUFBSSxTQUFHK0IsY0FBYyxjQUFJOUIsR0FBRyxnQ0FBNEI4QixjQUFjLENBQUM7TUFDdEc7TUFDQXZDLFVBQVUsQ0FBQyxZQUFNO1FBQ2J1QixZQUFZLENBQUNqQyxPQUFPLENBQUMsVUFBQXNDLEtBQUssRUFBSTtVQUMxQkEsS0FBSyxDQUFDakMsU0FBUyxDQUFDTCxPQUFPLENBQUMsVUFBQXVDLFNBQVMsRUFBSTtZQUNqQyxJQUFJQSxTQUFTLENBQUNDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJRCxTQUFTLENBQUNDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtjQUM1RUYsS0FBSyxDQUFDakMsU0FBUyxDQUFDTSxNQUFNLENBQUM0QixTQUFTLENBQUM7WUFDckM7VUFDSixDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7UUFDRkcsVUFBVSxDQUFDN0IsTUFBTSxFQUFFOEIsU0FBUyxDQUFDO1FBQzdCNUIsUUFBUSxDQUFDUCxLQUFLLENBQUNDLGFBQWEsR0FBRyxTQUFTO1FBQ3hDSyxPQUFPLENBQUNOLEtBQUssQ0FBQ0MsYUFBYSxHQUFHLFNBQVM7UUFFdkMsSUFBR1csU0FBUyxFQUFDO1VBQ1RQLE1BQU0sQ0FBQ2IsT0FBTyxDQUFDLFVBQUEyQixLQUFLLEVBQUc7WUFDbkJBLEtBQUssQ0FBQ3RCLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUNyQ2dCLEtBQUssQ0FBQ3RCLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNwQ2dCLEtBQUssQ0FBQ3RCLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUNwQyxDQUFDLENBQUM7VUFDRmEsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRVgsTUFBTSxDQUFDO1FBQ3pEO01BQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNaO0lBRUFDLE9BQU8sQ0FBQzVCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtNQUFBLE9BQU04RCxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQUEsRUFBQztJQUM1RGpDLFFBQVEsQ0FBQzdCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtNQUFBLE9BQU04RCxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQUEsRUFBQztJQUU5RGhDLFdBQVcsQ0FBQ2hCLE9BQU8sQ0FBQyxVQUFDOEMsSUFBSSxFQUFFbEIsQ0FBQyxFQUFLO01BQzdCa0IsSUFBSSxDQUFDNUQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNnRSxDQUFDLEVBQUs7UUFDbEMsSUFBR0EsQ0FBQyxDQUFDQyxNQUFNLENBQUM5QyxTQUFTLENBQUMrQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDNUMxQyxVQUFVLENBQUMsWUFBTTtVQUNiTSxXQUFXLENBQUNoQixPQUFPLENBQUMsVUFBQUMsSUFBSTtZQUFBLE9BQUlBLElBQUksQ0FBQ0ksU0FBUyxDQUFDTSxNQUFNLENBQUMsVUFBVSxDQUFDO1VBQUEsRUFBQztRQUNsRSxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBRVJFLE1BQU0sQ0FBQ0ksT0FBTyxDQUFDLENBQUNaLFNBQVMsQ0FBQzBCLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDdkNkLE9BQU8sR0FBR1csQ0FBQztRQUNYLElBQUd0QyxJQUFJLEtBQUssQ0FBQyxFQUFDO1VBQ1Y0QyxrQkFBa0IsaUJBQVNoQixJQUFJLFNBQUdELE9BQU8sR0FBRyxDQUFDLGNBQUlFLEdBQUcsZ0NBQTRCRixPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hHLENBQUMsTUFDRztVQUNBaUIsa0JBQWtCLGlCQUFTaEIsSUFBSSxTQUFHRCxPQUFPLEdBQUcsQ0FBQyxjQUFJRSxHQUFHLGdDQUE0QkYsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUVoRztRQUVBUCxVQUFVLENBQUMsWUFBTTtVQUNia0MsY0FBYyxDQUFDNUIsV0FBVyxFQUFFQyxPQUFPLENBQUM7VUFDcENKLE1BQU0sQ0FBQ2IsT0FBTyxDQUFDLFVBQUMyQixLQUFLLEVBQUVRLEtBQUssRUFBSztZQUM3QlIsS0FBSyxDQUFDdEIsU0FBUyxDQUFDQyxNQUFNLENBQUMsU0FBUyxFQUFFNkIsS0FBSyxLQUFLbEIsT0FBTyxDQUFDO1lBQ3BEVSxLQUFLLENBQUN0QixTQUFTLENBQUNNLE1BQU0sQ0FBQyxRQUFRLENBQUM7VUFDcEMsQ0FBQyxDQUFDO1VBQ0ZJLFFBQVEsQ0FBQ1AsS0FBSyxDQUFDQyxhQUFhLEdBQUcsU0FBUztVQUN4Q0ssT0FBTyxDQUFDTixLQUFLLENBQUNDLGFBQWEsR0FBRyxTQUFTO1FBRTNDLENBQUMsRUFBRSxJQUFJLENBQUM7TUFDWixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7SUFDRm1DLGNBQWMsQ0FBQzVCLFdBQVcsRUFBRUMsT0FBTyxDQUFDO0VBQ3hDO0VBQ0EsU0FBU29DLFNBQVMsQ0FBQ0MsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBQztJQUM3Q0YsTUFBTSxHQUFHckUsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQzJELE1BQU0sQ0FBQztJQUMxQ0MsU0FBUyxHQUFHdEUsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQzRELFNBQVMsQ0FBQztJQUNoREMsU0FBUyxHQUFHdkUsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQzZELFNBQVMsQ0FBQztJQUVoREQsU0FBUyxDQUFDdkQsT0FBTyxDQUFDLFVBQUF5RCxHQUFHLEVBQUc7TUFDbkJBLEdBQUcsQ0FBQ3ZFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDZ0UsQ0FBQyxFQUFJO1FBQ25DSSxNQUFNLENBQUN0RCxPQUFPLENBQUUsVUFBQUcsS0FBSyxFQUFJO1VBQ3JCQSxLQUFLLENBQUNFLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUNoQyxJQUFHdUMsQ0FBQyxDQUFDQyxNQUFNLENBQUM1QyxhQUFhLEtBQUtKLEtBQUssQ0FBQ0ksYUFBYSxFQUFDO1lBQzlDSixLQUFLLENBQUNFLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUNwQztRQUNKLENBQUMsQ0FBRTtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztJQUNIa0QsU0FBUyxDQUFDeEQsT0FBTyxDQUFDLFVBQUF5RCxHQUFHLEVBQUc7TUFDbkJBLEdBQUcsQ0FBQ3ZFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDZ0UsQ0FBQyxFQUFJO1FBQ2hDSSxNQUFNLENBQUN0RCxPQUFPLENBQUUsVUFBQUcsS0FBSyxFQUFJO1VBQ3JCQSxLQUFLLENBQUNFLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxDQUFDLENBQUU7TUFDUCxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTjtFQUNHLElBQU1FLE1BQU0sR0FBRzVCLFFBQVEsQ0FBQ1UsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO0VBQ2xELElBQU1xQixXQUFXLEdBQUcvQixRQUFRLENBQUNVLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO0VBQ3BFLElBQUdMLElBQUksS0FBSyxDQUFDLEVBQUM7SUFDVnVCLE1BQU0sQ0FBQ2IsT0FBTyxDQUFDLFVBQUMyQixLQUFLLEVBQUVDLENBQUMsRUFBSTtNQUV4QixJQUFHQSxDQUFDLElBQUksQ0FBQyxJQUFJRCxLQUFLLENBQUN0QixTQUFTLENBQUMrQyxRQUFRLGdCQUFTeEIsQ0FBQyxFQUFHLEVBQUM7UUFDL0NELEtBQUssQ0FBQ2hCLE1BQU0sRUFBRTtNQUNsQjtJQUNKLENBQUMsQ0FBQztJQUNGSyxXQUFXLENBQUNoQixPQUFPLENBQUMsVUFBQzhDLElBQUksRUFBRWxCLENBQUMsRUFBSTtNQUM1QixJQUFHQSxDQUFDLElBQUksQ0FBQyxJQUFJa0IsSUFBSSxDQUFDekMsU0FBUyxDQUFDK0MsUUFBUSxnQkFBU3hCLENBQUMsRUFBRyxFQUFDO1FBQzlDa0IsSUFBSSxDQUFDbkMsTUFBTSxFQUFFO01BQ2pCO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFDQSxJQUFHckIsSUFBSSxLQUFLLENBQUMsRUFBQztJQUNWLEtBQUssSUFBSXNDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUVBLENBQUMsRUFBRSxFQUFDO01BQ3hCLElBQUk4QixLQUFLLEdBQUd6RSxRQUFRLENBQUNVLGdCQUFnQixpQkFBVWlDLENBQUMsRUFBRztNQUNuRDhCLEtBQUssQ0FBQzFELE9BQU8sQ0FBQyxVQUFBQyxJQUFJLEVBQUk7UUFDbEJBLElBQUksQ0FBQ1UsTUFBTSxFQUFFO01BQ2pCLENBQUMsQ0FBQztJQUVOO0VBQ0o7RUFDQSxJQUFJZ0QsVUFBVSxHQUFHLG9CQUFvQjtFQUNyQyxTQUFTQyxpQkFBaUIsQ0FBQ0MsT0FBTyxFQUFFQyxPQUFPLEVBQUU7SUFDekMsSUFBTUMsYUFBYSxHQUFHNUUsTUFBTSxDQUFDNkUsVUFBVSxDQUFDLG9CQUFvQixDQUFDO0lBQzdELElBQU1DLHNCQUFzQixHQUFHOUUsTUFBTSxDQUFDNkUsVUFBVSxDQUFDLHlFQUF5RSxDQUFDO0lBQzNILElBQUlELGFBQWEsQ0FBQ0csT0FBTyxFQUFFO01BQ3ZCTCxPQUFPLEdBQUdDLE9BQU87SUFDckIsQ0FBQyxNQUNJLElBQUlHLHNCQUFzQixDQUFDQyxPQUFPLEVBQUU7TUFDckNMLE9BQU8sR0FBR0MsT0FBTztJQUNyQixDQUFDLE1BQ0k7TUFDRkQsT0FBTyxHQUFHQyxPQUFPO0lBQ3BCO0lBQ0EsT0FBT0QsT0FBTztFQUNsQjtFQUNBRixVQUFVLEdBQUdDLGlCQUFpQixDQUFDRCxVQUFVLEVBQUUsd0JBQXdCLENBQUM7RUFFcEUvQyxZQUFZLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBQytDLFVBQVUsRUFBRSxVQUFVLEVBQUVyRSxJQUFJLENBQUU7RUFDekhzQixZQUFZLENBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRyxJQUFJLENBQUM7RUFDckp5QyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDO0VBQ25FQSxTQUFTLENBQUMscUJBQXFCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLENBQUM7RUFDakZBLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUM7RUFFckUsSUFBTWMsU0FBUyxHQUFHbEYsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztFQUNoRSxJQUFNeUUsTUFBTSxHQUFHbkYsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFFeER3RSxTQUFTLENBQUNuRSxPQUFPLENBQUMsVUFBQ3FFLEdBQUcsRUFBRUMsUUFBUSxFQUFJO0lBQ2hDRCxHQUFHLENBQUNuRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ2dFLENBQUMsRUFBSTtNQUNoQ2lCLFNBQVMsQ0FBQ25FLE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUk7UUFDdkJBLElBQUksQ0FBQ0ksU0FBUyxDQUFDTSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CMEQsR0FBRyxDQUFDaEUsU0FBUyxDQUFDMEIsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUMvQixDQUFDLENBQUM7TUFDRnFDLE1BQU0sQ0FBQ3BFLE9BQU8sQ0FBQyxVQUFDdUUsS0FBSyxFQUFFQyxVQUFVLEVBQUk7UUFDakNELEtBQUssQ0FBQ2xFLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFHNkQsVUFBVSxLQUFNRixRQUFRLEVBQUM7VUFDeEJDLEtBQUssQ0FBQ2xFLFNBQVMsQ0FBQzBCLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDakM7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRixJQUFNMEMsYUFBYSxHQUFHeEYsUUFBUSxDQUFDYSxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFDbEUsSUFBTTRFLFlBQVksR0FBR3pGLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQ2hFLElBQU02RSxXQUFXLEdBQUcxRixRQUFRLENBQUNVLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO0VBRXBFLFNBQVNpRixTQUFTLENBQUNDLEtBQUssRUFBQztJQUNyQkEsS0FBSyxDQUFDN0UsT0FBTyxDQUFDLFVBQUE4RSxJQUFJLEVBQUc7TUFDakJBLElBQUksQ0FBQ3pFLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDLENBQUM7RUFDTjtFQUNBOEQsYUFBYSxDQUFDdkYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7SUFDekMwRixTQUFTLENBQUNELFdBQVcsQ0FBQztFQUMxQixDQUFDLENBQUM7RUFDRkQsWUFBWSxDQUFDeEYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7SUFDeEMwRixTQUFTLENBQUNELFdBQVcsQ0FBQztFQUMxQixDQUFDLENBQUM7O0VBRU47RUFDSSxTQUFTSSxpQkFBaUIsQ0FBQ0MsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRTtJQUNqRCxJQUFNQyxTQUFTLEdBQUdILE9BQU8sQ0FBQ0ksV0FBVyxDQUFDQyxJQUFJLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN2RCxJQUFNQyxNQUFNLEdBQUdKLFNBQVMsQ0FBQ0ssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUNHLE1BQU0sQ0FBQyxVQUFVQyxLQUFLLEVBQUU7TUFDdEUsT0FBT0EsS0FBSyxDQUFDTCxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUlLLEtBQUssS0FBSyxHQUFHO0lBQy9DLENBQUMsQ0FBQztJQUNGLElBQUlDLFNBQVMsR0FBRyxDQUFDO0lBQ2pCLElBQUlDLFNBQVMsR0FBRyxDQUFDO0lBQ2pCLElBQUlDLFdBQVcsR0FBRyxFQUFFO0lBRXBCYixPQUFPLENBQUMzRSxTQUFTLENBQUMwQixHQUFHLENBQUMsVUFBVSxDQUFDO0lBRWpDLFNBQVMrRCxRQUFRLEdBQUc7TUFDaEIsSUFBSUgsU0FBUyxLQUFLSixNQUFNLENBQUN6RCxNQUFNLEVBQUU7UUFDN0JrRCxPQUFPLENBQUMzRSxTQUFTLENBQUNNLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztRQUM3QztNQUNKO01BQ0EsSUFBTW9GLFdBQVcsR0FBR1osU0FBUyxDQUFDUSxTQUFTLENBQUM7TUFFeEMsSUFBR0ksV0FBVyxLQUFLQyxTQUFTLEVBQUU7TUFFOUIsSUFBSUosU0FBUyxHQUFHRyxXQUFXLENBQUNqRSxNQUFNLEVBQUU7UUFDaEMrRCxXQUFXLElBQUlFLFdBQVcsQ0FBQ0UsTUFBTSxDQUFDTCxTQUFTLENBQUM7UUFDNUNaLE9BQU8sQ0FBQ2tCLFNBQVMsR0FBR0wsV0FBVztRQUMvQkQsU0FBUyxFQUFFO1FBQ1hsRixVQUFVLENBQUNvRixRQUFRLEVBQUViLEtBQUssQ0FBQztNQUMvQixDQUFDLE1BQU07UUFDSFksV0FBVyxJQUFJLEdBQUc7UUFDbEJiLE9BQU8sQ0FBQ2tCLFNBQVMsR0FBR0wsV0FBVztRQUMvQkQsU0FBUyxHQUFHLENBQUM7UUFDYkQsU0FBUyxFQUFFO1FBQ1hqRixVQUFVLENBQUNvRixRQUFRLEVBQUViLEtBQUssQ0FBQztNQUMvQjtJQUNKO0lBQ0FELE9BQU8sQ0FBQzNFLFNBQVMsQ0FBQzBCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztJQUMxQytELFFBQVEsRUFBRTtFQUNkO0VBQ0EsU0FBU0ssZUFBZSxDQUFDQyxTQUFTLEVBQUU7SUFDaEMsSUFBTUMsT0FBTyxHQUFHO01BQ1pDLElBQUksRUFBRSxJQUFJO01BQ1ZDLFNBQVMsRUFBRTtJQUNmLENBQUM7SUFDRCxJQUFNQyxRQUFRLEdBQUcsSUFBSUMsb0JBQW9CLENBQUMsVUFBQ0MsT0FBTyxFQUFFRixRQUFRLEVBQUs7TUFDN0RFLE9BQU8sQ0FBQzFHLE9BQU8sQ0FBQyxVQUFDMkcsS0FBSyxFQUFFL0UsQ0FBQyxFQUFLO1FBQzFCLElBQUkrRSxLQUFLLENBQUNDLGNBQWMsRUFBRTtVQUN0QjdCLGlCQUFpQixDQUFDNEIsS0FBSyxDQUFDeEQsTUFBTSxFQUFFLEVBQUUsRUFBRSxZQUFNLENBRTFDLENBQUMsQ0FBQztVQUNGcUQsUUFBUSxDQUFDSyxTQUFTLENBQUNGLEtBQUssQ0FBQ3hELE1BQU0sQ0FBQztRQUNwQztNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsRUFBRWtELE9BQU8sQ0FBQztJQUNYRCxTQUFTLENBQUNwRyxPQUFPLENBQUMsVUFBQUMsSUFBSSxFQUFJO01BQ3RCdUcsUUFBUSxDQUFDTSxPQUFPLENBQUM3RyxJQUFJLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0VBQ047RUFDQSxJQUFNOEcsUUFBUSxHQUFHOUgsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7RUFDeER3RyxlQUFlLENBQUNZLFFBQVEsQ0FBQzs7RUFFN0I7RUFDSSxTQUFTQyxZQUFZLENBQUNDLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxRQUFRLEVBQUVDLGVBQWUsRUFBQztJQUN6RCxJQUFHQSxlQUFlLElBQUksR0FBRyxFQUFDO01BQ3RCRixJQUFJLENBQUMxRyxLQUFLLENBQUM2RyxLQUFLLGFBQU1ELGVBQWUsTUFBRztNQUN4Q0QsUUFBUSxDQUFDakIsU0FBUyxhQUFNa0IsZUFBZSxNQUFHO01BQzFDLEVBQUVBLGVBQWU7TUFDakIxRyxVQUFVLENBQUU7UUFBQSxPQUFNc0csWUFBWSxDQUFDQyxLQUFLLEVBQUVDLElBQUksRUFBRUMsUUFBUSxFQUFFQyxlQUFlLENBQUM7TUFBQSxHQUFFLEVBQUUsQ0FBQztJQUMvRSxDQUFDLE1BQUssSUFBR0EsZUFBZSxJQUFJLEdBQUcsRUFBQztNQUM1QkEsZUFBZSxHQUFHSCxLQUFLO01BQ3ZCdkcsVUFBVSxDQUFFO1FBQUEsT0FBTXNHLFlBQVksQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLFFBQVEsRUFBRUMsZUFBZSxDQUFDO01BQUEsR0FBRSxFQUFFLENBQUM7SUFDL0U7RUFDSjtFQUNBLElBQU1FLFdBQVcsR0FBR3JJLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0VBQ2pFLElBQU15SCxZQUFZLEdBQUd0SSxRQUFRLENBQUNhLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztFQUVuRWtILFlBQVksQ0FBQyxFQUFFLEVBQUVNLFdBQVcsRUFBRUMsWUFBWSxFQUFFLEVBQUUsQ0FBQzs7RUFFbkQ7RUFDSSxJQUFNQyxhQUFhLEdBQUd2SSxRQUFRLENBQUNhLGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFDM0QsSUFBTTJILFdBQVcsR0FBR3hJLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQzVELElBQU00SCxVQUFVLEdBQUd6SSxRQUFRLENBQUNhLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFFcEQwSCxhQUFhLENBQUN0SSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztJQUN6Q3dJLFVBQVUsQ0FBQ3JILFNBQVMsQ0FBQzBCLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDbEM5QyxRQUFRLENBQUMwSSxJQUFJLENBQUN0SCxTQUFTLENBQUMwQixHQUFHLENBQUMsa0JBQWtCLENBQUM7RUFDbkQsQ0FBQyxDQUFDO0VBQ0YwRixXQUFXLENBQUN2SSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztJQUN2Q3dJLFVBQVUsQ0FBQ3JILFNBQVMsQ0FBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNyQytHLFVBQVUsQ0FBQ3JILFNBQVMsQ0FBQ00sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQzFCLFFBQVEsQ0FBQzBJLElBQUksQ0FBQ3RILFNBQVMsQ0FBQ00sTUFBTSxDQUFDLGtCQUFrQixDQUFDO0VBRXRELENBQUMsQ0FBQzs7RUFHTjs7RUFFSTFCLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDWixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztJQUMvREQsUUFBUSxDQUFDMEksSUFBSSxDQUFDdEgsU0FBUyxDQUFDQyxNQUFNLENBQUMsTUFBTSxDQUFDO0VBQzFDLENBQUMsQ0FBQztFQUNGckIsUUFBUSxDQUFDYSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUNaLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQzdERCxRQUFRLENBQUNhLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQ08sU0FBUyxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO0VBQzlELENBQUMsQ0FBQztFQUVGLElBQU1zSCxZQUFZLEdBQUczSSxRQUFRLENBQUNhLGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFFMUQ4SCxZQUFZLENBQUMxSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztJQUN4Q3dJLFVBQVUsQ0FBQ3JILFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQ3JCLFFBQVEsQ0FBQzBJLElBQUksQ0FBQ3RILFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0VBRXRELENBQUMsQ0FBQztFQUVGLElBQU1vRCxLQUFLLEdBQUd6RSxRQUFRLENBQUNhLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDOUMsSUFBTStILEtBQUssR0FBRzVJLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUU5QzRELEtBQUssQ0FBQ3hFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ2xDSyxZQUFZLENBQUN1SSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQjFJLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGd0ksS0FBSyxDQUFDM0ksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDbENLLFlBQVksQ0FBQ3VJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9CMUksUUFBUSxDQUFDQyxNQUFNLEVBQUU7RUFDckIsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PntcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsICgpID0+e1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pXG5cbiAgICBsZXQgd2VlayA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2Vla1wiKSA/IHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2Vla1wiKSkgOiAxO1xuXG4gICAgY29uc3QgaW5mb1NsaWRlc01vYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tbW9iXCIpXG4gICAgY29uc3QgaW5mb1NsaWRlc01vYlBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1ib3R0b21cIilcbiAgICBjb25zdCBzbGlkZUJ0bkxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBzbGlkZUJ0blJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1yaWdodFwiKVxuXG4gICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKChpdGVtLCBpbmRleEl0ZW0pID0+e1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKChwb3B1cCwgaW5kZXhQb3B1cCk9PntcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhJdGVtID09PSBpbmRleFBvcHVwKXtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHNsaWRlQnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgfSlcbiAgICBzbGlkZUJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuXG4vLy8g0LPQu9GW0Ycg0YHQu9Cw0LnQtNC10YBcbiBmdW5jdGlvbiBjcmVhdGVTbGlkZXIoc2xpZGVzLCBsZWZ0QnRuLCByaWdodEJ0biwgc2xpZGVzSWNvbnMsIGN1cnJlbnQsIHBhdGgsIGltZywgd2VlaywgY292ZXJmbG93LCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG4gICAgIGxldCBjb3ZlcmZsb3dUb2dnbGVyID0gdHJ1ZVxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKXtcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgICAgICAgICAgaWYoY292ZXJmbG93VG9nZ2xlcil7XG4gICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IGkpe1xuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLTFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5uZXh0U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgIH0pO1xuICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIGluZGV4ICs9IDZcbiAgICAgICAgIH1cbiAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxuICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIGlmIChsYXllci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzBdICE9PSBcInNsaWRlX19pbmZvXCIpIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChgcXVlc3Qke2luZGV4fWApO1xuICAgICAgICAgICAgICAgICBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gcGF0aDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIG1vdmVTbGlkZXIoc2xpZGVzLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgLS1jdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50IDwgMCkgY3VycmVudCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICsrY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHNsaWRlcy5sZW5ndGggLSAxKSBjdXJyZW50ID0gMDtcbiAgICAgICAgIH1cblxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaSA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBTbGlkZUljb25zSW5pdChpY29ucywgY3VycmVudCkge1xuICAgICAgICAgaWNvbnMuZm9yRWFjaCgoaWNvbiwgaWNvbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiX2N1cnJlbnRcIiwgY3VycmVudCA9PT0gaWNvbkluZGV4KTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZGlyZWN0aW9uKSB7XG4gICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJnbGl0Y2hcIiwgXCJnbGl0Y2hcIiwgc2xpZGVzKVxuICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBjb25zdCBuZXh0U2xpZGVJbmRleCA9IGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgPyAoY3VycmVudCA9PT0gMCA/IHNsaWRlcy5sZW5ndGggOiBjdXJyZW50KSA6IChjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSA/IDEgOiBjdXJyZW50ICsgMik7XG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4ICsgNn0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4KTtcbiAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXh9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSwgMTAwMCk7XG4gICAgIH1cblxuICAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcImxlZnRcIikpO1xuICAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xuICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfY3VycmVudFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgN30vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICB9KTtcbiAgICAgfSk7XG4gICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiB9XG4gZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBzKVxuICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgcG9wdXBCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwb3B1cC5wYXJlbnRFbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuIH1cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgaWYod2VlayA9PT0gMSl7XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG5cbiAgICAgICAgICAgIGlmKGkgPj0gNiB8fCBzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAgICAgICAgICAgICBzbGlkZS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PntcbiAgICAgICAgICAgIGlmKGkgPj0gNiB8fCBpY29uLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XG4gICAgICAgICAgICBsZXQgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucXVlc3Qke2l9YClcbiAgICAgICAgICAgIHdlZWsxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBxdWVzdHNQYXRoID0gXCIuL2ltZy9xdWVzdHMvc2xpZGVcIlxuICAgIGZ1bmN0aW9uIGNoZWNrTWVkaWFRdWVyaWVzKG9sZFBhdGgsIG5ld1BhdGgpIHtcbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5NTBweCkgYW5kIChtYXgtaGVpZ2h0OiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVwiKTtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnk2MDAubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWVkaWFRdWVyeTk1MExhbmRzY2FwZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9sZFBhdGhcbiAgICB9XG4gICAgcXVlc3RzUGF0aCA9IGNoZWNrTWVkaWFRdWVyaWVzKHF1ZXN0c1BhdGgsIFwiLi9pbWcvcXVlc3RzL21vYi9zbGlkZVwiKVxuXG4gICAgY3JlYXRlU2xpZGVyKFwiLnNsaWRlXCIsIFwiLnNsaWRlX19tb3ZlLWxlZnRcIiwgXCIuc2xpZGVfX21vdmUtcmlnaHRcIiwgXCIucXVlc3RzX19pY29ucy1pdGVtXCIsIDEscXVlc3RzUGF0aCwgXCJwZXJzLnBuZ1wiLCB3ZWVrIClcbiAgICBjcmVhdGVTbGlkZXIoXCIucHJpemVfX3NsaWRlXCIsIFwiLnByaXplX19tb3ZlLWxlZnRcIiwgXCIucHJpemVfX21vdmUtcmlnaHRcIiwgXCIucHJpemVfX2ljb25zLWl0ZW1cIiwgMSxcIi4vaW1nL3ByaXplL3NsaWRlXCIsIFwicHJpemUucG5nXCIsIG51bGwsIHRydWUgLCAxMTUwKVxuICAgIHNldFBvcHVwcyhcIi5ndWlkZV9faW5mb1wiLCBcIi5ndWlkZV9faW5mby1idG5cIiwgXCIuZ3VpZGVfX2luZm8tY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIsIFwiLnByaXplX19zbGlkZS1pbmZvLWJ0blwiLCBcIi5wcml6ZV9fc2xpZGUtY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIudGFibGVfX2luZm8tcG9wdXBcIiwgXCIudGFibGVfX2luZm9cIiwgXCIudGFibGVfX2luZm8tY2xvc2VcIilcblxuICAgIGNvbnN0IHRhYmxlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2xpc3QtaXRlbVwiKVxuICAgIGNvbnN0IHRhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2l0ZW1cIilcblxuICAgIHRhYmxlVGFicy5mb3JFYWNoKCh0YWIsIHRhYkluZGV4KSA9PntcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCgodGFibGUsIHRhYmxlSW5kZXgpID0+e1xuICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZih0YWJsZUluZGV4ID09PSAgdGFiSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgcHJpemVSaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtcmlnaHRcIilcbiAgICBjb25zdCBwcml6ZUxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBwcml6ZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIpXG5cbiAgICBmdW5jdGlvbiBjbG9zZURyb3AoZHJvcHMpe1xuICAgICAgICBkcm9wcy5mb3JFYWNoKGRyb3AgPT57XG4gICAgICAgICAgICBkcm9wLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpemVSaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuICAgIHByaXplTGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuXG4vLy8g0LDQvdGW0LzQsNGG0ZbRjyDQtNC40L3QsNC80ZbRh9C90L7Qs9C+INC90LDQsdC+0YDRgyDRgtC10LrRgdGCXG4gICAgZnVuY3Rpb24gZHluYW1pY1R5cGV3cml0ZXIoZWxlbWVudCwgc3BlZWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHRleHRBcnJheSA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyhcXHMrKS8pLmZpbHRlcihmdW5jdGlvbiAoX2NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfY2hhci50cmltKCkgIT09ICcnIHx8IF9jaGFyID09PSAnICc7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd29yZEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNoYXJJbmRleCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICcnO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9vcGFjaXR5XCIpXG5cbiAgICAgICAgZnVuY3Rpb24gdHlwZVdvcmQoKSB7XG4gICAgICAgICAgICBpZiAod29yZEluZGV4ID09PSBsaXRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdGV4dEFycmF5W3dvcmRJbmRleF07XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRXb3JkID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY2hhckluZGV4IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gY3VycmVudFdvcmQuY2hhckF0KGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9ICcgJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgd29yZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgdHlwZVdvcmQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb2JzZXJ2ZUVsZW1lbnRzKHR5cGVFbGVtcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vdDogbnVsbCxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwZXdyaXRlcihlbnRyeS50YXJnZXQsIDM1LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdHlwZUVsZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdHlwZUFuaW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwZS1hbmltJyk7XG4gICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTtcblxuLy8vIHByb2dyZXNzIGJhciDQsNC90ZbQvNCw0YbRltGPXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKXtcbiAgICAgICAgaWYoY3VycmVudFBvc2l0aW9uIDw9IDEwMCl7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICBlbGVtV3JhcC5pbm5lclRleHQgPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgICsrY3VycmVudFBvc2l0aW9uXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFBvc2l0aW9uID49IDEwMCl7XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBzdGFydFxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLWJhclwiKVxuICAgIGNvbnN0IHByb2dyZXNzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtdGV4dFwiKVxuXG4gICAgcHJvZ3Jlc3NBbmltKDQwLCBwcm9ncmVzc0JhciwgcHJvZ3Jlc3NXcmFwLCA0MClcblxuLy8gcG9wdXBzXG4gICAgY29uc3QgdGFibGVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX2J0blwiKVxuICAgIGNvbnN0IGNsb3NlUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2Nsb3NlXCIpXG4gICAgY29uc3QgcG9wdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzXCIpXG5cbiAgICB0YWJsZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QuYWRkKFwiX3RhYmxlXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9vdmVyZmxvdy1oaWRkZW5cIilcbiAgICB9KVxuICAgIGNsb3NlUG9wdXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX3RhYmxlXCIpXG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cblxuLy8gZm9yIHRlc3RcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuLWxuZ1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIikuY2xhc3NMaXN0LnRvZ2dsZShcImVuXCIpXG4gICAgfSlcblxuICAgIGNvbnN0IGRvbmVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9uZS1wb3B1cFwiKVxuXG4gICAgZG9uZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QudG9nZ2xlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuICAgIGNvbnN0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMVwiKTtcbiAgICBjb25zdCB3ZWVrMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazJcIik7XG5cbiAgICB3ZWVrMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMSk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgd2VlazIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbn0pXG5cbiJdfQ==
