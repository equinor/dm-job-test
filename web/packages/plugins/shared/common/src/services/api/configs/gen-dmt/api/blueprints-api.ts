/* tslint:disable */
/* eslint-disable */
/**
 * Data Modelling Tool
 * API for Data Modeling Tool (DMT)
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import globalAxios, { AxiosPromise, AxiosInstance } from 'axios'
import { Configuration } from '../configuration'
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from '../common'
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from '../base'
// @ts-ignore
import { HTTPValidationError } from '../models'
/**
 * BlueprintsApi - axios parameter creator
 * @export
 */
export const BlueprintsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Get
     * @param {string} target
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBlueprints: async (
      target: string,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'target' is not null or undefined
      assertParamExists('getBlueprints', 'target', target)
      const localVarPath = `/api/v1/blueprints/{target}`.replace(
        `{${'target'}}`,
        encodeURIComponent(String(target))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      }

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
  }
}

/**
 * BlueprintsApi - functional programming interface
 * @export
 */
export const BlueprintsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = BlueprintsApiAxiosParamCreator(
    configuration
  )
  return {
    /**
     *
     * @summary Get
     * @param {string} target
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getBlueprints(
      target: string,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getBlueprints(
        target,
        options
      )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
  }
}

/**
 * BlueprintsApi - factory interface
 * @export
 */
export const BlueprintsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = BlueprintsApiFp(configuration)
  return {
    /**
     *
     * @summary Get
     * @param {string} target
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBlueprints(target: string, options?: any): AxiosPromise<any> {
      return localVarFp
        .getBlueprints(target, options)
        .then((request) => request(axios, basePath))
    },
  }
}

/**
 * Request parameters for getBlueprints operation in BlueprintsApi.
 * @export
 * @interface BlueprintsApiGetBlueprintsRequest
 */
export interface BlueprintsApiGetBlueprintsRequest {
  /**
   *
   * @type {string}
   * @memberof BlueprintsApiGetBlueprints
   */
  readonly target: string
}

/**
 * BlueprintsApi - object-oriented interface
 * @export
 * @class BlueprintsApi
 * @extends {BaseAPI}
 */
export class BlueprintsApi extends BaseAPI {
  /**
   *
   * @summary Get
   * @param {BlueprintsApiGetBlueprintsRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BlueprintsApi
   */
  public getBlueprints(
    requestParameters: BlueprintsApiGetBlueprintsRequest,
    options?: any
  ) {
    return BlueprintsApiFp(this.configuration)
      .getBlueprints(requestParameters.target, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
