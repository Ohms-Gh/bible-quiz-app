export function getInitialTheme(){
  if(typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('bqa_theme')
  if(stored) return stored
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
export function setTheme(t){
  document.documentElement.classList.toggle('dark', t === 'dark')
  localStorage.setItem('bqa_theme', t)
}
