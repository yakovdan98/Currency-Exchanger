import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-service';
function getAPIData(data){
  
}

function handleSubmission(e){
  e.preventDefault();

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