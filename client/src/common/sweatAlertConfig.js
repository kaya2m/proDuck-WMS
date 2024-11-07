import Swal from 'sweetalert2';

export const successAlert = (message) => {
  Swal({
    title: 'Başarılı!',
    text: message,
    icon: 'success',
    timer: 2000,
    buttons: false
  });
};

export const errorAlert = (message) => {
  Swal({
    title: 'Hata!',
    text: message,
    icon: 'error',
    timer: 2000,
    buttons: false
  });
};

export const warningAlert = (message) => {
  Swal({
    title: 'Uyarı!',
    text: message,
    icon: 'warning',
    timer: 2000,
    buttons: false
  });
};

export const confirmAlert = (title, message) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Onayla',
    cancelButtonText: 'İptal',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    return result.isConfirmed;
  });
};
