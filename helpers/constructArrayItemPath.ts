export const constructArrayItemValuePath = (pathToArray: string, pathToItemValue: string, index: number) => {
  return `${pathToArray}[${index}]${pathToItemValue}`
}

export const constructArrayItemPath = (pathToArray: string, index: number) => {
  return `${pathToArray}[${index}]`
}
