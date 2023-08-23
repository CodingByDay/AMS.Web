!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Parchment=e():t.Parchment=e()}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")(),(function(){return(()=>{"use strict";var t,e={d:(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},s={};e.r(s),e.d(s,{Attributor:()=>f,AttributorStore:()=>A,BlockBlot:()=>T,ClassAttributor:()=>b,ContainerBlot:()=>u,EmbedBlot:()=>B,InlineBlot:()=>E,LeafBlot:()=>p,ParentBlot:()=>c,Registry:()=>o,Scope:()=>i,ScrollBlot:()=>w,StyleAttributor:()=>y,TextBlot:()=>I}),function(t){t[t.TYPE=3]="TYPE",t[t.LEVEL=12]="LEVEL",t[t.ATTRIBUTE=13]="ATTRIBUTE",t[t.BLOT=14]="BLOT",t[t.INLINE=7]="INLINE",t[t.BLOCK=11]="BLOCK",t[t.BLOCK_BLOT=10]="BLOCK_BLOT",t[t.INLINE_BLOT=6]="INLINE_BLOT",t[t.BLOCK_ATTRIBUTE=9]="BLOCK_ATTRIBUTE",t[t.INLINE_ATTRIBUTE=5]="INLINE_ATTRIBUTE",t[t.ANY=15]="ANY"}(t||(t={}));const i=t;class r extends Error{constructor(t){super(t="[Parchment] "+t),this.message=t,this.name=this.constructor.name}}class o{constructor(){this.attributes={},this.classes={},this.tags={},this.types={}}static find(t,e=!1){if(null==t)return null;if(this.blots.has(t))return this.blots.get(t)||null;if(e){let s=null;try{s=t.parentNode}catch(t){return null}return this.find(s,e)}return null}create(t,e,s){const i=this.query(e);if(null==i)throw new r(`Unable to create ${e} blot`);const n=i,a=e instanceof Node||e.nodeType===Node.TEXT_NODE?e:n.create(s),l=new n(t,a,s);return o.blots.set(l.domNode,l),l}find(t,e=!1){return o.find(t,e)}query(t,e=i.ANY){let s;return"string"==typeof t?s=this.types[t]||this.attributes[t]:t instanceof Text||t.nodeType===Node.TEXT_NODE?s=this.types.text:"number"==typeof t?t&i.LEVEL&i.BLOCK?s=this.types.block:t&i.LEVEL&i.INLINE&&(s=this.types.inline):t instanceof Element&&((t.getAttribute("class")||"").split(/\s+/).some((t=>(s=this.classes[t],!!s))),s=s||this.tags[t.tagName]),null==s?null:e&i.LEVEL&s.scope&&e&i.TYPE&s.scope?s:null}register(...t){if(t.length>1)return t.map((t=>this.register(t)));const e=t[0];if("string"!=typeof e.blotName&&"string"!=typeof e.attrName)throw new r("Invalid definition");if("abstract"===e.blotName)throw new r("Cannot register abstract class");return this.types[e.blotName||e.attrName]=e,"string"==typeof e.keyName?this.attributes[e.keyName]=e:(null!=e.className&&(this.classes[e.className]=e),null!=e.tagName&&(Array.isArray(e.tagName)?e.tagName=e.tagName.map((t=>t.toUpperCase())):e.tagName=e.tagName.toUpperCase(),(Array.isArray(e.tagName)?e.tagName:[e.tagName]).forEach((t=>{null!=this.tags[t]&&null!=e.className||(this.tags[t]=e)})))),e}}o.blots=new WeakMap;class n{constructor(t,e){this.scroll=t,this.domNode=e,o.blots.set(e,this),this.prev=null,this.next=null}static create(t){if(null==this.tagName)throw new r("Blot definition missing tagName");let e;return Array.isArray(this.tagName)?("string"==typeof t&&(t=t.toUpperCase(),parseInt(t,10).toString()===t&&(t=parseInt(t,10))),e="number"==typeof t?document.createElement(this.tagName[t-1]):this.tagName.indexOf(t)>-1?document.createElement(t):document.createElement(this.tagName[0])):e=document.createElement(this.tagName),this.className&&e.classList.add(this.className),e}get statics(){return this.constructor}attach(){}clone(){const t=this.domNode.cloneNode(!1);return this.scroll.create(t)}detach(){null!=this.parent&&this.parent.removeChild(this),o.blots.delete(this.domNode)}deleteAt(t,e){this.isolate(t,e).remove()}formatAt(t,e,s,r){const o=this.isolate(t,e);if(null!=this.scroll.query(s,i.BLOT)&&r)o.wrap(s,r);else if(null!=this.scroll.query(s,i.ATTRIBUTE)){const t=this.scroll.create(this.statics.scope);o.wrap(t),t.format(s,r)}}insertAt(t,e,s){const i=null==s?this.scroll.create("text",e):this.scroll.create(e,s),r=this.split(t);this.parent.insertBefore(i,r||void 0)}isolate(t,e){const s=this.split(t);if(null==s)throw new Error("Attempt to isolate at end");return s.split(e),s}length(){return 1}offset(t=this.parent){return null==this.parent||this===t?0:this.parent.children.offset(this)+this.parent.offset(t)}optimize(t){!this.statics.requiredContainer||this.parent instanceof this.statics.requiredContainer||this.wrap(this.statics.requiredContainer.blotName)}remove(){null!=this.domNode.parentNode&&this.domNode.parentNode.removeChild(this.domNode),this.detach()}replaceWith(t,e){const s="string"==typeof t?this.scroll.create(t,e):t;return null!=this.parent&&(this.parent.insertBefore(s,this.next||void 0),this.remove()),s}split(t,e){return 0===t?this:this.next}update(t,e){}wrap(t,e){const s="string"==typeof t?this.scroll.create(t,e):t;if(null!=this.parent&&this.parent.insertBefore(s,this.next||void 0),"function"!=typeof s.appendChild)throw new r(`Cannot wrap ${t}`);return s.appendChild(this),s}}n.blotName="abstract";const a=n;function l(t,e){let s=e.find(t);if(null==s)try{s=e.create(t)}catch(r){s=e.create(i.INLINE),Array.from(t.childNodes).forEach((t=>{s.domNode.appendChild(t)})),t.parentNode&&t.parentNode.replaceChild(s.domNode,t),s.attach()}return s}class h extends a{constructor(t,e){super(t,e),this.uiNode=null,this.build()}appendChild(t){this.insertBefore(t)}attach(){super.attach(),this.children.forEach((t=>{t.attach()}))}attachUI(t){null!=this.uiNode&&this.uiNode.remove(),this.uiNode=t,h.uiClass&&this.uiNode.classList.add(h.uiClass),this.uiNode.setAttribute("contenteditable","false"),this.domNode.insertBefore(this.uiNode,this.domNode.firstChild)}build(){this.children=new class{constructor(){this.head=null,this.tail=null,this.length=0}append(...t){if(this.insertBefore(t[0],null),t.length>1){const e=t.slice(1);this.append(...e)}}at(t){const e=this.iterator();let s=e();for(;s&&t>0;)t-=1,s=e();return s}contains(t){const e=this.iterator();let s=e();for(;s;){if(s===t)return!0;s=e()}return!1}indexOf(t){const e=this.iterator();let s=e(),i=0;for(;s;){if(s===t)return i;i+=1,s=e()}return-1}insertBefore(t,e){null!=t&&(this.remove(t),t.next=e,null!=e?(t.prev=e.prev,null!=e.prev&&(e.prev.next=t),e.prev=t,e===this.head&&(this.head=t)):null!=this.tail?(this.tail.next=t,t.prev=this.tail,this.tail=t):(t.prev=null,this.head=this.tail=t),this.length+=1)}offset(t){let e=0,s=this.head;for(;null!=s;){if(s===t)return e;e+=s.length(),s=s.next}return-1}remove(t){this.contains(t)&&(null!=t.prev&&(t.prev.next=t.next),null!=t.next&&(t.next.prev=t.prev),t===this.head&&(this.head=t.next),t===this.tail&&(this.tail=t.prev),this.length-=1)}iterator(t=this.head){return()=>{const e=t;return null!=t&&(t=t.next),e}}find(t,e=!1){const s=this.iterator();let i=s();for(;i;){const r=i.length();if(t<r||e&&t===r&&(null==i.next||0!==i.next.length()))return[i,t];t-=r,i=s()}return[null,0]}forEach(t){const e=this.iterator();let s=e();for(;s;)t(s),s=e()}forEachAt(t,e,s){if(e<=0)return;const[i,r]=this.find(t);let o=t-r;const n=this.iterator(i);let a=n();for(;a&&o<t+e;){const i=a.length();t>o?s(a,t-o,Math.min(e,o+i-t)):s(a,0,Math.min(i,t+e-o)),o+=i,a=n()}}map(t){return this.reduce(((e,s)=>(e.push(t(s)),e)),[])}reduce(t,e){const s=this.iterator();let i=s();for(;i;)e=t(e,i),i=s();return e}},Array.from(this.domNode.childNodes).filter((t=>t!==this.uiNode)).reverse().forEach((t=>{try{const e=l(t,this.scroll);this.insertBefore(e,this.children.head||void 0)}catch(t){if(t instanceof r)return;throw t}}))}deleteAt(t,e){if(0===t&&e===this.length())return this.remove();this.children.forEachAt(t,e,((t,e,s)=>{t.deleteAt(e,s)}))}descendant(t,e=0){const[s,i]=this.children.find(e);return null==t.blotName&&t(s)||null!=t.blotName&&s instanceof t?[s,i]:s instanceof h?s.descendant(t,i):[null,-1]}descendants(t,e=0,s=Number.MAX_VALUE){let i=[],r=s;return this.children.forEachAt(e,s,((e,s,o)=>{(null==t.blotName&&t(e)||null!=t.blotName&&e instanceof t)&&i.push(e),e instanceof h&&(i=i.concat(e.descendants(t,s,r))),r-=o})),i}detach(){this.children.forEach((t=>{t.detach()})),super.detach()}enforceAllowedChildren(){let t=!1;this.children.forEach((e=>{t||this.statics.allowedChildren.some((t=>e instanceof t))||(e.statics.scope===i.BLOCK_BLOT?(null!=e.next&&this.splitAfter(e),null!=e.prev&&this.splitAfter(e.prev),e.parent.unwrap(),t=!0):e instanceof h?e.unwrap():e.remove())}))}formatAt(t,e,s,i){this.children.forEachAt(t,e,((t,e,r)=>{t.formatAt(e,r,s,i)}))}insertAt(t,e,s){const[i,r]=this.children.find(t);if(i)i.insertAt(r,e,s);else{const t=null==s?this.scroll.create("text",e):this.scroll.create(e,s);this.appendChild(t)}}insertBefore(t,e){null!=t.parent&&t.parent.children.remove(t);let s=null;this.children.insertBefore(t,e||null),t.parent=this,null!=e&&(s=e.domNode),this.domNode.parentNode===t.domNode&&this.domNode.nextSibling===s||this.domNode.insertBefore(t.domNode,s),t.attach()}length(){return this.children.reduce(((t,e)=>t+e.length()),0)}moveChildren(t,e){this.children.forEach((s=>{t.insertBefore(s,e)}))}optimize(t){if(super.optimize(t),this.enforceAllowedChildren(),null!=this.uiNode&&this.uiNode!==this.domNode.firstChild&&this.domNode.insertBefore(this.uiNode,this.domNode.firstChild),0===this.children.length)if(null!=this.statics.defaultChild){const t=this.scroll.create(this.statics.defaultChild.blotName);this.appendChild(t)}else this.remove()}path(t,e=!1){const[s,i]=this.children.find(t,e),r=[[this,t]];return s instanceof h?r.concat(s.path(i,e)):(null!=s&&r.push([s,i]),r)}removeChild(t){this.children.remove(t)}replaceWith(t,e){const s="string"==typeof t?this.scroll.create(t,e):t;return s instanceof h&&this.moveChildren(s),super.replaceWith(s)}split(t,e=!1){if(!e){if(0===t)return this;if(t===this.length())return this.next}const s=this.clone();return this.parent&&this.parent.insertBefore(s,this.next||void 0),this.children.forEachAt(t,this.length(),((t,i,r)=>{const o=t.split(i,e);null!=o&&s.appendChild(o)})),s}splitAfter(t){const e=this.clone();for(;null!=t.next;)e.appendChild(t.next);return this.parent&&this.parent.insertBefore(e,this.next||void 0),e}unwrap(){this.parent&&this.moveChildren(this.parent,this.next||void 0),this.remove()}update(t,e){const s=[],i=[];t.forEach((t=>{t.target===this.domNode&&"childList"===t.type&&(s.push(...t.addedNodes),i.push(...t.removedNodes))})),i.forEach((t=>{if(null!=t.parentNode&&"IFRAME"!==t.tagName&&document.body.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)return;const e=this.scroll.find(t);null!=e&&(null!=e.domNode.parentNode&&e.domNode.parentNode!==this.domNode||e.detach())})),s.filter((t=>t.parentNode===this.domNode||t===this.uiNode)).sort(((t,e)=>t===e?0:t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1)).forEach((t=>{let e=null;null!=t.nextSibling&&(e=this.scroll.find(t.nextSibling));const s=l(t,this.scroll);s.next===e&&null!=s.next||(null!=s.parent&&s.parent.removeChild(this),this.insertBefore(s,e||void 0))})),this.enforceAllowedChildren()}}h.uiClass="";const c=h;class d extends c{checkMerge(){return null!==this.next&&this.next.statics.blotName===this.statics.blotName}deleteAt(t,e){super.deleteAt(t,e),this.enforceAllowedChildren()}formatAt(t,e,s,i){super.formatAt(t,e,s,i),this.enforceAllowedChildren()}insertAt(t,e,s){super.insertAt(t,e,s),this.enforceAllowedChildren()}optimize(t){super.optimize(t),this.children.length>0&&null!=this.next&&this.checkMerge()&&(this.next.moveChildren(this),this.next.remove())}}d.blotName="container",d.scope=i.BLOCK_BLOT;const u=d;class m extends a{static value(t){return!0}index(t,e){return this.domNode===t||this.domNode.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY?Math.min(e,1):-1}position(t,e){let s=Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);return t>0&&(s+=1),[this.parent.domNode,s]}value(){return{[this.statics.blotName]:this.statics.value(this.domNode)||!0}}}m.scope=i.INLINE_BLOT;const p=m;class f{constructor(t,e,s={}){this.attrName=t,this.keyName=e;const r=i.TYPE&i.ATTRIBUTE;this.scope=null!=s.scope?s.scope&i.LEVEL|r:i.ATTRIBUTE,null!=s.whitelist&&(this.whitelist=s.whitelist)}static keys(t){return Array.from(t.attributes).map((t=>t.name))}add(t,e){return!!this.canAdd(t,e)&&(t.setAttribute(this.keyName,e),!0)}canAdd(t,e){return null==this.whitelist||("string"==typeof e?this.whitelist.indexOf(e.replace(/["']/g,""))>-1:this.whitelist.indexOf(e)>-1)}remove(t){t.removeAttribute(this.keyName)}value(t){const e=t.getAttribute(this.keyName);return this.canAdd(t,e)&&e?e:""}}function N(t,e){return(t.getAttribute("class")||"").split(/\s+/).filter((t=>0===t.indexOf(`${e}-`)))}const b=class extends f{static keys(t){return(t.getAttribute("class")||"").split(/\s+/).map((t=>t.split("-").slice(0,-1).join("-")))}add(t,e){return!!this.canAdd(t,e)&&(this.remove(t),t.classList.add(`${this.keyName}-${e}`),!0)}remove(t){N(t,this.keyName).forEach((e=>{t.classList.remove(e)})),0===t.classList.length&&t.removeAttribute("class")}value(t){const e=(N(t,this.keyName)[0]||"").slice(this.keyName.length+1);return this.canAdd(t,e)?e:""}};function g(t){const e=t.split("-"),s=e.slice(1).map((t=>t[0].toUpperCase()+t.slice(1))).join("");return e[0]+s}const y=class extends f{static keys(t){return(t.getAttribute("style")||"").split(";").map((t=>t.split(":")[0].trim()))}add(t,e){return!!this.canAdd(t,e)&&(t.style[g(this.keyName)]=e,!0)}remove(t){t.style[g(this.keyName)]="",t.getAttribute("style")||t.removeAttribute("style")}value(t){const e=t.style[g(this.keyName)];return this.canAdd(t,e)?e:""}},A=class{constructor(t){this.attributes={},this.domNode=t,this.build()}attribute(t,e){e?t.add(this.domNode,e)&&(null!=t.value(this.domNode)?this.attributes[t.attrName]=t:delete this.attributes[t.attrName]):(t.remove(this.domNode),delete this.attributes[t.attrName])}build(){this.attributes={};const t=o.find(this.domNode);if(null==t)return;const e=f.keys(this.domNode),s=b.keys(this.domNode),r=y.keys(this.domNode);e.concat(s).concat(r).forEach((e=>{const s=t.scroll.query(e,i.ATTRIBUTE);s instanceof f&&(this.attributes[s.attrName]=s)}))}copy(t){Object.keys(this.attributes).forEach((e=>{const s=this.attributes[e].value(this.domNode);t.format(e,s)}))}move(t){this.copy(t),Object.keys(this.attributes).forEach((t=>{this.attributes[t].remove(this.domNode)})),this.attributes={}}values(){return Object.keys(this.attributes).reduce(((t,e)=>(t[e]=this.attributes[e].value(this.domNode),t)),{})}};class v extends c{constructor(t,e){super(t,e),this.attributes=new A(this.domNode)}static formats(t,e){const s=e.query(v.blotName);if(null==s||t.tagName!==s.tagName)return"string"==typeof this.tagName||(Array.isArray(this.tagName)?t.tagName.toLowerCase():void 0)}format(t,e){if(t!==this.statics.blotName||e){const s=this.scroll.query(t,i.INLINE);if(null==s)return;s instanceof f?this.attributes.attribute(s,e):!e||t===this.statics.blotName&&this.formats()[t]===e||this.replaceWith(t,e)}else this.children.forEach((t=>{t instanceof v||(t=t.wrap(v.blotName,!0)),this.attributes.copy(t)})),this.unwrap()}formats(){const t=this.attributes.values(),e=this.statics.formats(this.domNode,this.scroll);return null!=e&&(t[this.statics.blotName]=e),t}formatAt(t,e,s,r){null!=this.formats()[s]||this.scroll.query(s,i.ATTRIBUTE)?this.isolate(t,e).format(s,r):super.formatAt(t,e,s,r)}optimize(t){super.optimize(t);const e=this.formats();if(0===Object.keys(e).length)return this.unwrap();const s=this.next;s instanceof v&&s.prev===this&&function(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const s in t)if(t[s]!==e[s])return!1;return!0}(e,s.formats())&&(s.moveChildren(this),s.remove())}replaceWith(t,e){const s=super.replaceWith(t,e);return this.attributes.copy(s),s}update(t,e){super.update(t,e),t.some((t=>t.target===this.domNode&&"attributes"===t.type))&&this.attributes.build()}wrap(t,e){const s=super.wrap(t,e);return s instanceof v&&this.attributes.move(s),s}}v.allowedChildren=[v,p],v.blotName="inline",v.scope=i.INLINE_BLOT,v.tagName="SPAN";const E=v;class x extends c{constructor(t,e){super(t,e),this.attributes=new A(this.domNode)}static formats(t,e){const s=e.query(x.blotName);if(null==s||t.tagName!==s.tagName)return"string"==typeof this.tagName||(Array.isArray(this.tagName)?t.tagName.toLowerCase():void 0)}format(t,e){const s=this.scroll.query(t,i.BLOCK);null!=s&&(s instanceof f?this.attributes.attribute(s,e):t!==this.statics.blotName||e?!e||t===this.statics.blotName&&this.formats()[t]===e||this.replaceWith(t,e):this.replaceWith(x.blotName))}formats(){const t=this.attributes.values(),e=this.statics.formats(this.domNode,this.scroll);return null!=e&&(t[this.statics.blotName]=e),t}formatAt(t,e,s,r){null!=this.scroll.query(s,i.BLOCK)?this.format(s,r):super.formatAt(t,e,s,r)}insertAt(t,e,s){if(null==s||null!=this.scroll.query(e,i.INLINE))super.insertAt(t,e,s);else{const i=this.split(t);if(null==i)throw new Error("Attempt to insertAt after block boundaries");{const t=this.scroll.create(e,s);i.parent.insertBefore(t,i)}}}replaceWith(t,e){const s=super.replaceWith(t,e);return this.attributes.copy(s),s}update(t,e){super.update(t,e),t.some((t=>t.target===this.domNode&&"attributes"===t.type))&&this.attributes.build()}}x.blotName="block",x.scope=i.BLOCK_BLOT,x.tagName="P",x.allowedChildren=[E,x,p];const T=x,B=class extends p{static formats(t,e){}format(t,e){super.formatAt(0,this.length(),t,e)}formatAt(t,e,s,i){0===t&&e===this.length()?this.format(s,i):super.formatAt(t,e,s,i)}formats(){return this.statics.formats(this.domNode,this.scroll)}},C={attributes:!0,characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0};class L extends c{constructor(t,e){super(null,e),this.registry=t,this.scroll=this,this.build(),this.observer=new MutationObserver((t=>{this.update(t)})),this.observer.observe(this.domNode,C),this.attach()}create(t,e){return this.registry.create(this,t,e)}find(t,e=!1){const s=this.registry.find(t,e);return s?s.scroll===this?s:e?this.find(s.scroll.domNode.parentNode,!0):null:null}query(t,e=i.ANY){return this.registry.query(t,e)}register(...t){return this.registry.register(...t)}build(){null!=this.scroll&&super.build()}detach(){super.detach(),this.observer.disconnect()}deleteAt(t,e){this.update(),0===t&&e===this.length()?this.children.forEach((t=>{t.remove()})):super.deleteAt(t,e)}formatAt(t,e,s,i){this.update(),super.formatAt(t,e,s,i)}insertAt(t,e,s){this.update(),super.insertAt(t,e,s)}optimize(t=[],e={}){super.optimize(e);const s=e.mutationsMap||new WeakMap;let i=Array.from(this.observer.takeRecords());for(;i.length>0;)t.push(i.pop());const r=(t,e=!0)=>{null!=t&&t!==this&&null!=t.domNode.parentNode&&(s.has(t.domNode)||s.set(t.domNode,[]),e&&r(t.parent))},o=t=>{s.has(t.domNode)&&(t instanceof c&&t.children.forEach(o),s.delete(t.domNode),t.optimize(e))};let n=t;for(let e=0;n.length>0;e+=1){if(e>=100)throw new Error("[Parchment] Maximum optimize iterations reached");for(n.forEach((t=>{const e=this.find(t.target,!0);null!=e&&(e.domNode===t.target&&("childList"===t.type?(r(this.find(t.previousSibling,!1)),Array.from(t.addedNodes).forEach((t=>{const e=this.find(t,!1);r(e,!1),e instanceof c&&e.children.forEach((t=>{r(t,!1)}))}))):"attributes"===t.type&&r(e.prev)),r(e))})),this.children.forEach(o),n=Array.from(this.observer.takeRecords()),i=n.slice();i.length>0;)t.push(i.pop())}}update(t,e={}){t=t||this.observer.takeRecords();const s=new WeakMap;t.map((t=>{const e=this.find(t.target,!0);return null==e?null:s.has(e.domNode)?(s.get(e.domNode).push(t),null):(s.set(e.domNode,[t]),e)})).forEach((t=>{null!=t&&t!==this&&s.has(t.domNode)&&t.update(s.get(t.domNode)||[],e)})),e.mutationsMap=s,s.has(this.domNode)&&super.update(s.get(this.domNode),e),this.optimize(t,e)}}L.blotName="scroll",L.defaultChild=T,L.allowedChildren=[T,u],L.scope=i.BLOCK_BLOT,L.tagName="DIV";const w=L;class O extends p{constructor(t,e){super(t,e),this.text=this.statics.value(this.domNode)}static create(t){return document.createTextNode(t)}static value(t){return t.data}deleteAt(t,e){this.domNode.data=this.text=this.text.slice(0,t)+this.text.slice(t+e)}index(t,e){return this.domNode===t?e:-1}insertAt(t,e,s){null==s?(this.text=this.text.slice(0,t)+e+this.text.slice(t),this.domNode.data=this.text):super.insertAt(t,e,s)}length(){return this.text.length}optimize(t){super.optimize(t),this.text=this.statics.value(this.domNode),0===this.text.length?this.remove():this.next instanceof O&&this.next.prev===this&&(this.insertAt(this.length(),this.next.value()),this.next.remove())}position(t,e=!1){return[this.domNode,t]}split(t,e=!1){if(!e){if(0===t)return this;if(t===this.length())return this.next}const s=this.scroll.create(this.domNode.splitText(t));return this.parent.insertBefore(s,this.next||void 0),this.text=this.statics.value(this.domNode),s}update(t,e){t.some((t=>"characterData"===t.type&&t.target===this.domNode))&&(this.text=this.statics.value(this.domNode))}value(){return this.text}}O.blotName="text",O.scope=i.INLINE_BLOT;const I=O;return s})()}));
//# sourceMappingURL=parchment.js.map