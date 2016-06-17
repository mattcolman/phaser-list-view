
export function parseBounds( bounds ) {
  bounds.x = (bounds.x) ? bounds.x : 0
  bounds.y = (bounds.y) ? bounds.y : 0
  if (bounds.width <= 0) {
    console.warn('PhaserListView: bounds.width <= 0')
  } else if (bounds.height <= 0) {
    console.warn('PhaserListView: bounds.height <= 0')
  }
  return bounds
}

// prefer nominalWidth and nominalHeight
export function getWidthOrHeight( displayObject, widthOrHeight ) {
  return displayObject[`nominal${capitalizeFirstLetter(widthOrHeight)}`] || displayObject[widthOrHeight]
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

