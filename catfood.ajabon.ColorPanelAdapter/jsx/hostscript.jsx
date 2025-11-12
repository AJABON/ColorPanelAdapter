var currentDocName; // さっきまでアクティブだったドキュメントの名前
var currentColorSpace; // さっきまでのカラーモード
var panelMode = "RGB"; // カラーパネルのモード初期値_CEPから受け取る

function changePanelMode(val){
    cp("changePanelMode from jsx: " + val);
    panelMode = val;
    switchColorPanel(1); // UIで変更しても変更してくれちゃう
}

function switchColorPanel(flag){
    if(app.documents.length == 0) return; // ドキュメントが開かれていないとアクション実行でエラー出る
	// currentDocName = app.activeDocument.name;
    // if(app.activeDocument.name == currentDocName) return;
    var colorSpace = app.activeDocument.documentColorSpace.toString().replace(/^.+\./, "");
    cp("colorSpace from jsx: " + colorSpace);
	var newMode = colorSpace == "CMYK"? colorSpace : panelMode;
    cp("newMode from jsx: " + newMode);
	if(newMode == currentColorSpace && flag == undefined) return;
	currentColorSpace = colorSpace;
    cp("currentColorSpace: " + currentColorSpace);


    addActionSet();
    app.doScript(newMode, "ColorPanel");
    while(1){
        try{
            app.unloadAction("ColorPanel","");
        }catch(e){
            break;
        }
    }
}

function addActionSet(){
	var actionCode = "/version 3\
    /name [ 10\
        436f6c6f7250616e656c\
    ]\
    /isOpen 1\
    /actionCount 4\
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
    }\
    /action-4 {\
        /name [ 10\
            57656253616665524742\
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
                    57656220e382abe383a9e383bc\
                ]\
                /value 6\
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

// consoleに出すやつ
function cp(mes){
    // alert(mes);
    var xLib = new ExternalObject("lib:PlugPlugExternalObject");
    if(xLib){
      var eventObj = new CSXSEvent();
      eventObj.type = "fromJSX";
      eventObj.data = mes;
      eventObj.dispatch();
    }
}
