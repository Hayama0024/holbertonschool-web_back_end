/* eslint no-underscore-dangle: 0 */
export default class Currency {
    constructor(code, name) {
      this.code = code;
      this.name = name;
    }
  
    // Code
    get code() {
      return this._code;
    }
  
    set code(value) {
      if (typeof value !== 'string') {
        throw TypeError('Code must be a string');
      }
      this._code = value;
    }
  
    // Name
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (typeof value !== 'string') {
        throw TypeError('Name must be a string');
      }
      this._name = value;
    }
  
    displayFullCurrency() {
      return `${this._name} (${this._code})`;
    }
  }