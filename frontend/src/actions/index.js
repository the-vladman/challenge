
import {
  checkFormValidity,
  getFormValues,
  toStringFormValues
} from '../utils'

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

export {
  handleInput,
  handleSubmit
}
