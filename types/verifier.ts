export type FormDataObjectVerifier = { [key: string]: FormDataPropertyVerifier }

export type FormDataPropertyVerifier = {
  error: EditorError
  type: VerifiedPropertyType
  innerProperty?: FormDataPropertyVerifier
  innerObject?: FormDataObjectVerifier
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
