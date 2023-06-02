import Entity from './Entity.js'
import skins from '../asset/data/Skins.js'

const opposedDirection = {
  up: 'down',
  right: 'left',
  down: 'up',
  left: 'right'
}

export default class Ghost extends Entity {
  constructor(map) {
    let rdm = Math.floor(Math.random() * map.ghostSpawnPoints.length)
    let x = map.ghostSpawnPoints[rdm].x
    let y = map.ghostSpawnPoints[rdm].y
    map.ghostSpawnPoints.splice(rdm, 1)

    super(map, x, y, null, Entity.stringToHtml(skins.ghost))
    this.color = `hsl(${Math.floor(Math.random() * 360)} 50% 50%)`
    
    this.el.style.fill = this.color
    this.container.appendChild(this.el)
    this.move()
  }

  updateCoordinate() {
    const directions = {
      up: this.checkIfCanMove(this.x, this.y-1),
      right: this.checkIfCanMove(this.x+1, this.y),
      down: this.checkIfCanMove(this.x, this.y+1),
      left: this.checkIfCanMove(this.x-1, this.y)
    }
    
    if (this.direction) {
      if (this.direction === 'up' && (directions.right || directions.down || directions.left)) {
        delete directions.down
      } else if (this.direction === 'right' && (directions.up || directions.down || directions.left)) {
        delete directions.left
      } else if (this.direction === 'down' && (directions.up || directions.right || directions.down || directions.left)) {
        delete directions.up
      } else if (this.direction === 'left' && (directions.up || directions.right || directions.down || directions.left)) {
        delete directions.right
      }
    }

    const available = []
    for (const index in directions) {
      if (directions[index]) {
        available.push(index)
      }
    }
    const rdm = Math.floor(Math.random() * available.length)
    
    this.direction = available[rdm]

    if (this.direction === 'up') {
      this.y--
    } else if (this.direction === 'right') {
      this.x++
    } else if (this.direction === 'down') {
      this.y++
    } else if (this.direction === 'left') {
      this.x--
    }
  }

  kill(player, endGame, oldThis, oldPlayer) {
    if (this.x === player.x && this.y === player.y) {
      endGame()
    } else if (
      this.direction === opposedDirection[player.direction] && (
        (oldThis.x === player.x && oldThis.y === player.y) ||
        (this.x === oldPlayer.x && this.y === oldPlayer.y)
      )
    ) {
      endGame()
    }
  }
}