import AdminUsersActionTypes from "./../types/users";
import InitTableState from "../../../../constants/init-table-state";

const initialState = { ...InitTableState };

export default function(state = initialState, action) {
  switch (action.type) {
    case AdminUsersActionTypes.SET_ADMIN_USERS_DATA:
      return {
        ...state,
        data: action.payload.items,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        loaded: true
      };

    case AdminUsersActionTypes.SET_ADMIN_USERS_PARAMS:
      return {
        ...state,
        params: { ...state.params, ...action.payload },
        loaded: false
      };

    default:
      return state;
  }
}
