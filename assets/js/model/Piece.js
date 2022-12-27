const RowDetails_Peice = [
  {name: "Per piece GSM & Spec Information",   id:"GSM"}, 
  {name: "Cut Width in cm",            id:"CutWidth"}, 
  {name: "Cut Lenght/Height in cm",    id:"CutLenght"}, 
];

const RowDetails_PeiceApparel = [
  {name: "Body / Chest",  id: "Body",  mulipltier: 2, value: 2},
  {name: "Arm",           id: "Arm",   mulipltier: 2, value: 2},
  {name: "Hood",          id: "Hood",  mulipltier: 2, value: 1},
  {name: "Pocket",        id: "Pocket",mulipltier: 2, value: 1},
  {name: "RIB Percentage",id: "RIB",   mulipltier: 1, value: 1}
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
            
            "<td colspan='2'><input type='number' id='Apparel_"+row.id+"_P' name='"+row.id+"' placeholder='Enter "+row.name+"' onchange='onChange(0)'></td>"
            }
            <td>0</td>
          </tr>
        `;
      });
      return temp;
    }
  }
  
  toString(){
    if(this.type == "normal" || this.type == "normalSpecial"){
      getDocument("row2").innerHTML = this.getTemplate() + getDocument("row2").innerHTML;
    }else{
      getDocument("row1").innerHTML += this.getTemplateApparel();
    }
  }

  // This function will remove already added piece
  remove(){
    if(this.type == "normal" || this.type == "normalSpecial"){
      getDocument("row2").removeChild(getDocument("row2").children[0]);
    }else{
      getDocument("row1").removeChild(getDocument("row1").children[1]);
    }
  }
}


// This function will be called when the user onchange on the add button
function onChange(isApparel){
  if(isApparel == 0){
    // Apparel
    let total = 0;
    RowDetails_PeiceApparel.map((item) => {
      if(item.mulipltier == 2){
        let w = getDocument("Apparel_"+item.id+"_W").value;
        let h = getDocument("Apparel_"+item.id+"_H").value;
        let t = (w * h) * item.value;
        total += t;
        getDocument("Apparel_"+item.id+"_H").parentElement.nextElementSibling.innerHTML = t;
      }
      else{
        let p = getDocument("Apparel_"+item.id+"_P").value;
        let t = (p * .01) * total;
        total += t;
        getDocument("Apparel_"+item.id+"_P").parentElement.nextElementSibling.innerHTML = t;
      }

      total = parseFloat(total).toFixed(2);

      getDocument("Total_Peices").innerHTML = total;
      getDocument("PerWeight").value = total;
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
