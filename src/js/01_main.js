document.addEventListener('DOMContentLoaded', () => {
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
            instance.target = element.nextElementSibling;
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

    // custom scripts

    tabsManager();
    calcPaddingSliders();
    selectTabsHandler();
    programToggle();
    accordeonManager();

    // sliders

    const successSlider = new Swiper('.success-slider', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.success-slide__next',
            prevEl: '.success-slide__prev',
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
    });

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
    });

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
    });

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
});
