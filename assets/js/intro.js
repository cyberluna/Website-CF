//-----------Magic Intro

const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
//END SECTION
const section = document.querySelector("section");
const end = section.querySelector("h1");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 9000,
  triggerElement: intro,
  triggerHook: 0
})
//  .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Text Animation
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on("update", e => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  console.log(scrollpos, delay);

  video.currentTime = delay;
}, 33.3);

//---------logo color change when scroll

$(function() {
    var LogoColor = $(".cls-2");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 9850) {
            LogoColor.removeClass('cls-2').addClass("cls-2-alt");
        } 

        else if  (scroll <= 9850){
            LogoColor.removeClass("cls-2-alt").addClass('cls-2');
        }

        else {
          (scroll <= 11500) 
          LogoColor.removeClass('cls-2').addClass("cls-2-alt");
        }

    });
});



//-------------logo scale change when scroll

$(function() {
  var LogoScale = $(".logo-scale");
  $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 9850) {
        LogoScale.removeClass('logo-scale').addClass("logo-scale-alt")
          ;
      } else { (scroll <= 9850)
        LogoScale.removeClass("logo-scale-alt").addClass('logo-scale');
      }
  });
});

//-------------arrow opacity change when scroll

$(function() {
  var LogoScale = $(".scroll-arrow");
  $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 2000) {
        LogoScale.removeClass('scroll-arrow').addClass("scroll-arrow1")
          ;
      } else { (scroll <= 2000)
        LogoScale.removeClass("scroll-arrow1").addClass('scroll-arrow');
      }
  });
});
