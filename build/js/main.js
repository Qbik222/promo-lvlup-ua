"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener("DOMContentLoaded", function () {
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
    infoSlidesMobPopup.forEach(function (item) {
      if (item.parentElement.parentElement.parentElement !== null) {
        item.classList.remove("_active");
        item.parentElement.parentElement.parentElement.classList.remove("_active");
        item.classList.remove("_active");
      }
    });
  });
  slideBtnRight.addEventListener("click", function () {
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
      console.log(week);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2VlayIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUludCIsImluZm9TbGlkZXNNb2IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5mb1NsaWRlc01vYlBvcHVwIiwic2xpZGVCdG5MZWZ0IiwicXVlcnlTZWxlY3RvciIsInNsaWRlQnRuUmlnaHQiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4SXRlbSIsInBvcHVwIiwiaW5kZXhQb3B1cCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJmbG93T2ZmV2lkdGgiLCJjb3ZlcmZsb3dUb2dnbGVyIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImNvdmVyRmxvd0NsYXNzZXMiLCJyaWdodCIsImxlZnQiLCJzbGlkZSIsImkiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGVuZ3RoIiwiYWRkIiwibmV4dFNpYmxpbmciLCJjb25zb2xlIiwibG9nIiwiZ2xpdGNoTGF5ZXJzIiwidXBkYXRlR2xpdGNoTGF5ZXJzIiwiaW5kZXgiLCJsYXllciIsImNsYXNzTmFtZSIsInN0YXJ0c1dpdGgiLCJzdHlsZSIsImJhY2tncm91bmQiLCJtb3ZlU2xpZGVyIiwiZGlyZWN0aW9uIiwiU2xpZGVJY29uc0luaXQiLCJpY29ucyIsImljb24iLCJpY29uSW5kZXgiLCJoYW5kbGVDbGljayIsInBvaW50ZXJFdmVudHMiLCJuZXh0U2xpZGVJbmRleCIsInNldFRpbWVvdXQiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZXRQb3B1cHMiLCJwb3B1cHMiLCJwb3B1cEJ0bnMiLCJjbG9zZUJ0bnMiLCJidG4iLCJ3ZWVrMSIsInF1ZXN0c1BhdGgiLCJjaGVja01lZGlhUXVlcmllcyIsIm9sZFBhdGgiLCJuZXdQYXRoIiwibWVkaWFRdWVyeTYwMCIsIm1hdGNoTWVkaWEiLCJtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlIiwibWF0Y2hlcyIsInRhYmxlVGFicyIsInRhYmxlcyIsInRhYiIsInRhYkluZGV4IiwidGFibGUiLCJ0YWJsZUluZGV4IiwiZHluYW1pY1R5cGV3cml0ZXIiLCJlbGVtZW50Iiwic3BlZWQiLCJjYWxsYmFjayIsInRleHRBcnJheSIsInRleHRDb250ZW50IiwidHJpbSIsInNwbGl0IiwibGl0QXJyIiwiam9pbiIsImZpbHRlciIsIl9jaGFyIiwid29yZEluZGV4IiwiY2hhckluZGV4IiwiY3VycmVudFRleHQiLCJ0eXBlV29yZCIsImN1cnJlbnRXb3JkIiwidW5kZWZpbmVkIiwiY2hhckF0IiwiaW5uZXJUZXh0Iiwib2JzZXJ2ZUVsZW1lbnRzIiwidHlwZUVsZW1zIiwib3B0aW9ucyIsInJvb3QiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJvYnNlcnZlIiwidHlwZUFuaW0iLCJwcm9ncmVzc0FuaW0iLCJzdGFydCIsImVsZW0iLCJlbGVtV3JhcCIsImN1cnJlbnRQb3NpdGlvbiIsIndpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1dyYXAiLCJ0YWJsZVBvcHVwQnRuIiwiY2xvc2VQb3B1cHMiLCJwb3B1cHNXcmFwIiwiYm9keSIsImRvbmVQb3B1cEJ0biIsIndlZWsyIiwic2V0SXRlbSIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFDL0MsSUFBSUMsSUFBSSxHQUFHQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBR0MsUUFBUSxDQUFDRixZQUFZLENBQUND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REQsUUFBUSxDQUFDVSxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUNPLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQztFQUM5RCxDQUFDLENBQUM7RUFFRixJQUFNaUgsWUFBWSxHQUFHbkksUUFBUSxDQUFDVSxhQUFhLENBQUMsYUFBYSxDQUFDO0VBRTFEeUgsWUFBWSxDQUFDbEksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7SUFDeENnSSxVQUFVLENBQUNoSCxTQUFTLENBQUNDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDcENsQixRQUFRLENBQUNrSSxJQUFJLENBQUNqSCxTQUFTLENBQUNDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztFQUV0RCxDQUFDLENBQUM7RUFFRixJQUFNcUQsS0FBSyxHQUFHdkUsUUFBUSxDQUFDVSxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzlDLElBQU0wSCxLQUFLLEdBQUdwSSxRQUFRLENBQUNVLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFOUM2RCxLQUFLLENBQUN0RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0UsWUFBWSxDQUFDa0ksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGSCxLQUFLLENBQUNuSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0UsWUFBWSxDQUFDa0ksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUdOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLW1vYlwiKVxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2JQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tYm90dG9tXCIpXG4gICAgY29uc3Qgc2xpZGVCdG5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3Qgc2xpZGVCdG5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtcmlnaHRcIilcblxuICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaCgoaXRlbSwgaW5kZXhJdGVtKSA9PntcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaCgocG9wdXAsIGluZGV4UG9wdXApPT57XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SXRlbSA9PT0gaW5kZXhQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgc2xpZGVCdG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuICAgIHNsaWRlQnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbi8vLyDQs9C70ZbRhyDRgdC70LDQudC00LXRgFxuIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcihzbGlkZXMsIGxlZnRCdG4sIHJpZ2h0QnRuLCBzbGlkZXNJY29ucywgY3VycmVudCwgcGF0aCwgaW1nLCB3ZWVrLCBjb3ZlcmZsb3csIGNvdmVyZmxvd09mZldpZHRoKXtcblxuICAgICBsZXQgY292ZXJmbG93VG9nZ2xlciA9IHRydWVcblxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICAgICAgLy8gY29uc29sZS5sb2coY292ZXJmbG93VG9nZ2xlcilcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgICAgICAgICAgIGlmKGNvdmVyZmxvd1RvZ2dsZXIpe1xuICAgICAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgICAgICAgICAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIHNsaWRlcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAvLyBpZihpICE9PSBjdXJyZW50ICsgMSAmJiBpICE9PSBzbGlkZXMubGVuZ3RoICYmIGkgIT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHJpZ2h0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKGxlZnQpXG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIGkpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZylcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhpLCBjdXJyZW50KVxuICAgICAgICAgICAgIC8vIGlmKGkgPT09IGN1cnJlbnQgKyAxKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxICYmIGkgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gZWxzZXtcblxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgLy8gaWYoc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0WzFdID09PSBcIl9hY3RpdmVcIil7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdFsxXSA9PT0gXCJfYWN0aXZlXCIpe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgIH0pO1xuICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHVwZGF0ZUdsaXRjaExheWVycyhwYXRoLCBpbmRleCkge1xuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgaW5kZXggKz0gNlxuICAgICAgICAgfVxuICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXG4gICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgaWYgKGxheWVyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMF0gIT09IFwic2xpZGVfX2luZm9cIikge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGBxdWVzdCR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbikge1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAtLWN1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAwKSBjdXJyZW50ID0gc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICAgKytjdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzLmxlbmd0aCAtIDEpIGN1cnJlbnQgPSAwO1xuICAgICAgICAgfVxuXG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgfSk7XG5cbiAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIFNsaWRlSWNvbnNJbml0KGljb25zLCBjdXJyZW50KSB7XG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHdlZWspXG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4ICsgNn0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4KTtcbiAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXh9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSwgMTAwMCk7XG4gICAgIH1cblxuICAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcImxlZnRcIikpO1xuICAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xuICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfY3VycmVudFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgN30vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICB9KTtcbiAgICAgfSk7XG5cbiAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuXG4gfVxuIGZ1bmN0aW9uIHNldFBvcHVwcyhwb3B1cHMsIHBvcHVwQnRucywgY2xvc2VCdG5zKXtcbiAgICBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBvcHVwcylcbiAgICBwb3B1cEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBvcHVwQnRucylcbiAgICBjbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsb3NlQnRucylcblxuICAgIHBvcHVwQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgaWYoZS50YXJnZXQucGFyZW50RWxlbWVudCA9PT0gcG9wdXAucGFyZW50RWxlbWVudCl7XG4gICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSlcbiAgICAgICAgIH0pXG4gICAgIH0pXG4gICAgY2xvc2VCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiB9XG5cblxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVcIik7XG5cbiAgICBjb25zdCBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlc3RzX19pY29ucy1pdGVtXCIpO1xuICAgIGlmKHdlZWsgPT09IDEpe1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuXG4gICAgICAgICAgICBpZihpID49IDYgfHwgc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT57XG4gICAgICAgICAgICBpZihpID49IDYgfHwgaWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAgICAgICAgICAgICBpY29uLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2OyBpKyspe1xuICAgICAgICAgICAgbGV0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnF1ZXN0JHtpfWApXG4gICAgICAgICAgICB3ZWVrMS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBxdWVzdHNQYXRoID0gXCIuL2ltZy9xdWVzdHMvc2xpZGVcIlxuXG4gICAgZnVuY3Rpb24gY2hlY2tNZWRpYVF1ZXJpZXMob2xkUGF0aCwgbmV3UGF0aCkge1xuXG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk2MDAgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDYwMHB4KVwiKTtcblxuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5NTBweCkgYW5kIChtYXgtaGVpZ2h0OiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVwiKTtcblxuICAgICAgICBpZiAobWVkaWFRdWVyeTYwMC5tYXRjaGVzKSB7XG5cbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9sZFBhdGhcbiAgICB9XG5cblxuXG5cbiAgICBxdWVzdHNQYXRoID0gY2hlY2tNZWRpYVF1ZXJpZXMocXVlc3RzUGF0aCwgXCIuL2ltZy9xdWVzdHMvbW9iL3NsaWRlXCIpXG4gICAgY29uc29sZS5sb2cocXVlc3RzUGF0aClcblxuXG4gICAgY3JlYXRlU2xpZGVyKFwiLnNsaWRlXCIsIFwiLnNsaWRlX19tb3ZlLWxlZnRcIiwgXCIuc2xpZGVfX21vdmUtcmlnaHRcIiwgXCIucXVlc3RzX19pY29ucy1pdGVtXCIsIDEscXVlc3RzUGF0aCwgXCJwZXJzLnBuZ1wiLCB3ZWVrIClcbiAgICBjcmVhdGVTbGlkZXIoXCIucHJpemVfX3NsaWRlXCIsIFwiLnByaXplX19tb3ZlLWxlZnRcIiwgXCIucHJpemVfX21vdmUtcmlnaHRcIiwgXCIucHJpemVfX2ljb25zLWl0ZW1cIiwgMSxcIi4vaW1nL3ByaXplL3NsaWRlXCIsIFwicHJpemUucG5nXCIsIG51bGwsIHRydWUgLCAxMTUwKVxuXG4gICAgc2V0UG9wdXBzKFwiLmd1aWRlX19pbmZvXCIsIFwiLmd1aWRlX19pbmZvLWJ0blwiLCBcIi5ndWlkZV9faW5mby1jbG9zZVwiKVxuICAgIHNldFBvcHVwcyhcIi5wcml6ZV9fc2xpZGUtcG9wdXBcIiwgXCIucHJpemVfX3NsaWRlLWluZm8tYnRuXCIsIFwiLnByaXplX19zbGlkZS1jbG9zZVwiKVxuXG4gICAgY29uc3QgdGFibGVUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fbGlzdC1pdGVtXCIpXG4gICAgY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9faXRlbVwiKVxuXG4gICAgdGFibGVUYWJzLmZvckVhY2goKHRhYiwgdGFiSW5kZXgpID0+e1xuICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIHRhYmxlVGFicy5mb3JFYWNoKChpdGVtKSA9PntcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRhYmxlcy5mb3JFYWNoKCh0YWJsZSwgdGFibGVJbmRleCkgPT57XG4gICAgICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGlmKHRhYmxlSW5kZXggPT09ICB0YWJJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxuLy8vINCw0L3RltC80LDRhtGW0Y8g0LTQuNC90LDQvNGW0YfQvdC+0LPQviDQvdCw0LHQvtGA0YMg0YLQtdC60YHRglxuICAgIGZ1bmN0aW9uIGR5bmFtaWNUeXBld3JpdGVyKGVsZW1lbnQsIHNwZWVkLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB0ZXh0QXJyYXkgPSBlbGVtZW50LnRleHRDb250ZW50LnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAvLyBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oPzw9XFxTKSg/PVxccyl8KD89XFxTKS8pLmZpbHRlcihjaGFyID0+IGNoYXIgIT09ICcnKTtcbiAgICAgICAgY29uc3QgbGl0QXJyID0gdGV4dEFycmF5LmpvaW4oJyAnKS5zcGxpdCgvKFxccyspLykuZmlsdGVyKGZ1bmN0aW9uIChfY2hhcikge1xuICAgICAgICAgICAgcmV0dXJuIF9jaGFyLnRyaW0oKSAhPT0gJycgfHwgX2NoYXIgPT09ICcgJztcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB3b3JkSW5kZXggPSAwO1xuICAgICAgICBsZXQgY2hhckluZGV4ID0gMDtcbiAgICAgICAgbGV0IGN1cnJlbnRUZXh0ID0gJyc7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiX29wYWNpdHlcIilcblxuICAgICAgICBmdW5jdGlvbiB0eXBlV29yZCgpIHtcbiAgICAgICAgICAgIGlmICh3b3JkSW5kZXggPT09IGxpdEFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudFdvcmQgPSB0ZXh0QXJyYXlbd29yZEluZGV4XTtcblxuICAgICAgICAgICAgaWYoY3VycmVudFdvcmQgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG5cbiAgICAgICAgICAgIGlmIChjaGFySW5kZXggPCBjdXJyZW50V29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSBjdXJyZW50V29yZC5jaGFyQXQoY2hhckluZGV4KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gJyAnO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB3b3JkSW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG5cbiAgICAgICAgdHlwZVdvcmQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvYnNlcnZlRWxlbWVudHModHlwZUVsZW1zKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICByb290OiBudWxsLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnksIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY1R5cGV3cml0ZXIoZW50cnkudGFyZ2V0LCAzNSwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdHlwZUVsZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlQW5pbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBlLWFuaW0nKTtcbiAgICBvYnNlcnZlRWxlbWVudHModHlwZUFuaW0pO1xuXG4vLy8gcHJvZ3Jlc3MgYmFyINCw0L3RltC80LDRhtGW0Y9cbiAgICBmdW5jdGlvbiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pe1xuICAgICAgICBpZihjdXJyZW50UG9zaXRpb24gPD0gMTAwKXtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgIGVsZW1XcmFwLmlubmVyVGV4dCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgKytjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9ZWxzZSBpZihjdXJyZW50UG9zaXRpb24gPj0gMTAwKXtcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHN0YXJ0XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtYmFyXCIpXG4gICAgY29uc3QgcHJvZ3Jlc3NXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy10ZXh0XCIpXG5cbiAgICBwcm9ncmVzc0FuaW0oNDAsIHByb2dyZXNzQmFyLCBwcm9ncmVzc1dyYXAsIDQwKVxuXG4vLyBwb3B1cHNcbiAgICBjb25zdCB0YWJsZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fYnRuXCIpXG4gICAgY29uc3QgY2xvc2VQb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19fY2xvc2VcIilcbiAgICBjb25zdCBwb3B1cHNXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNcIilcblxuICAgIHRhYmxlUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5hZGQoXCJfdGFibGVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiX292ZXJmbG93LWhpZGRlblwiKVxuICAgIH0pXG4gICAgY2xvc2VQb3B1cHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfdGFibGVcIilcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuXG4vLyBmb3IgdGVzdFxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmtcIilcbiAgICB9KVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW4tbG5nXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiZW5cIilcbiAgICB9KVxuXG4gICAgY29uc3QgZG9uZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb25lLXBvcHVwXCIpXG5cbiAgICBkb25lUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC50b2dnbGUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG4gICAgY29uc3Qgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsxXCIpO1xuICAgIGNvbnN0IHdlZWsyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMlwiKTtcblxuICAgIHdlZWsxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAxKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICB3ZWVrMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMik7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG5cbn0pXG5cbiJdfQ==
