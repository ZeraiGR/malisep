document.addEventListener('DOMContentLoaded', () => {
    const tabsManager = () => {
        const tabs = document.querySelector('.tabs');
        const tabsBtn = document.querySelectorAll('.tabs__btn');
        const tabsContent = document.querySelectorAll('.tabs__content');

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

    const accordionManager = () => {
        var accordion = (function (element) {
            var _getItem = function (elements, className) {
                // функция для получения элемента с указанным классом
                var element = undefined;
                elements.forEach(function (item) {
                    if (item.classList.contains(className)) {
                        element = item;
                    }
                });
                return element;
            };
            return function () {
                var _mainElement = {}, // .accordion
                    _items = {}, // .accordion-item
                    _contents = {}; // .accordion-item-content
                var _actionClick = function (e) {
                        if (
                            !e.target.classList.contains(
                                'accordion-item-header'
                            )
                        ) {
                            // прекращаем выполнение функции если кликнули не по заголовку
                            return;
                        }
                        e.preventDefault(); // отменям стандартное действие
                        // получаем необходимые данные
                        var header = e.target,
                            item = header.parentElement,
                            itemActive = _getItem(_items, 'show');
                        if (itemActive === undefined) {
                            // добавляем класс show к элементу (в зависимости от выбранного заголовка)
                            item.classList.add('show');
                        } else {
                            // удаляем класс show у ткущего элемента
                            itemActive.classList.remove('show');
                            // если следующая вкладка не равна активной
                            if (itemActive !== item) {
                                // добавляем класс show к элементу (в зависимости от выбранного заголовка)
                                item.classList.add('show');
                            }
                        }
                    },
                    _setupListeners = function () {
                        // добавим к элементу аккордиона обработчик события click
                        _mainElement.addEventListener('click', _actionClick);
                    };

                return {
                    init: function (element) {
                        _mainElement =
                            typeof element === 'string'
                                ? document.querySelector(element)
                                : element;
                        _items =
                            _mainElement.querySelectorAll('.accordion-item');
                        _setupListeners();
                    },
                };
            };
        })();

        // инициализируем элемент с id="accordion" как аккордеон
        var accordion1 = accordion();
        accordion1.init('#accordion');

        document
            .querySelector('select')
            .addEventListener('change', function () {
                document.querySelectorAll('.tab').forEach((n, i) => {
                    n.classList.toggle('active', i === this.selectedIndex);
                });
            });
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
    };

    // custom scripts

    tabsManager();
    calcPaddingSliders();
    // accordionManager();

    // sliders

    const successSlider = new Swiper('.success-slider', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.success-slide__next',
            prevEl: '.success-slide__prev',
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
        }
    };

    SlidersHandler();

    // fancybox

    Fancybox.bind('[data-fancybox="works-slide"]', {});
});
