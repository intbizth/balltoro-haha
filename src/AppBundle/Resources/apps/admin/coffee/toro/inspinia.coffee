define [
    'jquery'
    'bootstrap'
    'slimScroll'
    'metisMenu'
], ($) ->
    #   INSPINIA - Responsive Admin Theme
    #   version 2.2

    # check if browser support HTML5 local storage
    localStorageSupport = ->
        'localStorage' of window and window['localStorage'] != null

    SmoothlyMenu = ->
        if !$('body').hasClass('mini-navbar') or $('body').hasClass('body-small')
    # Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide()
            # For smoothly turn on menu
            setTimeout (->
                $('#side-menu').fadeIn 500
            ), 100
        else if $('body').hasClass('fixed-sidebar')
            $('#side-menu').hide()
            setTimeout (->
                $('#side-menu').fadeIn 500
            ), 300
        else
            # Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr 'style'

    # Dragable panels
    WinMove = ->
        element = '[class*=col]'
        handle = '.ibox-title'
        connect = '[class*=col]'
        $(element).sortable(
            handle: handle
            connectWith: connect
            tolerance: 'pointer'
            forcePlaceholderSize: true
            opacity: 0.8).disableSelection()

    $ ->
        # Add body-small class if window less than 768px
        # Full height of sidebar
        fix_height = ->
            heightWithoutNavbar = $('body > #wrapper').height() - 61
            $('.sidebard-panel').css 'min-height', heightWithoutNavbar + 'px'
            navbarHeigh = $('nav.navbar-default').height()
            wrapperHeigh = $('#page-wrapper').height()

            if navbarHeigh > wrapperHeigh
                $('#page-wrapper').css 'min-height', navbarHeigh + 'px'
            if navbarHeigh < wrapperHeigh
                $('#page-wrapper').css 'min-height', $(window).height() + 'px'
            if $('body').hasClass('fixed-nav')
                $('#page-wrapper').css 'min-height', $(window).height() - 60 + 'px'

        if $(this).width() < 769
            $('body').addClass 'body-small'
        else
            $('body').removeClass 'body-small'

        # MetsiMenu
        $('#side-menu').metisMenu()

        # Collapse ibox function
        $('.collapse-link').click ->
            ibox = $(this).closest('div.ibox')
            button = $(this).find('i')
            content = ibox.find('div.ibox-content')
            content.slideToggle 200
            button.toggleClass('fa-chevron-up').toggleClass 'fa-chevron-down'
            ibox.toggleClass('').toggleClass 'border-bottom'
            setTimeout (->
                ibox.resize()
                ibox.find('[id^=map-]').resize()
            ), 50

        # Close ibox function
        $('.close-link').click ->
            content = $(this).closest('div.ibox')
            content.remove()

        # Close menu in canvas mode
        $('.close-canvas-menu').click ->
            $('body').toggleClass 'mini-navbar'
            SmoothlyMenu()

        # Open close right sidebar
        $('.right-sidebar-toggle').click ->
            $('#right-sidebar').toggleClass 'sidebar-open'

        # Initialize slimscroll for right sidebar
        $('.sidebar-container').slimScroll
            height: '100%'
            railOpacity: 0.4
            wheelStep: 10

        # Open close small chat
        $('.open-small-chat').click ->
            $(this).children().toggleClass('fa-comments').toggleClass 'fa-remove'
            $('.small-chat-box').toggleClass 'active'

        # Initialize slimscroll for small chat
        $('.small-chat-box .content').slimScroll
            height: '234px'
            railOpacity: 0.4

        # Small todo handler
        $('.check-link').click ->
            button = $(this).find('i')
            label = $(this).next('span')
            button.toggleClass('fa-check-square').toggleClass 'fa-square-o'
            label.toggleClass 'todo-completed'
            return false

        # Minimalize menu
        $('.navbar-minimalize').click ->
            $('body').toggleClass 'mini-navbar'
            SmoothlyMenu()

        # Tooltips demo
        $('.tooltip-demo').tooltip
            selector: '[data-toggle=tooltip]'
            container: 'body'

        # Move modal to body
        # Fix Bootstrap backdrop issu with animation.css
        $('.modal').appendTo 'body'

        fix_height()

        # Fixed Sidebar
        $(window).bind 'load', ->
            if $('body').hasClass('fixed-sidebar')
                $('.sidebar-collapse').slimScroll
                    height: '100%'
                    railOpacity: 0.9

        # Move right sidebar top after scroll
        $(window).scroll ->
            if $(window).scrollTop() > 0 and !$('body').hasClass('fixed-nav')
                $('#right-sidebar').addClass 'sidebar-top'
            else
                $('#right-sidebar').removeClass 'sidebar-top'

        $(window).bind 'load resize scroll', ->
            if !$('body').hasClass('body-small')
                fix_height()

        $('[data-toggle=popover]').popover()

        # Add slimscroll to element
        $('.full-height-scroll').slimscroll height: '100%'

    # Minimalize menu when screen is less than 768px
    $(window).bind 'resize', ->
        if $(this).width() < 769
            $('body').addClass 'body-small'
        else
            $('body').removeClass 'body-small'

    # Local Storage functions
    # Set proper body class and plugins based on user configuration
    $ ->
        if localStorageSupport
            collapse = localStorage.getItem('collapse_menu')
            fixedsidebar = localStorage.getItem('fixedsidebar')
            fixednavbar = localStorage.getItem('fixednavbar')
            boxedlayout = localStorage.getItem('boxedlayout')
            fixedfooter = localStorage.getItem('fixedfooter')
            body = $('body')

            if fixedsidebar == 'on'
                body.addClass 'fixed-sidebar'
                $('.sidebar-collapse').slimScroll
                    height: '100%'
                    railOpacity: 0.9

            if collapse == 'on'
                if body.hasClass('fixed-sidebar')
                    if !body.hasClass('body-small')
                        body.addClass 'mini-navbar'
                else
                    if !body.hasClass('body-small')
                        body.addClass 'mini-navbar'

            if fixednavbar == 'on'
                $('.navbar-static-top').removeClass('navbar-static-top').addClass 'navbar-fixed-top'
                body.addClass 'fixed-nav'

            if boxedlayout == 'on'
                body.addClass 'boxed-layout'

            if fixedfooter == 'on'
                $('.footer').addClass 'fixed'

    $ ->
        $('[data-toggle="tooltip"]', document.body).tooltip
            container: 'body'
