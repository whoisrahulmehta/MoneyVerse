// import logo from "./logo.svg";
import Countrylist from "./Countrylist";
import { useState, useEffect } from "react";
import Countrylisttwo from "./Countrylisttwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faExchange,
  faHandHoldingDollar,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleRadiation } from "@fortawesome/free-solid-svg-icons/faCircleRadiation";
import useFetch from "./useFetch";
import Loadingpage from "./Loadingpage";
// import Loadingpage from "./Loadingpage";

function App() {
  // const { data, error, isPending, req }= useFetch(
  //   'https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json', 0
  // );
  const { data, error, isPending } = useFetch(
    "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json",
    0
  );
  // console.log(data);
  // console.log(error);
  const [amount, setAmout] = useState(""); //inout value
  const [output, setOutput] = useState(""); // calculted final value
  //here we make a loading effect by using use effect;
  let content = document.getElementById("content");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [firstCoutry, setFirstCountry] = useState([]); // all the data from slected first field
  const getFirstCountry = (a) => {
    setFirstCountry(a);
  };
  let CountryA = firstCoutry[1];
  let FlagA = firstCoutry[0];
  let CurrencyA = firstCoutry[2];
  // second country
  const [secondCoutry, setSecondCountry] = useState([]);
  const getSecondCountry = (b) => {
    setSecondCountry(b);
  };
  let CountryB = secondCoutry[1];
  let FlagB = secondCoutry[0];
  let CurrencyB = secondCoutry[2];
  // all the selected data for second country

  useEffect(() => {
    if (data && amount && CurrencyA && CurrencyB) {
      try {
        const converted = convertCurrency(
          amount,
          CurrencyA,
          CurrencyB,
          data.eur
        );
        setOutput(converted);
      } catch (err) {
        console.error(err);
      }
    }
  }, [amount, CurrencyA, CurrencyB]); //getting the calculation

  // const handleConvert = () => {
  //   if (data && amount) {
  //     try {
  //       const converted = convertCurrency(
  //         amount,
  //         CurrencyA,
  //         CurrencyB,
  //         data.eur
  //       );
  //       setOutput(converted);
  //       console.log(`Converted amount: ${converted}`);
  //       console.log(output);
  //     } catch (err) {
  //       setOutput(err.message);
  //       console.error(err);
  //     }
  //   }
  // }; // calling the submit button

  const convertCurrency = (amount, CurrencyA, CurrencyB, rates) => {
    // console.log("Rates:", rates);
    // console.log("CurrencyA:", CurrencyA, "RateA:", rates[CurrencyA]);
    // console.log("CurrencyB:", CurrencyB, "RateB:", rates[CurrencyB]);// debugging the calculation and checking loopholes
    if (!CurrencyA || !CurrencyB || !rates) {
      throw new Error("Invalid currency codes or rates provided.");
    }
    const fromRate = parseFloat(rates[CurrencyA]);
    const toRate = parseFloat(rates[CurrencyB]);
    if (isNaN(fromRate) || isNaN(toRate)) {
      throw new Error("Invalid currency rates provided. NaN");
    }
    const convertedAmount = (parseFloat(amount) * toRate) / fromRate;
    return convertedAmount;
  }; // function that calculates all the conversion

  const handleinput = (e) => {
    let value = e.target.value;
    setAmout(value);
  }; // onchange handler for setting amount in input field

  const handleClear = (e) => {
    e.preventDefault();
    setAmout("");
    setOutput("");
  }; // clear all the data and set to default

  return (
    <div className="App">
      {loading ? (
        <Loadingpage />
      ) : (
        <div className="content" id="content">
          <header>
            <p>
              <FontAwesomeIcon icon={faHandHoldingDollar} beat />
            </p>
            <h1>
              Money<b>Verse</b>
            </h1>
          </header>
          <main>
            <div className="card">
              <div className="cardheading">
                <input
                  type="number"
                  placeholder="Please enter the Amount to exchange ..."
                  value={amount}
                  onChange={handleinput}
                  required
                  id="amountIn"
                />
                <button className="btn" type="submit" onClick={handleClear}>
                  <span>
                    <FontAwesomeIcon icon={faBroom} />
                  </span>
                </button>
              </div>
              <div className="cardimg">
                <p>
                  {FlagA ? (
                    <img src={`https://flagsapi.com/${FlagA}/flat/64.png`} />
                  ) : (
                    <img src={`https://flagsapi.com/US/flat/64.png`} />
                  )}
                </p>
                <p className="name">
                  {CountryA ? `${CountryA}` : "Select A Country"}
                </p>
                <p>
                  <label htmlFor="currency">
                    <Countrylist getCountryA={getFirstCountry} />
                  </label>
                </p>
              </div>
              <div className="cardend">
                TO{" "}
                <span>
                  <FontAwesomeIcon icon={faExchange} />
                </span>
              </div>
              <div className="cardbody">
                <p>
                  {FlagB ? (
                    <img src={`https://flagsapi.com/${FlagB}/flat/64.png`} />
                  ) : (
                    <img src={`https://flagsapi.com/IN/flat/64.png`} />
                  )}
                </p>
                <p>{CountryB ? `${CountryB}` : "Select Another Country"}</p>
                <p>
                  <label htmlFor="currency">
                    <Countrylisttwo getCountryB={getSecondCountry} />
                  </label>
                </p>
              </div>
            </div>
          </main>
          <footer>
            {!amount ? (
              <div className="result">Enter An Amount for Result </div>
            ) : (
              <div className="result">
                <p> According to the current Exchange Rate</p>
                <div className="box">
                  <p>
                    {CountryA ? (
                      <img src={`https://flagsapi.com/${FlagA}/flat/32.png`} />
                    ) : (
                      <img src={`https://flagsapi.com/US/flat/32.png`} />
                    )}
                  </p>
                  <p>
                    {CurrencyA && CurrencyA.toUpperCase()} {amount}
                    {" =  "}
                  </p>
                  <p>
                    {CountryB ? (
                      <img src={`https://flagsapi.com/${FlagB}/flat/32.png`} />
                    ) : (
                      <img src={`https://flagsapi.com/IN/flat/32.png`} />
                    )}
                  </p>
                  <p>
                    {CountryB && CurrencyB.toUpperCase()}{" "}
                    {output && Math.round(output * 100) / 100}
                  </p>
                </div>
              </div>
            )}
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
