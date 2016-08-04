import Config from './config'

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

export function findChild(children, predicate, scope = null) {
  if (!children) return false;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!child) continue
    if (predicate.call(scope, child)) {
      return child;
    }
    const found = findChild(child.children, predicate, scope);
    if (found) {
      return found;
    }
  }
  return false;
};

export function detectDrag(pointer) {
  const distanceX = Math.abs(pointer.positionDown.x - pointer.positionUp.x)
  const distanceY = Math.abs(pointer.positionDown.y - pointer.positionUp.y)
  const time = pointer.timeUp - pointer.timeDown;
  return (distanceX > Config.AUTO_DETECT_THRESHOLD || distanceY > Config.AUTO_DETECT_THRESHOLD);
};

export function dispatchClicks(pointer, clickables, type) {
  if (type == 'onInputUp' && detectDrag(pointer)) return;
  // SEARCH OBJECT UNDER POINT AS THERE IS NO CLICK PROPAGATION SUPPORT IN PHASER
  const found = findChild(clickables, (clickable) => {
    const pt = clickable.worldPosition
    const {anchor, pivot, width, height, scale} = clickable
    const x = pt.x - ((anchor) ? anchor.x * width : 0) - pivot.x * scale.x
    const y = pt.y - ((anchor) ? anchor.y * height : 0) - pivot.y * scale.y
    // console.log('does ', x, y, clickable.width, clickable.height, ' intersect ', pointer.x, pointer.y)
    return (clickable.inputEnabled && new Phaser.Rectangle(x, y, clickable.width, clickable.height).contains(pointer.x, pointer.y));
  });
  if (found && found.events && found.events[type] && found.events[type].dispatch) {
    found.events[type].dispatch(found, pointer, true);
  }
  return found
}

