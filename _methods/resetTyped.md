---
order: 280
args: 
  new_char: string
---
Clears quicksearch text previously (as if Backspace was pressed while typing).
{% highlight javascript %}
// assuming you have an option list that contains weekdays
c.appendTyped('t'); // (quicksearch text is now: 't', 'Tuesday' becomes selected)
c.appendTyped('h'); // (quicksearch text is now: 'th', 'Thursday' becomes selected)
c.appendTyped('w'); // (quicksearch text is now: 'thw', 'Thursday' is still selected because there is no matching item)
c.clearTyped(); // (quicksearch text is now empty)
c.appendTyped('w'); // (quicksearch text is now: 'w', 'Wednesday' becomes selected)
{% endhighlight %}