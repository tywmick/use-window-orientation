import{useState as t,useEffect as e}from"react";import r from"lodash.debounce";function n(n={}){if("object"!=typeof n)throw new TypeError("The options argument must be formatted as an object.");const{defaultOrientation:o="portrait"}=n;if("portrait"!==o&&"landscape"!==o){const t="string"==typeof o;throw new TypeError(`${t?'"':""}${o}${t?'"':""} is not a valid defaultOrientation. Use "portrait" or "landscape".`)}const[i,a]=t(o);return e(()=>{const t=r(()=>{window.innerWidth<=window.innerHeight?a("portrait"):a("landscape")},400,{leading:!0,trailing:!0});return t(),window.addEventListener("resize",t),()=>{window.removeEventListener("resize",t),t.cancel()}},[]),{orientation:i,portrait:"portrait"===i,landscape:"landscape"===i}}export default n;
//# sourceMappingURL=index.modern.js.map
