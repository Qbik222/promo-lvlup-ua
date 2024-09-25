document.addEventListener("DOMContentLoaded", () =>{
    let week = localStorage.getItem("week") ? parseInt(localStorage.getItem("week")) : 1;

    const infoSlidesMob = document.querySelectorAll(".slide__info-mob")
    const infoSlidesMobPopup = document.querySelectorAll(".slide__info-bottom")
    const slideBtnLeft = document.querySelector(".slide__move-left")
    const slideBtnRight = document.querySelector(".slide__move-right")

    infoSlidesMob.forEach((item, indexItem) =>{
        item.addEventListener("click", () =>{
            infoSlidesMobPopup.forEach((popup, indexPopup)=>{
                if (indexItem === indexPopup){
                    popup.classList.toggle("_active")
                    popup.parentElement.parentElement.parentElement.classList.toggle("_active")
                    item.classList.toggle("_active")

                }
            })
        })
    })
    slideBtnLeft.addEventListener("click", () =>{
        infoSlidesMob.forEach(item =>{
            if(item.parentElement.parentElement.parentElement !== null){
                item.style.pointerEvents = "none"
                setTimeout(() =>{
                    item.style.pointerEvents = "initial"
                }, 1000)
            }
        })
        infoSlidesMobPopup.forEach(item =>{
            if(item.parentElement.parentElement.parentElement !== null){
                item.classList.remove("_active")
                item.parentElement.parentElement.parentElement.classList.remove("_active")
                item.classList.remove("_active")
            }
        })


    })
    slideBtnRight.addEventListener("click", () =>{
        infoSlidesMob.forEach(item =>{
            if(item.parentElement.parentElement.parentElement !== null){
                item.style.pointerEvents = "none"
                setTimeout(() =>{
                    item.style.pointerEvents = "initial"
                }, 1000)
            }
        })
        infoSlidesMobPopup.forEach(item =>{
            if(item.parentElement.parentElement.parentElement !== null){
                item.classList.remove("_active")
                item.parentElement.parentElement.parentElement.classList.remove("_active")
                item.classList.remove("_active")
            }
        })


    })

/// гліч слайдер
 function createSlider(slides, leftBtn, rightBtn, slidesIcons, current, path, img, week, coverflow, coverflowOffWidth){

     let coverflowToggler = true

     if(window.innerWidth < coverflowOffWidth){
         coverflowToggler = false
         // console.log(coverflowToggler)
     }

     function coverFlowClasses(right, left, slides){
         slides.forEach((slide, i) =>{
             if(coverflowToggler){
                 if(current === i){
                     if(slide.previousElementSibling === null){
                         slides[slides.length -1].classList.add(right)
                     }else{
                         slide.previousElementSibling.classList.add(right)
                     }
                     if(slide.nextSibling === null){
                         slides[0].classList.add(left)
                     }
                     else{
                         slide.nextSibling.classList.add(left)
                     }
                     console.log(current, slides.length - 1)
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
         })
     }
     slides = document.querySelectorAll(slides);
     leftBtn = document.querySelector(leftBtn);
     rightBtn = document.querySelector(rightBtn);
     slidesIcons = document.querySelectorAll(slidesIcons);
     let glitchLayers = [];
     slides.forEach(slide => {
         glitchLayers = [...glitchLayers, ...slide.querySelectorAll(".glitch__layer")];
     });
     slides[current].classList.add("_active");
     if(coverflow){
         coverFlowClasses("right-cover", "left-cover", slides)
     }

     function updateGlitchLayers(path, index) {
         if(week === 2){
             index += 6
         }
         console.log(index)
         glitchLayers.forEach(layer => {
             layer.classList.forEach(className => {
                 if (className.startsWith("slide-info-glitch")) {
                     layer.classList.remove("slide-info-glitch");
                 }
                 if (className.startsWith("quest")) {
                     layer.classList.remove(className);
                 }
             });
             if (layer.parentElement.parentElement.classList[0] !== "slide__info") {
                 layer.classList.add(`quest${index}`);
                 layer.style.background = path;
             }
             else {
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

         slides.forEach((slide, i) => {
             slide.classList.toggle("_active", i === current);
             slide.classList.remove("glitch");
         });

         SlideIconsInit(slidesIcons, current);
     }

     function SlideIconsInit(icons, current) {
         icons.forEach((icon, iconIndex) => {
             icon.classList.toggle("_current", current === iconIndex);
         });
     }

     function handleClick(direction) {
         slides[current].classList.add("glitch");
         coverFlowClasses("glitch", "glitch", slides)
         rightBtn.style.pointerEvents = "none";
         leftBtn.style.pointerEvents = "none";
         const nextSlideIndex = direction === "left" ? (current === 0 ? slides.length : current) : (current === slides.length - 1 ? 1 : current + 2);
         if(week === 2){
             updateGlitchLayers(`url("${path}${nextSlideIndex + 6}/${img}") no-repeat 0 0/contain`, nextSlideIndex);
         }else{
             updateGlitchLayers(`url("${path}${nextSlideIndex}/${img}") no-repeat 0 0/contain`, nextSlideIndex);
         }
         setTimeout(() => {
             glitchLayers.forEach(layer => {
                 layer.classList.forEach(className => {
                     if (className.startsWith("slide-info-glitch") || className.startsWith("quest")) {
                         layer.classList.remove(className);
                     }
                 });
             });
             moveSlider(slides, direction);
             rightBtn.style.pointerEvents = "initial";
             leftBtn.style.pointerEvents = "initial";

             if(coverflow){
                 slides.forEach(slide =>{
                     slide.classList.remove("right-cover")
                     slide.classList.remove("left-cover")
                     slide.classList.remove("glitch")
                 })
                 coverFlowClasses("right-cover", "left-cover", slides)
             }
         }, 1000);
     }

     leftBtn.addEventListener("click", () => handleClick("left"));
     rightBtn.addEventListener("click", () => handleClick("right"));

     slidesIcons.forEach((icon, i) => {
         icon.addEventListener("click", (e) => {
             if(e.target.classList.contains("_current")) return
             setTimeout(() => {
                 slidesIcons.forEach(item => item.classList.remove("_current"));
             }, 1000);

             slides[current].classList.add("glitch");
             current = i;
             if(week === 2){
                 updateGlitchLayers(`url("${path}${current + 7}/${img}") no-repeat 0 0/contain`, current + 1);
             }
             else{
                 updateGlitchLayers(`url("${path}${current + 1}/${img}") no-repeat 0 0/contain`, current + 1);

             }

             setTimeout(() => {
                 SlideIconsInit(slidesIcons, current);
                 slides.forEach((slide, index) => {
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
 function setPopups(popups, popupBtns, closeBtns){
    popups = document.querySelectorAll(popups)
    popupBtns = document.querySelectorAll(popupBtns)
    closeBtns = document.querySelectorAll(closeBtns)

    popupBtns.forEach(btn =>{
         btn.addEventListener("click", (e) =>{
          popups.forEach((popup => {
              popup.classList.remove("active")
              if(e.target.parentElement === popup.parentElement){
                  popup.classList.toggle("active")
              }
          }))
         })
     })
    closeBtns.forEach(btn =>{
         btn.addEventListener("click", (e) =>{
             popups.forEach((popup => {
                 popup.classList.remove("active")
             }))
         })
     })
 }


    const slides = document.querySelectorAll(".slide");

    const slidesIcons = document.querySelectorAll(".quests__icons-item");
    if(week === 1){
        slides.forEach((slide, i) =>{

            if(i >= 6 || slide.classList.contains(`quest${i}`)){
                slide.remove()
            }
        })
        slidesIcons.forEach((icon, i) =>{
            if(i >= 6 || icon.classList.contains(`quest${i}`)){
                icon.remove()
            }
        })
    }
    if(week === 2){
        for (let i = 1; i <= 6; i++){
            let week1 = document.querySelectorAll(`.quest${i}`)
            week1.forEach(item => {
                item.remove()
            })

        }
    }

    let questsPath = "./img/quests/slide"

    function checkMediaQueries(oldPath, newPath) {

        const mediaQuery600 = window.matchMedia("(max-width: 600px)");

        const mediaQuery950Landscape = window.matchMedia("(max-width: 950px) and (max-height: 600px) and (orientation: landscape)");

        if (mediaQuery600.matches) {

            oldPath = newPath;
        }
        else if (mediaQuery950Landscape.matches) {
            oldPath = newPath;
        }
        else {
           oldPath = newPath;
        }

        return oldPath
    }




    questsPath = checkMediaQueries(questsPath, "./img/quests/mob/slide")
    console.log(questsPath)


    createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1,questsPath, "pers.png", week )
    createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 1,"./img/prize/slide", "prize.png", null, true , 1150)

    setPopups(".guide__info", ".guide__info-btn", ".guide__info-close")
    setPopups(".prize__slide-popup", ".prize__slide-info-btn", ".prize__slide-close")
    setPopups(".table__info-popup", ".table__info", ".table__info-close")

    const tableTabs = document.querySelectorAll(".table__list-item")
    const tables = document.querySelectorAll(".table__item")

    tableTabs.forEach((tab, tabIndex) =>{
        tab.addEventListener("click", (e) =>{
            tableTabs.forEach((item) =>{
                item.classList.remove("active")
                tab.classList.add("active")
            })
            tables.forEach((table, tableIndex) =>{
                table.classList.remove("active")
                if(tableIndex ===  tabIndex){
                    table.classList.add("active")
                }
            })
        })
    })

    const prizeRightBtn = document.querySelector(".prize__move-right")
    const prizeLeftBtn = document.querySelector(".prize__move-left")
    const prizePopups = document.querySelectorAll(".prize__slide-popup")

    function closeDrop(drops){
        drops.forEach(drop =>{
            drop.classList.remove("active")
        })
    }

    prizeRightBtn.addEventListener("click", () =>{
        closeDrop(prizePopups)
    })
    prizeLeftBtn.addEventListener("click", () =>{
        closeDrop(prizePopups)
    })

/// анімація динамічного набору текст
    function dynamicTypewriter(element, speed, callback) {
        const textArray = element.textContent.trim().split(' ');
        // const litArr = textArray.join(' ').split(/(?<=\S)(?=\s)|(?=\S)/).filter(char => char !== '');
        const litArr = textArray.join(' ').split(/(\s+)/).filter(function (_char) {
            return _char.trim() !== '' || _char === ' ';
        });
        let wordIndex = 0;
        let charIndex = 0;
        let currentText = '';

        element.classList.add("_opacity")

        function typeWord() {
            if (wordIndex === litArr.length) {
                element.classList.remove('typewriter-cursor');
                return;
            }
            const currentWord = textArray[wordIndex];

            if(currentWord === undefined) return

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
        const options = {
            root: null,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    dynamicTypewriter(entry.target, 35, () => {

                    });
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        typeElems.forEach(item => {
            observer.observe(item);
        });
    }

    const typeAnim = document.querySelectorAll('.type-anim');
    observeElements(typeAnim);

/// progress bar анімація
    function progressAnim(start, elem, elemWrap, currentPosition){
        if(currentPosition <= 100){
            elem.style.width = `${currentPosition}%`
            elemWrap.innerText = `${currentPosition}%`
            ++currentPosition
            setTimeout( () => progressAnim(start, elem, elemWrap, currentPosition), 70)
        }else if(currentPosition >= 100){
            currentPosition = start
            setTimeout( () => progressAnim(start, elem, elemWrap, currentPosition), 70)
        }
    }
    const progressBar = document.querySelector(".info__progress-bar")
    const progressWrap = document.querySelector(".info__progress-text")

    progressAnim(40, progressBar, progressWrap, 40)

// popups
    const tablePopupBtn = document.querySelector(".table__btn")
    const closePopups = document.querySelector(".popups__close")
    const popupsWrap = document.querySelector(".popups")

    tablePopupBtn.addEventListener("click", () =>{
        popupsWrap.classList.add("_table")
        document.body.classList.add("_overflow-hidden")
    })
    closePopups.addEventListener("click", () =>{
        popupsWrap.classList.remove("_table")
        popupsWrap.classList.remove("_done")
        document.body.classList.remove("_overflow-hidden")

    })


// for test

    document.querySelector(".dark-btn").addEventListener("click", () =>{
        document.body.classList.toggle("dark")
    })
    document.querySelector(".en-lng").addEventListener("click", () =>{
        document.querySelector(".fav-page").classList.toggle("en")
    })

    const donePopupBtn = document.querySelector(".done-popup")

    donePopupBtn.addEventListener("click", () =>{
        popupsWrap.classList.toggle("_done")
        document.body.classList.toggle("_overflow-hidden")

    })

    const week1 = document.querySelector(".week1");
    const week2 = document.querySelector(".week2");

    week1.addEventListener("click", () => {
        localStorage.setItem("week", 1);
        location.reload();
    });

    week2.addEventListener("click", () => {
        localStorage.setItem("week", 2);
        location.reload();
    });


})

