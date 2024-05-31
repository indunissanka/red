function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1'); // Ensure 'Sheet1' matches your sheet name
  const data = JSON.parse(e.postData.contents);
  
  const skuPrefix = 'SKU20'; // Prefix for SKU codes
  const skuSuffix = Utilities.formatDate(new Date(data.deliveryDate), Session.getScriptTimeZone(), 'yyyy-MM-dd'); // Suffix based on delivery date
  
  const sku1 = `${skuPrefix}-P1-${skuSuffix}`;
  const sku2 = `${skuPrefix}-P2-${skuSuffix}`;
  const sku3 = `${skuPrefix}-P3-${skuSuffix}`;
  
  const newRow = [
    data.name,
    data.tel,
    data.email,
    data.product1Quantity,
    data.product2Quantity,
    data.product3Quantity,
    data.deliveryDate,
    data.grandTotal,
    sku1,
    sku2,
    sku3
  ];
  
  sheet.appendRow(newRow);
  
  const recipientEmail = data.email;
  const subject = 'Confirmation of Form Submission';
  const message = `
    <p>Thank you for submitting the form. Your order has been received.</p>
    <p><strong>Quantity of Product 1:</strong> ${data.product1Quantity} (SKU: ${sku1})</p>
    <p><strong>Quantity of Product 2:</strong> ${data.product2Quantity} (SKU: ${sku2})</p>
    <p><strong>Quantity of Product 3:</strong> ${data.product3Quantity} (SKU: ${sku3})</p>
    <p><strong>Subtotal:</strong> $${data.grandTotal}</p>
    <p><strong>Grand Total:</strong> $${data.grandTotal}</p>
  `;
  
  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    htmlBody: message
  });
  
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
}
