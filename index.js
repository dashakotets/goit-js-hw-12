import{S as d,i as l}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/",p=t=>{const o=new URLSearchParams({key:"45683137-9da9ef345b4290ae910ded200",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${m}?${o}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},f=t=>`<div class="gallery-card">
    <a href="${t.largeImageURL}"><img src="${t.previewURL}" alt="" title="" class="gallery-img"/></a>
    <div class="card-info">
    <ul class="info-text">
    <li>Likes<span>${t.likes}</span></li>
    <li>Views<span>${t.views}</span></li>
    <li>Comments<span>${t.comments}</span></li>
    <li>Downloads<span>${t.downloads}</span></li>
    </ul>
</div></div>`,a=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),u=document.querySelector(".loader"),h=new d(".gallery a",{captions:!0,captionDelay:250,captionPosition:"bottom"}),g=t=>{t.preventDefault();const o=a.elements.user_query.value;u.classList.toggle("is-hidden"),p(o).then(s=>{if(u.classList.toggle("is-hidden"),s.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c.innerHTML="";return}const i=s.hits.map(e=>f(e)).join("");c.innerHTML=i,h.refresh()}).catch(s=>{l.error({message:s,position:"topRight"})}).finally(()=>{a.reset()})};a.addEventListener("submit",g);
//# sourceMappingURL=index.js.map
