'use strict';
document.documentElement.classList.add('has-wolf-js');
const hero=document.querySelector('.hero'),veil=document.querySelector('.hero-gradient');
const process=document.querySelector('.process'),visual=document.querySelector('.process-visual'),frame=document.querySelector('.drawing-frame');
const steps=[...document.querySelectorAll('.drawing-step')],count=document.querySelector('.step-count');
let scheduled=false,current=-1;
function loadImage(image){if(image.dataset.src&&!image.getAttribute('src')){image.loading='eager';image.addEventListener('load',schedule,{once:true});image.src=image.dataset.src;}}
function update(){
 scheduled=false;
 const cover=hero.getBoundingClientRect(),screen=document.querySelector('.hero-sticky').clientHeight;
 if(cover.bottom>0)veil.style.setProperty('--veil',String(.8*(1-Math.min(1,Math.max(0,-cover.top/screen)))));
 const box=visual.getBoundingClientRect();
 if(box.bottom>=0&&box.top<=innerHeight*1.5){
  const range=Math.max(1,visual.clientHeight-frame.clientHeight);
  const index=Math.min(steps.length-1,Math.max(0,Math.round((-box.top+innerHeight*.05)/range*(steps.length-1))));
  loadImage(steps[index]);if(steps[index+1])loadImage(steps[index+1]);
  // Keep the previous frame visible while the next one is decoding.
  if(!steps[index].complete||!steps[index].naturalWidth)return;
  if(index!==current){steps.forEach((step,i)=>step.classList.toggle('active',i===index));count.textContent=`${index+1} / ${steps.length}`;current=index;}
 }
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});window.visualViewport?.addEventListener('resize',schedule,{passive:true});
new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){loadImage(steps[0]);loadImage(steps[1]);schedule();}},{rootMargin:'1200px'}).observe(process);
update();
const wholeMap=document.querySelector('.whole-map');wholeMap.addEventListener('toggle',()=>{if(!wholeMap.open)return;const image=wholeMap.querySelector('img');if(!image.getAttribute('src')){image.srcset=image.dataset.srcset;image.src=image.dataset.src;}});
if(location.hash==='#primer')wholeMap.open=true;
const dialog=document.querySelector('.lightbox'),large=dialog.querySelector('img'),open=dialog.querySelector('.open-image');
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{large.src=button.dataset.zoom;large.alt=button.querySelector('img').alt;open.href=button.dataset.zoom;dialog.showModal();}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
