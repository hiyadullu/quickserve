
function accordian() {
  let acc = document.getElementsByClassName("accordion"), i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.children[0].classList.toggle("active");
      var panel = this.children[1];
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
accordian();

function clickViewMore() {
  let viewMore = document.getElementsByClassName("faq-view-more"),
    acc = document.getElementsByClassName("accordion");
  if (acc && acc.length) {
    for (let i = 0; i < 7; i++) {
      acc[i].style.display = "block";
    }
  }
  viewMore[0].addEventListener("click", function () {
    this.classList.toggle("view-less");
    if (this.classList.contains("view-less")) {
      this.innerHTML = "View less";
      if (acc && acc.length) {
        for (let i = 0; i < acc.length; i++) {
          acc[i].style.display = "block";
        }
      }
    } else {
      this.innerHTML = "View more";
      if (acc && acc.length) {
        for (let i = 7; i < acc.length; i++) {
          acc[i].style.display = "none";
        }
      }
    }
  })

}
clickViewMore();