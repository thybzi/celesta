---
order: 330
---
Rebuilds Celesta DOM structure, based on source `<select>` structure. To be called after external change of source `<select>`.

Assuming we have the following HTML markup:
{% highlight html %}
<select id="the_select">
    <option value="milk">Milk</option>
    <option value="honey">Honey</option>
</select>
{% endhighlight %}

Now, let's play:
{% highlight javascript %}
var source = document.getElementById('the_select');
var celesta = new Celesta(source); // (contains 'Milk' and 'Honey' items with indexes 0 and 1)
celesta.selectOption(1); // (selecting 'Honey')
celesta.getSelectedOptionIndex(); // => 1

// now, adding another option (using jQuery syntax to make more readable)
$(source.options[0]).insertAfter('<option value="toast">Toast</option>'); // source select now has 'Milk' and 'Toast' and 'Honey'

// but linked Celesta doesn't know anything about this change, so it cannot even selected third item (which has index 2)
celesta.selectOption(2); // trying to select last item
celesta.getSelectedOption(); // => 1 (nothing changed, because 2 is out of options range remembered by Celesta)

// so we need to make a refresh
celesta.refresh();
celesta.selectOption(2); // trying to select last item, again
celesta.getSelectedOption(); // => 2 (finally, we got it!)
{% endhighlight %}
