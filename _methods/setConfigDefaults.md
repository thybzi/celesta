---
order: 10
args:
  config_overrides: object
---
*Static method* to override default options (config params) for all newly created Celesta instances.
Accepts an object of [option names and values]({{ site.baseurl }}/configuration/), like the following.
{% highlight javascript %}
Celesta.prototype.setConfigDefaults({
    space_key_open: false,
    options_nav_cycling: true,
    closed_options_pagekey_jump_by: 5
})
{% endhighlight %}
