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
  var prizePopups = document.querySelectorAll(".rize__slide-popup");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2VlayIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUludCIsImluZm9TbGlkZXNNb2IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5mb1NsaWRlc01vYlBvcHVwIiwic2xpZGVCdG5MZWZ0IiwicXVlcnlTZWxlY3RvciIsInNsaWRlQnRuUmlnaHQiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4SXRlbSIsInBvcHVwIiwiaW5kZXhQb3B1cCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInBhcmVudEVsZW1lbnQiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiY3JlYXRlU2xpZGVyIiwic2xpZGVzIiwibGVmdEJ0biIsInJpZ2h0QnRuIiwic2xpZGVzSWNvbnMiLCJjdXJyZW50IiwicGF0aCIsImltZyIsImNvdmVyZmxvdyIsImNvdmVyZmxvd09mZldpZHRoIiwiY292ZXJmbG93VG9nZ2xlciIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjb3ZlckZsb3dDbGFzc2VzIiwicmlnaHQiLCJsZWZ0Iiwic2xpZGUiLCJpIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxlbmd0aCIsImFkZCIsIm5leHRTaWJsaW5nIiwiY29uc29sZSIsImxvZyIsImdsaXRjaExheWVycyIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwibmV4dFNsaWRlSW5kZXgiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZXRQb3B1cHMiLCJwb3B1cHMiLCJwb3B1cEJ0bnMiLCJjbG9zZUJ0bnMiLCJidG4iLCJ3ZWVrMSIsInF1ZXN0c1BhdGgiLCJjaGVja01lZGlhUXVlcmllcyIsIm9sZFBhdGgiLCJuZXdQYXRoIiwibWVkaWFRdWVyeTYwMCIsIm1hdGNoTWVkaWEiLCJtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlIiwibWF0Y2hlcyIsInRhYmxlVGFicyIsInRhYmxlcyIsInRhYiIsInRhYkluZGV4IiwidGFibGUiLCJ0YWJsZUluZGV4IiwicHJpemVSaWdodEJ0biIsInByaXplTGVmdEJ0biIsInByaXplUG9wdXBzIiwiY2xvc2VEcm9wIiwiZHJvcHMiLCJkcm9wIiwiZHluYW1pY1R5cGV3cml0ZXIiLCJlbGVtZW50Iiwic3BlZWQiLCJjYWxsYmFjayIsInRleHRBcnJheSIsInRleHRDb250ZW50IiwidHJpbSIsInNwbGl0IiwibGl0QXJyIiwiam9pbiIsImZpbHRlciIsIl9jaGFyIiwid29yZEluZGV4IiwiY2hhckluZGV4IiwiY3VycmVudFRleHQiLCJ0eXBlV29yZCIsImN1cnJlbnRXb3JkIiwidW5kZWZpbmVkIiwiY2hhckF0IiwiaW5uZXJUZXh0Iiwib2JzZXJ2ZUVsZW1lbnRzIiwidHlwZUVsZW1zIiwib3B0aW9ucyIsInJvb3QiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJvYnNlcnZlIiwidHlwZUFuaW0iLCJwcm9ncmVzc0FuaW0iLCJzdGFydCIsImVsZW0iLCJlbGVtV3JhcCIsImN1cnJlbnRQb3NpdGlvbiIsIndpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1dyYXAiLCJ0YWJsZVBvcHVwQnRuIiwiY2xvc2VQb3B1cHMiLCJwb3B1cHNXcmFwIiwiYm9keSIsImRvbmVQb3B1cEJ0biIsIndlZWsyIiwic2V0SXRlbSIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFDL0MsSUFB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QUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQkMsUUFBUSxDQUFDQyxNQUFNLEVBQUU7RUFDckIsQ0FBQyxDQUFDO0FBR04sQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PntcbiAgICBsZXQgd2VlayA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2Vla1wiKSA/IHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2Vla1wiKSkgOiAxO1xuXG4gICAgY29uc3QgaW5mb1NsaWRlc01vYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tbW9iXCIpXG4gICAgY29uc3QgaW5mb1NsaWRlc01vYlBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1ib3R0b21cIilcbiAgICBjb25zdCBzbGlkZUJ0bkxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBzbGlkZUJ0blJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1yaWdodFwiKVxuXG4gICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKChpdGVtLCBpbmRleEl0ZW0pID0+e1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKChwb3B1cCwgaW5kZXhQb3B1cCk9PntcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhJdGVtID09PSBpbmRleFBvcHVwKXtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHNsaWRlQnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgfSlcbiAgICBzbGlkZUJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuXG4vLy8g0LPQu9GW0Ycg0YHQu9Cw0LnQtNC10YBcbiBmdW5jdGlvbiBjcmVhdGVTbGlkZXIoc2xpZGVzLCBsZWZ0QnRuLCByaWdodEJ0biwgc2xpZGVzSWNvbnMsIGN1cnJlbnQsIHBhdGgsIGltZywgd2VlaywgY292ZXJmbG93LCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG5cbiAgICAgbGV0IGNvdmVyZmxvd1RvZ2dsZXIgPSB0cnVlXG5cbiAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG4gICAgICAgICBjb3ZlcmZsb3dUb2dnbGVyID0gZmFsc2VcbiAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvdmVyZmxvd1RvZ2dsZXIpXG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBjb3ZlckZsb3dDbGFzc2VzKHJpZ2h0LCBsZWZ0LCBzbGlkZXMpe1xuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3dUb2dnbGVyKXtcbiAgICAgICAgICAgICAgICAgaWYoY3VycmVudCA9PT0gaSl7XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtMV0uY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGlmKHNsaWRlLm5leHRTaWJsaW5nID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNbMF0uY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50LCBzbGlkZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgLy8gaWYoaSAhPT0gY3VycmVudCArIDEgJiYgaSAhPT0gc2xpZGVzLmxlbmd0aCAmJiBpICE9PSAwKXtcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShyaWdodClcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShsZWZ0KVxuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhjdXJyZW50LCBpKVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihjdXJyZW50ID09PSAwKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgLy8gLy8gY29uc29sZS5sb2coaSwgY3VycmVudClcbiAgICAgICAgICAgICAvLyBpZihpID09PSBjdXJyZW50ICsgMSl7XG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdClcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSAmJiBpID09PSAwKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGVsc2V7XG5cbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgIC8vIGlmKHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdFsxXSA9PT0gXCJfYWN0aXZlXCIpe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3RbMV0gPT09IFwiX2FjdGl2ZVwiKXtcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgIH0pXG4gICAgIH1cbiAgICAgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXMpO1xuICAgICBsZWZ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihsZWZ0QnRuKTtcbiAgICAgcmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJpZ2h0QnRuKTtcbiAgICAgc2xpZGVzSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlc0ljb25zKTtcbiAgICAgbGV0IGdsaXRjaExheWVycyA9IFtdO1xuICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgICBnbGl0Y2hMYXllcnMgPSBbLi4uZ2xpdGNoTGF5ZXJzLCAuLi5zbGlkZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmdsaXRjaF9fbGF5ZXJcIildO1xuICAgICB9KTtcbiAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgIH1cblxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIGluZGV4ICs9IDZcbiAgICAgICAgIH1cbiAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxuICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIGlmIChsYXllci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzBdICE9PSBcInNsaWRlX19pbmZvXCIpIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChgcXVlc3Qke2luZGV4fWApO1xuICAgICAgICAgICAgICAgICBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gcGF0aDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIG1vdmVTbGlkZXIoc2xpZGVzLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgLS1jdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50IDwgMCkgY3VycmVudCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICsrY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHNsaWRlcy5sZW5ndGggLSAxKSBjdXJyZW50ID0gMDtcbiAgICAgICAgIH1cblxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaSA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBTbGlkZUljb25zSW5pdChpY29ucywgY3VycmVudCkge1xuICAgICAgICAgaWNvbnMuZm9yRWFjaCgoaWNvbiwgaWNvbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiX2N1cnJlbnRcIiwgY3VycmVudCA9PT0gaWNvbkluZGV4KTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZGlyZWN0aW9uKSB7XG4gICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJnbGl0Y2hcIiwgXCJnbGl0Y2hcIiwgc2xpZGVzKVxuICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBjb25zdCBuZXh0U2xpZGVJbmRleCA9IGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgPyAoY3VycmVudCA9PT0gMCA/IHNsaWRlcy5sZW5ndGggOiBjdXJyZW50KSA6IChjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSA/IDEgOiBjdXJyZW50ICsgMik7XG4gICAgICAgICBjb25zb2xlLmxvZyh3ZWVrKVxuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleCArIDZ9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICAgfVxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikgfHwgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT57XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwicmlnaHQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0sIDEwMDApO1xuICAgICB9XG5cbiAgICAgbGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJsZWZ0XCIpKTtcbiAgICAgcmlnaHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwicmlnaHRcIikpO1xuXG4gICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+IHtcbiAgICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2N1cnJlbnRcIikpIHJldHVyblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2N1cnJlbnRcIikpO1xuICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgY3VycmVudCA9IGk7XG4gICAgICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDd9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDF9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG5cbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpbmRleCA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgfSk7XG4gICAgIH0pO1xuXG4gICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcblxuIH1cbiBmdW5jdGlvbiBzZXRQb3B1cHMocG9wdXBzLCBwb3B1cEJ0bnMsIGNsb3NlQnRucyl7XG4gICAgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cHMpXG4gICAgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cEJ0bnMpXG4gICAgY2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbG9zZUJ0bnMpXG5cbiAgICBwb3B1cEJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgIGlmKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgPT09IHBvcHVwLnBhcmVudEVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuICAgIGNsb3NlQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICB9KSlcbiAgICAgICAgIH0pXG4gICAgIH0pXG4gfVxuXG5cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuXG4gICAgY29uc3Qgc2xpZGVzSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiKTtcbiAgICBpZih3ZWVrID09PSAxKXtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcblxuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IHNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgaWNvbi5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKXtcbiAgICAgICAgICAgIGxldCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5xdWVzdCR7aX1gKVxuICAgICAgICAgICAgd2VlazEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlc3RzUGF0aCA9IFwiLi9pbWcvcXVlc3RzL3NsaWRlXCJcblxuICAgIGZ1bmN0aW9uIGNoZWNrTWVkaWFRdWVyaWVzKG9sZFBhdGgsIG5ld1BhdGgpIHtcblxuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5NjAwID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2MDBweClcIik7XG5cbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTk1MExhbmRzY2FwZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTUwcHgpIGFuZCAobWF4LWhlaWdodDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIik7XG5cbiAgICAgICAgaWYgKG1lZGlhUXVlcnk2MDAubWF0Y2hlcykge1xuXG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvbGRQYXRoXG4gICAgfVxuXG5cblxuXG4gICAgcXVlc3RzUGF0aCA9IGNoZWNrTWVkaWFRdWVyaWVzKHF1ZXN0c1BhdGgsIFwiLi9pbWcvcXVlc3RzL21vYi9zbGlkZVwiKVxuICAgIGNvbnNvbGUubG9nKHF1ZXN0c1BhdGgpXG5cblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAxLHF1ZXN0c1BhdGgsIFwicGVycy5wbmdcIiwgd2VlayApXG4gICAgY3JlYXRlU2xpZGVyKFwiLnByaXplX19zbGlkZVwiLCBcIi5wcml6ZV9fbW92ZS1sZWZ0XCIsIFwiLnByaXplX19tb3ZlLXJpZ2h0XCIsIFwiLnByaXplX19pY29ucy1pdGVtXCIsIDEsXCIuL2ltZy9wcml6ZS9zbGlkZVwiLCBcInByaXplLnBuZ1wiLCBudWxsLCB0cnVlICwgMTE1MClcblxuICAgIHNldFBvcHVwcyhcIi5ndWlkZV9faW5mb1wiLCBcIi5ndWlkZV9faW5mby1idG5cIiwgXCIuZ3VpZGVfX2luZm8tY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIsIFwiLnByaXplX19zbGlkZS1pbmZvLWJ0blwiLCBcIi5wcml6ZV9fc2xpZGUtY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIudGFibGVfX2luZm8tcG9wdXBcIiwgXCIudGFibGVfX2luZm9cIiwgXCIudGFibGVfX2luZm8tY2xvc2VcIilcblxuICAgIGNvbnN0IHRhYmxlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2xpc3QtaXRlbVwiKVxuICAgIGNvbnN0IHRhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2l0ZW1cIilcblxuICAgIHRhYmxlVGFicy5mb3JFYWNoKCh0YWIsIHRhYkluZGV4KSA9PntcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCgodGFibGUsIHRhYmxlSW5kZXgpID0+e1xuICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZih0YWJsZUluZGV4ID09PSAgdGFiSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgcHJpemVSaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtcmlnaHRcIilcbiAgICBjb25zdCBwcml6ZUxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBwcml6ZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucml6ZV9fc2xpZGUtcG9wdXBcIilcblxuICAgIGZ1bmN0aW9uIGNsb3NlRHJvcChkcm9wcyl7XG4gICAgICAgIGRyb3BzLmZvckVhY2goZHJvcCA9PntcbiAgICAgICAgICAgIGRyb3AuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXplUmlnaHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBjbG9zZURyb3AocHJpemVQb3B1cHMpXG4gICAgfSlcbiAgICBwcml6ZUxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBjbG9zZURyb3AocHJpemVQb3B1cHMpXG4gICAgfSlcblxuLy8vINCw0L3RltC80LDRhtGW0Y8g0LTQuNC90LDQvNGW0YfQvdC+0LPQviDQvdCw0LHQvtGA0YMg0YLQtdC60YHRglxuICAgIGZ1bmN0aW9uIGR5bmFtaWNUeXBld3JpdGVyKGVsZW1lbnQsIHNwZWVkLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB0ZXh0QXJyYXkgPSBlbGVtZW50LnRleHRDb250ZW50LnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAvLyBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oPzw9XFxTKSg/PVxccyl8KD89XFxTKS8pLmZpbHRlcihjaGFyID0+IGNoYXIgIT09ICcnKTtcbiAgICAgICAgY29uc3QgbGl0QXJyID0gdGV4dEFycmF5LmpvaW4oJyAnKS5zcGxpdCgvKFxccyspLykuZmlsdGVyKGZ1bmN0aW9uIChfY2hhcikge1xuICAgICAgICAgICAgcmV0dXJuIF9jaGFyLnRyaW0oKSAhPT0gJycgfHwgX2NoYXIgPT09ICcgJztcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB3b3JkSW5kZXggPSAwO1xuICAgICAgICBsZXQgY2hhckluZGV4ID0gMDtcbiAgICAgICAgbGV0IGN1cnJlbnRUZXh0ID0gJyc7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiX29wYWNpdHlcIilcblxuICAgICAgICBmdW5jdGlvbiB0eXBlV29yZCgpIHtcbiAgICAgICAgICAgIGlmICh3b3JkSW5kZXggPT09IGxpdEFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudFdvcmQgPSB0ZXh0QXJyYXlbd29yZEluZGV4XTtcblxuICAgICAgICAgICAgaWYoY3VycmVudFdvcmQgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG5cbiAgICAgICAgICAgIGlmIChjaGFySW5kZXggPCBjdXJyZW50V29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSBjdXJyZW50V29yZC5jaGFyQXQoY2hhckluZGV4KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gJyAnO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB3b3JkSW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R5cGV3cml0ZXItY3Vyc29yJyk7XG5cbiAgICAgICAgdHlwZVdvcmQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvYnNlcnZlRWxlbWVudHModHlwZUVsZW1zKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICByb290OiBudWxsLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnksIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY1R5cGV3cml0ZXIoZW50cnkudGFyZ2V0LCAzNSwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdHlwZUVsZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlQW5pbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBlLWFuaW0nKTtcbiAgICBvYnNlcnZlRWxlbWVudHModHlwZUFuaW0pO1xuXG4vLy8gcHJvZ3Jlc3MgYmFyINCw0L3RltC80LDRhtGW0Y9cbiAgICBmdW5jdGlvbiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pe1xuICAgICAgICBpZihjdXJyZW50UG9zaXRpb24gPD0gMTAwKXtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgIGVsZW1XcmFwLmlubmVyVGV4dCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgKytjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9ZWxzZSBpZihjdXJyZW50UG9zaXRpb24gPj0gMTAwKXtcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHN0YXJ0XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtYmFyXCIpXG4gICAgY29uc3QgcHJvZ3Jlc3NXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy10ZXh0XCIpXG5cbiAgICBwcm9ncmVzc0FuaW0oNDAsIHByb2dyZXNzQmFyLCBwcm9ncmVzc1dyYXAsIDQwKVxuXG4vLyBwb3B1cHNcbiAgICBjb25zdCB0YWJsZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fYnRuXCIpXG4gICAgY29uc3QgY2xvc2VQb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19fY2xvc2VcIilcbiAgICBjb25zdCBwb3B1cHNXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNcIilcblxuICAgIHRhYmxlUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5hZGQoXCJfdGFibGVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiX292ZXJmbG93LWhpZGRlblwiKVxuICAgIH0pXG4gICAgY2xvc2VQb3B1cHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfdGFibGVcIilcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuXG4vLyBmb3IgdGVzdFxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmtcIilcbiAgICB9KVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW4tbG5nXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiZW5cIilcbiAgICB9KVxuXG4gICAgY29uc3QgZG9uZVBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb25lLXBvcHVwXCIpXG5cbiAgICBkb25lUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC50b2dnbGUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG4gICAgY29uc3Qgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsxXCIpO1xuICAgIGNvbnN0IHdlZWsyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMlwiKTtcblxuICAgIHdlZWsxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAxKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICB3ZWVrMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMik7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG5cbn0pXG5cbiJdfQ==
