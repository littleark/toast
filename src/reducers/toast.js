import { calculateStatuses } from "../lib/data";

const toast = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        statuses: action.statuses,
        ...action.data
      };
    case "UPDATE_TOAST_SIZE":
      return {
        ...state,
        toast: {
          ...state.toast,
          a: action.size
        },
        statuses: calculateStatuses({ toast: state.toast, table: table })
      };
    case "UPDATE_TOAST_OVERHANG":
      return {
        ...state,
        toast: {
          ...state.toast,
          r: action.overhang
        },
        statuses: calculateStatuses({ toast: state.toast, table: table })
      };
    case "UPDATE_TABLE_HEIGHT":
      // console.log('---->', action, state)
      let table = Object.assign({}, state.table, { y: action.height });
      console.log("new table", table);
      return Object.assign({}, state, {
        table: table,
        statuses: calculateStatuses({ toast: state.toast, table: table })
      });
    case "UPDATE_TOAST_SHOWN":
      return {
        ...state,
        toast: {
          ...state.toast,
          shown: action.shown
        }
      };
    default:
      return state;
  }
};

export default toast;
