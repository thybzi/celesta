---
order: 90
args:
  value: boolean
---
Set or unsets disabled state for Celesta instance. Accepts boolean value (`true` to disable, `false` to enable).
{% highlight javascript %}
c.setDisabled(true); // (now you can see it disabled)
c.setDisabled(false); // (now you can see it enabled again)
{% endhighlight %}