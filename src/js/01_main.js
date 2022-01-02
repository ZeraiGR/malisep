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

    const calcMarginSliders = () => {
        const section = document.querySelector('.success-history');

        if (section) {
            const windowWidth =
                (window.innerWidth - 1170 - scrollbarWidth()) / 2;

            section.style['padding-left'] = windowWidth + 'px';
        }
    };

    // custom scripts

    tabsManager();
    calcMarginSliders();
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

    const worksSliderHandler = () => {
        const bullets = document.querySelector('.works-slide__bullets'),
            prevArrow = document.querySelector('.works-slide__prev'),
            nextArrow = document.querySelector('.works-slide__next'),
            bulletsList = bullets.querySelectorAll('.works-slide__bullet');
        if (bullets) {
            bullets.addEventListener('click', (e) => {
                const target = e.target,
                    index = target.getAttribute('data-index');
                if (target.classList.contains('works-slide__bullet')) {
                    bulletsList.forEach((el) => {
                        el.classList.remove('active');
                    });

                    target.classList.add('active');
                    worksSlider.slideTo(index);
                }
            });

            const changeSlide = () => {
                bulletsList.forEach((el) => {
                    el.classList.remove('active');
                });
                const realIndex = worksSlider.realIndex;

                console.log(bulletsList[realIndex]);
                bulletsList[realIndex].classList.add('active');
            };

            prevArrow.addEventListener('click', () => {
                changeSlide();
            });

            nextArrow.addEventListener('click', () => {
                changeSlide();
            });
        }
    };

    worksSliderHandler();

    // fancybox

    Fancybox.bind('[data-fancybox="works-slide"]', {});
});
