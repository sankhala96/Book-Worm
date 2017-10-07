import React from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../actions/auth'

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
      <h1>Home Page</h1>
      { isAuthenticated ? <button onClick={() => logout()}>Logout</button> :
          <div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> </div> }
  </div>
);

HomePage.propTypes = {
    isAuthenticated: propTypes.bool.isRequired,
    logout: propTypes.func.isRequired
};

function mapStateToProps(state) {
    return{
        isAuthenticated: !!state.user.token
    };
}

export default connect(mapStateToProps, {logout: actions.logout})(HomePage);