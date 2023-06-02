const route = event => {
  event = event || window.event
  event.preventDefault()
  window.history.pushState({}, '', event.target.href)
  handleLocation()
}

const handleLocation = async () => {
  const path = window.location.pathname
  const route = routes[path] || routes[404]
  const html = await fetch(`${route.path}`).then(data => data.text())
  document.querySelector('[data-app]').innerHTML = html
  document.querySelector('[data-css]').href = `${route.path}/style.css`
  document.querySelector('[data-js]').src = `${route.path}/script.js`
}

const routes = {
  '/': {
    name: 'Home',
    path: '/views/home'
  },
  '/maker': {
    name: 'Maker',
    path: '/views/maker'
  },
  404: {
    name: '404',
    path: '/views/home'
  }
}

window.onpopstate = handleLocation
window.route = route

handleLocation()
