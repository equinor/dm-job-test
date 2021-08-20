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
import {
    AccessLevel,
    AccessLevelFromJSON,
    AccessLevelFromJSONTyped,
    AccessLevelToJSON,
} from './';

/**
 * acl:
 *   owner: 'username'
 *   roles:
 *     'role': WRITE
 *   users:
 *     'username': WRITE
 *   others: READ
 * @export
 * @interface ACL
 */
export interface ACL {
    /**
     * 
     * @type {string}
     * @memberof ACL
     */
    owner: string;
    /**
     * 
     * @type {{ [key: string]: AccessLevel; }}
     * @memberof ACL
     */
    roles?: { [key: string]: AccessLevel; };
    /**
     * 
     * @type {{ [key: string]: AccessLevel; }}
     * @memberof ACL
     */
    users?: { [key: string]: AccessLevel; };
    /**
     * 
     * @type {AccessLevel}
     * @memberof ACL
     */
    others?: AccessLevel;
}

export function ACLFromJSON(json: any): ACL {
    return ACLFromJSONTyped(json, false);
}

export function ACLFromJSONTyped(json: any, ignoreDiscriminator: boolean): ACL {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'owner': json['owner'],
        'roles': !exists(json, 'roles') ? undefined : (mapValues(json['roles'], AccessLevelFromJSON)),
        'users': !exists(json, 'users') ? undefined : (mapValues(json['users'], AccessLevelFromJSON)),
        'others': !exists(json, 'others') ? undefined : AccessLevelFromJSON(json['others']),
    };
}

export function ACLToJSON(value?: ACL | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'owner': value.owner,
        'roles': value.roles === undefined ? undefined : (mapValues(value.roles, AccessLevelToJSON)),
        'users': value.users === undefined ? undefined : (mapValues(value.users, AccessLevelToJSON)),
        'others': AccessLevelToJSON(value.others),
    };
}


