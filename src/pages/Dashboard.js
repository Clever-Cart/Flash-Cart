import React from 'react';
import { connect } from 'react-redux';

import Database from '../services/database';
import '../assets/dashboard.css'

const Dashboard = ({ history, logout, userId }) => {
  const handleClick = async() => {
    const user = Database.get('Users', userId);
    try {
      await user.set({ cartId: false });
    } catch (e) {
      // Do nothing
    }
    history.push("/");
    logout();
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button className="secondary-button" onClick={handleClick}>
        Sair
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
	userId: state.app.userId
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOGOUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
