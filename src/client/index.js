import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

var throttle = function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) {
      return;
    }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

/* init - you can init any event */
throttle("scroll", "optimizedScroll");

ReactDOM.render(<App />, document.getElementById("root"));
