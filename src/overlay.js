
(function( $ ){

    $.OverlayPlacement = {
        CENTER: 0,
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        RIGHT: 4,
        BOTTOM_RIGHT: 5,
        BOTTOM: 6,
        BOTTOM_LEFT: 7,
        LEFT: 8
    };

    $.Overlay = function(elmt, location, placement) {
        this.elmt       = elmt;
        this.scales     = location instanceof $.Rect;
        this.bounds     = new $.Rect(
            location.x, 
            location.y,
            location.width, 
            location.height)
        ;
        this.position   = new $.Point(
            location.x, 
            location.y
        );
        this.size       = new $.Point(
            location.width, 
            location.height
        );
        this.style      = elmt.style;
        // rects are always top-left
        this.placement  = location instanceof $.Point ? 
            placement : 
            $.OverlayPlacement.TOP_LEFT;    
    };

    $.Overlay.prototype = {

        adjust: function(position, size) {
            switch (this.placement) {
                case $.OverlayPlacement.TOP_LEFT:
                    break;
                case $.OverlayPlacement.TOP:
                    position.x -= size.x / 2;
                    break;
                case $.OverlayPlacement.TOP_RIGHT:
                    position.x -= size.x;
                    break;
                case $.OverlayPlacement.RIGHT:
                    position.x -= size.x;
                    position.y -= size.y / 2;
                    break;
                case $.OverlayPlacement.BOTTOM_RIGHT:
                    position.x -= size.x;
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.BOTTOM:
                    position.x -= size.x / 2;
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.BOTTOM_LEFT:
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.LEFT:
                    position.y -= size.y / 2;
                    break;
                case $.OverlayPlacement.CENTER:
                default:
                    position.x -= size.x / 2;
                    position.y -= size.y / 2;
                    break;
            }
        },
        destroy: function() {
            var elmt = this.elmt;
            var style = this.style;

            if (elmt.parentNode) {
                elmt.parentNode.removeChild(elmt);
            }

            style.top = "";
            style.left = "";
            style.position = "";

            if (this.scales) {
                style.width = "";
                style.height = "";
            }
        },
        drawHTML: function( container ) {
            var elmt    = this.elmt,
                style   = this.style,
                scales  = this.scales,
                position,
                size;

            if ( elmt.parentNode != container ) {
                container.appendChild( elmt );
            }

            if ( !scales ) {
                this.size = $.getElementSize( elmt );
            }

            position = this.position;
            size     = this.size;

            this.adjust( position, size );

            position = position.apply( Math.floor );
            size     = size.apply( Math.ceil );

            style.left     = position.x + "px";
            style.top      = position.y + "px";
            style.position = "absolute";

            if ( scales ) {
                style.width  = size.x + "px";
                style.height = size.y + "px";
            }
        },
        update: function( loc, placement ) {
            this.scales     = ( loc instanceof $.Rect );
            this.bounds     = new $.Rect(loc.x, loc.y, loc.width, loc.height);
            // rects are always top-left
            this.placement  = loc instanceof $.Point ?
                    placement : 
                    $.OverlayPlacement.TOP_LEFT;    
        }

    };

}( OpenSeadragon ));
