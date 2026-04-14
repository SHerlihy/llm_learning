const embeddings = `
Chapter 2: Embeddings in NLP and LLMs
In this section of the course we are going to dive deep into embeddings for large language models. in general embeddings for natural language
processing. I thought that it might be interesting and important to explore how data has been treated by large language
model. So we are not going to train uh a a large language model or pre-train any uh model here but we will try to
understand how data is represented or pre-processed in the very first place before a language model is being trained
and this will give us an uh a good foundation or at least it will give us an intuition u before we dive deep into
different topics like multimodality multimodality uh with rag and so So I have a notebook u as you can see
here and if you go to our GitHub repository you will see uh a folder called embeddings and within that uh you
will see this embedding for NLP notebook.
Okay so let's get started. So in this case I am referring a very good resource um
there's a recently published book from Sebastian uh called u building LLM from
scratch and I'm going to follow u uh his notebook uh I think it's chapter number two called embeddings and it's a
phenomenal book if you want to learn about LLMs and how LLMs are trained and fine-tuned I would strongly recommend you to go over that book so we are going
to refer to few of the examples that he shared in that book as a primary resource and as we go along I will share
a few more very good resource which you can complement uh which you can use uh you know to complement uh the learning
apart from this u uh course. Okay. So as you can see we are importing few libraries like uh tick token and torch.
So this is pytorch and tick token is a tokenizer. So for for the moment you can forget about this. We will come back to this little later but we are going to
use uh torch. So let me import them and uh check their version. So as you can
see we have torch 3.5 uh 2.5 and Tik Tok version uh 0.8. Okay. So uh this is the
image which I took from from that uh book of uh from Sebastian but we don't have to go over the entire pipeline. But
what it is showing is if you want to train a large language model what are the stages and what are the processes.
So the first process is to prepare the data and then you have to build the attention mechanism then the LLM
architecture and then you start uh pre-training your model right and then in the stage two we go over loading the
data and fine-tuning and so on. So for this section of the course we will spend time on preparing the data. So the idea
here is we need to do a certain things before we send our data to any model right uh
because uh models or any model for that matter uh they don't understand raw text
or raw audio or raw video. So we want to see how u how this data has been prepared and sampled. And for the
context of this uh section we will consider only text data. uh although the embedding philosophy or or the from a
conceptual uh standpoint it is very much similar whe whether the data is uh of different modality but uh for the sake
of the discussion uh for this uh section we will consider text data. So as we
discussed we can have data of different types. It could be a video data, it could be a audio data or it could be a
plain text. So the idea here is we need to somehow represent this data in a way
that a large language model can understand and the way that we do it is using embeddings. What embedding
essentially means is we take the data and represent it in a array of numbers.
That's all it is. At its very core, all we have to do is we have to come up with a certain way or a certain methodology
uh such that we can convert our data into an array of numbers and that is what we are going to learn you know what
are these array of numbers and how we can generate them. So that's the whole idea of embeddings.
So we will go over u uh this uh example step by step and we will see that how we
can take a data and convert that into an array of numbers.
So let's get started. So in general there are different techniques uh historically we have where we converted uh our text into uh an array of numbers.
There are different techniques like what to wear, glove and so on. So if if you take those into consideration and u take
a simple example that like let's say we represent our data into a two-dimensional space. What do what do I
mean by that? Let's say you give us any data or any any word for example and we represent that into an array of only two
numbers. So one number is the one dimension uh the second number is another dimension. You can think of it
as you are representing every word in an XY coordinate. That's all. Right? So in
that case if you use traditional um u embedding models or which which were available for quite some time before the
LLM uh era you will see that words which has similar meaning uh are
very close to each other. So in this case if you see eagle, duck, goose, they all are uh are very similar to each
other and that's why they are very close in in this 2D space. Uh whereas other places like Germany, Berlin, London,
England, the these are all name of city or country. So they are very close to each other. So that's the idea of
embeddings that we need to have similar words um close to each other. But this
is just for the sake of uh of of a simple example. But in real world, we we do not represent our data into an array
of just two numbers. But it would be an array of hundreds of numbers or a very large dimensional space. So let's see
how we can uh build this and what is the process behind it. So before we get into
this, let's see why we need this and where we are in this whole journey of uh
LLM from a training standpoint. So imagine that you are training uh a GPT
like uh decoder or transformer. So if you have this transformer here before you feed your data for pre-training or
training, there are multiple steps that you need to do, right? So let's say you have the input text as this is an
example. So you cannot just feed this data directly uh to the model. So there are a sequence of steps that we need to go over. We have to first tokenize that.
What do I mean by tokenization? We have to split the sentence in a certain way.
Right? For the sake of uh simplicity at this point in time we can assume that we will break this sentence into words by
just white spaces. So what we can do is we can just split this sentence u with a white space as a splitter and we will
get different uh uh tokens. So these chunks or these single words we can consider them as token and then each of
these token will be assigned a unique number and this unique number uh signifies what the token is in the
entire vocabulary. Right? So if you think if you if you assume that in in in the entire English dictionary we have
100,000 words. So this if the token ID of this is 40,34
the way that you can think of it as out of that 100,000 words uh this has a
token ID of 40,34 right and then with from this token ID we have to generate an embeddings like
every token ID will have a corresponding vector associated with that right so we will go over this uh as as we follow
along but For now um we are we are at this stage. So let's say we have a text.
We have to first understand how we can break that sentence or a a text uh into
small small tokens. So for this example we have a book uh a text file which we
have taken. So we have just downloaded this uh from a public repository. And what we are going to do here is we are just going to read that data and store
that um data into this variable called raw text. So let me execute this cell.
So as you can see this uh file contains a total of 20,479 characters. So it's not the words but
these are the total number of characters uh in that text file. And if you look at the first 99 characters, so this is the
first uh sentence uh in that text uh text file. Okay. So the goal of uh
tokenizer is to break this entire chunk or of data the entire data which we have
stored in this variable raw text into smaller chunks. Right? So how we can do this? So before we get into this uh
bigger file, let's take a small u uh string or small text. So here we are
using re as u the external library. So this is the library for regular expression in python. So what we can do
is uh as we discussed a while back that we can take a string and split it based on white spaces. So that's the easiest
uh thing that we can do to split any text intokens.
So if you do that you will see that we are getting different tokens like hello then whites space then world then again
whites space and so on. Now this is uh this is very trivial but there are cases
when we have a text and whites space is not the only u character uh to to split
our text. So we may like to uh split the data based on different uh splitters
right or different uh uh uh characters special characters. So in this case um we are splitting not just based on wide
spaces but different characters like comma full stop semicolon and so on. So if we do that let's see how our data
would look like. So now our data uh looks pretty good. we have hello then comma then world full stop and so on. So
these you can think of it as different uh tokens right so this is a very simple
way that uh we can tokenize our input data so let's see how uh this this
mechanism of tokenization works for our entire uh data set that we have. So
since we tested with only our small uh text like uh one line uh now we are going to use the same but on the entire
file the raw text which was the uh which was the variable we have created uh which contains the entire uh text file
right so we are going to do the same thing here and let's see how the processed tokens looks like. So if you
see here we have processed uh the entire uh text uh and we can see the first uh
30 tokens in this particular uh text file. Right? So if you see that how many tokens we have we can simply
uh use len function to find out the exact number of tokens in that ex uh entire file and that happens to be uh 4,649.
So we were able to tokenize the data that we had. Now of course these u these
number of tokens are not unique right because uh in if you see here in the first uh 30 tokens we saw a here and we
again saw a here. So this is we have duplicate tokens. So we can certainly find out uh uh uh a unique set of tokens
of of this processed file. But we somehow uh able to tokenize our data.
Now we will see whether this tokenization technique is good or bad.
But we we were able to achieve the first objective where given a text we can we should be able to tokenize uh the data.
Okay. So at this point if you give any text I should be able to uh give you uh
a tokenized version of that. Now the second uh step uh in the process is to give a unique number to each tokens.
Right? So if uh if if you remember uh if I scroll up if you remember here when we discussed
this this has a token ID of 40,34 is has a token ID of 252. So this is
just a random example but this is what we we need to achieve. We we were able to achieve till this much right. So
given a text we were able to tokenize that. The next step is to find out the token ID. So let's see how we can do this.
So this is our processed uh tokens,
right? And as we explained a while back that this process token contains duplicate tokens, right? Uh so because
uh in a text file, you will have a same word appearing in multiple times in different sentences or within the same
sentence. So if we uh uh if we use set we will get a unique set of tokens. And what we are doing here is we are just
sorting it in an ascending order. And now if you see the total vocabulary size it's 1,59.
So imagine that this is the vocabulary of of of English language. Just uh for
the sake of uh simplicity, just imagine that we have scanned through all the data on this internet and we tokenized
it uh using uh uh uh whites spaces uh and some special characters and we found out that these are the unique number of tokens.
Right? So now the next step would be to give or assign a unique number uh to each token and that we can simply uh do
by uh looping over the entire list and give them a number starting from zero.
So that is what we are doing in this dictionary comprehension. So we are just enumerating over all the words and we
are providing an integer uh to every unique uh tokens. So now if you see the first 50 tokens uh you will see
something like that right? So uh this uh this exclamation mark has a token ID of
zero. A has a token ID of 11 and so on and so forth right. So this is uh how we
we were able to tokenize the data and also assign a token ID to our data or uh
to every token. So at this point if we if we if we have a text or a string uh
we were we should be able to break that uh sentence into tokens and then we can actually assign token ID to each of
these uh tokens right so from this sentence we can easily come to this uh array of token ids so let's try to build
a simple tokenizer with this technique right so what we have established. So now what we are going to do is we are going to wrap up uh everything that we
have uh tested so far into a simple class called simple tokenizer version one. Okay. So we named it as version one
because we will be uh building on top of it and make it better. So this class contains uh two methods. One is encode,
another is decode. And as the name suggests, encode will encode the text that you provide and it will process it
by simply doing some pre-processing. As we have seen earlier, it will just split based on some special characters. And
once that is done, it will just return the ids of each token given the vocabulary which we have already uh created by reading that uh text file.
Right? So imagine that the text file contains all the words uh uh that we have in English dictionary for the sake
of it. But in real in real world scenario this vocabulary will be huge right in this case it's very small uh
because we have used one text file but in in real world it would be huge. So encode will this this method or function
encode will encode your text intoken ids and decode will do exactly the opposite. Given the token id it will
generate or it will have a lookup with the exact uh tokens. Okay. So let's create this class.
And now if we provide a string like this, it should be able to give us the token ids uh that is the encode uh
method. And similarly when we do a when we call the decode method and if we pass this token ids it should be able to give
us the text um back again. So let us uh test this and see how this works. So
first we have to uh call this uh tokenizer or create an instance of that and we need to pass the vocabulary. So
this is the vocabulary which contains all the words that uh we have in in our corpus.
So once we create this tokenizer we can send any text. So let's say this is the sample text that we have and we call the
encode uh uh function or encode uh method and let's see what are the token ids we get. So as you can see this uh
these are the token ids of different uh tokens in this text. So so far so good.
So now let's try to decode that. So if we pass these ids uh to the decoder or
decode function, we should be able to get the tokens back. So let us see what we get. And sure enough, we are getting
the same text back. Right? So this is u working uh pretty fine for for us uh as
of now. Right? So we are able to u tokenize our text uh to an array of numbers which are the token ids and we
are able to get back uh to the tokens given those ids. But uh now let's try to
send another text. So let's say uh I'm just uncommenting it and I don't have to uh create the tokenizer again. So uh let
me comment this. And now let's say we have this text. Okay. Uh hello, do you like tea? Uh so this is just a sample
text and let's try to encode this uh text using our tokenizer
and it seems that it is not working and we got an error called key error and it seems that hello is not there in the
vocabulary. So what might have happened is the text file which we have used uh to process uh or to create our
vocabulary that text file doesn't contain the word hello and we can in fact see that uh we have this text file.
So this is the text file uh which we read uh to create the vocabulary. If you search for hello
you'll see that there is no result. So this seems to be a problem right? Uh and
this seems to be a problem because uh in real world this is very common. Uh imagine that you have uh you have
started off with a certain corpus by knowing all the words that you uh you know at uh in today's time and you
trained a model and later on when the model got trained after a few months and a few a few weeks or few months when you
when you put that model in production and when you send a text for inference
or give a prompt it might so happen that uh you give a word which which was
recently added in the dictionary or let's say it's a new word which was uh which was never encountered by the LLM
at the time of training. So in that case we will get these kind of error which is certainly not good. So let's see how we
can modify our tokenizer such that uh it can handle these kind of out of vocabulary situation. Right. So one of
the very intuitive or very logical thing to do is to have a token special token
uh called uh let's say unknown token and have it uh in our vocabulary. Now in
that case what will happen is uh whenever we send any token which which we don't have in the vocabulary it will
have uh that token as a uh that special token as a default uh token assigned to that. Right? which may not sound that
great but it at least um will take us to a place where we will not get these kind of uh key error right or out of
vocabulary error. So what we can do is uh we can add some special tokens like here uh if we add a special token called
unknown and uh let's say another special token called uh end of text. So end of text a lot of times are used in LM while
pre-processing the text uh where uh we we need to add this to make a
distinction that u the the data that we have is coming from a different file
because in in in real world we will have a large corpus of data and all these data will be coming from multiple files.
So if we tokenize all the files together uh we would not know when the first file
uh is starting and when the second file is starting and so on. So if we have a tokenizer a special token called end of
text we can we can somehow use that in front of every new file. So if you if
you look at this image so let's say these are the different files that we have and this is the first file and this is the second file this is the third file this is the fourth file and so on.
So if we add a special token called end of text and send all these files
together after encoding we will have a way to identify from where the second file is getting started because we have
added a special token here. So which type of or what are the different special tokens uh you want to add it's
completely uh up to you. Uh there are different types of special tokens uh which different models uh uses but for
the sake of simplicity and for this example let's add two tokens. One is end
of the text uh special token and the other would be the unknown token. uh so that if any word which is which we
encounter in future which is not in the vocabulary uh we can uh assign that unknown token uh to that. Okay. So if we
recall our length of the total vocabulary is 159. So if we add the uh
two new tokens like uh end of text and unknown token uh we should uh get the total number of uh vocabulary uh should
increase by two right. So let's let's try to do that. So we already have uh this much we have already seen. So we
already have all the uh tokens uh from our pre-processed data. Now what we are doing is we are just extending it with
two new tokens. And since we have extended in uh into two with two new tokens, we have to assign an token ID as
well for them. So we are just doing the same thing what we have done before. We are just enumerating over all the tokens
and we are assigning an integer for that. Right? So let's run this. And now if we see the total number of tokens, it
is now 161. Right? Previously it was 1159. So we just added two special tokens.
Okay. So now if you just look at the uh last five tokens, you will see that
these two tokens got added. It's pretty uh uh natural and u this is very much
expected. So with this we should not get an unknown uh token right. So if we get
encounter any unknown word which was not uh present in our initial vocabulary, we should not get this error which we got
uh previously. So let's update uh our simple tokenizer and that's why we are calling it as version two now and the
entire code is exactly uh exactly the same. It's just that we added a new vocabulary, right? And one of the thing
that we have to do is we are adding a special step here. Um which just checks
whether a certain token actually exist in our vocabulary or not. If it exist,
we will just keep it as it is. If the item is not there in in in our vocabulary, then we will assign this
unknown token. Right? That is the logic that we discussed. uh uh so far right so this is the only change uh we have in
this version two with respect to version one so let's create this class and once we have this uh now let's try
with the same text so let's say uh we have a text called hello do you like tea and then we have another text called um
in this sunlit traces of the place so this is just a random string And if we just join these two strings,
uh we will use a special uh token. Uh as we discussed, imagine that this text one is coming from file number one. This
text two is coming from file number uh two. And when we pass this, we will add a special token uh between these two so
that we understand that when the first file is getting over and when the second file is getting started. Right? So this
is just an uh easy way to differentiate the start and end of any uh any text. So
this is our text and now if we encode this we should not get uh any error uh
while tokenizing and rightly so we are not getting any error and we are able to get the uh token ids right and if we
decode it back. So if we just uh this is for encoding. If we just decode it uh
back uh by running this decode uh method just calling this method we should be able to get the string back. And in this
case uh you can see that we we got a different text not the same text which
we added and which is quite obvious uh because we have replaced hello with unknown right that is some something is
very much expected and we also got a special token called end of the text and the last token got also replaced by unknown and let's see what was the last
token. So the last token was actually palace. So if we just uh search for this
palace in our vocabulary uh I'm very sure it should not be there. So let's try for palace. And sure enough we are
not able to see that uh token in our initial vocabulary. Right. So with this
uh we can uh conclude that we are able to tokenize our text uh data uh using
some special uh tokens that we added right. But this is uh not something which is great because in this case if
you see here we when we decoded we got the same token for two different types of word or two different words. one is
hello and one is uh palace right? So this is not good. So this technique is not very efficient uh because if you
have a text which contains lot of tokens which were not there in the initial vocabulary um we will not do
justice in identifying all these uh tokens and furthermore uh in the downstream process the LLM won't be able
to u generate the right response because it is going to generalize the text in a
in a one uh dimensional way uh that everything is unknown right so that is uh not a good way to tokenize our data.
So this is where uh we need to think about how we tokenize the data. So now we will learn
`
