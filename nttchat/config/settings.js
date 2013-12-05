module.exports = {
    POST_MAX_SIZE : 40 , //MB
    UPLOAD_MAX_FILE_SIZE: 40, //MB
    ROOT_DIR : (__dirname + '/../').replace(new RegExp(/[\\|\/][^\/|\\]+\/\.\.\//g),"\\"),
    DATABASE: {database:'nttchat',user:'root',password:'7144'},
};