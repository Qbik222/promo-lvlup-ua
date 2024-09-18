document.addEventListener("DOMContentLoaded", () =>{

    const slides = document.querySelectorAll(".slide")
    const leftBtn = document.querySelector(".slide__move-left")
    const rightBtn = document.querySelector(".slide__move-right")

    let glitchLayers = [];

    slides.forEach(slide =>{
        glitchLayers =  [...glitchLayers, ...slide.querySelectorAll(".glitch__layer")]
    })

    let current = 0

    slides.forEach((slide, i) =>{
        if (i === current){
            slide.classList.add("_active")
        }
    })

    function moveSlider (slides, direction) {
        if(direction === "left"){
            --current
            // console.log(slides)
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
                // console.log(`${i} - i, ${current} - current`)
                if(i === current) {
                    slide.classList.add("_active")
                    slide.classList.remove("glitch")
                }
            })
        }

    }

    leftBtn.addEventListener("click", () => {
        slides[current].classList.add("glitch")
        if(current === 0){
            glitchLayers.forEach(layer => {
                layer.classList.add("prev")
                layer.style.background = `url("../img/quests/slide${slides.length}/pers.png") no-repeat 0 0/contain`;
            });
        }else{
            glitchLayers.forEach(layer => {
                layer.classList.add("prev")
                layer.style.background = `url("../img/quests/slide${current}/pers.png") no-repeat 0 0/contain`;
            });
        }
        rightBtn.style.pointerEvents = "none"
        leftBtn.style.pointerEvents = "none"
        setTimeout(() =>{
            moveSlider(slides, "left")
            rightBtn.style.pointerEvents = "initial"
            leftBtn.style.pointerEvents = "initial"
            glitchLayers.forEach(layer => {
                layer.classList.remove("prev")
            });
        }, 1000)
    })
rightBtn.addEventListener("click",() =>  {
    slides[current].classList.add("glitch")
    rightBtn.style.pointerEvents = "none"
    leftBtn.style.pointerEvents = "none"
    if(current === slides.length - 1) {
        glitchLayers.forEach(layer =>{
            layer.classList.add("next")
            layer.style.background = `url("../img/quests/slide1/pers.png") no-repeat 0 0/contain`
        })
    }else{
        current += 2
        glitchLayers.forEach(layer =>{
            layer.classList.add("next")
            layer.style.background = `url("../img/quests/slide${current}/pers.png") no-repeat 0 0/contain`
        })
        current -= 2
    }

    setTimeout(() =>{
        moveSlider(slides, "right")
        rightBtn.style.pointerEvents = "initial"
        leftBtn.style.pointerEvents = "initial"
        glitchLayers.forEach(layer => {
            layer.classList.remove("next")
        });
    }, 1000)
})

})

