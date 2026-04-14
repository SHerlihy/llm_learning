const bytePair = `
Chapter 3: Byte-Pair Encoding (BPE)
about one of those very famous technique called bite pair encoding. So this is a tokenizing or encoding uh algorithm or
method which uh many of the large language models that we that we know
today um uh is uh has has has been using and it is very popular u uh it has been
implemented in GPT2. So the tokenizer that we use in GPD2 is based on u byte
pair encoding. So now let's see how bite pair encoding can help us uh in all this
out of vocabulary uh uh token scenario right so I have a beautiful presentation from uh uh
professor mitesh from IIT Madras um so let me just open u the presentation and
I so that it has a very beautiful visualization so I think that would be very easy for you to understand so I
have added this link into this Jupyter notebook. So at later point in time I would strongly recommend you u to go
over that uh to to understand even uh even more about this. So let's open this. I I guess I have opened this in a
different uh tab. So let me uh expand and show it to you. Okay. So
imagine that um uh you know just to uh revisit and where we are uh we want to
achieve and build a tokenizer such that it can surface our requirement of
unknown vocabulary and also it should be efficient right so one of the simple technique that you can think of while
while thinking about tokenization is uh we can tokenize the text the character character level, right? So, if you give
a uh give a word, you can always break that into single characters and that could be your vocabulary. Uh or in the
other extreme, you can have all the words that are available uh on on uh on this planet and you can create another
vocabulary. So, both of them has uh limitations. First is if you use a character level vocabulary then your
vocabulary size will be small like let's say if you have if you consider A to Z there are 26 characters then A to Z in
capital letter maybe 26 more character and then there are some special characters. So you can think of it like
you can have a entire vocabulary of size maybe 200 or 300.
Now if you do that then when you give a text like u let's say uh my name is sum
if you give this text then my my entire uh the embeddings of that
would be very very large because I now every word like uh my name is Suman. So
sum is contains five characters. So each character will get a unique token and or
will be treated as a unique token and each of those token will be later on converted into an array of numbers. So
it will be very cumbersome uh to uh do the perform the embeddings on even on a smaller text. So
doing the embedding uh at a character level may not be a very good idea. So let's see on the other extreme on the
other extreme we can have all the words on this internet. So in that case we will have millions of word. So that is
also not very good because at the end of the day if you think about any large language model it's a probabistic uh
mechanism where it just generates one token at a time and that one token is selected from the available vocabulary.
So if I have a vocabulary of millions of words uh and every time I have to pick one word from that uh millions of word
that is not very efficient. So the problem is this we we we need to find uh
a technique such that uh we we can stay somewhere in the middle not completely
word-wise where every word is a token and not at a character- wise where every character is a token. We have to come up
somewhere into in the middle. Right? So that is where a subword tokenizer is all about and that is what uh bite pair encoding is.
So let's take an example. So let's say this is a sentence uh knowing the name of something is different from knowing something. Knowing something about
everything isn't bad. So imagine that this is our entire corpus right? So this
is our entire vocabulary. Now we will spend some time to understand how bite pair encoding works. So the first step
in bite pair encoding is we do some pre-processing and we split every word
or we just split uh the sentence into every uh single word by just let's say
white spaces and we add uh this special character slashw. So this is just to identify uh the end of the word right.
So this is just an identifier for word boundary. So
our objective is to find the most frequently occurring bite pairs, right?
And we will get into that what do we mean by this. But the first step is we take this uh text and we split it
based on white spaces and we add this special uh character called /w as a word
boundary. Right? And imagine that this is the entire corpus that we have in our dictionary. Right? So that is the
initial uh data that to get started in real world. Uh this this would be huge.
Right? This would be like this you know millions of millions uh of text file that we might uh process.
Okay. So the first thing that we will do is we will count the frequency of each word in this uh each word in this entire
corpus of data. So in this case the word knowing has occurred three times and that's why the frequency is three. Uh
the word the occurred one time so that's why the frequency is one. So that is the first thing uh that we will do. Okay.
So now that we have this uh uh frequency count of each word, the next thing that
we need to do is we need to count each character, right? And update this table.
So this is going to be our initial token count. So we will start with the
character K. Uh because let's say the first word is knowing. So we will just start with the first character K. And we will see how many times K has occurred
in this entire corpus of data. So K has occurred only in this word uh knowing and since the knowing has occurred three
times so the frequency count of K is just three. So like this we will have
the frequency count of all the characters right. So let's try with the
next character. Uh the next character is n and n has occurred 13 times right. So
if you want to know how that 13 um uh have come we can find out that n has
occurred two times in the first word. So that's why this is n uh 2 * 3 it is six
and if you find more we can go to the next token and the next word is name and
here also we have n so it is 1 * 1 that is one and so on. So if you keep on
finding n in our corpus of word uh we will we will see that the total number
of times n has occurred is 13. Okay. So like this we will keep on doing for all
the characters and this will be my initial token count. Right. So this is
what we are going to uh get started off with. So this is very much like a character-based uh tokenizer and that is
our initial starting point right. Uh so I if if we recall we mentioned that
character-wise tokenization is not that good because it is limited and wordwise tokenization is not good because that's
that's a huge corpus. So we have to come somewhere in the middle. So what we are going to do next is we start off with character- based
tokenization right and we will keep on merging the more frequent uh pairs of to
of characters and then we will keep on merging them right so what do I mean by that so this is my initial corpus or
initial uh uh token counts the next thing that we are going to do is we are going to merge
two tokens at a time, right? So for example, in this case, this is our initial vocabulary size which contains
uh 22 uh tokens that means 22 unique uh characters in this whole vocabulary. Now
we have to start from here. So my voca the the end vocabulary will be somewhere
more than 22 and we will and we can decide when we should stop. Okay. So let's uh let's let's go to our second
step. So this is where bite pair counting comes into picture. So now we
will take two characters at a time and we will count its frequency. So in this
case we our first pair by pair is k and n and since it has occurred only in one of the word and this word has occurred
three times so the frequency count is three.
Similarly, N O the frequency count is also uh three and so on and so forth.
So, we will keep on doing this for all the uh bite pairs and once that is done
we will try to find out which pair has the maximum number. So, if you see here
uh the maximum count is I and NG both are seven. So in case of any tie so in bite pair what we do is we just take the
first one that's a random choice but we have just we just take the first one. So now
this pair will be added into my initial vocabulary. So my initial vocabulary was was having only the unique characters.
Now we are going to add in N into this initial vocabulary. And intuitively it makes sense as well.
It means that I in occurred the most amount of time. Right? So that means that whenever I occurred N also
occurred. So this is that's why that's the intuition right? Why by why we are even considering I in because we have
seen we are seeing that I in uh occurrence of I in is very high. Right?
That makes uh sense as well. But when we add I in N we have to adjust uh the
vocabulary count of N and I because uh seven occurrence out of this 13 has uh
has been already counted here right? So we need to update uh the count here as well as for I because here we are saying
the total number of u times I has occurred is 10 and the total number of times I in N has occurred seven. So this
should be also updated right. So that is what the next uh uh step uh is uh we
need to update the count of the existing tokens based on the present newly added token. Okay, which is in in this case.
So once we have this after the first u merge operation u this is where our vocabulary u uh would look like.
Okay. And like this we will keep on doing uh the merge operation. So every
merge operation will add a new bite pair into our vocabulary. And that is how uh
uh this bite pair encoding works. So similarly uh next time
uh once we add this next time uh we will have different byte bite pairs right. So
if you see here uh we we have in as a bite pair. Now um now what we are going
to do is we are going to have uh um uh different pairs. So now we will
have ING as well. So in is already there in our vocabulary. So we will now try to
merge I N and G. Right? Similarly uh other tokens as well but this is just for the uh sake of example and we we
realize that ing has occurred uh the maximum number of times and similarly we will add ing as well into our vocabulary
and we when we do that we have to again update the count of the existing uh uh
tokens based on the newly updated uh token. So that's the whole idea of u
bite pair encoding wherein you start off with initial set of characters of your
entire vocabulary. After you do some pre-processing, you will find out the initial set of characters based on the
frequency and then you keep on adding or merging uh two characters at a time or
merge uh the tokens one by one and keep on taking the uh bite pair which has the maximum
frequency count. So if you do a lot of merges
at the end you will find your final vocabulary. So in this case uh if we add uh let's say after 45 merges we should
be adding 45 new tokens. So the total number of tokens that we will have for our vocabulary is 45 plus the number of
initial tokens. So let's say the initial uh number of tokens is 20. So the total number of tokens would be 65. So that's how this whole bite pair encoding works.
Okay, just to summarize um if you start off with an initial uh number of tokens
uh which would be a character-based tokenization. So let's say that is 100 and then you do
200 uh merge operation. So in that case your total vocabulary size will be 200 +
100 that is 300. Okay. So that's about bite pair encoding. Uh I just thought to
give you some intuition about that. Um you can go over this uh presentation.
It's a beautiful presentation uh to learn more about this. But I think this is enough for us uh uh to to get an
intuitive understanding of what bite pair encoding is. So what we are going to do is we are not going to uh
implement a bite pair uh encoding because that would need a large uh corpus of data but what we are going to
do is we're going to use uh the bite pair uh encoding tokenizer which GPD2 u
has used and for that uh we can simply uh import uh this tick token uh module
uh and or the library and we use or we can extract the GPD2 encoder
and this will give us uh the tokenizer uh uh which we can use for our uh our
work. Okay. So let me import that and just check the version and we can get the tokenizer. So this is the tokenizer
which GPD uh has used right. So this particular
tokenizer has a lot of tokens. So let's see how many number of tokens that they have. So they have 50,257
tokens. So this is very much similar to the tokenizer which we have created earlier with a with our corpus of data
which was just a text file but now we are just loading it uh from u a tick
token right. So this tokenizer should be able to handle uh unknown tokens and
also it has a richer understanding of data because this has been trained on a
large corpus of uh data right so if you want to test it you don't have to go
with u JPT2 tokenizer you can always go with any other tokenizer and to find out
different tokenizers you can use this list encoder encoder names uh uh method and you will see that there are
different tokenizers which are available. Right? And if you want to see what is the vocab vocabulary size of different tokenizer, you can just uh uh
use this nvocab u uh variable. You can just call this and uh just uh read the uh value of this
parameter ncal and you will see that different tokenizers will have a different vocabulary size because they
were trained in a with a different set of data um initial corpus of data and so on. And going forward when you look at
different tokenizers you will see that the number of uh tokenizers or number of tokens are are increasing right with
with the latest and greatest models. Uh it's a very common and uh uh natural
thing to observe. Okay. So now let's try to do something interesting. Right. So now let's say we have some text right.
So you can pick any text of your choice and then let's try to encode uh this text just like before where we have
implemented our own tokenizer and send our text we used to get an array of numbers which are nothing but token ids.
Uh in this case we are doing exactly the same but we are using a GPT2 tokenizer.
So there is nothing special about it. So if you see uh here are the array of numbers that we get which are nothing
but the token ID uh of of all the tokens which the uh this particular GPT2
tokenizer has observed. Now if you if you carefully see there are some words which makes no sense. So and we
deliberately using this. So there is a word called some unknown word. So this this is this we kept it as a single word
which has no meaning. This is not a dictionary word. So in in in our technique this should have been replaced
by unknown token. Right? Uh now let's see how this bite pair encoding has
tackled this unknown word or this out of vocabulary word. So if we now decode
this and check the string and you will see that we are getting the exact same string. So it was able to chunk or
tokenize this word some unknown word right and this is the beauty of bite
pair encoding and the reason that it could able to decode this is because we used bite pair encoding. So what might
has hap might have happened is in the vocabulary this some uh this token uh
this particular word some unknown uh word uh token might have been divided into some unknown and word because these
are very uh common words right so depending on the vocabulary that this GPD2 tokenizer have uh it it was able to
uh decode that So this is the uh this is the usefulness of bite pair encoding
where it can handle uh unknown uh tokens or unknown uh words uh at the runtime.
Right? So uh this is that is the reason why bite pair encoding um works pretty well in
large language model and uh and one of the major reason is it can handle unknown word uh which which was not
present in the vocabulary and the reason that it could able to handle is because of subword tokenization. So it actually
tokenized the word at a subword uh level. So if you remember when we started off uh this uh section we assume
that every token is a word but in uh in real world that is not the case. And if
you look here this this particular sentence right so this particular sentence contains how many uh words? 1 2
3 4 5 6 7 8 9 10 11 12 12 words. But if you see the number of tokens that it has
generated, it's not 12. It's much more than that. Uh in fact, we can uh see this as well. So let's try to see the length of this.
It's 21. So 11 words got converted into 21 tokens. So
from now onwards if somebody says that uh um every token is a word uh which is okay for explanation sake but uh in real
world or at its core that is not how uh tokenization work. Okay. So now that we
know that it can handle unknown words we can always throw any uh garbage word or any word which is not there in the
dictionary and like in this case we are just passing this unknown word. This is not a a regular dictionary word and it
should be able to decode that right. And if we take this uh same array of numbers and if you paste it here uh to decode
we will be getting uh the word back as it is right. So this is one technique to
tokenize our data. Right? So, so we are able to u come to a stage where we given
a text we should we will be able to uh convert that um into token uh ids. Now the second thing that we need to do is
uh when we think of u training an LLM uh using a large corpus of data is called
data sampling. So the way that u any LLM is is it trained is a self-supervised
way. So what do we mean by that? Um assume that you have all the data all the corpus of data Wikipedia data and
all of that and let's for the sake of simplicity let's consider only text as we have been doing uh since the
beginning. If we have the entire text of data,
what we want the large language model to do is uh at the end of the day is it should be able to predict the next uh
token or it should be able to generate uh uh uh the right uh token uh one after another. Right? So when you go to chat
GPT or any LLM or any application based on LLM when you ask a question you get a response and that response that you get
it generates one token at a time. So it just generates one word or subword at a time. So when we have our training data
like the entire Wikipedia data what we can do is since we have the entire data
we can send only the first token and we expect the second token as the response
right so we we know that the second token here it's learn so if I give LLM as the first token we expect the model
to generate learn similarly when we give this phrase LLM's train uh sorry LLM's
uh learn we expect the token 2 as the prediction. So basically I'm just sliding by one and we are able to
generate the uh samples of X and Y. So when the given the input is X which is
this these three tokens we expect the output as predict. So just by uh it's it's a self-supervised the reason that
we say it as selfsupervised is because in normal supervised machine learning we
always need to give the x label and the y label but in this case we are just having the data so that you can consider
as x but there is no y label but from that x itself we can develop y right so and that is how we are developing
because we have the whole corpus of data we can just slide by one token and we expect the model to generate the next
token that we have. Right? So let's see how we can uh do this. Uh so just like before we are just uh reading the uh
text file and that is going to be our uh uh entire uh vocabulary and we we are
going to use the uh uh tokenizer that uh we have created using GPT2
right so the length of the entire corpus of data is 5,45
right so this is the total number of tokens that we have in our training uh set. Right? So now the first thing that we have to do is um we can uh I mean uh
before we go ahead uh we have actually gone gone through the text file and uh we we felt that the first 50 tokens we
can skip because it has uh uh some uh introduction name and all that. So just for the sake of this example we just uh
getting rid of the first 50 tokens right. So if you want to use any other file of your choice, you can very well do that. In that case, um you can just
skip this part. Even if you don't do this, that is also okay. But since uh I've read through this file, um I
realized that the first 50 tokens are are of not that use rightly around 50 tokens. Okay. So the way that we will
generate uh our X and Y for a self-supervised training is by this. So let's say my context size is four. Okay.
So the way that we I will generate the samples as like this. So we can start from the very beginning and take the
first four uh tokens and then the y would be starting from one to the token
+ one. So let me uh print this so that you get a better understanding. So my
tokens are this right? So this is my um encoded uh text and this is the sample
right. So this is the entire vocabulary that I have or the entire text that we have. Now
when the first token so this is an X and Y and see this very carefully I have used the same data to construct X and Y.
So in regular supervised uh supervised uh uh learning what we do is
we give something like x and we have some y right so this is how we always get the training sample but in
self-supervised in self-supervised what we have is just
we have x right so we don't have a y so what we will do is from this x we have to somehow find out X and Y. Right? So
this is this is the technique that we are uh uh trying to implement. Right? So in this case the X contains the entire
uh corpus of data. Right? Now we have to somehow find out why because we know the nature of this problem which is just a
next token uh prediction. That is what all the large language model do. So we can somehow establish that fact. So let
me delete this and uh show it to you how this works. So the first token if the
first token is 290 I expect the LLM to generate this token 4920 right. So
similarly if the input is first two tokens then I expect this third as uh
this 22 41 as the uh y as the as the uh generated token. So let me uh print out
the actual uh tokens so that uh you you can get a better context. I had the
sentence uh this right the and established himself in right that was
the exact uh sentence and the way that we have segregated that X and Y pair is
like this when the input is and uh the response should be established when the input is and established the output
should be himself and so on. This we were able to generate just based on this
one sentence right and that is why we call this technique as a sliding a sliding window technique right so if you
if I just scroll back uh if you just see we just had one line here right llm learned to predict one word at a time
this is just one line so this is the only text that we have now from this text we were able to generate create
1 2 3 4 5 6 7 8 eight pairs of training samples, right? And how we were able to
do that? We were able to do that using a sliding window technique where we take that we start from the very extreme left
and we process it in such a way that the when the X is first token the expected token should be learn. When the input is
the first two tokens, the output should be the third token. when the input is the first three tokens, the output should be the fourth token and so on.
Right? So this is how we can construct our data set to train our LLM. Right? So
this is called a self-supervised technique. And here in this case we just took a a context size of of four but in
real world it could be something else and we will see that uh in some time.
Okay. So now that we have uh done this uh we can now uh implement this using a
data loader right so so that we can use uh this data for any LLM training or any
uh model training right so we are going to use PyTorch for this so I've just uh imported PyTorch
and uh now what we are going to do is we we are going to use uh the PyTorch data set and data uh loader uh class to
create our data set and the data loader right so just uh before we because the code is very simple uh but understanding
of this code is uh more important so if we have a text like this we will slide by one right so if you see this uh the
blue box here uh if the input tensor is in the heart of right if this is the input then the output tensor for this.
So that means the uh the labels or the target would be just uh the tokens with
a slide of one. So it will it would be the red box right. So the heart of the
right. So this is where you see that the heart of the right. So when the input is in the output should be the when the
input is in the the output should be heart and so on and so forth. Right? So that's that's the uh basic intuition of
uh sliding window right. So here we are just creating uh uh a data set and this
is our own custom data set and in this uh three lines of code we are exactly doing what we have just explained just
to implement the uh sliding u um window uh technique uh to uh to just go over
the entire corpus of data. Right? So let's create this uh uh uh data set and
then we will have a uh data loader which will uh load the data and in this case
we have to um mention what type of tokenizer we are going to use. So we are going to use the bite pair uh encoding
based tokenizer which is uh GPT uh 2 tokenizer which we have seen earlier and then we will just take a batch of four.
So this is the default and what is whatever is the maximum length in the previous example uh I think we we saw uh
uh the maximum length as four but you can put whatever number that you would like to right so this will give us a
data uh loader so now with this we can uh load this data and start the LLM uh
training right so that's that's where we are getting into. So uh let's now read
our whole file. So now that we have our test data loader and data set created or the class created, now we can create a
data loader. So we will load the whole uh corpus of data which is uh this text file that we have been working on uh
from the beginning and we create a data loader. Right? So we will just give this raw text. here for for the sake of this
example uh let's start off with batch size as one and maximum length as four
and stride of one and and then we will just load the first uh batch right so
first batch should contain five to four tokens because the maximum length is four so let's see this we got the first
four tokens right and this is the x and this is the y right so Just exactly same as what we have uh seen earlier, right?
When the input is this, the output is this. The data loader whenever we load uh the data and whenever we uh call the data loader, it will give the x and y,
right? That's how data loader class works uh in pyarch. If you want to see the next batch, uh we can call uh this
is an iterator. So we can just call this next uh function. And if we print the next batch, you will see the next batch since there's a sliding window is one,
it should start from 6 uh 367. And that's what you see here. The first is 367
on 2828 85 and so on. And so this is X and this is Y.
Okay. So that is how we were able to it uh you know iterate and tokenize our
data and iterate through this. So now let's take a a more concrete u example.
So in this case now we are creating a batch size of eight and the maximum length is four. Right?
So that means every time we load we will get an XY pair of eight such samples.
Right? So let's see this. So in this case I'm just calling the same next uh here but now we are not getting just one tensor. We are getting eight tensors.
And the reason that we are getting eight is because the batch size is eight.
Okay. And since the maximum length is four, we are just getting four tokens.
Okay. So when the input is this, the output should be this. When the input is this, the output should be this. Right?
So that's the uh whole idea of this.
Okay. So till now we have been able to take the text, process that text,
convert it into tokens or chunks uh not chunks uh chunks may not be the right word but tokens.
And then we assign a token ID and this is this numbers are coming from uh the GPT2 tokenizer but you can use any
tokenizer of your choice and you will get this numbers. Now the final thing is not these numbers but each of this
number should represent a unique vector right? So that is the whole idea that every token should be converted into an array of numbers.
That is what we are going to do. Now before we see that how we can get those array of numbers um let's take a simple
example. Let's say uh we have these tokens and the token ids are 2 3 5 1 right just for the sake
of this example. So let's assume that our total vocabulary size is only six.
Okay. So total number of let me just write it here. The total number of uh
tokens is six. Okay. So that means uh it will range from uh 0 to 5 and after tokenizing of of our u input data.
These are the token ids just like uh before if you remember these are the token ids that we got from our input
data when using uh GPT2 tokenizer. In this case, just assume that we have done some pre-processing and these are the tokens uh token ids uh of the text. Now,
in that case, how we will convert these tokens into an array of numbers. So, if
the vocabulary size is six which we have considered here and now we can define the length of our embedding vectors.
That means here in this uh visual example you can see that we are trying to represent each token into an array of
three numbers. So in real world this length could be very high like 100, 200,
300, even 400 or thousand. Uh and the bigger it is it is better because you are able to represent your data in a
much higher dimensional space and every dimension has some unique information about that token. So in this case let's
say uh our vocabulary size is six that is given we can change this number. So let's say we want to create an embedding
model where the length of embedding is three. We can mention that as three and
we can create an array of uh three numbers by using the torch nn module and
we can use the embedding layer and we can give the vocabulary size and the output uh dimension right and we will
get a 6x3 matrix right so this is the matrix what it would look like and these are just
randomly initialized numbers But what this intuitively means is that the first
token's embedding is this. The second tokens embedding is this and so on and so forth. So since our total vocabulary
is just six, that means there are six unique tokens. So we need to have six
vectors representing these tokens. And the way that I can create six unique vectors is using torchnn embedding.
Okay. Now these are not trained. These are just randomly initialized. What happens is during the lm training uh
during the back propagation this embeddings are also learned. So at the end of the uh training loop or after we
we optimize and we get to a point where we feel that this is a good model we just stop and then we get a frozen set
of numbers which we consider as the uh embeddings of different tokens right but this is how it all gets started. So you
start off with an uh random initialization. So there are different techniques to initialize but this is not the final array of numbers.
Okay. And you can think of this as these three numbers representing three different things uh about every token.
Right? So for example the intuitive meaning of this is uh let's say you know you know me and uh you just know two
things about me. uh one is my name is Suman and second thing you know is that uh I work for Amazon you just represent
me um into these two things right so you can think of it as you are representing me uh in two-dimensional space now if
somebody asked you uh can someone play cricket now you cannot answer this based on just these two information but
imagine that I have given you five different types of information about me so let's Say if I say my name is Suman.
I work for Amazon. I used to play cricket in school. I used to play basketball as well which is not true.
But if I give you more information, what it essentially means is you are representing me in a higher dimensional
space and now the probability for answering any question about me uh correctly is much higher. So if I use a
higher dimensional u vocabulary size here. So let's say if I use 10 right and
if I use this uh now uh I will see oh sorry not the vocabulary size vocabulary size is six but let's say uh the output dimension is 10.
Uh now every token in in my vocabulary is represented into an array of 10
numbers. So previously it was three but now I have added more information. So that is the reason when somebody says if
the embedding length is higher is it better? Of course it is better provided that the added information is unique.
For example if I tell you a few things about me but not just my name and company but if I give you more information something like uh my name is
Suman. I work for Amazon. I play cricket. I play cricket in the morning.
I play cricket in the evening. I used to play cricket in the school. I used to play cricket uh during my college. So I
have given lot of information but if you noticed last four or five set of information are quite redundant. So that is not adding new value to you. So
that's why we say that when the embedding length is bigger, it is always good assuming that it has been trained
properly and we know that these columns are linearly independent or rather they all contains unique information.
In this uh example, we have just considered u an array of three numbers and these are the random initialization
and during the training process, this weights gets updated such that every token will end up having a good
information which are semantically similar. That means an embedding of cat
and embedding of let's say dog may be little similar because uh they both are animal and uh they both have four legs
they both have uh tail uh so the embedding of these two are expected to be very similar and we don't have to do
this of our own uh and we cannot do it of our own as well uh but these are learned during the training process okay
So uh now if you if you just in let's say this is our embedding matrix and assume for the sake of simplicity let's
assume these are the trained weight okay so these are not the trained weight as you have seen that we have just randomly initialized but assume that this is our
trained weight after the training and all that this is the final embedding uh matrix that we got. Now if we have a
token of ID3, I can simply I can simply run this and I will find the fourth row
from here. Right? So this is my fourth row and it is just a lookup. It will just look into the uh embedding uh
matrix and it will just find out the embedding which is there in the third token. So third token is nothing but the
fourth row because it's indexed from zero and this will be uh the array of numbers which represents the token number three.
Okay. So similarly if you if I have to um do it for okay I'm sorry I think
token ids okay I think I have not executed this but this is the token ids right so let's say these are the uh
token ids uh input token and now if I pass this so let me just uh
uh copy this and keep it here so let me copy this and let's say these are the
token tokens that I have and if I want to generate the embeddings of this it will just refer to that embedding matrix
and it will find the vector for ID number two 3 5 and 1 right so it's basically a lookup so if you see this
the token number two is nothing but the third row and the third row starts with 1.27 and that is what we are getting
here uh similarly the fifth one is uh this minus 2.84 84 and the fifth one
would be the last one and that is exactly the same vector. Right? So that's basically a lookup lookup table.
Now this is all good but there is a problem in this and the problem is we are not considering the positional
information of any uh token. So if you if you look carefully, we have created
the token ids and every token ID has a corresponding array of numbers or a
vector. But if we have the same token appearing in a sentence in a different position, there is no way that we are capturing that information. For example,
here if you see this uh let's say this is our embedding uh metrics. So these are like consider that our entire
vocabulary is just contains uh six uh tokens. So in this case if I have a sentence like this where fox is coming
in the first uh uh token in the sentence in that case the embedding of fox uh
would be this right uh the second index in the in the weight matrix and assume that we have another sentence where fox
is also there uh in the last uh token or the last u word in the sentence. So this
is the same sentence but fox is there in the first fox is also there in the last.
So in this case the embedding of this vector and the embedding of this vector is the same which is not good right
because uh these embeddings should contain the information of uh the of its
position because we often know that the uh when we speak in any language for that matter not just for English uh when
we speak uh where we place uh a certain word has a bigger impact uh in the
meaning of that entire word because it it very much depends on the context that we are talking about. Right? So this is
the last step that we are uh we are heading towards where we need to come up with a strategy where
we can embed the positional information of the token as well when we do the uh embeddings. Okay. So there are different
techniques of u embeddings and one of those uh techniques is called
uh absolute positional embeddings where we assigned an absolute value for a certain position of every token and we
just add that uh with our uh input uh embeddings right so let's say we this
this is uh our token embeddings right so just for the sake of Simplicity it's all
one uh assume that the same word u coming multiple times and what we do is
we just add a positional embedding. So that is another vector of same size. It should be of exactly same size of the token embedding but we just add this.
And if you noticed here um we are adding a different array of numbers for different positions. So now when you
look at the final embeddings of this token. So assume that this is the token uh this is the token embeddings of the
same token. Uh we are getting a different embedding vector because it is uh considering the position. So this is called absolute positional embedding.
There are different techniques. one is absolute then there is a relative position embedding where the focus is on relative position between the tokens not
the exact position of the token. So there are different techniques,
different models but uh we are going to use uh uh absolute positional embeddings
and in fact I if you want so let me just uh uh share you one one nice animation.
I think this is little old but I guess this will give you an intuition of how
these uh random array of numbers can be uh generated. Although there are very sophisticated techniques available these
days but this was one of the uh previous uh uh technique by using FIA transform.
So let me just uh share it with you you know how this works. So imagine that uh you have just four dimension that means
you are representing every uh token into an array of four numbers. So what you
can do is or you what you could do is you generate four different signals or four different
um uh samples uh using FIA transform or basically you the way that you can intuitively think of this as let's say
you create two functions of sine two functions of cos right and uh with
different frequencies and you will it will look up like this right and on the x-axis uh this you can consider as um
the length of the sentence or the position of the sentence or of the words in a sentence. So starting with position
zero to position 100 that means here we should be able to generate the positional uh embeddings of any string
which contains 100 tokens. Right? And the way that we will generate is all these are random uh uh functions right
and not random functions but different functions of uh different frequencies and the number of functions that you are going to use will depend on the number
of dimensions. So in this case it's four. So now if you want to find out the positional embedding or positional
encoding of the 30th word you can just look at the amplitude of all these four signals at the position 30 that's all.
So in this case at the 30th position the numbers are happen to be minus1.25.91.25.
So you can consider this as the positional embedding of the 30th token.
Similarly uh the 40th token if you want to do it will be all the amplitude of these four signals at this position.
Right? So this is one of the technique that you could use to find out the positional embedding of all the tokens.
And then what you do is let's say the 30th word is fish. So fish will have uh
an embedding right and the embedding length would be four of course four because that's why we are using a positional embedding of dimension four.
So what you will do is you will add the embedding of fish along with the positional embedding of fish which is
happen to be let's say in the 30th word um in the sentence and that will become the final embedding of this token fish
right so now that embedding of fish contains not only the information of
fish but also the position of fish in the entire context. Okay. So that is one
of the technique uh that people have used earlier uh in in in
uh training transformer based uh different architectures and transformer based models but at this point in today's time we have many more
sophisticated techniques but the core idea is this that you need to come up with an array of numbers which
represents different positions and you just add that with your uh token embedding that's all and you will end up getting the final embedding of your
tokens. So for this example and now let's go a little more real. Uh previously we used a vocabulary size of
six. Uh now let's use the vocabulary size as 50,000 257 which is the vocabulary size which GPT2 model has
used. And now we are using an output embedding uh size of 256. That means
every token uh will will have an array of 256 numbers. Right? So that is uh the
length of the embedding vector. So here we are creating the uh token embedding
layer. And here we are again loading our uh data but in this case we are using a
batch size of eight. And now if we just see the token ids we will see there are
batch of eight tokens uh sorry a batch of eight samples and each is of size four because the max uh
length is four. So what is happening here in this case uh we have total eight samples and each of these samples contains four token.
These are the token ids of different tokens. Now each of this token we want
this to convert into a vector of size 256. Right? So each of this token will
have a vector of 256. So let's see uh how we can do this. So what we can do is
we can just say uh token embedding layer and we can pass this input because token embedding layer is the layer that we
have created here using torch.nbedding and we will just pass this input right.
So before I execute uh let's uh think about uh the size of uh this token
embedding. So if you see this uh the size of this input is 8 + 4 right? So it
is uh 8 8 + 4
right. So now we want each of this token uh to get an array of numbers and the
length of that array is 256. So that means this should change into we will
have eight as a batch size four because there are four tokens but each token will be of 256 right so this is what the
size that we expect so let's execute this and sure enough we are now having a
tensor of size 8 + 4 cross 256 okay so the last thing that we need to
do is we need to add a position embedding. Right? So, so far whatever we have done, we have done this before as well. Nothing new. The only different
thing that we did here is we increase the vocabulary size and we increase the output dimension. That's all. But we
have not done anything for u positional embedding, right? What we we were discussing uh for last couple of
minutes. So at the end what we are going to do is we are going to create the positional embeddings and the positional
embedding size should be same as the size of uh the output dimension right and we are giving the context length as
the same as the maximum length. So in this case we are considering only four tokens at a time. So that means we need
to have uh the positional embeddings for four tokens and that is what we are going to do. uh using again with this uh
embedding layer and in this case we are saying that we should have a context length of four and the output dimension
is 256. So if you execute this and then if we find out the shape of the
positional embedding it's 4 + 256 because there are four positions and each position should have an array of 56
256 numbers. So now that we have the positional embedding and we also have the token embedding, the exact input
embedding would be just the addition of these two. That's all and that's the the reason that we need to have of uh these
two of same size so that we can create this final input embedding. Right? So if I execute this, you will see that the
embedding size is still the same as before. uh like what we have seen this before adding the positional embedding
but now this input embedding contains the positional information of each
token. At this point if you look at it we have covered a lot. So we started off with plain text. We learned how we can
tokenize the text. We also learned how to create this token ids. And then from
this we learned how to create this token embeddings. And finally we need to add the positional information of each token
in that in that context. Like in this example the context size seems to be five. 1 2 3 4 5. So all these uh
positional embeddings represents each token at a certain position like this is the position embedding of token number
one, token number two and so on and so forth. And once we add that with our token embedding, we get the final
embedding of our input text. Okay. And now we can use this input embeddings to
train our transformer model or our in this case it's a GPD based decoder only transform model but uh you can think of
it as any uh LLM or any transformer based model. So
we will take a pause here and going forward we will try to learn how we can
use embeddings in multimodality and also multimodal rag and we will also touch base on different embedding models that we have.
We are going to use uh Amazon Titan embedding model in uh one of our demo and uh this should give you a good
overall idea of how text are being treated by a large language model. So
next time when you go and open chat GPT or any of the application backed by LLM and ask a question and you get a
response, you know what is happening under the hood when you hit enter and the text goes and you get a response
back. So you know what is happening uh under the covers. Okay, I would highly recommend uh that you go over the GitHub repo and then play around this notebook.
If you if you find any bug or you feel that we can add a few more examples,
feel free to comment uh on this video or better would be uh to just uh raise a PR
or contribute to this project. Um thank you so much. Uh I'll see you in the next section.
`
