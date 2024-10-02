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
          console.log(direction);
          if (copySlides) {
            console.log(slides[current].previousElementSibling);
            if (slides[current].nextSibling !== null && slides[current].nextSibling.classList[1] !== slides[current].classList[1] && direction === "right") {
              layer.classList.add("".concat(slides[current].nextSibling.classList[1]));
            } else if (slides[current].previousElementSibling !== null && slides[current].previousElementSibling.classList[1] !== slides[current].classList[1] && direction === "left") {
              layer.classList.add("".concat(slides[current].previousElementSibling.classList[1]));
            } else if (slides[current].previousElementSibling === null && direction === "left") {
              layer.classList.add("".concat(slides[slides.length - 1].classList[1]));
            } else if (slides[current].nextSibling === null && direction === "right") {
              layer.classList.add("".concat(slides[1].classList[1]));
            } else {
              layer.classList.add("".concat(slides[current].classList[1]));
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
      icons.forEach(function (icon, iconIndex) {
        icon.classList.toggle("_current", current === iconIndex);
        if (current === iconIndex) {
          icon.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiaW5mb1NsaWRlc01vYiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmZvU2xpZGVzTW9iUG9wdXAiLCJzbGlkZUJ0bkxlZnQiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVCdG5SaWdodCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXhJdGVtIiwicG9wdXAiLCJpbmRleFBvcHVwIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJzdWJ0aXRsZXMiLCJjb3B5U2xpZGVzIiwiY292ZXJmbG93VG9nZ2xlciIsImlubmVyV2lkdGgiLCJjb3ZlckZsb3dDbGFzc2VzIiwicmlnaHQiLCJsZWZ0Iiwic2xpZGUiLCJpIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxlbmd0aCIsImFkZCIsIm5leHRTaWJsaW5nIiwiZ2xpdGNoTGF5ZXJzIiwic3VidGl0bGVzSW5pdCIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZUluZGV4IiwiY29udGFpbnMiLCJzdWJ0aXRsZSIsInN1YnRpdGxlSW5kZXgiLCJ1cGRhdGVHbGl0Y2hMYXllcnMiLCJpbmRleCIsImRpcmVjdGlvbiIsImxheWVyIiwiY2xhc3NOYW1lIiwic3RhcnRzV2l0aCIsInF1ZXN0TnVtYmVyIiwiZ2V0U2xpZGVOdW0iLCJiYWNrZ3JvdW5kIiwicXVlc3RDbGFzcyIsImZpbmQiLCJyZXBsYWNlIiwibW92ZVNsaWRlciIsIlNsaWRlSWNvbnNJbml0IiwiaWNvbnMiLCJpY29uIiwiaWNvbkluZGV4Iiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiaW5saW5lIiwiaGFuZGxlQ2xpY2siLCJuZXh0U2xpZGVJbmRleCIsImUiLCJ0YXJnZXQiLCJzZXRQb3B1cHMiLCJwb3B1cHMiLCJwb3B1cEJ0bnMiLCJjbG9zZUJ0bnMiLCJidG4iLCJxdWVzdHNQYXRoIiwiY2hlY2tNZWRpYVF1ZXJpZXMiLCJvbGRQYXRoIiwibmV3UGF0aCIsIm1lZGlhUXVlcnk2MDAiLCJtYXRjaE1lZGlhIiwibWVkaWFRdWVyeTk1MExhbmRzY2FwZSIsIm1hdGNoZXMiLCJ0YWJsZVRhYnMiLCJ0YWJsZXMiLCJ0YWIiLCJ0YWJJbmRleCIsInRhYmxlIiwidGFibGVJbmRleCIsInByaXplUmlnaHRCdG4iLCJwcml6ZUxlZnRCdG4iLCJwcml6ZVBvcHVwcyIsImNsb3NlRHJvcCIsImRyb3BzIiwiZHJvcCIsImR5bmFtaWNUeXBld3JpdGVyIiwiZWxlbWVudCIsInNwZWVkIiwiY2FsbGJhY2siLCJ0ZXh0QXJyYXkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJzcGxpdCIsImxpdEFyciIsImpvaW4iLCJmaWx0ZXIiLCJfY2hhciIsIndvcmRJbmRleCIsImNoYXJJbmRleCIsImN1cnJlbnRUZXh0IiwidHlwZVdvcmQiLCJjdXJyZW50V29yZCIsInVuZGVmaW5lZCIsImNoYXJBdCIsImlubmVyVGV4dCIsIm9ic2VydmVFbGVtZW50cyIsInR5cGVFbGVtcyIsIm9wdGlvbnMiLCJyb290IiwidGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidW5vYnNlcnZlIiwib2JzZXJ2ZSIsInR5cGVBbmltIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtIiwiZWxlbVdyYXAiLCJjdXJyZW50UG9zaXRpb24iLCJ3aWR0aCIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NXcmFwIiwidGFibGVQb3B1cEJ0biIsImNsb3NlUG9wdXBzIiwicG9wdXBzV3JhcCIsImJvZHkiLCJkb25lUG9wdXBCdG4iLCJ3ZWVrMSIsIndlZWsyIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFLO0VBQy9DQyxNQUFNLENBQUNELGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLFlBQUs7SUFDOUNFLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGLElBQUlDLElBQUksR0FBR0MsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0YsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBRXBGLElBQU1FLGFBQWEsR0FBR1QsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztFQUNuRSxJQUFNQyxrQkFBa0IsR0FBR1gsUUFBUSxDQUFDVSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztFQUMzRSxJQUFNRSxZQUFZLEdBQUdaLFFBQVEsQ0FBQ2EsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQ2hFLElBQU1DLGFBQWEsR0FBR2QsUUFBUSxDQUFDYSxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFFbEVKLGFBQWEsQ0FBQ00sT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRUMsU0FBUyxFQUFJO0lBQ3RDRCxJQUFJLENBQUNmLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO01BQ2hDVSxrQkFBa0IsQ0FBQ0ksT0FBTyxDQUFDLFVBQUNHLEtBQUssRUFBRUMsVUFBVSxFQUFHO1FBQzVDLElBQUlGLFNBQVMsS0FBS0UsVUFBVSxFQUFDO1VBQ3pCRCxLQUFLLENBQUNFLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFNBQVMsQ0FBQztVQUNqQ0gsS0FBSyxDQUFDSSxhQUFhLENBQUNBLGFBQWEsQ0FBQ0EsYUFBYSxDQUFD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LFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCAoKSA9PntcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9KVxuXG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLW1vYlwiKVxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2JQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tYm90dG9tXCIpXG4gICAgY29uc3Qgc2xpZGVCdG5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3Qgc2xpZGVCdG5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtcmlnaHRcIilcblxuICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaCgoaXRlbSwgaW5kZXhJdGVtKSA9PntcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaCgocG9wdXAsIGluZGV4UG9wdXApPT57XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SXRlbSA9PT0gaW5kZXhQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzbGlkZUJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG4gICAgc2xpZGVCdG5SaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgfSlcblxuLy8vINCz0LvRltGHINGB0LvQsNC50LTQtdGAXG4gZnVuY3Rpb24gY3JlYXRlU2xpZGVyKHNsaWRlcywgbGVmdEJ0biwgcmlnaHRCdG4sIHNsaWRlc0ljb25zLCBjdXJyZW50LCBwYXRoLCBpbWcsIHdlZWssIGNvdmVyZmxvdywgY292ZXJmbG93T2ZmV2lkdGgsIHN1YnRpdGxlcywgY29weVNsaWRlcyl7XG4gICAgIGxldCBjb3ZlcmZsb3dUb2dnbGVyID0gdHJ1ZVxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKXtcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgICAgICAgICAgaWYoY292ZXJmbG93VG9nZ2xlcil7XG4gICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IGkpe1xuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLTFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5uZXh0U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIHN1YnRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc3VidGl0bGVzKTtcbiAgICAgbGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGVmdEJ0bik7XG4gICAgIHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyaWdodEJ0bik7XG4gICAgIHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXNJY29ucyk7XG4gICAgIGxldCBnbGl0Y2hMYXllcnMgPSBbXTtcbiAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzID0gWy4uLmdsaXRjaExheWVycywgLi4uc2xpZGUucXVlcnlTZWxlY3RvckFsbChcIi5nbGl0Y2hfX2xheWVyXCIpXTtcbiAgICAgfSk7XG4gICAgIGlmKHNsaWRlc1tjdXJyZW50XSlzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpe1xuICAgICAgICAgY29uc29sZS5sb2coc2xpZGVzKVxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PntcbiAgICAgICAgICAgICBpZihzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoXCJfYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgc3VidGl0bGVzLmZvckVhY2goKHN1YnRpdGxlLCBzdWJ0aXRsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZUluZGV4ID09PSBzdWJ0aXRsZUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgsIGRpcmVjdGlvbikge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgbGV0IHF1ZXN0TnVtYmVyID0gZ2V0U2xpZGVOdW0oc2xpZGVzW2N1cnJlbnRdKTtcblxuICAgICAgICAgICAgIGlmIChsYXllci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzBdICE9PSBcInNsaWRlX19pbmZvXCIpIHtcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlyZWN0aW9uKVxuICAgICAgICAgICAgICAgICBpZihjb3B5U2xpZGVzKXtcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNsaWRlc1tjdXJyZW50XS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKVxuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGVzW2N1cnJlbnRdLm5leHRTaWJsaW5nICE9PSBudWxsICYmIHNsaWRlc1tjdXJyZW50XS5uZXh0U2libGluZy5jbGFzc0xpc3RbMV0gIT09IHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3RbMV0gJiYgZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzW2N1cnJlbnRdLm5leHRTaWJsaW5nLmNsYXNzTGlzdFsxXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgIT09IG51bGwgJiYgc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0WzFdICE9PSBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0WzFdICYmIGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0WzFdfWApO1xuICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoc2xpZGVzW2N1cnJlbnRdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwgJiYgZGlyZWN0aW9uID09PSBcImxlZnRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChgJHtzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdLmNsYXNzTGlzdFsxXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoc2xpZGVzW2N1cnJlbnRdLm5leHRTaWJsaW5nID09PSBudWxsICYmIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGAke3NsaWRlc1sxXS5jbGFzc0xpc3RbMV19YCk7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYCR7c2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdFsxXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gcGF0aDtcbiAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBnZXRTbGlkZU51bShzbGlkZSkge1xuICAgICAgICAgY29uc3QgcXVlc3RDbGFzcyA9IFsuLi5zbGlkZS5jbGFzc0xpc3RdLmZpbmQoY2xhc3NOYW1lID0+IGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpO1xuICAgICAgICAgaWYgKHF1ZXN0Q2xhc3MpIHtcbiAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQocXVlc3RDbGFzcy5yZXBsYWNlKFwicXVlc3RcIiwgXCJcIikpO1xuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIDE7XG4gICAgIH1cblxuXG5cbiAgICAgZnVuY3Rpb24gbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbikge1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAtLWN1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAwKSBjdXJyZW50ID0gc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICAgKytjdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzLmxlbmd0aCAtIDEpIGN1cnJlbnQgPSAwO1xuICAgICAgICAgfVxuXG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgfSk7XG5cbiAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIFNsaWRlSWNvbnNJbml0KGljb25zLCBjdXJyZW50KSB7XG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBpY29uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgaWNvbi5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICBibG9jazogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICBpbmxpbmU6ICdjZW50ZXInICAgXG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZGlyZWN0aW9uKSB7XG4gICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJnbGl0Y2hcIiwgXCJnbGl0Y2hcIiwgc2xpZGVzKVxuICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBjb25zdCBuZXh0U2xpZGVJbmRleCA9IGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgPyAoY3VycmVudCA9PT0gMCA/IHNsaWRlcy5sZW5ndGggOiBjdXJyZW50KSA6IChjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSA/IDEgOiBjdXJyZW50ICsgMik7XG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4ICsgNn0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4LCBkaXJlY3Rpb24pO1xuICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleH0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4LCBkaXJlY3Rpb24pO1xuICAgICAgICAgfVxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikgfHwgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgIHN1YnRpdGxlc0luaXQoc3VidGl0bGVzLCBzbGlkZXMpXG4gICAgICAgICAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT57XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwicmlnaHQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSwgMTAwMCk7XG4gICAgIH1cblxuICAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcImxlZnRcIikpO1xuICAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xuICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfY3VycmVudFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgN30vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxLCk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDF9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG5cbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpbmRleCA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzSW5pdChzdWJ0aXRsZXMsIHNsaWRlcylcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgIH0pO1xuICAgICB9KTtcbiAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICBzdWJ0aXRsZXNJbml0KHN1YnRpdGxlcywgc2xpZGVzKVxuXG4gfVxuIGZ1bmN0aW9uIHNldFBvcHVwcyhwb3B1cHMsIHBvcHVwQnRucywgY2xvc2VCdG5zKXtcbiAgICBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBvcHVwcylcbiAgICBwb3B1cEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBvcHVwQnRucylcbiAgICBjbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsb3NlQnRucylcblxuICAgIHBvcHVwQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgaWYoZS50YXJnZXQucGFyZW50RWxlbWVudCA9PT0gcG9wdXAucGFyZW50RWxlbWVudCl7XG4gICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSlcbiAgICAgICAgIH0pXG4gICAgIH0pXG4gICAgY2xvc2VCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiB9XG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZVwiKTtcbiAgICBjb25zdCBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlc3RzX19pY29ucy1pdGVtXCIpO1xuICAgIC8vIGlmKHdlZWsgPT09IDEpe1xuICAgIC8vICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgIC8vXG4gICAgLy8gICAgICAgICBpZihpID49IDYgfHwgc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgLy8gICAgICAgICAgICAgc2xpZGUucmVtb3ZlKClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT57XG4gICAgLy8gICAgICAgICBpZihpID49IDYgfHwgaWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAvLyAgICAgICAgICAgICBpY29uLnJlbW92ZSgpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxuICAgIC8vIGlmKHdlZWsgPT09IDIpe1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2OyBpKyspe1xuICAgIC8vICAgICAgICAgbGV0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnF1ZXN0JHtpfWApXG4gICAgLy8gICAgICAgICB3ZWVrMS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKClcbiAgICAvLyAgICAgICAgIH0pXG4gICAgLy9cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICBsZXQgcXVlc3RzUGF0aCA9IFwiLi9pbWcvcXVlc3RzL3NsaWRlXCJcbiAgICBmdW5jdGlvbiBjaGVja01lZGlhUXVlcmllcyhvbGRQYXRoLCBuZXdQYXRoKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk2MDAgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDYwMHB4KVwiKTtcbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTk1MExhbmRzY2FwZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTUwcHgpIGFuZCAobWF4LWhlaWdodDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIik7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5NjAwLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGRQYXRoXG4gICAgfVxuICAgIHF1ZXN0c1BhdGggPSBjaGVja01lZGlhUXVlcmllcyhxdWVzdHNQYXRoLCBcIi4vaW1nL3F1ZXN0cy9tb2Ivc2xpZGVcIilcblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAxLHF1ZXN0c1BhdGgsIFwicGVycy5wbmdcIiwgbnVsbCwgZmFsc2UsIG51bGwsIFwiLnF1ZXN0c19fc3VidGl0bGVcIiwgdHJ1ZSlcbiAgICBjcmVhdGVTbGlkZXIoXCIucHJpemVfX3NsaWRlXCIsIFwiLnByaXplX19tb3ZlLWxlZnRcIiwgXCIucHJpemVfX21vdmUtcmlnaHRcIiwgXCIucHJpemVfX2ljb25zLWl0ZW1cIiwgMSxcIi4vaW1nL3ByaXplL3NsaWRlXCIsIFwicHJpemUucG5nXCIsIG51bGwsIHRydWUgLCAxMTUwLCBmYWxzZSlcbiAgICBzZXRQb3B1cHMoXCIuZ3VpZGVfX2luZm9cIiwgXCIuZ3VpZGVfX2luZm8tYnRuXCIsIFwiLmd1aWRlX19pbmZvLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnByaXplX19zbGlkZS1wb3B1cFwiLCBcIi5wcml6ZV9fc2xpZGUtaW5mby1idG5cIiwgXCIucHJpemVfX3NsaWRlLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnRhYmxlX19pbmZvLXBvcHVwXCIsIFwiLnRhYmxlX19pbmZvXCIsIFwiLnRhYmxlX19pbmZvLWNsb3NlXCIpXG5cbiAgICBjb25zdCB0YWJsZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19saXN0LWl0ZW1cIilcbiAgICBjb25zdCB0YWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19pdGVtXCIpXG5cbiAgICB0YWJsZVRhYnMuZm9yRWFjaCgodGFiLCB0YWJJbmRleCkgPT57XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgdGFibGVUYWJzLmZvckVhY2goKGl0ZW0pID0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGFibGVzLmZvckVhY2goKHRhYmxlLCB0YWJsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaWYodGFibGVJbmRleCA9PT0gIHRhYkluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IHByaXplUmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLXJpZ2h0XCIpXG4gICAgY29uc3QgcHJpemVMZWZ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcml6ZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3QgcHJpemVQb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaXplX19zbGlkZS1wb3B1cFwiKVxuXG4gICAgZnVuY3Rpb24gY2xvc2VEcm9wKGRyb3BzKXtcbiAgICAgICAgZHJvcHMuZm9yRWFjaChkcm9wID0+e1xuICAgICAgICAgICAgZHJvcC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHByaXplUmlnaHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBjbG9zZURyb3AocHJpemVQb3B1cHMpXG4gICAgfSlcbiAgICBwcml6ZUxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBjbG9zZURyb3AocHJpemVQb3B1cHMpXG4gICAgfSlcblxuLy8vINCw0L3RltC80LDRhtGW0Y8g0LTQuNC90LDQvNGW0YfQvdC+0LPQviDQvdCw0LHQvtGA0YMg0YLQtdC60YHRglxuICAgIGZ1bmN0aW9uIGR5bmFtaWNUeXBld3JpdGVyKGVsZW1lbnQsIHNwZWVkLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB0ZXh0QXJyYXkgPSBlbGVtZW50LnRleHRDb250ZW50LnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oXFxzKykvKS5maWx0ZXIoZnVuY3Rpb24gKF9jaGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NoYXIudHJpbSgpICE9PSAnJyB8fCBfY2hhciA9PT0gJyAnO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHdvcmRJbmRleCA9IDA7XG4gICAgICAgIGxldCBjaGFySW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudFRleHQgPSAnJztcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJfb3BhY2l0eVwiKVxuXG4gICAgICAgIGZ1bmN0aW9uIHR5cGVXb3JkKCkge1xuICAgICAgICAgICAgaWYgKHdvcmRJbmRleCA9PT0gbGl0QXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V29yZCA9IHRleHRBcnJheVt3b3JkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50V29yZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKGNoYXJJbmRleCA8IGN1cnJlbnRXb3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IGN1cnJlbnRXb3JkLmNoYXJBdChjaGFySW5kZXgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSAnICc7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHdvcmRJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG4gICAgICAgIHR5cGVXb3JkKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50cyh0eXBlRWxlbXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnksIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY1R5cGV3cml0ZXIoZW50cnkudGFyZ2V0LCAzNSwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHR5cGVFbGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHR5cGVBbmltID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYW5pbScpO1xuICAgIG9ic2VydmVFbGVtZW50cyh0eXBlQW5pbSk7XG5cbi8vLyBwcm9ncmVzcyBiYXIg0LDQvdGW0LzQsNGG0ZbRj1xuICAgIGZ1bmN0aW9uIHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbil7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbiA8PSAxMDApe1xuICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgZWxlbVdyYXAuaW5uZXJUZXh0ID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICArK2N1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRQb3NpdGlvbiA+PSAxMDApe1xuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uID0gc3RhcnRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy1iYXJcIilcbiAgICBjb25zdCBwcm9ncmVzc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLXRleHRcIilcblxuICAgIHByb2dyZXNzQW5pbSg0MCwgcHJvZ3Jlc3NCYXIsIHByb2dyZXNzV3JhcCwgNDApXG5cbi8vIHBvcHVwc1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19idG5cIilcbiAgICBjb25zdCBjbG9zZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzX19jbG9zZVwiKVxuICAgIGNvbnN0IHBvcHVwc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc1wiKVxuXG4gICAgdGFibGVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LmFkZChcIl90YWJsZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG4gICAgfSlcbiAgICBjbG9zZVBvcHVwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl90YWJsZVwiKVxuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG5cbi8vIGZvciB0ZXN0XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbi1sbmdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJlblwiKVxuICAgIH0pXG5cbiAgICBjb25zdCBkb25lUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvbmUtcG9wdXBcIilcblxuICAgIGRvbmVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cbiAgICBjb25zdCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazFcIik7XG4gICAgY29uc3Qgd2VlazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsyXCIpO1xuXG4gICAgd2VlazEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDEpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHdlZWsyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAyKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG59KVxuXG4iXX0=
