import Swal from 'sweetalert2'

const showAlert = (icon, title, text, timer, timerProgressBar) => {
  return Swal.fire({
    icon,
    title,
    text,
    timer,
    timerProgressBar
  })
}

export default showAlert
