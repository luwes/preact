!function(l,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(l.preact={})}(this,function(l){var n,u={},e=[],f=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i,r={};function t(l,n,u){var e,f,r,t,o=arguments;if(null==n&&(n={}),arguments.length>3)for(u=[u],e=3;e<arguments.length;e++)u.push(o[e]);if(null!=u&&(n.children=u),null!=l&&null!=l.defaultProps)for(f in l.defaultProps)void 0===n[f]&&(n[f]=l.defaultProps[f]);return(r=n.ref)&&delete n.ref,(t=n.key)&&delete n.key,i(l,n,null,t,r)}function i(l,n,u,e,f){var t={type:l,props:n,text:u,key:e,ref:f,__k:null,__e:null,l:null};return r.vnode&&r.vnode(t),t}function o(){}function c(l){return null==l||"boolean"==typeof l?null:"string"==typeof l||"number"==typeof l?i(null,null,l,null,null):Array.isArray(l)?t(o,null,l):null!=l.__e?i(l.type,l.props,l.text,l.key,null):l}function a(l,n,u,e){var f,r;for(f in n)"children"===f||"key"===f||u&&u[f]==n[f]||s(l,f,n[f],u[f],e);for(r in u)"children"===r||"key"===r||n&&r in n||s(l,r,null,u[r],e)}function s(l,u,e,r,t){var i,o,c,a,s,p;if("class"!==u&&"className"!==u||(u=t?"class":"className"),"style"===u)if(o=l.style,"string"==typeof e)o.cssText=e;else{if("string"==typeof r)o.cssText="";else for(c in r)null!=e&&c in e||o.setProperty(c.replace(n,"-"),"");for(a in e)i=e[a],null!=r&&i===r[a]||o.setProperty(a.replace(n,"-"),"number"==typeof i&&!1===f.test(a)?i+"px":i)}else{if("dangerouslySetInnerHTML"===u)return;"o"===u[0]&&"n"===u[1]?(s=u!==(u=u.replace(/Capture$/,"")),p=u.toLowerCase(),u=(p in l?p:u).substring(2),e?r||l.addEventListener(u,d,s):l.removeEventListener(u,d,s),(l.u||(l.u={}))[u]=e):"list"!==u&&"tagName"!==u&&!t&&u in l?l[u]=null==e?"":e:null==e||!1===e?l.removeAttribute(u):"function"!=typeof e&&l.setAttribute(u,e)}}function d(l){return this.u[l.type](r.event?r.event(l):l)}function p(l,n){for(var u in n)l[u]=n[u];return l}function y(l){var n=l.parentNode;n&&n.removeChild(l)}function v(l,n,e,f,t,i,c){if(null==f||null==e||f.type!==e.type){if(null!=f&&h(f),null==e)return null;l=null,f=u}r.diff&&r.diff(e);var a=e.type;try{f.type===o||a===o?(b(n,e,f,t,i),e.__k.length&&(l=e.__k[0].__e,e.l=e.__k[e.__k.length-1].__e)):(l=m(l,e,f,t,i),e.ref&&f.ref!==e.ref&&g(e.ref,l)),e.__e=l,r.diffed&&r.diffed(e)}catch(l){}return l}function m(l,n,u,f,r){var t,i,o,c,s,d,p,y,v=l;if(f="svg"===n.type||f,null==l&&null!=r)for(t=0;t<r.length;t++)if(null!=(i=r[t])&&(null===n.type?3===i.nodeType:i.localName===n.type)){l=i,r[t]=null;break}if(null==l&&(l=null===n.type?document.createTextNode(n.text):f?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type),r=null),n.__e=l,null===n.type)null!==v&&l!==v||n.text===u.text||(l.data=n.text);else if(null!=r&&null!=l.childNodes&&(r=e.slice.call(l.childNodes)),n!==u){if(c=n.props,null==(o=u.props)&&(o={},null!=r))for(d=0;d<l.attributes.length;d++)o["class"==(s=l.attributes[d].name)&&c.className?"className":s]=l.attributes[d].value;p=o.dangerouslySetInnerHTML,((y=c.dangerouslySetInnerHTML)||p)&&(y&&p&&y.__html==p.__html||(l.innerHTML=y&&y.__html||"")),c.multiple&&(l.multiple=c.multiple),b(l,n,u,"foreignObject"!==n.type&&f,r),a(l,c,o,f),l.props=c}return l}function g(l,n){try{"function"==typeof l?l(n):l.current=n}catch(l){}}function h(l,n){var u,e;if(r.unmount&&r.unmount(l),(u=l.ref)&&g(u,null),!n&&null==l.l&&(n=null!=(u=l.__e))&&y(u),l.__e=l.l=null,u=l.__k)for(e=0;e<u.length;e++)h(u[e],n)}function b(l,n,f,r,t){var i,a,s,d,p,m,g,b,w,x,A=n.__k||k(n.props.children,n.__k=[],c),N=null!=f&&f!=u&&f.__k||e,_=N.length,j=_?N[0]&&N[0].__e:null;if(null!=t)for(a=0;a<t.length;a++)if(null!=t[a]){j=t[a];break}for(a=0;a<A.length;a++){if(i=A[a]=c(A[a]),m=p=null,null!=(d=N[a])&&(null==i.key&&null==d.key?i.type===d.type:i.key===d.key))p=a;else for(s=0;s<_;s++)if(null!=(d=N[s])&&(null==i.key&&null==d.key?i.type===d.type:i.key===d.key)){p=s;break}if(null!=p&&(m=N[p],N[p]=null),b=null!=j&&j.nextSibling,g=v(null==m?null:m.__e,l,i,m,r,t),null!=i&&null!=g){if(x=document.activeElement,null!=i.l)g=i.l;else if(t==m||g!=j||null==g.parentNode)l:if(null==j||j.parentNode!==l)l.appendChild(g);else{for(w=j,s=0;(w=w.nextSibling)&&s++<_/2;)if(w===g)break l;l.insertBefore(g,j)}x!==document.activeElement&&x.focus(),j=null!=g?g.nextSibling:b}}if(null!=t&&n.type!==o)for(a=t.length;a--;)null!=t[a]&&y(t[a]);for(a=_;a--;)null!=N[a]&&h(N[a])}function k(l,n,u){if(null==n&&(n=[]),null==l||"boolean"==typeof l);else if(Array.isArray(l))for(var e=0;e<l.length;e++)k(l[e],n);else n.push(u?u(l):l);return n}function w(l,n){var u=n.__t;l=t(o,null,[l]),b(n,n.__t=l,u,void 0!==n.ownerSVGElement,u?null:e.slice.call(n.childNodes))}n=/-?(?=[A-Z])/g,l.render=w,l.hydrate=function(l,n){n.__t=null,w(l,n)},l.createElement=t,l.h=t,l.Fragment=o,l.createRef=function(){return{}},l.cloneElement=function(l,n){return n=p(p({},l.props),n),arguments.length>2&&(n.children=e.slice.call(arguments,2)),i(l.type,n,null,n.key||l.key,n.ref||l.ref)},l.toChildArray=k,l.options=r});
//# sourceMappingURL=preact.umd.js.map
