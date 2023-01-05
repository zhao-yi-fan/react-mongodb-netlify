import * as actionTypes from '../action-types';

let actions = {
  setUserName (loginInfo = {}) {
    return {
      type: actionTypes.SET_NAME,
      loginInfo
    }
  },
  clearUserInfo () {
    return {
      type: actionTypes.CLEAR_INFO,
    }
  },
}

export default actions;
