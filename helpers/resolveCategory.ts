import { Category } from 'types/materials'

export const resolveCategoryFromPathname = (resolvedUrl: string) => {
  let regexArray = resolvedUrl.match(/\/(.*?)\?/)
  if (!regexArray) {
    regexArray = resolvedUrl.match(/\/(.*)/)
  }
  let matchedCategoryFromPath = 'misc'
  if (regexArray) {
    const splitPath = regexArray[1].split('/')
    matchedCategoryFromPath = splitPath[splitPath.length - 1]
  }
  switch (matchedCategoryFromPath) {
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
