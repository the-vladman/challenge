import Constants from '../constants'

const { FTT, interestRate } = Constants

const checkFormValidity = formElement => formElement.checkValidity()

const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

const getElementsById = body => (
  Object.values(body)
    .filter(el => el.id)
    .map(item => ({ [item.id]: item }))
    .reduce((obj, item) => ({ ...obj, ...item }), {})
)

const match = matchString => value => value.field === matchString

const getTotalLoanPayments = (termInMonths = 0, loanAmount = 0) => (FTT + interestRate + (termInMonths / 1000) + 1) * loanAmount

const getMonthlyPayment = (totalLoanPayments = 0, termInMonths = 0) => totalLoanPayments / termInMonths || 0

const calculateLending = values => {
  const termInMonths = values.find(match('parcelas')).value
  const loanAmount = values.find(match('loanValue')).value
  return getTotalLoanPayments(termInMonths, loanAmount)
}

const toStringFormValues = values => {
  const total = calculateLending(values)
  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`
    .concat(`\nTotal ${total}`)
}

export {
  checkFormValidity,
  getFormValues,
  toStringFormValues,
  getElementsById
}
