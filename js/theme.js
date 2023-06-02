const body = document.querySelector('body')
const icons = {
  light: document.querySelector('[data-theme="light"]'),
  dark: document.querySelector('[data-theme="dark"]')
}

/**
 * changes the theme to the one given in parameter
 * @param {string} newTheme name of the new theme
 */
const updateTheme = newTheme => {
  body.className = ''
  body.classList.add(icons[newTheme].dataset.theme)

  localStorage.setItem('theme', newTheme)

  icons[newTheme].classList.add('hidden')
  if (newTheme === 'light') {
    icons['dark'].classList.remove('hidden')
  } else {
    icons['light'].classList.remove('hidden')
  }
}

for (const name in icons) {
  icons[name].addEventListener('click', () => updateTheme(name))
}

// check browser theme (localStorage or prefers-color-scheme)
const lastTheme = localStorage.getItem('theme')
if (lastTheme === null || icons[lastTheme] === undefined) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    updateTheme('dark')
  } else {
    updateTheme('light')
  }
} else {
  updateTheme(lastTheme)
}
