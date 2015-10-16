---
order: 350
---
Destroy any DOM structure and handlers created by Celesta instance. Restores source select to be visible and selectable.
{% highlight javascript %}
c.selectOption(2); // (that also affects source select)
c.destroy(); (restores source select, with index 2 selected)
{% endhighlight %}