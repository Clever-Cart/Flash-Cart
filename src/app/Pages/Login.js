import React from 'react';
import QRCode from 'react-qr-code';

const Login = ({ cartId }) => cartId ? <QRCode value={cartId} /> : null;

export default Login;
