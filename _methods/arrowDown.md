---
order: 240
---
Act as if ArrowDown (↓) key is pressed (selects/hovers *next available* option).
{% highlight javascript %}
// assuming you have months option list with September currently selected
c.getValue(); // => 'september'
c.arrowDown();
c.getValue(); // => 'october'

// now, assuming you have weekdays list with Wednesday currently selected, and (for some reason) Thursday disabled
c.getValue(); // => 'wednesday'
c.arrowDown(); // (goes down, skips disabled option, so actually goes down once more)
c.getValue(); // => 'friday'
{% endhighlight %}
