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
    options_navkey_cycling: true,
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

For more advanced usage, see [Options](#options-reference), [Methods](#methods-reference) and [Events](#events-reference) reference.
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
    * [JavaScript API](#methods-reference) to control Celesta instance
    * [Events handling](#events-reference) with `addEventListener`
* Falls back to native selectbox if cannot initialize
* [Plenty of options](#options-reference) to customize UX; see [the demo](http://thybzi.github.io/celesta/demo/) to play with some of them
* No external library or framework dependencies
* Usage mode: AMD, CommonJS or direct `<script>`
* Available in `npm` and `bower`

### Beta warning ###

This library is still under construction. 
API methods, option names, event callback interface, CSS classnames etc. can be changed at any time.


### Todo list & known issues ###

* `multiple` select support
* PageUp/PageDown behavior isn't perfect, and not always matching native select behavior
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


### Options reference ###

Option | Accepted value | Default value | Description 
-------|----------------|---------------|-------------------------------------------------------------------------------
**width** | *number*&nbsp;&#124;&nbsp;`null` | `null` | Explicit element width (`null` for automatic/inherited width) 
**height** | *number*&nbsp;&#124;&nbsp;`null` | `null` | Explicit element height (`null` for automatic/inherited width) 
**inherit_width** | *boolean* | `false` | Inherit source select width
**inherit_height** | *boolean* | `false` | Inherit source select height
**inherit_classes** | *boolean* | `true` | Inherit classnames from source select
**inherit_optgroup_classes** | *boolean* | `true` | Inherit classnames from every source optgroup to correspondent generated element
**inherit_option_classes** | *boolean* | `true` | Inherit classnames from every source option to correspondent generated element (and facade label, if selected)
**optlist_smart_reverse** | *boolean* | `true` | Detect best dropdown direction (down/up) based on available space and scroll position
**use_optgroups** | *boolean* | `true` | Find optgroups in source select and generate correspondent containers in optlist
**handle_mouse** | *boolean* | `true` | Handle mouse events (click, hover etc.)
**outer_mousewheel_close** | *boolean* | `true` | Close open Celesta when mouse wheel used out of its area (requires *handle_mouse* to be enabled)
**handle_arrowkeys** | *boolean* | `true` | Handle pressing arrow keys (<kbd>↑</kbd>/<kbd>↓</kbd>)
**handle_pagekeys** | *boolean* | `true` | Handle pressing <kbd>PageUp</kbd>/<kbd>PageDown</kbd> keys
**enter_key_open** | *boolean* | `true` | Open closed Celesta with <kbd>Enter</kbd> key
**space_key_open** | *boolean* | `true` | Open closed Celesta with <kbd>Space</kbd> key
**enter_key_select** | *boolean* | `true` | Select hovered option with <kbd>Enter</kbd> key
**escape_key_close** | *boolean* | `true` | Close open Celesta with <kbd>Esc</kbd> key
**handle_keyboard_typed** | *boolean* | `true` | Enable options quicksearch with keyboard typing
**typed_life** | *number* | `1000` | Storing life (milliseconds) for previously typed quicksearch characters if no other char is typed
**typed_collapse_repeated** | *boolean* | `true` | When a single key press hold detected, cycle through matching options
**closed_options_pagekey_jump_by** | *number* | `3` | <kbd>PageUp</kbd>/<kbd>PageDown</kbd> jump size on closed Celesta
**open_options_pagekey_jump_by** | *number*&nbsp;&#124;&nbsp;`true` | `true` | <kbd>PageUp</kbd>/<kbd>PageDown</kbd> jump size on open Celesta(`true` for jump to first invisible item)
**options_type_cycling** | *boolean* | `true` | Cycle options forward when quicksearch typing
**options_nav_cycling** | *boolean* | `false` | Cycle options forward/backward with arrow and page keys
**keyboard_hover_preselect** | *boolean* | `true` | Pre-select keyboard focused option (set to facade and select if Celesta is closed in any way)
**mouse_hover_preselect** | *boolean* | `false` | Pre-select mouse hovered option (set to facade and select if Celesta is closed in any way)
**mouse_hover_scroll** | *boolean* | `true` | When partially visible option is mouse hovered, scroll to make it fully visible
**fix_ie_mouse_focus** | *boolean* | <abbr title="true for IE11-, false otherwise">`('ActiveX' in window)`</abbr> | Generate custom HTML elements to fix IE mouseclick focus issue: http://stackoverflow.com/a/25953721
**ie_tagname_prefix** | *string* | `'ie-'` | HTML element name prefix to fix IE mouseclick issue (see *fix_ie_mouse_focus*)
**container_tagname** | *string* | `'span'` | HTML element name for overall Celesta container
**container_classname** | *string* | `'celesta-container'` | Main classname for overall Celesta container
**container_classname_open** | *string* | `'celesta-container-open'` | Additional classname for open Celesta container
**container_classname_disabled** | *string* | `'celesta-container-disabled'` | Additional classname for disabled Celesta container
**facade_tagname** | *string* | `'span'` | HTML element name for facade (an element that displays currently selected option)
**facade_classname** | *string* | `'celesta-facade'` | Celesta facade classname
**facadelabel_pseudo** | *boolean* | `false` | Don't generate separate element for facade label (use `::before`, and if so, facade label cannot inherit selected option classnames)
**facade_attrname_label** | *string* | `'data-label'` | Attribute name to store currently selected option title (if `::before` is used)
**facadelabel_tagname** | *string* | `'span'` | HTML element name for facade label (if real element is used)
**facadelabel_classname** | *string* | `'celesta-facadelabel'` | Main classname for facade label (if real element is used)
**optlist_tagname** | *string* | `'div'` | HTML element name for options list container
**optlist_classname** | *string* | `'celesta-optlist'` | Main classname for options list container
**optlist_classname_reversed** | *string* | `'celesta-optlist-reversed'` | Additional classname for *reversed* options list container
**optgroup_tagname** | *string* | `'div'` | HTML element name for options group container (optgroup)
**optgroup_classname** | *string* | `'celesta-optgroup'` | Main classname for options group container (optgroup)
**optgroup_classname_disabled** | *string* | `'celesta-optgroup-disabled'` | Additional classname for *disabled* optgroup
**optgrouplabel_pseudo** | *boolean* | `true` | Don't generate separate element for optgroup label (use `::before`)
**optgroup_attrname_label** | *string* | `'data-label'` | Attribute name to store optgroup label (if `::before` is used)
**optgrouplabel_tagname** | *string* | `'span'` | HTML element name for optgroup label (if real element is used)
**optgrouplabel_classname** | *string* | `'celesta-optgrouplabel'` | Main classname for optgroup label (if real element is used)
**option_tagname** | *string* | `'span'` | HTML element name for option item
**option_classname** | *string* | `'celesta-option'` | Main classname for option item
**option_classname_selected** | *string* | `'celesta-option-selected'` | Additional classname for currently *selected* option item
**option_classname_hovered** | *string* | `'celesta-option-hovered'` | Additional classname for currently *hovered/focused* option item
**option_classname_disabled** | *string* | `'celesta-option-disabled'` | Additional classname for *disabled* option item


### Methods reference ###

Here is some method to manipulate your Celesta instances directly (that is, without any user actions).

Examples below assume you have Celesta instance created and named `c` (why not `c`?):
```javascript
var c = new Celesta(document.getElementById('my_select'));
```

Most methods examples below will use this `c` variable to demonstrate some usage case.
```javascript
c.someCoolMethod();
```

And only *static methods* examples (there are few) will use `Celesta.prototype` instead.


#### setConfigDefaults ####
Static method to override default options for all newly created Celesta instances.
Accepts an object of options names and values, like the following.
```javascript
Celesta.prototype.setConfigDefaults({
    space_key_open: false, 
    options_navkey_cycling: true, 
    closed_options_pagekey_jump_by: 5 
})
```

#### getConfigParam ####
Get the value for config param specified.
```javascript
c.getConfigParam('enter_key_open'); // => true
c.getConfigParam('typed_life'); // => 1000

var x = new Celesta(document.querySelector('.another-select', { typed_life: 1500 });
x.getConfigParam('typed_life'); // => 1500
```

#### isInitialized ####
Returns `true` if current instance is successfully initialized, `false` otherwise.
```javascript
c.isInitialized(); // => true
```

#### addEventListener ####
Attaches a callback that will be fired on certain event.
For more information of events and callback arguments, see [Events reference](#events). 
```javascript
c.addEventListener('open', function () { 
    console.log('bang!'); 
});
c.open(); // 'bang!'

c.attachEvent('change', function (new_value, old_value, new_text, old_text, new_index, old_index) { 
    console.log("Changed to option '" + new_value + "' which has text '" + new_text + "' and index '" + new_index + "'."); 
});
c.selectOption(2); // "Changed to option 'second' which has text 'The second option' and index '2'."
c.selectOption(3); // "Changed to option 'third' which has text 'The third option' and index '3'."
c.selectOption(3); // (nothing happens, because selected option wasn't changed)
```

#### open ####
Turns Celesta to open state (as if it was mouse-clicked).
```javascript
c.open(); // (now you can see it opened)
```

#### close ####
Turns Celesta to closed state (as if <kbd>Esc</kbd> was pressed).
```javascript
c.close(); // (now you can see it closed)
```

#### toggle ####
Turns Celesta to closed state (as if <kbd>Esc</kbd> was pressed).
```javascript
c.toggle(); // (now you can see it opened)
c.toggle(); // (now you can see it closed again)
```

#### isOpen ####
Returns `true` if Celesta is currently in open state, `false` otherwise.
```javascript
c.open();
c.isOpen(); // => true
c.close();
c.isOpen(); // => false
c.toggle();
c.isOpen(); // => true
c.toggle();
c.isOpen(); // => false
```

#### setDisabled ####
Set or unsets disabled state for Celesta instance.
Accepts boolean value (`true` to disable, `false` to enable).
```javascript
c.setDisabled(true); // (now you can see it disabled)
c.setDisabled(false); // (now you can see it enabled again)
```

#### disable ####
A shortcut for `setDisabled(true)`.
```javascript
c.disable(); // (now you can see it disabled)
```

#### enable ####
A shortcut for `setDisabled(false)`.
```javascript
c.enable(); // (now you can see it enabled)
```

#### isDisabled ####
Returns `true` if Celesta is currently in open state, `false` otherwise.
```javascript
c.isDisabled(); // => false
c.disable();
c.isDisabled(); // => true
c.enable();
c.isDisabled(); // => false
```

#### selectOption ####
Selects an option by index.
```javascript
c.selectOption(2); // (option with index 2 is now selected)
```

#### preselectOption ####
Pre-selects an option by index.
That imitates the behavior of displaying the text for keyboard-focused option in selecbox facade without selecting it.
Pre-selected option only becomes selected only after selectbox (or Celesta) is closed (even by pressing <kbd>Esc</kbd>).
Only works on open Celesta instance.
```javascript
// assuming we have closed Celesta with option values like 'first', 'second' etc., and 'first' is now selected
c.getValue(); // => 'first'
c.preselectOption(2); // (nothing happens, because Celesta is closed)
c.getPreselectedOptionIndex(); // => undefined
c.getValue(); // => 'first'
c.open();
c.preselectOption(2); // (option with index 2 is now pre-selected)
c.getPreselectedOptionIndex(); // => 2
c.getValue(); // => 'first' (pre-selected doesn't mean selected!)
c.close();
c.getPreselectedOptionIndex(); // => undefined (pre-selected option doesn't exist on closed Celesta)
c.getValue(); // => 'second' (instead, it became really selected!)
```

#### hoverOption ####
Hovers (focuses) an option by index.
Also accepts second param `is_mouse`, default `false` (that means "keyboard").
By default, keyboard-focused items are also pre-selected, but mouse-hovered aren't (that depends on options `mouse_hover_preselect` and `mouse_hover_preselect`).
Only works on open Celesta instance.
```javascript
// assuming we have closed Celesta with option values like 'first', 'second' etc., and 'first' is now selected
c.getValue(); // => 'first'
c.hoverOption(2); // (nothing happens, because Celesta is closed)
c.open();
c.hoverOption(2); // (option with index 2 is now focused "by keyboard")
c.getPreselectedOptionIndex(); // => 2 (by default, keyboard-focused item is also pre-selected)
c.hoverOption(3, true); // (option with index 3 is now hovered "by mouse")
c.getPreselectedOptionIndex(); // => 2 (still 2, because by default, mouse-hovered item isn't pre-selected)
c.hoverOption(3, false); // (option with index 3 is now hovered "by keyboard"; actually, that false value isn't needed)
c.getPreselectedOptionIndex(); // => 3 (finally, now it is 3)
```

#### jumpToOption ####
Acts as hoverOption on open Celesta, and as selectOption on closed one.
```javascript
c.open();
c.jumpToOption(2); // (option with index 2 is now hovered)
c.close();
c.jumpToOption(4); // (option with index 4 is now selected)
``` 

#### getSelectedOptionValue ####
Returns the value of currently selected option.
```javascript
// assuming you have <option value="second">The second option</option>
c.getSelectedOptionValue(); // => 'second'
```

#### getValue ####
An alias for [`getSelectedOptionValue`](#getselectedoptionvalue).
```javascript
// assuming we have <option value="second">The second option</option>
c.getValue(); // => 'second'
```

#### getSelectedOptionText ####
Returns the text of currently selected option.
```javascript
// assuming we have <option value="second">The second option</option>
c.getValue(); // => 'The second option'
```

#### getSelectedOptionIndex ####
Returns the index of currently selected option.
```javascript
// assuming we have Celesta with option values like 'zero', 'first', 'second' etc., and 'zero' is now selected
c.getSelectedOptionIndex(); // => 0
c.getValue(); // => 'zero'
c.selectOption(2);
c.getSelectedOptionIndex(); // => 2
c.getValue(); // => 'second'
```

#### getPreselectedOptionIndex ####
Returns the index of currently pre-selected option (`undefined` if none).
```javascript
// assuming we have closed Celesta with option values like 'zero', 'first', 'second' etc., and 'zero' is now selected
c.open();
c.getPreselectedOptionIndex(); // => undefined (nothing was pre-selected by now)
c.preselectOption(2);
c.getSelectedOptionIndex(); // => 2
c.close();
c.getSelectedOptionIndex(); // => undefined (Celesta is closed, no pre-selected option exists)
```

#### getHoveredOptionIndex ####
Returns the index of currently hovered (focused) option (`undefined` if none).
```javascript
// assuming we have closed Celesta with option values like 'zero', 'first', 'second' etc., and 'zero' is now selected
c.getHoveredOptionIndex(); // => undefined (Celesta is closed, no hovered option exists)
c.open();
c.getHoveredOptionIndex(); // => 0 (on open, selected option is focused automatically)
c.hoverOption(2);
c.getHoveredOptionIndex(); // => 2
c.close();
c.getHoveredOptionIndex(); // => undefined (because Celesta is closed)
```

#### arrowUp ####
Act as if ArrowUp (<kbd>↑</kbd>) key is pressed (selects/hovers *previous available* option).
```javascript
// assuming you have months option list with September currently selected
c.getValue(); // => 'september'
c.arrowUp();
c.getValue(); // => 'august'
```

#### arrowDown ####
Act as if ArrowDown (<kbd>↓</kbd>) key is pressed (selects/hovers *next available* option).
```javascript
// assuming you have months option list with September currently selected
c.getValue(); // => 'september'
c.arrowDown();
c.getValue(); // => 'october'

// now, assuming you have weekdays list with Wednesday currently selected, and (for some reason) Thursday disabled
c.getValue(); // => 'wednesday'
c.arrowDown(); // (goes down, skips disabled option, so actually goes down once more)
c.getValue(); // => 'friday'
```

#### pageUp ####
Acts as if <kbd>PageUp</kbd> key is pressed (skips several options up).
The jump size differs depending on open state, and relies on values for options `closed_options_pagekey_jump_by` and `open_options_pagekey_jump_by`.
```javascript
// assuming that Celesta is currently closed, and jumps by 3 items by default
// also assuming it contains a list of months with September currently selected
c.getValue(); // => 'september'
c.pageUp(); (skips 3 items up)
c.getValue(); // => 'june'
```

#### pageDown ####
Acts as if <kbd>PageDown</kbd> key is pressed (skips several options down).
The jump size differs depending on open state, and relies on values for options `closed_options_pagekey_jump_by` and `open_options_pagekey_jump_by`.
```javascript
// assuming that Celesta is currently closed, and jumps by 3 items by default
// also assuming it contains a list of months with September currently selected
c.getValue(); // => 'september'
c.pageDown(); (skips 3 items down)
c.getValue(); // => 'december'
```

#### appendTyped ####
Appends a character to the end quicksearch text (as if it was typed from the keyboard, to find some option).
```javascript
// assuming you have an option list that contains weekdays
c.appendTyped('t'); // (quicksearch text is now: 't', 'Tuesday' becomes selected)
c.appendTyped('h'); // (quicksearch text is now: 'th', 'Thursday' becomes selected)
c.appendTyped('w'); // (quicksearch text is now: 'thw', 'Thursday' is still selected because there is no matching item)
```

#### resetTyped ####
Clears quicksearch text previously (as if <kbd>Backspace</kbd> was pressed while typing).
```javascript
// assuming you have an option list that contains weekdays
c.appendTyped('t'); // (quicksearch text is now: 't', 'Tuesday' becomes selected)
c.appendTyped('h'); // (quicksearch text is now: 'th', 'Thursday' becomes selected)
c.appendTyped('w'); // (quicksearch text is now: 'thw', 'Thursday' is still selected because there is no matching item)
c.clearTyped(); // (quicksearch text is now empty)
c.appendTyped('w'); // (quicksearch text is now: 'w', 'Wednesday' becomes selected)
```

#### getSourceSelect ####
Returns DOM element for source `<select>`.
```javascript
c.getSourceSelect(); // => HTMLSelectElement: <select id="my_select">...</select>
```

#### getContainer ####
Returns DOM element for Celesta overall container. 
May be used to attach some click events etc.
```javascript
c.getContainer(); // => HTMLSpanElement: <span class="celesta-container">...</span>
```

#### getFacade ####
Returns DOM element for Celesta facade (a block to display currently selected option). 
May be used to attach some click events etc.
```javascript
c.getFacade(); // => HTMLSpanElement: <span class="celesta-facade">...</span>
```

#### getOptlist ####
Returns DOM element for Celesta options list container.
May be used to attach some custom scroll library.
```javascript
c.getFacade(); // => HTMLSpanElement: <span class="celesta-facade">...</span>
```

#### refresh ####
Rebuilds Celesta DOM structure, based on source `<select>` structure.
To be called after external change of source `<select>`.
```html
// assuming we have the following HTML markup:
<select id="the_select">
    <option value="milk">Milk</option>
    <option value="honey">Honey</option>
</select>
```
```javascript
var source = document.getElementById('the_select');
var celesta = new Celesta(source); // (contains 'Milk' and 'Honey' items with indexes 0 and 1)
celesta.selectOption(1); // (selecting 'Honey')
celesta.getSelectedOptionIndex(); // => 1

// now, adding another option (using jQuery syntax to make more readable)
$(source.options[0]).insertAfter('<option value="toast">Toast</option>'); // source select now has 'Milk' and 'Toast' and 'Honey'

// but linked Celesta doesn't know anything about this change, so it cannot even selected third item (which has index 2)
celesta.selectOption(2); // trying to select last item
celesta.getSelectedOption(); // => 1 (nothing changed, because 2 is out of options range remembered by Celesta)

// so we need to make a refresh
celesta.refresh();
celesta.selectOption(2); // trying to select last item, again
celesta.getSelectedOption(); // => 2 (finally, we got it!)
```

#### update ####
Just an alias for `refresh`.
```javascript
c.update();
```

#### destroy ####
Destroy any DOM structure and handlers created by Celesta instance.
Restores source select to be visible and selectable.
```javascript
c.selectOption(2); // (that also affects source select)
c.destroy(); (restores source select, with index 2 selected)
```


### Events reference ###

Celesta can call your own callback when some events happen. Event handlers can be added with [`addEventListener`](#addeventlistener) method.
Celesta also passes arguments to callbacks of some events. Here is the generic example:
```javascript
c.addEventListener('eventname', function (arg1, arg2, arg3) {
    // (do stuff)
});
```
A more specific example can be found [here](#addeventlistener).

Here is the reference for event and arguments passed to callbacks.

Event | Callback arguments | Description
------|--------------------|------------
**focus** | *(none)* | Celesta DOM element obtains focus
**blur** | *(none)* | Celesta DOM element loses focus
**refresh** | *(none)* | Celesta instance is [refreshed](#refresh), based on source `<select>` 
**close** | *(none)* | Celesta instance is closed (by user action or [API function](#close))
**open** | *(none)* | Celesta instance is opened (by user action or [API function](#open))
**destroy** | *(none)* | Celesta instance is [destroyed](#destroy)
**change** | *{string}*&nbsp;`new_value`, *{string&#124;undefined}*&nbsp;`old_value`, *{string}*&nbsp;`new_text`, *{string}*&nbsp;`old_text`, *{number}*&nbsp;`new_index`, *{number&#124;undefined}*&nbsp;`old_index` | Option is selected (by user action or [API function](#selectOption)); same as `optionselect`, but has another arguments order
**optionselect** | *{number}*&nbsp;`new_index`, *{number&#124;undefined}*&nbsp;`old_index`, *{string}*&nbsp;`new_value`, *{string&#124;undefined}*&nbsp;`old_value`, *{string}*&nbsp;`new_text`, *{string}*&nbsp;`old_text` | Option is selected (by user action or [API function](#selectOption))
**optionpreselect** | *{number}*&nbsp;`new_index`, *{number&#124;undefined}*&nbsp;`old_index`, *{string}*&nbsp;`new_value`, *{string&#124;undefined}*&nbsp;`old_value`, *{string}*&nbsp;`new_text`, *{string}*&nbsp;`old_text` | Celesta option is pre-selected (by user action or [API function](#preselectOption))
**optionhover** | *{number}*&nbsp;`new_index`, *{number&#124;undefined}*&nbsp;`old_index`, *{string}*&nbsp;`new_value`, *{string&#124;undefined}*&nbsp;`old_value`, *{string}*&nbsp;`new_text`, *{string}*&nbsp;`old_text` | Celesta option is hovered/focused (by user action or [API function](#hoverOption))
