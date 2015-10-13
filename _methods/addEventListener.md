---
order: 40
args:
  event_name: string
  handler: function
---
Attaches a callback that will be fired on certain event.
For more information on events and callback arguments, see [Events reference]({{ site.baseurl }}/events/).
{% highlight javascript %}
c.addEventListener('open', function () {
    console.log('bang!');
});
c.open(); // 'bang!'

c.attachEvent('change', function (new_value, old_value, new_text, old_text, new_index, old_index) {
    console.log("Changed to option '" + new_value + "' which has text '" + new_text + "' and index '" + new_index + "'."); 
});
c.selectOption(2); // "Changed to option 'second' which has text 'The second option' and index '2'."
c.selectOption(3); // "Changed to option 'third' which has text 'The third option' and index '3'."
c.selectOption(3); // (nothing happens, because selected option wasn't changed)
{% endhighlight %}
