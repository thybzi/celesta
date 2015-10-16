---
order: 80
ret: boolean
---
Returns `true` if Celesta is currently in open state, `false` otherwise.
{% highlight javascript %}
c.open();
c.isOpen(); // => true
c.close();
c.isOpen(); // => false
c.toggle();
c.isOpen(); // => true
c.toggle();
c.isOpen(); // => false
{% endhighlight %}