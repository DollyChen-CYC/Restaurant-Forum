(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2ec8"],{"25d3":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container py-5"},[a("div",[a("h1",[t._v(t._s(t.restaurant.name))]),a("span",{staticClass:"badge bg-primary mt-1 mb-3"},[t._v(" "+t._s(t.restaurant.categoryName)+" ")])]),a("hr"),a("ul",[a("li",[t._v("評論數： "+t._s(t.restaurant.restaurantComments.length))]),a("li",[t._v("瀏覽次數： "+t._s(t.restaurant.viewCounts))])]),a("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.$router.back()}}},[t._v(" 回上一頁 ")])])},n=[],s=a("1da1"),i=(a("96cf"),a("b0c0"),a("a4d3"),a("e01a"),a("c4c3")),o=a("2fa3"),u={data:function(){return{restaurant:{id:-1,name:"",categoryName:"",image:"",openingHours:"",tel:"",address:"",description:"",restaurantComments:[],isFavorited:!1,isLiked:!1,viewCounts:0}}},created:function(){var t=this.$route.params.id;this.fetchRestaurant(t)},beforeRouteUpdate:function(t,e,a){var r=t.params.id;this.fetchRestaurant(r),a()},methods:{fetchRestaurant:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,s,u,c,d,m,l,p,v,f,h,b,g,w;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i["a"].getRestaurant({restaurantId:t});case 3:if(r=a.sent,n=r.data,n.restaurant.name){a.next=7;break}throw new Error("error");case 7:s=n.restaurant,u=n.isFavorited,c=n.isLiked,d=s.id,m=s.name,l=s.Category,p=s.image,v=s.opening_hours,f=s.tel,h=s.address,b=s.description,g=s.Comments,w=s.viewCounts,e.restaurant={id:d,name:m,categoryName:l?l.name:"未分類",image:p,openingHours:v,tel:f,address:h,description:b,restaurantComments:g,viewCounts:w,isFavorited:u,isLiked:c},a.next=15;break;case 12:a.prev=12,a.t0=a["catch"](0),o["a"].fire({icon:"error",title:"無法取得餐廳資料，請稍後再試"});case 15:case"end":return a.stop()}}),a,null,[[0,12]])})))()}}},c=u,d=a("2877"),m=Object(d["a"])(c,r,n,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d0b2ec8.0c4d82f4.js.map