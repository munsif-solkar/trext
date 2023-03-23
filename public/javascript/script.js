var app= angular.module("texttrack", []);
        app.controller("page-control", ['$scope', function($app){
            $app.genRandom = function(){
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length=6;
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));     
            };
            return result;
            }
        }])
        function copyToClipboard(e){
            e.select();
            document.execCommand('copy');
        }
