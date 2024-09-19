document.addEventListener("DOMContentLoaded", () =>{



    const slides = document.querySelectorAll(".slide");
    const leftBtn = document.querySelector(".slide__move-left");
    const rightBtn = document.querySelector(".slide__move-right");
    const slidesIcons = document.querySelectorAll(".quests__icons-item");

    let glitchLayers = [];
    let current = 1;
    // let week = 2;
    let week = localStorage.getItem("week") ? parseInt(localStorage.getItem("week")) : 1;

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

    slides.forEach(slide => {
        glitchLayers = [...glitchLayers, ...slide.querySelectorAll(".glitch__layer")];
    });

    slides[current].classList.add("_active");

    function updateGlitchLayers(index) {
        if(week === 2){
            index += 6
        }
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
                layer.style.background = `url("./img/quests/slide${index}/pers.png") no-repeat 0 0/contain`;
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
        rightBtn.style.pointerEvents = "none";
        leftBtn.style.pointerEvents = "none";
        const nextSlideIndex = direction === "left" ? (current === 0 ? slides.length : current) : (current === slides.length - 1 ? 1 : current + 2);
        updateGlitchLayers(nextSlideIndex);
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
        }, 1000);
    }

    leftBtn.addEventListener("click", () => handleClick("left"));
    rightBtn.addEventListener("click", () => handleClick("right"));

    slidesIcons.forEach((icon, i) => {
        icon.addEventListener("click", () => {
            setTimeout(() => {
                slidesIcons.forEach(item => item.classList.remove("_current"));
            }, 1000);

            slides[current].classList.add("glitch");
            current = i;
            updateGlitchLayers(current + 1);

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

