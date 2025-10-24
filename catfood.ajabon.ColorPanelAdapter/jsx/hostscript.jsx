var currentDocName;
var currentColorSpace;

function switchColorPanel(){
    if(app.documents.length == 0) return;
	if(app.activeDocument.name == currentDocName) return;
	currentDocName = app.activeDocument.name;
    var colorSpace = app.activeDocument.documentColorSpace.toString().replace(/^.+\./, "");
	if(colorSpace == currentColorSpace) return;
	// alert("かえるでー"); // test

	currentColorSpace = colorSpace;
	colorSpace = colorSpace == "RGB"? "HSB" : colorSpace; // RGBならHSBに、CMYKならCMYKのままに
    addActionSet();
    app.doScript(colorSpace, "ColorPanel");
    app.unloadAction("ColorPanel","");
}

function addActionSet(){
	var actionCode = "/version 3\
	/name [ 10\
		436f6c6f7250616e656c\
	]\
	/isOpen 1\
	/actionCount 3\
	/action-1 {\
		/name [ 4\
			434d594b\
		]\
		/keyIndex 0\
		/colorIndex 0\
		/isOpen 1\
		/eventCount 1\
		/event-1 {\
			/useRulersIn1stQuadrant 0\
			/internalName (ai_plugin_setColor)\
			/localizedName [ 18\
				e382abe383a9e383bce38292e8a8ade5ae9a\
			]\
			/isOpen 1\
			/isOn 1\
			/hasDialog 0\
			/parameterCount 1\
			/parameter-1 {\
				/key 1836349808\
				/showInPalette 4294967295\
				/type (enumerated)\
				/name [ 14\
					434d594b20e382abe383a9e383bc\
				]\
				/value 3\
			}\
		}\
	}\
	/action-2 {\
		/name [ 3\
			524742\
		]\
		/keyIndex 0\
		/colorIndex 0\
		/isOpen 1\
		/eventCount 1\
		/event-1 {\
			/useRulersIn1stQuadrant 0\
			/internalName (ai_plugin_setColor)\
			/localizedName [ 18\
				e382abe383a9e383bce38292e8a8ade5ae9a\
			]\
			/isOpen 0\
			/isOn 1\
			/hasDialog 0\
			/parameterCount 1\
			/parameter-1 {\
				/key 1836349808\
				/showInPalette 4294967295\
				/type (enumerated)\
				/name [ 13\
					52474220e382abe383a9e383bc\
				]\
				/value 1\
			}\
		}\
	}\
	/action-3 {\
		/name [ 3\
			485342\
		]\
		/keyIndex 0\
		/colorIndex 0\
		/isOpen 1\
		/eventCount 1\
		/event-1 {\
			/useRulersIn1stQuadrant 0\
			/internalName (ai_plugin_setColor)\
			/localizedName [ 18\
				e382abe383a9e383bce38292e8a8ade5ae9a\
			]\
			/isOpen 0\
			/isOn 1\
			/hasDialog 0\
			/parameterCount 1\
			/parameter-1 {\
				/key 1836349808\
				/showInPalette 4294967295\
				/type (enumerated)\
				/name [ 3\
					485342\
				]\
				/value 2\
			}\
		}\
	}";
	tmp = File(Folder.desktop + "/ColorPanel.aia");
	tmp.open('w');
	tmp.write(actionCode);
	tmp.close();
	app.loadAction(tmp);
	tmp.remove();
}