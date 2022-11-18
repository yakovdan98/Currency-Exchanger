import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-service';
function getAPIData(){
  CurrencyService.getCurrency()
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
  let currency = document.getElementById("currency").value;
  let amount = parseInt(document.getElementById("amount").value);
  let convertedAmount = (amount * data.conversion_rates[currency]).toFixed(2);
  if(data.conversion_rates[currency] === undefined){
    const h6 = document.createElement("h6")
    h6.append(`This currency is unavailable ${currency}`);
    document.getElementById("response").append(h6);
  } else {
    const h6 = document.createElement("h6")
    h6.append(`${amount} USD is ${convertedAmount} ${currency}`);
    document.getElementById("response").append(h6);
  }

  
}

function handleSubmission(e){
  e.preventDefault();
  document.getElementById("response").innerText = null;
  getAPIData();

}

window.addEventListener("load", function() {
  let currencies = ['EUR', 'JPY', 'GBP', 'CNY', 'AUD', 'AAA'];
  currencies.forEach(function(element) {
    const option = document.createElement('option');
    option.value = element;
    option.innerText = element;
    document.getElementById('currency').append(option);
  });
  this.document.getElementById("currency-form").addEventListener('submit', handleSubmission);
});