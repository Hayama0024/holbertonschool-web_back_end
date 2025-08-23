/* eslint no-underscore-dangle: 0 */
export default class Building {
    constructor(sqft) {
      if (typeof sqft !== 'number') {
        throw TypeError('SQFT must be a number');
      }
      if ((this.constructor.name !== 'Building') && (typeof this.evacuationWarningMessage === 'undefined')) {
        throw new Error('Class extending Building must override evacuationWarningMessage');
      }
  
      this._sqft = sqft;
    }
  
    // SQFT
    get sqft() {
      return this._sqft;
    }
  }