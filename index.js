"use strict";

/**
 * Jaime Bustos Espinoza
 * https://github.com/jaimebustose
 */

/**
 * Determine if the data param is a object, and returns true or false
 * @param {any} data 
 * @returns {boolean}
 */
const isObject = (data) => {
  return typeof data === 'object' && data !== null;
};

/**
 * Parse to the return value. In case of not finding the specified one, it returns the value
 * 
 * @param {any} value 
 * @param {string} type 
 * @returns {any}
 */
const parseValue = (value, type) => {
  switch (type) {
    case 'string':
      return String(value);
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true' || value === true;
    default:
      return value;
  }
};

/**
 * Serializer for Model generation, return new Model with the data specified for its attributes 
 * @param {Object.<string,string>} attributes 
 * @param {string[]} data 
 * @param {boolean=} nullable 
 * @returns {Object.<string,any>}
 */
const ModelSerializer = (attributes, data, nullable = true) => {
  if (isObject(data)) {
    return Object.entries(data).reduce((accumulator, currentProperty) => {
      var [key, value] = currentProperty;
      if (Object.keys(attributes).includes(key)) {
        const propertyType = attributes[key];
        if (value === null && !nullable) {
          return accumulator;
        }
        return {
          ...accumulator,
          [key]: parseValue(value, propertyType),
        };
      } else {
        return accumulator;
      }
    }, {});
  } else {
    throw new TypeError(`Type of data is not object, is ${typeof data}`);
  }
};

module.exports = {
  ModelSerializer
};