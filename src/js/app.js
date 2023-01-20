'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import AOS from 'aos';
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
});

// Инит и опции библиотеки анимаций
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'load', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 35, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 1200, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});



const selectetTagInSmear = document.querySelector('.selectet-tag');
const smearImg = document.querySelector('.smear-img');
const marqueeWrapper = document.querySelector('.marquee__wrapper');


var timeoutInterval;

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
        clearInterval(intervalChangeFnc);
        if (timeoutInterval) {
            clearInterval(timeoutInterval);
        }
        timeoutInterval = setTimeout(() => { intervalChangeFnc = setInterval(() => indervalChange(), 5000); }, 30000)

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






function indervalChange() {
    const activeTags = document.querySelectorAll('.marquee__el.active');
    var nextTagNum;
    var innerText = ''
    activeTags.forEach(tag => {
        const tagNum = tag.dataset.tag;
        nextTagNum = +tagNum + 1;
        if (nextTagNum === 10) {
            nextTagNum = 1;
        }
        tag.classList.remove('active');
        innerText = document.querySelector(`[data-tag="${nextTagNum}"].marquee__el`).innerText;

    });
    document.querySelectorAll(`[data-tag="${nextTagNum}"].marquee__el`).forEach(tag => { tag.classList.add('active'); });

    document.querySelectorAll('.tag-descr.active')?.forEach(tag => tag.classList.remove('active'));
    const selectedDescr = document.querySelectorAll(`[data-descr = '${nextTagNum}']`);
    selectedDescr.forEach(tag => {
        tag.classList.add('active');
    });

    selectetTagInSmear.innerHTML = innerText;
    smearImg.src = smearImg.src;
}

var intervalChangeFnc = setInterval(() => indervalChange(), 5000);




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

    // on: {
    //     init: function () {
    //         console.log('swiper initialized');
    //     },
    // }
});



// Ховер на круглые кнопки
let rotationSpeed = 0.5;
document.querySelectorAll('.ornament-btn__bg').forEach(btn => {
    let counter = 0;
    var animationRotate;

    function rotate() {
        counter = (counter + rotationSpeed);
        btn.style.transform = `rotate(${counter}deg)`;
        animationRotate = requestAnimationFrame(rotate);
    }
    requestAnimationFrame(rotate);
    btn.addEventListener('mouseenter', (e) => { rotationSpeed = 0.25; });
    btn.addEventListener('mouseleave', (e) => { rotationSpeed = 0.5; });
});





function addAnimationImage(url, parent) {
    let location = window.location;
    fetch(`${location.protocol}//${location.host}${location.pathname}${location.hash}/${url}`, {})
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(parent);
            if (!container) return;
            const params = {
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                animationData: data
            };


            const anim = bodymovin.loadAnimation(params);
            anim.play()
        });
}

addAnimationImage('files/downloading.json', '#animated-svg-1');
addAnimationImage('files/success.json', '#animated-svg-2');
addAnimationImage('files/workflow.json', '#animated-svg-3');

// SmoothScroll({
//     // Время скролла 400 = 0.4 секунды
//     animationTime: 300,
//     // Размер шага в пикселях 
//     stepSize: 75,
//     // Ускорение 
//     accelerationDelta: 100,
//     // Максимальное ускорение
//     accelerationMax: 2,

//     // Поддержка клавиатуры
//     keyboardSupport: true,
//     // Шаг скролла стрелками на клавиатуре в пикселях
//     arrowScroll: 50,
//     // Pulse (less tweakable)
//     // ratio of "tail" to "acceleration"
//     pulseAlgorithm: true,
//     pulseScale: 4,
//     pulseNormalize: 1,
//     // Поддержка тачпада
//     touchpadSupport: true,
// });