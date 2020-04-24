import svg from "./esvigi";

interface configOptions {
  size: number;
  seed?: string;
}

// The random number is a js implementation of the Xorshift PRNG
var randseed = new Array(8); // Xorshift: [x, y, z, w] 32 bit values
var randseedConverted = new Array(8);
var predefinedColorsSliced = new Array(15);
var predefinedColors = new Array(20);

function seedrand(seed: string, n: number) {
  predefinedColors = [
    "#c93939",
    "#ff4d4d",
    "#a66759",
    "#ff5800",
    "#ff9300",
    "#f5cc01",
    "#12eb12",
    "#06f57b",
    "#00c15c",
    "#0e8c68",
    "#00ffde",
    "#18e2ff",
    "#18b2ff",
    "#2571fb",
    "#4d4dff",
    "#8949f6",
    "#b24dff",
    "#eb81fe",
    "#ff66ff",
    "#932a7d",
  ];
  for (var i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (var i = 0; i < seed.length; i++) {
    randseed[i % n] =
      (randseed[i % n] << 9) +
      randseed[i % n] +
      ((randseed[i % n] >>> 9) + randseed[i % n]) -
      seed.charCodeAt(i);
  }
}

function randLayers() {
  for (var i = 0; i < randseed.length - 3; i++) {
    // if number is negative, turn positive.
    if (randseed[i] < 0) {
      randseed[i] = randseed[i] *= -1;
    }
    randseedConverted[i] = randseed[i] % 9;
  }
}

function randFaceFlakeColor() {
  if (randseed[5] < 0) {
    randseed[5] = randseed[5] *= -1;
  }
  randseedConverted[5] = randseed[5] % 19;
}

function randBackgroundColor() {
  if (randseed[6] < 0) {
    randseed[6] = randseed[6] *= -1;
  }
  randseedConverted[6] = randseed[6] % 14;
}

function randEyesColor() {
  if (randseed[7] < 0) {
    randseed[7] = randseed[7] *= -1;
  }
  randseedConverted[7] = randseed[7] % 13;
}

function switchLayers(doc: any) {
  if (randseedConverted[0] + 1 !== 5) {
    var defaultElement = doc.documentElement.getElementById("flake-5");
    defaultElement.style.display = "none";
    var flakeElement = doc.documentElement.getElementById(
      "flake-" + (randseedConverted[0] + 1)
    );
    flakeElement.style.display = "block";
  }
  if (randseedConverted[1] + 1 !== 5) {
    var defaultElement = doc.documentElement.getElementById("face-5");
    defaultElement.style.display = "none";
    var faceElement = doc.documentElement.getElementById(
      "face-" + (randseedConverted[1] + 1)
    );
    faceElement.style.display = "block";
  }
  if (randseedConverted[2] + 1 !== 5) {
    var defaultElement = doc.documentElement.getElementById("mouth-5");
    defaultElement.style.display = "none";
    var mouthElement = doc.documentElement.getElementById(
      "mouth-" + (randseedConverted[2] + 1)
    );
    mouthElement.style.display = "block";
  }
  if (randseedConverted[3] + 1 !== 5) {
    var defaultElement = doc.documentElement.getElementById("accessories-5");
    defaultElement.style.display = "none";
    var accessriesElement = doc.documentElement.getElementById(
      "accessories-" + (randseedConverted[3] + 1)
    );
    accessriesElement.style.display = "block";
  }
  if (randseedConverted[4] + 1 !== 5) {
    var defaultElement = doc.documentElement.getElementById("eyes-5");
    defaultElement.style.display = "none";
    var eyesElement = doc.documentElement.getElementById(
      "eyes-" + (randseedConverted[4] + 1)
    );
    eyesElement.style.display = "block";
  }
}

function switchColors(doc: any) {
  var flakeElement = doc.documentElement.getElementById(
    "flake-" + (randseedConverted[0] + 1)
  );
  var faceElement = doc.documentElement.getElementById(
    "face-" + (randseedConverted[1] + 1)
  );
  var mouthElement = doc.documentElement.getElementById(
    "mouth-" + (randseedConverted[2] + 1)
  );
  var backgroundElement = doc.documentElement.getElementById("shape-bg-1");
  var eyesElement = doc.documentElement.getElementById(
    "eyes-" + (randseedConverted[4] + 1)
  );
  flakeElement.childNodes[1].style.fill =
    predefinedColors[randseedConverted[5]];
  faceElement.childNodes[1].style.fill = predefinedColors[randseedConverted[5]];
  if (randseedConverted[5] === 0) {
    predefinedColorsSliced = predefinedColors.splice(0, 3);
  } else if (randseedConverted[5] === 1) {
    predefinedColorsSliced = predefinedColors.splice(0, 4);
  } else {
    if (randseedConverted[5] + 2 > predefinedColors.length - 1) {
      predefinedColorsSliced = predefinedColors.splice(
        randseedConverted[5] - 2,
        predefinedColors.length - 1
      );
    } else {
      predefinedColorsSliced = predefinedColors.splice(
        randseedConverted[5] - 2,
        5
      );
    }
  }
  backgroundElement.childNodes[1].style.fill =
    predefinedColors[randseedConverted[6]];
  predefinedColors.splice(randseedConverted[6], 1);
  for (let i = 0; i < eyesElement.childNodes.length; i++) {
    if (eyesElement.childNodes[i].className) {
      if (eyesElement.childNodes[i].className.animVal === "main") {
        eyesElement.childNodes[i].style.fill =
          predefinedColors[randseedConverted[7]];
      }
    }
  }
}

function buildOpts(opts: configOptions) {
  const randNow = Math.floor(Math.random() * Math.pow(10, 16)).toString(16);
  var newOpts: configOptions = {
    seed: opts.seed || randNow,
    size: opts.size || 128,
  };
  seedrand(newOpts.seed!, 8);
  newOpts.size = opts.size || 128;
  return newOpts;
}

function createIcon(opts: configOptions) {
  opts = buildOpts(opts || {});
  var parser = new DOMParser();
  var doc = parser.parseFromString(svg, "image/svg+xml");

  randLayers();
  randFaceFlakeColor();
  randBackgroundColor();
  randEyesColor();
  switchLayers(doc);
  switchColors(doc);
  doc.documentElement.style.height = opts.size + "px";
  const docel = doc.documentElement;
  return docel;
}

export default createIcon;
