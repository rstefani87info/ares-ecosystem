import {getSHA256Hash} from '@ares/core/crypto.js';
import {PropertyPointer} from '@ares/core/scripts.js';
const cryptoMap = {};
const valuesMap = {};
export function transformModelFieldToSHA256(data, ...fieldNames) {
    array.forEach(element => {
        if(typeof element === 'string') {
            if(data[element]) {
                data[element] = rememberHash(data[element]);
            }
        }
        else if(element instanceof PropertyPointer) {
            element.setter(data, rememberHash(element.getter(data)));
        }
    });
    return data;
    
}

export function resumeModelFieldFromSHA256(data, ...fieldNames) {
    array.forEach(element => {
        if(typeof element === 'string') {
            if(data[element]) {
                data[element] = resumeFromHash(data[element]);
            }
        }
        else if(element instanceof PropertyPointer) {
            element.setter(data, resumeFromHash(element.getter(data)));
        }
    });
    return data;
    
}

function rememberHash(data) {
    data = data+'';
    if(!valuesMap[data]) {
        valuesMap[data] = getSHA256Hash(data);
        cryptoMap[valuesMap[data]] = data;
    }
    return valuesMap[data];
}

function resumeFromHash(data) {
    if(cryptoMap[data]) {
        return cryptoMap[data];
    }
    return data;
}
