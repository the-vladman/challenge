import './styles/index.css'
import {
  checkFormValidity,
  getFormValues,
  toStringFormValues,
  getElementsById
} from './utils'

export function Send(values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit(formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
}

export default class CreditasChallenge {
  static initialize() {
    this.registerEvents()
  }

  static registerEvents() {
    const formElement = document.querySelector('.form')
    const formElements = getElementsById(formElement)
    /* Event Listeners */
    // WarrantyInputs
    formElements.warrantyValue.addEventListener('change', e =>
      (formElements.warrantyRangeValue.value = e.target.value))
    formElements.warrantyRangeValue.addEventListener('input', e =>
      (formElements.warrantyValue.value = e.target.value))
    // LoanInputs
    formElements.loanValue.addEventListener('change', e =>
      (formElements.loanRangeValue.value = e.target.value))
    formElements.loanRangeValue.addEventListener('input', e =>
      (formElements.loanValue.value = e.target.value))
    
    Submit(formElement)
  }
}
