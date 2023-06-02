import settings from '../asset/data/Settings.js'
import { changeSpeed } from './pacman.js'


document.addEventListener('DOMContentLoaded', () => {

// data
  const refs = {
    modal: document.querySelector('[data-settings-modal]'),
    controls: {
      up: document.querySelector('[data-settings-up]'),
      left: document.querySelector('[data-settings-left]'),
      right: document.querySelector('[data-settings-right]'),
      down: document.querySelector('[data-settings-down]')
    },
    difficulty: {
      easy: document.querySelector('[data-settings-easy]'),
      normal: document.querySelector('[data-settings-normal]'),
      hard: document.querySelector('[data-settings-hard]'),
      extreme: document.querySelector('[data-settings-extreme]')
    }
  }
  let settingSelected = null
//
  
  
// methods
  const unselect = () => {
    for (const key in refs.controls) {
      refs.controls[key].classList.remove('selected')
    }
  }
  const waitForChangeControl = direction => {
    setTimeout(() => {
      settingSelected = direction
      refs.controls[direction].classList.add('selected')
    })
  }
  const changeControl = (new_control) => {
    refs.controls[settingSelected].children[1].innerHTML = new_control
    settings[settingSelected] = new_control
    unselect()
    settingSelected = null
  }

  const changeDifficulty = (newVal) => {
    for (const key in refs.difficulty) {
      refs.difficulty[key].classList.remove('selected')
    }
    refs.difficulty[newVal].classList.add('selected')
    switch (newVal) {
      case 'easy':
        changeSpeed(350)
        break
      case 'normal':
        changeSpeed(250)
        break
      case 'hard':
        changeSpeed(150)
        break
      case 'extreme':
        changeSpeed(50)
        break
    }
  }
//


// events
  // modal
  document.querySelector('[data-settings-open]')
  .addEventListener('click', () => {
    refs.modal.showModal()
  })
  document.querySelector('[data-settings-close]')
  .addEventListener('click', () => {
    refs.modal.close()
  })
  refs.modal.addEventListener('click', e => {
    unselect()
    console.log(e)
  })
  // controls
  refs.controls.up.addEventListener('click', () => {
    waitForChangeControl('up')
  })
  refs.controls.right.addEventListener('click', () => {
    waitForChangeControl('right')
  })
  refs.controls.down.addEventListener('click', () => {
    waitForChangeControl('down')
  })
  refs.controls.left.addEventListener('click', () => {
    waitForChangeControl('left')
  })
  // difficulty
  refs.difficulty.easy.addEventListener('click', () => {
    changeDifficulty('easy')
  })
  refs.difficulty.normal.addEventListener('click', () => {
    changeDifficulty('normal')
  })
  refs.difficulty.hard.addEventListener('click', () => {
    changeDifficulty('hard')
  })
  refs.difficulty.extreme.addEventListener('click', () => {
    changeDifficulty('extreme')
  })
  // keyboard
  document.addEventListener('keydown', e => {
    if (refs.modal.open && settingSelected && e.key !== 'Escape') {
      changeControl(e.key)
    }
  })
//


// mounted
  for (const key in refs.controls) {
    refs.controls[key].children[1].innerHTML = settings[key]
  }
  changeDifficulty('normal')
//

})
