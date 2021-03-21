import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Database from '../../services/database';

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
      <TextField
        label='Email'
        variant='outlined'
        onChange={event => handleChange('email', event.target.value)}
      />
      <TextField
        label='Senha'
        variant='outlined'
        onChange={event => handleChange('password', event.target.value)}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleSignIn}
      >
        Entrar
      </Button>
    </Box>
  )
}

export default Form;
