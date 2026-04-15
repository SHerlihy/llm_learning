const text = `
let me now spend
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
right? like I
speechless like like is like does not
begin to describe like these models like
really can do some some very impressive
things and it's like you know we we
really need to start rethinking um the
kinds of things that that we should
expect
`
