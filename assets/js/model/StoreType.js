const RowDetails_PackStock = [
  {name: "Pack Size",                  id:"PackSize"},
]

class StoreType{
  constructor (type){
    this.type = type; 
    this.template = "";
  }

  getTemplate(){
      if(this.type == "Open Stock"){
        this.template = `
        <div class="col col-md-12">
          <table class="table table-bordered" cellspacing="0">
            <thead>
              <tr>
                <th colspan="3">9. Stock Information</th>
              </tr>
              <tr>
                <th></th>
                <th>Categories</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Stock Type</td>
                <td>
                  <input class="inlineStock" value="Open Stock" name="Stock" type="radio" onclick="Store_onChange(true)" Checked/> <label>Open Stock</label>
                  <input class="inlineStock"  value="Per Pack"  name="Stock" type="radio" onclick="Store_onChange(false)"/><label>Per Pack</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      }else{
        this.template = `
        <div class="col col-md-12">
          <table class="table table-bordered" cellspacing="0">
            <thead>
              <tr>
                <th colspan="3">9. Stock Information</th>
              </tr>
              <tr>
                <th></th>
                <th>Categories</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="StockDetails">
              <tr>
                <td>1</td>
                <td>Stock Type</td>
                <td>
                  <input class="inlineStock" value="Open Stock" name="Stock" type="radio" onclick="Store_onChange(true)"/> <label>Open Stock</label>
                  <input class="inlineStock"  value="Per Pack"  name="Stock" type="radio" onclick="Store_onChange(false)" Checked/><label>Per Pack</label>
                </td>
              </tr>
              <tr>
              <td>2</td>
                <td>Per Pack Size</td>
                <td>
                  <input name="PackSize" type="number" placeholder="Enter Pack Size" required />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      }
  }

  toString(){
    this.getTemplate();
    getDocument("Stock").innerHTML = this.template;
  }

}

// const storeType = new StoreType("Open Stock")


function Store_onChange(){
  let match = getDocument("basicInfo").querySelector("select[name='StockType']").value == "Open Stock" ? true : false;
  if(currentItem != getDocument("basicInfo").querySelector("select[name='StockType']").value){
    if(match){
      RowDetails_Factory.push(     
          {name: "TagPin",                  id:"TagPin"}, 
          {name: "Poly Bag",                id:"PolyBag"}, 
          {name: "Twill Tape",              id:"Twill"}, 
          {name: "Bally Band",              id:"BallyBand"}, 
          {name: "Hanger / J Hook",         id:"Hanger"}, 
          {name: "RFID Chip / tag",         id:"RFIDtag"}, 
      );
  
      addColumn_NetCost(RowDetails_Factory);
      getDocument("CMT_Pack").style.display = "none";
  
    }else{

      getDocument("CMT_Pack").style.display = "inline";
  
      let sub = RowDetails_Factory.splice(12, 6);
      
      addColumn_NetCost(RowDetails_Factory);
      addColumn_CMTCost(sub);
    }
    currentItem = getDocument("basicInfo").querySelector("select[name='StockType']").value;
  }

  // storeType.toString();
}