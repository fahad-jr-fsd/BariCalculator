



// Varaible Initialization
let CheckPoint = {
  "ProductTotal": false,
}
let noOfColumn_yarnDetails = 1;


let RowDetails_yarn = {
  Selected: 0,
  Template: [],
  input: [
    {name: "", price: 0, percentage: 0},
    {name: "", price: 0, percentage: 0}, 
    {name: "", price: 0, percentage: 0}, 
    {name: "", price: 0, percentage: 0}, 
    {name: "", price: 0, percentage: 0}, 
    {name: "", price: 0, percentage: 0}
  ],
};

const tableHead = {
  "CMT": ["", "Categories", "Per PC", "Per Kg"],
  "Net Operation": ["", "Categories", "Percentages","Per PC", "Per Kg"]
}


const RowDetails_Factory = [
  {name: "Lable",                   id:"Lable"}, 
  {name: "Zipper",                  id:"Zipper"}, 
  {name: "Velcru",                  id:"Velcru"}, 
  {name: "Elastic",                 id:"Elastic"}, 
  {name: "Tag Card",                id:"TagCard"}, 
  {name: "Stitching",               id:"Stitching"}, 
  {name: "Garment Wash",            id:"GarmentWash"},
  {name: "Elastic Band",            id:"ElasticBand"}, 
  {name: "Basic Carton",            id:"BasicCarton"}, 
  {name: "Fancy Carton",            id:"FancyCarton"}, 
  {name: "Stitching Thread",        id:"StitchingThread"},
  {name: "Embriodery / Print",      id:"Embriodery"}, 
];

const RowDetails_FactoryPack = [ 
  {name: "TagPin",                  id:"TagPin"}, 
  {name: "Poly Bag",                id:"PolyBag"}, 
  {name: "Twill Tape",              id:"Twill"}, 
  {name: "Bally Band",              id:"BallyBand"}, 
  {name: "Hanger / J Hook",         id:"Hanger"}, 
  {name: "RFID Chip / tag",         id:"RFIDtag"}, 
];

const RowDetails_Operation = [
  {name: "3rd Party Inspection",             id:"Inspection"}, 
  {name: "3rd Party Testing",                id:"Testing"},
  {name: "ToP / PP Sample",                  id:"Sample"}, 
  {name: "Factory Fix Over Head",            id:"Factory"}, 
  {name: "Sales / Marteking / Exhibition",   id:"Exhibition"}, 
  {name: "Dosmestic Port Handing",           id:"Dosmestic"}, 
  {name: "Export Tax",                       id:"ExportTax"}, 
  {name: "Sales Commission",                 id:"SalesCommission"},   
];


const RowDetails_Waste = [
  {name: "Dying Process",           id:"Dying"},
  {name: "Cutting / Stitching / B", id:"B%"}, 
  {name: "Weaving / Knitting Yarn", id:"Weaving"}, 
  {name: "Yarn Dying",              id:"Yarn_Dying"}, 
  {name: "Shairing",                id:"Shairing"}, 
];



const Catorgies = ["Fitted Sheet", "Towels", "Blanket","Mattress Cover", "Apparel"];


//pages 
const piece = new Piece("normal")

// Function Call
addColumn_Catories(true);
addColumn_YarnMixture();
addColumn_yarnDetails(1);
addColumn_Waste();
addColumn_NetCost(RowDetails_Factory);
addColumn_OperCost();
let currentItem = "";
Store_onChange();


// class calling

piece.toString();
storeType.toString();

// Function Defination
function getDocument(id) {
  return document.getElementById(id);
}

function getTemplate_yarnMixture(sno, inputs){
  return`
    <tr>
      <td>${sno+1}. </td>
      <td>
          <input type="text" id="Mix${sno}Type" name="Type${sno}" placeholder="Enter Yarn ${sno + 1} name" ${inputs.name == "" ? "":"value='"+inputs.name+"'"} required />
      </td>
      <td>
        <input type="number" id="Mix${sno}price" name="Rate(pound)${sno}" placeholder="Enter Yarn ${sno + 1} Cost(pound)" min="1" step="0.01"  ${match(inputs.price) ? "":"value='"+inputs.price+"'"} onchange="onChange_yarn()" required />
      </td>
      <td><span  id="Mix${sno}priceKG">0</span></td>
      <td><input type="number" id="Mix${sno}percent" name="Percentage${sno}" placeholder="Enter %" ${match(inputs.percentage) ? "": "value='"+inputs.percentage+"'"}" max="100" min="1" step="any" onchange="onChange_yarn()" required  />
      <td><span id="Mix${sno}total">0</span> PKR</td>
    </tr>`;

  function match(value){
    return value == 0;
  }
}


// Create Head of the Table
function addHead_toTable(head){
  let temp = `<thead><tr><tr><th colspan="4">${head} Cost</th></tr>`;
  for (const element of tableHead[head]) {
    element.forEach(elements => {
      temp += `<th>${elements}</th>`;
    });
  }
  return temp + `</tr></thead>`;
}

// Product Catorgies
function addColumn_Catories(params) {
  let Tempate = "";
  
  
  if(params){
    Catorgies.forEach(element => {
      Tempate += `
      <span class="RadioCatorgy">
        <input type='radio' name='Product' value='${element}' onclick="onChange_Catories('${element}')" required />
        <label for='${element}'>${element}</label>
      </span>` 
    });
  } 
  document.getElementById("ProductCategor").innerHTML = (Tempate);
}

function onChange_Catories(type){
  if(type != piece.type){
    piece.remove();

    if(type == "Apparel")
      piece.type = "Apparel";

    else if(type == "Mattress Cover")
      piece.type = "normalSpecial";
    
    else if(piece.type != "normal")
      piece.type = "normal";
    
    piece.toString();
  }
}

// YarnMixture 
function addColumn_YarnMixture(){
  let temp = ``;
  let noOfYarn = 6;

  for (let i = 0; i < noOfYarn; i++) {
    temp += `<span class="RadioCatorgy">
                <input type="radio" name="YarnMixture" onclick="onYarnChange(${i+1})" value="${i+1}" ${i==0 ? `checked="checked"`: `` }>
                <label for="${i+1}">${i+1}</label>
            </span>`;
  }
  document.getElementById("YarnMixtureCount").innerHTML = (temp);
}

// Yarn Details Table
function onYarnChange(value) {
  noOfColumn_yarnDetails = value;
  addColumn_yarnDetails(value);
}

function addColumn_yarnDetails(total) {
  let table = document.getElementById("mixtureBody");
  
  for (let i = 0; i < RowDetails_yarn.Selected; i++){
    RowDetails_yarn.input[i].name = getDocument(`Mix${i}Type`).value;
    RowDetails_yarn.input[i].price = getDocument(`Mix${i}price`).value;
    RowDetails_yarn.input[i].percentage = getDocument(`Mix${i}percent`).value;
  }

  table.innerHTML = "";
  
  for (let i = 0; i < total; i++){
    table.innerHTML += getTemplate_yarnMixture(i, RowDetails_yarn.input[i]);
  }
  RowDetails_yarn.Selected = total;
}

function onChange_yarn() {
  for (let i = 0; i < noOfColumn_yarnDetails; i++) {
    let kg = getDocument(`Mix${i}priceKG`);
    let Total = getDocument(`Mix${i}total`);

    kg.innerHTML = parseFloat((getDocument(`Mix${i}price`).value * 2.2046)).toFixed(2);
    Total.innerHTML = parseFloat(getDocument(`Mix${i}priceKG`).innerHTML * (getDocument(`Mix${i}percent`).value /100)).toFixed(2);
  }
  getTotal_yarn();
}

function getTotal_yarn() {
  let temp1 = 0, temp2 = 0;

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

  } else{
    CheckPoint["ProductTotal"] = false;
    getDocument("TotalPercent").classList.add("error");
  }

  isDisable();
}

// Production Wastages Table
function addColumn_Waste(){
  let temp;
  let WasteTable = getDocument("WasteBody"); 

  for (let index = 0; index < RowDetails_Waste.length; index++) {
      temp = RowDetails_Waste[index];

      WasteTable.innerHTML += `<tr>
        <td>${(index+1)}</td>
        <td>${temp.name}</td>
        <td><span> <input type="number" class="inputPercentage" id="W${temp.id}" name="W${temp.id}" placeholder="Enter Wastage Percent" step="0.01" min="0" onchange="getTotal_Waste()" required /> %</span></td>
        <td id="W${temp.id}_Cost">0</td>
      </tr>`;
  }

}

function getTotal_Waste() {
  let TotalYarn_Cost = getDocument("Total").innerHTML * 1;
  let WasteCost = 0, WastePercent = 0, temp = 0;

  for (const element of RowDetails_Waste) {
    temp = (getDocument("W"+element.id).value * 1) / 100;

    getDocument("W"+element.id+"_Cost").innerHTML = parseFloat(temp * TotalYarn_Cost).toFixed(2);    
    WastePercent += temp * 100;
    WasteCost += (TotalYarn_Cost * temp);
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
  getDocument("FabriceCost").innerHTML = parseFloat(total * (PerWeight / 1000)).toFixed(2);
  
  getDocument("TotalFabricCostPer").innerHTML = parseFloat(total).toFixed(2);
  getDocument("TotalFabricCost").innerHTML = parseFloat(total * (PerWeight / 1000)).toFixed(2);
  
  // Per Piece or Per Kg
  getDocument("PerPiece").innerHTML =  parseFloat(PerWeight).toFixed(2);
  getDocument("Perkg").innerHTML = parseFloat(1000/PerWeight).toFixed(2);
}

// CMT Cost
function addColumn_NetCost(items){
  let temp;
  let NetCostTable = getDocument("NetCost");
  NetCostTable.innerHTML = "";

  // extra item
  NetCostTable.innerHTML += `<tr><td>1</td><td>Fabric Cost</td><td id="TotalFabricCost">0</td><td id="TotalFabricCostPer">0</td></tr>`;

  for (let index = 0; index < items.length; index++) {
    temp = items[index]; 
    NetCostTable.innerHTML += `<tr>
      <td>${(index+2)}</td>
      <td>${temp.name} </td>
      <td><input type="number" onchange="onChange_NetCost()" id="${temp.id}_Piece" name="${temp.id}" placeholder="Enter Cost per Piece" min="0" step="0.01" required /></td>
      <td id="${temp.id}_kg">0</td>
    </tr>`;
  }
}

// CMT Cost
function addColumn_CMTCost(items){
  let temp;
  let CMTCostTable = getDocument("CMTPack");
  CMTCostTable.innerHTML = "";

  for (let index = 0; index < items.length; index++) {
    temp = items[index]; 
    CMTCostTable.innerHTML += `<tr>
      <td>${(index+1)}</td>
      <td>${temp.name} </td>
      <td><input type="number" onchange="onChange_CMTCost()" id="${temp.id}_Piece" name="${temp.id}" placeholder="Enter Cost per Pack" min="0" step="0.01" required /></td>
    </tr>`;
  }
}

function onChange_NetCost(){
  let Perkg = getDocument("Perkg").innerHTML;
  let temp = 0;
  let totalKG = 0;
  let totalPiece = 0;
  
  for (const element of RowDetails_Factory) {
    temp = getDocument(`${element.id}_Piece`).value;
    
    getDocument(`${element.id}_kg`).innerHTML = temp * Perkg;
    totalKG += temp * Perkg;
    totalPiece += temp*1;
  }

  totalPiece += (getDocument(`TotalFabricCost`).innerHTML*1);
  totalKG += (getDocument(`TotalFabricCostPer`).innerHTML*1);


  getDocument("TotalNetCost_Piece").innerHTML = totalPiece;
  if(isFinite(totalPiece)){
    getDocument("TotalNetCost_KG").innerHTML = totalKG;
    onChange_OperCost();
  }
}

function onChange_CMTCost(){
  let temp = 0;

  
  for (const element of RowDetails_FactoryPack) {
    temp += (getDocument(`${element.id}_Piece`).value * 1);
  }
  if(isFinite(temp)){
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
        <input type="number" onchange="onChange_OperCost()" id="${element.id}_Percentage" name="${element.id}" placeholder="Enter %" min="0" step="0.01" required  /> %</td>
        <td id="${element.id}_Piece">0</td>
        <td id="${element.id}_kg">0</td>
      </tr>`;
  }

  onChange_OperCost();
}

function onChange_OperCost(){
  let NetCost_PC = getDocument("TotalNetCost_Piece").innerHTML;
  let NetCost_KG = getDocument("TotalNetCost_KG").innerHTML;
  
  let totalKG = 0, totalPiece = 0, temp;
  
  for (const element of RowDetails_Operation) {
    temp = (getDocument(`${element.id}_Percentage`).value / 100);
    
    totalKG += temp * NetCost_KG;
    totalPiece += temp * NetCost_PC;


    getDocument(`${element.id}_Piece`).innerHTML = parseFloat(temp * NetCost_PC).toFixed(2);
    getDocument(`${element.id}_kg`).innerHTML = parseFloat(temp * NetCost_KG).toFixed(2);
  }


  getDocument("TotalOperatingCost_Piece").innerHTML = parseFloat(totalPiece).toFixed(2);
  if(isFinite(totalKG)){
    getDocument("TotalOperatingCost_KG").innerHTML = parseFloat(totalKG).toFixed(2);
    getTotal_Finance();
  }

}

function getTotal_Finance() {

  let TotalPC = -(- getDocument("TotalOperatingCost_Piece").innerHTML - getDocument("TotalNetCost_Piece").innerHTML);
  let TotalKG = -(- getDocument("TotalOperatingCost_KG").innerHTML - getDocument("TotalNetCost_KG").innerHTML); 

  let totalResult = [];

  totalResult.push( setTotal_Finance("Finance",(getDocument("Finance_Percentage").value / 100), TotalPC, TotalKG) );
  totalResult.push( setTotal_Finance("GP",(getDocument("GP_Percentage").value / 100), TotalPC, TotalKG) );
  totalResult.push( setTotal_Finance("Payment",( getDocument("Payment_Percentage").value / 100), TotalPC, TotalKG) );

  getDocument("TotalFinance_Piece").innerHTML = parseFloat(totalResult[0][0] + totalResult[1][0] + totalResult[2][0]).toFixed(2);
  getDocument("TotalFinance_KG").innerHTML =  parseFloat(totalResult[0][1] + totalResult[1][1] + totalResult[2][1]).toFixed(2);
  
  
  setTotal_Customer();
}

function setTotal_Finance(id, Percentage, value1, value2){
  let result = [];
  
  result.push(Percentage * value1)
  result.push(Percentage * value2)

  getDocument(`${id}_PC`).innerHTML = parseFloat(result[0]).toFixed(2);
  getDocument(`${id}_KG`).innerHTML = parseFloat(result[1]).toFixed(2);

  return result;
}

function setTotal_Customer(){
  let ids_Array = ["TotalFinance", "TotalOperatingCost", "TotalNetCost"];
  let temp = 0, temp2 = 0;

  ids_Array.forEach(element => {
    temp += parseInt(getDocument(`${element}_Piece`).innerHTML)
    temp2 += parseInt(getDocument(`${element}_KG`).innerHTML)
  });

  getDocument(`TotalFOBCost_Piece`).innerHTML = temp;
  getDocument(`TotalFOBCost_KG`).innerHTML = temp2;
}

// Other CMT Cost
function getOtherCMT(){
  let total = - (-getDocument("Cotton").value - getDocument("Marketing").innerHTML - getDocument("ToP/PP").innerHTML - getDocument("SalesCommission_COST").innerHTML);
  
  getDocument("TotalCMTExpenses").innerHTML = -(-total - getDocument("TotalCMT").innerHTML);
}

function SalesCommissiononChange(){
  getDocument("SalesCommission_COST").innerHTML = getDocument("FabriceCost").innerHTML * (getDocument("SalesCommission").value / 100);
  
  getOtherCMT();
}

// on pay Change
function onChangePayDays(percent){
  getDocument("payChange").innerHTML = percent;
  
  let total = getDocument("TotalCMTExpenses").innerHTML;

  getDocument("ExtraPay").innerHTML = (total * (percent / 100));
  getDocument("TotalPayment").innerHTML = -(-total - getDocument("ExtraPay").innerHTML);

  getDocument("TotalPaymentClient").innerHTML  = getDocument("TotalPayment").innerHTML / ( getDocument("PerWeight").value * 100);
}


function isDisable() {
  if (CheckPoint["ProductTotal"]) {
    getDocument("Submit").removeAttribute("disabled");
  }
}

function onChangeCurrenct() {
  let currency = getDocument("currency");
  let IsCurrency = getDocument("IsCurrency").checked;
  
  
  console.log(IsCurrency);

  if (IsCurrency) {
    (currency.childNodes[1]).removeAttribute("disabled");
    (currency.childNodes[3]).removeAttribute("disabled");

  }else{
    (currency.childNodes[1]).value = "";
    (currency.childNodes[3]).value = "";
    (currency.childNodes[1]).setAttribute("disable", "disabled");
    (currency.childNodes[3]).setAttribute("disable", "disabled");  
  }
}

