/*
 * This file allows users to create accounts / add items by sending AJAX
     requests to the server.
 * Author: Justin Nichols
 * Class: CSC337
 */

/*
 * Adds a user to the databse.
 */
function addUser() {
  $.ajax({
    url: '/add/user',
    method: 'POST',
    data: {  
      username: $('#username').val(),
      password: $('#password').val()
    }
  });
}

/*
 * Adds an item to the database.
 */
function addItem() {
  let seller = $('#seller').val();
  $.ajax({
    url: `add/item/${seller}`,
    method: 'POST',
    data: {  
      title: $('#title').val(),  
      desc: $('#desc').val(), 
      image: $('#image').val(),  
      price: $('#price').val(),  
      avail: $('#avail').val(),  
      seller: $('#seller').val()  
    }
  });
}
