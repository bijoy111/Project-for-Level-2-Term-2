$('.table td.row-link').each(function(){
    $(this).css('cursor','pointer').hover(
        function(){ 
            $(this).parent().addClass('active'); 
        },  
        function(){ 
            $(this).parent().removeClass('active'); 
        }).click( function(){ 
            document.location = $(this).parent().attr('data-href'); 
        }
    );
});
