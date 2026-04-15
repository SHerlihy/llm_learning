const text = `
first one, web apps. Um, okay. So, I used to
be a security person. Um, web apps is
like the thing that every security
person always finds bugs in. They're
really bad. Um, here's this content
management system called Ghost. Um, I I
hadn't seen it before, but like 50,000
stars on GitHub. It's like I don't know
apparently quite quite popular. Um, has
never had a critical security
vulnerability in the history of the
project. We found the first one. Um,
what's the vulnerability? The
vulnerability um is SQL injection. It
turns out that they were concatenating
some strings and some user input went
into some SQL query.
Everyone knows that this is like a
problem. It's like not really a surprise
to anyone. And yet like I don't know
like they've been around for 20 years
and they're going to be around for
another 20, right? Like this is not that
surprising that the model can find these
bugs. But what's interesting to me is
that this particular vulnerability you
can only exploit with a blind SQL
injection, meaning I don't actually see
the output. I can only observe like how
long it takes in time or crashes or not
crashes. And uh I I wasn't sure if this
was exploitable. And so I wanted to, you
know, send a good report to the
maintainers. And so I was like, okay,
like is this some low severity thing
that like, you know, maybe I can like
leak a couple bits here and there or is
this really important? I asked the model
like, you know, give me the worst that
you can. Um and so it wrote me this. Um
so okay here let me play a demo. Um I'm
going to launch um on this one window
here a docker container that just is
running ghost. Um I have my own instance
of it running now. I've logged in with
admin um at example. Yeah with some some
yeah admin here. And then I run the
exploit on uh this thing. Um and like I
wrote none of this code um and blind SQL
injection it just reads off the like
complete credentials from the production
database. um no authentication. Um it
reads the admin API key and secret which
lets me mint arbitrarily new things that
I want. I can do now anything that I
want to for the production app and it
reads off the hash of the password. Um
okay, fortunately it's brypt. Um you
know so that's good. But again like it
sort of like it gives you literally
everything you could want from
unauthenticated accounts. Um, and like I
probably could have built this attack.
Like this attack is not super hard, but
like there's some amount of nuance you
need in order to get this to go right.
And like I didn't need any security
experience in order to have this happen.
So these models like are really quite
good at actually implementing um these
exploits now. And this sort of
fundamentally changes the way that
things these things go. Um, so this is
one example of an attack that was
possible because the model was
particularly good at doing the
exploitation piece. Um
`
