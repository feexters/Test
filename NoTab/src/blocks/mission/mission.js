const $mission = document.querySelector(".mission");
const $phone = $mission.querySelector(".mission__phone");
const $article = $mission.querySelector(".mission__article");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 760) {
    let position = $phone.getBoundingClientRect();
    if (position.top - position.height / 2 < 0) {
      $phone.style.left = 0;
      $article.style.top = "-200px";
      $article.style.opacity = 0;

      setTimeout(() => {
        $phone.style.transform = "rotate(0deg)";
        setTimeout(() => {
          $article.style.display = "none";
          $mission.style.gridTemplateColumns = "100%";
        }, 1000);
      }, 1000);
    }
  }
});
