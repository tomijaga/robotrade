(this.webpackJsonprobotrade=this.webpackJsonprobotrade||[]).push([[0],{101:function(e,t,a){e.exports=a.p+"static/media/rticon.0ac6358c.png"},106:function(e,t,a){e.exports=a(184)},111:function(e,t,a){},113:function(e,t,a){},114:function(e,t,a){},123:function(e,t,a){},124:function(e,t,a){e.exports=a.p+"static/media/worldwide.d91bfc85.svg"},125:function(e,t,a){},126:function(e,t,a){},143:function(e,t){},162:function(e,t,a){},184:function(e,t,a){"use strict";a.r(t);var l=a(0),r=a.n(l),n=a(99),c=a.n(n),o=(a(111),a(25),a(30)),i=a(3),s=a(5),h=a(7),m=a(9),d=a(8),u=a(16),p=a.n(u),v=a(19),f=a(11),g=a(100),E=Object(g.a)("collection"),y=function e(){if(Object(s.a)(this,e),Object.defineProperty(this,E,{writable:!0,value:[]}),this.constructor===e)throw new TypeError('Abstract class "Widget" cannot be instantiated directly.')};y.x=0;a(113);var b=function(e){return r.a.createElement("span",{onClick:function(){switch(e.action){case"store":return sessionStorage.setItem("stockSymbol",e.symbol),void console.log("stored Symbol:",e.symbol)}}},r.a.createElement("div",{className:"MenuItem"},r.a.createElement("p",{className:"symbol"}," ",e.symbol),r.a.createElement("p",{className:"name"}," ",e.name)))},w=(a(114),function(e){return r.a.createElement("div",{className:"scroll",style:{height:e.height}},e.children)}),k=a(22),z=a.n(k),C=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).setFilteredArray=function(t){if(!/[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(t)&&""!==t&&t.length<10&&void 0!==t){var a="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=".concat(t,"&apikey=CVH0XQG208A1LHZ6");console.log(t),fetch(a).then((function(e){return e.json()})).then((function(t){e.setState({filteredStockSymbols:t.bestMatches})}))}else t.includes(" ")?e.setState({filteredStockSymbols:[{"1. symbol":"ERROR!","2. name":"Can only input alphabets. No Special Characters Allowed","4. region":"United States"}]}):(e.setState({filteredStockSymbols:[]}),console.log())},e.displayItems=function(){return e.storedValue!==e.props.searchValue&&(e.storedValue=e.props.searchValue,e.setArrayThrottled(e.storedValue)),void 0===e.state.filteredStockSymbols?r.a.createElement(b,{symbol:"Error!!!",name:"What did you do!!!!!!!!!!!!!!!!!!!!"}):e.state.filteredStockSymbols.filter((function(e,t){return"United States"===e["4. region"]})).map((function(e,t){return r.a.createElement("a",{key:t,href:"/app/stocks",style:{textDecoration:"none",color:"inherit"}}," ",r.a.createElement(b,{action:"store",symbol:e["1. symbol"],name:e["2. name"]}))}))},e.state={filteredStockSymbols:[]},e.storedValue="",e.setArrayThrottled=z()((function(t){return e.setFilteredArray(t)}),750),e}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{position:"absolute",top:"100%",width:"100%",height:"auto"}},r.a.createElement(w,{height:this.props.height,background:"red"},this.displayItems()))}}]),a}(l.Component),x=function(e){return r.a.createElement("div",null,r.a.createElement("input",{type:"search",placeholder:"Search Stocks",onChange:e.search,style:{width:"100%",background:"azure",height:"1.rem",color:"black",paddingLeft:"18px",borderColor:"transparent",borderRadius:"4px",marginBottom:"4px",fontWeight:"bold",top:"0%"}}))},S=(a(123),function(e){var t=Object(l.useState)(""),a=Object(f.a)(t,2),n=a[0],c=a[1],o=function(){var e=Object(v.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(t);case 2:console.log("searchValue",n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"search"},r.a.createElement(x,{search:function(e){o(e.target.value)}}),r.a.createElement(C,{searchValue:n,height:e.height}))}),_=function(e){return r.a.createElement("svg",{width:"2rem",height:"2rem",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 200.000000 200.000000",preserveAspectRatio:"xMidYMid meet"},r.a.createElement("defs",null,r.a.createElement("filter",{id:"svg_9_blur"},r.a.createElement("feGaussianBlur",{stdDeviation:"2.8",in:"SourceGraphic"}))),r.a.createElement("g",null),r.a.createElement("g",null,r.a.createElement("path",{id:"svg_9",d:"m12.32749,70.49517l26.99958,0l0,72.66553l-26.99958,0l0,-72.66553z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_14",d:"m23.82752,146.49591l4.33294,0l0,19.99892l-4.33294,0l0,-19.99892z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_15",d:"m121.00023,146.99602l4.33294,0l0,19.99892l-4.33294,0l0,-19.99892z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_16",d:"m72.82736,9.83117l4.33294,0l0,19.99892l-4.33294,0l0,-19.99892z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_17",d:"m121.49322,45.3314l4.33294,0l0,19.99892l-4.33294,0l0,-19.99892z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_18",d:"m72.99363,108.99672l4.33294,0l0,19.99892l-4.33294,0l0,-19.99892z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_19",d:"m23.82749,46.99765l4.33294,0l0,19.99892l-4.33294,0l0,-19.99892z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_20",d:"m61.50001,33.83362l26.99958,0l0,72.66553l-26.99958,0l0,-72.66553z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_21",d:"m110.31523,71.16185l26.99958,0l0,72.66553l-26.99958,0l0,-72.66553z",filter:"url(#svg_9_blur)",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("g",{stroke:"null",id:"svg_8"},r.a.createElement("g",{transform:"translate(0,200) scale(0.10000000149011612,-0.10000000149011612) ",stroke:"null",id:"svg_4",fill:"#53f86c"},r.a.createElement("path",{stroke:"null",id:"svg_5",d:"m699.99339,1800.00453l0,-120l-50,0l-50,0l0,-385l0,-385l50,0l50,0l0,-120l0,-120l50,0l50,0l0,120l0,120l50,0l50,0l0,385l0,385l-50,0l-50,0l0,120l0,120l-50,0l-50,0l0,-120zm68,-13c3,-92 2,-97 -18,-97c-19,0 -20,6 -20,93c0,52 3,97 7,101c19,19 28,-8 31,-97zm102,-492l0,-355l-120,0l-120,0l0,355l0,355l120,0l120,0l0,-355zm-102,-488c3,-92 2,-97 -18,-97c-19,0 -20,6 -20,93c0,52 3,97 7,101c19,19 28,-8 31,-97z"}),r.a.createElement("path",{stroke:"null",id:"svg_6",d:"m209.99339,1430.00453l0,-120l-50,0l-50,0l0,-385l0,-385l50,0l50,0l0,-120l0,-120l50,0l50,0l0,120l0,120l50,0l50,0l0,385l0,385l-50,0l-50,0l0,120l0,120l-50,0l-50,0l0,-120zm68,-17c-2,-79 -6,-98 -18,-98c-12,0 -16,19 -18,98c-3,92 -2,97 18,97c20,0 21,-5 18,-97zm102,-488l0,-355l-120,0l-120,0l0,355l0,355l120,0l120,0l0,-355zm-100,-496c0,-90 -2,-100 -17,-97c-15,3 -18,17 -21,101c-3,92 -2,97 18,97c19,0 20,-6 20,-101z"}),r.a.createElement("path",{stroke:"null",id:"svg_7",d:"m1189.99339,1430.00453l0,-120l-50,0l-50,0l0,-385l0,-385l50,0l50,0l0,-120l0,-120l50,0l50,0l0,120l0,120l50,0l50,0l0,385l0,385l-50,0l-50,0l0,120l0,120l-50,0l-50,0l0,-120zm60,-21c0,-76 -3,-100 -12,-97c-9,3 -14,35 -16,101c-2,82 0,97 13,97c12,0 15,-17 15,-101zm110,-484l0,-355l-120,0l-120,0l0,355l0,355l120,0l120,0l0,-355zm-110,-495c0,-82 -3,-100 -15,-100c-12,0 -15,18 -15,100c0,82 3,100 15,100c12,0 15,-18 15,-100z"}))),r.a.createElement("polyline",{strokeLinecap:"round",id:"svg_22",points:"-11.512542724609375,185.16489028930664 -11.512542724609375,183.83171463012695 -11.512542724609375,183.83171463012695 ",strokeOpacity:"null",strokeWidth:"0",stroke:"#000",fill:"none"}),r.a.createElement("polyline",{strokeLinecap:"round",id:"svg_23",points:"505.801025390625,44.85364532470703 506.46759033203125,45.52022933959961 ",strokeOpacity:"null",strokeWidth:"0",stroke:"#000",fill:"none"}),r.a.createElement("polyline",{strokeLinecap:"round",id:"svg_24",points:"406.5003356933594,112.99980926513672 406.5003356933594,112.99980926513672 406.5003356933594,112.99980926513672 ",strokeOpacity:"null",strokeWidth:"0",stroke:"#000",fill:"none"}),r.a.createElement("path",{id:"svg_28",d:"m-83.49772,-113.24721l32.9984,88.74754",opacity:"0.5",strokeOpacity:"null",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_29",d:"m-83.99771,-107.24729",opacity:"0.5",strokeOpacity:"null",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_30",d:"m-38.49832,72.25029",opacity:"0.5",strokeOpacity:"null",strokeWidth:"0",stroke:"#000",fill:"#53f86c"}),r.a.createElement("path",{id:"svg_31",d:"m-20.49857,74.75026c-0.49999,0 -4.99993,8.49989 -4.5011,8.24862",opacity:"0.5",strokeOpacity:"null",strokeWidth:"0",stroke:"#000",fill:"#53f86c"})))},N=a(101),O=a.n(N),V=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"super",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",{style:{minHeight:"3rem"}},r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100pt,auto)) ",minHeight:"100%",padding:" 0px 2rem",background:"rgb(10, 30, 40)",alignItems:"center",width:"calc(100vw-".concat(4,"rem)")}},r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement(_,null),r.a.createElement("img",{height:"20",width:"140",src:O.a})),r.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center"}},r.a.createElement(S,{style:{marginLeft:"100%"}}))))}}]),a}(l.Component),j=function(e){var t=e.className,a=e.size;return r.a.createElement("svg",{className:t,height:a,viewBox:"-27 0 512 512",width:a,xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},r.a.createElement("linearGradient",{id:"a",gradientUnits:"userSpaceOnUse",x1:"0",x2:"459",y1:"256",y2:"256"},r.a.createElement("stop",{offset:"0",stopColor:"#00f2fe"}),r.a.createElement("stop",{offset:".0208",stopColor:"#03effe"}),r.a.createElement("stop",{offset:".2931",stopColor:"#24d2fe"}),r.a.createElement("stop",{offset:".5538",stopColor:"#3cbdfe"}),r.a.createElement("stop",{offset:".7956",stopColor:"#4ab0fe"}),r.a.createElement("stop",{offset:"1",stopColor:"#4facfe"})),r.a.createElement("path",{d:"m188 492c0 11.046875-8.953125 20-20 20h-88c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h245.890625c44.109375 0 80 35.886719 80 80v191c0 11.046875-8.957031 20-20 20-11.046875 0-20-8.953125-20-20v-191c0-22.054688-17.945313-40-40-40h-245.890625c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h88c11.046875 0 20 8.953125 20 20zm117.890625-372h-206c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h206c11.042969 0 20-8.953125 20-20s-8.957031-20-20-20zm20 100c0-11.046875-8.957031-20-20-20h-206c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h206c11.042969 0 20-8.953125 20-20zm-226 60c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h105.109375c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm355.472656 146.496094c-.703125 1.003906-3.113281 4.414062-4.609375 6.300781-6.699218 8.425781-22.378906 28.148437-44.195312 45.558594-27.972656 22.324219-56.757813 33.644531-85.558594 33.644531s-57.585938-11.320312-85.558594-33.644531c-21.816406-17.410157-37.496094-37.136719-44.191406-45.558594-1.5-1.886719-3.910156-5.300781-4.613281-6.300781-4.847657-6.898438-4.847657-16.097656 0-22.996094.703125-1 3.113281-4.414062 4.613281-6.300781 6.695312-8.421875 22.375-28.144531 44.191406-45.554688 27.972656-22.324219 56.757813-33.644531 85.558594-33.644531s57.585938 11.320312 85.558594 33.644531c21.816406 17.410157 37.496094 37.136719 44.191406 45.558594 1.5 1.886719 3.910156 5.300781 4.613281 6.300781 4.847657 6.898438 4.847657 16.09375 0 22.992188zm-41.71875-11.496094c-31.800781-37.832031-62.9375-57-92.644531-57-29.703125 0-60.84375 19.164062-92.644531 57 31.800781 37.832031 62.9375 57 92.644531 57s60.84375-19.164062 92.644531-57zm-91.644531-38c-20.988281 0-38 17.011719-38 38s17.011719 38 38 38 38-17.011719 38-38-17.011719-38-38-38zm0 0",fill:"url(#a)"}))},H=(a(124),function(e){var t=e.className,a=e.size;return r.a.createElement("svg",{className:t,id:"Layer_5",enableBackground:"new 0 0 64 64",height:a,viewBox:"0 0 64 64",width:a,xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},r.a.createElement("linearGradient",{id:"SVGID_1_",gradientUnits:"userSpaceOnUse",x1:"32",x2:"32",y1:"63",y2:"1"},r.a.createElement("stop",{offset:"0",stopColor:"#9f2fff"}),r.a.createElement("stop",{offset:"1",stopColor:"#0bb1d3"})),r.a.createElement("path",{d:"m47 23v-2h-3v-3h2v1h3c.552 0 1-.448 1-1s-.448-1-1-1h-2c-1.654 0-3-1.346-3-3s1.346-3 3-3v-2h2v2h3v3h-2v-1h-3c-.552 0-1 .448-1 1s.448 1 1 1h2c1.654 0 3 1.346 3 3s-1.346 3-3 3v2zm1 4c-6.065 0-11-4.935-11-11s4.935-11 11-11 11 4.935 11 11-4.935 11-11 11zm0-2c4.963 0 9-4.037 9-9s-4.037-9-9-9-9 4.037-9 9 4.037 9 9 9zm15-9c0 3.923-1.526 7.488-4 10.164v36.836h-58v-2.376l14.546-16.624h11.954l6-8h9.086l5.02-5.02c-.97-.025-1.917-.137-2.833-.339l-3.359 3.359h-7.96l-7 8h-12.017l-11.703 12.679-1.469-1.357 12.297-13.322h11.983l7-8h8.04l2.02-2.02c-5.61-2.172-9.605-7.612-9.605-13.98 0-8.271 6.729-15 15-15s15 6.729 15 15zm-15 13c7.168 0 13-5.832 13-13s-5.832-13-13-13-13 5.832-13 13 5.832 13 13 13zm2.665 1.749-3.665 3.665v26.586h4v-30.302c-.11.022-.224.031-.335.051zm-9.665 7.251v23h4v-24.586l-1.586 1.586zm-26 9.662-4 4.571v8.767h4zm2 13.338h4v-15h-4zm6 0h4v-15h-4zm6 0h4v-21l-4 5.333zm6 0h4v-23h-4zm-31.671 0h5.671v-6.481zm53.671 0v-33.028c-1.206.909-2.551 1.639-4 2.153v30.875zm-48-43v4h2v12h-2v4h-2v-4h-2v-12h2v-4zm0 6h-2v8h2zm8-9v4h2v10h-2v4h-2v-4h-2v-10h2v-4zm0 6h-2v6h2zm8-11v4h2v8h-2v4h-2v-4h-2v-8h2v-4zm0 6h-2v4h2z",fill:"url(#SVGID_1_)"}))}),T=function(e){var t=e.className,a=e.size;return r.a.createElement("svg",{className:t,id:"Capa_1",enableBackground:"new 0 0 512.279 512.279",height:a,viewBox:"0 0 512.279 512.279",width:a,xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("g",null,r.a.createElement("path",{d:"m463.678 71.542h-91.705v-30.101c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v30.101h-31.067c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h31.067v31.758h-5.629c-7.86 0-14.255 6.395-14.255 14.254v88.294c0 7.86 6.395 14.254 14.255 14.254h5.629v59.501c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-59.501h5.629c7.859 0 14.254-6.395 14.254-14.254v-88.294c0-7.86-6.395-14.254-14.254-14.254h-5.629v-31.758h91.705c18.021 0 32.684 14.662 32.684 32.684v256.695h-480.445v-256.694c0-18.022 14.662-32.684 32.684-32.684h131.472v14.637h-5.629c-7.86 0-14.254 6.395-14.254 14.254v88.294c0 7.86 6.395 14.254 14.254 14.254h5.629v66.273c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-66.273h5.629c7.86 0 14.254-6.395 14.254-14.254v-88.294c0-7.86-6.395-14.254-14.254-14.254h-5.629v-14.638h31.067c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-31.067v-3.704c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v3.704h-131.472c-26.293 0-47.684 21.391-47.684 47.684v264.195c0 26.293 21.391 47.684 47.684 47.684h114.169v38.134l-24.173 28.04h-9.595c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h253.583c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-8.904l-24.173-28.04v-38.134h114.17c26.293 0 47.684-21.391 47.684-47.684v-264.194c0-26.293-21.391-47.685-47.684-47.685zm-86.822 148.562h-24.766v-86.803h24.767v86.803zm-176.9-17.122h-24.767v-86.802h24.767zm263.722 213.123h-151.791c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h22.621v33.421h-18.682c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h22.745l15.305 17.753h-195.474l15.305-17.753h22.745c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-18.682v-33.421h102.154c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-231.323c-15.441 0-28.406-10.766-31.806-25.184h478.688c-3.399 14.418-16.364 25.184-31.805 25.184z"}),r.a.createElement("path",{d:"m79.239 218.963c-4.142 0-7.5 3.358-7.5 7.5v18.106c0 7.86 6.394 14.254 14.254 14.254h5.629v39.941c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-39.941h5.629c7.86 0 14.254-6.394 14.254-14.254v-88.294c0-7.86-6.395-14.255-14.254-14.255h-5.629v-11.996c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v11.996h-5.629c-7.86 0-14.254 6.395-14.254 14.255v38.226c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-37.48h12.374.01s.006 0 .01 0h12.374v86.803h-24.768v-17.36c0-4.143-3.358-7.501-7.5-7.501z"}),r.a.createElement("path",{d:"m262.893 203.141h5.63v39.94c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-39.94h5.629c7.859 0 14.254-6.395 14.254-14.255v-58.827c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v58.082h-24.767v-135.803h24.767v45.759c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-46.505c0-7.859-6.395-14.254-14.254-14.254h-5.629v-29.838c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v29.838h-5.63c-7.86 0-14.254 6.395-14.254 14.254v137.294c0 7.861 6.394 14.255 14.254 14.255z"}),r.a.createElement("path",{d:"m407.755 205.617c1.355 2.514 3.939 3.942 6.608 3.942 1.201 0 2.421-.29 3.553-.9l34.547-18.627-2.485 6.522c-1.475 3.871.468 8.204 4.339 9.679.879.334 1.781.493 2.669.493 3.021 0 5.87-1.84 7.01-4.832l8.444-22.166c1.475-3.871-.468-8.204-4.339-9.679l-23.527-8.963c-3.87-1.474-8.204.468-9.679 4.339s.468 8.204 4.339 9.679l5.455 2.078-33.892 18.274c-3.646 1.966-5.008 6.515-3.042 10.161z"}),r.a.createElement("path",{d:"m45.263 352.16c1.218 2.846 3.987 4.551 6.898 4.551.984 0 1.985-.195 2.948-.607l96.778-41.419 8.795 23.043c.77 2.017 2.371 3.604 4.394 4.356 2.022.751 4.272.596 6.172-.429l159.884-86.205c3.646-1.966 5.008-6.515 3.042-10.161-1.965-3.645-6.513-5.008-10.161-3.042l-152.364 82.15-8.531-22.353c-.728-1.907-2.201-3.435-4.08-4.231-1.879-.797-4.001-.792-5.878.01l-103.953 44.49c-3.807 1.631-5.573 6.039-3.944 9.847z"})))},A=function(e){var t=e.className,a=e.size;return r.a.createElement("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 64 64",width:a,height:a,fill:"aqua"},r.a.createElement("g",{id:"processor-robotics-brain-technology-artificial_intelligence","data-name":"processor-robotics-brain-technology-artificial intelligence"},r.a.createElement("path",{d:"M56.18,28a3,3,0,1,0,0-2H54V20h2.18a3,3,0,1,0,0-2H54V13a1,1,0,0,0-1-1H47V10.72l2.32-.77A1.014,1.014,0,0,0,50,9V7.82a3,3,0,1,0-2,0v.46l-2.32.77A1.014,1.014,0,0,0,45,10v2H40V7.82a3,3,0,1,0-2,0V12H33V10a1.014,1.014,0,0,0-.68-.95L30,8.28V7.82a3,3,0,1,0-2,0V9a1.014,1.014,0,0,0,.68.95l2.32.77V12H25a1,1,0,0,0-1,1V23H23V8a1,1,0,0,0-1-1A14.015,14.015,0,0,0,8,21v6.59l-5.71,5.7A1.033,1.033,0,0,0,2,34v3a1,1,0,0,0,1,1H8V54a1,1,0,0,0,1,1h6a1.029,1.029,0,0,0,.6-.2L18,53.01V61a1,1,0,0,0,1,1h5a1.014,1.014,0,0,0,.8-.4l9-12A.984.984,0,0,0,34,49V42h3V61a1,1,0,0,0,1,1H62V60H39V42h2V57a1,1,0,0,0,1,1H57V56H43V42h2V53a1,1,0,0,0,1,1H62V52H47V42h2v7a1,1,0,0,0,1,1h7V48H51V42h2a1,1,0,0,0,1-1V36h2.18a3,3,0,1,0,0-2H54V28ZM59,26a1,1,0,1,1-1,1A1,1,0,0,1,59,26Zm0-8a1,1,0,1,1-1,1A1,1,0,0,1,59,18ZM49,4a1,1,0,1,1-1,1A1,1,0,0,1,49,4ZM29,6a1,1,0,1,1,1-1A1,1,0,0,1,29,6ZM39,4a1,1,0,1,1-1,1A1,1,0,0,1,39,4ZM32,48.67,23.5,60H20V51.53l5.6-4.17a1,1,0,0,0,.4-.8V42h6ZM35,40H25a1,1,0,0,0-1,1v5.06L14.67,53H10V37a1,1,0,0,0-1-1H4V34.41l5.71-5.7A1.033,1.033,0,0,0,10,28V21A12.018,12.018,0,0,1,21,9.04V24a1,1,0,0,0,1,1H35Zm1-17H30V18H48V36H37V24A1,1,0,0,0,36,23ZM52,40H37V38H49a1,1,0,0,0,1-1V17a1,1,0,0,0-1-1H29a1,1,0,0,0-1,1v6H26V14H52Zm7-6a1,1,0,1,1-1,1A1,1,0,0,1,59,34Z"})))},I=(a(125),function(e){return r.a.createElement("div",{className:e.className,style:{width:"100%",height:"100%",minHeight:"4rem",display:"flex",justifyContent:"center",alignItems:"center"}},e.children)}),D=a(102),M=a.n(D),W=(a(126),a(103)),R=a.n(W),B=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).style={display:"flex",flexDirection:"column",alignItems:"flex-start",width:"100%",justifyContent:"flex-start"},e}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{display:"grid",borderRight:"20px",borderColor:"white",background:"rgb(10, 30, 40)",height:"100%",gridTemplateRows:"auto auto auto",width:"4rem",zIndex:"99"}},r.a.createElement("div",null,r.a.createElement("div",{className:"section-1",style:this.style},r.a.createElement(I,{className:"navCenter"},r.a.createElement("a",{className:"noStyle",href:"/app/"},r.a.createElement(M.a,{className:"MuiSvgIcon-colorPrimary"}),r.a.createElement("p",{className:"iconText"},"Market"))),r.a.createElement(I,{className:"navCenter"},r.a.createElement("a",{className:"noStyle",href:"/app/watchlist"},r.a.createElement(j,{size:"20pt",className:"navIcon"}),r.a.createElement("p",{className:"iconText"},"Watchlists"))),r.a.createElement(I,{className:"navCenter"},r.a.createElement("a",{className:"noStyle",href:"/app/alerts"},r.a.createElement(R.a,{className:"navIcon"}),r.a.createElement("p",{className:"iconText"},"Alerts"))),r.a.createElement(I,{className:"navCenter"},r.a.createElement("a",{className:"noStyle",href:"/app/stocks"},r.a.createElement(H,{size:"20pt",className:"navIcon"}),r.a.createElement("p",{className:"iconText"},"Stocks"))),r.a.createElement(I,{className:"navCenter"},r.a.createElement("a",{className:"noStyle",href:"/app/trade"},r.a.createElement(T,{size:"20",className:"navIcon"}),r.a.createElement("p",{className:"iconText"},"Trade"))),r.a.createElement(I,{className:"navCenter"},r.a.createElement("a",{className:"noStyle",href:"/app/robo-trade"},r.a.createElement(A,{size:"20",className:"navIcon"}),r.a.createElement("p",{className:"iconText"},"robo-trade")))),r.a.createElement("div",{className:"empty-section"}),r.a.createElement("div",{className:"section-2",style:this.style})))}}]),a}(l.Component),F=function(e){var t=function(e){return e>=12?"pm":"am"},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"12hr",a=new Date,l=a.getHours(),r=a.getMinutes(),n=a.getSeconds();if("24hr"===e)return"".concat(l,":").concat(r,":").concat(n," ");var c=l;return l>12&&(c=l%12),0===c&&(c=12),r<10&&(r="0".concat(r)),n<10&&(n="0".concat(n)),"".concat(c,":").concat(r,":").concat(n," ").concat(t(l))},n=Object(l.useState)(a()),c=Object(f.a)(n,2),o=c[0],i=c[1];return Object(l.useEffect)((function(){var t=setInterval((function(){i(a(e.format))}),1e3);return function(){return clearInterval(t)}}),[]),r.a.createElement("span",null,o)},L=function(){return r.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",background:"rgb(10, 20, 30)",height:"2rem",width:"calc(100vw-".concat(60,"pt)"),padding:"0px 20pt",alignItems:"center",fontSize:"1rem"}},r.a.createElement("span",{style:{padding:"0px 10pt"}}),r.a.createElement(F,null))},Z=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.call(this)}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"setPageRegions"},r.a.createElement(V,null),r.a.createElement("div",{className:"bodyRegion"},r.a.createElement(B,null),r.a.createElement("div",{style:{height:"calc(100vh - 5rem)",width:"calc(100vw - 4rem)"}},this.props.children)),r.a.createElement(L,null))}}]),a}(l.Component),G=a(38);G.ApiClient.instance.authentications.api_key.apiKey="btmdn7v48v6uocf2j9i0";var U=new G.DefaultApi,P=(a(162),function(e){var t=Object(l.useState)(!1),a=Object(f.a)(t,2),n=a[0],c=a[1],o=Object(l.useState)([]),i=Object(f.a)(o,2),s=i[0],h=i[1],m=function(e){var t=e.getDate(),a=e.getMonth(),l=e.getFullYear();return t=t<10?"0"+t:t,a=a<10?"0"+a:a,"".concat(l,"-").concat(a,"-").concat(t)};return Object(l.useEffect)((function(){!function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:7,a=(Math.floor(Date.now()/1e3),new Date),l=new Date(a-864e5*t);console.log(m(l),m(a)),U.companyNews(e,m(l),m(a),(function(e,t,a){e?(console.error(e),console.log("response",a)):(console.log(t),h(t),c(!0))}))}("TSLA",3)}),[]),r.a.createElement("div",{style:{margin:"5pt"}},r.a.createElement("div",{style:{fontSize:"2rem",borderBottom:" dotted 2px white"}},"News"),r.a.createElement(w,{style:{},height:"100%",background:"red"},r.a.createElement("div",null,function(){if(n)return console.log(n),console.log(s),s.map((function(e,t){return r.a.createElement("a",{className:"newsItem",key:t,rel:"noopener noreferrer",href:e.url,style:{textDecoration:"none",color:"inherit",display:"grid",justifyContent:"space-between",gridTemplateColumns:"auto auto",fontSize:"0.8rem"}},r.a.createElement("span",{style:{color:"rgba(255, 255, 255, 0.5)",display:"inline-block"}}," ",function(e){var t=Math.floor(new Date/1e3),a=new Date(t-e);return a>864e5?"".concat(a.getDate(),"d ago"):a>36e5?"".concat(a.getHours(),"h ago"):a>6e4?"".concat(a.getMinutes(),"m ago"):"0m ago"}(e.datetime)," |")," ",r.a.createElement("span",null,e.headline))}))}())))}),q=function(e){return r.a.createElement(Z,null,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 400px",height:"100%",width:"100%"}},r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white",gridColumn:"1 / span 2"}},r.a.createElement("p",{style:{color:"azure"}},"1")),r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"2")),r.a.createElement("div",{style:{backgroundColor:"tansparent",maxHeight:"400px",width:"100%",border:" 0.5pt solid white"}},r.a.createElement(P,{newsFrom:"TSLA"})))," ")},X=(r.a.Component,function(){var e=Object(l.useState)([]),t=Object(f.a)(e,2),a=t[0],n=t[1];Object(l.useEffect)((function(){fetch("".concat("http://localhost:8080","/data")).then((function(e){return e.json()})).then((function(e){return n(e.data)}))}),[]);return r.a.createElement(Z,null,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridTemplateRows:"1fr 1fr",height:"100%",width:"100%"}},r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white",gridColumn:"1 / span 2"}},r.a.createElement("p",{style:{color:"azure"}},"1"),function(e){return e.map((function(e,t){return r.a.createElement("p",null,e)}))}(a)),r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white",gridColumn:"3",gridRow:"1/span 2"}},r.a.createElement("p",{style:{color:"azure"}},"2")),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"3")),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"4")))," ")}),Y=function(){return r.a.createElement(Z,null,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",height:"100%",width:"100%"}},r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white",gridRow:"1 / span 2"}},r.a.createElement("p",{style:{color:"azure"}},"1")),r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"2")),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"3")))," ")},J=function(e){return r.a.createElement("div",null,r.a.createElement("div",null),r.a.createElement("div",null),e.children)},K=a(104),$=a.n(K),Q=a(24),ee=a.n(Q),te=function(e){Object(m.a)(l,e);var t=Object(d.a)(l);function l(){var e;return Object(s.a)(this,l),(e=t.call(this)).getFinnhubData=function(t){var l=a(38);l.ApiClient.instance.authentications.api_key.apiKey="bu175nv48v6sgaqqtllg";var r=new l.DefaultApi,n=Math.floor(Date.now()/1e3);console.log("time",n),r.stockCandles(t,"M",n-31536e3,n,{adjusted:!0},(function(a,l,r){if(a&&console.log("Error",a),"no_data"==l.s)return console.log("status of data:",l.s),console.log(r);e.x=l,e.x=e.changeDataOrder(e.x),e.updateChart(t,e.x)}))},e.updateChart=function(t,a){e.dataTable.remove(),e.dataTable.addData(a),e.firstPlot=e.chartInstance.plot(0),e.firstPlot.candlestick(e.dataTable.mapAs({open:1,high:2,low:3,close:4,value:5})).fill("#1976d2 0.65").name(t)},e.changeDataOrder=function(e){for(var t=[],a=0;a<e.c.length;a++){var l=[1e3*e.t[a],e.o[a].toFixed(2),e.h[a].toFixed(2),e.l[a].toFixed(2),e.c[a].toFixed(2),e.v[a].toFixed(2)];t.push(l)}return t},e.getDataAndUpdateChart=function(){e.getFinnhubData()},e.x=0,e.chartInstance=ee.a.stock(),e.dataTable=ee.a.data.table(),e.firstPlot=e.chartInstance.plot(0),e.chartInstance.splitters().normal().stroke({color:"red",dash:"3 4",thickness:1,opacity:.9}),e.state={data:[],dataIsRetrieved:!1},e.getDataThrottled=z()(e.getFinnhubData,2e3),e}return Object(h.a)(l,[{key:"componentDidMount",value:function(){var e=sessionStorage.getItem("stockSymbol");null!==e?this.getFinnhubData(e):this.getFinnhubData("BA")}},{key:"someBTNOnClick",value:function(e){console.log("Button Click")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("button",{id:"someBTN",type:"button",onClick:this.someBTNOnClick},"Warnings")," ",r.a.createElement(J,{id:"container"},r.a.createElement($.a,{instance:this.chartInstance,id:"anychart",type:"column",width:600,height:400})))}}]),l}(l.Component),ae=function(){return r.a.createElement(Z,null,r.a.createElement("div",{style:{display:"grid",gridTemplateRows:"1fr 1fr",height:"100%",width:"100%"}},r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement(te,{style:{height:"100%",width:"100%"}})),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement(P,{newsFrom:"TSLA"})))," ")},le=function(){return r.a.createElement(Z,null,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",height:"100%",width:"100%"}},r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white",gridColumn:"1 / span 2"}},r.a.createElement("p",{style:{color:"azure"}},"1")),r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"2")),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"3")))," ")},re=function(){return r.a.createElement(Z,null,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",height:"100%",width:"100%"}},r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"1")),r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"2")),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"3")),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"4")))," ")},ne=function(){return r.a.createElement(Z,null,r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",height:"100%",width:"100%"}},r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white",gridColumn:"1 / span 2"}},r.a.createElement("p",{style:{color:"azure"}},"1")),r.a.createElement("div",{style:{backgroundColor:"transparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"2")),r.a.createElement("div",{style:{backgroundColor:"tansparent",height:"100%",width:"100%",border:" 0.5pt solid white"}},r.a.createElement("p",{style:{color:"azure"}},"3")))," ")};var ce=function(){return r.a.createContext("light"),r.a.createElement("div",{className:"App"},r.a.createElement(o.a,null,r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/app"},r.a.createElement(X,null)),r.a.createElement(i.a,{path:"/app/watchlist"},r.a.createElement(q,null)," "),r.a.createElement(i.a,{path:"/app/alerts"},r.a.createElement(Y,null)," "),r.a.createElement(i.a,{path:"/app/stocks"},r.a.createElement(ae,null)," "),r.a.createElement(i.a,{path:"/app/trade"},r.a.createElement(re,null)),r.a.createElement(i.a,{path:"/app/robo-trade"}," ",r.a.createElement(le,null)),r.a.createElement(i.a,{path:"*"},r.a.createElement(ne,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},25:function(e,t,a){}},[[106,1,2]]]);
//# sourceMappingURL=main.10d3e40d.chunk.js.map