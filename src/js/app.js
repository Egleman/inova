import * as flsFunction from "./modules/function.js";
import smoothscroll from 'smoothscroll-polyfill';
const btn = document.querySelector('.header__burger');
const acc = document.querySelector('.accordion');
const elems = document.querySelectorAll('.supplier__image');

flsFunction.isWebp();
flsFunction.calcWidthScroll();

smoothscroll.polyfill();

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (acc.style.maxHeight){
        acc.style.maxHeight = null;
        acc.style.padding = '0'
    } else {
        acc.style.maxHeight = acc.scrollHeight + "px";
        acc.style.padding = '15px 0'
    }
})


const options = {
    // родитель целевого элемента - область просмотра
    root: null,
    // без отступов
    rootMargin: '0px',
    // процент пересечения - половина изображения
    threshold: 0.5
}

// Создаем новый observer (наблюдатель)
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__rollIn');
        }
    }, options);
});


if (window.innerWidth > 1022) {
    elems.forEach(el => {
        observer.observe(el);
    })
}
