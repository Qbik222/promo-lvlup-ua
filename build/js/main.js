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
  var glitchLayers = [];
  slides.forEach(function (slide) {
    glitchLayers = [].concat(_toConsumableArray(glitchLayers), _toConsumableArray(slide.querySelectorAll(".glitch__layer")));
  });
  var current = 0;
  slides.forEach(function (slide, i) {
    if (i === current) {
      slide.classList.add("_active");
    }
  });
  function moveSlider(slides, direction) {
    if (direction === "left") {
      --current;
      // console.log(slides)
      slides.forEach(function (slide, i) {
        slide.classList.remove("_active", "glitch");
        if (current < 0) current = slides.length - 1;
        if (i === current) {
          slide.classList.add("_active");
          slide.classList.remove("glitch");
        }
      });
    }
    if (direction === "right") {
      ++current;
      slides.forEach(function (slide, i) {
        slide.classList.remove("_active", "glitch");
        if (current > slides.length - 1) current = 0;
        // console.log(`${i} - i, ${current} - current`)
        if (i === current) {
          slide.classList.add("_active");
          slide.classList.remove("glitch");
        }
      });
    }
  }
  leftBtn.addEventListener("click", function () {
    slides[current].classList.add("glitch");
    if (current === 0) {
      glitchLayers.forEach(function (layer) {
        layer.classList.add("prev");
        layer.style.background = "url(\"../img/quests/slide".concat(slides.length, "/pers.png\") no-repeat 0 0/contain");
      });
    } else {
      glitchLayers.forEach(function (layer) {
        layer.classList.add("prev");
        layer.style.background = "url(\"../img/quests/slide".concat(current, "/pers.png\") no-repeat 0 0/contain");
      });
    }
    rightBtn.style.pointerEvents = "none";
    leftBtn.style.pointerEvents = "none";
    setTimeout(function () {
      moveSlider(slides, "left");
      rightBtn.style.pointerEvents = "initial";
      leftBtn.style.pointerEvents = "initial";
      glitchLayers.forEach(function (layer) {
        layer.classList.remove("prev");
      });
    }, 1000);
  });
  rightBtn.addEventListener("click", function () {
    slides[current].classList.add("glitch");
    rightBtn.style.pointerEvents = "none";
    leftBtn.style.pointerEvents = "none";
    if (current === slides.length - 1) {
      glitchLayers.forEach(function (layer) {
        layer.classList.add("next");
        layer.style.background = "url(\"../img/quests/slide1/pers.png\") no-repeat 0 0/contain";
      });
    } else {
      current += 2;
      glitchLayers.forEach(function (layer) {
        layer.classList.add("next");
        layer.style.background = "url(\"../img/quests/slide".concat(current, "/pers.png\") no-repeat 0 0/contain");
      });
      current -= 2;
    }
    setTimeout(function () {
      moveSlider(slides, "right");
      rightBtn.style.pointerEvents = "initial";
      leftBtn.style.pointerEvents = "initial";
      glitchLayers.forEach(function (layer) {
        layer.classList.remove("next");
      });
    }, 1000);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2xpZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImxlZnRCdG4iLCJxdWVyeVNlbGVjdG9yIiwicmlnaHRCdG4iLCJnbGl0Y2hMYXllcnMiLCJmb3JFYWNoIiwic2xpZGUiLCJjdXJyZW50IiwiaSIsImNsYXNzTGlzdCIsImFkZCIsIm1vdmVTbGlkZXIiLCJkaXJlY3Rpb24iLCJyZW1vdmUiLCJsZW5ndGgiLCJsYXllciIsInN0eWxlIiwiYmFja2dyb3VuZCIsInBvaW50ZXJFdmVudHMiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFFL0MsSUFBTUMsTUFBTSxHQUFHRixRQUFRLENBQUNHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztFQUNsRCxJQUFNQyxPQUFPLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQzNELElBQU1DLFFBQVEsR0FBR04sUUFBUSxDQUFDSyxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFFN0QsSUFBSUUsWUFBWSxHQUFHLEVBQUU7RUFFckJMLE1BQU0sQ0FBQ00sT0FBTyxDQUFDLFVBQUFDLEtBQUssRUFBRztJQUNuQkYsWUFBWSxnQ0FBUUEsWUFBWSxzQkFBS0UsS0FBSyxDQUFDTixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO0VBQ2xGLENBQUMsQ0FBQztFQUVGLElBQUlPLE9BQU8sR0FBRyxDQUFDO0VBRWZSLE1BQU0sQ0FBQ00sT0FBTyxDQUFDLFVBQUNDLEtBQUssRUFBRUUsQ0FBQyxFQUFJO0lBQ3hCLElBQUlBLENBQUMsS0FBS0QsT0FBTyxFQUFDO01BQ2RELEtBQUssQ0FBQ0csU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ2xDO0VBQ0osQ0FBQyxDQUFDO0VBRUYsU0FBU0MsVUFBVSxDQUFF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TUNvbnRlbnRMb2FkZWRcIiwgKCkgPT57XG5cbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlXCIpXG4gICAgY29uc3QgbGVmdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfX21vdmUtbGVmdFwiKVxuICAgIGNvbnN0IHJpZ2h0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9fbW92ZS1yaWdodFwiKVxuXG4gICAgbGV0IGdsaXRjaExheWVycyA9IFtdO1xuXG4gICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT57XG4gICAgICAgIGdsaXRjaExheWVycyA9ICBbLi4uZ2xpdGNoTGF5ZXJzLCAuLi5zbGlkZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmdsaXRjaF9fbGF5ZXJcIildXG4gICAgfSlcblxuICAgIGxldCBjdXJyZW50ID0gMFxuXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcbiAgICAgICAgaWYgKGkgPT09IGN1cnJlbnQpe1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBtb3ZlU2xpZGVyIChzbGlkZXMsIGRpcmVjdGlvbikge1xuICAgICAgICBpZihkaXJlY3Rpb24gPT09IFwibGVmdFwiKXtcbiAgICAgICAgICAgIC0tY3VycmVudFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc2xpZGVzKVxuICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcbiAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiLCBcImdsaXRjaFwiKVxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPCAwKSBjdXJyZW50ID0gc2xpZGVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBpZihpID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKXtcbiAgICAgICAgICAgICsrY3VycmVudFxuICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpKSA9PntcbiAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiLCBcImdsaXRjaFwiKVxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPiBzbGlkZXMubGVuZ3RoIC0gMSkgY3VycmVudCA9IDBcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtpfSAtIGksICR7Y3VycmVudH0gLSBjdXJyZW50YClcbiAgICAgICAgICAgICAgICBpZihpID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJnbGl0Y2hcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBsZWZ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpXG4gICAgICAgIGlmKGN1cnJlbnQgPT09IDApe1xuICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJwcmV2XCIpXG4gICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoXCIuLi9pbWcvcXVlc3RzL3NsaWRlJHtzbGlkZXMubGVuZ3RofS9wZXJzLnBuZ1wiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJwcmV2XCIpXG4gICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoXCIuLi9pbWcvcXVlc3RzL3NsaWRlJHtjdXJyZW50fS9wZXJzLnBuZ1wiKSBuby1yZXBlYXQgMCAwL2NvbnRhaW5gO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgXCJsZWZ0XCIpXG4gICAgICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgICAgIGxlZnRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcInByZXZcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMDAwKVxuICAgIH0pXG5yaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKSA9PiAge1xuICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKFwiZ2xpdGNoXCIpXG4gICAgcmlnaHRCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiXG4gICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCJcbiAgICBpZihjdXJyZW50ID09PSBzbGlkZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBnbGl0Y2hMYXllcnMuZm9yRWFjaChsYXllciA9PntcbiAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoXCJuZXh0XCIpXG4gICAgICAgICAgICBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybChcIi4uL2ltZy9xdWVzdHMvc2xpZGUxL3BlcnMucG5nXCIpIG5vLXJlcGVhdCAwIDAvY29udGFpbmBcbiAgICAgICAgfSlcbiAgICB9ZWxzZXtcbiAgICAgICAgY3VycmVudCArPSAyXG4gICAgICAgIGdsaXRjaExheWVycy5mb3JFYWNoKGxheWVyID0+e1xuICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZChcIm5leHRcIilcbiAgICAgICAgICAgIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKFwiLi4vaW1nL3F1ZXN0cy9zbGlkZSR7Y3VycmVudH0vcGVycy5wbmdcIikgbm8tcmVwZWF0IDAgMC9jb250YWluYFxuICAgICAgICB9KVxuICAgICAgICBjdXJyZW50IC09IDJcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgICBtb3ZlU2xpZGVyKHNsaWRlcywgXCJyaWdodFwiKVxuICAgICAgICByaWdodEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgbGVmdEJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCJcbiAgICAgICAgZ2xpdGNoTGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5leHRcIilcbiAgICAgICAgfSk7XG4gICAgfSwgMTAwMClcbn0pXG5cbn0pXG5cbiJdfQ==
