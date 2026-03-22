import{O as mt,P as ih}from"./index-62Wwk-p-.js";function ah(L,ee){for(var re=0;re<ee.length;re++){const K=ee[re];if(typeof K!="string"&&!Array.isArray(K)){for(const ne in K)if(ne!=="default"&&!(ne in L)){const pe=Object.getOwnPropertyDescriptor(K,ne);pe&&Object.defineProperty(L,ne,pe.get?pe:{enumerable:!0,get:()=>K[ne]})}}}return Object.freeze(Object.defineProperty(L,Symbol.toStringTag,{value:"Module"}))}var ns={},wa={};Object.defineProperty(wa,"__esModule",{value:!0});wa.baseAssetPath=void 0;const nh=typeof window<"u"&&typeof window.document<"u",Vp=nh?window.document.currentScript:null;let Hp="/";Vp&&(Hp=Vp.src.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^/]+$/,"/"));wa.baseAssetPath=Hp;var yi={};Object.defineProperty(yi,"__esModule",{value:!0});yi.defaultModelFetcher=void 0;const sh=L=>fetch(L).then(ee=>ee.arrayBuffer());yi.defaultModelFetcher=sh;var Xt={},fr={};Object.defineProperty(fr,"__esModule",{value:!0});fr.log=void 0;const as=L=>ee=>{console.log(`VAD | ${L} >`,ee)};fr.log={error:as("error"),debug:as("debug"),warn:as("warn")};var Yr={};Object.defineProperty(Yr,"__esModule",{value:!0});Yr.Message=void 0;var qp;(function(L){L.AudioFrame="AUDIO_FRAME",L.SpeechStart="SPEECH_START",L.VADMisfire="VAD_MISFIRE",L.SpeechEnd="SPEECH_END",L.SpeechStop="SPEECH_STOP",L.SpeechRealStart="SPEECH_REAL_START",L.FrameProcessed="FRAME_PROCESSED"})(qp||(Yr.Message=qp={}));Object.defineProperty(Xt,"__esModule",{value:!0});Xt.FrameProcessor=Xt.validateOptions=Xt.defaultFrameProcessorOptions=void 0;const ga=fr,Xr=Yr;Xt.defaultFrameProcessorOptions={positiveSpeechThreshold:.3,negativeSpeechThreshold:.25,preSpeechPadMs:800,redemptionMs:1400,minSpeechMs:400,submitUserSpeechOnPause:!1};function oh(L){(L.positiveSpeechThreshold<0||L.positiveSpeechThreshold>1)&&ga.log.error("positiveSpeechThreshold should be a number between 0 and 1"),(L.negativeSpeechThreshold<0||L.negativeSpeechThreshold>L.positiveSpeechThreshold)&&ga.log.error("negativeSpeechThreshold should be between 0 and positiveSpeechThreshold"),L.preSpeechPadMs<0&&ga.log.error("preSpeechPadMs should be positive"),L.redemptionMs<0&&ga.log.error("redemptionMs should be positive"),L.minSpeechMs<0&&ga.log.error("minSpeechMs should be positive")}Xt.validateOptions=oh;const Fp=L=>{const ee=L.reduce((K,ne)=>(K.push(K.at(-1)+ne.length),K),[0]),re=new Float32Array(ee.at(-1));return L.forEach((K,ne)=>{const pe=ee[ne];re.set(K,pe)}),re};function Wp(L,ee){const re=Math.floor(L.redemptionMs/ee),K=Math.floor(L.preSpeechPadMs/ee),ne=Math.floor(L.minSpeechMs/ee);return{redemptionFrames:re,preSpeechPadFrames:K,minSpeechFrames:ne}}class uh{constructor(ee,re,K,ne){this.modelProcessFunc=ee,this.modelResetFunc=re,this.options=K,this.msPerFrame=ne,this.speaking=!1,this.redemptionCounter=0,this.speechFrameCount=0,this.active=!1,this.speechRealStartFired=!1,this.setOptions=z=>{this.options={...this.options,...z};const{redemptionFrames:be,preSpeechPadFrames:Je,minSpeechFrames:Ve}=Wp(this.options,this.msPerFrame);this.redemptionFrames=be,this.preSpeechPadFrames=Je,this.minSpeechFrames=Ve},this.reset=()=>{this.speaking=!1,this.speechRealStartFired=!1,this.audioBuffer=[],this.modelResetFunc(),this.redemptionCounter=0,this.speechFrameCount=0},this.pause=z=>{this.active=!1,this.options.submitUserSpeechOnPause?this.endSegment(z):this.reset()},this.resume=()=>{this.active=!0},this.endSegment=z=>{const be=this.audioBuffer;this.audioBuffer=[];const Je=this.speaking;if(this.reset(),Je)if(be.reduce((ve,$e)=>$e.isSpeech?ve+1:ve,0)>=this.minSpeechFrames){const ve=Fp(be.map($e=>$e.frame));z({msg:Xr.Message.SpeechEnd,audio:ve})}else z({msg:Xr.Message.VADMisfire});return{}},this.process=async(z,be)=>{if(!this.active)return;const Je=await this.modelProcessFunc(z),Ve=Je.isSpeech>=this.options.positiveSpeechThreshold;if(be({probs:Je,msg:Xr.Message.FrameProcessed,frame:z}),this.audioBuffer.push({frame:z,isSpeech:Ve}),Ve&&(this.speechFrameCount++,this.redemptionCounter=0),Ve&&!this.speaking&&(this.speaking=!0,be({msg:Xr.Message.SpeechStart})),this.speaking&&this.speechFrameCount===this.minSpeechFrames&&!this.speechRealStartFired&&(this.speechRealStartFired=!0,be({msg:Xr.Message.SpeechRealStart})),Je.isSpeech<this.options.negativeSpeechThreshold&&this.speaking&&++this.redemptionCounter>=this.redemptionFrames){this.redemptionCounter=0,this.speechFrameCount=0,this.speaking=!1,this.speechRealStartFired=!1;const ve=this.audioBuffer;if(this.audioBuffer=[],ve.reduce((we,De)=>De.isSpeech?we+1:we,0)>=this.minSpeechFrames){const we=Fp(ve.map(De=>De.frame));be({msg:Xr.Message.SpeechEnd,audio:we})}else be({msg:Xr.Message.VADMisfire})}if(!this.speaking){for(;this.audioBuffer.length>this.preSpeechPadFrames;)this.audioBuffer.shift();this.speechFrameCount=0}},this.audioBuffer=[];const{redemptionFrames:pe,preSpeechPadFrames:ye,minSpeechFrames:ce}=Wp(this.options,this.msPerFrame);this.redemptionFrames=pe,this.preSpeechPadFrames=ye,this.minSpeechFrames=ce,this.reset()}}Xt.FrameProcessor=uh;var Kp={};function Ct(L){throw new Error('Could not dynamically require "'+L+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Zp={exports:{}};/*!
 * ONNX Runtime Web v1.24.3
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */(function(L,ee){var re=(()=>{var K=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,pe=Object.getOwnPropertyNames,ye=Object.prototype.hasOwnProperty,ce=(e=>typeof Ct<"u"?Ct:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof Ct<"u"?Ct:t)[r]}):e)(function(e){if(typeof Ct<"u")return Ct.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),z=(e,t)=>()=>(e&&(t=e(e=0)),t),be=(e,t)=>{for(var r in t)K(e,r,{get:t[r],enumerable:!0})},Je=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of pe(t))!ye.call(e,a)&&a!==r&&K(e,a,{get:()=>t[a],enumerable:!(i=ne(t,a))||i.enumerable});return e},Ve=e=>Je(K({},"__esModule",{value:!0}),e),ve,$e,we,De,He,wt=z(()=>{ve=new Map,$e=[],we=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=ve.get(e);if(i===void 0)ve.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=$e.indexOf(e);a!==-1&&$e.splice(a,1);for(let n=0;n<$e.length;n++)if(ve.get($e[n]).priority<=r){$e.splice(n,0,e);return}$e.push(e)}return}throw new TypeError("not a valid backend")},De=async e=>{let t=ve.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},He=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),i=r.length===0?$e:r,a,n=[],s=new Set;for(let u of i){let l=await De(u);typeof l=="string"?n.push({name:u,err:l}):(a||(a=l),a===l&&s.add(u))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of n)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let o=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[a,new Proxy(e,{get:(u,l)=>l==="executionProviders"?o:Reflect.get(u,l)})]}}),At=z(()=>{wt()}),Te,Ee=z(()=>{Te="1.24.3"}),he,ue,Le=z(()=>{Ee(),he="warning",ue={wasm:{},webgl:{},webgpu:{},versions:{common:Te},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);he=e}},get logLevel(){return he}},Object.defineProperty(ue,"logLevel",{enumerable:!0})}),Y,ot=z(()=>{Le(),Y=ue}),je,gt,ar=z(()=>{je=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,n;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,u,l;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?l=[0,0,0,0]:typeof o.bias=="number"?l=[o.bias,o.bias,o.bias,o.bias]:(l=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(l[3]=o.bias[3]));let d=n*a,p=0,h=d,f=d*2,m=-1;s==="RGBA"?(p=0,h=d,f=d*2,m=d*3):s==="RGB"?(p=0,h=d,f=d*2):s==="RBG"&&(p=0,f=d,h=d*2);for(let w=0;w<n;w++)for(let $=0;$<a;$++){let _=(e.data[p++]-l[0])*u[0],y=(e.data[h++]-l[1])*u[1],S=(e.data[f++]-l[2])*u[2],x=m===-1?255:(e.data[m++]-l[3])*u[3];i.fillStyle="rgba("+_+","+y+","+S+","+x+")",i.fillRect($,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},gt=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,n,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t==null?void 0:t.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let p=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,f=0,m=1,w=2,$=3,_=0,y=p,S=p*2,x=-1;o==="RGBA"?(_=0,y=p,S=p*2,x=p*3):o==="RGB"?(_=0,y=p,S=p*2):o==="RBG"&&(_=0,S=p,y=p*2),i=r.createImageData(a,n);for(let I=0;I<n*a;f+=h,m+=h,w+=h,$+=h,I++)i.data[f]=(e.data[_++]-d[0])*l[0],i.data[m]=(e.data[y++]-d[1])*l[1],i.data[w]=(e.data[S++]-d[2])*l[2],i.data[$]=x===-1?255:(e.data[x++]-d[3])*l[3]}else throw new Error("Can not access image data");return i}}),ut,_t,mr,gr,Oe,kt,wi=z(()=>{wr(),ut=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*i,d=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,h=0,f=1,m=2,w=3,$=0,_=l,y=l*2,S=-1;o==="RGB"&&(p=3,h=0,f=1,m=2,w=-1),u==="RGBA"?S=l*3:u==="RBG"?($=0,y=l,_=l*2):u==="BGR"&&(y=0,_=l,$=l*2);for(let x=0;x<l;x++,h+=p,m+=p,f+=p,w+=p)d[$++]=(e[h]+s[0])/n[0],d[_++]=(e[f]+s[1])/n[1],d[y++]=(e[m]+s[2])/n[2],S!==-1&&w!==-1&&(d[S++]=(e[w]+s[3])/n[3]);return u==="RGBA"?new Re("float32",d,[1,4,r,i]):new Re("float32",d,[1,3,r,i])},_t=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,o=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){let d=u();d.width=e.width,d.height=e.height;let p=l(d);if(p!=null){let h=e.height,f=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,f=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=f}else o.tensorFormat="RGBA",o.height=h,o.width=f;p.drawImage(e,0,0),s=p.getImageData(0,0,f,h).data}else throw new Error("Can not access image data")}else if(i){let d,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(d=t.resizedHeight,p=t.resizedWidth):(d=e.height,p=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=d,o.width=p,t!==void 0){let h=u();h.width=p,h.height=d;let f=l(h);if(f!=null)f.putImageData(e,0,0),s=f.getImageData(0,0,p,d).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=e.width,d.height=e.height;let p=l(d);if(p!=null){let h=e.height,f=e.width;return p.drawImage(e,0,0,f,h),s=p.getImageData(0,0,f,h).data,o.height=h,o.width=f,ut(s,o)}else throw new Error("Can not access image data")}else{if(n)return new Promise((d,p)=>{let h=u(),f=l(h);if(!e||!f)return p();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{h.width=m.width,h.height=m.height,f.drawImage(m,0,0,h.width,h.height);let w=f.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,d(ut(w.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return ut(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},mr=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t,s=[1,i,r,4];return new Re({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},gr=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Re({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},Oe=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Re({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},kt=(e,t,r)=>new Re({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),it,Ot,yr,_i,Fa=z(()=>{it=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Ot=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),yr=!1,_i=()=>{if(!yr){yr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(it.set("int64",BigInt64Array),Ot.set(BigInt64Array,"int64")),t&&(it.set("uint64",BigUint64Array),Ot.set(BigUint64Array,"uint64")),i?(it.set("float16",r),Ot.set(r,"float16")):it.set("float16",Uint16Array)}}}),bi,$i,Wa=z(()=>{wr(),bi=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},$i=(e,t)=>{switch(e.location){case"cpu":return new Re(e.type,e.data,t);case"cpu-pinned":return new Re({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Re({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Re({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Re({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Re,wr=z(()=>{ar(),wi(),Fa(),Wa(),Re=class{constructor(e,t,r){_i();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=it.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let u=it.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?s=u.from(t,BigInt):s=u.from(t)}else if(t instanceof u)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${u}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")i="string",s=e;else if(u==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let u=Ot.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=u,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");a=o,this.cpuData=s,this.dataLocation="cpu"}let n=bi(a);if(this.cpuData&&n!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static async fromImage(e,t){return _t(e,t)}static fromTexture(e,t){return mr(e,t)}static fromGpuBuffer(e,t){return gr(e,t)}static fromMLTensor(e,t){return Oe(e,t)}static fromPinnedBuffer(e,t,r){return kt(e,t,r)}toDataURL(e){return je(this,e)}toImageData(e){return gt(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return $i(this,e)}}}),Fe,vi=z(()=>{wr(),Fe=Re}),Wt,_r,et,Xe,lt,dt,xi=z(()=>{Le(),Wt=(e,t)=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},_r=(e,t)=>{var a;let r=((a=new Error().stack)==null?void 0:a.split(/\r\n|\r|\n/g))||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Wt("CPU",s);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},et=e=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||_r("BEGIN",e)},Xe=e=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||_r("END",e)},lt=e=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||console.time(`ORT::${e}`)},dt=e=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||console.timeEnd(`ORT::${e}`)}}),Si,Ga=z(()=>{wt(),vi(),xi(),Si=class Qp{constructor(t){this.handler=t}async run(t,r,i){et(),lt("InferenceSession.run");let a={},n={};if(typeof t!="object"||t===null||t instanceof Fe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Fe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);a[l]=null}if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(d.indexOf(p)!==-1){let h=r[p];(h===null||h instanceof Fe)&&(l=!0,s=!1,a[p]=h)}if(l){if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)a[l]=null;let o=await this.handler.run(t,a,n),u={};for(let l in o)if(Object.hasOwnProperty.call(o,l)){let d=o[l];d instanceof Fe?u[l]=d:u[l]=new Fe(d.type,d.data,d.dims)}return dt("InferenceSession.run"),Xe(),u}async release(){return this.handler.dispose()}static async create(t,r,i,a){et(),lt("InferenceSession.create");let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let d=t,p=0,h=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(h=t.byteLength-p,typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||p+h>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-p}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(d,p,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await He(s),l=await o.createInferenceSessionHandler(n,u);return dt("InferenceSession.create"),Xe(),new Qp(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),br,ja=z(()=>{Ga(),br=Si}),Ha=z(()=>{}),Ka=z(()=>{}),Za=z(()=>{}),Qa=z(()=>{}),Ti={};be(Ti,{InferenceSession:()=>br,TRACE:()=>Wt,TRACE_EVENT_BEGIN:()=>lt,TRACE_EVENT_END:()=>dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Fe,env:()=>Y,registerBackend:()=>we});var Ye=z(()=>{At(),ot(),ja(),vi(),Ha(),Ka(),xi(),Za(),Qa()}),$r=z(()=>{}),Ei={};be(Ei,{default:()=>ki});var vr,xr,ki,Xa=z(()=>{var e;Tp(),bt(),Ir(),vr="ort-wasm-proxy-worker",xr=((e=globalThis.self)==null?void 0:e.name)===vr,xr&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":Ar(i.wasm).then(()=>{Gn(i).then(()=>{postMessage({type:r})},a=>{postMessage({type:r,err:a})})},a=>{postMessage({type:r,err:a})});break;case"init-ep":{let{epName:a,env:n}=i;jn(n,a).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})});break}case"copy-from":{let{buffer:a}=i,n=Ma(a);postMessage({type:r,out:n});break}case"create":{let{model:a,options:n}=i;Kn(a,n).then(s=>{postMessage({type:r,out:s})},s=>{postMessage({type:r,err:s})});break}case"release":Zn(i),postMessage({type:r});break;case"run":{let{sessionId:a,inputIndices:n,inputs:s,outputIndices:o,options:u}=i;Xn(a,n,s,o,new Array(o.length).fill(null),u).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:l},Jn([...s,...l]))},l=>{postMessage({type:r,err:l})});break}case"end-profiling":Yn(i),postMessage({type:r});break;default:}}catch(a){postMessage({type:r,err:a})}}),ki=xr?null:t=>new Worker(t??Be,{type:"classic",name:vr})}),Ii,zi,Be,Sr,Yt,Ci,Ai,Tr,Oi,Er,Ri,kr,Bi,Ir=z(()=>{$r(),Ii=typeof location>"u"?void 0:location.origin,zi=()=>{var e,t;return typeof document<"u"?(e=document.currentScript)==null?void 0:e.src:typeof self<"u"?(t=self.location)==null?void 0:t.href:void 0},Be=zi(),Sr=()=>{if(Be&&!Be.startsWith("blob:"))return Be.substring(0,Be.lastIndexOf("/")+1)},Yt=(e,t)=>{try{let r=t??Be;return(r?new URL(e,r):new URL(e)).origin===Ii}catch{return!1}},Ci=(e,t)=>{let r=t??Be;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Ai=(e,t)=>`${t??"./"}${e}`,Tr=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Oi=async e=>(await import(e)).default,Er=(Xa(),Ve(Ei)).default,Ri=async()=>{if(!Be)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Yt(Be))return[void 0,Er()];let e=await Tr(Be);return[e,Er(e)]},kr=void 0,Bi=async(e,t,r,i)=>{let a=kr&&!(e||t);if(a)if(Be)a=Yt(Be)||i&&!r;else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,kr];{let n="ort-wasm-simd-threaded.jsep.mjs",s=e??Ci(n,t),o=r&&s&&!Yt(s,t),u=o?await Tr(s):s??Ai(n,t);return[o?u:void 0,await Oi(u)]}}}),zr,Jt,Rt,Cr,Mi,Di,Pi,Ar,le,bt=z(()=>{Ir(),Jt=!1,Rt=!1,Cr=!1,Mi=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Di=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Pi=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ar=async e=>{if(Jt)return Promise.resolve();if(Rt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Cr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Rt=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Pi())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Di())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Mi();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a==null?void 0:a.mjs,o=(s==null?void 0:s.href)??s,u=a==null?void 0:a.wasm,l=(u==null?void 0:u.href)??u,d=e.wasmBinary,[p,h]=await Bi(o,n,r>1,!!d||!!l),f=!1,m=[];if(t>0&&m.push(new Promise(w=>{setTimeout(()=>{f=!0,w()},t)})),m.push(new Promise((w,$)=>{let _={numThreads:r};if(d)_.wasmBinary=d,_.locateFile=y=>y;else if(l||n)_.locateFile=y=>l??n+y;else if(o&&o.indexOf("blob:")!==0)_.locateFile=y=>new URL(y,o).href;else if(p){let y=Sr();y&&(_.locateFile=S=>y+S)}h(_).then(y=>{Rt=!1,Jt=!0,zr=y,w(),p&&URL.revokeObjectURL(p)},y=>{Rt=!1,Cr=!0,$(y)})})),await Promise.race(m),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},le=()=>{if(Jt&&zr)return zr;throw new Error("WebAssembly is not initialized yet.")}}),We,er,ie,Or=z(()=>{bt(),We=(e,t)=>{let r=le(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},er=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")er(n,s+".",r,i);else if(typeof n=="string"||typeof n=="number")i(s,n.toString());else if(typeof n=="boolean")i(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},ie=e=>{let t=le(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let n=Number(t.getValue(a,i===4?"i32":"i64")),s=t.getValue(a+i,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Ui,Ya=z(()=>{bt(),Or(),Ui=e=>{let t=le(),r=0,i=[],a=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(a.terminate=!1);let n=0;return(e==null?void 0:e.tag)!==void 0&&(n=We(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),r===0&&ie("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&er(e.extra,"",new WeakSet,(s,o)=>{let u=We(s,i),l=We(o,i);t._OrtAddRunConfigEntry(r,u,l)!==0&&ie(`Can't set a run config entry: ${s} - ${o}.`)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),n}}}),Ni,Li,Vi,Bt,qi,Fi,Ja=z(()=>{bt(),Or(),Ni=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Li=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Vi=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Bt=(e,t,r,i)=>{let a=We(t,i),n=We(r,i);le()._OrtAddSessionConfigEntry(e,a,n)!==0&&ie(`Can't set a session config entry: ${t} - ${r}.`)},qi=async(e,t,r)=>{let i=t.executionProviders;for(let a of i){let n=typeof a=="string"?a:a.name,s=[];switch(n){case"webnn":if(n="WEBNN",typeof a!="string"){let p=a==null?void 0:a.deviceType;p&&Bt(e,"deviceType",p,r)}break;case"webgpu":if(n="JS",typeof a!="string"){let p=a;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);Bt(e,"preferredLayout",p.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let o=We(n,r),u=s.length,l=0,d=0;if(u>0){l=le()._malloc(u*le().PTR_SIZE),r.push(l),d=le()._malloc(u*le().PTR_SIZE),r.push(d);for(let p=0;p<u;p++)le().setValue(l+p*le().PTR_SIZE,s[p][0],"*"),le().setValue(d+p*le().PTR_SIZE,s[p][1],"*")}await le()._OrtAppendExecutionProvider(e,o,l,d,u)!==0&&ie(`Can't append execution provider: ${n}.`)}},Fi=async e=>{let t=le(),r=0,i=[],a=e||{};Vi(a);try{let n=Ni(a.graphOptimizationLevel??"all"),s=Li(a.executionMode??"sequential"),o=typeof a.logId=="string"?We(a.logId,i):0,u=a.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let l=a.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let d=typeof a.optimizedModelFilePath=="string"?We(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,o,u,l,d),r===0&&ie("Can't create session options."),a.executionProviders&&await qi(r,a,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Bt(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[p,h]of Object.entries(a.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let f=We(p,i);t._OrtAddFreeDimensionOverride(r,f,h)!==0&&ie(`Can't set a free dimension override: ${p} - ${h}.`)}return a.extra!==void 0&&er(a.extra,"",new WeakSet,(p,h)=>{Bt(r,p,h,i)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&ie("Can't release session options."),i.forEach(s=>t._free(s)),n}}}),$t,vt,xt,Rr,Br,Mr,Dr,Jr,oe=z(()=>{$t=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},vt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},xt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return r>0?Math.ceil(i*r):void 0},Rr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Br=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Mr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Dr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Jr=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Pr,Wi=z(()=>{$r(),Pr=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let u=Math.ceil(i/65536);n=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let s=0;for(;;){let{done:o,value:u}=await a.read();if(o)break;let l=u.byteLength;new Uint8Array(n,s,l).set(u),s+=l}return new Uint8Array(n,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Gi,ei,ti,Gt,ri,ii,xe,Tt=z(()=>{oe(),Gi=["V","I","W","E","F"],ei=(e,t)=>{console.log(`[${Gi[e]},${new Date().toISOString()}]${t}`)},ri=(e,t)=>{ti=e,Gt=t},ii=(e,t)=>{let r=Br(e),i=Br(ti);r>=i&&ei(r,typeof t=="function"?t():t)},xe=(...e)=>{Gt&&ii(...e)}}),ai,jt,D,nr,ni,ji,Mt,te=z(()=>{ai=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},jt=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(i<2||a<2)return;let o=ai.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(o===void 0)return;[s[n-2],s[n-1]]=o}for(let o=r?3:1;o<=n;o++){let u=i-o<0?1:e[i-o],l=a-o<0?1:t[a-o];if(u!==l&&u>1&&l>1)return;let d=Math.max(u,l);if(u&&l)s[n-o]=Math.max(u,l);else{if(d>1)return;s[n-o]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},D=class La{static size(t){return La.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),n=i-1;for(;n>=0;){if(t[n]%r===0){a[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return La.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return La.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,n)=>a+r[n]+r[n+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},nr=class ya{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<a.length){if(a[o]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let o=0;o<i.length;o++)if(o<n.length){if(n[o]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let o=0;o<i.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=i[o]||s[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,o){if(o){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)ya.adjustPadAndReturnShape(t[u+(s?1:2)],r[u],i[u],a[u],n,u,u+t.length-2,o)}}static computePoolOutputShape(t,r,i,a,n,s,o){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return ya.computeShapeHelper(t,r,u,i,a,n,s,o),u}static computeConvOutputShape(t,r,i,a,n,s,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return ya.computeShapeHelper(!1,t,u,i,a,n,s,o),u}static computeShapeHelper(t,r,i,a,n,s,o,u){if(t)for(let l=0;l<r.length-2;l++)i.push(1);else for(let l=0;l<r.length-2;l++)i.push(ya.adjustPadAndReturnShape(r[l+2],a[l],n[l],s[l],o,l,l+r.length-2,u))}static adjustPadAndReturnShape(t,r,i,a,n,s,o,u){let l=i*(a-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return n[s]=0,n[o]=0,Math.floor((t-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((t+r-1)/r-1)*r+a-t;return n[s]=Math.floor(u==="SAME_LOWER"?(d+1)/2:d/2),n[o]=d-n[s],Math.floor((t+d-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[o]-l)/r+1)}},ni=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,o;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let u=-1;if(i?(o=r[0],u=1):(o=r[1],u=0),r[u]!==s)throw new Error("dimension mismatch");if(n<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(a&&!jt.isValidBroadcast(a,[n,o]))throw new Error("gemm: invalid bias shape for broadcast");return[n,o,s]}},ji=-34028234663852886e22,Mt=34028234663852886e22}),Ht,sr=z(()=>{oe(),Ht=(e,t)=>new(Rr(t))(e)}),tr,or,Ur,Nr,Dt,Kt,si,oi,ui,Hi,Ki,ba=z(()=>{oe(),Tt(),tr=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),or=(e,t)=>{if(t==="int32")return e;let r=tr.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,n=new(Rr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let o=0;o<a;o++){let u=n[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(u)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ur=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Nr=1,Dt=()=>Nr++,Kt=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),si=(e,t)=>{let r=tr.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},oi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return si(this.dataType,this.tensorShape)}destroy(){xe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Ur(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},ui=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),n=this.tensorManager.getMLOpSupportLimits(e),s;if(!(n!=null&&n.input.dataTypes.includes(t))){if(s=Kt.get(t),!s||(n==null?void 0:n.input.dataTypes.includes(s)))throw new Error(`WebNN backend does not support data type: ${t}`);xe("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==si(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=or(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else xe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,r;if(this.activeUpload){let i=(t=this.wrapper)!=null&&t.isDataConverted?Ur(this.activeUpload,(r=this.wrapper)==null?void 0:r.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(i):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(i);return}else return i.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Hi=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Dt();return this.tensorTrackersById.set(e,new ui(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){xe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){xe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=Dt(),s=new oi({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new ui(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,r,i,a,n,s){let o=this.getMLContext(e);for(let[l,d]of this.freeTensors.entries())if(d.canReuseTensor(o,t,r)){xe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let p=this.freeTensors.splice(l,1)[0];return p.sessionId=e,p}xe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let u=await o.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new oi({sessionId:e,context:o,tensor:u,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Ki=(...e)=>new Hi(...e)}),ur,Zi,Qi,Xi=z(()=>{oe(),bt(),sr(),ba(),Tt(),ur=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Zi=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,n)=>a===i[n]&&e[a]===t[a])},Qi=class{constructor(e){this.tensorManager=Ki(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,ri(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){xe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){xe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)xe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Zi(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){xe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let n=ur.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)}async createTemporaryTensor(e,t,r){xe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=ur.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!le().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");xe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Ht(r,t)}}registerMLTensor(e,t,r,i){let a=ur.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return xe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,r,i,a,n,s=!1){if(!n)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let u=n.get(o);if(!u)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(t,t+r).buffer,d;switch(a.dataType){case"float32":d=new Float32Array(l);break;case"float16":d=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(l):new Uint16Array(l);break;case"int32":d=new Int32Array(l);break;case"uint32":d=new Uint32Array(l);break;case"int64":if(s){let p=or(new Uint8Array(l),"int64");d=new Int32Array(p.buffer),a.dataType="int32"}else d=new BigInt64Array(l);break;case"uint64":d=new BigUint64Array(l);break;case"int8":d=new Int8Array(l);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return xe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,d)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=ur.get($t(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!(a!=null&&a.input.dataTypes.includes(i)):!!(a!=null&&a.output.dataTypes.includes(i))}flush(){}}}),li=z(()=>{}),di,pi,Lr,ci,hi,fi,Yi,Ji,$a,en=z(()=>{Tt(),li(),di=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),pi=[],Lr=e=>Math.ceil(Number(e)/16)*16,ci=e=>{for(let t=0;t<pi.length;t++){let r=pi[t];if(e<=r)return r}return Math.ceil(e/16)*16},hi=1,fi=()=>hi++,Yi=async(e,t,r,i)=>{let a=Lr(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let o=n.getMappedRange();if(i){let u=i();return u.set(new Uint8Array(o,0,r)),u}else return new Uint8Array(o.slice(0,r))}finally{n.destroy()}},Ji=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of di)pi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=Lr(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=o.getMappedRange();new Uint8Array(u).set(new Uint8Array(r,i,a)),o.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(o,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([l.finish()]),o.destroy(),xe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Lr(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=fi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),xe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=ci(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let o=(a?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:fi(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),xe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return xe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Yi(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=di.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(xe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},$a=(...e)=>new Ji(...e)}),c,g,b=z(()=>{c=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},g=e=>new c(e)}),T,v,A,E,k,O,N,q,U,M,Z,C,W,Pe,ge,fe,Ae,J=z(()=>{oe(),te(),T=64,v=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},A=(e,t=1)=>{let r=v(e,t);return typeof r=="string"?r:r[0]},E=(e,t=1)=>{let r=v(e,t);return typeof r=="string"?r:r[1]},k=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:D.computeStrides(r)})}),t},O=e=>e%4===0?4:e%2===0?2:1,N=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,q=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,U=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,M=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Z=(e,t,r,i,a)=>{let n=typeof r=="number",s=n?r:r.length,o=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=v(t,a),d=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],h={indices:u,value:d,storage:p,tensor:t},f=F=>typeof F=="string"?F:`${F}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=n?"uniforms.":"",$=`${w}${e}_shape`,_=`${w}${e}_strides`,y="";for(let F=0;F<s-1;F++)y+=`
    let dim${F} = current / ${M(_,F,s)};
    let rest${F} = current % ${M(_,F,s)};
    indices[${F}] = dim${F};
    current = rest${F};
    `;y+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${y}
    return indices;
  }`,x=F=>(m.offsetToIndices=!0,s<2?F:`o2i_${e}(${F})`),I=[];if(s>=2)for(let F=s-1;F>=0;F--)I.push(`${M(_,F,s)} * (indices[${F}])`);let B=s<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${I.join("+")};
  }`,R=F=>(m.indicesToOffset=!0,s<2?F:`i2o_${e}(${F})`),P=(...F)=>s===0?"0u":`${h.indices}(${F.map(f).join(",")})`,V=(F,G)=>s<2?`${F}`:`${M(F,G,s)}`,j=(F,G,de)=>s<2?`${F}=${de};`:`${M(F,G,s)}=${de};`,se={},Q=(F,G)=>{m.broadcastedIndicesToOffset=!0;let de=`${G.name}broadcastedIndicesTo${e}Offset`;if(de in se)return`${de}(${F})`;let _e=[];for(let Ge=s-1;Ge>=0;Ge--){let fa=G.indicesGet("outputIndices",Ge+G.rank-s);_e.push(`${V(_,Ge)} * (${fa} % ${V($,Ge)})`)}return se[de]=`fn ${de}(outputIndices: ${G.type.indices}) -> u32 {
             return ${_e.length>0?_e.join("+"):"0u"};
           }`,`${de}(${F})`},ae=(F,G)=>(()=>{if(h.storage===h.value)return`${e}[${F}]=${G};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${F}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${F}]=vec2<u32>(u32(${G}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${F}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),ke=F=>(()=>{if(h.storage===h.value)return`${e}[${F}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${F}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${F}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${F}] & 0xFFu), bool(${e}[${F}] & 0xFF00u), bool(${e}[${F}] & 0xFF0000u), bool(${e}[${F}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),ze=s<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${d} {
    return ${ke(`i2o_${e}(indices)`)};
  }`,X=s<2?"":(()=>{let F=o.map(de=>`d${de}: u32`).join(", "),G=o.map(de=>`d${de}`).join(", ");return`
  fn get_${e}(${F}) -> ${d} {
    return get_${e}ByIndices(${P(G)});
  }`})(),me=(...F)=>{if(F.length!==s)throw new Error(`indices length must be ${s}`);let G=F.map(f).join(",");return s===0?ke("0u"):s===1?ke(G[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${G})`)},Ue=F=>s<2?ke(F):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${F})`),H=s<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${d}) {
    ${ae(`i2o_${e}(indices)`,"value")}
  }`,Ne=s<2?"":(()=>{let F=o.map(de=>`d${de}: u32`).join(", "),G=o.map(de=>`d${de}`).join(", ");return`
  fn set_${e}(${F}, value: ${d}) {
    set_${e}ByIndices(${P(G)}, value);
  }`})();return{impl:()=>{let F=[],G=!1;return m.offsetToIndices&&(F.push(S),G=!0),m.indicesToOffset&&(F.push(B),G=!0),m.broadcastedIndicesToOffset&&(Object.values(se).forEach(de=>F.push(de)),G=!0),m.set&&(F.push(Ne),G=!0),m.setByIndices&&(F.push(H),G=!0),m.get&&(F.push(X),G=!0),m.getByIndices&&(F.push(ze),G=!0),!n&&G&&F.unshift(`const ${$} = ${h.indices}(${r.join(",")});`,`const ${_} = ${h.indices}(${D.computeStrides(r).join(",")});`),F.join(`
`)},type:h,offsetToIndices:x,indicesToOffset:R,broadcastedIndicesToOffset:Q,indices:P,indicesGet:V,indicesSet:j,set:(...F)=>{if(F.length!==s+1)throw new Error(`indices length must be ${s}`);let G=F[s];if(typeof G!="string")throw new Error("value must be string");let de=F.slice(0,s).map(f).join(",");return s===0?ae("0u",G):s===1?ae(de[0],G):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${de}, ${G})`)},setByOffset:ae,setByIndices:(F,G)=>s<2?ae(F,G):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${F}, ${G});`),get:me,getByOffset:ke,getByIndices:Ue,usage:i,name:e,strides:_,shape:$,rank:s}},C=(e,t,r,i=1)=>Z(e,t,r,"input",i),W=(e,t,r,i=1)=>Z(e,t,r,"output",i),Pe=(e,t,r)=>Z(e,t,r,"atomicOutput",1),ge=(e,t,r,i=1)=>Z(e,t,r,"internal",i),fe=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=T){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Ae=(e,t)=>new fe(e,t)}),Me,Ie,tt,st,pt,Vr,ct,ea,ta,rt=z(()=>{oe(),te(),b(),J(),Me=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ie=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),tt=(e,t)=>D.sortBasedOnPerm(e,Ie(e.length,t)),st=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},pt=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},Vr=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},ct=(e,t)=>{let r=e.dataType,i=e.dims.length,a=Ie(i,t),n=tt(e.dims,a),s=e.dims,o=n,u=i<2||Vr(a,e.dims),l;if(u)return l=m=>{let w=C("input",r,s,4),$=W("output",r,o,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(w,$)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=D.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:l};let{newShape:d,newPerm:p}=pt(e.dims,a),h=D.areEqual(p,[2,3,1]),f=D.areEqual(p,[3,1,2]);if(d.length===2||h||f){s=h?[d[0],d[1]*d[2]]:f?[d[0]*d[1],d[2]]:d,o=[s[1],s[0]];let m=16;return l=w=>{let $=C("a",r,s.length),_=W("output",r,o.length);return`
  ${w.registerUniform("output_size","u32").declareVariables($,_)}
  var<workgroup> tile : array<array<${_.type.value}, ${m+1}>, ${m}>;
  ${w.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${$.getByIndices(`${$.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${_.setByIndices(`${_.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=D.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/m),y:Math.ceil(o[0]/m)},programUniforms:[{type:12,data:w},...k(s,o)]}},getShaderSource:l}}return l=m=>{let w=C("a",r,s.length),$=W("output",r,o.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(w,$)}

  ${st(a,i,w,$)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let m=D.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...k(s,o)]}},getShaderSource:l}},ea=(e,t)=>{Me(e.inputs,t.perm),e.compute(ct(e.inputs[0],t.perm))},ta=e=>g({perm:e.perm})}),It,ra,Se,Et,va,Pt,qr,Ke,ht,mi,ft,ia,xa,Ut,Nt,lr,Ze,qe,zt,Sa,Ta,nc=z(()=>{oe(),te(),J(),rn(),rt(),It={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ra={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Se={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Et={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},va=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},Pt=(e,t)=>{let r=[],i=e.length;for(let n=0;n<i;n++)t.indexOf(n)===-1&&r.push(e[n]);let a=t.map(n=>e[n]);return[r,a]},qr=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?i.push(e[a++]):i.push(1);return i},Ke=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},ht=(e,t)=>{let r=[];if(!Ke(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},mi=(e,t,r,i,a,n,s)=>{let o=r[0].dims,u=D.size(n),l=D.size(s),d=C("_A",r[0].dataType,o),p=W("output",a,n),h=64;u===1&&(h=256);let f=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,m=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(d,p)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Se[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${It[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ra[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${i==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${Et[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},ft=(e,t,r,i)=>{let a=e.inputs.length===1?r:tn(e.inputs,r),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((f,m)=>m));let s=D.normalizeAxes(n,e.inputs[0].dims.length),o=s,u=e.inputs[0],l=ht(o,e.inputs[0].dims.length);l.length>0&&(u=e.compute(ct(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],o=va(o.length,u.dims.length));let[d,p]=Pt(u.dims,o),h=d;a.keepDims&&(h=qr(d,s)),e.compute(mi(t,a.cacheKey,[u],i,e.inputs[0].dataType,h,p),{inputs:[u]})},ia=(e,t)=>{ft(e,"ReduceMeanShared",t,"mean")},xa=(e,t)=>{ft(e,"ReduceL1Shared",t,"l1")},Ut=(e,t)=>{ft(e,"ReduceL2Shared",t,"l2")},Nt=(e,t)=>{ft(e,"ReduceLogSumExpShared",t,"logSumExp")},lr=(e,t)=>{ft(e,"ReduceMaxShared",t,"max")},Ze=(e,t)=>{ft(e,"ReduceMinShared",t,"min")},qe=(e,t)=>{ft(e,"ReduceProdShared",t,"prod")},zt=(e,t)=>{ft(e,"ReduceSumShared",t,"sum")},Sa=(e,t)=>{ft(e,"ReduceSumSquareShared",t,"sumSquare")},Ta=(e,t)=>{ft(e,"ReduceLogSumShared",t,"logSum")}}),Lt,ls,Ea,tn,Vt,ds,ps,cs,hs,fs,ms,gs,ys,ws,_s,qt,bs,$s,vs,xs,Ss,Ts,Es,ks,Is,zs,rn=z(()=>{oe(),te(),b(),J(),nc(),Lt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ls=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Ea=(e,t,r,i,a,n,s=!1,o=!1)=>{let u=[],l=r[0].dims,d=l.length,p=D.normalizeAxes(a,d),h=!o&&p.length===0;l.forEach((w,$)=>{h||p.indexOf($)>=0?s&&u.push(1):u.push(w)});let f=u.length,m=D.size(u);return{name:e,shaderCache:t,getShaderSource:w=>{let $=[],_=C("_A",r[0].dataType,d),y=W("output",n,f),S=i(_,y,p),x=S[2];for(let I=0,B=0;I<d;I++)h||p.indexOf(I)>=0?(s&&B++,x=`for(var j${I}: u32 = 0; j${I} < ${l[I]}; j${I}++) {
                  ${S[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${_.indicesSet("input_indices",I,`j${I}`)}
                  ${x}
                }`):($.push(`${_.indicesSet("input_indices",I,y.indicesGet("output_indices",B))};`),B++);return`

        ${w.registerUniform("output_size","u32").declareVariables(_,y)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${_.type.indices};
          let output_indices = ${y.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${x}
          ${S[3]}
          ${S.length===4?y.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:n}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...k(l,u)]})}},tn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),g({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Vt=(e,t,r,i)=>{let a=e.inputs,n=a.length===1?r:tn(a,r);e.compute(Ea(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?ls:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},ds=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},ps=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},cs=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},hs=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},fs=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceMax",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},ms=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceMean",t,(r,i,a)=>{let n=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${n});`]})},gs=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceMin",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},ys=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},ws=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},_s=(e,t)=>{Lt(e.inputs),Vt(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},qt=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?i*=e[n]:a*=e[n];return a<32&&i>1024},bs=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ms(e,t):ia(e,t)},$s=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ps(e,t):xa(e,t)},vs=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cs(e,t):Ut(e,t)},xs=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hs(e,t):Nt(e,t)},Ss=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fs(e,t):lr(e,t)},Ts=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gs(e,t):Ze(e,t)},Es=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ys(e,t):qe(e,t)},ks=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ws(e,t):zt(e,t)},Is=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_s(e,t):Sa(e,t)},zs=(e,t)=>{qt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ds(e,t):Ta(e,t)}}),an,Cs,As,nn,sc=z(()=>{oe(),b(),rn(),an=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Cs=(e,t)=>{an(e.inputs);let r=(i,a,n)=>{let s=[];for(let o=0;o<i.rank;o++)(n.indexOf(o)>=0||n.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Ea("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},As=(e,t)=>{an(e.inputs);let r=(i,a,n)=>{let s=[];for(let o=0;o<i.rank;o++)(n.indexOf(o)>=0||n.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Ea("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},nn=e=>g(e)}),Os,ka,Rs,Bs,Ms,aa,Ds,Ps,sn=z(()=>{oe(),te(),li(),J(),Os=(e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=a.dims[0]/3,h=p,f=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let m=l;if(p!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==p+h+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(h!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let $=m+w,_=-1,y=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==l||o.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:w,kvSequenceLength:m,totalSequenceLength:$,maxSequenceLength:_,inputHiddenSize:d,hiddenSize:p,vHiddenSize:f,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:y,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},ka=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Rs=(e,t,r,i,a,n,s,o)=>{let u=O(s?1:n),l=64,d=n/u;d<l&&(l=32);let p=Math.ceil(n/u/l),h=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:d},{type:12,data:p}],f=A(e.dataType,u),m=E(1,u),w=["type"];s&&w.push("type"),o&&w.push("type");let $=_=>{let y=W("x",e.dataType,e.dims,u),S=[y],x=s?C("seq_lens",s.dataType,s.dims):void 0;x&&S.push(x);let I=o?C("total_sequence_length_input",o.dataType,o.dims):void 0;I&&S.push(I);let B=E(e.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${_.registerUniforms(R).declareVariables(...S)}
  ${_.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${ka(x,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${y.type.value}(${B}(1.0) / ${B}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${y.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${y.type.value}(${B}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${f};${u}`,inputDependencies:w},getShaderSource:$,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:h})}},Bs=(e,t,r,i,a,n,s,o,u)=>{let l=s+n.kvSequenceLength,d=[n.batchSize,n.numHeads,n.sequenceLength,l],p=e>1&&i,h=n.kvNumHeads?n.kvNumHeads:n.numHeads,f=p?[n.batchSize,h,l,n.headSize]:void 0,m=n.nReps?n.nReps:1,w=n.scale===0?1/Math.sqrt(n.headSize):n.scale,$=O(n.headSize),_=n.headSize/$,y=12,S={x:Math.ceil(l/y),y:Math.ceil(n.sequenceLength/y),z:n.batchSize*n.numHeads},x=[{type:12,data:n.sequenceLength},{type:12,data:_},{type:12,data:l},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:m}],I=p&&i&&D.size(i.dims)>0,B=["type","type"];I&&B.push("type"),a&&B.push("type"),o&&B.push("type"),u&&B.push("type");let R=[{dims:d,dataType:t.dataType,gpuDataType:0}];p&&R.push({dims:f,dataType:t.dataType,gpuDataType:0});let P=V=>{let j=C("q",t.dataType,t.dims,$),se=C("key",r.dataType,r.dims,$),Q=[j,se];if(I){let H=C("past_key",i.dataType,i.dims,$);Q.push(H)}a&&Q.push(C("attention_bias",a.dataType,a.dims));let ae=o?C("seq_lens",o.dataType,o.dims):void 0;ae&&Q.push(ae);let ke=u?C("total_sequence_length_input",u.dataType,u.dims):void 0;ke&&Q.push(ke);let ze=W("output",t.dataType,d),X=[ze];p&&X.push(W("present_key",t.dataType,f,$));let me=E(1,$),Ue=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${y}u;

  var<workgroup> tileQ: array<${j.type.storage}, ${y*y}>;
  var<workgroup> tileK: array<${j.type.storage}, ${y*y}>;
  ${V.registerUniforms(Ue).declareVariables(...Q,...X)}
  ${V.mainStart([y,y,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${ka(ae,ke,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${me}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${me}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch($){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${$}`)}})()};
        output[outputIdx] = ${ze.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${$};${a!==void 0};${i!==void 0};${e}`,inputDependencies:B},getRunData:()=>({outputs:R,dispatchGroup:S,programUniforms:x}),getShaderSource:P}},Ms=(e,t,r,i,a,n,s=void 0,o=void 0)=>{let u=n+a.kvSequenceLength,l=a.nReps?a.nReps:1,d=a.vHiddenSize*l,p=e>1&&i,h=a.kvNumHeads?a.kvNumHeads:a.numHeads,f=p?[a.batchSize,h,u,a.headSize]:void 0,m=[a.batchSize,a.sequenceLength,d],w=12,$={x:Math.ceil(a.vHeadSize/w),y:Math.ceil(a.sequenceLength/w),z:a.batchSize*a.numHeads},_=[{type:12,data:a.sequenceLength},{type:12,data:u},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:d},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:l}],y=p&&i&&D.size(i.dims)>0,S=["type","type"];y&&S.push("type"),s&&S.push("type"),o&&S.push("type");let x=[{dims:m,dataType:t.dataType,gpuDataType:0}];p&&x.push({dims:f,dataType:t.dataType,gpuDataType:0});let I=B=>{let R=C("probs",t.dataType,t.dims),P=C("v",r.dataType,r.dims),V=[R,P];y&&V.push(C("past_value",i.dataType,i.dims));let j=s?C("seq_lens",s.dataType,s.dims):void 0;s&&V.push(j);let se=o?C("total_sequence_length_input",o.dataType,o.dims):void 0;o&&V.push(se);let Q=[W("output",t.dataType,m)];p&&Q.push(W("present_value",t.dataType,f));let ae=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${R.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${R.type.value}, ${w*w}>;
  ${B.registerUniforms(ae).declareVariables(...V,...Q)}
  ${B.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${ka(j,se,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${y&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${y&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:x,dispatchGroup:$,programUniforms:_}),getShaderSource:I}},aa=(e,t,r,i,a,n,s,o,u,l,d=void 0,p=void 0)=>{let h=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),f=h>1?l.pastSequenceLength:0,m=f+l.kvSequenceLength,w=u&&D.size(u.dims)>0?u:void 0,$=[t,r];h>1&&s&&D.size(s.dims)>0&&$.push(s),w&&$.push(w),d&&$.push(d),p&&$.push(p);let _=e.compute(Bs(h,t,r,s,w,l,f,d,p),{inputs:$,outputs:h>1?[-1,1]:[-1]})[0];e.compute(Rs(_,l.batchSize,l.numHeads,f,l.sequenceLength,m,d,p),{inputs:d&&p?[_,d,p]:[_],outputs:[]});let y=[_,i];h>1&&o&&D.size(o.dims)>0&&y.push(o),d&&y.push(d),p&&y.push(p),e.compute(Ms(h,_,i,o,l,f,d,p),{inputs:y,outputs:h>1?[0,2]:[0]})},Ds=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],d=p=>{let h=W("output_q",u[0].dataType,r),f=W("output_k",u[0].dataType,r),m=W("output_v",u[0].dataType,r),w=C("input",u[0].dataType,u[0].dims),$=C("weight",u[1].dataType,u[1].dims),_=C("bias",u[2].dataType,u[2].dims),y=w.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${y}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${y}, ${s*s}>;
  var<workgroup> tileWeightK: array<${y}, ${s*s}>;
  var<workgroup> tileWeightV: array<${y}, ${s*s}>;
  ${p.registerUniforms(S).declareVariables(w,$,_,h,f,m)}
  ${p.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${y}(0);
    var valueK = ${y}(0);
    var valueV = ${y}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},Ps=(e,t)=>{let r=Os(e.inputs,t),[i,a,n]=Ds(e,r);return aa(e,i,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Us,Ns,Ls,Vs,oc=z(()=>{Ye(),oe(),te(),b(),J(),Us=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,n)=>{let s=a.length;if(s!==i.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((o,u)=>{if(o!==i[u])throw new Error(`${n}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Ns=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?O(n[n.length-1]):1,o=a==="NHWC"&&n.length>1?s:1,u=D.size(n)/s,l=i,d=l?n.length:n,p=C("x",e[0].dataType,e[0].dims,s),h=C("scale",e[1].dataType,e[1].dims,o),f=C("bias",e[2].dataType,e[2].dims,o),m=C("inputMean",e[3].dataType,e[3].dims,o),w=C("inputVar",e[4].dataType,e[4].dims,o),$=W("y",e[0].dataType,d,s),_=()=>{let S="";if(i)S=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")S=`
            ${$.indicesSet("outputIndices","0","0")}
            let cOffset = ${$.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let x=1;x<h.rank;x++)S+=`cIndices[${x}] = outputIndices[${x}];`;S+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return S},y=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(p,h,f,m,w,$)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${$.offsetToIndices(`global_idx * ${s}`)};
    ${_()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${$.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...k(n)]:[{type:12,data:u}]})}},Ls=e=>g(e),Vs=(e,t)=>{let{inputs:r,outputCount:i}=e,a=Ls({...t,outputCount:i});if(Y.webgpu.validateInputContent&&Us(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Ns(r,a))}}),qs,Fs,Ws,uc=z(()=>{te(),J(),qs=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Fs=e=>{let t=e[0].dims,r=e[0].dims[2],i=D.size(t)/4,a=e[0].dataType,n=C("input",a,t,4),s=C("bias",a,[r],4),o=C("residual",a,t,4),u=W("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(n,s,o,u)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Ws=e=>{qs(e.inputs),e.compute(Fs(e.inputs))}}),Gs,Ce,js,Hs,Ks,Zs,Qs,Xs,Ys,Js,eo,to,ro,io,ao,no,na,so,Ia,oo,uo,lo,po,co,ho,fo,mo,go,yo,wo,_o,bo,$o,vo,xo,on,So,un,ln,To,Eo,ko,Io,zo,Co,dn=z(()=>{oe(),te(),b(),J(),Gs=(e,t,r,i,a,n,s)=>{let o=Math.ceil(t/4),u="";typeof a=="string"?u=`${a}(a)`:u=a("a");let l=C("inputData",r,[o],4),d=W("outputData",i,[o],4),p=[{name:"vec_size",type:"u32"}];return s&&p.push(...s),`
      ${e.registerUniforms(p).declareVariables(l,d)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Ce=(e,t,r,i,a,n=e.dataType,s,o)=>{let u=[{type:12,data:Math.ceil(D.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:l=>Gs(l,D.size(e.dims),e.dataType,n,r,i,o),getRunData:l=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(D.size(l[0].dims)/64/4)},programUniforms:u})}},js=e=>{e.compute(Ce(e.inputs[0],"Abs","abs"))},Hs=e=>{e.compute(Ce(e.inputs[0],"Acos","acos"))},Ks=e=>{e.compute(Ce(e.inputs[0],"Acosh","acosh"))},Zs=e=>{e.compute(Ce(e.inputs[0],"Asin","asin"))},Qs=e=>{e.compute(Ce(e.inputs[0],"Asinh","asinh"))},Xs=e=>{e.compute(Ce(e.inputs[0],"Atan","atan"))},Ys=e=>{e.compute(Ce(e.inputs[0],"Atanh","atanh"))},Js=e=>g(e),eo=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},to=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return g({min:t,max:r})},ro=(e,t)=>{let r=t||to(e.inputs),i=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},io=e=>{e.compute(Ce(e.inputs[0],"Ceil","ceil"))},ao=e=>{e.compute(Ce(e.inputs[0],"Cos","cos"))},no=e=>{e.compute(Ce(e.inputs[0],"Cosh","cosh"))},na=e=>g(e),so=(e,t)=>{let r=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ia=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,oo=e=>{let t=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Ia(t)))},uo=e=>{e.compute(Ce(e.inputs[0],"Exp","exp"))},lo=e=>{e.compute(Ce(e.inputs[0],"Floor","floor"))},po=e=>{let t=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Ia(t)))},co=(e,t)=>{let r=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},ho=e=>{e.compute(Ce(e.inputs[0],"Not",t=>`!${t}`))},fo=e=>{e.compute(Ce(e.inputs[0],"Neg",t=>`-${t}`))},mo=e=>{e.compute(Ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},go=e=>{let t=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},yo=e=>{e.compute(Ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},wo=e=>g(e),_o=(e,t)=>{let r=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},bo=e=>{e.compute(Ce(e.inputs[0],"Sin","sin"))},$o=e=>{e.compute(Ce(e.inputs[0],"Sinh","sinh"))},vo=e=>{e.compute(Ce(e.inputs[0],"Sqrt","sqrt"))},xo=e=>{e.compute(Ce(e.inputs[0],"Tan","tan"))},on=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,So=e=>{e.compute(Ce(e.inputs[0],"Tanh",on))},un=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${on("v")};
}
`,ln=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,To=e=>{let t=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"FastGelu",ln,un(t),void 0,e.inputs[0].dataType))},Eo=(e,t)=>{let r=E(e.inputs[0].dataType);return e.compute(Ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},ko=e=>{e.compute(Ce(e.inputs[0],"Log","log"))},Io=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,zo=e=>`quick_gelu_impl(${e})`,Co=(e,t)=>{let r=E(e.inputs[0].dataType);e.compute(Ce(e.inputs[0],"QuickGelu",zo,Io(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Ao,Oo,Ro,lc=z(()=>{te(),J(),dn(),Ao=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Oo=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=C("input",e[0].dataType,e[0].dims,4),i=C("bias",e[0].dataType,[e[0].dims[2]],4),a=W("output",e[0].dataType,t,4),n=D.size(t)/4,s=A(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,a)}

  ${Ia(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ro=e=>{Ao(e.inputs),e.compute(Oo(e.inputs))}}),Bo,Mo,Ft,Do,Po,Uo,No,Lo,Vo,qo,Fo,Wo,Go,dc=z(()=>{oe(),te(),J(),Bo=(e,t,r,i,a,n,s,o,u,l,d,p)=>{let h,f;typeof o=="string"?h=f=(y,S)=>`${o}((${y}),(${S}))`:typeof o=="function"?h=f=o:(h=o.scalar,f=o.vector);let m=W("outputData",d,i.length,4),w=C("aData",u,t.length,4),$=C("bData",l,r.length,4),_;if(a)if(n){let y=D.size(t)===1,S=D.size(r)===1,x=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;y||S?_=m.setByOffset("global_idx",f(y?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),S?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"))):_=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${$.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(s||x?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?$.getByOffset("offsetB / 4u"):`${$.type.value}(${$.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=m.setByOffset("global_idx",f(w.getByOffset("global_idx"),$.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let y=(S,x,I="")=>{let B=`aData[indexA${x}][componentA${x}]`,R=`bData[indexB${x}][componentB${x}]`;return`
            let outputIndices${x} = ${m.offsetToIndices(`global_idx * 4u + ${x}u`)};
            let offsetA${x} = ${w.broadcastedIndicesToOffset(`outputIndices${x}`,m)};
            let offsetB${x} = ${$.broadcastedIndicesToOffset(`outputIndices${x}`,m)};
            let indexA${x} = offsetA${x} / 4u;
            let indexB${x} = offsetB${x} / 4u;
            let componentA${x} = offsetA${x} % 4u;
            let componentB${x} = offsetB${x} % 4u;
            ${S}[${x}] = ${I}(${h(B,R)});
          `};d===9?_=`
            var data = vec4<u32>(0);
            ${y("data",0,"u32")}
            ${y("data",1,"u32")}
            ${y("data",2,"u32")}
            ${y("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:_=`
            ${y("outputData[global_idx]",0)}
            ${y("outputData[global_idx]",1)}
            ${y("outputData[global_idx]",2)}
            ${y("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,$,m)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${_}
      }`},Mo=(e,t,r,i,a,n,s=r.dataType)=>{let o=r.dims.map(Number),u=i.dims.map(Number),l=!D.areEqual(o,u),d=o,p=D.size(o),h=!1,f=!1,m=[l];if(l){let w=jt.calcShape(o,u,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");d=w.slice(),p=D.size(d);let $=D.size(o)===1,_=D.size(u)===1,y=o.length>0&&o[o.length-1]%4===0,S=u.length>0&&u[u.length-1]%4===0;m.push($),m.push(_),m.push(y),m.push(S);let x=1;for(let I=1;I<d.length;I++){let B=o[o.length-I],R=u[u.length-I];if(B===R)x*=B;else break}x%4===0?(f=!0,h=!0):($||_||y||S)&&(h=!0)}else h=!0;return m.push(h),{name:e,shaderCache:{hint:t+m.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Bo(w,o,u,d,h,l,f,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(d)/4)},...k(o,u,d)]})}},Ft=(e,t,r,i,a,n)=>{e.compute(Mo(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},Do=e=>{Ft(e,"Add",(t,r)=>`${t}+${r}`)},Po=e=>{Ft(e,"Div",(t,r)=>`${t}/${r}`)},Uo=e=>{Ft(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},No=e=>{Ft(e,"Mul",(t,r)=>`${t}*${r}`)},Lo=e=>{let t=C("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ft(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Vo=e=>{Ft(e,"Sub",(t,r)=>`${t}-${r}`)},qo=e=>{Ft(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Fo=e=>{Ft(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Wo=e=>{Ft(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Go=e=>{Ft(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),jo,Ho,Ko,Zo,Qo,Xo,pc=z(()=>{oe(),te(),b(),J(),jo=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,n=i.dims.length;e.forEach((s,o)=>{if(o!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==t&&u!==i.dims[l])throw new Error("non concat dimensions must match")})}})},Ho=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ko=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(n):a===0?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)},Zo=(e,t,r,i)=>{let a=D.size(r),n=new Array(e.length),s=new Array(e.length),o=0,u=[],l=[],d=[{type:12,data:a}];for(let w=0;w<e.length;++w)o+=e[w].dims[t],n[w]=o,l.push(e[w].dims.length),s[w]=C(`input${w}`,i,l[w]),u.push("rank"),d.push({type:12,data:n[w]});for(let w=0;w<e.length;++w)d.push(...k(e[w].dims));d.push(...k(r));let p=W("output",i,r.length),h=p.indicesGet("indices",t),f=Array.from(Array(n.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),m=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let $=0;$<e.length;$++)w.registerUniform(`sizeInConcatAxis${$}`,"u32");return w.declareVariables(...s,p)})()}

  ${Ho(n.length,f)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ko(s,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:m}},Qo=(e,t)=>{let r=e.inputs,i=r[0].dims,a=D.normalizeAxis(t.axis,i.length);jo(r,a);let n=i.slice();n[a]=r.reduce((o,u)=>o+(u.dims.length>a?u.dims[a]:0),0);let s=r.filter(o=>D.size(o.dims)>0);e.compute(Zo(s,a,n,r[0].dataType),{inputs:s})},Xo=e=>g({axis:e.axis})}),Fr,Wr,Gr,pn,jr=z(()=>{oe(),te(),Fr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Wr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Gr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},pn=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,i]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=(e==null?void 0:e.activation_params)||[ji,Mt];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),at,Yo,cn=z(()=>{at=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Yo=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Jo,cc=z(()=>{Jo=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),sa,hn,fn=z(()=>{oe(),te(),J(),jr(),sa=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((s,o)=>`
      if (${M(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,M(a,o+n,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},hn=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s[s.length-2],l=o[o.length-1],d=s[s.length-1],p=O(l),h=O(d),f=O(u),m=D.size(r)/p/f,w=e.length>2,$=i?i.slice(0,-2):r.slice(0,-2),_=[D.size($),u,l],y=[{type:12,data:m},{type:12,data:u},{type:12,data:l},{type:12,data:d}];Wr(t,y),y.push(...k($,s,o)),w&&y.push(...k(e[2].dims)),y.push(...k(_));let S=x=>{let I=ge("batch_dims",e[0].dataType,$.length),B=C("a",e[0].dataType,s.length,h),R=C("b",e[1].dataType,o.length,p),P=W("output",e[0].dataType,_.length,p),V=A(P.type.tensor),j=Fr(t,P.type.value,V),se=[B,R],Q="";if(w){let ze=a?p:1;se.push(C("bias",e[2].dataType,e[2].dims.length,ze)),Q=`${a?`value += bias[col / ${ze}];`:`value += ${P.type.value}(bias[row + i]);`}`}let ae=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Gr(t,ae);let ke=()=>{let ze=`var a_data: ${B.type.value};`;for(let X=0;X<h;X++)ze+=`
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${p}];`;for(let X=0;X<f;X++){ze+=`a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${h}];`;for(let me=0;me<h;me++)ze+=`
            values[${X}] = fma(${R.type.value}(a_data${h===1?"":`[${me}]`}), b_data${me}, values[${X}]);
`}return ze};return`
  ${x.registerUniforms(ae).registerInternalVariables(I).declareVariables(...se,P)}
  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${B.type.indices};
    ${sa("a_indices",B,B.rank-2,I.rank,"batch_indices")}
    ${B.indicesSet("a_indices",B.rank-2,0)}
    ${B.indicesSet("a_indices",B.rank-1,0)}
    let a_offset = ${B.indicesToOffset("a_indices")};

    var b_indices: ${R.type.indices};
    ${sa("b_indices",R,R.rank-2,I.rank,"batch_indices")}
    ${R.indicesSet("b_indices",R.rank-2,0)}
    ${R.indicesSet("b_indices",R.rank-1,0)}
    let b_offset = ${R.indicesToOffset("b_indices")};
    var values: array<${P.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${ke()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${Q}
      ${j}
      let cur_indices = ${P.type.indices}(batch, row + i, col);
      let offset = ${P.indicesToOffset("cur_indices")};
      ${P.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${h};${f};${a}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:S}}}),eu,tu,mn,gn,ru,yn,iu,za,wn=z(()=>{oe(),te(),J(),jr(),fn(),cn(),eu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,tu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,mn=(e,t,r="f32",i,a=!1,n=32,s=!1,o=32)=>{let u=t[1]*e[1],l=t[0]*e[0],d=a?u:n,p=a?n:u,h=d/t[0],f=n/t[1];if(!((a&&h===4&&e[1]===4||!a&&(h===3||h===4))&&d%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${d/h}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${eu(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${tu(a,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},gn=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,ru=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",yn=(e,t,r="f32",i,a=!1,n=32,s=!1,o=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=a?l:n,h=a?n:l;if(!(h%t[1]===0&&p%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let f=h/t[1],m=p/t[0],w=n/t[1],$=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${gn(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${gn(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${ru(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${$}
  }
`},iu=(e,t,r,i,a=!1)=>{let[n,s,o,u]=i,l=A(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${at(e,l)} {
      var value = ${at(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${sa("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${at(e,l)} {
      var value = ${at(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${sa("bIndices",o,o.rank-2,n.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${at(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${at(e,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},za=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s.slice(0,-2),l=o.slice(0,-2),d=i?i.slice(0,-2):r.slice(0,-2),p=D.size(d),h=s[s.length-2],f=s[s.length-1],m=o[o.length-1],w=f%4===0&&m%4===0,$=h<=8?[4,1,1]:[4,4,1],_=[8,8,1],y=[Math.ceil(m/_[0]/$[0]),Math.ceil(h/_[1]/$[1]),Math.ceil(p/_[2]/$[2])],S=w?4:1,x=[...u,h,f/S],I=x.length,B=[...l,f,m/S],R=B.length,P=[p,h,m/S],V=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];Wr(t,V),V.push(...k(d,x,B));let j=["rank","rank"],se=e.length>2;se&&(V.push(...k(e[2].dims)),j.push("rank")),V.push(...k(P));let Q=ae=>{let ke=d.length,ze=ge("batchDims",e[0].dataType,ke,1),X=A(e[0].dataType),me=C("a",e[0].dataType,I,S),Ue=C("b",e[1].dataType,R,S),H=W("result",e[0].dataType,P.length,S),Ne=[me,Ue];if(se){let Ge=a?S:1;Ne.push(C("bias",e[2].dataType,e[2].dims.length,Ge))}let F=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Gr(t,F);let G=A(H.type.tensor),de=Fr(t,H.type.value,G),_e=iu(S,se,de,[ze,me,Ue,H],a);return`
  ${ae.registerUniforms(F).registerInternalVariables(ze).declareVariables(...Ne,H)}
  ${_e}
  ${w?mn($,_,X,ze):yn($,_,X,ze)}
                   `};return{name:"MatMul",shaderCache:{hint:`${$};${t.activation};${w};${a}`,inputDependencies:j},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:V}),getShaderSource:Q}}}),au,nu,hc=z(()=>{oe(),Tt(),J(),jr(),cn(),cc(),wn(),au=(e,t,r,i,a=!1,n,s=4,o=4,u=4,l="f32")=>{let d=V=>{switch(V){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${V} is not supported.`)}},p=V=>{switch(V){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${V} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",$=e?"row":"col",_=e?"col":"row",y=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${$} / outWidth;
    let outCol = ${$} % outWidth;

    let WRow = ${_} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${_} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${_} % inChannels;
    var resData = ${at(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${w}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(s)}
    }
    return resData;`,S=e?t&&i?`
    let col = colIn * ${s};
    ${y}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${y}
    }
    return ${at(s,l)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${y}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${y}
    }
    return ${at(s,l)}(0.0);`,x=e?i&&r?p(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(o)}
    }
    return ${at(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(o)}
    }
    return ${at(o,l)}(0.0);`,I=at(u,l),B=at(e?s:o,l),R=at(e?o:s,l),P=Fr(n,I,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${B} {
      ${e?S:x}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${e?x:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${Yo(a)}
      ${P}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},nu=(e,t,r,i,a,n,s,o,u)=>{let l=t.format==="NHWC",d=l?e[0].dims[3]:e[0].dims[1],p=r[0],h=l?r[2]:r[3],f=l?r[1]:r[2],m=l?r[3]:r[1],w=l&&(d%4===0||d%3===0)&&m%4===0,$=l?m:h*f,_=l?h*f:m,y=[8,8,1],S=i<=8?[4,1,1]:[4,4,1],x=[Math.ceil($/y[0]/S[0]),Math.ceil(_/y[1]/S[1]),Math.ceil(p/y[2]/S[2])];xe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${x}`);let I=w?l&&d%4!==0?3:4:1,B=y[1]*S[1],R=y[0]*S[0],P=Math.max(y[0]*I,y[1]),V=i%B===0,j=a%R===0,se=n%P===0,Q=w?[I,4,4]:[1,1,1],ae=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Wr(t,ae),ae.push(...k(e[0].dims,e[1].dims));let ke=["rank","rank"];s&&(ae.push(...k(e[2].dims)),ke.push("rank")),ae.push(...k(r));let ze=X=>{let me=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Gr(t,me);let Ue=w?4:1,H=A(e[0].dataType),Ne=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${H}>`:H}) {
        result[flatIndex] = ${w?`vec4<${H}>`:H}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${H}>`:H}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,F=C("x",e[0].dataType,e[0].dims.length,I===3?1:I),G=C("w",e[1].dataType,e[1].dims.length,Ue),de=[F,G],_e=W("result",e[0].dataType,r.length,Ue);if(s){let Ge=C("bias",e[2].dataType,e[2].dims.length,Ue);de.push(Ge),Ne+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${H}>`:H} {
          return bias[coords.${l?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Jo("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(me).declareVariables(...de,_e)}
        ${Ne}
        ${au(l,V,j,se,s,t,Q[0],Q[1],Q[2],H)}
        ${w?mn(S,y,H,void 0,!l,P):yn(S,y,H,void 0,!l,P,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${w};${V};${j};${se};${B};${R};${P}`,inputDependencies:ke},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:ae}),getShaderSource:ze}}}),su,_n,oa,ou,bn,uu,lu,du,fc=z(()=>{oe(),Tt(),te(),J(),jr(),cn(),su=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},_n=e=>typeof e=="number"?[e,e,e]:e,oa=(e,t)=>t<=1?e:e+(e-1)*(t-1),ou=(e,t,r,i=1)=>{let a=oa(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},bn=(e,t,r,i,a)=>{a==null&&(a=ou(e,t[0],i[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/i[s]+1));return n},uu=(e,t,r,i,a,n,s,o,u,l)=>{let d,p,h,f;if(e==="VALID"&&(e=0),typeof e=="number"){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=bn([t,r,i,1],[o,u,l],1,[a,n,s],e);p=m[0],h=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((w,$,_)=>w===_[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=bn([t,r,i,1],[o,u,l],1,[a,n,s],e[0]);p=m[0],h=m[1],f=m[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/a),h=Math.ceil(r/n),f=Math.ceil(i/s);let m=(p-1)*a+o-t,w=(h-1)*n+u-r,$=(f-1)*s+l-i,_=Math.floor(m/2),y=m-_,S=Math.floor(w/2),x=w-S,I=Math.floor($/2),B=$-I;d={top:S,bottom:x,left:I,right:B,front:_,back:y}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:h,outWidth:f}},lu=(e,t,r,i,a,n=!1,s="channelsLast")=>{let o,u,l,d,p;if(s==="channelsLast")[o,u,l,d,p]=e;else if(s==="channelsFirst")[o,p,u,l,d]=e;else throw new Error(`Unknown dataFormat ${s}`);let[h,,f,m,w]=t,[$,_,y]=_n(r),[S,x,I]=_n(i),B=oa(f,S),R=oa(m,x),P=oa(w,I),{padInfo:V,outDepth:j,outHeight:se,outWidth:Q}=uu(a,u,l,d,$,_,y,B,R,P),ae=n?h*p:h,ke=[0,0,0,0,0];return s==="channelsFirst"?ke=[o,ae,j,se,Q]:s==="channelsLast"&&(ke=[o,j,se,Q,ae]),{batchSize:o,dataFormat:s,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:j,outHeight:se,outWidth:Q,outChannels:ae,padInfo:V,strideDepth:$,strideHeight:_,strideWidth:y,filterDepth:f,filterHeight:m,filterWidth:w,effectiveFilterDepth:B,effectiveFilterHeight:R,effectiveFilterWidth:P,dilationDepth:S,dilationHeight:x,dilationWidth:I,inShape:e,outShape:ke,filterShape:t}},du=(e,t,r,i,a,n)=>{let s=n==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],u={x:r.map(($,_)=>_)},l=[Math.ceil(su(u.x.map($=>r[$]))/o[0]),1,1];xe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let d=1,p=D.size(r),h=[{type:12,data:p},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Wr(t,h),h.push(...k(e[0].dims,e[1].dims));let f=["rank","rank"],m=e.length===3;m&&(h.push(...k(e[2].dims)),f.push("rank")),h.push(...k(r));let w=$=>{let _=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Gr(t,_);let y=1,S=A(e[0].dataType),x=C("x",e[0].dataType,e[0].dims.length,d),I=C("W",e[1].dataType,e[1].dims.length,y),B=[x,I],R=W("result",e[0].dataType,r.length,y),P="";if(m){let se=C("bias",e[2].dataType,e[2].dims.length,y);B.push(se),P+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${S} {
          return bias[${s?M("coords",4,5):M("coords",1,5)}];
        }`}let V=at(d,S),j=Fr(t,V,S);return`
            ${P}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${x.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${$.registerUniforms(_).declareVariables(...B,R)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${M("coords",0,x.rank)};
              let d2 = ${s?M("coords",x.rank-1,x.rank):M("coords",1,x.rank)};
              let xFRCCorner = vec3<u32>(${s?M("coords",1,x.rank):M("coords",2,x.rank)},
              ${s?M("coords",2,x.rank):M("coords",3,x.rank)},
              ${s?M("coords",3,x.rank):M("coords",4,x.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?M("uniforms.x_shape",1,x.rank):M("uniforms.x_shape",2,x.rank)};
              let xShapeZ = ${s?M("uniforms.x_shape",2,x.rank):M("uniforms.x_shape",3,x.rank)};
              let xShapeW = ${s?M("uniforms.x_shape",3,x.rank):M("uniforms.x_shape",4,x.rank)};
              let xShapeU = ${s?M("uniforms.x_shape",4,x.rank):M("uniforms.x_shape",1,x.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${m?"value = value + getBiasByOutputCoords(coords)":""};
              ${j}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${d};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:h}),getShaderSource:w}}}),pu,cu,mc=z(()=>{oe(),te(),J(),jr(),pu=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,u=t.format==="NHWC",l=u?r[3]:r[1],d=l/t.group,p=u&&d>=4?O(l):1,h=D.size(r)/p,f=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];Wr(t,f),f.push(...k(s,[o[0],o[1],o[2],o[3]/p]));let m=a?["rank","rank","rank"]:["rank","rank"];f.push(...k([r[0],r[1],r[2],r[3]/p]));let w=$=>{let _=W("output",e[0].dataType,r.length,p),y=A(_.type.tensor),S=Fr(t,_.type.value,y),x=C("x",e[0].dataType,s.length),I=C("w",e[1].dataType,o.length,p),B=[x,I];a&&B.push(C("b",e[2].dataType,e[2].dims,p));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Gr(t,R);let P=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${x.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${x.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${$.registerUniforms(R).declareVariables(...B,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${_.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${_.type.value} = ${_.type.value}(0);
    ${P}
    ${n}
    ${S}
    ${_.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:w}},cu=(e,t,r,i)=>{let a=e.length>2,n=O(r[3]),s=O(r[2]),o=D.size(r)/n/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],d=[r[0],r[1],r[2],r[3]/n],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Wr(t,p),p.push(...k(u,l,d));let h=(s-1)*t.strides[1]+l[1],f=m=>{let w=W("output",e[0].dataType,d.length,n),$=A(w.type.tensor),_=Fr(t,w.type.value,$),y=C("x",e[0].dataType,u.length,n),S=C("w",e[1].dataType,l.length,n),x=[y,S];a&&x.push(C("b",e[2].dataType,e[2].dims,n));let I=a?"value += b[output_channel];":"",B=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Gr(t,B),`
  ${m.registerUniforms(B).declareVariables(...x,w)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${y.type.value}, ${h}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${y.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${y.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${_}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${h};${l[0]};${l[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:f}}}),hu,Ca,fu,Aa,$n,vn,mu,gu,xn,gc=z(()=>{te(),hc(),fc(),wn(),mc(),jr(),fn(),rt(),hu=(e,t,r,i,a,n)=>{let s=e[0],o=e.slice(n?1:2,n?3:4),u=o.length,l=t[0],d=t.slice(2).map((h,f)=>h+(h-1)*(r[f]-1)),p=o.map((h,f)=>h+i[f]+i[f+u]).map((h,f)=>Math.floor((h-d[f]+a[f])/a[f]));return p.splice(0,0,s),p.splice(n?3:1,0,l),p},Ca=[2,3,1,0],fu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Aa=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let i=e.pads.slice();nr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},$n=e=>{let t=pn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,o=e.pads,u=e.strides,l=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,pads:o,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},vn=(e,t,r,i)=>{let a=r.format==="NHWC",n=hu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let B=[t[0]];if(a){let R=e.kernelCustomData.wT??e.compute(ct(t[1],Ca),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=R),B.push(R)}else B.push(t[1]);t.length===3&&B.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(cu(B,r,n,i),{inputs:B}):e.compute(pu(B,r,n,i),{inputs:B});return}let s=t.length===3,o=t[0].dims[a?1:2],u=t[0].dims[a?2:3],l=t[0].dims[a?3:1],d=t[1].dims[2],p=t[1].dims[3],h=n[a?1:2],f=n[a?2:3],m=n[a?3:1],w=a&&d===o&&p===u&&r.pads[0]===0&&r.pads[1]===0;if(w||d===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let B=n[0],R,P,V,j=[];if(a){let ae=e.kernelCustomData.wT??e.compute(ct(t[1],Ca),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ae),w){let ke=o*u*l;R=t[0].reshape([1,B,ke]),P=ae.reshape([1,ke,m]),V=[1,B,m]}else R=t[0].reshape([B,o*u,l]),P=ae.reshape([1,l,m]),V=[B,h*f,m];j.push(R),j.push(P)}else R=t[0].reshape([B,l,o*u]),P=t[1].reshape([1,m,l]),V=[B,m,h*f],j.push(P),j.push(R);s&&j.push(t[2]);let se=V[2],Q=j[0].dims[j[0].dims.length-1];se<8&&Q<8?e.compute(hn(j,r,n,V,a,i),{inputs:j}):e.compute(za(j,r,n,V,a,i),{inputs:j});return}let $=!0,_=e.kernelCustomData.wT??e.compute(ct(t[1],Ca),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=_);let y=[t[0],_];s&&y.push(t[2]);let S=a?h*f:m,x=a?m:h*f,I=d*p*l;e.compute(nu(y,r,n,S,x,I,s,$,i),{inputs:y})},mu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=Aa({...t,pads:a,strides:n,dilations:s,kernelShape:o},i);vn(e,i,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},gu=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=Aa(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=lu(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,i);e.compute(du(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},xn=(e,t)=>{if(fu(e.inputs,t),e.inputs[0].dims.length===3)mu(e,t);else if(e.inputs[0].dims.length===5)gu(e,e.inputs,t);else{let r=Aa(t,e.inputs);vn(e,e.inputs,r)}}}),yu,yc=z(()=>{oe(),Tt(),te(),J(),yu=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,o=e[1].dims,u=o[2]/s,l=o[3],d=n?O(u):1,p=n&&l===1&&u>=4,h=p?Math.floor(u/4)*4:Math.floor(u/d)*d,f=u-h,m=n?O(l):1,w=n?l===1?d:m:1,$=D.size(a)/m,_=[Math.ceil($/64),1,1];xe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let y=["rank","rank"],S=[t.strides[0],t.strides[1]],x=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],I=[t.dilations[0],t.dilations[1]],B=[x[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),x[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],R=[B[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),B[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],P=[{type:12,data:$},{type:12,data:S},{type:12,data:x},{type:12,data:I},{type:12,data:B},{type:6,data:R},{type:12,data:h},{type:12,data:u},{type:12,data:l},...k(e[0].dims,e[1].dims)];i&&(P.push(...k(e[2].dims)),y.push("rank")),P.push(...k(a));let V=j=>{let se=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:x.length},{name:"dilations",type:"u32",length:x.length},{name:"effective_filter_dims",type:"u32",length:B.length},{name:"pads",type:"i32",length:R.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Q=A(e[0].dataType),ae=n?1:2,ke=n?2:3,ze=n?3:1,X=C("W",e[1].dataType,e[1].dims.length,w),me=C("Dy",e[0].dataType,e[0].dims.length,d),Ue=[me,X];i&&Ue.push(C("bias",e[2].dataType,[a[ze]].length,m));let H=W("result",e[0].dataType,a.length,m),Ne=()=>{let de="";if(p)d===4?de+=`
        let xValue = ${me.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:d===2?de+=`
          dotProd = dotProd + dot(vec4<${Q}>(${me.getByOffset("x_offset")}, ${me.getByOffset("x_offset + 1u")}), vec4<${Q}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:d===1&&(de+=`
          dotProd = dotProd + dot(vec4<${Q}>(${me.getByOffset("x_offset")}, ${me.getByOffset("x_offset + 1u")}, ${me.getByOffset("x_offset + 2u")}, ${me.getByOffset("x_offset + 3u")}), vec4<${Q}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(de+=`
                  let xValue = ${n?me.getByOffset(`${me.indicesToOffset(`${me.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):me.get("batch","inputChannel","idyR","idyC")};
        `,d===1)de+=`
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let _e=0;_e<d;_e++)de+=`
            let wValue${_e} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${_e}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${_e}] * wValue${_e};`;return de},F=()=>{if(f===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let de="";if(d===1){de+="dotProd = dotProd";for(let _e=0;_e<f;_e++)de+=`
            + ${me.getByOffset(`x_offset + ${_e}`)} * ${X.getByOffset(`w_offset + ${_e}`)}`;de+=";"}else if(d===2){if(f!==2)throw new Error(`Invalid inputChannelsRemainder ${f}.`);de+=`
          let xValue = ${me.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return de},G=`
            let outputIndices = ${H.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${H.indicesGet("outputIndices",0)};
            let d1 = ${H.indicesGet("outputIndices",ze)};
            let r = ${H.indicesGet("outputIndices",ae)};
            let c = ${H.indicesGet("outputIndices",ke)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${H.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Q}(dyRCorner) + ${Q}(wR)) / ${Q}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Q}(uniforms.Dy_shape[${ae}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${Q}(dyCCorner) + ${Q}(wC)) / ${Q}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Q}(uniforms.Dy_shape[${ke}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${me.indicesToOffset(`${me.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:d}) {
                  ${Ne()}
                  inputChannel = inputChannel + ${p?4:d};
                }
                ${F()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${m}]`:""};
            ${H.setByOffset("global_idx","value")};
          `;return`
    ${j.registerUniforms(se).declareVariables(...Ue,H)}
      ${j.mainStart()}
      ${j.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${G}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${w}${m}${p}${f}`,inputDependencies:y},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:P}),getShaderSource:V}}}),wu,_u,bu,Sn,$u,vu,Tn,xu,Su,wc=z(()=>{yc(),jr(),rt(),wu=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,_u=(e,t,r,i,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=n,r[a]=e-n):t==="SAME_LOWER"&&(r[i]=e-n,r[a]=n)},bu=(e,t,r,i,a,n,s,o,u,l)=>{let d=e.length-2,p=l.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let h=e[0],f=t[o?3:1]*a;for(let m=0,w=e.length-d-(o?1:0);m<d;++m,++w){let $=e[w],_=p?$*s[m]:l[m],y=wu($,s[m],n[m],t[w],r[m],_);_u(y,i,n,m,m+d),p&&l.push(s[m]*($-1)+u[m]+(t[w]-1)*r[m]+1-n[m]-n[m+d])}l.splice(0,0,h),l.splice(o?3:1,0,f)},Sn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,h)=>p*h,1)===0){r.length=0;for(let p=2;p<t[1].dims.length;++p)r.push(t[1].dims[p])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();if(u.reduce((p,h)=>p+h,0)===0){let p=t[0].dims.length-2;u=new Array(p).fill(1)}let l=e.strides.slice();if(l.reduce((p,h)=>p+h,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}bu(o,r,u,e.autoPad,e.group,a,l,i,s,n);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:u,strides:l}),d},$u=e=>{let t=pn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group??1,s=e.kernelShape,o=e.pads,u=e.strides,l=e.wIsConst(),d=e.outputPadding,p=e.outputShape;return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:d,outputShape:p,pads:o,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},vu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Tn=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(ct(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(yu(n,r,i),{inputs:n})},xu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let u=t.outputPadding;u=[0].concat(u);let l=Sn({...t,pads:o,strides:s,dilations:n,kernelShape:a,outputPadding:u},i);Tn(e,i,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Su=(e,t)=>{if(vu(e.inputs,t),e.inputs[0].dims.length===3)xu(e,t);else{let r=Sn(t,e.inputs);Tn(e,e.inputs,r)}}}),Tu,Eu,ku,_c=z(()=>{oe(),te(),b(),J(),Tu=(e,t,r,i)=>{let a=D.size(t),n=t.length,s=C("input",e,n),o=W("output",e,n),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=D.normalizeAxis(u,n),d=p=>{let h=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,f=M("uniforms.input_shape","uniforms.axis",n),m=i.reverse?h+(i.exclusive?" + 1":""):"0",w=i.reverse?f:h+(i.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:l},...k(t,t)]}),getShaderSource:d}},Eu=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(Tu(i,r,a,t),{inputs:[0]})},ku=e=>{let t=e.exclusive===1,r=e.reverse===1;return g({exclusive:t,reverse:r})}}),Iu,zu,Cu,Au,Ou,bc=z(()=>{oe(),te(),b(),J(),Iu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},zu=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)a.push(r.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},Cu=(e,t)=>{let r,i,a,n,s,o,u=t.format==="NHWC",l=t.blocksize,d=t.mode==="DCR";u?([r,i,a,n]=e.dims,s=d?[r,i,a,l,l,n/l**2]:[r,i,a,n/l**2,l,l],o=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=d?[r,l,l,n/l**2,i,a]:[r,n/l**2,l,l,i,a],o=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),h=p.dims.length,f=e.dataType,m=C("a",f,h),w=W("output",f,h),$=_=>`
  ${_.registerUniform("output_size","u32").declareVariables(m,w)}

  ${zu(o,h,m,w)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:_=>{let y=u?[r,i*l,a*l,n/l**2]:[r,n/l**2,i*l,a*l],S=D.size(y),x=p.dims,I=D.sortBasedOnPerm(x,o);return{outputs:[{dims:y,dataType:_[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...k(x,I)]}},getShaderSource:$}},Au=(e,t)=>{Iu(e.inputs),e.compute(Cu(e.inputs[0],t))},Ou=e=>g({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Oa,ua,En,Ru,Bu,Mu,Du,kn,Pu,Uu,Nu,$c=z(()=>{oe(),te(),b(),J(),Oa="[a-zA-Z]|\\.\\.\\.",ua="("+Oa+")+",En="^"+ua+"$",Ru="("+ua+",)*"+ua,Bu="^"+Ru+"$",Mu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Du=class{constructor(e,t){var a;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Bu)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,s)=>{let o=e[s].dims.slice();if(!n.match(RegExp(En)))throw new Error("Invalid LHS term");let u=this.processTerm(n,!0,o,s);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,s])=>s.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(ua)))throw new Error("Invalid RHS");(a=i.match(RegExp(Oa,"g")))==null||a.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(n);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],o=0;if(!e.match(RegExp(En))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(Oa,"g")),l=new Mu(i);return u==null||u.forEach((d,p)=>{if(d==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let h=a-u.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(o,o+h),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let f=0;f<s.length;f++){let m=String.fromCharCode(48+f);l.addSymbol(m,p+f),this.addSymbol(m,r[o++],i)}}else l.addSymbol(d,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(d,r[o++],i)}),l}},kn=e=>e+"_max",Pu=(e,t,r,i)=>{let a=e.map(l=>l.length).map((l,d)=>C(`input${d}`,t,l)),n=D.size(i),s=W("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),u=l=>{let d=[],p="var prod = 1.0;",h="var sum = 0.0;",f="sum += prod;",m=[],w=[],$=[],_=[],y=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((x,I)=>{var B;if(r.rhs.symbolToIndices.has(I)){let R=(B=r.rhs.symbolToIndices.get(I))==null?void 0:B[0];R!==void 0&&r.lhs.forEach((P,V)=>{if(x.inputIndices.includes(V)){let j=P.symbolToIndices.get(I);if(j===void 0)throw new Error("Invalid symbol error");j.forEach(se=>{d.push(`${a[V].indicesSet(`input${V}Indices`,se,s.indicesGet("outputIndices",R))}`)})}})}else r.lhs.forEach((R,P)=>{if(x.inputIndices.includes(P)){let V=R.symbolToIndices.get(I);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(j=>{m.push(`${a[P].indicesSet(`input${P}Indices`,j,`${I}`)}`)}),_.push(`prod *= ${a[P].getByIndices(`input${P}Indices`)};`)}}),w.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${kn(I)}; ${I}++) {`),$.push("}")});let S=y?[...d,`let sum = ${a.map((x,I)=>x.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...d,h,...w,...m,p,..._,f,...$];return`
            ${l.registerUniforms(o.map(x=>({name:`${kn(x)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((x,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=o.filter(p=>r.symbolToInfo.has(p)).map(p=>{var h;return{type:12,data:((h=r.symbolToInfo.get(p))==null?void 0:h.dimValue)||0}});l.push({type:12,data:n});let d=e.map((p,h)=>[...k(p)]).reduce((p,h)=>p.concat(h),l);return d.push(...k(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}},getShaderSource:u}},Uu=(e,t)=>{let r=new Du(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(Pu(a,e.inputs[0].dataType,r,i))},Nu=e=>{let t=e.equation.replace(/\s+/g,"");return g({equation:t})}}),Lu,In,Vu,qu,Fu,vc=z(()=>{oe(),te(),J(),Lu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},In=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},Vu=(e,t)=>e.length>t.length?In(e,t):In(t,e),qu=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=Vu(t,r),a=e[0].dataType,n=a===9||D.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,o=n||i.length>0&&i[i.length-1]%4===0?4:1,u=Math.ceil(D.size(i)/o),l=p=>{let h=C("input",a,t.length,s),f=W("output",a,i.length,o),m;if(a===9){let w=($,_,y="")=>`
          let outputIndices${_} = ${f.offsetToIndices(`outputOffset + ${_}u`)};
          let offset${_} = ${h.broadcastedIndicesToOffset(`outputIndices${_}`,f)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${$}[${_}] = ${y}(${h.getByOffset(`index${_}`)}[component${_}]);
        `;m=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${f.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",f)};
        let data = ${f.type.value}(${h.getByOffset(`inputOffset / ${s}`)});
        ${f.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(h,f)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},d=[{type:12,data:u},...k(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},Fu=e=>{Lu(e.inputs),e.compute(qu(e.inputs),{inputs:[0]})}}),Wu,Gu,xc=z(()=>{oe(),te(),J(),dn(),Wu=e=>{let t=e[0].dataType,r=D.size(e[0].dims),i=D.size(e[1].dims),a=i%4===0,n=s=>{let o=C("x",t,[1],4),u=C("bias",t,[1],4),l=W("y",t,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${u.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,h=a?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(d).declareVariables(o,u,l)}

    ${un(E(t))}

    ${s.mainStart(T)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",ln("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/T/4)}})}},Gu=e=>{e.inputs.length<2||D.size(e.inputs[1].dims)===0?To(e):e.compute(Wu(e.inputs))}}),ju,Hu,Ku,Zu,Sc=z(()=>{oe(),te(),b(),J(),ju=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Hu=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=D.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(n,1,...i);let o=r[n],u=e[0].dataType===9?4:1,l=Math.ceil(D.size(s)/u),d=[{type:12,data:l},{type:6,data:o},{type:12,data:n},...k(e[0].dims,e[1].dims,s)],p=h=>{let f=C("data",e[0].dataType,e[0].dims.length,u),m=C("inputIndices",e[1].dataType,e[1].dims.length),w=W("output",e[0].dataType,s.length,u),$=y=>{let S=i.length,x=`var indicesIndices${y}  = ${m.type.indices}(0);`;for(let I=0;I<S;I++)x+=`${S>1?`indicesIndices${y}[${I}]`:`indicesIndices${y}`} = ${s.length>1?`outputIndices${y}[uniforms.axis + ${I}]`:`outputIndices${y}`};`;x+=`
          var idx${y} = ${m.getByIndices(`indicesIndices${y}`)};
          if (idx${y} < 0) {
            idx${y} = idx${y} + uniforms.axisDimLimit;
          }
          var dataIndices${y} : ${f.type.indices};
        `;for(let I=0,B=0;I<a;I++)I===n?(x+=`${a>1?`dataIndices${y}[${I}]`:`dataIndices${y}`} = u32(idx${y});`,B+=S):(x+=`${a>1?`dataIndices${y}[${I}]`:`dataIndices${y}`} = ${s.length>1?`outputIndices${y}[${B}]`:`outputIndices${y}`};`,B++);return x},_;if(e[0].dataType===9){let y=(S,x,I="")=>`
          let outputIndices${x} = ${w.offsetToIndices(`outputOffset + ${x}u`)};
          ${$(x)};
          let offset${x} = ${f.indicesToOffset(`dataIndices${x}`)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${S}[${x}] = ${I}(${f.getByOffset(`index${x}`)}[component${x}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${y("value",0,"u32")}
        ${y("value",1,"u32")}
        ${y("value",2,"u32")}
        ${y("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else _=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${$("")};
      let value = ${f.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,w)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${_}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p}},Ku=e=>g({axis:e.axis}),Zu=(e,t)=>{let r=e.inputs;ju(r),e.compute(Hu(e.inputs,t))}}),Qu,Xu,Yu,Tc=z(()=>{oe(),te(),J(),Qu=(e,t,r,i,a,n,s,o,u)=>{let l=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:o},{type:12,data:u}],d=[n];l.push(...k(t.dims,d));let p=h=>{let f=C("indices_data",t.dataType,t.dims.length),m=W("input_slice_offsets_data",12,1,1),w=[f,m],$=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms($).declareVariables(...w)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:l}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},Xu=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,n=r[1].dims,s=n[n.length-1],o=D.sizeToDimension(n,n.length-1),u=D.sizeFromDimension(i,t.batchDims+s),l=D.sizeToDimension(i,t.batchDims),d=D.sizeFromDimension(i,t.batchDims),p=o/l,h=new Array(s),f=u;for(let x=0;x<s;++x)h[s-1-x]=f,f*=i[t.batchDims+s-1-x];let m=Qu(e,r[1],h,t.batchDims,i,o,p,d,s),w=t.batchDims+s;if(w>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let $=n.slice(0,-1).concat(i.slice(w)),_=D.size($),y=[{type:12,data:_},{type:12,data:u},...k(r[0].dims,m.dims,$)],S=x=>{let I=C("data",r[0].dataType,r[0].dims.length),B=C("slice_offsets",12,m.dims.length),R=W("output",r[0].dataType,$.length);return`
          ${x.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,B,R)}
            ${x.mainStart()}
            ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:$,dataType:a}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:y}),getShaderSource:S},{inputs:[r[0],m]})},Yu=e=>({batchDims:e.batch_dims,cacheKey:""})}),Ju,el,tl,rl,Ec=z(()=>{oe(),te(),b(),J(),Ju=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((o,u)=>u===r?Math.ceil(o/i)===n.dims[u]:o===n.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((o,u)=>o===n.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},el=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=D.normalizeAxis(t.gatherAxis,a),s=D.normalizeAxis(t.quantizeAxis,a),o=r.slice(0);o.splice(n,1,...i);let u=D.size(o),l=e[2].dataType,d=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...k(...e.map((f,m)=>f.dims),o)],h=f=>{let m=C("data",e[0].dataType,e[0].dims.length),w=C("inputIndices",e[1].dataType,e[1].dims.length),$=C("scales",e[2].dataType,e[2].dims.length),_=e.length>3?C("zeroPoint",e[3].dataType,e[3].dims.length):void 0,y=W("output",l,o.length),S=[m,w,$];_&&S.push(_);let x=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${f.registerUniforms(x).declareVariables(...S,y)}
        ${f.mainStart()}
        let output_indices = ${y.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${y.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${y.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${y.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${y.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${$.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${$.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${$.getByIndices("scale_indices")};
        ${_?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${_.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${_.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${E(l)}(quantized_data - zero_point) * scale;
        ${y.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((f,m)=>m!==1).map(f=>f.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(f,m)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:h}},tl=(e,t)=>{let r=e.inputs;Ju(r,t),e.compute(el(e.inputs,t))},rl=e=>g({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),il,al,nl,sl,kc=z(()=>{oe(),te(),b(),J(),il=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},al=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,n=e[1].dims,s=e[1].dataType,o=D.normalizeAxis(t.axis,a),u=r[o],l=n.slice(0),d=D.size(l),p=C("input",i,a),h=C("indicesInput",s,n.length),f=W("output",i,l.length),m=[{type:12,data:d},{type:6,data:u},{type:12,data:o}];return m.push(...k(r,n,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,h,f)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},nl=e=>g({axis:e.axis}),sl=(e,t)=>{let r=e.inputs;il(r),e.compute(al(e.inputs,t))}}),ol,ul,ll,dl,Ic=z(()=>{oe(),te(),J(),ol=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},ul=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=ni.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[a,n];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(n/u),d=Math.ceil(a/u),p=!0,h=D.size(o),f=[{type:12,data:p?l:h},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(f.push(...k(e[2].dims)),m.push("rank")),f.push(...k(o));let w=_=>{let y="";t.transA&&t.transB?y="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?y="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?y="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(y="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",x=C("a",e[0].dataType,e[0].dims),I=C("b",e[1].dataType,e[1].dims),B=x.type.value,R=null,P=[x,I];e.length===3&&(R=C("c",e[2].dataType,e[2].dims.length),P.push(R));let V=W("output",e[0].dataType,o.length);P.push(V);let j=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${_.registerUniforms(j).declareVariables(...P)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${B}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${y}
    }

    ${S}
    ${R!=null?`let cOffset = ${R.broadcastedIndicesToOffset("vec2(m, n)",V)}; value += ${B}(uniforms.beta) * ${R.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},$=_=>{let y=C("a",e[0].dataType,e[0].dims),S=C("b",e[1].dataType,e[1].dims),x=null,I=[y,S];e.length===3&&(x=C("c",e[2].dataType,e[2].dims.length),I.push(x));let B=W("output",e[0].dataType,o.length);I.push(B);let R=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],P="",V="";t.transA&&t.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,P="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,P="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,P="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,P="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let j=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${_.registerUniforms(R).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${y.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${u}>, ${u}>;
  ${_.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${B.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${V}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${P}
      }
      workgroupBarrier();
    }

    ${j}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${x!=null?`let cOffset = ${x.broadcastedIndicesToOffset("vec2(m, n)",B)}; value += ${B.type.value}(uniforms.beta) * ${x.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:l*d},programUniforms:f}),getShaderSource:$}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:w}},ll=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},dl=(e,t)=>{ol(e.inputs),e.compute(ul(e.inputs,t))}}),Zt,rr,Hr,Kr,pl,cl,hl,fl,ml,gl,yl,wl,_l,bl,zc=z(()=>{oe(),te(),b(),J(),[Zt,rr,Hr,Kr]=[0,1,2,3],pl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},cl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,hl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,fl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,ml=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,gl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Zt}] = batch;
     indices[${rr}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Hr}] = u32(r);
            indices[${Kr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Hr}] = u32(clamp(r, 0, H - 1));
          indices[${Kr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Hr}] = gs_reflect(r, border[1], border[3]);
          indices[${Kr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,yl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Zt}], indices[${rr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Zt}], indices[${rr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Zt}], indices[${rr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Zt}], indices[${rr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Zt}], indices[${rr}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Zt}], indices[${rr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,wl=(e,t)=>{let r=C("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=C("grid",e[1].dataType,i.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Zt,rr,Hr,Kr]=[0,3,1,2]);let s=W("output",e[0].dataType,n.length),o=r.type.value,u=D.size(n),l=[{type:12,data:u},...k(e[0].dims,i,n)],d=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${cl}
  ${hl(o)}
  ${fl(t)}
  ${ml(t)}
  ${gl(r,o,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Hr}]);
      let W_in = i32(uniforms.x_shape[${Kr}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Zt}], indices[${Hr}], indices[${Kr}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${yl(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let h=D.size(n);return{outputs:[{dims:n,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}},getShaderSource:d}},_l=(e,t)=>{pl(e.inputs),e.compute(wl(e.inputs,t))},bl=e=>g({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),yt,$l,vl,zn,xl,la,Sl,Tl=z(()=>{oe(),te(),b(),li(),sn(),J(),rt(),yt=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,$l=(e,t)=>{let r=e[0],i=yt(e,1),a=yt(e,2),n=yt(e,3),s=yt(e,4),o=yt(e,5),u=yt(e,6),l=yt(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=r.dims[0],p=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],f=p,m=0,w=0,$=Math.floor(h/t.numHeads);if(u&&l&&D.size(u.dims)&&D.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[3]!==$)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[3]!==$)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],w=u.dims[2]}else if(u&&D.size(u.dims)||l&&D.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _;if(i&&D.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');_=2,f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==$)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');_=5,f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==$)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');_=0,f=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}if(n&&D.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let y=m+f,S=0;if(s&&D.size(s.dims)>0){S=8;let R=s.dims;throw R.length===1?R[0]===d?S=1:R[0]===3*d+2&&(S=3):R.length===2&&R[0]===d&&R[1]===y&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let x=!1,I=h;if(a&&D.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(f!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=a.dims[2]}else{if(f!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=a.dims[1]*a.dims[3],x=!0}}let B=!1;if(s&&D.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&D.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==d||o.dims[1]!==t.numHeads||o.dims[2]!==p||o.dims[3]!==y)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:y,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:h,vHiddenSize:I,headSize:$,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:B,passPastInKv:x,qkvFormat:_}},vl=e=>g({...e}),zn=g({perm:[0,2,1,3]}),xl=(e,t,r,i,a,n,s)=>{let o=[i,a,n],u=D.size(o),l=[{type:12,data:u},{type:12,data:s},{type:12,data:n}],d=p=>{let h=W("qkv_with_bias",t.dataType,o),f=C("qkv",t.dataType,o),m=C("bias",r.dataType,o),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(w).declareVariables(f,m,h)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[t,r],outputs:[-1]})[0]},la=(e,t,r,i,a,n,s,o)=>{let u=n;if(s&&D.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=xl(e,n,s,t,i,r*a,o),u=u.reshape([t,i,r,a]),r===1||i===1?u:e.compute(ct(u,zn.perm),{inputs:[u],outputs:[-1]})[0]}else return n.dims.length===3&&(u=n.reshape([t,i,r,a])),r===1||i===1?u:e.compute(ct(u,zn.perm),{inputs:[u],outputs:[-1]})[0]},Sl=(e,t)=>{let r=$l(e.inputs,t),i=e.inputs[0],a=yt(e.inputs,1),n=yt(e.inputs,2),s=yt(e.inputs,3),o=yt(e.inputs,4),u=yt(e.inputs,5),l=yt(e.inputs,6),d=yt(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if((a==null?void 0:a.dims.length)===5)throw new Error("Packed KV is not implemented");let p=a&&n&&a.dims.length===4&&n.dims.length===4,h=la(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(p)return aa(e,h,a,n,o,void 0,l,d,u,r);if(!a||!n)throw new Error("key and value must be provided");let f=la(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),m=la(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);aa(e,h,f,m,o,void 0,l,d,u,r)}}),El,kl,Il,zl,Cn,Cl,Al,Ol=z(()=>{oe(),te(),b(),J(),El=e=>{if(!e||e.length<1)throw new Error("too few inputs")},kl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),g({numOutputs:i,axis:t.axis,splitSizes:r})},Il=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${M("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,zl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Cn=(e,t)=>{let r=e[0].dims,i=D.size(r),a=e[0].dataType,n=D.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),o=C("input",a,r.length),u=new Array(t.numOutputs),l=[],d=[],p=0,h=[{type:12,data:i}];for(let m=0;m<t.numOutputs;m++){p+=t.splitSizes[m],u[m]=p;let w=r.slice();w[n]=t.splitSizes[m],d.push(w),s[m]=W(`output${m}`,a,w.length),l.push({dims:d[m],dataType:e[0].dataType})}h.push({type:12,data:u},...k(r,...d));let f=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...s)}
  ${Il(u.length)}
  ${zl(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${M("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},Cl=(e,t)=>{El(e.inputs);let r=e.inputs.length===1?t:kl(e.inputs,t);e.compute(Cn(e.inputs,r),{inputs:[0]})},Al=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return g({axis:t,numOutputs:i,splitSizes:r})}}),Rl,Ra,Bl,Ml=z(()=>{oe(),te(),b(),J(),Rl=(e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(i.dims,[])&&!D.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!D.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=a.dims[0],p=D.sizeFromDimension(r.dims,1)/l,h=o===0?a.dims[1]*2:p/s;if(o>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(u!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(l!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(h/2!==a.dims[1]&&o/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(l>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ra=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],o=D.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=o/u,d=e[2].dims[1],p=a===0?d*2:l/i,h=new Array(s,u,l/p,p-d),f=D.computeStrides(h),m=[{type:1,data:n},{type:12,data:h},{type:12,data:f},...e[0].dims.length===3?new Array({type:12,data:[o,l,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,p,u*p,1]}):[],...k(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=$=>{let _=C("input",e[0].dataType,e[0].dims.length),y=C("position_ids",e[1].dataType,e[1].dims.length),S=C("cos_cache",e[2].dataType,e[2].dims.length),x=C("sin_cache",e[3].dataType,e[3].dims.length),I=W("output",e[0].dataType,e[0].dims.length);return $.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${$.declareVariables(_,y,S,x,I)}

        ${$.mainStart(T)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${y.broadcastedIndicesToOffset("bsnh.xy",W("",y.type.tensor,2))};
            let position_id =
                u32(${y.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${_.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${_.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${_.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} +
                ${_.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",_.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:g({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(h)/T)},programUniforms:m})}},Bl=(e,t)=>{Rl(e.inputs,t),e.compute(Ra(e.inputs,t))}}),Dl,Pl,An,Ul,Nl,Cc=z(()=>{b(),oe(),sn(),Tl(),Ol(),rt(),Ml(),J(),Dl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,u=r.dims[0],l=r.dims[1],d=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],p=l,h=0,f=!i||i.dims.length===0,m=Math.floor(f?d/(t.numHeads+2*t.kvNumHeads):d/t.numHeads);f&&(d=m*t.numHeads);let w=n&&n.dims.length!==0,$=s&&s.dims.length!==0;if(w&&n.dims.length===4&&n.dims[0]===u&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&$){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=n.dims[2]}else if(w||$)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');p=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}let y=0,S=!1,x=t.kvNumHeads?m*t.kvNumHeads:d;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(p!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=a.dims[2]}else{if(p!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');x=a.dims[1]*a.dims[3],S=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:x,headSize:m,vHeadSize:Math.floor(x/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:y,scale:t.scale,broadcastResPosBias:!1,passPastInKv:S,qkvFormat:_}},Pl=g({perm:[0,2,1,3]}),An=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(ct(i,Pl.perm),{inputs:[i],outputs:[-1]})[0]),i},Ul=(e,t,r,i)=>{let a=7,n=["type","type"],s=[e*t],o=e*t,u=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],l=d=>{let p=C("seq_lens",r.dataType,r.dims),h=C("total_seq_lens",i.dataType,i.dims),f=W("pos_ids",a,s),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${d.registerUniforms(m).declareVariables(p,h,f)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${f.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:l}},Nl=(e,t)=>{var x;let r=Dl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((x=e.inputs[1])==null?void 0:x.dims.length)===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=g({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[h,f,m]=!a&&!n?e.compute(Cn([i],p),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,n],w,$;if(t.doRotary){let I=e.compute(Ul(r.batchSize,r.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],B=e.inputs[7],R=e.inputs[8],P=g({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),V=[h,I,B,R],j=[-1];w=e.compute(Ra(V,P),{inputs:V,outputs:j})[0],V.splice(0,1,f);let se=g({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});$=e.compute(Ra(V,se),{inputs:V,outputs:j})[0]}let _=la(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:h,void 0,0),y=An(e,t.doRotary?$:f,r),S=An(e,m,r);aa(e,_,y,S,void 0,void 0,s,o,void 0,r,u,l)}}),On,Ll,Vl,ql,Ac=z(()=>{oe(),te(),rt(),J(),On=(e,t,r,i,a,n,s,o)=>{let u=O(n),l=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,p=a*s,h=64;p===1&&(h=256);let f=[a,s,n/u],m=[a,s,2],w=["rank","type","type"],$=[];$.push(...k(f,m));let _=y=>{let S=C("x",t.dataType,3,u),x=C("scale",r.dataType,r.dims),I=C("bias",i.dataType,i.dims),B=W("output",1,3,2),R=[S,x,I,B];return`
  var<workgroup> workgroup_shared : array<${d}, ${h}>;
  const workgroup_size = ${h}u;
  ${y.declareVariables(...R)}
  ${y.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${U("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${U("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${h}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:p},programUniforms:$}),getShaderSource:_},{inputs:[t,r,i],outputs:[-1]})[0]},Ll=(e,t,r)=>{let i=t[0].dims,a=i,n=2,s=i[0],o=i[1],u=D.sizeFromDimension(i,n),l=O(u),d=D.size(a)/l,p=On(e,t[0],t[1],t[2],s,u,o,r.epsilon),h=[s,o,u/l],f=[s,o],m=["type","none"],w=$=>{let _=C("x",t[0].dataType,h.length,l),y=C("scale_shift",1,f.length,2),S=W("output",t[0].dataType,h.length,l),x=[_,y,S];return`
  ${$.registerUniform("output_size","u32").declareVariables(...x)}
  ${$.mainStart()}
  ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${y.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${_.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...k(h,f,h)]}),getShaderSource:w},{inputs:[t[0],p]})},Vl=(e,t,r)=>{let i=t[0].dims,a=i,n=i[0],s=i[i.length-1],o=D.sizeFromDimension(i,1)/s,u=O(s),l=D.size(a)/u,d=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],p=["type","type"],h=!1,f=[0,i.length-1];for(let _=0;_<i.length-2;_++)h=h||i[_+1]!==1,f.push(_+1);h=h&&i[i.length-1]!==1;let m=h?e.compute(ct(e.inputs[0],f),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(_,y)=>i[f[y]])),w=On(e,m,t[1],t[2],n,o,s,r.epsilon),$=_=>{let y=A(t[0].dataType),S=u===1?"vec2f":`mat${u}x2f`,x=R=>{let P=R===0?"x":"y",V=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${y}(${V}(scale.${P}))`;case 2:return`vec2<${y}>(${V}(scale[0].${P}, scale[1].${P}))`;case 4:return`vec4<${y}>(${V}(scale[0].${P}, scale[1].${P}, scale[2].${P}, scale[3].${P}))`;default:throw new Error(`Not supported compoents ${u}`)}},I=C("input",t[0].dataType,t[0].dims,u),B=W("output",t[0].dataType,a,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${B.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${_.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${x(0)}, ${x(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:$},{inputs:[t[0],w]})},ql=(e,t)=>{t.format==="NHWC"?Vl(e,e.inputs,t):Ll(e,e.inputs,t)}}),Fl,Wl,Gl,Oc=z(()=>{oe(),te(),J(),Fl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Wl=(e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],o=a,u=D.normalizeAxis(t.axis,a.length),l=D.sizeToDimension(a,u),d=D.sizeFromDimension(a,u),p=D.size(n.dims),h=s?D.size(s.dims):0;if(p!==d||s&&h!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${h}`);let f=[];for(let I=0;I<a.length;++I)I<u?f.push(a[I]):f.push(1);let m=O(d),w=["type","type"],$=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/m)},{type:1,data:t.epsilon}];s&&w.push("type");let _=r>1,y=r>2,S=I=>{let B=A(e[0].dataType),R=[C("x",e[0].dataType,e[0].dims,m),C("scale",n.dataType,n.dims,m)];s&&R.push(C("bias",s.dataType,s.dims,m)),R.push(W("output",e[0].dataType,o,m)),_&&R.push(W("mean_data_output",1,f)),y&&R.push(W("inv_std_output",1,f));let P=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(P).declareVariables(...R)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${N("f32",m)};
    var mean_square_vector = ${N("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${q(B,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${U("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${U("mean_square_vector",m)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${q(B,m,"x[j + offset]")};
      let f32scale = ${q(B,m,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${q(B,m,"bias[j]")}`:""}
      );
    }

    ${_?"mean_data_output[global_idx] = mean":""};
    ${y?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},x=[{dims:o,dataType:e[0].dataType}];return _&&x.push({dims:f,dataType:1}),y&&x.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${i}`,inputDependencies:w},getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:$}),getShaderSource:S}},Gl=(e,t)=>{Fl(e.inputs),e.compute(Wl(e.inputs,t,e.outputCount))}}),jl,Hl,Rc=z(()=>{te(),fn(),wn(),jl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Hl=e=>{jl(e.inputs);let t=jt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(hn(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=D.size(e.inputs[0].dims.slice(0,-2)),s=D.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let o=e.inputs[0].reshape([1,n,i]),u=e.inputs[1].reshape([1,i,r]),l=[1,n,r],d=[o,u];e.compute(za(d,{activation:""},t,l),{inputs:d})}else e.compute(za(e.inputs,{activation:""},t))}}}),Kl,Zl,Ql,Xl,Yl,Bc=z(()=>{oe(),te(),b(),J(),Kl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!D.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(D.size(o)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,l=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(D.size(u)!==l)throw new Error("zeroPoints input size error.")}},Zl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,o=r.slice(0,i-2),u=D.size(o),l=e[1].dims[2]/4,d=e[0].dataType,p=O(t.k),h=O(l),f=O(s),m=o.concat([a,s]),w=a>1&&s/f%2===0?2:1,$=D.size(m)/f/w,_=64,y=[],S=[u,a,n/p],x=D.convertShape(e[1].dims).slice();x.splice(-1,1,l/h),y.push(...k(S)),y.push(...k(x)),y.push(...k(e[2].dims)),e.length===4&&y.push(...k(D.convertShape(e[3].dims)));let I=[u,a,s/f];y.push(...k(I));let B=R=>{let P=S.length,V=C("a",e[0].dataType,P,p),j=C("b",12,x.length,h),se=C("scales",e[2].dataType,e[2].dims.length),Q=[V,j,se],ae=e.length===4?C("zero_points",12,e[3].dims.length):void 0;ae&&Q.push(ae);let ke=I.length,ze=W("output",e[0].dataType,ke,f),X=A(e[0].dataType),me=(()=>{switch(p){case 1:return`array<${X}, 8>`;case 2:return`mat4x2<${X}>`;case 4:return`mat2x4<${X}>`;default:throw new Error(`${p}-component is not supported.`)}})(),Ue=()=>{let F=`
          // reuse a data
            var input_offset = ${V.indicesToOffset(`${V.type.indices}(batch, row, word_offset)`)};
            var a_data: ${me};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${V.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let G=0;G<f*w;G++)F+=`
            b_value = ${h===1?`b${G}_data`:`b${G}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${me}(${Array.from({length:4},(de,_e)=>`${X}(b_value_lower[${_e}]), ${X}(b_value_upper[${_e}])`).join(", ")});
            b_dequantized_values = ${p===1?`${me}(${Array.from({length:8},(de,_e)=>`(b_quantized_values[${_e}] - ${ae?`zero_point${G}`:"zero_point"}) * scale${G}`).join(", ")});`:`(b_quantized_values - ${me}(${Array(8).fill(`${ae?`zero_point${G}`:"zero_point"}`).join(",")})) * scale${G};`};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(G/f)}]${f>1?`[${G%f}]`:""} += ${Array.from({length:8/p},(de,_e)=>`${p===1?`a_data[${_e}] * b_dequantized_values[${_e}]`:`dot(a_data[${_e}], b_dequantized_values[${_e}])`}`).join(" + ")};
          `;return F},H=()=>{let F=`
            var col_index = col * ${f};
            ${ae?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            `;for(let G=0;G<f*w;G++)F+=`
            let scale${G} = ${se.getByOffset("col_index * nBlocksPerCol + block")};
            ${ae?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ae.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${G} = ${X}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return F},Ne=()=>{let F=`col_index = col * ${f};`;for(let G=0;G<f*w;G++)F+=`
            let b${G}_data = ${j.getByIndices(`${j.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return F+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${me};
            var b_dequantized_values: ${me};`,F};return`
        var<workgroup> workgroup_shared: array<${ze.type.value}, ${w*_}>;
        ${R.declareVariables(...Q,ze)}
        ${R.mainStart([_,1,1])}
          let output_indices = ${ze.offsetToIndices(`(global_idx / ${_}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${_}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${H()}
            for (var word: u32 = 0; word < ${l}; word += ${h}) {
              ${Ne()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${Ue()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${ze.type.value} = ${ze.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${_}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${ze.setByIndices(`${ze.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${h};${f};${w};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:d}],dispatchGroup:{x:$},programUniforms:y}),getShaderSource:B}},Ql=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,o=r.slice(0,i-2),u=D.size(o),l=e[1].dims[2]/4,d=e[0].dataType,p=O(t.k),h=O(l),f=o.concat([a,s]),m=128,w=s%8===0?8:s%4===0?4:1,$=m/w,_=$*h*8,y=_/p,S=_/t.blockSize,x=D.size(f)/w,I=[],B=[u,a,n/p],R=D.convertShape(e[1].dims).slice();R.splice(-1,1,l/h),I.push(...k(B)),I.push(...k(R)),I.push(...k(e[2].dims)),e.length===4&&I.push(...k(D.convertShape(e[3].dims)));let P=[u,a,s];I.push(...k(P));let V=j=>{let se=B.length,Q=C("a",e[0].dataType,se,p),ae=C("b",12,R.length,h),ke=C("scales",e[2].dataType,e[2].dims.length),ze=[Q,ae,ke],X=e.length===4?C("zero_points",12,e[3].dims.length):void 0;X&&ze.push(X);let me=P.length,Ue=W("output",e[0].dataType,me),H=A(e[0].dataType),Ne=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${H}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${H}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${H}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${H}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${Q.type.value}, ${y}>;
        var<workgroup> inter_results: array<array<${Ue.type.value}, ${$}>, ${w}>;
        ${j.declareVariables(...ze,Ue)}
        ${j.mainStart([$,w,1])}
          let output_indices = ${Ue.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${y};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${y}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${Q.getByIndices(`${Q.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${Q.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${X?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${H}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${H}(8);`}
            let scale = ${ke.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ae.getByIndices(`${ae.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${Ne()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${H}>(${Array.from({length:4},(F,G)=>`${H}(b_value_lower[${G}]), ${H}(b_value_upper[${G}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${H}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(F,G)=>`${`dot(a_data${G}, b_dequantized_values[${G}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${Ue.type.value} = ${Ue.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Ue.setByIndices(`${Ue.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${h};${$};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:d}],dispatchGroup:{x},programUniforms:I}),getShaderSource:V}},Xl=(e,t)=>{Kl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Ql(e.inputs,t)):e.compute(Zl(e.inputs,t))},Yl=e=>g(e)}),Jl,ed,td,rd,id,ad,nd,sd,od,Mc=z(()=>{oe(),te(),J(),Jl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ed=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${M("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${M("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${M("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},td=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${M("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${M("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${M("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${M("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},rd=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${M("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${M("uniforms.x_shape",a,t)})) {
                  k = i32(${M("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${M("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},id=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${M("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${M("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${M("uniforms.x_shape",a,t)})) {
                  k -= i32(${M("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${M("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ad=(e,t,r)=>{switch(r.mode){case 0:return ed(e,t,r.pads.length);case 1:return td(e,t,r.pads.length);case 2:return rd(e,t,r.pads.length);case 3:return id(e,t,r.pads.length);default:throw new Error("Invalid mode")}},nd=(e,t)=>{let r=D.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=D.size(r),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...k(e[0].dims,r));let o=["rank"],u=l=>{let d=W("output",e[0].dataType,r.length),p=C("x",e[0].dataType,i.length),h=p.type.value,f=ad(d,i.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:s?h:"f32"}),`
            ${l.registerUniforms(m).declareVariables(p,d)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:n}),getShaderSource:u}},sd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let u=0;u<o.length;u++)n[Number(o[u])]=Number(r[u]),n[Number(o[u])+a]=Number(r[u+o.length])}else r.forEach((o,u)=>n[Number(u)]=Number(o));let s=[];return n.forEach(o=>s.push(o)),{mode:t.mode,value:i,pads:s}}else return t},od=(e,t)=>{Jl(e.inputs);let r=sd(e.inputs,t);e.compute(nd(e.inputs,r),{inputs:[0]})}}),da,Rn,Bn,Mn,Dn,ud,ld,Pn,Un,dd,pd,Nn,cd,hd,Ln,fd,md,gd,yd,Dc=z(()=>{Ye(),oe(),te(),J(),da=e=>{if(Y.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Rn=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),u=n?t.dilations.slice():[],l=t.pads.slice();nr.adjustPoolAttributes(r,a,s,o,u,l);let d=nr.computePoolOutputShape(r,a,o,u,s,l,t.autoPad),p=Object.assign({},t);n?Object.assign(p,{kernelShape:s,strides:o,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:o,pads:l,cacheKey:t.cacheKey});let h=d.slice();return h.push(h.splice(1,1)[0]),[p,i?h:d]},Bn=(e,t)=>{let r=t.format==="NHWC",i=D.size(e),a=D.size(t.kernelShape),n=[{type:12,data:i},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],p=!!(l+d);n.push({type:12,data:o},{type:12,data:u},{type:12,data:l},{type:12,data:d}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let f=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],$=t.pads[t.pads.length-2];h=!!(w+$),n.push({type:12,data:f},{type:12,data:m},{type:12,data:w},{type:12,data:$}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,p,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=D.computeStrides(t.kernelShape);n.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((l,d)=>l+d);return[n,s,!!u,!1,!1]}},Mn=(e,t,r,i,a,n,s,o,u,l,d,p)=>{let h=a.format==="NHWC",f=t.type.value,m=W("output",t.type.tensor,i);if(a.kernelShape.length<=2){let w="",$="",_="",y=r-(h?2:1);if(d?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${y}] < 0 || xIndices[${y}]
                      >= uniforms.x_shape[${y}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let S=r-(h?3:2);p?$=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:$=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,_=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${o});
              var pad = 0;
              ${$}
              ${w}
              ${_}
              ${s}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=a.kernelShape.length,$=a.pads.length,_="";return l?_=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:_=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${f}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${M("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${M("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${M("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${M("uniforms.pads","j - 2u",$)};
                  ${_}
              }
              ${s}

              output[global_idx] = value;
            }`}},Dn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ud=e=>`${Dn(e)};${e.countIncludePad}`,ld=e=>`${Dn(e)};${e.storageOrder};${e.dilations}`,Pn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Un=(e,t,r,i)=>{let[a,n]=Rn(t,i,r),s=C("x",t.dataType,t.dims.length),o=s.type.value,u="value += x_val;",l="";a.countIncludePad?l+=`value /= ${o}(uniforms.kernelSize);`:l+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[d,p,h,f,m]=Bn(n,a);d.push(...k(t.dims,n));let w=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(n)/64)},programUniforms:d}),getShaderSource:$=>Mn($,s,t.dims.length,n.length,a,u,l,0,p,h,f,m)}},dd=e=>{let t=e.count_include_pad!==0,r=Pn(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:ud(i)}},pd=(e,t)=>{da(e.inputs),e.compute(Un("AveragePool",e.inputs[0],!1,t))},Nn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},cd=e=>{let t=e.format;return{format:t,...Nn,cacheKey:t}},hd=(e,t)=>{da(e.inputs),e.compute(Un("GlobalAveragePool",e.inputs[0],!0,t))},Ln=(e,t,r,i)=>{let[a,n]=Rn(t,i,r),s=`
      value = max(x_val, value);
    `,o="",u=C("x",t.dataType,t.dims.length),l=["rank"],[d,p,h,f,m]=Bn(n,a);return d.push(...k(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(n)/64)},programUniforms:d}),getShaderSource:w=>Mn(w,u,t.dims.length,n.length,a,s,o,t.dataType===10?-65504:-1e5,p,h,f,m)}},fd=(e,t)=>{da(e.inputs),e.compute(Ln("MaxPool",e.inputs[0],!1,t))},md=e=>{let t=e.storage_order,r=e.dilations,i=Pn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:ld(a)}},gd=e=>{let t=e.format;return{format:t,...Nn,cacheKey:t}},yd=(e,t)=>{da(e.inputs),e.compute(Ln("GlobalMaxPool",e.inputs[0],!0,t))}}),wd,_d,bd,$d,Pc=z(()=>{oe(),te(),b(),J(),wd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},_d=(e,t)=>{let r=D.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,n=e[0].dims,s=e[1].dataType,o=D.size(n),u=i===3||i===2,l=u?[Math.ceil(D.size(e[0].dims)/4)]:e[0].dims,d=e[1].dims,p=e.length>2?e[2]:void 0,h=p?u?[Math.ceil(D.size(p.dims)/4)]:p.dims:void 0,f=d.length===0||d.length===1&&d[0]===1,m=f===!1&&d.length===1,w=O(o),$=f&&(!u||w===4),_=$?w:1,y=$&&!u?w:1,S=C("input",u?12:i,l.length,y),x=C("scale",s,d.length),I=p?C("zero_point",u?12:i,h.length):void 0,B=W("output",s,n.length,_),R=[S,x];I&&R.push(I);let P=[l,d];p&&P.push(h);let V=[{type:12,data:o/_},{type:12,data:r},{type:12,data:t.blockSize},...k(...P,n)],j=se=>{let Q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${se.registerUniforms(Q).declareVariables(...R,B)}
      ${se.mainStart()}
          ${se.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${B.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${_===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${x.getByOffset("0")}`:m?`
            let scale_index = ${B.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${x.getByOffset("scale_index")};`:`
            var scale_indices: ${x.type.indices} = output_indices;
            let index = ${x.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${x.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${x.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?f?u?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:m?u?`
                let zero_point_index = ${B.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${B.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${x.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${u?a?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${B.setByOffset("global_idx",`${B.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:j,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(o/_/64),y:1,z:1},programUniforms:V})}},bd=(e,t)=>{wd(e.inputs,t),e.compute(_d(e.inputs,t))},$d=e=>g({axis:e.axis,blockSize:e.blockSize})}),vd,xd,Sd,Uc=z(()=>{Ye(),oe(),J(),vd=(e,t,r)=>{let i=e===t,a=e<t&&r<0,n=e>t&&r>0;if(i||a||n)throw new Error("Range these inputs' contents are invalid.")},xd=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),n=[a],s=a,o=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...k(n)],u=l=>{let d=W("output",i,n.length),p=d.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(h).declareVariables(d)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},Sd=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),Y.webgpu.validateInputContent&&vd(t,r,i),e.compute(xd(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Td,Ed,kd,Id,Nc=z(()=>{oe(),te(),b(),J(),Td=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Ed=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,n=1,s=Math.ceil(D.sizeToDimension(i,i.length-1)/n),o=i[i.length-1],u=D.sizeFromDimension(r,o),l=[{type:12,data:s},{type:12,data:o},{type:12,data:u},...k(e[1].dims,e[2].dims,a)],d=p=>{let h=C("indices",e[1].dataType,e[1].dims.length),f=C("updates",e[2].dataType,e[2].dims.length,n),m=t.reduction!=="none"&&t.reduction!==""?Pe("output",e[0].dataType,a.length):W("output",e[0].dataType,a.length,n);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,f,m)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Td(t.reduction,"output[data_offset + i]","value",m.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:d}},kd=e=>g({reduction:e.reduction}),Id=(e,t)=>{e.compute(Ed(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),zd,Cd,Ad,Vn,Od,Rd,Bd,Md,Dd,Pd,Ud,Nd,qn,Ld,Vd,qd,Fd,Wd,Gd,jd,Lc=z(()=>{oe(),te(),b(),J(),zd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Cd=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,n)=>i[a]=e[n]),i},Ad=(e,t,r,i,a,n)=>{let[s,o,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(d=>n.push(d));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(d=>i.push(d)),i.length!==0&&i.length!==l&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");zd(i,t),t.axes.length>0&&Cd(i,t.axes,l).forEach((d,p)=>i[p]=d)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(d=>a.push(Number(d))),a.length!==0&&a.length!==l&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},Vn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Od=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Vn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Vn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Rd=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Bd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((n,s)=>{i[n]=a[s],i[s+r]=a[t.length+s]}),i):a},Md=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(n=>a.push(n)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((n,s)=>a[n]=r[s])}else r.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},Dd=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=i),r.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},Pd=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${M("uniforms.scales","i",i)};
        var roi_low = ${M("uniforms.roi","i",a)};
        var roi_hi = ${M("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${M("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${M("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ud=(e,t,r,i,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${M("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${M("uniforms.roi","i",n)};
          var roi_hi = ${M("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${M("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${M("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Nd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${M("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,qn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Ld=(e,t,r,i,a)=>{let[n,s,o,u]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${qn(e,u,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${s}];
      var col:${l} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Vd=(e,t,r,i,a,n,s,o,u,l)=>{let d=r.length===2,[p,h]=d?[0,1]:[2,3],f=e.type.value,m=w=>{let $=w===p?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet("output_indices",w)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[w]},
        ${i[w]}, ${r[w]}, ${n[w]}, ${n[w]} + ${r.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[w]} - 1))) {
          return ${u};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${f} = originalIdx + ${f}(i);
          if (${$} < 0 || ${$} >= ${r[w]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${$} = max(0, min(${$}, ${r[w]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",w,`u32(${$})`)};
          data[i + 1] = ${w===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${m(p)};
    ${m(h)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},qd=(e,t,r,i,a)=>{let[n,s,o,u,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${qn(e,l,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${s}];
      var height:${d} = originalIndices[${o}];
      var width:${d} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Fd=(e,t,r,i,a,n)=>{let s=e.dims,o=Bd(n,t.axes,s.length),u=Md(s,i,a,t.axes),l=i.slice();i.length===0&&(l=s.map((y,S)=>y===0?1:u[S]/y),t.keepAspectRatioPolicy!=="stretch"&&(u=Dd(s,l,t)));let d=W("output",e.dataType,u.length),p=C("input",e.dataType,s.length),h=D.size(u),f=s.length===u.length&&s.every((y,S)=>y===u[S]),m=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,$=p.type.value,_=y=>`
      ${f?"":`
      ${Od(t.coordinateTransformMode,$)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Nd(p,s)};
              ${Rd(t.nearestMode,r,$)};
              ${Ud(p,d,s,u,l.length,o.length,m)};
              `;case"linear":return`
              ${Pd(d,s,u,l.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Ld(p,d,s,m,w)}`;if(s.length===3||s.length===5)return`${qd(p,d,s,m,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Vd(p,d,s,u,l,o,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${y.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",o.length).declareVariables(p,d)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?t.mode==="cubic"?l:l.length:""}|${a.length>0?a:""}|${o.length>0?o:""}|${f}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:l},{type:1,data:o},...k(s,u)]})}},Wd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Gd=(e,t)=>{let r=[],i=[],a=[],n=Wd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Ad(e.inputs,t,n,r,i,a),e.compute(Fd(e.inputs[0],t,n,r,i,a),{inputs:[0]})},jd=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return g({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:o,mode:u,nearestMode:l})}}),Hd,Kd,Zd,Vc=z(()=>{oe(),te(),J(),Hd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Kd=(e,t,r,i)=>{let a=t.simplified,n=e[0].dims,s=D.size(n),o=n,u=s,l=n.slice(-1)[0],d=i?n.slice(0,-1).concat(1):[],p=!a&&e.length>3,h=e.length>4,f=i&&r>1,m=i&&r>2,w=r>3,$=64,_=O(l),y=[{type:12,data:u},{type:12,data:_},{type:12,data:l},{type:1,data:t.epsilon}],S=I=>{let B=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[C("x",e[0].dataType,e[0].dims,_),C("skip",e[1].dataType,e[1].dims,_),C("gamma",e[2].dataType,e[2].dims,_)];p&&R.push(C("beta",e[3].dataType,e[3].dims,_)),h&&R.push(C("bias",e[4].dataType,e[4].dims,_)),R.push(W("output",e[0].dataType,o,_)),f&&R.push(W("mean_output",1,d)),m&&R.push(W("inv_std_output",1,d)),w&&R.push(W("input_skip_bias_sum",e[0].dataType,o,_));let P=A(e[0].dataType),V=A(1,_);return`

      ${I.registerUniforms(B).declareVariables(...R)}
      var<workgroup> sum_shared : array<${V}, ${$}>;
      var<workgroup> sum_squared_shared : array<${V}, ${$}>;

      ${I.mainStart([$,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${$};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${$};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${$-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":P+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${q(P,_,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${$};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${U("sum",_)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${U("square_sum",_)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${P}(mean)`}) *
            ${P}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},x=[{dims:o,dataType:e[0].dataType}];return r>1&&x.push({dims:d,dataType:1}),r>2&&x.push({dims:d,dataType:1}),r>3&&x.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${_};${f};${m};${w}`,inputDependencies:e.map((I,B)=>"type")},getShaderSource:S,getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:y})}},Zd=(e,t)=>{Hd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Kd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Qd,pa,Xd,Fn,Yd,Jd,ep,tp,qc=z(()=>{oe(),te(),b(),J(),Qd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},pa=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Xd=(e,t)=>{if(e.length>1){let r=pa(e,1),i=pa(e,2),a=pa(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),g({starts:r,ends:i,axes:a})}else return t},Fn=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},Yd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${M("uniforms.input_shape","i",r.length)};
            let steps_i = ${M("uniforms.steps","i",r.length)};
            let signs_i = ${M("uniforms.signs","i",r.length)};
            let starts_i = ${M("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Jd=(e,t)=>{let r=e[0].dims,i=D.size(r),a=t.axes.length>0?D.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=pa(e,4);n.forEach(_=>_!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((_,y)=>Fn(_,y,r,a,n)),o=t.ends.map((_,y)=>Fn(_,y,r,a,n));if(a.length!==s.length||a.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let _=0;_<r.length;++_)a.includes(_)||(s.splice(_,0,0),o.splice(_,0,r[_]),n.splice(_,0,1));let u=n.map(_=>Math.sign(_));n.forEach((_,y,S)=>{if(_<0){let x=(o[y]-s[y])/_,I=s[y],B=I+x*n[y];s[y]=B,o[y]=I,S[y]=-_}});let l=r.slice(0);a.forEach((_,y)=>{l[_]=Math.ceil((o[_]-s[_])/n[_])});let d={dims:l,dataType:e[0].dataType},p=W("output",e[0].dataType,l.length),h=C("input",e[0].dataType,e[0].dims.length),f=D.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:n.length}],w=[{type:12,data:f},{type:12,data:s},{type:6,data:u},{type:12,data:n},...k(e[0].dims,l)],$=_=>`
      ${_.registerUniforms(m).declareVariables(h,p)}
        ${Yd(h,p,r)}
        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:w})}},ep=(e,t)=>{Qd(e.inputs,t);let r=Xd(e.inputs,t);e.compute(Jd(e.inputs,r),{inputs:[0]})},tp=e=>{let t=e.starts,r=e.ends,i=e.axes;return g({starts:t,ends:r,axes:i})}}),rp,ip,ap,np,Fc=z(()=>{oe(),te(),b(),rt(),J(),rp=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},ip=(e,t)=>{let r=e.inputs[0],i=r.dims,a=D.size(i),n=i.length,s=D.normalizeAxis(t.axis,n),o=s<i.length-1,u,l=[];o?(l=Array.from({length:n},(R,P)=>P),l[s]=n-1,l[n-1]=s,u=e.compute(ct(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let d=u.dims,p=d[n-1],h=a/p,f=O(p),m=p/f,w=64;h===1&&(w=256);let $=(R,P)=>P===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:P===2?`max(${R}.x, ${R}.y)`:P===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,_=C("x",u.dataType,u.dims,f),y=W("result",u.dataType,u.dims,f),S=_.type.value,x=A(u.dataType)==="f32"?`var threadMax = ${S}(-3.4028234663852886e+38f);`:`var threadMax = ${S}(-65504.0h);`,I=R=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables(_,y)}
      ${R.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${x}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${S}(${$("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${S}(${U("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${S}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,B=e.compute({name:"Softmax",shaderCache:{hint:`${f};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:m}]}),getShaderSource:I},{inputs:[u],outputs:[o?-1:0]})[0];o&&e.compute(ct(B,l),{inputs:[B]})},ap=(e,t)=>{rp(e.inputs),ip(e,t)},np=e=>g({axis:e.axis})}),Wn,sp,op,up,lp,Wc=z(()=>{oe(),te(),J(),Wn=e=>Array.from(e.getBigInt64Array(),Number),sp=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Wn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},op=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},up=(e,t)=>{let r=e[0].dims,i=t??Wn(e[1]),a=op(r,i),n=D.size(a),s=e[0].dataType,o=C("input",s,r.length),u=W("output",s,a.length),l=d=>`
      const inputShape = ${o.indices(...r)};
      ${d.registerUniform("output_size","u32").declareVariables(o,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...k(e[0].dims,a)]}),getShaderSource:l}},lp=e=>{sp(e.inputs),e.compute(up(e.inputs),{inputs:[0]})}}),dp,pp,cp,Gc=z(()=>{oe(),te(),J(),dp=(e,t,r,i,a)=>{let n=W("output_data",a,r.length,4),s=C("a_data",t[1].dataType,t[1].dims.length,4),o=C("b_data",t[2].dataType,t[2].dims.length,4),u=C("c_data",t[0].dataType,t[0].dims.length,4),l,d=(p,h,f)=>`select(${h}, ${p}, ${f})`;if(!i)l=n.setByOffset("global_idx",d(s.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let p=(h,f,m="")=>{let w=`a_data[index_a${f}][component_a${f}]`,$=`b_data[index_b${f}][component_b${f}]`,_=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${n.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${s.broadcastedIndicesToOffset(`output_indices${f}`,n)};
            let offset_b${f} = ${o.broadcastedIndicesToOffset(`output_indices${f}`,n)};
            let offset_c${f} = ${u.broadcastedIndicesToOffset(`output_indices${f}`,n)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${h}[${f}] = ${m}(${d(w,$,_)});
          `};a===9?l=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,o,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},pp=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(D.areEqual(t,r)&&D.areEqual(r,i)),s=t,o=D.size(t);if(n){let l=jt.calcShape(jt.calcShape(t,r,!1),i,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,o=D.size(s)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>dp(l,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...k(i,t,r,s)]})}},cp=e=>{e.compute(pp(e.inputs))}}),hp,jc=z(()=>{sc(),sn(),oc(),uc(),lc(),dc(),pc(),gc(),wc(),_c(),bc(),$c(),vc(),xc(),Sc(),Tc(),Ec(),kc(),Ic(),zc(),Cc(),Ac(),Oc(),Rc(),Bc(),Tl(),Mc(),Dc(),Pc(),Uc(),Nc(),rn(),Lc(),Ml(),Vc(),qc(),Fc(),Ol(),Wc(),rt(),dn(),Gc(),hp=new Map([["Abs",[js]],["Acos",[Hs]],["Acosh",[Ks]],["Add",[Do]],["ArgMax",[As,nn]],["ArgMin",[Cs,nn]],["Asin",[Zs]],["Asinh",[Qs]],["Atan",[Xs]],["Atanh",[Ys]],["Attention",[Ps]],["AveragePool",[pd,dd]],["BatchNormalization",[Vs]],["BiasAdd",[Ws]],["BiasSplitGelu",[Ro]],["Cast",[eo,Js]],["Ceil",[io]],["Clip",[ro]],["Concat",[Qo,Xo]],["Conv",[xn,$n]],["ConvTranspose",[Su,$u]],["Cos",[ao]],["Cosh",[no]],["CumSum",[Eu,ku]],["DepthToSpace",[Au,Ou]],["DequantizeLinear",[bd,$d]],["Div",[Po]],["Einsum",[Uu,Nu]],["Elu",[so,na]],["Equal",[Uo]],["Erf",[oo]],["Exp",[uo]],["Expand",[Fu]],["FastGelu",[Gu]],["Floor",[lo]],["FusedConv",[xn,$n]],["Gather",[Zu,Ku]],["GatherElements",[sl,nl]],["GatherBlockQuantized",[tl,rl]],["GatherND",[Xu,Yu]],["Gelu",[po]],["Gemm",[dl,ll]],["GlobalAveragePool",[hd,cd]],["GlobalMaxPool",[yd,gd]],["Greater",[qo]],["GreaterOrEqual",[Wo]],["GridSample",[_l,bl]],["GroupQueryAttention",[Nl]],["HardSigmoid",[_o,wo]],["InstanceNormalization",[ql]],["LayerNormalization",[Gl]],["LeakyRelu",[co,na]],["Less",[Fo]],["LessOrEqual",[Go]],["Log",[ko]],["MatMul",[Hl]],["MatMulNBits",[Xl,Yl]],["MaxPool",[fd,md]],["Mul",[No]],["MultiHeadAttention",[Sl,vl]],["Neg",[fo]],["Not",[ho]],["Pad",[od]],["Pow",[Lo]],["QuickGelu",[Co,na]],["Range",[Sd]],["Reciprocal",[mo]],["ReduceMin",[Ts]],["ReduceMean",[bs]],["ReduceMax",[Ss]],["ReduceSum",[ks]],["ReduceProd",[Es]],["ReduceL1",[$s]],["ReduceL2",[vs]],["ReduceLogSum",[zs]],["ReduceLogSumExp",[xs]],["ReduceSumSquare",[Is]],["Relu",[go]],["Resize",[Gd,jd]],["RotaryEmbedding",[Bl]],["ScatterND",[Id,kd]],["Sigmoid",[yo]],["Sin",[bo]],["Sinh",[$o]],["Slice",[ep,tp]],["SkipLayerNormalization",[Zd]],["Split",[Cl,Al]],["Sqrt",[vo]],["Softmax",[ap,np]],["Sub",[Vo]],["Tan",[xo]],["Tanh",[So]],["ThresholdedRelu",[Eo,na]],["Tile",[lp]],["Transpose",[ea,ta]],["Where",[cp]]])}),fp,Hc=z(()=>{Ye(),Tt(),J(),fp=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){et(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let l of t)o.push({binding:o.length,resource:{buffer:l.buffer}});for(let l of r)o.push({binding:o.length,resource:{buffer:l.buffer}});a&&o.push({binding:o.length,resource:a});let u=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Xe(e.programInfo.name)}dispose(){}build(e,t){et(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(l=>{r.features.has(l.feature)&&i.push(`enable ${l.extension};`)});let a=Ae(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,o=r.createShaderModule({code:s,label:e.name});xe("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Xe(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),mp={};be(mp,{WebGpuBackend:()=>_p});var gp,yp,wp,_p,Kc=z(()=>{Ye(),oe(),Tt(),sr(),en(),jc(),Hc(),gp=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let n=e[i].dims.length;r.push(`${a};${n}`);break}case"dims":{let n=e[i].dims.join(",");r.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},yp=(e,t,r)=>{var a,n;let i=e.name;return(a=e.shaderCache)!=null&&a.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${gp(t,((n=e.shaderCache)==null?void 0:n.inputDependencies)??new Array(t.length).fill("dims"))}`,i},wp=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},_p=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=n=>t.features.has(n)&&r.push(n)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new wp(t.info||await t.requestAdapterInfo()),this.gpuDataManager=$a(this),this.programManager=new fp(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ri(e.logLevel,!!e.debug),this.device.onuncapturederror=n=>{n.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;et(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var i;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let a=0;a<t.length/2;a++){let n=r[a],s=n.kernelId,o=this.kernels.get(s),u=o.kernelType,l=o.kernelName,d=n.programName,p=n.inputTensorViews,h=n.outputTensorViews,f=t[a*2],m=t[a*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=f);let w=Number(f-this.queryTimeBase),$=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if((i=this.env.webgpu.profiling)!=null&&i.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(_=>({dims:_.dims,dataType:vt(_.dataType)})),outputsMetadata:h.map(_=>({dims:_.dims,dataType:vt(_.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:d,startTime:w,endTime:$});else{let _="";p.forEach((S,x)=>{_+=`input[${x}]: [${S.dims}] | ${vt(S.dataType)}, `});let y="";h.forEach((S,x)=>{y+=`output[${x}]: [${S.dims}] | ${vt(S.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${d}" ${_}${y}start time: ${w} ns, execution time: ${$-w} ns`)}Wt("GPU",`${d}::${f}::${m}`)}e.unmap(),this.pendingQueries.delete(e)}),Xe()}run(e,t,r,i,a,n){et(e.name);let s=[];for(let y=0;y<t.length;++y){let S=t[y].data;if(S===0)continue;let x=this.gpuDataManager.get(S);if(!x)throw new Error(`no GPU data for input: ${S}`);s.push(x)}let{outputs:o,dispatchGroup:u,programUniforms:l}=e.getRunData(t),d=r.length===0?o.map((y,S)=>S):r;if(d.length!==o.length)throw new Error(`Output size ${d.length} must be equal to ${o.length}.`);let p=[],h=[];for(let y=0;y<o.length;++y){if(!Number.isInteger(d[y])||d[y]<-3||d[y]>=n)throw new Error(`Invalid output index: ${d[y]}`);if(d[y]===-3)continue;let S=d[y]===-1,x=d[y]===-2,I=S||x?a(o[y].dataType,o[y].dims):i(d[y],o[y].dataType,o[y].dims);if(p.push(I),I.data===0)continue;let B=this.gpuDataManager.get(I.data);if(!B)throw new Error(`no GPU data for output: ${I.data}`);if(S&&this.temporaryData.push(B),x){let R=this.kernelPersistentData.get(this.currentKernelId);R||(R=[],this.kernelPersistentData.set(this.currentKernelId,R)),R.push(B)}h.push(B)}if(s.length!==t.length||h.length!==p.length){if(h.length===0)return Xe(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let f;if(l){let y=0,S=[];l.forEach(R=>{let P=typeof R.data=="number"?[R.data]:R.data;if(P.length===0)return;let V=R.type===10?2:4,j,se;R.type===10?(se=P.length>4?16:P.length>2?8:P.length*V,j=P.length>4?16:V*P.length):(se=P.length<=2?P.length*V:16,j=16),y=Math.ceil(y/se)*se,S.push(y);let Q=R.type===10?8:4;y+=P.length>4?Math.ceil(P.length/Q)*j:P.length*V});let x=16;y=Math.ceil(y/x)*x;let I=new ArrayBuffer(y);l.forEach((R,P)=>{let V=S[P],j=typeof R.data=="number"?[R.data]:R.data;if(R.type===6)new Int32Array(I,V,j.length).set(j);else if(R.type===12)new Uint32Array(I,V,j.length).set(j);else if(R.type===10)new Uint16Array(I,V,j.length).set(j);else if(R.type===1)new Float32Array(I,V,j.length).set(j);else throw new Error(`Unsupported uniform type: ${vt(R.type)}`)});let B=this.gpuDataManager.create(y,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(B.buffer,0,I,0,y),this.gpuDataManager.release(B.id),f={offset:0,size:y,buffer:B.buffer}}let m=this.programManager.normalizeDispatchGroupSize(u),w=m[1]===1&&m[2]===1,$=yp(e,t,w),_=this.programManager.getArtifact($);if(_||(_=this.programManager.build(e,m),this.programManager.setArtifact($,_),xe("info",()=>`[artifact] key: ${$}, programName: ${e.name}`)),l&&_.uniformVariablesInfo){if(l.length!==_.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${l.length} in program "${_.programInfo.name}".`);for(let y=0;y<l.length;y++){let S=l[y],x=S.type,I=typeof S.data=="number"?1:S.data.length,[B,R]=_.uniformVariablesInfo[y];if(x!==B||I!==R)throw new Error(`Uniform variable ${y} mismatch: expect type ${B} with size ${R}, got type ${x} with size ${I} in program "${_.programInfo.name}".`)}}if(xe("info",()=>`[ProgramManager] run "${e.name}" (key=${$}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let y={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(y),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(y)}return this.programManager.run(_,s,h,m,f),Xe(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=hp.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),xe("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${l}`)),1}finally{u&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${a}] ${n}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Yi(this,e,t);return Ht(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){xe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){xe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){xe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),bp={};be(bp,{init:()=>vp});var Ba,$p,vp,Zc=z(()=>{oe(),Tt(),te(),Xi(),Ba=class Xp{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(D.size(t)!==D.size(this.dims))throw new Error("Invalid new shape");return new Xp(this.module,this.dataType,this.data,t)}},$p=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let o=[];for(let u=0;u<s;u++){let l=Number(e.getValue(i*a++,n)),d=Number(e.getValue(i*a++,"*")),p=Number(e.getValue(i*a++,n)),h=[];for(let f=0;f<p;f++)h.push(Number(e.getValue(i*a++,n)));o.push(new Ba(e,l,d,h))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let r=((s=t==null?void 0:t.inputs)==null?void 0:s.map(o=>typeof o=="number"?this.inputs[o]:o))??this.inputs,i=(t==null?void 0:t.outputs)??[],a=(o,u,l)=>new Ba(this.module,u,this.output(o,l),l),n=(o,u)=>{let l=xt(o,u);if(!l)throw new Error(`Unsupported data type: ${o}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new Ba(this.module,o,d,u)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*i);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+i*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},vp=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(Kc(),Ve(mp)).WebGpuBackend,s=new n;await s.initialize(r,i),a("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,u,l,d=!1)=>{if(d)xe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(l)}`),s.memcpy(Number(o),Number(u));else{xe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let p=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(l));s.upload(Number(u),p)}},async(o,u,l)=>{xe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${l}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(o,u,l)=>s.createKernel(o,Number(u),l,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),o=>s.releaseKernel(o),(o,u,l,d)=>{xe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${o}, contextDataOffset=${u}`);let p=new $p(t,s,Number(u));return s.computeKernel(Number(o),p,d)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new Qi(r);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,o,u,l,d)=>n.ensureTensor(s,o,u,l,d),(s,o)=>{n.uploadTensor(s,o)},async(s,o)=>n.downloadTensor(s,o),(s,o)=>n.registerMLContext(s,o),!!r.trace])}}}),xp,Gn,jn,dr,Sp,Hn,Ma,Kn,Zn,Qn,Xn,Yn,Jn,Tp=z(()=>{Ye(),Ya(),Ja(),oe(),bt(),Or(),Wi(),xp=(e,t)=>{le()._OrtInit(e,t)!==0&&ie("Can't initialize onnxruntime.")},Gn=async e=>{xp(e.wasm.numThreads,Br(e.logLevel))},jn=async(e,t)=>{var i,a;(a=(i=le()).asyncInit)==null||a.call(i);let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:s}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let n=(Zc(),Ve(bp)).init;t==="webgpu"&&await n("webgpu",le(),e,r),t==="webnn"&&await n("webnn",le(),e)}},dr=new Map,Sp=e=>{let t=le(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&ie("Can't get session input/output count.");let n=i===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+i,n))]}finally{t.stackRestore(r)}},Hn=(e,t)=>{let r=le(),i=r.stackSave(),a=0;try{let n=r.PTR_SIZE,s=r.stackAlloc(2*n);r._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&ie("Can't get session input/output metadata.");let o=Number(r.getValue(s,"*"));a=Number(r.getValue(s+n,"*"));let u=r.HEAP32[a/4];if(u===0)return[o,0];let l=r.HEAPU32[a/4+1],d=[];for(let p=0;p<l;p++){let h=Number(r.getValue(a+8+p*n,"*"));d.push(h!==0?r.UTF8ToString(h):Number(r.getValue(a+8+(p+l)*n,"*")))}return[o,u,d]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},Ma=e=>{let t=le(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Kn=async(e,t)=>{var p,h,f,m;let r,i,a=le();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Ma(e);let n=0,s=0,o=0,u=[],l=[],d=[];try{if([s,u]=await Fi(t),(t==null?void 0:t.externalData)&&a.mountExternalData){let P=[];for(let V of t.externalData){let j=typeof V=="string"?V:V.path;P.push(Pr(typeof V=="string"?V:V.data).then(se=>{a.mountExternalData(j,se)}))}await Promise.all(P)}for(let P of(t==null?void 0:t.executionProviders)??[])if((typeof P=="string"?P:P.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof P!="string"){let V=P,j=V==null?void 0:V.context,se=V==null?void 0:V.gpuDevice,Q=V==null?void 0:V.deviceType,ae=V==null?void 0:V.powerPreference;j?a.currentContext=j:se?a.currentContext=await a.webnnCreateMLContext(se):a.currentContext=await a.webnnCreateMLContext({deviceType:Q,powerPreference:ae})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(r,i,s),(p=a.webgpuOnCreateSession)==null||p.call(a,n),n===0&&ie("Can't create a session."),(h=a.jsepOnCreateSession)==null||h.call(a),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[w,$]=Sp(n),_=!!(t!=null&&t.enableGraphCapture),y=[],S=[],x=[],I=[],B=[];for(let P=0;P<w;P++){let[V,j,se]=Hn(n,P);V===0&&ie("Can't get an input name."),l.push(V);let Q=a.UTF8ToString(V);y.push(Q),x.push(j===0?{name:Q,isTensor:!1}:{name:Q,isTensor:!0,type:vt(j),shape:se})}for(let P=0;P<$;P++){let[V,j,se]=Hn(n,P+w);V===0&&ie("Can't get an output name."),d.push(V);let Q=a.UTF8ToString(V);S.push(Q),I.push(j===0?{name:Q,isTensor:!1}:{name:Q,isTensor:!0,type:vt(j),shape:se});{if(_&&(t==null?void 0:t.preferredOutputLocation)===void 0){B.push("gpu-buffer");continue}let ae=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((f=t==null?void 0:t.preferredOutputLocation)==null?void 0:f[Q])??"cpu",ke=a.webnnIsGraphOutput;if(ae==="cpu"&&ke&&ke(n,Q)){B.push("ml-tensor-cpu-output");continue}if(ae!=="cpu"&&ae!=="cpu-pinned"&&ae!=="gpu-buffer"&&ae!=="ml-tensor")throw new Error(`Not supported preferred output location: ${ae}.`);if(_&&ae!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${ae}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);B.push(ae)}}let R=null;return B.some(P=>P==="gpu-buffer"||P==="ml-tensor"||P==="ml-tensor-cpu-output")&&(o=a._OrtCreateBinding(n),o===0&&ie("Can't create IO binding."),R={handle:o,outputPreferredLocations:B,outputPreferredLocationsEncoded:B.map(P=>P==="ml-tensor-cpu-output"?"ml-tensor":P).map(P=>Jr(P))}),dr.set(n,[n,l,d,R,_,!1]),[n,y,S,x,I]}catch(w){throw l.forEach($=>a._OrtFree($)),d.forEach($=>a._OrtFree($)),o!==0&&a._OrtReleaseBinding(o)!==0&&ie("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&ie("Can't release session."),w}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&ie("Can't release session options."),u.forEach(w=>a._free(w)),(m=a.unmountExternalData)==null||m.call(a)}},Zn=e=>{var u,l,d;let t=le(),r=dr.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,o]=r;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&ie("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ie("Can't release IO binding.")),(u=t.jsepOnReleaseSession)==null||u.call(t,e),(l=t.webnnOnReleaseSession)==null||l.call(t,e),(d=t.webgpuOnReleaseSession)==null||d.call(t,e),a.forEach(p=>t._OrtFree(p)),n.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(i)!==0&&ie("Can't release session."),dr.delete(e)},Qn=async(e,t,r,i,a,n,s=!1)=>{if(!e){t.push(0);return}let o=le(),u=o.PTR_SIZE,l=e[0],d=e[1],p=e[3],h=p,f,m;if(l==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let _=e[2].gpuBuffer;m=xt($t(l),d);{let y=o.jsepRegisterBuffer;if(!y)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=y(i,n,_,m)}}else if(p==="ml-tensor"){let _=e[2].mlTensor;m=xt($t(l),d);let y=o.webnnRegisterMLTensor;if(!y)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=y(i,_,$t(l),d)}else{let _=e[2];if(Array.isArray(_)){m=u*_.length,f=o._malloc(m),r.push(f);for(let y=0;y<_.length;y++){if(typeof _[y]!="string")throw new TypeError(`tensor data at index ${y} is not a string`);o.setValue(f+y*u,We(_[y],r),"*")}}else{let y=o.webnnIsGraphInput,S=o.webnnIsGraphOutput;if(l!=="string"&&y&&S){let x=o.UTF8ToString(a);if(y(i,x)||S(i,x)){let I=$t(l);m=xt(I,d),h="ml-tensor";let B=o.webnnCreateTemporaryTensor,R=o.webnnUploadTensor;if(!B||!R)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let P=await B(i,I,d);R(P,new Uint8Array(_.buffer,_.byteOffset,_.byteLength)),f=P}else m=_.byteLength,f=o._malloc(m),r.push(f),o.HEAPU8.set(new Uint8Array(_.buffer,_.byteOffset,m),f)}else m=_.byteLength,f=o._malloc(m),r.push(f),o.HEAPU8.set(new Uint8Array(_.buffer,_.byteOffset,m),f)}}let w=o.stackSave(),$=o.stackAlloc(4*d.length);try{d.forEach((y,S)=>o.setValue($+S*u,y,u===4?"i32":"i64"));let _=o._OrtCreateTensor($t(l),f,m,$,d.length,Jr(h));_===0&&ie(`Can't create tensor for input/output. session=${i}, index=${n}.`),t.push(_)}finally{o.stackRestore(w)}},Xn=async(e,t,r,i,a,n)=>{var Q,ae,ke,ze;let s=le(),o=s.PTR_SIZE,u=dr.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],p=u[2],h=u[3],f=u[4],m=u[5],w=t.length,$=i.length,_=0,y=[],S=[],x=[],I=[],B=[],R=s.stackSave(),P=s.stackAlloc(w*o),V=s.stackAlloc(w*o),j=s.stackAlloc($*o),se=s.stackAlloc($*o);try{[_,y]=Ui(n),lt("wasm prepareInputOutputTensor");for(let H=0;H<w;H++)await Qn(r[H],S,I,e,d[t[H]],t[H],f);for(let H=0;H<$;H++)await Qn(a[H],x,I,e,p[i[H]],w+i[H],f);dt("wasm prepareInputOutputTensor");for(let H=0;H<w;H++)s.setValue(P+H*o,S[H],"*"),s.setValue(V+H*o,d[t[H]],"*");for(let H=0;H<$;H++)s.setValue(j+H*o,x[H],"*"),s.setValue(se+H*o,p[i[H]],"*");if(h&&!m){let{handle:H,outputPreferredLocations:Ne,outputPreferredLocationsEncoded:F}=h;if(d.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${d.length}).`);lt("wasm bindInputsOutputs");for(let G=0;G<w;G++){let de=t[G];await s._OrtBindInput(H,d[de],S[G])!==0&&ie(`Can't bind input[${G}] for session=${e}.`)}for(let G=0;G<$;G++){let de=i[G];(Q=a[G])!=null&&Q[3]?(B.push(x[G]),s._OrtBindOutput(H,p[de],x[G],0)!==0&&ie(`Can't bind pre-allocated output[${G}] for session=${e}.`)):s._OrtBindOutput(H,p[de],0,F[de])!==0&&ie(`Can't bind output[${G}] to ${Ne[G]} for session=${e}.`)}dt("wasm bindInputsOutputs"),dr.set(e,[l,d,p,h,f,!0])}(ae=s.jsepOnRunStart)==null||ae.call(s,l),(ke=s.webnnOnRunStart)==null||ke.call(s,l);let X;h?X=await s._OrtRunWithBinding(l,h.handle,$,j,_):X=await s._OrtRun(l,V,P,w,se,$,j,_),X!==0&&ie("failed to call OrtRun().");let me=[],Ue=[];lt("wasm ProcessOutputTensor");for(let H=0;H<$;H++){let Ne=Number(s.getValue(j+H*o,"*"));if(Ne===x[H]||B.includes(x[H])){me.push(a[H]),Ne!==x[H]&&s._OrtReleaseTensor(Ne)!==0&&ie("Can't release tensor.");continue}let F=s.stackSave(),G=s.stackAlloc(4*o),de=!1,_e,Ge=0;try{s._OrtGetTensorData(Ne,G,G+o,G+2*o,G+3*o)!==0&&ie(`Can't access output tensor data on index ${H}.`);let fa=o===4?"i32":"i64",Ua=Number(s.getValue(G,fa));Ge=s.getValue(G+o,"*");let Lp=s.getValue(G+o*2,"*"),eh=Number(s.getValue(G+o*3,fa)),cr=[];for(let nt=0;nt<eh;nt++)cr.push(Number(s.getValue(Lp+nt*o,fa)));s._OrtFree(Lp)!==0&&ie("Can't free memory for tensor dims.");let hr=cr.reduce((nt,Qe)=>nt*Qe,1);_e=vt(Ua);let ma=h==null?void 0:h.outputPreferredLocations[i[H]];if(_e==="string"){if(ma==="gpu-buffer"||ma==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let nt=[];for(let Qe=0;Qe<hr;Qe++){let ir=s.getValue(Ge+Qe*o,"*"),th=s.getValue(Ge+(Qe+1)*o,"*"),rh=Qe===hr-1?void 0:th-ir;nt.push(s.UTF8ToString(ir,rh))}me.push([_e,cr,nt,"cpu"])}else if(ma==="gpu-buffer"&&hr>0){let nt=s.jsepGetBuffer;if(!nt)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Qe=nt(Ge),ir=xt(Ua,hr);if(ir===void 0||!Mr(_e))throw new Error(`Unsupported data type: ${_e}`);de=!0,me.push([_e,cr,{gpuBuffer:Qe,download:s.jsepCreateDownloader(Qe,ir,_e),dispose:()=>{s._OrtReleaseTensor(Ne)!==0&&ie("Can't release tensor.")}},"gpu-buffer"])}else if(ma==="ml-tensor"&&hr>0){let nt=s.webnnEnsureTensor,Qe=s.webnnIsGraphInputOutputTypeSupported;if(!nt||!Qe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(xt(Ua,hr)===void 0||!Dr(_e))throw new Error(`Unsupported data type: ${_e}`);if(!Qe(e,_e,!1))throw new Error(`preferredLocation "ml-tensor" for ${_e} output is not supported by current WebNN Context.`);let ir=await nt(e,Ge,Ua,cr,!1);de=!0,me.push([_e,cr,{mlTensor:ir,download:s.webnnCreateMLTensorDownloader(Ge,_e),dispose:()=>{s.webnnReleaseTensorId(Ge),s._OrtReleaseTensor(Ne)}},"ml-tensor"])}else if(ma==="ml-tensor-cpu-output"&&hr>0){let nt=s.webnnCreateMLTensorDownloader(Ge,_e)(),Qe=me.length;de=!0,Ue.push((async()=>{let ir=[Qe,await nt];return s.webnnReleaseTensorId(Ge),s._OrtReleaseTensor(Ne),ir})()),me.push([_e,cr,[],"cpu"])}else{let nt=Rr(_e),Qe=new nt(hr);new Uint8Array(Qe.buffer,Qe.byteOffset,Qe.byteLength).set(s.HEAPU8.subarray(Ge,Ge+Qe.byteLength)),me.push([_e,cr,Qe,"cpu"])}}finally{s.stackRestore(F),_e==="string"&&Ge&&s._free(Ge),de||s._OrtReleaseTensor(Ne)}}h&&!f&&(s._OrtClearBoundOutputs(h.handle)!==0&&ie("Can't clear bound outputs."),dr.set(e,[l,d,p,h,f,!1]));for(let[H,Ne]of await Promise.all(Ue))me[H][2]=Ne;return dt("wasm ProcessOutputTensor"),me}finally{(ze=s.webnnOnRunEnd)==null||ze.call(s,l),s.stackRestore(R),S.forEach(X=>s._OrtReleaseTensor(X)),x.forEach(X=>s._OrtReleaseTensor(X)),I.forEach(X=>s._free(X)),_!==0&&s._OrtReleaseRunOptions(_),y.forEach(X=>s._free(X))}},Yn=e=>{let t=le(),r=dr.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&ie("Can't get an profile file name."),t._OrtFree(a)},Jn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),pr,St,gi,ca,ha,Da,es,Pa,Zr,Qr,Ep,kp,Ip,zp,Cp,Ap,Op,Rp,Bp=z(()=>{Ye(),Tp(),bt(),Ir(),pr=()=>!!Y.wasm.proxy&&typeof document<"u",gi=!1,ca=!1,ha=!1,Pa=new Map,Zr=(e,t)=>{let r=Pa.get(e);r?r.push(t):Pa.set(e,[t])},Qr=()=>{if(gi||!ca||ha||!St)throw new Error("worker not ready")},Ep=e=>{switch(e.data.type){case"init-wasm":gi=!1,e.data.err?(ha=!0,es[1](e.data.err)):(ca=!0,es[0]()),Da&&(URL.revokeObjectURL(Da),Da=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Pa.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},kp=async()=>{if(!ca){if(gi)throw new Error("multiple calls to 'initWasm()' detected.");if(ha)throw new Error("previous call to 'initWasm()' failed.");if(gi=!0,pr())return new Promise((e,t)=>{St==null||St.terminate(),Ri().then(([r,i])=>{try{St=i,St.onerror=n=>t(n),St.onmessage=Ep,es=[e,t];let a={type:"init-wasm",in:Y};if(!a.in.wasm.wasmPaths&&r){let n=Sr();n&&(a.in.wasm.wasmPaths=n)}St.postMessage(a),Da=r}catch(a){t(a)}},t)});try{await Ar(Y.wasm),await Gn(Y),ca=!0}catch(e){throw ha=!0,e}finally{gi=!1}}},Ip=async e=>{if(pr())return Qr(),new Promise((t,r)=>{Zr("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:Y}};St.postMessage(i)});await jn(Y,e)},zp=async e=>pr()?(Qr(),new Promise((t,r)=>{Zr("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};St.postMessage(i,[e.buffer])})):Ma(e),Cp=async(e,t)=>{if(pr()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Qr(),new Promise((r,i)=>{Zr("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),St.postMessage(a,n)})}else return Kn(e,t)},Ap=async e=>{if(pr())return Qr(),new Promise((t,r)=>{Zr("release",[t,r]);let i={type:"release",in:e};St.postMessage(i)});Zn(e)},Op=async(e,t,r,i,a,n)=>{if(pr()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Qr(),new Promise((s,o)=>{Zr("run",[s,o]);let u=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:n}};St.postMessage(l,Jn(u))})}else return Xn(e,t,r,i,a,n)},Rp=async e=>{if(pr())return Qr(),new Promise((t,r)=>{Zr("end-profiling",[t,r]);let i={type:"end-profiling",in:e};St.postMessage(i)});Yn(e)}}),ts,Mp,Dp,Qc=z(()=>{Ye(),Bp(),oe(),$r(),Wi(),ts=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Mp=e=>{switch(e[3]){case"cpu":return new Fe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Mr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return Fe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!Dr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return Fe.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Dp=class{async fetchModelAndCopyToWasmMemory(e){return zp(await Pr(e))}async loadModel(e,t){et();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Cp(r,t),Xe()}async dispose(){return Ap(this.sessionId)}async run(e,t,r){et();let i=[],a=[];Object.entries(e).forEach(p=>{let h=p[0],f=p[1],m=this.inputNames.indexOf(h);if(m===-1)throw new Error(`invalid input '${h}'`);i.push(f),a.push(m)});let n=[],s=[];Object.entries(t).forEach(p=>{let h=p[0],f=p[1],m=this.outputNames.indexOf(h);if(m===-1)throw new Error(`invalid output '${h}'`);n.push(f),s.push(m)});let o=i.map((p,h)=>ts(p,()=>`input "${this.inputNames[a[h]]}"`)),u=n.map((p,h)=>p?ts(p,()=>`output "${this.outputNames[s[h]]}"`):null),l=await Op(this.sessionId,a,o,s,u,r),d={};for(let p=0;p<l.length;p++)d[this.outputNames[s[p]]]=n[p]??Mp(l[p]);return Xe(),d}startProfiling(){}endProfiling(){Rp(this.sessionId)}}}),Pp={};be(Pp,{OnnxruntimeWebAssemblyBackend:()=>is,initializeFlags:()=>rs,wasmBackend:()=>Up});var rs,is,Up,Xc=z(()=>{Ye(),Bp(),Qc(),rs=()=>{(typeof Y.wasm.initTimeout!="number"||Y.wasm.initTimeout<0)&&(Y.wasm.initTimeout=0);let e=Y.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Y.wasm.simd=!1),typeof Y.wasm.proxy!="boolean"&&(Y.wasm.proxy=!1),typeof Y.wasm.trace!="boolean"&&(Y.wasm.trace=!1),typeof Y.wasm.numThreads!="number"||!Number.isInteger(Y.wasm.numThreads)||Y.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Y.wasm.numThreads=1;else{let t=typeof navigator>"u"?ce("node:os").cpus().length:navigator.hardwareConcurrency;Y.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},is=class{async init(e){rs(),await kp(),await Ip(e)}async createInferenceSessionHandler(e,t){let r=new Dp;return await r.loadModel(e,t),r}},Up=new is}),Np={};be(Np,{InferenceSession:()=>br,TRACE:()=>Wt,TRACE_EVENT_BEGIN:()=>lt,TRACE_EVENT_END:()=>dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Fe,default:()=>Jc,env:()=>Y,registerBackend:()=>we}),Ye(),Ye(),Ye();var Yc="1.24.3",Jc=Ti;{let e=(Xc(),Ve(Pp)).wasmBackend;we("webgpu",e,5),we("webnn",e,5),we("cpu",e,10),we("wasm",e,10)}return Object.defineProperty(Y.versions,"web",{value:Yc,enumerable:!0}),Ve(Np)})();/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */L.exports=re})(Zp);var lh=Zp.exports,ss={},Yp={};Object.defineProperty(Yp,"__esModule",{value:!0});var Va={},Jp;Object.defineProperty(Va,"__esModule",{value:!0});Va.SileroLegacy=void 0;const Gp=fr;class os{constructor(ee,re,K,ne,pe){this.ortInstance=ee,this._session=re,this._h=K,this._c=ne,this._sr=pe,this.reset_state=()=>{const ye=Array(128).fill(0);this._h=new this.ortInstance.Tensor("float32",ye,[2,1,64]),this._c=new this.ortInstance.Tensor("float32",ye,[2,1,64])},this.process=async ye=>{var ve;const z={input:new this.ortInstance.Tensor("float32",ye,[1,ye.length]),h:this._h,c:this._c,sr:this._sr},be=await this._session.run(z);this._h=be.hn,this._c=be.cn;const[Je]=(ve=be.output)==null?void 0:ve.data;return{notSpeech:1-Je,isSpeech:Je}},this.release=async()=>{await this._session.release(),this._h.dispose(),this._c.dispose(),this._sr.dispose()}}}Va.SileroLegacy=os;Jp=os;os.new=async(L,ee)=>{Gp.log.debug("initializing vad");const re=await ee(),K=await L.InferenceSession.create(re),ne=new L.Tensor("int64",[16000n]),pe=Array(2*64).fill(0),ye=new L.Tensor("float32",pe,[2,1,64]),ce=new L.Tensor("float32",pe,[2,1,64]);return Gp.log.debug("vad is initialized"),new Jp(L,K,ye,ce,ne)};var qa={},ec;Object.defineProperty(qa,"__esModule",{value:!0});qa.SileroV5=void 0;const jp=fr;function tc(L){const ee=Array(256).fill(0);return new L.Tensor("float32",ee,[2,1,128])}class us{constructor(ee,re,K,ne){this._session=ee,this._state=re,this._sr=K,this.ortInstance=ne,this.reset_state=()=>{this._state=tc(this.ortInstance)},this.process=async pe=>{var Ve;const ce={input:new this.ortInstance.Tensor("float32",pe,[1,pe.length]),state:this._state,sr:this._sr},z=await this._session.run(ce);if(!z.stateN)throw new Error("No state from model");if(this._state=z.stateN,!((Ve=z.output)!=null&&Ve.data))throw new Error("No output from model");const be=z.output.data[0];if(typeof be!="number")throw new Error("Weird output data");return{notSpeech:1-be,isSpeech:be}},this.release=async()=>{await this._session.release(),this._state.dispose(),this._sr.dispose()}}}qa.SileroV5=us;ec=us;us.new=async(L,ee)=>{jp.log.debug("Loading VAD...");const re=await ee(),K=await L.InferenceSession.create(re),ne=new L.Tensor("int64",[16000n]),pe=tc(L);return jp.log.debug("...finished loading VAD"),new ec(K,pe,ne,L)};(function(L){var ee=mt&&mt.__createBinding||(Object.create?function(pe,ye,ce,z){z===void 0&&(z=ce);var be=Object.getOwnPropertyDescriptor(ye,ce);(!be||("get"in be?!ye.__esModule:be.writable||be.configurable))&&(be={enumerable:!0,get:function(){return ye[ce]}}),Object.defineProperty(pe,z,be)}:function(pe,ye,ce,z){z===void 0&&(z=ce),pe[z]=ye[ce]}),re=mt&&mt.__exportStar||function(pe,ye){for(var ce in pe)ce!=="default"&&!Object.prototype.hasOwnProperty.call(ye,ce)&&ee(ye,pe,ce)};Object.defineProperty(L,"__esModule",{value:!0}),L.SileroV5=L.SileroLegacy=void 0,re(Yp,L);var K=Va;Object.defineProperty(L,"SileroLegacy",{enumerable:!0,get:function(){return K.SileroLegacy}});var ne=qa;Object.defineProperty(L,"SileroV5",{enumerable:!0,get:function(){return ne.SileroV5}})})(ss);var _a={};Object.defineProperty(_a,"__esModule",{value:!0});_a.Resampler=void 0;const dh=fr;class ph{constructor(ee){this.options=ee,this.process=re=>{const K=[];for(const ne of re)for(this.inputBuffer.push(ne);this.hasEnoughDataForFrame();){const pe=this.generateOutputFrame();K.push(pe)}return K},ee.nativeSampleRate<16e3&&dh.log.error("nativeSampleRate is too low. Should have 16000 = targetSampleRate <= nativeSampleRate"),this.inputBuffer=[]}async*stream(ee){for(const re of ee)for(this.inputBuffer.push(re);this.hasEnoughDataForFrame();)yield this.generateOutputFrame()}hasEnoughDataForFrame(){return this.inputBuffer.length*this.options.targetSampleRate/this.options.nativeSampleRate>=this.options.targetFrameSize}generateOutputFrame(){const ee=new Float32Array(this.options.targetFrameSize);let re=0,K=0;for(;re<this.options.targetFrameSize;){let ne=0,pe=0;for(;K<Math.min(this.inputBuffer.length,(re+1)*this.options.nativeSampleRate/this.options.targetSampleRate);){const ye=this.inputBuffer[K];ye!==void 0&&(ne+=ye,pe++),K++}ee[re]=ne/pe,re++}return this.inputBuffer=this.inputBuffer.slice(K),ee}}_a.Resampler=ph;(function(L){var ee=mt&&mt.__createBinding||(Object.create?function(ve,$e,we,De){De===void 0&&(De=we);var He=Object.getOwnPropertyDescriptor($e,we);(!He||("get"in He?!$e.__esModule:He.writable||He.configurable))&&(He={enumerable:!0,get:function(){return $e[we]}}),Object.defineProperty(ve,De,He)}:function(ve,$e,we,De){De===void 0&&(De=we),ve[De]=$e[we]}),re=mt&&mt.__setModuleDefault||(Object.create?function(ve,$e){Object.defineProperty(ve,"default",{enumerable:!0,value:$e})}:function(ve,$e){ve.default=$e}),K=mt&&mt.__importStar||function(ve){if(ve&&ve.__esModule)return ve;var $e={};if(ve!=null)for(var we in ve)we!=="default"&&Object.prototype.hasOwnProperty.call(ve,we)&&ee($e,ve,we);return re($e,ve),$e};Object.defineProperty(L,"__esModule",{value:!0}),L.NonRealTimeVAD=L.defaultNonRealTimeVADOptions=void 0;const ne=K(lh),pe=wa,ye=yi,ce=Xt,z=Yr,be=ss,Je=_a;L.defaultNonRealTimeVADOptions={...ce.defaultFrameProcessorOptions,modelURL:pe.baseAssetPath+"silero_vad_legacy.onnx",modelFetcher:ye.defaultModelFetcher};class Ve{static async new($e={}){const we={...L.defaultNonRealTimeVADOptions,...$e};(0,ce.validateOptions)(we),we.ortConfig!==void 0&&we.ortConfig(ne);const De=()=>we.modelFetcher(we.modelURL),He=await be.SileroLegacy.new(ne,De),wt=new ce.FrameProcessor(He.process,He.reset_state,{positiveSpeechThreshold:we.positiveSpeechThreshold,negativeSpeechThreshold:we.negativeSpeechThreshold,redemptionMs:we.redemptionMs,preSpeechPadMs:we.preSpeechPadMs,minSpeechMs:we.minSpeechMs,submitUserSpeechOnPause:we.submitUserSpeechOnPause},1536/16);return wt.resume(),new this(De,ne,we,wt)}constructor($e,we,De,He){this.modelFetcher=$e,this.ort=we,this.options=De,this.frameProcessor=He,this.frameSamples=1536}async*run($e,we){const De={nativeSampleRate:we,targetSampleRate:16e3,targetFrameSize:this.frameSamples},He=new Je.Resampler(De);let wt=0,At=0,Te=0;for await(const he of He.stream($e)){const ue=[];await this.frameProcessor.process(he,Le=>{ue.push(Le)});for(const Le of ue)switch(Le.msg){case z.Message.SpeechStart:wt=Te*this.frameSamples/16;break;case z.Message.SpeechEnd:At=(Te+1)*this.frameSamples/16,yield{audio:Le.audio,start:wt,end:At};break}Te++}const Ee=[];this.frameProcessor.endSegment(he=>{Ee.push(he)});for(const he of Ee)switch(he.msg){case z.Message.SpeechEnd:yield{audio:he.audio,start:wt,end:Te*this.frameSamples/16}}}}L.NonRealTimeVAD=Ve})(Kp);var Qt={};Object.defineProperty(Qt,"__esModule",{value:!0});Qt.audioFileToArray=Qt.encodeWAV=Qt.arrayBufferToBase64=Qt.minFramesForTargetMS=void 0;function ch(L,ee,re=16e3){return Math.ceil(L*re/1e3/ee)}Qt.minFramesForTargetMS=ch;function hh(L){const ee=new Uint8Array(L),re=ee.byteLength,K=new Array(re);for(let ne=0;ne<re;ne++){const pe=ee[ne];if(pe===void 0)break;K[ne]=String.fromCharCode(pe)}return btoa(K.join(""))}Qt.arrayBufferToBase64=hh;function fh(L,ee=3,re=16e3,K=1,ne=32){const pe=ne/8,ye=K*pe,ce=new ArrayBuffer(44+L.length*pe),z=new DataView(ce);return Na(z,0,"RIFF"),z.setUint32(4,36+L.length*pe,!0),Na(z,8,"WAVE"),Na(z,12,"fmt "),z.setUint32(16,16,!0),z.setUint16(20,ee,!0),z.setUint16(22,K,!0),z.setUint32(24,re,!0),z.setUint32(28,re*ye,!0),z.setUint16(32,ye,!0),z.setUint16(34,ne,!0),Na(z,36,"data"),z.setUint32(40,L.length*pe,!0),ee===1?gh(z,44,L):mh(z,44,L),ce}Qt.encodeWAV=fh;function mh(L,ee,re){for(let K=0;K<re.length;K++,ee+=4)L.setFloat32(ee,re[K],!0)}function gh(L,ee,re){for(let K=0;K<re.length;K++,ee+=2){const ne=Math.max(-1,Math.min(1,re[K]));L.setInt16(ee,ne<0?ne*32768:ne*32767,!0)}}function Na(L,ee,re){for(let K=0;K<re.length;K++)L.setUint8(ee+K,re.charCodeAt(K))}async function yh(L){const ee=new OfflineAudioContext(1,1,44100),re=new FileReader;let K=null;if(await new Promise(ye=>{re.addEventListener("loadend",()=>{const ce=re.result;ee.decodeAudioData(ce,z=>{K=z,ee.startRendering().then(()=>{console.log("Rendering completed successfully"),ye()}).catch(be=>{console.error("Rendering failed: ",be)})},z=>{console.log("Error with decoding audio data: ",z)})}),re.readAsArrayBuffer(L)}),K===null)throw Error("some shit");const ne=K,pe=new Float32Array(ne.length);for(let ye=0;ye<ne.length;ye++)for(let ce=0;ce<ne.numberOfChannels;ce++){const z=ne.getChannelData(ce)[ye],be=pe[ye];if(z===void 0||be===void 0)throw new Error("sample or out[i] is undefined");pe[ye]=be+z}return{audio:pe,sampleRate:ne.sampleRate}}Qt.audioFileToArray=yh;var rc={},ic={exports:{}};/*!
 * ONNX Runtime Web v1.24.3
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */(function(L,ee){var re=(()=>{var K=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,pe=Object.getOwnPropertyNames,ye=Object.prototype.hasOwnProperty,ce=(c=>typeof Ct<"u"?Ct:typeof Proxy<"u"?new Proxy(c,{get:(g,b)=>(typeof Ct<"u"?Ct:g)[b]}):c)(function(c){if(typeof Ct<"u")return Ct.apply(this,arguments);throw Error('Dynamic require of "'+c+'" is not supported')}),z=(c,g)=>()=>(c&&(g=c(c=0)),g),be=(c,g)=>{for(var b in g)K(c,b,{get:g[b],enumerable:!0})},Je=(c,g,b,T)=>{if(g&&typeof g=="object"||typeof g=="function")for(let v of pe(g))!ye.call(c,v)&&v!==b&&K(c,v,{get:()=>g[v],enumerable:!(T=ne(g,v))||T.enumerable});return c},Ve=c=>Je(K({},"__esModule",{value:!0}),c),ve,$e,we,De,He,wt=z(()=>{ve=new Map,$e=[],we=(c,g,b)=>{if(g&&typeof g.init=="function"&&typeof g.createInferenceSessionHandler=="function"){let T=ve.get(c);if(T===void 0)ve.set(c,{backend:g,priority:b});else{if(T.priority>b)return;if(T.priority===b&&T.backend!==g)throw new Error(`cannot register backend "${c}" using priority ${b}`)}if(b>=0){let v=$e.indexOf(c);v!==-1&&$e.splice(v,1);for(let A=0;A<$e.length;A++)if(ve.get($e[A]).priority<=b){$e.splice(A,0,c);return}$e.push(c)}return}throw new TypeError("not a valid backend")},De=async c=>{let g=ve.get(c);if(!g)return"backend not found.";if(g.initialized)return g.backend;if(g.aborted)return g.error;{let b=!!g.initPromise;try{return b||(g.initPromise=g.backend.init(c)),await g.initPromise,g.initialized=!0,g.backend}catch(T){return b||(g.error=`${T}`,g.aborted=!0),g.error}finally{delete g.initPromise}}},He=async c=>{let g=c.executionProviders||[],b=g.map(O=>typeof O=="string"?O:O.name),T=b.length===0?$e:b,v,A=[],E=new Set;for(let O of T){let N=await De(O);typeof N=="string"?A.push({name:O,err:N}):(v||(v=N),v===N&&E.add(O))}if(!v)throw new Error(`no available backend found. ERR: ${A.map(O=>`[${O.name}] ${O.err}`).join(", ")}`);for(let{name:O,err:N}of A)b.includes(O)&&console.warn(`removing requested execution provider "${O}" from session options because it is not available: ${N}`);let k=g.filter(O=>E.has(typeof O=="string"?O:O.name));return[v,new Proxy(c,{get:(O,N)=>N==="executionProviders"?k:Reflect.get(O,N)})]}}),At=z(()=>{wt()}),Te,Ee=z(()=>{Te="1.24.3"}),he,ue,Le=z(()=>{Ee(),he="warning",ue={wasm:{},webgl:{},webgpu:{},versions:{common:Te},set logLevel(c){if(c!==void 0){if(typeof c!="string"||["verbose","info","warning","error","fatal"].indexOf(c)===-1)throw new Error(`Unsupported logging level: ${c}`);he=c}},get logLevel(){return he}},Object.defineProperty(ue,"logLevel",{enumerable:!0})}),Y,ot=z(()=>{Le(),Y=ue}),je,gt,ar=z(()=>{je=(c,g)=>{let b=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);b.width=c.dims[3],b.height=c.dims[2];let T=b.getContext("2d");if(T!=null){let v,A;(g==null?void 0:g.tensorLayout)!==void 0&&g.tensorLayout==="NHWC"?(v=c.dims[2],A=c.dims[3]):(v=c.dims[3],A=c.dims[2]);let E=(g==null?void 0:g.format)!==void 0?g.format:"RGB",k=g==null?void 0:g.norm,O,N;k===void 0||k.mean===void 0?O=[255,255,255,255]:typeof k.mean=="number"?O=[k.mean,k.mean,k.mean,k.mean]:(O=[k.mean[0],k.mean[1],k.mean[2],0],k.mean[3]!==void 0&&(O[3]=k.mean[3])),k===void 0||k.bias===void 0?N=[0,0,0,0]:typeof k.bias=="number"?N=[k.bias,k.bias,k.bias,k.bias]:(N=[k.bias[0],k.bias[1],k.bias[2],0],k.bias[3]!==void 0&&(N[3]=k.bias[3]));let q=A*v,U=0,M=q,Z=q*2,C=-1;E==="RGBA"?(U=0,M=q,Z=q*2,C=q*3):E==="RGB"?(U=0,M=q,Z=q*2):E==="RBG"&&(U=0,Z=q,M=q*2);for(let W=0;W<A;W++)for(let Pe=0;Pe<v;Pe++){let ge=(c.data[U++]-N[0])*O[0],fe=(c.data[M++]-N[1])*O[1],Ae=(c.data[Z++]-N[2])*O[2],J=C===-1?255:(c.data[C++]-N[3])*O[3];T.fillStyle="rgba("+ge+","+fe+","+Ae+","+J+")",T.fillRect(Pe,W,1,1)}if("toDataURL"in b)return b.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},gt=(c,g)=>{let b=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),T;if(b!=null){let v,A,E;(g==null?void 0:g.tensorLayout)!==void 0&&g.tensorLayout==="NHWC"?(v=c.dims[2],A=c.dims[1],E=c.dims[3]):(v=c.dims[3],A=c.dims[2],E=c.dims[1]);let k=g!==void 0&&g.format!==void 0?g.format:"RGB",O=g==null?void 0:g.norm,N,q;O===void 0||O.mean===void 0?N=[255,255,255,255]:typeof O.mean=="number"?N=[O.mean,O.mean,O.mean,O.mean]:(N=[O.mean[0],O.mean[1],O.mean[2],255],O.mean[3]!==void 0&&(N[3]=O.mean[3])),O===void 0||O.bias===void 0?q=[0,0,0,0]:typeof O.bias=="number"?q=[O.bias,O.bias,O.bias,O.bias]:(q=[O.bias[0],O.bias[1],O.bias[2],0],O.bias[3]!==void 0&&(q[3]=O.bias[3]));let U=A*v;if(g!==void 0&&(g.format!==void 0&&E===4&&g.format!=="RGBA"||E===3&&g.format!=="RGB"&&g.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let M=4,Z=0,C=1,W=2,Pe=3,ge=0,fe=U,Ae=U*2,J=-1;k==="RGBA"?(ge=0,fe=U,Ae=U*2,J=U*3):k==="RGB"?(ge=0,fe=U,Ae=U*2):k==="RBG"&&(ge=0,Ae=U,fe=U*2),T=b.createImageData(v,A);for(let Me=0;Me<A*v;Z+=M,C+=M,W+=M,Pe+=M,Me++)T.data[Z]=(c.data[ge++]-q[0])*N[0],T.data[C]=(c.data[fe++]-q[1])*N[1],T.data[W]=(c.data[Ae++]-q[2])*N[2],T.data[Pe]=J===-1?255:(c.data[J++]-q[3])*N[3]}else throw new Error("Can not access image data");return T}}),ut,_t,mr,gr,Oe,kt,wi=z(()=>{wr(),ut=(c,g)=>{if(c===void 0)throw new Error("Image buffer must be defined");if(g.height===void 0||g.width===void 0)throw new Error("Image height and width must be defined");if(g.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:b,width:T}=g,v=g.norm??{mean:255,bias:0},A,E;typeof v.mean=="number"?A=[v.mean,v.mean,v.mean,v.mean]:A=[v.mean[0],v.mean[1],v.mean[2],v.mean[3]??255],typeof v.bias=="number"?E=[v.bias,v.bias,v.bias,v.bias]:E=[v.bias[0],v.bias[1],v.bias[2],v.bias[3]??0];let k=g.format!==void 0?g.format:"RGBA",O=g.tensorFormat!==void 0&&g.tensorFormat!==void 0?g.tensorFormat:"RGB",N=b*T,q=O==="RGBA"?new Float32Array(N*4):new Float32Array(N*3),U=4,M=0,Z=1,C=2,W=3,Pe=0,ge=N,fe=N*2,Ae=-1;k==="RGB"&&(U=3,M=0,Z=1,C=2,W=-1),O==="RGBA"?Ae=N*3:O==="RBG"?(Pe=0,fe=N,ge=N*2):O==="BGR"&&(fe=0,ge=N,Pe=N*2);for(let J=0;J<N;J++,M+=U,C+=U,Z+=U,W+=U)q[Pe++]=(c[M]+E[0])/A[0],q[ge++]=(c[Z]+E[1])/A[1],q[fe++]=(c[C]+E[2])/A[2],Ae!==-1&&W!==-1&&(q[Ae++]=(c[W]+E[3])/A[3]);return O==="RGBA"?new Re("float32",q,[1,4,b,T]):new Re("float32",q,[1,3,b,T])},_t=async(c,g)=>{let b=typeof HTMLImageElement<"u"&&c instanceof HTMLImageElement,T=typeof ImageData<"u"&&c instanceof ImageData,v=typeof ImageBitmap<"u"&&c instanceof ImageBitmap,A=typeof c=="string",E,k=g??{},O=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},N=q=>typeof HTMLCanvasElement<"u"&&q instanceof HTMLCanvasElement||q instanceof OffscreenCanvas?q.getContext("2d"):null;if(b){let q=O();q.width=c.width,q.height=c.height;let U=N(q);if(U!=null){let M=c.height,Z=c.width;if(g!==void 0&&g.resizedHeight!==void 0&&g.resizedWidth!==void 0&&(M=g.resizedHeight,Z=g.resizedWidth),g!==void 0){if(k=g,g.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");k.tensorFormat="RGBA",k.height=M,k.width=Z}else k.tensorFormat="RGBA",k.height=M,k.width=Z;U.drawImage(c,0,0),E=U.getImageData(0,0,Z,M).data}else throw new Error("Can not access image data")}else if(T){let q,U;if(g!==void 0&&g.resizedWidth!==void 0&&g.resizedHeight!==void 0?(q=g.resizedHeight,U=g.resizedWidth):(q=c.height,U=c.width),g!==void 0&&(k=g),k.format="RGBA",k.height=q,k.width=U,g!==void 0){let M=O();M.width=U,M.height=q;let Z=N(M);if(Z!=null)Z.putImageData(c,0,0),E=Z.getImageData(0,0,U,q).data;else throw new Error("Can not access image data")}else E=c.data}else if(v){if(g===void 0)throw new Error("Please provide image config with format for Imagebitmap");let q=O();q.width=c.width,q.height=c.height;let U=N(q);if(U!=null){let M=c.height,Z=c.width;return U.drawImage(c,0,0,Z,M),E=U.getImageData(0,0,Z,M).data,k.height=M,k.width=Z,ut(E,k)}else throw new Error("Can not access image data")}else{if(A)return new Promise((q,U)=>{let M=O(),Z=N(M);if(!c||!Z)return U();let C=new Image;C.crossOrigin="Anonymous",C.src=c,C.onload=()=>{M.width=C.width,M.height=C.height,Z.drawImage(C,0,0,M.width,M.height);let W=Z.getImageData(0,0,M.width,M.height);k.height=M.height,k.width=M.width,q(ut(W.data,k))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(E!==void 0)return ut(E,k);throw new Error("Input data provided is not supported - aborted tensor creation")},mr=(c,g)=>{let{width:b,height:T,download:v,dispose:A}=g,E=[1,T,b,4];return new Re({location:"texture",type:"float32",texture:c,dims:E,download:v,dispose:A})},gr=(c,g)=>{let{dataType:b,dims:T,download:v,dispose:A}=g;return new Re({location:"gpu-buffer",type:b??"float32",gpuBuffer:c,dims:T,download:v,dispose:A})},Oe=(c,g)=>{let{dataType:b,dims:T,download:v,dispose:A}=g;return new Re({location:"ml-tensor",type:b??"float32",mlTensor:c,dims:T,download:v,dispose:A})},kt=(c,g,b)=>new Re({location:"cpu-pinned",type:c,data:g,dims:b??[g.length]})}),it,Ot,yr,_i,Fa=z(()=>{it=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Ot=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),yr=!1,_i=()=>{if(!yr){yr=!0;let c=typeof BigInt64Array<"u"&&BigInt64Array.from,g=typeof BigUint64Array<"u"&&BigUint64Array.from,b=globalThis.Float16Array,T=typeof b<"u"&&b.from;c&&(it.set("int64",BigInt64Array),Ot.set(BigInt64Array,"int64")),g&&(it.set("uint64",BigUint64Array),Ot.set(BigUint64Array,"uint64")),T?(it.set("float16",b),Ot.set(b,"float16")):it.set("float16",Uint16Array)}}}),bi,$i,Wa=z(()=>{wr(),bi=c=>{let g=1;for(let b=0;b<c.length;b++){let T=c[b];if(typeof T!="number"||!Number.isSafeInteger(T))throw new TypeError(`dims[${b}] must be an integer, got: ${T}`);if(T<0)throw new RangeError(`dims[${b}] must be a non-negative integer, got: ${T}`);g*=T}return g},$i=(c,g)=>{switch(c.location){case"cpu":return new Re(c.type,c.data,g);case"cpu-pinned":return new Re({location:"cpu-pinned",data:c.data,type:c.type,dims:g});case"texture":return new Re({location:"texture",texture:c.texture,type:c.type,dims:g});case"gpu-buffer":return new Re({location:"gpu-buffer",gpuBuffer:c.gpuBuffer,type:c.type,dims:g});case"ml-tensor":return new Re({location:"ml-tensor",mlTensor:c.mlTensor,type:c.type,dims:g});default:throw new Error(`tensorReshape: tensor location ${c.location} is not supported`)}}}),Re,wr=z(()=>{ar(),wi(),Fa(),Wa(),Re=class{constructor(c,g,b){_i();let T,v;if(typeof c=="object"&&"location"in c)switch(this.dataLocation=c.location,T=c.type,v=c.dims,c.location){case"cpu-pinned":{let E=it.get(T);if(!E)throw new TypeError(`unsupported type "${T}" to create tensor from pinned buffer`);if(!(c.data instanceof E))throw new TypeError(`buffer should be of type ${E.name}`);this.cpuData=c.data;break}case"texture":{if(T!=="float32")throw new TypeError(`unsupported type "${T}" to create tensor from texture`);this.gpuTextureData=c.texture,this.downloader=c.download,this.disposer=c.dispose;break}case"gpu-buffer":{if(T!=="float32"&&T!=="float16"&&T!=="int32"&&T!=="int64"&&T!=="uint32"&&T!=="uint8"&&T!=="bool"&&T!=="uint4"&&T!=="int4")throw new TypeError(`unsupported type "${T}" to create tensor from gpu buffer`);this.gpuBufferData=c.gpuBuffer,this.downloader=c.download,this.disposer=c.dispose;break}case"ml-tensor":{if(T!=="float32"&&T!=="float16"&&T!=="int32"&&T!=="int64"&&T!=="uint32"&&T!=="uint64"&&T!=="int8"&&T!=="uint8"&&T!=="bool"&&T!=="uint4"&&T!=="int4")throw new TypeError(`unsupported type "${T}" to create tensor from MLTensor`);this.mlTensorData=c.mlTensor,this.downloader=c.download,this.disposer=c.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let E,k;if(typeof c=="string")if(T=c,k=b,c==="string"){if(!Array.isArray(g))throw new TypeError("A string tensor's data must be a string array.");E=g}else{let O=it.get(c);if(O===void 0)throw new TypeError(`Unsupported tensor type: ${c}.`);if(Array.isArray(g)){if(c==="float16"&&O===Uint16Array||c==="uint4"||c==="int4")throw new TypeError(`Creating a ${c} tensor from number array is not supported. Please use ${O.name} as data.`);c==="uint64"||c==="int64"?E=O.from(g,BigInt):E=O.from(g)}else if(g instanceof O)E=g;else if(g instanceof Uint8ClampedArray)if(c==="uint8")E=Uint8Array.from(g);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(c==="float16"&&g instanceof Uint16Array&&O!==Uint16Array)E=new globalThis.Float16Array(g.buffer,g.byteOffset,g.length);else throw new TypeError(`A ${T} tensor's data must be type of ${O}`)}else if(k=g,Array.isArray(c)){if(c.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let O=typeof c[0];if(O==="string")T="string",E=c;else if(O==="boolean")T="bool",E=Uint8Array.from(c);else throw new TypeError(`Invalid element type of data array: ${O}.`)}else if(c instanceof Uint8ClampedArray)T="uint8",E=Uint8Array.from(c);else{let O=Ot.get(c.constructor);if(O===void 0)throw new TypeError(`Unsupported type for tensor data: ${c.constructor}.`);T=O,E=c}if(k===void 0)k=[E.length];else if(!Array.isArray(k))throw new TypeError("A tensor's dims must be a number array");v=k,this.cpuData=E,this.dataLocation="cpu"}let A=bi(v);if(this.cpuData&&A!==this.cpuData.length&&!((T==="uint4"||T==="int4")&&Math.ceil(A/2)===this.cpuData.length))throw new Error(`Tensor's size(${A}) does not match data length(${this.cpuData.length}).`);this.type=T,this.dims=v,this.size=A}static async fromImage(c,g){return _t(c,g)}static fromTexture(c,g){return mr(c,g)}static fromGpuBuffer(c,g){return gr(c,g)}static fromMLTensor(c,g){return Oe(c,g)}static fromPinnedBuffer(c,g,b){return kt(c,g,b)}toDataURL(c){return je(this,c)}toImageData(c){return gt(this,c)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(c){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let g=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=g,c&&this.disposer&&(this.disposer(),this.disposer=void 0),g}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(c){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return $i(this,c)}}}),Fe,vi=z(()=>{wr(),Fe=Re}),Wt,_r,et,Xe,lt,dt,xi=z(()=>{Le(),Wt=(c,g)=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||console.timeStamp(`${c}::ORT::${g}`)},_r=(c,g)=>{var v;let b=((v=new Error().stack)==null?void 0:v.split(/\r\n|\r|\n/g))||[],T=!1;for(let A=0;A<b.length;A++){if(T&&!b[A].includes("TRACE_FUNC")){let E=`FUNC_${c}::${b[A].trim().split(" ")[1]}`;g&&(E+=`::${g}`),Wt("CPU",E);return}b[A].includes("TRACE_FUNC")&&(T=!0)}},et=c=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||_r("BEGIN",c)},Xe=c=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||_r("END",c)},lt=c=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||console.time(`ORT::${c}`)},dt=c=>{(typeof ue.trace>"u"?!ue.wasm.trace:!ue.trace)||console.timeEnd(`ORT::${c}`)}}),Si,Ga=z(()=>{wt(),vi(),xi(),Si=class ac{constructor(g){this.handler=g}async run(g,b,T){et(),lt("InferenceSession.run");let v={},A={};if(typeof g!="object"||g===null||g instanceof Fe||Array.isArray(g))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let E=!0;if(typeof b=="object"){if(b===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(b instanceof Fe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(b)){if(b.length===0)throw new TypeError("'fetches' cannot be an empty array.");E=!1;for(let N of b){if(typeof N!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(N)===-1)throw new RangeError(`'fetches' contains invalid output name: ${N}.`);v[N]=null}if(typeof T=="object"&&T!==null)A=T;else if(typeof T<"u")throw new TypeError("'options' must be an object.")}else{let N=!1,q=Object.getOwnPropertyNames(b);for(let U of this.outputNames)if(q.indexOf(U)!==-1){let M=b[U];(M===null||M instanceof Fe)&&(N=!0,E=!1,v[U]=M)}if(N){if(typeof T=="object"&&T!==null)A=T;else if(typeof T<"u")throw new TypeError("'options' must be an object.")}else A=b}}else if(typeof b<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let N of this.inputNames)if(typeof g[N]>"u")throw new Error(`input '${N}' is missing in 'feeds'.`);if(E)for(let N of this.outputNames)v[N]=null;let k=await this.handler.run(g,v,A),O={};for(let N in k)if(Object.hasOwnProperty.call(k,N)){let q=k[N];q instanceof Fe?O[N]=q:O[N]=new Fe(q.type,q.data,q.dims)}return dt("InferenceSession.run"),Xe(),O}async release(){return this.handler.dispose()}static async create(g,b,T,v){et(),lt("InferenceSession.create");let A,E={};if(typeof g=="string"){if(A=g,typeof b=="object"&&b!==null)E=b;else if(typeof b<"u")throw new TypeError("'options' must be an object.")}else if(g instanceof Uint8Array){if(A=g,typeof b=="object"&&b!==null)E=b;else if(typeof b<"u")throw new TypeError("'options' must be an object.")}else if(g instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&g instanceof SharedArrayBuffer){let q=g,U=0,M=g.byteLength;if(typeof b=="object"&&b!==null)E=b;else if(typeof b=="number"){if(U=b,!Number.isSafeInteger(U))throw new RangeError("'byteOffset' must be an integer.");if(U<0||U>=q.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${q.byteLength}).`);if(M=g.byteLength-U,typeof T=="number"){if(M=T,!Number.isSafeInteger(M))throw new RangeError("'byteLength' must be an integer.");if(M<=0||U+M>q.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${q.byteLength-U}].`);if(typeof v=="object"&&v!==null)E=v;else if(typeof v<"u")throw new TypeError("'options' must be an object.")}else if(typeof T<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof b<"u")throw new TypeError("'options' must be an object.");A=new Uint8Array(q,U,M)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[k,O]=await He(E),N=await k.createInferenceSessionHandler(A,O);return dt("InferenceSession.create"),Xe(),new ac(N)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),br,ja=z(()=>{Ga(),br=Si}),Ha=z(()=>{}),Ka=z(()=>{}),Za=z(()=>{}),Qa=z(()=>{}),Ti={};be(Ti,{InferenceSession:()=>br,TRACE:()=>Wt,TRACE_EVENT_BEGIN:()=>lt,TRACE_EVENT_END:()=>dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Fe,env:()=>Y,registerBackend:()=>we});var Ye=z(()=>{At(),ot(),ja(),vi(),Ha(),Ka(),xi(),Za(),Qa()}),$r=z(()=>{}),Ei={};be(Ei,{default:()=>ki});var vr,xr,ki,Xa=z(()=>{var c;ji(),bt(),Ir(),vr="ort-wasm-proxy-worker",xr=((c=globalThis.self)==null?void 0:c.name)===vr,xr&&(self.onmessage=g=>{let{type:b,in:T}=g.data;try{switch(b){case"init-wasm":Ar(T.wasm).then(()=>{ei(T).then(()=>{postMessage({type:b})},v=>{postMessage({type:b,err:v})})},v=>{postMessage({type:b,err:v})});break;case"init-ep":{let{epName:v,env:A}=T;ti(A,v).then(()=>{postMessage({type:b})},E=>{postMessage({type:b,err:E})});break}case"copy-from":{let{buffer:v}=T,A=xe(v);postMessage({type:b,out:A});break}case"create":{let{model:v,options:A}=T;Tt(v,A).then(E=>{postMessage({type:b,out:E})},E=>{postMessage({type:b,err:E})});break}case"release":ai(T),postMessage({type:b});break;case"run":{let{sessionId:v,inputIndices:A,inputs:E,outputIndices:k,options:O}=T;D(v,A,E,k,new Array(k.length).fill(null),O).then(N=>{N.some(q=>q[3]!=="cpu")?postMessage({type:b,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:b,out:N},ni([...E,...N]))},N=>{postMessage({type:b,err:N})});break}case"end-profiling":nr(T),postMessage({type:b});break;default:}}catch(v){postMessage({type:b,err:v})}}),ki=xr?null:g=>new Worker(g??Be,{type:"classic",name:vr})}),Ii,zi,Be,Sr,Yt,Ci,Ai,Tr,Oi,Er,Ri,kr,Bi,Ir=z(()=>{$r(),Ii=typeof location>"u"?void 0:location.origin,zi=()=>{var c,g;return typeof document<"u"?(c=document.currentScript)==null?void 0:c.src:typeof self<"u"?(g=self.location)==null?void 0:g.href:void 0},Be=zi(),Sr=()=>{if(Be&&!Be.startsWith("blob:"))return Be.substring(0,Be.lastIndexOf("/")+1)},Yt=(c,g)=>{try{let b=g??Be;return(b?new URL(c,b):new URL(c)).origin===Ii}catch{return!1}},Ci=(c,g)=>{let b=g??Be;try{return(b?new URL(c,b):new URL(c)).href}catch{return}},Ai=(c,g)=>`${g??"./"}${c}`,Tr=async c=>{let g=await(await fetch(c,{credentials:"same-origin"})).blob();return URL.createObjectURL(g)},Oi=async c=>(await import(c)).default,Er=(Xa(),Ve(Ei)).default,Ri=async()=>{if(!Be)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Yt(Be))return[void 0,Er()];let c=await Tr(Be);return[c,Er(c)]},kr=void 0,Bi=async(c,g,b,T)=>{let v=kr&&!(c||g);if(v)if(Be)v=Yt(Be)||T&&!b;else if(T&&!b)v=!0;else throw new Error("cannot determine the script source URL.");if(v)return[void 0,kr];{let A="ort-wasm-simd-threaded.mjs",E=c??Ci(A,g),k=b&&E&&!Yt(E,g),O=k?await Tr(E):E??Ai(A,g);return[k?O:void 0,await Oi(O)]}}}),zr,Jt,Rt,Cr,Mi,Di,Pi,Ar,le,bt=z(()=>{Ir(),Jt=!1,Rt=!1,Cr=!1,Mi=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Di=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Pi=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ar=async c=>{if(Jt)return Promise.resolve();if(Rt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Cr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Rt=!0;let g=c.initTimeout,b=c.numThreads;if(c.simd!==!1){if(c.simd==="relaxed"){if(!Pi())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Di())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let T=Mi();b>1&&!T&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+b+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),c.numThreads=b=1);let v=c.wasmPaths,A=typeof v=="string"?v:void 0,E=v==null?void 0:v.mjs,k=(E==null?void 0:E.href)??E,O=v==null?void 0:v.wasm,N=(O==null?void 0:O.href)??O,q=c.wasmBinary,[U,M]=await Bi(k,A,b>1,!!q||!!N),Z=!1,C=[];if(g>0&&C.push(new Promise(W=>{setTimeout(()=>{Z=!0,W()},g)})),C.push(new Promise((W,Pe)=>{let ge={numThreads:b};if(q)ge.wasmBinary=q,ge.locateFile=fe=>fe;else if(N||A)ge.locateFile=fe=>N??A+fe;else if(k&&k.indexOf("blob:")!==0)ge.locateFile=fe=>new URL(fe,k).href;else if(U){let fe=Sr();fe&&(ge.locateFile=Ae=>fe+Ae)}M(ge).then(fe=>{Rt=!1,Jt=!0,zr=fe,W(),U&&URL.revokeObjectURL(U)},fe=>{Rt=!1,Cr=!0,Pe(fe)})})),await Promise.race(C),Z)throw new Error(`WebAssembly backend initializing failed due to timeout: ${g}ms`)},le=()=>{if(Jt&&zr)return zr;throw new Error("WebAssembly is not initialized yet.")}}),We,er,ie,Or=z(()=>{bt(),We=(c,g)=>{let b=le(),T=b.lengthBytesUTF8(c)+1,v=b._malloc(T);return b.stringToUTF8(c,v,T),g.push(v),v},er=(c,g,b,T)=>{if(typeof c=="object"&&c!==null){if(b.has(c))throw new Error("Circular reference in options");b.add(c)}Object.entries(c).forEach(([v,A])=>{let E=g?g+v:v;if(typeof A=="object")er(A,E+".",b,T);else if(typeof A=="string"||typeof A=="number")T(E,A.toString());else if(typeof A=="boolean")T(E,A?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof A}`)})},ie=c=>{let g=le(),b=g.stackSave();try{let T=g.PTR_SIZE,v=g.stackAlloc(2*T);g._OrtGetLastError(v,v+T);let A=Number(g.getValue(v,T===4?"i32":"i64")),E=g.getValue(v+T,"*"),k=E?g.UTF8ToString(E):"";throw new Error(`${c} ERROR_CODE: ${A}, ERROR_MESSAGE: ${k}`)}finally{g.stackRestore(b)}}}),Ui,Ya=z(()=>{bt(),Or(),Ui=c=>{let g=le(),b=0,T=[],v=c||{};try{if((c==null?void 0:c.logSeverityLevel)===void 0)v.logSeverityLevel=2;else if(typeof c.logSeverityLevel!="number"||!Number.isInteger(c.logSeverityLevel)||c.logSeverityLevel<0||c.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${c.logSeverityLevel}`);if((c==null?void 0:c.logVerbosityLevel)===void 0)v.logVerbosityLevel=0;else if(typeof c.logVerbosityLevel!="number"||!Number.isInteger(c.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${c.logVerbosityLevel}`);(c==null?void 0:c.terminate)===void 0&&(v.terminate=!1);let A=0;return(c==null?void 0:c.tag)!==void 0&&(A=We(c.tag,T)),b=g._OrtCreateRunOptions(v.logSeverityLevel,v.logVerbosityLevel,!!v.terminate,A),b===0&&ie("Can't create run options."),(c==null?void 0:c.extra)!==void 0&&er(c.extra,"",new WeakSet,(E,k)=>{let O=We(E,T),N=We(k,T);g._OrtAddRunConfigEntry(b,O,N)!==0&&ie(`Can't set a run config entry: ${E} - ${k}.`)}),[b,T]}catch(A){throw b!==0&&g._OrtReleaseRunOptions(b),T.forEach(E=>g._free(E)),A}}}),Ni,Li,Vi,Bt,qi,Fi,Ja=z(()=>{bt(),Or(),Ni=c=>{switch(c){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${c}`)}},Li=c=>{switch(c){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${c}`)}},Vi=c=>{c.extra||(c.extra={}),c.extra.session||(c.extra.session={});let g=c.extra.session;g.use_ort_model_bytes_directly||(g.use_ort_model_bytes_directly="1"),c.executionProviders&&c.executionProviders.some(b=>(typeof b=="string"?b:b.name)==="webgpu")&&(c.enableMemPattern=!1)},Bt=(c,g,b,T)=>{let v=We(g,T),A=We(b,T);le()._OrtAddSessionConfigEntry(c,v,A)!==0&&ie(`Can't set a session config entry: ${g} - ${b}.`)},qi=async(c,g,b)=>{let T=g.executionProviders;for(let v of T){let A=typeof v=="string"?v:v.name,E=[];switch(A){case"webnn":if(A="WEBNN",typeof v!="string"){let U=v==null?void 0:v.deviceType;U&&Bt(c,"deviceType",U,b)}break;case"webgpu":if(A="JS",typeof v!="string"){let U=v;if(U!=null&&U.preferredLayout){if(U.preferredLayout!=="NCHW"&&U.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${U.preferredLayout}`);Bt(c,"preferredLayout",U.preferredLayout,b)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${A}`)}let k=We(A,b),O=E.length,N=0,q=0;if(O>0){N=le()._malloc(O*le().PTR_SIZE),b.push(N),q=le()._malloc(O*le().PTR_SIZE),b.push(q);for(let U=0;U<O;U++)le().setValue(N+U*le().PTR_SIZE,E[U][0],"*"),le().setValue(q+U*le().PTR_SIZE,E[U][1],"*")}await le()._OrtAppendExecutionProvider(c,k,N,q,O)!==0&&ie(`Can't append execution provider: ${A}.`)}},Fi=async c=>{let g=le(),b=0,T=[],v=c||{};Vi(v);try{let A=Ni(v.graphOptimizationLevel??"all"),E=Li(v.executionMode??"sequential"),k=typeof v.logId=="string"?We(v.logId,T):0,O=v.logSeverityLevel??2;if(!Number.isInteger(O)||O<0||O>4)throw new Error(`log severity level is not valid: ${O}`);let N=v.logVerbosityLevel??0;if(!Number.isInteger(N)||N<0||N>4)throw new Error(`log verbosity level is not valid: ${N}`);let q=typeof v.optimizedModelFilePath=="string"?We(v.optimizedModelFilePath,T):0;if(b=g._OrtCreateSessionOptions(A,!!v.enableCpuMemArena,!!v.enableMemPattern,E,!!v.enableProfiling,0,k,O,N,q),b===0&&ie("Can't create session options."),v.executionProviders&&await qi(b,v,T),v.enableGraphCapture!==void 0){if(typeof v.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${v.enableGraphCapture}`);Bt(b,"enableGraphCapture",v.enableGraphCapture.toString(),T)}if(v.freeDimensionOverrides)for(let[U,M]of Object.entries(v.freeDimensionOverrides)){if(typeof U!="string")throw new Error(`free dimension override name must be a string: ${U}`);if(typeof M!="number"||!Number.isInteger(M)||M<0)throw new Error(`free dimension override value must be a non-negative integer: ${M}`);let Z=We(U,T);g._OrtAddFreeDimensionOverride(b,Z,M)!==0&&ie(`Can't set a free dimension override: ${U} - ${M}.`)}return v.extra!==void 0&&er(v.extra,"",new WeakSet,(U,M)=>{Bt(b,U,M,T)}),[b,T]}catch(A){throw b!==0&&g._OrtReleaseSessionOptions(b)!==0&&ie("Can't release session options."),T.forEach(E=>g._free(E)),A}}}),$t,vt,xt,Rr,Br,Mr,Dr,Jr,oe=z(()=>{$t=c=>{switch(c){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${c}`)}},vt=c=>{switch(c){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${c}`)}},xt=(c,g)=>{let b=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][c],T=typeof g=="number"?g:g.reduce((v,A)=>v*A,1);return b>0?Math.ceil(T*b):void 0},Rr=c=>{switch(c){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${c}`)}},Br=c=>{switch(c){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${c}`)}},Mr=c=>c==="float32"||c==="float16"||c==="int32"||c==="int64"||c==="uint32"||c==="uint8"||c==="bool"||c==="uint4"||c==="int4",Dr=c=>c==="float32"||c==="float16"||c==="int32"||c==="int64"||c==="uint32"||c==="uint64"||c==="int8"||c==="uint8"||c==="bool"||c==="uint4"||c==="int4",Jr=c=>{switch(c){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${c}`)}}}),Pr,Wi=z(()=>{$r(),Pr=async c=>{if(typeof c=="string"){let g=await fetch(c);if(!g.ok)throw new Error(`failed to load external data file: ${c}`);let b=g.headers.get("Content-Length"),T=b?parseInt(b,10):0;if(T<1073741824)return new Uint8Array(await g.arrayBuffer());{if(!g.body)throw new Error(`failed to load external data file: ${c}, no response body.`);let v=g.body.getReader(),A;try{A=new ArrayBuffer(T)}catch(k){if(k instanceof RangeError){let O=Math.ceil(T/65536);A=new WebAssembly.Memory({initial:O,maximum:O}).buffer}else throw k}let E=0;for(;;){let{done:k,value:O}=await v.read();if(k)break;let N=O.byteLength;new Uint8Array(A,E,N).set(O),E+=N}return new Uint8Array(A,0,T)}}else return c instanceof Blob?new Uint8Array(await c.arrayBuffer()):c instanceof Uint8Array?c:new Uint8Array(c)}}),Gi,ei,ti,Gt,ri,ii,xe,Tt,ai,jt,D,nr,ni,ji=z(()=>{Ye(),Ya(),Ja(),oe(),bt(),Or(),Wi(),Gi=(c,g)=>{le()._OrtInit(c,g)!==0&&ie("Can't initialize onnxruntime.")},ei=async c=>{Gi(c.wasm.numThreads,Br(c.logLevel))},ti=async(c,g)=>{var T,v;(v=(T=le()).asyncInit)==null||v.call(T);let b=c.webgpu.adapter;if(g==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(b){if(typeof b.limits!="object"||typeof b.features!="object"||typeof b.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let A=c.webgpu.powerPreference;if(A!==void 0&&A!=="low-power"&&A!=="high-performance")throw new Error(`Invalid powerPreference setting: "${A}"`);let E=c.webgpu.forceFallbackAdapter;if(E!==void 0&&typeof E!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${E}"`);if(b=await navigator.gpu.requestAdapter({powerPreference:A,forceFallbackAdapter:E}),!b)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(g==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment")},Gt=new Map,ri=c=>{let g=le(),b=g.stackSave();try{let T=g.PTR_SIZE,v=g.stackAlloc(2*T);g._OrtGetInputOutputCount(c,v,v+T)!==0&&ie("Can't get session input/output count.");let A=T===4?"i32":"i64";return[Number(g.getValue(v,A)),Number(g.getValue(v+T,A))]}finally{g.stackRestore(b)}},ii=(c,g)=>{let b=le(),T=b.stackSave(),v=0;try{let A=b.PTR_SIZE,E=b.stackAlloc(2*A);b._OrtGetInputOutputMetadata(c,g,E,E+A)!==0&&ie("Can't get session input/output metadata.");let k=Number(b.getValue(E,"*"));v=Number(b.getValue(E+A,"*"));let O=b.HEAP32[v/4];if(O===0)return[k,0];let N=b.HEAPU32[v/4+1],q=[];for(let U=0;U<N;U++){let M=Number(b.getValue(v+8+U*A,"*"));q.push(M!==0?b.UTF8ToString(M):Number(b.getValue(v+8+(U+N)*A,"*")))}return[k,O,q]}finally{b.stackRestore(T),v!==0&&b._OrtFree(v)}},xe=c=>{let g=le(),b=g._malloc(c.byteLength);if(b===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${c.byteLength}.`);return g.HEAPU8.set(c,b),[b,c.byteLength]},Tt=async(c,g)=>{var q,U,M;let b,T,v=le();Array.isArray(c)?[b,T]=c:c.buffer===v.HEAPU8.buffer?[b,T]=[c.byteOffset,c.byteLength]:[b,T]=xe(c);let A=0,E=0,k=[],O=[],N=[];try{if([E,k]=await Fi(g),(g==null?void 0:g.externalData)&&v.mountExternalData){let Me=[];for(let Ie of g.externalData){let tt=typeof Ie=="string"?Ie:Ie.path;Me.push(Pr(typeof Ie=="string"?Ie:Ie.data).then(st=>{v.mountExternalData(tt,st)}))}await Promise.all(Me)}for(let Me of(g==null?void 0:g.executionProviders)??[])if((typeof Me=="string"?Me:Me.name)==="webnn"){if(v.shouldTransferToMLTensor=!1,typeof Me!="string"){let Ie=Me,tt=Ie==null?void 0:Ie.context,st=Ie==null?void 0:Ie.gpuDevice,pt=Ie==null?void 0:Ie.deviceType,Vr=Ie==null?void 0:Ie.powerPreference;tt?v.currentContext=tt:st?v.currentContext=await v.webnnCreateMLContext(st):v.currentContext=await v.webnnCreateMLContext({deviceType:pt,powerPreference:Vr})}else v.currentContext=await v.webnnCreateMLContext();break}A=await v._OrtCreateSession(b,T,E),(q=v.webgpuOnCreateSession)==null||q.call(v,A),A===0&&ie("Can't create a session."),(U=v.jsepOnCreateSession)==null||U.call(v),v.currentContext&&(v.webnnRegisterMLContext(A,v.currentContext),v.currentContext=void 0,v.shouldTransferToMLTensor=!0);let[Z,C]=ri(A),W=!!(g!=null&&g.enableGraphCapture),Pe=[],ge=[],fe=[],Ae=[],J=[];for(let Me=0;Me<Z;Me++){let[Ie,tt,st]=ii(A,Me);Ie===0&&ie("Can't get an input name."),O.push(Ie);let pt=v.UTF8ToString(Ie);Pe.push(pt),fe.push(tt===0?{name:pt,isTensor:!1}:{name:pt,isTensor:!0,type:vt(tt),shape:st})}for(let Me=0;Me<C;Me++){let[Ie,tt,st]=ii(A,Me+Z);Ie===0&&ie("Can't get an output name."),N.push(Ie);let pt=v.UTF8ToString(Ie);ge.push(pt),Ae.push(tt===0?{name:pt,isTensor:!1}:{name:pt,isTensor:!0,type:vt(tt),shape:st})}return Gt.set(A,[A,O,N,null,W,!1]),[A,Pe,ge,fe,Ae]}catch(Z){throw O.forEach(C=>v._OrtFree(C)),N.forEach(C=>v._OrtFree(C)),A!==0&&v._OrtReleaseSession(A)!==0&&ie("Can't release session."),Z}finally{v._free(b),E!==0&&v._OrtReleaseSessionOptions(E)!==0&&ie("Can't release session options."),k.forEach(Z=>v._free(Z)),(M=v.unmountExternalData)==null||M.call(v)}},ai=c=>{var O,N,q;let g=le(),b=Gt.get(c);if(!b)throw new Error(`cannot release session. invalid session id: ${c}`);let[T,v,A,E,k]=b;E&&(k&&g._OrtClearBoundOutputs(E.handle)!==0&&ie("Can't clear bound outputs."),g._OrtReleaseBinding(E.handle)!==0&&ie("Can't release IO binding.")),(O=g.jsepOnReleaseSession)==null||O.call(g,c),(N=g.webnnOnReleaseSession)==null||N.call(g,c),(q=g.webgpuOnReleaseSession)==null||q.call(g,c),v.forEach(U=>g._OrtFree(U)),A.forEach(U=>g._OrtFree(U)),g._OrtReleaseSession(T)!==0&&ie("Can't release session."),Gt.delete(c)},jt=async(c,g,b,T,v,A,E=!1)=>{if(!c){g.push(0);return}let k=le(),O=k.PTR_SIZE,N=c[0],q=c[1],U=c[3],M=U,Z,C;if(N==="string"&&(U==="gpu-buffer"||U==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(E&&U!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${A} when enableGraphCapture is true.`);if(U==="gpu-buffer"){let ge=c[2].gpuBuffer;C=xt($t(N),q);{let fe=k.jsepRegisterBuffer;if(!fe)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');Z=fe(T,A,ge,C)}}else if(U==="ml-tensor"){let ge=c[2].mlTensor;C=xt($t(N),q);let fe=k.webnnRegisterMLTensor;if(!fe)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');Z=fe(T,ge,$t(N),q)}else{let ge=c[2];if(Array.isArray(ge)){C=O*ge.length,Z=k._malloc(C),b.push(Z);for(let fe=0;fe<ge.length;fe++){if(typeof ge[fe]!="string")throw new TypeError(`tensor data at index ${fe} is not a string`);k.setValue(Z+fe*O,We(ge[fe],b),"*")}}else{let fe=k.webnnIsGraphInput,Ae=k.webnnIsGraphOutput;if(N!=="string"&&fe&&Ae){let J=k.UTF8ToString(v);if(fe(T,J)||Ae(T,J)){let Me=$t(N);C=xt(Me,q),M="ml-tensor";let Ie=k.webnnCreateTemporaryTensor,tt=k.webnnUploadTensor;if(!Ie||!tt)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let st=await Ie(T,Me,q);tt(st,new Uint8Array(ge.buffer,ge.byteOffset,ge.byteLength)),Z=st}else C=ge.byteLength,Z=k._malloc(C),b.push(Z),k.HEAPU8.set(new Uint8Array(ge.buffer,ge.byteOffset,C),Z)}else C=ge.byteLength,Z=k._malloc(C),b.push(Z),k.HEAPU8.set(new Uint8Array(ge.buffer,ge.byteOffset,C),Z)}}let W=k.stackSave(),Pe=k.stackAlloc(4*q.length);try{q.forEach((fe,Ae)=>k.setValue(Pe+Ae*O,fe,O===4?"i32":"i64"));let ge=k._OrtCreateTensor($t(N),Z,C,Pe,q.length,Jr(M));ge===0&&ie(`Can't create tensor for input/output. session=${T}, index=${A}.`),g.push(ge)}finally{k.stackRestore(W)}},D=async(c,g,b,T,v,A)=>{var ct,ea,ta;let E=le(),k=E.PTR_SIZE,O=Gt.get(c);if(!O)throw new Error(`cannot run inference. invalid session id: ${c}`);let N=O[0],q=O[1],U=O[2],M=O[3],Z=O[4];O[5];let C=g.length,W=T.length,Pe=0,ge=[],fe=[],Ae=[],J=[],Me=[],Ie=E.stackSave(),tt=E.stackAlloc(C*k),st=E.stackAlloc(C*k),pt=E.stackAlloc(W*k),Vr=E.stackAlloc(W*k);try{[Pe,ge]=Ui(A),lt("wasm prepareInputOutputTensor");for(let Se=0;Se<C;Se++)await jt(b[Se],fe,J,c,q[g[Se]],g[Se],Z);for(let Se=0;Se<W;Se++)await jt(v[Se],Ae,J,c,U[T[Se]],C+T[Se],Z);dt("wasm prepareInputOutputTensor");for(let Se=0;Se<C;Se++)E.setValue(tt+Se*k,fe[Se],"*"),E.setValue(st+Se*k,q[g[Se]],"*");for(let Se=0;Se<W;Se++)E.setValue(pt+Se*k,Ae[Se],"*"),E.setValue(Vr+Se*k,U[T[Se]],"*");(ct=E.jsepOnRunStart)==null||ct.call(E,N),(ea=E.webnnOnRunStart)==null||ea.call(E,N);let rt;rt=await E._OrtRun(N,st,tt,C,Vr,W,pt,Pe),rt!==0&&ie("failed to call OrtRun().");let It=[],ra=[];lt("wasm ProcessOutputTensor");for(let Se=0;Se<W;Se++){let Et=Number(E.getValue(pt+Se*k,"*"));if(Et===Ae[Se]||Me.includes(Ae[Se])){It.push(v[Se]),Et!==Ae[Se]&&E._OrtReleaseTensor(Et)!==0&&ie("Can't release tensor.");continue}let va=E.stackSave(),Pt=E.stackAlloc(4*k),qr=!1,Ke,ht=0;try{E._OrtGetTensorData(Et,Pt,Pt+k,Pt+2*k,Pt+3*k)!==0&&ie(`Can't access output tensor data on index ${Se}.`);let mi=k===4?"i32":"i64",ft=Number(E.getValue(Pt,mi));ht=E.getValue(Pt+k,"*");let ia=E.getValue(Pt+k*2,"*"),xa=Number(E.getValue(Pt+k*3,mi)),Ut=[];for(let Ze=0;Ze<xa;Ze++)Ut.push(Number(E.getValue(ia+Ze*k,mi)));E._OrtFree(ia)!==0&&ie("Can't free memory for tensor dims.");let Nt=Ut.reduce((Ze,qe)=>Ze*qe,1);Ke=vt(ft);let lr=M==null?void 0:M.outputPreferredLocations[T[Se]];if(Ke==="string"){if(lr==="gpu-buffer"||lr==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ze=[];for(let qe=0;qe<Nt;qe++){let zt=E.getValue(ht+qe*k,"*"),Sa=E.getValue(ht+(qe+1)*k,"*"),Ta=qe===Nt-1?void 0:Sa-zt;Ze.push(E.UTF8ToString(zt,Ta))}It.push([Ke,Ut,Ze,"cpu"])}else if(lr==="gpu-buffer"&&Nt>0){let Ze=E.jsepGetBuffer;if(!Ze)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let qe=Ze(ht),zt=xt(ft,Nt);if(zt===void 0||!Mr(Ke))throw new Error(`Unsupported data type: ${Ke}`);qr=!0,It.push([Ke,Ut,{gpuBuffer:qe,download:E.jsepCreateDownloader(qe,zt,Ke),dispose:()=>{E._OrtReleaseTensor(Et)!==0&&ie("Can't release tensor.")}},"gpu-buffer"])}else if(lr==="ml-tensor"&&Nt>0){let Ze=E.webnnEnsureTensor,qe=E.webnnIsGraphInputOutputTypeSupported;if(!Ze||!qe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(xt(ft,Nt)===void 0||!Dr(Ke))throw new Error(`Unsupported data type: ${Ke}`);if(!qe(c,Ke,!1))throw new Error(`preferredLocation "ml-tensor" for ${Ke} output is not supported by current WebNN Context.`);let zt=await Ze(c,ht,ft,Ut,!1);qr=!0,It.push([Ke,Ut,{mlTensor:zt,download:E.webnnCreateMLTensorDownloader(ht,Ke),dispose:()=>{E.webnnReleaseTensorId(ht),E._OrtReleaseTensor(Et)}},"ml-tensor"])}else if(lr==="ml-tensor-cpu-output"&&Nt>0){let Ze=E.webnnCreateMLTensorDownloader(ht,Ke)(),qe=It.length;qr=!0,ra.push((async()=>{let zt=[qe,await Ze];return E.webnnReleaseTensorId(ht),E._OrtReleaseTensor(Et),zt})()),It.push([Ke,Ut,[],"cpu"])}else{let Ze=Rr(Ke),qe=new Ze(Nt);new Uint8Array(qe.buffer,qe.byteOffset,qe.byteLength).set(E.HEAPU8.subarray(ht,ht+qe.byteLength)),It.push([Ke,Ut,qe,"cpu"])}}finally{E.stackRestore(va),Ke==="string"&&ht&&E._free(ht),qr||E._OrtReleaseTensor(Et)}}M&&!Z&&(E._OrtClearBoundOutputs(M.handle)!==0&&ie("Can't clear bound outputs."),Gt.set(c,[N,q,U,M,Z,!1]));for(let[Se,Et]of await Promise.all(ra))It[Se][2]=Et;return dt("wasm ProcessOutputTensor"),It}finally{(ta=E.webnnOnRunEnd)==null||ta.call(E,N),E.stackRestore(Ie),fe.forEach(rt=>E._OrtReleaseTensor(rt)),Ae.forEach(rt=>E._OrtReleaseTensor(rt)),J.forEach(rt=>E._free(rt)),Pe!==0&&E._OrtReleaseRunOptions(Pe),ge.forEach(rt=>E._free(rt))}},nr=c=>{let g=le(),b=Gt.get(c);if(!b)throw new Error("invalid session id");let T=b[0],v=g._OrtEndProfiling(T);v===0&&ie("Can't get an profile file name."),g._OrtFree(v)},ni=c=>{let g=[];for(let b of c){let T=b[2];!Array.isArray(T)&&"buffer"in T&&g.push(T.buffer)}return g}}),Mt,te,Ht,sr,tr,or,Ur,Nr,Dt,Kt,si,oi,ui,Hi,Ki,ba,ur,Zi,Qi=z(()=>{Ye(),ji(),bt(),Ir(),Mt=()=>!!Y.wasm.proxy&&typeof document<"u",Ht=!1,sr=!1,tr=!1,Nr=new Map,Dt=(c,g)=>{let b=Nr.get(c);b?b.push(g):Nr.set(c,[g])},Kt=()=>{if(Ht||!sr||tr||!te)throw new Error("worker not ready")},si=c=>{switch(c.data.type){case"init-wasm":Ht=!1,c.data.err?(tr=!0,Ur[1](c.data.err)):(sr=!0,Ur[0]()),or&&(URL.revokeObjectURL(or),or=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let g=Nr.get(c.data.type);c.data.err?g.shift()[1](c.data.err):g.shift()[0](c.data.out);break}}},oi=async()=>{if(!sr){if(Ht)throw new Error("multiple calls to 'initWasm()' detected.");if(tr)throw new Error("previous call to 'initWasm()' failed.");if(Ht=!0,Mt())return new Promise((c,g)=>{te==null||te.terminate(),Ri().then(([b,T])=>{try{te=T,te.onerror=A=>g(A),te.onmessage=si,Ur=[c,g];let v={type:"init-wasm",in:Y};if(!v.in.wasm.wasmPaths&&b){let A=Sr();A&&(v.in.wasm.wasmPaths=A)}te.postMessage(v),or=b}catch(v){g(v)}},g)});try{await Ar(Y.wasm),await ei(Y),sr=!0}catch(c){throw tr=!0,c}finally{Ht=!1}}},ui=async c=>{if(Mt())return Kt(),new Promise((g,b)=>{Dt("init-ep",[g,b]);let T={type:"init-ep",in:{epName:c,env:Y}};te.postMessage(T)});await ti(Y,c)},Hi=async c=>Mt()?(Kt(),new Promise((g,b)=>{Dt("copy-from",[g,b]);let T={type:"copy-from",in:{buffer:c}};te.postMessage(T,[c.buffer])})):xe(c),Ki=async(c,g)=>{if(Mt()){if(g!=null&&g.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Kt(),new Promise((b,T)=>{Dt("create",[b,T]);let v={type:"create",in:{model:c,options:{...g}}},A=[];c instanceof Uint8Array&&A.push(c.buffer),te.postMessage(v,A)})}else return Tt(c,g)},ba=async c=>{if(Mt())return Kt(),new Promise((g,b)=>{Dt("release",[g,b]);let T={type:"release",in:c};te.postMessage(T)});ai(c)},ur=async(c,g,b,T,v,A)=>{if(Mt()){if(b.some(E=>E[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(v.some(E=>E))throw new Error("pre-allocated output tensor is not supported for proxy.");return Kt(),new Promise((E,k)=>{Dt("run",[E,k]);let O=b,N={type:"run",in:{sessionId:c,inputIndices:g,inputs:O,outputIndices:T,options:A}};te.postMessage(N,ni(O))})}else return D(c,g,b,T,v,A)},Zi=async c=>{if(Mt())return Kt(),new Promise((g,b)=>{Dt("end-profiling",[g,b]);let T={type:"end-profiling",in:c};te.postMessage(T)});nr(c)}}),Xi,li,di,pi=z(()=>{Ye(),Qi(),oe(),$r(),Wi(),Xi=(c,g)=>{switch(c.location){case"cpu":return[c.type,c.dims,c.data,"cpu"];case"gpu-buffer":return[c.type,c.dims,{gpuBuffer:c.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[c.type,c.dims,{mlTensor:c.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${c.location} for ${g()}`)}},li=c=>{switch(c[3]){case"cpu":return new Fe(c[0],c[2],c[1]);case"gpu-buffer":{let g=c[0];if(!Mr(g))throw new Error(`not supported data type: ${g} for deserializing GPU tensor`);let{gpuBuffer:b,download:T,dispose:v}=c[2];return Fe.fromGpuBuffer(b,{dataType:g,dims:c[1],download:T,dispose:v})}case"ml-tensor":{let g=c[0];if(!Dr(g))throw new Error(`not supported data type: ${g} for deserializing MLTensor tensor`);let{mlTensor:b,download:T,dispose:v}=c[2];return Fe.fromMLTensor(b,{dataType:g,dims:c[1],download:T,dispose:v})}default:throw new Error(`invalid data location: ${c[3]}`)}},di=class{async fetchModelAndCopyToWasmMemory(c){return Hi(await Pr(c))}async loadModel(c,g){et();let b;typeof c=="string"?b=await this.fetchModelAndCopyToWasmMemory(c):b=c,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Ki(b,g),Xe()}async dispose(){return ba(this.sessionId)}async run(c,g,b){et();let T=[],v=[];Object.entries(c).forEach(U=>{let M=U[0],Z=U[1],C=this.inputNames.indexOf(M);if(C===-1)throw new Error(`invalid input '${M}'`);T.push(Z),v.push(C)});let A=[],E=[];Object.entries(g).forEach(U=>{let M=U[0],Z=U[1],C=this.outputNames.indexOf(M);if(C===-1)throw new Error(`invalid output '${M}'`);A.push(Z),E.push(C)});let k=T.map((U,M)=>Xi(U,()=>`input "${this.inputNames[v[M]]}"`)),O=A.map((U,M)=>U?Xi(U,()=>`output "${this.outputNames[E[M]]}"`):null),N=await ur(this.sessionId,v,k,E,O,b),q={};for(let U=0;U<N.length;U++)q[this.outputNames[E[U]]]=A[U]??li(N[U]);return Xe(),q}startProfiling(){}endProfiling(){Zi(this.sessionId)}}}),Lr={};be(Lr,{OnnxruntimeWebAssemblyBackend:()=>hi,initializeFlags:()=>ci,wasmBackend:()=>fi});var ci,hi,fi,Yi=z(()=>{Ye(),Qi(),pi(),ci=()=>{(typeof Y.wasm.initTimeout!="number"||Y.wasm.initTimeout<0)&&(Y.wasm.initTimeout=0);let c=Y.wasm.simd;if(typeof c!="boolean"&&c!==void 0&&c!=="fixed"&&c!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${c}". Reset it to \`false\` and ignore SIMD feature checking.`),Y.wasm.simd=!1),typeof Y.wasm.proxy!="boolean"&&(Y.wasm.proxy=!1),typeof Y.wasm.trace!="boolean"&&(Y.wasm.trace=!1),typeof Y.wasm.numThreads!="number"||!Number.isInteger(Y.wasm.numThreads)||Y.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Y.wasm.numThreads=1;else{let g=typeof navigator>"u"?ce("node:os").cpus().length:navigator.hardwareConcurrency;Y.wasm.numThreads=Math.min(4,Math.ceil((g||1)/2))}},hi=class{async init(c){ci(),await oi(),await ui(c)}async createInferenceSessionHandler(c,g){let b=new di;return await b.loadModel(c,g),b}},fi=new hi}),Ji={};be(Ji,{InferenceSession:()=>br,TRACE:()=>Wt,TRACE_EVENT_BEGIN:()=>lt,TRACE_EVENT_END:()=>dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Fe,default:()=>en,env:()=>Y,registerBackend:()=>we}),Ye(),Ye(),Ye();var $a="1.24.3",en=Ti;{let c=(Yi(),Ve(Lr)).wasmBackend;we("cpu",c,10),we("wasm",c,10)}return Object.defineProperty(Y.versions,"web",{value:$a,enumerable:!0}),Ve(Ji)})();L.exports=re})(ic);var wh=ic.exports;(function(L){var ee=mt&&mt.__createBinding||(Object.create?function(Te,Ee,he,ue){ue===void 0&&(ue=he);var Le=Object.getOwnPropertyDescriptor(Ee,he);(!Le||("get"in Le?!Ee.__esModule:Le.writable||Le.configurable))&&(Le={enumerable:!0,get:function(){return Ee[he]}}),Object.defineProperty(Te,ue,Le)}:function(Te,Ee,he,ue){ue===void 0&&(ue=he),Te[ue]=Ee[he]}),re=mt&&mt.__setModuleDefault||(Object.create?function(Te,Ee){Object.defineProperty(Te,"default",{enumerable:!0,value:Ee})}:function(Te,Ee){Te.default=Ee}),K=mt&&mt.__importStar||function(Te){if(Te&&Te.__esModule)return Te;var Ee={};if(Te!=null)for(var he in Te)he!=="default"&&Object.prototype.hasOwnProperty.call(Te,he)&&ee(Ee,Te,he);return re(Ee,Te),Ee};Object.defineProperty(L,"__esModule",{value:!0}),L.MicVAD=L.getDefaultRealTimeVADOptions=L.ort=L.DEFAULT_MODEL=void 0;const ne=K(wh),pe=yi,ye=Xt,ce=fr,z=Yr,be=ss,Je=_a;L.DEFAULT_MODEL="legacy",L.ort=ne;const Ve="vad.worklet.bundle.min.js",ve="silero_vad_v5.onnx",$e="silero_vad_legacy.onnx",we=Te=>({...ye.defaultFrameProcessorOptions,onFrameProcessed:()=>{},onVADMisfire:()=>{ce.log.debug("VAD misfire")},onSpeechStart:()=>{ce.log.debug("Detected speech start")},onSpeechEnd:()=>{ce.log.debug("Detected speech end")},onSpeechRealStart:()=>{ce.log.debug("Detected real speech start")},baseAssetPath:"./",onnxWASMBasePath:"./",model:Te,workletOptions:{},getStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),pauseStream:async Ee=>{Ee.getTracks().forEach(he=>{he.stop()})},resumeStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),ortConfig:Ee=>{Ee.env.logLevel="error"},startOnLoad:!0,processorType:"auto"});L.getDefaultRealTimeVADOptions=we;const De=Te=>"audioWorklet"in Te&&typeof AudioWorkletNode=="function"?"AudioWorklet":"ScriptProcessor";async function He(Te,Ee,he,ue,Le){await he.audioWorklet.addModule(Te),Ee.processorOptions={...Ee.processorOptions??{},frameSamples:ue};const Y=new AudioWorkletNode(he,"vad-helper-worklet",Ee);return Y.port.onmessage=async ot=>{const je=ot.data;if(!(typeof je=="object"&&je&&"message"in je)){console.error("Invalid message event",je);return}switch(je.message){case z.Message.AudioFrame:{if(!("data"in je&&je.data instanceof ArrayBuffer)){console.log("Audio frame message has no data");return}const gt=new Float32Array(je.data);await Le(gt);break}}},Y}async function wt(Te,Ee,he){const ue=new Je.Resampler({nativeSampleRate:Te.sampleRate,targetSampleRate:16e3,targetFrameSize:Ee});ce.log.debug("using script processor");const Y=Te.createScriptProcessor(4096,1,1);let ot=!1;return Y.onaudioprocess=async je=>{if(!ot){ot=!0;try{const gt=je.inputBuffer.getChannelData(0);je.outputBuffer.getChannelData(0).fill(0);const ut=ue.process(gt);for(const _t of ut)await he(_t)}catch(gt){console.error("Error processing audio:",gt)}finally{ot=!1}}},Y.connect(Te.destination),Y}class At{constructor(Ee,he,ue,Le,Y=!1,ot=null,je=null,gt=null,ar=null,ut=null,_t=null,mr="uninitialized",gr=!1){this.options=Ee,this.frameProcessor=he,this.model=ue,this.frameSamples=Le,this.listening=Y,this.errored=ot,this._stream=je,this._audioContext=gt,this._vadNode=ar,this._mediaStreamAudioSourceNode=ut,this._audioProcessorAdapterType=_t,this.initializationState=mr,this.ownsAudioContext=gr,this.getAudioInstances=()=>{if(this._stream===null||this._audioContext===null||this._vadNode==null||this._mediaStreamAudioSourceNode==null)throw new Error("MicVAD has null stream, audio context, or processor adapter");return{stream:this._stream,audioContext:this._audioContext,vadNode:this._vadNode,mediaStreamAudioSourceNode:this._mediaStreamAudioSourceNode}},this.setErrored=Oe=>{this.initializationState="errored",this.errored=Oe},this.start=async()=>{switch(this.initializationState){case"uninitialized":{ce.log.debug("initializing micVAD"),this.initializationState="initializing",this.frameProcessor.resume();try{this._stream=await this.options.getStream()}catch(Oe){throw Oe instanceof Error?this.setErrored(Oe.message):this.setErrored(String(Oe)),Oe}if(this.options.audioContext?(console.log("using custom audio context"),this._audioContext=this.options.audioContext):(console.log("using default audio context"),this._audioContext=new AudioContext,this.ownsAudioContext=!0),!this._audioContext)throw this.setErrored("Audio context is null"),Error("Audio context is null");switch(this._audioProcessorAdapterType=this.options.processorType=="auto"?De(this._audioContext):this.options.processorType,this._audioProcessorAdapterType){case"AudioWorklet":this._vadNode=await He(this.options.baseAssetPath+Ve,this.options.workletOptions,this._audioContext,this.frameSamples,this.processFrame);break;case"ScriptProcessor":this._vadNode=await wt(this._audioContext,this.frameSamples,this.processFrame);break;default:throw new Error(`Unsupported audio processor adapter type: ${this._audioProcessorAdapterType}`)}this._mediaStreamAudioSourceNode=new MediaStreamAudioSourceNode(this._audioContext,{mediaStream:this._stream}),this._mediaStreamAudioSourceNode.connect(this._vadNode),ce.log.debug("started micVAD"),this.listening=!0,this.initializationState="initialized";break}case"initializing":{ce.log.warn("start called while initializing");break}case"initialized":{if(this.listening)return;this.listening=!0,this.frameProcessor.resume();const{stream:Oe,audioContext:kt,vadNode:wi}=this.getAudioInstances();this._stream=await this.options.resumeStream(Oe);const it=new MediaStreamAudioSourceNode(kt,{mediaStream:this._stream});this._mediaStreamAudioSourceNode=it,it.connect(wi);break}case"destroyed":{ce.log.warn("start called after destroyed");break}case"errored":{ce.log.error("start called after errored");break}default:{ce.log.warn("weird initialization state");break}}},this.pause=async()=>{if(!this.listening)return;this.listening=!1;const{stream:Oe,mediaStreamAudioSourceNode:kt}=this.getAudioInstances();await this.options.pauseStream(Oe),kt.disconnect(),this.frameProcessor.pause(this.handleFrameProcessorEvent)},this.destroy=async()=>{var kt;ce.log.debug("destroy called"),this.initializationState="destroyed";const{vadNode:Oe}=this.getAudioInstances();Oe instanceof AudioWorkletNode&&Oe.port.postMessage(z.Message.SpeechStop),this.listening&&await this.pause(),await this.model.release(),this.ownsAudioContext&&await((kt=this._audioContext)==null?void 0:kt.close())},this.setOptions=Oe=>{this.frameProcessor.setOptions(Oe)},this.processFrame=async Oe=>{await this.frameProcessor.process(Oe,this.handleFrameProcessorEvent)},this.handleFrameProcessorEvent=Oe=>{switch(Oe.msg){case z.Message.FrameProcessed:this.options.onFrameProcessed(Oe.probs,Oe.frame);break;case z.Message.SpeechStart:this.options.onSpeechStart();break;case z.Message.SpeechRealStart:this.options.onSpeechRealStart();break;case z.Message.VADMisfire:this.options.onVADMisfire();break;case z.Message.SpeechEnd:this.options.onSpeechEnd(Oe.audio);break}}}static async new(Ee={}){const he={...(0,L.getDefaultRealTimeVADOptions)(Ee.model??L.DEFAULT_MODEL),...Ee};(0,ye.validateOptions)(he),L.ort.env.wasm.wasmPaths=he.onnxWASMBasePath,he.ortConfig!==void 0&&he.ortConfig(L.ort);const ue=he.model==="v5"?ve:$e,Le=he.baseAssetPath+ue,Y=he.model==="v5"?be.SileroV5.new:be.SileroLegacy.new;let ot;try{ot=await Y(L.ort,()=>(0,pe.defaultModelFetcher)(Le))}catch(_t){throw console.error(`Encountered an error while loading model file ${Le}`),_t}const je=he.model==="v5"?512:1536,gt=je/16,ar=new ye.FrameProcessor(ot.process,ot.reset_state,{positiveSpeechThreshold:he.positiveSpeechThreshold,negativeSpeechThreshold:he.negativeSpeechThreshold,redemptionMs:he.redemptionMs,preSpeechPadMs:he.preSpeechPadMs,minSpeechMs:he.minSpeechMs,submitUserSpeechOnPause:he.submitUserSpeechOnPause},gt),ut=new At(he,ar,ot,je);if(he.startOnLoad)try{await ut.start()}catch(_t){throw console.error("Error starting micVad",_t),_t}return ut}}L.MicVAD=At})(rc);(function(L){Object.defineProperty(L,"__esModule",{value:!0}),L.getDefaultRealTimeVADOptions=L.MicVAD=L.DEFAULT_MODEL=L.utils=L.NonRealTimeVAD=L.Message=L.FrameProcessor=L.defaultModelFetcher=L.baseAssetPath=void 0;var ee=wa;Object.defineProperty(L,"baseAssetPath",{enumerable:!0,get:function(){return ee.baseAssetPath}});var re=yi;Object.defineProperty(L,"defaultModelFetcher",{enumerable:!0,get:function(){return re.defaultModelFetcher}});var K=Xt;Object.defineProperty(L,"FrameProcessor",{enumerable:!0,get:function(){return K.FrameProcessor}});var ne=Yr;Object.defineProperty(L,"Message",{enumerable:!0,get:function(){return ne.Message}});var pe=Kp;Object.defineProperty(L,"NonRealTimeVAD",{enumerable:!0,get:function(){return pe.NonRealTimeVAD}});const ye=Qt;L.utils={audioFileToArray:ye.audioFileToArray,minFramesForTargetMS:ye.minFramesForTargetMS,arrayBufferToBase64:ye.arrayBufferToBase64,encodeWAV:ye.encodeWAV};var ce=rc;Object.defineProperty(L,"DEFAULT_MODEL",{enumerable:!0,get:function(){return ce.DEFAULT_MODEL}}),Object.defineProperty(L,"MicVAD",{enumerable:!0,get:function(){return ce.MicVAD}}),Object.defineProperty(L,"getDefaultRealTimeVADOptions",{enumerable:!0,get:function(){return ce.getDefaultRealTimeVADOptions}})})(ns);const _h=ih(ns),$h=ah({__proto__:null,default:_h},[ns]);export{$h as i};
