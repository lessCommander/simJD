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
        sliderTimer : null, //中间轮播图定时器
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
            
        },
        showMenu2(curInx, r2HotLine){
            let leftArr=[0, 55];
            for(let item of this){
                item.classList.remove('hover');
            }
            this[curInx].classList.add('hover');
            r2HotLine.style.left = leftArr[curInx] + 'px';
        },
        floorTimer: null, //下方两个图片的轮播图定时器
        startfloorSlide(ofloorLis, originW, dir){ //dir代表方向——1：往右，-1：往左
            let curLeft = 0;
            for(let i = 0, len=ofloorLis.length; i < len; i++){
                curLeft =$(ofloorLis[i]).position().left + originW * dir;
                $(ofloorLis[i]).stop(true,true).animate({
                    left: curLeft
                }, 500, function(){
                    handler.cb(ofloorLis[i], originW);
                });
            }
        },
        autofloorSlide(ofloorLis, originW){
            clearInterval(this.floorTimer);
            this.floorTimer = setInterval(this.startfloorSlide.bind(this, ofloorLis, originW, -1), 3000);
        },
        cb(oLi, originW){
            if(parseInt(oLi.offsetLeft) <= -2 * originW){
                oLi.style.left = 2 * originW + 'px';
            }else if(parseInt(oLi.offsetLeft) >= 3 * originW){
                oLi.style.left = -1 * originW + 'px';
            }
        },
        isFourJoinOn: false, //四联图片滚动开关
        fourJoinSlide(imgs, originW, dir){
            let curLeft = 0;
            if(handler.isFourJoinOn) return false;
            for(let i = 0, len = imgs.length; i < len; i++){
                curLeft =$(imgs[i]).position().left + originW * dir;
                $(imgs[i]).stop().animate({
                    left: curLeft
                }, 1000, function(){
                    handler.fourJoinCallback(imgs[i], originW);
                });
            }
            handler.isFourJoinOn = true;
        },
        fourJoinCallback(img, originW){
            if(parseInt(img.offsetLeft) <= -2 * originW){
                img.style.left = originW + 'px';
            }else if(parseInt(img.offsetLeft) >= 2 * originW){
                img.style.left = -1 * originW + 'px';
            }
            handler.isFourJoinOn = false;
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
            item.addEventListener('mouseout', handler.hideMenu, false);
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

        // 登录/注册下的促销和公告tab
        let r2Tabs = document.querySelectorAll('.row2-title-tab'),
            r2Panes = document.querySelectorAll('.row2-pane'),
            r2HotLine = document.querySelector('.hot-line');

        for(let i = 0, len = r2Tabs.length; i < len; i++){
            r2Tabs[i].addEventListener('mouseover', handler.showMenu2.bind(r2Panes, i, r2HotLine), false);
        }

        /* 两张图片的滚动效果 */
        let ofloorWrap = document.querySelector('.floor-col3-wrap'),
            ofloorLis = document.querySelectorAll('.floor-col3-item'),
            originW = ofloorLis[0].offsetWidth,
            floorCtrls = document.querySelectorAll('.floor-col3-bar');

        for(let i = 0, len=ofloorLis.length; i < len; i++){  //初始化位置
            ofloorLis[i].style.left = originW * (i-1) + 'px';
        }

        ofloorWrap.addEventListener('mouseover', () => clearInterval(handler.floorTimer), false);
        ofloorWrap.addEventListener('mouseout', () => handler.autofloorSlide(ofloorLis, originW), false);

        // 上一张
        floorCtrls[0].addEventListener('mouseover', ev => {
            ev.stopPropagation();
            clearInterval(handler.floorTimer);
            floorCtrls[0].classList.add('hover');
            floorCtrls[1].classList.remove('hover');
            handler.startfloorSlide(ofloorLis, originW, 1);
        }, false);
        // 下一张
        floorCtrls[1].addEventListener('mouseover', ev => {
            ev.stopPropagation();
            clearInterval(handler.floorTimer);
            floorCtrls[0].classList.remove('hover');
            floorCtrls[1].classList.add('hover');
            handler.startfloorSlide(ofloorLis, originW, -1)
        }, false);
        
        handler.autofloorSlide(ofloorLis, originW);

        /*四联图片的手动轮播图*/
        let fourImgs= document.querySelectorAll('.floor-col2-item-wrap'),
            fourImgWidth = fourImgs[0].offsetWidth;
        preImg = document.querySelector('#nav-previous2');
        nextImg = document.querySelector('#nav-next2');

        for(let i = 0, len = fourImgs.length; i < len; i++){  //初始化位置
            fourImgs[i].style.left = fourImgWidth * (i-1) + 'px';
        }

        preImg.addEventListener('click', handler.fourJoinSlide.bind(null, fourImgs, fourImgWidth, 1),false);
        nextImg.addEventListener('click', handler.fourJoinSlide.bind(null, fourImgs, fourImgWidth, -1),false);
    }

    init();
})();