import {flattenObject, nestObject} from '../object-nesting-transformation'

describe('flattenObject()', () => {
  it('does not modify non-nested objects', () => {
    const notNested = {
      foo: 'foo',
      bar: 4,
      baz: true,
    }

    expect(flattenObject(notNested)).toEqual(notNested)
  })

  it('flattens objects with 1 level of nesting', () => {
    const oneLevelOfNesting = {
      foo: {
        bar: 'foobar',
        baz: 4,
      },
      bop: false,
    }

    expect(flattenObject(oneLevelOfNesting)).toEqual({
      'foo.bar': 'foobar',
      'foo.baz': 4,
      bop: false,
    })
  })

  it('flattens objects with 2 levels of nesting', () => {
    const twoLevelsOfNesting = {
      foo: {
        bar: {
          baz: 'foobarbaz',
        },
        bam: 4,
      },
      bop: false,
    }

    expect(flattenObject(twoLevelsOfNesting)).toEqual({
      'foo.bar.baz': 'foobarbaz',
      'foo.bam': 4,
      bop: false,
    })
  })
})

describe('nestObject()', () => {
  it('does not modify non-nested keys', () => {
    const notNested = {
      foo: 'foo',
      bar: 4,
      baz: true,
    }

    expect(nestObject(notNested)).toEqual(notNested)
  })
  it('nests objects with 1 level of key nesting', () => {
    const oneLevelOfKeyNesting = {
      'foo.bar': 'foobar',
      'foo.baz': 4,
      bop: false,
    }

    expect(nestObject(oneLevelOfKeyNesting)).toEqual({
      foo: {
        bar: 'foobar',
        baz: 4,
      },
      bop: false,
    })
  })
  it('nests objects with 2 levels of key nesting', () => {
    const twoLevelsOfKeyNesting = {
      'foo.bar.baz': 'foobarbaz',
      'foo.bam': 4,
      bop: false,
    }

    expect(nestObject(twoLevelsOfKeyNesting)).toEqual({
      foo: {
        bar: {
          baz: 'foobarbaz',
        },
        bam: 4,
      },
      bop: false,
    })
  })
})
