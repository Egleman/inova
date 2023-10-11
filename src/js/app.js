import * as flsFunction from "./modules/function.js";
import smoothscroll from 'smoothscroll-polyfill';
import {zoom} from "./modules/function.js";
// import {openModal, scrollLinks, sliders} from "./modules/function.js";
const btn = document.querySelector('.header__burger');
const acc = document.querySelector('.accordion');


flsFunction.isWebp();
flsFunction.calcWidthScroll();
flsFunction.scrollLinks();
flsFunction.sliders();
flsFunction.openModal();
flsFunction.maskedInputs();
flsFunction.zoom();
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