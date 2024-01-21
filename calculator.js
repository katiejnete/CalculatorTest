window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");  
  
  if (form) {
    const amountInput = document.querySelector('input[id="loan-amount"]');
    const yearsInput = document.querySelector('input[id="loan-years"]');
    const rateInput = document.querySelector('input[id="loan-rate"]');
    const span = document.querySelector('#results');
    
    if (amountInput && yearsInput && rateInput && span) {
    setupIntialValues();
    

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const amountInput = document.querySelector('input[id="loan-amount"]');
      const yearsInput = document.querySelector('input[id="loan-years"]');
      const rateInput = document.querySelector('input[id="loan-rate"]');

      if (!convertAmount(amountInput.value)) {
        const valMessage = document.querySelector('div[id="invalid-amount"]');
        valMessage.style.display = 'block';
      }
      else {
        const valMessage = document.querySelector('div[id="invalid-amount"]');
        valMessage.style.display = 'none';
      }
      if (!convertYears(yearsInput.value)) {
        const valMessage = document.querySelector('div[id="invalid-years"]');
        valMessage.style.display = 'block';
      }
      else {
        const valMessage = document.querySelector('div[id="invalid-years"]');
        valMessage.style.display = 'none';
      }
      if (!convertRate(rateInput.value)) {
        const valMessage = document.querySelector('div[id="invalid-rate"]');
        valMessage.style.display = 'block';
      }
      else {
        const valMessage = document.querySelector('div[id="invalid-rate"]');
        valMessage.style.display = 'none';
      }
      const valuesObj = {};

      update(valuesObj);
    });
  }
}
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const valuesObj = {};
  const amountInput = document.querySelector('#loan-amount');
  const yearsInput = document.querySelector('#loan-years');
  const rateInput = document.querySelector('#loan-rate');
  
  amountInput.value = '10,000';
  yearsInput.value = '5';
  rateInput.value = '10%';

  const amount = convertAmount(amountInput.value);
  const years = convertYears(yearsInput.value);
  const rate = convertRate(rateInput.value);

  valuesObj.amount = amount;
  valuesObj.years = years;
  valuesObj.rate = rate;

  calculateMonthlyPayment(valuesObj);
}

// Get the current values from the UI
// Update the monthly payment
function update(valuesObj) {
  const amountInput = document.querySelector('#loan-amount');
  const yearsInput = document.querySelector('#loan-years');
  const rateInput = document.querySelector('#loan-rate');

  const amount = convertAmount(amountInput.value);
  const years = convertYears(yearsInput.value);
  const rate = convertRate(rateInput.value);

  valuesObj.amount = amount;
  valuesObj.years = years;
  valuesObj.rate = rate;

  const span = document.querySelector('#results');
  let inner  = '';
  span.innerText = inner;
  calculateMonthlyPayment(valuesObj, inner);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(valuesObj, inner) {
  const P = valuesObj.amount;
  const n = valuesObj.years;
  const i = valuesObj.rate;

  const paymentCalc = (P * i) / (1 - Math.pow((1 + i), -n));
  const paymentNum = Math.round(paymentCalc * 100) / 100;
  const monthlyPayment = paymentNum.toFixed(2);
  updateMonthly(monthlyPayment.toString(), inner);
  return monthlyPayment.toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly, inner) {
  inner = monthly;
  const span = document.querySelector('#results');
  if (span) {
    span.innerText = `$${inner}`;
  }
}
// slice and trim amount function
function sliceTrimFunc (val, idx, lastIdx) {
  const slice = val.slice(0,idx) + val.slice(lastIdx+1);
  const trim = slice.trim();
  let str = '';
  for (i = 0; i < trim.length; i++) {
    let charValue = parseInt(trim[i]);
    if (val[i] !== ',' && !charValue && charValue !== 0 && val[i] !== '.') {
      return false;
    }
    else if (val[i] !== ',') {
      str += trim[i];
    }
  }
  return str;
}

// Check and convert amount input into float point
function convertAmount (P) {
const parsed = parseFloat(P);
  if (!P.includes('$') && !P.includes('dollar') && !parsed && parsed !== 0) {
    return false;
  }
  else if (P.includes('$')) {
    let str = '';
    for (i = 0; i < P.length; i++) {
      let charValue = parseInt(P[i]);
      if (!charValue && charValue !== 0 && P[i] !== '$' && P[i] !== '.' && P[i] !== ',') {
        return false;
      }
      else if (P[i] !== '$' && P[i] !== ',') {
        str += P[i];
      }
    }
    const parsedStr = parseFloat(str);
    return parsedStr;
  }
  else {
    if (P.includes('dollars')) {
      const idx = P.indexOf('dollars');
      const lastIdx = P.indexOf('s');  
      const str = sliceTrimFunc(P, idx, lastIdx);
      const parsedStr = parseFloat(str);
      return parsedStr;
    }
    else if (P.includes('dollar')) {
      const idx = P.indexOf('dollar');
      const lastIdx = P.indexOf('r');
      const str = sliceTrimFunc(P, idx, lastIdx);
      const parsedStr = parseFloat(str);
      return parsedStr;
    }
    else {
      let str = '';
      for (i = 0; i < P.length; i++) {
        let charValue = parseInt(P[i]);
        if (P[i] !== ',' && !charValue && charValue !== 0 && P[i] !== '$' && P[i] !== '.') {
          return false;
        }
        else if (P[i] !== ',') {
          str += P[i];
        }
      }
      const parsedStr = parseFloat(str);
      return parsedStr;
    }
  }
}

// Check and convert years input into float point
function convertYears (n) {
  const parsed = parseFloat(n);
  if (!n.includes('year') && !parsed && parsed !== 0 && !n.includes(',')) {
    return false;
  }
  else if (n.includes('years')) {
    const idx = n.indexOf('years');
    const lastIdx = n.indexOf('s');
    const str = sliceTrimFunc(n, idx, lastIdx);
    const parsedStr = parseFloat(str);
    return parsedStr;
  }
  else if (n.includes('year')) {
    const idx = n.indexOf('year');
    const lastIdx = n.indexOf('r');
    const str = sliceTrimFunc(n, idx, lastIdx);
    const parsedStr = parseFloat(str);
    return parsedStr;
  }
  else {
    let str = '';
    for (i = 0; i < n.length; i++) {
      let charValue = parseInt(n[i]);
      if (n[i] !== ',' && !charValue && charValue !== 0 && n[i] !== '.') {
        return false;
      }
      else if (n[i] !== ',') {
        str += n[i];
      }
    }
    const parsedStr = parseFloat(str);
    return parsedStr;
  }
}

// Check and convert yearly rate input into float point in hundredths place 
function convertRate (i) {
  const parsed = parseFloat(i);
  if (!i.includes('%') && !i.includes('percent') && !parsed && parsed !== 0) {
    return false;
  }
  else if (i.includes('%')) {
    const idx = i.indexOf('%');
    const lastIdx = i.indexOf('%');
    const newStr = sliceTrimFunc(i, idx, lastIdx);
    let str = '';
    for (j = 0; j < newStr.length; j++) {
      let charValue = parseInt(newStr[j]);
      if (!charValue && charValue !== 0 && i[j] !== '.') {
        return false;
      }
      else {
        str += i[j];
      }
    }
    const parsedStr = parseFloat(str);
    return convertPercent(parsedStr);
  }
  else if (i.includes('percent')) {
    const idx = i.indexOf('percent');
    const lastIdx = i.indexOf('t');
    const newStr = sliceTrimFunc(i, idx, lastIdx);
    let str = '';
    for (j = 0; j < newStr.length; j++) {
      let charValue = parseInt(newStr[j]);
      if (!charValue && charValue !== 0 && i[j] !== '.') {
        return false;
      }
      else {
        str += i[j];
      }
    }
    const parsedStr = parseFloat(str);
    return convertPercent(parsedStr);
  }
  else if (i.includes('.')) {
    let str = '';
    for (j = 0; j < i.length; j++) {
      let charValue = parseInt(i[j]);
      if (!charValue && charValue !== 0 && i[j] !== '.') {
        return false;
      }
      else {
        str += i[j];
      }
    }
    const parsedStr = parseFloat(str);
    return parsedStr;
  }
  else {
    let str = '';
    for (j = 0; j < i.length; j++) {
      let charValue = parseInt(i[j]);
      if (!charValue && charValue !== 0 && i[j] !== '.') {
        return false;
      }
      else {
        str += i[j];
      }
    }
    const parsedStr = parseFloat(str);
    return convertPercent(parsedStr);
  }
}

// Convert % or percent rates to decimal formal
function convertPercent (percent) {
  const decimal = percent / 100;
  const decPlace = Math.round(decimal * 100) / 100;
  return decPlace;
}