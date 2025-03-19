$(window).scroll(function () {
  var sticky = $(".sticky-header"),
    scroll = $(window).scrollTop();
  var scrollHeight = 680;
  if (screen.width <= 699) {
    scrollHeight = 300;
  }
  if (scroll >= scrollHeight) sticky.addClass("fixed");
  else sticky.removeClass("fixed");
});

function scrollIntoForm() {
  let element = $("#section_demo_form");
  element[0].scrollIntoView({ behaviour: "smooth" });
  window.scrollBy({
    top: -60,
    left: 0,
    behavior: "smooth",
  });
  gtag('event', 'Request demo (scroll)', { 'event_category': 'Demo scroll', 'event_label': 'dotpe.in' });
}



$(window).scroll(function () {
  var sticky = $(".sticky-header-demo"),
    scroll = $(window).scrollTop();
  var scrollHeight = 680;
  if (screen.width <= 699) {
    scrollHeight = 300;
  }
  if (scroll >= scrollHeight) sticky.addClass("fixed");
  else sticky.removeClass("fixed");
});
