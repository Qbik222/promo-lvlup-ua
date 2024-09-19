document.addEventListener("DOMContentLoaded", () =>{



    // let week = 2;
    //
    // if(week === 1){
    //     slides.forEach((slide, i) =>{
    //
    //         if(i >= 6 || slide.classList.contains(`quest${i}`)){
    //             slide.remove()
    //         }
    //     })
    //     slidesIcons.forEach((icon, i) =>{
    //         if(i >= 6 || icon.classList.contains(`quest${i}`)){
    //             icon.remove()
    //         }
    //     })
    // }
    // if(week === 2){
    //     for (let i = 1; i <= 6; i++){
    //         let week1 = document.querySelectorAll(`.quest${i}`)
    //         week1.forEach(item => {
    //             item.remove()
    //         })
    //
    //     }
    // }

    const slides = document.querySelectorAll(".slide")
    const leftBtn = document.querySelector(".slide__move-left")
    const rightBtn = document.querySelector(".slide__move-right")
    const slidesIcons = document.querySelectorAll(".quests__icons-item")

    let glitchLayers = [];

    slides.forEach(slide =>{
        glitchLayers =  [...glitchLayers, ...slide.querySelectorAll(".glitch__layer")]
    })
    let current = 1
    slides.forEach((slide, i) =>{
        if (i === current){
            slide.classList.add("_active")
        }
    })
    function moveSlider (slides, direction) {
        if(direction === "left"){
            --current
            slides.forEach((slide, i) =>{
                slide.classList.remove("_active", "glitch")
                if(current < 0) current = slides.length - 1
                if(i === current) {
                    slide.classList.add("_active")
                    slide.classList.remove("glitch")
                }
            })
        }
        if(direction === "right"){
            ++current
            slides.forEach((slide, i) =>{
                slide.classList.remove("_active", "glitch")
                if(current > slides.length - 1) current = 0
                if(i === current) {
                    slide.classList.add("_active")
                    slide.classList.remove("glitch")
                }
            })
        }
        SlideIconsInit(slidesIcons, current)

    }

leftBtn.addEventListener("click", () => {
        slides[current].classList.add("glitch")
        if(current === 0){
            glitchLayers.forEach(layer => {
                if(layer.parentElement.parentElement.classList[0] !== "slide__info"){
                    layer.classList.add(`quest${slides.length}`)
                    layer.style.background = `url("../img/quests/slide${slides.length}/pers.png") no-repeat 0 0/contain`;
                }else{
                    layer.classList.add("slide-info-glitch")
                }

            });
        }
        else{
            glitchLayers.forEach(layer => {
                if(layer.parentElement.parentElement.classList[0] !== "slide__info"){
                    layer.classList.add(`quest${current}`)
                    layer.style.background = `url("../img/quests/slide${current}/pers.png") no-repeat 0 0/contain`;
                }else{
                    layer.classList.add("slide-info-glitch")
                }
            });
        }
        rightBtn.style.pointerEvents = "none"
        leftBtn.style.pointerEvents = "none"
        setTimeout(() =>{
            glitchLayers.forEach((layer) => {
                layer.classList.forEach(className => {
                    if(className.startsWith("slide-info-glitch")){
                        layer.classList.remove("slide-info-glitch");
                    }
                    if (className.startsWith("quest")) {
                        layer.classList.remove(className);
                    }
                });
            });
            moveSlider(slides, "left")
            rightBtn.style.pointerEvents = "initial"
            leftBtn.style.pointerEvents = "initial"

        }, 1000)
    })
rightBtn.addEventListener("click",() =>  {
    slides[current].classList.add("glitch")
    rightBtn.style.pointerEvents = "none"
    leftBtn.style.pointerEvents = "none"
    if(current === slides.length - 1) {
        glitchLayers.forEach(layer =>{
            if(layer.parentElement.parentElement.classList[0] !== "slide__info"){
                layer.classList.add(`quest1`)
                layer.style.background = `url("../img/quests/slide1/pers.png") no-repeat 0 0/contain`
            }else{
                layer.classList.add("slide-info-glitch")
            }
        })
    }
    else{
        current += 2
        glitchLayers.forEach(layer =>{
                if(layer.parentElement.parentElement.classList[0] !== "slide__info"){
                    layer.classList.add(`quest${current}`)
                    layer.style.background = `url("../img/quests/slide${current}/pers.png") no-repeat 0 0/contain`
                 }else{
                    layer.classList.add("slide-info-glitch")
                }
        })
        current -= 2
    }
    setTimeout(() =>{
        glitchLayers.forEach((layer) => {
            layer.classList.forEach(className => {
                if(className.startsWith("slide-info-glitch")){
                    layer.classList.remove("slide-info-glitch");
                }
                if (className.startsWith("quest")) {
                    layer.classList.remove(className);
                }
            });
        });
        moveSlider(slides, "right")
        rightBtn.style.pointerEvents = "initial"
        leftBtn.style.pointerEvents = "initial"

    }, 1000)
})

function SlideIconsInit(icons, current){
        // slides.forEach((slide, slideIndex) => {
        //     icons.forEach((icon, iconIndex) =>{
        //         if (current ==)
        //     })
        // })
        icons.forEach((icon, iconIndex) =>{
            icon.classList.remove("_current")
            if (current === iconIndex){
                icon.classList.add("_current")
            }
        })
}

slidesIcons.forEach((icon, i) =>{
    icon.addEventListener("click", (e) =>{
        setTimeout(() =>{
            slidesIcons.forEach(item =>{
                item.classList.remove("_current")
            })
        }, 1000)

        slides[current].classList.add("glitch")
        current = i
        if (i === current){
            slides.forEach((slide, i) =>{
                if(i === current){
                    rightBtn.style.pointerEvents = "none"
                    leftBtn.style.pointerEvents = "none"
                    glitchLayers.forEach(layer => {
                        if(layer.parentElement.parentElement.classList[0] !== "slide__info"){
                            layer.classList.add(`quest${current + 1}`)
                            layer.style.background = `url("../img/quests/slide${current + 1}/pers.png") no-repeat 0 0/contain`;
                        }else{
                            layer.classList.add("slide-info-glitch")
                        }
                    });
                    // slide.classList.remove("glitch")

                    setTimeout(() =>{
                        icon.classList.add("_current")
                        glitchLayers.forEach((layer) => {
                            layer.classList.forEach(className => {
                                if(className.startsWith("slide-info-glitch")){
                                    layer.classList.remove("slide-info-glitch");
                                }
                                if (className.startsWith("quest")) {
                                    layer.classList.remove(className);
                                }
                            });
                        });
                        rightBtn.style.pointerEvents = "initial"
                        leftBtn.style.pointerEvents = "initial"
                        slides.forEach((item, i) =>{
                            item.classList.remove("glitch")
                            if(i === current){
                                item.classList.add("_active")
                            }
                            else{
                                item.classList.remove("_active")
                            }
                        })
                        // slide.classList.add("_active")


                    }, 1000)

                }
            })
        }
    })
})

SlideIconsInit(slidesIcons, current)

})

