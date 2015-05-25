$(document).ready(function(){
	app.c.init();
});
/////////////////////////////

var app={m:{},v:{},c:{},t:{}};

/////////////////////////////


/////////////////////////////

app.c.init=function(){
  if (simpleStorage.get("replacements") === undefined){
    simpleStorage.set("replacements",[]);
  }
  app.v.init();
	app.v.listeners();
};

//////////////////////////////

app.v.init=function(){
	$("body").html(app.t.splash() );
};


app.v.listeners=function(){
  $("body").on("click","#add-another",function(){
    $("#replacements").append(app.t.replacement() );
  });

  $("body").on("click","#save",function(){

    var s = [];
    
    $("#replacements div").each(function(){
      var original =  $(this).children()[0].value;
      var replacement = $(this).children()[1].value;

      if (original && replacement){
        s.push({original:original,replacement:replacement});
      }
    });
    
    simpleStorage.set("replacements",s);

  });
};

//////////////////////////////

app.t.splash=function(){
  var d="";
  d+="<img src='icon.png' alt='counterspell icon' />";
  d+="<div class='wrapper'>";
    d+=app.t.replacements(simpleStorage.get("replacements") );
  d+="<input type='button' value='Save' id='save'></input>";
  d+="</div>";    
  return d;
};

app.t.replacements = function(replacements){
  var d = "";
  d += "<div class='thin-wrapper' id='replacements'>";
    for (var i=0;i<replacements.length;i++){
      d += app.t.replacement(replacements[i]);
    }
  d += "</div>";
  d += "<input type='button' value='add another' id='add-another'></input>";
  return d;
};

app.t.replacement = function(replacement){
  if (replacement === undefined){replacement = {original:"",replacement:""};}

  var d = "";
  d += "<div class='replacement thin-wrapper'>";
    d += "<input type='text' value='"+replacement.original+"' placeholder='curse'></input>";
    d += "<input type='text' value='"+replacement.replacement+"' placeholder='counterspell'></input>";
  d += "</div>";
  return d;
};
