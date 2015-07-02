var panel = require("./tags/panel-bonaparte");
var scroll = require("./tags/scroll-bonaparte");
var sidebar = require("./tags/sidebar-bonaparte");
var toolbar = require("./tags/toolbar-bonaparte");
var cornerstone = require("./tags/cornerstone-bonaparte");

// toolbar.mixin({
//   test:function(){
//     alert("test")
//   }
// });

panel.register();
scroll.register();
sidebar.register();
cornerstone.register();
toolbar.register();

document.registerElement('content-bonaparte');
