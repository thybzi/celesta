---
order: 260
---
Acts as if <kbd>PageDown</kbd> key is pressed (skips several options down). The jump size differs depending on open state, and relies on values for options `closed_options_pagekey_jump_by` and `open_options_pagekey_jump_by`.
{% highlight javascript %}
// assuming that Celesta is currently closed, and jumps by 3 items by default
// also assuming it contains a list of months with September currently selected
c.getValue(); // => 'september'
c.pageDown(); (skips 3 items down)
c.getValue(); // => 'december'
{% endhighlight %}
