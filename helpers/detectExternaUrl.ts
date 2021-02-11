export const detectExternaUrl = (url?: string) => {
  const urlStartsWithHttp = url && url.startsWith('http://')
  const urlStartsWithHttps = url && url.startsWith('https://')
  return urlStartsWithHttp || urlStartsWithHttps
}
