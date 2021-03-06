   var name = '';
         var socket = io.connect('http://localhost:8080');
         
         // at document read (runs only ones).
         $(document).ready(function(){
            // on click of the button (jquery thing)
            // the things inside this clause happen only when 
            // the button is clicked.
            $("button").click(function(){
            
               // just some simple logging
               $("p#log").html('sent message: ' + $("input#msg").val());
               
               // send message on inputbox to server
               socket.emit('chat', $("input#msg").val() );
               
               // the server will recieve the message, 
               // then maybe do some processing, then it will 
               // broadcast it again. however, it will not 
               // send it to the original sender. the sender
               // will be the browser that sends the msg. 
               // other browsers listening to the server will
               // recieve the emitted message. therefore we will
               // need to manually print this msg for the sender.
               $("p#data_recieved").append("<br />\r\n" + name + ': ' + $("input#msg").val());
               
               // then we empty the text on the input box.
               $("input#msg").val('');
            });
            
            // ask for the name of the user, ask again if no name.
            while (name == '') {
               name = prompt("What's your name?","");
            }
            
            // send the name to the server, and the server's 
            // register wait will recieve this.
            socket.emit('register', name );
         });
         
         // listen for chat event and recieve data
         socket.on('chat', function (data) {
         
            // print data (jquery thing)
            $("p#data_recieved").append("<br />\r\n" + data.msgr + ': ' + data.msg);
            
            // we log this event for fun :D
            $("p#log").html('got message: ' + data.msg);
            
         });