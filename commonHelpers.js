import{S as m,i as u}from"./assets/vendor-46aac873.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const f=document.querySelector("form"),a=document.querySelector(".images");let h=new m(".images a",{captionsData:"alt",captionDelay:250});f.addEventListener("submit",r=>{r.preventDefault(),a.innerHTML=`
    <li>
        <span class="loader"></span>
    </li>`;const i=r.target.elements.search.value,s=new URLSearchParams({key:"41610080-031e2cebad3f84a1c0bee486b",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});fetch(`https://pixabay.com/api/?${s}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()}).then(d).catch(g),r.target.elements.search.value=""});const d=r=>{if(r.hits.length===0)throw new Error(r.status);a.innerHTML=r.hits.reduce((i,{largeImageURL:s,webformatURL:o,tags:e,likes:t,views:n,comments:l,downloads:c})=>i+`
    <li class="img">
       <a href="${s}"><img src="${o}" alt="${e}"></a>
      <ul class="img-info">
        <li class="img-info-item"><span>Likes</span> ${t}</li>
        <li class="img-info-item"><span>Views</span> ${n}</li>
        <li class="img-info-item"><span>Comments</span> ${l}</li>
        <li class="img-info-item"><span>Downloads</span> ${c}</li>
      </ul>
    </li>`,""),h.refresh()},g=()=>{u.show({message:"Sorry, there are no images matching your search query. Please try again!",maxWidth:432,iconUrl:"../images/error-icon.svg",iconColor:"#FFFFFF",backgroundColor:"#EF4040",messageColor:"#FFFFFF",position:"topRight"}),a.innerHTML=""};
//# sourceMappingURL=commonHelpers.js.map
