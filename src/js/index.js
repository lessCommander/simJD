import '../css/index.css';

(function(){
    let handler = {
        showMenu(){
            this.classList.add('hover');
        },
        hideMenu(){
            this.classList.remove('hover');
        },
        popMenu(wrap, item, inx){
            clearTimeout(wrap.timer);
            wrap.curInx = inx;
            wrap.classList.add('hover');
            item.classList.add('hover');
        },
        pushMenu(wrap, item, inx){
            wrap.timer = setTimeout(()=>wrap.classList.remove('hover'), 50);
            item.classList.remove('hover');
        },
        sliderTimer : null,
        sliderCurInx : 0,
        startSlide(oImgs, oldInx, newInx, oNavBars){
            if(newInx < 0){
                newInx = this.sliderCurInx = oImgs.length - 1;
            }else if(newInx >= oImgs.length){
                newInx = this.sliderCurInx = 0;
            }
            oImgs[oldInx].classList.remove('img-hover');
            oNavBars[oldInx].classList.remove('img-hover');
            oImgs[newInx].classList.add('img-hover');
            oNavBars[newInx].classList.add('img-hover');
        },
        autoSlide(oImgs, oNavBars){
            clearInterval(this.sliderTimer);
            this.sliderTimer = setInterval(() => {
                this.startSlide(oImgs, this.sliderCurInx, ++this.sliderCurInx, oNavBars);
            }, 3000);
            
        }
    };

    let init = function(){
        bindEvent();
    };

    let bindEvent = function(){
        // 顶部导航下拉菜单
        let dropdown = document.querySelectorAll('.shortcut-dropdown');

        for(let item of dropdown){
            item.addEventListener('mouseover', handler.showMenu, false);
            item.addEventListener('mouseleave', handler.hideMenu, false);
        }

        // 左侧菜单
        let sidebarItem = document.querySelectorAll('.col1-item'),
            menuWrap = document.querySelector('.sidebar-pop-wrap'),
            menuArr = document.querySelectorAll('.sidebar-pop');

        for(let i = 0, len = sidebarItem.length; i < len; i++){
            sidebarItem[i].addEventListener('mouseover', handler.popMenu.bind(this, menuWrap, menuArr[i], i), false);
            sidebarItem[i].addEventListener('mouseout', handler.pushMenu.bind(this,menuWrap, menuArr[i], i), false);
        }
        menuWrap.addEventListener('mouseover', ()=>handler.popMenu(menuWrap, menuArr[menuWrap.curInx], menuWrap.curInx), false);
        menuWrap.addEventListener('mouseout', ()=>handler.pushMenu(menuWrap, menuArr[menuWrap.curInx], menuWrap.curInx), false);

        // 轮播图
        let mdSlider = document.querySelector('.md-slider'),
            sliderItem = document.querySelectorAll('.md-img'),
            navBar = document.querySelectorAll('.nav-bar'),
            preImg = document.querySelector('.nav-previous'),
            nextImg = document.querySelector('.nav-next');
        
        handler.autoSlide(sliderItem, navBar); // 自动开始轮播
        mdSlider.addEventListener('mouseover', ()=>clearInterval(handler.sliderTimer), false);
        mdSlider.addEventListener('mouseout', ()=>handler.autoSlide(sliderItem, navBar), false);
        preImg.addEventListener('click', ()=>handler.startSlide(sliderItem, handler.sliderCurInx, --handler.sliderCurInx, navBar), false);
        nextImg.addEventListener('click', ()=>handler.startSlide(sliderItem, handler.sliderCurInx, ++handler.sliderCurInx, navBar), false);
        for(let i = 0, len = navBar.length; i < len; i++){
            navBar[i].addEventListener('mouseover', ()=>{
                clearInterval(handler.sliderTimer);
                handler.startSlide(sliderItem, handler.sliderCurInx, handler.sliderCurInx = i, navBar);
            }, false);
            navBar[i].addEventListener('mouseout', ()=>handler.autoSlide(sliderItem, navBar), false);
        }
    }

    init();
})();