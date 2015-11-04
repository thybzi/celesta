Celesta
=====
Custom selectbox with look and feel of native one. 
(Just see the [demo](http://thybzi.github.io/celesta/demo/).)

* Pure JavaScript library working on top of native browser selectbox
* Looks like `<select>`, feels like `<select>`, and quacks like `<select>` 
* Fully skinnable with CSS (including dropdown)

### Browser support ###

* IE 10+ (or 9+ with `classList` [polyfill](polyfill/classlist.js))
* Opera 11.6+
* Safari 5.1.4+
* Firefox 4+
* Chrome 8+
* (?) iOS Safari 6+
* (?) Android Browser 4+ (or 2+ with `classList` and `bind` polyfills)
* (?) Opera Mobile 12+
* (?) IE Mobile 10+

### Basic usage ###

```javascript
new Celesta(document.getElementById('my_select'));
```
Or, a little more advanced example:
```javascript
var selectbox = document.querySelector('.some-select');
var celesta = new Celesta(selectbox, {
    space_key_open: false,
    options_nav_cycling: true,
    closed_options_pagekey_jump_by: 5
});

celesta.selectOption(3);

celesta.addEventListener('open', myCallbackFunction);
celesta.open();
celesta.hoverOption(6);
celesta.close();

celesta.refresh();
celesta.destroy();
```

For more advanced usage, see [Options](http://thybzi.github.io/celesta/configuration/),
[Methods](http://thybzi.github.io/celesta/methods/) and [Events](http://thybzi.github.io/celesta/events/) reference.
Also, you can see [the demo](http://thybzi.github.io/celesta/demo/).

### Features ###

* Support for optgroups, disabled state, disabled options/groups
* Classname inheritance for select and options
* Element and dropdown fully skinnable with CSS (no hardcoded CSS properties)
* Automatic dropdown reverse to fit browser window viewable area
* Dropdown scrolling: 
    * native browser way, or
    * custom scrollbar libs such as [perfect-scrollbar](http://noraesae.github.io/perfect-scrollbar/)
* Mouse support:
    * Focus with associated label click
    * Open with click
    * Highlight option with mouse hover
    * Select & close with option click
    * Close with outer click or outer mousewheel
* Keyboard support:
    * Navigatable with <kbd>Tab</kbd>
    * Open with <kbd>Space</kbd> or <kbd>Enter</kbd>
    * Navigate through options with arrow keys (<kbd>↑</kbd> & <kbd>↓</kbd>), <kbd>PageUp</kbd> or <kbd>PageDown</kbd>
    * Find option by *keyboard typing* (quicksearch)
    * Close with <kbd>Esc</kbd>, select & close with <kbd>Enter</kbd>
* Interaction:
    * Source `<select>` remains in DOM
    * Option select interaction: Celesta ↔ native select
    * Resets value on form reset
    * [JavaScript API](http://thybzi.github.io/celesta/methods/) to control Celesta instance
    * [Events handling](http://thybzi.github.io/celesta/events/) with `addEventListener`
* Falls back to native selectbox if cannot initialize
* [Plenty of options](http://thybzi.github.io/celesta/configuration/) to customize UX; 
see [the demo](http://thybzi.github.io/celesta/demo/) to play with some of them
* No external library or framework dependencies
* Usage mode: AMD, CommonJS or direct `<script>`
* Available in `npm` and `bower`

### Beta warning ###

This library is still under construction. 
API methods, option names, event callback interface, CSS classnames etc. can be changed at any time.


### Todo list & known issues ###

* `multiple` select support
* jQuery plugin
* Make work better with [jScrollPane](http://jscrollpane.kelvinluck.com/)
* UX testing on mobile devices
* (?) Put source select element inside (not after) Celesta container
* (?) Fall back to native option list on mobile devices
* (?) Methods call chaining
* (?) Link to source elements, not indexes (benchmarking needed)
* (?) Better feature detection on initialization
* Skin generator

### Never to be implemented ###

* Significant UI/UX change compared to native selectbox (if you want something "fancier", try [Chosen](https://harvesthq.github.io/chosen/) or things like that)

