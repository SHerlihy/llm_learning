const text = `
let me show you how we've been finding
some bugs in some really important
software um and I'll show you what we
found in just a second but let me just
like show you the scaffold that we've
been using um uh here it is um this This
is basically the entirety of it. Um, you
know, we we have a couple more sentences
here and there. Um, but basically we run
claude cloud code and we run it in a VM
dangerously skip permissions. Just like
let it do whatever it wants. And then we
say, "Hey, um, you're playing in a CTF.
Um, please find a vulnerability and put
the most serious one to this output
file. Um, go." And then we sort of walk
away and we come back and we read the we
read the vulnerability report and
usually it's like pretty good and has
found some pretty severe things.
And and this basically works like you
can definitely do much better if you
have fancier scaffolding. You can
definitely do it cheaper if you have
fancier scaffolding. Um but you can do
it just by like asking the model to find
these bugs. And the reason why that
matters to me is because what I care
about is like what is the base
capability of the model because if
someone who's malicious wants to go
cause some harm and they don't have to
spend 6 months designing some fancy
fuzzing harness or something and they
can just go do bad things with it like
this. This is quite quite scary. Um
okay. Um small little problem though
with this. Um it's like a little
deficient in two ways. One way is that
um I can't do this at large scale. Like
if I if I take a piece of software and I
ask quad to find the same vulner find a
bunch of vulnerabilities and run it
multiple times, it will probably find
the same bug each time. Um I don't know.
It just turns out to be the case that
this is what happens. Um also like it's
just not very thorough. um it will
review some of the code but not all of
the code and so we have a very simple
trick for this um which is I'm just
going to add one more line um and I'm
gonna say like hint please look at this
file fuc and then what I can do is I
wanted to like okay now look at barc now
look at some other file and I can just
like do this for like all of the files
in the project and then it will find and
look at least at all of them and
like this works quite well okay
um
We wrote a blog post where we talked
about some things that we can find. Um
uh the blog post exists. So I I'm not
going to tell you about the bugs that we
had in there. Um we talked about a bunch
of them. Um but it's been now roughly a
couple weeks since this blog post came
out. So I'd like to tell you about a
couple new ones that have been fixed
that now we can talk about because um
yeah, they've been patched. Um so I'm
going to tell you in particular about
two that I think are interesting. one
interesting because of how Claude could
find an autonomous exploit and one
because of the vulnerability that it
found is quite interesting. So,
`
