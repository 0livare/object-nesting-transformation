function isPrimitive(val) {
    const type = typeof val;
    return type === 'string' || type === 'number' || type === 'boolean';
}

/**
 * Turn an object with nested objects into a non-nested object whose
 * keys use dot notation to represent previously nested objects.
 *
 * @param {object} nestedObject An object where each value is either
 * a string, number, boolean, or plain JS object (arrays are)
 * not supported
 * @returns A flattened version of the passed object.  The keys of
 * the returned object will use dot notation to represent the
 * nesting that was present in the original object.
 * e.g. `{foo: {bar: 'baz'}}` will become `{'foo.bar': 'baz'}`.
 * Primitive values on the original object will not have their
 * keys affected.
 */
export function flattenObject(nestedObject) {
    const flattened = {};

    for (const key in nestedObject) {
        const val = nestedObject[key];
        if (isPrimitive(val)) {
            flattened[key] = val;
        } else {
            // We assume it is a plain JS object, and not an array
            // or something complex like a Date
            const flatNestedObject = flattenObject(val);
            for (const nestedKey in flatNestedObject) {
                flattened[`${key}.${nestedKey}`] = flatNestedObject[nestedKey];
            }
        }
    }

    return flattened;
}

/**
 * Turns a non-nested object whose keys use dot notation to represent
 * nesting into a nested object.
 *
 * @param {object} nestedKeyNotationObject An object whose  keys use
 * dot notation to represent previously nested objects.
 * @returns A nested version of the passed object.
 * e.g. `{'foo.bar': 'baz'}` will become `{foo: {bar: 'baz'}}`
 */
export function nestObject(nestedKeyNotationObject) {
    const nested = {};

    for (const nestedKey in nestedKeyNotationObject) {
        const keySections = nestedKey.split('.');
        let level = nested;

        for (let i = 0; i < keySections.length; ++i) {
            const keySection = keySections[i];
            const isLastKeySection = i === keySections.length - 1;

            if (isLastKeySection) {
                // This is the final nested object, set the value
                level[keySection] = nestedKeyNotationObject[nestedKey];
            } else {
                // There is more nesting to be done, move to the
                // next level
                if (!level[keySection]) level[keySection] = {};
                level = level[keySection];
            }
        }
    }

    return nested;
}
