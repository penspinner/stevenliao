const disableTransitionsTemporarily = () => {
  document.documentElement.classList.add('[&_*]:!transition-none')
  window.setTimeout(() => {
    document.documentElement.classList.remove('[&_*]:!transition-none')
  }, 0)
}

export const toggleColorScheme = () => {
  disableTransitionsTemporarily()

  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const isSystemDarkMode = darkModeMediaQuery.matches
  const isDarkMode = document.documentElement.classList.toggle('dark')

  if (isDarkMode === isSystemDarkMode) {
    delete window.localStorage.isDarkMode
  } else {
    window.localStorage.isDarkMode = isDarkMode
  }
}
