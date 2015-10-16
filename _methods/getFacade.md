---
order: 310
ret: HTMLElement
---
Returns DOM element for Celesta facade (a block to display currently selected option). May be used to attach some click events etc.
{% highlight javascript %}
c.getFacade(); // => HTMLSpanElement: <span class="celesta-facade">...</span>
{% endhighlight %}