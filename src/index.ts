import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

type Orientation = "portrait" | "landscape";

interface OrientationOptions {
  defaultOrientation?: Orientation;
}

interface OrientationResults {
  orientation: Orientation;
  portrait: boolean;
  landscape: boolean;
}

/**
 * React hook for using window orientation. Not _device_ orientation—this hook determines orientation based on the width and height of the window.
 * @param {OrientationOptions} [options] - The options object
 * @param {Orientation} [options.defaultOrientation=portrait] - The default orientation to return when there is no window
 * @returns {OrientationResults} An object containing the results of the orientation query in both string and boolean form
 */
export default function useWindowOrientation(
  options: OrientationOptions = {}
): OrientationResults {
  if (typeof options !== "object") {
    throw new TypeError("The options argument must be formatted as an object.");
  }
  const { defaultOrientation = "portrait" } = options;

  if (defaultOrientation !== "portrait" && defaultOrientation !== "landscape") {
    const isString = typeof defaultOrientation === "string";
    throw new TypeError(
      `${isString ? '"' : ""}${defaultOrientation}${
        isString ? '"' : ""
      } is not a valid defaultOrientation. Use "portrait" or "landscape".`
    );
  }

  const [orientation, setOrientation] = useState(defaultOrientation);

  useEffect(() => {
    const handleResize = debounce(
      () => {
        if (window.innerWidth <= window.innerHeight) {
          setOrientation("portrait");
        } else {
          setOrientation("landscape");
        }
      },
      400,
      { leading: true, trailing: true }
    );
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return {
    orientation,
    portrait: orientation === "portrait",
    landscape: orientation === "landscape",
  };
}
