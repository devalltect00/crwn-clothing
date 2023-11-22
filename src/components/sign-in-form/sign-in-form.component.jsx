import { useState } from 'react';

import FormInput from '../form-input/form-input.component'
import Button from '../button/Button.component'

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'

const defaultFormFields = {
  'email': '',
  'password': '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }


  const submitHandler = () => {
    
  }

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name] : value});
  }

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={changeHandler}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={changeHandler}
          name='password'
          value={password}
        />
        <Button>sign in</Button>
        <Button onClick={logGoogleUser} buttonType={'google'}>sign in with google</Button>
      </form>
    </div>
  )
}

export default SignInForm;