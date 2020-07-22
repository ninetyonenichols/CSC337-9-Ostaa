/*
 * This file allows users to create accounts / add items by sending AJAX
     requests to the server.
 * Author: Justin Nichols
 * Class: CSC337
 */

function addUser() {
  $.ajax({
    url: '/add/user',
    method: 'POST',
    data: {  
      username: $('#username').val(),
      password: $('#password').val(),
    }
  });
}

function addItem() {
  $.ajax({
    url: `add/item/${$('username').val()}`,
    method: 'POST',
    data: {  
      title: $('title').val();  
      desc: $('desc').val();  
      image: $('image').val();  
      price: $('price').val();  
      avail: $('avail').val();  
      seller: $('seller').val();  
    }
  });
}
