import './styles/index.css'
import {
  getElementsById
} from './utils'
import {
  handleInput,
  handleSubmit
} from './actions'

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
