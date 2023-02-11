var $slider = $('.slideshow .slider'),
  maxItems = $('.item', $slider).length,
  dragging = false,
  tracking,
  rightTracking;

$sliderRight = $('.slideshow').clone().addClass('slideshow-right').appendTo($('.split-slideshow'));

rightItems = $('.item', $sliderRight).toArray();
reverseItems = rightItems.reverse();
$('.slider', $sliderRight).html('');
for (i = 0; i < maxItems; i++) {
  $(reverseItems[i]).appendTo($('.slider', $sliderRight));
}

$slider.addClass('slideshow-left');
$('.slideshow-left').slick({
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  infinite: false,
  dots: true,
  speed: 1000,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {

  if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems - 1) {
    $('.slideshow-right .slider').slick('slickGoTo', -1);
    $('.slideshow-text').slick('slickGoTo', maxItems);
  } else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems - 1) {
    $('.slideshow-right .slider').slick('slickGoTo', maxItems);
    $('.slideshow-text').slick('slickGoTo', -1);
  } else {
    $('.slideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
    $('.slideshow-text').slick('slickGoTo', nextSlide);
  }
}).on("mousewheel", function(event) {
  event.preventDefault();
  if (event.deltaX > 0 || event.deltaY < 0) {
    $(this).slick('slickNext');
  } else if (event.deltaX < 0 || event.deltaY > 0) {
    $(this).slick('slickPrev');
  };
}).on('mousedown touchstart', function(){
  dragging = true;
  tracking = $('.slick-track', $slider).css('transform');
  tracking = parseInt(tracking.split(',')[5]);
  rightTracking = $('.slideshow-right .slick-track').css('transform');
  rightTracking = parseInt(rightTracking.split(',')[5]);
}).on('mousemove touchmove', function(){
  if (dragging) {
    newTracking = $('.slideshow-left .slick-track').css('transform');
    newTracking = parseInt(newTracking.split(',')[5]);
    diffTracking = newTracking - tracking;
    $('.slideshow-right .slick-track').css({'transform': 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')'});
  }
}).on('mouseleave touchend mouseup', function(){
  dragging = false;
});

$('.slideshow-right .slider').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: false,
  speed: 950,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
  initialSlide: maxItems - 1
});
$('.slideshow-text').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: false,
  speed: 900,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
});



//link custom function
$('a[data-slide]').click(function(e) {
  e.preventDefault();
  var slideno = $(this).data('slide');
  $('.slideshow .slider').slick('slickGoTo', slideno - 0);
});




// Ai provided solution
var gallery = document.querySelector('.gallery');
var galleryItems = document.querySelectorAll('.gallery-item');

function handleWheel(e) {
  // Obter direção da rolagem
  var delta = e.deltaY || e.detail || e.wheelDelta;
  // Verificar se a rolagem é para baixo ou para cima
  if (delta < 0) {
    // Scroll up
    // Verificar se já chegou ao topo da galeria
    if (gallery.scrollTop === 0) {
      // Desabilitar rolagem da galeria
      gallery.style.overflowY = 'hidden';
      // Habilitar rolagem da página
      window.scrollTo(0, window.scrollY - delta);
    } else {
      // Continuar rolagem da galeria
      gallery.scrollTop += delta;
    }
  } else {
    // Scroll down
    // Verificar se já chegou ao final da galeria
    if (gallery.scrollTop + gallery.clientHeight === gallery.scrollHeight) {
      // Desabilitar rolagem da galeria
      gallery.style.overflowY = 'hidden';
      // Habilitar rolagem da página
      window.scrollTo(0, window.scrollY - delta);
    } else {
      // Continuar rolagem da galeria
      gallery.scrollTop += delta;
    }
  }
}

// Adicionar evento de rolagem à galeria
gallery.addEventListener('wheel', handleWheel);

// Verificar se houve clique em algum item da galeria
gallery.addEventListener('click', function(e) {
  // Obter item clicado
  var item = e.target.closest('.gallery-item');
  // Verificar se o item clicado existe
  if (!item) return;
  // Habilitar rolagem da galeria
  gallery.style.overflowY = 'scroll';
  // Definir posição do item clicado na galeria
  gallery.scrollTop = item.offsetTop;
});