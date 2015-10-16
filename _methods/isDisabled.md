---
order: 120
ret: boolean
---
Returns `true` if Celesta is currently in open state, `false` otherwise.
{% highlight javascript %}
c.isDisabled(); // => false
c.disable();
c.isDisabled(); // => true
c.enable();
c.isDisabled(); // => false
{% endhighlight %}