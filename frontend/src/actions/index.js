
import {
  checkFormValidity,
  getFormValues,
  toStringFormValues,
  setCurrencyValue,
  getTotalLoanPayments,
  getMonthlyPayment
  
} from '../utils'
import Constants from '../constants'

const handleInput = (element, event) => (element.value = event.target.value)

const Send = values => {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

const handleSubmit = (formElement, event) => {
  event.preventDefault()
  if (checkFormValidity(formElement)) {
    Send(getFormValues(formElement))
      .then(result => confirm(result, 'Your form submited success'))
      .catch(error => alert('Your form submited error', error))
  }
}

const handleWarrantyType = (formElements, event) => {
  const { value } = event.target
  const {
    parcelas,
    loanValue,
    loanRangeValue,
    minRange,
    maxRange
  } = formElements
  // Range values
  loanRangeValue.min = Constants[value].minLoan
  loanRangeValue.max = Constants[value].maxLoan
  // loanValues
  loanValue.value = Constants[value].minLoan
  loanRangeValue.value = Constants[value].minLoan
  // display range
  minRange.innerHTML = setCurrencyValue(Constants[value].minLoan)
  maxRange.innerHTML = setCurrencyValue(Constants[value].maxLoan)
  // terms select
  parcelas.innerHTML = Constants[value].terms.map(t => `<option value=${t}>${t}</option>`)
}

const handleChangeForm = formElements => {
  const {
    parcelas,
    loanValue,
    terms,
    total
  } = formElements
  const totalLoan = getTotalLoanPayments(parcelas.value, loanValue.value)
  const payment = getMonthlyPayment(totalLoan, parcelas.value)
  terms.innerHTML = setCurrencyValue(payment)
  total.innerHTML = `R$ ${setCurrencyValue(totalLoan)}`
}

export {
  handleInput,
  handleSubmit,
  handleWarrantyType,
  handleChangeForm
}
