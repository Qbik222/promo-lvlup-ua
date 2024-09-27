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
      if (week === 3) {
        index += 12;
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
      } else if (week === 3) {
        updateGlitchLayers("url(\"".concat(path).concat(nextSlideIndex + 12, "/").concat(img, "\") no-repeat 0 0/contain"), nextSlideIndex);
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
        } else if (week === 3) {
          updateGlitchLayers("url(\"".concat(path).concat(current + 13, "/").concat(img, "\") no-repeat 0 0/contain"), current + 1);
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
  console.log(week);
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
  if (week === 3) {
    for (var _i = 1; _i <= 12; _i++) {
      var _week2 = document.querySelectorAll(".quest".concat(_i));
      _week2.forEach(function (item) {
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
  // createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 1,"./img/prize/slide", "prize.png", null, true , 1150)
  setPopups(".guide__info", ".guide__info-btn", ".guide__info-close");
  // setPopups(".prize__slide-popup", ".prize__slide-info-btn", ".prize__slide-close")
  setPopups(".table__info-popup", ".table__info", ".table__info-close");

  //table tabs
  function activateTabs(tabs, tables, activeClass) {
    var stageState = {};
    tabs.forEach(function (tab, tabIndex) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (item) {
          return item.classList.remove(activeClass);
        });
        tab.classList.add(activeClass);
        tables.forEach(function (table) {
          return table.classList.remove(activeClass);
        });
        if (tables[tabIndex]) {
          tables[tabIndex].classList.add(activeClass);
        }
        var allStageTabs = tables[tabIndex].querySelectorAll(".table__stage-tabs-item");
        var allStages = tables[tabIndex].querySelectorAll(".table__stage");
        allStageTabs.forEach(function (stageTab) {
          return stageTab.classList.remove(activeClass);
        });
        allStages.forEach(function (stage) {
          return stage.classList.remove(activeClass);
        });
        var savedStageIndex = stageState[tabIndex] || 0;
        if (allStageTabs[savedStageIndex] && allStages[savedStageIndex]) {
          allStageTabs[savedStageIndex].classList.add(activeClass);
          allStages[savedStageIndex].classList.add(activeClass);
        }
      });
    });
    tables.forEach(function (table, tableIndex) {
      var stageTabs = table.querySelectorAll(".table__stage-tabs-item");
      var stages = table.querySelectorAll(".table__stage");
      stageTabs.forEach(function (tab, tabIndex) {
        tab.addEventListener("click", function () {
          stageTabs.forEach(function (item) {
            return item.classList.remove(activeClass);
          });
          tab.classList.add(activeClass);
          stages.forEach(function (stage) {
            return stage.classList.remove(activeClass);
          });
          if (stages[tabIndex]) {
            stages[tabIndex].classList.add(activeClass);
          }
          stageState[tableIndex] = tabIndex;
        });
      });
    });
  }
  var tableTabs = document.querySelectorAll(".table__list-item");
  var tables = document.querySelectorAll(".table__item");
  activateTabs(tableTabs, tables, "active");
  if (tableTabs[0]) {
    tableTabs[0].click();
  }

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
  var closePopups = document.querySelector(".popups__close");
  var popupsWrap = document.querySelector(".popups");
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
  var week3 = document.querySelector(".week3");
  week1.addEventListener("click", function () {
    localStorage.setItem("week", 1);
    location.reload();
  });
  week2.addEventListener("click", function () {
    localStorage.setItem("week", 2);
    location.reload();
  });
  week3.addEventListener("click", function () {
    localStorage.setItem("week", 3);
    location.reload();
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmZvU2xpZGVzTW9iUG9wdXAiLCJzbGlkZUJ0bkxlZnQiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVCdG5SaWdodCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJzdWJ0aXRsZXMiLCJjb3ZlcmZsb3dUb2dnbGVyIiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsImkiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGVuZ3RoIiwiYWRkIiwibmV4dFNpYmxpbmciLCJnbGl0Y2hMYXllcnMiLCJzdWJ0aXRsZXNJbml0IiwiY29uc29sZSIsImxvZyIsInNsaWRlSW5kZXgiLCJjb250YWlucyIsInN1YnRpdGxlIiwic3VidGl0bGVJbmRleCIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwibmV4dFNsaWRlSW5kZXgiLCJlIiwidGFyZ2V0Iiwic2V0UG9wdXBzIiwicG9wdXBzIiwicG9wdXBCdG5zIiwiY2xvc2VCdG5zIiwiYnRuIiwid2VlazEiLCJ3ZWVrMiIsInF1ZXN0c1BhdGgiLCJjaGVja01lZGlhUXVlcmllcyIsIm9sZFBhdGgiLCJuZXdQYXRoIiwibWVkaWFRdWVyeTYwMCIsIm1hdGNoTWVkaWEiLCJtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlIiwibWF0Y2hlcyIsImFjdGl2YXRlVGFicyIsInRhYnMiLCJ0YWJsZXMiLCJhY3RpdmVDbGFzcyIsInN0YWdlU3RhdGUiLCJ0YWIiLCJ0YWJJbmRleCIsInRhYmxlIiwiYWxsU3RhZ2VUYWJzIiwiYWxsU3RhZ2VzIiwic3RhZ2VUYWIiLCJzdGFnZSIsInNhdmVkU3RhZ2VJbmRleCIsInRhYmxlSW5kZXgiLCJzdGFnZVRhYnMiLCJzdGFnZXMiLCJ0YWJsZVRhYnMiLCJjbGljayIsImR5bmFtaWNUeXBld3JpdGVyIiwiZWxlbWVudCIsInNwZWVkIiwiY2FsbGJhY2siLCJ0ZXh0QXJyYXkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJzcGxpdCIsImxpdEFyciIsImpvaW4iLCJmaWx0ZXIiLCJfY2hhciIsIndvcmRJbmRleCIsImNoYXJJbmRleCIsImN1cnJlbnRUZXh0IiwidHlwZVdvcmQiLCJjdXJyZW50V29yZCIsInVuZGVmaW5lZCIsImNoYXJBdCIsImlubmVyVGV4dCIsIm9ic2VydmVFbGVtZW50cyIsInR5cGVFbGVtcyIsIm9wdGlvbnMiLCJyb290IiwidGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidW5vYnNlcnZlIiwib2JzZXJ2ZSIsInR5cGVBbmltIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtIiwiZWxlbVdyYXAiLCJjdXJyZW50UG9zaXRpb24iLCJ3aWR0aCIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NXcmFwIiwiY2xvc2VQb3B1cHMi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Q0FBQztJQUMvQnJKLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGMkUsS0FBSyxDQUFDOUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDbENLLFlBQVksQ0FBQ2tKLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9CckosUUFBUSxDQUFDQyxNQUFNLEVBQUU7RUFDckIsQ0FBQyxDQUFDO0VBQ0ZtSixLQUFLLENBQUN0SixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0ssWUFBWSxDQUFDa0osT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JySixRQUFRLENBQUNDLE1BQU0sRUFBRTtFQUNyQixDQUFDLENBQUM7QUFDTixDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+e1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgKCkgPT57XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpID8gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpKSA6IDE7XG5cbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1tb2JcIilcbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLWJvdHRvbVwiKVxuICAgIGNvbnN0IHNsaWRlQnRuTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHNsaWRlQnRuUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIpXG5cbiAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goKGl0ZW0sIGluZGV4SXRlbSkgPT57XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goKHBvcHVwLCBpbmRleFBvcHVwKT0+e1xuICAgICAgICAgICAgICAgIGlmIChpbmRleEl0ZW0gPT09IGluZGV4UG9wdXApe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBwb3B1cC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgc2xpZGVCdG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuICAgIHNsaWRlQnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbi8vLyDQs9C70ZbRhyDRgdC70LDQudC00LXRgFxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcihzbGlkZXMsIGxlZnRCdG4sIHJpZ2h0QnRuLCBzbGlkZXNJY29ucywgY3VycmVudCwgcGF0aCwgaW1nLCB3ZWVrLCBjb3ZlcmZsb3csIGNvdmVyZmxvd09mZldpZHRoLCBzdWJ0aXRsZXMpe1xuICAgICAgICBsZXQgY292ZXJmbG93VG9nZ2xlciA9IHRydWVcbiAgICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG4gICAgICAgICAgICBjb3ZlcmZsb3dUb2dnbGVyID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgICAgICAgICAgICAgIGlmKGNvdmVyZmxvd1RvZ2dsZXIpe1xuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXMpO1xuICAgICAgICBzdWJ0aXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN1YnRpdGxlcyk7XG4gICAgICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgICAgIH0pO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2xpZGVzKVxuICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICBpZihzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoXCJfYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzLmZvckVhY2goKHN1YnRpdGxlLCBzdWJ0aXRsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzbGlkZUluZGV4ID09PSBzdWJ0aXRsZUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgIGluZGV4ICs9IDZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHdlZWsgPT09IDMpe1xuICAgICAgICAgICAgICAgIGluZGV4ICs9IDEyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleClcbiAgICAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFswXSAhPT0gXCJzbGlkZV9faW5mb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYHF1ZXN0JHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuYmFja2dyb3VuZCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGljb25zLmZvckVhY2goKGljb24sIGljb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZShcIl9jdXJyZW50XCIsIGN1cnJlbnQgPT09IGljb25JbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwiZ2xpdGNoXCIsIFwiZ2xpdGNoXCIsIHNsaWRlcylcbiAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29uc3QgbmV4dFNsaWRlSW5kZXggPSBkaXJlY3Rpb24gPT09IFwibGVmdFwiID8gKGN1cnJlbnQgPT09IDAgPyBzbGlkZXMubGVuZ3RoIDogY3VycmVudCkgOiAoY3VycmVudCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEgPyAxIDogY3VycmVudCArIDIpO1xuICAgICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleCArIDZ9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICAgICB9ZWxzZSBpZih3ZWVrID09PSAzKXtcbiAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4ICsgMTJ9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikgfHwgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG4gICAgICAgICAgICAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwicmlnaHQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcImxlZnRcIikpO1xuICAgICAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xuICAgICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfY3VycmVudFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgN30vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih3ZWVrID09PSAzKXtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMTN9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDF9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpbmRleCA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKVxuXG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFBvcHVwcyhwb3B1cHMsIHBvcHVwQnRucywgY2xvc2VCdG5zKXtcbiAgICAgICAgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cHMpXG4gICAgICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgICAgICBjbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsb3NlQnRucylcblxuICAgICAgICBwb3B1cEJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgPT09IHBvcHVwLnBhcmVudEVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgY29uc29sZS5sb2cod2VlaylcbiAgICBpZih3ZWVrID09PSAxKXtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcblxuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IHNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgaWNvbi5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKXtcbiAgICAgICAgICAgIGxldCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5xdWVzdCR7aX1gKVxuICAgICAgICAgICAgd2VlazEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYod2VlayA9PT0gMyl7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEyOyBpKyspe1xuICAgICAgICAgICAgbGV0IHdlZWsyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnF1ZXN0JHtpfWApXG4gICAgICAgICAgICB3ZWVrMi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcXVlc3RzUGF0aCA9IFwiLi9pbWcvcXVlc3RzL3NsaWRlXCJcbiAgICBmdW5jdGlvbiBjaGVja01lZGlhUXVlcmllcyhvbGRQYXRoLCBuZXdQYXRoKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk2MDAgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDYwMHB4KVwiKTtcbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTk1MExhbmRzY2FwZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTUwcHgpIGFuZCAobWF4LWhlaWdodDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIik7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5NjAwLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2xkUGF0aFxuICAgIH1cbiAgICBxdWVzdHNQYXRoID0gY2hlY2tNZWRpYVF1ZXJpZXMocXVlc3RzUGF0aCwgXCIuL2ltZy9xdWVzdHMvbW9iL3NsaWRlXCIpXG5cbiAgICBjcmVhdGVTbGlkZXIoXCIuc2xpZGVcIiwgXCIuc2xpZGVfX21vdmUtbGVmdFwiLCBcIi5zbGlkZV9fbW92ZS1yaWdodFwiLCBcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIiwgMSxxdWVzdHNQYXRoLCBcInBlcnMucG5nXCIsIHdlZWssIGZhbHNlLCBudWxsLCBcIi5xdWVzdHNfX3N1YnRpdGxlXCIpXG4gICAgLy8gY3JlYXRlU2xpZGVyKFwiLnByaXplX19zbGlkZVwiLCBcIi5wcml6ZV9fbW92ZS1sZWZ0XCIsIFwiLnByaXplX19tb3ZlLXJpZ2h0XCIsIFwiLnByaXplX19pY29ucy1pdGVtXCIsIDEsXCIuL2ltZy9wcml6ZS9zbGlkZVwiLCBcInByaXplLnBuZ1wiLCBudWxsLCB0cnVlICwgMTE1MClcbiAgICBzZXRQb3B1cHMoXCIuZ3VpZGVfX2luZm9cIiwgXCIuZ3VpZGVfX2luZm8tYnRuXCIsIFwiLmd1aWRlX19pbmZvLWNsb3NlXCIpXG4gICAgLy8gc2V0UG9wdXBzKFwiLnByaXplX19zbGlkZS1wb3B1cFwiLCBcIi5wcml6ZV9fc2xpZGUtaW5mby1idG5cIiwgXCIucHJpemVfX3NsaWRlLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnRhYmxlX19pbmZvLXBvcHVwXCIsIFwiLnRhYmxlX19pbmZvXCIsIFwiLnRhYmxlX19pbmZvLWNsb3NlXCIpXG5cbi8vdGFibGUgdGFic1xuICAgIGZ1bmN0aW9uIGFjdGl2YXRlVGFicyh0YWJzLCB0YWJsZXMsIGFjdGl2ZUNsYXNzKSB7XG4gICAgICAgIGNvbnN0IHN0YWdlU3RhdGUgPSB7fTtcblxuICAgICAgICB0YWJzLmZvckVhY2goKHRhYiwgdGFiSW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRhYnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzcykpO1xuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCh0YWJsZSA9PiB0YWJsZS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUNsYXNzKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhYmxlc1t0YWJJbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVzW3RhYkluZGV4XS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYWxsU3RhZ2VUYWJzID0gdGFibGVzW3RhYkluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19zdGFnZS10YWJzLWl0ZW1cIik7XG4gICAgICAgICAgICAgICAgY29uc3QgYWxsU3RhZ2VzID0gdGFibGVzW3RhYkluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19zdGFnZVwiKTtcblxuICAgICAgICAgICAgICAgIGFsbFN0YWdlVGFicy5mb3JFYWNoKHN0YWdlVGFiID0+IHN0YWdlVGFiLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlQ2xhc3MpKTtcbiAgICAgICAgICAgICAgICBhbGxTdGFnZXMuZm9yRWFjaChzdGFnZSA9PiBzdGFnZS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUNsYXNzKSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzYXZlZFN0YWdlSW5kZXggPSBzdGFnZVN0YXRlW3RhYkluZGV4XSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFsbFN0YWdlVGFic1tzYXZlZFN0YWdlSW5kZXhdICYmIGFsbFN0YWdlc1tzYXZlZFN0YWdlSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbFN0YWdlVGFic1tzYXZlZFN0YWdlSW5kZXhdLmNsYXNzTGlzdC5hZGQoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBhbGxTdGFnZXNbc2F2ZWRTdGFnZUluZGV4XS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFibGVzLmZvckVhY2goKHRhYmxlLCB0YWJsZUluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdGFnZVRhYnMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19zdGFnZS10YWJzLWl0ZW1cIik7XG4gICAgICAgICAgICBjb25zdCBzdGFnZXMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19zdGFnZVwiKTtcblxuICAgICAgICAgICAgc3RhZ2VUYWJzLmZvckVhY2goKHRhYiwgdGFiSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2VUYWJzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlQ2xhc3MpKTtcbiAgICAgICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBzdGFnZXMuZm9yRWFjaChzdGFnZSA9PiBzdGFnZS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUNsYXNzKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFnZXNbdGFiSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFnZXNbdGFiSW5kZXhdLmNsYXNzTGlzdC5hZGQoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlU3RhdGVbdGFibGVJbmRleF0gPSB0YWJJbmRleDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWJsZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19saXN0LWl0ZW1cIik7XG4gICAgY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9faXRlbVwiKTtcblxuICAgIGFjdGl2YXRlVGFicyh0YWJsZVRhYnMsIHRhYmxlcywgXCJhY3RpdmVcIik7XG5cbiAgICBpZiAodGFibGVUYWJzWzBdKSB7XG4gICAgICAgIHRhYmxlVGFic1swXS5jbGljaygpO1xuICAgIH1cblxuXG5cblxuLy8vINCw0L3RltC80LDRhtGW0Y8g0LTQuNC90LDQvNGW0YfQvdC+0LPQviDQvdCw0LHQvtGA0YMg0YLQtdC60YHRglxuICAgIGZ1bmN0aW9uIGR5bmFtaWNUeXBld3JpdGVyKGVsZW1lbnQsIHNwZWVkLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB0ZXh0QXJyYXkgPSBlbGVtZW50LnRleHRDb250ZW50LnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oXFxzKykvKS5maWx0ZXIoZnVuY3Rpb24gKF9jaGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NoYXIudHJpbSgpICE9PSAnJyB8fCBfY2hhciA9PT0gJyAnO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHdvcmRJbmRleCA9IDA7XG4gICAgICAgIGxldCBjaGFySW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudFRleHQgPSAnJztcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJfb3BhY2l0eVwiKVxuXG4gICAgICAgIGZ1bmN0aW9uIHR5cGVXb3JkKCkge1xuICAgICAgICAgICAgaWYgKHdvcmRJbmRleCA9PT0gbGl0QXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V29yZCA9IHRleHRBcnJheVt3b3JkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50V29yZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKGNoYXJJbmRleCA8IGN1cnJlbnRXb3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IGN1cnJlbnRXb3JkLmNoYXJBdChjaGFySW5kZXgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSAnICc7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHdvcmRJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG4gICAgICAgIHR5cGVXb3JkKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50cyh0eXBlRWxlbXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnksIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY1R5cGV3cml0ZXIoZW50cnkudGFyZ2V0LCAzNSwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHR5cGVFbGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHR5cGVBbmltID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYW5pbScpO1xuICAgIG9ic2VydmVFbGVtZW50cyh0eXBlQW5pbSk7XG5cbi8vLyBwcm9ncmVzcyBiYXIg0LDQvdGW0LzQsNGG0ZbRj1xuICAgIGZ1bmN0aW9uIHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbil7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbiA8PSAxMDApe1xuICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgZWxlbVdyYXAuaW5uZXJUZXh0ID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICArK2N1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRQb3NpdGlvbiA+PSAxMDApe1xuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uID0gc3RhcnRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy1iYXJcIilcbiAgICBjb25zdCBwcm9ncmVzc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLXRleHRcIilcblxuICAgIHByb2dyZXNzQW5pbSg0MCwgcHJvZ3Jlc3NCYXIsIHByb2dyZXNzV3JhcCwgNDApXG5cbi8vIHBvcHVwc1xuICAgIGNvbnN0IGNsb3NlUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2Nsb3NlXCIpXG4gICAgY29uc3QgcG9wdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzXCIpXG5cbiAgICBjbG9zZVBvcHVwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl90YWJsZVwiKVxuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG5cbi8vIGZvciB0ZXN0XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbi1sbmdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJlblwiKVxuICAgIH0pXG5cbiAgICBjb25zdCBkb25lUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvbmUtcG9wdXBcIilcblxuICAgIGRvbmVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cbiAgICBjb25zdCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazFcIik7XG4gICAgY29uc3Qgd2VlazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsyXCIpO1xuICAgIGNvbnN0IHdlZWszID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrM1wiKTtcblxuICAgIHdlZWsxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAxKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICB3ZWVrMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMik7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICAgIHdlZWszLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAzKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG59KVxuXG4iXX0=
