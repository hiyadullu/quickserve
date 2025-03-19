

$(document).ready(function () {
    
    //* Brand Carousel
    $('.merchant-carousel').owlCarousel({
        loop: true,
        stagePadding: 0,
        margin: 20,
        autoplay: true,
        smartSpeed: 1500,
        responsive: {
            0:{
                items: 3
            },
            600:{
                items: 4
            },
            1000:{
                items: 6
            }
        },
        navigation : true
    });

    //* Brand Carousel
    $('.leading-brands-carousel').owlCarousel({
        loop: true,
        stagePadding: 0,
        margin: 20,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 3000,
        autoplaySpeed: 3000,
        responsive: {
            0:{
                items: 3
            },
            600:{
                items: 6
            },
            1000:{
                items: 8
            }
        },
        navigation : true
    });

    //* Brand Carousel
    $('.resta-carousel').owlCarousel({
        loop: true,
        stagePadding: 0,
        margin: 20,
        autoplay: false,
        slideTransition: 'linear',
        autoplayTimeout: 3000,
        autoplaySpeed: 3000,
        responsive: {
            0:{
                items: 4,
                autoplay: true
            },
            600:{
                items: 5,
                autoplay: true,
            },
            767:{
                items: 6
            },
            991:{
                items: 6
            },
            1200:{
                items: 8
            }
        },
        navigation : true
    });
	
	
	//* Industry Carousel
    $('.industry-carousel').owlCarousel({
        loop: false,
        margin: 40,  
        autoplay: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        dots:true,
        autoWidth: true,
        responsive: {
            0:{
                items: 1,
                autoWidth: false,
                margin: 25,
            },
            460:{
                items: 2,
                autoWidth: false,
                margin: 25,
            },
            600:{
                items: 2,
                autoWidth: false,
                margin: 30,
            },
            767:{
                items: 2,
                autoWidth: false,
            },
            991:{
                items: 3,
                autoWidth: false,
            },
            1200:{
                items: 3,
            }
        },
        
    });
    //* people Carousel
    $('.people-carousel').owlCarousel({
        loop: false, 
        autoplay: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        dots:true,
        responsive: {
            0:{
                items: 1,
            },
            600:{
                items: 1,
            },
            767:{
                items: 1,
            },
            991:{
                items: 1,
            },
            1200:{
                items: 1,
            }
        },
        
    });
    

    $('.nonloop').owlCarousel({
        autoplay: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        center: true,
        items: 2,
        loop: true,
        margin: 20,
        autoWidth: true,
        autoplayHoverPause: true,
        autoplayTimeout: 10000,
        autoplaySpeed: 6000
    });

    $('.latest-story-carousel').owlCarousel({
        center: true,
        dots: true,
        items: 1,
        loop: false,
        margin: 20,
        autoWidth: true,
        responsive:{
            0:{
                items:1,
                autoWidth:false 
               },
            768:{
                items: 1,
            }
        }
    });
    // $('.performance-carousel-slider').owlCarousel({
    //     center: true,
    //     dots: false,
    //     stagePadding:50,
    //     items: 1,
    //     loop: false,
    //     margin: 20,
    //     autoWidth: true,
    //     nav:true,
    //     responsive:{
    //         0:{
    //             items:1,
    //             autoWidth:false 
    //            },
    //         768:{
    //             items: 1,
    //         }
    //     }
    // });

    $('.story-carousel').owlCarousel({
        center: true,
        items: 1,
        dots: false,
        loop: false,
        margin: 10,
        autoWidth: true,
        responsive:{
            0:{
                items:1,
                autoWidth:false 
               },
            768:{
                items: 1,
            }
        }
    });

    $('.lifeatdope-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: false,
        margin: 10,
        autoWidth: true,
        responsive:{
            0:{
                items:1,
                autoWidth:false 
               },
            768:{
                items: 1,
            }
        }
    });

    $('.career-img-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 25,
        autoWidth: true,
        responsive:{
            0:{
                items:1,
                autoWidth:false 
               },
            768:{
                items: 1,
            }
        }
    });

    $('.working-slider-1').owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 15,
        autoWidth: true
    });
    
    $('.working-slider-2').owlCarousel({
        center: true,
        items: 4,
        loop: true,
        margin: 15,
        autoWidth: true
    });


    $('.our-culture-carousel').owlCarousel({
        center: true,
        dots: true,
        items: 1,
        loop: true,
        autoWidth: true,
        responsive:{
            0:{
                items:1,
                autoWidth:false 
            },
            768:{
                items: 1,
            }
        }
    });

    $('.lifeatdotpe-carousel').owlCarousel({
        center: true,
        dots: true,
        items: 1,
        loop: true,
        autoWidth: true,
        responsive:{
            0:{
                items:1,
                autoWidth:false 
            },
            768:{
                items: 1,
            }
        }
    });

    //* Brand Carousel
    $('.discover-carousel-slider').owlCarousel({
        loop: true,
        stagePadding: 35,
        margin: 20,
        autoplay: false,
        slideTransition: 'linear',
        // autoplayTimeout: 1000,
        autoplaySpeed: 6000,
        dots:true,
        responsive: {
            0:{
                items: 1,
                autoplay: false
            },
            600:{
                items: 1,
                autoplay: false,
            },
            767:{
                items: 1
            },
            991:{
                items: 1
            },
            1200:{
                items: 1
            }
        },
        navigation : true
    });


    //* Brand Carousel
    var performance_carousel_slider = $(".performance-carousel-slider");
    performance_carousel_slider.owlCarousel({
        loop: false,
        stagePadding: 50,
        margin:50,
        autoplay: false,
        slideTransition: 'linear',
        autoplaySpeed: 6000,
        dots:false,
        // autoWidth: true,
        nav:true,
        navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        responsive: {
            0:{
                items: 1,
                autoplay: false,
                stagePadding: 0,
            },
            600:{
                items: 1,
                autoplay: false,
            },
            767:{
                items: 1
            },
            991:{
                items: 1,
            },
            1200:{
                items: 1,
            }
        },
        navigation : true,
        
    });
    // jQuery method on
    performance_carousel_slider.on('changed.owl.carousel',function(property){
        var current = property.item.index;
        if(current == 1){
            $(property.target).find(".owl-item").parent().parent().addClass("move-slide");
        }else{
            $(property.target).find(".owl-item").parent().parent().removeClass("move-slide");
        }
    });
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.get-started-fixed').css('opacity','1');            
        } else {
            $('.get-started-fixed').css('opacity','0'); 
        }

        if($(window).scrollTop() + $(window).height() > $(document).height() - 600) {
            $('.get-started-fixed').css('opacity','0'); 
        }
        if(window.location.pathname == "/WhatsApp-marketing.html"){
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 1200) {
                $('.get-started-fixed').css('opacity', '0');
            }
        }
    });

    function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".faq-more-less")
            .toggleClass('fa-plus fa-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);

    function footerMenuAccordion(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".footer-more-less")
            .toggleClass('fa-plus fa-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', footerMenuAccordion);
    $('.panel-group').on('shown.bs.collapse', footerMenuAccordion);
    

    // Init WOW.js and get instance
    if(window.screen.width > 1200) {

        //WOW.js init
        jQuery(function($) {
            new WOW().init();
        });  
        
        WOW.prototype.addBox = function(element) {
            this.boxes.push(element);
        };
        
        // Init WOW.js and get instance
        var wow = new WOW();
        wow.init();
        
        // Attach scrollSpy to .wow elements for detect view exit events,
        // then reset elements and add again for animation
        $('.wow').on('scrollSpy:exit', function() {
            $(this).css({
            'visibility': 'hidden',
            'animation-name': 'none'
            }).removeClass('animated');
            wow.addBox(this);
        }).scrollSpy();
    }

    $(".item-1").mouseenter(function () {
        
        $(this).attr('data-hover','true');
        $('.category-list-1-panel').attr('data-active','true');

        $('.item-2').attr('data-hover','false');
        $('.item-3').attr('data-hover','false');

        $('.category-list-2-panel').attr('data-active','false');
        $('.category-list-3-panel').attr('data-active','false');

    });

    $(".item-2").mouseenter(function () {
        
        $(this).attr('data-hover','true');
        $('.category-list-2-panel').attr('data-active','true');

        $('.item-1').attr('data-hover','false');
        $('.item-3').attr('data-hover','false');

        $('.category-list-1-panel').attr('data-active','false');
        $('.category-list-3-panel').attr('data-active','false');

    });

    $(".item-3").mouseenter(function () {
        
        $(this).attr('data-hover','true');
        $('.category-list-3-panel').attr('data-active','true');

        $('.item-1').attr('data-hover','false');
        $('.item-2').attr('data-hover','false');

        $('.category-list-1-panel').attr('data-active','false');
        $('.category-list-2-panel').attr('data-active','false');

    });


    // change navbar design on mobile view

    $(window).on("resize", function (e) {
        checkScreenSize();
    });

    checkScreenSize();

    function checkScreenSize(){
        var newWindowWidth = $(window).width();
        if (newWindowWidth < 767) {
            $('.main-header .top-bar-mobile .navbar-brand img').attr("src","https://cdn.dotpe.in/dotpe-website-live/images/dotpe-black-logo-svg.svg");
        } 
    }
    // End change navbar design on mobile view
     

    $('#gradient-canvas').gradient({
        colors: ['#3c275f', '#191b41', '#070c2d']
    });   
    
});    

        $(document).ready(function () {
            $("input#exampleRadios1").removeAttr("checked");
        });

    
    

$(document).ready(function(){
	$(".seam-less").hide();
	// $(".seam-pera").hide();
  $(".seam-more").click(function(){
    $(this).hide();
    $(".seam-less").show();
	$(".seam-pera").show();
  });
  $(".seam-less").click(function(){
    $(this).hide();
    $(".seam-more").show();
	$(".seam-pera").hide();
  });
  
  $(".seam-less2").hide();
	// $(".seam-pera2").hide();
  $(".seam-more2").click(function(){
    $(this).hide();
    $(".seam-less2").show();
	$(".seam-pera2").show();
  });
  $(".seam-less2").click(function(){
    $(this).hide();
    $(".seam-more2").show();
	$(".seam-pera2").hide();
  });
  
  $(".seam-less3").hide();
	// $(".seam-pera3").hide();
  $(".seam-more3").click(function(){
    $(this).hide();
    $(".seam-less3").show();
	$(".seam-pera3").show();
  });
  $(".seam-less3").click(function(){
    $(this).hide();
    $(".seam-more3").show();
	$(".seam-pera3").hide();
  });
  $(".rista_acc_btn ").click(function(){
    $(".faq-accordion .collapse").toggleClass("show");
    $(".faq_acco_icon").toggleClass("plus-minus");
    $(".faq_acco_icon").css("transform", "rotate(0deg)");
    $(".faq-accordion .collapse").removeClass("showw");
  });
  $(".btn.btn-link ").click(function(){
    $(".faq-accordion .collapse").removeClass("showw");
  });
  
  
});

$('.active-dots a').on('click', function(){
    $('.active-dots a.active').removeClass('active');
    // $('.carousel-indicators li.active').removeClass('active');
    $(this).addClass('active');
    // $('.carousel-indicators li.active').addClass('active');
});


            $('.rista-need .collapse').on('show.bs.collapse', function(e) {
  var $card = $(this).closest('.card');
  var $open = $($(this).data('parent')).find('.collapse.show');
  
  var additionalOffset = 0;
  if($card.prevAll().filter($open.closest('.card')).length !== 0)
  {
        additionalOffset =  $open.height();
  }
  $('html,body').animate({
    scrollTop: $card.offset().top - additionalOffset
  }, 500);
});

$('.adv-carousel').owlCarousel({
  autoWidth: true,
  loop: true,
  // margin: 10, doesn't work here :(
  nav: true,
});
$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
});
$('#schedule_demo_form').validate({
    rules: {
        name:{required:true,lettersonly: true},
        mobile:{required:true,maxlength: 10},
    },
    messages: {
        name:{required:"Please Enter Name",lettersonly: "Enter only characters"},
        mobile:{required:"Please Enter Mobile Number",maxlength: "Enter Correct Phone number"},
    },
    submitHandler: function(form) {
        console.log("hello");
        //return false;
        event.preventDefault();
        $this = $(form).find('#schedule_demo_form_btn');
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        var data_json = {
            name: $("#schedule_demo_form #name").val(),
            phone: $("#schedule_demo_form #mobile").val(),
            email: $("#schedule_demo_form #email").val(),
            businessCategory: "Food and Beverage",
            source: window.location.href,
            tncCheck: true
        };


        // $('#mobile-rista-form-id').hide();
        // $('.submit-hide').hide();
        // $('#schedule_demo_form_request p span').text("+91 "+$("#schedule_demo_form #mobile").val());
        // $('#schedule_demo_form_request').css("display" , "flex");

        $.ajax({
            type: "post",
            url: "curl.php",
            data: data_json,
            cache: false,
            success: function (res) {

                // Success message
                // $('#mobile-rista-form-id').hide();
                $('.submit-hide').hide();

                $('#schedule_demo_form_request p span').text("+91 "+$("#schedule_demo_form #mobile").val());
                $('#schedule_demo_form_request').css("display" , "flex");
            },
            error: function (err) {
                // alert(err);
                console.log(err);

                //clear all fields
                $(form).trigger("reset");
            },
            complete: function () {
                setTimeout(function () {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            }
        });
    },
    invalidHandler: function(event, validator) {
        // 'this' refers to the form
        var errors = validator.numberOfInvalids();
        if (errors) {
            var message = errors == 1 ?
                'You missed 1 field. It has been highlighted' :
                'You missed ' + errors + ' fields. They have been highlighted';
            $("div.error span").html(message);
            $("div.error").show();
        } else {
            $("div.error").hide();
        }
    }
});

    $('#B-Carousel').carousel({
//   interval: 1000,
  wrap: false,
});
/* $(document).ready(function () {
    var isFirstSlideActive = $('#B-Carousel .carousel-item:first').hasClass('active');
    var $prevButton = $('#B-Carousel').find('.carousel-control-prev');
    var $nextButton = $('#B-Carousel').find('.carousel-control-next');

    if (isFirstSlideActive) {
      $prevButton.addClass('disabled');
    }

    $('#B-Carousel').on('slide.bs.carousel', function (e) {
      var currentIndex = e.from;

      if (currentIndex === 0) {
        $prevButton.addClass('disabled');
      } else {
        $prevButton.removeClass('disabled');
      }
    });

    // Disable right arrow on last slide
    $('#B-Carousel').on('slide.bs.carousel', function (e) {
      var totalItems = $(this).find('.carousel-item').length;
      var currentIndex = e.from;

      if (currentIndex === totalItems - 1) {
        $nextButton.addClass('disabled');
      } else {
        $nextButton.removeClass('disabled');
      }
    });
  }); */
  $(document).ready(function () {
  var $carousel = $('#B-Carousel');
  var $prevButton = $carousel.find('.carousel-control-prev');
  var $nextButton = $carousel.find('.carousel-control-next');

  // Check if the first slide is active on page load
  var isFirstSlideActive = $carousel
    .find('.carousel-item:first')
    .hasClass('active');

  // Disable previous button if the first slide is active
  if (isFirstSlideActive) {
    $prevButton.addClass('disabled');
  }

  // Disable previous button when the slide is on the first item
  $carousel.on('slide.bs.carousel', function (e) {
    var currentIndex = $(e.relatedTarget).index();
    if (currentIndex === 0) {
      $prevButton.addClass('disabled');
    } else {
      $prevButton.removeClass('disabled');
    }
  });

  // Disable next button when the slide is on the last item
  $carousel.on('slide.bs.carousel', function (e) {
    var totalItems = $carousel.find('.carousel-item').length;
    var currentIndex = $(e.relatedTarget).index();
    if (currentIndex === totalItems - 1) {
      $nextButton.addClass('disabled');
    } else {
      $nextButton.removeClass('disabled');
    }
  });
});
// $("#schedule_demo_form #schedule_demo_form_btn").hide();

// $("#schedule_demo_form #name").on("keyup",function(){
//     if($("#schedule_demo_form #name").val() != "" && $("#schedule_demo_form #mobile").val() != ""){
//         $("#schedule_demo_form #schedule_demo_form_btn").show();
//     }else{
//         $("#schedule_demo_form #schedule_demo_form_btn").hide();
//     }
// });
// $("#schedule_demo_form #mobile").on("keyup",function(){
//     if($("#schedule_demo_form #name").val() != "" && $("#schedule_demo_form #mobile").val() != ""){
//         $("#schedule_demo_form #schedule_demo_form_btn").show();
//     }else{
//         $("#schedule_demo_form #schedule_demo_form_btn").hide();
//     }
// });
$("#schedule_demo_form #schedule_demo_form_btn").addClass("disabled");

$("#schedule_demo_form #name").on("keyup",function(){
    if($("#schedule_demo_form #name").val() != "" && $("#schedule_demo_form #mobile").val() != ""){
        $("#schedule_demo_form #schedule_demo_form_btn").removeClass("disabled");
    }else{
        $("#schedule_demo_form #schedule_demo_form_btn").addClass("disabled");
    }
});
$("#schedule_demo_form #mobile").on("keyup",function(){
    if($("#schedule_demo_form #name").val() != "" && $("#schedule_demo_form #mobile").val() != ""){
        $("#schedule_demo_form #schedule_demo_form_btn").removeClass("disabled");
    }else{
        $("#schedule_demo_form #schedule_demo_form_btn").addClass("disabled");
    }
});


//$("html, body").animate({ scrollTop: 0 }, "fast");

        
   