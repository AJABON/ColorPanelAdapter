(function () {
    'use strict';
     var csInterface = new CSInterface();

    function waitForAdapter(callback) {
        if (typeof AIEventAdapter !== "undefined") {
            callback();
        } else {
            setTimeout(function() { waitForAdapter(callback); }, 500);
        }
    }

    function evalJsx(){
        csInterface.evalScript("switchColorPanel()");
    }

    // ui.jsからのVulcanMessage受信
    const hostEnv = csInterface.getHostEnvironment();
    const hostId = hostEnv.appId + hostEnv.appVersion;
    const vulcanNamespace = VulcanMessage.TYPE_PREFIX + hostId;

    // ラジオボタンの設定をロード？
    VulcanInterface.addMessageListener(vulcanNamespace + "_radio", function (rt){
        csInterface.evalScript("changePanelMode('" + JSON.parse(VulcanInterface.getPayload(rt)) + "');");
    });
    

    waitForAdapter(function() {
        // console.log("AIEventAdapter ready");
        sendMessage("AIEventAdapter ready");

        // ドキュメントがアクティブになったとき
        csInterface.addEventListener("documentAfterActivate", evalJsx);
        // テンプレートから新規ドキュメント
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After New From Template", evalJsx);
        // 新規ドキュメント
        AIEventAdapter.getInstance().addEventListener("AI Document New Notifier", evalJsx);
        // ドキュメントを開いたとき
        AIEventAdapter.getInstance().addEventListener("AI Document Opened Notifier", evalJsx);
        // CMYKモード（動かない）
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Color Mode CMYK", evalJsx);
        // RGBモード（動かない）
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Color Mode RGB", evalJsx);

        // カラーモードの変更 に対応できていない

        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: Before Quit", function(e){
            csInterface.removeEventListener("documentAfterActivate", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Command Notifier: After New From Template", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document New Notifier", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document Opened Notifier", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Command Notifier: After Color Mode CMYK", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Command Notifier: After Color Mode RGB", evalJsx);
        });


    });

    function sendMessage(val){
        const vulcanNamespace = VulcanMessage.TYPE_PREFIX + hostId + "_to_ui";
        const msg = new VulcanMessage(vulcanNamespace);
        msg.setPayload(JSON.stringify(val));//jsonも渡せる
        VulcanInterface.dispatchMessage(msg);
    }

}());
    
