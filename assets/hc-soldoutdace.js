/** Shopify CDN: Minification failed

Line 17:0 Transforming let to the configured target environment ("es5") is not supported yet
Line 21:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 21:8 Transforming destructuring to the configured target environment ("es5") is not supported yet
Line 30:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 30:8 Transforming destructuring to the configured target environment ("es5") is not supported yet
Line 39:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 40:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 41:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 43:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 45:2 Transforming const to the configured target environment ("es5") is not supported yet
... and 34 more hidden warnings

**/
// hc-soldout V1.4.2
let HcDOMContentLoaded = false;
window.addEventListener('DOMContentLoaded', e => HcDOMContentLoaded = true);

function HcUpdateCrossedOut(opts) { 
  const {
    variants, // {{ product.variants | json }}
    options, // {{ product.options | json }}
    optionNames, // ['Size'] the options to update
    selectors, // Selectors
    onDisable,
    hierarchy: isHierarchical
  } = opts;
  
  const {
    radioAllElements: radioAllSelector, // A selector to match all the radio buttons
    radioElement: radioSelector, // the input element with the swatch (index: number): string
    radioContainer: swatchSelector, // the parent of the radio button to update 
    // OR
    selectorElement,
    anySelectorElement,
  } = selectors; 

  const customDisabler = typeof onDisable == 'function' && onDisable;
  const DEFAULT_RADIO_DISABLER = (el, shouldDisable) => el.closest(swatchSelector).classList.toggle('hc-soldout-option', shouldDisable);
  const DEFAULT_SELECT_DISABLER = (el, shouldDisable) => el.style.display = shouldDisable ? 'none' : 'block';

  const disablerFn = customDisabler || (selectorElement ? DEFAULT_SELECT_DISABLER : DEFAULT_RADIO_DISABLER);
  // Get option index by name 
  const getIndex = optionName => options.findIndex(op => op.toLowerCase() == optionName.toLowerCase())  

  // Get available option for $x in ["red", "$x", "long"] 
  function getAbsoluteAvailableOptions(options) {
    const req_index = options.findIndex(opt => opt == "$x");
    if (req_index < 0) throw new TypeError("$x must be passed to the options array");
    
    return variants
    .filter(variant => {
      for (const [index, opt] of variant.options.entries()) {
        if (!variant.available || ((options[index] !== opt && options[index] !== '$all') && index !== req_index)) return false;
      }
      return true;
    })
    .map(variant => variant.options[req_index]);
  }
  
  function getAvailableOptions(options, requestedOptionName) {
    if (isHierarchical) {      
      const req_index = options.findIndex(opt => opt == "$x");
      const reversedOrder = [...optionNames].reverse();
      for (const optionRev of reversedOrder) {
        if (optionRev == requestedOptionName) break;
        const index0 = getIndex(optionRev);
        options[index0] = '$all';
      }
      return getAbsoluteAvailableOptions(options);
    } else {
      return getAbsoluteAvailableOptions(options);
    }
  }
  
  function getAbsolutePossibleOptions(options) {
    const req_index = options.findIndex(opt => opt == "$x");
    if (req_index < 0) throw new TypeError("$x must be passed to the options array");

    return variants
    .filter(variant => {
      for (const [index, opt] of variant.options.entries()) {
        if (((options[index] !== opt && options[index] !== '$all') && index !== req_index)) return false;
      }
      return true;
    })
    .map(variant => variant.options[req_index]);
  }
  
  function getPossibleOptions(options, requestedOptionName) {
    if (isHierarchical) {      
      const req_index = options.findIndex(opt => opt == "$x");
      const reversedOrder = [...optionNames].reverse();
      for (const optionRev of reversedOrder) {
        if (optionRev == requestedOptionName) break;
        const index0 = getIndex(optionRev);
        options[index0] = '$all';
      }
      return getAbsolutePossibleOptions(options);
    } else {
      return getAbsolutePossibleOptions(options);
    }
  }
  
  // Get an array of the selected options similar to variant.options 
  const getSelectedOptions = () => options.map((name, index) => {
    const checkedSelector = selectorElement ? (selectorElement(index)) : `${radioSelector(index)}:checked`;
    const checked = document.querySelector(checkedSelector) || document.querySelector(`${radioSelector(index)}`);
    return checked.value
  });
  
  function shouldSoldoutUpdate(optionIndex, optionSelector, newlyPickedSwatchElement) {
    const isSameOption = newlyPickedSwatchElement && newlyPickedSwatchElement.querySelector(optionSelector);
    return (!isSameOption);
  }
  
  function fireUpdateEvent(optionIndex, optionSelector,availableOptions) {
    const e = new CustomEvent('hc-soldout:update',  {
      detail: {
        optionIndex, 
        optionSelector,
        availableOptions,
        optionName: options[optionIndex].toLowerCase()
      }
    });
    document.dispatchEvent(e);
  }
  
  function updateOptions(selectedOptions, changedOption) {
    debugger;
    const optionSelectors = optionNames.map(optionName => {
      const optIndex = getIndex(optionName)
      return [optIndex, selectorElement ? selectorElement(optIndex) : radioSelector(optIndex), optionName];
    }); 
    
    for (const [requestedOptionIndex, optionSelector, requestedOptionName] of optionSelectors) {
      if (!shouldSoldoutUpdate(requestedOptionIndex, optionSelector, changedOption)) continue;
      const availableValues = getAvailableOptions(selectedOptions.map((val, index) => index === requestedOptionIndex ? "$x" : val), requestedOptionName);
      const possibleValues = getPossibleOptions(selectedOptions.map((val, index) => index === requestedOptionIndex ? "$x" : val), requestedOptionName);
      let options;
      if (selectorElement) {
        options = document.querySelector(optionSelector).querySelectorAll('[value]')
      } else {
        options = document.querySelectorAll(optionSelector);
      }
      options.forEach(el => disablerFn(el, !availableValues.includes(el.getAttribute('value')), !possibleValues.includes(el.getAttribute('value'))));
      fireUpdateEvent(requestedOptionIndex, optionSelector, availableValues);
    }
  }
  
  function onLoad() {
    updateOptions(getSelectedOptions());
    document.body.addEventListener('change', e => {
      if (e.hcIgnore) return;
      if (e.target.closest(radioAllSelector) || e.target.closest(anySelectorElement)) {
        let selectedOptions;
        if (!selectedOptions) selectedOptions = getSelectedOptions();
        updateOptions(selectedOptions, e.target.closest(swatchSelector));
      }
    });
  }
  
  
  if (HcDOMContentLoaded || document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener('DOMContentLoaded', onLoad);
  }
}