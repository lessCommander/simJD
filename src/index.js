import './css/index.css';

(function(){
    let handler = {
        cityMenu: null,
        showCityMenu: function(){
            this.classList.add('hover');
        },
        hideCityMenu: function(){
            this.classList.remove('hover');
        }
    };

    let init = function(){
        bindEvent();
    };

    let bindEvent = function(){
        let cityDrop = document.getElementById('city-dropdown');

        // handler.cityMenu = document.getElementById('dropdown-menu');
        cityDrop.addEventListener('mouseover', handler.showCityMenu, false);
        cityDrop.addEventListener('mouseleave', handler.hideCityMenu, false);
    }

    init();
})();