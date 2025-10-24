(function () {
    'use strict';
     var csInterface = new CSInterface();

    // themeManager.init();

    function waitForAdapter(callback) {
        if (typeof AIEventAdapter !== "undefined") {
            callback();
        } else {
            setTimeout(function() { waitForAdapter(callback); }, 500);
        }
    }

    function evalJsx(){
        csInterface.evalScript('switchColorPanel()');
    }
    waitForAdapter(function() {
        console.log("AIEventAdapter ready");

        // ドキュメントがアクティブになったとき
        csInterface.addEventListener("documentAfterActivate", evalJsx);
        // テンプレートから新規ドキュメント
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After New From Template", evalJsx);
        // 新規ドキュメント
        AIEventAdapter.getInstance().addEventListener("AI Document New Notifier", evalJsx);
        // ドキュメントを開いたとき
        AIEventAdapter.getInstance().addEventListener("AI Document Opened Notifier", evalJsx);
                // CMYKモード（動かない）
        // AIEventAdapter.getInstance().addEventListener("AI Command Notifier: Before Color Mode CMYK", evalJsx);
                // RGBモード（動かない）
        // AIEventAdapter.getInstance().addEventListener("AI Command Notifier: Before Color Mode RGB", evalJsx);

        // カラーモードの変更 に対応できていない

        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: Before Quit", function(e){
            csInterface.removeEventListener("documentAfterActivate", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Command Notifier: After New From Template", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document New Notifier", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document Opened Notifier", evalJsx);
        });


    });


}());
    
