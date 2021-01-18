export type MaterialDataObjectVerifier = { [key: string]: MaterialDataPropertyVerifier }

export type MaterialDataPropertyVerifier = {
  error: EditorError
  type: VerifiedPropertyType
  innerProperty?: MaterialDataPropertyVerifier
  innerObject?: MaterialDataObjectVerifier
  couldBeEmpty?: boolean
}

export type EditorError = {
  id: string
  description: string
}

export enum VerifiedPropertyType {
  PRIMITIVE = 0,
  OBJECT = 1,
  ARRAY = 2,
  OBJECTARRAY = 3,
}
