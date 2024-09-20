"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener("DOMContentLoaded", function () {
  var week = localStorage.getItem("week") ? parseInt(localStorage.getItem("week")) : 1;
  console.log(week);
  function createSlider(slides, leftBtn, rightBtn, slidesIcons, current, path, img, week, coverflow) {
    function coverFlowClasses(right, left, slides) {
      slides.forEach(function (slide, i) {
        if (current === i) {
          if (slide.previousElementSibling === null) {
            slides[slides.length - 1].classList.add(right);
            // slides[slides.length -1].classList.add("glitch")
          } else {
            slide.previousElementSibling.classList.add(right);
            // slide.previousElementSibling.classList.add("glitch")
          }

          if (slide.nextSibling === null) {
            slides[0].classList.add(left);
            // slides[0].classList.add("glitch")
          } else {
            slide.nextSibling.classList.add(left);
            // slide.nextSibling.classList.add("glitch")
          }

          console.log(current, slides.length - 1);
          // if(current === slides.length -1){
          //     slides[0].classList.add(left)
          //     slides[slides.length - 1].classList.add(right)
          // }
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
        updateGlitchLayers("url(\"".concat(path).concat(current + 1, "/").concat(img, "\") no-repeat 0 0/contain"), current + 1);
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
  createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1, "./img/quests/slide", "pers.png", week);
  createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 1, "./img/prize/slide", "prize.png", null, true);

  // const leftBtnPrize = document.querySelector(".prize__move-left");
  // const rightBtnPrize = document.querySelector(".prize__move-right");

  // function coverFlowClasses(right, left, slides){
  //     slides = document.querySelectorAll(slides)
  //
  //     slides.forEach(slide =>{
  //         slide.classList.remove(right)
  //         slide.classList.remove(left)
  //         if(slide.nextSibling.classList[1] === "_active"){
  //             slide.classList.add(left)
  //         }
  //         if(slide.previousElementSibling.classList[1] === "_active"){
  //             slide.classList.add(left)
  //         }
  //     })
  // }
  // leftBtnPrize.addEventListener("click", () =>{
  //     coverFlowClasses("right-cover", "left-cover", '.prize__slide')
  // })

  // for test

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2VlayIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUludCIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVTbGlkZXIiLCJzbGlkZXMiLCJsZWZ0QnRuIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImN1cnJlbnQiLCJwYXRoIiwiaW1nIiwiY292ZXJmbG93IiwiY292ZXJGbG93Q2xhc3NlcyIsInJpZ2h0IiwibGVmdCIsImZvckVhY2giLCJzbGlkZSIsImkiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGVuZ3RoIiwiY2xhc3NMaXN0IiwiYWRkIiwibmV4dFNpYmxpbmciLCJxdWVyeVNlbGVjdG9yQWxsIiwicXVlcnlTZWxlY3RvciIsImdsaXRjaExheWVycyIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwicmVtb3ZlIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJ0b2dnbGUiLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbiIsImljb25JbmRleCIsImhhbmRsZUNsaWNrIiwicG9pbnRlckV2ZW50cyIsIm5leHRTbGlkZUluZGV4Iiwic2V0VGltZW91dCIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsIml0ZW0iLCJ3ZWVrMSIsIndlZWsyIiwic2V0SXRlbSIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFDL0MsSUFBSUMsSUFBSSxHQUFHQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBR0MsUUFBUSxDQUFDRixZQUFZLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDcEZFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTCxJQUFJLENBQUM7RUFHcEIsU0FBU00sWUFBWSxDQUFDQyxNQUFNLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFQyxXQUFXLEVBQUVDLE9BQU8sRUFBRUMsSUFBSSxFQUFFQyxHQUFHLEVBQUViLElBQUksRUFBRWMsU0FBUyxFQUFDO0lBRTlGLFNBQVNDLGdCQUFnQixDQUFDQyxLQUFLLEVBQUVDLElBQUksRUFBRVYsTUFBTSxFQUFDO01BQzFDQSxNQUFNLENBQUNXLE9BQU8sQ0FBQyxVQUFDQyxLQUFLLEVBQUVDLENBQUMsRUFBSTtRQUN4QixJQUFHVCxPQUFPLEtBQUtTLENBQUMsRUFBQztVQUNiLElBQUdELEtBQUssQ0FBQ0Usc0JBQXNCLEtBQUssSUFBSSxFQUFDO1lBQ3JDZCxNQUFNLENBQUNBLE1BQU0sQ0FBQ2UsTUFBTSxHQUFFLENBQUMsQ0FBQyxDQUFDQyxTQUFTLENBQUNDLEdBQUcsQ0FBQ1IsS0FBSyxDQUFDO1lBQzdDO1VBQ0osQ0FBQyxNQUFJO1lBQ0RHLEtBQUssQ0FBQ0Usc0JBQXNCLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDUixLQUFLLENBQUM7WUFDakQ7VUFDSjs7VUFDQSxJQUFHRyxLQUFLLENBQUNNLFdBQVcsS0FBSyxJQUFJLEVBQUM7WUFDMUJsQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNnQixTQUFTLENBQUNDLEdBQUcsQ0FBQ1AsSUFBSSxDQUFDO1lBQzdCO1VBQ0osQ0FBQyxNQUNHO1lBQ0FFLEtBQUssQ0FBQ00sV0FBVyxDQUFDRixTQUFTLENBQUNDLEdBQUcsQ0FBQ1AsSUFBSSxDQUFDO1lBQ3JDO1VBRUo7O1VBQ0FiLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTSxPQUFPLEVBQUVKLE1BQU0sQ0FBQ2UsTUFBTSxHQUFHLENBQUMsQ0FBQztVQUN2QztVQUNBO1VBQ0E7VUFDQTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO01BQ0osQ0FBQyxDQUFDO0lBQ047O0lBQ0FmLE1BQU0sR0FBR1QsUUFBUSxDQUFDNEIsZ0JBQWdCLENBQUNuQixNQUFNLENBQUM7SUFDMUNDLE9BQU8sR0FBR1YsUUFBUSxDQUFDNkIsYUFBYSxDQUFDbkIsT0FBTyxDQUFDO0lBQ3pDQyxRQUFRLEdBQUdYLFFBQVEsQ0FBQzZCLGFBQWEsQ0FBQ2xCLFFBQVEsQ0FBQztJQUMzQ0MsV0FBVyxHQUFHWixRQUFRLENBQUM0QixnQkFBZ0IsQ0FBQ2hCLFdBQVcsQ0FBQztJQUNwRCxJQUFJa0IsWUFBWSxHQUFHLEVBQUU7SUFDckJyQixNQUFNLENBQUNXLE9BQU8sQ0FBQyxVQUFBQyxLQUFLLEVBQUk7TUFDcEJTLFlBQVksZ0NBQU9BLFlBQVksc0JBQUtULEtBQUssQ0FBQ08sZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsRUFBQztJQUNqRixDQUFDLENBQUM7SUFDRm5CLE1BQU0sQ0FBQ0ksT0FBTyxDQUFDLENBQUNZLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN4QyxJQUFHVixTQUFTLEVBQUM7TUFDVEMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRVIsTUFBTSxDQUFDO0lBQ3pEO0lBRUEsU0FBU3NCLGtCQUFrQixDQUFDakIsSUFBSSxFQUFFa0IsS0FBSyxFQUFFO01BQ3JDLElBQUc5QixJQUFJLEtBQUssQ0FBQyxFQUFDO1FBQ1Y4QixLQUFLLElBQUksQ0FBQztNQUNkO01BQ0ExQixPQUFPLENBQUNDLEdBQUcsQ0FBQ3lCLEtBQUssQ0FBQztNQUNsQkYsWUFBWSxDQUFDVixPQUFPLENBQUMsVUFBQWEsS0FBSyxFQUFJO1FBQzFCQSxLQUFLLENBQUNSLFNBQVMsQ0FBQ0wsT0FBTyxDQUFDLFVBQUFjLFNBQVMsRUFBSTtVQUNqQyxJQUFJQSxTQUFTLENBQUNDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzNDRixLQUFLLENBQUNSLFNBQVMsQ0FBQ1csTUFBTSxDQUFDLG1CQUFtQixDQUFDO1VBQy9DO1VBQ0EsSUFBSUYsU0FBUyxDQUFDQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0JGLEtBQUssQ0FBQ1IsU0FBUyxDQUFDVyxNQUFNLENBQUNGLFNBQVMsQ0FBQztVQUNyQztRQUNKLENBQUMsQ0FBQztRQUNGLElBQUlELEtBQUssQ0FBQ0ksYUFBYSxDQUFDQSxhQUFhLENBQUNaLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLEVBQUU7VUFDbEVRLEtBQUssQ0FBQ1IsU0FBUyxDQUFDQyxHQUFHLGdCQUFTTSxLQUFLLEVBQUc7VUFDcENDLEtBQUssQ0FBQ0ssS0FBSyxDQUFDQyxVQUFVLEdBQUd6QixJQUFJO1FBQ2pDLENBQUMsTUFDSTtVQUNEbUIsS0FBSyxDQUFDUixTQUFTLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QztNQUNKLENBQUMsQ0FBQztJQUNOO0lBRUEsU0FBU2MsVUFBVSxDQUFDL0IsTUFBTSxFQUFFZ0MsU0FBUyxFQUFFO01BQ25DLElBQUlBLFNBQVMsS0FBSyxNQUFNLEVBQUU7UUFDdEIsRUFBRTVCLE9BQU87UUFDVCxJQUFJQSxPQUFPLEdBQUcsQ0FBQyxFQUFFQSxPQUFPLEdBQUdKLE1BQU0sQ0FBQ2UsTUFBTSxHQUFHLENBQUM7TUFDaEQsQ0FBQyxNQUFNLElBQUlpQixTQUFTLEtBQUssT0FBTyxFQUFFO1FBQzlCLEVBQUU1QixPQUFPO1FBQ1QsSUFBSUEsT0FBTyxHQUFHSixNQUFNLENBQUNlLE1BQU0sR0FBRyxDQUFDLEVBQUVYLE9BQU8sR0FBRyxDQUFDO01BQ2hEO01BRUFKLE1BQU0sQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLEtBQUssRUFBRUMsQ0FBQyxFQUFLO1FBQ3pCRCxLQUFLLENBQUNJLFNBQVMsQ0FBQ2lCLE1BQU0sQ0FBQyxTQUFTLEVBQUVwQixDQUFDLEtBQUtULE9BQU8sQ0FBQztRQUNoRFEsS0FBSyxDQUFDSSxTQUFTLENBQUNXLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDcEMsQ0FBQyxDQUFDO01BRUZPLGNBQWMsQ0FBQy9CLFdBQVcsRUFBRUMsT0FBTyxDQUFDO0lBQ3hDO0lBRUEsU0FBUzhCLGNBQWMsQ0FBQ0MsS0FBSyxFQUFFL0IsT0FBTyxFQUFFO01BQ3BDK0IsS0FBSyxDQUFDeEIsT0FBTyxDQUFDLFVBQUN5QixJQUFJLEVBQUVDLFNBQVMsRUFBSztRQUMvQkQsSUFBSSxDQUFDcEIsU0FBUyxDQUFDaUIsTUFBTSxDQUFDLFVBQVUsRUFBRTdCLE9BQU8sS0FBS2lDLFNBQVMsQ0FBQztNQUM1RCxDQUFDLENBQUM7SUFDTjtJQUVBLFNBQVNDLFdBQVcsQ0FBQ04sU0FBUyxFQUFFO01BQzVCaEMsTUFBTSxDQUFDSSxPQUFPLENBQUMsQ0FBQ1ksU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQ3ZDVCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFUixNQUFNLENBQUM7TUFDNUNFLFFBQVEsQ0FBQzJCLEtBQUssQ0FBQ1UsYUFBYSxHQUFHLE1BQU07TUFDckN0QyxPQUFPLENBQUM0QixLQUFLLENBQUNVLGFBQWEsR0FBRyxNQUFNO01BQ3BDLElBQU1DLGNBQWMsR0FBR1IsU0FBUyxLQUFLLE1BQU0sR0FBSTVCLE9BQU8sS0FBSyxDQUFDLEdBQUdKLE1BQU0sQ0FBQ2UsTUFBTSxHQUFHWCxPQUFPLEdBQUtBLE9BQU8sS0FBS0osTUFBTSxDQUFDZSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBR1gsT0FBTyxHQUFHLENBQUU7TUFDM0lQLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTCxJQUFJLENBQUM7TUFDakIsSUFBR0EsSUFBSSxLQUFLLENBQUMsRUFBQztRQUNWNkIsa0JBQWtCLGlCQUFTakIsSUFBSSxTQUFHbUMsY0FBYyxHQUFHLENBQUMsY0FBSWxDLEdBQUcsZ0NBQTRCa0MsY0FBYyxDQUFDO01BQzFHLENBQUMsTUFBSTtRQUNEbEIsa0JBQWtCLGlCQUFTakIsSUFBSSxTQUFHbUMsY0FBYyxjQUFJbEMsR0FBRyxnQ0FBNEJrQyxjQUFjLENBQUM7TUFDdEc7TUFDQUMsVUFBVSxDQUFDLFlBQU07UUFDYnBCLFlBQVksQ0FBQ1YsT0FBTyxDQUFDLFVBQUFhLEtBQUssRUFBSTtVQUMxQkEsS0FBSyxDQUFDUixTQUFTLENBQUNMLE9BQU8sQ0FBQyxVQUFBYyxTQUFTLEVBQUk7WUFDakMsSUFBSUEsU0FBUyxDQUFDQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsSUFBSUQsU0FBUyxDQUFDQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7Y0FDNUVGLEtBQUssQ0FBQ1IsU0FBUyxDQUFDVyxNQUFNLENBQUNGLFNBQVMsQ0FBQztZQUNyQztVQUNKLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQztRQUNGTSxVQUFVLENBQUMvQixNQUFNLEVBQUVnQyxTQUFTLENBQUM7UUFDN0I5QixRQUFRLENBQUMyQixLQUFLLENBQUNVLGFBQWEsR0FBRyxTQUFTO1FBQ3hDdEMsT0FBTyxDQUFDNEIsS0FBSyxDQUFDVSxhQUFhLEdBQUcsU0FBUztRQUV2QyxJQUFHaEMsU0FBUyxFQUFDO1VBQ1RQLE1BQU0sQ0FBQ1csT0FBTyxDQUFDLFVBQUFDLEtBQUssRUFBRztZQUNuQkEsS0FBSyxDQUFDSSxTQUFTLENBQUNXLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDckNmLEtBQUssQ0FBQ0ksU0FBUyxDQUFDVyxNQUFNLENBQUMsWUFBWSxDQUFDO1lBQ3BDZixLQUFLLENBQUNJLFNBQVMsQ0FBQ1csTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUNwQyxDQUFDLENBQUM7VUFDRm5CLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUVSLE1BQU0sQ0FBQztRQUN6RDtNQUNKLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDWjtJQUVBQyxPQUFPLENBQUNULGdCQUFnQixDQUFDLE9BQU8sRUFBRTtNQUFBLE9BQU04QyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQUEsRUFBQztJQUM1RHBDLFFBQVEsQ0FBQ1YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO01BQUEsT0FBTThDLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFBQSxFQUFDO0lBRTlEbkMsV0FBVyxDQUFDUSxPQUFPLENBQUMsVUFBQ3lCLElBQUksRUFBRXZCLENBQUMsRUFBSztNQUM3QnVCLElBQUksQ0FBQzVDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDa0QsQ0FBQyxFQUFLO1FBQ2xDLElBQUdBLENBQUMsQ0FBQ0MsTUFBTSxDQUFDM0IsU0FBUyxDQUFDNEIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVDSCxVQUFVLENBQUMsWUFBTTtVQUNidEMsV0FBVyxDQUFDUSxPQUFPLENBQUMsVUFBQWtDLElBQUk7WUFBQSxPQUFJQSxJQUFJLENBQUM3QixTQUFTLENBQUNXLE1BQU0sQ0FBQyxVQUFVLENBQUM7VUFBQSxFQUFDO1FBQ2xFLENBQUMsRUFBRSxJQUFJLENBQUM7UUFFUjNCLE1BQU0sQ0FBQ0ksT0FBTyxDQUFDLENBQUNZLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN2Q2IsT0FBTyxHQUFHUyxDQUFDO1FBQ1hTLGtCQUFrQixpQkFBU2pCLElBQUksU0FBR0QsT0FBTyxHQUFHLENBQUMsY0FBSUUsR0FBRyxnQ0FBNEJGLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFNUZxQyxVQUFVLENBQUMsWUFBTTtVQUNiUCxjQUFjLENBQUMvQixXQUFXLEVBQUVDLE9BQU8sQ0FBQztVQUNwQ0osTUFBTSxDQUFDVyxPQUFPLENBQUMsVUFBQ0MsS0FBSyxFQUFFVyxLQUFLLEVBQUs7WUFDN0JYLEtBQUssQ0FBQ0ksU0FBUyxDQUFDaUIsTUFBTSxDQUFDLFNBQVMsRUFBRVYsS0FBSyxLQUFLbkIsT0FBTyxDQUFDO1lBQ3BEUSxLQUFLLENBQUNJLFNBQVMsQ0FBQ1csTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUNwQyxDQUFDLENBQUM7VUFDRnpCLFFBQVEsQ0FBQzJCLEtBQUssQ0FBQ1UsYUFBYSxHQUFHLFNBQVM7VUFDeEN0QyxPQUFPLENBQUM0QixLQUFLLENBQUNVLGFBQWEsR0FBRyxTQUFTO1FBQzNDLENBQUMsRUFBRSxJQUFJLENBQUM7TUFDWixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7SUFFRkwsY0FBYyxDQUFDL0IsV0FBVyxFQUFFQyxPQUFPLENBQUM7RUFFeEM7RUFJRyxJQUFNSixNQUFNLEdBQUdULFFBQVEsQ0FBQzRCLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztFQUVsRCxJQUFNaEIsV0FBVyxHQUFHWixRQUFRLENBQUM0QixnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztFQUNwRSxJQUFHMUIsSUFBSSxLQUFLLENBQUMsRUFBQztJQUNWTyxNQUFNLENBQUNXLE9BQU8sQ0FBQyxVQUFDQyxLQUFLLEVBQUVDLENBQUMsRUFBSTtNQUV4QixJQUFHQSxDQUFDLElBQUksQ0FBQyxJQUFJRCxLQUFLLENBQUNJLFNBQVMsQ0FBQzRCLFFBQVEsZ0JBQVMvQixDQUFDLEVBQUcsRUFBQztRQUMvQ0QsS0FBSyxDQUFDZSxNQUFNLEVBQUU7TUFDbEI7SUFDSixDQUFDLENBQUM7SUFDRnhCLFdBQVcsQ0FBQ1EsT0FBTyxDQUFDLFVBQUN5QixJQUFJLEVBQUV2QixDQUFDLEVBQUk7TUFDNUIsSUFBR0EsQ0FBQyxJQUFJLENBQUMsSUFBSXVCLElBQUksQ0FBQ3BCLFNBQVMsQ0FBQzRCLFFBQVEsZ0JBQVMvQixDQUFDLEVBQUcsRUFBQztRQUM5Q3VCLElBQUksQ0FBQ1QsTUFBTSxFQUFFO01BQ2pCO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFDQSxJQUFHbEMsSUFBSSxLQUFLLENBQUMsRUFBQztJQUNWLEtBQUssSUFBSW9CLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUVBLENBQUMsRUFBRSxFQUFDO01BQ3hCLElBQUlpQyxLQUFLLEdBQUd2RCxRQUFRLENBQUM0QixnQkFBZ0IsaUJBQVVOLENBQUMsRUFBRztNQUNuRGlDLEtBQUssQ0FBQ25DLE9BQU8sQ0FBQyxVQUFBa0MsSUFBSSxFQUFJO1FBQ2xCQSxJQUFJLENBQUNsQixNQUFNLEVBQUU7TUFDakIsQ0FBQyxDQUFDO0lBRU47RUFDSjtFQUVBNUIsWUFBWSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQUMsb0JBQW9CLEVBQUUsVUFBVSxFQUFFTixJQUFJLENBQUU7RUFDbklNLFlBQVksQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxFQUFDLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFFOztFQUUvSTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUo7O0VBRUksSUFBTStDLEtBQUssR0FBR3ZELFFBQVEsQ0FBQzZCLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDOUMsSUFBTTJCLEtBQUssR0FBR3hELFFBQVEsQ0FBQzZCLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFOUMwQixLQUFLLENBQUN0RCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0UsWUFBWSxDQUFDc0QsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGSCxLQUFLLENBQUN2RCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ0UsWUFBWSxDQUFDc0QsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUdOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcbiAgICBjb25zb2xlLmxvZyh3ZWVrKVxuXG5cbiBmdW5jdGlvbiBjcmVhdGVTbGlkZXIoc2xpZGVzLCBsZWZ0QnRuLCByaWdodEJ0biwgc2xpZGVzSWNvbnMsIGN1cnJlbnQsIHBhdGgsIGltZywgd2VlaywgY292ZXJmbG93KXtcblxuICAgICBmdW5jdGlvbiBjb3ZlckZsb3dDbGFzc2VzKHJpZ2h0LCBsZWZ0LCBzbGlkZXMpe1xuICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcbiAgICAgICAgICAgICBpZihjdXJyZW50ID09PSBpKXtcbiAgICAgICAgICAgICAgICAgaWYoc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtMV0uY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAgICAgICAgIC8vIHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0xXS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKHJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgLy8gc2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYoc2xpZGUubmV4dFNpYmxpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIC8vIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAgICAgICAgIC8vIHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIilcblxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIHNsaWRlcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgICAvLyBpZihjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0xKXtcbiAgICAgICAgICAgICAgICAgLy8gICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgICAgIC8vICAgICBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAvLyBpZihpICE9PSBjdXJyZW50ICsgMSAmJiBpICE9PSBzbGlkZXMubGVuZ3RoICYmIGkgIT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHJpZ2h0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKGxlZnQpXG4gICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGN1cnJlbnQsIGkpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZylcbiAgICAgICAgICAgICAvLyAgICAgc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmFkZChyaWdodClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhpLCBjdXJyZW50KVxuICAgICAgICAgICAgIC8vIGlmKGkgPT09IGN1cnJlbnQgKyAxKXtcbiAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0KVxuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxICYmIGkgPT09IDApe1xuICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzbGlkZS5uZXh0U2libGluZy5jbGFzc0xpc3QpXG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgLy8gZWxzZXtcblxuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQocmlnaHQpXG4gICAgICAgICAgICAgLy8gaWYoc2xpZGUubmV4dFNpYmxpbmcuY2xhc3NMaXN0WzFdID09PSBcIl9hY3RpdmVcIil7XG4gICAgICAgICAgICAgLy8gICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAvLyBpZihzbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdFsxXSA9PT0gXCJfYWN0aXZlXCIpe1xuICAgICAgICAgICAgIC8vICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGxlZnQpXG4gICAgICAgICAgICAgLy8gfVxuICAgICAgICAgfSlcbiAgICAgfVxuICAgICBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNsaWRlcyk7XG4gICAgIGxlZnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxlZnRCdG4pO1xuICAgICByaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmlnaHRCdG4pO1xuICAgICBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzSWNvbnMpO1xuICAgICBsZXQgZ2xpdGNoTGF5ZXJzID0gW107XG4gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgIGdsaXRjaExheWVycyA9IFsuLi5nbGl0Y2hMYXllcnMsIC4uLnNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xpdGNoX19sYXllclwiKV07XG4gICAgIH0pO1xuICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgIGlmKGNvdmVyZmxvdyl7XG4gICAgICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsIHNsaWRlcylcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHVwZGF0ZUdsaXRjaExheWVycyhwYXRoLCBpbmRleCkge1xuICAgICAgICAgaWYod2VlayA9PT0gMil7XG4gICAgICAgICAgICAgaW5kZXggKz0gNlxuICAgICAgICAgfVxuICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXG4gICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwic2xpZGUtaW5mby1nbGl0Y2hcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJxdWVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgaWYgKGxheWVyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMF0gIT09IFwic2xpZGVfX2luZm9cIikge1xuICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKGBxdWVzdCR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBwYXRoO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChcInNsaWRlLWluZm8tZ2xpdGNoXCIpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbikge1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAtLWN1cnJlbnQ7XG4gICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAwKSBjdXJyZW50ID0gc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICAgKytjdXJyZW50O1xuICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzLmxlbmd0aCAtIDEpIGN1cnJlbnQgPSAwO1xuICAgICAgICAgfVxuXG4gICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgfSk7XG5cbiAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIFNsaWRlSWNvbnNJbml0KGljb25zLCBjdXJyZW50KSB7XG4gICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJfY3VycmVudFwiLCBjdXJyZW50ID09PSBpY29uSW5kZXgpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhkaXJlY3Rpb24pIHtcbiAgICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpO1xuICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcImdsaXRjaFwiLCBcImdsaXRjaFwiLCBzbGlkZXMpXG4gICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgIGNvbnN0IG5leHRTbGlkZUluZGV4ID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiA/IChjdXJyZW50ID09PSAwID8gc2xpZGVzLmxlbmd0aCA6IGN1cnJlbnQpIDogKGN1cnJlbnQgPT09IHNsaWRlcy5sZW5ndGggLSAxID8gMSA6IGN1cnJlbnQgKyAyKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHdlZWspXG4gICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke25leHRTbGlkZUluZGV4ICsgNn0vJHtpbWd9XCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmAsIG5leHRTbGlkZUluZGV4KTtcbiAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhgdXJsKFwiJHtwYXRofSR7bmV4dFNsaWRlSW5kZXh9LyR7aW1nfVwiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gLCBuZXh0U2xpZGVJbmRleCk7XG4gICAgICAgICB9XG4gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICBpZihjb3ZlcmZsb3cpe1xuICAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PntcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJyaWdodC1jb3ZlclwiKVxuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtY292ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY292ZXJGbG93Q2xhc3NlcyhcInJpZ2h0LWNvdmVyXCIsIFwibGVmdC1jb3ZlclwiLCBzbGlkZXMpXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSwgMTAwMCk7XG4gICAgIH1cblxuICAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVDbGljayhcImxlZnRcIikpO1xuICAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xuICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfY3VycmVudFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMoYHVybChcIiR7cGF0aH0ke2N1cnJlbnQgKyAxfS8ke2ltZ31cIikgbm8tcmVwZWF0IDAgMC9jb250YWluYCwgY3VycmVudCArIDEpO1xuXG4gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIiwgaW5kZXggPT09IGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgIHJpZ2h0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICB9KTtcbiAgICAgfSk7XG5cbiAgICAgU2xpZGVJY29uc0luaXQoc2xpZGVzSWNvbnMsIGN1cnJlbnQpO1xuXG4gfVxuXG5cblxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVcIik7XG5cbiAgICBjb25zdCBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlc3RzX19pY29ucy1pdGVtXCIpO1xuICAgIGlmKHdlZWsgPT09IDEpe1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuXG4gICAgICAgICAgICBpZihpID49IDYgfHwgc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT57XG4gICAgICAgICAgICBpZihpID49IDYgfHwgaWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAgICAgICAgICAgICBpY29uLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2OyBpKyspe1xuICAgICAgICAgICAgbGV0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnF1ZXN0JHtpfWApXG4gICAgICAgICAgICB3ZWVrMS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVNsaWRlcihcIi5zbGlkZVwiLCBcIi5zbGlkZV9fbW92ZS1sZWZ0XCIsIFwiLnNsaWRlX19tb3ZlLXJpZ2h0XCIsIFwiLnF1ZXN0c19faWNvbnMtaXRlbVwiLCAxLFwiLi9pbWcvcXVlc3RzL3NsaWRlXCIsIFwicGVycy5wbmdcIiwgd2VlayApXG4gICAgY3JlYXRlU2xpZGVyKFwiLnByaXplX19zbGlkZVwiLCBcIi5wcml6ZV9fbW92ZS1sZWZ0XCIsIFwiLnByaXplX19tb3ZlLXJpZ2h0XCIsIFwiLnByaXplX19pY29ucy1pdGVtXCIsIDEsXCIuL2ltZy9wcml6ZS9zbGlkZVwiLCBcInByaXplLnBuZ1wiLCBudWxsLCB0cnVlIClcblxuICAgIC8vIGNvbnN0IGxlZnRCdG5Qcml6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpemVfX21vdmUtbGVmdFwiKTtcbiAgICAvLyBjb25zdCByaWdodEJ0blByaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcml6ZV9fbW92ZS1yaWdodFwiKTtcblxuICAgIC8vIGZ1bmN0aW9uIGNvdmVyRmxvd0NsYXNzZXMocmlnaHQsIGxlZnQsIHNsaWRlcyl7XG4gICAgLy8gICAgIHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGVzKVxuICAgIC8vXG4gICAgLy8gICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+e1xuICAgIC8vICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShyaWdodClcbiAgICAvLyAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUobGVmdClcbiAgICAvLyAgICAgICAgIGlmKHNsaWRlLm5leHRTaWJsaW5nLmNsYXNzTGlzdFsxXSA9PT0gXCJfYWN0aXZlXCIpe1xuICAgIC8vICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQobGVmdClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGlmKHNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0WzFdID09PSBcIl9hY3RpdmVcIil7XG4gICAgLy8gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChsZWZ0KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbiAgICAvLyBsZWZ0QnRuUHJpemUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgIC8vICAgICBjb3ZlckZsb3dDbGFzc2VzKFwicmlnaHQtY292ZXJcIiwgXCJsZWZ0LWNvdmVyXCIsICcucHJpemVfX3NsaWRlJylcbiAgICAvLyB9KVxuXG4vLyBmb3IgdGVzdFxuXG4gICAgY29uc3Qgd2VlazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsxXCIpO1xuICAgIGNvbnN0IHdlZWsyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrMlwiKTtcblxuICAgIHdlZWsxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAxKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICB3ZWVrMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlZWtcIiwgMik7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG5cbn0pXG5cbiJdfQ==
