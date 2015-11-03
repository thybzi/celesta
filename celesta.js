/**
 * Celesta
 * Custom selectbox with look and feel of native one
 * Browser support:
 *  - IE 10+ (or 9+ with classList polyfill)
 *  - Opera 11.6+
 *  - Safari 5.1.4+
 *  - Firefox 4+
 *  - Chrome 8+
 *  ? iOS Safari 6+
 *  ? Android Browser 4+ (or 2+ with classList and bind polyfills)
 *  ? Opera Mobile 12+
 *  ? IE Mobile 10+
 * @version 0.1.0
 * @see https://github.com/thybzi/celesta
 * @author Evgeni Dmitriev <thybzi@gmail.com>
 */
(function (root, factory) {
    'use strict';

    if ((typeof define === 'function') && define.amd) {
        // AMD
        define(factory);
    } else if ((typeof module !== 'undefined') && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser global
        root.Celesta = factory();
    }

}(this, function () {
    'use strict';

    /**
     * @typedef {object} CelestaConfigParams
     * @property {?number} [width]
     * @property {?number} [height]
     * @property {boolean} [inherit_width]
     * @property {boolean} [inherit_height]
     * @property {boolean} [inherit_classes]
     * @property {boolean} [inherit_optgroup_classes]
     * @property {boolean} [inherit_option_classes]
     * @property {boolean} [optlist_smart_reverse]
     * @property {boolean} [use_optgroups]
     * @property {boolean} [facadelabel_pseudo]
     * @property {boolean} [optgrouplabel_pseudo]
     * @property {boolean} [handle_mouse]
     * @property {boolean} [outer_mousewheel_close]
     * @property {boolean} [handle_arrowkeys]
     * @property {boolean} [handle_pagekeys]
     * @property {boolean} [enter_key_open]
     * @property {boolean} [space_key_open]
     * @property {boolean} [enter_key_select]
     * @property {boolean} [escape_key_close]
     * @property {boolean} [handle_keyboard_typed]
     * @property {number} [typed_life]
     * @property {boolean} [typed_collapse_repeated]
     * @property {?number|boolean} [closed_options_pagekey_jump_by]
     * @property {?number|boolean} [open_options_pagekey_jump_by]
     * @property {boolean} [options_type_cycling]
     * @property {boolean} [options_nav_cycling]
     * @property {boolean} [keyboard_hover_preselect]
     * @property {boolean} [mouse_hover_preselect]
     * @property {boolean} [mouse_hover_scroll]
     * @property {boolean} [fix_ie_mouse_focus]
     * @property {string} [ie_tagname_prefix]
     * @property {string} [container_tagname]
     * @property {?string} [container_classname]
     * @property {string} [container_tagname]
     * @property {?string} [container_classname_open]
     * @property {?string} [container_classname_disabled]
     * @property {string} [facade_tagname]
     * @property {?string} [facade_classname]
     * @property {?string} [facade_attrname_label]
     * @property {string} [facadelabel_tagname]
     * @property {?string} [facadelabel_classname]
     * @property {string} [optlist_tagname]
     * @property {?string} [optlist_classname]
     * @property {?string} [optlist_classname_reversed]
     * @property {string} [optgroup_tagname]
     * @property {?string} [optgroup_classname]
     * @property {?string} [optgroup_classname_disabled]
     * @property {?string} [optgroup_attrname_label]
     * @property {string} [optgrouplabel_tagname]
     * @property {?string} [optgrouplabel_classname]
     * @property {string} [option_tagname]
     * @property {?string} [option_classname]
     * @property {?string} [option_classname_selected]
     * @property {?string} [option_classname_hovered]
     * @property {?string} [option_classname_disabled]
     */


    var IS_IE = ('ActiveXObject' in window), // detect IE11-
        KEYCODE_ENTER = 13,
        KEYCODE_SPACE = 32,
        KEYCODE_BACKSPACE = 8,
        KEYCODE_ESCAPE = 27,
        KEYCODE_ARROW_UP = 38,
        KEYCODE_ARROW_DOWN = 40,
        KEYCODE_PAGE_UP = 33,
        KEYCODE_PAGE_DOWN = 34;



    /**
     * @param {HTMLSelectElement} select Source select HTML element
     * @param {CelestaConfigParams} [config_overrides]
     * @constructor
     */
    var Celesta = function (select, config_overrides) {
        try {
            this._initialize(select, config_overrides);
        } catch (ex) {
            try {
                this.destroy();
            } catch (ex) {}
            throw ex;
        }
    };


    /** @type {CelestaConfigParams} */
    Celesta.prototype._config = undefined;

    /** @type {CelestaConfigParams} */
    Celesta.prototype._config_defaults = {
        width: null,
        height: null,
        inherit_width: false,
        inherit_height: false,
        inherit_classes: true,
        inherit_optgroup_classes: true,
        inherit_option_classes: true,
        optlist_smart_reverse: true,
        use_optgroups: true,
        facadelabel_pseudo: false,
        optgrouplabel_pseudo: true,
        handle_mouse: true,
        outer_mousewheel_close: true,
        handle_arrowkeys: true,
        handle_pagekeys: true,
        enter_key_open: true,
        space_key_open: true,
        enter_key_select: true,
        escape_key_close: true,
        handle_keyboard_typed: true,
        typed_life: 1000,
        typed_collapse_repeated: true,
        closed_options_pagekey_jump_by: 3,
        open_options_pagekey_jump_by: true,
        options_type_cycling: true,
        options_nav_cycling: false,
        keyboard_hover_preselect: true,
        mouse_hover_preselect: false,
        mouse_hover_scroll: true,
        fix_ie_mouse_focus: IS_IE,
        ie_tagname_prefix: 'ie-',
        container_tagname: 'span',
        container_classname: 'celesta-container',
        container_classname_open: 'celesta-container-open',
        container_classname_disabled: 'celesta-container-disabled',
        facade_tagname: 'span',
        facade_classname: 'celesta-facade',
        facade_attrname_label: 'data-label',
        facadelabel_tagname: 'span',
        facadelabel_classname: 'celesta-facadelabel',
        optlist_tagname: 'div',
        optlist_classname: 'celesta-optlist',
        optlist_classname_reversed: 'celesta-optlist-reversed',
        optgroup_tagname: 'div',
        optgroup_classname: 'celesta-optgroup',
        optgroup_classname_disabled: 'celesta-optgroup-disabled',
        optgroup_attrname_label: 'data-label',
        optgrouplabel_tagname: 'span',
        optgrouplabel_classname: 'celesta-optgrouplabel',
        option_tagname: 'span',
        option_classname: 'celesta-option',
        option_classname_selected: 'celesta-option-selected',
        option_classname_hovered: 'celesta-option-hovered',
        option_classname_disabled: 'celesta-option-disabled'
    };


    /** @type {HTMLDivElement} */
    Celesta.prototype._dummy_element = undefined;

    /** @type {HTMLSelectElement} */
    Celesta.prototype._source_select = undefined;

    /** @type {HTMLElement} */
    Celesta.prototype._container = undefined;

    /** @type {HTMLElement} */
    Celesta.prototype._facade = undefined;

    /** @type {HTMLElement} */
    Celesta.prototype._facadelabel = undefined;

    /** @type {HTMLElement} */
    Celesta.prototype._optlist = undefined;

    /** @type {number} */
    Celesta.prototype._tabindex = undefined;

    /** @type {number} */
    Celesta.prototype._container_width = undefined;

    /** @type {number} */
    Celesta.prototype._container_height = undefined;

    /** @type {boolean} */
    Celesta.prototype._container_width_inherited = false;

    /** @type {boolean} */
    Celesta.prototype._container_height_inherited = false;


    /**
     * @typedef {object} CelestaOptionsDataItem
     * @property {string} value
     * @property {string} text
     * @property {DOMTokenList} classList
     * @property {boolean} is_disabled
     * @property {boolean} is_first_in_optgroup
     * @property {HTMLElement} element
     * @property {HTMLOptionElement} src_element
     */

    /** @type {CelestaOptionsDataItem[]} */
    Celesta.prototype._options_data = undefined;

    /** @type {number} */
    Celesta.prototype._options_last_index = undefined;

    /** @type {number} */
    Celesta.prototype._hovered_option_index = undefined;

    /** @type {number} */
    Celesta.prototype._preselected_option_index = undefined;

    /** @type {number} */
    Celesta.prototype._selected_option_index = undefined;

    /** @type {number} */
    Celesta.prototype._initial_selected_option_index = undefined;

    /** @type {string} */
    Celesta.prototype._typed = '';

    /** @type {number} */
    Celesta.prototype._typed_timer = undefined;

    /** @type {boolean} */
    Celesta.prototype._is_initialized = false;

    /** @type {boolean} */
    Celesta.prototype._is_open = false;

    /** @type {boolean} */
    Celesta.prototype._was_open = false;

    /** @type {boolean} */
    Celesta.prototype._is_disabled = false;

    /** @type {number} */
    Celesta.prototype._optgroups_count = 0;

    /** @type {number} */
    Celesta.prototype._optlist_inner_height = undefined;

    /** @type {function} */
    Celesta.prototype._outerClickListener = undefined;

    /** @type {function} */
    Celesta.prototype._outerWheelListener = undefined;

    /** @type {function} */
    Celesta.prototype._selectFocusListener = undefined;

    /** @type {function} */
    Celesta.prototype._selectChangeListener = undefined;

    /** @type {function} */
    Celesta.prototype._formResetListener = undefined;

    /** @type {{string: function[]}} */
    Celesta.prototype._listeners = undefined;




    /**
     * Set config defaults for all newly created Celesta instances
     * @param {CelestaConfigParams} config_overrides
     * @static
     */
    Celesta.prototype.setConfigDefaults = function (config_overrides) {
        for (var param_name in config_overrides) {
            if (!config_overrides.hasOwnProperty(param_name)) {
                continue;
            }

            if (!_isUndefined(Celesta.prototype._config_defaults[param_name])
                && !_isUndefined(config_overrides[param_name])
            ) {
                Celesta.prototype._config_defaults[param_name] = config_overrides[param_name];
            }
        }
    };

    /**
     * Get current value of config param specified
     * @param {string} param_name
     * @returns {*}
     * @deprecated No public method should be created for tests only
     */
    Celesta.prototype.getConfigParam = function (param_name) {
        this._requireInitialized();
        return this._config[param_name];
    };


    /**
     * Indicate whether instance is initialized and not destroyed
     * @returns {boolean}
     */
    Celesta.prototype.isInitialized = function () {
        return this._is_initialized;
    };


    /**
     * Add a listener callback function for specific event type
     * @see http://stackoverflow.com/a/2087007/3027390
     * @param {string} event_name
     * @param {function} handler
     */
    Celesta.prototype.addEventListener = function(event_name, handler) {
        this._requireInitialized();

        if (_isUndefined(this._listeners[event_name])) {
            this._listeners[event_name] = [];
        }
        this._listeners[event_name].push(handler);
    };


    /**
     * Expand options list
     * Hover current selected option
     */
    Celesta.prototype.open = function () {
        this._requireInitialized();

        if (this._is_open || this._is_disabled) {
            return;
        }

        this._is_open = true;

        // Recalculate inner height of options list on first open
        if (!this._was_open) {
            this._refreshOptlistInnerHeight();
            this._was_open = true;
        }

        this._container.classList.add(this._getClassname('container', 'open'));
        this.hoverOption(this._selected_option_index, false, true);

        if (this._config.optlist_smart_reverse) {
            this._optlistSmartReverse();
        }

        this._triggerEvent('open');
    };

    /**
     * Collapse options list
     * Select an option that was pre-selected while opened
     */
    Celesta.prototype.close = function () {
        this._requireInitialized();

        if (!this._is_open) {
            return;
        }

        var hovered_classname;

        this._is_open = false;
        this._container.classList.remove(this._getClassname('container', 'open'));

        // Reset hovered element @todo separate method?
        if (_isNumber(this._hovered_option_index)) {
            hovered_classname = this._getClassname('option', 'hovered');
            if (hovered_classname) {
                this._getOptionElement(this._hovered_option_index).classList.remove(hovered_classname);
            }
            this._hovered_option_index = undefined;
        }

        // Select option if it had been preselected
        if (_isNumber(this._preselected_option_index)) {
            this.selectOption(this._preselected_option_index);
            this._preselected_option_index = undefined;
        }

        this._triggerEvent('close');
    };

    /**
     * Open if closed, close if opened
     */
    Celesta.prototype.toggle = function () {
        this._requireInitialized();

        if (this._is_open) {
            this.close();
        } else {
            this.open();
        }
    };

    /**
     * Return true is element is now opened (options list expanded), false otherwise
     * @returns {boolean}
     */
    Celesta.prototype.isOpen = function () {
        this._requireInitialized();
        return this._is_open;
    };


    /**
     * Disable or enable generated element and (by default) also source select
     * Disabled element can't be focused or opened
     * @param {boolean} value True to disable element, false to enable
     */
    Celesta.prototype.setDisabled = function (value) {
        this._requireInitialized();
        this._setDisabled(value);
    };

    /**
     * Disable generated element and (by default) also source select
     * A shortcut for Celesta.setDisabled(true)
     */
    Celesta.prototype.disable = function () {
        this.setDisabled(true);
    };

    /**
     * Enable generated element and (by default) also source select
     * A shortcut for Celesta.setDisabled(false)
     */
    Celesta.prototype.enable = function () {
        this.setDisabled(false);
    };

    /**
     * Return true is element is disabled (unfocusable and unopenable), false otherwise
     * @returns {boolean}
     */
    Celesta.prototype.isDisabled = function () {
        this._requireInitialized();
        return this._is_disabled;
    };


    /**
     * Select (make active) an option with index provided
     * Trigger 'change' event on original select element
     * If option isn't selectable or is already selected, do nothing
     * @param {number} index Index of option to select
     * @param {boolean=false} [force] Select option even if it is disabled or already selected, or select is disabled
     */
    Celesta.prototype.selectOption = function (index, force) {
        var old_index = this._selected_option_index,
            new_option_data,
            old_option_data;

        if (!this._isExistingOption(index)) {
            return;
        }

        if (!force && !((index !== old_index) && !this._is_disabled && !this._isDisabledOption(index))) {
            return;
        }

        if (_isNumber(this._preselected_option_index)) {
            this._preselected_option_index = undefined;
        }

        this._setSourceSelectedIndex(index);

        new_option_data = this._getOptionData(index);
        old_option_data = this._getOptionData(old_index);

        this._triggerEvent('optionselect', index, old_index, new_option_data.value, old_option_data.value,
            new_option_data.text, old_option_data.text);
        this._triggerEvent('change', new_option_data.value, old_option_data.value, new_option_data.text,
            old_option_data.text, index, old_index);
    };


    /**
     * Imitate native select behavior of displaying (key-)hovered option title on select facade,
     * but actually selecting it after select is closed (even with Esc or outer mouse click)
     * Only works on open Celesta
     * @param {number} index Index of option to pre-select
     */
    Celesta.prototype.preselectOption = function (index) {
        var old_index = this._preselected_option_index,
            new_option_data,
            old_option_data;

        if (!this._is_open || (index === old_index) || !this._isSelectableOption(index)) {
            return;
        }

        this._preselected_option_index = index;
        this._refreshFacade(index);

        new_option_data = this._getOptionData(index);
        old_option_data = this._getOptionData(old_index);

        this._triggerEvent('optionpreselect', index, old_index, new_option_data.value, old_option_data.value,
            new_option_data.text, old_option_data.text);
    };


    /**
     * Hover (focus) an option with keyboard or mouse action
     * Works only on open Celesta
     * @param {number} index Index of option to hover
     * @param {boolean=false} [is_mouse] Indicates whether event comes from mouse or keyboard action
     * @param {boolean=false} [force] Hover option even if it is disabled
     */
    Celesta.prototype.hoverOption = function (index, is_mouse, force) {
        var old_index = this._hovered_option_index,
            classname,
            old_element,
            new_element,
            option_top,
            option_bottom,
            new_option_data,
            old_option_data,
            optlist,
            optlist_top,
            optlist_bottom;

        if (!this._is_open || (index === old_index) || !(force || this._isSelectableOption(index))) {
            return;
        }

        new_option_data = this._getOptionData(index);
        new_element = new_option_data.element;

        option_top = new_element.offsetTop;
        option_bottom = option_top + new_element.offsetHeight;
        optlist_top = this._getOptlistInnerTop();
        optlist_bottom = this._getOptlistInnerBottom();

        // Avoid mouse hover options that should be invisible (but may trigger mouseover through parent border etc.)
        if (is_mouse && ((option_bottom <= optlist_top) || (option_top >= optlist_bottom))) {
            return;
        }


        this._hovered_option_index = index;

        // @todo move logic of classname remove/add to separate method
        classname = this._getClassname('option', 'hovered');
        old_option_data = this._getOptionData(old_index);
        old_element = old_option_data.element;
        if (old_element) {
            old_element.classList.remove(classname);
        }
        new_element.classList.add(classname);


        if (!is_mouse || this._config.mouse_hover_scroll) {
            optlist = this._optlist;

            if (option_top < optlist_top) {
                optlist.scrollTop -= optlist_top - option_top;
            } else if (option_bottom > optlist_bottom) {
                optlist.scrollTop += option_bottom - optlist_bottom;
            }
        }


        this._triggerEvent('optionhover', index, old_index, new_option_data.value, old_option_data.value,
            new_option_data.text, old_option_data.text);


        if ((is_mouse && this._config.mouse_hover_preselect) || (!is_mouse && this._config.keyboard_hover_preselect)) {
            this.preselectOption(index);
        }
    };


    /**
     * If current Celesta is open, hover the option with index passed
     * Otherwise, select that option
     * @param {number} index
     */
    Celesta.prototype.jumpToOption = function (index) {
        if (this._is_open) {
            this.hoverOption(index);
        } else {
            this.selectOption(index);
        }
    };


    /**
     * Get currently selected option value
     * @alias getValue
     * @returns {string}
     */
    Celesta.prototype.getSelectedOptionValue = function () {
        this._requireInitialized();
        return this._getOptionData(this._selected_option_index).value;
    };
    Celesta.prototype.getValue = Celesta.prototype.getSelectedOptionValue;

    /**
     * Get currently selected option text
     * @returns {string}
     */
    Celesta.prototype.getSelectedOptionText = function () {
        this._requireInitialized();
        return this._getOptionData(this._selected_option_index).text;
    };

    /**
     * Get the index of current selected option
     * @returns {number}
     */
    Celesta.prototype.getSelectedOptionIndex = function () {
        return this._selected_option_index;
    };

    /**
     * Get the index of current pre-selected option
     * @returns {number|undefined}
     */
    Celesta.prototype.getPreselectedOptionIndex = function () {
        return this._preselected_option_index;
    };

    /**
     * Get the index of current hovered option
     * @returns {number|undefined}
     */
    Celesta.prototype.getHoveredOptionIndex = function () {
        return this._hovered_option_index;
    };


    /**
     * Act as if ArrowUp button is pressed
     */
    Celesta.prototype.arrowUp = function () {
        this._requireInitialized();
        this.jumpToOption(this._getPrevSelectableOption());
    };

    /**
     * Act as if ArrowDown button is pressed
     */
    Celesta.prototype.arrowDown = function () {
        this._requireInitialized();
        this.jumpToOption(this._getNextSelectableOption());
    };

    /**
     * Act as if PageUp button is pressed
     */
    Celesta.prototype.pageUp = function () {
        this._requireInitialized();
        this.jumpToOption(this._getSelectableOption(this._getPageJumpBy(-1)));
    };

    /**
     * Act as if PageDown button is pressed
     */
    Celesta.prototype.pageDown = function () {
        this._requireInitialized();
        this.jumpToOption(this._getSelectableOption(this._getPageJumpBy(1)));
    };


    /**
     * Add new character to the end of quicksearch text as if it was typed on keyboard
     * @param new_char
     */
    Celesta.prototype.appendTyped = function (new_char) {
        this._requireInitialized();

        var matched_option_index,
            repeated_char;

        clearTimeout(this._typed_timer);
        this._typed += new_char;
        this._typed_timer = setTimeout(this.resetTyped.bind(this), this._config.typed_life);

        matched_option_index = this._getNextOptionByTyped();
        if (!_isUndefined(matched_option_index)) {
            this.jumpToOption(matched_option_index);
        } else if (this._config.typed_collapse_repeated && (this._typed.length > 1) &&
            (this._typed.charAt(0) === this._typed.charAt(1))
        ) {
            repeated_char = this._typed.charAt(0);
            // Opera may have time to generate more than 2 repeated chars, so need to check the whole string
            if (this._typed.match(new RegExp('^' + repeated_char + '+$'))) {
                this.resetTyped();
                this.appendTyped(repeated_char);
            }
        }
    };

    /**
     * Clear all quick search text typed previously (as if Backspace was pressed)
     * @param {string} new_char
     */
    Celesta.prototype.resetTyped = function () {
        clearTimeout(this._typed_timer);
        this._typed = '';
    };


    /**
     * Get linked select HTML element
     * @returns {HTMLSelectElement}
     */
    Celesta.prototype.getSourceSelect = function () {
        this._requireInitialized();
        return this._source_select;
    };

    /**
     * Get overall container element
     * @returns {HTMLElement}
     */
    Celesta.prototype.getContainer = function () {
        this._requireInitialized();
        return this._container;
    };

    /**
     * Get facade element
     * @returns {HTMLElement}
     */
    Celesta.prototype.getFacade = function () {
        this._requireInitialized();
        return this._facade;
    };

    /**
     * Get options container element (e.g., for attaching a custom scroll handler)
     * @returns {HTMLElement}
     */
    Celesta.prototype.getOptlist = function () {
        this._requireInitialized();
        return this._optlist;
    };


    /**
     * Rebuild generated markup
     * To be called after external change in source select
     * @alias update
     */
    Celesta.prototype.refresh = function () {
        this._requireInitialized();
        this._refresh();
    };
    Celesta.prototype.update = Celesta.prototype.refresh;

    /**
     * Remove generated markup and restore source select accessibility
     * Remove change handler from select and reset handler from its form
     * Also remove outer click and outer wheel handlers
     * @destructs
     */
    Celesta.prototype.destroy = function () {
        var trashbin;

        this._is_initialized = false;

        if (this._config.handle_mouse) {
            document.removeEventListener('mousedown', this._outerClickListener);

            if (this._config.outer_mousewheel_close) {
                document.removeEventListener(_getWheelEventName(), this._outerWheelListener);
            }
        }

        this._source_select.removeEventListener('focus', this._selectFocusListener);
        this._source_select.removeEventListener('change', this._selectChangeListener);
        this._source_select.tabIndex = this.tabIndex;

        if (this._source_select.form) {
            this._source_select.form.removeEventListener('reset', this._formResetListener);
        }

        trashbin = this._dummy_element;
        trashbin.appendChild(this._container);
        trashbin.innerHTML = '';

        this._triggerEvent('destroy');
        this._listeners = undefined;
    };


    /**
     * Create element markup and make source select inaccessible
     * Create outer click handler for closing
     * Combine default config values with current object overrides
     * @param {HTMLSelectElement} select
     * @param {CelestaConfigParams} config_overrides
     * @private
     * @constructs
     */
    Celesta.prototype._initialize = function (select, config_overrides) {
        this._requireValidSourceSelect(select);

        this._dummy_element = document.createElement('div');

        this._setConfig(config_overrides);
        this._listeners = {};
        this._source_select = select;

        this._container = this._generateElement('container');
        this._tabindex = this._source_select.tabIndex || 0; // @todo is it needed: '|| 0'?;
        //this._container.tabIndex = this._tabindex;
        this._source_select.tabIndex = -1;

        this._selectFocusListener = this._selectFocusHandler.bind(this);
        this._source_select.addEventListener('focus', this._selectFocusListener);

        this._container_width = this._config.width;
        this._container_width_inherited = (this._container_width === null) && this._config.inherit_width;
        if (!this._container_width_inherited) {
            this._applyContainerWidth();
        }

        this._container_height = this._config.height;
        this._container_height_inherited = (this._container_height === null) && this._config.inherit_height;
        if (!this._container_height_inherited) {
            this._applyContainerHeight();
        }

        if (this._config.inherit_classes) {
            _inheritClasses(this._source_select, this._container);
        }

        this._facade = this._generateElement('facade');
        this._container.appendChild(this._facade);

        if (this._config.facadelabel_pseudo) {
            this._facadelabel = undefined;
        } else {
            this._facadelabel = this._generateElement('facadelabel');
            this._facade.appendChild(this._facadelabel);
        }


        this._optlist = this._generateElement('optlist');
        this._container.appendChild(this._optlist);

        this._refresh();

        this._selectChangeListener = this._refreshSelectedOption.bind(this);
        this._source_select.addEventListener('change', this._selectChangeListener);

        if (this._source_select.form) {
            this._formResetListener = this._restoreInitialSelectedIndex.bind(this);
            this._source_select.form.addEventListener('reset', this._formResetListener);
        }

        if (this._config.handle_keyboard_typed) {
            this._container.addEventListener('keypress', this._typeHandler.bind(this));
        }

        if (this._config.handle_arrowkeys || this._config.handle_pagekeys || this._config.enter_key_select ||
            this._config.enter_key_open || this._config.space_key_open || this._config.escape_key_close ||
            this._config.handle_keyboard_typed
        ) {
            this._container.addEventListener('keydown', this._keyHandler.bind(this));
        }

        if (this._config.handle_mouse) {
            this._facade.addEventListener('mousedown', this.toggle.bind(this, true));
            this._outerClickListener = this._outerClickHandler.bind(this);
            document.addEventListener('mousedown', this._outerClickListener);

            if (this._config.outer_mousewheel_close) {
                this._outerWheelListener = this._outerWheelHandler.bind(this);
                document.addEventListener(_getWheelEventName(), this._outerWheelListener);
            }
        }

        this._container.addEventListener('focus', this._triggerEvent.bind(this, 'focus'));
        this._container.addEventListener('blur', this._triggerEvent.bind(this, 'blur'));
        this._container.addEventListener('blur', this.close.bind(this));

        this._source_select.parentNode.insertBefore(this._container, this._source_select);

        this._is_initialized = true;
    };


    /**
     * Check if source select element is available for use in Celesta
     * @param {*} [select=this._source_select]
     * @throws {TypeError} Throws an exception if source element is not passed or is not <select> element
     * @throws {TypeError} Throws an exception if passed <select> element is not attached (has no parent)
     * @throws {TypeError} Throws an exception if passed source element is multiple <select> element
     * @private
     */
    Celesta.prototype._requireValidSourceSelect = function (select) {
        select = select || this._source_select;

        // Must be a <select> element
        if (!select || !(select instanceof HTMLSelectElement)) {
            throw new TypeError('Celesta require HTML select as source element');
        }

        // Must be attached
        if (!select.parentNode) {
            throw new TypeError('Celesta source select element must have parent');
        }

        // Multiple <select> elements not supported in this version
        if (select.multiple) {
            throw new TypeError('Multiple select elements not supported in current version of Celesta');
        }
    };


    /**
     * Check if current instance is initialized
     * Used as pre-check in public methods
     * @throws {Error} Throws an exception if instance is not initialized
     * @private
     */
    Celesta.prototype._requireInitialized = function () {
        if (!this._is_initialized) {
            throw new Error('Celesta instance not initialized');
        }
    };


    /**
     * Disable or enable generated element and (by default) also source select
     * Disabled element can't be focused or opened
     * @param {boolean} value True to disable element, false to enable
     * @param {boolean=false} [skip_select] Set value only for generated element, but not for source select
     * @private
     */
    Celesta.prototype._setDisabled = function (value, skip_select) {
        var disabled_class;

        this._is_disabled = value;

        if (value) {
            this._container.removeAttribute('tabindex');
        } else {
            this._container.tabIndex = this._tabindex;
        }

        if (!skip_select) {
            this._source_select.disabled = value;
        }

        disabled_class = this._getClassname('container', 'disabled');
        if (disabled_class) {
            if (value) {
                this._container.classList.add(disabled_class);
            } else {
                this._container.classList.remove(disabled_class);
            }
        }
    };


    /**
     * Apply overrides for config defaults
     * @param config_overrides
     * @private
     */
    Celesta.prototype._setConfig = function (config_overrides) {
        var param_name;
        config_overrides = config_overrides || {};

        this._config = {};
        for (param_name in this._config_defaults) {
            if (!this._config_defaults.hasOwnProperty(param_name)) {
                continue;
            }
            this._config[param_name] = !_isUndefined(config_overrides[param_name]) ?
                config_overrides[param_name] :
                this._config_defaults[param_name];
        }
    };


    /**
     * Explicitly set selected index for source <select>, and trigger 'change' event on it
     * @param {number} index
     * @private
     */
    Celesta.prototype._setSourceSelectedIndex = function(index) {
        this._source_select.selectedIndex = index;
        _triggerDomEvent(this._source_select, 'change');
    };


    /**
     * Reverse options list upwards, if it diminishes viewport exceed, and doesn't bring the list into unscrollable area
     * @private
     */
    Celesta.prototype._optlistSmartReverse = function () {
        var optlist = this._optlist,
            classname = this._getClassname('optlist', 'reversed'),
            excess_bottom,
            excess_top;

        // First, make options list downwards, and calculate viewport bottom excess amount
        optlist.classList.remove(classname);
        excess_bottom = optlist.getBoundingClientRect().bottom - document.documentElement.clientHeight;

        // If options list bottom excesses viewport bottom, trying to reverse the list upwards
        if (excess_bottom > 0) {
            optlist.classList.add(classname);
            excess_top = -optlist.getBoundingClientRect().top;

            // If reversed list excess amount is even larger, or if it exceeds page scrollable area, cancel the reverse
            if ((excess_top > excess_bottom) || (excess_top > document.body.scrollTop)) {
                optlist.classList.remove(classname);
            }
        }
    };


    /**
     * Find next option that matches typed text collected for current Celesta instance
     * @returns {number|undefined} Index of option if found, undefined otherwise
     * @private
     */
    Celesta.prototype._getNextOptionByTyped = function () {
        var i,
            options_data = this._getOptionsData(),
            index,
            initial_index = 1 + (this._is_open ? this._hovered_option_index : this._selected_option_index),
            search = this._typed.toLowerCase(); // @todo option for case ignore?

        for (i = 0; i < options_data.length; i++) {
            index = initial_index + i;
            if (index > this._options_last_index) {
                if (this._config.options_type_cycling) {
                    index -= options_data.length;
                } else {
                    break;
                }
            }
            if (this._isDisabledOption(index)) {
                continue;
            }
            if (options_data[index].text.toLowerCase().indexOf(search) === 0) {
                return index;
            }
        }

        return undefined;
    };


    /**
     * Rebuild generated markup
     * To be called after external change in source select
     * @private
     */
    Celesta.prototype._refresh = function () {
        this._requireValidSourceSelect();

        if (this._optlist.hasChildNodes()) {
            this._optlist.innerHTML = '';
        }

        this._refreshOptions();
        if (this._config.use_optgroups) {
            this._refreshOptgroups();
        }

        this._refreshSelectedOption();
        this._setDisabled(this._source_select.disabled, true);

        if (this._container_width_inherited) {
            this._container_width = this._source_select.offsetWidth;
            this._applyContainerWidth();
        }

        if (this._container_height_inherited) {
            this._container_height = this._source_select.offsetHeight;
            this._applyContainerHeight();
        }

        this._was_open = false;

        this._triggerEvent('refresh');
    };


    /**
     * Close current instance if clicked out of its container
     * @param {MouseEvent} event
     * @private
     */
    Celesta.prototype._outerClickHandler = function (event) {
        if (!this._is_initialized || !this._is_open) {
            return;
        }

        var is_outer_click = true,
            parent = event.target;

        /**
         * Search for current instance container in parent tree, because preventDefault is bad way
         * @see https://css-tricks.com/dangers-stopping-event-propagation/
         * (Also, it worked bad in IE: clicking on another Celesta didn't close currently open one)
         */
        while (parent) {
            if (parent === this._container) {
                is_outer_click = false;
                break;
            }
            parent = parent.parentElement;
        }

        if (is_outer_click) {
            this.close();
        }
    };


    /**
     * Close current instance if mousewheeled out of its options list
     * @param {MouseEvent} event
     * @private
     */
    Celesta.prototype._outerWheelHandler = function (event) {
        if (!this._is_initialized || !this._is_open) {
            return;
        }

        var is_outer_wheel = true,
            parent = event.target;

        /**
         * Search for current instance container in parent tree, because preventDefault is bad way
         * @see https://css-tricks.com/dangers-stopping-event-propagation/
         * (Also, it worked bad in IE: clicking on another Celesta didn't close currently open one)
         */
        while (parent) {
            if (parent === this._optlist) {
                is_outer_wheel = false;
                break;
            }
            parent = parent.parentElement;
        }

        if (is_outer_wheel) {
            this.close();
        }
    };


    /**
     * Switch focus to Celesta container when related select element gets focused
     * @private
     */
    Celesta.prototype._selectFocusHandler = function () {
        if (!this._is_initialized) {
            return;
        }

        this._container.focus();
    };


    /**
     * Collects characters typed from keyboard to use them with typed search
     * @param {KeyboardEvent} event
     * @private
     */
    Celesta.prototype._typeHandler = function (event) {
        if (!this._is_initialized || this._is_disabled) {
            return;
        }

        var char_code = _isNumber(event.which) ? event.which : event.keyCode;

        // Ignore keycodes for special keys
        if (char_code < KEYCODE_SPACE) {
            return;
        }
        this.appendTyped(String.fromCharCode(char_code));

        // Prevent page scroll by pressing space (happens e.g. in Opera)
        if (char_code === KEYCODE_SPACE) {
            event.preventDefault();
        }
    };


    /**
     * Handles enter, escape, space, arrow and page keys presses
     * @param {KeyboardEvent} event
     * @private
     */
    Celesta.prototype._keyHandler = function (event) {
        if (!this._is_initialized || this._is_disabled) {
            return;
        }

        switch (event.keyCode) {
            case KEYCODE_ARROW_UP:
                if (this._config.handle_arrowkeys) {
                    this.arrowUp();
                    event.preventDefault();
                }
                break;
            case KEYCODE_ARROW_DOWN:
                if (this._config.handle_arrowkeys) {
                    this.arrowDown();
                    event.preventDefault();
                }
                break;
            case KEYCODE_PAGE_UP:
                if (this._config.handle_pagekeys) {
                    this.pageUp();
                    event.preventDefault();
                }
                break;
            case KEYCODE_PAGE_DOWN:
                if (this._config.handle_pagekeys) {
                    this.pageDown();
                    event.preventDefault();
                }
                break;
            case KEYCODE_ENTER:
                if (this._is_open) {
                    if (this._config.enter_key_select) {
                        this.selectOption(this._hovered_option_index);
                        this.close();
                        event.preventDefault();
                    }
                } else {
                    if (this._config.enter_key_open) {
                        this.open();
                        event.preventDefault();
                    }
                }
                break;
            case KEYCODE_SPACE:
                if (this._config.space_key_open) {
                    this.open();
                    // Don't prevent space keypress when already open (used for typed search or default browser action)
                    if (!this._is_open) {
                        event.preventDefault();
                    }
                }
                break;
            case KEYCODE_ESCAPE:
                if (this._config.escape_key_close) {
                    this.close();
                    event.preventDefault();
                }
                break;
            case KEYCODE_BACKSPACE:
                if (this._config.handle_keyboard_typed) {
                    this.resetTyped();
                    event.preventDefault();
                }
                break;
        }

    };


    /**
     * Detect current size of jump when PageUp/PageDown is pressed
     * @param {number} sign Direction (1 for forward, -1 for backward)
     * @returns {number|boolean} Number of items (including direction as sign), true/false for jump to closest invisible
     * @private
     */
    Celesta.prototype._getPageJumpBy = function(sign) {
        var jump_by = this._is_open ?
            this._config.open_options_pagekey_jump_by :
            this._config.closed_options_pagekey_jump_by;

        if (sign < 0) {
            jump_by = _isBoolean(jump_by) ? !jump_by : (jump_by * sign);
        }
        return jump_by;
    };


    /**
     * Detect whether option is disabled (or belongs to disabled group)
     * @param {number} index
     * @returns {boolean|undefined}
     * @private
     */
    Celesta.prototype._isDisabledOption = function (index) {
        return this._getOptionData(index).is_disabled;
    };

    /**
     * Detect whether the option is the first one in its optgroup
     * @param {number} index
     * @returns {boolean|undefined}
     * @todo unused for now; should be used in _getSelectableOption method for appropriate optgroup skipping
     * @private
     */
    Celesta.prototype._isFirstOptionInOptgroup = function (index) {
        return this._getOptionData(index).is_first_in_optgroup;
    };

    /**
     * Detect whether option exists (index is in range of available options)
     * @param {number} index
     * @returns {boolean}
     * @private
     */
    Celesta.prototype._isExistingOption = function (index) {
        return _isNumber(index) && (index >= 0) && (index <= this._options_last_index);
    };

    /**
     * Detect whether option can be selected/hovered (is in range and not disabled)
     * @param {number} index
     * @returns {boolean}
     * @private
     */
    Celesta.prototype._isSelectableOption = function (index) {
        return this._isExistingOption(index) && !this._isDisabledOption(index);
    };


    /**
     * Find selectable option index previous to passed
     * @param {number} initial_index
     * @returns {number|undefined}
     * @private
     */
    Celesta.prototype._getPrevSelectableOption = function (initial_index) {
        return this._getSelectableOption(-1, initial_index);
    };

    /**
     * Find selectable option index next to passed
     * @param {number} initial_index
     * @returns {number|undefined}
     * @private
     */
    Celesta.prototype._getNextSelectableOption = function (initial_index) {
        return this._getSelectableOption(1, initial_index);
    };


    /**
     * Get target option index for jump to
     * @param {number|boolean} jump_by Desired index delta
     * @param {number} initial_index Starting point option index
     * @returns {number|undefined} Target option index, or undefined if no appropriate option found
     * @todo this method should be refactored or rewritten completely
     * @todo imitate native algorithm of counting optgroup labels and disabled options while skipping them
     * @private
     */
    Celesta.prototype._getSelectableOption = function (jump_by, initial_index) {
        if (!(_isNumber(jump_by) && jump_by) && !(_isBoolean(jump_by) && this._is_open)) {
            return;
        }

        var items_count = this._getOptionsData().length,
            options_nav_cycling = this._config.options_nav_cycling,
            jump_size,
            sign,
            extremum_index,
            index,
            i,
            j;

        if (!initial_index) {
            initial_index = this._is_open ? this._hovered_option_index : this._selected_option_index;
        }


        if (_isNumber(jump_by)) {
            jump_size = Math.abs(jump_by);
            sign = jump_by / jump_size;
            extremum_index = (jump_by > 0) ? this._options_last_index : 0;
        } else if (_isBoolean(jump_by)) {
            sign = jump_by ? 1 : -1;
            extremum_index = jump_by ? this._options_last_index : 0;
            jump_size = __getOutwardJumpSize.call(this);
            if (!jump_size) {
                if (options_nav_cycling) {
                    jump_size = 1;
                } else {
                    return;
                }
            }
            jump_by = jump_size * sign;
        }

        for (i = 0; i < items_count; i++) {
            index = initial_index + jump_by + (i * sign);

            // Options list boundary crossed
            if (__boundaryCrossed()) {
                if (options_nav_cycling) {
                    // Cycle if possible
                    index -= items_count * sign;
                } else {
                    // If options at jump target and beyond are unavailable, last chance is to jump to a closer option
                    if (jump_size > 1) {
                        for (j = jump_size; j > 1; j--) {
                            index = initial_index + (j * sign);
                            if (this._isSelectableOption(index)) {
                                return index;
                            }
                        }
                    }
                    break;
                }
            }
            if (!this._isDisabledOption(index)) {
                return index;
            }
        }

        return undefined;


        /**
         * Detect whether last item selectable item is crossed (and maybe we should go to the very beginning)
         * Works for both forward and backward list run
         * @returns {boolean}
         * @private
         */
        function __boundaryCrossed() {
            return (index * sign) > (extremum_index * sign);
        }

        /**
         * Detect jump size for page jump (jump to first invisible item, as if PageDown is pressed on open selectbox)
         * @param {boolean} turn_page
         * @returns {number}
         * @private
         */
        function __getOutwardJumpSize(turn_page) {
            var jump_size = turn_page ? -1 : 0,
                options_data = this._getOptionsData(),
                option_value,
                optlist_value = sign * this._getOptlistInnerTop(),
                optlist_height_factor = 0;

            if (sign > 0) {
                optlist_height_factor++;
            }
            if (turn_page) {
                optlist_height_factor++;
            }

            if (optlist_height_factor) {
                optlist_value += this._getOptlistInnerHeight() * optlist_height_factor;
            }


            for (i = 0; i < items_count; i++) {
                index = initial_index + (i * sign);

                if (__boundaryCrossed()) {
                    break;
                }

                option_value = (options_data[index].element.offsetTop * sign);
                if (sign > 0) {
                    option_value += (options_data[index].element.offsetHeight * sign);
                }
                if (option_value > optlist_value) {
                    break;
                }
                jump_size++;
            }

            if (!turn_page && (jump_size === 1)) {
                jump_size = __getOutwardJumpSize.call(this, true);
            } else if (turn_page && (jump_size < 0)) {
                jump_size = 0;
            }

            return jump_size;
        }
    };


    /**
     * Build up options list DOM based of source select options
     * @private
     */
    Celesta.prototype._refreshOptions = function () {
        var inherit_classes = this._config.inherit_option_classes,
            handle_mouse = this._config.handle_mouse,
            disabled_classname = this._getClassname('option', 'disabled'),
            is_disabled,
            option,
            src_option,
            src_parent,
            i;

        this._options_data = [];
        this._options_last_index = this._source_select.options.length - 1;

        for (i = 0; i <= this._options_last_index; i++) {
            src_option = this._source_select.options[i];
            src_parent = src_option.parentNode;
            is_disabled = src_option.disabled ||
            ((src_parent !== this._source_select) && src_parent.disabled); // @todo assume nested optgroups?

            option = this._generateElement('option');
            option.textContent = src_option.text;

            if (is_disabled) {
                option.classList.add(disabled_classname);
            } else if (handle_mouse) {
                (function (instance, index) {
                    option.addEventListener('mouseover', function () {
                        instance.hoverOption(index, true);
                    });
                    option.addEventListener('mouseup', function () {
                        instance.selectOption(index);
                        instance.close();
                    });
                }(this, i));
            }

            if (inherit_classes && this._source_select.options[i].classList.length) {
                _inheritClasses(src_option, option);
            }

            this._optlist.appendChild(option);

            this._options_data.push({
                value: src_option.value,
                text: src_option.text,
                classlist: src_option.classList,
                is_disabled: is_disabled,
                is_first_in_optgroup: false,
                element: option,
                src_element: src_option
            });
        }
    };


    /**
     * Recreate option groups from source <optgroup> elements
     * @todo refactor!
     * @private
     */
    Celesta.prototype._refreshOptgroups = function () {
        var src_optgroups = this._source_select.querySelectorAll('optgroup'),
            src_options = this._source_select.options,
            src_optgroup,
            src_precedessor,
            src_optgroup_options,
            optgroup,
            prev_optgroup,
            inherit_classes = this._config.inherit_optgroup_classes,
            optgroup_classname_disabled = this._getClassname('optgroup', 'disabled'),
            optgroup_attrname_label,
            optgrouplabel_pseudo = this._config.optgrouplabel_pseudo,
            optgrouplabel,
            option,
            optlist = this._optlist,
            index,
            i,
            j;

        if (optgrouplabel_pseudo) {
            optgroup_attrname_label = this._config.optgroup_attrname_label;
        }

        this._optgroups_count = 0;
        for (i = 0; i < src_optgroups.length; i++) {
            src_optgroup = src_optgroups[i];
            optgroup = this._generateElement('optgroup');

            if (src_optgroup.disabled) {
                optgroup.classList.add(optgroup_classname_disabled);
            }

            if (inherit_classes) {
                _inheritClasses(src_optgroup, optgroup);
            }

            if (optgrouplabel_pseudo) {
                optgroup.setAttribute(optgroup_attrname_label, src_optgroup.label);
            } else {
                optgrouplabel = this._generateElement('optgrouplabel');
                optgrouplabel.textContent = src_optgroup.label;
                optgroup.appendChild(optgrouplabel);
            }

            src_precedessor = src_optgroups[i].previousElementSibling;
            if (src_precedessor) {
                switch (src_precedessor.tagName.toLowerCase()) {
                    case 'option':
                        optlist.insertBefore(
                            optgroup,
                            this._getOptionElement(_nodeListIndexOf(src_options, src_precedessor)).nextSibling
                        );
                        break;
                    case 'optgroup':
                        if (prev_optgroup) {
                            optlist.insertBefore(optgroup, prev_optgroup.nextSibling);
                        } else {
                            continue;
                        }
                        break;
                    default:
                        continue;
                }
            } else {
                this._optlist.insertBefore(optgroup, this._optlist.firstChild);
            }

            src_optgroup_options = src_optgroups[i].querySelectorAll('option');
            for (j = 0; j < src_optgroup_options.length; j++) {
                index = _nodeListIndexOf(src_options, src_optgroup_options[j]); // @todo search by src_option, not index
                option = this._getOptionElement(index);
                if (j === 0) {
                    this._options_data[index].is_first_in_optgroup = true;
                }
                optgroup.appendChild(option);
            }

            prev_optgroup = optgroup;
            this._optgroups_count++;
        }
    };

    /**
     * Calculate and store visible inner height of options list (called on first open)
     * @private
     */
    Celesta.prototype._refreshOptlistInnerHeight = function () {
        var optlist = this._optlist,
            optlist_style = getComputedStyle(optlist);

        this._optlist_inner_height =
            optlist.offsetHeight - _toInteger(optlist_style.borderTopWidth) - _toInteger(optlist_style.paddingTop) -
            _toInteger(optlist_style.borderBottomWidth) - _toInteger(optlist_style.paddingBottom);
    };

    /**
     * Get options list visible height (space available for inner content)
     * @returns {number}
     * @private
     */
    Celesta.prototype._getOptlistInnerHeight = function () {
        return this._optlist_inner_height;
    };

    /**
     * Get top visible offset value within inner height
     * @returns {number}
     * @private
     */
    Celesta.prototype._getOptlistInnerTop = function () {
        return this._optlist.scrollTop;
    };

    /**
     * Get bottom visible offset value within inner height
     * @returns {number}
     * @private
     */
    Celesta.prototype._getOptlistInnerBottom = function () {
        return this._getOptlistInnerHeight() + this._getOptlistInnerTop();
    };


    /**
     * Get tag name for corresponding element type
     * Add special IE prefix, if necessary
     * @param {string} type Element type (e.g. 'optlist' or 'container')
     * @returns {string}
     * @private
     */
    Celesta.prototype._getTagname = function (type) {
        var tagname = this._config[type + '_tagname'],
            ie_tagname_prefix;

        /**
         * IE has problems with mouse focusing 'regular' non-form elements
         * So need to use custom element names like 'ie-span' or 'ie-div'
         * @see http://stackoverflow.com/a/25953721
         */
        if (this._config.fix_ie_mouse_focus && (type !== 'container')) {
            ie_tagname_prefix = this._config.ie_tagname_prefix;
            if (ie_tagname_prefix) {
                tagname = ie_tagname_prefix + tagname;
            }
        }
        return tagname;
    };


    /**
     * Get classname for corresponding element type and, optionally, state
     * @param {string} type Element type (e.g. 'optlist' or 'container')
     * @param {string} [state] Special state of element (e.g. 'disabled' or 'selected')
     * @returns {string}
     * @private
     */
    Celesta.prototype._getClassname = function (type, state) {
        var param_name = type + '_classname';
        if (_isString(state)) {
            param_name += '_' + state;
        }
        return this._config[param_name];
    };


    /**
     * Get data for all Celesta options
     * @returns {CelestaOptionsDataItem[]}
     * @private
     */
    Celesta.prototype._getOptionsData = function () {
        return this._options_data;
    };

    /**
     * Get a single Celesta option data
     * @param {number} index An index of item to return
     * @returns {CelestaOptionsDataItem}
     * @private
     */
    Celesta.prototype._getOptionData = function (index) {
        var item = this._getOptionsData()[index];
        return item ? item : {
            value: undefined,
            text: '',
            is_disabled: undefined,
            is_first_in_optgroup: undefined,
            classlist: this._dummy_element.classList,
            element: undefined,
            src_element: undefined
        };
    };

    /**
     * Get a single Celesta option HTML element
     * @param {number} index An index of item to return
     * @returns {HTMLElement}
     * @private
     */
    Celesta.prototype._getOptionElement = function (index) {
        var item = this._getOptionData(index);
        return item ? item.element : undefined;
    };


    /**
     * Mark selected an option associated with source <select> selected option
     * Unmark previous selected option, if present
     * @todo Move logic for "unmark old, mark new" to a separate method?
     * @private
     */
    Celesta.prototype._refreshSelectedOption = function () {
        var old_index = this._selected_option_index,
            index = this._source_select.selectedIndex,
            classname,
            old_element;

        // Save initially selected index to use after form reset
        if (!_isNumber(this._initial_selected_option_index)) {
            this._initial_selected_option_index = index;
        }

        classname = this._getClassname('option', 'selected');
        old_element = this._getOptionElement(old_index);
        if (old_element) {
            old_element.classList.remove(classname);
        }

        if (_isNumber(index) && (index >= 0)) {
            this._getOptionElement(index).classList.add(classname);
        } else {
            index = undefined;
        }

        this._selected_option_index = index;

        this._refreshFacade(index);
    };


    /**
     * Explicitly set initial selectedIndex to source <select>
     * Used on form reset, because source <select> doesn't refresh its selectedIndex though changes selected option
     * This action also refreshes linked Celesta selected index (because source <select> 'change' event is fired)
     * So, both <select> and Celesta will obtain actual selected index value
     * @todo make source select change optional?
     * @private
     */
    Celesta.prototype._restoreInitialSelectedIndex = function () {
        this._setSourceSelectedIndex(this._initial_selected_option_index);
    };


    /**
     * Refresh facade label text and class list, basing on correspondent option properties
     * @param {number|null} option_index
     * @private
     */
    Celesta.prototype._refreshFacade = function (option_index) {
        var source = this._getOptionData(option_index), // @todo accept option data item, not index?
            target;

        if (this._config.facadelabel_pseudo) {
            // Refresh text for pseudo
            this._facade.setAttribute(this._config.facade_attrname_label, source.text);
        } else {
            target = this._facadelabel;

            // Refresh element text
            target.textContent = source.text;

            // Refresh class list (if enabled for options)
            if (this._config.inherit_option_classes) {
                // First, force remove all classes but the primary one
                target.className = this._getClassname('facadelabel');
                // Then, re-apply all classes from source option element
                _inheritClasses(source, target);
            }
        }
    };


    /**
     * Apply Celesta container width if it is set explicitly
     * @private
     */
    Celesta.prototype._applyContainerWidth = function () {
        if (this._container_width > 0) {
            this._container.style.width = this._container_width + 'px';
        }
    };

    /**
     * Apply Celesta container height if it is set explicitly
     * @private
     */
    Celesta.prototype._applyContainerHeight = function () {
        if (this._container_height > 0) {
            this._container.style.height = this._container_height + 'px';
        }
    };


    /**
     * Create HTML element and apply classname, basing on correspondent config params
     * @param {string} type
     * @returns {HTMLElement}
     * @example this._generateElement('optlist'); // => <div class="celesta-optlist">
     * @private
     */
    Celesta.prototype._generateElement = function (type) {
        var element,
            tagname = this._getTagname(type),
            classname = this._getClassname(type);

        element = document.createElement(tagname);
        if (_isString(classname)) {
            element.className = classname;
        }
        return element;
    };


    /**
     * Trigger instance event of requested type, invoking listener callbacks for that event type
     * Besides event name, accepts an unlimited number of additional arguments passed to callback
     * Within callback, 'this' points to current Celesta instance
     * @param event_name
     */
    Celesta.prototype._triggerEvent = function (event_name) {
        var event_listeners = this._listeners[event_name],
            i;
        if (!event_listeners) {
            return
        }

        for (i = 0; i < event_listeners.length; i++) {
            if (_isFunction(event_listeners[i])) {
                event_listeners[i].apply(this, Array.prototype.splice.call(arguments, 1));
            }
        }
    };


    /**
     * Get index of HTML element within NodeList (querySelectorAll collection) or HTMLCollection (e.g. select.options)
     * @see http://stackoverflow.com/a/15763707/3027390
     * @param {NodeList|HTMLCollection} nodelist
     * @param {HTMLElement} element
     * @returns {number}
     * @private
     */
    function _nodeListIndexOf(nodelist, element) {
        return Array.prototype.indexOf.call(nodelist, element);
    }


    /**
     * Copy all classes from one HTML element to another
     * @param {HTMLElement|CelestaOptionsDataItem} source
     * @param {HTMLElement} target
     * @private
     */
    function _inheritClasses(source, target) {
        var classlist = source.classList || source.classlist;
        for (var i = 0; i < classlist.length; i++) {
            target.classList.add(classlist[i]);
        }
    }

    /**
     * Trigger custom event on HTML element
     * @param {HTMLElement} target
     * @param {string} type
     * @private
     */
    function _triggerDomEvent(target, type) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, true);
        event.eventName = type;
        target.dispatchEvent(event);
    }

    /**
     * Get available mousewheel event name
     * @returns {string}
     * @private
     */
    function _getWheelEventName() {
        if ('onwheel' in document) {
            return 'wheel'; // IE 9+, Firefox 17+, Chrome 31+
        } else if ('onmousewheel' in document) {
            return 'mousewheel'; // older non-Gecko
        } else {
            return 'MozMousePixelScroll'; // Firefox 16.x-
        }
    }

    /**
     * Parse value to decimal integer
     * @param {number|string} value
     * @returns {number}
     * @private
     */
    function _toInteger (value) {
        return parseInt(value, 10);
    }

    /**
     * Indicates whether value passed is undefined
     * @param value
     * @returns {boolean}
     * @private
     */
    function _isUndefined (value) {
        return typeof value === 'undefined';
    }

    /**
     * Indicates whether value passed is boolean
     * @param value
     * @returns {boolean}
     * @private
     */
    function _isBoolean (value) {
        return typeof value === 'boolean';
    }

    /**
     * Indicates whether value passed has type 'number'
     * @param value
     * @returns {boolean}
     * @private
     */
    function _isNumber (value) {
        return typeof value === 'number';
    }

    /**
     * Indicates whether value passed is string
     * @param {*} value
     * @returns {boolean}
     * @private
     */
    function _isString (value) {
        return typeof value === 'string';
    }

    /**
     * Indicates whether value passed is array
     * @param {*} value
     * @returns {boolean}
     * @private
     */
    function _isArray (value) {
        return value && (typeof value === 'object') && (value instanceof Array);
    }

    /**
     * Indicates whether value passed is function
     * @param {*} value
     * @returns {boolean}
     * @private
     */
    function _isFunction (value) {
        return typeof value === 'function';
    }


    return Celesta;
}));
