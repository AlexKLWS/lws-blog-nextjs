import { MaterialDataObjectVerifier, VerifiedPropertyType } from 'types/verifier'
import { materialErrors, articleEditorErrors, extMaterialEditorErrors, guideEditorErrors } from './errors'

export const ARTICLE_DATA_VERIFIER: MaterialDataObjectVerifier = {
  name: { error: materialErrors.noName, type: VerifiedPropertyType.PRIMITIVE },
  subtitle: { error: materialErrors.noSubtitle, type: VerifiedPropertyType.PRIMITIVE },
  icon: {
    error: materialErrors.noIcon,
    type: VerifiedPropertyType.OBJECT,
    innerObject: { data: { error: materialErrors.noIcon, type: VerifiedPropertyType.PRIMITIVE } },
  },
  articleText: { error: articleEditorErrors.noArticleText, type: VerifiedPropertyType.PRIMITIVE },
}

export const PAGE_DATA_VERIFIER: MaterialDataObjectVerifier = {
  name: { error: materialErrors.noName, type: VerifiedPropertyType.PRIMITIVE },
  subtitle: { error: materialErrors.noSubtitle, type: VerifiedPropertyType.PRIMITIVE },
  icon: {
    error: materialErrors.noIcon,
    type: VerifiedPropertyType.OBJECT,
    innerObject: { data: { error: materialErrors.noIcon, type: VerifiedPropertyType.PRIMITIVE } },
  },
  url: { error: extMaterialEditorErrors.noURL, type: VerifiedPropertyType.PRIMITIVE },
}

export const LOCATION_DATA_VERIFIER: MaterialDataObjectVerifier = {
  lat: { error: guideEditorErrors.noLatitude, type: VerifiedPropertyType.PRIMITIVE },
  lng: { error: guideEditorErrors.noLongitude, type: VerifiedPropertyType.PRIMITIVE },
}

export const GUIDE_DATA_VERIFIER: MaterialDataObjectVerifier = {
  name: { error: materialErrors.noName, type: VerifiedPropertyType.PRIMITIVE },
  subtitle: { error: materialErrors.noSubtitle, type: VerifiedPropertyType.PRIMITIVE },
  icon: {
    error: materialErrors.noIcon,
    type: VerifiedPropertyType.OBJECT,
    innerObject: { data: { error: materialErrors.noIcon, type: VerifiedPropertyType.PRIMITIVE } },
  },
  defaultZoom: { error: guideEditorErrors.noDefaultZoom, type: VerifiedPropertyType.PRIMITIVE },
  info: { error: guideEditorErrors.noInfo, type: VerifiedPropertyType.PRIMITIVE },
  defaultCenter: {
    error: guideEditorErrors.noDefaultCenter,
    type: VerifiedPropertyType.OBJECT,
    innerObject: LOCATION_DATA_VERIFIER,
  },
  locations: {
    error: guideEditorErrors.noLocations,
    type: VerifiedPropertyType.OBJECTARRAY,
    innerObject: {
      coordinates: {
        error: guideEditorErrors.noLocationCoordinates,
        type: VerifiedPropertyType.OBJECT,
        innerObject: LOCATION_DATA_VERIFIER,
      },
      address: { error: guideEditorErrors.noLocationAddress, type: VerifiedPropertyType.PRIMITIVE },
      title: { error: guideEditorErrors.noLocationTitle, type: VerifiedPropertyType.PRIMITIVE },
      description: { error: guideEditorErrors.noLocationDescription, type: VerifiedPropertyType.PRIMITIVE },
      imageUrl: { error: guideEditorErrors.noLocationImageUrl, type: VerifiedPropertyType.PRIMITIVE },
    },
  },
}
