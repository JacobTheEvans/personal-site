"use strict";
var app = angular.module("mainApp.blog");
app.service("blogData", function() {
  this.getData = function() {
    return [
      {title:"Immediately-Invoked Function Expression", auth:"Jacob Evans", url: "core/blog/iife.html", postDate:"August 23, 2015"},
      {title:"Javascript Scope", auth:"Jacob Evans", url: "core/blog/scope.html", postDate:"August 22, 2015"},
      {title:"Use Strict Javascript", auth:"Jacob Evans", url: "core/blog/usestrict.html", postDate:"August 20, 2015"},
      {title:"XSS Cross Site Scripting", auth:"Jacob Evans", url: "core/blog/cross.html", postDate:"June 18, 2015"},
      {title:"The Beauty of Ajax", auth:"Jacob Evans", url: "core/blog/ajax.html", postDate:"June 10, 2015"},
      {title:"Null Byte Injection In PHP", auth:"Jacob Evans", url: "core/blog/nullbyte.html", postDate:"April 18, 2015"},
      {title:"Installing SparkWeb On Ubuntu", auth:"Jacob Evans", url: "core/blog/sparkweb.html", postDate:"April 10, 2015"},
      {title:"Displaying Python Output with PHP", auth:"Jacob Evans", url: "core/blog/pythonphp.html", postDate:"April 9, 2015"},
      {title:"Stock Trading Advice Program in Python", auth:"Jacob Evans", url: "core/blog/stockadvice.html", postDate:"March 13, 2015"},
      {title:"Simple Web Hosting with Nginx", auth:"Jacob Evans", url: "core/blog/nginx.html", postDate:"March 11, 2015"},
      {title:"Installing Openfire in Ubuntu 14.04", auth:"Jacob Evans", url: "core/blog/openfire.html", postDate:"February 23, 2015"},
      {title:"Ubuntu in Windows using VirtualBox", auth:"Jacob Evans", url: "core/blog/virtualbox.html", postDate:"February 4, 2015"},
      {title:"Running Child Processes In Python", auth:"Jacob Evans", url: "core/blog/processpython.html", postDate:"January 23, 2015"},
      {title:"Easy DNS", auth:"Jacob Evans", url: "core/blog/easydns.html", postDate:"January 11, 2015"},
    ];
  };
});
