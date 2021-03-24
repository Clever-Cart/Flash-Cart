import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import Box from '@material-ui/core/Box';

import Database from '../../services/database';

import '../../assets/components.css';

const Form = ({ cartId }) => {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (key, value) =>
    setData(oldData => ({ ...oldData, [key]: value }))

  const handleSignIn = async() => {
    try {
      const { user } = await firebase.auth()
        .signInWithEmailAndPassword(data.email, data.password);

      await Database.get('Carts', cartId)
        .set({ userId: user.uid });

      await firebase.auth().signOut();
    } catch (e) {
      // Do nothing
    }
  }

  return (
    <Box display='flex' flexDirection='column'>
      <input
        className="input-field"
        placeholder='Email do usuário'
        onChange={event => handleChange('email', event.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder='Senha'
        onChange={event => handleChange('password', event.target.value)}
      />
      <button
        className="main-button"
        onClick={handleSignIn}
      >
        LOGIN
      </button>
    </Box>
  )
}

export default Form;
