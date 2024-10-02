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
  createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1, questsPath, "pers.png", null, false, null, ".quests__subtitle", true);
  createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 1, "./img/prize/slide", "prize.png", null, true, 1150, false);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmZvU2xpZGVzTW9iUG9wdXAiLCJzbGlkZUJ0bkxlZnQiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVCdG5SaWdodCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJzdWJ0aXRsZXMiLCJjb3B5U2xpZGVzIiwiY292ZXJmbG93VG9nZ2xlciIsImlubmVyV2lkdGgiLCJjb3ZlckZsb3dDbGFzc2VzIiwicmlnaHQiLCJsZWZ0Iiwic2xpZGUiLCJpIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxlbmd0aCIsImFkZCIsIm5leHRTaWJsaW5nIiwiZ2xpdGNoTGF5ZXJzIiwic3VidGl0bGVzSW5pdCIsInNsaWRlSW5kZXgiLCJjb250YWlucyIsInN1YnRpdGxlIiwic3VidGl0bGVJbmRleCIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwiZGlyZWN0aW9uIiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwicXVlc3ROdW1iZXIiLCJnZXRTbGlkZU51bSIsIm5leHRDbGFzcyIsInByZXZDbGFzcyIsImN1cnJlbnRDbGFzcyIsImJhY2tncm91bmQiLCJxdWVzdENsYXNzIiwiZmluZCIsInJlcGxhY2UiLCJtb3ZlU2xpZGVyIiwiU2xpZGVJY29uc0luaXQiLCJpY29ucyIsIndyYXBwZXIiLCJpY29uIiwiaWNvbkluZGV4IiwiaWNvbk9mZnNldExlZnQiLCJvZmZzZXRMZWZ0IiwiaWNvbldpZHRoIiwib2Zmc2V0V2lkdGgiLCJ3cmFwcGVyV2lkdGgiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwiaGFuZGxlQ2xpY2siLCJuZXh0U2xpZGVJbmRleCIsImUiLCJ0YXJnZXQiLCJzZXRQb3B1cHMiLCJwb3B1cHMiLCJwb3B1cEJ0bnMiLCJjbG9zZUJ0bnMiLCJidG4iLCJxdWVzdHNQYXRoIiwiY2hlY2tNZWRpYVF1ZXJpZXMiLCJvbGRQYXRoIiwibmV3UGF0aCIsIm1lZGlhUXVlcnk2MDAiLCJtYXRjaE1lZGlhIiwibWVkaWFRdWVyeTk1MExhbmRzY2FwZSIsIm1hdGNoZXMiLCJ0YWJsZVRhYnMiLCJ0YWJsZXMiLCJ0YWIiLCJ0YWJJbmRleCIsInRhYmxlIiwidGFibGVJbmRleCIsInByaXplUmlnaHRCdG4iLCJwcml6ZUxlZnRCdG4iLCJwcml6ZVBvcHVwcyIsImNsb3NlRHJvcCIsImRyb3BzIiwiZHJvcCIsImR5bmFtaWNUeXBld3JpdGVyIiwiZWxlbWVudCIsInNwZWVkIiwiY2FsbGJhY2siLCJ0ZXh0QXJyYXkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJzcGxpdCIsImxpdEFyciIsImpvaW4iLCJmaWx0ZXIiLCJfY2hhciIsIndvcmRJbmRleCIsImNoYXJJbmRleCIsImN1cnJlbnRUZXh0IiwidHlwZVdvcmQiLCJjdXJyZW50V29yZCIsInVuZGVmaW5lZCIsImNoYXJBdCIsImlubmVyVGV4dCIsIm9ic2VydmVFbGVtZW50cyIsInR5cGVFbGVtcyIsIm9wdGlvbnMiLCJyb290IiwidGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidW5vYnNlcnZlIiwib2JzZXJ2ZSIsInR5cGVBbmltIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtIiwiZWxlbVdyYXAiLCJjdXJyZW50UG9zaXRpb24iLCJ3aWR0aCIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NXcmFwIiwidGFibGVQb3B1cEJ0biIsImNsb3NlUG9wdXBzIiwicG9wdXBzV3JhcCIsImJvZHkiLCJkb25lUG9wdXBCdG4iLCJ3ZWVrMSIsIndlZWsyIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFLO0VBQy9DQyxNQUFNLENBQUNELGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLFlBQUs7SUFDOUNFLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGLElBQUlDLElBQUksR0FBR0MsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0YsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBRXBGLElBQU1FLGFBQWEsR0FBR1QsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztFQUNuRSxJQUFNQyxrQkFBa0IsR0FBR1gsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztFQUMzRSxJQUFNRSxZQUFZLEdBQUdaLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQ2hFLElBQU1DLGFBQWEsR0FBR2QsUUFBUSxDQUFDYSxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFFbEVKLGFBQWEsQ0FBQ00sT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRUMsU0FBUyxFQUFJO0lBQ3RDRCxJQUFJLENBQUNmLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO01BQ2hDVSxrQkFBa0IsQ0FBQ0ksT0FBTyxDQUFDLFVBQUNHLEtBQUssRUFBRUMsVUFBVSxFQUFHO1FBQzVDLElBQUlGLFNBQVMsS0FBS0UsVUFBVSxFQUFDO1VBQ3pCRCxLQUFLLENBQUNF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LEtBQUssQ0FBQy9KLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ2xDSyxZQUFZLENBQUMySixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQjlKLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCAoKSA9PntcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9KVxuXG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLW1vYlwiKVxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2JQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tYm90dG9tXCIpXG4gICAgY29uc3Qgc2xpZGVCdG5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3Qgc2xpZGVCdG5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtcmlnaHRcIilcblxuICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaCgoaXRlbSwgaW5kZXhJdGVtKSA9PntcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaCgocG9wdXAsIGluZGV4UG9wdXApPT57XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SXRlbSA9PT0gaW5kZXhQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzbGlkZUJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG4gICAgc2xpZGVCdG5SaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgfSlcblxuLy8vINCz0LvRltGHINGB0LvQsNC50LTQtdGAXG4gZnVuY3Rpb24gY3JlYXRlU2xpZGVyKHNsaWRlcywgbGVmdEJ0biwgcmlnaHRCdG4sIHNsaWRlc0ljb25zLCBjdXJyZW50LCBwYXRoLCBpbWcsIHdlZWssIGNvdmVyZmxvdywgY292ZXJmbG93T2ZmV2lkdGgsIHN1YnRpdGxlcywgY29weVNsaWRlcyl7XG4gICAgIGxldCBjb3ZlcmZsb3dUb2dnbGVyID0gdHJ1ZVxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKXtcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgICAgICAgICAgaWYoY292ZXJmbG93VG9nZ2xlcil7XG4gICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IGkpe1xuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLTFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5uZXh0U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIHN1YnRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc3VidGl0bGVzKTtcbiAgICAgbGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGVmdEJ0bik7XG4gICAgIHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyaWdodEJ0bik7XG4gICAgIHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXNJY29ucyk7XG4gICAgIGxldCBnbGl0Y2hMYXllcnMgPSBbXTtcbiAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzID0gWy4uLmdsaXRjaExheWVycywgLi4uc2xpZGUucXVlcnlTZWxlY3RvckFsbChcIi5nbGl0Y2hfX2xheWVyXCIpXTtcbiAgICAgfSk7XG4gICAgIGlmKHNsaWRlc1tjdXJyZW50XSlzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpe1xuICAgICAgICAgLy8gY29uc29sZS5sb2coc2xpZGVzKVxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PntcbiAgICAgICAgICAgICBpZihzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoXCJfYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgc3VidGl0bGVzLmZvckVhY2goKHN1YnRpdGxlLCBzdWJ0aXRsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZUluZGV4ID09PSBzdWJ0aXRsZUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgsIGRpcmVjdGlvbikge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgbGV0IHF1ZXN0TnVtYmVyID0gZ2V0U2xpZGVOdW0oc2xpZGVzW2N1cnJlbnRdKTtcblxuICAgICAgICAgICAgIGlmIChsYXllci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzBdICE9PSBcInNsaWRlX19pbmZvXCIpIHtcbiAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGlyZWN0aW9uKVxuICAgICAgICAgICAgICAgICBpZiAoY29weVNsaWRlcykge1xuICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRDbGFzcywgcHJldkNsYXNzLCBjdXJyZW50Q2xhc3M7XG5cbiAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXNbY3VycmVudF0ubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0Q2xhc3MgPSBzbGlkZXNbY3VycmVudF0ubmV4dFNpYmxpbmcuY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tjdXJyZW50XS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJldkNsYXNzID0gc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgY3VycmVudENsYXNzID0gc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdFsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgJiYgbmV4dENsYXNzICYmIG5leHRDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChuZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgJiYgcHJldkNsYXNzICYmIHByZXZDbGFzcyAhPT0gY3VycmVudENsYXNzKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChwcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgJiYgc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGAke3NsaWRlc1tzbGlkZXMubGVuZ3RoIC0gMV0uY2xhc3NMaXN0WzFdfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICYmIHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZyA9PT0gbnVsbCk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzWzFdLmNsYXNzTGlzdFsxXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGN1cnJlbnRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGdldFNsaWRlTnVtKHNsaWRlKSB7XG4gICAgICAgICBjb25zdCBxdWVzdENsYXNzID0gWy4uLnNsaWRlLmNsYXNzTGlzdF0uZmluZChjbGFzc05hbWUgPT4gY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSk7XG4gICAgICAgICBpZiAocXVlc3RDbGFzcykge1xuICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChxdWVzdENsYXNzLnJlcGxhY2UoXCJxdWVzdFwiLCBcIlwiKSk7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gMTtcbiAgICAgfVxuXG5cblxuICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICB9KTtcblxuICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBpY29uc1swXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAvLyBjb25zb2xlLmxvZyh3cmFwcGVyKVxuXG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBpY29uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgY29uc3QgaWNvbk9mZnNldExlZnQgPSBpY29uLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgIGNvbnN0IGljb25XaWR0aCA9IGljb24ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJXaWR0aCA9IHdyYXBwZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgIHdyYXBwZXIuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgbGVmdDogaWNvbk9mZnNldExlZnQgLSAod3JhcHBlcldpZHRoIC8gMikgKyAoaWNvbldpZHRoIC8gMiksXG4gICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXggKyA2fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgsIGRpcmVjdGlvbik7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICB9LCAxMDAwKTtcbiAgICAgfVxuXG4gICAgIGxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwibGVmdFwiKSk7XG4gICAgIHJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcInJpZ2h0XCIpKTtcblxuICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9jdXJyZW50XCIpKSByZXR1cm5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9jdXJyZW50XCIpKTtcbiAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIGN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyA3fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEsKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgfSk7XG4gICAgIH0pO1xuICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG5cbiB9XG4gZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBzKVxuICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgcG9wdXBCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwb3B1cC5wYXJlbnRFbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuIH1cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgLy8gaWYod2VlayA9PT0gMSl7XG4gICAgLy8gICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgLy9cbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAvLyAgICAgICAgICAgICBzbGlkZS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PntcbiAgICAvLyAgICAgICAgIGlmKGkgPj0gNiB8fCBpY29uLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgIC8vICAgICAgICAgICAgIGljb24ucmVtb3ZlKClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG4gICAgLy8gaWYod2VlayA9PT0gMil7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XG4gICAgLy8gICAgICAgICBsZXQgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucXVlc3Qke2l9YClcbiAgICAvLyAgICAgICAgIHdlZWsxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvL1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIGxldCBxdWVzdHNQYXRoID0gXCIuL2ltZy9xdWVzdHMvc2xpZGVcIlxuICAgIGZ1bmN0aW9uIGNoZWNrTWVkaWFRdWVyaWVzKG9sZFBhdGgsIG5ld1BhdGgpIHtcbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5NTBweCkgYW5kIChtYXgtaGVpZ2h0OiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVwiKTtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnk2MDAubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWVkaWFRdWVyeTk1MExhbmRzY2FwZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9sZFBhdGhcbiAgICB9XG4gICAgcXVlc3RzUGF0aCA9IGNoZWNrTWVkaWFRdWVyaWVzKHF1ZXN0c1BhdGgsIFwiLi9pbWcvcXVlc3RzL21vYi9zbGlkZVwiKVxuXG4gICAgY3JlYXRlU2xpZGVyKFwiLnNsaWRlXCIsIFwiLnNsaWRlX19tb3ZlLWxlZnRcIiwgXCIuc2xpZGVfX21vdmUtcmlnaHRcIiwgXCIucXVlc3RzX19pY29ucy1pdGVtXCIsIDEscXVlc3RzUGF0aCwgXCJwZXJzLnBuZ1wiLCBudWxsLCBmYWxzZSwgbnVsbCwgXCIucXVlc3RzX19zdWJ0aXRsZVwiLCB0cnVlKVxuICAgIGNyZWF0ZVNsaWRlcihcIi5wcml6ZV9fc2xpZGVcIiwgXCIucHJpemVfX21vdmUtbGVmdFwiLCBcIi5wcml6ZV9fbW92ZS1yaWdodFwiLCBcIi5wcml6ZV9faWNvbnMtaXRlbVwiLCAxLFwiLi9pbWcvcHJpemUvc2xpZGVcIiwgXCJwcml6ZS5wbmdcIiwgbnVsbCwgdHJ1ZSAsIDExNTAsIGZhbHNlKVxuICAgIHNldFBvcHVwcyhcIi5ndWlkZV9faW5mb1wiLCBcIi5ndWlkZV9faW5mby1idG5cIiwgXCIuZ3VpZGVfX2luZm8tY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIsIFwiLnByaXplX19zbGlkZS1pbmZvLWJ0blwiLCBcIi5wcml6ZV9fc2xpZGUtY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIudGFibGVfX2luZm8tcG9wdXBcIiwgXCIudGFibGVfX2luZm9cIiwgXCIudGFibGVfX2luZm8tY2xvc2VcIilcblxuICAgIGNvbnN0IHRhYmxlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2xpc3QtaXRlbVwiKVxuICAgIGNvbnN0IHRhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2l0ZW1cIilcblxuICAgIHRhYmxlVGFicy5mb3JFYWNoKCh0YWIsIHRhYkluZGV4KSA9PntcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCgodGFibGUsIHRhYmxlSW5kZXgpID0+e1xuICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZih0YWJsZUluZGV4ID09PSAgdGFiSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgcHJpemVSaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtcmlnaHRcIilcbiAgICBjb25zdCBwcml6ZUxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBwcml6ZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIpXG5cbiAgICBmdW5jdGlvbiBjbG9zZURyb3AoZHJvcHMpe1xuICAgICAgICBkcm9wcy5mb3JFYWNoKGRyb3AgPT57XG4gICAgICAgICAgICBkcm9wLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpemVSaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuICAgIHByaXplTGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuXG4vLy8g0LDQvdGW0LzQsNGG0ZbRjyDQtNC40L3QsNC80ZbRh9C90L7Qs9C+INC90LDQsdC+0YDRgyDRgtC10LrRgdGCXG4gICAgZnVuY3Rpb24gZHluYW1pY1R5cGV3cml0ZXIoZWxlbWVudCwgc3BlZWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHRleHRBcnJheSA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyhcXHMrKS8pLmZpbHRlcihmdW5jdGlvbiAoX2NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfY2hhci50cmltKCkgIT09ICcnIHx8IF9jaGFyID09PSAnICc7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd29yZEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNoYXJJbmRleCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICcnO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9vcGFjaXR5XCIpXG5cbiAgICAgICAgZnVuY3Rpb24gdHlwZVdvcmQoKSB7XG4gICAgICAgICAgICBpZiAod29yZEluZGV4ID09PSBsaXRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdGV4dEFycmF5W3dvcmRJbmRleF07XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRXb3JkID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY2hhckluZGV4IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gY3VycmVudFdvcmQuY2hhckF0KGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9ICcgJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgd29yZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgdHlwZVdvcmQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb2JzZXJ2ZUVsZW1lbnRzKHR5cGVFbGVtcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vdDogbnVsbCxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwZXdyaXRlcihlbnRyeS50YXJnZXQsIDM1LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdHlwZUVsZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdHlwZUFuaW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwZS1hbmltJyk7XG4gICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTtcblxuLy8vIHByb2dyZXNzIGJhciDQsNC90ZbQvNCw0YbRltGPXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKXtcbiAgICAgICAgaWYoY3VycmVudFBvc2l0aW9uIDw9IDEwMCl7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICBlbGVtV3JhcC5pbm5lclRleHQgPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgICsrY3VycmVudFBvc2l0aW9uXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFBvc2l0aW9uID49IDEwMCl7XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBzdGFydFxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLWJhclwiKVxuICAgIGNvbnN0IHByb2dyZXNzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtdGV4dFwiKVxuXG4gICAgcHJvZ3Jlc3NBbmltKDQwLCBwcm9ncmVzc0JhciwgcHJvZ3Jlc3NXcmFwLCA0MClcblxuLy8gcG9wdXBzXG4gICAgY29uc3QgdGFibGVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX2J0blwiKVxuICAgIGNvbnN0IGNsb3NlUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2Nsb3NlXCIpXG4gICAgY29uc3QgcG9wdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzXCIpXG5cbiAgICB0YWJsZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QuYWRkKFwiX3RhYmxlXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9vdmVyZmxvdy1oaWRkZW5cIilcbiAgICB9KVxuICAgIGNsb3NlUG9wdXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX3RhYmxlXCIpXG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cblxuLy8gZm9yIHRlc3RcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuLWxuZ1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIikuY2xhc3NMaXN0LnRvZ2dsZShcImVuXCIpXG4gICAgfSlcblxuICAgIGNvbnN0IGRvbmVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9uZS1wb3B1cFwiKVxuXG4gICAgZG9uZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QudG9nZ2xlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuICAgIGNvbnN0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMVwiKTtcbiAgICBjb25zdCB3ZWVrMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazJcIik7XG5cbiAgICB3ZWVrMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMSk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgd2VlazIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbn0pXG5cbiJdfQ==
