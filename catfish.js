/**
 * simpleCatfish
 *
 * @returns {{link: function(String, Boolean): link, addImage: function(String, Number, Number): addImage, autoCloseTimeout: function(Numeric): false, backgroundColor: function(String): backgroundColor, zIndex: function(String): zIndex, closeButtonPosition: function(Object): closeButtonPosition, closeButtonSize: function(String): closeButtonSize, render: function(): render}}
 */
function simpleCatfish() {
    'use strict';

    // Catfish param vars
    var debug = !!~location.search.indexOf('simple-catfish-debug');
    var images = [];
    var link = '#';
    var openInNewTab = false;
    var autoCloseTimeout = false;
    var backgroundColor = 'transparent';
    var zIndex = '999999';

    // Rendered flag
    var adsRendered = false;

    // Get window width
    var winWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    // Vars for store catfish elements
    var adsBox, adsLink, adsCloseButton = null;

    // Default close button config
    var CLOSE_BUTTON_OPTIONS = {
        position: {
            top: '-15px',
            right: '5px'
        },
        size: '25px'
    };

    // Available events
    var EVENTS = {
        RENDERED: 'rendered',
        CLOSED: 'closed'
    };


    /**
     * Log message if debug enabled
     *
     * @param {String} msg
     * @returns {Void}
     */
    function log(msg) {
        if (debug) {
            console.log('simpleCatfish: ' + msg);
        }
    }


    /**
     * Load ads styles
     *
     * @return {Void}
     */
    function createCatfishStyle() {
        var css = '.scb { display: none; position: fixed; left: 0; right: 0; bottom: 0; z-index: ' + zIndex + '; background-color: ' + backgroundColor + '; backface-visibility: hidden; }';
        css += '.scb.scb--visible { display: block; }';
        css += '.scb__btn-close { display:block; position:absolute; background-color:#808080; border-radius:50%; border:2px solid #fff; box-shadow:0 0 3px #666;background-size:100% 100%;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM4IDEyLjgzbC0yLjgzLTIuODMtMTEuMTcgMTEuMTctMTEuMTctMTEuMTctMi44MyAyLjgzIDExLjE3IDExLjE3LTExLjE3IDExLjE3IDIuODMgMi44MyAxMS4xNy0xMS4xNyAxMS4xNyAxMS4xNyAyLjgzLTIuODMtMTEuMTctMTEuMTd6IiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPg==) }';
        css += '.scb__place { display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; background-size: 100%; }';

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
    }


    /**
     * Create ads box element
     *
     * @return {Void}
     */
    function createCatfishBox() {
        adsBox = document.createElement('div');
        adsBox.className = 'scb';

        adsLink = document.createElement('a');
        adsLink.className = 'scb__place';
        adsLink.href = link;
        adsLink.target = openInNewTab ? '_blank' : '_self';

        adsBox.appendChild(adsLink);

        adsCloseButton = document.createElement('a');
        adsCloseButton.className = 'scb__btn-close';
        adsCloseButton.onclick = hideAdsBox;
        adsBox.appendChild(adsCloseButton);

        document.body.appendChild(adsBox);
    }


    /**
     * Apply close button styles
     *
     * @return {Void}
     */
    function applyCloseButtonStyles() {
        for (var i in CLOSE_BUTTON_OPTIONS.position) {
            if (CLOSE_BUTTON_OPTIONS.position[i]) {
                adsCloseButton.style[i] = CLOSE_BUTTON_OPTIONS.position[i];
            }
        }
        adsCloseButton.style.width = CLOSE_BUTTON_OPTIONS.size;
        adsCloseButton.style.height = CLOSE_BUTTON_OPTIONS.size;
    }


    /**
     * Determine best image and set it as background
     *
     * @return {Void}
     */
    function setImage() {
        var image;

        // Find closest width image
        if (images.length === 1) {
            image = images[0];
        } else {
            image = images.reduce(function(prev, curr) {
                return (Math.abs(curr.width - winWidth) < Math.abs(prev.width - winWidth) ? curr : prev);
            });
        }

        // Set image ratio
        adsBox.style.paddingBottom = ((image.height/image.width)*100) + '%';
        // Set image as background
        adsLink.style.backgroundImage = 'url(' + image.src + ')';
    }


    /**
     * Show ads in mode
     *
     * @param {String} mode
     * @returns {Void}
     */
    function showAdsBox() {
        adsBox.className += ' scb--visible';
    }


    /**
     * Hide ads
     *
     * @returns {Void}
     */
    function hideAdsBox() {
        adsBox.className = adsBox.className.replace('scb--visible', '');
        fireEvent(EVENTS.CLOSED);
    }


    /**
     * Fire catfish event
     *
     * @param {String} eventName
     * @returns {Void}
     */
    function fireEvent(eventName) {
        var event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
        document.dispatchEvent(event);
    }


    return {

        EVENTS: EVENTS,

        /**
         *
         * @param {String} eventName
         * @param {Function} listener
         * @returns {addEventListener}
         */
        addEventListener: function(eventName, listener) {
            document.addEventListener(eventName, listener);
            return this;
        },

        /**
         * Enable or disable debug
         *
         * @param {Boolean} enabled
         * @returns {Object}
         */
        debug: function(enabled) {
            debug = enabled;
            return this;
        },

        /**
         * Set click link
         *
         * @param {String} value
         * @param {Boolean} newTab
         * @returns {this}
         */
        link: function(value, newTab) {
            link = value;
            openInNewTab = newTab || false;
            return this;
        },

        /**
         * Add image
         *
         * @param {String} src
         * @param {Number} width
         * @param {Number} height
         * @returns {this}
         */
        addImage: function(src, width, height) {

            images.push({
                src: src,
                width: width,
                height: height
            });

            return this;
        },

        /**
         * Set autoclose timeout
         *
         * @param {Numeric} timeout Timeout in ms
         * @returns {Object}
         */
        autoCloseTimeout: function(timeout) {
            autoCloseTimeout = timeout;
            return this;
        },

        /**
         * Set background color
         *
         * @param {String} color Background color, #fff, rgba(0,0,0) etc (default transparent)
         * @returns {Object}
         */
        backgroundColor: function(color) {
            backgroundColor = color;
            return this;
        },

        /**
         * Set catfish zIndex
         *
         * @param {String} value new catfish zIndex
         * @returns {Object}
         */
        zIndex: function(value) {
            zIndex = value;
            return this;
        },

        /**
         * Set close button position
         *
         * @param {Object} position , as left: x, top: y, etc
         * @returns {this}
         */
        closeButtonPosition: function(position) {
            CLOSE_BUTTON_OPTIONS.position = position;
            return this;
        },

        /**
         * Set close button size
         *
         * @param {String} size, example: 25px
         * @returns {this}
         */
        closeButtonSize: function(size) {
            CLOSE_BUTTON_OPTIONS.size = size;
            return this;
        },

        /**
         *
         * @returns {this}
         */
        render: function() {

            if (!images.length) {
                log('render skiped: no images');
                return;
            }

            if (adsRendered) {
                log('Warning: multiple ads was rendered');
            }

            log('render');

            createCatfishStyle();
            createCatfishBox();
            applyCloseButtonStyles();
            setImage();
            showAdsBox();

            fireEvent(EVENTS.RENDERED);

            adsRendered = true;

            // Autoclose timeout
            if (autoCloseTimeout) {
                setTimeout(hideAdsBox, autoCloseTimeout);
            }

            return this;
        }

    };
}

// Async init
if ('simple-catfish' in window) {
    window['simple-catfish'](simpleCatfish());
}