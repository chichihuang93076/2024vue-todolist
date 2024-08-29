import{h as U,u as B,r as d,i,j as O,k as C,c as h,a as t,t as f,w as $,v as I,n as w,F as M,l as E,o as _,m as F}from"./index-CfavdQTc.js";const g=(T,p,l,c,a)=>U.fire({icon:T,title:p,text:l,timer:c,timerProgressBar:a}),P={id:"todoListPage",class:"bg-half"},j=t("h1",null,[t("a",{href:"#"},"ONLINE TODO LIST")],-1),R={class:"todo_sm"},W={href:"#"},q={class:"conatiner todoListPage vhContainer"},G={class:"todoList_Content"},H={class:"inputBox"},J=t("i",{class:"fa fa-plus"},null,-1),K=[J],Q={key:0,class:"todoList_list"},X={class:"todoList_tab"},Y={class:"todoList_items"},Z={class:"todoList_item"},tt={class:"todoList_label"},ot=["onChange","onUpdate:modelValue"],st=["onClick"],et=t("i",{class:"fa fa-times"},null,-1),at=[et],nt={class:"todoList_statistics"},lt={key:1,className:"emptyList"},it=t("h6",{className:"emptytext"},"目前尚無待辦事項",-1),ct=t("img",{className:"emptypic",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/empty 1.png",alt:"empty1"},null,-1),rt=[it,ct],r="https://todolist-api.hexschool.io",dt={__name:"TodoView",setup(T){var x;const p=B(),l=d(""),c=d([]),a=d("全部"),y=d(""),u=d("");let n="";u.value=(x=document.cookie.split("; ").find(o=>o.startsWith("hexschoolTodo=")))==null?void 0:x.split("=")[1],u.value&&(n=u.value),i.defaults.headers.common.Authorization=u,O(()=>{L(),console.log("the component is now mounted.")});const L=async()=>{const o=new Date;o.setDate(o.getDate()+1),document.cookie=`hexschoolTodo=${n}; expires=${o.toUTCString()}`;try{const s=await i.get(`${r}/users/checkout`,{headers:{Authorization:n}});y.value=s.data.nickname,m(),console.log("驗證成功 UID: "+s.data.uid)}catch(s){console.log("驗證失敗: "+s.message),p.push("/signin")}},b=async()=>{try{(await i.post(`${r}/users/sign_out`,{},{headers:{Authorization:u.value}})).data.status&&(document.cookie="hexschoolTodo=",y.value="",p.push("/"))}catch(o){console.log("登出失敗"),alert("登出失敗",o.response.data.message)}},v=o=>{a.value=o},z=C(()=>{var o;return(o=c.value)==null?void 0:o.filter(s=>a.value==="待完成"?!s.status:a.value==="已完成"?s.status:s)}),A=async o=>{try{const s=await i.patch(`${r}/todos/${o}/toggle`,{},{headers:{Authorization:n}});console.log(s.data.status),m()}catch(s){alert("toggle失敗",s.response.data.message)}},D=async()=>{if(!(!l.value.trim()||!n))try{const o={content:l.value};await i.post(`${r}/todos/`,o,{headers:{Authorization:n}}),l.value="",g("success","訊息","資料新增成功",2e3,!0),m()}catch{g("error","訊息","新增資料時發生錯誤",2e3,!0)}},N=async o=>{try{await i.delete(`${r}/todos/${o}`,{headers:{Authorization:n}})}catch(s){g("error","訊息","刪除資料時發生錯誤"+s.response.data.message,5e3,!0)}},S=o=>{N(o),m()},m=async()=>{try{const o=await i.get(`${r}/todos/`,{headers:{Authorization:n}});c.value=o.data.data,v(a.value)}catch(o){g("error","訊息","資料取得發生錯誤"+o.response.data.message,5e3,!0)}},V=C(()=>c.value.filter(o=>!o.status).length);return(o,s)=>(_(),h("div",P,[t("nav",null,[j,t("ul",null,[t("li",R,[t("a",W,[t("span",null,f(y.value)+"的代辦",1)])]),t("li",null,[t("a",{onClick:b},"登出")])])]),t("div",q,[t("div",G,[t("div",H,[$(t("input",{type:"text",placeholder:"請輸入待辦事項","onUpdate:modelValue":s[0]||(s[0]=e=>l.value=e)},null,512),[[I,l.value]]),t("a",{onClick:D},K)]),c.value.length>0?(_(),h("div",Q,[t("ul",X,[t("li",null,[t("a",{class:w({active:a.value==="全部"}),name:"全部",onClick:s[1]||(s[1]=e=>v("全部"))},"全部",2)]),t("li",null,[t("a",{class:w({active:a.value==="待完成"}),name:"待完成",onClick:s[2]||(s[2]=e=>v("待完成"))},"待完成",2)]),t("li",null,[t("a",{class:w({active:a.value==="已完成"}),name:"已完成",onClick:s[3]||(s[3]=e=>v("已完成"))},"已完成",2)])]),t("div",Y,[t("ul",Z,[(_(!0),h(M,null,E(z.value,e=>(_(),h("li",{key:e.id},[t("label",tt,[$(t("input",{class:"todoList_input",type:"checkbox",value:"true",onChange:k=>A(e.id),"onUpdate:modelValue":k=>e.status=k},null,40,ot),[[F,e.status]]),t("span",null,f(e.content),1)]),t("a",{onClick:k=>S(e.id)},at,8,st)]))),128))]),t("div",nt,[t("p",null,f(V.value)+" 個未完成項目",1)])])])):(_(),h("div",lt,rt))])])]))}};export{dt as default};
