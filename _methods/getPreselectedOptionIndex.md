---
order: 210
ret: number|undefined
---
Returns the index of currently pre-selected option (`undefined` if none).
{% highlight javascript %}
// assuming we have closed Celesta with option values like 'zero', 'first', 'second' etc., and 'zero' is now selected
c.open();
c.getPreselectedOptionIndex(); // => undefined (nothing was pre-selected by now)
c.preselectOption(2);
c.getSelectedOptionIndex(); // => 2
c.close();
c.getSelectedOptionIndex(); // => undefined (Celesta is closed, no pre-selected option exists)
{% endhighlight %}