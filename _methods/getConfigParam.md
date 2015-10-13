---
order: 20
args:
  param_name: string
ret: "*"
---
Get the value for config param ([option]({{ site.baseurl }}/configuration/)) specified.

{% highlight javascript %}
c.getConfigParam('enter_key_open'); // => true
c.getConfigParam('typed_life'); // => 1000

var x = new Celesta(document.querySelector('.another-select', { typed_life: 1500 });
x.getConfigParam('typed_life'); // => 1500
{% endhighlight %}
