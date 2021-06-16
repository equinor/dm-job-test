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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface EntityType
 */
export interface EntityType {
    /**
     * 
     * @type {string}
     * @memberof EntityType
     */
    type: string;
}

export function EntityTypeFromJSON(json: any): EntityType {
    return EntityTypeFromJSONTyped(json, false);
}

export function EntityTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityType {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
    };
}

export function EntityTypeToJSON(value?: EntityType | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
    };
}


