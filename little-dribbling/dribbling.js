'use strict';
// Delay the Mapbox request until the visitor approaches the map.
const map = document.querySelector('.live-map:not([hidden]) iframe');
if (map) {
    const loadMap = () => {
        map.src = matchMedia('(max-width:700px)').matches ? map.dataset.mobileSrc : map.dataset.mapSrc;
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                loadMap();
                observer.disconnect();
            }
        }, { rootMargin: '600px' });
        observer.observe(map);
    } else {
        loadMap();
    }
}

const dialog=document.querySelector('.lightbox'),large=dialog.querySelector('img'),open=dialog.querySelector('.open-image');
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{large.src=button.dataset.zoom;large.alt=button.querySelector('img').alt;open.href=button.dataset.zoom;dialog.showModal();}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
