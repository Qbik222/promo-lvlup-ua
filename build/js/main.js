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
  function createSlider(slides, leftBtn, rightBtn, slidesIcons, current, path, img, week, coverflow, coverflowOffWidth, subtitles) {
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
      console.log(slides);
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
    function updateGlitchLayers(path, index) {
      if (week === 2) {
        index += 6;
      }
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
  createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1, questsPath, "pers.png", null, false, null, ".quests__subtitle");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmZvU2xpZGVzTW9iUG9wdXAiLCJzbGlkZUJ0bkxlZnQiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVCdG5SaWdodCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJzdWJ0aXRsZXMiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsImkiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGVuZ3RoIiwiYWRkIiwibmV4dFNpYmxpbmciLCJnbGl0Y2hMYXllcnMiLCJzdWJ0aXRsZXNJbml0IiwiY29uc29sZSIsImxvZyIsInNsaWRlSW5kZXgiLCJjb250YWlucyIsInN1YnRpdGxlIiwic3VidGl0bGVJbmRleCIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwibmV4dFNsaWRlSW5kZXgiLCJlIiwidGFyZ2V0Iiwic2V0UG9wdXBzIiwicG9wdXBzIiwicG9wdXBCdG5zIiwiY2xvc2VCdG5zIiwiYnRuIiwicXVlc3RzUGF0aCIsImNoZWNrTWVkaWFRdWVyaWVzIiwib2xkUGF0aCIsIm5ld1BhdGgiLCJtZWRpYVF1ZXJ5NjAwIiwibWF0Y2hNZWRpYSIsIm1lZGlhUXVlcnk5NTBMYW5kc2NhcGUiLCJtYXRjaGVzIiwidGFibGVUYWJzIiwidGFibGVzIiwidGFiIiwidGFiSW5kZXgiLCJ0YWJsZSIsInRhYmxlSW5kZXgiLCJwcml6ZVJpZ2h0QnRuIiwicHJpemVMZWZ0QnRuIiwicHJpemVQb3B1cHMiLCJjbG9zZURyb3AiLCJkcm9wcyIsImRyb3AiLCJkeW5hbWljVHlwZXdyaXRlciIsImVsZW1lbnQiLCJzcGVlZCIsImNhbGxiYWNrIiwidGV4dEFycmF5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwic3BsaXQiLCJsaXRBcnIiLCJqb2luIiwiZmlsdGVyIiwiX2NoYXIiLCJ3b3JkSW5kZXgiLCJjaGFySW5kZXgiLCJjdXJyZW50VGV4dCIsInR5cGVXb3JkIiwiY3VycmVudFdvcmQiLCJ1bmRlZmluZWQiLCJjaGFyQXQiLCJpbm5lclRleHQiLCJvYnNlcnZlRWxlbWVudHMiLCJ0eXBlRWxlbXMiLCJvcHRpb25zIiwicm9vdCIsInRocmVzaG9sZCIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJ0eXBlQW5pbSIsInByb2dyZXNzQW5pbSIsInN0YXJ0IiwiZWxlbSIsImVsZW1XcmFwIiwiY3VycmVudFBvc2l0aW9uIiwid2lkdGgiLCJwcm9ncmVzc0JhciIsInByb2dyZXNzV3JhcCIsInRhYmxlUG9wdXBCdG4iLCJjbG9zZVBvcHVwcyIsInBvcHVwc1dyYXAiLCJib2R5IiwiZG9uZVBvcHVwQnRuIiwid2VlazEiLCJ3ZWVrMiIsInNldEl0ZW0iXSwibWFwcGlu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QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCAoKSA9PntcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9KVxuXG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLW1vYlwiKVxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2JQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tYm90dG9tXCIpXG4gICAgY29uc3Qgc2xpZGVCdG5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3Qgc2xpZGVCdG5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtcmlnaHRcIilcblxuICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaCgoaXRlbSwgaW5kZXhJdGVtKSA9PntcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaCgocG9wdXAsIGluZGV4UG9wdXApPT57XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SXRlbSA9PT0gaW5kZXhQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzbGlkZUJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG4gICAgc2xpZGVCdG5SaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgfSlcblxuLy8vINCz0LvRltGHINGB0LvQsNC50LTQtdGAXG4gZnVuY3Rpb24gY3JlYXRlU2xpZGVyKHNsaWRlcywgbGVmdEJ0biwgcmlnaHRCdG4sIHNsaWRlc0ljb25zLCBjdXJyZW50LCBwYXRoLCBpbWcsIHdlZWssIGNvdmVyZmxvdywgY292ZXJmbG93T2ZmV2lkdGgsIHN1YnRpdGxlcyl7XG4gICAgIGxldCBjb3ZlcmZsb3dUb2dnbGVyID0gdHJ1ZVxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKXtcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgICAgICAgICAgaWYoY292ZXJmbG93VG9nZ2xlcil7XG4gICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IGkpe1xuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLTFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5uZXh0U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIHN1YnRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc3VidGl0bGVzKTtcbiAgICAgbGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGVmdEJ0bik7XG4gICAgIHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyaWdodEJ0bik7XG4gICAgIHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXNJY29ucyk7XG4gICAgIGxldCBnbGl0Y2hMYXllcnMgPSBbXTtcbiAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzID0gWy4uLmdsaXRjaExheWVycywgLi4uc2xpZGUucXVlcnlTZWxlY3RvckFsbChcIi5nbGl0Y2hfX2xheWVyXCIpXTtcbiAgICAgfSk7XG4gICAgIGlmKHNsaWRlc1tjdXJyZW50XSlzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpe1xuICAgICAgICAgY29uc29sZS5sb2coc2xpZGVzKVxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PntcbiAgICAgICAgICAgICBpZihzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoXCJfYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgc3VidGl0bGVzLmZvckVhY2goKHN1YnRpdGxlLCBzdWJ0aXRsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZUluZGV4ID09PSBzdWJ0aXRsZUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIGluZGV4ICs9IDZcbiAgICAgICAgIH1cbiAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBpZiAobGF5ZXIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFswXSAhPT0gXCJzbGlkZV9faW5mb1wiKSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYHF1ZXN0JHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuYmFja2dyb3VuZCA9IHBhdGg7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICB9KTtcblxuICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgIGljb25zLmZvckVhY2goKGljb24sIGljb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZShcIl9jdXJyZW50XCIsIGN1cnJlbnQgPT09IGljb25JbmRleCk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGRpcmVjdGlvbikge1xuICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwiZ2xpdGNoXCIsIFwiZ2xpdGNoXCIsIHNsaWRlcylcbiAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgY29uc3QgbmV4dFNsaWRlSW5kZXggPSBkaXJlY3Rpb24gPT09IFwibGVmdFwiID8gKGN1cnJlbnQgPT09IDAgPyBzbGlkZXMubGVuZ3RoIDogY3VycmVudCkgOiAoY3VycmVudCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEgPyAxIDogY3VycmVudCArIDIpO1xuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleCArIDZ9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICAgfVxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikgfHwgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG4gICAgICAgICAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT57XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwicmlnaHQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSwgMTAwMCk7XG4gICAgIH1cblxuICAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcImxlZnRcIikpO1xuICAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xuICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfY3VycmVudFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgN30vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgfSk7XG4gICAgIH0pO1xuICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG5cbiB9XG4gZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBzKVxuICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgcG9wdXBCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwb3B1cC5wYXJlbnRFbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuIH1cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgLy8gaWYod2VlayA9PT0gMSl7XG4gICAgLy8gICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgLy9cbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAvLyAgICAgICAgICAgICBzbGlkZS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PntcbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBpY29uLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgIC8vICAgICAgICAgICAgIGljb24ucmVtb3ZlKClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG4gICAgLy8gaWYod2VlayA9PT0gMil7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XG4gICAgLy8gICAgICAgICBsZXQgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucXVlc3Qke2l9YClcbiAgICAvLyAgICAgICAgIHdlZWsxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvL1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIGxldCBxdWVzdHNQYXRoID0gXCIuL2ltZy9xdWVzdHMvc2xpZGVcIlxuICAgIGZ1bmN0aW9uIGNoZWNrTWVkaWFRdWVyaWVzKG9sZFBhdGgsIG5ld1BhdGgpIHtcbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5NTBweCkgYW5kIChtYXgtaGVpZ2h0OiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVwiKTtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnk2MDAubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWVkaWFRdWVyeTk1MExhbmRzY2FwZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9sZFBhdGhcbiAgICB9XG4gICAgcXVlc3RzUGF0aCA9IGNoZWNrTWVkaWFRdWVyaWVzKHF1ZXN0c1BhdGgsIFwiLi9pbWcvcXVlc3RzL21vYi9zbGlkZVwiKVxuXG4gICAgY3JlYXRlU2xpZGVyKFwiLnNsaWRlXCIsIFwiLnNsaWRlX19tb3ZlLWxlZnRcIiwgXCIuc2xpZGVfX21vdmUtcmlnaHRcIiwgXCIucXVlc3RzX19pY29ucy1pdGVtXCIsIDEscXVlc3RzUGF0aCwgXCJwZXJzLnBuZ1wiLCBudWxsLCBmYWxzZSwgbnVsbCwgXCIucXVlc3RzX19zdWJ0aXRsZVwiKVxuICAgIGNyZWF0ZVNsaWRlcihcIi5wcml6ZV9fc2xpZGVcIiwgXCIucHJpemVfX21vdmUtbGVmdFwiLCBcIi5wcml6ZV9fbW92ZS1yaWdodFwiLCBcIi5wcml6ZV9faWNvbnMtaXRlbVwiLCAxLFwiLi9pbWcvcHJpemUvc2xpZGVcIiwgXCJwcml6ZS5wbmdcIiwgbnVsbCwgdHJ1ZSAsIDExNTApXG4gICAgc2V0UG9wdXBzKFwiLmd1aWRlX19pbmZvXCIsIFwiLmd1aWRlX19pbmZvLWJ0blwiLCBcIi5ndWlkZV9faW5mby1jbG9zZVwiKVxuICAgIHNldFBvcHVwcyhcIi5wcml6ZV9fc2xpZGUtcG9wdXBcIiwgXCIucHJpemVfX3NsaWRlLWluZm8tYnRuXCIsIFwiLnByaXplX19zbGlkZS1jbG9zZVwiKVxuICAgIHNldFBvcHVwcyhcIi50YWJsZV9faW5mby1wb3B1cFwiLCBcIi50YWJsZV9faW5mb1wiLCBcIi50YWJsZV9faW5mby1jbG9zZVwiKVxuXG4gICAgY29uc3QgdGFibGVUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fbGlzdC1pdGVtXCIpXG4gICAgY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9faXRlbVwiKVxuXG4gICAgdGFibGVUYWJzLmZvckVhY2goKHRhYiwgdGFiSW5kZXgpID0+e1xuICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIHRhYmxlVGFicy5mb3JFYWNoKChpdGVtKSA9PntcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRhYmxlcy5mb3JFYWNoKCh0YWJsZSwgdGFibGVJbmRleCkgPT57XG4gICAgICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGlmKHRhYmxlSW5kZXggPT09ICB0YWJJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCBwcml6ZVJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcml6ZV9fbW92ZS1yaWdodFwiKVxuICAgIGNvbnN0IHByaXplTGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHByaXplUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcml6ZV9fc2xpZGUtcG9wdXBcIilcblxuICAgIGZ1bmN0aW9uIGNsb3NlRHJvcChkcm9wcyl7XG4gICAgICAgIGRyb3BzLmZvckVhY2goZHJvcCA9PntcbiAgICAgICAgICAgIGRyb3AuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBwcml6ZVJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgY2xvc2VEcm9wKHByaXplUG9wdXBzKVxuICAgIH0pXG4gICAgcHJpemVMZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgY2xvc2VEcm9wKHByaXplUG9wdXBzKVxuICAgIH0pXG5cbi8vLyDQsNC90ZbQvNCw0YbRltGPINC00LjQvdCw0LzRltGH0L3QvtCz0L4g0L3QsNCx0L7RgNGDINGC0LXQutGB0YJcbiAgICBmdW5jdGlvbiBkeW5hbWljVHlwZXdyaXRlcihlbGVtZW50LCBzcGVlZCwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgdGV4dEFycmF5ID0gZWxlbWVudC50ZXh0Q29udGVudC50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgY29uc3QgbGl0QXJyID0gdGV4dEFycmF5LmpvaW4oJyAnKS5zcGxpdCgvKFxccyspLykuZmlsdGVyKGZ1bmN0aW9uIChfY2hhcikge1xuICAgICAgICAgICAgcmV0dXJuIF9jaGFyLnRyaW0oKSAhPT0gJycgfHwgX2NoYXIgPT09ICcgJztcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB3b3JkSW5kZXggPSAwO1xuICAgICAgICBsZXQgY2hhckluZGV4ID0gMDtcbiAgICAgICAgbGV0IGN1cnJlbnRUZXh0ID0gJyc7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiX29wYWNpdHlcIilcblxuICAgICAgICBmdW5jdGlvbiB0eXBlV29yZCgpIHtcbiAgICAgICAgICAgIGlmICh3b3JkSW5kZXggPT09IGxpdEFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudFdvcmQgPSB0ZXh0QXJyYXlbd29yZEluZGV4XTtcblxuICAgICAgICAgICAgaWYoY3VycmVudFdvcmQgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG5cbiAgICAgICAgICAgIGlmIChjaGFySW5kZXggPCBjdXJyZW50V29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSBjdXJyZW50V29yZC5jaGFyQXQoY2hhckluZGV4KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gJyAnO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB3b3JkSW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICB0eXBlV29yZCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvYnNlcnZlRWxlbWVudHModHlwZUVsZW1zKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICByb290OiBudWxsLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNUeXBld3JpdGVyKGVudHJ5LnRhcmdldCwgMzUsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0eXBlRWxlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB0eXBlQW5pbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBlLWFuaW0nKTtcbiAgICBvYnNlcnZlRWxlbWVudHModHlwZUFuaW0pO1xuXG4vLy8gcHJvZ3Jlc3MgYmFyINCw0L3RltC80LDRhtGW0Y9cbiAgICBmdW5jdGlvbiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pe1xuICAgICAgICBpZihjdXJyZW50UG9zaXRpb24gPD0gMTAwKXtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgIGVsZW1XcmFwLmlubmVyVGV4dCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgKytjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9ZWxzZSBpZihjdXJyZW50UG9zaXRpb24gPj0gMTAwKXtcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHN0YXJ0XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtYmFyXCIpXG4gICAgY29uc3QgcHJvZ3Jlc3NXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy10ZXh0XCIpXG5cbiAgICBwcm9ncmVzc0FuaW0oNDAsIHByb2dyZXNzQmFyLCBwcm9ncmVzc1dyYXAsIDQwKVxuXG4vLyBwb3B1cHNcbiAgICBjb25zdCB0YWJsZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fYnRuXCIpXG4gICAgY29uc3QgY2xvc2VQb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19fY2xvc2VcIilcbiAgICBjb25zdCBwb3B1cHNXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNcIilcblxuICAgIHRhYmxlUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5hZGQoXCJfdGFibGVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiX292ZXJmbG93LWhpZGRlblwiKVxuICAgIH0pXG4gICAgY2xvc2VQb3B1cHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfdGFibGVcIilcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuXG4vLyBmb3IgdGVzdFxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmtcIilcbiAgICB9KVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW4tbG5nXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiZW5cIilcbiAgICB9KVxuXG4gICAgY29uc3QgZG9uZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb25lLXBvcHVwXCIpXG5cbiAgICBkb25lUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC50b2dnbGUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG4gICAgY29uc3Qgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsxXCIpO1xuICAgIGNvbnN0IHdlZWsyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMlwiKTtcblxuICAgIHdlZWsxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAxKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICB3ZWVrMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMik7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xufSlcblxuIl19
