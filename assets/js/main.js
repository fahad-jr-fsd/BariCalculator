// Varaible Initialization
let CheckPoint = {
  ProductTotal: false,
};
let noOfColumn_yarnDetails = 1;

let RowDetails_yarn = {
  Selected: 0,
  Template: [],
  input: [
    { name: "", price: 0, percentage: 0 },
    { name: "", price: 0, percentage: 0 },
    { name: "", price: 0, percentage: 0 },
    { name: "", price: 0, percentage: 0 },
    { name: "", price: 0, percentage: 0 },
    { name: "", price: 0, percentage: 0 },
  ],
};

const tableHead = {
  CMT: ["", "Categories", "Per PC", "Per Kg"],
  "Net Operation": ["", "Categories", "Percentages", "Per PC", "Per Kg"],
};

const RowDetails_Factory = [
  { name: "Stitching", id: "Stitching" },
  { name: "Lable", id: "Lable" },
  { name: "Stitching Thread", id: "StitchingThread" },
  { name: "Poly Bag", id: "PolyBag" },
  { name: "Zipper", id: "Zipper" },
  { name: "Velcru", id: "Velcru" },
  { name: "Elastic", id: "Elastic" },
  { name: "Tag Card", id: "TagCard" },
  { name: "Garment Wash", id: "GarmentWash" },
  { name: "Elastic Band", id: "ElasticBand" },
  { name: "Basic Carton", id: "BasicCarton" },
  { name: "Fancy Carton", id: "FancyCarton" },
  { name: "Embriodery / Print", id: "Embriodery" },
  { name: "TagPin", id: "TagPin" },
  { name: "Twill Tape", id: "Twill" },
  { name: "Belly Band", id: "BallyBand" },
  { name: "Hanger / J Hook", id: "Hanger" },
  { name: "RFID Chip / tag", id: "RFIDtag" },
  { name: "Inlay Card", id: "Inlay" },
  { name: "Bailing", id: "Bailing" },
];

const RowDetails_FactoryPack = [
  { name: "TagPin", id: "CTagPin" },
  { name: "Twill Tape", id: "CTwill" },
  { name: "Basic Carton", id: "CBasicCarton" },
  { name: "Fancy Carton", id: "CFancyCarton" },
  { name: "Hanger / J Hook", id: "CHanger" },
  { name: "RFID Chip / tag", id: "CRFIDtag" },
  { name: "Vinyl / Zipper / Button Poly Bag", id: "CPolyBag" },
  { name: "Print Bally Band / Printer Board", id: "CBallyBand" },
];

const RowDetails_Operation = [
  { name: "ToP / PP Sample", id: "Sample" },
  { name: "3rd Party Testing", id: "Testing" },
  { name: "3rd Party Inspection", id: "Inspection" },
  { name: "Sales Commission", id: "SalesCommission" },
];

const RowDetails_Finance = [
  { name: "Bad Debts", id: "Debbs" },
  { name: "Export Tax", id: "ExportTax" },
  { name: "Air Freight", id: "Freight" },
  { name: "Gross Profit", id: "GrossProfit" },
  { name: "Ocean Sea Freight", id: "CFreight" },
  { name: "Running Finance Cost", id: "Finance" },
  { name: "Domestic Port Handing", id: "Domestic" },
  { name: "Factoring / Insurance", id: "Insurance" },
  { name: "Factory Fix Over Head", id: "Factory" },
  { name: "Other Country Custom Fee", id: "CustomFee" },
  { name: "Other Country online Holding Cost", id: "HoldingCost" },
  { name: "Sales / Marketing / Exhibition", id: "Exhibition" },
  { name: "Defective Allowance (on Custom Request)", id: "DefectiveAllowance" },
];

const RowDetails_Waste = [
  { name: "Dying Process", id: "Dying" },
  { name: "Cutting / Stitching / B%", id: "B%" },
  { name: "Weaving / Knitting Yarn", id: "Weaving" },
  { name: "Sheering / Raising", id: "Shairing" },
  { name: "Yarn Dying", id: "Yarn_Dying" },
];

const RowDetails_ProductName = [
  { name: "10/S", type: "semi", list: [] },
  { name: "12/S", type: "semi", list: [] },
  { name: "16/S", type: "semi", list: [] },
  { name: "18/S", type: "Special", list: ["OE Cotton", "PC Cotton"] },
  { name: "20/S", type: "normal", list: ["Lycra"] },
  { name: "20/2", type: "normal", list: [] },
  { name: "26/S", type: "normal", list: [] },
  { name: "30/S", type: "normalSpecial", list: ["Lycra"] },
  
  { name: "20", type: "Special", list: ["Lycra"] },
  { name: "30", type: "Special", list: ["Lycra"] },
  { name: "40", type: "Special", list: ["Lycra"] },
  { name: "150/144", type: "Special", list: ["Polyester"] },
];

const Catorgies = [
  "Knitted Fitted Sheet",
  "Apparel / Bathrobes",
  "Terry Towels",
  "Blankets",
  "Mattress Cover",
];

//pages
const piece = new Piece("normal");

initiative();

// Function Call
addColumn_Catories();
addColumn_YarnMixture();
addColumn_yarnDetails(1);
addColumn_Waste();
addColumn_NetCost(RowDetails_Factory);
addColumn_OperCost();
addColumn_FinanceCost();

let currentItem = "";
Store_onChange();
// class calling

piece.toString();

function initiative() {
  let listyarn = [
    "Organic R/S",
    "Cotton R/S",
    "Cotton A/C",
    "Cotton / Poly R/C",
    "Cotton / Poly A/C",
    "Spun / Poly R/S",
  ];


  for (const element of RowDetails_ProductName) {
    if (element.type != "Special") {
        element.list = (listyarn);
        if(element.type == "semi"){
          element.list = element.list.concat("OE Cotton");
          element.list = element.list.concat("UE PC");
        }
        else if(element.type == "normalSpecial"){
          element.list = element.list.concat("Lycra");
        }
    }
  }
}


// Function Defination
function getDocument(id) {
  return document.getElementById(id);
}

function getTemplate_yarnNmae() {
  let temp = "";
  let temptext = "";

  RowDetails_ProductName.forEach((element) => {
    element.list.forEach((elements) => {
      temptext = element.name + " " + elements;
      temp += `<option value='${temptext}'>${temptext}</option>`;
    });
  });

  return temp;
}

function getTemplate_yarnMixture(sno, inputs) {
  return `
    <tr>
      <td>${sno + 1}. </td>
      <td>
          <select id="Mix${sno}Type" name="Type${sno}" placeholder="Enter Yarn ${
    sno + 1
  } name" ${inputs.name == "" ? "" : "value='" + inputs.name + "'"} >
            ${getTemplate_yarnNmae()}
          </select>
      </td>
      <td>
        <input type="number" id="Mix${sno}price" name="Rate(pound)${sno}" placeholder="Enter Yarn ${
    sno + 1
  } Cost(pound)" min="1" step="0.01"  ${
    match(inputs.price) ? "" : "value='" + inputs.price + "'"
  } onchange="onChange_yarn()" required />
      </td>
      <td><span  id="Mix${sno}priceKG">0</span></td>
      <td><input type="number" id="Mix${sno}percent" name="Percentage${sno}" placeholder="Enter %" ${
    match(inputs.percentage) ? "" : "value='" + inputs.percentage + "'"
  }" max="100" min="1" step="any" onchange="onChange_yarn()" required  />
      <td><span id="Mix${sno}total">0</span> PKR</td>
    </tr>`;

  function match(value) {
    return value == 0;
  }
}

// Create Head of the Table
function addHead_toTable(head) {
  let temp = `<thead><tr><tr><th colspan="4">${head} Cost</th></tr>`;
  for (const element of tableHead[head]) {
    element.forEach((elements) => {
      temp += `<th>${elements}</th>`;
    });
  }
  return temp + `</tr></thead>`;
}

// Product Catorgies
function addColumn_Catories() {
  let Tempate = "";

  Catorgies.forEach((element) => {
    Tempate += ` <option value='${element}' >${element}</option>`;
  });

  getDocument("ProductCategory").innerHTML += Tempate;
}

function onChange_Catories() {
  let type = getDocument("basicInfo").querySelector(
    "select[name='ProductCategory']"
  ).value;

  if (type != piece.type) {
    piece.remove();

    if (type == "Apparel / Bathrobes") piece.type = type;
    else if (type == "Mattress Cover") piece.type = "normalSpecial";
    else if (piece.type != "normal") piece.type = "normal";

    piece.toString();
  }
}

// YarnMixture
function addColumn_YarnMixture() {
  let temp = ``;
  let noOfYarn = 6;

  for (let i = 1; i <= noOfYarn; i++) {
    temp += ` <option value='${i}' >${i}</option>`;
  }
  document.getElementById("YarnMixture").innerHTML = temp;
}

// Yarn Details Table
function onChange_YarnMixture() {
  let value = getDocument("basicInfo").querySelector(
    "select[name='YarnMixture']"
  ).value;

  noOfColumn_yarnDetails = value;
  addColumn_yarnDetails(value);
}

function addColumn_yanrName() {
  for (let i = 1; i <= RowDetails_ProductName.length; i++) {}
  return temp;
}

function addColumn_yarnDetails(total) {
  let table = document.getElementById("mixtureBody");

  for (let i = 0; i < RowDetails_yarn.Selected; i++) {
    RowDetails_yarn.input[i].name = getDocument(`Mix${i}Type`).value;
    RowDetails_yarn.input[i].price = getDocument(`Mix${i}price`).value;
    RowDetails_yarn.input[i].percentage = getDocument(`Mix${i}percent`).value;
  }

  table.innerHTML = "";

  for (let i = 0; i < total; i++) {
    table.innerHTML += getTemplate_yarnMixture(i, RowDetails_yarn.input[i]);
  }
  RowDetails_yarn.Selected = total;
}

function onChange_yarn() {
  for (let i = 0; i < noOfColumn_yarnDetails; i++) {
    let kg = getDocument(`Mix${i}priceKG`);
    let Total = getDocument(`Mix${i}total`);

    kg.innerHTML = parseFloat(
      getDocument(`Mix${i}price`).value * 2.2046
    ).toFixed(2);
    Total.innerHTML = parseFloat(
      getDocument(`Mix${i}priceKG`).innerHTML *
        (getDocument(`Mix${i}percent`).value / 100)
    ).toFixed(2);
  }
  getTotal_yarn();
}

function getTotal_yarn() {
  let temp1 = 0,
    temp2 = 0;

  for (let i = 0; i < noOfColumn_yarnDetails; i++) {
    temp1 += getDocument(`Mix${i}percent`).value * 1;
    temp2 += getDocument(`Mix${i}total`).innerHTML * 1;
  }

  temp2 = parseFloat(temp2).toFixed(2);

  getDocument("TotalPercent").innerHTML = temp1;
  getDocument("Total").innerHTML = temp2;
  getDocument("Yarn_Cost").innerHTML = temp2;

  if (temp1 == 100 && temp2 > 0) {
    CheckPoint["ProductTotal"] = true;
    getDocument("TotalPercent").classList.remove("error");
  } else {
    CheckPoint["ProductTotal"] = false;
    getDocument("TotalPercent").classList.add("error");
  }

  isDisable();
}

// Production Wastages Table
function addColumn_Waste() {
  let temp;
  let WasteTable = getDocument("WasteBody");

  for (let index = 0; index < RowDetails_Waste.length; index++) {
    temp = RowDetails_Waste[index];

    WasteTable.innerHTML += `<tr>
        <td>${index + 1}</td>
        <td>${temp.name}</td>
        <td><input type="number" class="inputPercentage" id="W${
          temp.id
        }" name="W${
      temp.id
    }" placeholder="Enter Wastage Percent" step="0.01" min="0" onchange="getTotal_Waste()" required /></td>
        <td id="W${temp.id}_Cost">0</td>
      </tr>`;
  }
}

function getTotal_Waste() {
  let TotalYarn_Cost = getDocument("Total").innerHTML * 1;
  let WasteCost = 0,
    WastePercent = 0,
    temp = 0;

  for (const element of RowDetails_Waste) {
    temp = (getDocument("W" + element.id).value * 1) / 100;

    getDocument("W" + element.id + "_Cost").innerHTML = parseFloat(
      temp * TotalYarn_Cost
    ).toFixed(2);
    WastePercent += temp * 100;
    WasteCost += TotalYarn_Cost * temp;
  }

  WastePercent = parseFloat(WastePercent).toFixed(2);
  WasteCost = parseFloat(WasteCost).toFixed(2);

  getDocument("Wtotal").innerHTML = WastePercent;
  getDocument("Wtotal_Cost").innerHTML = WasteCost;
  getDocument("Waste_Cost").innerHTML = WasteCost;
}

// Peices Calculation

// Fabric Cost
function onChange_Fabric() {
  let Yarn = getDocument("Yarn_Cost").innerHTML;
  let FabriceDying = getDocument("FabriceDying").value;
  let Knitting = getDocument("Knitting").value;
  let waste = getDocument("Waste_Cost").innerHTML;

  let PerWeight = getDocument("PerWeight").value;

  let total = -(-Yarn - FabriceDying - Knitting - waste);

  getDocument("TotalCost").innerHTML = parseFloat(total).toFixed(2);
  getDocument("FabriceCost").innerHTML = parseFloat(
    total * (PerWeight / 1000)
  ).toFixed(2);

  getDocument("TotalFabricCostPer").innerHTML = parseFloat(total).toFixed(2);
  getDocument("TotalFabricCost").innerHTML = parseFloat(
    total * (PerWeight / 1000)
  ).toFixed(2);

  // Per Piece or Per Kg
  getDocument("PerPiece").innerHTML = parseFloat(PerWeight).toFixed(2);
  getDocument("Perkg").innerHTML = parseFloat(1000 / PerWeight).toFixed(2);
}

// CMT Cost
function addColumn_NetCost(items) {
  let temp;
  let NetCostTable = getDocument("NetCost");
  NetCostTable.innerHTML = "";

  // extra item
  NetCostTable.innerHTML += `<tr><td>1</td><td>Fabric Cost</td><td id="TotalFabricCost">0</td><td id="TotalFabricCostPer">0</td></tr>`;

  for (let index = 0; index < items.length; index++) {
    temp = items[index];
    NetCostTable.innerHTML += `<tr>
      <td>${index + 2}</td>
      <td>${temp.name} </td>
      <td><input type="number" onchange="onChange_NetCost()" id="${
        temp.id
      }_Piece" name="${
      temp.id
    }" placeholder="Enter Cost per Piece" min="0" step="0.01" required /></td>
      <td id="${temp.id}_kg">0</td>
    </tr>`;
  }
}

// CMT Cost
function addColumn_CMTCost(items) {
  let temp;
  let CMTCostTable = getDocument("CMTPack");
  CMTCostTable.innerHTML = "";

  for (let index = 0; index < items.length; index++) {
    temp = items[index];
    CMTCostTable.innerHTML += `<tr>
      <td>${index + 1}</td>
      <td>${temp.name} </td>
      <td><input type="number" onchange="onChange_CMTCost()" id="${
        temp.id
      }_Piece" name="${
      temp.id
    }_CMT" placeholder="Enter Cost per Pack" min="0" step="0.01" required /></td>
    </tr>`;
  }
}

function onChange_NetCost() {
  let Perkg = getDocument("Perkg").innerHTML;
  let temp = 0;
  let totalKG = 0;
  let totalPiece = 0;

  for (const element of RowDetails_Factory) {
    temp = getDocument(`${element.id}_Piece`).value;

    getDocument(`${element.id}_kg`).innerHTML = temp * Perkg;
    totalKG += temp * Perkg;
    totalPiece += temp * 1;
  }

  totalPiece += getDocument(`TotalFabricCost`).innerHTML * 1;
  totalKG += getDocument(`TotalFabricCostPer`).innerHTML * 1;

  getDocument("TotalNetCost_Piece").innerHTML =
    parseFloat(totalPiece).toFixed(2);
  if (isFinite(totalPiece)) {
    getDocument("TotalNetCost_KG").innerHTML = parseFloat(totalKG).toFixed(2);
    onChange_OperCost();
  }
}

function onChange_CMTCost() {
  let temp = 0;

  for (const element of RowDetails_FactoryPack) {
    temp += getDocument(`${element.id}_Piece`).value * 1;
  }
  if (isFinite(temp)) {
    getDocument("TotalCMTCost_Pack").innerHTML = temp;
    onChange_OperCost();
  }
}

function addColumn_OperCost() {
  let NetCostTable = getDocument("OperatingCost");
  let count = 0;
  for (const element of RowDetails_Operation) {
    NetCostTable.innerHTML += `<tr>
        <td>${++count}</td>
        <td>${element.name}</td>
        <td class="inputPercentage" >
        <input type="number" onchange="onChange_OperCost()" id="${
          element.id
        }_Percentage" name="${
      element.id
    }" placeholder="Enter %" min="0" step="0.01" required  /></td>
        <td id="${element.id}_Piece">0</td>
        <td id="${element.id}_kg">0</td>
      </tr>`;
  }

  onChange_OperCost();
}

function onChange_OperCost() {
  let NetCost_PC = getDocument("TotalNetCost_Piece").innerHTML;
  let NetCost_KG = getDocument("TotalNetCost_KG").innerHTML;

  let totalKG = 0,
    totalPiece = 0,
    temp;

  for (const element of RowDetails_Operation) {
    temp = getDocument(`${element.id}_Percentage`).value / 100;

    totalKG += temp * NetCost_KG;
    totalPiece += temp * NetCost_PC;

    getDocument(`${element.id}_Piece`).innerHTML = parseFloat(
      temp * NetCost_PC
    ).toFixed(2);
    getDocument(`${element.id}_kg`).innerHTML = parseFloat(
      temp * NetCost_KG
    ).toFixed(2);
  }

  getDocument("TotalOperatingCost_Piece").innerHTML = parseFloat(totalPiece).toFixed(2);
  if (isFinite(totalKG)) {
    getDocument("TotalOperatingCost_KG").innerHTML = parseFloat(totalKG).toFixed(2);
  }
}


function addColumn_FinanceCost() {
  let NetCostTable = getDocument("FinanceCost");
  let count = 0;
  for (const element of RowDetails_Finance) {
    NetCostTable.innerHTML += `<tr>
        <td>${++count}</td>
        <td>${element.name}</td>
        <td class="inputPercentage" >
        <input type="number" onchange="onChange_FinanceCostCost()" id="${element.id}_Percentage" name="${element.id}" placeholder="Enter %" min="0" step="0.01" required  /></td>
        <td id="${element.id}_Piece">0</td>
        <td id="${element.id}_kg">0</td>
      </tr>`;
  }

  onChange_FinanceCostCost();
}

function onChange_FinanceCostCost() {
  let OperatingCost_PC = getDocument("TotalOperatingCost_Piece").innerHTML;
  let NetCost_PC = getDocument("TotalNetCost_Piece").innerHTML;
  let _KG = getDocument("Perkg").innerHTML;
    
  let totalCost_PC = -(-OperatingCost_PC - NetCost_PC);
  let totalCost_kg = totalCost_PC * _KG;

  console.log(totalCost_PC, totalCost_kg);

  let totalKG = 0,
    totalPiece = 0,
    temp;

  for (const element of RowDetails_Finance) {
    temp = getDocument(`${element.id}_Percentage`).value / 100;

    totalKG += temp * totalCost_kg;
    totalPiece += temp * totalCost_PC;

    getDocument(`${element.id}_Piece`).innerHTML = parseFloat(
      temp * totalCost_PC
    ).toFixed(2);
    getDocument(`${element.id}_kg`).innerHTML = parseFloat(
      temp * totalCost_kg
    ).toFixed(2);
  }

  getDocument("TotalFinance_Piece").innerHTML =
    parseFloat(totalPiece).toFixed(2);
  if (isFinite(totalKG)) {
    getDocument("TotalFinance_KG").innerHTML =
      parseFloat(totalKG).toFixed(2);
  }
}



function setTotal_Finance(id, Percentage, value1, value2) {
  let result = [];

  result.push(Percentage * value1);
  result.push(Percentage * value2);

  getDocument(`${id}_PC`).innerHTML = parseFloat(result[0]).toFixed(2);
  getDocument(`${id}_KG`).innerHTML = parseFloat(result[1]).toFixed(2);

  return result;
}

function setTotal_Customer() {
  let ids_Array = ["TotalFinance", "TotalOperatingCost", "TotalNetCost"];
  let temp = 0,
    temp2 = 0;

  ids_Array.forEach((element) => {
    temp += parseInt(getDocument(`${element}_Piece`).innerHTML);
    temp2 += parseInt(getDocument(`${element}_KG`).innerHTML);
  });
}

// Other CMT Cost
function getOtherCMT() {
  let total = -(
    -getDocument("Cotton").value -
    getDocument("Marketing").innerHTML -
    getDocument("ToP/PP").innerHTML -
    getDocument("SalesCommission_COST").innerHTML
  );

  getDocument("TotalCMTExpenses").innerHTML = -(
    -total - getDocument("TotalCMT").innerHTML
  );
}

function SalesCommissiononChange() {
  getDocument("SalesCommission_COST").innerHTML =
    getDocument("FabriceCost").innerHTML *
    (getDocument("SalesCommission").value / 100);

  getOtherCMT();
}

// on pay Change
function onChangePayDays(percent) {
  getDocument("payChange").innerHTML = percent;

  let total = getDocument("TotalCMTExpenses").innerHTML;

  getDocument("ExtraPay").innerHTML = total * (percent / 100);
  getDocument("TotalPayment").innerHTML = -(
    -total - getDocument("ExtraPay").innerHTML
  );

  getDocument("TotalPaymentClient").innerHTML =
    getDocument("TotalPayment").innerHTML /
    (getDocument("PerWeight").value * 100);
}

function isDisable() {
  if (CheckPoint["ProductTotal"]) {
    getDocument("Submit").removeAttribute("disabled");
  }
}

function onChangeCurrenct() {
  let IsCurrency = getDocument("IsCurrency").checked;

  if (IsCurrency) {
    let template = `<span class="currenceyInput">
    <select name="CurrencyName" required>
      <option>Select currency</option>
      <option value="AFN">AFN - Afghan Afghani - ؋</option>
      <option value="ALL">ALL - Albanian Lek - Lek</option>
      <option value="DZD">DZD - Algerian Dinar - دج</option>
      <option value="AOA">AOA - Angolan Kwanza - Kz</option>
      <option value="ARS">ARS - Argentine Peso - $</option>
      <option value="AMD">AMD - Armenian Dram - ֏</option>
      <option value="AWG">AWG - Aruban Florin - ƒ</option>
      <option value="AUD">AUD - Australian Dollar - $</option>
      <option value="AZN">AZN - Azerbaijani Manat - m</option>
      <option value="BSD">BSD - Bahamian Dollar - B$</option>
      <option value="BHD">BHD - Bahraini Dinar - .د.ب</option>
      <option value="BDT">BDT - Bangladeshi Taka - ৳</option>
      <option value="BBD">BBD - Barbadian Dollar - Bds$</option>
      <option value="BYR">BYR - Belarusian Ruble - Br</option>
      <option value="BEF">BEF - Belgian Franc - fr</option>
      <option value="BZD">BZD - Belize Dollar - $</option>
      <option value="BMD">BMD - Bermudan Dollar - $</option>
      <option value="BTN">BTN - Bhutanese Ngultrum - Nu.</option>
      <option value="BTC">BTC - Bitcoin - ฿</option>
      <option value="BOB">BOB - Bolivian Boliviano - Bs.</option>
      <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark - KM</option>
      <option value="BWP">BWP - Botswanan Pula - P</option>
      <option value="BRL">BRL - Brazilian Real - R$</option>
      <option value="GBP">GBP - British Pound Sterling - £</option>
      <option value="BND">BND - Brunei Dollar - B$</option>
      <option value="BGN">BGN - Bulgarian Lev - Лв.</option>
      <option value="BIF">BIF - Burundian Franc - FBu</option>
      <option value="KHR">KHR - Cambodian Riel - KHR</option>
      <option value="CAD">CAD - Canadian Dollar - $</option>
      <option value="CVE">CVE - Cape Verdean Escudo - $</option>
      <option value="KYD">KYD - Cayman Islands Dollar - $</option>
      <option value="XOF">XOF - CFA Franc BCEAO - CFA</option>
      <option value="XAF">XAF - CFA Franc BEAC - FCFA</option>
      <option value="XPF">XPF - CFP Franc - ₣</option>
      <option value="CLP">CLP - Chilean Peso - $</option>
      <option value="CNY">CNY - Chinese Yuan - ¥</option>
      <option value="COP">COP - Colombian Peso - $</option>
      <option value="KMF">KMF - Comorian Franc - CF</option>
      <option value="CDF">CDF - Congolese Franc - FC</option>
      <option value="CRC">CRC - Costa Rican ColÃ³n - ₡</option>
      <option value="HRK">HRK - Croatian Kuna - kn</option>
      <option value="CUC">CUC - Cuban Convertible Peso - $, CUC</option>
      <option value="CZK">CZK - Czech Republic Koruna - Kč</option>
      <option value="DKK">DKK - Danish Krone - Kr.</option>
      <option value="DJF">DJF - Djiboutian Franc - Fdj</option>
      <option value="DOP">DOP - Dominican Peso - $</option>
      <option value="XCD">XCD - East Caribbean Dollar - $</option>
      <option value="EGP">EGP - Egyptian Pound - ج.م</option>
      <option value="ERN">ERN - Eritrean Nakfa - Nfk</option>
      <option value="EEK">EEK - Estonian Kroon - kr</option>
      <option value="ETB">ETB - Ethiopian Birr - Nkf</option>
      <option value="EUR">EUR - Euro - €</option>
      <option value="FKP">FKP - Falkland Islands Pound - £</option>
      <option value="FJD">FJD - Fijian Dollar - FJ$</option>
      <option value="GMD">GMD - Gambian Dalasi - D</option>
      <option value="GEL">GEL - Georgian Lari - ლ</option>
      <option value="DEM">DEM - German Mark - DM</option>
      <option value="GHS">GHS - Ghanaian Cedi - GH₵</option>
      <option value="GIP">GIP - Gibraltar Pound - £</option>
      <option value="GRD">GRD - Greek Drachma - ₯, Δρχ, Δρ</option>
      <option value="GTQ">GTQ - Guatemalan Quetzal - Q</option>
      <option value="GNF">GNF - Guinean Franc - FG</option>
      <option value="GYD">GYD - Guyanaese Dollar - $</option>
      <option value="HTG">HTG - Haitian Gourde - G</option>
      <option value="HNL">HNL - Honduran Lempira - L</option>
      <option value="HKD">HKD - Hong Kong Dollar - $</option>
      <option value="HUF">HUF - Hungarian Forint - Ft</option>
      <option value="ISK">ISK - Icelandic KrÃ³na - kr</option>
      <option value="INR">INR - Indian Rupee - ₹</option>
      <option value="IDR">IDR - Indonesian Rupiah - Rp</option>
      <option value="IRR">IRR - Iranian Rial - ﷼</option>
      <option value="IQD">IQD - Iraqi Dinar - د.ع</option>
      <option value="ILS">ILS - Israeli New Sheqel - ₪</option>
      <option value="ITL">ITL - Italian Lira - L,£</option>
      <option value="JMD">JMD - Jamaican Dollar - J$</option>
      <option value="JPY">JPY - Japanese Yen - ¥</option>
      <option value="JOD">JOD - Jordanian Dinar - ا.د</option>
      <option value="KZT">KZT - Kazakhstani Tenge - лв</option>
      <option value="KES">KES - Kenyan Shilling - KSh</option>
      <option value="KWD">KWD - Kuwaiti Dinar - ك.د</option>
      <option value="KGS">KGS - Kyrgystani Som - лв</option>
      <option value="LAK">LAK - Laotian Kip - ₭</option>
      <option value="LVL">LVL - Latvian Lats - Ls</option>
      <option value="LBP">LBP - Lebanese Pound - £</option>
      <option value="LSL">LSL - Lesotho Loti - L</option>
      <option value="LRD">LRD - Liberian Dollar - $</option>
      <option value="LYD">LYD - Libyan Dinar - د.ل</option>
      <option value="LTL">LTL - Lithuanian Litas - Lt</option>
      <option value="MOP">MOP - Macanese Pataca - $</option>
      <option value="MKD">MKD - Macedonian Denar - ден</option>
      <option value="MGA">MGA - Malagasy Ariary - Ar</option>
      <option value="MWK">MWK - Malawian Kwacha - MK</option>
      <option value="MYR">MYR - Malaysian Ringgit - RM</option>
      <option value="MVR">MVR - Maldivian Rufiyaa - Rf</option>
      <option value="MRO">MRO - Mauritanian Ouguiya - MRU</option>
      <option value="MUR">MUR - Mauritian Rupee - ₨</option>
      <option value="MXN">MXN - Mexican Peso - $</option>
      <option value="MDL">MDL - Moldovan Leu - L</option>
      <option value="MNT">MNT - Mongolian Tugrik - ₮</option>
      <option value="MAD">MAD - Moroccan Dirham - MAD</option>
      <option value="MZM">MZM - Mozambican Metical - MT</option>
      <option value="MMK">MMK - Myanmar Kyat - K</option>
      <option value="NAD">NAD - Namibian Dollar - $</option>
      <option value="NPR">NPR - Nepalese Rupee - ₨</option>
      <option value="ANG">ANG - Netherlands Antillean Guilder - ƒ</option>
      <option value="TWD">TWD - New Taiwan Dollar - $</option>
      <option value="NZD">NZD - New Zealand Dollar - $</option>
      <option value="NIO">NIO - Nicaraguan CÃ³rdoba - C$</option>
      <option value="NGN">NGN - Nigerian Naira - ₦</option>
      <option value="KPW">KPW - North Korean Won - ₩</option>
      <option value="NOK">NOK - Norwegian Krone - kr</option>
      <option value="OMR">OMR - Omani Rial - .ع.ر</option>
      <option value="PKR">PKR - Pakistani Rupee - ₨</option>
      <option value="PAB">PAB - Panamanian Balboa - B/.</option>
      <option value="PGK">PGK - Papua New Guinean Kina - K</option>
      <option value="PYG">PYG - Paraguayan Guarani - ₲</option>
      <option value="PEN">PEN - Peruvian Nuevo Sol - S/.</option>
      <option value="PHP">PHP - Philippine Peso - ₱</option>
      <option value="PLN">PLN - Polish Zloty - zł</option>
      <option value="QAR">QAR - Qatari Rial - ق.ر</option>
      <option value="RON">RON - Romanian Leu - lei</option>
      <option value="RUB">RUB - Russian Ruble - ₽</option>
      <option value="RWF">RWF - Rwandan Franc - FRw</option>
      <option value="SVC">SVC - Salvadoran ColÃ³n - ₡</option>
      <option value="WST">WST - Samoan Tala - SAT</option>
      <option value="SAR">SAR - Saudi Riyal - ﷼</option>
      <option value="RSD">RSD - Serbian Dinar - din</option>
      <option value="SCR">SCR - Seychellois Rupee - SRe</option>
      <option value="SLL">SLL - Sierra Leonean Leone - Le</option>
      <option value="SGD">SGD - Singapore Dollar - $</option>
      <option value="SKK">SKK - Slovak Koruna - Sk</option>
      <option value="SBD">SBD - Solomon Islands Dollar - Si$</option>
      <option value="SOS">SOS - Somali Shilling - Sh.so.</option>
      <option value="ZAR">ZAR - South African Rand - R</option>
      <option value="KRW">KRW - South Korean Won - ₩</option>
      <option value="XDR">XDR - Special Drawing Rights - SDR</option>
      <option value="LKR">LKR - Sri Lankan Rupee - Rs</option>
      <option value="SHP">SHP - St. Helena Pound - £</option>
      <option value="SDG">SDG - Sudanese Pound - .س.ج</option>
      <option value="SRD">SRD - Surinamese Dollar - $</option>
      <option value="SZL">SZL - Swazi Lilangeni - E</option>
      <option value="SEK">SEK - Swedish Krona - kr</option>
      <option value="CHF">CHF - Swiss Franc - CHf</option>
      <option value="SYP">SYP - Syrian Pound - LS</option>
      <option value="STD">STD - São Tomé and Príncipe Dobra - Db</option>
      <option value="TJS">TJS - Tajikistani Somoni - SM</option>
      <option value="TZS">TZS - Tanzanian Shilling - TSh</option>
      <option value="THB">THB - Thai Baht - ฿</option>
      <option value="TOP">TOP - Tongan pa'anga - $</option>
      <option value="TTD">TTD - Trinidad & Tobago Dollar - $</option>
      <option value="TND">TND - Tunisian Dinar - ت.د</option>
      <option value="TRY">TRY - Turkish Lira - ₺</option>
      <option value="TMT">TMT - Turkmenistani Manat - T</option>
      <option value="UGX">UGX - Ugandan Shilling - USh</option>
      <option value="UAH">UAH - Ukrainian Hryvnia - ₴</option>
      <option value="AED">AED - United Arab Emirates Dirham - إ.د</option>
      <option value="UYU">UYU - Uruguayan Peso - $</option>
      <option value="USD">USD - US Dollar - $</option>
      <option value="UZS">UZS - Uzbekistan Som - лв</option>
      <option value="VUV">VUV - Vanuatu Vatu - VT</option>
      <option value="VEF">VEF - Venezuelan BolÃ­var - Bs</option>
      <option value="VND">VND - Vietnamese Dong - ₫</option>
      <option value="YER">YER - Yemeni Rial - ﷼</option>
      <option value="ZMK">ZMK - Zambian Kwacha - ZK</option>
      </select>
        <input type="number" placeholder="Enter Currency rate" min="1" step="0.01" name="CurrencyRate" />
      </span>`;
    getDocument(
      "IsCurrency"
    ).parentElement.parentElement.lastElementChild.innerHTML = template;
  } else {
    getDocument(
      "IsCurrency"
    ).parentElement.parentElement.lastElementChild.innerHTML = "";
  }
}
