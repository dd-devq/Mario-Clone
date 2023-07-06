(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.6.0"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.6.0"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.6.0"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.6.0"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),n=e=>e||a(t.precache);function r(e,t){const s=t();return e.waitUntil(s),s}function i(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:a}=t;if(!a)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}s(977);class c{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class o{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let h;function l(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=new Set;function f(e){return"string"==typeof e?new Request(e):e}s(873);class p{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let a=f(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=f(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const a=f(t);await(0,new Promise((e=>setTimeout(e,0))));const n=await this.getCacheKey(a,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=n.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),p=u?await async function(e,t,s,a){const n=l(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),i=await e.keys(t,r);for(const t of i)if(n===l(t.url,s))return e.match(t,a)}(h,n.clone(),["__WB_REVISION__"],o):null;try{await h.put(n,u?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:p,newResponse:i.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=f(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g{constructor(e={}){this.cacheName=e.cacheName||a(t.runtime),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new p(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(t,s,a){let n;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,t),!n||"error"===n.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(n=await r({error:e,event:a,request:s}),n)break;if(!n)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))n=await e({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}class y extends g{constructor(e={}){e.cacheName=n(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(y.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=n.integrity,r=t.integrity,i=!r||r===e;a=await s.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||e:void 0})),e&&i&&"no-cors"!==t.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,a.clone()))}return a}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(t);if(!await s.cachePut(t,a.clone()))throw new e("bad-precaching-response",{url:t.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==y.copyRedirectedCacheableResponsesPlugin&&(a===y.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(y.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}y.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},y.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let a=null;if(t.url&&(a=new URL(t.url).origin),a!==self.location.origin)throw new e("cross-origin-copy-response",{origin:a});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?n.body:await n.blob();return new Response(c,i)}(t):t};class w{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new y({cacheName:n(e),plugins:[...t,new o({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const a of t){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:t,url:n}=i(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:t});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==a.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(t,a.integrity)}if(this._urlsToCacheKeys.set(n,t),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return r(e,(async()=>{const t=new c;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return r(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}let m;const _=()=>(m||(m=new w),m);s(80);const R=e=>e&&"object"==typeof e?e:{handle:e};class v{constructor(e,t,s="GET"){this.handler=R(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=R(e)}}class C extends v{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class b{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,R(e))}setCatchHandler(e){this._catchHandler=R(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let q;class U extends v{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(n);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}var L;L=[{'revision':'63faea39b3197878b565ab61d29fc429','url':'assets/PixelAdventure.tiled-session'},{'revision':'1fdd8d1e34f5dd5e4444da7247d91c5c','url':'assets/audio/coin.mp3'},{'revision':'73a914c39ad5366c1adf88bb3261178e','url':'assets/audio/death.mp3'},{'revision':'c7544a5c5ce940851acd8a44bba1c02d','url':'assets/audio/gameOver.mp3'},{'revision':'7f62fc46663b1050bcba9f53688ddd84','url':'assets/audio/hereWeGo.mp3'},{'revision':'971c7229103b3edce1bd576ecd680dbe','url':'assets/audio/intro.mp3'},{'revision':'f73a1901a3dfa3f06156bdd045d9d160','url':'assets/audio/jumpHigh.mp3'},{'revision':'61aed115d56d837bc4101d3e78724c46','url':'assets/audio/jumpLow.mp3'},{'revision':'0e5a755d0fe045b433e325f1fa5827c5','url':'assets/audio/powerUp.mp3'},{'revision':'57cdf1199b04bdd04f08945bc2cf9a30','url':'assets/audio/theme.mp3'},{'revision':'798ead53359346245e777b6fe715501d','url':'assets/audio/win.mp3'},{'revision':'6c5ad3a6d05cdf753380ff54eff47673','url':'assets/level/Level1.json'},{'revision':'0767394167a36c7b32cfe72532e4b84c','url':'assets/level/Level1.tmx'},{'revision':'781fd5443bef50487296f1f23c5aa8c1','url':'assets/level/Terrain.tsx'},{'revision':'73730ecfde474d999a027b06288751b6','url':'assets/sprites/20 Enemies.png'},{'revision':'f86e07aab82505fc49710152f83cc385','url':'assets/sprites/Background/Blue.png'},{'revision':'45c9c887fa73b0ade76974de63ab9157','url':'assets/sprites/Background/Brown.png'},{'revision':'31fb9bc36ec926ee64d999d3387b7e09','url':'assets/sprites/Background/Gray.png'},{'revision':'e6eeace8a9d516f2e9768e5228e824fb','url':'assets/sprites/Background/Green.png'},{'revision':'31b5e360eb9610c58138bb7cfdfb96a1','url':'assets/sprites/Background/Pink.png'},{'revision':'f8cc6aa8fd738e6e4db8b6607b7e6c37','url':'assets/sprites/Background/Purple.png'},{'revision':'c3f96416e21f366bc0c3635ce5b530d5','url':'assets/sprites/Background/Yellow.png'},{'revision':'a55305158db44491131714a2496e6054','url':'assets/sprites/Hello.png'},{'revision':'903e8cddbfc8055f0f48b419cf458a60','url':'assets/sprites/Items/Boxes/Box1/Break.png'},{'revision':'93801a866811246a9b608fee26b0d1fd','url':'assets/sprites/Items/Boxes/Box1/Hit (28x24).png'},{'revision':'d0c63302c00f5e0e9bc3bcffefe3c3fe','url':'assets/sprites/Items/Boxes/Box1/Idle.png'},{'revision':'1be585cdc218d7ac43f127498803c283','url':'assets/sprites/Items/Boxes/Box2/Break.png'},{'revision':'7640893b496fd0397eeba89e74e40ea5','url':'assets/sprites/Items/Boxes/Box2/Hit (28x24).png'},{'revision':'fd7e46184141631c675a0cb993d3df19','url':'assets/sprites/Items/Boxes/Box2/Idle.png'},{'revision':'6d23401e8929d47311c40131196da579','url':'assets/sprites/Items/Boxes/Box3/Break.png'},{'revision':'27ae8e072417ebe7a11dc56476aa295a','url':'assets/sprites/Items/Boxes/Box3/Hit (28x24).png'},{'revision':'21bb703677084f2aaf62323b83483f8e','url':'assets/sprites/Items/Boxes/Box3/Idle.png'},{'revision':'dd8752c20a0f69ab173f1ead16044462','url':'assets/sprites/Items/Checkpoints/Checkpoint/Checkpoint (Flag Idle)(64x64).png'},{'revision':'c4730e5429a75691e2d2a9351c76738e','url':'assets/sprites/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out) (64x64).png'},{'revision':'9126203dc833ec3b7dfb7a05e41910e5','url':'assets/sprites/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png'},{'revision':'e3627d7da583875ddef9a17036cec767','url':'assets/sprites/Items/Checkpoints/End/End (Idle).png'},{'revision':'1ce36017dfe561556f75324a065bc4df','url':'assets/sprites/Items/Checkpoints/End/End (Pressed) (64x64).png'},{'revision':'3b3666dde41d33e4ae75c6e614dd5f51','url':'assets/sprites/Items/Checkpoints/Start/Start (Idle).png'},{'revision':'3c1467f4bf5f1e0c877f66a8a05900b8','url':'assets/sprites/Items/Checkpoints/Start/Start (Moving) (64x64).png'},{'revision':'de3dbfa7d33e6bb344d0560e36d8bf53','url':'assets/sprites/Items/Fruits/Apple.png'},{'revision':'03466a1dbd95724e705efe17e72c1c4e','url':'assets/sprites/Items/Fruits/Bananas.png'},{'revision':'fc2a60aee885c33d0d10e643157213e4','url':'assets/sprites/Items/Fruits/Cherries.png'},{'revision':'0aa8cdedde5af58d5222c2db1e0a96de','url':'assets/sprites/Items/Fruits/Collected.png'},{'revision':'3d903dd9bf3421c31a5373b0920c876e','url':'assets/sprites/Items/Fruits/Kiwi.png'},{'revision':'eb6f978fbf95d76587bcf656c649540b','url':'assets/sprites/Items/Fruits/Melon.png'},{'revision':'60e0f68620c442b9403a477bbe3588ed','url':'assets/sprites/Items/Fruits/Orange.png'},{'revision':'0740bf84a38504383c80103d60582217','url':'assets/sprites/Items/Fruits/Pineapple.png'},{'revision':'568a3f91b8f6102f1b518c1aba0e8e09','url':'assets/sprites/Items/Fruits/Strawberry.png'},{'revision':'9449bf1f8d68ac08331aa091d6095e34','url':'assets/sprites/Main Characters/Appearing.png'},{'revision':'1284313649da02eccc0d3ed6796996a3','url':'assets/sprites/Main Characters/Desappearing.png'},{'revision':'5afb26aa4240eff1eab105eb3263ab83','url':'assets/sprites/Main Characters/Mask Dude/Double Jump.png'},{'revision':'469d2d7814fa8258325eb5d305808315','url':'assets/sprites/Main Characters/Mask Dude/Fall.png'},{'revision':'d03a7bbce7fbda59dd057397f86a8899','url':'assets/sprites/Main Characters/Mask Dude/Hit.png'},{'revision':'29c95dbb63a9bf44c42821aa0cf49de8','url':'assets/sprites/Main Characters/Mask Dude/Idle.png'},{'revision':'99da59b514370539951a76ba1fe51821','url':'assets/sprites/Main Characters/Mask Dude/Jump.png'},{'revision':'b04bbc82dc692516a4b13c0d9d5b9ebd','url':'assets/sprites/Main Characters/Mask Dude/Run.png'},{'revision':'552254b40eac6d10d2c3d779edb92116','url':'assets/sprites/Main Characters/Mask Dude/Wall Jump.png'},{'revision':'351c1df6eb5ac94209e8e490ab816879','url':'assets/sprites/Main Characters/Ninja Frog/Double Jump.png'},{'revision':'ef8f3627041b7ae2a1dc76dfc3e419f3','url':'assets/sprites/Main Characters/Ninja Frog/Fall.png'},{'revision':'4c1ba2bf4e576409abbbd1aacc91d51d','url':'assets/sprites/Main Characters/Ninja Frog/Hit.png'},{'revision':'cb655be6f9354444720c7ce1dbd61dae','url':'assets/sprites/Main Characters/Ninja Frog/Idle.png'},{'revision':'4f048ccbc783c8eb3824be9651da8a34','url':'assets/sprites/Main Characters/Ninja Frog/Jump.png'},{'revision':'fb191b4e6ac599286c38e496a700cfd2','url':'assets/sprites/Main Characters/Ninja Frog/Run.png'},{'revision':'37ec0be0f82c3750a07efa558c032ee7','url':'assets/sprites/Main Characters/Ninja Frog/Wall Jump.png'},{'revision':'c76baa04d956c9d985c79643d7b2f672','url':'assets/sprites/Main Characters/Pink Man/Double Jump.png'},{'revision':'a20bd61d76132e4301fcfe7aa02ca9ba','url':'assets/sprites/Main Characters/Pink Man/Fall.png'},{'revision':'5d93268a09fb2959e1755da4ba201f9e','url':'assets/sprites/Main Characters/Pink Man/Hit.png'},{'revision':'1b35f85f1241dc1f0597cafbe1eac7f6','url':'assets/sprites/Main Characters/Pink Man/Idle.png'},{'revision':'cafaf2f48f36c9a6655a37f9c1c47b4a','url':'assets/sprites/Main Characters/Pink Man/Jump.png'},{'revision':'25fcce89dfb6673a81d384091c87353d','url':'assets/sprites/Main Characters/Pink Man/Run.png'},{'revision':'955d352171a2b666ae705b6205856ce1','url':'assets/sprites/Main Characters/Pink Man/Wall Jump.png'},{'revision':'612926916a3e8c5deff2023722c465ac','url':'assets/sprites/Main Characters/Virtual Guy/Double Jump.png'},{'revision':'5eb8c32845fad5fcc7794247eb91aed0','url':'assets/sprites/Main Characters/Virtual Guy/Fall.png'},{'revision':'bbd39134a77e658b0b9b64ded537972c','url':'assets/sprites/Main Characters/Virtual Guy/Hit.png'},{'revision':'1cb575929ac10fe13dfafa61d78ba28d','url':'assets/sprites/Main Characters/Virtual Guy/Idle.png'},{'revision':'f28e95fc98b251913baf3a21d5602381','url':'assets/sprites/Main Characters/Virtual Guy/Jump.png'},{'revision':'016f388a07f71a930fd79a7a806d5da8','url':'assets/sprites/Main Characters/Virtual Guy/Run.png'},{'revision':'76cbdd4a22d50bd65ac02be8a5eb1547','url':'assets/sprites/Main Characters/Virtual Guy/Wall Jump.png'},{'revision':'b9bb58144606336efcd4862d35482f47','url':'assets/sprites/Menu/Buttons/Achievements.png'},{'revision':'661cfd0fdba294a951eb63c556684a64','url':'assets/sprites/Menu/Buttons/Back.png'},{'revision':'5c3a207383c5642288b01d314855a42a','url':'assets/sprites/Menu/Buttons/Close.png'},{'revision':'e3854b8ad5633b1f8017d08b7a783047','url':'assets/sprites/Menu/Buttons/Leaderboard.png'},{'revision':'5364f08108b6f75ff31b5b7c84f9789a','url':'assets/sprites/Menu/Buttons/Levels.png'},{'revision':'2f75777c57c36c83c6140bbd7b97a5e1','url':'assets/sprites/Menu/Buttons/Next.png'},{'revision':'23f2b2a41eb467518bbfef795d876dc8','url':'assets/sprites/Menu/Buttons/Play.png'},{'revision':'c63a3a14721d926b03801f38b81b66a6','url':'assets/sprites/Menu/Buttons/Previous.png'},{'revision':'45fe1343f546485e8e288b122467f2fd','url':'assets/sprites/Menu/Buttons/Restart.png'},{'revision':'a56908d71e428647c51e73af372739ab','url':'assets/sprites/Menu/Buttons/Settings.png'},{'revision':'60060aab64ff40a0a996820f64a308b3','url':'assets/sprites/Menu/Buttons/Volume.png'},{'revision':'d7f6549e6809bd7867b8eddd75e6bf21','url':'assets/sprites/Menu/Levels/01.png'},{'revision':'08508f40b546910b1402b3112090f91b','url':'assets/sprites/Menu/Levels/02.png'},{'revision':'1f9f974b587331877eed69671dd0e4eb','url':'assets/sprites/Menu/Levels/03.png'},{'revision':'1b53eb9a9fcb93f627f874626999b9eb','url':'assets/sprites/Menu/Levels/04.png'},{'revision':'616f770983d550594de6dce58cdfd5b8','url':'assets/sprites/Menu/Levels/05.png'},{'revision':'51a447ce69fcff71e80170c780f9c28f','url':'assets/sprites/Menu/Levels/06.png'},{'revision':'c88c31a2ad1ec997f056c337bb14fd69','url':'assets/sprites/Menu/Levels/07.png'},{'revision':'7cf0a9570d1e462911f42f3b53e050f7','url':'assets/sprites/Menu/Levels/08.png'},{'revision':'baed976d717bd3d06dfee2ea39d78001','url':'assets/sprites/Menu/Levels/09.png'},{'revision':'ce544e6879468566e1b066c7f19d56c2','url':'assets/sprites/Menu/Levels/10.png'},{'revision':'6ff53942f0ce0fcb9a306e580fa97f39','url':'assets/sprites/Menu/Levels/11.png'},{'revision':'04accdc4c4f1d3d280b68d470534a78f','url':'assets/sprites/Menu/Levels/12.png'},{'revision':'493285cf2283a88931bc4d22bbe8e349','url':'assets/sprites/Menu/Levels/13.png'},{'revision':'3ebc69f789c0e9dcee5cf8ab5824a11b','url':'assets/sprites/Menu/Levels/14.png'},{'revision':'54f287e88233a1920a1eb939d96e3b5b','url':'assets/sprites/Menu/Levels/15.png'},{'revision':'fad064526892b2616b527a15bf77fe4c','url':'assets/sprites/Menu/Levels/16.png'},{'revision':'286c8805e99d6970b39b38f7be879b1f','url':'assets/sprites/Menu/Levels/17.png'},{'revision':'4f675585ad0a1944e9fc80e5e6dcb486','url':'assets/sprites/Menu/Levels/18.png'},{'revision':'c976c40625f767184f1abe468db5f375','url':'assets/sprites/Menu/Levels/19.png'},{'revision':'84affb6c644a02eeb2ca3289a4478f33','url':'assets/sprites/Menu/Levels/20.png'},{'revision':'00647eca8e6ed0149fb651a55eed68d5','url':'assets/sprites/Menu/Levels/21.png'},{'revision':'6ac40e97760aee2267872319a5ac1c06','url':'assets/sprites/Menu/Levels/22.png'},{'revision':'c01e777908fc433e2f7e3d48a1af9ada','url':'assets/sprites/Menu/Levels/23.png'},{'revision':'6127aab3b8ff227fa95e49c8facf53d2','url':'assets/sprites/Menu/Levels/24.png'},{'revision':'38f83ad87ce5b9e1033a9808b27232d0','url':'assets/sprites/Menu/Levels/25.png'},{'revision':'4c60a5b7b5675434f647d2964402a84f','url':'assets/sprites/Menu/Levels/26.png'},{'revision':'40265837ef70a977c1acb2efe19b40b1','url':'assets/sprites/Menu/Levels/27.png'},{'revision':'b4f5454651b31f958f55ba10f2102662','url':'assets/sprites/Menu/Levels/28.png'},{'revision':'617b1485fcef9a94953b0608f6dd4215','url':'assets/sprites/Menu/Levels/29.png'},{'revision':'b9d3d9c462ea5f310879644dc22b90ca','url':'assets/sprites/Menu/Levels/30.png'},{'revision':'7332e2ccf70241eef0d3c837eba8560c','url':'assets/sprites/Menu/Levels/31.png'},{'revision':'4e1f62217b65790564c3f903b65e4637','url':'assets/sprites/Menu/Levels/32.png'},{'revision':'682046f85570a44f0902dbc7583615bf','url':'assets/sprites/Menu/Levels/33.png'},{'revision':'4fbd87c9be43814740cb1e07429183c4','url':'assets/sprites/Menu/Levels/34.png'},{'revision':'4ca4713c74ec75f1735473f080cbb1b0','url':'assets/sprites/Menu/Levels/35.png'},{'revision':'0a3663508994f5a64b59b0fd318f8396','url':'assets/sprites/Menu/Levels/36.png'},{'revision':'dc22ace9201c806fdf9fc9cb438d5175','url':'assets/sprites/Menu/Levels/37.png'},{'revision':'b765f20e7e7a16b59262a0ba5e245a20','url':'assets/sprites/Menu/Levels/38.png'},{'revision':'c889d1617a2130f2454ed940eb55e2a6','url':'assets/sprites/Menu/Levels/39.png'},{'revision':'332ce8ae0ea6da6ce0dfe0dab7da5496','url':'assets/sprites/Menu/Levels/40.png'},{'revision':'1ec256afdf7de31a869bc88fddff9943','url':'assets/sprites/Menu/Levels/41.png'},{'revision':'13b602a32df5aae75a97615edc7c57a9','url':'assets/sprites/Menu/Levels/42.png'},{'revision':'9526f399e906a5b10330d8b3a679a4d7','url':'assets/sprites/Menu/Levels/43.png'},{'revision':'1b9f7f955f3e615a21cf8198a6b8ed35','url':'assets/sprites/Menu/Levels/44.png'},{'revision':'d1153f6c9c605634f08a1f5e594e9260','url':'assets/sprites/Menu/Levels/45.png'},{'revision':'5e1bacd2980de985fe15bc3eac170f11','url':'assets/sprites/Menu/Levels/46.png'},{'revision':'30b54134f5a79564400ea90e451d7c18','url':'assets/sprites/Menu/Levels/47.png'},{'revision':'768351a97acbbd8428ca33b073c7a866','url':'assets/sprites/Menu/Levels/48.png'},{'revision':'e4482f7db83104af60eaf931a8b2b1c1','url':'assets/sprites/Menu/Levels/49.png'},{'revision':'b87c87dec1916d3bee96ce69ec9fbb03','url':'assets/sprites/Menu/Levels/50.png'},{'revision':'33dfcfb4172f57930890a12c80f23201','url':'assets/sprites/Menu/Text/Text (Black) (8x10).png'},{'revision':'493235653c61f14237c213dec97a9f2f','url':'assets/sprites/Menu/Text/Text (White) (8x10).png'},{'revision':'e23a201b4bfa7999a176dc9ec004c7bc','url':'assets/sprites/Other/Confetti (16x16).png'},{'revision':'c72fceec8ccfcefc030fbc44ccdd68c4','url':'assets/sprites/Other/Dust Particle.png'},{'revision':'e0a519d1a807df82abc87e6a2375d20f','url':'assets/sprites/Other/Shadow.png'},{'revision':'676092b6943e94a165bea63707f4518f','url':'assets/sprites/Other/Transition.png'},{'revision':'df891f02449c0565d51e2bf7823a0e38','url':'assets/sprites/Terrain/Terrain.png'},{'revision':'5c6f27dc5dca69164b459289dba9b4b3','url':'assets/sprites/Traps/Arrow/Hit (18x18).png'},{'revision':'92996e892443163c02ae05afdce12aeb','url':'assets/sprites/Traps/Arrow/Idle (18x18).png'},{'revision':'7eed54b86ba05522718b349b13256527','url':'assets/sprites/Traps/Blocks/HitSide (22x22).png'},{'revision':'f7a6d02878479b0d8b408ef1d8e071b3','url':'assets/sprites/Traps/Blocks/HitTop (22x22).png'},{'revision':'df28a79558854cd172e8d82df8414110','url':'assets/sprites/Traps/Blocks/Idle.png'},{'revision':'8ed4876040c692b6f353e40ddc9466d4','url':'assets/sprites/Traps/Blocks/Part 1 (22x22).png'},{'revision':'ee32674efcd862136828db547dae6cb5','url':'assets/sprites/Traps/Blocks/Part 2 (22x22).png'},{'revision':'61cbabffca58576e5d8e0b7abf38b95e','url':'assets/sprites/Traps/Falling Platforms/Off.png'},{'revision':'025cf6ddf15c55f73d65ce670e45b94d','url':'assets/sprites/Traps/Falling Platforms/On (32x10).png'},{'revision':'0e7288b787c57532b4549fbdb6bce311','url':'assets/sprites/Traps/Fan/Off.png'},{'revision':'70f1ada6b967d83982dc663d838c88ed','url':'assets/sprites/Traps/Fan/On (24x8).png'},{'revision':'b161b5e6801126c9e999d09bf69ccb97','url':'assets/sprites/Traps/Fire/Hit (16x32).png'},{'revision':'2984d7e69a4f68c94d6ead997e68e3d3','url':'assets/sprites/Traps/Fire/Off.png'},{'revision':'eaf35fcb43611e2d738a475b2a66beae','url':'assets/sprites/Traps/Fire/On (16x32).png'},{'revision':'2c7df5d45d132f6c3e298aaa28f90e94','url':'assets/sprites/Traps/Platforms/Brown Off.png'},{'revision':'9de63939bf58f9e0cdcd28b463724797','url':'assets/sprites/Traps/Platforms/Brown On (32x8).png'},{'revision':'06dd0d1de25353ef396f9850ab16061e','url':'assets/sprites/Traps/Platforms/Chain.png'},{'revision':'5513eff304a382fc4b984d2cf7975cc4','url':'assets/sprites/Traps/Platforms/Grey Off.png'},{'revision':'43a0f74d1389afd48b42aa45455bf1fa','url':'assets/sprites/Traps/Platforms/Grey On (32x8).png'},{'revision':'79bec88f1bab85f2d3304eb64c52e6c6','url':'assets/sprites/Traps/Rock Head/Blink (42x42).png'},{'revision':'a8905ebb8b4ca7775d234e61b70b0e04','url':'assets/sprites/Traps/Rock Head/Bottom Hit (42x42).png'},{'revision':'d627e29f18b4c88d698fada937fdb4f0','url':'assets/sprites/Traps/Rock Head/Idle.png'},{'revision':'29e183472fc139814d5245a14b0c2ebd','url':'assets/sprites/Traps/Rock Head/Left Hit (42x42).png'},{'revision':'c2e11c4f2e75253e649d39f6e0dcb46d','url':'assets/sprites/Traps/Rock Head/Right Hit (42x42).png'},{'revision':'a7bc34c2035ccb90c16b7693209d03fd','url':'assets/sprites/Traps/Rock Head/Top Hit (42x42).png'},{'revision':'e02aefd5f34a1d92c34e403901dfceac','url':'assets/sprites/Traps/Sand Mud Ice/Ice Particle.png'},{'revision':'d9b98c54de3691a1112cd98e273eb651','url':'assets/sprites/Traps/Sand Mud Ice/Mud Particle.png'},{'revision':'5d3b5ca60b81488357c35f295102b2af','url':'assets/sprites/Traps/Sand Mud Ice/Sand Mud Ice (16x6).png'},{'revision':'4eb5d75f4ac258086dc6033848b861c1','url':'assets/sprites/Traps/Sand Mud Ice/Sand Particle.png'},{'revision':'69669f8f421b508058cdf1232dc49e28','url':'assets/sprites/Traps/Saw/Chain.png'},{'revision':'66d27386fec46e0b052941957d9bdc22','url':'assets/sprites/Traps/Saw/Off.png'},{'revision':'817477a39df8b330334e3866c1cb574b','url':'assets/sprites/Traps/Saw/On (38x38).png'},{'revision':'9bbd5e13344ea15e95a0f4fd6aa69c58','url':'assets/sprites/Traps/Spike Head/Blink (54x52).png'},{'revision':'874481bac6b073f542879e7463e40803','url':'assets/sprites/Traps/Spike Head/Bottom Hit (54x52).png'},{'revision':'186a0ffbe08411c54dba5e5e5895fec5','url':'assets/sprites/Traps/Spike Head/Idle.png'},{'revision':'1c14ae2c7378d90e92307e9fa5998540','url':'assets/sprites/Traps/Spike Head/Left Hit (54x52).png'},{'revision':'6f7f8c608eb77606721304f074ff439b','url':'assets/sprites/Traps/Spike Head/Right Hit (54x52).png'},{'revision':'cd0107843e57eba78eb61589422d8ec7','url':'assets/sprites/Traps/Spike Head/Top Hit (54x52).png'},{'revision':'16dff8265ca29df58e378bebbdd40295','url':'assets/sprites/Traps/Spiked Ball/Chain.png'},{'revision':'80489916819a87e28af7fbb56eed2181','url':'assets/sprites/Traps/Spiked Ball/Spiked Ball.png'},{'revision':'64c275b1b14a4c8cd49088ce8ebf0db5','url':'assets/sprites/Traps/Spikes/Idle.png'},{'revision':'9a1c4cc3188aaae2247f378b2458b9d9','url':'assets/sprites/Traps/Trampoline/Idle.png'},{'revision':'1c868ca3c1adb54c332a149e7e55f130','url':'assets/sprites/Traps/Trampoline/Jump (28x28).png'},{'revision':'57040e5677322118f6d56a1d9e43c5c6','url':'favicon.ico'},{'revision':'2ffbc23293ee8a797bc61e9c02534206','url':'icons/icons-192.png'},{'revision':'8bdcc486cda9b423f50e886f2ddb6604','url':'icons/icons-512.png'},{'revision':'d933c30561cec9959cf616531f9f34fa','url':'index.html'},{'revision':null,'url':'main.c5344a361896e0f1dde3.bundle.js'},{'revision':'f8bd4984b352f5c431ee747c8c785cfc','url':'manifest.json'},{'revision':null,'url':'vendors.6b48a5379ccccad43957.bundle.js'},{'revision':'b27af4cb25f5aa273044748188e8887c','url':'vendors.6b48a5379ccccad43957.bundle.js.LICENSE.txt'}],_().precache(L),function(t){const s=_();!function(t,s,a){let n;if("string"==typeof t){const e=new URL(t,location.href);n=new v((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)n=new C(t,s,a);else if("function"==typeof t)n=new v(t,s,a);else{if(!(t instanceof v))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}(q||(q=new b,q.addFetchListener(),q.addCacheListener()),q).registerRoute(n)}(new U(s,t))}(undefined)})()})();