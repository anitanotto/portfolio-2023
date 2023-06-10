//Close
const closeButtons = document.querySelectorAll(".close");

for (const button of closeButtons) {
  button.addEventListener("click", function () {
    button.parentNode.parentNode.parentNode.classList.add("hidden");
  });
}

//Drag n Drop
const windows = document.querySelectorAll(".title-bar");

for (const bar of windows) {
  bar.onmousedown = function (event) {
    if (event.button === 0 && event.target.nodeName !== "BUTTON") {
      // (1) prepare to moving: make absolute and on top by z-index
      bar.parentNode.style.position = "absolute";
      bar.parentNode.style.zIndex = 1000;

      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(bar.parentNode);

      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        bar.parentNode.style.left = pageX - bar.offsetWidth / 2 + "px";
        bar.parentNode.style.top = pageY - bar.offsetHeight / 2 + "px";
      }

      // move our absolutely positioned ball under the pointer
      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      // (2) move the ball on mousemove
      document.addEventListener("mousemove", onMouseMove);

      // (3) drop the ball, remove unneeded handlers
      bar.onmouseup = function (event) {

        bar.parentNode.style.position = "fixed";
        bar.parentNode.style.left = event.pageX - bar.offsetWidth / 2 + "px";
        let targetY = event.screenY - (window.screen.availHeight - window.innerHeight)

        bar.parentNode.style.top = targetY - bar.offsetHeight / 2 + "px";
          
        document.removeEventListener("mousemove", onMouseMove);
        bar.onmouseup = null;
      };
    }

    bar.ondragstart = function () {
      return false;
    };
  };
}

//Right Modules

//Yuk
const yuk = document.querySelector("#yukButton");

yuk.addEventListener("click", disableAnimations);

function disableAnimations() {
  const targets = document.querySelectorAll("*");

  for (const target of targets) {
    target.classList.add("noanimation");
  }

  document.querySelector("body").classList.toggle('movingStars')
  document.querySelector("body").classList.toggle('stillStars')


  localStorage.setItem("yuk", "true");

  document.querySelector("#yukButton").style.display = "none";
  document.querySelector("#yumButton").style.display = "inline-block";
}

const yum = document.querySelector("#yumButton");

yum.addEventListener("click", enableAnimations);
window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("yuk") === "true") {
    disableAnimations();
  }
});
function enableAnimations() {
  const targets = document.querySelectorAll("*");

  for (const target of targets) {
    target.classList.toggle("noanimation");
  }

  document.querySelector("body").classList.toggle('stillStars')
  document.querySelector("body").classList.toggle('movingStars')


  localStorage.setItem("yuk", "false");

  document.querySelector("#yukButton").style.display = "inline-block";
  document.querySelector("#yumButton").style.display = "none";
}
