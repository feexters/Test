const $form = document.querySelectorAll('.get-in-touch__form-item')
$form.forEach($input => {
    $input.addEventListener('change', event => {
        /* Delete space */
        $input.value = $input.value.trim()
        /* Delete error */
        if ($input.value) {
            $input.classList.remove('input_error')
        }
    })
})

/* Form validation error */
const $send = document.querySelector('.get-in-touch__button')
$send.addEventListener('click', () => {
    $form.forEach($input => {
        if(!$input.value.trim()) {
            $input.classList.add('input_error')
        }
    })
})