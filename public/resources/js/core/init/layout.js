//
// Layout
//

'use strict';

var Layout = (function() {

    function pinSidenav($this) {
        $('.sidenav-toggler').addClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-unpin');
        $('body').addClass('sidenav-pinned ready');
        $('body').find('.main-content').append('<div class="sidenav-mask mask-body d-xl-none" data-action="sidenav-unpin" data-target='+$this.data('target')+' />');

        var $sidenav = $($this.data('target'));

        $sidenav.addClass('show');

        // Store the sidenav state in a cookie session
        localStorage.setItem('sidenav-state', 'pinned');

        // alert('pinned')
    }

    function unpinSidenav($this) {
        $('.sidenav-toggler').removeClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-pin');
        $('body').removeClass('sidenav-pinned');
        $('body').addClass('ready')
        $('body').find('.sidenav-mask').remove();

        var $sidenav = $($this.data('target'));

        $sidenav.removeClass('show');

        // Store the sidenav state in a cookie session
        localStorage.setItem('sidenav-state', 'unpinned');

        // alert('unpinned')
    }

    // Set sidenav state from cookie

    var $sidenavState = localStorage.getItem('sidenav-state') ? localStorage.getItem('sidenav-state') : 'pinned';

	$(window).on({
		'load resize': function() {
            if($('.sidenav-toggler').length) {
                if($(window).width() < 1200) {
                    unpinSidenav($('.sidenav-toggler'));
                } else {
                    if($sidenavState == 'pinned') {
                        pinSidenav($('.sidenav-toggler'));
                    }
                    else if($sidenavState == 'unpinned') {
                        unpinSidenav($('.sidenav-toggler'));
                    }
                }
            } else {
                $('body').addClass('ready');
            }
		}
	})

    $("body").on("click", "[data-action]", function(e) {

        e.preventDefault();

        var $this = $(this);
        var action = $this.data('action');
        var target = $this.data('target');

        switch (action) {
            case "offcanvas-open":
                target = $this.data("target"), $(target).addClass("open"), $("body").append('<div class="body-backdrop" data-action="offcanvas-close" data-target=' + target + " />");
                break;

            case "offcanvas-close":
                target = $this.data("target"), $(target).removeClass("open"), $("body").find(".body-backdrop").remove();
                break;

            case 'aside-open':
                target = $this.data('target');
                $this.addClass('active');
                $(target).addClass('show');
                $('body').append('<div class="mask-body mask-body-light" data-action="aside-close" data-target='+target+' />');
                break;

            case 'aside-close':
                target = $this.data('target');
                $this.removeClass('active');
                $(target).removeClass('show');
                $('body').find('.body-backdrop').remove();
                break;

            case 'omnisearch-open':
                target = $this.data('target');
                $this.addClass('active');
                $(target).addClass('show');
                $(target).find('.form-control').focus();
                $('body').addClass('omnisearch-open').append('<div class="mask-body mask-body-dark" data-action="omnisearch-close" data-target="'+target+'" />');
                break;

            case 'omnisearch-close':
                target = $this.data('target');
                $('[data-action="search-open"]').removeClass('active');
                $(target).removeClass('show');
                $('body').removeClass('omnisearch-open').find('.mask-body').remove();
                break;

            case 'search-open':
                target = $this.data('target');
                $this.addClass('active');
                $(target).addClass('show');
                $(target).find('.form-control').focus();
                break;

            case 'search-close':
                target = $this.data('target');
                $('[data-action="search-open"]').removeClass('active');
                $(target).removeClass('show');
                break;

            case 'sidenav-pin':
                pinSidenav($this);
                break;

            case 'sidenav-unpin':
                unpinSidenav($this);
                break;
        }
    })

    // Add sidenav modifier classes on mouse events

    // $('.sidenav').on('mouseenter', function() {
    //     if(! $('body').hasClass('g-sidenav-pinned')) {
    //         $('body').removeClass('g-sidenav-hide').removeClass('g-sidenav-hidden').addClass('g-sidenav-show');
    //     }
    // })
    //
    // $('.sidenav').on('mouseleave', function() {
    //     if(! $('body').hasClass('g-sidenav-pinned')) {
    //         $('body').removeClass('g-sidenav-show').addClass('g-sidenav-hide');
    //
    //         setTimeout(function() {
    //             $('body').removeClass('g-sidenav-hide').addClass('g-sidenav-hidden');
    //         }, 300);
    //     }
    // })

    // Offset an element by giving an existing element's class or id from the same page

    if($('[data-offset-top]').length) {
        var $el = $('[data-offset-top]'),
            $offsetEl = $($el.data('offset-top')),
            offset = $offsetEl.height();


        $el.css({'padding-top':offset+'px'})
    }
})();
