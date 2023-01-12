'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
// import AOS from 'aos';
import IMask from 'imask';
import Rellax from 'rellax';

// Проверка поддержки webP
baseFunction.testWebP();


window.addEventListener('load', () => {
    var rellax = new Rellax('[data-rellax-speed]', {
        breakpoints: [576, 768, 1180],
    });
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
        document.querySelector('[data-mobile-menu]').classList.toggle('show');
        return;
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
        return;
    }
    // Откытие модальных окон
    if (target.closest('[data-modal-open]')) {
        e.preventDefault();
        const modalType = target.closest('[data-modal-open]').dataset.modalOpen;
        const selectedModal = document.querySelector(`[data-modal="${modalType}"]`);
        selectedModal.classList.add('show');
        return;
    }
    // Закрытие модальных окон
    if (target.closest('[data-modal].show') && !target.closest('[data-modal-content]')) {
        target.closest('[data-modal].show').classList.remove('show');
        return;
    }
    if (target.closest('[data-mobile-link]')) {
        document.querySelector('[data-mobile-menu]').classList.remove('show');
        return;
    }

    if (target.closest('[data-lang]')) {
        e.preventDefault();
        const langItem = target.closest('[data-lang]');
        if (langItem.classList.contains('active')) return;
        const langParam = langItem.dataset.lang;
        document.querySelectorAll(`[data-lang].active`).forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll(`[data-lang="${langParam}"]`).forEach(item => {
            item.classList.add('active');
        });
        document.body.setAttribute('data-selected-lang', langParam);
        return;
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
        if (windowScroll > 350) {
            flyingHeader.classList.add('fixed');
        } else {
            flyingHeader.classList.remove('fixed');
        }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);
})();




const marqueeDuration = window.innerWidth > 480 ? 50000 : 15000;
// бегущая строка
$('#marquee').marquee({
    startVisible: true,
    duration: marqueeDuration,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true,
});


//Аккардеон секции faq
$("[data-toggle-elem]").click(function () {
    $(this).parent().toggleClass('open')
    $(this).parent().find("[data-toggle-content]").slideToggle("slow");
});

// Слайдер секции путь лидера
const waySlider = new Swiper('.way-slider', {
    speed: 1000,
    slidesPerView: 'auto',
    mousewheel: true,
    spaceBetween: 40,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});