export function setCookie(name: string, value: string, expirationTimeInSeconds: number) {
  var date = new Date()
  date.setTime(expirationTimeInSeconds * 1000)
  const expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + value + expires + '; path=/'
}

export function getCookie(cookieName: string) {
  var name = cookieName + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function deleteAllCookies() {
  var cookies = document.cookie.split(';')

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    var eqPos = cookie.indexOf('=')
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}
