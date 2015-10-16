---
order: 150
args: 
  index: number
  is_mouse: boolean=false
---
Hovers (focuses) an option by index.

Accepts optional second param `is_mouse`, default `false` (which means "keyboard").
By default, keyboard-focused items are also [pre-selected](#preselectOption), but mouse-hovered aren't
(that depends on `keyboard_hover_preselect` and `mouse_hover_preselect` config params).

Only works on [open](#open) Celesta instance.

{% highlight javascript %}
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
{% endhighlight %}
