(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9535:function(e,r,s){Promise.resolve().then(s.bind(s,4805))},4805:function(e,r,s){"use strict";s.r(r),s.d(r,{default:function(){return c}});var t=s(3827),a=s(4090);async function n(){try{let e="https://script.google.com/macros/s/AKfycbwWiIWzH59AJ7QaRMy2WsVd0nUMIg-z8kkWZ_QWzlAGKpq_l-HSlTiz5pYaVSFumXzZwA/exec";if(!e)throw Error("GAS URLが設定されていません");let r=await fetch(e,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json"}});if(!r.ok)throw Error("HTTP error! status: ".concat(r.status));return await r.json()}catch(e){return console.error("Error fetching from GAS:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function o(e,r){try{let s="https://script.google.com/macros/s/AKfycbwWiIWzH59AJ7QaRMy2WsVd0nUMIg-z8kkWZ_QWzlAGKpq_l-HSlTiz5pYaVSFumXzZwA/exec";if(!s)throw Error("GAS URLが設定されていません");let t=await fetch(s,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e,data:r})});if(!t.ok)throw Error("HTTP error! status: ".concat(t.status));return await t.json()}catch(e){return console.error("Error posting to GAS:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}function c(){let[e,r]=(0,a.useState)([]),[s,c]=(0,a.useState)(!0),[l,i]=(0,a.useState)(null),[d,u]=(0,a.useState)(""),[m,h]=(0,a.useState)(""),p=async()=>{try{var e;let s=await n();s.success&&(null===(e=s.data)||void 0===e?void 0:e.salespersons)?r(s.data.salespersons):i("担当者データの取得に失敗しました")}catch(e){i(e instanceof Error?e.message:"担当者データの取得に失敗しました")}finally{c(!1)}},f=async e=>{e.preventDefault();try{let e=await o("addSalesperson",{name:d,email:m});e.success?(u(""),h(""),p()):i(e.error||"担当者の追加に失敗しました")}catch(e){i(e instanceof Error?e.message:"担当者の追加に失敗しました")}};return((0,a.useEffect)(()=>{p()},[]),s)?(0,t.jsx)("div",{children:"読み込み中..."}):(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"営業担当者一覧"}),l&&(0,t.jsx)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",children:l}),(0,t.jsxs)("form",{onSubmit:f,className:"mb-8 space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium mb-1",children:"名前"}),(0,t.jsx)("input",{type:"text",value:d,onChange:e=>u(e.target.value),className:"w-full p-2 border rounded",required:!0})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium mb-1",children:"メールアドレス"}),(0,t.jsx)("input",{type:"email",value:m,onChange:e=>h(e.target.value),className:"w-full p-2 border rounded",required:!0})]}),(0,t.jsx)("button",{type:"submit",className:"w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600",children:"追加"})]}),(0,t.jsx)("div",{className:"space-y-4",children:0===e.length?(0,t.jsx)("p",{children:"担当者が登録されていません"}):e.map(e=>(0,t.jsxs)("div",{className:"border rounded p-4",children:[(0,t.jsx)("h3",{className:"font-medium",children:e.name}),(0,t.jsx)("p",{className:"text-sm text-gray-500",children:e.email})]},e.id))})]})}}},function(e){e.O(0,[971,69,744],function(){return e(e.s=9535)}),_N_E=e.O()}]);