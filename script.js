// wrapper function
function main() {
    
    // define variable space
    var click_counter = 0,
        paths = ["4402", "4730", "4732", "4718", "4554", "4952", "4384", "4392", "4472", "4784", "4454", "4456"],
        navVertical = false;
    
    // function: animate head
    function animateHead(start, end) {
       for (i=start; i<end; i++) {
                var path = "#path" + paths[i],
                    className = "path" + paths[i];
                $(path).removeClass("animate-fast").addClass("animate-slow").removeClass(className);
            }
        click_counter += 1;
    }
    
    // function: animate head for rotated paths
    function animateHeadRotated(paths) {
        for (i=0; i<paths.length; i++) {
            var path = "#path" + paths[i],
                className = "path" + paths[i];
            $(path).removeClass("animate-fast").addClass("animate-slow");
            $(path).css("transform", "translate(0px, 0px) rotate(0deg)")
        }
    }
    
    $("#btn-play").click(function() {
        if (click_counter === 0) {
            animateHead(0, 4);
        } else if (click_counter === 1) {
            animateHead(4, 8);
        } else if (click_counter === 2) {
            animateHead(8, 10); // animate pure translate effects
            animateHeadRotated([4454, 4456]); // animate translation + rotation
            $("#path4462").addClass("path4462"); // animate eye color change
        } else if (click_counter === 3) { //disassemble head
            for (i=0; i<10; i++) {
                var path = "#path" + paths[i],
                    className = "path" + paths[i];
                $(path).removeClass("animate-slow").addClass("animate-fast").addClass(className);
            // animate rotation
            $("#path4454").removeClass("animate-slow").addClass("animate-fast").css("transform", "translate(-12px, 10px) rotate(-40deg)");
            $("#path4456").removeClass("animate-slow").addClass("animate-fast").css("transform", "translate(-30px, 10px) rotate(-60deg)");
            // animate to delete eye color
            $("#path4462").removeClass("path4462");
            }
            click_counter = 0;
        }
    });
    
    // move navbar to vertical
    $(".tile").click(function() {
        
        var tile = $(this); // to be passed on to mainContent()
        
        changeTileColor(tile); // change to active tile color

        if (navVertical == false) { // if not vertical

            // move nav bar
            $(".container").addClass("container-content-expanded");
            $("footer").addClass("footer-content-expanded");  
            $(".tile-research").addClass("tile-research-animate");
            setTimeout(
                function() {
                    $(".tile-vita").addClass("tile-vita-animate");
                }, 50);
            setTimeout(
                function() {
                    $(".tile-projects").addClass("tile-projects-animate"); 
                }, 250);
            
            // move icons
            var translateString = "translateY(" + ($(".tile").offset().top - $("#btn-twitter").offset().top) + "px)"; // calculates distance for translateY
            setTimeout(function() {
                $(".icons").css("transform", translateString);
                }, 600);

            // animate scroll to content
            $('html, body').animate(
                { scrollTop: $(".tile").offset().top-20 },
                2000
            );
            
            setTimeout(function() {
                mainContent(tile, 1100);
                }, 1200);

            navVertical = true;

        } else if (navVertical == true) {  // if already vertical
            mainContent(tile, 1200);
        }

    });
    
    // function: hide and show main content
    function mainContent(tile, fadeInTime) {
        
        // references
        var new_id = tile.attr("id");
        var old_id = "#" + $(".active").attr("id");
        
        // switch states
        if (new_id != old_id) {            
            $(old_id).fadeOut(600).removeClass("active");
            $(new_id).fadeIn(fadeInTime).addClass("active");
        }
    }
    
    // function: tiles, change color when active
    function changeTileColor(tile) {
        if (!tile.hasClass("tile-active")) {
            // change style of previously active tile
            $(".tile-active").children("i, span").removeClass("tile-font-active").addClass("tile-font-not-active");
            $(".tile-active").removeClass("tile-active");
            // change style of clicked tile
            tile.addClass("tile-active");
            tile.children("i, span").removeClass("tile-font-not-active").addClass("tile-font-active");
        }
    }
    
    // load SVG sources
    $(function(){
        $(".myhead").load("img/head.svg");
        $("#btn-twitter").load("img/icon-twitter.svg");
        $("#btn-mail").load("img/icon-mail.svg");
        $("#btn-linkedin").load("img/icon-linkedin.svg");
    });
   
} //end main

// execute when DOM ready
$(function() {
    main();
});