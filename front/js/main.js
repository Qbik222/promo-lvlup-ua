document.addEventListener("DOMContentLoaded", () =>{
    let week = localStorage.getItem("week") ? parseInt(localStorage.getItem("week")) : 1;
    console.log(week)


 function createSlider(slides, leftBtn, rightBtn, slidesIcons, current, path, img, week, coverflow){

     function coverFlowClasses(right, left, slides){
         slides.forEach((slide, i) =>{
             if(current === i){
                 if(slide.previousElementSibling === null){
                     slides[slides.length -1].classList.add(right)
                     // slides[slides.length -1].classList.add("glitch")
                 }else{
                     slide.previousElementSibling.classList.add(right)
                     // slide.previousElementSibling.classList.add("glitch")
                 }
                 if(slide.nextSibling === null){
                     slides[0].classList.add(left)
                     // slides[0].classList.add("glitch")
                 }
                 else{
                     slide.nextSibling.classList.add(left)
                     // slide.nextSibling.classList.add("glitch")

                 }
                 console.log(current, slides.length - 1)
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
         console.log(week)
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
             updateGlitchLayers(`url("${path}${current + 1}/${img}") no-repeat 0 0/contain`, current + 1);

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

    createSlider(".slide", ".slide__move-left", ".slide__move-right", ".quests__icons-item", 1,"./img/quests/slide", "pers.png", week )
    createSlider(".prize__slide", ".prize__move-left", ".prize__move-right", ".prize__icons-item", 1,"./img/prize/slide", "prize.png", null, true )

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

