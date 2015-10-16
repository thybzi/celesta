---
order: 270
args: 
  new_char: string
---
Appends a character to the end quicksearch text (as if it was typed from the keyboard, to find some option).
{% highlight javascript %}
// assuming you have an option list that contains weekdays
c.appendTyped('t'); // (quicksearch text is now: 't', 'Tuesday' becomes selected)
c.appendTyped('h'); // (quicksearch text is now: 'th', 'Thursday' becomes selected)
c.appendTyped('w'); // (quicksearch text is now: 'thw', 'Thursday' is still selected because there is no matching item)
{% endhighlight %}