import {calculateStatuses} from '../lib/data'

const toast = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        statuses: action.statuses,
        ...action.data
      }
    case 'UPDATE_TOAST_SIZE':
      console.log("---->",action,state)

      let toast = Object.assign({},state.toast,{a: action.size})

      return Object.assign({}, state, {
        toast: toast
      })
      //return state
      // return [
      //   ...state,
      //   {
      //     id: action.id,
      //     text: action.text,
      //     completed: false
      //   }
      // ]
    case 'UPDATE_TOAST_HANGOUT':
      return state
    case 'UPDATE_TABLE_HEIGHT':
      console.log("---->",action,state)
      let old_y = state.table.y
      let table = Object.assign({},state.table,{y: action.height})
      console.log("new table",table)
      return Object.assign({}, state, {
        table: table,
        statuses: calculateStatuses({toast:state.toast,table:table})
      })
    default:
      return state
  }
}

export default toast
