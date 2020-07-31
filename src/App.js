import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Currency from "./Currency";

const baseUrl = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOption([data.base, ...Object.keys(data.rates)]);
        setFromCurrency([data.base]);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${baseUrl}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((resp) => resp.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handelFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handelToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <Header />
      <div className="currency">
        <Currency
          currencyOption={currencyOption}
          selectCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handelFromAmountChange}
          amount={fromAmount}
        />
        <p className="span"> = </p>
        <Currency
          currencyOption={currencyOption}
          selectCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handelToAmountChange}
          amount={toAmount}
        />
      </div>
    </>
  );
}

export default App;
