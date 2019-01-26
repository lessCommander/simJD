import '../css/index.css';

(function(){
    let handler = {
        showMenu: function(){
            this.classList.add('hover');
        },
        hideMenu: function(){
            this.classList.remove('hover');
        },
        popMenu: function(wrap, item, inx){
            clearTimeout(wrap.timer);
            wrap.curInx = inx;
            wrap.classList.add('hover');
            item.classList.add('hover');
        },
        pushMenu: function(wrap, item, inx){
            wrap.timer = setTimeout(()=>wrap.classList.remove('hover'), 50);
            item.classList.remove('hover');
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
            sidebarItem[i].addEventListener('mouseleave', handler.pushMenu.bind(this,menuWrap, menuArr[i], i), false);
        }
        menuWrap.addEventListener('mouseover', ()=>handler.popMenu(menuWrap, menuArr[menuWrap.curInx], menuWrap.curInx), false);
        menuWrap.addEventListener('mouseleave', ()=>handler.pushMenu(menuWrap, menuArr[menuWrap.curInx], menuWrap.curInx), false);
    }

    init();
})();