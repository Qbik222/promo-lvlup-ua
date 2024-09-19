"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener("DOMContentLoaded", function () {
  var slides = document.querySelectorAll(".slide");
  var leftBtn = document.querySelector(".slide__move-left");
  var rightBtn = document.querySelector(".slide__move-right");
  var slidesIcons = document.querySelectorAll(".quests__icons-item");
  var glitchLayers = [];
  var current = 1;
  // let week = 2;
  var week = localStorage.getItem("week") ? parseInt(localStorage.getItem("week")) : 1;
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
  slides.forEach(function (slide) {
    glitchLayers = [].concat(_toConsumableArray(glitchLayers), _toConsumableArray(slide.querySelectorAll(".glitch__layer")));
  });
  slides[current].classList.add("_active");
  function updateGlitchLayers(index) {
    if (week === 2) {
      index += 6;
    }
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
        layer.style.background = "url(\"./img/quests/slide".concat(index, "/pers.png\") no-repeat 0 0/contain");
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
    rightBtn.style.pointerEvents = "none";
    leftBtn.style.pointerEvents = "none";
    var nextSlideIndex = direction === "left" ? current === 0 ? slides.length : current : current === slides.length - 1 ? 1 : current + 2;
    updateGlitchLayers(nextSlideIndex);
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
    }, 1000);
  }
  leftBtn.addEventListener("click", function () {
    return handleClick("left");
  });
  rightBtn.addEventListener("click", function () {
    return handleClick("right");
  });
  slidesIcons.forEach(function (icon, i) {
    icon.addEventListener("click", function () {
      setTimeout(function () {
        slidesIcons.forEach(function (item) {
          return item.classList.remove("_current");
        });
      }, 1000);
      slides[current].classList.add("glitch");
      current = i;
      updateGlitchLayers(current + 1);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2xpZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImxlZnRCdG4iLCJxdWVyeVNlbGVjdG9yIiwicmlnaHRCdG4iLCJzbGlkZXNJY29ucyIsImdsaXRjaExheWVycyIsImN1cnJlbnQiLCJ3ZWVrIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50IiwiZm9yRWFjaCIsInNsaWRlIiwiaSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiaWNvbiIsIndlZWsxIiwiaXRlbSIsImFkZCIsInVwZGF0ZUdsaXRjaExheWVycyIsImluZGV4IiwibGF5ZXIiLCJjbGFzc05hbWUiLCJzdGFydHNXaXRoIiwicGFyZW50RWxlbWVudCIsInN0eWxlIiwiYmFja2dyb3VuZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJsZW5ndGgiLCJ0b2dnbGUiLCJTbGlkZUljb25zSW5pdCIsImljb25zIiwiaWNvbkluZGV4IiwiaGFuZGxlQ2xpY2siLCJwb2ludGVyRXZlbnRzIiwibmV4dFNsaWRlSW5kZXgiLCJzZXRUaW1lb3V0Iiwid2VlazIiLCJzZXRJdGVtIiwibG9jYXRpb24iLCJyZWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBSztFQUkvQyxJQUFNQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMsUUFBUSxDQUFDO0VBQ2xELElBQU1DLE9BQU8sR0FBR0osUUFBUSxDQUFDSyxhQUFhLENBQUMsbUJBQW1CLENBQUM7RUFDM0QsSUFBTUMsUUFBUSxHQUFHTixRQUFRLENBQUNLLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUM3RCxJQUFNRSxXQUFXLEdBQUdQLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7RUFFcEUsSUFBSUssWUFBWSxHQUFHLEVBQUU7RUFDckIsSUFBSUMsT0FBTyxHQUFHLENBQUM7RUFDZjtFQUNBLElBQUlDLElBQUksR0FBR0MsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0YsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBRXBGLElBQUdGLElBQUksS0FBSyxDQUFDLEVBQUM7SUFDVlIsTUFBTSxDQUFDWSxPQUFPLENBQUMsVUFBQ0MsS0FBSyxFQUFFQyxDQUFDLEVBQUk7TUFFeEIsSUFBR0EsQ0FBQyxJQUFJLENBQUMsSUFBSUQsS0FBSyxDQUFDRSxTQUFTLENBQUNDLFFBQVEsZ0JBQVNGLENBQUMsRUFBRyxFQUFDO1FBQy9DRCxLQUFLLENBQUNJLE1BQU0sRUFBRTtNQUNsQjtJQUNKLENBQUMsQ0FBQztJQUNGWixXQUFXLENBQUNPLE9BQU8sQ0FBQyxVQUFDTSxJQUFJLEVBQUVKLENBQUMsRUFBSTtNQUM1QixJQUFHQSxDQUFDLElBQUksQ0FBQyxJQUFJSSxJQUFJLENBQUNILFNBQVMsQ0FBQ0MsUUFBUSxnQkFBU0YsQ0FBQyxFQUFHLEVBQUM7UUFDOUNJLElBQUksQ0FBQ0QsTUFBTSxFQUFFO01BQ2pCO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFDQSxJQUFHVCxJQUFJLEtBQUssQ0FBQyxFQUFDO0lBQ1YsS0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBQztNQUN4QixJQUFJSyxLQUFLLEdBQUdyQixRQUFRLENBQUNHLGdCQUFnQixpQkFBVWEsQ0FBQyxFQUFHO01BQ25ESyxLQUFLLENBQUNQLE9BQU8sQ0FBQyxVQUFBUSxJQUFJLEVBQUk7UUFDbEJBLElBQUksQ0FBQ0gsTUFBTSxFQUFFO01BQ2pCLENBQUMsQ0FBQztJQUVOO0VBQ0o7RUFFQWpCLE1BQU0sQ0FBQ1ksT0FBTyxDQUFDLFVBQUFDLEtBQUssRUFBSTtJQUNwQlAsWUFBWSxnQ0FBT0EsWUFBWSxzQkFBS08sS0FBSyxDQUFDWixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO0VBQ2pGLENBQUMsQ0FBQztFQUVGRCxNQUFNLENBQUNPLE9BQU8sQ0FBQyxDQUFDUSxTQUFTLENBQUNNLEdBQUcsQ0FBQyxTQUFTLENBQUM7RUFFeEMsU0FBU0Msa0JBQWtCLENBQUNDLEtBQUssRUFBRTtJQUMvQixJQUFHZixJQUFJLEtBQUssQ0FBQyxFQUFDO01BQ1ZlLEtBQUssSUFBSSxDQUFDO0lBQ2Q7SUFDQWpCLFlBQVksQ0FBQ00sT0FBTyxDQUFDLFVBQUFZLEtBQUssRUFBSTtNQUMxQkEsS0FBSyxDQUFDVCxTQUFTLENBQUNILE9BQU8sQ0FBQyxVQUFBYSxTQUFTLEVBQUk7UUFDakMsSUFBSUEsU0FBUyxDQUFDQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRTtVQUMzQ0YsS0FBSyxDQUFDVCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztRQUMvQztRQUNBLElBQUlRLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1VBQy9CRixLQUFLLENBQUNULFNBQVMsQ0FBQ0UsTUFBTSxDQUFDUSxTQUFTLENBQUM7UUFDckM7TUFDSixDQUFDLENBQUM7TUFDRixJQUFJRCxLQUFLLENBQUNHLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDWixTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssYUFBYSxFQUFFO1FBQ2xFUyxLQUFLLENBQUNULFNBQVMsQ0FBQ00sR0FBRyxnQkFBU0UsS0FBSyxFQUFHO1FBQ3BDQyxLQUFLLENBQUNJLEtBQUssQ0FBQ0MsVUFBVSxxQ0FBNkJOLEtBQUssdUNBQW1DO01BQy9GLENBQUMsTUFBTTtRQUNIQyxLQUFLLENBQUNULFNBQVMsQ0FBQ00sR0FBRyxDQUFDLG1CQUFtQixDQUFDO01BQzVDO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFFQSxTQUFTUyxVQUFVLENBQUM5QixNQUFNLEVBQUUrQixTQUFTLEVBQUU7SUFDbkMsSUFBSUEsU0FBUyxLQUFLLE1BQU0sRUFBRTtNQUN0QixFQUFFeEIsT0FBTztNQUNULElBQUlBLE9BQU8sR0FBRyxDQUFDLEVBQUVBLE9BQU8sR0FBR1AsTUFBTSxDQUFDZ0MsTUFBTSxHQUFHLENBQUM7SUFDaEQsQ0FBQyxNQUFNLElBQUlELFNBQVMsS0FBSyxPQUFPLEVBQUU7TUFDOUIsRUFBRXhCLE9BQU87TUFDVCxJQUFJQSxPQUFPLEdBQUdQLE1BQU0sQ0FBQ2dDLE1BQU0sR0FBRyxDQUFDLEVBQUV6QixPQUFPLEdBQUcsQ0FBQztJQUNoRDtJQUVBUCxNQUFNLENBQUNZLE9BQU8sQ0FBQyxVQUFDQyxLQUFLLEVBQUVDLENBQUMsRUFBSztNQUN6QkQsS0FBSyxDQUFDRSxTQUFTLENBQUNrQixNQUFNLENBQUMsU0FBUyxFQUFFbkIsQ0FBQyxLQUFLUCxPQUFPLENBQUM7TUFDaERNLEtBQUssQ0FBQ0UsU0FBUyxDQUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGaUIsY0FBYyxDQUFDN0IsV0FBVyxFQUFFRSxPQUFPLENBQUM7RUFDeEM7RUFFQSxTQUFTMkIsY0FBYyxDQUFDQyxLQUFLLEVBQUU1QixPQUFPLEVBQUU7SUFDcEM0QixLQUFLLENBQUN2QixPQUFPLENBQUMsVUFBQ00sSUFBSSxFQUFFa0IsU0FBUyxFQUFLO01BQy9CbEIsSUFBSSxDQUFDSCxTQUFTLENBQUNrQixNQUFNLENBQUMsVUFBVSxFQUFFMUIsT0FBTyxLQUFLNkIsU0FBUyxDQUFDO0lBQzVELENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU0MsV0FBVyxDQUFDTixTQUFTLEVBQUU7SUFDNUIvQixNQUFNLENBQUNPLE9BQU8sQ0FBQyxDQUFDUSxTQUFTLENBQUNNLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDdkNqQixRQUFRLENBQUN3QixLQUFLLENBQUNVLGFBQWEsR0FBRyxNQUFNO0lBQ3JDcEMsT0FBTyxDQUFDMEIsS0FBSyxDQUFDVSxhQUFhLEdBQUcsTUFBTTtJQUNwQyxJQUFNQyxjQUFjLEdBQUdSLFNBQVMsS0FBSyxNQUFNLEdBQUl4QixPQUFPLEtBQUssQ0FBQyxHQUFHUCxNQUFNLENBQUNnQyxNQUFNLEdBQUd6QixPQUFPLEdBQUtBLE9BQU8sS0FBS1AsTUFBTSxDQUFDZ0MsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUd6QixPQUFPLEdBQUcsQ0FBRTtJQUMzSWUsa0JBQWtCLENBQUNpQixjQUFjLENBQUM7SUFDbENDLFVBQVUsQ0FBQyxZQUFNO01BQ2JsQyxZQUFZLENBQUNNLE9BQU8sQ0FBQyxVQUFBWSxLQUFLLEVBQUk7UUFDMUJBLEtBQUssQ0FBQ1QsU0FBUyxDQUFDSCxPQUFPLENBQUMsVUFBQWEsU0FBUyxFQUFJO1VBQ2pDLElBQUlBLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUlELFNBQVMsQ0FBQ0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVFRixLQUFLLENBQUNULFNBQVMsQ0FBQ0UsTUFBTSxDQUFDUSxTQUFTLENBQUM7VUFDckM7UUFDSixDQUFDLENBQUM7TUFDTixDQUFDLENBQUM7TUFDRkssVUFBVSxDQUFDOUIsTUFBTSxFQUFFK0IsU0FBUyxDQUFDO01BQzdCM0IsUUFBUSxDQUFDd0IsS0FBSyxDQUFDVSxhQUFhLEdBQUcsU0FBUztNQUN4Q3BDLE9BQU8sQ0FBQzBCLEtBQUssQ0FBQ1UsYUFBYSxHQUFHLFNBQVM7SUFDM0MsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUNaO0VBRUFwQyxPQUFPLENBQUNILGdCQUFnQixDQUFDLE9BQU8sRUFBRTtJQUFBLE9BQU1zQyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQUEsRUFBQztFQUM1RGpDLFFBQVEsQ0FBQ0wsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO0lBQUEsT0FBTXNDLFdBQVcsQ0FBQyxPQUFPLENBQUM7RUFBQSxFQUFDO0VBRTlEaEMsV0FBVyxDQUFDTyxPQUFPLENBQUMsVUFBQ00sSUFBSSxFQUFFSixDQUFDLEVBQUs7SUFDN0JJLElBQUksQ0FBQ25CLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQ2pDeUMsVUFBVSxDQUFDLFlBQU07UUFDYm5DLFdBQVcsQ0FBQ08sT0FBTyxDQUFDLFVBQUFRLElBQUk7VUFBQSxPQUFJQSxJQUFJLENBQUNMLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUFBLEVBQUM7TUFDbEUsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUVSakIsTUFBTSxDQUFDTyxPQUFPLENBQUMsQ0FBQ1EsU0FBUyxDQUFDTSxHQUFHLENBQUMsUUFBUSxDQUFDO01BQ3ZDZCxPQUFPLEdBQUdPLENBQUM7TUFDWFEsa0JBQWtCLENBQUNmLE9BQU8sR0FBRyxDQUFDLENBQUM7TUFFL0JpQyxVQUFVLENBQUMsWUFBTTtRQUNiTixjQUFjLENBQUM3QixXQUFXLEVBQUVFLE9BQU8sQ0FBQztRQUNwQ1AsTUFBTSxDQUFDWSxPQUFPLENBQUMsVUFBQ0MsS0FBSyxFQUFFVSxLQUFLLEVBQUs7VUFDN0JWLEtBQUssQ0FBQ0UsU0FBUyxDQUFDa0IsTUFBTSxDQUFDLFNBQVMsRUFBRVYsS0FBSyxLQUFLaEIsT0FBTyxDQUFDO1VBQ3BETSxLQUFLLENBQUNFLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxDQUFDLENBQUM7UUFDRmIsUUFBUSxDQUFDd0IsS0FBSyxDQUFDVSxhQUFhLEdBQUcsU0FBUztRQUN4Q3BDLE9BQU8sQ0FBQzBCLEtBQUssQ0FBQ1UsYUFBYSxHQUFHLFNBQVM7TUFDM0MsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNaLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGSixjQUFjLENBQUM3QixXQUFXLEVBQUVFLE9BQU8sQ0FBQzs7RUFFeEM7O0VBRUksSUFBTVksS0FBSyxHQUFHckIsUUFBUSxDQUFDSyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzlDLElBQU1zQyxLQUFLLEdBQUczQyxRQUFRLENBQUNLLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFOUNnQixLQUFLLENBQUNwQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ1UsWUFBWSxDQUFDaUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUVGSCxLQUFLLENBQUMxQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ1UsWUFBWSxDQUFDaUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0JDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztBQUdOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG5cblxuXG4gICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZVwiKTtcbiAgICBjb25zdCBsZWZ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1sZWZ0XCIpO1xuICAgIGNvbnN0IHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1yaWdodFwiKTtcbiAgICBjb25zdCBzbGlkZXNJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlc3RzX19pY29ucy1pdGVtXCIpO1xuXG4gICAgbGV0IGdsaXRjaExheWVycyA9IFtdO1xuICAgIGxldCBjdXJyZW50ID0gMTtcbiAgICAvLyBsZXQgd2VlayA9IDI7XG4gICAgbGV0IHdlZWsgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikgPyBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlZWtcIikpIDogMTtcblxuICAgIGlmKHdlZWsgPT09IDEpe1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+e1xuXG4gICAgICAgICAgICBpZihpID49IDYgfHwgc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGBxdWVzdCR7aX1gKSl7XG4gICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgc2xpZGVzSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT57XG4gICAgICAgICAgICBpZihpID49IDYgfHwgaWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYHF1ZXN0JHtpfWApKXtcbiAgICAgICAgICAgICAgICBpY29uLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmKHdlZWsgPT09IDIpe1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2OyBpKyspe1xuICAgICAgICAgICAgbGV0IHdlZWsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnF1ZXN0JHtpfWApXG4gICAgICAgICAgICB3ZWVrMS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgZ2xpdGNoTGF5ZXJzID0gWy4uLmdsaXRjaExheWVycywgLi4uc2xpZGUucXVlcnlTZWxlY3RvckFsbChcIi5nbGl0Y2hfX2xheWVyXCIpXTtcbiAgICB9KTtcblxuICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUdsaXRjaExheWVycyhpbmRleCkge1xuICAgICAgICBpZih3ZWVrID09PSAyKXtcbiAgICAgICAgICAgIGluZGV4ICs9IDZcbiAgICAgICAgfVxuICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcInNsaWRlLWluZm8tZ2xpdGNoXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwicXVlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGxheWVyLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3RbMF0gIT09IFwic2xpZGVfX2luZm9cIikge1xuICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoYHF1ZXN0JHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybChcIi4vaW1nL3F1ZXN0cy9zbGlkZSR7aW5kZXh9L3BlcnMucG5nXCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgLS1jdXJyZW50O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAwKSBjdXJyZW50ID0gc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICsrY3VycmVudDtcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzLmxlbmd0aCAtIDEpIGN1cnJlbnQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKFwiX2FjdGl2ZVwiLCBpID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBTbGlkZUljb25zSW5pdChpY29ucywgY3VycmVudCkge1xuICAgICAgICBpY29ucy5mb3JFYWNoKChpY29uLCBpY29uSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZShcIl9jdXJyZW50XCIsIGN1cnJlbnQgPT09IGljb25JbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGRpcmVjdGlvbikge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZChcImdsaXRjaFwiKTtcbiAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgbmV4dFNsaWRlSW5kZXggPSBkaXJlY3Rpb24gPT09IFwibGVmdFwiID8gKGN1cnJlbnQgPT09IDAgPyBzbGlkZXMubGVuZ3RoIDogY3VycmVudCkgOiAoY3VycmVudCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEgPyAxIDogY3VycmVudCArIDIpO1xuICAgICAgICB1cGRhdGVHbGl0Y2hMYXllcnMobmV4dFNsaWRlSW5kZXgpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJzbGlkZS1pbmZvLWdsaXRjaFwiKSB8fCBjbGFzc05hbWUuc3RhcnRzV2l0aChcInF1ZXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW92ZVNsaWRlcihzbGlkZXMsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICBsZWZ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgbGVmdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJsZWZ0XCIpKTtcbiAgICByaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQ2xpY2soXCJyaWdodFwiKSk7XG5cbiAgICBzbGlkZXNJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XG4gICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNsaWRlc0ljb25zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfY3VycmVudFwiKSk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoXCJnbGl0Y2hcIik7XG4gICAgICAgICAgICBjdXJyZW50ID0gaTtcbiAgICAgICAgICAgIHVwZGF0ZUdsaXRjaExheWVycyhjdXJyZW50ICsgMSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIFNsaWRlSWNvbnNJbml0KHNsaWRlc0ljb25zLCBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJfYWN0aXZlXCIsIGluZGV4ID09PSBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImdsaXRjaFwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBTbGlkZUljb25zSW5pdChzbGlkZXNJY29ucywgY3VycmVudCk7XG5cbi8vIGZvciB0ZXN0XG5cbiAgICBjb25zdCB3ZWVrMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VlazFcIik7XG4gICAgY29uc3Qgd2VlazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWsyXCIpO1xuXG4gICAgd2VlazEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWVrXCIsIDEpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHdlZWsyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2Vla1wiLCAyKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cblxufSlcblxuIl19
