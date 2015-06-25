var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

module.exports = objct(
  require("./tag"), 
  require("./toggle"),
  panel
);

///////////////////////////////////////////////////////////////////////////////

panel.prototype = {
  open : open,
  close : close
};

///////////////////////////////////////////////////////////////////////////////

function panel(){

  this.addEventListener("attributeChangedCallback", createdCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function createdCallback(data){
    console.log("PANEL CREATED", data);
  }


}

///////////////////////////////////////////////////////////////////////////////

function close() {
  this.setAttribute("open", "false");
}

///////////////////////////////////////////////////////////////////////////////

function open() {
  this.setAttribute("open", "true");
}