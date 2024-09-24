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
  var slideBtnsLeft = document.querySelectorAll(".slide__move-left");
  var slideBtnsRight = document.querySelectorAll(".slide__move-right");
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
  slideBtnsLeft.forEach(function (btn) {
    btn.addEventListener("click", function () {
      infoSlidesMobPopup.forEach(function (item) {
        if (item.parentElement.parentElement.parentElement !== null) {
          item.classList.remove("_active");
          item.parentElement.parentElement.parentElement.classList.remove("_active");
          item.classList.remove("_active");
        }
      });
    });
  });
  slideBtnsRight.forEach(function (btn) {
    btn.addEventListener("click", function () {
      infoSlidesMobPopup.forEach(function (item) {
        if (item.parentElement.parentElement.parentElement !== null) {
          item.classList.remove("_active");
          item.parentElement.parentElement.parentElement.classList.remove("_active");
          item.classList.remove("_active");
        }
      });
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
    var litArr = textArray.join(' ').split(/(?<=\S)(?=\s)|(?=\S)/).filter(function (_char) {
      return _char !== '';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2VlayIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUludCIsImluZm9TbGlkZXNNb2IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5mb1NsaWRlc01vYlBvcHVwIiwic2xpZGVCdG5zTGVmdCIsInNsaWRlQnRuc1JpZ2h0IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleEl0ZW0iLCJwb3B1cCIsImluZGV4UG9wdXAiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwYXJlbnRFbGVtZW50IiwiYnRuIiwicmVtb3ZlIiwiY3JlYXRlU2xpZGVyIiwic2xpZGVzIiwibGVmdEJ0biIsInJpZ2h0QnRuIiwic2xpZGVzSWNvbnMiLCJjdXJyZW50IiwicGF0aCIsImltZyIsImNvdmVyZmxvdyIsImNvdmVyZmxvd09mZldpZHRoIiwiY292ZXJmbG93VG9nZ2xlciIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjb3ZlckZsb3dDbGFzc2VzIiwicmlnaHQiLCJsZWZ0Iiwic2xpZGUiLCJpIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxlbmd0aCIsImFkZCIsIm5leHRTaWJsaW5nIiwiY29uc29sZSIsImxvZyIsInF1ZXJ5U2VsZWN0b3IiLCJnbGl0Y2hMYXllcnMiLCJ1cGRhdGVHbGl0Y2hMYXllcnMiLCJpbmRleCIsImxheWVyIiwiY2xhc3NOYW1lIiwic3RhcnRzV2l0aCIsInN0eWxlIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwicG9pbnRlckV2ZW50cyIsIm5leHRTbGlkZUluZGV4Iiwic2V0VGltZW91dCIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNldFBvcHVwcyIsInBvcHVwcyIsInBvcHVwQnRucyIsImNsb3NlQnRucyIsIndlZWsxIiwicXVlc3RzUGF0aCIsImNoZWNrTWVkaWFRdWVyaWVzIiwib2xkUGF0aCIsIm5ld1BhdGgiLCJtZWRpYVF1ZXJ5NjAwIiwibWF0Y2hNZWRpYSIsIm1lZGlhUXVlcnk5NTBMYW5kc2NhcGUiLCJtYXRjaGVzIiwidGFibGVUYWJzIiwidGFibGVzIiwidGFiIiwidGFiSW5kZXgiLCJ0YWJsZSIsInRhYmxlSW5kZXgiLCJkeW5hbWljVHlwZXdyaXRlciIsImVsZW1lbnQiLCJzcGVlZCIsImNhbGxiYWNrIiwidGV4dEFycmF5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwic3BsaXQiLCJsaXRBcnIiLCJqb2luIiwiZmlsdGVyIiwiY2hhciIsIndvcmRJbmRleCIsImNoYXJJbmRleCIsImN1cnJlbnRUZXh0IiwidHlwZVdvcmQiLCJjdXJyZW50V29yZCIsInVuZGVmaW5lZCIsImNoYXJBdCIsImlubmVyVGV4dCIsIm9ic2VydmVFbGVtZW50cyIsInR5cGVFbGVtcyIsIm9wdGlvbnMiLCJyb290IiwidGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidW5vYnNlcnZlIiwib2JzZXJ2ZSIsInR5cGVBbmltIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtIiwiZWxlbVdyYXAiLCJjdXJyZW50UG9zaXRpb24iLCJ3aWR0aCIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NXcmFwIiwidGFibGVQb3B1cEJ0biIsImNsb3NlUG9wdXBzIiwicG9wdXBzV3JhcCIsImJvZHkiLCJkb25lUG9wdXBCdG4iLCJ3ZWVrMiIsInNldEl0ZW0iLCJsb2NhdGlvbiIsInJlbG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFLO0VBQy9DLElBQUlDLElBQUksR0FBR0MsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0YsWUFBWSxDQUFD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QUMsQ0FBQztFQUNGakIsUUFBUSxDQUFDNkMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDNUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7SUFDN0RELFFBQVEsQ0FBQzZDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzdCLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQztFQUM5RCxDQUFDLENBQUM7RUFFRixJQUFNa0gsWUFBWSxHQUFHbkksUUFBUSxDQUFDNkMsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUUxRHNGLFlBQVksQ0FBQ2xJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQ3hDZ0ksVUFBVSxDQUFDakgsU0FBUyxDQUFDQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3BDakIsUUFBUSxDQUFDa0ksSUFBSSxDQUFDbEgsU0FBUyxDQUFDQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7RUFFdEQsQ0FBQyxDQUFDO0VBRUYsSUFBTXNELEtBQUssR0FBR3ZFLFFBQVEsQ0FBQzZDLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDOUMsSUFBTXVGLEtBQUssR0FBR3BJLFFBQVEsQ0FBQzZDLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFOUMwQixLQUFLLENBQUN0RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0UsWUFBWSxDQUFDa0ksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGSCxLQUFLLENBQUNuSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0UsWUFBWSxDQUFDa0ksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUdOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLW1vYlwiKVxuICAgIGNvbnN0IGluZm9TbGlkZXNNb2JQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tYm90dG9tXCIpXG4gICAgY29uc3Qgc2xpZGVCdG5zTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHNsaWRlQnRuc1JpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9fbW92ZS1yaWdodFwiKVxuXG4gICAgaW5mb1NsaWRlc01vYi5mb3JFYWNoKChpdGVtLCBpbmRleEl0ZW0pID0+e1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKChwb3B1cCwgaW5kZXhQb3B1cCk9PntcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhJdGVtID09PSBpbmRleFBvcHVwKXtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBzbGlkZUJ0bnNMZWZ0LmZvckVhY2goYnRuID0+e1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuICAgIHNsaWRlQnRuc1JpZ2h0LmZvckVhY2goYnRuID0+e1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICBpZihpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxuXG4vLy8g0LPQu9GW0Ycg0YHQu9Cw0LnQtNC10YBcbiBmdW5jdGlvbiBjcmVhdGVTbGlkZXIoc2xpZGVzLCBsZWZ0QnRuLCByaWdodEJ0biwgc2xpZGVzSWNvbnMsIGN1cnJlbnQsIHBhdGgsIGltZywgd2VlaywgY292ZXJmbG93LCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG5cbiAgICAgbGV0IGNvdmVyZmxvd1RvZ2dsZXIgPSB0cnVlXG5cbiAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBjb3ZlcmZsb3dPZmZXaWR0aCl7XG4gICAgICAgICBjb3ZlcmZsb3dUb2dnbGVyID0gZmFsc2VcbiAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvdmVyZmxvd1RvZ2dsZXIpXG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBjb3ZlckZsb3dDbGFzc2VzKHJpZ2h0LCBsZWZ0LCBzbGlkZXMpe1xuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3dUb2dnbGVyKXtcbiAgICAgICAgICAgICAgICAgaWYoY3VycmVudCA9PT0gaSl7XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtMV0uY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGlmKHNsaWRlLm5leHRTaWJsaW5nID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNbMF0uY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50LCBzbGlkZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgLy8gaWYoaSAhPT0gY3VycmVudCArIDEgJiYgaSAhPT0gc2xpZGVzLmxlbmd0aCAmJiBpICE9PSAwKXtcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShyaWdodClcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShsZWZ0KVxuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhjdXJyZW50LCBpKVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihjdXJyZW50ID09PSAwKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgLy8gLy8gY29uc29sZS5sb2coaSwgY3VycmVudClcbiAgICAgICAgICAgICAvLyBpZihpID09PSBjdXJyZW50ICsgMSl7XG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdClcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSAmJiBpID09PSAwKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGVsc2V7XG5cbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgIC8vIGlmKHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdFsxXSA9PT0gXCJfYWN0aXZlXCIpe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3RbMV0gPT09IFwiX2FjdGl2ZVwiKXtcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgIH0pXG4gICAgIH1cbiAgICAgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXMpO1xuICAgICBsZWZ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihsZWZ0QnRuKTtcbiAgICAgcmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJpZ2h0QnRuKTtcbiAgICAgc2xpZGVzSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlc0ljb25zKTtcbiAgICAgbGV0IGdsaXRjaExheWVycyA9IFtdO1xuICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgICBnbGl0Y2hMYXllcnMgPSBbLi4uZ2xpdGNoTGF5ZXJzLCAuLi5zbGlkZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmdsaXRjaF9fbGF5ZXJcIildO1xuICAgICB9KTtcbiAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgIH1cblxuICAgICBmdW5jdGlvbiB1cGRhdGVHbGl0Y2hMYXllcnMocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIGluZGV4ICs9IDZcbiAgICAgICAgIH1cbiAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxuICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIGlmIChsYXllci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0WzBdICE9PSBcInNsaWRlX19pbmZvXCIpIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChgcXVlc3Qke2luZGV4fWApO1xuICAgICAgICAgICAgICAgICBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gcGF0aDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIG1vdmVTbGlkZXIoc2xpZGVzLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgLS1jdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50IDwgMCkgY3VycmVudCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICsrY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHNsaWRlcy5sZW5ndGggLSAxKSBjdXJyZW50ID0gMDtcbiAgICAgICAgIH1cblxuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaSA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBTbGlkZUljb25zSW5pdChpY29ucywgY3VycmVudCkge1xuICAgICAgICAgaWNvbnMuZm9yRWFjaCgoaWNvbiwgaWNvbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiX2N1cnJlbnRcIiwgY3VycmVudCA9PT0gaWNvbkluZGV4KTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZGlyZWN0aW9uKSB7XG4gICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJnbGl0Y2hcIiwgXCJnbGl0Y2hcIiwgc2xpZGVzKVxuICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBjb25zdCBuZXh0U2xpZGVJbmRleCA9IGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIgPyAoY3VycmVudCA9PT0gMCA/IHNsaWRlcy5sZW5ndGggOiBjdXJyZW50KSA6IChjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSA/IDEgOiBjdXJyZW50ICsgMik7XG4gICAgICAgICBjb25zb2xlLmxvZyh3ZWVrKVxuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleCArIDZ9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICAgfVxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikgfHwgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT57XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwicmlnaHQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0sIDEwMDApO1xuICAgICB9XG5cbiAgICAgbGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJsZWZ0XCIpKTtcbiAgICAgcmlnaHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwicmlnaHRcIikpO1xuXG4gICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+IHtcbiAgICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2N1cnJlbnRcIikpIHJldHVyblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2N1cnJlbnRcIikpO1xuICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgY3VycmVudCA9IGk7XG4gICAgICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDd9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7Y3VycmVudCArIDF9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBjdXJyZW50ICsgMSk7XG5cbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpbmRleCA9PT0gY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgfSk7XG4gICAgIH0pO1xuXG4gICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcblxuIH1cbiBmdW5jdGlvbiBzZXRQb3B1cHMocG9wdXBzLCBwb3B1cEJ0bnMsIGNsb3NlQnRucyl7XG4gICAgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cHMpXG4gICAgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwb3B1cEJ0bnMpXG4gICAgY2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbG9zZUJ0bnMpXG5cbiAgICBwb3B1cEJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgIGlmKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgPT09IHBvcHVwLnBhcmVudEVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuICAgIGNsb3NlQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICB9KSlcbiAgICAgICAgIH0pXG4gICAgIH0pXG4gfVxuXG5cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpO1xuXG4gICAgY29uc3Qgc2xpZGVzSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiKTtcbiAgICBpZih3ZWVrID09PSAxKXtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcblxuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IHNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goKGljb24sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSA+PSA2IHx8IGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgaWNvbi5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKXtcbiAgICAgICAgICAgIGxldCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5xdWVzdCR7aX1gKVxuICAgICAgICAgICAgd2VlazEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlc3RzUGF0aCA9IFwiLi9pbWcvcXVlc3RzL3NsaWRlXCJcblxuICAgIGZ1bmN0aW9uIGNoZWNrTWVkaWFRdWVyaWVzKG9sZFBhdGgsIG5ld1BhdGgpIHtcblxuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5NjAwID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2MDBweClcIik7XG5cbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTk1MExhbmRzY2FwZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTUwcHgpIGFuZCAobWF4LWhlaWdodDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIik7XG5cbiAgICAgICAgaWYgKG1lZGlhUXVlcnk2MDAubWF0Y2hlcykge1xuXG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvbGRQYXRoXG4gICAgfVxuXG5cblxuXG4gICAgcXVlc3RzUGF0aCA9IGNoZWNrTWVkaWFRdWVyaWVzKHF1ZXN0c1BhdGgsIFwiLi9pbWcvcXVlc3RzL21vYi9zbGlkZVwiKVxuICAgIGNvbnNvbGUubG9nKHF1ZXN0c1BhdGgpXG5cblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAxLHF1ZXN0c1BhdGgsIFwicGVycy5wbmdcIiwgd2VlayApXG4gICAgY3JlYXRlU2xpZGVyKFwiLnByaXplX19zbGlkZVwiLCBcIi5wcml6ZV9fbW92ZS1sZWZ0XCIsIFwiLnByaXplX19tb3ZlLXJpZ2h0XCIsIFwiLnByaXplX19pY29ucy1pdGVtXCIsIDEsXCIuL2ltZy9wcml6ZS9zbGlkZVwiLCBcInByaXplLnBuZ1wiLCBudWxsLCB0cnVlICwgMTE1MClcblxuICAgIHNldFBvcHVwcyhcIi5ndWlkZV9faW5mb1wiLCBcIi5ndWlkZV9faW5mby1idG5cIiwgXCIuZ3VpZGVfX2luZm8tY2xvc2VcIilcbiAgICBzZXRQb3B1cHMoXCIucHJpemVfX3NsaWRlLXBvcHVwXCIsIFwiLnByaXplX19zbGlkZS1pbmZvLWJ0blwiLCBcIi5wcml6ZV9fc2xpZGUtY2xvc2VcIilcblxuICAgIGNvbnN0IHRhYmxlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2xpc3QtaXRlbVwiKVxuICAgIGNvbnN0IHRhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2l0ZW1cIilcblxuICAgIHRhYmxlVGFicy5mb3JFYWNoKCh0YWIsIHRhYkluZGV4KSA9PntcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0YWJsZXMuZm9yRWFjaCgodGFibGUsIHRhYmxlSW5kZXgpID0+e1xuICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZih0YWJsZUluZGV4ID09PSAgdGFiSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbi8vLyDQsNC90ZbQvNCw0YbRltGPINC00LjQvdCw0LzRltGH0L3QvtCz0L4g0L3QsNCx0L7RgNGDINGC0LXQutGB0YJcbiAgICBmdW5jdGlvbiBkeW5hbWljVHlwZXdyaXRlcihlbGVtZW50LCBzcGVlZCwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgdGV4dEFycmF5ID0gZWxlbWVudC50ZXh0Q29udGVudC50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgY29uc3QgbGl0QXJyID0gdGV4dEFycmF5LmpvaW4oJyAnKS5zcGxpdCgvKD88PVxcUykoPz1cXHMpfCg/PVxcUykvKS5maWx0ZXIoY2hhciA9PiBjaGFyICE9PSAnJyk7XG5cbiAgICAgICAgbGV0IHdvcmRJbmRleCA9IDA7XG4gICAgICAgIGxldCBjaGFySW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudFRleHQgPSAnJztcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJfb3BhY2l0eVwiKVxuXG4gICAgICAgIGZ1bmN0aW9uIHR5cGVXb3JkKCkge1xuICAgICAgICAgICAgaWYgKHdvcmRJbmRleCA9PT0gbGl0QXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V29yZCA9IHRleHRBcnJheVt3b3JkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50V29yZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKGNoYXJJbmRleCA8IGN1cnJlbnRXb3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IGN1cnJlbnRXb3JkLmNoYXJBdChjaGFySW5kZXgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSAnICc7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHdvcmRJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcblxuICAgICAgICB0eXBlV29yZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50cyh0eXBlRWxlbXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwZXdyaXRlcihlbnRyeS50YXJnZXQsIDM1LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB0eXBlRWxlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGVBbmltID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYW5pbScpO1xuICAgIG9ic2VydmVFbGVtZW50cyh0eXBlQW5pbSk7XG5cbi8vLyBwcm9ncmVzcyBiYXIg0LDQvdGW0LzQsNGG0ZbRj1xuICAgIGZ1bmN0aW9uIHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbil7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbiA8PSAxMDApe1xuICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgZWxlbVdyYXAuaW5uZXJUZXh0ID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICArK2N1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRQb3NpdGlvbiA+PSAxMDApe1xuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uID0gc3RhcnRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy1iYXJcIilcbiAgICBjb25zdCBwcm9ncmVzc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLXRleHRcIilcblxuICAgIHByb2dyZXNzQW5pbSg0MCwgcHJvZ3Jlc3NCYXIsIHByb2dyZXNzV3JhcCwgNDApXG5cbi8vIHBvcHVwc1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19idG5cIilcbiAgICBjb25zdCBjbG9zZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzX19jbG9zZVwiKVxuICAgIGNvbnN0IHBvcHVwc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc1wiKVxuXG4gICAgdGFibGVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LmFkZChcIl90YWJsZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG4gICAgfSlcbiAgICBjbG9zZVBvcHVwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl90YWJsZVwiKVxuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG5cbi8vIGZvciB0ZXN0XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbi1sbmdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJlblwiKVxuICAgIH0pXG5cbiAgICBjb25zdCBkb25lUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvbmUtcG9wdXBcIilcblxuICAgIGRvbmVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cbiAgICBjb25zdCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazFcIik7XG4gICAgY29uc3Qgd2VlazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsyXCIpO1xuXG4gICAgd2VlazEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDEpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHdlZWsyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAyKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cblxufSlcblxuIl19
