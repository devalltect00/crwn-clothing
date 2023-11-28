import { useState } from 'react';

import FormInput from '../form-input/form-input.component'
import Button from '../button/Button.component'

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response)
      resetFormFields();
    }catch(error){
      switch(error.code){
        case 'auth/wrong-pasword':
          alert('incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        case 'auth/invalid-login-credentials':
          alert('invalid login credentials')
          break;
        default:
          console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name] : value});
  }

  const signInWithGoogle = async () => {
    try {
      const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user'){
        console.log('Google sign-in popup closed by user');
      } else {
        console.error('Error signing in with Google:', error.message);
      }
    }
    
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>sign in</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;