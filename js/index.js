const BASE_URL = "https://v6.exchangerate-api.com/v6/69bafb37c87a5187abbc138f/latest/PKR";

const dropDowns = document.querySelectorAll(".select");
const from_select = document.querySelector(".from_select");
const to_select = document.querySelector(".to_select");
const btn = document.querySelector(".btn-div .btn");
const result = document.querySelector(".exchange-rate");

for (let select of dropDowns) {
    for (let currCode in countryList) {
        let new_option = document.createElement("option");
        new_option.innerText = currCode;
        new_option.value = currCode;
        if (select.name === "from" && currCode === "PKR") {
            new_option.selected = "selected";
        } else if (select.name === "to" && currCode === "USD") {
            new_option.selected = "selected";
        }
        select.append(new_option);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = () => {
    let amount = document.querySelector(".amount .input");
    const fromCurrency = from_select.value;
    const toCurrency = to_select.value;

    let amountVal = amount.value;
    if (amountVal.length !== 0) {
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                let fromExchangeRate = data.conversion_rates[fromCurrency]; 
                // console.log(fromExchangeRate);
                let toExchangeRate = data.conversion_rates[toCurrency]; 
                // console.log(toExchangeRate);

                if (fromExchangeRate && toExchangeRate) {
                    const convertedAmount = (amountVal / fromExchangeRate) * toExchangeRate;
                    result.innerHTML = `${amountVal} ${fromCurrency} = ${convertedAmount.toFixed(4)} ${toCurrency}`;
                } else {
                    result.innerHTML = "Exchange rate not available.";
                }
            })
            .catch((error) => {
                console.error('Error fetching exchange rates:', error);
                result.innerHTML = "Error fetching exchange rates.";
            });
    } else {
        amount.value = "1";
        result.innerHTML = "Please enter a valid amount.";
    }
}

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
});

document.addEventListener("DOMContentLoaded" , () => {
    updateExchangeRate();
});

// window.addEventListener("load" , () => {  // aisy bhi kr skty hai ! 
//     updateExchangeRate();
// });


