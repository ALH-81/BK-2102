"use strict";function myAjax(t,e,n){var o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:function(){},s={};s=XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),"get"===t?s.open("get","".concat(e,"?").concat(n)):s.open("post",e),"post"===t&&s.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),"get"===t?s.send():s.send(n),s.onreadystatechange=function(){4===s.readyState&&/^2\d{2}$/.test(s.status)&&o(s.response)}}