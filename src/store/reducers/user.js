import * as actionTypes from '../action-types'

const intialState = {
  username: '',
  password: ''
}

function counter1 (state = intialState, action) {
  switch (action.type) {
    case actionTypes.SET_NAME:
      const { username, password } = action.loginInfo;
      console.log(action, '111111111111');
      return { ...state, username, password }
    case actionTypes.CLEAR_INFO:
      console.log(action, '2222');
      return { ...state, username: '', password: '' }
    default:
      return state;
  }
}

export default counter1;