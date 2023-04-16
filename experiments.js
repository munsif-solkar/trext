const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const dom = require('dompurify');
const {JSDOM} = require('jsdom');


// ... other setup ...
app.set('view engine', 'pug');

// Set the directory where your Pug templates are located
app.set('views', path.join(__dirname, 'views'));

const DOMPurify = dom(new JSDOM().window);

app.get('/page', (req, res) => {
  // Retrieve, sanitize, and modify the content
  var tbInnerHTML = '<i>hello</i> **world** <b>jdkj</b> <input type="text">'; // Replace with your logic to retrieve the content
  //const sanitizedContent = DOMPurify.sanitize(tbInnerHTML);
  tbInnerHTML = tbInnerHTML.replaceAll('<',"&lt;").replaceAll('>','&gt;')
  const bold_regex = /\*\*([\s\S]*?)\*\*/g;
  const result = tbInnerHTML.replace(bold_regex, "<b>$1</b>");

  // Render the Pug template and pass the result as a local variable
  res.render('page', { content: result }); // Pass the result to the 'page' template
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
