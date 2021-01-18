import { GuideLocationInfo, LocationCoords } from './guide'

export type Article = {
  articleText: string
} & Material

export type ExtMaterial = {
  url: string
} & Material

export type Guide = {
  locations: GuideLocationInfo[]
  info: string
  defaultZoom: number
  defaultCenter: LocationCoords
  isGuideMaterial: true
} & Material

export type PreviewMaterial = {
  createdAt: string
  url?: string
  isGuideMaterial?: boolean
} & Material

export type Material = {
  referenceId?: string
  createdAt?: string
  name: string
  subtitle: string
  icon: Icon
  categories: Category[]
  hidden: boolean
}

export type Icon = {
  data: string
  height: string | null
  width: string | null
}

export enum Category {
  Misc,
  Life,
  Code,
  Guides,
  Projects,
}
