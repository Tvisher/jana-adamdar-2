'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
// import AOS from 'aos';
import IMask from 'imask';

// Проверка поддержки webP
baseFunction.testWebP();


window.addEventListener('load', () => {
    // $("[data-paroller-factor]").paroller({
    //     type: 'foreground',     // background, foreground
    //     direction: 'horizontal', // vertical, horizontal
    // });
    setTimeout(() => {
        document.body.classList.add('load');
    }, 230);
})



const selectetTagInSmear = document.querySelector('.selectet-tag');
const smearImg = document.querySelector('.smear-img');
const marqueeWrapper = document.querySelector('.marquee__wrapper');

//Отработка кликов по документу
document.body.addEventListener('click', (e) => {
    const target = e.target;
    // Открытие мобильного меню
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
    }
    // Логика тегов 
    if (target.closest('[data-tag]')) {
        marqueeWrapper.classList.add('not-click');
        const selectedTag = target.closest('[data-tag]');
        const selectedTagId = selectedTag.dataset.tag;
        document.querySelectorAll('.marquee__el.active')?.forEach(tag => tag.classList.remove('active'));
        const selectedTags = document.querySelectorAll(`[data-tag = '${selectedTagId}']`);
        selectedTags.forEach(tag => {
            tag.classList.add('active');
        });

        document.querySelectorAll('.tag-descr.active')?.forEach(tag => tag.classList.remove('active'));
        const selectedDescr = document.querySelectorAll(`[data-descr = '${selectedTagId}']`);
        selectedDescr.forEach(tag => {
            tag.classList.add('active');
        });


        selectetTagInSmear.innerHTML = selectedTag.innerText;
        smearImg.src = smearImg.src;
        setTimeout(() => {
            marqueeWrapper.classList.remove('not-click');
        }, 800);
    }
    // Откытие модальных окон
    if (target.closest('[data-modal-open]')) {
        e.preventDefault();
        const modalType = target.closest('[data-modal-open]').dataset.modalOpen;
        const selectedModal = document.querySelector(`[data-modal="${modalType}"]`);
        selectedModal.classList.add('show');
    }
    // Закрытие модальных окон
    if (target.closest('[data-modal].show') && !target.closest('[data-modal-content]')) {
        target.closest('[data-modal].show').classList.remove('show');
    }
});

// Маска на номера телефона
document.querySelectorAll('input[type="tel"]').forEach(input => {
    const mask = IMask(input, {
        mask: '+{7}(000) 000-00-00'
    });
});


// Функция для работы фикс меню
(function () {
    const flyingHeader = document.querySelector('.flying-header');
    const checkScroll = () => {

        const windowScroll = window.scrollY;
        if (windowScroll > 400) {
            flyingHeader.classList.add('fixed');
        } else {
            flyingHeader.classList.remove('fixed');
        }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);
})();

// бегущая строка
$('#marquee').marquee({
    startVisible: true,
    duration: 50000,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true,
});


//Аккардеон секции faq
$("[data-toggle-elem]").click(function () {
    $(this).parent().toggleClass('open')
    $(this).parent().find("[data-toggle-content]").slideToggle("slow");
});





// function createParallax(elements) {
//     elements.forEach(element => {
//         let elementDistance = window.pageYOffset;
//         let date = element.getAttribute('data-paroller-factor');
//         let parallax = elementDistance * date;
//         element.style.transform = `translateY(${-parallax}px)`;
//         element.style.willChange = `transform`;
//     });
// }
// window.addEventListener('scroll', () => createParallax(document.querySelectorAll('[data-paroller-factor]')));


function createParallax(elements) {
    elements.forEach(element => {
        let elementDistance = window.pageYOffset;
        let date = element.getAttribute('data-paroller-factor');
        let parallax = elementDistance * date;
        element.style.transform = `translateY(${-parallax}px)`;
        element.style.willChange = `transform`;
        element.style.opacity = 1;
    });
}

function updateParallax() {
    createParallax(document.querySelectorAll('[data-paroller-factor]'));
    window.requestAnimationFrame(updateParallax);
}

updateParallax();