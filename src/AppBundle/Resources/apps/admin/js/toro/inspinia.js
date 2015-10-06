define(['jquery', 'bootstrap', 'slimScroll', 'metisMenu'], function($) {
  var SmoothlyMenu, WinMove, localStorageSupport;
  localStorageSupport = function() {
    return 'localStorage' in window && window['localStorage'] !== null;
  };
  SmoothlyMenu = function() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
      $('#side-menu').hide();
      return setTimeout((function() {
        return $('#side-menu').fadeIn(500);
      }), 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
      $('#side-menu').hide();
      return setTimeout((function() {
        return $('#side-menu').fadeIn(500);
      }), 300);
    } else {
      return $('#side-menu').removeAttr('style');
    }
  };
  WinMove = function() {
    var connect, element, handle;
    element = '[class*=col]';
    handle = '.ibox-title';
    connect = '[class*=col]';
    return $(element).sortable({
      handle: handle,
      connectWith: connect,
      tolerance: 'pointer',
      forcePlaceholderSize: true,
      opacity: 0.8
    }).disableSelection();
  };
  $(function() {
    var fix_height;
    fix_height = function() {
      var heightWithoutNavbar, navbarHeigh, wrapperHeigh;
      heightWithoutNavbar = $('body > #wrapper').height() - 61;
      $('.sidebard-panel').css('min-height', heightWithoutNavbar + 'px');
      navbarHeigh = $('nav.navbar-default').height();
      wrapperHeigh = $('#page-wrapper').height();
      if (navbarHeigh > wrapperHeigh) {
        $('#page-wrapper').css('min-height', navbarHeigh + 'px');
      }
      if (navbarHeigh < wrapperHeigh) {
        $('#page-wrapper').css('min-height', $(window).height() + 'px');
      }
      if ($('body').hasClass('fixed-nav')) {
        return $('#page-wrapper').css('min-height', $(window).height() - 60 + 'px');
      }
    };
    if ($(this).width() < 769) {
      $('body').addClass('body-small');
    } else {
      $('body').removeClass('body-small');
    }
    $('#side-menu').metisMenu();
    $('.collapse-link').click(function() {
      var button, content, ibox;
      ibox = $(this).closest('div.ibox');
      button = $(this).find('i');
      content = ibox.find('div.ibox-content');
      content.slideToggle(200);
      button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
      ibox.toggleClass('').toggleClass('border-bottom');
      return setTimeout((function() {
        ibox.resize();
        return ibox.find('[id^=map-]').resize();
      }), 50);
    });
    $('.close-link').click(function() {
      var content;
      content = $(this).closest('div.ibox');
      return content.remove();
    });
    $('.close-canvas-menu').click(function() {
      $('body').toggleClass('mini-navbar');
      return SmoothlyMenu();
    });
    $('.right-sidebar-toggle').click(function() {
      return $('#right-sidebar').toggleClass('sidebar-open');
    });
    $('.sidebar-container').slimScroll({
      height: '100%',
      railOpacity: 0.4,
      wheelStep: 10
    });
    $('.open-small-chat').click(function() {
      $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
      return $('.small-chat-box').toggleClass('active');
    });
    $('.small-chat-box .content').slimScroll({
      height: '234px',
      railOpacity: 0.4
    });
    $('.check-link').click(function() {
      var button, label;
      button = $(this).find('i');
      label = $(this).next('span');
      button.toggleClass('fa-check-square').toggleClass('fa-square-o');
      label.toggleClass('todo-completed');
      return false;
    });
    $('.navbar-minimalize').click(function() {
      $('body').toggleClass('mini-navbar');
      return SmoothlyMenu();
    });
    $('.tooltip-demo').tooltip({
      selector: '[data-toggle=tooltip]',
      container: 'body'
    });
    $('.modal').appendTo('body');
    fix_height();
    $(window).bind('load', function() {
      if ($('body').hasClass('fixed-sidebar')) {
        return $('.sidebar-collapse').slimScroll({
          height: '100%',
          railOpacity: 0.9
        });
      }
    });
    $(window).scroll(function() {
      if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
        return $('#right-sidebar').addClass('sidebar-top');
      } else {
        return $('#right-sidebar').removeClass('sidebar-top');
      }
    });
    $(window).bind('load resize scroll', function() {
      if (!$('body').hasClass('body-small')) {
        return fix_height();
      }
    });
    $('[data-toggle=popover]').popover();
    return $('.full-height-scroll').slimscroll({
      height: '100%'
    });
  });
  $(window).bind('resize', function() {
    if ($(this).width() < 769) {
      return $('body').addClass('body-small');
    } else {
      return $('body').removeClass('body-small');
    }
  });
  $(function() {
    var body, boxedlayout, collapse, fixedfooter, fixednavbar, fixedsidebar;
    if (localStorageSupport) {
      collapse = localStorage.getItem('collapse_menu');
      fixedsidebar = localStorage.getItem('fixedsidebar');
      fixednavbar = localStorage.getItem('fixednavbar');
      boxedlayout = localStorage.getItem('boxedlayout');
      fixedfooter = localStorage.getItem('fixedfooter');
      body = $('body');
      if (fixedsidebar === 'on') {
        body.addClass('fixed-sidebar');
        $('.sidebar-collapse').slimScroll({
          height: '100%',
          railOpacity: 0.9
        });
      }
      if (collapse === 'on') {
        if (body.hasClass('fixed-sidebar')) {
          if (!body.hasClass('body-small')) {
            body.addClass('mini-navbar');
          }
        } else {
          if (!body.hasClass('body-small')) {
            body.addClass('mini-navbar');
          }
        }
      }
      if (fixednavbar === 'on') {
        $('.navbar-static-top').removeClass('navbar-static-top').addClass('navbar-fixed-top');
        body.addClass('fixed-nav');
      }
      if (boxedlayout === 'on') {
        body.addClass('boxed-layout');
      }
      if (fixedfooter === 'on') {
        return $('.footer').addClass('fixed');
      }
    }
  });
  return $(function() {
    return $('[data-toggle="tooltip"]', document.body).tooltip({
      container: 'body'
    });
  });
});
