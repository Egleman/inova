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
}
//Самописный аккордеон
export const accordion = () => {
    class ItcAccordion {
        constructor(target, config) {
          this._el = typeof target === 'string' ? document.querySelector(target) : target;
          const defaultConfig = {
            alwaysOpen: true,
            duration: 350
          };
          this._config = Object.assign(defaultConfig, config);
          this.addEventListener();
        }
        addEventListener() {
          this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.accordion__header');
            if (!elHeader) {
              return;
            }
            if (!this._config.alwaysOpen) {
              const elOpenItem = this._el.querySelector('.accordion__item_show');
              if (elOpenItem) {
                elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
              }
            }
            this.toggle(elHeader.parentElement);
          });
        }
        show(el) {
          const elBody = el.querySelector('.accordion__body');
          if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
            return;
          }
          elBody.style['display'] = 'block';
          const height = elBody.offsetHeight;
          elBody.style['height'] = 0;
          elBody.style['overflow'] = 'hidden';
          elBody.style['transition'] = `height ${this._config.duration}ms ease`;
          elBody.classList.add('collapsing');
          el.classList.add('accordion__item_slidedown');
          elBody.offsetHeight;
          elBody.style['height'] = `${height}px`;
          window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
          }, this._config.duration);
        }
        hide(el) {
          const elBody = el.querySelector('.accordion__body');
          if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
            return;
          }
          elBody.style['height'] = `${elBody.offsetHeight}px`;
          elBody.offsetHeight;
          elBody.style['display'] = 'block';
          elBody.style['height'] = 0;
          elBody.style['overflow'] = 'hidden';
          elBody.style['transition'] = `height ${this._config.duration}ms ease`;
          elBody.classList.remove('collapse');
          el.classList.remove('accordion__item_show');
          elBody.classList.add('collapsing');
          window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
          }, this._config.duration);
        }
        toggle(el) {
          el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
        }
      }
      new ItcAccordion(document.querySelector('.accordion'), {
        alwaysOpen: false
      });
}
//Открытие модальных окон
export const openModal = () => {
    const buttons = document.querySelectorAll('[data-toggle]');
    const buttonsClose = document.querySelectorAll('[data-close]');

    buttonsClose.forEach(close => {
        close.addEventListener('click', () => {
            const overlays = document.querySelectorAll('.overlay');
            overlays.forEach(over => {
                if (over.classList.contains('overlay_active')) {
                    over.classList.remove('overlay_active')
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
        })
    })
}
//Маска телефона для инпутов