// YOUR CODE HERE:
var username = window.location.search.substr(10)
var rooms = {};
var friendsList = [];
var app;
$(document).ready(function() {
  app = {
    server: 'http://127.0.0.1:3000/classes/messages',
    room: 'lobby',
    username: username || 'anonymous',

    init: function() {
      app.updateRooms();
      app.fetch();
      $("#roomSelect").append('<option>lobby</option>').val("lobby");
      setInterval(function(){
        app.fetch();
      }, 5000);
    },

    send: function(message) {
      app.startSpinner();
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(message),
        dataType: 'text',
        contentType: 'application/json',
        success: function (data) {
          app.clearMessages();
          app.fetch();
          console.log('chatterbox: Message sent. Data: ', data);
          app.stopSpinner(); 
        },
        error: function (data) {
          console.log('chatterbox: Failed to send message. Error: ', data);
        }
      });
    },

    fetch: function() {
      app.startSpinner();
      $.ajax({
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
        success: function (data){
          data = JSON.parse(data);
          app.selectRoom(data);
          app.stopSpinner(); 
          console.log('chatterbox: Messages received. Data: ', data);
        },
        error: function (data) {
          console.error('chatterbox: Failed to receive message. Error: ', data);
        }
      });
    },

    //CLEAR MESSAGES FROM CHATS
    clearMessages: function() {
      $("#chats").empty();
      
    },

    //
    populate: function(data) {
      for(var i = 0; i < data.length; i++) {  //removed results
        var user = $('<span class="username"></span>');
        user.text(data[i].username || 'anonymous'); //removed results
        var msg= $('<span></span>');
        for(var j=0;j<friendsList.length;j++){
          if(data[i].username===friendsList[j]){  //removed results
            var msg= $('<span class="friend"></span>');
            break;
          }
        }   
        msg.text(data[i].message || '');  //removed results
        var line = $('<div class="chat"></div>');
        line.append(user);
        line.append(': ');
        line.append(msg);
        $('#chats').append(line);
      }
    },

    addMessage: function(message) {
      var user = $('<span class="username"></span>');
      user.text(message.username || 'anonymous');
      var msg = $('<span></span>');
      msg.text(message.message || '');
      var line = $('<div class="chat"></div>');
      line.append(user);
      line.append(': ');
      line.append(msg);
      $("#chats").append(line)
    },

    handleSubmit: function() {
      var value = $("#send").val();
      var message = {
       username: username,
       message: value,
       roomname: $('#roomSelect option:selected').val()
      };
      app.send(message);
      $("#send").val("");
    },

    updateRooms: function() {
      app.startSpinner();
      $.ajax({
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
        success: function (data){
          data = JSON.parse(data);
          for(var i = 0; i < data.length; i++) {  //removed results.
            if (!rooms[data[i].roomname]) {
              rooms[data[i].roomname] = data[i].roomname;
            }
          }
          for (var key in rooms) {
            $("#roomSelect").append($("<option></option>").val(key).html(key));
          }   
          console.log('update rooms-chatterbox: Messages received. Data: ', data);
          app.stopSpinner();  
        },
        error: function (data) {
          console.error('update rooms-chatterbox: Failed to receive message. Error: ', data);
        }
      });
    },

    addRoom: function(room) {
      $("#roomSelect").append($("<option></option>").val(room).html(room));
    },

    addFriend: function(friend) {
      if (friendsList.indexOf(friend) === -1) {
        friendsList.push(friend);
      }
    },

    selectRoom: function(data) {
      var roomMessages = [];
      var selected = $('#roomSelect option:selected').val() || 'lobby';
      for(var i=0;i<data.length;i++){  //removed .results from data
        if(data[i].roomname===selected){
          roomMessages.push(data[i])
        }
      }
      app.clearMessages();
      app.populate(roomMessages);
    },

    startSpinner: function() {
      $('.spinner img').show();
    },

    stopSpinner: function() {
      $('.spinner img').hide();
    }

  };

  $(".submit").click(function(event) {
    event.preventDefault();
    app.handleSubmit();
  });
  $("#clear").click(function() {
    app.clearMessages();
  })
  $("#refresh").click(function() {
    app.fetch();
  })
  $("#roomSelect").change(function() {
    app.fetch();
  })
  $("#newRoom").click(function() {
    var newRoom = prompt("Room Name: ");
    app.addRoom(newRoom);
  })
  $(document).on('click', '.username', function() {
    var newFriend = $(this).text();
    app.addFriend(newFriend);
  })
  app.init();
});