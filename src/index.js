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
  this.document.getElementById("currency-form").addEventListener('submit', handleSubmission);
});