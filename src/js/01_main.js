document.addEventListener('DOMContentLoaded', () => {
    function popupLogic() {
        'use strict';
        const popupLinks = document.querySelectorAll('.popup-link');
        const body = document.querySelector('body');
        const lockPadding = document.querySelectorAll('.lock-padding');

        let unlock = true;

        const timeout = 800;

        if (popupLinks.length > 0) {
            for (let i = 0; i < popupLinks.length; i++) {
                const popupLink = popupLinks[i];

                popupLink.addEventListener('click', (e) => {
                    const popupName = popupLink
                        .getAttribute('href')
                        .replace('#', '');
                    const currentPopup = document.getElementById(popupName);
                    popupOpen(currentPopup);
                    e.preventDefault();
                });
            }
        }

        const popupCloseIcon = document.querySelectorAll('.close-popup');

        if (popupCloseIcon.length > 0) {
            for (let i = 0; i < popupCloseIcon.length; i++) {
                const el = popupCloseIcon[i];
                el.addEventListener('click', (e) => {
                    popupClose(el.closest('.popup'));
                    e.preventDefault();
                });
            }
        }

        function popupOpen(currentPopup) {
            if (currentPopup && unlock) {
                const popupActive = document.querySelector('.popup.open');

                if (popupActive) {
                    popupClose(popupActive, false);
                } else {
                    bodyLock();
                }

                currentPopup.classList.add('open');
                currentPopup.addEventListener('click', (e) => {
                    if (!e.target.closest('.popup__content')) {
                        popupClose(e.target.closest('.popup'));
                    }
                });
            }
        }

        function popupClose(popupActive, doUnlock = true) {
            if (unlock) {
                popupActive.classList.remove('open');
                if (doUnlock) {
                    bodyUnlock();
                }
            }
        }

        function bodyLock() {
            const lockPaddingValue =
                window.innerWidth - body.offsetWidth + 'px';

            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = lockPaddingValue;
                }
            }

            body.style.paddingRight = lockPaddingValue;
            body.classList.add('lock');

            unlock = false;
            setTimeout(function timer() {
                unlock = true;
            }, timeout);
        }

        function bodyUnlock() {
            setTimeout(() => {
                if (lockPadding.length > 0) {
                    for (let i = 0; i < lockPadding.length; i++) {
                        const el = lockPadding[i];
                        el.style.paddingRight = '0px';
                    }
                }
                body.style.paddingRight = '0px';
                body.classList.remove('lock');
            }, timeout);

            unlock = false;
            setTimeout(function timer() {
                unlock = true;
            }, timeout);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const popupActive = document.querySelector('.popup.open');
                popupClose(popupActive);
            }
        });

        (function () {
            if (!Element.prototype.closest) {
                Element.prototype.closest = function (css) {
                    var node = this;

                    while (node) {
                        if (node.matches(css)) return node;
                        else node = node.parentElement;
                    }
                    return null;
                };
            }
        })();

        (function () {
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector;
            }
        })();
    }

    const programToggle = (selectorBtn, selectorContent) => {
        const programContent = document.querySelector(selectorContent),
            programBtn = document.querySelector(selectorBtn);

        if (programContent && programBtn) {
            programBtn.addEventListener('click', function () {
                programContent.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    };

    const layoutHandler = (e) => {
        const burger = document.querySelector('.header__burger'),
            menu = document.querySelector('.header__mobile'),
            target = e.target,
            body = document.body;

        if (
            target.closest('.header__mobile') == null &&
            !target.classList.contains('header__burger')
        ) {
            menu.classList.remove('active');
            body.classList.remove('lock');
        }
    };

    const menuBurgerHandler = () => {
        const burger = document.querySelector('.header__burger'),
            menu = document.querySelector('.header__mobile'),
            closer = document.querySelector('.header__close'),
            body = document.body;

        burger.addEventListener('click', function () {
            menu.classList.toggle('active');
            body.classList.toggle('lock');

            if (menu.classList.contains('active')) {
                window.addEventListener('click', layoutHandler);
            } else {
                window.removeEventListener('click', layoutHandler);
            }
        });

        closer.addEventListener('click', function () {
            menu.classList.remove('active');
            body.classList.remove('lock');
        });
    };

    const mobileListener = () => {
        const isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (
                    isMobile.Android() ||
                    isMobile.BlackBerry() ||
                    isMobile.iOS() ||
                    isMobile.Opera() ||
                    isMobile.Windows()
                );
            },
        };

        if (isMobile.any()) {
            document.body.classList.add('touch');
        } else {
            document.body.classList.add('pc');
        }
    };

    const tabsManager = () => {
        const tabInit = (tabSelector) => {
            const tabs = document.querySelector(`${tabSelector}`);
            const tabsBtn = tabs.querySelectorAll('.tabs__btn');
            const tabsContent = tabs.querySelectorAll('.tabs__content');

            if (tabs) {
                tabs.addEventListener('click', (e) => {
                    if (e.target.classList.contains('tabs__btn')) {
                        const tabsPath = e.target.dataset.tabsPath;
                        tabsBtn.forEach((el) => {
                            el.classList.remove('tabs__btn--active');
                        });
                        document
                            .querySelector(`[data-tabs-path="${tabsPath}"]`)
                            .classList.add('tabs__btn--active');
                        tabsHandler(tabsPath);
                    }
                });
            }

            const tabsHandler = (path) => {
                tabsContent.forEach((el) => {
                    el.classList.remove('tabs__content--active');
                });
                document
                    .querySelector(`[data-tabs-target="${path}"]`)
                    .classList.add('tabs__content--active');
            };
        };

        if (document.querySelector('.partners__tabs')) {
            tabInit('.partners__tabs');
        }

        if (document.querySelector('.events-main__content')) {
            tabInit('.events-main__content');
        }

        if (document.querySelector('.events__categories-box')) {
            tabInit('.events__categories-box');
        }

        if (document.querySelector('.program')) {
            const cycleTotal = document.querySelectorAll('.program').length;
            for (let i = 0; i < cycleTotal; i++) {
                tabInit(`#program-${i + 1} .program__tabs`);
                programToggle(
                    `#program-${i + 1} .program__close`,
                    `#program-${i + 1} .program__steps`
                );
            }
        }
    };

    const accordeonManager = () => {
        function findElements(object, element) {
            const instance = object;
            instance.element = element;
            instance.target =
                element.nextElementSibling || element.previousElementSibling;
        }

        function hideElement(object) {
            const instance = object;
            const { target } = instance;
            target.style.height = null;
            instance.isActive = false;
        }

        function showElement(object) {
            const instance = object;
            const { target, height } = instance;
            target.style.height = `${height}px`;
            instance.isActive = true;
        }

        function changeElementStatus(instance) {
            if (instance.isActive) {
                hideElement(instance);
            } else {
                showElement(instance);
            }
        }

        function measureHeight(object) {
            const instance = object;
            instance.height = object.target.firstElementChild.clientHeight;
        }

        function subscribe(instance) {
            instance.element.addEventListener('click', (event) => {
                event.preventDefault();
                changeElementStatus(instance);
                instance.element.classList.toggle('active');

                if (instance.element.classList.contains('success__question')) {
                    const button =
                        instance.element.querySelector('.success__trigger');
                    if (instance.element.classList.contains('active')) {
                        button.textContent = 'Скрыть';
                    } else {
                        button.textContent = 'Смотреть полностью';
                    }
                }
            });
            window.addEventListener('resize', () => measureHeight(instance));
        }

        function accordion(element) {
            const instance = {};

            function init() {
                findElements(instance, element);
                measureHeight(instance);
                subscribe(instance);
            }

            init();
        }

        const elements = [...document.querySelectorAll('.js-accordion')];
        elements.forEach(accordion);
    };

    const selectTabsHandler = () => {
        const programSelect = '.programs__choose',
            programSelectTabs = '.program',
            programs = document.querySelectorAll(programSelectTabs);

        const marqueeInit = (selector) => {
            $(selector).marquee({
                duration: 10000,
                startVisible: true,
                duplicated: true,
            });
        };

        const selectHandler = (selector, tabs) => {
            document
                .querySelector(selector)
                .addEventListener('change', function () {
                    document.querySelectorAll(tabs).forEach((n, i) => {
                        n.classList.toggle('hide', i !== this.selectedIndex);
                    });
                });
        };

        const hidePrograms = (programs) => {
            programs.forEach((el) => {
                if (!el.classList.contains('active')) {
                    el.classList.add('hide');
                }
            });
        };

        // инициализация бегущих строк для всех программ
        programs.forEach((el) => {
            marqueeInit(
                `.${el.children[0].className
                    .replace('program__runline', '')
                    .replace('runline', '')
                    .trim()}`
            );
        });

        // скрытие лишнего контента
        setTimeout(() => {
            hidePrograms(programs);
        }, 2000);

        if (
            document.querySelector(programSelect) &&
            document.querySelector(programSelectTabs)
        ) {
            selectHandler(programSelect, programSelectTabs);
        }
    };

    const scrollbarWidth = () => {
        let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    const calcPaddingSliders = () => {
        const histories = document.querySelector('.success-history');
        const teachers = document.querySelector('.teachers-main');
        const blogMain = document.querySelector('.blog-main__content');
        const eventsMain = document.querySelector('.events-main__content');

        const calcPadding = (section) => {
            if (section) {
                const windowWidth =
                    (window.innerWidth - 1170 - scrollbarWidth()) / 2;

                section.style['padding-left'] = windowWidth + 'px';
            }
        };

        calcPadding(histories);
        calcPadding(teachers);
        calcPadding(blogMain);
        calcPadding(eventsMain);
    };

    const smoothScroll = () => {
        const scrollLinks = document.querySelectorAll('.scroll-link');

        scrollLinks.forEach((el) => {
            if (el) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    const anchor = el.getAttribute('href').replace('#', '');
                    const targerSection = document.getElementById(anchor);
                    const scrollLenght = targerSection.offsetTop;
                    console.log(scrollLenght);
                    window.scrollTo({
                        top: scrollLenght,
                        behavior: 'smooth',
                    });
                });
            }
        });
    };

    // custom scripts

    tabsManager();
    calcPaddingSliders();
    selectTabsHandler();
    programToggle();
    accordeonManager();
    menuBurgerHandler();
    mobileListener();
    popupLogic();
    smoothScroll();

    // sliders

    const successSlider = new Swiper('.success-slider', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.success-slide__next',
            prevEl: '.success-slide__prev',
        },
        pagination: {
            el: '.success-slide__counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.3,
            },
            525: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            979: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1366: {
                slidesPerView: 4,
            },
        },
    });

    const eventsSlider = new Swiper('.slider-events', {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: '.slider-events__next',
            prevEl: '.slider-events__prev',
        },
        pagination: {
            el: '.slider-events__counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.3,
            },
            630: {
                slidesPerView: 2,
            },
            979: {
                slidesPerView: 3,
            },
        },
    });

    const blogSlider = new Swiper('.blog-main__slider', {
        slidesPerView: 4,
        grid: {
            rows: 2,
        },
        spaceBetween: 20,
        pagination: {
            el: '.blog-main__slider-counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                rows: 3,
            },
            414: {
                slidesPerView: 2,
                rows: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });

    const blogSliderHandler = () => {
        if (document.querySelector('.blog-main__slider')) {
            if (document.documentElement.clientWidth < 1024) {
                const slides = document.querySelectorAll('.publication ');

                slides[0].remove();
                slides[1].remove();
                blogSlider.update();

                if (document.documentElement.clientWidth < 768) {
                    slides[2].remove();
                    slides[3].remove();
                    blogSlider.update();

                    if (document.documentElement.clientWidth < 414) {
                        slides[4].remove();
                        slides[5].remove();
                        blogSlider.update();
                    }
                }
            }
        }
    };

    blogSliderHandler();

    const teacherSlider = new Swiper('.teachers-slider', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.teachers-main__slider-next',
            prevEl: '.teachers-main__slider-prev',
        },
        pagination: {
            el: '.teachers-main__slider-counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.3,
            },
            530: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView: 4,
            },
        },
    });

    const worksSlider = new Swiper('.works-slider', {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: '.works-slide__next',
            prevEl: '.works-slide__prev',
        },
        pagination: {
            el: '.works-slide__counter',
            type: 'fraction',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.3,
            },
            525: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1366: {
                slidesPerView: 2,
            },
            1800: {
                slidesPerView: 3,
            },
        },
    });

    const worksSliderHandler = () => {
        let bullets = document.querySelectorAll('.works-slide__bullets');

        if (bullets[0]) {
            bullets[0].removeChild(bullets[0].lastElementChild);
            bullets[0].removeChild(bullets[0].lastElementChild);
        }
    };

    worksSliderHandler();

    const exhibitionSlider = new Swiper('#exhibition', {
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observerParents: true,
        observerChildren: true,
        navigation: {
            nextEl: '.events-main__next',
            prevEl: '.events-main__prev',
        },
        pagination: {
            el: '.events-main__counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            630: {
                slidesPerView: 2,
            },
            979: {
                slidesPerView: 2,
            },
            1524: {
                slidesPerView: 3,
            },
        },
    });

    const lecturesSlider = new Swiper('#lectures', {
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observerParents: true,
        observerChildren: true,
        navigation: {
            nextEl: '.events-main__next',
            prevEl: '.events-main__prev',
        },
        pagination: {
            el: '.events-main__counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            630: {
                slidesPerView: 2,
            },
            979: {
                slidesPerView: 2,
            },
            1524: {
                slidesPerView: 3,
            },
        },
    });

    const announcementSlider = new Swiper('#announcement', {
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observerParents: true,
        observerChildren: true,
        navigation: {
            nextEl: '.events-main__next',
            prevEl: '.events-main__prev',
        },
        pagination: {
            el: '.events-main__counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            630: {
                slidesPerView: 2,
            },
            979: {
                slidesPerView: 2,
            },
            1524: {
                slidesPerView: 3,
            },
        },
    });

    const achieveTeacherSlider = new Swiper('#achieve-teachers', {
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observerParents: true,
        observerChildren: true,
        navigation: {
            nextEl: '.events-main__next',
            prevEl: '.events-main__prev',
        },
        pagination: {
            el: '.events-main__counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            630: {
                slidesPerView: 2,
            },
            979: {
                slidesPerView: 2,
            },
            1524: {
                slidesPerView: 3,
            },
        },
    });

    const achieveStudentSlider = new Swiper('#achieve-students', {
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observerParents: true,
        observerChildren: true,
        navigation: {
            nextEl: '.events-main__next',
            prevEl: '.events-main__prev',
        },
        pagination: {
            el: '.events-main__counter',
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            630: {
                slidesPerView: 2,
            },
            979: {
                slidesPerView: 2,
            },
            1524: {
                slidesPerView: 3,
            },
        },
    });

    const portfolioSliderHandler = () => {
        if (document.querySelector('.success__list')) {
            const portfolioTotal =
                document.querySelector('.success__list').children.length;

            for (let i = 0; i < portfolioTotal; i++) {
                const portfolioSlider = new Swiper(
                    `#success-${i + 1} .portfolio__slider`,
                    {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        navigation: {
                            nextEl: `#success-${i + 1} .portfolio__slider-next`,
                            prevEl: `#success-${i + 1} .portfolio__slider-prev`,
                        },
                    }
                );

                Fancybox.bind(`#success-${i + 1} .portfolio__slider-img`, {});
            }
        }
    };

    portfolioSliderHandler();

    // const bullet = document.querySelectorAll('.swiper-menu__item');

    const SlidersHandler = () => {
        const worksBullets = document.querySelector('.works-slide__bullets'),
            blogBullets = document.querySelector('.blog-main__bullets'),
            genetalBullets = document.querySelectorAll('.slider-bullet');

        if (genetalBullets) {
            const changeSlide = (slider, bullets, event) => {
                bullets = Array.from(bullets.children);

                // Переключение слайдера для кастомных буллетов
                if (event) {
                    const target = event.target,
                        index = target.getAttribute('data-index');

                    console.log();

                    if (
                        target.matches(
                            `.${bullets[0].className
                                .replace('slider-bullet', '')
                                .replace('active', '')
                                .trim()}`
                        )
                    ) {
                        bullets.forEach((el) => {
                            el.classList.remove('active');
                        });

                        target.classList.add('active');
                        slider.slideTo(index);
                    }
                }

                // Подсветка активного буллета
                bullets.forEach((el) => {
                    el.classList.remove('active');
                });
                const realIndex = slider.realIndex;
                bullets[realIndex].classList.add('active');
            };

            if (worksBullets) {
                worksBullets.addEventListener('click', (e) => {
                    changeSlide(worksSlider, worksBullets, e);
                });
            }

            if (blogBullets) {
                blogBullets.addEventListener('click', (e) => {
                    changeSlide(blogSlider, blogBullets, e);
                });
            }

            worksSlider.on('slideChange', function () {
                changeSlide(worksSlider, worksBullets);
            });

            blogSlider.on('slideChange', function () {
                changeSlide(blogSlider, blogBullets);
            });
        }
    };

    SlidersHandler();

    // fancybox

    Fancybox.bind('[data-fancybox="works-slide"]', {});

    // jquery.marque

    if (document.querySelector('.structure__runline')) {
        $('.structure__runline').marquee({
            duration: 10000,
            startVisible: true,
            duplicated: true,
        });
    }

    if (document.querySelector('.big-banner__runline')) {
        $('.big-banner__runline').marquee({
            duration: 10000,
            startVisible: true,
            duplicated: true,
        });
    }

    const inputFlagHandler = () => {
        const popupField = document.querySelector('.popup__field');
        window.intlTelInput(popupField, {
            initialCountry: 'ru',
        });
    };

    inputFlagHandler();
});
