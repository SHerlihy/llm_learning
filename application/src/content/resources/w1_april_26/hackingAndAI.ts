import { ResourceBuilder } from "@/content/resourceBuilder";

const hackingAndAI = new ResourceBuilder('Black-hat LLMs by Nicholas Carlini')
.setHref('https://youtu.be/1sd26pWhfmg?si=jTI4A-XmUlqbbS5P')
.setDateOfInclusion(new Date(2026, 4, 6, 11))
.setOverview('Talk detailing hacking capabilities of LLMs as of March 2026.')
.setTag('security')
.build()

export default hackingAndAI

const transcript = `
All right. So before Nicholas speaks, I
want to say a couple of words as well.
I think that there are not that there
there are people in this industry who
have been doing this for a long long
time truly understand this and can be
considered the best. Now who is the best
one, the best two, the best three? I
don't really know. But we have the
opportunity right now to listen to
somebody who has not just been the best
at this for the past year or the past
two years but for a long while and
consistently makes the industry better
just by doing his research regardless of
how much of that comes out. And I'll
also tell you that he agreed last second
and went through all the corporate uh PR
analysis that I don't know how much you
have to do in anthropic. It seems like
you guys are easier than other people to
manage to come here and give this talk
to you today. So I just want to get a
second for everybody for the last
second, last minute getting into a thing
and coming on stage and rushing in for
handling truly an a global level of
urgency or situation just to come and
speak to us all. So please let's give it
to Nicholas.
Okay, thanks. Um yeah, so I'm Nicholas.
Um I'm at Anthropic and I'm going to
spend a little bit of time um just
talking about some of the things that
I'm interested in in in language model
security. Um and I guess the thing that
I've been caring about most recently has
been I I guess I don't know calling it
black hat language models but just
trying to understand how we can use
language models in order to make them
cause harm. Not because I I want this to
happen right that that would be bad. Um
but I want to understand what bad things
people who wanted to cause harm would do
so that then we can make that not
possible. Okay. Um basic lesson I hope
you take away from this talk is um
relatively simple. Um today it is true
that language models can autonomously
and without fancy scaffolding um find
and exploit zero day vulnerabilities in
very important pieces of software. Uh
this is not something that was true even
let's say 3 or 4 months ago. Um but it
is now becoming true and I think it will
become only more true over the next
couple of years. And so the like I don't
know if this is like the main lesson.
The real thing I want you to take away
is that like they're getting really
really good really fast. And this means
that the like nice balance we had
between attackers and defenders over the
last 20 years or so uh seems like it's
probably coming to an end. And it really
seems to me like the language models
that we have now are probably like the
most significant thing to happen in
security um since we got the internet.
Um you know like before we had the
internet there was like not that much
that you could do to attack someone
else. Like you'd have to like send them
a floppy disc or something. Um you have
now the internet you can do remote
attacks. language models really feel to
me to be something that's like roughly
on this order of importance which is not
something that I believed like I don't
know three or four years ago but the
models have gotten really really good
and I want to just give you a couple
examples of what this is looking like
okay so um
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
like look at least at all of them and
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
found is quite interesting. So, first
one, web apps. Um, okay. So, I used to
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
exploitation piece. Um let me now spend
a couple of minutes on another side
where it's particularly good because of
the bugs it can find. Um so Linux kernel
um one of like the most important pieces
of software that we all use every day.
Um very very very hardened. Um we now
have a number of remotely exploitable um
heat buffer overflows in the Linux
kernel. Um I have never found one of
these in my life before. This is like I
don't know very very very hard to do. Um
with these language models I have a
bunch like this is I don't know quite
quite scary to me. Um let me walk you
through one of them which is in the NFS
um V4 demon and the kernel and um pay
attention to sort of how this attack
works and then remember in the back of
your mind that a language model found
this. Okay. So um you have a client
connecting to the NFS server and it sort
of does the three-way thing like hello I
would like to talk to you. The service
says okay and then it responds and the
client it's you know talking to NFS so
it says I'd like to open up this lock
file and the server says great and the
client acknowledges that um and then it
takes out a lock and puts um as its name
um a 1024 byt um sort of value of who
the person is who owns the lock. Uh the
server says it's granted and so we're
good here. Um then what the attacker
does is it creates a second client
client B that talks to the server. Um
which again says hello um I'd like to go
talk to you. The server says great um
I've acknowledged you as client B.
Client B says I'd also like to take an
um an open on this other lock. And the
server says great you can do that. Um
and um then takes the lock here. And at
this point client A already owns this
lock. So you can't grant the lock also
to client B. And so the server says
like, okay, like deny the lock. This is
not something that's allowed. Except
what happens is that the response that
it's going to now send to client B is
going to be something that's going to be
um a,56 bytes long. Um it's going to
have some offset and some length. And
then it has this owner. Um and the owner
is the bytes that came from the first
attacker. And so those bytes are now
copied here. And it turns out that it's
going to write this into a buffer of
size 112 which gives you now heap buffer
overflow in the kernel. Okay, not that
great. um
a language model found this like this is
not like a like trivial bug like you
have to like understand that there are
like two competing two cooperating
adversaries you know like who are like
you know one of them has a long thing
here and you send like you know a bunch
of packets over there like you would
never find this by fuzzing um and by the
way this entire slide was copy and
pasted from the report that the language
model wrote
like it like it produced this very nice
flow schematic. Like I I literally just
copied and pasted this. The model
produced this schematic explaining to me
how the attack works. Um and so like
it's really quite good at doing these
kinds of things. Um far better than I
think people give them credit for. Um,
and so like when when you're finding
these these bugs with these things, it's
like we used to live in a world where we
assumed that like we had to like hold
their hand in order to help them. Kind
of like, you know, a fuzzer, you know,
like it can sort of do a little things
here and there, but no, like it it's it
this is a bug. Um, here's the commit
that introduced the bug. Um, sorry, it's
not a commit, it's a change set. Why is
it a change set that that introduced
this bug? Because this bug predates git.
Like this bug has been in the kernel
since 2003 and it's older than some of
you in this room, right? Like like this
is like a really old bug that has been
found by this by the language models,
right? Like it's like a very non-trivial
kind of thing that like the language
models have been able to do here, right?
like I
speechless like like is like does not
begin to describe like these models like
really can do some some very impressive
things and it's like you know we we
really need to start rethinking um the
kinds of things that that we should
expect um because um I don't know spend
like a little bit of time thinking
forwards like we've only just seen the
models that can do this like in the last
couple of months like the first models
that that can find these kinds of
vulnerabilities were really only
introduced a couple of months ago We
sort of tried to see how often um we
could reproduce these kinds of bugs with
older models that were released. I don't
Okay, so Sonnet 4.5 was released like
only 6 months ago and Opus 4.1 is less
than a year old. Those ones can't find
these bugs almost ever. The new models
released over the last 3 months, 4
months can. So like like it's like just
on the edge of being able to do these
kinds of bugs and like this is not the
last model that's going to exist. Like
there are going to be more and they're
going to keep on getting better. Um and
like in a very very real sense we are
like on this exponential. Um you've
probably seen this plot more times than
you wanted to see it. It's this plot
from meter that shows as a function of
model release date um how long of a task
that they can do that that humans take.
So recent models the most recent models
can do tasks that take humans roughly 15
hours and they can succeed at that
roughly half of the time. Um this is a
nice plot by meter. Um we tried to
produce a similar version of this plot.
Oh yeah, by the way, um doubling time
every four months. So I don't know, be a
little worried there if this trend
continues. Maybe it doesn't, but like
you know, if it continues for like
another year, um we're going to you know
have these models producing like you
know you know large amounts of code that
um you know better than most of us. Um
so we tried to produce a similar kind of
plot where um instead of looking at uh
you know how long of a duration of a
task that models can do we we tried to
look um okay smart contracts okay why
smart contracts because they have dollar
values associated with them and so you
can ask how much money can I steal from
a smart contract by having a language
model find and exploit a vulnerability
and so okay this is from a paper um by
by two of our Matt scholars Winnie and
Cole
And and what they showed was that recent
language models um can identify and
exploit vulnerabilities and recover like
several million dollars from like actual
real smart contracts. Um and that the
rate of their ability to do this is
again going exponentially. Note the log
scale on the y- axis here again. And so
like these models are getting really
really good at doing these kinds of
things. And again I have no reason to
believe that they're going to stop
getting better at this continuing rate.
Okay, I'm like sort of coming back to
the slide because I think like this
really is the thing I want you to take
away. It's not where we are at this
moment in time. Yes, at this moment in
time the models can find vulnerabilities
in the Linux kernel. Yes, at this moment
in time they can find, you know, these
critical CVEes um in really important
software that people use, but like the
rate of progress is very large. And so
you should expect that like the best
models can do this today. The like
average model you have on your laptop
probably can do this in a year.
Um,
I'm a skeptical person. I didn't believe
in language models for a very long time.
Uh, when I first saw language models,
the only thing that I did with them was
like I I sort of prodded them and made
fun of sort of how how how easily they
broke. Um, but like they actually are
quite good right now. They of course
have problems, but you can't just stick
your head in the sand. Like these things
are working really really well.
Um, and like you know there are some
people who say you know it's on an
exponential. I I agree the exponential
is not going to last forever. Um I
remember when CPUs were getting
exponentially faster every couple of
years, right? Like this is the fastest
CPU that Intel produced every year
starting from the 404 um up until the
first Pentiums um in 2000. Very nice
clean exponential and then of course you
know the exponential tapers off. It's no
longer exponential. What do you know? Um
there is going to be a bend. No one
denies this. No exponential can continue
forever. Um but it's very hard to
predict when the bend is going to
happen. Like maybe the bend happens in 6
months. Maybe in 6 months it's the case
that the models are no longer getting
exponentially better. Maybe it happens
in 2 years. And when the bend happens
will matter quite a lot for what
capabilities these models have. And I
think you should not assume that like
it's definitely going to happen in a
couple of months because people have
been saying this forever. For like the
last 10 years, people have been saying
deep learning is going to hit a wall and
at least as of yet it has not. And so
like we should be willing to entertain
the possibility that it might especially
as security people right like so I I
went to a conference at crypto where I
gave a talk and and I observed that like
10 of the papers at this conference were
on postquantum cryptography.
I I don't know if you know this, but
like we don't have quantum computers and
yet cryptographers are working on
postquantum cryptography because they
understand that it is worth investing in
defending against something that we
don't have in front of us right now. And
yet here is a thing that I have
literally right in front of me right now
finding these kinds of bugs. And I often
talk to talk to security people and
they're in denial about it. So we like
we really really like we should really
need to understand this is the
exponential we're on. Um there's a fun
slide that I like to show. Um this is
from uh the uh international energy
agency which every year um makes a
prediction for how much um of various
kinds of energy people are going to be
using for generation. Um and here's the
plot for how much solar is actually
being deployed versus their predictions.
Uh the red lines are their predictions
from every point in time. White is
what's actually true. um for more than
half of the years their prediction for
what would happen in 2040 happened the
next year
from like you would think that they
would have learned like the 15th time
that this happened that you should make
a continued like exponential trend but
every year they assume that things will
continue at roughly the current rate and
every year it goes up by I don't know
another 30 40%.
we should not be them. Like we should
sort of understand that these things
have been getting exponentially better
every every couple months for the last
couple of years and it may be the case
that things flatten out but probably not
at least probably not for like the next
couple of months. So like we should like
and I think you know these next couple
of months will really be some of the
most important couple of months for
security.
Okay. Um I have two minutes left for a
conclusion. Um,
it's pretty clear to me that these
current models are better vulnerability
researchers than I am. Um, I used to do
this, you know, somewhat professionally.
Um, I have CVE to my name. Um, I do not
have or Okay, now I do, but I did not
have CVs in the Linux kernel. Like the
these models are better vulnerability
researchers than I am. It's probably not
yet better than all of you, but at some
point it will be like if we if we
continue on this trend for even just
another year, they'll probably be better
vulnerability researchers than all of
you. And I don't know what that world
looks like. Like it's like quite scary
to live in a world where you can
automatically find bugs that like
previously only like the top one or two
like you know people in the world could
have found.
Um so maybe my call to action is help us
make the future go well. We're going to
need all the help that we can get. Um
for our part at anthropic um there's
cloud code security that is trying to do
something to to find bugs. Um you heard
earlier today from DeepMind um OpenAI
has their um their Arvar project.
Speaking not as an anthropic employee
like I don't really care where you help
just please help like you know it would
be great if you would like to know help
us anthropic too but like just the world
will need a lot of people to be doing a
lot of this work and it needs to happen
soon like order months. I think like
waiting a year is going to be too long.
um we are going to have a huge number of
bugs. I have so many bugs in the Linux
kernel that I can't report because I
haven't validated them yet. I'm not
going to make that some open source
developer validate bugs that I I haven't
checked yet. Like I'm not going to send
them, you know, potential slop, but this
means that like I now have I don't know
several hundred crashes that they
haven't seen because I haven't had time
to check them. um we need to find a way
to fix this so that we can actually go
through all this stuff because soon it's
not just going to be me who has all of
this but it's going to be anyone
malicious in the world who wants. So
really um yeah I'd encourage you to find
a try and find a way to see if um you
know some particular set of skills that
you have could like help us make sure
that things go well over the next couple
of months and over the next couple of
years because I am quite worried about
how this direction is heading. Um and
yeah, we need all the help we can get.
Um, thank you.
Um, while I wait for questions, I'll
just leave this video playing in the
background.
What's what's what's what what should we
be watching for?
Uh, just just watch. It's fine. Um,
let's take a question.
That's hardly fair. Uh, let's Yeah, I'm
sure there are questions. Let's uh let's
take some. I'll take from over here
first.
Oh hello.
Hey uh
hi I'm Nabil from Palto Networks. So I
I'm wondering like given the future
where bugs will be found autonomously
like the one we can't find as you
mentioned is like since you guys have
the visibility should we think about
something like to identify the malicious
intent because it would be impossible
for us to fix all the zero day bugs in
all the repos around the world. What's
your thought because you guys have the
control. What can we do in that regard?
Thank you.
Yeah. Um,
yeah. So, identifying malicious intent
is hard because security is dual use.
Um, I want to allow people to use the
models to find bugs to fix things.
If they're the developer of the
software, I would ideally not like to
let someone use the software to go and
exploit things. And for a very long time
in security, like we've always
understood that the dual use nature
favored the defender, you know.
pick any software that's that's that's
that that exists. It generally favors
the defender more than the attacker. I
think this has been true and this has
been the way that we've been operating
in the past. Um it's unclear if this
will always be true in the future
especially for language models as we go
forwards. Um, and so I do want to make
sure that we c people can't use these
things for harm. And indeed, like, you
know, anthropics models and opens models
and deep minds models um will generally
refuse if you're like very explicitly
doing nasty things. Um, clearly they
need to get better if they're going to
be able to refuse everything. But, um,
you know,
I don't want to like not let people be
honest defenders. Um because
okay so the way I think about this is
if I put a safeguard in place that's
very very weak it will only stop the
good people from using the software the
bad people are just going to jailbreak
the model and they're going to still
attack it anyway and so I but the good
people won't they're not going to
circumvent the safeguards and so I want
to make sure the good people have access
to the software but if I put two strong
safeguards in place then they don't have
access to the software and so I think
it's like just it's it's very nuanced
how you want to do this and everyone is
like trying their best to find the right
balance and I think we're doing an okay
job but um you know I think this is one
of the areas where we need a lot more
help to figure out how to do this
better.
Hi uh Michael Seagull from MIT just
wanted to ask um comment on both the
speed that is as this becomes faster uh
the bad guys will have things faster and
they'll also be concerned that they will
be fixed faster. So for a period of
time, we're going to be dealing a lot
with changes in speed. And then what's
sort of the endgame? Do we there's been
a long-term argument about whether
vulnerabilities are dense or sparse? And
ultimately, if we get this good at
things, do we really get down to really
almost no vulnerabilities?
Two.
Um, okay, great question. Um
I tend to think and many people tend to
think that in the long term probably the
defenders win but like you know in the
limit I'll just like rewrite all the
software in Rust and I just like get rid
of memory corruption vulnerabilities and
in the limit I'll like you know formally
verify all of my protocols you know TLS
is proved now to be safe under like you
know various assumptions like I'll prove
everything and like in the limit like
this is good um but like in the
transitionary period between now and
then things probably are very bad And
like this is I think why I particularly
want people to help like immediately is
because the transitionary period is
where I'm most worried and like we are
in the transitionary period now. And so
I think like yeah we need quite a lot of
help making sure that even if things
will go well in the future um that the
things will be uh at least not bad now
um you know I think the other analogy
people like to give is you know the
industrial revolution um all else equal
was a good thing but for the people who
were living through it it was like kind
of hard. Um we sort of like want to make
things go well um you know for the
people who are living through the thing
um but not uh you know but still like
get us to the nice end state um and just
yeah making that happen is going to be
yeah challenging. Yeah. Thank you.
`
