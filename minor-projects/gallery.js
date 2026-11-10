'use strict';
const gallery=document.querySelector('.gallery');
const thumbs=[...gallery.querySelectorAll('.thumbnails button')];
const picture=gallery.querySelector('.stage img');
const counter=gallery.querySelector('.counter');
const previous=gallery.querySelector('.previous'),next=gallery.querySelector('.next');
const dialog=document.querySelector('.lightbox');
let selected=0;
function select(index){selected=(index+thumbs.length)%thumbs.length;picture.src=thumbs[selected].dataset.full;picture.alt=thumbs[selected].querySelector('img').alt;counter.textContent=`${selected+1} / ${thumbs.length}`;thumbs.forEach((button,i)=>button.setAttribute('aria-current',String(i===selected)));}
previous.disabled=next.disabled=thumbs.length<2;
previous.addEventListener('click',()=>select(selected-1));next.addEventListener('click',()=>select(selected+1));
thumbs.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
gallery.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();select(selected+(event.key==='ArrowLeft'?-1:1));}});
let touchStart=null;
gallery.querySelector('.stage').addEventListener('touchstart',event=>{touchStart=event.touches[0].clientX;},{passive:true});
gallery.querySelector('.stage').addEventListener('touchend',event=>{if(touchStart!==null){const distance=event.changedTouches[0].clientX-touchStart;if(Math.abs(distance)>55){select(selected+(distance<0?1:-1));}}touchStart=null;},{passive:true});
gallery.querySelector('.zoom').addEventListener('click',()=>{dialog.querySelector('img').src=picture.src;dialog.querySelector('img').alt=picture.alt;dialog.querySelector('.open-original').href=picture.src;dialog.showModal();});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
