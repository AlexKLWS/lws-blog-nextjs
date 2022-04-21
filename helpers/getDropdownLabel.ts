import routes from 'consts/routes'

export const getDropdownLabel = (route: string) => {
  switch (route) {
    case routes.secret.life:
    case routes.life:
      return '> Life'
    case routes.secret.code:
    case routes.code:
      return '> Code'
    case routes.secret.guides:
    case routes.guides:
      return '> Guides'
    case routes.secret.projects:
    case routes.projects:
      return '> Projects'
    case routes.secret.games:
    case routes.games:
      return '> Games'
    default:
      return '> Topic'
  }
}
