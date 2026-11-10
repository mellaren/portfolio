'use strict';
const dialog=document.querySelector('.lightbox'),large=dialog.querySelector('img'),open=dialog.querySelector('.open-image');
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{large.src=button.dataset.zoom;large.alt=button.querySelector('img').alt;open.href=button.dataset.zoom;dialog.showModal();}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
