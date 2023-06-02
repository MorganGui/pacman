import Entity from './Entity.js'
import skins from '../asset/data/Skins.js'
import settings from '../asset/data/Settings.js'

let nextDirection = null

export default class Player extends Entity {
  constructor(map) {
    let rdm = Math.floor(Math.random() * map.playerSpawnPoints.length)
    let x = map.playerSpawnPoints[rdm].x
    let y = map.playerSpawnPoints[rdm].y

    super(map, x, y, null, Entity.stringToHtml(skins.pacman))

    // add player in the DOM, move it on a spawn point and remove the point
    this.container.appendChild(this.el)
    this.move(true)
    this.map.parts[y][x].classList.remove('point')

    // rotate pacman when he is spawning
    if (!this.checkIfCanMove(x+1, y)) {
      if (this.checkIfCanMove(x, y-1)) {
        this.el.style.transform = 'rotate(-90deg)'
      } else if (this.checkIfCanMove(x, y+1)) {
        this.el.style.transform = 'rotate(90deg)'
      } else if (this.checkIfCanMove(x-1, y)) {
        this.el.style.transform = 'rotate(180deg)'
      }
    }
  }

  /**
   * prepare for changing the direction when the player can
   * @param {string} key keyboard key
   */
  static changeNextDirection(key) {
    switch (key) {
      case settings.up:
        nextDirection = 'up'
        break
      case settings.right:
        nextDirection = 'right'
        break
      case settings.down:
        nextDirection = 'down'
        break
      case settings.left:
        nextDirection = 'left'
        break
    }
  }

  /**
   * update the direction if it is available and change the coo
   */
  updateCoordinates() {
    if (nextDirection) {
      this.el.classList.add('is-moving')
  
      if (
        (nextDirection === 'up' && this.checkIfCanMove(this.x, this.y-1)) ||
        (nextDirection === 'right' && this.checkIfCanMove(this.x+1, this.y)) ||
        (nextDirection === 'down' && this.checkIfCanMove(this.x, this.y+1)) ||
        (nextDirection === 'left' && this.checkIfCanMove(this.x-1, this.y))
      ) {
        this.direction = nextDirection
        nextDirection = null
      }
  
    }
  
    if (this.direction) {
  
      if (this.direction === 'up' && this.checkIfCanMove(this.x, this.y-1)) {
        this.y--
      } else if (this.direction === 'right' && this.checkIfCanMove(this.x+1, this.y)) {
        this.x++
      } else if (this.direction === 'down' && this.checkIfCanMove(this.x, this.y+1)) {
        this.y++
      } else if (this.direction === 'left' && this.checkIfCanMove(this.x-1, this.y)) {
        this.x--
      }
  
    }
  }

  /**
   * remove the point of the map and add score
   */
  collectPoint(speed, score, setScore) {
    if (this.map.parts[this.y][this.x].classList.contains('point')) {
      setScore(score+1)
      setTimeout(() => {
        this.map.parts[this.y][this.x].classList.remove('point')
      }, speed-25)
    }
  }
}