import maps from '../asset/data/Maps.js'
import { changeMap } from '../views/home/script.js'

const refs = {
  menu: document.querySelector('[data-map-selector]')
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('[data-map-selector-button]')
  .addEventListener('click', () => {
    refs.menu.setAttribute('open', 'true')
  })
  refs.menu.addEventListener('click', () => {
    refs.menu.setAttribute('open', 'false')
  })

  const updateMenu = (new_item) => {
    document.querySelectorAll('.menu .selected').forEach(item => {
      item.classList.remove('selected')
    })
    new_item.classList.add('selected')
  }

  let firstTime = true
  for (const map of maps) {
    const new_item = document.createElement('li')
    new_item.innerHTML = map.name
    if (firstTime) {
      new_item.classList.add('selected')
      firstTime = false
    }
    new_item.addEventListener('click', () => {
      updateMenu(new_item)
      changeMap(map.id)
    })
    refs.menu.children[1].appendChild(new_item)
  }
})