$(function(){

    var name = $('#name'); 
    var birthday= $('#birthday');
  
    
    function addOrder(order) {
        $('#orders').append(
            `<li data-id=‘${order.id}’>
            <p>
            <strong>name:</strong>
                <span class="noedit name">${order.name}</span>
                <input class="edit name"/>        
            </p>
            <p>
                <strong> birth:</strong>
                <span class="noedit birthday">${order.birthday}</span>
                <input class='edit birthday'/> 
            </p>
            <button data-id=${order.id} class='remove'>X</button>
            <button class='editOrder noedit'>Edit</button>
            <button class='cancelEdit edit'>Cancel</button>
            <button class='saveEdit edit'>Save</button>                    
            </li>`)
    }
    $.ajax({
        url: 'http://rest.learncode.academy/api/Yongs/friends',
        type: 'get', 
        success:function(data){           
            if(data!== null){
                console.log('success', data);
                $.each(data, function(i, info){
                    //console.log(info);
                    addOrder(info);
                })
            }
        }          
    })
    $('#add-Order').click(function(){
        var info = {
            name: name.val(), 
            birthday: birthday.val(),
        };
        $.ajax({
            url: 'http://rest.learncode.academy/api/Yongs/friends',
            type: 'post', 
            data: info, 
            success: function(newInfo){
                if(info != null){
                    addOrder(newInfo);                                
                } else {
                    alert('cannot be empty')
                }
            },
            error: function(){
                alert('error upload orders');
            }
        }) 
    })
    $('#orders').delegate('.remove', 'click', function(){

        var li = $(this).closest('li');
        $.ajax({
            url: 'http://rest.learncode.academy/api/Yongs/friends/'+$(this).attr('data-id'),
            type: 'delete', 
            success: function(){
                li.fadeOut(400,function(){
                li.remove();                     
                })
            }
        })
    })
    $('#orders').delegate('.editOrder', 'click',function(){
       var li = $(this).closest('li');

        li.find('input.name').val(li.find('span.name').html());
        li.find('input.birthday').val(li.find('span.birthday').html());
        li.addClass('edit'); 
        console.log(li);
    })

    $('#orders').delegate('.cancelEdit', 'click',function(){
        $(this).closest('li').removeClass('edit');
});
  
$('#orders').delegate('.saveEdit', 'click',function(){
        var li = $(this).closest('li');
        var info = {
        name: li.find('input.name').val(), 
        birthday: li.find('input.birthday').val(), 
        };
        $.ajax({
            type: 'PUT', 
            url: 'http://rest.learncode.academy/api/Yongs/friends/'+li.attr('data-id'),
            data:info, 
            success: function(newOrder) {
                li.find('span.name').html(order.name); 
                li.find('span.birthday').html(order.birthday); 
                li.removeClass('edit'); 
                console.log(order.birthday);           
            },
           error: function(){
               alert('error saving info'); 
           }
       })
   })
  
})