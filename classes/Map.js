import maps from '../asset/data/Maps.js'

class Map {
  constructor(id, container) {
    this.container = container
    this.land = maps.find(m=>m.id===id).land
    this.build()
  }

  /**
   * generate the map in the container and return an array of each map of the map
   * @param {HTMLElement} container 
   * @returns {HTMLElement[]} all part of the map
   */
  build() {
    this.container.style.gridTemplateColumns = `repeat(${this.land[0].length}, 1fr)`
    this.parts = []
    this.playerSpawnPoints = []
    this.ghostSpawnPoints = []
    this.goal = -1

    this.land.forEach((line, y) => {
      let HtmlList = []

      line.forEach((part, x) => {
        const new_part = document.createElement('div')

        if ([1, 2].includes(part)) {
          this.goal++
          if (!new_part.classList.contains('spawn')) {
            new_part.classList.add('point')
          }
        }

        if (part === 2) {
          this.playerSpawnPoints.push({x: x, y: y})
        } else if (part === 3) {
          this.ghostSpawnPoints.push({x: x, y: y})
        }

        this.defineWall(new_part, x, y)
        this.container.appendChild(new_part)
        new_part.animate(
          [
            { opacity: 0 },
            { opacity: 1 }
          ],
          {
            duration: 500,
            delay: Math.floor(Math.random() * 1000),
            fill: 'forwards'
          }
        )

        HtmlList.push(new_part)
      })
      this.parts.push(HtmlList)
    })
  }
  
  /**
   * use to place walls on an element
   * @param {HTMLElement} el element that may or may not receive walls 
   * @param {number} x index of the element
   * @param {number} y index of the array where the element is in
   */
  defineWall(el, x, y) {
    if (this.land[y][x] === 0) {
      if (this.land[y-1] === undefined || this.land[y-1][x] !== 0) {
        el.classList.add('top')
      }
      if (this.land[y][x+1] === undefined || this.land[y][x+1] !== 0) {
        el.classList.add('right')
      }
      if (this.land[y+1] === undefined || this.land[y+1][x] !== 0) {
        el.classList.add('bottom')
      }
      if (this.land[y][x-1] === undefined || this.land[y][x-1] !== 0) {
        el.classList.add('left')
      }
    } else {
      if (this.land[y-1] === undefined) {
        el.classList.add('top')
      }
      if (this.land[y][x+1] === undefined) {
        el.classList.add('right')
      }
      if (this.land[y+1] === undefined) {
        el.classList.add('bottom')
      }
      if (this.land[y][x-1] === undefined) {
        el.classList.add('left')
      }
    }
    /**border radius */
    if (y === 0 && x === 0) {
      el.style.borderTopLeftRadius = '1em'
    } else if (y === 0 && x === this.land[0].length-1) {
      el.style.borderTopRightRadius = '1em'
    } else if (y === this.land.length-1 && x === 0) {
      el.style.borderBottomLeftRadius = '1em'
    } else if (y === this.land.length-1 && x === this.land[0].length-1) {
      el.style.borderBottomRightRadius = '1em'
    }
  }

  /**
   * delete the map from the DOM
   */
  remove() {
    for (const line of this.parts) {
      for (const part of line) {
        part.remove()
      }
    }
  }
}

export default Map