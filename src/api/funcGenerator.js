import Color from 'color';
import * as R from "ramda";

function prepareColors(baseColor, derivedColor) {
    const baseColorObj = new Color(baseColor).hsl().round();
    const derivedColorObj = new Color(derivedColor).hsl().round();
  
    const result = [
        [...baseColorObj.color, baseColorObj.valpha],
        [...derivedColorObj.color, derivedColorObj.valpha],
        baseColor
    ];
  
    return result;
}
  
function adviseFunction(base, derived, paramName) { // FIXME: тупое имя функции
    if (base === derived) {
        return false;
    }

    function checkForSpecials ( diffName, paramName, value ) {
        if (diffName === 'smaller' && paramName === 'hue') {
            return value * - 1;
        }
        else if ( paramName === 'valpha' ) {
            return value * 100;
        }
        return value;
    }
  
    const getValue = R.pipe(R.sort, R.reverse, R.apply(R.subtract));
  
    const diffName = base > derived ? "smaller" : "bigger";
    const diffValue = getValue(undefined,[base, derived]);
    const resultDiffValue = checkForSpecials(diffName, paramName, diffValue);
  
    return [paramName, [diffName, resultDiffValue]];
}
  
const findDifference = ([bh, bs, bl, ba], [dh, ds, dl, da], baseColor) => {
    const diffArr = [
        adviseFunction(bs, ds, "saturation"),
        adviseFunction(bl, dl, "lightness"),
        adviseFunction(bh, dh, "hue"),
        adviseFunction(ba, da, "valpha"),
        ["baseColor", baseColor]
    ].filter(param => !!param);

    return new Map(diffArr);
};
  
const generateFunctions = diffMap => {
    const possibleFunctions = {
        hue: {
            bigger: "spin",
            smaller: "spin"
        },
        saturation: {
            bigger: "saturate",
            smaller: "desaturate"
        },
        lightness: {
            bigger: "lighten",
            smaller: "darken"
        },
        valpha: {
            bigger: "fadeIn",
            smaller: "fadeOut"
        }
    };
    const result = [];
  
    diffMap.forEach((value, key) => { // FIXME: Перебить на редюс
        if (key === "baseColor") {
            result.baseColor = value;
            return;
        }
        const [diff, val] = value;

        result.push([possibleFunctions[key][diff], val]);
    });
  
    return result;
};
  
const generateOutput = funcsArr => {
    const reducer = (acc, cur) => `${cur[0]}(${acc}, ${cur[1]})`;
  
    return funcsArr.reduce(reducer, funcsArr.baseColor);
};
  
export const getFunction = R.pipe(
    prepareColors,
    R.apply(findDifference),
    generateFunctions,
    generateOutput
);
  