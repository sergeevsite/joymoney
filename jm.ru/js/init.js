$(document).ready(function() {
  /* Calculator */

  // Опции
  // Данные сумм
  let START_MONEY = 7500,
      MAX_MONEY = 60000,
      MIN_MONEY = 3000,
      STEP_MONEY = 500,
      DELETE_MONEY = [20500, 29500],
      PERCENT = 0.76,
      PAYMENT_PERIOD = 14;

  // Данные сроков
  let START_DATE = 15,
      MAX_DATE = 30,
      MIN_DATE = 10,
      STEP_DATE = 1,
      WEEK_DATE = [10, 18, 2]; // [min, max, steps]
  
  // Разное
  let TEXT_1 = 'Сумма свыше 8000 руб. доступна со второго займа',
      TEXT_2 = 'При займах от 30000 рублей погашения увеличиваются от 10 недель, а выплаты по займу производятся раз в две недели';

  // Дата 
  const getDate = (dday) => {
    let newdate = new Date();
        newdate.setDate(newdate.getDate()+dday);
    return newdate.getDate() + ' '+['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'][newdate.getMonth()];
    }

  // Запись данных сумм в массив
  let valueMoneyArray = [];
  const createMoneyArray = (max, min, steps) => {
    for (let i = min; i < max + steps; i += steps) {
      if( i >= DELETE_MONEY[0] && i <= DELETE_MONEY[1]) {
        valueMoneyArray.splice(i, 1);
      } else {
        valueMoneyArray.push(i);
      }
    }
  }
  createMoneyArray(MAX_MONEY, MIN_MONEY, STEP_MONEY);

  // Запись данных сроков в днях
  let valueDateArray = [];
  const createDateArray = (max, min, steps) => {
    for (let i = min; i < max + steps; i += steps) {
      valueDateArray.push(i);
    }
    for (let i = WEEK_DATE[0]; i <= WEEK_DATE[1]; i += WEEK_DATE[2]) {
      valueDateArray.push(i);
    }
  }
  createDateArray(MAX_DATE, MIN_DATE, STEP_DATE);

  // Запись основных данных в объект
  const dataResult = {
    topCalculator: {
      money: START_MONEY,
      term: START_DATE,
      termWeek: 0
    },
    bottomCalculator: {
      money: START_MONEY,
      term: START_DATE,
      termWeek: 0
    }
  };

  const recResult = (id, array, value) => {
    // Верхний
    if(id === 'top_range_money') {
      dataResult.topCalculator.money = parseInt(array[value]);

      if(array[value] > 8000) {
        $('#top_text').text(TEXT_1);
        $('#top_text').addClass('active');
      } else {
        $('#top_text').removeClass('active');
      }
      if(array[value] <= 20000 && $(`#top_range_date`).slider("value") >= 21){
        $('#top_text').removeClass('bigtext').text(TEXT_1);
        dataResult.topCalculator.term = 30;
        dataResult.topCalculator.termWeek = 0;
      }
      if(array[value] >= 30000 && $(`#top_range_date`).slider("value") <= 21) {
        $('#top_text').removeClass('active').addClass('bigtext').text(TEXT_2);
        dataResult.topCalculator.term = 0;
        dataResult.topCalculator.termWeek = 10;
      }
      if(array[value] >= 30000 && $(`#top_range_date`).slider("value") >= 21) {
        $('#top_text').removeClass('active').addClass('bigtext').text(TEXT_2);
      }
    }

    if(id === 'top_range_date') {
      dataResult.topCalculator.term = parseInt(array[value]);
      if(valueMoneyArray[$(`#top_range_money`).slider("value")] < 30000 && value == 21) {
        $('#top_text').addClass('bigtext').text(TEXT_2);
        $('#top_text').addClass('active');
        dataResult.topCalculator.money = 30000;
        dataResult.topCalculator.term = 0;
      }
      if(valueMoneyArray[$(`#top_range_money`).slider("value")] >= 30000 && value >= 21) {
        dataResult.topCalculator.term = 0;
      }
      if(valueMoneyArray[$(`#top_range_money`).slider("value")] < 20000 && value == 20){
        dataResult.topCalculator.money = valueMoneyArray[$(`#top_range_money`).slider("value")];
      }else if(valueMoneyArray[$(`#top_range_money`).slider("value")] > 20000 && value == 20){
        dataResult.topCalculator.money = 20000;
      }
      if(valueMoneyArray[$(`#top_range_money`).slider("value")] <= 20000 && value >= 21) {
        $('#top_text').addClass('bigtext').text(TEXT_2);
        $('#top_text').addClass('active');
        dataResult.topCalculator.money = 30000;
        dataResult.topCalculator.term = 0;
        $(`#top_range_money`).slider("value", 30);
        $(`#top_value_money`).text(dataResult.topCalculator.money + ' руб.');
        $('.top-week').addClass('active');
        $('.top-return').addClass('active');
        $('.top-general').addClass('active');
      }
      if(valueMoneyArray[$(`#top_range_money`).slider("value")] >= 30000 && value <= 20 ) {
        dataResult.topCalculator.money = 20000;
        $('#top_text').addClass('bigtext').text(TEXT_1);
        $(`#top_range_money`).slider("value", 30);
        $(`#top_value_money`).text(dataResult.topCalculator.money + ' руб.');
      }
      if(valueMoneyArray[$(`#top_range_money`).slider("value")] == 20000 && value < 20) {
        dataResult.topCalculator.money = 20000;
        $('#top_text').removeClass('bigtext').text(TEXT_1);
        $('#top_text').addClass('active');
        $(`#top_range_money`).slider("value", 30);
        $(`#top_value_money`).text(dataResult.topCalculator.money + ' руб.');
      }
      if(value <= 20) {
        $('.top-week').removeClass('active');
        $('.top-return').removeClass('active');
        $('.top-general').removeClass('active');
      }
      if(valueMoneyArray[$(`#top_range_money`).slider("value")] > 8000 && value == 20) {
        $('#top_text').addClass('active');
      }
    }
    // Нижний
    if(id === 'bottom_range_money') {
      dataResult.bottomCalculator.money = parseInt(array[value]);
      if(array[value] > 8000) {
        $('#bottom_text').text(TEXT_1);
        $('#bottom_text').addClass('active');
      } else {
        $('#bottom_text').removeClass('active');
      }
      if(array[value] <= 20000 && $(`#bottom_range_date`).slider("value") >= 21){
        $('#bottom_text').removeClass('bigtext').text(TEXT_1);
        dataResult.bottomCalculator.term = 30;
        dataResult.bottomCalculator.termWeek = 0;
      }
      if(array[value] >= 30000 && $(`#bottom_range_date`).slider("value") <= 21) {
        $('#bottom_text').removeClass('active').addClass('bigtext').text(TEXT_2);
        dataResult.bottomCalculator.term = 0;
        dataResult.bottomCalculator.termWeek = 10;
      }
      if(array[value] >= 30000 && $(`#bottom_range_date`).slider("value") >= 21) {
        $('#bottom_text').removeClass('active').addClass('bigtext').text(TEXT_2);
      }
    }

    if(id === 'bottom_range_date') {
      dataResult.bottomCalculator.term = parseInt(array[value]);
      if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] < 30000 && value == 21) {
        $('#bottom_text').addClass('bigtext').text(TEXT_2);
        $('#bottom_text').addClass('active');
        dataResult.bottomCalculator.money = 30000;
        dataResult.bottomCalculator.term = 0;
      }
      if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] >= 30000 && value >= 21) {
        dataResult.bottomCalculator.term = 0;
      }
      if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] < 20000 && value == 20){
        dataResult.bottomCalculator.money = valueMoneyArray[$(`#bottom_range_money`).slider("value")];
      }else if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] > 20000 && value == 20){
        dataResult.bottomCalculator.money = 20000;
      }
      if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] <= 20000 && value >= 21) {
        $('#bottom_text').addClass('bigtext').text(TEXT_2);
        $('#bottom_text').addClass('active');
        dataResult.bottomCalculator.money = 30000;
        dataResult.bottomCalculator.term = 0;
        $(`#bottom_range_money`).slider("value", 30);
        $(`#bottom_value_money`).text(dataResult.bottomCalculator.money + ' руб.');
        $('.bottom-week').addClass('active');
        $('.bottom-return').addClass('active');
        $('.bottom-general').addClass('active');
      }
      if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] >= 30000 && value <= 20 ) {
        dataResult.bottomCalculator.money = 20000;
        $('#bottom_text').addClass('bigtext').text(TEXT_1);
        $(`#bottom_range_money`).slider("value", 30);
        $(`#bottom_value_money`).text(dataResult.bottomCalculator.money + ' руб.');
      }
      if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] == 20000 && value < 20) {
        dataResult.bottomCalculator.money = 20000;
        $('#bottom_text').removeClass('bigtext').text(TEXT_1);
        $('#bottom_text').addClass('active');
        $(`#bottom_range_money`).slider("value", 30);
        $(`#bottom_value_money`).text(dataResult.bottomCalculator.money + ' руб.');
      }
      if(value <= 20) {
        $('.bottom-week').removeClass('active');
        $('.bottom-return').removeClass('active');
        $('.bottom-general').removeClass('active');
      }
      if(valueMoneyArray[$(`#bottom_range_money`).slider("value")] > 8000 && value == 20) {
        $('#bottom_text').addClass('active');
      }
    }

    // Верхний
    if(value > 20 && id === 'top_range_date') {
      dataResult.topCalculator.termWeek = parseInt(array[value]);
    }else if(value < 21 && id === 'top_range_date') {
      dataResult.topCalculator.termWeek = 0;
    }

    // Нижний
    if(value > 20 && id === 'bottom_range_date') {
      dataResult.bottomCalculator.termWeek = parseInt(array[value]);
    }else if(value < 21 && id === 'bottom_range_date') {
      dataResult.bottomCalculator.termWeek = 0;
    }
  }

  // Инициализация ползунка
  const initSlider = (idSlider, idValue, start, arr) => {

    // Стартовые значения при загрузке
    arr.forEach((item, i) => {
      if(parseInt(item) == start) {
        start = i;
      }
    });
   
    // Для расчета формулы
    const calculation = (calculator) => {
      let days = calculator.termWeek * 7;
      let money = calculator.money;
      let f_o = Math.round(days / PAYMENT_PERIOD);
      let f_t = PERCENT * PAYMENT_PERIOD / 100;
      let f_th = f_t * Math.pow((1 + f_t), f_o) / (Math.pow((1 + f_t), f_o) - 1);
      let weekResult = Math.round((f_th * money * 100) / 100);
      let totalResult = days / 7 / 2 * weekResult;
      let data = {
        week: weekResult.toLocaleString(),
        total: totalResult.toLocaleString()
      }
      return data;
    }

    $(`#${idSlider}`).slider({
      animate: 0,
      range: "min",    
      value: start,
      max: arr.length - 1,
      min: 0,
      step: 1,
      slide: (event, ui) => {
        // Проверка подстановки единиц измерения
        let unit = ' дней';
        if(arr == valueMoneyArray) unit = ' руб.';
        if(arr == valueDateArray && ui.value > 20) unit = ' недель';
        // Запись всех значений в объект
        recResult(idSlider, arr, ui.value);
        // Вывод результата
          // Верхний калькулятор
        if(dataResult.topCalculator.termWeek == 10) {
          $('.top-week').addClass('active');
          $('.top-return').addClass('active');
          $('.top-general').addClass('active');
        }
        if(dataResult.topCalculator.money == 30000 && dataResult.topCalculator.termWeek == 10) {
          $(`#top_range_money`).slider("value", 31);
          $(`#top_value_money`).text(dataResult.topCalculator.money + ' руб.');
        }
        if(dataResult.topCalculator.money == 20000 && dataResult.topCalculator.term == 30) {
          $(`#top_range_money`).slider("value", 30);
          $(`#top_value_money`).text(dataResult.topCalculator.money + ' руб.');
        }
        if(dataResult.topCalculator.money >= 30000 && dataResult.topCalculator.termWeek == 10) {
          $(`#top_range_date`).slider("value", 21);
          $(`#top_value_date`).text(dataResult.topCalculator.termWeek + ' недель');
        }
        if(dataResult.topCalculator.money <= 20000 && dataResult.topCalculator.term == 30) {
          $(`#top_range_date`).slider("value", 20);
          $(`#top_value_date`).text(dataResult.topCalculator.term + ' дней');
          $('.top-week').removeClass('active');
          $('.top-return').removeClass('active');
          $('.top-general').removeClass('active');
        }
            // Дата
            if(dataResult.topCalculator.term <= 30 || dataResult.topCalculator.money <= 20000) {
              $('#top_value_term').text(getDate(dataResult.topCalculator.term));
            }
            if(dataResult.topCalculator.termWeek >= 10 || dataResult.topCalculator.money >= 30000) {
              $('#top_value_term').text(getDate(dataResult.topCalculator.termWeek * 7));
            }
          // Нижний калькулятор
          if(dataResult.bottomCalculator.termWeek == 10) {
            $('.bottom-week').addClass('active');
            $('.bottom-return').addClass('active');
            $('.bottom-general').addClass('active');
          }
          if(dataResult.bottomCalculator.money == 30000 && dataResult.bottomCalculator.termWeek == 10) {
            $(`#bottom_range_money`).slider("value", 31);
            $(`#bottom_value_money`).text(dataResult.bottomCalculator.money + ' руб.');
          }
          if(dataResult.bottomCalculator.money == 20000 && dataResult.bottomCalculator.term == 30) {
            $(`#bottom_range_money`).slider("value", 30);
            $(`#bottom_value_money`).text(dataResult.bottomCalculator.money + ' руб.');
          }
          if(dataResult.bottomCalculator.money >= 30000 && dataResult.bottomCalculator.termWeek == 10) {
            $(`#bottom_range_date`).slider("value", 21);
            $(`#bottom_value_date`).text(dataResult.bottomCalculator.termWeek + ' недель');
          }
          if(dataResult.bottomCalculator.money <= 20000 && dataResult.bottomCalculator.term == 30) {
            $(`#bottom_range_date`).slider("value", 20);
            $(`#bottom_value_date`).text(dataResult.bottomCalculator.term + ' дней');
            $('.bottom-week').removeClass('active');
            $('.bottom-return').removeClass('active');
            $('.bottom-general').removeClass('active');
          }
            // Дата
            if(dataResult.bottomCalculator.term <= 30 || dataResult.bottomCalculator.money <= 20000) {
              $('#bottom_value_term').text(getDate(dataResult.bottomCalculator.term));
            }
            if(dataResult.bottomCalculator.termWeek >= 10 || dataResult.bottomCalculator.money >= 30000) {
              $('#bottom_value_term').text(getDate(dataResult.bottomCalculator.termWeek * 7));
            }
        // Расчет результатов
          // Верхний калькулятор
          $('#top_week_result').text(calculation(dataResult.topCalculator).week + ' Р');
          $('#top_result').text(calculation(dataResult.topCalculator).total + ' Р');
          $('#top_return_result').text((Math.round((dataResult.topCalculator.money * (dataResult.topCalculator.term / 100)) + dataResult.topCalculator.money)).toLocaleString() + ' Р');

          // Нижний калькулятор
          $('#bottom_week_result').text(calculation(dataResult.bottomCalculator).week + ' Р');
          $('#bottom_result').text(calculation(dataResult.bottomCalculator).total + ' Р');
          $('#bottom_return_result').text((Math.round((dataResult.bottomCalculator.money * (dataResult.bottomCalculator.term / 100)) + dataResult.bottomCalculator.money).toLocaleString()) + ' Р');

          $(`#${idValue}`).text(arr[ui.value] + unit);
      }, 
    });

    // Проверка подстановки единиц измерения
    let unit = ' дней';
    if (arr == valueMoneyArray) unit = ' руб.';

    // Вывод стратовых значений
    const valueSlider = $(`#${idSlider}`).slider("value");
    $(`#${idValue}`).text(arr[valueSlider] + unit);
    // Расчет результатов
      // Верхний калькулятор
      $('#top_week_result').text(calculation(dataResult.topCalculator).week + ' Р');
      $('#top_result').text(calculation(dataResult.topCalculator).total + ' Р');
      $('#top_return_result').text((Math.round((dataResult.topCalculator.money * (dataResult.topCalculator.term / 100)) + dataResult.topCalculator.money)).toLocaleString() + ' Р');
        // Дата
        $('#top_value_term').text(getDate(dataResult.topCalculator.term));
      // Нижний калькулятор
      $('#bottom_week_result').text(calculation(dataResult.bottomCalculator).week + ' Р');
      $('#bottom_result').text(calculation(dataResult.bottomCalculator).total + ' Р');
      $('#bottom_return_result').text((Math.round((dataResult.bottomCalculator.money * (dataResult.bottomCalculator.term / 100)) + dataResult.bottomCalculator.money)).toLocaleString() + ' Р');
        // Дата
        $('#bottom_value_term').text(getDate(dataResult.bottomCalculator.term));

  }

  initSlider('top_range_money', 'top_value_money', START_MONEY, valueMoneyArray);
  initSlider('top_range_date', 'top_value_date', START_DATE, valueDateArray);
  initSlider('bottom_range_money', 'bottom_value_money', START_MONEY, valueMoneyArray);
  initSlider('bottom_range_date', 'bottom_value_date', START_DATE, valueDateArray);

  /* Products */
  // Slider products
  let sliderProduct = $('#sliderProduct_js').lightSlider({
    item: 3,
    speed: 700,
    pager: true,
    loop: false,
    controls: false,
    slideMove: 2,
    // slideMargin: 8,
    adaptiveHeight: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    responsive: [
      {
        breakpoint:1920,
        settings: {
            item:3,
          }
      },
      {
        breakpoint:990,
        settings: {
            item:2,
          }
      },
      {
        breakpoint:768,
        settings: {
            item:1,
            slideMove: 1,
          }
      }
    ]
  });

  $('#prevProducts').on('click', function(){
    sliderProduct.goToPrevSlide();
  })
  $('#nextProducts').on('click', function(){
    sliderProduct.goToNextSlide();
  })

  /* Partner */
  // Slider partner
  $('#sliderPartner_js').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'ease',
    arrows: false,
    dots: false,
    infinite: true,
    swipeToSlide: false,
    touchMove: false,
    pauseOnFocus: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
  // $('#sliderPartner_js').lightSlider({
  //   item: 5,
  //   speed: 3000,
  //   pause: 3100,
  //   pager: false,
  //   loop: true,
  //   controls: false,
  //   slideMove: 1,
  //   auto: true,
  //   pauseOnHover: true,
  //   responsive: [
  //     {
  //       breakpoint:1920,
  //       settings: {
  //           item:5,
  //         }
  //     },
  //     {
  //       breakpoint:990,
  //       settings: {
  //           item:3,
  //           slideMove: 1,
  //           // adaptiveHeight: true
  //         }
  //     },
  //     {
  //       breakpoint:768,
  //       settings: {
  //           // adaptiveHeight: true,
  //           pager: false,
  //           item:1,
  //           slideMove: 1,
  //         }
  //     }
  //   ]
  // });

  /* Review */
  // Slider review
  let sliderReview = $('#sliderReview_js').lightSlider({
    item: 3,
    speed: 700,
    pager: true,
    loop: false,
    controls: false,
    slideMove: 3,
    // auto: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    responsive: [
      {
        breakpoint:1920,
        settings: {
            item:3,
          }
      },
      {
        breakpoint:990,
        settings: {
            item:2,
            slideMove: 2,
            adaptiveHeight: true
          }
      },
      {
        breakpoint:768,
        settings: {
            adaptiveHeight: true,
            pager: false,
            item:1,
            slideMove: 1,
          }
      }
    ]
  });

  $('#prevReview').on('click', function(){
    sliderReview.goToPrevSlide();
  })
  $('#nextReview').on('click', function(){
    sliderReview.goToNextSlide();
  })

  // triangle-review canvas
  var canvas = document.querySelectorAll('.review-triangle');
  canvas.forEach((cnv) => {
    var context = cnv.getContext('2d');
    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(10, 25);
    context.lineTo(40, 0);
    context.quadraticCurveTo(0,22,45,0);
    context.closePath();
    
    context.shadowColor = "rgba(0, 0, 0, 0.2)";
    context.shadowBlur = 7;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 1;
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fill();
  });

  // Шапка сайта
  $(document).scroll(() => {
    if($(this).scrollTop() > 50) {
      $('.header-private').fadeIn(300);
      $('.header-contacts').addClass('active');
    } else {
      $('.header-private').hide(0);
      $('.header-contacts').removeClass('active');
    } 
  });

  // Меню
  $('.header-burger').click(() => {
    $('.header-menu').addClass('active');
    $('.header-menu').removeClass('close');
    $(document).mouseup(function (e){
      if (!$(".header-menu").is(e.target) && $(".header-menu").has(e.target).length === 0) {
        $('.header-menu').addClass('close');
        $('.header-menu').removeClass('active');
      }
    });
  });
  $('.header-menu-close').click(() => {
    $('.header-menu').addClass('close');
    $('.header-menu').removeClass('active');
  });

  // Уведомления
  $('.notice-wrapper').addClass('active');
  $('.notice-close').click(() => {
    $('.notice-wrapper').removeClass('active');
    setTimeout(() => {
      $('.notice-wrapper').css('display', 'none')
    }, 600);
  });

  // Функция смены контента на при клике на табы
  const changeTabsContent = (tabs, content, element) => {
    const tabsButton = document.querySelectorAll(tabs),
          tabsContent = document.querySelectorAll(content);

    if(tabsButton.length !== 0 && tabsContent.length !== 0) {
      tabsButton[element].classList.add('active');
      tabsContent[element].classList.add('active');
      tabsButton.forEach((item, i) => {
        item.addEventListener('click', () => {
          tabsButton.forEach(item => item.classList.remove('active'));
          tabsContent.forEach(itemContent => itemContent.classList.remove('active'));
          item.classList.add('active');
          tabsContent[i].classList.add('active');
        });
      });
    }
  }

  // Смена на странице faq
  changeTabsContent('.faq-tabs__button', '.faq-content', 0);
  // Смена на странице news
  changeTabsContent('.news-tabs__button', '.news-wrapper', 0);

  // Аккардеон для faq
  $( ".tabs-content" ).accordion({
    collapsible: true,
    active: false,
    header: 'h2',
    animate: 200,
    heightStyle: 'content'
  });

  // Поиск по faq
  const faqSearch = document.querySelector('#faqSearch');

  if(faqSearch !== null) {
    faqSearch.addEventListener('input', () => {
      let val = faqSearch.value.trim().toLowerCase();
      let faqItem = document.querySelectorAll('.tabs-content__item');
      let faqText = document.querySelectorAll('.tabs-content__answer');
      if(val != ''){
        faqItem.forEach((title) => {
          faqText.forEach((text)=> {
            if(title.innerHTML.toLowerCase().search(val) == -1 && text.innerHTML.toLowerCase().search(val)){
              title.style.display = 'none';
            } else {
              title.style.display = 'block';
            }
          });
        });
      } else {
        faqItem.forEach((elem) => {
          elem.style.display = 'block';
        });
      }
    });  
  }

 // Обрезка текста
const cropText = (id, limit, limit_m) => {
  let sizeDesktop = limit,
      sizeMobil = limit_m,
      newsContent = $(id);
  $(newsContent).each((i, item) => {
    newsText = $(item).text();
    if($(window).width() < 575) {
      if(newsText.length > sizeMobil){
        $(item).text(newsText.slice(0, sizeMobil) + ' ...');
      }
    }else{
      if(newsText.length > sizeDesktop){
        $(item).text(newsText.slice(0, sizeDesktop) + ' ...');
      }
    }
  });
}
cropText('.crop', 60, 60);
cropText('.crop-text', 55, 50);

// Смена карт при клике
$('.moskow').on('click', function() {
  $('#mapNsk').removeClass('active');
  $('#mapMoscow').addClass('active');
});
$('.nsk').on('click', function() {
  $('#mapNsk').addClass('active');
  $('#mapMoscow').removeClass('active');
});


$('.vacancies__title').click(function(event){
if($('.vacancies').hasClass('one')){
  $('.vacancies__title').not($(this)).removeClass('active');
  $('.vacancies__text').not($(this).next()).slideUp(300);
}
$(this).toggleClass('active').next().slideToggle(300);
});

// Смена контента в модальном окне (страница как вернуть)
const buttonReturn = document.querySelectorAll('.instruction-buttons__item'),
      contentReturn = document.querySelectorAll('.instruction-content'),
      modalReturn = document.querySelector('.modal-return'),
      modalContent = document.querySelector('.modal-content'),
      modalCloseBtn = document.querySelector('.modal__close');

      buttonReturn.forEach((button, iButton, aButton) => {
        button.addEventListener('click', () => {
          // modalReturn.scrollTop = 0;
          document.querySelector('body').style.overflow = 'hidden';
          modalReturn.classList.add('active');
          contentReturn.forEach((content, iContent, aContent) => {
            if(aButton.length > iContent && aContent.length > iButton) {
              if(iButton === iContent) {
                modalContent.innerHTML = content.innerHTML;
              }
            }else{
              modalContent.innerHTML = 'Пусто'
            }
          });
        })
      });

      const modalHide = (modal) => {
        document.querySelector('body').style.overflow = 'visible';
        modal.classList.remove('active');
      }

      if(modalCloseBtn !== null) {
        modalCloseBtn.addEventListener('click', () => {
          modalHide(modalReturn);
        });
      }

      $('.modal').on('click', (event) => {
        event.preventDefault();
        if(event.target.classList[0] == 'modal') {
          modalHide(modalReturn);
        }
      });
  // Список для даты регистрация
  // const dateDay = document.getElementById('dateDay'),
  //       dateMonth = document.getElementById('dateMonth'),
  //       dateYear = document.getElementById('dateYear');
  // // Данные
  // const MIN_YEAR = 1940,
  //       MAX_YEAR = 2001,
  //       monthName = [
  //         'Январь', 
  //         'Февраль',
  //         'Март',
  //         'Апрель',
  //         'Май',
  //         'Июнь',
  //         'Июль',
  //         'Август',
  //         'Сентябрь',
  //         'Октябрь',
  //         'Ноябрь',
  //         'Декабрь'
  //       ]
  //     for ( i = 0; i < 32; i++ ) {
  //       let days = document.createElement('option');
  //       if(i !== 0) {
  //         days.value = i;
  //         days.textContent = i;
  //         if(i < 10) {
  //           days.textContent = '0' + i;
  //         }
  //         dateDay.append(days);
  //         if(i == 1) {
  //           days.setAttribute('selected', 'selected');
  //         }
  //       }
  //     }
  //     for ( i = 0; i < 12; i++ ) {
  //       let month = document.createElement('option');
  //       month.value = i;
  //       month.textContent = monthName[i];
  //       dateMonth.append(month);
  //     }
  //     for ( i = MIN_YEAR; i < MAX_YEAR + 1; i++ ) {
  //       let year = document.createElement('option');
  //       year.value = i;
  //       year.textContent = i;
  //       dateYear.append(year);
  //     }

  // const setValueDate = (event, ui) => {
  //   const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  //         dateMonthButton = document.getElementById('dateMonth-button'),
  //         dateYearButton = document.getElementById('dateYear-button');
    // if (dateMonth.value != 0) {
      // console.log(ui.item);
      // if(ui.item.index >= 29) {
      //   console.log('object');
      // }
      // if(ui.item.value >= MIN_YEAR) {
      //   // console.log(ui.item.value % 4 == 0);
      //   if ((ui.item.value % 4 == 0) && (dateMonthButton.children[1].textContent == 'Февраль')) {
      //     dateDay.length = 29;
      //     // console.log(dateDay.length);
      //     // dateDay.item(29).value = 29;
      //     // dateDay.item(29).text = 29;
      //   } else {
          
      //     // dateDay.length = daysInMonth[dateMonth.value - 1] + 1;
      //     // for (let i = 29; i < dateDay.length; i++) {
      //     //   dateDay.item(i).value = i;
      //     //   dateDay.item(i).text = i;
      //     // }
      //   }
      // }
    // }
  // }
  // $('.select-date').selectmenu({
  //   width: '100%',
  //   select: (event, ui) => {
  //     setValueDate(event, ui);
  //   }
  // });

// Валидация
/* Reviews */
if($(document).find('#formReviews').is('#formReviews')) {
  $('#formReviews').validate({
    errorElement: "div",
    errorClass: "invalid",
    rules:{
      reviewsName:{
        required: true,
        minlength: 2
      },
      reviewsPosition:{
        required: true,
        minlength: 2
      },
      reviewsText:{
        required: true,
        minlength: 10
      }
    },
    messages:{
      reviewsName:{
        required: "",
        minlength: "",
      },
      reviewsPosition:{
        required: "",
        minlength: "",
      },
      reviewsText:{
        required: "",
        minlength: "",
      }
    }
  });
}

// функция записи куки
function setCookie(name, value, options) {
  if (!navigator.cookieEnabled) {
      }
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + ((expires * 24 * 60 * 60 * 1000)));
      expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
          updatedCookie += "=" + propValue;
      }
  }
  document.cookie = updatedCookie;
}

// Функция получения куки
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

// всплывашка cookies
if(getCookie("cookieNotify") == '') {
  $('.footer-cookies').slideDown(300);
}

$('.cookiesClose').on('click', () => {
  setCookie("cookieNotify", 'Y', { 'path': '/', 'expires': 7 });
  $('.footer-cookies').slideUp(300);
});

let dateNews = document.querySelectorAll('.news-info__date');
let dateWrapper = document.querySelectorAll('.news-wrapper');

let dateArray = [];
let dateWrapperArray = [];

for (let i = 0; i < dateNews.length; i++) {
  let date = new Date(dateNews[i].textContent.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'))
  let dateParse = dateArray.push(Date.parse(date));
}

for (let i = 0; i < dateWrapper.length; i++) {
  dateWrapperArray.push(dateWrapper[i]);
}
dateWrapperArray.sort((a, b) => {
  console.log(a.textContent);
});

$('.js-slideMenu').on('click', (event) => {
  let target = event.target;
  $(target).next().slideToggle();
  $(target).toggleClass('open');
})


});
