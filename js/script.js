
/////BURGERMenu
const menuBtns = document.querySelectorAll(".menu-button")
const menuContent = document.querySelector(".menu-box")
const menuClose = document.querySelector(".menu-close")
const menuItems=document.querySelectorAll(".menu-item")


////SLIDERMAIN
const btn = document.querySelectorAll(".slider-menu-item")
const sliderItems = Array.from(document.querySelector("main").children)
let count = 0
let lastTime = 0
let sliderSpeed = 1000

///SKILS
const skilsImgDiv = document.querySelector(".skills-img")
const skiilsItmes = document.querySelectorAll(".skills-item")
const img = document.createElement("img")


////PROJECTSSLIDER
const projectSliderWrapper = document.querySelector(".slider-wrapp")




///////////////// ADDEVENTLISTENER



projectSliderWrapper.addEventListener("click", (e) => {
    if (!e.target.matches("i")) return

    e.target.classList.contains("left") ? projectsSlider("left") : projectsSlider("right")
})


window.addEventListener("resize",()=>{
    if (window.innerWidth <= 700) {
        count=0
        mainSlider()
        window.removeEventListener("wheel",windowWheel)
    } 
    else{
        mainSlider()
        scroolTopWindow()
        removerActiveBtn(count)
        window.addEventListener("wheel",windowWheel)
    }
})


skiilsItmes.forEach((elem) => {

    elem.addEventListener("mouseover", (e) => {

        img.src = `img/${elem.dataset.img}`
        skilsImgDiv.append(img)


        skilsImgDiv.style.left = `${elem.offsetLeft + elem.offsetWidth / 2}px`
        skilsImgDiv.style.top = `${elem.offsetTop > 70 ? elem.offsetTop : 0}px`
    })
})

btn.forEach((elem, id) => {
    const sliderId = id

    elem.addEventListener("click", () => {
        count = sliderId + 1
        removerActiveBtn(id)
        mainSlider()

    })
})

menuClose.addEventListener("click", removerBurgerMenu)

menuItems.forEach((elem,id)=>{
    elem.addEventListener("click",()=>{
        count=id+1

        mainSlider()
        removerActiveBtn(id)
        removerBurgerMenu()
        
    })
})

////////FUNCTION

burgerMenu()

function burgerMenu() {
    menuBtns.forEach((elem) => {
        elem.addEventListener("click", () => {
            menuContent.classList.toggle("menu-active")
            document.body.classList.add("active")
        })
    })
}

function removerBurgerMenu(){
    menuContent.classList.remove("menu-active")
    document.body.classList.remove("active")
}

function projectsSlider(direction) {
    const sliderContainer = projectSliderWrapper.children[1]

    if (direction == "right") {
        sliderContainer.scrollLeft += sliderContainer.offsetWidth / 2
    }
    else {
        sliderContainer.scrollLeft += -sliderContainer.offsetWidth / 2
    }

}

function windowWheel(e){
 
    const direction = e.deltaY

    mainSlider(direction)
    removerActiveBtn(count)
}

function removerActiveBtn(sliderId) {
    btn.forEach((elem) => elem.classList.remove("active"))
    btn[sliderId].classList.add("active")

}

function mainSlider(direction) {
    const currentTime = new Date().getTime()

    if (currentTime - lastTime < sliderSpeed) return

    if (direction > 0) count++

    else count--

    count > 3 && (count = 3)
    count < 0 && (count = 0)

    sliderItems.forEach((elem) => {
        elem.style.transform = `translateY(${-count * 100 + "%"})`
    })



    lastTime = currentTime
}




function scroolTopWindow() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

}



window.addEventListener('DOMContentLoaded', () => {

    if (window.innerWidth >= 700){
        window.addEventListener("wheel",windowWheel)
        mainSlider()
        removerActiveBtn(count)       
        scroolTopWindow()
    }
})



