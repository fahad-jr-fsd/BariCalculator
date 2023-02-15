const RowDetails_PackStock = [
  {name: "Pack Size",                  id:"PackSize"},
]

class StoreType{
  constructor (type){
    this.type = type; 
    this.template = "";
  }

  getTemplate(){

  }

  toString(){
    this.getTemplate();
    getDocument("Stock").innerHTML = this.template;
  }

}

// const storeType = new StoreType("Open Stock")


function Store_onChange(){
  let dom = getDocument("basicInfo").querySelector("select[name='StockType']")
  let match = dom.value == "Open Stock" ? true : false;
  if(currentItem != dom.value){
      getDocument("CMT_Pack").style.display = match ? "none": "inline";
      match ? console.log("ddds"): addColumn_CMTCost(RowDetails_FactoryPack);
      currentItem = dom.value;
  }

}