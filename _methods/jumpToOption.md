---
order: 160
args: 
  index: number
---
Acts as [hoverOption](#hoverOption) on open Celesta, and as [selectOption](#selectOption) on closed one.
{% highlight javascript %}
c.open();
c.jumpToOption(2); // (option with index 2 is now hovered)
c.close();
c.jumpToOption(4); // (option with index 4 is now selected)
{% endhighlight %}
