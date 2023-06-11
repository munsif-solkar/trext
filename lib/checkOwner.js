function checkOwner(data,sess){
        var request_logged = sess.logged;
        var request_login_id = sess.login_id;
        if(request_logged){
                if(request_login_id == sess.login_id){
                        data.owner = true;
                        return data;
                }
        }
        data.owner = false;
        return data;
}

module.exports = checkOwner;
