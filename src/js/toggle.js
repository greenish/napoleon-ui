var util = require("./utility");

///////////////////////////////////////////////////////////////////////////////

module.exports = {
  toggle : toggle
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function toggle(attribute){
  var newValue = util.getAttribute(this, attribute) === "true" ? "false" : "true";
  this.setAttribute(attribute, newValue);
}

