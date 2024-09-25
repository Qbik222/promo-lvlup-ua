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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2VlayIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUludCIsImluZm9TbGlkZXNNb2IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5mb1NsaWRlc01vYlBvcHVwIiwic2xpZGVCdG5zTGVmdCIsInNsaWRlQnRuc1JpZ2h0IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleEl0ZW0iLCJwb3B1cCIsImluZGV4UG9wdXAiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwYXJlbnRFbGVtZW50IiwiYnRuIiwicmVtb3ZlIiwiY3JlYXRlU2xpZGVyIiwic2xpZGVzIiwibGVmdEJ0biIsInJpZ2h0QnRuIiwic2xpZGVzSWNvbnMiLCJjdXJyZW50IiwicGF0aCIsImltZyIsImNvdmVyZmxvdyIsImNvdmVyZmxvd09mZldpZHRoIiwiY292ZXJmbG93VG9nZ2xlciIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjb3ZlckZsb3dDbGFzc2VzIiwicmlnaHQiLCJsZWZ0Iiwic2xpZGUiLCJpIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxlbmd0aCIsImFkZCIsIm5leHRTaWJsaW5nIiwiY29uc29sZSIsImxvZyIsInF1ZXJ5U2VsZWN0b3IiLCJnbGl0Y2hMYXllcnMiLCJ1cGRhdGVHbGl0Y2hMYXllcnMiLCJpbmRleCIsImxheWVyIiwiY2xhc3NOYW1lIiwic3RhcnRzV2l0aCIsInN0eWxlIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwicG9pbnRlckV2ZW50cyIsIm5leHRTbGlkZUluZGV4Iiwic2V0VGltZW91dCIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNldFBvcHVwcyIsInBvcHVwcyIsInBvcHVwQnRucyIsImNsb3NlQnRucyIsIndlZWsxIiwicXVlc3RzUGF0aCIsImNoZWNrTWVkaWFRdWVyaWVzIiwib2xkUGF0aCIsIm5ld1BhdGgiLCJtZWRpYVF1ZXJ5NjAwIiwibWF0Y2hNZWRpYSIsIm1lZGlhUXVlcnk5NTBMYW5kc2NhcGUiLCJtYXRjaGVzIiwidGFibGVUYWJzIiwidGFibGVzIiwidGFiIiwidGFiSW5kZXgiLCJ0YWJsZSIsInRhYmxlSW5kZXgiLCJkeW5hbWljVHlwZXdyaXRlciIsImVsZW1lbnQiLCJzcGVlZCIsImNhbGxiYWNrIiwidGV4dEFycmF5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwic3BsaXQiLCJsaXRBcnIiLCJqb2luIiwiZmlsdGVyIiwiX2NoYXIiLCJ3b3JkSW5kZXgiLCJjaGFySW5kZXgiLCJjdXJyZW50VGV4dCIsInR5cGVXb3JkIiwiY3VycmVudFdvcmQiLCJ1bmRlZmluZWQiLCJjaGFyQXQiLCJpbm5lclRleHQiLCJvYnNlcnZlRWxlbWVudHMiLCJ0eXBlRWxlbXMiLCJvcHRpb25zIiwicm9vdCIsInRocmVzaG9sZCIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJ0eXBlQW5pbSIsInByb2dyZXNzQW5pbSIsInN0YXJ0IiwiZWxlbSIsImVsZW1XcmFwIiwiY3VycmVudFBvc2l0aW9uIiwid2lkdGgiLCJwcm9ncmVzc0JhciIsInByb2dyZXNzV3JhcCIsInRhYmxlUG9wdXBCdG4iLCJjbG9zZVBvcHVwcyIsInBvcHVwc1dyYXAiLCJib2R5IiwiZG9uZVBvcHVwQnRuIiwid2VlazIiLCJzZXRJdGVtIiwibG9jYXRpb24iLCJyZWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBSztFQUMvQyxJQUFJQyxJQUFJLEdBQUdDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHQyxRQUFRLENBQUNGLFlBQVksQ0FB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IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+e1xuICAgIGxldCB3ZWVrID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpID8gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWVrXCIpKSA6IDE7XG5cbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZV9faW5mby1tb2JcIilcbiAgICBjb25zdCBpbmZvU2xpZGVzTW9iUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19pbmZvLWJvdHRvbVwiKVxuICAgIGNvbnN0IHNsaWRlQnRuc0xlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX19tb3ZlLWxlZnRcIilcbiAgICBjb25zdCBzbGlkZUJ0bnNSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfX21vdmUtcmlnaHRcIilcblxuICAgIGluZm9TbGlkZXNNb2IuZm9yRWFjaCgoaXRlbSwgaW5kZXhJdGVtKSA9PntcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBpbmZvU2xpZGVzTW9iUG9wdXAuZm9yRWFjaCgocG9wdXAsIGluZGV4UG9wdXApPT57XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SXRlbSA9PT0gaW5kZXhQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgc2xpZGVCdG5zTGVmdC5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuXG4gICAgfSlcbiAgICBzbGlkZUJ0bnNSaWdodC5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgICAgIGluZm9TbGlkZXNNb2JQb3B1cC5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuXG4gICAgfSlcblxuLy8vINCz0LvRltGHINGB0LvQsNC50LTQtdGAXG4gZnVuY3Rpb24gY3JlYXRlU2xpZGVyKHNsaWRlcywgbGVmdEJ0biwgcmlnaHRCdG4sIHNsaWRlc0ljb25zLCBjdXJyZW50LCBwYXRoLCBpbWcsIHdlZWssIGNvdmVyZmxvdywgY292ZXJmbG93T2ZmV2lkdGgpe1xuXG4gICAgIGxldCBjb3ZlcmZsb3dUb2dnbGVyID0gdHJ1ZVxuXG4gICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgY292ZXJmbG93T2ZmV2lkdGgpe1xuICAgICAgICAgY292ZXJmbG93VG9nZ2xlciA9IGZhbHNlXG4gICAgICAgICAvLyBjb25zb2xlLmxvZyhjb3ZlcmZsb3dUb2dnbGVyKVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gY292ZXJGbG93Q2xhc3NlcyhyaWdodCwgbGVmdCwgc2xpZGVzKXtcbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG4gICAgICAgICAgICAgaWYoY292ZXJmbG93VG9nZ2xlcil7XG4gICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IGkpe1xuICAgICAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLTFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZihzbGlkZS5uZXh0U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudCwgc2xpZGVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgIC8vIGlmKGkgIT09IGN1cnJlbnQgKyAxICYmIGkgIT09IHNsaWRlcy5sZW5ndGggJiYgaSAhPT0gMCl7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUocmlnaHQpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUobGVmdClcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coY3VycmVudCwgaSlcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gaWYoY3VycmVudCA9PT0gMCl7XG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHNsaWRlLm5leHRTaWJsaW5nKVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKGksIGN1cnJlbnQpXG4gICAgICAgICAgICAgLy8gaWYoaSA9PT0gY3VycmVudCArIDEpe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gaWYoY3VycmVudCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEgJiYgaSA9PT0gMCl7XG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdClcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBlbHNle1xuXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAvLyBpZihzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3RbMV0gPT09IFwiX2FjdGl2ZVwiKXtcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0WzFdID09PSBcIl9hY3RpdmVcIil7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICB9KVxuICAgICB9XG4gICAgIHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzKTtcbiAgICAgbGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGVmdEJ0bik7XG4gICAgIHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyaWdodEJ0bik7XG4gICAgIHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzbGlkZXNJY29ucyk7XG4gICAgIGxldCBnbGl0Y2hMYXllcnMgPSBbXTtcbiAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgZ2xpdGNoTGF5ZXJzID0gWy4uLmdsaXRjaExheWVycywgLi4uc2xpZGUucXVlcnlTZWxlY3RvckFsbChcIi5nbGl0Y2hfX2xheWVyXCIpXTtcbiAgICAgfSk7XG4gICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcbiAgICAgaWYoY292ZXJmbG93KXtcbiAgICAgICAgIGNvdmVyRmxvd0NsYXNzZXMoXCJyaWdodC1jb3ZlclwiLCBcImxlZnQtY292ZXJcIiwgc2xpZGVzKVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gdXBkYXRlR2xpdGNoTGF5ZXJzKHBhdGgsIGluZGV4KSB7XG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICBpbmRleCArPSA2XG4gICAgICAgICB9XG4gICAgICAgICBjb25zb2xlLmxvZyhpbmRleClcbiAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBpZiAobGF5ZXIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdFswXSAhPT0gXCJzbGlkZV9faW5mb1wiKSB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYHF1ZXN0JHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuYmFja2dyb3VuZCA9IHBhdGg7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKFwic2xpZGUtaW5mby1nbGl0Y2hcIik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgIC0tY3VycmVudDtcbiAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDApIGN1cnJlbnQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICArK2N1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDA7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGkgPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgICB9KTtcblxuICAgICAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gU2xpZGVJY29uc0luaXQoaWNvbnMsIGN1cnJlbnQpIHtcbiAgICAgICAgIGljb25zLmZvckVhY2goKGljb24sIGljb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZShcIl9jdXJyZW50XCIsIGN1cnJlbnQgPT09IGljb25JbmRleCk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGRpcmVjdGlvbikge1xuICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwiZ2xpdGNoXCIsIFwiZ2xpdGNoXCIsIHNsaWRlcylcbiAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgY29uc3QgbmV4dFNsaWRlSW5kZXggPSBkaXJlY3Rpb24gPT09IFwibGVmdFwiID8gKGN1cnJlbnQgPT09IDAgPyBzbGlkZXMubGVuZ3RoIDogY3VycmVudCkgOiAoY3VycmVudCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEgPyAxIDogY3VycmVudCArIDIpO1xuICAgICAgICAgY29uc29sZS5sb2cod2VlaylcbiAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXggKyA2fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgbmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgdXBkYXRlR2xpdGNoTGF5ZXJzKGB1cmwoXCIke3BhdGh9JHtuZXh0U2xpZGVJbmRleH0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4KTtcbiAgICAgICAgIH1cbiAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpIHx8IGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIG1vdmVTbGlkZXIoc2xpZGVzLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+e1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcInJpZ2h0LWNvdmVyXCIpXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwibGVmdC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9LCAxMDAwKTtcbiAgICAgfVxuXG4gICAgIGxlZnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUNsaWNrKFwibGVmdFwiKSk7XG4gICAgIHJpZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcInJpZ2h0XCIpKTtcblxuICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9jdXJyZW50XCIpKSByZXR1cm5cbiAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9jdXJyZW50XCIpKTtcbiAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIGN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyA3fS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyAxfS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEpO1xuXG4gICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaW5kZXggPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgIH0pO1xuICAgICB9KTtcblxuICAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG5cbiB9XG4gZnVuY3Rpb24gc2V0UG9wdXBzKHBvcHVwcywgcG9wdXBCdG5zLCBjbG9zZUJ0bnMpe1xuICAgIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBzKVxuICAgIHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocG9wdXBCdG5zKVxuICAgIGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xvc2VCdG5zKVxuXG4gICAgcG9wdXBCdG5zLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgcG9wdXBzLmZvckVhY2goKHBvcHVwID0+IHtcbiAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwb3B1cC5wYXJlbnRFbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgfSlcbiAgICAgfSlcbiAgICBjbG9zZUJ0bnMuZm9yRWFjaChidG4gPT57XG4gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAgPT4ge1xuICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgfSkpXG4gICAgICAgICB9KVxuICAgICB9KVxuIH1cblxuXG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZVwiKTtcblxuICAgIGNvbnN0IHNsaWRlc0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIik7XG4gICAgaWYod2VlayA9PT0gMSl7XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaSkgPT57XG5cbiAgICAgICAgICAgIGlmKGkgPj0gNiB8fCBzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAgICAgICAgICAgICBzbGlkZS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PntcbiAgICAgICAgICAgIGlmKGkgPj0gNiB8fCBpY29uLmNsYXNzTGlzdC5jb250YWlucyhgcXVlc3Qke2l9YCkpe1xuICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XG4gICAgICAgICAgICBsZXQgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucXVlc3Qke2l9YClcbiAgICAgICAgICAgIHdlZWsxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHF1ZXN0c1BhdGggPSBcIi4vaW1nL3F1ZXN0cy9zbGlkZVwiXG5cbiAgICBmdW5jdGlvbiBjaGVja01lZGlhUXVlcmllcyhvbGRQYXRoLCBuZXdQYXRoKSB7XG5cbiAgICAgICAgY29uc3QgbWVkaWFRdWVyeTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xuXG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnk5NTBMYW5kc2NhcGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk1MHB4KSBhbmQgKG1heC1oZWlnaHQ6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXCIpO1xuXG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5NjAwLm1hdGNoZXMpIHtcblxuICAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWVkaWFRdWVyeTk1MExhbmRzY2FwZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBvbGRQYXRoID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgb2xkUGF0aCA9IG5ld1BhdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2xkUGF0aFxuICAgIH1cblxuXG5cblxuICAgIHF1ZXN0c1BhdGggPSBjaGVja01lZGlhUXVlcmllcyhxdWVzdHNQYXRoLCBcIi4vaW1nL3F1ZXN0cy9tb2Ivc2xpZGVcIilcbiAgICBjb25zb2xlLmxvZyhxdWVzdHNQYXRoKVxuXG5cbiAgICBjcmVhdGVTbGlkZXIoXCIuc2xpZGVcIiwgXCIuc2xpZGVfX21vdmUtbGVmdFwiLCBcIi5zbGlkZV9fbW92ZS1yaWdodFwiLCBcIi5xdWVzdHNfX2ljb25zLWl0ZW1cIiwgMSxxdWVzdHNQYXRoLCBcInBlcnMucG5nXCIsIHdlZWsgKVxuICAgIGNyZWF0ZVNsaWRlcihcIi5wcml6ZV9fc2xpZGVcIiwgXCIucHJpemVfX21vdmUtbGVmdFwiLCBcIi5wcml6ZV9fbW92ZS1yaWdodFwiLCBcIi5wcml6ZV9faWNvbnMtaXRlbVwiLCAxLFwiLi9pbWcvcHJpemUvc2xpZGVcIiwgXCJwcml6ZS5wbmdcIiwgbnVsbCwgdHJ1ZSAsIDExNTApXG5cbiAgICBzZXRQb3B1cHMoXCIuZ3VpZGVfX2luZm9cIiwgXCIuZ3VpZGVfX2luZm8tYnRuXCIsIFwiLmd1aWRlX19pbmZvLWNsb3NlXCIpXG4gICAgc2V0UG9wdXBzKFwiLnByaXplX19zbGlkZS1wb3B1cFwiLCBcIi5wcml6ZV9fc2xpZGUtaW5mby1idG5cIiwgXCIucHJpemVfX3NsaWRlLWNsb3NlXCIpXG5cbiAgICBjb25zdCB0YWJsZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19saXN0LWl0ZW1cIilcbiAgICBjb25zdCB0YWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19pdGVtXCIpXG5cbiAgICB0YWJsZVRhYnMuZm9yRWFjaCgodGFiLCB0YWJJbmRleCkgPT57XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgdGFibGVUYWJzLmZvckVhY2goKGl0ZW0pID0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGFibGVzLmZvckVhY2goKHRhYmxlLCB0YWJsZUluZGV4KSA9PntcbiAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaWYodGFibGVJbmRleCA9PT0gIHRhYkluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuXG4vLy8g0LDQvdGW0LzQsNGG0ZbRjyDQtNC40L3QsNC80ZbRh9C90L7Qs9C+INC90LDQsdC+0YDRgyDRgtC10LrRgdGCXG4gICAgZnVuY3Rpb24gZHluYW1pY1R5cGV3cml0ZXIoZWxlbWVudCwgc3BlZWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHRleHRBcnJheSA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIC8vIGNvbnN0IGxpdEFyciA9IHRleHRBcnJheS5qb2luKCcgJykuc3BsaXQoLyg/PD1cXFMpKD89XFxzKXwoPz1cXFMpLykuZmlsdGVyKGNoYXIgPT4gY2hhciAhPT0gJycpO1xuICAgICAgICBjb25zdCBsaXRBcnIgPSB0ZXh0QXJyYXkuam9pbignICcpLnNwbGl0KC8oXFxzKykvKS5maWx0ZXIoZnVuY3Rpb24gKF9jaGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NoYXIudHJpbSgpICE9PSAnJyB8fCBfY2hhciA9PT0gJyAnO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHdvcmRJbmRleCA9IDA7XG4gICAgICAgIGxldCBjaGFySW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudFRleHQgPSAnJztcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJfb3BhY2l0eVwiKVxuXG4gICAgICAgIGZ1bmN0aW9uIHR5cGVXb3JkKCkge1xuICAgICAgICAgICAgaWYgKHdvcmRJbmRleCA9PT0gbGl0QXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHlwZXdyaXRlci1jdXJzb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V29yZCA9IHRleHRBcnJheVt3b3JkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50V29yZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKGNoYXJJbmRleCA8IGN1cnJlbnRXb3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IGN1cnJlbnRXb3JkLmNoYXJBdChjaGFySW5kZXgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICAgICAgY2hhckluZGV4Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0eXBlV29yZCwgc3BlZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSAnICc7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50VGV4dDtcbiAgICAgICAgICAgICAgICBjaGFySW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHdvcmRJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHlwZVdvcmQsIHNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHlwZXdyaXRlci1jdXJzb3InKTtcblxuICAgICAgICB0eXBlV29yZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50cyh0eXBlRWxlbXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBkeW5hbWljVHlwZXdyaXRlcihlbnRyeS50YXJnZXQsIDM1LCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB0eXBlRWxlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGVBbmltID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYW5pbScpO1xuICAgIG9ic2VydmVFbGVtZW50cyh0eXBlQW5pbSk7XG5cbi8vLyBwcm9ncmVzcyBiYXIg0LDQvdGW0LzQsNGG0ZbRj1xuICAgIGZ1bmN0aW9uIHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbil7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbiA8PSAxMDApe1xuICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGAke2N1cnJlbnRQb3NpdGlvbn0lYFxuICAgICAgICAgICAgZWxlbVdyYXAuaW5uZXJUZXh0ID0gYCR7Y3VycmVudFBvc2l0aW9ufSVgXG4gICAgICAgICAgICArK2N1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4gcHJvZ3Jlc3NBbmltKHN0YXJ0LCBlbGVtLCBlbGVtV3JhcCwgY3VycmVudFBvc2l0aW9uKSwgNzApXG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRQb3NpdGlvbiA+PSAxMDApe1xuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uID0gc3RhcnRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHByb2dyZXNzQW5pbShzdGFydCwgZWxlbSwgZWxlbVdyYXAsIGN1cnJlbnRQb3NpdGlvbiksIDcwKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX19wcm9ncmVzcy1iYXJcIilcbiAgICBjb25zdCBwcm9ncmVzc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX3Byb2dyZXNzLXRleHRcIilcblxuICAgIHByb2dyZXNzQW5pbSg0MCwgcHJvZ3Jlc3NCYXIsIHByb2dyZXNzV3JhcCwgNDApXG5cbi8vIHBvcHVwc1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19idG5cIilcbiAgICBjb25zdCBjbG9zZVBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzX19jbG9zZVwiKVxuICAgIGNvbnN0IHBvcHVwc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc1wiKVxuXG4gICAgdGFibGVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LmFkZChcIl90YWJsZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG4gICAgfSlcbiAgICBjbG9zZVBvcHVwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl90YWJsZVwiKVxuICAgICAgICBwb3B1cHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJfZG9uZVwiKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfb3ZlcmZsb3ctaGlkZGVuXCIpXG5cbiAgICB9KVxuXG5cbi8vIGZvciB0ZXN0XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbi1sbmdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJlblwiKVxuICAgIH0pXG5cbiAgICBjb25zdCBkb25lUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvbmUtcG9wdXBcIilcblxuICAgIGRvbmVQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIHBvcHVwc1dyYXAuY2xhc3NMaXN0LnRvZ2dsZShcIl9kb25lXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcIl9vdmVyZmxvdy1oaWRkZW5cIilcblxuICAgIH0pXG5cbiAgICBjb25zdCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazFcIik7XG4gICAgY29uc3Qgd2VlazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsyXCIpO1xuXG4gICAgd2VlazEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDEpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHdlZWsyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAyKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cblxufSlcblxuIl19
