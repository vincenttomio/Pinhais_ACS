// Global variables

const ss = SpreadsheetApp.getActiveSpreadsheet()

const formWS = ss.getSheetByName("Interface")
const settingsWS = ss.getSheetByName("Settings")
const dataWS = ss.getSheetByName("Data")

const idCell = formWS.getRange("D8")
const searchCell = formWS.getRange("E10")
const fieldsRange = ["F12","F14","F16","H16","G18","G19","G20","G21","G22","G23","G24"]


function saveRecord() {

  const id =  idCell.getValue()

  if(id == ""){
    createNewRecord()
    return
  }

  const cellFound = dataWS.getRange("A:A")
                    .createTextFinder(id)
                    .matchCase(true)
                    .matchEntireCell(true)
                    .findNext()

  if (!cellFound) return

  const row = cellFound.getRow()

  // const fieldsValues = fieldsRange.map( f => formWS.getRange(f).getValue())
  const fieldsValues = fieldsRange.map(f => {
  const value = formWS.getRange(f).getValue();
  return value !== "" ? value : false;
  });
  fieldsValues.unshift(id)

  dataWS.getRange(row, 1,1,fieldsValues.length).setValues([fieldsValues])

  searchCell.clearContent()

  ss.toast("Cadastro salvo!","id " + id)

}


function createNewRecord() {

  // const fieldsValues = fieldsRange.map( f => formWS.getRange(f).getValue())
  const fieldsValues = fieldsRange.map(f => {
  const value = formWS.getRange(f).getValue();
  return value !== "" ? value : false;
  });

  const nextIDcell = settingsWS.getRange("A2")
  const nextID = nextIDcell.getValue()

  fieldsValues.unshift(nextID)

  dataWS.appendRow(fieldsValues)

  idCell.setValue(nextID)

  nextIDcell.setValue(nextID+1)

  ss.toast("Cadastro criado e salvo!","id " + nextID)

}


function newRecord() {

  fieldsRange.forEach( f => formWS.getRange(f).clearContent())
  idCell.clearContent()
  searchCell.clearContent()

}


function search() {

  const searchValue = searchCell.getValue();
  const data = dataWS.getRange("A2:M").getValues();
  const recordsFound = data.filter(r => r[12] == searchValue);

  if (recordsFound.length === 0) return;

  idCell.setValue(recordsFound[0][0]);

  fieldsRange.forEach((f, i) => formWS.getRange(f).setValue(recordsFound[0][i+1]))

}



function deleteRecord() {

  const id =  idCell.getValue()

  if(id == "")return
  
  const cellFound = dataWS.getRange("A:A")
                    .createTextFinder(id)
                    .matchCase(true)
                    .matchEntireCell(true)
                    .findNext()

  if (!cellFound) return
 
  const row = cellFound.getRow()

  dataWS.deleteRow(row)
  newRecord()
  ss.toast("Cadastro Removido!","id " + id)

}














