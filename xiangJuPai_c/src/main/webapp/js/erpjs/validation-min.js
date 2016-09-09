(function(){var i=window.Validation;var C=function(J,I){this.initialize.apply(this,arguments)};C.version="1.2.2";function g(L,I,N){if(typeof L=="object"&&typeof L.length==="number"){for(var K=0,M=L.length;K<M;++K){if(I.call(N,L[K],K,L)===false){break}}}else{for(var J in L){if(I.call(N,L[J],J,L)===false){break}}}return L}function d(K,I,L){var J=true;g(K,function(N,M){if(!I.call(L,N,M,K)){J=false;return false}});return J}function r(K,I,L){var J=false;g(K,function(N,M){if(I.call(L,N,M,K)){J=true;return false}});return J}function B(){var K=arguments[0]||{};for(var J=1,M=arguments.length;J<M;++J){var L=arguments[J];for(var I in L){if(L[I]!==undefined){K[I]=L[I]}}}return K}function t(I){return !I||I.length==0||/^\s+$/.test(I)}function o(I){return I!==null&&typeof I==="object"&&I.splice&&I.join&&I.sort}function F(I){return o(I)?I:[I]}function z(I){return(I||"").replace(/^\s+|\s+$/g,"")}function H(I,J){return function(){return I.apply(J||this,arguments)}}var v=j;function j(I){return(typeof I==="string")?document.getElementById(I):I}function q(I){return I.tagName.toLowerCase()}function e(L){var I=q(L);if(I=="select"){var J=[];g(L.options,function(M){M.selected&&J.push(M.value)});return L.multiple?J:J[0]}else{if(I=="input"){var K=L.type.toLowerCase();if((K=="checkbox"||K=="radio")&&!L.checked){return false}}}return L.value}var u={},k="validation"+new Date().getTime(),y=0,E={};function G(L,I,J){L=(L==window)?E:L;var K=L[k];if(!K){K=L[k]=++y}u[K]=u[K]||{};if(J!==undefined){u[K][I]=J}return u[K][I]}function a(L,I){L=(L==window)?E:L;var K=L[k];if(!u[K]){return}delete u[K][I];I="";for(I in u){break}if(!I){try{delete L[k]}catch(J){L.removeAttribute&&L.removeAttribute(k)}delete u[K]}}function w(K,J,I){if(K.addEventListener){K.addEventListener(J,I,false)}else{if(K.attachEvent){K.attachEvent("on"+J,I)}}}function x(K,J,I){if(K.removeEventListener){K.removeEventListener(J,I,false)}else{if(K.detachEvent){K.detachEvent("on"+J,I)}}}function A(I){I=I||window.event;I.returnValue=false;I.preventDefault&&I.preventDefault()}function c(I){return(I.className||"").split(/\s+/)}function b(J,I){return r(c(J),function(K){return K==I})}function p(J,I){if(!b(J,I)){J.className+=(J.className?" ":"")+I}}function s(K,J){var I=[];g(c(K),function(L){L!=J&&I.push(L)});K.className=I.join(" ")}function m(J){var I=[];g(J.getElementsByTagName("*"),function(L){var K=q(L);if(K=="input"||K=="select"||K=="textarea"){I.push(L)}});return I}function D(K,J){if(typeof Prototype!=="undefined"&&typeof Effect!=="undefined"){v(K).appear({afterFinish:J})}else{if(typeof MooTools!=="undefined"&&typeof Fx!=="undefined"){K=v(K);if(K.getStyle("display")=="none"){K.setStyles({opacity:0,display:""});var I=new Fx.Tween(K,{onComplete:J});I.start("opacity",1)}}else{if(typeof jQuery!=="undefined"){jQuery(K).fadeIn("slow",J)}else{K.style.display="";J&&J()}}}}function n(K,J){if(typeof Prototype!=="undefined"&&typeof Effect!=="undefined"){v(K).fade({afterFinish:J})}else{if(typeof MooTools!=="undefined"&&typeof Fx!=="undefined"){K=v(K);var I=new Fx.Tween(K);I.start("opacity",0).chain(function(){K.setStyle("display","none");J&&J()})}else{if(typeof jQuery!=="undefined"){jQuery(K).fadeOut("slow",J)}else{K.style.display="none";J&&J()}}}}function f(J){try{J.focus();J.select&&J.select()}catch(I){}}var l=function(){this.initialize.apply(this,arguments)};B(l.prototype,{initialize:function(J,I){this.test=(typeof J==="function")?{test:J}:J;this.options=I||{}},validate:function(I,J){return this.options.force?this._validate(I,J):(t(I)||this._validate(I,J))},_validate:function(I,J){return(this.options.depends?d(this.options.depends,function(K){return K.validate(I,J)}):true)&&(this.test===true||(this.test.validate||this.test.test).call(this.test,I,J))}});var h={};h.alert={fail:function(J,I){I&&window.alert(I)}};h["default"]={prompt:function(J,I){this._showAdvice(J,"prompt",I)},pass:function(J,I){this._showAdvice(J,"passed",I)},fail:function(J,I){this._showAdvice(J,"failed",I)},reset:function(J){var I=["prompt","passed","failed"];g(I,function(L){s(J,"validation-"+L);var K=this._getAdvice(J,L);if(K){if(G(K,"validation")){a(K,"validation");K.parentNode.removeChild(K)}else{s(K,"validation-advice-"+L);K.style.display="none"}}},this);a(J,"validation_advice_id")},_showAdvice:function(N,L,M){var J=["prompt","passed","failed"];g(J,function(O){(O==L?p:s)(N,"validation-"+O)});var I=this._getAdvice(N,L);if(!I&&M){I=this._createAdvice(N)}if(L=="prompt"&&(!I||(G(I,"validation")&&!M))){return}g(J,function(P){if(P==L){return}var O=this._getAdvice(N,P);if(!O){return}if(I){s(O,"validation-advice-"+P);O.style.display="none"}else{n(O,function(){s(O,"validation-advice-"+P)})}},this);if(!I){return}if(M&&!G(I,"validation_message")){I.innerHTML="";var K=document.createElement("span");K.innerHTML=M;I.appendChild(K)}if(M||G(I,"validation_message")){p(I,"validation-advice-"+L);D(I)}},_getAdvice:function(L,J){var I=L.id?(j("validation_advice_"+J+"_"+L.id)||j("validation_advice_"+L.id)):null;I=I||j("validation_advice_"+J)||j("validation_advice");if(I&&z(I.innerHTML)){G(I,"validation_message",true)}var K=G(L,"validation_advice_id");if(!I&&K){I=j(K)}return I},_createAdvice:function(O){var N="validation_advice_"+(O.id||new Date().getTime());G(O,"validation_advice_id",N);var I='<div id="'+N+'" class="validation-advice" style="display: none;"></div>';var M=document.createElement("div");M.innerHTML=I;I=M.childNodes[0];G(I,"validation",true);var L=O.parentNode;var K=O.type.toLowerCase();if((K=="checkbox"||K=="radio")&&L){L.appendChild(I)}else{var J=O.nextSibling;if(J){L.insertBefore(I,J)}else{L.appendChild(I)}}return I}};B(C,{add:function(J,K,I){if(arguments.length==1){g(J,function(M,L){M=F(M);this.add.call(this,L,M[0],M[1])},this);return this}I=B({},I);validators=[];I.depends&&g(F(I.depends),function(M){var L=this.get(M);L&&validators.push(L)},this);I.depends=validators;this._validators[J]=new l(K,I);return this},get:function(I){if(typeof I==="string"){return this._validators[I]}if(q(I)=="form"){return G(I,"validation")}return null},validate:function(N,K){N=j(N);K=K||{};var M=this._validate(N,K);if(M==-3){return true}if(K.advice){var J=this._getAdvice(K);G(N,"validation_advice",J);if(M==-1){if(J.pass){var L=this._getMessage(N,"passed",K);J.pass(N,L,K)}}else{if(J.fail){var L=this._getMessage(N,"failed",K,M==-2?false:M);J.fail(N,L,K)}}}var I=K.onElementValidate||K.onValidate;I&&I.call(N,M==-1,(M==-2)?0:M);return M==-1},reset:function(J){J=j(J);var I=G(J,"validation_advice");I&&I.reset&&I.reset(J);a(J,"validation_advice");return this},prompt:function(L,J){var I=this._getAdvice(J);var K=this._getMessage(L,"prompt",J);I&&I.prompt&&I.prompt(L,K,J)},_validate:function(N,K){var I=this._regularValidators(K.validators||K.validator||this._getValidators(N));if(I.length==0){return -3}var M=e(N);var J=-1;var L=d(I,function(O,Q){var P=(typeof O[0]==="string")?this.get(O[0]):new l(O[0],O[1]);if(!P){throw new Error("can't find installed validator: "+O[0])}if(!P.validate(M,O[1])){J=Q;return false}return true},this);if(!L&&I.length==1){return -2}return J},_regularValidators:function(I){I=F(I);var J=[];g(I,function(K){var L=typeof K;if(L==="string"||L==="function"){J.push([K])}else{if(o(K)){J.push(K)}else{if(L==="object"){var M=K.validate||K.test;if(M&&typeof M==="function"){J.push([K])}else{g(K,function(N,O){this.get(O)&&J.push([O,N])},this)}}}}},this);return J},_getValidators:function(K,I){var J=[];g(c(K),function(M){var L=this._getValidatorFromClass(M);L&&J.push(L)},this);return J},_getValidatorFromClass:function(K){if(K!="required"&&K.indexOf("validate-")!=0){return null}K=K.replace(/^validate-/,"");if(this.get(K)){return K}var J=[];var M=(K+"-").match(/(-\[\S+?\](?=-))|[^-]+/g);for(var L=0,N=M.length;L<N-1;++L){var I=M.pop().replace(/^-\[(\S+)\]$/,"$1");J.unshift(I);K=M.join("-");if(this.get(K)){return[K,J]}}return null},_getMessage:function(O,L,J,I){var N=J.messages||J.message;if(N){if(typeof N==="string"||o(N)){N={failed:N}}if(L=="failed"){var K=F(N.failed);return K[I||0]||K[0]}else{return N[L]}}else{N=O.getAttribute((J.messageNames||this.defaultOptions.messageNames)[L]);var M=(J.useTitle===undefined)?this.defaultOptions.useTitle:J.useTitle;if(!N&&L=="failed"&&M){N=O.title}if(N&&L=="failed"&&I!==false){var K=N.split(J.messageSeparator||this.defaultOptions.messageSeparator);return K[I]||K[0]}return N}},_getAdvice:function(I){var J=typeof I.advice;if(J==="string"){return h[I.advice]}else{if(J==="function"){return{fail:I.advice}}else{if(J==="object"){return I.advice}else{return h[this.defaultOptions.advice]}}}}});B(C.prototype,{initialize:function(J,I){this.form=j(J);this.options=B({},C.defaultOptions,I);this.options.autoStart&&this.start();if(G(this.form,"validation")){a(this.form,"validation")}G(this.form,"validation",this)},start:function(){if(this.running){return this}this.running=true;this.options.immediate&&this._handleElms();this.options.onSubmit&&this._handleSubmit();this.options.onReset&&this._handleReset();return this},stop:function(){if(!this.running){return this}this.running=false;g(m(this.form),this._removeEvent,this);this._removeEvent(this.form);return this},restart:function(){return this.stop().start()},validate:function(I){if(I===false){I={advice:false,focusOnError:false}}I=B({},this.options,I);var J=m(this.form);var K=true;var L=[];if(I.stopOnFirst){K=d(J,function(N){var M=this._validate(N,I);if(!M){L.push(N)}return M},this)}else{g(J,function(M){if(!this._validate(M,I)){L.push(M);K=false}},this)}I.onFormValidate&&I.onFormValidate.call(this.form,K,I.stopOnFirst?L[0]:L);!K&&I.focusOnError&&f(L[0]);return K},reset:function(){g(m(this.form),C.reset,C);return this},_handleSubmit:function(){var I=this.options;var J=H(function(L){var K={};if(I.onFormValidate){K.onFormValidate=function(){if(I.onFormValidate.apply(this,arguments)===false){A(L)}}}if(!this.validate(K)){A(L)}},this);this._addEvent(this.form,"submit",J)},_handleReset:function(){var I=H(function(){this.reset()},this);this._addEvent(this.form,"reset",I)},_handleElms:function(){var I=this.options;var J=m(this.form);var K=I.immediate=="keypress"?"keypress":"blur";g(J,function(P){var N=H(function(){return this._validate(P,I)},this);var O=N;var L=q(P);if(L!="select"&&K=="keypress"){O=function(){if(G(P,"validation_running")){return}G(P,"validation_running",true);var Q=(I.delay||0.5)*1000;setTimeout(N,Q);setTimeout(function(){a(P,"validation_running")},Q)}}var M=H(function(){var Q=I.messages;I.messages=this._match(P,Q);C.prompt(P,I);I.messages=Q},this);this._addEvent(P,L=="select"?"blur":K,O);this._addEvent(P,"focus",M)},this)},_addEvent:function(L,K,J){var I=G(L,"validation_handler")||G(L,"validation_handler",[]);I.push([K,J]);w(L,K,J)},_removeEvent:function(J){var I=G(J,"validation_handler");I&&g(I,function(K){x(J,K[0],K[1])});a(J,"validation_handler")},_validate:function(M,J){var L=J.validators;var I=J.messages;J.validators=this._match(M,L);J.messages=this._match(M,I);var K=true;if(!C.validate(M,J)){K=false}J.validators=L;J.messages=I;return K},_match:function(L,K){if(!K){return null}if(L.id&&K[L.id]){return K[L.id]}var J=c(L);var I=null;g(J,function(M){var N=K["."+M];if(N){I=N;return false}});return I}});C.util={each:g,all:d,any:r,extend:B,isEmpty:t,isArray:o,splat:F,trim:z};C.ui={get:j,getTag:q,getValue:e,data:G,addEvent:w,removeEvent:x,stopEvent:A,getClasses:c,hasClass:b,addClass:p,removeClass:s,show:D,hide:n,activate:f};C.advice=h;C.Validator=l;window.Validation=C;C.noConflict=function(){window.Validation=i;return C};C.autobind=true;if(C.autobind){w(window,"load",function(){var I=document.getElementsByTagName("form");g(I,function(J){if(b(J,"required-validate")){new C(J,{immediate:true})}})})}C.defaultOptions={autoStart:true,advice:"default",messageNames:{prompt:"promptmessage",passed:"passedmessage",failed:"failedmessage"},useTitle:true,messageSeparator:/;\s*/,stopOnFirst:true,focusOnError:true,onSubmit:true,onReset:true};C._validators={};C._validators.required={validate:function(I){return !t(I)}};C.add({integer:/^[-+]?[\d]+$/,"float":/^[-+]?\d+(\.\d+)?$/,digits:/^\d+$/,alpha:/^[a-zA-Z]+$/,alphanum:/^[a-zA-Z0-9]+$/,identifier:/^[_a-zA-Z]\w*$/,"less-than":[function(J,I){return parseFloat(J)<I},{depends:"float"}],"great-than":[function(J,I){return parseFloat(J)>I},{depends:"float"}],length:function(J,I){return J.length==I},"min-length":function(J,I){return J.length>=I},"max-length":function(J,I){return J.length<=I},"int-range":[function(I,J){I=parseInt(I);return I>=J[0]&&I<=J[1]},{depends:"integer"}],"float-range":[function(I,J){I=parseFloat(I);return I>=J[0]&&I<=J[1]},{depends:"float"}],"length-range":function(I,J){return I.length>=J[0]&&I.length<=J[1]},file:function(I,J){J=F(J);return r(J,function(K){return new RegExp("\\."+K+"$","i").test(I)})},date:function(U,T){T=T||"y-m-d";T=F(T).join("-");var L=T.replace(/[^ymd]/g,"");var V=["\\","\\\\","/","\\/",".","\\.","d","(\\d{1,2})","y","(\\d{4}|\\d{2})","m","(\\d{1,2})"];for(var M=0,R=V.length;M<R;M+=2){T=T.replace(V[M],V[M+1])}var K=U.match(new RegExp("^"+T+"$"));if(!K){return false}var P=L.indexOf("y");var J=L.indexOf("m");var N=L.indexOf("d");var Q=P!=-1?K[P+1]:0;var O=J!=-1?K[J+1]:0;var S=N!=-1?K[N+1]:0;var I=new Date();if(Q&&Q.length==2){Q=2000+Q;Q=Q>I.getFullYear()?Q-1000:Q}Q&&I.setFullYear(Q);O&&I.setMonth(O-1);S&&I.setDate(S);if(Q&&I.getFullYear()!=Q||O&&I.getMonth()!=O-1||S&&I.getDate()!=S){return false}return true},time:function(J){var I=J.match(/^(\d{1,2}):(\d{1,2})(:(\d{1,2}))?$/);if(!I){return false}return parseInt(I[1])<24&&parseInt(I[2])<60&&(!I[4]||parseInt(I[4])<60)},datetime:function(I,K){var J=I.split(/\s+/);if(J.length!=2){return false}var M=C.get("date");var L=C.get("time");return M.validate(J[0],K)&&L.validate(J[1])},email:/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/,url:/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i,ip:/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,"id-number":function(J){if(!(/^\d{17}(\d|x)$/i.test(J)||/^\d{15}$/i.test(J))){return false}var L=parseInt(J.substr(0,2));if(L<11||L>91){return false}var I=J.length==18?J:J.substr(0,6)+"19"+J.substr(6,15);var M=I.substr(6,8);if(!new Date(M.substr(0,4)+"/"+M.substr(4,2)+"/"+M.substr(6,2))){return false}if(J.length==18){J=J.replace(/x$/i,"a");var N=0;for(var K=17;K>=0;K--){N+=(Math.pow(2,K)%11)*parseInt(J.charAt(17-K),11)}if(N%11!=1){return false}}return true},chinese:/^[\u4e00-\u9fa5]+$/,telephone:/^((0[1-9]{3})?(0[12][0-9])?-?)?\d{6,8}$/,mobilephone:/(^0?[1][35][0-9]{9}$)/,zip:/^[1-9]\d{5}$/,qq:/^[1-9]\d{4,8}$/,pattern:function(I,J){J=F(J).join("-");return new RegExp(J).test(I)},equals:[function(J,I){return J==e(j(F(I).join("-")))},{force:true}],"required-any":[function(I,J){return !t(I)||r(F(J),function(K){return !t(e(j(K)))})},{force:true}],any:function(I,J){return r(F(J),function(K){return C.get(K).validate(I)})},multi:function(I,J){J=F(J);var L=I.split(new RegExp(J[1]||"\\s+"));var K=C.get(J[0]);return d(L,function(M){return K.validate(M)})},within:function(I,J){return r(F(J),function(K){return I==K})},notwithin:function(I,J){return d(F(J),function(K){return I!=K})}});C.ajax=function(){window.alert("can not find ajax library(prototype mootools or jquery).")};C.ajaxValidate=function(I){return/\s*true\s.*/.test(I)};C.add("ajax",function(J,L){L=F(L);var K=L[0];var O=L[1]||"value";var N={};N[O]=J;var I=false;var P=function(Q){I=C.ajaxValidate(Q)};if(typeof Prototype!="undefined"){new Ajax.Request(K,{asynchronous:false,parameters:N,onSuccess:function(Q){P(Q.responseText)}})}else{if(typeof MooTools!=="undefined"){var M=new Request({url:K,async:false,data:N});M.addEvent("success",P);M.send()}else{if(typeof jQuery!=="undefined"){jQuery.ajax({url:K,type:"POST",async:false,data:N,success:P})}else{C.ajax({url:K,data:N,success:P})}}}return I})})();