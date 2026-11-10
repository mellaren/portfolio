'use strict';
const hero=document.querySelector('.hero'),veil=document.querySelector('.hero-gradient');
let scheduled=false,coverVisible=true;
function updateCover(){scheduled=false;const screen=document.querySelector('.hero-sticky').clientHeight;const progress=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/screen));veil.style.setProperty('--veil',String(.84*(1-progress)))}
function scheduleCover(){if(!scheduled){scheduled=true;requestAnimationFrame(updateCover)}}
new IntersectionObserver(([entry])=>{coverVisible=entry.isIntersecting;if(coverVisible)scheduleCover()}).observe(hero);
window.addEventListener('scroll',()=>{if(coverVisible)scheduleCover()},{passive:true});window.addEventListener('resize',scheduleCover,{passive:true});window.visualViewport?.addEventListener('resize',scheduleCover,{passive:true});updateCover();
document.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{const enabled=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(enabled));document.getElementById(button.dataset.layer).classList.toggle('is-off',!enabled)}));
document.querySelectorAll('[data-compare]').forEach(button=>button.addEventListener('click',()=>{const comparison=button.closest('.comparison');comparison.classList.toggle('is-final',button.dataset.compare==='final');comparison.querySelectorAll('[data-compare]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)))}));
document.querySelectorAll('[data-terrain]').forEach(button=>button.addEventListener('click',()=>{const enabled=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(enabled));const layer=button.dataset.terrain==='terrain-land'?document.getElementById('terrain-land'):document.querySelector('.terrain-layer.'+button.dataset.terrain);layer.classList.toggle('is-off',!enabled)}));
const assembleButton = document.querySelector('.assemble');
const separateLabel = assembleButton.dataset.assembledLabel || 'Separate the layers';
const assembleLabel = assembleButton.textContent;
assembleButton.addEventListener('click', () => {
  const assembled = assembleButton.getAttribute('aria-pressed') !== 'true';
  assembleButton.setAttribute('aria-pressed', String(assembled));
  assembleButton.textContent = assembled ? separateLabel : assembleLabel;
  document.querySelector('.terrain').classList.toggle('is-assembled', assembled);
});
const wholeMap=document.querySelector('.whole-map');wholeMap.addEventListener('toggle',()=>{if(!wholeMap.open)return;const image=wholeMap.querySelector('img');if(!image.getAttribute('src')){image.srcset=image.dataset.srcset;image.src=image.dataset.src}});if(location.hash==='#primer')wholeMap.open=true;
document.querySelectorAll('a[href="#arcticdem"],a[href="#srtm"]').forEach(link=>link.addEventListener('click',()=>{document.querySelector(link.getAttribute('href')).open=true}));
const lightbox=document.querySelector('.lightbox'),enlarged=lightbox.querySelector('img');document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{enlarged.src=button.dataset.zoom;enlarged.alt=button.querySelector('img').alt;lightbox.showModal()}));lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
