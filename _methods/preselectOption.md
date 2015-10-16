---
order: 140
args:
  index: number
---
Pre-selects an option by index. That imitates the behavior of displaying the text for keyboard-focused option 
in selectbox facade without selecting it.

Pre-selected option only becomes selected only after selectbox (or Celesta) is [closed](#close) (even by pressing Esc).

Only works on [open](#open) Celesta instance.

{% highlight javascript %}
// assuming we have closed Celesta with option values like 'first', 'second' etc., and 'first' is now selected
c.getValue(); // => 'first'
c.preselectOption(2); // (nothing happens, because Celesta is closed)
c.getPreselectedOptionIndex(); // => undefined
c.getValue(); // => 'first'
c.open();
c.preselectOption(2); // (option with index 2 is now pre-selected)
c.getPreselectedOptionIndex(); // => 2
c.getValue(); // => 'first' (pre-selected doesn't mean selected!)
c.close();
c.getPreselectedOptionIndex(); // => undefined (pre-selected option doesn't exist on closed Celesta)
c.getValue(); // => 'second' (instead, it became really selected!)
{% endhighlight %}
