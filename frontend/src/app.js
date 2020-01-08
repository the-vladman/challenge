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
    const formElements = getElementsById(document.querySelectorAll('form *'))
    /* Event Listeners */
    const {
      warrantyValue,
      warrantyRangeValue,
      loanValue,
      loanRangeValue
    } = formElements
    // WarrantyInputs
    warrantyValue.addEventListener('change', e => handleInput(warrantyRangeValue, e))
    warrantyRangeValue.addEventListener('input', e => handleInput(warrantyValue, e))
    // LoanInputs
    loanValue.addEventListener('change', e => handleInput(loanRangeValue, e))
    loanRangeValue.addEventListener('input', e => handleInput(loanValue, e))
    
    // Submit form
    formElement.addEventListener('submit', e => handleSubmit(formElement, e))
  }
}
