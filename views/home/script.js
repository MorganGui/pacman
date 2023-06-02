import Map from '../../classes/Map.js'
import Player from '../../classes/Player.js'
import Ghost from '../../classes/Ghost.js'

import settings from '../../asset/data/Settings.js'
import maps from '../../asset/data/Maps.js'

// data
const refs = {
  main: document.querySelector('main'),
  score: document.querySelector('[data-score]'),

  settingsModal: document.querySelector('[data-settings-modal]'),
  modal: document.querySelector('[data-modal]'),
  modalMessage: document.querySelector('[data-modal-message]')
}
let mapSelected = maps[0].id
let speed

let map
let player
let ghosts = []
let score = 0

let gameInterval
let gameIsRunning = false
let gameIsInPause = false
let gameIsOver = false



// methods
const initGame = () => {
  gameIsOver = false
  clearInterval(gameInterval)

  // map
  if (map) map.remove()
  map = new Map(mapSelected, document.querySelector('[data-map]'))
  setScore(0)

  // player
  if (player) player.remove()
  player = new Player(map)

  // ghosts
  Ghost.removeAll(ghosts)
  const nbGhost = map.ghostSpawnPoints.length
  for (let i=0; i<nbGhost; i++) {
    ghosts.push(new Ghost(map))
  }
}
const startGame = () => {
  gameIsRunning = true

  clearInterval(gameInterval)
  gameInterval = setInterval(gameLoop, speed)
  player.el.classList.add('is-moving')
}
const gameLoop = () => {
  const oldPlayer = { x: player.x, y: player.y }
  player.updateCoordinates()
  player.move(true)
  player.collectPoint(speed, score, setScore, endGame)

  for (const ghost of ghosts) {
    const oldGhost = { x: ghost.x, y: ghost.y }
    ghost.updateCoordinate(map)
    ghost.kill(player, endGame, oldGhost, oldPlayer)
    ghost.move()
  }
}
const endGame = (victory) => {
  gameIsRunning = false
  gameIsOver = true
  clearInterval(gameInterval)
  player.el.classList.remove('is-moving')
  
  if (victory) {
    refs.modalMessage.innerHTML = 'Victory !'
    refs.modal.close()
    refs.modal.showModal()
  } else {
    setTimeout(() => {
      refs.modalMessage.innerHTML = 'Game over...'
      refs.modal.close()
      refs.modal.showModal()
    }, speed)
  }
}

const playGame = () => {
  if (gameIsInPause && gameIsRunning) {
    gameIsInPause = false
    gameInterval = setInterval(gameLoop, speed)
    player.el.classList.add('is-moving')
  }
}
const pauseGame = () => {
  if (!gameIsInPause && gameIsRunning) {
    gameIsInPause = true
    clearInterval(gameInterval)
    player.el.classList.remove('is-moving')
  }
}


/**
 * update the value and the DOM
 * @param {number} newVal 
 */
const setScore = (newVal) => {
  score = newVal
  refs.score.innerHTML = `score : ${newVal} / ${map.goal}`

  if (newVal !== 0 && newVal === map.goal) {
    endGame(true)
  }
}

/**
 * change the speed of the game
 * @param {string} newVal new difficulty
 */
const changeSpeed = newVal => {
  speed = newVal
  refs.main.style.setProperty('--speed', newVal + 'ms')
}
/**
 * change the map of the game
 * @param {string} newVal id of the new map
 */
const changeMap = newVal => {
  mapSelected = newVal
  initGame()
}



// mounted
document.addEventListener('DOMContentLoaded', () => {

  // keyboard
  document.addEventListener('keydown', e => {
    // Controls
    if (Object.values(settings).includes(e.key)) {
      if (!gameIsRunning && !gameIsOver) {
        startGame()
        Player.changeNextDirection(e.key)
      } else if (gameIsRunning && !gameIsInPause) {
        Player.changeNextDirection(e.key)
      }
    }
    
    // Escape
    else if (e.key === 'Escape') {
      if (refs.modal.open) {
        initGame()
      } else {
        e.preventDefault()
        gameIsInPause ? playGame() : pauseGame()
        if (refs.settingsModal.open) {
          refs.settingsModal.close()
        } else {
          refs.settingsModal.showModal()
        }
      }
    }
  })

  // restart button
  document.querySelector('[data-game-restart]')
  .addEventListener('click', () => {
    initGame()
  })

  // modal
  document.querySelector('[data-modal-close]')
  .addEventListener('click', () => {
    refs.modal.close()
    initGame()
  })

  // settings modal
  document.querySelector('[data-settings-open]')
  .addEventListener('click', () => {
    pauseGame()
  })
  document.querySelector('[data-settings-close]')
  .addEventListener('click', () => {
    playGame()
  })

  // auto start
  initGame()

})

export { changeSpeed, changeMap }
