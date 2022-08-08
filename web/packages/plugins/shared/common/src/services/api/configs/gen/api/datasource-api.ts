/* tslint:disable */
/* eslint-disable */
/**
 * Data Modelling Storage Service
 * API for basic data modelling interaction
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { DataSourceRequest } from '../models';
// @ts-ignore
import { HTTPValidationError } from '../models';
/**
 * DatasourceApi - axios parameter creator
 * @export
 */
export const DatasourceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get
         * @param {string} dataSourceId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataSourceGet: async (dataSourceId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dataSourceId' is not null or undefined
            assertParamExists('dataSourceGet', 'dataSourceId', dataSourceId)
            const localVarPath = `/api/v1/data-sources/{data_source_id}`
                .replace(`{${"data_source_id"}}`, encodeURIComponent(String(dataSourceId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIKeyHeader required
            await setApiKeyToObject(localVarHeaderParameter, "Access-Key", configuration)

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2AuthorizationCodeBearer", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataSourceGetAll: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/data-sources`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIKeyHeader required
            await setApiKeyToObject(localVarHeaderParameter, "Access-Key", configuration)

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2AuthorizationCodeBearer", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Create or update a data source configuration
         * @summary Save
         * @param {string} dataSourceId 
         * @param {DataSourceRequest} dataSourceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataSourceSave: async (dataSourceId: string, dataSourceRequest: DataSourceRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dataSourceId' is not null or undefined
            assertParamExists('dataSourceSave', 'dataSourceId', dataSourceId)
            // verify required parameter 'dataSourceRequest' is not null or undefined
            assertParamExists('dataSourceSave', 'dataSourceRequest', dataSourceRequest)
            const localVarPath = `/api/v1/data-sources/{data_source_id}`
                .replace(`{${"data_source_id"}}`, encodeURIComponent(String(dataSourceId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIKeyHeader required
            await setApiKeyToObject(localVarHeaderParameter, "Access-Key", configuration)

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2AuthorizationCodeBearer", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(dataSourceRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DatasourceApi - functional programming interface
 * @export
 */
export const DatasourceApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DatasourceApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get
         * @param {string} dataSourceId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataSourceGet(dataSourceId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataSourceGet(dataSourceId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataSourceGetAll(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<object>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataSourceGetAll(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Create or update a data source configuration
         * @summary Save
         * @param {string} dataSourceId 
         * @param {DataSourceRequest} dataSourceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dataSourceSave(dataSourceId: string, dataSourceRequest: DataSourceRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.dataSourceSave(dataSourceId, dataSourceRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DatasourceApi - factory interface
 * @export
 */
export const DatasourceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DatasourceApiFp(configuration)
    return {
        /**
         * 
         * @summary Get
         * @param {string} dataSourceId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataSourceGet(dataSourceId: string, options?: any): AxiosPromise<object> {
            return localVarFp.dataSourceGet(dataSourceId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get All
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataSourceGetAll(options?: any): AxiosPromise<Array<object>> {
            return localVarFp.dataSourceGetAll(options).then((request) => request(axios, basePath));
        },
        /**
         * Create or update a data source configuration
         * @summary Save
         * @param {string} dataSourceId 
         * @param {DataSourceRequest} dataSourceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dataSourceSave(dataSourceId: string, dataSourceRequest: DataSourceRequest, options?: any): AxiosPromise<string> {
            return localVarFp.dataSourceSave(dataSourceId, dataSourceRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for dataSourceGet operation in DatasourceApi.
 * @export
 * @interface DatasourceApiDataSourceGetRequest
 */
export interface DatasourceApiDataSourceGetRequest {
    /**
     * 
     * @type {string}
     * @memberof DatasourceApiDataSourceGet
     */
    readonly dataSourceId: string
}

/**
 * Request parameters for dataSourceSave operation in DatasourceApi.
 * @export
 * @interface DatasourceApiDataSourceSaveRequest
 */
export interface DatasourceApiDataSourceSaveRequest {
    /**
     * 
     * @type {string}
     * @memberof DatasourceApiDataSourceSave
     */
    readonly dataSourceId: string

    /**
     * 
     * @type {DataSourceRequest}
     * @memberof DatasourceApiDataSourceSave
     */
    readonly dataSourceRequest: DataSourceRequest
}

/**
 * DatasourceApi - object-oriented interface
 * @export
 * @class DatasourceApi
 * @extends {BaseAPI}
 */
export class DatasourceApi extends BaseAPI {
    /**
     * 
     * @summary Get
     * @param {DatasourceApiDataSourceGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatasourceApi
     */
    public dataSourceGet(requestParameters: DatasourceApiDataSourceGetRequest, options?: any) {
        return DatasourceApiFp(this.configuration).dataSourceGet(requestParameters.dataSourceId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get All
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatasourceApi
     */
    public dataSourceGetAll(options?: any) {
        return DatasourceApiFp(this.configuration).dataSourceGetAll(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Create or update a data source configuration
     * @summary Save
     * @param {DatasourceApiDataSourceSaveRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatasourceApi
     */
    public dataSourceSave(requestParameters: DatasourceApiDataSourceSaveRequest, options?: any) {
        return DatasourceApiFp(this.configuration).dataSourceSave(requestParameters.dataSourceId, requestParameters.dataSourceRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
