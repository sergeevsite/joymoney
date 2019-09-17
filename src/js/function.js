$(document).ready(function(){

// Мобильное меню
$('.header-humburger').on('click', menuMobile); // Закрытие меню при клике на значок меню
$('#closeButton').on('click', closeMobile); // Закртие меню при клике на крестик

function menuMobile(event){
  event.preventDefault();
  $('#menuList').toggleClass('header-navbar_active');
}

function closeMobile(event){
  event.preventDefault();
  $('#menuList').removeClass('header-navbar_active');
}

$(document).mouseup(function (e){ // Закрытие меню при клике на любое место сайта
  if (!$("#menuList").is(e.target) && $("#menuList").has(e.target).length === 0) {
        $("#menuList").removeClass('header-navbar_active');
  }
});

// Появление кнопки в шапке сайта при скролле
$(window).scroll(function(){
  scroll = $(window).scrollTop();
  if (scroll > 70) {
      $('#heroButton').hide();
      $('#headerButton').show(300);
      $('#headerPhone').hide();
      width = $(window).width();
      if (width < 768) {
          $('#headerPhone').hide();
        }else if(width > 768){
          $('#headerPhone').show();
        } else {
          $('#headerPhone').show();
        }
    } else {
      $('#heroButton').show();
      $('#headerButton').hide(300);
      $('#headerPhone').show();
  }
});

// Выключение слайдера на экране меньше 768px
  width = $(window).width();
  if (width < 768) {
      iniOwl();
    }else{
      $("#owlSlider").removeClass('owl-carousel');
    }

// Инициализация Owl-carousel
function iniOwl(){
  $(".owl-carousel").owlCarousel({
    items: 1,
    autoWidth: true,
    center:true,
    loop: true,
    margin: 100,
    lazyLoad: true,
    navText: [" ", " "],
    nav: true,
    dots: false
  });
}
  //Делегируем события кнопок next prev по умолчанию нашим кнопкам, которые могут находится вне контейнера слайдера
  var owl=$(".owl-carousel");
  owl.owlCarousel();
  $(".next").click(function(){
    owl.trigger("next.owl.carousel");
  });
    $(".prev").click(function(){
    owl.trigger("prev.owl.carousel");
  });


 
// Валидация форм в секции оформление заявки
$("#feedbackForm").validate({
  errorElement: "div",
  errorClass: "invalid",
  rules: {
    userName: {
      required: true,
      minlength: 2,
    },
    userPhone: {
      required: true,
      minlength: 11,
    },
    userEmail: {
      required: true,
      minlength: 1,
    },
  },
  messages: {
    userName: "Longitud mínima 11 carácteres",
    userPhone: "Longitud mínima 11 carácteres",
    userEmail: "Longitud mínima 11 carácteres",
  }
});


// Маска для телефонов
$("#userPhone").mask("+7 999 999-99-99");



// Стилизация валидности формы
setInterval(function(){
  $('input').each(function(){
    if ($(this).hasClass('valid')) {
      $(this).siblings('label').addClass('label_valid');
      $(this).siblings('label').removeClass('label_invalid');
    }else if($(this).hasClass('invalid')){
      $(this).siblings('label').removeClass('label_valid');
      $(this).siblings('label').addClass('label_invalid');
    }else {

    }

  });

}, 1);

});