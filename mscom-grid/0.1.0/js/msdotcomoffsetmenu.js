var MSdotcomOffsetMenu = MSdotcomOffsetMenu || {
    page: $('.page').first(),
    leftMenuButton: $('#offset-left-button'),
    leftMenu: $('#msdotcomoffsetmenuleft'),
    leftCloseButton: $('#msdotcomoffsetmenuleft .close-button'),
    leftDockButton: $('#msdotcomoffsetmenuleft .dock-button'),

    Start: function () {
        MSdotcomOffsetMenu.leftMenuButton.on('click', function () {
            window.requestAnimationFrame(MSdotcomOffsetMenu.ToggleMainNav);
        });

        MSdotcomOffsetMenu.RemoveTabIndexOfNavItems();

        $(window).on("resize", function(e) {
            window.requestAnimationFrame(MSdotcomOffsetMenu.HandleDock);
        });

        $(document.body)
        .on('keydown', function (e) {
            var code = e.keyCode || e.which;
            if (code === 27) {
                window.requestAnimationFrame(MSdotcomOffsetMenu.CloseMainNavIfOpen);
            }
        })
        .on('click', '.page', function (e) {
            window.requestAnimationFrame(MSdotcomOffsetMenu.CloseMainNavIfOpen);
        });

        MSdotcomOffsetMenu.leftCloseButton.on('click', function (e) {
            window.requestAnimationFrame(MSdotcomOffsetMenu.CloseOffset);
        });
        
        $('.toolbox button:first-child').on('keydown', function (e) {
            var code = e.keyCode || e.which;
            if (e.shiftKey && code === 9) {
                $('.msdotcomoffsetmenu .offset-menu-link:last-child').focus();
                e.preventDefault();
            }
        });

        MSdotcomOffsetMenu.leftDockButton.on("click", function (e) {
            MSdotcomOffsetMenu.leftMenu.toggleClass("offset-docked");
            MSdotcomOffsetMenu.page.toggleClass("offset-docked");
            if(MSdotcomOffsetMenu.leftDockButton.text().toLowerCase().trim() === "dock") {
                MSdotcomOffsetMenu.leftDockButton.text("Undock");
            }
            else {
                MSdotcomOffsetMenu.leftDockButton.text("Dock");
            }
            MSdotcomOffsetMenu.leftCloseButton.toggle();
            MSdotcomOffsetMenu.leftMenuButton.toggle();
        });

        $('.msdotcomoffsetmenu li:last-child .offset-menu-link').on('keydown', function (e) {
            var code = e.keyCode || e.which;
            if (!e.shiftKey && code === 9) {
                $('.toolbox button:first-child').focus();
                e.preventDefault();                                 
            }
        });
    },

    ToggleMainNav: function () {
        if (MSdotcomOffsetMenu.page.css("left") == '0px' || MSdotcomOffsetMenu.page.css("left") == 'auto') {
            MSdotcomOffsetMenu.OpenOffset();
        }
        else {
            MSdotcomOffsetMenu.CloseOffset();
        }
    },

    OpenOffset: function () {
        var w = $('#msdotcomoffsetmenuleft').width();
        MSdotcomOffsetMenu.AnimateOffsetJS($('#msdotcomoffsetmenuleft').width());
        MSdotcomOffsetMenu.AddTabIndexOfNavItems();
        $('body').addClass("offsetopened");
    },

    CloseOffset: function () {
        MSdotcomOffsetMenu.RemoveTabIndexOfNavItems();
        MSdotcomOffsetMenu.AnimateOffsetJS("0px");
        $('body').removeClass("offsetopened");
    },

    CloseMainNavIfOpen: function () {
        if (MSdotcomOffsetMenu.page.css("left") !== '0px' && MSdotcomOffsetMenu.page.css("left") !== 'auto') {
            MSdotcomOffsetMenu.CloseOffset();
        };
    },

    AnimateOffsetJS: function (width) {
        MSdotcomOffsetMenu.page.animate({ left: width }, {
            duration: 300, 
            easing: "linear", 
            queue: false
        });
    },

    AddTabIndexOfNavItems: function () {
        $('.msdotcomoffsetmenu .offset-menu-link').each(function (e) {
            $(this).attr('tabindex', '0');
        });
        $('.toolbox button').attr('tabindex', '0');
        $('.msdotcomoffsetmenu li:first-child .offset-menu-link').focus();
    },

    RemoveTabIndexOfNavItems: function () {
        $('.msdotcomoffsetmenu .offset-menu-link').each(function (e) {
            $(this).attr('tabindex', '-1');
        });
        $('.toolbox button').attr('tabindex', '-1');
        MSdotcomOffsetMenu.page.focus();
    },

    HandleDock: function () {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(width < 768) {
            if(MSdotcomOffsetMenu.leftMenu.hasClass("offset-docked"))
            {
                MSdotcomOffsetMenu.leftMenu.removeClass("offset-docked");
                MSdotcomOffsetMenu.page.removeClass("offset-docked");
                MSdotcomOffsetMenu.leftDockButton.text("Dock");
                MSdotcomOffsetMenu.leftCloseButton.show();
                MSdotcomOffsetMenu.leftMenuButton.show();
            }
            if($("body").hasClass("offsetopened")) {
                MSdotcomOffsetMenu.AnimateOffsetJS($('#msdotcomoffsetmenuleft').width());
            }
        }
        else if($("body").hasClass("offsetopened")) {
            MSdotcomOffsetMenu.AnimateOffsetJS($('#msdotcomoffsetmenuleft').width());
        }
    }
};

$(document).ready(function () {
    MSdotcomOffsetMenu.Start();
});
