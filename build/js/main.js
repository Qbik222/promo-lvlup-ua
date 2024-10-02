"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var n;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(n="Object"===(n=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ownKeys(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(e,t,n){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}!function(){var n,r="https://fav-prom.com/api_level_up_game_ua",e=document.querySelector(".unauth-msg"),o=document.querySelector(".btn-join"),i=document.querySelector(".took-part"),c="uk",t=document.querySelector("#ukLeng"),a=document.querySelector("#enLeng"),l=(t&&(c="uk"),a&&(c="en"),{});var s=function(e,t){return fetch(r+e,_objectSpread({headers:{Accept:"application/json","Content-Type":"application/json"}},t||{})).then(function(e){return e.json()})};function u(){n?(e.classList.add("hide"),s("/favuser/".concat(n,"?nocache=1")).then(function(e){(e.userid?(o.classList.add("hide"),i):o).classList.remove("hide")})):(o.classList.add("hide"),e.classList.remove("hide"))}fetch("".concat(r,"/translates/").concat(c)).then(function(e){return e.json()}).then(function(e){l=e;var e=document.querySelectorAll("[data-translate]"),t=(e&&e.length&&e.forEach(function(e){var t=e.getAttribute("data-translate");e.innerHTML=l[t]||"*----NEED TO BE TRANSLATED----*   key:  "+t,e.removeAttribute("data-translate")}),"en"===c&&d.classList.add("en"),void 0),n=void 0;if(t){for(var r=0,o=["uk","en"];r<o.length;r++){var i=o[r];t.classList.remove(n+i)}t.classList.add(n+c)}b(document.querySelectorAll(".type-anim"))}).then(function(){var e,t;window.store?(e=window.store.getState(),n=e.auth.isAuthorized&&e.auth.id||""):t=setInterval(function(){window.g_user_id&&(n=window.g_user_id,u(),clearInterval(t))},200),u(),o&&o.addEventListener("click",function(e){e.preventDefault(),n&&(e={userid:n},s("/user",{method:"POST",body:JSON.stringify(e)}).then(function(e){o.classList.add("hide"),i.classList.remove("hide")}))})});var d=document.querySelector(".fav-page"),f=(setTimeout(function(){return d.classList.add("_overflow-hidden")},1e3),window.addEventListener("orientationchange",function(){location.reload()}),localStorage.getItem("week")&&parseInt(localStorage.getItem("week")),document.querySelectorAll(".slide__info-mob")),m=document.querySelectorAll(".slide__info-bottom"),t=document.querySelector(".slide__move-left"),a=document.querySelector(".slide__move-right");function p(c,r,o,i,a,l,s,u,d,e,f,m){var p=!0;function v(n,r,o){o.forEach(function(e,t){p&&a===t&&((null===e.previousElementSibling?o[o.length-1]:e.previousElementSibling).classList.add(n),(null===e.nextSibling?o[0]:e.nextSibling).classList.add(r))})}window.innerWidth<e&&(p=!1),c=document.querySelectorAll(c),f=document.querySelectorAll(f),r=document.querySelector(r),o=document.querySelector(o),i=document.querySelectorAll(i);var y=[];function h(t,e){e.forEach(function(e,n){e.classList.contains("_active")&&t.forEach(function(e,t){e.classList.remove("_active"),n===t&&e.classList.add("_active")})})}function _(o,e,i){y.forEach(function(t){t.classList.forEach(function(e){e.startsWith("slide-info-glitch")&&t.classList.remove("slide-info-glitch"),e.startsWith("quest")&&t.classList.remove(e)});var e,n,r;!function(e){e=_toConsumableArray(e.classList).find(function(e){return e.startsWith("quest")});if(e)return parseInt(e.replace("quest",""))}(c[a]);if("slide__info"!==t.parentElement.parentElement.classList[0])if(m)switch(c[a].nextSibling&&(e=c[a].nextSibling.classList[1]),c[a].previousElementSibling&&(n=c[a].previousElementSibling.classList[1]),r=c[a].classList[1],!0){case"right"===i&&e&&e!==r:t.classList.add(e);break;case"left"===i&&n&&n!==r:t.classList.add(n);break;case"left"===i&&null===c[a].previousElementSibling:t.classList.add("".concat(c[c.length-1].classList[1]));break;case"right"===i&&null===c[a].nextSibling:t.classList.add("".concat(c[1].classList[1]));break;default:t.classList.add(r)}else t.style.background=o;else t.classList.add("slide-info-glitch")})}function g(e,r){var o=e[0].parentElement.parentElement;e.forEach(function(e,t){var n;e.classList.toggle("_current",r===t),r===t&&(t=e.offsetLeft,e=e.offsetWidth,n=o.offsetWidth,o.scrollTo({left:t-n/2+e/2,behavior:"smooth"}))})}function t(n){c[a].classList.add("glitch"),v("glitch","glitch",c),o.style.pointerEvents="none",r.style.pointerEvents="none";var e="left"===n?0===a?c.length:a:a===c.length-1?1:a+2;_((2===u?'url("'.concat(l).concat(e+6,"/"):'url("'.concat(l).concat(e,"/")).concat(s,'") no-repeat 0 0/contain'),0,n),setTimeout(function(){var e,t;y.forEach(function(t){t.classList.forEach(function(e){(e.startsWith("slide-info-glitch")||e.startsWith("quest"))&&t.classList.remove(e)})}),e=c,"left"===(t=n)?--a<0&&(a=e.length-1):"right"===t&&++a>e.length-1&&(a=0),e.forEach(function(e,t){e.classList.toggle("_active",t===a),e.classList.remove("glitch")}),g(i,a),o.style.pointerEvents="initial",r.style.pointerEvents="initial",h(f,c),d&&(c.forEach(function(e){e.classList.remove("right-cover"),e.classList.remove("left-cover"),e.classList.remove("glitch")}),v("right-cover","left-cover",c))},1e3)}c.forEach(function(e){y=[].concat(_toConsumableArray(y),_toConsumableArray(e.querySelectorAll(".glitch__layer")))}),c[a]&&c[a].classList.add("_active"),d&&v("right-cover","left-cover",c),r.addEventListener("click",function(){return t("left")}),o.addEventListener("click",function(){return t("right")}),i.forEach(function(e,t){e.addEventListener("click",function(e){e.target.classList.contains("_current")||(setTimeout(function(){i.forEach(function(e){return e.classList.remove("_current")})},1e3),c[a].classList.add("glitch"),a=t,_((2===u?'url("'.concat(l).concat(a+7,"/"):'url("'.concat(l).concat(a+1,"/")).concat(s,'") no-repeat 0 0/contain')),setTimeout(function(){g(i,a),c.forEach(function(e,t){e.classList.toggle("_active",t===a),e.classList.remove("glitch"),h(f,c)}),o.style.pointerEvents="initial",r.style.pointerEvents="initial"},1e3))})}),g(i,a),h(f,c)}function v(n,e,t){n=document.querySelectorAll(n),e=document.querySelectorAll(e),t=document.querySelectorAll(t),e.forEach(function(e){e.addEventListener("click",function(t){n.forEach(function(e){e.classList.remove("active"),t.target.parentElement===e.parentElement&&e.classList.toggle("active")})})}),t.forEach(function(e){e.addEventListener("click",function(e){n.forEach(function(e){e.classList.remove("active")})})})}f.forEach(function(n,r){n.addEventListener("click",function(){m.forEach(function(e,t){r===t&&(e.classList.toggle("_active"),e.parentElement.parentElement.parentElement.classList.toggle("_active"),n.classList.toggle("_active"))})})}),t.addEventListener("click",function(){f.forEach(function(e){null!==e.parentElement.parentElement.parentElement&&(e.style.pointerEvents="none",setTimeout(function(){e.style.pointerEvents="initial"},1e3))}),m.forEach(function(e){null!==e.parentElement.parentElement.parentElement&&(e.classList.remove("_active"),e.parentElement.parentElement.parentElement.classList.remove("_active"),e.classList.remove("_active"))})}),a.addEventListener("click",function(){f.forEach(function(e){null!==e.parentElement.parentElement.parentElement&&(e.style.pointerEvents="none",setTimeout(function(){e.style.pointerEvents="initial"},1e3))}),m.forEach(function(e){null!==e.parentElement.parentElement.parentElement&&(e.classList.remove("_active"),e.parentElement.parentElement.parentElement.classList.remove("_active"),e.classList.remove("_active"))})});document.querySelectorAll(".slide"),document.querySelectorAll(".quests__icons-item");t="https://fav-prom.com/html/level-up-game-ua/img/quests/mob/slide",a=window.matchMedia("(max-width: 600px)"),_=window.matchMedia("(max-width: 950px) and (max-height: 600px) and (orientation: landscape)"),a.matches||_.matches,p(".slide",".slide__move-left",".slide__move-right",".quests__icons-item",1,t,"pers.png",null,!1,null,".quests__subtitle",!0),p(".prize__slide",".prize__move-left",".prize__move-right",".prize__icons-item",1,"https://fav-prom.com/html/level-up-game-ua/img/prize/slide","prize.png",null,!0,1150,!1),v(".guide__info",".guide__info-btn",".guide__info-close"),v(".prize__slide-popup",".prize__slide-info-btn",".prize__slide-close"),v(".table__info-popup",".table__info",".table__info-close");var y=document.querySelectorAll(".table__list-item"),h=document.querySelectorAll(".table__item"),a=(y.forEach(function(t,n){t.addEventListener("click",function(e){y.forEach(function(e){e.classList.remove("active"),t.classList.add("active")}),h.forEach(function(e,t){e.classList.remove("active"),t===n&&e.classList.add("active")})})}),document.querySelector(".prize__move-right")),_=document.querySelector(".prize__move-left"),g=document.querySelectorAll(".prize__slide-popup");function L(e){e.forEach(function(e){e.classList.remove("active")})}function E(n,r){var o=n.textContent.trim().split(" "),i=o.join(" ").split(/(\s+)/).filter(function(e){return""!==e.trim()||" "===e}),c=0,a=0,l="";n.classList.add("_opacity"),n.classList.add("typewriter-cursor"),function e(){var t;c===i.length?n.classList.remove("typewriter-cursor"):void 0!==(t=o[c])&&(a<t.length?(l+=t.charAt(a),n.innerText=l,a++):(l+=" ",n.innerText=l,a=0,c++),setTimeout(e,r))}()}function b(e){var t=new IntersectionObserver(function(e,n){e.forEach(function(e,t){e.isIntersecting&&(E(e.target,35),n.unobserve(e.target))})},{root:null,threshold:.5});e.forEach(function(e){t.observe(e)})}a.addEventListener("click",function(){L(g)}),_.addEventListener("click",function(){L(g)}),b(document.querySelectorAll(".type-anim"));!function e(t,n,r,o){o<=100?(n.style.width="".concat(o,"%"),r.innerText="".concat(o,"%"),++o,setTimeout(function(){return e(t,n,r,o)},70)):100<=o&&(o=t,setTimeout(function(){return e(t,n,r,o)},70))}(40,document.querySelector(".info__progress-bar"),document.querySelector(".info__progress-text"),40);var t=document.querySelector(".table__btn"),a=document.querySelector(".popups__close"),S=document.querySelector(".popups");t.addEventListener("click",function(){S.classList.add("_table"),document.body.classList.add("_overflow-hidden")}),a.addEventListener("click",function(){S.classList.remove("_table"),S.classList.remove("_done"),document.body.classList.remove("_overflow-hidden")}),document.querySelector(".dark-btn").addEventListener("click",function(){document.body.classList.toggle("dark")}),document.querySelector(".en-lng").addEventListener("click",function(){document.querySelector(".fav-page").classList.toggle("en")});document.querySelector(".done-popup").addEventListener("click",function(){S.classList.toggle("_done"),document.body.classList.toggle("_overflow-hidden")});_=document.querySelector(".week1"),t=document.querySelector(".week2");_.addEventListener("click",function(){localStorage.setItem("week",1),location.reload()}),t.addEventListener("click",function(){localStorage.setItem("week",2),location.reload()})}();