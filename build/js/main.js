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
    slides[current].classList.add("_active");
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
  createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1, questsPath, "pers.png", week, false, null, ".quests__subtitle");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmZvU2xpZGVzTW9iUG9wdXAiLCJzbGlkZUJ0bkxlZnQiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVCdG5SaWdodCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJzdWJ0aXRsZXMiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsImkiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGVuZ3RoIiwiYWRkIiwibmV4dFNpYmxpbmciLCJnbGl0Y2hMYXllcnMiLCJzdWJ0aXRsZXNJbml0IiwiY29uc29sZSIsImxvZyIsInNsaWRlSW5kZXgiLCJjb250YWlucyIsInN1YnRpdGxlIiwic3VidGl0bGVJbmRleCIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwibmV4dFNsaWRlSW5kZXgiLCJlIiwidGFyZ2V0Iiwic2V0UG9wdXBzIiwicG9wdXBzIiwicG9wdXBCdG5zIiwiY2xvc2VCdG5zIiwiYnRuIiwid2VlazEiLCJxdWVzdHNQYXRoIiwiY2hlY2tNZWRpYVF1ZXJpZXMiLCJvbGRQYXRoIiwibmV3UGF0aCIsIm1lZGlhUXVlcnk2MDAiLCJtYXRjaE1lZGlhIiwibWVkaWFRdWVyeTk1MExhbmRzY2FwZSIsIm1hdGNoZXMiLCJ0YWJsZVRhYnMiLCJ0YWJsZXMiLCJ0YWIiLCJ0YWJJbmRleCIsInRhYmxlIiwidGFibGVJbmRleCIsInByaXplUmlnaHRCdG4iLCJwcml6ZUxlZnRCdG4iLCJwcml6ZVBvcHVwcyIsImNsb3NlRHJvcCIsImRyb3BzIiwiZHJvcCIsImR5bmFtaWNUeXBld3JpdGVyIiwiZWxlbWVudCIsInNwZWVkIiwiY2FsbGJhY2siLCJ0ZXh0QXJyYXkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJzcGxpdCIsImxpdEFyciIsImpvaW4iLCJmaWx0ZXIiLCJfY2hhciIsIndvcmRJbmRleCIsImNoYXJJbmRleCIsImN1cnJlbnRUZXh0IiwidHlwZVdvcmQiLCJjdXJyZW50V29yZCIsInVuZGVmaW5lZCIsImNoYXJBdCIsImlubmVyVGV4dCIsIm9ic2VydmVFbGVtZW50cyIsInR5cGVFbGVtcyIsIm9wdGlvbnMiLCJyb290IiwidGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidW5vYnNlcnZlIiwib2JzZXJ2ZSIsInR5cGVBbmltIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtIiwiZWxlbVdyYXAiLCJjdXJyZW50UG9zaXRpb24iLCJ3aWR0aCIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NXcmFwIiwidGFibGVQb3B1cEJ0biIsImNsb3NlUG9wdXBzIiwicG9wdXBzV3JhcCIsImJvZHkiLCJkb25lUG9wdXBCdG4iLCJ3ZWVrMiIsInNldEl0ZW0iXSwibWFwcGlu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QztFQUUxRG1JLFlBQVksQ0FBQy9JLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQ3hDNkksVUFBVSxDQUFDMUgsU0FBUyxDQUFDQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3BDckIsUUFBUSxDQUFDK0ksSUFBSSxDQUFDM0gsU0FBUyxDQUFDQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7RUFFdEQsQ0FBQyxDQUFDO0VBRUYsSUFBTXlELEtBQUssR0FBRzlFLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUM5QyxJQUFNb0ksS0FBSyxHQUFHakosUUFBUSxDQUFDYSxhQUFhLENBQUMsUUFBUSxDQUFDO0VBRTlDaUUsS0FBSyxDQUFDN0UsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDbENLLFlBQVksQ0FBQzRJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9CL0ksUUFBUSxDQUFDQyxNQUFNLEVBQUU7RUFDckIsQ0FBQyxDQUFDO0VBRUY2SSxLQUFLLENBQUNoSixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0ssWUFBWSxDQUFDNEksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0IvSSxRQUFRLENBQUNDLE1BQU0sRUFBRTtFQUNyQixDQUFDLENBQUM7QUFDTixDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+e1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgKCkgPT57XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpID8gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpKSA6IDE7XG5cbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1tb2JcIilcbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLWJvdHRvbVwiKVxuICAgIGNvbnN0IHNsaWRlQnRuTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHNsaWRlQnRuUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIpXG5cbiAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goKGl0ZW0sIGluZGV4SXRlbSkgPT57XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goKHBvcHVwLCBpbmRleFBvcHVwKT0+e1xuICAgICAgICAgICAgICAgIGlmIChpbmRleEl0ZW0gPT09IGluZGV4UG9wdXApe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBwb3B1cC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgc2xpZGVCdG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuICAgIHNsaWRlQnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbi8vLyDQs9C70ZbRhyDRgdC70LDQudC00LXRgFxuIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcihzbGlkZXMsIGxlZnRCdG4sIHJpZ2h0QnRuLCBzbGlkZXNJY29ucywgY3VycmVudCwgcGF0aCwgaW1nLCB3ZWVrLCBjb3ZlcmZsb3csIGNvdmVyZmxvd09mZldpZHRoLCBzdWJ0aXRsZXMpe1xuICAgICBsZXQgY292ZXJmbG93VG9nZ2xlciA9IHRydWVcbiAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG4gICAgICAgICBjb3ZlcmZsb3dUb2dnbGVyID0gZmFsc2VcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgICAgICAgICAgIGlmKGNvdmVyZmxvd1RvZ2dsZXIpe1xuICAgICAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgICAgICAgICAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pXG4gICAgIH1cbiAgICAgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXMpO1xuICAgICBzdWJ0aXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN1YnRpdGxlcyk7XG4gICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgIH0pO1xuICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpe1xuICAgICAgICAgY29uc29sZS5sb2coc2xpZGVzKVxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PntcbiAgICAgICAgICAgICBpZihzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoXCJfYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgc3VidGl0bGVzLmZvckVhY2goKHN1YnRpdGxlLCBzdWJ0aXRsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZUluZGV4ID09PSBzdWJ0aXRsZUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIGluZGV4ICs9IDZcbiAgICAgICAgIH1cbiAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxuICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIGlmIChsYXllci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzBdICE9PSBcInNsaWRlX19pbmZvXCIpIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChgcXVlc3Qke2luZGV4fWApO1xuICAgICAgICAgICAgICAgICBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gcGF0aDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIG1vdmVTbGlkZXIoc2xpZGVzLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgLS1jdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50IDwgMCkgY3VycmVudCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICsrY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHNsaWRlcy5sZW5ndGggLSAxKSBjdXJyZW50ID0gMDtcbiAgICAgICAgIH1cblxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaSA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBTbGlkZUljb25zSW5pdChpY29ucywgY3VycmVudCkge1xuICAgICAgICAgaWNvbnMuZm9yRWFjaCgoaWNvbiwgaWNvbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiX2N1cnJlbnRcIiwgY3VycmVudCA9PT0gaWNvbkluZGV4KTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZGlyZWN0aW9uKSB7XG4gICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJnbGl0Y2hcIiwgXCJnbGl0Y2hcIiwgc2xpZGVzKVxuICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBjb25zdCBuZXh0U2xpZGVJbmRleCA9IGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgPyAoY3VycmVudCA9PT0gMCA/IHNsaWRlcy5sZW5ndGggOiBjdXJyZW50KSA6IChjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSA/IDEgOiBjdXJyZW50ICsgMik7XG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4ICsgNn0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4KTtcbiAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXh9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICB9LCAxMDAwKTtcbiAgICAgfVxuXG4gICAgIGxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwibGVmdFwiKSk7XG4gICAgIHJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcInJpZ2h0XCIpKTtcblxuICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9jdXJyZW50XCIpKSByZXR1cm5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9jdXJyZW50XCIpKTtcbiAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIGN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyA3fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyAxfS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEpO1xuXG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaW5kZXggPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICB9KTtcbiAgICAgfSk7XG4gICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcblxuIH1cbiBmdW5jdGlvbiBzZXRQb3B1cHMocG9wdXBzLCBwb3B1cEJ0bnMsIGNsb3NlQnRucyl7XG4gICAgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cHMpXG4gICAgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cEJ0bnMpXG4gICAgY2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbG9zZUJ0bnMpXG5cbiAgICBwb3B1cEJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgIGlmKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgPT09IHBvcHVwLnBhcmVudEVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuICAgIGNsb3NlQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICB9KSlcbiAgICAgICAgIH0pXG4gICAgIH0pXG4gfVxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVcIik7XG4gICAgY29uc3Qgc2xpZGVzSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiKTtcbiAgICBpZih3ZWVrID09PSAxKXtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcblxuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IHNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgaWNvbi5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKXtcbiAgICAgICAgICAgIGxldCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5xdWVzdCR7aX1gKVxuICAgICAgICAgICAgd2VlazEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHF1ZXN0c1BhdGggPSBcIi4vaW1nL3F1ZXN0cy9zbGlkZVwiXG4gICAgZnVuY3Rpb24gY2hlY2tNZWRpYVF1ZXJpZXMob2xkUGF0aCwgbmV3UGF0aCkge1xuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5NjAwID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2MDBweClcIik7XG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk1MHB4KSBhbmQgKG1heC1oZWlnaHQ6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXCIpO1xuICAgICAgICBpZiAobWVkaWFRdWVyeTYwMC5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2xkUGF0aFxuICAgIH1cbiAgICBxdWVzdHNQYXRoID0gY2hlY2tNZWRpYVF1ZXJpZXMocXVlc3RzUGF0aCwgXCIuL2ltZy9xdWVzdHMvbW9iL3NsaWRlXCIpXG5cbiAgICBjcmVhdGVTbGlkZXIoXCIuc2xpZGVcIiwgXCIuc2xpZGVfX21vdmUtbGVmdFwiLCBcIi5zbGlkZV9fbW92ZS1yaWdodFwiLCBcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIiwgMSxxdWVzdHNQYXRoLCBcInBlcnMucG5nXCIsIHdlZWssIGZhbHNlLCBudWxsLCBcIi5xdWVzdHNfX3N1YnRpdGxlXCIpXG4gICAgY3JlYXRlU2xpZGVyKFwiLnByaXplX19zbGlkZVwiLCBcIi5wcml6ZV9fbW92ZS1sZWZ0XCIsIFwiLnByaXplX19tb3ZlLXJpZ2h0XCIsIFwiLnByaXplX19pY29ucy1pdGVtXCIsIDEsXCIuL2ltZy9wcml6ZS9zbGlkZVwiLCBcInByaXplLnBuZ1wiLCBudWxsLCB0cnVlICwgMTE1MClcbiAgICBzZXRQb3B1cHMoXCIuZ3VpZGVfX2luZm9cIiwgXCIuZ3VpZGVfX2luZm8tYnRuXCIsIFwiLmd1aWRlX19pbmZvLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnByaXplX19zbGlkZS1wb3B1cFwiLCBcIi5wcml6ZV9fc2xpZGUtaW5mby1idG5cIiwgXCIucHJpemVfX3NsaWRlLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnRhYmxlX19pbmZvLXBvcHVwXCIsIFwiLnRhYmxlX19pbmZvXCIsIFwiLnRhYmxlX19pbmZvLWNsb3NlXCIpXG5cbiAgICBjb25zdCB0YWJsZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19saXN0LWl0ZW1cIilcbiAgICBjb25zdCB0YWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19pdGVtXCIpXG5cbiAgICB0YWJsZVRhYnMuZm9yRWFjaCgodGFiLCB0YWJJbmRleCkgPT57XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgdGFibGVUYWJzLmZvckVhY2goKGl0ZW0pID0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGFibGVzLmZvckVhY2goKHRhYmxlLCB0YWJsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaWYodGFibGVJbmRleCA9PT0gIHRhYkluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IHByaXplUmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLXJpZ2h0XCIpXG4gICAgY29uc3QgcHJpemVMZWZ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcml6ZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3QgcHJpemVQb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaXplX19zbGlkZS1wb3B1cFwiKVxuXG4gICAgZnVuY3Rpb24gY2xvc2VEcm9wKGRyb3BzKXtcbiAgICAgICAgZHJvcHMuZm9yRWFjaChkcm9wID0+e1xuICAgICAgICAgICAgZHJvcC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHByaXplUmlnaHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBjbG9zZURyb3AocHJpemVQb3B1cHMpXG4gICAgfSlcbiAgICBwcml6ZUxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBjbG9zZURyb3AocHJpemVQb3B1cHMpXG4gICAgfSlcblxuLy8vINCw0L3RltC80LDRhtGW0Y8g0LTQuNC90LDQvNGW0YfQvdC+0LPQviDQvdCw0LHQvtGA0YMg0YLQtdC60YHRglxuICAgIGZ1bmN0aW9uIGR5bmFtaWNUeXBld3JpdGVyKGVsZW1lbnQsIHNwZWVkLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB0ZXh0QXJyYXkgPSBlbGVtZW50LnRleHRDb250ZW50LnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oXFxzKykvKS5maWx0ZXIoZnVuY3Rpb24gKF9jaGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NoYXIudHJpbSgpICE9PSAnJyB8fCBfY2hhciA9PT0gJyAnO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHdvcmRJbmRleCA9IDA7XG4gICAgICAgIGxldCBjaGFySW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudFRleHQgPSAnJztcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJfb3BhY2l0eVwiKVxuXG4gICAgICAgIGZ1bmN0aW9uIHR5cGVXb3JkKCkge1xuICAgICAgICAgICAgaWYgKHdvcmRJbmRleCA9PT0gbGl0QXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V29yZCA9IHRleHRBcnJheVt3b3JkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50V29yZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKGNoYXJJbmRleCA8IGN1cnJlbnRXb3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IGN1cnJlbnRXb3JkLmNoYXJBdChjaGFySW5kZXgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSAnICc7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHdvcmRJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG4gICAgICAgIHR5cGVXb3JkKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50cyh0eXBlRWxlbXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnksIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY1R5cGV3cml0ZXIoZW50cnkudGFyZ2V0LCAzNSwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHR5cGVFbGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHR5cGVBbmltID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYW5pbScpO1xuICAgIG9ic2VydmVFbGVtZW50cyh0eXBlQW5pbSk7XG5cbi8vLyBwcm9ncmVzcyBiYXIg0LDQvdGW0LzQsNGG0ZbRj1xuICAgIGZ1bmN0aW9uIHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbil7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbiA8PSAxMDApe1xuICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgZWxlbVdyYXAuaW5uZXJUZXh0ID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICArK2N1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRQb3NpdGlvbiA+PSAxMDApe1xuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uID0gc3RhcnRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy1iYXJcIilcbiAgICBjb25zdCBwcm9ncmVzc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLXRleHRcIilcblxuICAgIHByb2dyZXNzQW5pbSg0MCwgcHJvZ3Jlc3NCYXIsIHByb2dyZXNzV3JhcCwgNDApXG5cbi8vIHBvcHVwc1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19idG5cIilcbiAgICBjb25zdCBjbG9zZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzX19jbG9zZVwiKVxuICAgIGNvbnN0IHBvcHVwc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc1wiKVxuXG4gICAgdGFibGVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LmFkZChcIl90YWJsZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG4gICAgfSlcbiAgICBjbG9zZVBvcHVwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl90YWJsZVwiKVxuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG5cbi8vIGZvciB0ZXN0XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbi1sbmdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJlblwiKVxuICAgIH0pXG5cbiAgICBjb25zdCBkb25lUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvbmUtcG9wdXBcIilcblxuICAgIGRvbmVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cbiAgICBjb25zdCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazFcIik7XG4gICAgY29uc3Qgd2VlazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsyXCIpO1xuXG4gICAgd2VlazEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDEpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHdlZWsyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAyKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG59KVxuXG4iXX0=
