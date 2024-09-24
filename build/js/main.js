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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2VlayIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUludCIsImluZm9TbGlkZXNNb2IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5mb1NsaWRlc01vYlBvcHVwIiwic2xpZGVCdG5zTGVmdCIsInNsaWRlQnRuc1JpZ2h0IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleEl0ZW0iLCJwb3B1cCIsImluZGV4UG9wdXAiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwYXJlbnRFbGVtZW50IiwiYnRuIiwicmVtb3ZlIiwiY3JlYXRlU2xpZGVyIiwic2xpZGVzIiwibGVmdEJ0biIsInJpZ2h0QnRuIiwic2xpZGVzSWNvbnMiLCJjdXJyZW50IiwicGF0aCIsImltZyIsImNvdmVyZmxvdyIsImNvdmVyZmxvd09mZldpZHRoIiwiY292ZXJmbG93VG9nZ2xlciIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjb3ZlckZsb3dDbGFzc2VzIiwicmlnaHQiLCJsZWZ0Iiwic2xpZGUiLCJpIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxlbmd0aCIsImFkZCIsIm5leHRTaWJsaW5nIiwiY29uc29sZSIsImxvZyIsInF1ZXJ5U2VsZWN0b3IiLCJnbGl0Y2hMYXllcnMiLCJ1cGRhdGVHbGl0Y2hMYXllcnMiLCJpbmRleCIsImxheWVyIiwiY2xhc3NOYW1lIiwic3RhcnRzV2l0aCIsInN0eWxlIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwicG9pbnRlckV2ZW50cyIsIm5leHRTbGlkZUluZGV4Iiwic2V0VGltZW91dCIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNldFBvcHVwcyIsInBvcHVwcyIsInBvcHVwQnRucyIsImNsb3NlQnRucyIsIndlZWsxIiwicXVlc3RzUGF0aCIsImNoZWNrTWVkaWFRdWVyaWVzIiwib2xkUGF0aCIsIm5ld1BhdGgiLCJtZWRpYVF1ZXJ5NjAwIiwibWF0Y2hNZWRpYSIsIm1lZGlhUXVlcnk5NTBMYW5kc2NhcGUiLCJtYXRjaGVzIiwidGFibGVUYWJzIiwidGFibGVzIiwidGFiIiwidGFiSW5kZXgiLCJ0YWJsZSIsInRhYmxlSW5kZXgiLCJkeW5hbWljVHlwZXdyaXRlciIsImVsZW1lbnQiLCJzcGVlZCIsImNhbGxiYWNrIiwidGV4dEFycmF5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwic3BsaXQiLCJsaXRBcnIiLCJqb2luIiwiZmlsdGVyIiwiY2hhciIsIndvcmRJbmRleCIsImNoYXJJbmRleCIsImN1cnJlbnRUZXh0IiwidHlwZVdvcmQiLCJjdXJyZW50V29yZCIsInVuZGVmaW5lZCIsImNoYXJBdCIsImlubmVyVGV4dCIsIm9ic2VydmVFbGVtZW50cyIsInR5cGVFbGVtcyIsIm9wdGlvbnMiLCJyb290IiwidGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidW5vYnNlcnZlIiwib2JzZXJ2ZSIsInR5cGVBbmltIiwicHJvZ3Jlc3NBbmltIiwic3RhcnQiLCJlbGVtIiwiZWxlbVdyYXAiLCJjdXJyZW50UG9zaXRpb24iLCJ3aWR0aCIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NXcmFwIiwidGFibGVQb3B1cEJ0biIsImNsb3NlUG9wdXBzIiwicG9wdXBzV3JhcCIsImJvZHkiLCJkb25lUG9wdXBCdG4iLCJ3ZWVrMiIsInNldEl0ZW0iLCJsb2NhdGlvbiIsInJlbG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFLO0VBQy9DLElBQUlDLElBQUksR0FBR0MsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0YsWUFBWSxDQUFD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QUMsQ0FBQztFQUVGLElBQU1rSCxZQUFZLEdBQUduSSxRQUFRLENBQUM2QyxhQUFhLENBQUMsYUFBYSxDQUFDO0VBRTFEc0YsWUFBWSxDQUFDbEksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUs7SUFDeENnSSxVQUFVLENBQUNqSCxTQUFTLENBQUNDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDcENqQixRQUFRLENBQUNrSSxJQUFJLENBQUNsSCxTQUFTLENBQUNDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztFQUV0RCxDQUFDLENBQUM7RUFFRixJQUFNc0QsS0FBSyxHQUFHdkUsUUFBUSxDQUFDNkMsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUM5QyxJQUFNdUYsS0FBSyxHQUFHcEksUUFBUSxDQUFDNkMsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUU5QzBCLEtBQUssQ0FBQ3RFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ2xDRSxZQUFZLENBQUNrSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQkMsUUFBUSxDQUFDQyxNQUFNLEVBQUU7RUFDckIsQ0FBQyxDQUFDO0VBRUZILEtBQUssQ0FBQ25JLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ2xDRSxZQUFZLENBQUNrSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQkMsUUFBUSxDQUFDQyxNQUFNLEVBQUU7RUFDckIsQ0FBQyxDQUFDO0FBR04sQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PntcbiAgICBsZXQgd2VlayA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2Vla1wiKSA/IHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2Vla1wiKSkgOiAxO1xuXG4gICAgY29uc3QgaW5mb1NsaWRlc01vYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX2luZm8tbW9iXCIpXG4gICAgY29uc3QgaW5mb1NsaWRlc01vYlBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1ib3R0b21cIilcbiAgICBjb25zdCBzbGlkZUJ0bnNMZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpXG4gICAgY29uc3Qgc2xpZGVCdG5zUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIpXG5cbiAgICBpbmZvU2xpZGVzTW9iLmZvckVhY2goKGl0ZW0sIGluZGV4SXRlbSkgPT57XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgaW5mb1NsaWRlc01vYlBvcHVwLmZvckVhY2goKHBvcHVwLCBpbmRleFBvcHVwKT0+e1xuICAgICAgICAgICAgICAgIGlmIChpbmRleEl0ZW0gPT09IGluZGV4UG9wdXApe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBwb3B1cC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHNsaWRlQnRuc0xlZnQuZm9yRWFjaChidG4gPT57XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cblxuICAgIH0pXG4gICAgc2xpZGVCdG5zUmlnaHQuZm9yRWFjaChidG4gPT57XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbi8vLyDQs9C70ZbRhyDRgdC70LDQudC00LXRgFxuIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcihzbGlkZXMsIGxlZnRCdG4sIHJpZ2h0QnRuLCBzbGlkZXNJY29ucywgY3VycmVudCwgcGF0aCwgaW1nLCB3ZWVrLCBjb3ZlcmZsb3csIGNvdmVyZmxvd09mZldpZHRoKXtcblxuICAgICBsZXQgY292ZXJmbG93VG9nZ2xlciA9IHRydWVcblxuICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IGNvdmVyZmxvd09mZldpZHRoKXtcbiAgICAgICAgIGNvdmVyZmxvd1RvZ2dsZXIgPSBmYWxzZVxuICAgICAgICAgLy8gY29uc29sZS5sb2coY292ZXJmbG93VG9nZ2xlcilcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuICAgICAgICAgICAgIGlmKGNvdmVyZmxvd1RvZ2dsZXIpe1xuICAgICAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgICAgICAgICAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIHNsaWRlcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAvLyBpZihpICE9PSBjdXJyZW50ICsgMSAmJiBpICE9PSBzbGlkZXMubGVuZ3RoICYmIGkgIT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHJpZ2h0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKGxlZnQpXG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIGkpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZylcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhpLCBjdXJyZW50KVxuICAgICAgICAgICAgIC8vIGlmKGkgPT09IGN1cnJlbnQgKyAxKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxICYmIGkgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gZWxzZXtcblxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgLy8gaWYoc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0WzFdID09PSBcIl9hY3RpdmVcIil7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdFsxXSA9PT0gXCJfYWN0aXZlXCIpe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgIH0pO1xuICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHVwZGF0ZUdsaXRjaExheWVycyhwYXRoLCBpbmRleCkge1xuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgaW5kZXggKz0gNlxuICAgICAgICAgfVxuICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXG4gICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgaWYgKGxheWVyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMF0gIT09IFwic2xpZGVfX2luZm9cIikge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGBxdWVzdCR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbikge1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAtLWN1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAwKSBjdXJyZW50ID0gc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICAgKytjdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzLmxlbmd0aCAtIDEpIGN1cnJlbnQgPSAwO1xuICAgICAgICAgfVxuXG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgfSk7XG5cbiAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIFNsaWRlSWNvbnNJbml0KGljb25zLCBjdXJyZW50KSB7XG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHdlZWspXG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4ICsgNn0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4KTtcbiAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXh9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSwgMTAwMCk7XG4gICAgIH1cblxuICAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcImxlZnRcIikpO1xuICAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xuICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfY3VycmVudFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgN30vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtjdXJyZW50ICsgMX0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIGN1cnJlbnQgKyAxKTtcblxuICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICB9KTtcbiAgICAgfSk7XG5cbiAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuXG4gfVxuIGZ1bmN0aW9uIHNldFBvcHVwcyhwb3B1cHMsIHBvcHVwQnRucywgY2xvc2VCdG5zKXtcbiAgICBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBvcHVwcylcbiAgICBwb3B1cEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBvcHVwQnRucylcbiAgICBjbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsb3NlQnRucylcblxuICAgIHBvcHVwQnRucy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCA9PiB7XG4gICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgaWYoZS50YXJnZXQucGFyZW50RWxlbWVudCA9PT0gcG9wdXAucGFyZW50RWxlbWVudCl7XG4gICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSlcbiAgICAgICAgIH0pXG4gICAgIH0pXG4gICAgY2xvc2VCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiB9XG5cblxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVcIik7XG5cbiAgICBjb25zdCBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlc3RzX19pY29ucy1pdGVtXCIpO1xuICAgIGlmKHdlZWsgPT09IDEpe1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuXG4gICAgICAgICAgICBpZihpID49IDYgfHwgc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT57XG4gICAgICAgICAgICBpZihpID49IDYgfHwgaWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAgICAgICAgICAgICBpY29uLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2OyBpKyspe1xuICAgICAgICAgICAgbGV0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnF1ZXN0JHtpfWApXG4gICAgICAgICAgICB3ZWVrMS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBxdWVzdHNQYXRoID0gXCIuL2ltZy9xdWVzdHMvc2xpZGVcIlxuXG4gICAgZnVuY3Rpb24gY2hlY2tNZWRpYVF1ZXJpZXMob2xkUGF0aCwgbmV3UGF0aCkge1xuXG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk2MDAgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDYwMHB4KVwiKTtcblxuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5OTUwTGFuZHNjYXBlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5NTBweCkgYW5kIChtYXgtaGVpZ2h0OiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVwiKTtcblxuICAgICAgICBpZiAobWVkaWFRdWVyeTYwMC5tYXRjaGVzKSB7XG5cbiAgICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUubWF0Y2hlcykge1xuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgIG9sZFBhdGggPSBuZXdQYXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9sZFBhdGhcbiAgICB9XG5cblxuXG5cbiAgICBxdWVzdHNQYXRoID0gY2hlY2tNZWRpYVF1ZXJpZXMocXVlc3RzUGF0aCwgXCIuL2ltZy9xdWVzdHMvbW9iL3NsaWRlXCIpXG4gICAgY29uc29sZS5sb2cocXVlc3RzUGF0aClcblxuXG4gICAgY3JlYXRlU2xpZGVyKFwiLnNsaWRlXCIsIFwiLnNsaWRlX19tb3ZlLWxlZnRcIiwgXCIuc2xpZGVfX21vdmUtcmlnaHRcIiwgXCIucXVlc3RzX19pY29ucy1pdGVtXCIsIDEscXVlc3RzUGF0aCwgXCJwZXJzLnBuZ1wiLCB3ZWVrIClcbiAgICBjcmVhdGVTbGlkZXIoXCIucHJpemVfX3NsaWRlXCIsIFwiLnByaXplX19tb3ZlLWxlZnRcIiwgXCIucHJpemVfX21vdmUtcmlnaHRcIiwgXCIucHJpemVfX2ljb25zLWl0ZW1cIiwgMSxcIi4vaW1nL3ByaXplL3NsaWRlXCIsIFwicHJpemUucG5nXCIsIG51bGwsIHRydWUgLCAxMTUwKVxuXG4gICAgc2V0UG9wdXBzKFwiLmd1aWRlX19pbmZvXCIsIFwiLmd1aWRlX19pbmZvLWJ0blwiLCBcIi5ndWlkZV9faW5mby1jbG9zZVwiKVxuICAgIHNldFBvcHVwcyhcIi5wcml6ZV9fc2xpZGUtcG9wdXBcIiwgXCIucHJpemVfX3NsaWRlLWluZm8tYnRuXCIsIFwiLnByaXplX19zbGlkZS1jbG9zZVwiKVxuXG4gICAgY29uc3QgdGFibGVUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fbGlzdC1pdGVtXCIpXG4gICAgY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9faXRlbVwiKVxuXG4gICAgdGFibGVUYWJzLmZvckVhY2goKHRhYiwgdGFiSW5kZXgpID0+e1xuICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIHRhYmxlVGFicy5mb3JFYWNoKChpdGVtKSA9PntcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRhYmxlcy5mb3JFYWNoKCh0YWJsZSwgdGFibGVJbmRleCkgPT57XG4gICAgICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGlmKHRhYmxlSW5kZXggPT09ICB0YWJJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cblxuLy8vINCw0L3RltC80LDRhtGW0Y8g0LTQuNC90LDQvNGW0YfQvdC+0LPQviDQvdCw0LHQvtGA0YMg0YLQtdC60YHRglxuICAgIGZ1bmN0aW9uIGR5bmFtaWNUeXBld3JpdGVyKGVsZW1lbnQsIHNwZWVkLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB0ZXh0QXJyYXkgPSBlbGVtZW50LnRleHRDb250ZW50LnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oPzw9XFxTKSg/PVxccyl8KD89XFxTKS8pLmZpbHRlcihjaGFyID0+IGNoYXIgIT09ICcnKTtcblxuICAgICAgICBsZXQgd29yZEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNoYXJJbmRleCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICcnO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIl9vcGFjaXR5XCIpXG5cbiAgICAgICAgZnVuY3Rpb24gdHlwZVdvcmQoKSB7XG4gICAgICAgICAgICBpZiAod29yZEluZGV4ID09PSBsaXRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdGV4dEFycmF5W3dvcmRJbmRleF07XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRXb3JkID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY2hhckluZGV4IDwgY3VycmVudFdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gY3VycmVudFdvcmQuY2hhckF0KGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXgrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHR5cGVXb3JkLCBzcGVlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9ICcgJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgICAgIGNoYXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgd29yZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0eXBld3JpdGVyLWN1cnNvcicpO1xuXG4gICAgICAgIHR5cGVXb3JkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb2JzZXJ2ZUVsZW1lbnRzKHR5cGVFbGVtcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vdDogbnVsbCxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNUeXBld3JpdGVyKGVudHJ5LnRhcmdldCwgMzUsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIHR5cGVFbGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZUFuaW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwZS1hbmltJyk7XG4gICAgb2JzZXJ2ZUVsZW1lbnRzKHR5cGVBbmltKTtcblxuLy8vIHByb2dyZXNzIGJhciDQsNC90ZbQvNCw0YbRltGPXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKXtcbiAgICAgICAgaWYoY3VycmVudFBvc2l0aW9uIDw9IDEwMCl7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICBlbGVtV3JhcC5pbm5lclRleHQgPSBgJHtjdXJyZW50UG9zaXRpb259JWBcbiAgICAgICAgICAgICsrY3VycmVudFBvc2l0aW9uXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiBwcm9ncmVzc0FuaW0oc3RhcnQsIGVsZW0sIGVsZW1XcmFwLCBjdXJyZW50UG9zaXRpb24pLCA3MClcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFBvc2l0aW9uID49IDEwMCl7XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBzdGFydFxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLWJhclwiKVxuICAgIGNvbnN0IHByb2dyZXNzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19fcHJvZ3Jlc3MtdGV4dFwiKVxuXG4gICAgcHJvZ3Jlc3NBbmltKDQwLCBwcm9ncmVzc0JhciwgcHJvZ3Jlc3NXcmFwLCA0MClcblxuLy8gcG9wdXBzXG4gICAgY29uc3QgdGFibGVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX2J0blwiKVxuICAgIGNvbnN0IGNsb3NlUG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2Nsb3NlXCIpXG4gICAgY29uc3QgcG9wdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzXCIpXG5cbiAgICB0YWJsZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QuYWRkKFwiX3RhYmxlXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9vdmVyZmxvdy1oaWRkZW5cIilcbiAgICB9KVxuICAgIGNsb3NlUG9wdXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX3RhYmxlXCIpXG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cblxuLy8gZm9yIHRlc3RcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcblxuICAgIGNvbnN0IGRvbmVQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9uZS1wb3B1cFwiKVxuXG4gICAgZG9uZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgcG9wdXBzV3JhcC5jbGFzc0xpc3QudG9nZ2xlKFwiX2RvbmVcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiX292ZXJmbG93LWhpZGRlblwiKVxuXG4gICAgfSlcblxuICAgIGNvbnN0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMVwiKTtcbiAgICBjb25zdCB3ZWVrMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazJcIik7XG5cbiAgICB3ZWVrMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMSk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgd2VlazIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuXG59KVxuXG4iXX0=
