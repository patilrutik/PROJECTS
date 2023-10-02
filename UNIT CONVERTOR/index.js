

const conversionRates = {
    length: {
      Kilometre: 1,
      Meter: 1000,
      Centimeter: 100000,
      Milimetre: 1000000,
      Micrometres: 1000000000,
      Nanometre: 1000000000000,
      Mile: 0.621371,
      Yard: 1093.61,
      Foot: 3280.84,
      Inch: 39370.1,
      "Nautical Mile": 0.539957,
    },
    
  };
  
  const unitTypeSelect = document.getElementById("unitType");
  const fromUnitSelect = document.getElementById("fromUnit");
  const toUnitSelect = document.getElementById("toUnit");
  const inputValue = document.getElementById("inputValue");
  const outputValue = document.getElementById("outputValue");
  const formulaElement = document.getElementById("formulaText");
  const conversionTypeText = document.getElementById("conversionTypeText");
const conversionMessageElement = document.getElementById("conversionMessage");
  const convertButton = document.getElementById("convertButton"); 
  const resetButton = document.getElementById("resetButton");
  
  function populateUnitDropdowns(selectedType) {
    const units = Object.keys(conversionRates[selectedType]);
    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";
  
    units.forEach((unit) => {
      const option1 = new Option(unit, unit);
      const option2 = new Option(unit, unit);
  
      fromUnitSelect.appendChild(option1);
      toUnitSelect.appendChild(option2);
    });
  }
  
  // Populate the "from" and "to" unit dropdowns based on the selected unit type
  unitTypeSelect.addEventListener("change", () => {
    const selectedType = unitTypeSelect.value;
    populateUnitDropdowns(selectedType);
    updateConversion();
  });
  
  
  function updateConversion() {
    const selectedType = unitTypeSelect.value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const input = parseFloat(inputValue.value);
  
    if (!isNaN(input)) {
      if (selectedType === "temperature") {
        const convertFunction = conversionRates[selectedType][fromUnit][toUnit];
        const result = convertFunction(input);
        outputValue.value = result.toFixed(2);
        formulaElement.innerText = `${input} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
      } else {
        const conversionRate = conversionRates[selectedType][toUnit] / conversionRates[selectedType][fromUnit];
        const result = input * conversionRate;
        outputValue.value = result.toFixed(2);
        formulaElement.innerText = `${input} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
      }
    } else {
      outputValue.value = "";
      formulaElement.innerText = "Formula";
    }
   }
  
  convertButton.addEventListener("click", () => {
    updateConversion();
    displayConversionMessage();
  });

  resetButton.addEventListener("click", () => {
    resetFields();
    updateConversion();
  });


  // Function to reset input fields and conversion
function resetFields() {
    inputValue.value = ""; // Clear the input value
    outputValue.value = ""; // Clear the output value
    formulaElement.innerText = "Formula"; // Reset the formula text
    conversionTypeText.innerText = ""; // Reset the conversion type text
    conversionMessageElement.innerText = ""; // Reset the conversion message
  }

  function displayConversionMessage() {
    // Add your logic to display the conversion message based on the conversion result or any specific condition
    const result = parseFloat(outputValue.value);
    if (result > 100) {
      conversionMessageElement.innerText = "High conversion value!";
    } else {
      conversionMessageElement.innerText = "";
    }
  }
  // Initialize the unit dropdowns and perform initial conversion
  const initialType = unitTypeSelect.value;
  populateUnitDropdowns(initialType);
  updateConversion();
  