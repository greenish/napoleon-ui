(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! 
 * objct - v0.x (https://github.com/greenish/js-objct)
 * 
 * Copyright (c) 2015 Philipp Adrian (www.philippadrian.com)
 *
 * The MIT Licence (http://opensource.org/licenses/MIT)
 */
////////////////////////////////////////////////////////////////////////////////
(function(commonJSmodule, undefined){
"use strict";

////////////////////////////////////////////////////////////////////////////////
var Objct = function(){};
var NewObj = function(){return {};};
var objctHash = "jmuMMRs6AUUG29";
var hash = objctHash+"3HXcs8Z0ofQlkG0hqiNAJlZq2hHYakBQmyfnRuCsh2yf+c6m";
var testExecutable = new RegExp("\\b"+objctHash+"\\b");
var strFunction = "function";
var strObject = "object";
var strArray = Array.toString();
var objectKeys = Object.keys || Objct;
////////////////////////////////////////////////////////////////////////////////
var checkType = function(value){
	var	type = typeof value;
	return type === strFunction || (type === strObject && !factory.isArray(value));
};
////////////////////////////////////////////////////////////////////////////////
var instantiateFunction = function(fn, args){
	Objct.prototype = fn.prototype;
	var f = new Objct();
	Objct.prototype = null;
	var r = fn.apply(f, args);
	if(checkType(r)) return r;
	return f;	
};
////////////////////////////////////////////////////////////////////////////////
var mixinObject = function(target, source) {
	var k =-1;
	var keys = objectKeys(source);
	if(typeof keys === strObject) {
		var length = keys.length;

		while(++k < length) {
			target[keys[k]]=source[keys[k]];
		}
	}
	else {
		for(k in source) {
			target[k]=source[k];
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
var build = function(modules, data){
	var isFunction, obj, value, i=0, length = modules.length;

	//First Module
	var instance = modules[0].obj === NewObj ? 
		NewObj():
		typeof modules[0].obj === strFunction ?
			instantiateFunction(modules[0].obj, data.a):
			modules[0].obj;

	data.i = data.i || instance;

	//mixin all other modules
	while(++i < length) {
		obj = modules[i].isFactory ?
			modules[i].obj.call({hash:hash}, modules[i], data):
			modules[i].obj;

		if(typeof obj === strFunction) { 
			mixinObject(instance, obj.prototype);
			obj.apply(instance, data.a);
		}
		else {
			mixinObject(instance, obj); 
		}
	}
	return instance;
};
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
var factory = function(){
	Array.prototype.unshift.call(arguments, NewObj);
	return factory.extend.call({
		i : this instanceof factory,
		arguments : arguments
	});
};
//////////////////////////////////////////////////////////////////////////////
factory.extend = function(){
	////////////////////////////////////////////////////////////////////////
	var Executable = function Executable(module, data){
		"jmuMMRs6AUUG29";
		//////////////////////////
		// Continue building process
		//////////////////////////
		if(this && typeof this.hash === "string" && this.hash.search(objctHash) >= 0) {
			// pass up modules
			module.m = thisData.m;
			if(this.hash === hash) {
				return build(thisData.m, data);
			}
			else {
				thisData.a = data.a;
			}
		}
		//////////////////////////
		// Start building process
		//////////////////////////
		else {
			thisData.a = arguments;
		}

		var instance = build(thisData.m, thisData);

		return instance;
	};
	////////////////////////////////////////////////////////////////////////
	var that = this || {};
	var thisData = {
		a : [], // args
		m : [], // modules
		i : false, // instance
	};
	var type;
	var args = arguments.length > 0 ? arguments : that.arguments;
	var instant = this instanceof factory.extend || that.i;
	var i=-1;
	//setup modules
	while(++i < args.length) {
		type = typeof args[i];
		if(!checkType(args[i])) {
			if(type !== strObject) {
				throw("objct: Unexpected '"+type+"'! Only 'functions' and 'objects' can be used with objct.");
			}
			else {
				Array.prototype.splice.apply(args, [i,1].concat(args[i]));
				i--;
				continue;
			}
		}

		thisData.m.push({ 
			obj : args[i],
			isFactory : type === strFunction && testExecutable.test(args[i])
		});

		if(!instant && type === strFunction)
			mixinObject(Executable, args[i], thisData);
	}	
	return instant ? new Executable() : Executable;
};
////////////////////////////////////////////////////////////////////////////////
factory.isObjct = function(obj){
  return testExecutable.test(obj);
};
////////////////////////////////////////////////////////////////////////////////
// isArray fallback for ie<9
factory.isArray = Array.isArray || function (obj) {
	return (typeof obj == strObject 
		&& Object.prototype.toString.call(obj) === "[object Array]")
		|| ("constructor" in obj && String(obj.constructor) === strArray);
};
////////////////////////////////////////////////////////////////////////////////

// Connect to Environment 
commonJSmodule.exports = factory;

////////////////////////////////////////////////////////////////////////////////
})(typeof module === "undefined"? {} : module);
},{}],2:[function(require,module,exports){
var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

document.registerElement('toolbar-bonaparte', { prototype: createPrototype() });

document.registerElement('cornerstone-bonaparte', { prototype: createPrototype() });

document.registerElement('panel-bonaparte', { prototype: createPrototype( require("./panel-bonaparte") ) });

document.registerElement('sidebar-bonaparte', { prototype: createPrototype() });

document.registerElement('content-bonaparte', { prototype: createPrototype() });

document.registerElement('scroll-bonaparte', { prototype: createPrototype() });

///////////////////////////////////////////////////////////////////////////////

function createPrototype(element){
  element = element || {};

  return new objct.extend ( Object.create( HTMLElement.prototype ), {
    createdCallback : createdCallback,
    attachedCallback : attachedCallback,
    detachedCallback : detachedCallback,
    attributeChangedCallback : attributeChangedCallback
  });

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {

    // Create and mixin tag instance
    new objct.extend(this, element);

    if(!objct.isObjct(element)) return;
    
    var data = {
      element : this
    };

    this.trigger("createdCallback", data);
    this.global.trigger("createdCallback", data);
  }

///////////////////////////////////////////////////////////////////////////////

  function attachedCallback() {
    
    if(!objct.isObjct(element)) return;

    var data = {
      element : this
    };
    
    this.trigger("attachedCallback", data);
    this.global.trigger("attachedCallback", data);

  }

///////////////////////////////////////////////////////////////////////////////

  function detachedCallback() {

    if(!objct.isObjct(element)) return;

    var data = {
      element : this
    };
    
    this.trigger("detachedCallback", data);
    this.global.trigger("detachedCallback", data);
    
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback( name, previousValue, newValue ) {

    if(!objct.isObjct(element)) return;

    var data = {
      element : this,
      name : name,
      previousValue : previousValue,
      newValue : newValue
    };

    this.trigger("attributeChangedCallback", data);
    this.global.trigger("attributeChangedCallback", data);

  }

///////////////////////////////////////////////////////////////////////////////

}
},{"./panel-bonaparte":4,"objct":1}],3:[function(require,module,exports){
module.exports = function(){

  this.addListener     = addListener;
  this.removeListener  = removeListener;
  this.trigger         = trigger;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  var eventHandlers = {};

//////////////////////////////////////////////////////////////////////////////

  function addListener(event, handler){
    if( typeof handler !== "function" ) throw "Unexpected type of "+(typeof handler)+"! Expected function.";

    eventHandlers[event] = eventHandlers[event] || [];

    // if already registered
    if( eventHandlers[event].indexOf(handler) >= 0 ) return;

    eventHandlers[event].push(handler);    

  }

//////////////////////////////////////////////////////////////////////////////

  function removeListener(event, handler){
    if(typeof eventHandlers[event] !== "object") return;

    var index = eventHandlers[event].indexOf(handler);

    if( index >= 0 ) {
      eventHandlers[event].splice(index, 1);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function trigger(event, data){
    if(typeof eventHandlers[event] !== "object" ) return;
   
    var length = eventHandlers[event].length;
    var i = -1;
    while(++i < length) {
      eventHandlers[event][i](data);
    }
  }

///////////////////////////////////////////////////////////////////////////////

}


},{}],4:[function(require,module,exports){
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
  var that = this;
  
  this.addListener("attributeChangedCallback", createdCallback);
  this.global.addListener(this.NodeName+"-opened", globalPanelOpened);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
}

function createdCallback(data){
  console.log("PANEL CREATED", data);
}

///////////////////////////////////////////////////////////////////////////////

function globalPanelOpened(){
  
}
///////////////////////////////////////////////////////////////////////////////

function close() {
  this.setAttribute("open", "false");
  this.trigger(this.NodeName+"-closed", {element:this});
}

///////////////////////////////////////////////////////////////////////////////

function open() {
  this.setAttribute("open", "true");
  this.trigger(this.NodeName+"-opened", {element:this});
  this.global.trigger(this.NodeName+"-opened", {element:this});
}
},{"./tag":5,"./toggle":6,"objct":1}],5:[function(require,module,exports){
var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

var globals = {
  global : new objct(require("./events")),

};

///////////////////////////////////////////////////////////////////////////////

module.exports = objct(
  require("./events"),
  globals
);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

},{"./events":3,"objct":1}],6:[function(require,module,exports){
module.exports = {
  toggle : toggle
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function toggle(attribute){

  var tag = this;
  var newValue = tag.getAttribute(attribute) === "true" ? "false" : "true";
  tag.setAttribute(attribute, newValue);

}


},{}]},{},[2]);
