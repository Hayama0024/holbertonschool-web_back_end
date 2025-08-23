/* eslint no-underscore-dangle: 0 */
export default class HolbertonCourse {
    constructor(name, length, students) {
      this.name = name;
      this.length = length;
      this.students = students;
    }
  
    // Name
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (typeof value !== 'string') {
        throw new TypeError('Name must be a string');
      }
      this._name = value;
    }
  
    // Length
    get length() {
      return this._length;
    }
  
    set length(value) {
      if (typeof value !== 'number') {
        throw new TypeError('Length must be a number');
      }
      this._length = value;
    }
  
    // Students
    get students() {
      return this._students;
    }
  
    set students(value) {
      if (!Array.isArray(value)) {
        throw new TypeError('Students must be an array of strings');
      }
      for (const element of value) {
        if (typeof element !== 'string') {
          throw new TypeError('Students must be an array of strings');
        }
      }
      this._students = value;
    }
  }