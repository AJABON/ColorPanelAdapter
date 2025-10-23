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

        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After New From Template", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Document New Notifier", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Document Opened Notifier", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Document Closed Notifier", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Document Color Model Changed Notifier", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Document Profiles Changed Notifier", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Color Mode CMYK", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Color Mode RGB", evalJsx);

        AIEventAdapter.getInstance().addEventListener("AI Document View Changed Notifier", evalJsx);


        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Arrange Windows - Cascade", evalJsx);
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Arrange Windows - Vertical", evalJsx);
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Arrange Windows - Float in Window", evalJsx);
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Arrange Windows - Float All in Windows", evalJsx);
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Arrange Windows - Consolidate AllWindows", evalJsx);
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Select Window", evalJsx);
        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: After Arrange Windows - Horizontal", evalJsx);
        // 前面ドキュメントの切り替え、カラーモードの変更 に対応できていない

        AIEventAdapter.getInstance().addEventListener("AI Command Notifier: Before Quit", function(e){
            AIEventAdapter.getInstance().removeEventListener("AI Command Notifier: After New From Template", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document New Notifier", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document Opened Notifier", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document Closed Notifier", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document Color Model Changed Notifier", evalJsx);
            AIEventAdapter.getInstance().removeEventListener("AI Document Profiles Changed Notifier", evalJsx);
        });


    });


}());
    
