import { Subject } from 'rxjs'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'

import { constructArrayItemPath, constructArrayItemValuePath } from 'helpers/constructArrayItemPath'
import {
  MaterialDataObjectVerifier,
  EditorError,
  MaterialDataPropertyVerifier,
  VerifiedPropertyType,
} from 'types/verifier'

export interface IMaterialDataService {
  currentData: any
  updateData: (newData: any) => void
  getSubjectFor: (path: string) => Subject<any>
  getValueFor: (path: string) => any
  getArrayItemValueSubjectFor: (pathToArray: string, pathToItemValue: string, index: number) => Subject<any>
  getArrayItemValueFor: (pathToArray: string, pathToItemValue: string, index: number) => any
  getArrayItemSubjectFor: (pathToArray: string, index: number) => Subject<any>
  getArrayItemFor: (pathToArray: string, index: number) => any
  addField: (path: string, value: any, isArray?: boolean) => void
  addFieldToArrayItem: (
    pathToArray: string,
    pathToItemValue: string,
    value: any,
    index: number,
    addToArray?: boolean,
  ) => void
  addArrayItem: (pathToArray: string, index: number, item?: any) => void
  removeArrayItem: (pathToArray: string, index: number) => void
  verifyData: () => EditorError[]
}

export class MaterialDataService implements IMaterialDataService {
  private readonly _defaultData: any = {}
  private readonly _verifier: MaterialDataObjectVerifier = {}
  private _currentData: any = {}
  private _subjects: { [path: string]: Subject<any> } = {}

  private _getHigherLevelObject(path: string, obj: any) {
    let variableNames = path.split('.')
    let data = obj
    while (variableNames.length - 1) {
      const name = variableNames.shift() as string
      if (!(name in data)) {
        data[name] = {}
      }
      data = data[name]
    }
    return { higherLevelObject: data, fieldName: variableNames[0] }
  }

  private _addValueToField(value: any, field: string, obj: any, addToArray?: boolean) {
    if (addToArray) {
      if (!obj[field]) {
        obj[field] = []
      }
      obj[field].push(value)
    } else {
      obj[field] = value
    }
  }

  private _updateAllSubjectsWithCurrentData() {
    for (const path in this._subjects) {
      const newValue = get(this._currentData, path)
      this._subjects[path].next(newValue)
    }
  }

  public constructor(verifier: MaterialDataObjectVerifier, defaultData?: any) {
    this._verifier = verifier
    if (defaultData) {
      // Deep copy
      this._defaultData = JSON.parse(JSON.stringify(defaultData))
      this._currentData = JSON.parse(JSON.stringify(defaultData))
    }
  }

  public get currentData() {
    return this._currentData
  }

  public updateData(newData: any) {
    this._currentData = newData
    this._updateAllSubjectsWithCurrentData()
  }

  public getSubjectFor(path: string) {
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    return this._subjects[path]
  }

  public getValueFor(path: string) {
    return get(this._currentData, path)
  }

  public getArrayItemValueSubjectFor(pathToArray: string, pathToItemValue: string, index: number) {
    const path = constructArrayItemValuePath(pathToArray, pathToItemValue, index)
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    return this._subjects[path]
  }

  public getArrayItemValueFor(pathToArray: string, pathToItemValue: string, index: number) {
    const path = constructArrayItemValuePath(pathToArray, pathToItemValue, index)
    return get(this._currentData, path)
  }

  public getArrayItemSubjectFor(pathToArray: string, index: number) {
    const path = constructArrayItemPath(pathToArray, index)
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    return this._subjects[path]
  }

  public getArrayItemFor(pathToArray: string, index: number) {
    const path = constructArrayItemPath(pathToArray, index)
    return get(this._currentData, path)
  }

  public addField(path: string, value: any, addToArray?: boolean) {
    const { higherLevelObject, fieldName } = this._getHigherLevelObject(path, this._currentData)
    this._addValueToField(value, fieldName, higherLevelObject, addToArray)
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    this._subjects[path].next(value)
  }

  public addFieldToArrayItem(
    pathToArray: string,
    pathToItemValue: string,
    value: any,
    index: number,
    addToArray?: boolean,
  ) {
    const { higherLevelObject: arrayHigherLevelObject, fieldName: arrayFieldName } = this._getHigherLevelObject(
      pathToArray,
      this._currentData,
    )

    let arrayItem = this._currentData
    if (!arrayHigherLevelObject[arrayFieldName] || arrayHigherLevelObject[arrayFieldName].length === 0) {
      arrayHigherLevelObject[arrayFieldName] = []
      arrayHigherLevelObject[arrayFieldName].push({})
      arrayItem = arrayHigherLevelObject[arrayFieldName][0]
    } else {
      if (!arrayHigherLevelObject[arrayFieldName][index]) {
        arrayHigherLevelObject[arrayFieldName][index] = {}
      }
      arrayItem = arrayHigherLevelObject[arrayFieldName][index]
    }

    const { higherLevelObject: itemHigherLevelObject, fieldName: itemFieldName } = this._getHigherLevelObject(
      pathToItemValue,
      arrayItem,
    )

    this._addValueToField(value, itemFieldName, itemHigherLevelObject, addToArray)
    const path = constructArrayItemValuePath(pathToArray, pathToItemValue, index)
    if (!this._subjects[path]) {
      this._subjects[path] = new Subject<any>()
    }
    this._subjects[path].next(value)
  }

  public addArrayItem(pathToArray: string, index: number, item?: any) {
    let itemToAdd
    if (item === undefined) {
      if (this._defaultData[pathToArray] && this._defaultData[pathToArray].length !== 0) {
        itemToAdd = this._defaultData[pathToArray][0]
      } else {
        itemToAdd = {}
      }
    } else {
      itemToAdd = item
    }
    if (!this._subjects[pathToArray]) {
      this._subjects[pathToArray] = new Subject<any>()
    }
    if (!this._currentData[pathToArray]) {
      this._currentData[pathToArray] = []
    }
    this._currentData[pathToArray].splice(index, 1, itemToAdd)
    this._subjects[pathToArray].next(this._currentData[pathToArray])
  }

  public removeArrayItem(pathToArray: string, index: number) {
    if (!this._currentData[pathToArray] || this._currentData[pathToArray].length <= index) {
      return
    }
    this._currentData[pathToArray].splice(index, 1)
    this._updateAllSubjectsWithCurrentData()
  }

  private _verifyObject(data: any, mapVerifier: MaterialDataObjectVerifier, errors: EditorError[]) {
    for (const key in mapVerifier) {
      this._verifyProperty(data[key], mapVerifier[key], errors)
    }
  }

  private _verifyProperty(data: any, propertyVerifier: MaterialDataPropertyVerifier, errors: EditorError[]) {
    switch (propertyVerifier.type) {
      case VerifiedPropertyType.OBJECT:
        if (isEmpty(data) && !propertyVerifier.couldBeEmpty) {
          errors.push(propertyVerifier.error)
        } else {
          this._verifyObject(data, propertyVerifier.innerObject!, errors)
        }
        break
      case VerifiedPropertyType.OBJECTARRAY:
        if (isEmpty(data) && !propertyVerifier.couldBeEmpty) {
          errors.push(propertyVerifier.error)
        } else {
          for (const index in data) {
            this._verifyObject(data[index], propertyVerifier.innerObject!, errors)
          }
        }
        break
      case VerifiedPropertyType.ARRAY:
        if (isEmpty(data) && !propertyVerifier.couldBeEmpty) {
          errors.push(propertyVerifier.error)
        } else {
          for (const index in data) {
            this._verifyProperty(data[index], propertyVerifier.innerProperty!, errors)
          }
        }
        break
      default:
        if (!data && !propertyVerifier.couldBeEmpty) {
          errors.push(propertyVerifier.error)
        }
        break
    }
  }

  public verifyData() {
    let errors: EditorError[] = []
    this._verifyObject(this._currentData, this._verifier, errors)
    errors = uniqBy(errors, (error) => error.id)
    return errors
  }
}

export const MaterialDataServiceId = Symbol('MaterialDataService')
