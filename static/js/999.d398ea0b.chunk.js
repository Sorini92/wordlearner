"use strict";(self.webpackChunkwordlearner=self.webpackChunkwordlearner||[]).push([[999],{6040:function(e,s,r){r.d(s,{Z:function(){return h}});var t=r(9439),n=r(2791),a=r(6983),i=r(5660),l=r(5633),d=r(3363),c=r.p+"static/media/star.190d870d386afd29523a.png",o=r.p+"static/media/fullstar.c5f087fefef22c2e80ab.png",u=r(3329),h=function(e){var s=e.handleModifyModal,r=e.searchedWord,h=e.cuttedArrayOfWords,m=e.selectedLetter,f=e.setSelectedWord,w=e.selectedWords,x=e.selectedWord,g=e.setSelectedWords,p=e.onAddToFavorite,j=e.loadingStatus,v=e.isShowDate,T=e.isShowTicks,b=e.isReverseWords,_=e.isBlured,N=e.items,k=(0,n.useState)(!1),S=(0,t.Z)(k,2),y=S[0],C=S[1],P=(0,n.useState)(""),W=(0,t.Z)(P,2),I=W[0],R=W[1],Z=(0,n.useRef)(null);(0,n.useEffect)((function(){return function(){return clearTimeout(Z.current)}}),[]),(0,n.useEffect)((function(){T||(C(!1),g([]))}),[T]),(0,n.useEffect)((function(){0===w.length&&C(!1)}),[w.length]);var A=function(e){if(C(e.target.checked),e.target.checked){var s=h.map((function(e){return e.id}));g(s)}else g([])},D=function(e){var s=new Date(e);return"".concat(s.toLocaleTimeString()," ").concat(s.toLocaleDateString())},U=function(e){p(e)},E=function(e){return e.map((function(e){var r=_&&I!==e.id;return(0,u.jsx)(a.Z,{timeout:500,classNames:{appear:"word-appear",appearActive:"word-appear-active",enter:"word-enter",enterActive:"word-enter-active",exit:"word-exit",exitActive:"word-exit-active"},children:(0,u.jsxs)("tr",{className:x.id!==e.id?"word":"word activeWord",onClick:function(){f(e)},children:[T?(0,u.jsx)("td",{className:"wordsTable__ticks",children:(0,u.jsx)("input",{checked:w.includes(e.id)||y,onChange:function(s){return function(e){var s=w.indexOf(e),r=[];-1===s?r=r.concat(w,e):0===s?r=r.concat(w.slice(1)):s===w.length-1?r=r.concat(w.slice(0,-1)):s>0&&(r=r.concat(w.slice(0,s),w.slice(s+1))),g(r)}(e.id)},type:"checkbox"})}):null,(0,u.jsx)("td",{className:"wordsTable__word",children:b?e.russian:e.english}),(0,u.jsx)("td",{className:"wordsTable__translate",style:v?{paddingRight:0}:null,children:(0,u.jsxs)("div",{className:"wordsTable__translate-inner",children:[(0,u.jsx)("div",{onClick:function(){return s=e.id,clearTimeout(Z.current),R(s),void(Z.current=setTimeout((function(){R("")}),2e3));var s},className:r?"blur":"",children:b?e.english:e.russian}),v?null:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{onClick:function(){return s()},className:"wordsTable__translate-inner-pencil",children:(0,u.jsx)("img",{src:d,alt:"modify pencil"})}),(0,u.jsx)("div",{onClick:function(){return U(e)},className:"wordsTable__translate-inner-star",children:e.favorite?(0,u.jsx)("img",{className:"",src:o,alt:"full star"}):(0,u.jsx)("img",{src:c,alt:"star"})})]})]})}),v?(0,u.jsx)("td",{className:"wordsTable__date",children:(0,u.jsxs)("div",{className:"wordsTable__translate-inner",children:[v?D(e.date):null,(0,u.jsx)("div",{onClick:function(){return s()},className:"wordsTable__translate-inner-pencil",children:(0,u.jsx)("img",{src:d,alt:"modify pencil"})}),(0,u.jsx)("div",{onClick:function(){return U(e)},className:"wordsTable__translate-inner-star",children:e.favorite?(0,u.jsx)("img",{className:"",src:o,alt:"full star"}):(0,u.jsx)("img",{src:c,alt:"star"})})]})}):null]})},e.id)}))};return"loading"===j?(0,u.jsx)(l.Z,{}):"error"===j?(0,u.jsx)("div",{className:"error",children:"Something went wrong, error from server"}):(0,u.jsx)(u.Fragment,{children:0===N.length?(0,u.jsx)("div",{className:"emptyTable",children:"You have not added words yet!"}):0===h.length&&m.length>0?(0,u.jsx)("div",{className:"emptyTable",children:"There are no words!"}):0===h.length&&r.length>0?(0,u.jsx)("div",{className:"emptyTable",children:"No searched word!"}):(0,u.jsx)("div",{className:"wordsTable__wrapper",children:(0,u.jsxs)("table",{className:"wordsTable",children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[T?(0,u.jsx)("th",{className:"wordsTable__ticks",children:(0,u.jsx)("input",{type:"checkbox",checked:y,onChange:A})}):null,(0,u.jsx)("th",{className:"wordsTable__wordHeader",children:b?"Russian words":"English words"}),(0,u.jsx)("th",{className:"wordsTable__translateHeader",children:b?"English words":"Russian words"}),v?(0,u.jsx)("th",{className:"wordsTable__dateHeader",children:"Date of adding"}):null]})}),(0,u.jsx)(i.Z,{component:"tbody",children:E(h)})]})})})}},7250:function(e,s,r){r.r(s);var t=r(9434),n=r(2791),a=r(4270),i=r(2877),l=r(344),d=r(6040),c=r(7227),o=r(3329);s.default=function(){var e=(0,t.v9)((function(e){return e.words})),s=e.wordsLoadingStatus,r=e.words,u=e.wordsPerUpload,h=e.sortType,m=e.currentPage,f=e.totalPages,w=e.letter,x=e.isBlured,g=e.isShowDate,p=e.isReverseWords,j=e.isShowTicks,v=(0,t.I0)(),T=(0,l.Z)(),b=T.isAuth,_=T.id,N={firstUrl:"users",secondUrl:_,thirdUrl:"words"};return(0,n.useEffect)((function(){null!==_&&v((0,i.UA)(_))}),[_]),b?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(a.q,{children:[(0,o.jsx)("meta",{name:"description",content:"words page"}),(0,o.jsx)("title",{children:"Words"})]}),(0,o.jsx)(c.Z,{sortItems:[{name:"from new"},{name:"from old"},{name:"a to z"},{name:"z to a"},{name:"\u0430 to \u044f"},{name:"\u044f to \u0430"}],sortType:h,sortByFunction:i.MR,activeSortTypeChanged:i.eh,setNumberPerUpload:i.id,numberPerUpload:u,currentPage:m,totalPages:f,setPage:i.YA,numberOfItemsPerPage:[{name:30},{name:60},{name:90}],address:N,wordsLoadingStatus:s,deleteItem:i.x8,deleteItems:i.x2,add:i.ge,modify:i.o,setTotalPages:i.K$,TableComponent:d.Z,items:r,letter:w,setLetter:i.rx,isBlured:x,isShowDate:g,isReverseWords:p,isShowTicks:j,setIsBlured:i.PH,setIsShowDate:i.sk,setIsReverseWords:i.Y0,setIsShowTicks:i.vp})]}):null}},3363:function(e,s,r){e.exports=r.p+"static/media/pencil.4b1eb32308269ca45566.png"}}]);
//# sourceMappingURL=999.d398ea0b.chunk.js.map