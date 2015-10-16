---
order: 220
ret: number|undefined
---
Returns the index of currently hovered (focused) option (`undefined` if none).
{% highlight javascript %}
// assuming we have closed Celesta with option values like 'zero', 'first', 'second' etc., and 'zero' is now selected
c.getHoveredOptionIndex(); // => undefined (Celesta is closed, no hovered option exists)
c.open();
c.getHoveredOptionIndex(); // => 0 (on open, selected option is focused automatically)
c.hoverOption(2);
c.getHoveredOptionIndex(); // => 2
c.close();
c.getHoveredOptionIndex(); // => undefined (because Celesta is closed)
{% endhighlight %}