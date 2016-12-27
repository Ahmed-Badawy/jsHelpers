    uc_words(str){
        return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, $1=>$1.toUpperCase())
    },


    getParameterByName(name){
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },


//ask for permission to notify the user, then notify him
    notifyUser(msgHeader,msg,img='http://ahmed-badawy.com/cv/img/me.jpg',url='http://ahmed-badawy.com'){
        if(Notification.permission!='granted'){ //can be (denied/default/granted)
            Notification.requestPermission().then(function(permission){
                if(Notification.permission!='granted') alert('please allow notification for our website.')
            })
        }else{
            notify = new Notification(msgHeader,{
                body: msg,
                icon: img,
                tag: Math.floor((Math.random() * 100) + 1)
            });
            notify.onclick = function(){
                window.location = url;
            }
        }
    },


//create url to a text generated file
    makeTextFile(text,mime_type) {
        var data = new Blob([text], {type: mime_type});
// If we are replacing a previously generated file we need to manually revoke the object URL to avoid memory leaks :
        if (textFile) window.URL.revokeObjectURL(textFile);
        textFile = window.URL.createObjectURL(data);
        return textFile;
    },