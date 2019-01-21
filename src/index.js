import './css/index.css';

(function(){
    let handler = {
        showMenu: function(){
            this.classList.add('hover');
        },
        hideMenu: function(){
            this.classList.remove('hover');
        }
    };

    let init = function(){
        bindEvent();
    };

    let bindEvent = function(){
        let dropdown = document.querySelectorAll('.shortcut-dropdown');

        for(let item of dropdown){
            item.addEventListener('mouseover', handler.showMenu, false);
            item.addEventListener('mouseleave', handler.hideMenu, false);
        }
    }

    init();
})();