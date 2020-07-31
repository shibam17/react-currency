import React from "react";
import style from "./currency.module.css";

const Currency = (props) => {
  const {
    currencyOption,
    selectCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  console.log(props)
  return (
    <div>
      <input
        type="number"
        className={style.inputBox}
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {currencyOption.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Currency;
