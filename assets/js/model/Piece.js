const RowDetails_Peice = [
  {name: "Per piece GSM & Spec Information",   id:"GSM"}, 
  {name: "Cut Width in cm",            id:"CutWidth"}, 
  {name: "Cut Lenght/Height in cm",    id:"CutLenght"}, 
];

const RowDetails_PeiceApparel = [
  {name: "Per piece GSM & Spec Information",  id: "GSM",   mulipltier: 0.5, value: 1},
  {name: "Body / Chest",                      id: "Body",  mulipltier: 2, value: 2},
  {name: "Arm",                               id: "Arm",   mulipltier: 2, value: 2},
  {name: "Hood",                              id: "Hood",  mulipltier: 2, value: 1},
  {name: "Pocket",                            id: "Pocket",mulipltier: 2, value: 1},
  {name: "RIB Percentage",                    id: "RIB",   mulipltier: 1, value: 1}
];

class Piece {
  constructor (type){
    this.type = type; 
    this.template = "";
  }

  // This function will be called when the piece is clicked
  getTemplate(){
    let type = this.type;
    return `
        <div class="col col-md-12">
        <table class="table table-bordered" cellspacing="0">
          <thead>
            <tr>
              <th colspan="3">3. Per Piece Information</th>
            </tr>

            <tr>
              <th></th>
              <th>Categories</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="PieceBody">
            ${get()}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Piece Weight</th>
              <th><span id="Total_Peices">0</span> gram</th>
            </tr>
          </tfoot>
        </table>
      </div>
    `;



    function get(){
      let temp = "";

      RowDetails_Peice.map((row, index) => {
        temp += `
          <tr>
            <td>${index + 1}</td>
            <td>${row.name}</td>
            <td>
              <input type="number" name="${row.id}" id="${row.id}" placeholder=" Enter ${row.name}" min='0'  onchange="onChange(${type == "normalSpecial" ? "2" :"1"})">
            </td>
          </tr>
        `;
      });
      return temp;
    }
  }
  
  getTemplateApparel(){
    return `
    <div class="col col-md-12">
    <table class="table table-bordered" cellspacing="0">
      <thead>
        <tr>
          <th colspan="3">3. Per Piece Information</th>
        </tr>

        <tr>
          <th></th>
          <th>Categories</th>
          <th>Width</th>
          <th>Length</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody id="PieceBody">
        ${get()}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th colspan="3">Piece Weight</th>
          <th><span id="Total_Peices">0</span> gram</th>
        </tr>
      </tfoot>
    </table>
  </div>`;


    function get(){
      let temp = "";

      RowDetails_PeiceApparel.map((row, index) => {
        temp += `
          <tr>
            <td>${index + 1}</td>
            <td>${row.name}</td>
            ${row.mulipltier == 2 ? 
            
            "<td><input type='number' id='Apparel_"+row.id+"_W' name='"+row.id+"_W' placeholder='Enter "+row.name+" Width' min='0' onchange='onChange(0)'></td>"+
            "<td><input type='number' id='Apparel_"+row.id+"_H' name='"+row.id+"_H' placeholder='Enter "+row.name+" length' min='0'  onchange='onChange(0)'></td>" : 
            
            ("<td colspan='2'><input type='number' id='Apparel_"+row.id+"_P' name='"+row.id+"' placeholder='Enter "+row.name+"' onchange='onChange(0)'></td>")
            }
            ${row.mulipltier == 0.5 ? "": "<td>0</td>"}
          </tr>
        `;
      });
      return temp;
    }
  }

  // For View purpose
  
  toString(){

    var matchArray = ["normal", "normalSpecial"];
    getDocument("row2").innerHTML = matchArray.indexOf(this.type) != -1 ? this.getTemplate() : this.getTemplateApparel();
    
  }

  // This function will remove already added piece
  remove(){
    getDocument("row2").innerHTML = "";
  }
}


// This function will be called when the user onchange on the add button
function onChange(isApparel){
  // Apparel
  if(isApparel == 0){
    let gsm = getDocument("Apparel_GSM_P").value;
    let total = 0;


    RowDetails_PeiceApparel.map((item) => {
      if(item.mulipltier == 2){
        let w = getDocument("Apparel_"+item.id+"_W").value;
        let h = getDocument("Apparel_"+item.id+"_H").value;
        let t = ((((w * h) * item.value) / 10000) * gsm);

        total += t;
        getDocument("Apparel_"+item.id+"_H").parentElement.nextElementSibling.innerHTML = parseFloat(t).toFixed(2);;
      }
      else if(item.mulipltier == 0.5){
        console.log();
      }
      else{
        let p = getDocument("Apparel_"+item.id+"_P").value;
        let t = (p * .01) * total;
        total += t;
        getDocument("Apparel_"+item.id+"_P").parentElement.nextElementSibling.innerHTML = parseFloat(t).toFixed(2);
        
      }

      getDocument("Total_Peices").innerHTML = parseFloat(total).toFixed(2);
      getDocument("PerWeight").value = parseFloat(total).toFixed(2);
    });
  }

  else{
    // Normal
    let gsm = getDocument(RowDetails_Peice[0].id).value;
    let width = getDocument(RowDetails_Peice[1].id).value;
    let height = getDocument(RowDetails_Peice[2].id).value;
    
    
    let temp = ((width * height) / 10000) * gsm;
    
    temp = parseFloat(temp * isApparel).toFixed(2);
    
    getDocument("Total_Peices").innerHTML = temp;
    getDocument("PerWeight").value = temp;
  }
}
