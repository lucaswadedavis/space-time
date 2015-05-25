
walk(document.body);

function walk(node,replacements){
	// I stole the recursive dom walker function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			//handleText(node);
      counterspell(node,replacements);
			break;
	}
};

function counterspell(textNode, replacements){
  var d = textNode.nodeValue;
  replacements=[];
   replacements.push({original:"President",replacement:"Assassin"});
 // replacements = simpleStorage.get("replacements") || [];
  for (var i=0;i<replacements.length;i++){
    var pattern = new RegExp(("\\b"+replacements[i].original+"\\b"),"g");
    d = d.replace(pattern,replacements[i].replacement);
  }

  textNode.nodeValue = d;
};

