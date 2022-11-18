export default class CurrencyService {
  static async getCurrency(){
    let response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGER_KEY}/latest/USD`);
    let responseJson = await response.json();

    if(!response.ok){
      const errorMessage = `${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return responseJson;

  } catch (error) {
    return error;
  }
}