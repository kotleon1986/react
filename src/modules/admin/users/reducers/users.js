import AdminUsersActionTypes from "./../types/users";

const initialState = {
  currentUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AdminUsersActionTypes.SET_ADMIN_USER_CURRENT:
      return {
        ...state,
        currentUser: action.payload
      };

    case AdminUsersActionTypes.CLEAR_ADMIN_USER:
      return {
        ...state,
        currentUser: null
      };

    default:
      return state;
  }
}
