const dbMethods = require('../lib/dbMethods');
const formatText = require('../lib/formatText');
const ft = new formatText();
function view(req,res,collection){
	  const dbc = new dbMethods(req,collection);
          dbc.fetchByUrl(formatDate=true).then(function(fetchedData){
              if(dbc.exists()){
                  data = fetchedData;
                  if(dbc.url_query=='howtouse'){
                    res.render('view_text',data);
                    return;
                  }
                  const purify = ft.purify(data.text_body);
                  data.text_body = ft.applyAll(purify);
		  data.meta_information = ft.formatHashtags(data.meta_information);
                  res.render('view_text',data);
              }else{
                  res.send("Nothing found here!!");
              };
	 })
}

module.exports = view;
