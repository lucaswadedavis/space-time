$(document).ready(function(){
	app.c.init();
});
/////////////////////////////

var app={m:{},v:{},c:{},t:{}};

/////////////////////////////


/////////////////////////////

app.c.init=function(){
  chrome.storage.sync.get(null,function(obj){
    if (!obj.replacements){
      obj.replacements = [];
      chrome.storage.sync.set({"replacements":[]},function(){
        console.log("initial replacements set");
      });
    }
  app.v.init(obj);
  app.v.listeners();
  });
};

app.c.save = function () {
    var s = [];
    
    $("#replacements div").each(function(){
      var original =  $(this).children()[0].value;
      var replacement = $(this).children()[1].value;

      if (original && replacement){
        s.push({original:original,replacement:replacement});
      }
    });
    
    chrome.storage.sync.set({replacements:s},function(){
        console.log('state saved');
    });

    if ($("#replacements").children().length <= s.length) {
        $("#replacements").append(app.t.replacement());
    }
};

//////////////////////////////

app.v.init=function(state){
	$("body").html(app.t.splash(state) );
    setInterval(function () {
        $("span#now-timestamp").text(moment.utc().format('X'));
        $("span#now-utc").text(moment.utc().format('YYYY/MM/DD HH:mm:ss'));
    }, 1000);
};


app.v.listeners=function(){

  $("body").on("keyup", "#replacements div .timestamp", function () {
        var timestamp = $(this)[0].value;
        var gmt = $(this).siblings('.gmt');
        if (timestamp && moment.unix(timestamp).isValid()) {
            $(gmt).val(moment.unix(timestamp).utc().format('YYYY/MM/DD HH:mm:ss'));
        } else {
            $(gmt).val('');
        }
        app.c.save();
  });

 $("body").on("keyup", "#replacements div .gmt", function () {
        var gmt = $(this)[0].value;
        var timestamp = $(this).siblings('.timestamp');
        if (gmt && moment.utc(gmt).isValid()) {
            $(timestamp).val(moment.utc(gmt).format('X'));
        } else {
            $(timestamp).val('');
        }
        app.c.save();
  });

};

//////////////////////////////

app.t.splash=function(state){
  var d="";
  d+="<h2><span id='now-timestamp'>"+moment.utc().format('X')+"</span> <span id='now-utc'>"+moment.utc().format('YYYY/MM/DD HH:mm:ss')+"</span></h2>";
  d+="<div class='wrapper'>";
    d+=app.t.replacements(state.replacements );
  d+="</div>";    
  return d;
};

app.t.replacements = function(replacements){
  var d = "";
  d += "<div class='thin-wrapper' id='replacements'>";
    for (var i=0;i<replacements.length+1;i++){
      d += app.t.replacement(replacements[i]);
    }
  d += "</div>";
  return d;
};

app.t.replacement = function(replacement){
  if (replacement === undefined){replacement = {original:"",replacement:""};}

  var d = "";
  d += "<div class='replacement thin-wrapper'>";
    d += "<input class='timestamp' type='text' value='"+replacement.original+"' placeholder='Timestamp'></input>";
    d += "<input class='gmt' type='text' value='"+replacement.replacement+"' placeholder='YYYY/MM/DD hh:mm'></input>";
  d += "</div>";
  return d;
};
