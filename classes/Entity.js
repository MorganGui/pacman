const partSize = 30  /* /!\ value in CSS */

export default class Entity {
  constructor(map, x, y, direction, el) {
    this.map = map
    this.x = x
    this.y = y
    this.direction = direction
    this.el = el
    this.container = document.querySelector('[data-entities]')
  }

  /**
   * move in the DOM
   * @param {boolean} rotate tell if the entity need to be rotate
   */
  move(rotate) {
    if (rotate) {
      switch (this.direction) {
        case 'up':
          this.el.style.transform = 'rotate(-90deg)'
          break
        case 'right':
          this.el.style.transform = 'rotate(0deg)'
          break
        case 'down':
          this.el.style.transform = 'rotate(90deg)'
          break
        case 'left':
          this.el.style.transform = 'rotateY(180deg)'
          break
      }
    }
    this.el.style.top = this.y * partSize + 'px'
    this.el.style.left = this.x * partSize + 'px'
  }

  /**
   * remove from the DOM
   */
  remove() {
    this.el.remove()
  }
  /**
   * remove an array of Entity from the DOM
   */
  static removeAll(array) {
    for (const item of array) {
      item.el.remove()
    }
    array.splice(0, array.length)
  }

  /**
   * convert a string to an HTMLDivElement
   * @param {string} string 
   * @returns {HTMLDivElement}
   */
  static stringToHtml(string) {
    const dom = document.createElement('div')
    dom.innerHTML = string
    return dom.children[0]
  }
  
  /**
   * check if the coordinate is in the map and if isn't a wall
   * @param {number} x horizontal
   * @param {number} y vertical
   * @returns {boolean} false if coordinate isn't in the map or is a wall
   */
  checkIfCanMove(x, y) {
    return (this.map.land[y] && ![0, undefined].includes(this.map.land[y][x]))
  }
}