import { Category } from 'types/materials'

export const resolveCategoryFromPathname = (resolvedUrl: string) => {
  let result = resolvedUrl.match(/(?<=\/)(.*?)(?=\?)/)
  if (!result) {
    result = resolvedUrl.match(/(?<=\/)(.*)/)
  }
  const path = (result && result[0]) || 'misc'
  switch (path) {
    case 'code':
      return Category.Code
    case 'life':
      return Category.Life
    case 'projects':
      return Category.Projects
    case 'guides':
      return Category.Guides
    default:
      return Category.Misc
  }
}

export const getCategoryPathname = (category: Category) => {
  switch (category) {
    case Category.Code:
      return 'code'
    case Category.Life:
      return 'life'
    case Category.Projects:
      return 'projects'
    case Category.Guides:
      return 'guides'
    case Category.Misc:
      return 'misc'
    default:
      return ''
  }
}
