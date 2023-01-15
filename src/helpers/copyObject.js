/**
 * 
 * @param {object} obj to copy 
 * @returns copied object without reference
 */
export const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}