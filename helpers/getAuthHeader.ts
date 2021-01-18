export const getAuthHeader = (authToken: string) => {
  if (authToken) {
    return { Authorization: `Bearer ${authToken}` }
  }
  return {}
}
