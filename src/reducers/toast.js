import { calculateStatuses } from "../lib/data";

const toast = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        statuses: action.statuses,
        ...action.data
      };
    case "UPDATE_TOAST_SIZE": {
      const toastWithNewSize = {
        ...state.toast,
        a: action.size
      };
      return {
        ...state,
        toast: toastWithNewSize,
        statuses: calculateStatuses({ toast: toastWithNewSize, table: state.table })
      };
    }
    case "UPDATE_TOAST_OVERHANG": {
      const toastWithNewOverhang = {
        ...state.toast,
        r: action.overhang
      };
      return {
        ...state,
        toast: toastWithNewOverhang,
        statuses: calculateStatuses({ toast: toastWithNewOverhang, table: state.table })
      };
    }
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
