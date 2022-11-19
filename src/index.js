import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-service';
function getAPIData(currency){
  CurrencyService.getCurrency(currency)
  .then(response => {
    if(response instanceof Error) {
      const errorMsg = `There was a problem accessing the data from Currency Exchange API: ${response.message}`;
      throw new Error(errorMsg);
    }
    printConversion(response);
  })
  .catch(error => printError(error));
}

function printError(error) {
  document.getElementById('response-error').innerText = error;
}

function printConversion(data) {
  console.log(data.conversion_rates);
  let currencyFrom = document.getElementById("currency-from").value;
  let currency = document.getElementById("currency").value;
  let amount = parseInt(document.getElementById("amount").value);
  let convertedAmount = (amount * data.conversion_rates[currency]).toFixed(2);
  if(data.conversion_rates[currency] === undefined){
    const h6 = document.createElement("h6")
    h6.append(`This currency is unavailable ${currency}`);
    document.getElementById("response").append(h6);
  } else {
    const h6 = document.createElement("h6")
    h6.append(`${amount} ${currencyFrom} is ${convertedAmount} ${currency}`);
    document.getElementById("response").append(h6);
  }

  
}

function handleSubmission(e){
  e.preventDefault();
  document.getElementById("response").innerText = null;
  let currency = document.getElementById("currency-from").value;
  getAPIData(currency);

}

function addToDropDown(currencies, dropDownID){
  currencies.forEach(function(element) {
    const option = document.createElement('option');
    option.value = element;
    option.innerText = element;
    document.getElementById(dropDownID).append(option);
  
  });
}

window.addEventListener("load", function() {
  let currencies = [];
  CurrencyService.getCurrency('USD')
  .then(response => {
    if(response instanceof Error) {
      const errorMsg = `There was a problem accessing the data from Currency Exchange API: ${response.message}`;
      throw new Error(errorMsg);
    }
    //console.log(response);
    Object.keys(response.conversion_rates).forEach(key => {
      //console.log(key);
      currencies.push(key);
    });
    addToDropDown(currencies, "currency-from");
    addToDropDown(currencies, "currency");
    this.document.getElementById("currency-form").addEventListener('submit', handleSubmission);
  })
  .catch(error => printError(error));
});