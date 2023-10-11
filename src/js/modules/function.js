import inputmask from "inputmask";


//Проверка поддержки webp, добавление класса webp или no-webp для html
export const isWebp = () => {
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        
        testWebP(function (support) {
        
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        }else{
            document.querySelector('body').classList.add('no-webp');
        }
    });
}
//Вычисление минимальной ширины body 
export const calcWidthScroll = () => {
    let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();
        document.body.style.minWidth = (320 - scrollWidth) + 'px';
        return scrollWidth;
}
//Открытие модальных окон
export const openModal = () => {
    const buttons = document.querySelectorAll('[data-toggle]');
    const buttonsClose = document.querySelectorAll('[data-close]');
    const html = document.querySelector('html');
    buttonsClose.forEach(close => {
        close.addEventListener('click', (e) => {
            e.preventDefault();
            const overlays = document.querySelectorAll('.overlay');
            overlays.forEach(over => {
                if (over.classList.contains('overlay_active')) {
                    over.classList.remove('overlay_active')
                    html.style.overflowY = 'initial';
                    html.style.paddingRight = `0`;
                }
            })
        })
    })
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.overlay').forEach(overlay => {
                if (overlay.classList.contains('overlay_active')) {
                    overlay.classList.remove('overlay_active')
                }
            })
            let modal = btn.getAttribute('data-toggle');
            document.querySelector(`${modal}`).classList.add('overlay_active');
            html.style.overflowY = 'hidden';
            html.style.paddingRight = `${calcWidthScroll()}px`
        })
    })
}

export const scrollLinks = () => {
    const links = document.querySelectorAll('a[data-link="scroll"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const blockId = link.getAttribute('data-block');
            if (document.querySelector(blockId)) {
                document.querySelector(blockId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                window.location = link.getAttribute('href');
            }
        })
    })
}

export const sliders = () => {
    if (document.querySelector('.overlay-img')) {
        const certificates = new Swiper('.swiper-certificates', {
            loop: true,
            allowTouchMove: true,
            autoHeight: true,
            spaceBetween: 30,
            navigation: {
                nextEl: '.button_next',
                prevEl: '.button_prev',
            },
        });
        const links = document.querySelectorAll('.certificates__card');
        const closeBtn = document.querySelector('.overlay-img > a.close');
        const modal = document.querySelector('.overlay-img');
        const html = document.querySelector('html');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                html.style.overflowY = 'initial';
                html.style.paddingRight = `0`;
            }
        })
        links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                html.style.overflowY = 'hidden';
                html.style.paddingRight = `${calcWidthScroll()}px`
                certificates.slideTo(index, 1);

            })
        })
    }
}

export const zoom = () => {
    const productImg = document.querySelector('.product__img');
    if (productImg) {
        productImg.addEventListener('mousemove', (e) => {
            const zoomer = e.currentTarget;
            let offsetX;
            let offsetY;
            let x;
            let y;
            e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
            e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
            x = offsetX/zoomer.offsetWidth*100
            y = offsetY/zoomer.offsetHeight*100
            zoomer.style.backgroundPosition = x + '% ' + y + '%';
        })
    }
}
export const maskedInputs = () => {
    if (document.querySelectorAll('input[data-input="masked"]')) {
        const inputs = document.querySelectorAll('input[data-input="masked"]');
        inputs.forEach(input => {
            const im = new window.Inputmask({
                mask: '+7 (999) 999-99-99',
                showMaskOnHover: false,
                showMaskOnFocus: false,
                jitMasking: true,
                inputmode: 'tel'
            })
            im.mask(input);
        })

    }
}