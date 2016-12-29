
/*********************************************************************
Cookie Functions
**********************************************************************/
    set_cookie(cname, cvalue, exdays=false, path=false){ //by default it will expire if you close the browser
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires= (exdays) ? "expires="+d.toUTCString() : '';
        path= (path) ? ";path="+path : ''; //you can define path to attach a path to this specific url;
        document.cookie = cname + "=" + cvalue + ";" + expires + path;
    },

    get_cookie(cname) { //if cname=='all' get all
        var name = cname + "=";
        var ca = document.cookie.split(';');
        if(cname=='all'){
            let all_cookies = {};
            for(item of ca){
                let ar = item.split('=');
                if(ar[1]) all_cookies[ar[0].trim()] = ar[1];
            }
            return all_cookies;            
        }
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {c = c.substring(1); }
            if (c.indexOf(name) == 0) {return c.substring(name.length, c.length); }
        }
        return false;
    },


    delete_cookie(cname){ //if all: delete all cookies
        if(cname!='all') document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        else{
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) delete_cookie(cookies[i].split('=')[0].trim());
        }
    }
/**********************************************************************/

