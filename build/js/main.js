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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2VlayIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUludCIsImluZm9TbGlkZXNNb2IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5mb1NsaWRlc01vYlBvcHVwIiwic2xpZGVCdG5MZWZ0IiwicXVlcnlTZWxlY3RvciIsInNsaWRlQnRuUmlnaHQiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4SXRlbSIsInBvcHVwIiwiaW5kZXhQb3B1cCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInBhcmVudEVsZW1lbnQiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiY3JlYXRlU2xpZGVyIiwic2xpZGVzIiwibGVmdEJ0biIsInJpZ2h0QnRuIiwic2xpZGVzSWNvbnMiLCJjdXJyZW50IiwicGF0aCIsImltZyIsImNvdmVyZmxvdyIsImNvdmVyZmxvd09mZldpZHRoIiwiY292ZXJmbG93VG9nZ2xlciIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjb3ZlckZsb3dDbGFzc2VzIiwicmlnaHQiLCJsZWZ0Iiwic2xpZGUiLCJpIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxlbmd0aCIsImFkZCIsIm5leHRTaWJsaW5nIiwiY29uc29sZSIsImxvZyIsImdsaXRjaExheWVycyIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwibmV4dFNsaWRlSW5kZXgiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZXRQb3B1cHMiLCJwb3B1cHMiLCJwb3B1cEJ0bnMiLCJjbG9zZUJ0bnMiLCJidG4iLCJ3ZWVrMSIsInF1ZXN0c1BhdGgiLCJjaGVja01lZGlhUXVlcmllcyIsIm9sZFBhdGgiLCJuZXdQYXRoIiwibWVkaWFRdWVyeTYwMCIsIm1hdGNoTWVkaWEiLCJtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlIiwibWF0Y2hlcyIsInRhYmxlVGFicyIsInRhYmxlcyIsInRhYiIsInRhYkluZGV4IiwidGFibGUiLCJ0YWJsZUluZGV4IiwicHJpemVSaWdodEJ0biIsInByaXplTGVmdEJ0biIsInByaXplUG9wdXBzIiwiY2xvc2VEcm9wIiwiZHJvcHMiLCJkcm9wIiwiZHluYW1pY1R5cGV3cml0ZXIiLCJlbGVtZW50Iiwic3BlZWQiLCJjYWxsYmFjayIsInRleHRBcnJheSIsInRleHRDb250ZW50IiwidHJpbSIsInNwbGl0IiwibGl0QXJyIiwiam9pbiIsImZpbHRlciIsIl9jaGFyIiwid29yZEluZGV4IiwiY2hhckluZGV4IiwiY3VycmVudFRleHQiLCJ0eXBlV29yZCIsImN1cnJlbnRXb3JkIiwidW5kZWZpbmVkIiwiY2hhckF0IiwiaW5uZXJUZXh0Iiwib2JzZXJ2ZUVsZW1lbnRzIiwidHlwZUVsZW1zIiwib3B0aW9ucyIsInJvb3QiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJvYnNlcnZlIiwidHlwZUFuaW0iLCJwcm9ncmVzc0FuaW0iLCJzdGFydCIsImVsZW0iLCJlbGVtV3JhcCIsImN1cnJlbnRQb3NpdGlvbiIsIndpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1dyYXAiLCJ0YWJsZVBvcHVwQnRuIiwiY2xvc2VQb3B1cHMiLCJwb3B1cHNXcmFwIiwiYm9keSIsImRvbmVQb3B1cEJ0biIsIndlZWsyIiwic2V0SXRlbSIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFDL0MsSUFB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LE1BQU0sRUFBRTtFQUNyQixDQUFDLENBQUM7QUFHTixDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+e1xuICAgIGxldCB3ZWVrID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpID8gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpKSA6IDE7XG5cbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1tb2JcIilcbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLWJvdHRvbVwiKVxuICAgIGNvbnN0IHNsaWRlQnRuTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHNsaWRlQnRuUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIpXG5cbiAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goKGl0ZW0sIGluZGV4SXRlbSkgPT57XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goKHBvcHVwLCBpbmRleFBvcHVwKT0+e1xuICAgICAgICAgICAgICAgIGlmIChpbmRleEl0ZW0gPT09IGluZGV4UG9wdXApe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBwb3B1cC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgc2xpZGVCdG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuICAgIHNsaWRlQnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbi8vLyDQs9C70ZbRhyDRgdC70LDQudC00LXRgFxuIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcihzbGlkZXMsIGxlZnRCdG4sIHJpZ2h0QnRuLCBzbGlkZXNJY29ucywgY3VycmVudCwgcGF0aCwgaW1nLCB3ZWVrLCBjb3ZlcmZsb3csIGNvdmVyZmxvd09mZldpZHRoKXtcblxuICAgICBsZXQgY292ZXJmbG93VG9nZ2xlciA9IHRydWVcblxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICAgICAgLy8gY29uc29sZS5sb2coY292ZXJmbG93VG9nZ2xlcilcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgICAgICAgICAgIGlmKGNvdmVyZmxvd1RvZ2dsZXIpe1xuICAgICAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgICAgICAgICAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIHNsaWRlcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAvLyBpZihpICE9PSBjdXJyZW50ICsgMSAmJiBpICE9PSBzbGlkZXMubGVuZ3RoICYmIGkgIT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHJpZ2h0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKGxlZnQpXG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIGkpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZylcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhpLCBjdXJyZW50KVxuICAgICAgICAgICAgIC8vIGlmKGkgPT09IGN1cnJlbnQgKyAxKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxICYmIGkgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gZWxzZXtcblxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgLy8gaWYoc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0WzFdID09PSBcIl9hY3RpdmVcIil7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdFsxXSA9PT0gXCJfYWN0aXZlXCIpe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgIH0pO1xuICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHVwZGF0ZUdsaXRjaExheWVycyhwYXRoLCBpbmRleCkge1xuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgaW5kZXggKz0gNlxuICAgICAgICAgfVxuICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXG4gICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgaWYgKGxheWVyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMF0gIT09IFwic2xpZGVfX2luZm9cIikge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGBxdWVzdCR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbikge1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAtLWN1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAwKSBjdXJyZW50ID0gc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICAgKytjdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzLmxlbmd0aCAtIDEpIGN1cnJlbnQgPSAwO1xuICAgICAgICAgfVxuXG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgfSk7XG5cbiAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIFNsaWRlSWNvbnNJbml0KGljb25zLCBjdXJyZW50KSB7XG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXggKyA2fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleH0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4KTtcbiAgICAgICAgIH1cbiAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpIHx8IGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIG1vdmVTbGlkZXIoc2xpZGVzLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+e1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcInJpZ2h0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwibGVmdC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9LCAxMDAwKTtcbiAgICAgfVxuXG4gICAgIGxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwibGVmdFwiKSk7XG4gICAgIHJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcInJpZ2h0XCIpKTtcblxuICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9jdXJyZW50XCIpKSByZXR1cm5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9jdXJyZW50XCIpKTtcbiAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIGN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyA3fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyAxfS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEpO1xuXG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaW5kZXggPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgIH0pO1xuICAgICB9KTtcblxuICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG5cbiB9XG4gZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBzKVxuICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgcG9wdXBCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwb3B1cC5wYXJlbnRFbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuIH1cblxuXG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZVwiKTtcblxuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgaWYod2VlayA9PT0gMSl7XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG5cbiAgICAgICAgICAgIGlmKGkgPj0gNiB8fCBzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAgICAgICAgICAgICBzbGlkZS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PntcbiAgICAgICAgICAgIGlmKGkgPj0gNiB8fCBpY29uLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XG4gICAgICAgICAgICBsZXQgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucXVlc3Qke2l9YClcbiAgICAgICAgICAgIHdlZWsxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHF1ZXN0c1BhdGggPSBcIi4vaW1nL3F1ZXN0cy9zbGlkZVwiXG5cbiAgICBmdW5jdGlvbiBjaGVja01lZGlhUXVlcmllcyhvbGRQYXRoLCBuZXdQYXRoKSB7XG5cbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xuXG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk1MHB4KSBhbmQgKG1heC1oZWlnaHQ6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXCIpO1xuXG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5NjAwLm1hdGNoZXMpIHtcblxuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWVkaWFRdWVyeTk1MExhbmRzY2FwZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2xkUGF0aFxuICAgIH1cblxuXG5cblxuICAgIHF1ZXN0c1BhdGggPSBjaGVja01lZGlhUXVlcmllcyhxdWVzdHNQYXRoLCBcIi4vaW1nL3F1ZXN0cy9tb2Ivc2xpZGVcIilcbiAgICBjb25zb2xlLmxvZyhxdWVzdHNQYXRoKVxuXG5cbiAgICBjcmVhdGVTbGlkZXIoXCIuc2xpZGVcIiwgXCIuc2xpZGVfX21vdmUtbGVmdFwiLCBcIi5zbGlkZV9fbW92ZS1yaWdodFwiLCBcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIiwgMSxxdWVzdHNQYXRoLCBcInBlcnMucG5nXCIsIHdlZWsgKVxuICAgIGNyZWF0ZVNsaWRlcihcIi5wcml6ZV9fc2xpZGVcIiwgXCIucHJpemVfX21vdmUtbGVmdFwiLCBcIi5wcml6ZV9fbW92ZS1yaWdodFwiLCBcIi5wcml6ZV9faWNvbnMtaXRlbVwiLCAxLFwiLi9pbWcvcHJpemUvc2xpZGVcIiwgXCJwcml6ZS5wbmdcIiwgbnVsbCwgdHJ1ZSAsIDExNTApXG5cbiAgICBzZXRQb3B1cHMoXCIuZ3VpZGVfX2luZm9cIiwgXCIuZ3VpZGVfX2luZm8tYnRuXCIsIFwiLmd1aWRlX19pbmZvLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnByaXplX19zbGlkZS1wb3B1cFwiLCBcIi5wcml6ZV9fc2xpZGUtaW5mby1idG5cIiwgXCIucHJpemVfX3NsaWRlLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnRhYmxlX19pbmZvLXBvcHVwXCIsIFwiLnRhYmxlX19pbmZvXCIsIFwiLnRhYmxlX19pbmZvLWNsb3NlXCIpXG5cbiAgICBjb25zdCB0YWJsZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19saXN0LWl0ZW1cIilcbiAgICBjb25zdCB0YWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19pdGVtXCIpXG5cbiAgICB0YWJsZVRhYnMuZm9yRWFjaCgodGFiLCB0YWJJbmRleCkgPT57XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgdGFibGVUYWJzLmZvckVhY2goKGl0ZW0pID0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGFibGVzLmZvckVhY2goKHRhYmxlLCB0YWJsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaWYodGFibGVJbmRleCA9PT0gIHRhYkluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IHByaXplUmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaXplX19tb3ZlLXJpZ2h0XCIpXG4gICAgY29uc3QgcHJpemVMZWZ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcml6ZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3QgcHJpemVQb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaXplX19zbGlkZS1wb3B1cFwiKVxuXG4gICAgZnVuY3Rpb24gY2xvc2VEcm9wKGRyb3BzKXtcbiAgICAgICAgZHJvcHMuZm9yRWFjaChkcm9wID0+e1xuICAgICAgICAgICAgZHJvcC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpemVSaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuICAgIHByaXplTGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNsb3NlRHJvcChwcml6ZVBvcHVwcylcbiAgICB9KVxuXG4vLy8g0LDQvdGW0LzQsNGG0ZbRjyDQtNC40L3QsNC80ZbRh9C90L7Qs9C+INC90LDQsdC+0YDRgyDRgtC10LrRgdGCXG4gICAgZnVuY3Rpb24gZHluYW1pY1R5cGV3cml0ZXIoZWxlbWVudCwgc3BlZWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHRleHRBcnJheSA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIC8vIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyg/PD1cXFMpKD89XFxzKXwoPz1cXFMpLykuZmlsdGVyKGNoYXIgPT4gY2hhciAhPT0gJycpO1xuICAgICAgICBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oXFxzKykvKS5maWx0ZXIoZnVuY3Rpb24gKF9jaGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NoYXIudHJpbSgpICE9PSAnJyB8fCBfY2hhciA9PT0gJyAnO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHdvcmRJbmRleCA9IDA7XG4gICAgICAgIGxldCBjaGFySW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudFRleHQgPSAnJztcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJfb3BhY2l0eVwiKVxuXG4gICAgICAgIGZ1bmN0aW9uIHR5cGVXb3JkKCkge1xuICAgICAgICAgICAgaWYgKHdvcmRJbmRleCA9PT0gbGl0QXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V29yZCA9IHRleHRBcnJheVt3b3JkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50V29yZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKGNoYXJJbmRleCA8IGN1cnJlbnRXb3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IGN1cnJlbnRXb3JkLmNoYXJBdChjaGFySW5kZXgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSAnICc7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHdvcmRJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcblxuICAgICAgICB0eXBlV29yZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50cyh0eXBlRWxlbXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwZXdyaXRlcihlbnRyeS50YXJnZXQsIDM1LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB0eXBlRWxlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGVBbmltID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYW5pbScpO1xuICAgIG9ic2VydmVFbGVtZW50cyh0eXBlQW5pbSk7XG5cbi8vLyBwcm9ncmVzcyBiYXIg0LDQvdGW0LzQsNGG0ZbRj1xuICAgIGZ1bmN0aW9uIHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbil7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbiA8PSAxMDApe1xuICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgZWxlbVdyYXAuaW5uZXJUZXh0ID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICArK2N1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRQb3NpdGlvbiA+PSAxMDApe1xuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uID0gc3RhcnRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy1iYXJcIilcbiAgICBjb25zdCBwcm9ncmVzc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLXRleHRcIilcblxuICAgIHByb2dyZXNzQW5pbSg0MCwgcHJvZ3Jlc3NCYXIsIHByb2dyZXNzV3JhcCwgNDApXG5cbi8vIHBvcHVwc1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19idG5cIilcbiAgICBjb25zdCBjbG9zZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzX19jbG9zZVwiKVxuICAgIGNvbnN0IHBvcHVwc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc1wiKVxuXG4gICAgdGFibGVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LmFkZChcIl90YWJsZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG4gICAgfSlcbiAgICBjbG9zZVBvcHVwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl90YWJsZVwiKVxuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG5cbi8vIGZvciB0ZXN0XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbi1sbmdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJlblwiKVxuICAgIH0pXG5cbiAgICBjb25zdCBkb25lUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvbmUtcG9wdXBcIilcblxuICAgIGRvbmVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cbiAgICBjb25zdCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazFcIik7XG4gICAgY29uc3Qgd2VlazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsyXCIpO1xuXG4gICAgd2VlazEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDEpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHdlZWsyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAyKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cblxufSlcblxuIl19
