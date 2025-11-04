/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';


    let csInterface = new CSInterface();    

    themeManager.init();
    const hostEnv = csInterface.getHostEnvironment();
    const hostId = hostEnv.appId + hostEnv.appVersion;
    const vulcanNamespace = VulcanMessage.TYPE_PREFIX + hostId;
    
    let radiobuttons = document.querySelectorAll(`input[name='mode']`);
    let modeVal = localStorage.getItem("colorPanelAdapter");
    console.log("PanelMode: ", modeVal);

    // ラジオボタンのクリックイベント
    radiobuttons.forEach(
        r => r.addEventListener("change" ,
            e => {
                modeVal = e.target.id;
                localStorage.setItem("colorPanelAdapter", modeVal);
                // csInterface.evalScript("changePanelMode('" + modeVal + "');");
                sendMode(modeVal);
                console.log("Radio changed: ", modeVal + ": " + modeVal.length);
            }
        )
    );

    //環境設定をUIに復元
    if(modeVal){
        $("#modeVal").checked = true;
    } else{
        getRadioState();
    }
    sendMode(modeVal);


    function getRadioState(){
        for (let target of radiobuttons) {
            if(target.checked){
                modeVal = target.id;
                console.log("getRadioState: ", modeVal);
                localStorage.setItem("colorPanelAdapter", modeVal);
            }
        }
    }    

    // ラジオボタンの状態を送信
    function sendMode(val){
        const msg = new VulcanMessage(vulcanNamespace + "_radio");
        msg.setPayload(JSON.stringify(val));//jsonも渡せる
        VulcanInterface.dispatchMessage(msg);
    }


    // mainからのメッセージ受信
    VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + hostId + "_to_ui", function (rt){
        console.log(VulcanInterface.getPayload(rt));
    });

    // JSXからのメッセージ
    csInterface.addEventListener("fromJSX", event => {
        console.log(event.data);
    })

}());
    
