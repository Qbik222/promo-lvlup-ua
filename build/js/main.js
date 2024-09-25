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
      // console.log(coverflowToggler)
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
            console.log(current, slides.length - 1);
          }
        }

        // if(i !== current + 1 && i !== slides.length && i !== 0){
        //     slide.classList.remove(right)
        //     slide.classList.remove(left)
        //     console.log(current, i)
        // }
        // if(current === 0){
        //     console.log(slide.nextSibling)
        //     slide.nextSibling.classList.add(right)
        // }
        //
        // // console.log(i, current)
        // if(i === current + 1){
        //     console.log(slide.nextSibling.classList)
        //     slide.classList.add(left)
        // }
        // if(current === slides.length - 1 && i === 0){
        //     console.log(slide.nextSibling.classList)
        //     slide.classList.add(left)
        // }
        // else{

        // }
        // slide.previousElementSibling.classList.add(right)
        // if(slide.nextSibling.classList[1] === "_active"){
        //     slide.classList.add(left)
        //
        // }
        // if(slide.previousElementSibling.classList[1] === "_active"){
        //     slide.classList.add(left)
        // }
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
  console.log(questsPath);
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
    // const litArr = textArray.join(' ').split(/(?<=\S)(?=\s)|(?=\S)/).filter(char => char !== '');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmZvU2xpZGVzTW9iUG9wdXAiLCJzbGlkZUJ0bkxlZnQiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVCdG5SaWdodCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsImkiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGVuZ3RoIiwiYWRkIiwibmV4dFNpYmxpbmciLCJjb25zb2xlIiwibG9nIiwiZ2xpdGNoTGF5ZXJzIiwidXBkYXRlR2xpdGNoTGF5ZXJzIiwiaW5kZXgiLCJsYXllciIsImNsYXNzTmFtZSIsInN0YXJ0c1dpdGgiLCJiYWNrZ3JvdW5kIiwibW92ZVNsaWRlciIsImRpcmVjdGlvbiIsIlNsaWRlSWNvbnNJbml0IiwiaWNvbnMiLCJpY29uIiwiaWNvbkluZGV4IiwiaGFuZGxlQ2xpY2siLCJuZXh0U2xpZGVJbmRleCIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNldFBvcHVwcyIsInBvcHVwcyIsInBvcHVwQnRucyIsImNsb3NlQnRucyIsImJ0biIsIndlZWsxIiwicXVlc3RzUGF0aCIsImNoZWNrTWVkaWFRdWVyaWVzIiwib2xkUGF0aCIsIm5ld1BhdGgiLCJtZWRpYVF1ZXJ5NjAwIiwibWF0Y2hNZWRpYSIsIm1lZGlhUXVlcnk5NTBMYW5kc2NhcGUiLCJtYXRjaGVzIiwidGFibGVUYWJzIiwidGFibGVzIiwidGFiIiwidGFiSW5kZXgiLCJ0YWJsZSIsInRhYmxlSW5kZXgiLCJwcml6ZVJpZ2h0QnRuIiwicHJpemVMZWZ0QnRuIiwicHJpemVQb3B1cHMiLCJjbG9zZURyb3AiLCJkcm9wcyIsImRyb3AiLCJkeW5hbWljVHlwZXdyaXRlciIsImVsZW1lbnQiLCJzcGVlZCIsImNhbGxiYWNrIiwidGV4dEFycmF5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwic3BsaXQiLCJsaXRBcnIiLCJqb2luIiwiZmlsdGVyIiwiX2NoYXIiLCJ3b3JkSW5kZXgiLCJjaGFySW5kZXgiLCJjdXJyZW50VGV4dCIsInR5cGVXb3JkIiwiY3VycmVudFdvcmQiLCJ1bmRlZmluZWQiLCJjaGFyQXQiLCJpbm5lclRleHQiLCJvYnNlcnZlRWxlbWVudHMiLCJ0eXBlRWxlbXMiLCJvcHRpb25zIiwicm9vdCIsInRocmVzaG9sZCIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJ0eXBlQW5pbSIsInByb2dyZXNzQW5pbSIsInN0YXJ0IiwiZWxlbSIsImVsZW1XcmFwIiwiY3VycmVudFBvc2l0aW9uIiwid2lkdGgiLCJwcm9ncmVzc0JhciIsInByb2dyZXNzV3JhcCIsInRhYmxlUG9wdXBCdG4iLCJjbG9zZVBvcHVwcyIsInBvcHVwc1dyYXAiLCJib2R5IiwiZG9uZVBvcHVwQnRuIiwid2VlazIiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFDL0NDLE1B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LGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ2xDSyxZQUFZLENBQUN1SSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQjFJLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUdOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCAoKSA9PntcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9KVxuXG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLW1vYlwiKVxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2JQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tYm90dG9tXCIpXG4gICAgY29uc3Qgc2xpZGVCdG5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3Qgc2xpZGVCdG5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtcmlnaHRcIilcblxuICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaCgoaXRlbSwgaW5kZXhJdGVtKSA9PntcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaCgocG9wdXAsIGluZGV4UG9wdXApPT57XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SXRlbSA9PT0gaW5kZXhQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzbGlkZUJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG4gICAgc2xpZGVCdG5SaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgfSlcblxuLy8vINCz0LvRltGHINGB0LvQsNC50LTQtdGAXG4gZnVuY3Rpb24gY3JlYXRlU2xpZGVyKHNsaWRlcywgbGVmdEJ0biwgcmlnaHRCdG4sIHNsaWRlc0ljb25zLCBjdXJyZW50LCBwYXRoLCBpbWcsIHdlZWssIGNvdmVyZmxvdywgY292ZXJmbG93T2ZmV2lkdGgpe1xuXG4gICAgIGxldCBjb3ZlcmZsb3dUb2dnbGVyID0gdHJ1ZVxuXG4gICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgY292ZXJmbG93T2ZmV2lkdGgpe1xuICAgICAgICAgY292ZXJmbG93VG9nZ2xlciA9IGZhbHNlXG4gICAgICAgICAvLyBjb25zb2xlLmxvZyhjb3ZlcmZsb3dUb2dnbGVyKVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKXtcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgICAgICAgICAgaWYoY292ZXJmbG93VG9nZ2xlcil7XG4gICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IGkpe1xuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLTFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5uZXh0U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudCwgc2xpZGVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgIC8vIGlmKGkgIT09IGN1cnJlbnQgKyAxICYmIGkgIT09IHNsaWRlcy5sZW5ndGggJiYgaSAhPT0gMCl7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUocmlnaHQpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUobGVmdClcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coY3VycmVudCwgaSlcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gaWYoY3VycmVudCA9PT0gMCl7XG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHNsaWRlLm5leHRTaWJsaW5nKVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKGksIGN1cnJlbnQpXG4gICAgICAgICAgICAgLy8gaWYoaSA9PT0gY3VycmVudCArIDEpe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gaWYoY3VycmVudCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEgJiYgaSA9PT0gMCl7XG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdClcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBlbHNle1xuXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAvLyBpZihzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3RbMV0gPT09IFwiX2FjdGl2ZVwiKXtcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0WzFdID09PSBcIl9hY3RpdmVcIil7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICB9KVxuICAgICB9XG4gICAgIHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzKTtcbiAgICAgbGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGVmdEJ0bik7XG4gICAgIHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyaWdodEJ0bik7XG4gICAgIHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXNJY29ucyk7XG4gICAgIGxldCBnbGl0Y2hMYXllcnMgPSBbXTtcbiAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzID0gWy4uLmdsaXRjaExheWVycywgLi4uc2xpZGUucXVlcnlTZWxlY3RvckFsbChcIi5nbGl0Y2hfX2xheWVyXCIpXTtcbiAgICAgfSk7XG4gICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcbiAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gdXBkYXRlR2xpdGNoTGF5ZXJzKHBhdGgsIGluZGV4KSB7XG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICBpbmRleCArPSA2XG4gICAgICAgICB9XG4gICAgICAgICBjb25zb2xlLmxvZyhpbmRleClcbiAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBpZiAobGF5ZXIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFswXSAhPT0gXCJzbGlkZV9faW5mb1wiKSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYHF1ZXN0JHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuYmFja2dyb3VuZCA9IHBhdGg7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICB9KTtcblxuICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgIGljb25zLmZvckVhY2goKGljb24sIGljb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZShcIl9jdXJyZW50XCIsIGN1cnJlbnQgPT09IGljb25JbmRleCk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGRpcmVjdGlvbikge1xuICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwiZ2xpdGNoXCIsIFwiZ2xpdGNoXCIsIHNsaWRlcylcbiAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgY29uc3QgbmV4dFNsaWRlSW5kZXggPSBkaXJlY3Rpb24gPT09IFwibGVmdFwiID8gKGN1cnJlbnQgPT09IDAgPyBzbGlkZXMubGVuZ3RoIDogY3VycmVudCkgOiAoY3VycmVudCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEgPyAxIDogY3VycmVudCArIDIpO1xuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleCArIDZ9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICAgfVxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikgfHwgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT57XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwicmlnaHQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0sIDEwMDApO1xuICAgICB9XG5cbiAgICAgbGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJsZWZ0XCIpKTtcbiAgICAgcmlnaHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwicmlnaHRcIikpO1xuXG4gICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+IHtcbiAgICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2N1cnJlbnRcIikpIHJldHVyblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2N1cnJlbnRcIikpO1xuICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgY3VycmVudCA9IGk7XG4gICAgICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDd9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDF9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG5cbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpbmRleCA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgfSk7XG4gICAgIH0pO1xuXG4gICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcblxuIH1cbiBmdW5jdGlvbiBzZXRQb3B1cHMocG9wdXBzLCBwb3B1cEJ0bnMsIGNsb3NlQnRucyl7XG4gICAgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cHMpXG4gICAgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cEJ0bnMpXG4gICAgY2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbG9zZUJ0bnMpXG5cbiAgICBwb3B1cEJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgIGlmKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgPT09IHBvcHVwLnBhcmVudEVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuICAgIGNsb3NlQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICB9KSlcbiAgICAgICAgIH0pXG4gICAgIH0pXG4gfVxuXG5cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuXG4gICAgY29uc3Qgc2xpZGVzSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiKTtcbiAgICBpZih3ZWVrID09PSAxKXtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcblxuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IHNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgaWNvbi5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKXtcbiAgICAgICAgICAgIGxldCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5xdWVzdCR7aX1gKVxuICAgICAgICAgICAgd2VlazEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlc3RzUGF0aCA9IFwiLi9pbWcvcXVlc3RzL3NsaWRlXCJcblxuICAgIGZ1bmN0aW9uIGNoZWNrTWVkaWFRdWVyaWVzKG9sZFBhdGgsIG5ld1BhdGgpIHtcblxuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5NjAwID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2MDBweClcIik7XG5cbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTk1MExhbmRzY2FwZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTUwcHgpIGFuZCAobWF4LWhlaWdodDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIik7XG5cbiAgICAgICAgaWYgKG1lZGlhUXVlcnk2MDAubWF0Y2hlcykge1xuXG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvbGRQYXRoXG4gICAgfVxuXG5cblxuXG4gICAgcXVlc3RzUGF0aCA9IGNoZWNrTWVkaWFRdWVyaWVzKHF1ZXN0c1BhdGgsIFwiLi9pbWcvcXVlc3RzL21vYi9zbGlkZVwiKVxuICAgIGNvbnNvbGUubG9nKHF1ZXN0c1BhdGgpXG5cblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAxLHF1ZXN0c1BhdGgsIFwicGVycy5wbmdcIiwgd2VlayApXG4gICAgY3JlYXRlU2xpZGVyKFwiLnByaXplX19zbGlkZVwiLCBcIi5wcml6ZV9fbW92ZS1sZWZ0XCIsIFwiLnByaXplX19tb3ZlLXJpZ2h0XCIsIFwiLnByaXplX19pY29ucy1pdGVtXCIsIDEsXCIuL2ltZy9wcml6ZS9zbGlkZVwiLCBcInByaXplLnBuZ1wiLCBudWxsLCB0cnVlICwgMTE1MClcblxuICAgIHNldFBvcHVwcyhcIi5ndWlkZV9faW5mb1wiLCBcIi5ndWlkZV9faW5mby1idG5cIiwgXCIuZ3VpZGVfX2luZm8tY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIsIFwiLnByaXplX19zbGlkZS1pbmZvLWJ0blwiLCBcIi5wcml6ZV9fc2xpZGUtY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIudGFibGVfX2luZm8tcG9wdXBcIiwgXCIudGFibGVfX2luZm9cIiwgXCIudGFibGVfX2luZm8tY2xvc2VcIilcblxuICAgIGNvbnN0IHRhYmxlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2xpc3QtaXRlbVwiKVxuICAgIGNvbnN0IHRhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2l0ZW1cIilcblxuICAgIHRhYmxlVGFicy5mb3JFYWNoKCh0YWIsIHRhYkluZGV4KSA9PntcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCgodGFibGUsIHRhYmxlSW5kZXgpID0+e1xuICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZih0YWJsZUluZGV4ID09PSAgdGFiSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgcHJpemVSaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtcmlnaHRcIilcbiAgICBjb25zdCBwcml6ZUxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBwcml6ZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIpXG5cbiAgICBmdW5jdGlvbiBjbG9zZURyb3AoZHJvcHMpe1xuICAgICAgICBkcm9wcy5mb3JFYWNoKGRyb3AgPT57XG4gICAgICAgICAgICBkcm9wLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml6ZVJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgY2xvc2VEcm9wKHByaXplUG9wdXBzKVxuICAgIH0pXG4gICAgcHJpemVMZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgY2xvc2VEcm9wKHByaXplUG9wdXBzKVxuICAgIH0pXG5cbi8vLyDQsNC90ZbQvNCw0YbRltGPINC00LjQvdCw0LzRltGH0L3QvtCz0L4g0L3QsNCx0L7RgNGDINGC0LXQutGB0YJcbiAgICBmdW5jdGlvbiBkeW5hbWljVHlwZXdyaXRlcihlbGVtZW50LCBzcGVlZCwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgdGV4dEFycmF5ID0gZWxlbWVudC50ZXh0Q29udGVudC50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgLy8gY29uc3QgbGl0QXJyID0gdGV4dEFycmF5LmpvaW4oJyAnKS5zcGxpdCgvKD88PVxcUykoPz1cXHMpfCg/PVxcUykvKS5maWx0ZXIoY2hhciA9PiBjaGFyICE9PSAnJyk7XG4gICAgICAgIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyhcXHMrKS8pLmZpbHRlcihmdW5jdGlvbiAoX2NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfY2hhci50cmltKCkgIT09ICcnIHx8IF9jaGFyID09PSAnICc7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd29yZEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNoYXJJbmRleCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICcnO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9vcGFjaXR5XCIpXG5cbiAgICAgICAgZnVuY3Rpb24gdHlwZVdvcmQoKSB7XG4gICAgICAgICAgICBpZiAod29yZEluZGV4ID09PSBsaXRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdGV4dEFycmF5W3dvcmRJbmRleF07XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRXb3JkID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY2hhckluZGV4IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gY3VycmVudFdvcmQuY2hhckF0KGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9ICcgJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgd29yZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuXG4gICAgICAgIHR5cGVXb3JkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb2JzZXJ2ZUVsZW1lbnRzKHR5cGVFbGVtcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vdDogbnVsbCxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNUeXBld3JpdGVyKGVudHJ5LnRhcmdldCwgMzUsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIHR5cGVFbGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZUFuaW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwZS1hbmltJyk7XG4gICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTtcblxuLy8vIHByb2dyZXNzIGJhciDQsNC90ZbQvNCw0YbRltGPXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKXtcbiAgICAgICAgaWYoY3VycmVudFBvc2l0aW9uIDw9IDEwMCl7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICBlbGVtV3JhcC5pbm5lclRleHQgPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgICsrY3VycmVudFBvc2l0aW9uXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFBvc2l0aW9uID49IDEwMCl7XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBzdGFydFxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLWJhclwiKVxuICAgIGNvbnN0IHByb2dyZXNzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtdGV4dFwiKVxuXG4gICAgcHJvZ3Jlc3NBbmltKDQwLCBwcm9ncmVzc0JhciwgcHJvZ3Jlc3NXcmFwLCA0MClcblxuLy8gcG9wdXBzXG4gICAgY29uc3QgdGFibGVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX2J0blwiKVxuICAgIGNvbnN0IGNsb3NlUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2Nsb3NlXCIpXG4gICAgY29uc3QgcG9wdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzXCIpXG5cbiAgICB0YWJsZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QuYWRkKFwiX3RhYmxlXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9vdmVyZmxvdy1oaWRkZW5cIilcbiAgICB9KVxuICAgIGNsb3NlUG9wdXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX3RhYmxlXCIpXG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cblxuLy8gZm9yIHRlc3RcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuLWxuZ1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIikuY2xhc3NMaXN0LnRvZ2dsZShcImVuXCIpXG4gICAgfSlcblxuICAgIGNvbnN0IGRvbmVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9uZS1wb3B1cFwiKVxuXG4gICAgZG9uZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QudG9nZ2xlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuICAgIGNvbnN0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMVwiKTtcbiAgICBjb25zdCB3ZWVrMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazJcIik7XG5cbiAgICB3ZWVrMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMSk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgd2VlazIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuXG59KVxuXG4iXX0=
