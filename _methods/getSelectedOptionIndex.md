---
order: 200
ret: number
---
Returns the index of currently selected option.
{% highlight javascript %}
// assuming we have Celesta with option values like 'zero', 'first', 'second' etc., and 'zero' is now selected
c.getSelectedOptionIndex(); // => 0
c.getValue(); // => 'zero'
c.selectOption(2);
c.getSelectedOptionIndex(); // => 2
c.getValue(); // => 'second'
{% endhighlight %}