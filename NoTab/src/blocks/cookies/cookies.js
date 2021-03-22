const $cookies = document.querySelector('.cookies')

let bottom = -90

/* Appear animation */
let cookiesAppear = setInterval(function() {
    bottom += 2
    $cookies.style.bottom = bottom + 'px'

    if (bottom >= 0) {
      clearInterval(cookiesAppear)
      return;
    }

  }, 20);

/* Click OK */
$cookies.querySelector('.cookies__button').addEventListener('click', () => {
    let bottom = 0
    /* Disappear animation */
    let cookiesDisappear = setInterval(function() {
        bottom -= 2
        $cookies.style.bottom = bottom + 'px'

        if (bottom <= -90) {
        clearInterval(cookiesDisappear)
        return;
        }

    }, 20);
})

