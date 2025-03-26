(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6098:function(e,s,t){Promise.resolve().then(t.bind(t,7904))},7904:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return X}});var a=t(3827),r=t(4090),n=t(1639),l=t(3167),i=t(1367);function c(){for(var e=arguments.length,s=Array(e),t=0;t<e;t++)s[t]=arguments[t];return(0,i.m6)((0,l.W)(s))}let d=n.fC,o=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)(n.aV,{ref:s,className:c("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",t),...r})});o.displayName=n.aV.displayName;let x=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)(n.xz,{ref:s,className:c("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",t),...r})});x.displayName=n.xz.displayName;let m=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)(n.VY,{ref:s,className:c("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...r})});m.displayName=n.VY.displayName;let h=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:c("rounded-lg border bg-card text-card-foreground shadow-sm",t),...r})});h.displayName="Card";let u=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:c("flex flex-col space-y-1.5 p-6",t),...r})});u.displayName="CardHeader";let p=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("h3",{ref:s,className:c("text-lg font-semibold leading-none tracking-tight",t),...r})});p.displayName="CardTitle",r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("p",{ref:s,className:c("text-sm text-muted-foreground",t),...r})}).displayName="CardDescription";let j=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:c("p-6 pt-0",t),...r})});j.displayName="CardContent",r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:c("flex items-center p-6 pt-0",t),...r})}).displayName="CardFooter";var f=t(9769);let g=(0,f.j)("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),y=r.forwardRef((e,s)=>{let{className:t,variant:r,...n}=e;return(0,a.jsx)("div",{ref:s,role:"alert",className:c(g({variant:r}),t),...n})});y.displayName="Alert",r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("h5",{ref:s,className:c("mb-1 font-medium leading-none tracking-tight",t),...r})}).displayName="AlertTitle";let v=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:c("text-sm [&_p]:leading-relaxed",t),...r})});v.displayName="AlertDescription";var N=t(9580);let b="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";async function w(){try{if(!b)throw Error("GAS_URLが設定されていません");console.log("Fetching from GAS URL:",b);let e=await fetch(b,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json"},cache:"no-store"});if(!e.ok){let s=await e.text();throw console.error("GAS response error:",{status:e.status,statusText:e.statusText,errorText:s,headers:Object.fromEntries(e.headers.entries())}),Error("データの取得に失敗しました (".concat(e.status,": ").concat(e.statusText,")"))}let s=await e.json();if(console.log("GAS response:",s),!s.success)throw Error(s.message||"データの取得に失敗しました");return s}catch(e){throw console.error("Error fetching from GAS:",e),e}}async function k(e,s){try{if(!b)throw Error("GAS_URLが設定されていません");console.log("Posting to GAS:",{action:e,data:s});let t=await fetch(b,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({action:e,data:s}),cache:"no-store"});if(!t.ok){let e=await t.text();throw console.error("GAS response error:",{status:t.status,statusText:t.statusText,errorText:e,headers:Object.fromEntries(t.headers.entries())}),Error("データの送信に失敗しました (".concat(t.status,": ").concat(t.statusText,")"))}let a=await t.json();if(console.log("GAS response:",a),!a.success)throw Error(a.message||"データの送信に失敗しました");return a}catch(e){throw console.error("Error posting to GAS:",e),e}}function S(){let[e,s]=(0,r.useState)([]);return{toast:e=>{Date.now(),s(s=>[...s,e]),setTimeout(()=>{s(s=>s.filter(s=>s!==e))},e.duration||3e3)},toasts:e}}var C=()=>{let{toast:e}=S(),[s,t]=(0,r.useState)(!1),[n,l]=(0,r.useState)({date:new Date().toISOString().split("T")[0],salesperson_id:"",approaches:0,appointments:0,meetings:0,trials:0,contracts:0}),[i,c]=(0,r.useState)(null),[d,o]=(0,r.useState)(!1),x=e=>{let{name:s,value:t}=e.target;l(e=>({...e,[s]:"date"===s?t:Number(t)}))},m=async s=>{s.preventDefault(),t(!0),c(null),o(!1);try{(await k("addActivity",{date:n.date,salesperson_id:n.salesperson_id,approaches:n.approaches,appointments:n.appointments,meetings:n.meetings,trials:n.trials,contracts:n.contracts})).success&&(e({title:"成功",description:"活動記録を保存しました"}),l(e=>({...e,approaches:0,appointments:0,meetings:0,trials:0,contracts:0})))}catch(s){e({title:"エラー",description:s instanceof Error?s.message:"活動記録の保存に失敗しました",variant:"destructive"})}finally{t(!1)}};return(0,a.jsxs)(h,{className:"w-full max-w-md mx-auto",children:[(0,a.jsx)(u,{className:"bg-blue-600 text-white",children:(0,a.jsx)(p,{className:"text-xl font-bold text-center",children:"日次営業活動入力"})}),(0,a.jsxs)(j,{className:"pt-6",children:[i&&(0,a.jsx)(y,{variant:"destructive",className:"mb-4",children:(0,a.jsx)(v,{children:i})}),d&&(0,a.jsx)(y,{className:"mb-4",children:(0,a.jsx)(v,{children:"データを保存しました！"})}),(0,a.jsx)("form",{onSubmit:m,children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"date",className:"block text-sm font-medium",children:"日付"}),(0,a.jsx)("input",{type:"date",id:"date",name:"date",value:n.date,onChange:x,className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",required:!0})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"salesperson_id",className:"block text-sm font-medium",children:"営業担当者ID"}),(0,a.jsx)("input",{type:"text",id:"salesperson_id",name:"salesperson_id",value:n.salesperson_id,onChange:x,className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",required:!0})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"approaches",className:"block text-sm font-medium",children:"アプローチ数"}),(0,a.jsx)("input",{type:"number",id:"approaches",name:"approaches",value:n.approaches,onChange:x,min:"0",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"appointments",className:"block text-sm font-medium",children:"アポイント数"}),(0,a.jsx)("input",{type:"number",id:"appointments",name:"appointments",value:n.appointments,onChange:x,min:"0",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"meetings",className:"block text-sm font-medium",children:"商談数"}),(0,a.jsx)("input",{type:"number",id:"meetings",name:"meetings",value:n.meetings,onChange:x,min:"0",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"trials",className:"block text-sm font-medium",children:"トライアル数"}),(0,a.jsx)("input",{type:"number",id:"trials",name:"trials",value:n.trials,onChange:x,min:"0",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"contracts",className:"block text-sm font-medium",children:"契約数"}),(0,a.jsx)("input",{type:"number",id:"contracts",name:"contracts",value:n.contracts,onChange:x,min:"0",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"})]})]}),(0,a.jsx)("div",{className:"flex justify-end",children:(0,a.jsx)("button",{type:"submit",disabled:s,className:"inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:s?(0,a.jsxs)("div",{className:"flex items-center justify-center",children:[(0,a.jsx)(N.Z,{className:"w-4 h-4 mr-2 animate-spin"}),"保存中..."]}):"保存する"})})]})})]})]})},E=t(9143);let A=(0,f.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),D=r.forwardRef((e,s)=>{let{className:t,variant:r,size:n,asChild:l=!1,...i}=e,d=l?E.g7:"button";return(0,a.jsx)(d,{className:c(A({variant:r,size:n,className:t})),ref:s,...i})});D.displayName="Button";let I=r.forwardRef((e,s)=>{let{className:t,type:r,...n}=e;return(0,a.jsx)("input",{type:r,className:c("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",t),ref:s,...n})});I.displayName="Input";var _=t(9259),R=t(2235),T=t(7731),K=t(489),F=t(8435),q=t(4316);function G(){let{toast:e}=S(),[s,t]=(0,r.useState)([]),[n,l]=(0,r.useState)([]),[i,c]=(0,r.useState)(!0),[d,o]=(0,r.useState)(null),[x,m]=(0,r.useState)((0,F.WU)(new Date,"yyyy-MM")),[f,g]=(0,r.useState)(null),y=async()=>{try{var s,a;let e=await w();if(e.success&&(null===(s=e.data)||void 0===s?void 0:s.activities)&&(null===(a=e.data)||void 0===a?void 0:a.salespersons)){let{activities:s,salespersons:a}=e.data,r=s.map(e=>{let s=a.find(s=>s.id===e.salesperson_id);return{...e,salesperson:s}});t(r),l(a)}else throw Error("データの取得に失敗しました")}catch(s){e({title:"エラー",description:s instanceof Error?s.message:"データの取得に失敗しました",variant:"destructive"})}finally{c(!1)}};(0,r.useEffect)(()=>{y()},[]);let v=()=>{g(null)},b=async()=>{if(f)try{let e=await k("updateActivity",f);if(!e.success)throw Error(e.message||"活動データの更新に失敗しました");await y(),g(null)}catch(e){o(e instanceof Error?e.message:"予期せぬエラーが発生しました")}},C=async s=>{if(confirm("このデータを削除してもよろしいですか？"))try{let e=await k("deleteActivity",{id:s});if(!e.success)throw Error(e.message||"活動データの削除に失敗しました");await y()}catch(s){e({title:"エラー",description:s instanceof Error?s.message:"活動データの削除に失敗しました",variant:"destructive"})}},E=(e,s)=>{f&&g({...f,[e]:parseInt(s)||0})},A=(()=>{let e=s.reduce((e,s)=>e+s.approaches,0),t=s.reduce((e,s)=>e+s.appointments,0),a=s.reduce((e,s)=>e+s.meetings,0),r=s.reduce((e,s)=>e+s.contracts,0);return{totalApproaches:e,totalProspects:t,totalMeetings:a,totalContracts:r,prospectRate:e?t/e*100:0,meetingRate:t?a/t*100:0,contractRate:a?r/a*100:0}})();return i?(0,a.jsx)(h,{children:(0,a.jsx)(j,{className:"flex justify-center py-6",children:(0,a.jsx)(N.Z,{className:"h-6 w-6 animate-spin"})})}):(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold",children:"営業活動ダッシュボード"}),(0,a.jsx)("input",{type:"month",value:x,onChange:e=>m(e.target.value),className:"px-3 py-2 border rounded-md"})]}),d&&(0,a.jsx)("div",{className:"bg-red-50 text-red-700 p-4 rounded-md",children:d}),(0,a.jsxs)("div",{className:"grid gap-4 md:grid-cols-2 lg:grid-cols-5",children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:(0,a.jsx)(p,{className:"text-sm font-medium",children:"アプローチ数"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"text-2xl font-bold",children:A.totalApproaches})})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:(0,a.jsx)(p,{className:"text-sm font-medium",children:"アポイント数"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"text-2xl font-bold",children:A.totalProspects})})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:(0,a.jsx)(p,{className:"text-sm font-medium",children:"商談数"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"text-2xl font-bold",children:A.totalMeetings})})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:(0,a.jsx)(p,{className:"text-sm font-medium",children:"契約数"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"text-2xl font-bold",children:A.totalContracts})})]})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"活動データ一覧"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"border-b",children:[(0,a.jsx)("th",{className:"px-4 py-2 text-left",children:"日付"}),(0,a.jsx)("th",{className:"px-4 py-2 text-left",children:"担当者"}),(0,a.jsx)("th",{className:"px-4 py-2 text-right",children:"アプローチ"}),(0,a.jsx)("th",{className:"px-4 py-2 text-right",children:"アポ"}),(0,a.jsx)("th",{className:"px-4 py-2 text-right",children:"商談"}),(0,a.jsx)("th",{className:"px-4 py-2 text-right",children:"契約"}),(0,a.jsx)("th",{className:"px-4 py-2 text-center",children:"操作"})]})}),(0,a.jsx)("tbody",{children:s.map(e=>{var s;return(0,a.jsxs)("tr",{className:"border-b",children:[(0,a.jsx)("td",{className:"px-4 py-2",children:(0,F.WU)(new Date(e.date),"M/d (E)",{locale:q.ja})}),(0,a.jsx)("td",{className:"px-4 py-2",children:(null===(s=e.salesperson)||void 0===s?void 0:s.name)||"不明"}),(null==f?void 0:f.id)===e.id?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("td",{className:"px-4 py-2",children:(0,a.jsx)(I,{type:"number",min:"0",value:f.approaches,onChange:e=>E("approaches",e.target.value),className:"w-20"})}),(0,a.jsx)("td",{className:"px-4 py-2",children:(0,a.jsx)(I,{type:"number",min:"0",value:f.appointments,onChange:e=>E("appointments",e.target.value),className:"w-20"})}),(0,a.jsx)("td",{className:"px-4 py-2",children:(0,a.jsx)(I,{type:"number",min:"0",value:f.meetings,onChange:e=>E("meetings",e.target.value),className:"w-20"})}),(0,a.jsx)("td",{className:"px-4 py-2",children:(0,a.jsx)(I,{type:"number",min:"0",value:f.contracts,onChange:e=>E("contracts",e.target.value),className:"w-20"})}),(0,a.jsx)("td",{className:"px-4 py-2 text-center",children:(0,a.jsxs)("div",{className:"flex justify-center gap-2",children:[(0,a.jsx)(D,{variant:"ghost",size:"sm",onClick:b,children:(0,a.jsx)(_.Z,{className:"h-4 w-4"})}),(0,a.jsx)(D,{variant:"ghost",size:"sm",onClick:v,children:(0,a.jsx)(R.Z,{className:"h-4 w-4"})})]})})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("td",{className:"px-4 py-2 text-right",children:e.approaches}),(0,a.jsx)("td",{className:"px-4 py-2 text-right",children:e.appointments}),(0,a.jsx)("td",{className:"px-4 py-2 text-right",children:e.meetings}),(0,a.jsx)("td",{className:"px-4 py-2 text-right",children:e.contracts}),(0,a.jsx)("td",{className:"px-4 py-2 text-center",children:(0,a.jsxs)("div",{className:"flex justify-center gap-2",children:[(0,a.jsx)(D,{variant:"ghost",size:"sm",onClick:()=>g(e),children:(0,a.jsx)(T.Z,{className:"h-4 w-4"})}),(0,a.jsx)(D,{variant:"ghost",size:"sm",onClick:()=>C(e.id),children:(0,a.jsx)(K.Z,{className:"h-4 w-4"})})]})})]})]},e.id)})})]})})})]})]})}var O=t(7907);let z=e=>{let{prospects:s,statuses:t,onEdit:r,onDelete:n,onStatusChange:l}=e,i=e=>{let s=t.find(s=>s.id===e);return s?s.name:"不明"},c=e=>{switch(e){case 1:default:return"bg-gray-100";case 2:return"bg-blue-100";case 3:return"bg-yellow-100";case 4:return"bg-green-100";case 5:return"bg-purple-100"}};return(0,a.jsx)("div",{className:"overflow-x-auto",children:0===s.length?(0,a.jsx)("p",{className:"text-center py-4",children:"案件がありません"}):(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"企業名"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"担当者"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"ステータス"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"次回アクション"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"アクション"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:s.map(e=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"font-medium text-gray-900",children:e.companyName})}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:[(0,a.jsx)("div",{children:e.contactName}),(0,a.jsx)("div",{className:"text-sm text-gray-500",children:e.contactInfo})]}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("span",{className:"px-2 inline-flex text-xs leading-5 font-semibold rounded-full ".concat(c(e.status)),children:i(e.status)})}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:[(0,a.jsx)("div",{children:e.nextAction}),(0,a.jsx)("div",{className:"text-xs text-gray-400",children:e.nextActionDate})]}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:[(0,a.jsx)(D,{onClick:()=>r(e),variant:"ghost",className:"mr-2",children:"編集"}),(0,a.jsx)(D,{onClick:()=>n(e.id),variant:"ghost",className:"text-red-600 hover:text-red-900",children:"削除"}),(0,a.jsx)("select",{value:e.status,onChange:s=>l(e.id,parseInt(s.target.value)),className:"ml-2 text-sm border rounded p-1",children:t.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name,"に変更"]},e.id))})]})]},e.id))})]})})};var V=()=>{(0,O.useRouter)();let e=(0,O.useSearchParams)(),s=e?e.get("salespersonId"):null,t=[{id:1,name:"アプローチ済"},{id:2,name:"アポ予定"},{id:3,name:"商談実施"},{id:4,name:"トライアル中"},{id:5,name:"契約済"}],[n,l]=(0,r.useState)([]),[i,c]=(0,r.useState)(!0),[f,g]=(0,r.useState)(null),[N,b]=(0,r.useState)({companyName:"",contactName:"",contactInfo:"",status:1,nextAction:"",nextActionDate:"",notes:""}),[S,C]=(0,r.useState)(null),E=e=>{let{name:s,value:t}=e.target;b({...N,[s]:"status"===s?parseInt(t):t})},A=async e=>{e.preventDefault();try{let e={...N,salespersonId:s||void 0};if(S){let s=await k("prospects/update",{id:S,...e});if(!s.success)throw Error(s.message||"案件の更新に失敗しました")}else{let s=await k("prospects/create",e);if(!s.success)throw Error(s.message||"案件の追加に失敗しました")}R(),b({companyName:"",contactName:"",contactInfo:"",status:1,nextAction:"",nextActionDate:"",notes:""}),C(null)}catch(e){g(e instanceof Error?e.message:"予期せぬエラーが発生しました")}},I=e=>{b({companyName:e.companyName,contactName:e.contactName,contactInfo:e.contactInfo,status:e.status,nextAction:e.nextAction,nextActionDate:e.nextActionDate,notes:e.notes}),C(e.id)},_=async e=>{if(confirm("この案件を削除してもよろしいですか？"))try{let s=await k("prospects/delete",{id:e});if(!s.success)throw Error(s.message||"案件の削除に失敗しました");R()}catch(e){g(e instanceof Error?e.message:"予期せぬエラーが発生しました")}},R=async()=>{try{var e;let s=await w();if(!s.success)throw Error(s.message||"案件データの取得に失敗しました");let t=((null===(e=s.data)||void 0===e?void 0:e.prospects)||[]).map(e=>({...e,companyName:e.company,contactName:e.contact,contactInfo:e.email,status:parseInt(e.status),nextAction:e.notes,nextActionDate:e.updated_at,salespersonId:e.salesperson_id}));l(t),g(null)}catch(e){g(e instanceof Error?e.message:"予期せぬエラーが発生しました")}finally{c(!1)}};(0,r.useEffect)(()=>{R()},[s]);let T=(e,s)=>"all"===s?e:e.filter(e=>e.status===parseInt(s)),K=async(e,s)=>{try{let t=n.find(s=>s.id===e);if(!t)return;if(!(await fetch("/api/prospects?id=".concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({...t,status:s})})).ok)throw Error("ステータスの更新に失敗しました");R()}catch(e){g(e instanceof Error?e.message:"予期せぬエラーが発生しました")}};return i?(0,a.jsx)("div",{className:"text-center py-4",children:"読み込み中..."}):(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[f&&(0,a.jsx)(y,{className:"mb-4",children:(0,a.jsx)(v,{children:f})}),(0,a.jsxs)(d,{defaultValue:"all",className:"w-full",children:[(0,a.jsxs)(o,{className:"mb-4",children:[(0,a.jsx)(x,{value:"all",children:"全ての案件"}),t.map(e=>(0,a.jsx)(x,{value:e.id.toString(),children:e.name},e.id))]}),(0,a.jsx)(m,{value:"all",children:(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"全ての案件"})}),(0,a.jsx)(j,{children:(0,a.jsx)(z,{prospects:n,statuses:t,onEdit:I,onDelete:_,onStatusChange:K})})]})}),t.map(e=>(0,a.jsx)(m,{value:e.id.toString(),children:(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsxs)(p,{children:[e.name,"の案件"]})}),(0,a.jsx)(j,{children:(0,a.jsx)(z,{prospects:T(n,e.id.toString()),statuses:t,onEdit:I,onDelete:_,onStatusChange:K})})]})},e.id))]}),(0,a.jsxs)(h,{className:"mt-8",children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:S?"案件を編集":"新規案件を追加"})}),(0,a.jsx)(j,{children:(0,a.jsxs)("form",{onSubmit:A,className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"会社名"}),(0,a.jsx)("input",{type:"text",name:"companyName",value:N.companyName,onChange:E,required:!0,className:"mt-1 block w-full border rounded-md shadow-sm p-2"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"担当者名"}),(0,a.jsx)("input",{type:"text",name:"contactName",value:N.contactName,onChange:E,required:!0,className:"mt-1 block w-full border rounded-md shadow-sm p-2"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"連絡先"}),(0,a.jsx)("input",{type:"text",name:"contactInfo",value:N.contactInfo,onChange:E,required:!0,className:"mt-1 block w-full border rounded-md shadow-sm p-2"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"ステータス"}),(0,a.jsx)("select",{name:"status",value:N.status,onChange:E,className:"mt-1 block w-full border rounded-md shadow-sm p-2",children:t.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"次のアクション"}),(0,a.jsx)("input",{type:"text",name:"nextAction",value:N.nextAction,onChange:E,required:!0,className:"mt-1 block w-full border rounded-md shadow-sm p-2"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"次回アクション日"}),(0,a.jsx)("input",{type:"date",name:"nextActionDate",value:N.nextActionDate,onChange:E,required:!0,className:"mt-1 block w-full border rounded-md shadow-sm p-2"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"備考"}),(0,a.jsx)("textarea",{name:"notes",value:N.notes,onChange:E,className:"mt-1 block w-full border rounded-md shadow-sm p-2",rows:3})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3",children:[(0,a.jsx)(D,{type:"submit",variant:"default",children:S?"更新":"追加"}),S&&(0,a.jsx)(D,{type:"button",variant:"outline",onClick:()=>{C(null),b({companyName:"",contactName:"",contactInfo:"",status:1,nextAction:"",nextActionDate:"",notes:""})},children:"キャンセル"})]})]})})]})]})},P=t(6587),Z=t(6363),U=t(8333),M=t(3356),L=t(2983),B=t(166),Y=t(4866),W=t(8061),J=t(1433),$=t(8485),H=e=>{let{salespersonId:s}=e,[t,n]=(0,r.useState)("1"),[l,i]=(0,r.useState)(null),[c,f]=(0,r.useState)([]),[g,y]=(0,r.useState)([]),[v,N]=(0,r.useState)([]),[b,k]=(0,r.useState)(!0),[S,C]=(0,r.useState)(null);return((0,r.useEffect)(()=>{(async()=>{try{var e,a;let r=await w();if(!r.success)throw Error(r.message||"データの取得に失敗しました");let n=(null===(e=r.data)||void 0===e?void 0:e.activities)||[],l=(null===(a=r.data)||void 0===a?void 0:a.prospects)||[],c=new Date().getMonth()+1,d=new Date().getFullYear(),o=n.filter(e=>{let[s,t]=e.date.split("-").map(Number);return s===d&&t===c}).reduce((e,s)=>({アプローチ数:e.アプローチ数+s.approaches,アポ数:e.アポ数+s.appointments,商談数:e.商談数+s.meetings,契約数:e.契約数+s.contracts}),{アプローチ数:0,アポ数:0,商談数:0,契約数:0}),x={salesPerson:t,期間:"".concat(d,"年").concat(c,"月"),...o,アポ取得率:o.アポ数/o.アプローチ数*100,商談化率:o.商談数/o.アポ数*100,成約率:o.契約数/o.商談数*100,目標達成率:0};i(x);let m=n.map(e=>({date:e.date,アプローチ数:e.approaches,アポ数:e.appointments,商談数:e.meetings,契約数:e.contracts,アポ取得率:e.appointments/e.approaches*100,商談化率:e.meetings/e.appointments*100,成約率:e.contracts/e.meetings*100}));f(m);let h=l.filter(e=>e.salesperson_id===s).reduce((e,s)=>{let t=s.status,a=e.find(e=>e.ステージ===t);return a?(a.件数++,a.案件リスト.push({会社名:s.company,担当者名:s.contact,次回アクション:s.notes,次回アクション日:s.updated_at,商談金額:0})):e.push({ステージ:t,件数:1,案件リスト:[{会社名:s.company,担当者名:s.contact,次回アクション:s.notes,次回アクション日:s.updated_at,商談金額:0}]}),e},[]);y(h),N([{時間帯:"9-11時",アプローチ成功率:35,アポ取得率:25,商談件数:2},{時間帯:"11-13時",アプローチ成功率:28,アポ取得率:20,商談件数:1},{時間帯:"13-15時",アプローチ成功率:42,アポ取得率:32,商談件数:3},{時間帯:"15-17時",アプローチ成功率:38,アポ取得率:28,商談件数:2},{時間帯:"17-19時",アプローチ成功率:30,アポ取得率:22,商談件数:1}])}catch(e){C(e instanceof Error?e.message:"予期せぬエラーが発生しました")}finally{k(!1)}})()},[s]),b)?(0,a.jsx)("div",{children:"データを読み込み中..."}):l?(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsx)("div",{className:"w-full",children:(0,a.jsxs)("select",{value:t,onChange:e=>n(e.target.value),className:"w-full max-w-xs p-2 border rounded-md",children:[(0,a.jsx)("option",{value:"1",children:"鈴木"}),(0,a.jsx)("option",{value:"2",children:"田中"}),(0,a.jsx)("option",{value:"3",children:"佐藤"})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"pb-2",children:(0,a.jsx)(p,{className:"text-sm text-gray-500",children:"アプローチ数"})}),(0,a.jsxs)(j,{children:[(0,a.jsx)("div",{className:"text-2xl font-bold",children:l.アプローチ数}),(0,a.jsxs)("div",{className:"text-sm text-gray-500",children:["目標達成率: ",l.目標達成率,"%"]})]})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"pb-2",children:(0,a.jsx)(p,{className:"text-sm text-gray-500",children:"アポイント数"})}),(0,a.jsxs)(j,{children:[(0,a.jsx)("div",{className:"text-2xl font-bold",children:l.アポ数}),(0,a.jsxs)("div",{className:"text-sm text-gray-500",children:["取得率: ",l.アポ取得率,"%"]})]})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"pb-2",children:(0,a.jsx)(p,{className:"text-sm text-gray-500",children:"商談数"})}),(0,a.jsxs)(j,{children:[(0,a.jsx)("div",{className:"text-2xl font-bold",children:l.商談数}),(0,a.jsxs)("div",{className:"text-sm text-gray-500",children:["商談化率: ",l.商談化率,"%"]})]})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{className:"pb-2",children:(0,a.jsx)(p,{className:"text-sm text-gray-500",children:"契約数"})}),(0,a.jsxs)(j,{children:[(0,a.jsx)("div",{className:"text-2xl font-bold",children:l.契約数}),(0,a.jsxs)("div",{className:"text-sm text-gray-500",children:["成約率: ",l.成約率,"%"]})]})]})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"活動推移"})}),(0,a.jsx)(j,{children:(0,a.jsxs)(d,{defaultValue:"daily",className:"w-full",children:[(0,a.jsxs)(o,{children:[(0,a.jsx)(x,{value:"daily",children:"日次"}),(0,a.jsx)(x,{value:"weekly",children:"週次"}),(0,a.jsx)(x,{value:"monthly",children:"月次"})]}),(0,a.jsx)(m,{value:"daily",children:(0,a.jsx)("div",{className:"h-[400px]",children:(0,a.jsx)(P.h,{width:"100%",height:"100%",children:(0,a.jsxs)(Z.w,{data:c,children:[(0,a.jsx)(U.q,{strokeDasharray:"3 3"}),(0,a.jsx)(M.K,{dataKey:"date"}),(0,a.jsx)(L.B,{}),(0,a.jsx)(B.u,{}),(0,a.jsx)(Y.D,{}),(0,a.jsx)(W.x,{type:"monotone",dataKey:"アプローチ数",stroke:"#8884d8"}),(0,a.jsx)(W.x,{type:"monotone",dataKey:"アポ数",stroke:"#82ca9d"}),(0,a.jsx)(W.x,{type:"monotone",dataKey:"商談数",stroke:"#ffc658"}),(0,a.jsx)(W.x,{type:"monotone",dataKey:"契約数",stroke:"#ff7300"})]})})})})]})})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"転換率推移"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"h-[400px]",children:(0,a.jsx)(P.h,{width:"100%",height:"100%",children:(0,a.jsxs)(Z.w,{data:c,children:[(0,a.jsx)(U.q,{strokeDasharray:"3 3"}),(0,a.jsx)(M.K,{dataKey:"date"}),(0,a.jsx)(L.B,{}),(0,a.jsx)(B.u,{}),(0,a.jsx)(Y.D,{}),(0,a.jsx)(W.x,{type:"monotone",dataKey:"アポ取得率",stroke:"#8884d8"}),(0,a.jsx)(W.x,{type:"monotone",dataKey:"商談化率",stroke:"#82ca9d"}),(0,a.jsx)(W.x,{type:"monotone",dataKey:"成約率",stroke:"#ffc658"})]})})})})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"案件パイプライン"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:g.map((e,s)=>(0,a.jsxs)(h,{className:"bg-gray-50",children:[(0,a.jsx)(u,{className:"pb-2",children:(0,a.jsxs)(p,{className:"text-sm font-medium",children:[e.ステージ,(0,a.jsxs)("span",{className:"ml-2 text-blue-600",children:[e.件数,"件"]})]})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"space-y-2",children:e.案件リスト.map((e,s)=>(0,a.jsxs)("div",{className:"bg-white p-3 rounded-lg shadow-sm",children:[(0,a.jsx)("div",{className:"font-medium",children:e.会社名}),(0,a.jsx)("div",{className:"text-sm text-gray-600",children:e.担当者名}),(0,a.jsxs)("div",{className:"text-sm text-gray-600",children:["次回: ",e.次回アクション,"（",e.次回アクション日,"）"]}),(0,a.jsxs)("div",{className:"text-sm font-medium text-blue-600",children:["\xa5",e.商談金額.toLocaleString()]})]},s))})})]},s))})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"時間帯別活動効率"})}),(0,a.jsx)(j,{children:(0,a.jsx)("div",{className:"h-[300px]",children:(0,a.jsx)(P.h,{width:"100%",height:"100%",children:(0,a.jsxs)(J.v,{data:v,children:[(0,a.jsx)(U.q,{strokeDasharray:"3 3"}),(0,a.jsx)(M.K,{dataKey:"時間帯"}),(0,a.jsx)(L.B,{}),(0,a.jsx)(B.u,{}),(0,a.jsx)(Y.D,{}),(0,a.jsx)($.$,{dataKey:"アプローチ成功率",fill:"#8884d8"}),(0,a.jsx)($.$,{dataKey:"アポ取得率",fill:"#82ca9d"})]})})})})]}),(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"本日のアクション"})}),(0,a.jsx)(j,{children:(0,a.jsxs)("div",{className:"space-y-4",children:[g.flatMap(e=>e.案件リスト.filter(e=>e.次回アクション日===new Date().toISOString().split("T")[0]).map((e,s)=>(0,a.jsxs)("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded-lg",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"font-medium",children:e.会社名}),(0,a.jsx)("div",{className:"text-sm text-gray-600",children:e.次回アクション})]}),(0,a.jsx)("div",{className:"text-sm text-blue-600",children:e.次回アクション日})]},s))),g.every(e=>e.案件リスト.every(e=>e.次回アクション日!==new Date().toISOString().split("T")[0]))&&(0,a.jsx)("div",{className:"text-gray-500 text-center py-4",children:"本日のアクション予定はありません"})]})})]})]})]}):(0,a.jsx)("div",{children:"データが見つかりません"})};function Q(){let[e,s]=(0,r.useState)([]),[t,n]=(0,r.useState)(""),[l,i]=(0,r.useState)(!0),[c,d]=(0,r.useState)(null),[o,x]=(0,r.useState)(!1),m=async()=>{try{var e;let t=await w();if(!t.success)throw Error(t.message||"データの取得に失敗しました");s((null===(e=t.data)||void 0===e?void 0:e.salespersons)||[])}catch(e){console.error("Error fetching salespersons:",e),d(e instanceof Error?e.message:"予期せぬエラーが発生しました")}finally{i(!1)}};(0,r.useEffect)(()=>{m()},[]);let f=async e=>{if(e.preventDefault(),t.trim()){x(!0);try{let e=await k("addSalesperson",{name:t.trim()});if(!e.success)throw Error(e.message||"担当者の追加に失敗しました");n(""),await m(),d("")}catch(e){console.error("Error adding salesperson:",e),d(e instanceof Error?e.message:"担当者の追加に失敗しました")}finally{x(!1)}}},g=async e=>{alert("削除機能は現在サポートされていません")};return(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(0,a.jsx)(p,{children:"担当者管理"})}),(0,a.jsxs)(j,{children:[c&&(0,a.jsx)("div",{className:"mb-4 p-3 bg-red-50 text-red-700 rounded-md",children:c}),(0,a.jsx)("form",{onSubmit:f,className:"mb-6",children:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsx)(I,{type:"text",value:t,onChange:e=>n(e.target.value),placeholder:"担当者名",required:!0}),(0,a.jsx)(D,{type:"submit",disabled:o,children:o?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(N.Z,{className:"mr-2 h-4 w-4 animate-spin"}),"追加中..."]}):"追加"})]})}),(0,a.jsx)("div",{className:"space-y-2",children:l?(0,a.jsx)("div",{className:"flex justify-center py-4",children:(0,a.jsx)(N.Z,{className:"h-6 w-6 animate-spin"})}):0===e.length?(0,a.jsx)("p",{className:"text-gray-500 text-center py-4",children:"担当者が登録されていません"}):e.map(e=>(0,a.jsxs)("div",{className:"flex justify-between items-center p-3 bg-gray-50 rounded",children:[(0,a.jsx)("span",{children:e.name}),(0,a.jsx)(D,{variant:"ghost",size:"sm",onClick:()=>g(e.id),disabled:o,className:"text-red-600 hover:text-red-800",children:"削除"})]},e.id))})]})]})}function X(){let[e,s]=(0,r.useState)("1");return(0,a.jsx)("div",{className:"min-h-screen bg-gray-50",children:(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold mb-8",children:"営業管理システム"}),(0,a.jsx)(r.Suspense,{fallback:(0,a.jsx)("div",{children:"Loading..."}),children:(0,a.jsxs)(d,{defaultValue:"dashboard",className:"w-full",children:[(0,a.jsxs)(o,{className:"mb-8",children:[(0,a.jsx)(x,{value:"dashboard",children:"全体ダッシュボード"}),(0,a.jsx)(x,{value:"personal",children:"担当者別"}),(0,a.jsx)(x,{value:"daily-input",children:"日次入力"}),(0,a.jsx)(x,{value:"prospects",children:"案件管理"}),(0,a.jsx)(x,{value:"salespersons",children:"担当者管理"})]}),(0,a.jsx)(m,{value:"dashboard",children:(0,a.jsx)(G,{})}),(0,a.jsx)(m,{value:"personal",children:(0,a.jsx)(H,{salespersonId:e})}),(0,a.jsx)(m,{value:"daily-input",children:(0,a.jsx)(C,{})}),(0,a.jsx)(m,{value:"prospects",children:(0,a.jsx)(V,{})}),(0,a.jsx)(m,{value:"salespersons",children:(0,a.jsx)(Q,{})})]})})]})})}}},function(e){e.O(0,[341,971,69,744],function(){return e(e.s=6098)}),_N_E=e.O()}]);