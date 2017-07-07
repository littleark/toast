
export const updateToastSize = size => {
  return {
    type: 'UPDATE_TOAST_SIZE',
    size
  }
}

export const updateToastHangout = hangout => {
  return {
    type: 'UPDATE_TOAST_HANGOUT',
    hangout
  }
}

export const updateTableHeight = height => {
  return {
    type: 'UPDATE_TABLE_HEIGHT',
    height
  }
}
