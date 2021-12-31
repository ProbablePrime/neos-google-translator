// Called when our Logix Gadget, runs "Get String". e contains various properties asociated with the request.
function doGet(e) {

  // e contains parameters, if we have no parameters, let the user know something is wrong. 
  if (!e || !e.parameter) return ContentService.createTextOutput("Error: No parameters were sent.");
  
  var p = e.parameter;

  // If we don't have the parameters we need, let the user know
  if (!p.source || !p.target || !p.text) return ContentService.createTextOutput("Error: Missing parameters");

  // If the source language and target language are the same, let the user know something is wrong.
  if (p.source === p.target) return ContentService.createTextOutput("Error: Source and target language, cannot be the same.");

  // Wrap the translation in a try catch so errors don't puke HTML into the gadget.
  try {
    // Translate the text.
    var translatedText = LanguageApp.translate(p.text, p.source, p.target);

    // Return the result as text
    return ContentService.createTextOutput(translatedText);
  } catch(e) {
    // Let the user know something went wrong.
    return ContentService.createTextOutput("Error: Couldn't translate text.");
  }
}
