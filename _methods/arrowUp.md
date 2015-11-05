---
order: 230
---
Act as if ArrowUp (<kbd>↑</kbd>) key is pressed (selects/hovers *previous available* option).
{% highlight javascript %}
// assuming you have months option list with September currently selected
c.getValue(); // => 'september'
c.arrowUp();
c.getValue(); // => 'august'
{% endhighlight %}
