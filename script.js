// Get the necessary HTML elements
const categorySelect = document.getElementById("category-select");
const heading = document.querySelector(".heading");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const elements = document.querySelector(".elements");
const input1 = document.querySelector(".input");
const input2 = document.querySelector(".output");

// Define Conversions Options
const conversionOptions = {
  area: [
    ["Square Meter", "sq_m"],
    ["Square Kilometer", "sq_km"],
    ["Square Mile", "sq_mile"],
    ["Acre", "acre"],
  ],
  length: [
    ["Meter", "m"],
    ["Kilometer", "km"],
    ["Mile", "mile"],
    ["Yard", "yard"],
  ],
  temperature: [
    ["Celcius", "C"],
    ["Fahrenheit", "F"],
    ["Kelvin", "K"],
  ],
  weight: [
    ["Gram", "gm"],
    ["Kilogram", "kg"],
    ["Pound", "lb"],
    ["Ounce", "oz"],
  ],
};

const area = {
  sq_m: {
    sq_km: (a) => a / 1e6,
    sq_mile: (a) => a / 2.59e6,
    acre: (a) => a / 4046.85,
  },
  sq_km: {
    sq_m: (a) => a * 1e6,
    sq_mile: (a) => a / 2.59,
    acre: (a) => a * 247.1,
  },
  sq_mile: {
    sq_m: (a) => a * 2.59e6,
    sq_km: (a) => a * 2.59,
    acre: (a) => a * 640,
  },
  acre: {
    sq_m: (a) => a * 4046.85,
    sq_km: (a) => a / 247.1,
    sq_mile: (a) => a / 640,
  },
};
const length = {
  m: {
    km: (v) => v / 1000,
    mile: (v) => v / 1609,
    yard: (v) => v * 1.09361,
  },
  km: {
    m: (v) => v * 100,
    mile: (v) => v / 1.609,
    yard: (v) => v * 1094,
  },
  mile: {
    m: (v) => v * 1609,
    km: (v) => v * 1.609,
    yard: (v) => v * 1760,
  },
  yard: {
    m: (v) => v / 1.09361,
    km: (v) => v / 1094,
    mile: (v) => v / 1760,
  },
};
const temperature = {
  C: {
    F: (t) => (t * 9) / 5 + 32,
    K: (t) => t + 273.15,
  },
  F: {
    C: (t) => ((t - 32) * 5) / 9,
    K: (t) => ((t - 32) * 5) / 9 + 273.15,
  },
  K: {
    C: (t) => t - 273.15,
    F: (t) => ((t - 273.15) * 9) / 5 + 32,
  },
};
const weight = {
  gm: {
    kg: (w) => w / 1000,
    lb: (w) => w / 453.6,
    oz: (w) => w / 28.35,
  },
  kg: {
    gm: (w) => w * 1000,
    lb: (w) => w * 2.205,
    oz: (w) => w * 35.274,
  },
  lb: {
    gm: (w) => w * 453.6,
    kg: (w) => w / 2.205,
    oz: (w) => w * 16,
  },
  oz: {
    gm: (w) => w * 28.35,
    kg: (w) => w / 35.274,
    lb: (w) => w / 16,
  },
};
//Spread conversion option objects in single object
let factors = { ...area, ...length, ...temperature, ...weight };

// Add options to "from" and "to" select elements based on the selected category
function addOptions() {
  const category = categorySelect.value;
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";
  heading.innerHTML = `${category} converter`;

  for (const x in conversionOptions[category]) {
    const op1 = document.createElement("option");
    const op2 = document.createElement("option");
    op1.value = conversionOptions[category][x][1];
    op2.value = conversionOptions[category][x][1];
    op1.textContent = conversionOptions[category][x][0];
    op2.textContent = conversionOptions[category][x][0];
    fromSelect.appendChild(op1);
    toSelect.appendChild(op2);
  }
}

// Perform conversion when the "Convert" button is clicked
function convert() {
  const category = categorySelect.value;
  const fromUnit = fromSelect.value;
  const toUnit = toSelect.value;
  const inputValue = parseFloat(input1.value);
  // const outputValue = inputValue * conversions[category][fromUnit];
  let outputVal =
    fromUnit === toUnit ? inputValue : factors[fromUnit][toUnit](inputValue);
  // input2.value = outputValue.toFixed(2);
  input2.value = isNaN(outputVal) ? "" : outputVal;
}

// Add event listeners
categorySelect.addEventListener("change", addOptions);
fromSelect.addEventListener("change", convert);
toSelect.addEventListener("change", convert);
input1.addEventListener("keyup", convert);

// Add options to the "from" and "to" select elements for the initial category
addOptions();
