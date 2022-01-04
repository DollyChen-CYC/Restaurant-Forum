(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-353afd7d"],{"498a":function(t,e,a){"use strict";var r=a("23e7"),n=a("58a8").trim,i=a("c8d2");r({target:"String",proto:!0,forced:i("trim")},{trim:function(){return n(this)}})},5652:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container py-5"},[a("AdminNav"),a("form",{staticClass:"my-4 row"},[a("div",{staticClass:"col-5"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCategoryName,expression:"newCategoryName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"新增餐廳類別..."},domProps:{value:t.newCategoryName},on:{input:function(e){e.target.composing||(t.newCategoryName=e.target.value)}}})]),a("div",{staticClass:"col-auto"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.createCategory.apply(null,arguments)}}},[t._v(" 新增 ")])])]),a("table",{staticClass:"table"},[t._m(0),a("tbody",t._l(t.categories,(function(e){return a("tr",{key:e.id},[a("th",{attrs:{scope:"row"}},[t._v(" "+t._s(e.id)+" ")]),a("td",{staticClass:"position-relative"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!category.isEditing"}],staticClass:"category-name"},[t._v(" "+t._s(e.name)+" ")]),a("input",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"category.isEditing"},{name:"model",rawName:"v-model",value:e.name,expression:"category.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.name},on:{input:function(a){a.target.composing||t.$set(e,"name",a.target.value)}}}),a("span",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"category.isEditing"}],staticClass:"cancel",on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.cancelEditing(e.id)}}},[t._v(" ✕ ")])]),a("td",{staticClass:"d-flex justify-content-between"},[a("button",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!category.isEditing"}],staticClass:"btn btn-link btn-primary mr-2",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.toggleIsEditing(e.id)}}},[t._v(" Edit ")]),a("button",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"category.isEditing"}],staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.updateCategory(e.id,e.name)}}},[t._v(" Save ")]),a("button",{staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteCategory(e.id)}}},[t._v(" Delete ")])])])})),0)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col",width:"60"}},[t._v("#")]),a("th",{attrs:{scope:"col"}},[t._v("Category Name")]),a("th",{attrs:{scope:"col",width:"210"}},[t._v("Action")])])])}],i=a("5530"),s=a("1da1"),o=(a("96cf"),a("d81d"),a("498a"),a("4de4"),a("d3b7"),a("b0c0"),a("e04c")),c=a("be6c"),u=a("2fa3"),d={components:{AdminNav:o["a"]},data:function(){return{categories:[],newCategoryName:"",isProcessing:!1}},created:function(){this.fetchCategories()},methods:{fetchCategories:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c["a"].categories.get();case 3:if(a=e.sent,r=a.data,!r.length){e.next=7;break}throw new Error("error");case 7:t.categories=r.categories.map((function(t){return Object(i["a"])(Object(i["a"])({},t),{},{isEditing:!1,nameCached:""})})),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),u["a"].fire({icon:"error",title:"目前無法取得餐廳類別，請稍後再試"});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},createCategory:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,t.isProcessing=!0,a=t.newCategoryName.trim(),a.length){e.next=5;break}throw new Error("輸入無效的餐廳類別名稱");case 5:return e.next=7,c["a"].categories.create({name:a});case 7:if(r=e.sent,n=r.data,"success"===n.status){e.next=11;break}throw new Error(n.message);case 11:t.categories.push({id:n.categoryId,name:t.newCategoryName}),t.newCategoryName="",t.isProcessing=!1,e.next=20;break;case 16:e.prev=16,e.t0=e["catch"](0),t.isProcessing=!1,u["a"].fire({icon:"error",title:"目前無法新增餐廳類別，請稍後再試 \n (".concat(e.t0,")")});case 20:case"end":return e.stop()}}),e,null,[[0,16]])})))()},deleteCategory:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,c["a"].categories.delete({categoryId:t});case 3:if(r=a.sent,n=r.data,"success"===n.status){a.next=7;break}throw new Error(n.message);case 7:e.categories=e.categories.filter((function(e){return e.id!==t})),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](0),u["a"].fire({icon:"error",title:"無法刪除餐廳清單，請稍後再試"});case 13:case"end":return a.stop()}}),a,null,[[0,10]])})))()},toggleIsEditing:function(t){this.categories=this.categories.map((function(e){return e.id===t?Object(i["a"])(Object(i["a"])({},e),{},{isEditing:!e.isEditing,nameCached:e.name}):e}))},updateCategory:function(t,e){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,c["a"].categories.update({categoryId:t,name:e});case 3:if(n=r.sent,i=n.data,"success"===i.status){r.next=7;break}throw new Error(i.message);case 7:a.toggleIsEditing(t),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),u["a"].fire({icon:"error",title:"無法更新餐廳類別，請稍後再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},cancelEditing:function(t){this.categories=this.categories.map((function(e){return e.id===t?Object(i["a"])(Object(i["a"])({},e),{},{name:e.nameCached}):e})),this.toggleIsEditing(t)}}},l=d,g=(a("e52b"),a("2877")),m=Object(g["a"])(l,r,n,!1,null,"7c5bde10",null);e["default"]=m.exports},be6c:function(t,e,a){"use strict";a("b0c0");var r=a("2fa3");e["a"]={categories:{get:function(){return r["b"].get("admin/categories")},create:function(t){var e=t.name;return r["b"].post("/admin/categories",{name:e})},update:function(t){var e=t.categoryId,a=t.name;return r["b"].put("/admin/categories/".concat(e),{name:a})},delete:function(t){var e=t.categoryId;return r["b"].delete("/admin/categories/".concat(e))}},restaurants:{create:function(t){var e=t.formData;return r["b"].post("/admin/restaurants",e)},getDetail:function(t){var e=t.restaurantId;return r["b"].get("/admin/restaurants/".concat(e))},getAdminRestaurants:function(){return r["b"].get("/admin/restaurants")},deleteRestaurant:function(t){var e=t.restaurantId;return r["b"].delete("/admin/restaurants/".concat(e))},updateDetail:function(t){var e=t.restaurantId,a=t.formData;return r["b"].put("/admin/restaurants/".concat(e),a)}},users:{getUsers:function(){return Object(r["b"])("/admin/users")},setAdmin:function(t){var e=t.userId,a=t.isAdmin;return r["b"].put("/admin/users/".concat(e),{isAdmin:a})}}}},c8d2:function(t,e,a){var r=a("5e77").PROPER,n=a("d039"),i=a("5899"),s="​᠎";t.exports=function(t){return n((function(){return!!i[t]()||s[t]()!==s||r&&i[t].name!==t}))}},e04c:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mb-3"},[a("h1",[t._v("餐廳後台")]),a("router-link",{attrs:{to:{name:"admin-restaurants"}}},[t._v("Restaurants")]),t._v(" | "),a("router-link",{attrs:{to:{name:"admin-categories"}}},[t._v("Categories")]),t._v(" | "),a("router-link",{attrs:{to:{name:"admin-users"}}},[t._v("Users")])],1)},n=[],i=a("2877"),s={},o=Object(i["a"])(s,r,n,!1,null,null,null);e["a"]=o.exports},e52b:function(t,e,a){"use strict";a("f58f")},f58f:function(t,e,a){}}]);
//# sourceMappingURL=chunk-353afd7d.d4d7f62e.js.map