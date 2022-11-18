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
  });
  //.catch(erorr => printError(error));
}
function printConversion(data) {
  console.log(data.conversion_rates);
  let currency = document.getElementById("currency").value;
  document.getElementById("response").innerHTML = data.conversion_rates[currency];
}

function handleSubmission(e){
  e.preventDefault();
  getAPIData();

}

window.addEventListener("load", function() {
  let currencies = ['EUR', 'JPY', 'GBP', 'CNY', 'AUD'];
  currencies.forEach(function(element) {
    const option = document.createElement('option');
    option.value = element;
    option.innerText = element;
    document.getElementById('currency').append(option);
  });
  this.document.getElementById("currency-form").addEventListener('submit', handleSubmission);
});