
export const updateToastSize = size => {
  return {
    type: 'UPDATE_TOAST_SIZE',
    size
  }
}

export const updateToastOverhang = overhang => {
  return {
    type: 'UPDATE_TOAST_OVERHANG',
    overhang
  }
}

export const updateTableHeight = height => {
  return {
    type: 'UPDATE_TABLE_HEIGHT',
    height
  }
}

export const updateToastShown = shown => {
  return {
    type: 'UPDATE_TOAST_SHOWN',
    shown
  }
}
