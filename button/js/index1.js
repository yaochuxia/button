$(document).ready( function() {
    var $submenu = $('.submenu');
    var $mainmenu = $('.mainmenu');
    $submenu.hide();
    // $submenu.first().delay(400).slideDown(700);
    $submenu.on('click','li', function() {
        $(this).siblings().removeClass('chosen');
        $(this).addClass('chosen');
    });
    $mainmenu.on('click', 'li', function() {
        $(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();
    });
    // $mainmenu.children('li:last-child').on('click', function() {
    //     $mainmenu.fadeOut().delay(500).fadeIn();
    // });

    // var $submenu1 = $('.submenu1');
    // var $mainmenu1 = $('.mainmenu1');
    // $submenu1.hide();
    // // $submenu.first().delay(400).slideDown(700);
    // $submenu1.on('click','li', function() {
    //     $submenu1.siblings().find('li').removeClass('chosen');
    //     $(this).addClass('chosen');
    // });
    // $mainmenu1.on('click', 'li', function() {
    //     $(this).next('.submenu1').slideToggle().siblings('.submenu1').slideUp();
    // });
    // $mainmenu1.children('li:last-child').on('click', function() {
    //     $mainmenu1.fadeOut().delay(500).fadeIn();
    // });
});


