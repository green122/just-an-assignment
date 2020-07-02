import {removeEmptyProperties} from "./removeEmptyProperties";

describe('Remove empty properties function', () => {
  it('should remove all null, undefined, and empty string properties from object', () => {
    const testObj = {
      a: null,
      b: undefined,
      c: '',
      d: 'nonempty',
      e: 1234
    }
    
    expect(removeEmptyProperties(testObj)).toEqual({d: 'nonempty', e: 1234})
  });
  
  it('should return empty object if argument doesnt have any properties', () => {
    expect(removeEmptyProperties({})).toEqual({})
  })
})
