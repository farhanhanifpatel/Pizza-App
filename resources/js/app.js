import axios from 'axios';
import Noty from 'noty';
import moment from 'moment';
import initAdmin from './admin.js';
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');
function updateCart(pizza) {
  axios
    .post('/update-cart', pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Item added to cart',
        progressBar: false,
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: 'error',
        timeout: 1000,
        text: 'Something went wrong',
        progressBar: false,
      }).show();
    });
}

const alertMsg = document.querySelector('#success-alert');
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}
addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    console.log(pizza);
  });
});

// change order status
// let statuses = document.querySelectorAll('.status_line')
// let hiddenInput = document.querySelector('#hiddenInput')

// console.error('-<<>', statuses, hiddenInput)
// // let order = hiddenInput ? hiddenInput.value : null
// let order = hiddenInput ? hiddenInput.value.trim() : null
// order = JSON.parse(order)
// console.error('-<<>', order, hiddenInput)
// let time = document.createElement('small')

// function updateStatus(order) {
//     let stepCompleted = true
//     statuses.forEach(status => {
//         let dataProp = status.dataset.status
//         if (stepCompleted) {
//             status.classList.add('step-completed')
//         }
//         if (dataProp === order.status) {
//             stepCompleted = false
//             time.innerText = moment(order.updatedAt).format('hh:mm A')
//             status.appendChild(time)

//             if (status.nextElementSibling) {
//                 status.nextElementSibling.classList.add('current')
//             }
//         }
//     })
// }

let statuses = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector('#hiddenInput');

console.error('-<<>', document.querySelectorAll('.status_line'));
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement('small');

function updateStatus(order) {
  statuses.forEach((status) => {
    status.classList.remove('step-completed');
    status.classList.remove('current');
  });
  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add('step-completed');
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format('hh:mm A');
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add('current');
      }
    }
  });
}
updateStatus(order);

initAdmin();
