(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){window.okrobot=okrobot=require("./index.js")},{"./index.js":2}],2:[function(require,module,exports){const{isElectronPlatform:isElectronPlatform}=require("./lib/platform");module.exports={isElectronPlatform:isElectronPlatform,config:require("./lib/config"),user:require("./lib/user.js")}},{"./lib/config":3,"./lib/platform":4,"./lib/user.js":5}],3:[function(require,module,exports){module.exports={hostname:"http://localhost:1996"}},{}],4:[function(require,module,exports){"use strict";function isWebPlatform(){return window!==undefined}function isElectronPlatform(){return isWebPlatform()&&window.electronIpcRenderer!==undefined}function _remote_resp_handler(resp){if(resp.status!==200){throw new Error(`request failure, status: ${resp.status}, desc: ${resp.statusText}`)}const{data:{success:success,error:error=""}}=resp;if(!success){throw new Error(error)}const{data:{result:result=undefined}}=resp;if(result===undefined){return undefined}return JSON.parse(JSON.stringify(result))}async function getremote(url,data={},timeout=4e3){const axios=require("axios");try{const resp=await axios.get(url,{params:data,timeout:timeout});return _remote_resp_handler(resp)}catch(error){throw error}}async function postremote(url,data={},timeout){const axios=require("axios");try{const resp=await axios.post(url,data,{timeout:timeout});return _remote_resp_handler(resp)}catch(error){throw error}}async function putremote(url,data={},timeout){const axios=require("axios");try{const resp=await axios.put(url,data,{timeout:timeout});return _remote_resp_handler(resp)}catch(error){throw error}}async function calllocal(channel,data=undefined){return new Promise((resolve,reject)=>{window.electronIpcRenderer.once(channel,(_,resp)=>{if(!resp.success){return reject(new Error(resp.error))}return resolve(resp.result)});window.electronIpcRenderer.send(channel,data)})}module.exports={isWebPlatform:isWebPlatform,isElectronPlatform:isElectronPlatform,getremote:getremote,putremote:putremote,postremote:postremote,calllocal:calllocal}},{axios:6}],5:[function(require,module,exports){const platform=require("./platform");const{hostname:hostname}=require("./config");async function getAll(){let result;if(platform.isElectronPlatform()){result=await platform.calllocal("user.getall")}else{result=await platform.getremote(`${hostname}/api/user/all`)}console.log("[getAll] response:",JSON.stringify(result));return result}async function get(userId){let result;const params={userId:userId};if(platform.isElectronPlatform()){result=await platform.calllocal("user.get",params)}else{result=await platform.getremote(`${hostname}/api/user`,params)}console.log("[user.get] response:",JSON.stringify(result));return result}async function add(groupName,name,apiKey,apiSecret){let result;const data={groupName:groupName,name:name,apiKey:apiKey,apiSecret:apiSecret};if(platform.isElectronPlatform()){result=await platform.calllocal("user.add",data)}else{result=await platform.postremote(`${hostname}/api/user`,data)}console.log("[user.add] response:",JSON.stringify(result));return result}async function remove(userId){let result;const data={userId:userId};if(platform.isElectronPlatform()){result=await platform.calllocal("user.remove",data)}else{result=await platform.postremote(`${hostname}/api/user/remove`,data)}console.log("[user.remove] response:",JSON.stringify(result));return result}async function update(userId,{groupName:groupName,name:name,apiKey:apiKey,apiSecret:apiSecret}={}){let result;const data={userId:userId,options:{groupName:groupName,name:name,apiKey:apiKey,apiSecret:apiSecret}};if(platform.isElectronPlatform()){result=await platform.calllocal("user.update",data)}else{result=await platform.postremote(`${hostname}/api/user/update`,data)}console.log("[user.update] response:",JSON.stringify(result));return result}module.exports={getAll:getAll,get:get,add:add,update:update,remove:remove}},{"./config":3,"./platform":4}],6:[function(require,module,exports){module.exports=require("./lib/axios")},{"./lib/axios":8}],7:[function(require,module,exports){(function(process){"use strict";var utils=require("./../utils");var settle=require("./../core/settle");var buildURL=require("./../helpers/buildURL");var parseHeaders=require("./../helpers/parseHeaders");var isURLSameOrigin=require("./../helpers/isURLSameOrigin");var createError=require("../core/createError");var btoa=typeof window!=="undefined"&&window.btoa&&window.btoa.bind(window)||require("./../helpers/btoa");module.exports=function xhrAdapter(config){return new Promise(function dispatchXhrRequest(resolve,reject){var requestData=config.data;var requestHeaders=config.headers;if(utils.isFormData(requestData)){delete requestHeaders["Content-Type"]}var request=new XMLHttpRequest;var loadEvent="onreadystatechange";var xDomain=false;if(process.env.NODE_ENV!=="test"&&typeof window!=="undefined"&&window.XDomainRequest&&!("withCredentials"in request)&&!isURLSameOrigin(config.url)){request=new window.XDomainRequest;loadEvent="onload";xDomain=true;request.onprogress=function handleProgress(){};request.ontimeout=function handleTimeout(){}}if(config.auth){var username=config.auth.username||"";var password=config.auth.password||"";requestHeaders.Authorization="Basic "+btoa(username+":"+password)}request.open(config.method.toUpperCase(),buildURL(config.url,config.params,config.paramsSerializer),true);request.timeout=config.timeout;request[loadEvent]=function handleLoad(){if(!request||request.readyState!==4&&!xDomain){return}if(request.status===0&&!(request.responseURL&&request.responseURL.indexOf("file:")===0)){return}var responseHeaders="getAllResponseHeaders"in request?parseHeaders(request.getAllResponseHeaders()):null;var responseData=!config.responseType||config.responseType==="text"?request.responseText:request.response;var response={data:responseData,status:request.status===1223?204:request.status,statusText:request.status===1223?"No Content":request.statusText,headers:responseHeaders,config:config,request:request};settle(resolve,reject,response);request=null};request.onerror=function handleError(){reject(createError("Network Error",config,null,request));request=null};request.ontimeout=function handleTimeout(){reject(createError("timeout of "+config.timeout+"ms exceeded",config,"ECONNABORTED",request));request=null};if(utils.isStandardBrowserEnv()){var cookies=require("./../helpers/cookies");var xsrfValue=(config.withCredentials||isURLSameOrigin(config.url))&&config.xsrfCookieName?cookies.read(config.xsrfCookieName):undefined;if(xsrfValue){requestHeaders[config.xsrfHeaderName]=xsrfValue}}if("setRequestHeader"in request){utils.forEach(requestHeaders,function setRequestHeader(val,key){if(typeof requestData==="undefined"&&key.toLowerCase()==="content-type"){delete requestHeaders[key]}else{request.setRequestHeader(key,val)}})}if(config.withCredentials){request.withCredentials=true}if(config.responseType){try{request.responseType=config.responseType}catch(e){if(config.responseType!=="json"){throw e}}}if(typeof config.onDownloadProgress==="function"){request.addEventListener("progress",config.onDownloadProgress)}if(typeof config.onUploadProgress==="function"&&request.upload){request.upload.addEventListener("progress",config.onUploadProgress)}if(config.cancelToken){config.cancelToken.promise.then(function onCanceled(cancel){if(!request){return}request.abort();reject(cancel);request=null})}if(requestData===undefined){requestData=null}request.send(requestData)})}}).call(this,require("_process"))},{"../core/createError":14,"./../core/settle":17,"./../helpers/btoa":21,"./../helpers/buildURL":22,"./../helpers/cookies":24,"./../helpers/isURLSameOrigin":26,"./../helpers/parseHeaders":28,"./../utils":30,_process:32}],8:[function(require,module,exports){"use strict";var utils=require("./utils");var bind=require("./helpers/bind");var Axios=require("./core/Axios");var defaults=require("./defaults");function createInstance(defaultConfig){var context=new Axios(defaultConfig);var instance=bind(Axios.prototype.request,context);utils.extend(instance,Axios.prototype,context);utils.extend(instance,context);return instance}var axios=createInstance(defaults);axios.Axios=Axios;axios.create=function create(instanceConfig){return createInstance(utils.merge(defaults,instanceConfig))};axios.Cancel=require("./cancel/Cancel");axios.CancelToken=require("./cancel/CancelToken");axios.isCancel=require("./cancel/isCancel");axios.all=function all(promises){return Promise.all(promises)};axios.spread=require("./helpers/spread");module.exports=axios;module.exports.default=axios},{"./cancel/Cancel":9,"./cancel/CancelToken":10,"./cancel/isCancel":11,"./core/Axios":12,"./defaults":19,"./helpers/bind":20,"./helpers/spread":29,"./utils":30}],9:[function(require,module,exports){"use strict";function Cancel(message){this.message=message}Cancel.prototype.toString=function toString(){return"Cancel"+(this.message?": "+this.message:"")};Cancel.prototype.__CANCEL__=true;module.exports=Cancel},{}],10:[function(require,module,exports){"use strict";var Cancel=require("./Cancel");function CancelToken(executor){if(typeof executor!=="function"){throw new TypeError("executor must be a function.")}var resolvePromise;this.promise=new Promise(function promiseExecutor(resolve){resolvePromise=resolve});var token=this;executor(function cancel(message){if(token.reason){return}token.reason=new Cancel(message);resolvePromise(token.reason)})}CancelToken.prototype.throwIfRequested=function throwIfRequested(){if(this.reason){throw this.reason}};CancelToken.source=function source(){var cancel;var token=new CancelToken(function executor(c){cancel=c});return{token:token,cancel:cancel}};module.exports=CancelToken},{"./Cancel":9}],11:[function(require,module,exports){"use strict";module.exports=function isCancel(value){return!!(value&&value.__CANCEL__)}},{}],12:[function(require,module,exports){"use strict";var defaults=require("./../defaults");var utils=require("./../utils");var InterceptorManager=require("./InterceptorManager");var dispatchRequest=require("./dispatchRequest");function Axios(instanceConfig){this.defaults=instanceConfig;this.interceptors={request:new InterceptorManager,response:new InterceptorManager}}Axios.prototype.request=function request(config){if(typeof config==="string"){config=utils.merge({url:arguments[0]},arguments[1])}config=utils.merge(defaults,{method:"get"},this.defaults,config);config.method=config.method.toLowerCase();var chain=[dispatchRequest,undefined];var promise=Promise.resolve(config);this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor){chain.unshift(interceptor.fulfilled,interceptor.rejected)});this.interceptors.response.forEach(function pushResponseInterceptors(interceptor){chain.push(interceptor.fulfilled,interceptor.rejected)});while(chain.length){promise=promise.then(chain.shift(),chain.shift())}return promise};utils.forEach(["delete","get","head","options"],function forEachMethodNoData(method){Axios.prototype[method]=function(url,config){return this.request(utils.merge(config||{},{method:method,url:url}))}});utils.forEach(["post","put","patch"],function forEachMethodWithData(method){Axios.prototype[method]=function(url,data,config){return this.request(utils.merge(config||{},{method:method,url:url,data:data}))}});module.exports=Axios},{"./../defaults":19,"./../utils":30,"./InterceptorManager":13,"./dispatchRequest":15}],13:[function(require,module,exports){"use strict";var utils=require("./../utils");function InterceptorManager(){this.handlers=[]}InterceptorManager.prototype.use=function use(fulfilled,rejected){this.handlers.push({fulfilled:fulfilled,rejected:rejected});return this.handlers.length-1};InterceptorManager.prototype.eject=function eject(id){if(this.handlers[id]){this.handlers[id]=null}};InterceptorManager.prototype.forEach=function forEach(fn){utils.forEach(this.handlers,function forEachHandler(h){if(h!==null){fn(h)}})};module.exports=InterceptorManager},{"./../utils":30}],14:[function(require,module,exports){"use strict";var enhanceError=require("./enhanceError");module.exports=function createError(message,config,code,request,response){var error=new Error(message);return enhanceError(error,config,code,request,response)}},{"./enhanceError":16}],15:[function(require,module,exports){"use strict";var utils=require("./../utils");var transformData=require("./transformData");var isCancel=require("../cancel/isCancel");var defaults=require("../defaults");var isAbsoluteURL=require("./../helpers/isAbsoluteURL");var combineURLs=require("./../helpers/combineURLs");function throwIfCancellationRequested(config){if(config.cancelToken){config.cancelToken.throwIfRequested()}}module.exports=function dispatchRequest(config){throwIfCancellationRequested(config);if(config.baseURL&&!isAbsoluteURL(config.url)){config.url=combineURLs(config.baseURL,config.url)}config.headers=config.headers||{};config.data=transformData(config.data,config.headers,config.transformRequest);config.headers=utils.merge(config.headers.common||{},config.headers[config.method]||{},config.headers||{});utils.forEach(["delete","get","head","post","put","patch","common"],function cleanHeaderConfig(method){delete config.headers[method]});var adapter=config.adapter||defaults.adapter;return adapter(config).then(function onAdapterResolution(response){throwIfCancellationRequested(config);response.data=transformData(response.data,response.headers,config.transformResponse);return response},function onAdapterRejection(reason){if(!isCancel(reason)){throwIfCancellationRequested(config);if(reason&&reason.response){reason.response.data=transformData(reason.response.data,reason.response.headers,config.transformResponse)}}return Promise.reject(reason)})}},{"../cancel/isCancel":11,"../defaults":19,"./../helpers/combineURLs":23,"./../helpers/isAbsoluteURL":25,"./../utils":30,"./transformData":18}],16:[function(require,module,exports){"use strict";module.exports=function enhanceError(error,config,code,request,response){error.config=config;if(code){error.code=code}error.request=request;error.response=response;return error}},{}],17:[function(require,module,exports){"use strict";var createError=require("./createError");module.exports=function settle(resolve,reject,response){var validateStatus=response.config.validateStatus;if(!response.status||!validateStatus||validateStatus(response.status)){resolve(response)}else{reject(createError("Request failed with status code "+response.status,response.config,null,response.request,response))}}},{"./createError":14}],18:[function(require,module,exports){"use strict";var utils=require("./../utils");module.exports=function transformData(data,headers,fns){utils.forEach(fns,function transform(fn){data=fn(data,headers)});return data}},{"./../utils":30}],19:[function(require,module,exports){(function(process){"use strict";var utils=require("./utils");var normalizeHeaderName=require("./helpers/normalizeHeaderName");var DEFAULT_CONTENT_TYPE={"Content-Type":"application/x-www-form-urlencoded"};function setContentTypeIfUnset(headers,value){if(!utils.isUndefined(headers)&&utils.isUndefined(headers["Content-Type"])){headers["Content-Type"]=value}}function getDefaultAdapter(){var adapter;if(typeof XMLHttpRequest!=="undefined"){adapter=require("./adapters/xhr")}else if(typeof process!=="undefined"){adapter=require("./adapters/http")}return adapter}var defaults={adapter:getDefaultAdapter(),transformRequest:[function transformRequest(data,headers){normalizeHeaderName(headers,"Content-Type");if(utils.isFormData(data)||utils.isArrayBuffer(data)||utils.isBuffer(data)||utils.isStream(data)||utils.isFile(data)||utils.isBlob(data)){return data}if(utils.isArrayBufferView(data)){return data.buffer}if(utils.isURLSearchParams(data)){setContentTypeIfUnset(headers,"application/x-www-form-urlencoded;charset=utf-8");return data.toString()}if(utils.isObject(data)){setContentTypeIfUnset(headers,"application/json;charset=utf-8");return JSON.stringify(data)}return data}],transformResponse:[function transformResponse(data){if(typeof data==="string"){try{data=JSON.parse(data)}catch(e){}}return data}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function validateStatus(status){return status>=200&&status<300}};defaults.headers={common:{Accept:"application/json, text/plain, */*"}};utils.forEach(["delete","get","head"],function forEachMethodNoData(method){defaults.headers[method]={}});utils.forEach(["post","put","patch"],function forEachMethodWithData(method){defaults.headers[method]=utils.merge(DEFAULT_CONTENT_TYPE)});module.exports=defaults}).call(this,require("_process"))},{"./adapters/http":7,"./adapters/xhr":7,"./helpers/normalizeHeaderName":27,"./utils":30,_process:32}],20:[function(require,module,exports){"use strict";module.exports=function bind(fn,thisArg){return function wrap(){var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i]}return fn.apply(thisArg,args)}}},{}],21:[function(require,module,exports){"use strict";var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function E(){this.message="String contains an invalid character"}E.prototype=new Error;E.prototype.code=5;E.prototype.name="InvalidCharacterError";function btoa(input){var str=String(input);var output="";for(var block,charCode,idx=0,map=chars;str.charAt(idx|0)||(map="=",idx%1);output+=map.charAt(63&block>>8-idx%1*8)){charCode=str.charCodeAt(idx+=3/4);if(charCode>255){throw new E}block=block<<8|charCode}return output}module.exports=btoa},{}],22:[function(require,module,exports){"use strict";var utils=require("./../utils");function encode(val){return encodeURIComponent(val).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}module.exports=function buildURL(url,params,paramsSerializer){if(!params){return url}var serializedParams;if(paramsSerializer){serializedParams=paramsSerializer(params)}else if(utils.isURLSearchParams(params)){serializedParams=params.toString()}else{var parts=[];utils.forEach(params,function serialize(val,key){if(val===null||typeof val==="undefined"){return}if(utils.isArray(val)){key=key+"[]"}else{val=[val]}utils.forEach(val,function parseValue(v){if(utils.isDate(v)){v=v.toISOString()}else if(utils.isObject(v)){v=JSON.stringify(v)}parts.push(encode(key)+"="+encode(v))})});serializedParams=parts.join("&")}if(serializedParams){url+=(url.indexOf("?")===-1?"?":"&")+serializedParams}return url}},{"./../utils":30}],23:[function(require,module,exports){"use strict";module.exports=function combineURLs(baseURL,relativeURL){return relativeURL?baseURL.replace(/\/+$/,"")+"/"+relativeURL.replace(/^\/+/,""):baseURL}},{}],24:[function(require,module,exports){"use strict";var utils=require("./../utils");module.exports=utils.isStandardBrowserEnv()?function standardBrowserEnv(){return{write:function write(name,value,expires,path,domain,secure){var cookie=[];cookie.push(name+"="+encodeURIComponent(value));if(utils.isNumber(expires)){cookie.push("expires="+new Date(expires).toGMTString())}if(utils.isString(path)){cookie.push("path="+path)}if(utils.isString(domain)){cookie.push("domain="+domain)}if(secure===true){cookie.push("secure")}document.cookie=cookie.join("; ")},read:function read(name){var match=document.cookie.match(new RegExp("(^|;\\s*)("+name+")=([^;]*)"));return match?decodeURIComponent(match[3]):null},remove:function remove(name){this.write(name,"",Date.now()-864e5)}}}():function nonStandardBrowserEnv(){return{write:function write(){},read:function read(){return null},remove:function remove(){}}}()},{"./../utils":30}],25:[function(require,module,exports){"use strict";module.exports=function isAbsoluteURL(url){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)}},{}],26:[function(require,module,exports){"use strict";var utils=require("./../utils");module.exports=utils.isStandardBrowserEnv()?function standardBrowserEnv(){var msie=/(msie|trident)/i.test(navigator.userAgent);var urlParsingNode=document.createElement("a");var originURL;function resolveURL(url){var href=url;if(msie){urlParsingNode.setAttribute("href",href);href=urlParsingNode.href}urlParsingNode.setAttribute("href",href);return{href:urlParsingNode.href,protocol:urlParsingNode.protocol?urlParsingNode.protocol.replace(/:$/,""):"",host:urlParsingNode.host,search:urlParsingNode.search?urlParsingNode.search.replace(/^\?/,""):"",hash:urlParsingNode.hash?urlParsingNode.hash.replace(/^#/,""):"",hostname:urlParsingNode.hostname,port:urlParsingNode.port,pathname:urlParsingNode.pathname.charAt(0)==="/"?urlParsingNode.pathname:"/"+urlParsingNode.pathname}}originURL=resolveURL(window.location.href);return function isURLSameOrigin(requestURL){var parsed=utils.isString(requestURL)?resolveURL(requestURL):requestURL;return parsed.protocol===originURL.protocol&&parsed.host===originURL.host}}():function nonStandardBrowserEnv(){return function isURLSameOrigin(){return true}}()},{"./../utils":30}],27:[function(require,module,exports){"use strict";var utils=require("../utils");module.exports=function normalizeHeaderName(headers,normalizedName){utils.forEach(headers,function processHeader(value,name){if(name!==normalizedName&&name.toUpperCase()===normalizedName.toUpperCase()){headers[normalizedName]=value;delete headers[name]}})}},{"../utils":30}],28:[function(require,module,exports){"use strict";var utils=require("./../utils");var ignoreDuplicateOf=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];module.exports=function parseHeaders(headers){var parsed={};var key;var val;var i;if(!headers){return parsed}utils.forEach(headers.split("\n"),function parser(line){i=line.indexOf(":");key=utils.trim(line.substr(0,i)).toLowerCase();val=utils.trim(line.substr(i+1));if(key){if(parsed[key]&&ignoreDuplicateOf.indexOf(key)>=0){return}if(key==="set-cookie"){parsed[key]=(parsed[key]?parsed[key]:[]).concat([val])}else{parsed[key]=parsed[key]?parsed[key]+", "+val:val}}});return parsed}},{"./../utils":30}],29:[function(require,module,exports){"use strict";module.exports=function spread(callback){return function wrap(arr){return callback.apply(null,arr)}}},{}],30:[function(require,module,exports){"use strict";var bind=require("./helpers/bind");var isBuffer=require("is-buffer");var toString=Object.prototype.toString;function isArray(val){return toString.call(val)==="[object Array]"}function isArrayBuffer(val){return toString.call(val)==="[object ArrayBuffer]"}function isFormData(val){return typeof FormData!=="undefined"&&val instanceof FormData}function isArrayBufferView(val){var result;if(typeof ArrayBuffer!=="undefined"&&ArrayBuffer.isView){result=ArrayBuffer.isView(val)}else{result=val&&val.buffer&&val.buffer instanceof ArrayBuffer}return result}function isString(val){return typeof val==="string"}function isNumber(val){return typeof val==="number"}function isUndefined(val){return typeof val==="undefined"}function isObject(val){return val!==null&&typeof val==="object"}function isDate(val){return toString.call(val)==="[object Date]"}function isFile(val){return toString.call(val)==="[object File]"}function isBlob(val){return toString.call(val)==="[object Blob]"}function isFunction(val){return toString.call(val)==="[object Function]"}function isStream(val){return isObject(val)&&isFunction(val.pipe)}function isURLSearchParams(val){return typeof URLSearchParams!=="undefined"&&val instanceof URLSearchParams}function trim(str){return str.replace(/^\s*/,"").replace(/\s*$/,"")}function isStandardBrowserEnv(){if(typeof navigator!=="undefined"&&navigator.product==="ReactNative"){return false}return typeof window!=="undefined"&&typeof document!=="undefined"}function forEach(obj,fn){if(obj===null||typeof obj==="undefined"){return}if(typeof obj!=="object"){obj=[obj]}if(isArray(obj)){for(var i=0,l=obj.length;i<l;i++){fn.call(null,obj[i],i,obj)}}else{for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){fn.call(null,obj[key],key,obj)}}}}function merge(){var result={};function assignValue(val,key){if(typeof result[key]==="object"&&typeof val==="object"){result[key]=merge(result[key],val)}else{result[key]=val}}for(var i=0,l=arguments.length;i<l;i++){forEach(arguments[i],assignValue)}return result}function extend(a,b,thisArg){forEach(b,function assignValue(val,key){if(thisArg&&typeof val==="function"){a[key]=bind(val,thisArg)}else{a[key]=val}});return a}module.exports={isArray:isArray,isArrayBuffer:isArrayBuffer,isBuffer:isBuffer,isFormData:isFormData,isArrayBufferView:isArrayBufferView,isString:isString,isNumber:isNumber,isObject:isObject,isUndefined:isUndefined,isDate:isDate,isFile:isFile,isBlob:isBlob,isFunction:isFunction,isStream:isStream,isURLSearchParams:isURLSearchParams,isStandardBrowserEnv:isStandardBrowserEnv,forEach:forEach,merge:merge,extend:extend,trim:trim}},{"./helpers/bind":20,"is-buffer":31}],31:[function(require,module,exports){module.exports=function(obj){return obj!=null&&(isBuffer(obj)||isSlowBuffer(obj)||!!obj._isBuffer)};function isBuffer(obj){return!!obj.constructor&&typeof obj.constructor.isBuffer==="function"&&obj.constructor.isBuffer(obj)}function isSlowBuffer(obj){return typeof obj.readFloatLE==="function"&&typeof obj.slice==="function"&&isBuffer(obj.slice(0,0))}},{}],32:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){cachedSetTimeout=setTimeout}else{cachedSetTimeout=defaultSetTimout}}catch(e){cachedSetTimeout=defaultSetTimout}try{if(typeof clearTimeout==="function"){cachedClearTimeout=clearTimeout}else{cachedClearTimeout=defaultClearTimeout}}catch(e){cachedClearTimeout=defaultClearTimeout}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;runClearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]};process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},{}]},{},[1]);