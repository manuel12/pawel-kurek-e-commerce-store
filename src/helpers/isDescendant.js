const isDescendant = (el, parentClassName) => {
    let isChild = false

    if (el.className === parentClassName) {
      isChild = true
    }
  
    while (el = el.parentNode) {
      if (el.className === parentClassName) {
        isChild = true
      }
    }
    
    return isChild
  }

export default isDescendant;