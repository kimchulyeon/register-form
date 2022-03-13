const formEl = document.querySelector('form')
const usernameInputEl = document.querySelector('#username')
const emailInputEl = document.querySelector('#email')
const passwordInputEl = document.querySelector('#password')
const passwordCheckInputEl = document.querySelector('#password_check')
const submitBtn = document.querySelector('.btn')

// Error Func
const showError = (input, message) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const smallEl = formControl.querySelector('small')
  smallEl.innerText = message
}

// Success Func
const showSuccess = (input) => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// Check email is valid
const isValidEmail = (input) => {
  const validEmail = String(input.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  if (validEmail) {
    showSuccess(input)
  } else {
    showError(input, `Email is not valid`)
  }
}

// Capital letter
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Empty validation
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}
// Length validation
const checkLength = (input, minLenth, maxLength) => {
  if (input.value.length < minLenth) {
    showError(input, `${getFieldName(input)} must be at least ${minLenth} characters`)
  } else if (input.value.length > maxLength) {
    showError(input, `${getFieldName(input)} must be less than ${maxLength} characters`)
  } else {
    showSuccess(input)
  }
}
// Check password match
const onPasswordMatch = (password, passwordCheck) => {
  if (password.value !== passwordCheck.value || passwordCheck.value === '') {
    showError(passwordCheck, 'Password do not match')
  } else {
    showSuccess(passwordCheck)
  }
}

// Event Listener
formEl.addEventListener('submit', (e) => {
  e.preventDefault()

  checkRequired([usernameInputEl, emailInputEl, passwordInputEl, passwordCheckInputEl])
  checkLength(usernameInputEl, 3, 15)
  checkLength(passwordInputEl, 6, 25)
  isValidEmail(emailInputEl)
  onPasswordMatch(passwordInputEl, passwordCheckInputEl)
})

// submit
// formEl.addEventListener('submit', (e) => {
//   e.preventDefault()
//   // username
//   if (usernameInputEl.value === '') {
//     showError(usernameInputEl, 'username is required')
//   } else {
//     showSuccess(usernameInputEl)
//   }
//   // email
//   if (emailInputEl.value === '') {
//     showError(emailInputEl, 'email is required')
//   } else if (!isValidEmail(emailInputEl.value)) {
//     showError(emailInputEl, 'email is not valid')
//   } else {
//     showSuccess(emailInputEl)
//   }
//   // password
//   if (passwordInputEl.value === '') {
//     showError(passwordInputEl, 'password is required')
//   } else {
//     showSuccess(passwordInputEl)
//   }
//   // password check
//   if (passwordCheckInputEl.value === '') {
//     showError(passwordCheckInputEl, 'password check is required')
//   } else {
//     showSuccess(passwordCheckInputEl)
//   }
// })
