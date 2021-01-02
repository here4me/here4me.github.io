    /* global here4Me */
    
    here4Me.addEventListener('initialize', function (message) {

    let swiperH = new Swiper('.swiper-container-h', {
      spaceBetween: 50,
      pagination: {
        el: '.swiper-pagination-h',
        clickable: true
      }
    });
    
    let swiperV = new Swiper('.swiper-container-v', {
      direction: 'vertical',
      spaceBetween: 50,
      pagination: {
        el: '.swiper-pagination-v',
        clickable: true
      }
    });
    
    here4Me.resize();
});