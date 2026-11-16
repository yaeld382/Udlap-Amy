// Google Sheets > Extensiones > Apps Script. Pega este código y publícalo como "Aplicación web".
var HOJA = "Registros";
function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);
  if (sh.getLastRow() === 0) sh.appendRow(["Fecha", "Kg", "Litros ahorrados", "Punto de acopio", "ID dispositivo"]);
  return sh;
}
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var kg = Math.min(Math.max(Number(d.kg) || 0, 0), 50);
  if (kg > 0) hoja_().appendRow([new Date(), kg, kg * 20, String(d.punto || ""), String(d.id || "")]);
  return ContentService.createTextOutput("ok");
}
function doGet() {
  var sh = hoja_(), n = sh.getLastRow() - 1, kg = 0;
  if (n > 0) sh.getRange(2, 2, n, 1).getValues().forEach(function (r) { kg += Number(r[0]) || 0; });
  return ContentService.createTextOutput(JSON.stringify({ kg: kg, reg: Math.max(n, 0) })).setMimeType(ContentService.MimeType.JSON);
}
