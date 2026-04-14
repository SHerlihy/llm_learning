import { ResourceBuilder } from "@/content/resourceBuilder"

const introToAIForCoders = new ResourceBuilder("Enterprise AI Tutorial – Embeddings, RAG, and Multimodal Agents Using Amazon Nova and Bedrock by Auman Debnath")
.setHref("https://youtu.be/HaUe2AN210g?si=SXu6H8Bv5EhhcL8Z")
.setOverview("A light introduction to the software required for LLMs and mutli-modal LLMs to function.")
.setDateOfInclusion(new Date(2026, 3, 9))
.setTag("coding")
.build()

export default introToAIForCoders

const transcript = `
Chapter 1: Introduction
In this course, you'll learn about embeddings, rag, multimodal models, and agents with Amazon Nova. This course
covers the latest advancements in AI engineering focusing on real world applications and enterprise integration.
Suman Debnath from Amazon created this course. He starts by explaining text embeddings, including Amazon Titan text
embeddings, and he shows how to seamlessly integrate Langchain with Amazon Bedrock. You'll also learn about
the world of multimodal large language models and discover the power of Amazon Nova for both text and image
understanding. And the course also covers retrieval augmented generation,
RAG, and advanced multimodal rag techniques. Equipping you with the skills to build intelligent contextaware
systems. You'll get practical experience by developing an end to-end application that leverages Amazon bedrock agents and
knowledge bases to automate and optimize insurance claim processes. So get ready to improve your AI skills for impactful
enterprise ready solutions. And thanks to Amazon for providing a grant to make this course possible.
Thank you so much for joining this course. My name is Suman Dvnad. I am a principal developer advocate for AI and ML at AWS and I am excited to have you
in this course. In this course, we will start our learning by diving deep into embeddings, one of the most important
concept in the field of natural language processing and of course LLMs.
We will explore few of the algorithms like bite pair encoding or BPE and shall learn how to create embeddings using transformers and hugging phase.
Finally, we will also learn how to use few of the embedding models like Amazon Titan embeddings using Amazon Bedrock
which is a fully managed service for building generative AI applications with different foundational models at scale on AWS.
After that we will move on to multimodal models and shall learn how they are pre-trained how they are used and how
you can use them with Amazon bread. We will also learn about different models and architectures like contrastive
language image pre-training or clip and bootstrap language image pre-training or blip.
And finally we will dive into the latest family of multimodal models from AWS called Amazon Nova.
After that we will shift our gears and learn about multimodal rack or retrieval augmented generation and we will build a
system that can extract information from your data which contains not only text but also images and tables.
And finally, in the last section of the course, we will build an end-to-end application to automate the insurance
claim process workflow using agents and knowledge bases on Amazon Bedrock.
I hope you will enjoy this course and have a great learning experience. And during this course, if you have any questions, feel free to ping me on
LinkedIn or put a comment below. I will be very much happy to help you out. This is my LinkedIn ID. So please connect
with me and share your learning and before you get started I would strongly recommend to clone this course GitHub repository and keep it handy for your
reference as you go along with this course. Thank you once again for joining this course and with that I will see you in the next lecture.
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
Chapter 4: Amazon Tian Text Embeddings
All right. Now that we have learned about embeddings in NLP or embeddings in large language model and we understood
that why embeddings are so important uh and how it is an integral part of your
NLP based uh application we can dive deep into different embedding models and see how we can uh use them on Amazon
bedrop. But before we dive into a specific uh embedding model, let me tell you a brief about Amazon Bedrock in case
you haven't uh use that uh service on AWS. So Amazon Bedrock is a fully managed service on AWS uh which enables
you to access different large language models or different models from different AI startups. uh be it uh
entropic uh be it mistrail uh stability AI and so on and so forth. So what you
can do with Amazon bedrock is you don't have to manage and u get different API keys from different uh model providers.
uh you can access all these model with just one or two lines of uh code change and toggle between one model uh from
another and we are going to see that how we can implement that uh in the code. Uh but uh just to give you a feel of what
are the uh different functionalities that you can uh get from bedrock uh let me show you in the UI. So I have already
logged into my AWS account and if I just search for bedrock you will see uh there are different
options on the left hand side um bar. So you can see that the getting started where you can just uh uh click on
different model providers and select the model of your choice and get started with that. And uh you can also do custom
model uh meaning you can do uh fine-tuning of your uh pre-trained model. You can do model distillation. So
this is something which we have recently announced during the 2024 uh reinvent.
And uh we can also do uh continuous uh pre-training. Not all the models are available for fine-tuning or model distillation or continuous pre-training.
and we will see uh how to determine which model is available for fine-tuning or model distillation or continuous pre-training. But uh keep this in mind
that not all models uh can be fine-tuned or customized. Okay. But Amazon bedrock is is not uh just for accessing
different models but it it gives you different offerings. So fine-tuned model or customizing your model is one of the
option that uh you get apart from accessing different models under the same umbrella. We also have playgrounds
where you can select chat and you can select any model of your choice and you once you select that so let's say if I
select uh Nova Pro which is the latest model that we have announced you can just select that model and start asking
questions or you can start writing your prompt. So next to playground we also have different builders tool. These these are the tools which are available
on bedrock and these these are the tools which will enable you as a software developer to build AI enabled software.
Few of the options that we have is you can use agents where you can create uh an agent by selecting a foundational
model and you can add more realtime actions that the agent should take and you can also connect uh knowledge base
and we are going to talk about that in the last section when we build and end toend application for insurance uh
management wherein we will discuss what are agents are uh how it is different from function calling and we will use
agents with knowledge base which is a rag based of uh solution on bedrock. So that is what we can see here. We have
knowledge base uh which uh takes care of creating a vector database embedding your data automating the entire data
injection pipeline and so on. So I I don't want to spend time on this because I will go deep into this in the next
section once we uh start our multimodal um uh rag uh embedding section. But uh
this is also something that you will get on bedrock and apart from that we also have prompt management guard rails and so on and so forth. So at its core,
Amazon Bedrock is one service, but it it the way that I think about it is uh it comprises of many different services uh
small small services and features and functionalities which enables you to build smart application using large
language model and it's not just about Amazon's own model but this is the place to go for uh to explore different models
without worrying about API keys from different model providers. Okay. So before we even look into uh any of the
model the first thing that we have to do is we have to make sure that we have the model access uh for the model that we
are looking for. So if you see here we have different models uh from different model providers and you see that whether
we have access or not. So if you're logging in for the first time most likely you will see you don't have access. So in that case what you have to
do is you just have to go up and click on modify model access and select the model which you don't have access or the
model that you would like to have the access. Just click on that and click on next and then submit the
request and you should be able to get uh the model access uh uh in some time.
Most of the time it's very immediate but in few of the cases it might take some time. But this is the first thing that you need to do to get the model access.
Once that is done, you can access these models through SDK and get started with it. Okay. So that is what we are going
to do next. You know how to access these models through SDK. Okay. So lastly I
want to show you something that there are different types of models and there are different modalities. So if you see
here this is the model uh catalog and since we have completed only embedding so far. If I click on embedding you will
see that these are the five different embedding models that are available. Uh Titan text embedding version two, Titan multimodal embedding, Titan embedding G1
text and coher uh multimodal embedding or multilingual embedding. Right? So in
this section of the course uh we will use a Titan embedding model and we will see how we can access them within Python
SDK. Okay. So let me go back to my notebook.
Okay. So I have opened a notebook called embedding with uh bedrock and this is located under the same folder uh which
we used in the previous section uh while discussing about uh embedding for NLP.
So this is the notebook that we are going to refer in in this section. Okay.
All right. So just a a quick uh recap of embeddings. So we learned about how uh
embeddings work uh internally and how we uh generate those array of uh numbers
for a specific input uh token. So now what we are going to do is we are going to use a pre-trained model which has
been trained in in a similar fashion uh during its uh pre-training. But now that we have the model available, what we can
do is we can simply send our text and we can expect an array of numbers. Now the dimension of this array of numbers is
something that we can select and different model providers have different options uh and we will see what Titan
text embedding uh offers us. Okay. And this is the documentation of Titan text embedding model. So if I just click on
this, I guess I've opened it in a different tab.
Yeah. So this is the uh homepage of the documentation for Titan text uh embeddings. And uh as you can see here,
if I just scroll down. So this is the model ID we need to use when we access through SDK.
And it also gives you some of the information uh of this model. For example, as you can see, it can take
maximum of 8,92 tokens. So that is the maximum length of input token. So if you
give any input uh which contains maximum of 8,92 tokens, it will generate one
vector or one embedding, right? So that is uh that is a limit that uh uh uh you
should be uh keeping in mind because let's say you have a huge chunk of data and uh once you tokenize that you might
end up seeing that okay this contains a lot of token more than this right so more than 8,92 tokens so in that case it won't be able
to generate one vector so in in those cases you have to uh typically chunk uh the text in in the first place before uh
giving it uh to the model. Okay. And uh this is what uh I was talking about. So
you can change the output uh dimension or the output vector size. U by default
it's 1024 but uh you can always have a smaller vector length. So that means
every input token will be converted into 350 84 uh array of numbers. So when when
we discussed u embeddings in the previous section we learned that uh for a given model if we have a smaller
representation that means we are discounting different features right so uh a model which a higher dimension is
likely to be better with respect to a smaller dimension because higher dimension always captures more information and the assumption that we
are making is that these informations are all unique right so these are this is something that we need to keep in mind. So it's it's not that
uh if a vector length is uh doubled we will get um better information although that is most of the time it would be the
case uh for any pre-trained model but uh keep in mind that uh these information should not be duplicated.
All right. So these are the uh few of the information that you should keep in mind and whenever you uh look into any
model it's always good to look into uh these details like what the model is capable of so that once we get into the
implementation we can take the right uh decision.
Okay. So now imagine that we have a document. We will use an embedding model and this embedding model will generate an array of numbers. And the reason that
you see a a lot of vectors here is because we have lots of documents uh on the left hand side. So assume that each
document contains uh less than 8,000 tokens. In that case every document can be converted into one uh vector. But in
case the document contains more than 8,000 uh tokens uh in that case uh you need to chunk that. So at this point you
need to uh chunk uh the document or split the document in a in a smaller chunks. And this is where frameworks
like uh uh lang chain comes in which makes it very easy to chunk uh your document. But lang chain is not the only
framework. You can use many other frameworks but essentially uh these are the functionalities of different uh LM based uh framework.
So let's get started and let's see how we can use uh a bedrock model uh using
uh Python SDK. So here uh we are importing boto3. So boto3 is the SDK uh in Python to access any AWS uh resource.
So once I import what I'm going to do is I'm going to create a client object and
for bedrock and one client object for bedrock runtime. So this might be a little confusing uh why I'm creating two
different uh clients. Uh but the way that you should think about it is this
bedrock client is kind of uh the control plane. So if you want to know what are the models which are supported by
bedrock if you want to know what are the uh provisioned model that you have in on bedrock or what are the fine-tuned model
that you have on bedrock so these all are the information at the control plane right so this is not specific to
giving a prompt to a model and expecting a response right so which is the job of uh bedrock runtime right so if you want
to use any control plane information then you we have to use u uh the bedrock client and when we actually use a model
specific model uh then we have to use bedrock runtime. So let me show you how
you can use uh this client. So I have this bedrock client and now if I want to know what which are the models available
uh under bedrock which we have seen in the UI but let's say through SDK if you want to see I can just uh use this list
foundational model uh function and it will give me uh the response with all the model ids. So if you see this this
is the uh Titan model and if you see it also tells you what is the input
modality and what is the output modality that means what type of input it can take and what type of input it can
generate. So this uh method is very useful uh to actually know what model is
capable of and uh if you see here I was telling you in some time back that uh
you you cannot fine-tune all the models right and you need to check uh the documentation uh to know which model can
be fine- tuned and uh this is the option you should look for uh this key called customization support. So if it says
fine-tuning uh then you are sure that this model this particular model in this case it is the Titan image uh generator
model. So you can fine-tune this particular model. Uh but this is how you can check uh before you start the
finetuning that which are the models are available for fine-tuning. So this is a very verbose uh output. Uh so let's say
if you want to see which are uh the list of models uh I just wrapped it around a list comprehension. Uh what we are doing
here is exactly the same uh same uh API call list foundational model but we are just looping into all these models and
uh capturing the model summary and from there we are just taking the model ids uh which is this line right. So we
should get all the models model names in the output and we we are able to see all all the models which we have but it is
again it's a very long list. Uh if you want to see just the embedding models uh we are refining uh the code even more
further by just putting a condition called uh embed. If if the in if within the model name if we have embed um then
it should be an embedding model. And how do I know this? I just uh looked into all the embedding model I and I realized that this is uh uh one of the thing which we add in the model name itself.
So if you see this we have Titan models and we have coherent models and that is exactly the models that we have seen in
the UI as well. So so far what we have used is we just used one single API
called list foundational models and that is also in the control plane. uh but now let's see how you can actually generate
uh the embeddings right so which is the most important thing so it's pretty straightforward what we have to do is we
have to just uh put our text whichever is the text that we have so in this case this is going to be the prompt uh so let's say in this case our prompt is
hello thanks for joining I hope you are learning something new and now you can
simply call uh this model and in this case we are going to use uh a titan embedding uh text model version two and
we can simply run one single uh API called called invoke model. So bedrock run uh runtime client it's something
that we have already created and we can just use this method called invoke model and in this uh we just have to provide
the model id and the body. So the body is nothing but uh the exact information
that we need to pass uh to this API. So this is the body of uh this invocation.
And if you notice here what we have given uh in within this body is our prompt right? So that is the input text.
We can also mention the dimension as we have seen uh earlier. Uh let me just show you again. Uh this model provides
the output vector in three different uh sizes. One is uh 1,24
another is 8 384 and 256. So by default if you don't provide anything it will be
124 but you can always change the size of the embedding. So let me go back to the notebook and here the dimension we
have mentioned this as 1024 but even if I remove it uh it doesn't matter it will work uh as it is. Okay. and it will generate a embedding of size 1024.
Uh that's all and there is an option called normalize uh and I'll talk about it uh u uh next. So if you notice here
the only thing that we have done is just provided this model ID right. So let's say if you want to test with a different
model all you have to do is you just have to change this model ID. So you can pick uh a different model ID. Let's say this go here. And uh you just put the
model ID here. And you you just have to check the documentation that what is the input structure um of of this model and
just change this uh u body. That's all right. And then you can just invoke uh
the same API invoke model and you can get the embeddings. So this is uh the
most powerful point about Amazon Bedrock that you you don't have to worry about different model providers, different API
keys and all of that. Uh you can just change uh one line of code or just couple of line of code. uh I say a couple of lines because in many times
you might have to change the structure of the uh uh of the of your body because different models expects uh uh the query
or the prompt in a c in a slightly different way and that's why you might have to change one or two lines of code and that's all. Okay. So now let's execute this and see what we get.
So if you see here we got a long vector and we just printed the first uh three u
embedding uh and the last three embedding numbers. But if you see the length of this embedding so let me just
uh run this. So if you see the length of this embedding it should be 1024 right
and in fact if you just change this to 256 and execute it again and then if you see the length of this it should be 256.
Okay. So that's that's about how you can generate and embedding of your text. Now
once you have these uh embeddings you can embed all your text data which we are going to see uh in the next section
when we dive into a rack. But once you have these embeddings uh you can store that in an embedding uh uh in a vector
database uh which can store all your embedding which you can use later on for retrieval and we are going to look into
that later uh in this course. Okay. So that's about uh generating and embedding. Uh and there is an option
called normalize which uh I have not talked about yet. Uh so let me tell you about how normalized and why uh why it
is important. So normalization or normalizing a vector in general means
that uh you are doing some processing of the output vector that uh uh that you uh
that it generates. So normalization is a process to uh process of scaling uh so
that uh the output vector that you get the end vector the final vector that you get the unit length is one. Now this may
not be that appealing in the first place. You may think that okay what is the point of this but this is very useful um in many of the applications.
So it is useful to ensure that all the vectors have the are in the same scale right. So if if you if if the length of
the whole vector is one then it is assured that all the vectors are in the same scale. So you might embed different
vectors. Uh if you don't use normalization then embedding of different vectors can be can vary
widely. But if you normalize it you are always sure or you always making sure that all of your embeddings are within
the same scale. And this is very uh very very important in the context of machine learning most of the time and not just
in NLP but we do normalization standardization of during the pre-processing and post-processing uh of
of our data right and specifically this is very useful uh for retrieval uh purposes and uh that's why this is used
as a default right so let let's see uh you know how how you can use uh a normalized
the vector uh when you generate an embedding.
So let's say uh this is the text. So we have just taken one text uh and now we are using the same model but in this
case we are changing this option of uh normalization uh to true right so normalized is true. So in this case I expect the vector to be uh normalized.
So let's run this and we got a long vector and to check whether this is normalized or not uh we can just find
out the magnitude of this right so that's what uh we are doing here so we are just using uh numpy so there is a
module subm module within numpy called uh uh linear algebra or uh lin ang
function and pass on the embedding and if I run this you we will see that um the length of this is one. So in fact if
I just use this in my previous embedding right. So let me just call this and we
will see. So let me just run this uh first. And now if I just uh find out the
length of this vector you will see it is not one.
So now if I generate uh the embedding of another text. So let's say let's take
this example. So let me just copy this and
let me just replace this
and run it again. And if I now try to find out the norm of this, the previous
text has a length of 28. So now let's run this and we will see that this is 24. So you see the difference. So uh
that's that's why we say that there is no uniformity uh across different embeddings and which is not very good when we do any retrieval process and uh
any we use this in any downstream uh uh process and that is that is the reason we should always normalize the vector so
that the all the vectors remains in the same scale. Okay. So that's the whole idea of uh normalization.
All right. So now let's see how uh the embedding vectors uh looks as uh uh as
of now we have just uh learned about the array of numbers that it generates but we have not looked into whether these
numbers are actually making sense or not. Right? So for that what we can do is we can generate the embeddings of two similar uh text and try to find what is
the similarity score between two texts right which are similar uh and uh and evaluate whether this embedding model is
doing its job or not. So since we are going to u call this embedding model multiple times. So I'm just wrapping
these uh uh line of code which we have been using uh uh over and again for different texts so that we don't have to
uh you know write the same code uh again and again. So it just takes a prompt and uh we just uh use the same model uh to generate the embedding. That's all.
Okay. So you can make this function more uh more useful by taking the input uh
not just the prompt but also normalization and dimension but uh you can always do that when you uh play around with this notebook but for this
demonstration we are just expecting the prompt. Okay. So now that we have this uh function uh ready, we can have two
texts. Uh let's say the first text is Python is a programming language and the second text is Java is also a
programming language. So now if you think about it, these two texts are pretty similar. So if we generate the
embedding, it is supposed to be very close to each other. So let's try to find out. So here we are just taking the generating the embedding of two vectors and we are using the cosine similarity.
So we are just uh creating the dot product between two vectors and then we are just dividing it with the magnitude
of both the vectors. That's all. It's a standard formula for to get uh the cosine similarity and uh we provide both
the text text one and text two and let's see what is the cosine similarity of these two vectors. So if you see this
it's around 34 right. So whether this is similar or not uh how would we know? Uh let's try uh an example which are pretty
much orthogonal right. So uh let's say it's uh uh not at all uh similar to each other. Okay. So let's say uh let's let's
change this. Let's say first sentence is let's keep it as it is and second is
let's take some example uh this is a table so there's no uh
relationship as such right although we have used uh is a uh it's uh in both the
text but in the context they are not uh very similar right so uh in here we are talking about table and there we are
talking about programming language. So let's see the cosign similarity. So it's it's very less right but although it's not very very less because uh it is
still talking about something and this here also it is talking about something but if you just u give something very random.
So now you see this it's pretty less it's minus 0.01 because they are quite orthogonal to each other. It's no uh
semantic meaning between these two. Uh similarly if we have some other text. So let's say in this case it's have a text
called it's a sunny day and we have another text called it is not it is it may not be raining. So these two are uh
related uh but uh text uh semantically they are related. If there is no it's if it is a sunny day it's very likely that
it will not rain right so we expect the cosine similarity of these two should be little close and um as we can see here
it is indeed we have a good similarity between these two although uh there is no um exact phrase which is common
across two uh texts although we have it but here we have its but this should give you an intuition that why
Embeddings are so important. Uh and uh that's why when you when you pick an embedding model uh that actually
determines how good your response would come up at the end of the day in your application because the the better the
embedding model is, it can contain better information uh and it can give you a better semantic search result when
you use it in a downstream process like let's say rag. Okay. So now that we learned about uh text embeddings and
also we looked into how you can generate embeddings using bedrop in the next section we will start off
talking about multimodal embeddings and uh multimodal large language models in general and we will see how you can use a multimodal uh model uh with bedrock.
Okay. Uh I'll see you in the next section.
Chapter 5: Multimodal LLMs
So now that we talked about embeddings in natural language processing or embeddings in uh LLMs, it's good time to
talk about multimodal large language model. So in real world most of our data doesn't contain only text. So the data can have different forms and formats.
For example, it could be an image uh data, it could be uh a video data, it could be an audio data and so on and so
forth. So, so far we have learned how we treat text as an input. We learned about
how we embed a text and generate an uh embedding for the text. But how about multimodality? How about different data
types? And this is what the objective of this section to learn about multimodal models and multimodal embedding models.
So multimodal models are an advanced AI system which are capable of processing and integrating different types of data.
So that data could be text, it could be image, it could be video, it could be audio and so on and so forth. And if you
think about it, it has multiple use cases. For example, image captioning. So imagine that you have a set of images
and you want to add a description to that image which is very much uh relevant uh in today's world uh in the e-commerce industry where you you you
are coming up with a new product and uh you are generating a new image for that product and you want to generate a
description of that uh of that image. Uh similarly if you have ever used visual search on Amazon app which I've seen uh
rampidly being used especially in the western countries wherein uh people go for shopping at some retail shop and
they just open uh the Amazon app and they just click a picture of the product that they are looking to buy and they
compare that product's price on Amazon and uh check the price in the retail shop and uh take a informed decision.
So the way that uh these systems work is you take an image, you send that image
uh to the backend system and the system understands what that image is about right and you get the right product uh
as an output. So image search, image captioning, uh visual question answer wherein you send a screenshot and uh you
ask some question or you pass a PDF document which contains images, tables,
uh and text and you want to talk to that uh PDF document or you want to uh question uh uh where you expect the
answers to be uh in that document and we are going to see uh one example for that uh in the next uh section. So the idea
is very simple. We want to come up with a model which can uh handle different types of modality. Now before we go
ahead uh one thing to keep in mind is when we think about multimodal models uh in in particular we need to first ask
the question in which side of the model we are expecting the modality. For example, in this case, if you see uh the
input to this model uh could be text, uh could be image, could be video or could be audio. That means the input of this
particular model is multimodal. Whereas the output we expect this to be just text, right? So this is also a
multimodal model. But we need to be very specific in which side of the model we are talking about, right? When we when we say it's multimodal.
Similarly, there could be some model which just takes a text but it can generate text as well as images. So that
could be also a multimodal model but it's it's it's just that uh you need to be very careful that multimodal means
what in in the context of its input and output.
So we know that from the world of NLP ever since we got the paper called attention uh you all need which is a
transformer paper I think it was uh published in the year 2017 phenomenal paper which changed the entire dynamics
of uh NLP and machine learning in general. So we know how uh text uh can
be used for any classification task or text generation task because we have this new architecture called transformer. So for example we are
passing a a text uh and we expect uh the transformer to predict uh whether this text is a spam or not spam. So this is
very much a common problem especially uh in in emails right we we get a lot of emails and we need to classify whether
the email is a spam one or not a spam one. So we knew how to handle text data
and this was powered by transformer based model in you know and this is has this has been worked out in the recent past. Previously also these kind of
tasks were accomplished but not through transformer but uh using different uh models different architecture but in
today's world most of the uh NLP based task can be accomplished with transformers. Now this was very very
powerful and researchers and scientists came up with a thought that okay if this works with text how can we leverage the
same architecture for vision and that's how vision transformer came into picture which processes unstructured data by
converting it uh converting the data into a numeric representation. Uh so for example now with vision transformer if
you give a uh image as an input it can also classify what that image is about.
Here if you uh provide an image of a cat uh it can predict how it's a cat or a dog. So we basically have two different
types of model which are backed by similar architecture which can handle text and image both. But what we are
looking for is one single model which can take text or image and it should be able to uh embed our data or represent the data in the same vector space.
Right? So that is the idea of uh multimodal uh model. But the fact here is what we have learned in
transformer-based model or when we discussed about embeddings, we learned that when we get a text, we chunk it uh
and we tokenize that text. Now the first question that might come in our mind is now that input is an image, how can we
transform that? Right? So we c we cannot just uh tokenize an image just the way we tokenize a text. So let's see how we can do this.
So if you recall in NLP or when the input is plain text the way that we
tokenize it is splitting that text into small small tokens. And we have learned different techniques of tokenization
like bite pair encoding. But in this case for the sake of simplicity uh let's consider that we have this text and each
word is a is is a separate token. We also add some special tokens like uh cls which is a classification token which
always gets added at the beginning. And then we also add a special token called se which uh stands for uh separation uh
token which uh indicates when a sentence ends and when the next sentence starts.
These are the special tokens but the way that we tokenize is very straightforward. We just split it based on uh different tokens. So in this case
it's a word- based tokenizer but in real world it's always a subword based tokenizer which we have seen in the
embedding section and once we tokenize it we pass it through the encoder uh
layer because we have the embeddings and now we can just pass it to the encoder layer of our transformer architecture.
Now this works pretty fine in case of uh plain text. But how about images? They
do not consist of words. So we must come up with a strategy uh to uh mimic this tokenization uh so that we can use the
same transformer-based architecture but for vision and that is where vision
transformer comes into picture wherein when we take an image we first used a
patched image. What that essentially means is we break that image into small small patches and then we flatten up
those patched input. Uh for example here in this case the original image is this which is a image of a cat. uh we used a
patch of dimension 3x3 that means we split this into small small blocks and the total number of blocks is nine and
then we flatten uh that input and the objective here is to tokenize the image
such that I can use the encoder component of the transformer just like how encoder part of the transformer
works for text we want to use a similar architecture but for vision. So in this case we have used a 3 +3 patched image
but in the original paper if you read through that paper you will see that they have used a 16 + 16 patch but the
core idea remains the same that you split that image into small small patches and then you flatten uh that uh
those patches and that becomes your input. Now the natural thing to do after
this is just like in text after we tokenize we assign a token ID. Uh so in
this case also if you think that each of this patch is equivalent to one token we may want to add one token ID to each of
this patch. However this may not work in the world of vision. And the reason is
when we think about text, let's take an example. A word the might come in many many texts, right? Because we are very
sure that it's an dictionary word which can come in many other text. But in case of image, if you pick one of the image
and if we patched it and then whatever patch we get, let's pick this second patch. I don't think that we can expect
this patch in other images uh that are available on the internet. So that's why it doesn't make sense to uniquely
identify each of this patch at this point in time. And that is the reason we don't use this flattened input and perform the tokenization.
So we take this flattened input and then we go through a linear layer projection.
So what that means is we take this flatten input and then we add a linear projection and then linear projection
gives us a vector and that vector we used for encoder.
Now of course each of this patch once we perform the linear projection it gives us uh a vector but that vector doesn't
contain the positional information of each of this patch. So just like in uh processing text here as well we add
positional embedding which I've not seen in this block diagram uh but imagine that that positional embedding is also
being taken care at this layer and once we have that once that linear projection is over we have an array of
embeddings and now that we have the array of embeddings we can use the same encoder architecture which we have used
in text. So this is the core idea. So we wanted to make sure that we leverage the
power of transformer architecture and we have to come up with a way such that image can be also broken into similar
format or similar input space uh so that we can leverage the same architecture and that's why we came up with this batched image thought process.
So this is what we do. Let's say this is an image. We break it uh into small small patches. So in this case uh the
image is of size 128 cross 128. So that means it has 128 pixel uh horizontally
and 128 pixel vertically. And then let's say we used a patch of size 16 + 16. We
will have 64 total patches. So now if you pick one of the patch, if you take
one of the patch, so one patch consists of 16 + 16. That means there are 16 + 16 uh numbers uh in this patch. So when we
flatten that uh patch, you can think of this as an array of 768
uh numbers, right? So if you just do the maths, it's uh 16 + 16 + 3, it's 768.
So each patch got vectorzed into an array of 768 numbers. This is what the
linear projection is all about. Now you can use this uh array of numbers and then add the positional embeddings and
that you can use as the embedding of that particular patch. And similarly if you take the embeddings of all the
patches you will get the embedding for the image. And of course uh the weights for this linear projection is being trained during the training process.
Okay. So that's about processing an image and this particular uh image as you see it's a beautiful illustration I've taken from this uh GitHub repo.
I've added the source link in case uh you would like to dive deep. Okay. So now that we learned about processing an
image uh with vision transformer uh let's combine all these concepts uh together and understand how a multimodal
embedding model is trained. So if you think about what are multimodal embedding models is that we want a model
which can embed an image of a car for example and the text car in the same
vector space and they should be very close to each other because the semantic meaning of car and the semantic meaning of this image is very very similar. So
we want an embedding model such that the image and the text represent that image
should be close to each other. So we have learned that there are embedding models available which can embed images
and there are embedding models which can embed text but they are in in a different space. So they may not be
essentially close to each other if we put them uh together in uh in the same coordinate system.
So the aim for a multimodal embedding model is very straightforward. We expect
the model to generate the embedding of a text like this. This is a cat. The embedding of this should be very close
to the embedding that the model would generate for an image of a cat. So that is what we want. We have learned that
text and image both can be embedded using different models. One may be a transformer based model for text and
another uh would be a transformer-based model for vision. But those two embeddings may not be very close to each
other. But we want to train an multimodal embedding model such that the output embedding of the sentence and the
output embedding of the image should be very close to each other. Now how we can uh do this? So this is where an
algorithm called constructive language image pre-training or clip comes into picture. So this is one of the uh model
which uh which we have which are trained to create multimodal embeddings. So
let's see how uh this whole uh concept of uh clip works.
Chapter 6: Contrastive Language-Image Pre-training (CLIP)
So in the first place to train a model uh which is based on clip we need some training data set and the data set
requirement is very straightforward. We need to have a bunch of images along with its caption. So here if you see
there is a image of a cat and we have its respective uh captions and now we will create a data set with positive pair as well as negative pair.
What I mean by that is imagine that you have u let's say 10 images. So I've created a note. So let's say you have 10
images and 10 images have its own respective labels. Now what we will do is with this 10 images we will also
generate more pairs wherein we can take the image number one and let's say a
label uh number two. Similarly, we can take the image number one with label
three and so on. So, if you think about it, these all are positive uh examples where the label is exactly for the
respective image. Whereas here uh the image is one but the label is different that means these all are negative
images. So similarly we will have another set of image label pair which is
let's say image two and label one and so on and so forth. So in this case we can
have image two label three and then image two label four and so on. So if we
have 10 images we can have 10 positive pairs and 90 negative pairs. So this is
how we should create our data set with some positive pairs as well as few uh negative pairs. Okay. So that is the
prerequisite. This is the uh starting point uh to train any clip-based model.
Okay. So now what we are going to do is this. We are going to have two models.
We I mean that model will have two parts. One is a text encoder part.
Another would be a vision encoder part or an image encoder part. And when we have any text, we will make it pass
through the text encoder and we will look into its embedding. And we have seen how to generate a text based uh
embedding. Similarly, we will pass the image and we will make it go through the image encoder and we will get the image
embedding. Now initially these embeddings may not be close to each other. So because this is not a trained
uh model yet but at the end of the training we expect embedding of the sentence and the embedding of the image
should be very close to each other for positive pairs for all these positive pairs. And at the same time we expect
that for all the negative pairs the distance between the image and the uh
and the label should be very far to each other. That means the embedding of this image one and the embedding of this
label two should be far from each other because they are not uh related. So with
clip you not only make image and respective text embedding closer but you
also make sure the embedding of uh dissimilar uh image and its description are far from each other. Okay. So that's
the whole idea or the objective function here for this training process. So the way that we will do it is like this. We
will have lots of positive and negative uh uh pairs. we will pass it through uh the model. So we will have the text
encoder and the image encoder. We will compare uh the distance between these two and then we will compare that with the label. So if the label is positive,
we expect the distance to be smaller and if the label is uh negative, then we expect the distance to be larger. And we
keep on doing this and we will back propagate and update uh the weights of these uh models or the text encoder and
the image encoder. And during this model it will optimize and finally we will get a model wherein the moment you send a
text and the moment you send an image which is uh let's say uh in this case uh an image of a cat and the sentence is
this is a cat you will find the embedding that it generates for the sentence and the image are very close to
each other. And once we have that we can call that model as a multimodal embedding model which understands text
as well as image and most importantly they can put the vectors into the same
vector space. Right? So that's that's the final outcome of any clipbased multimodal model.
So one thing to note here is u before we jump into the code is here when the
input is text and when the in input is uh image so we uh we expect the model to take both of them right so that's the
whole idea of multimodality so there are uh some requirement from the model which might mandate you to pre-process the
image before the model takes that as an input because every model have a different architecture different uh requirement. So most of the time when
you have a text and an image, you have to go through a pre-processing because the image can be of different sizes,
right? But when the model was trained,
the model might have been trained with a certain dimension, a certain size. So before throwing any uh uh image of any
size, you might have to pre-process that image before you pass that image to the model.
So there are many clip- based model available. Uh to get started I will show you how we can leverage uh the open clip
model. So for this we have to install the transformer and hugging face uh
library. I think I've done that prior to starting uh this video but all the requirement and prerequisite and libraries required for this I will add
that in a requirement.ext file. So before you get started with this uh notebook, you can just pipe install the requirement file and you should be uh good to go for all these examples.
Okay. So for this we are taking uh some image. So I just have uh a sample uh image of a dog and this is the caption,
right? So this is the caption and this is the image of a dog. Right? So you can
imagine that we have a text with its caption because this is a positive pair right because the caption is also is
about a dog. So now let's see how we can use a clip model. So now we are not training a model but we are just
leveraging one of the model which was trained based on the architecture that we have just discussed.
So in this case we are just uh mentioning the model name. So this is from OpenAI the clip vit base patch 32
and the first thing that we need to do is load that model weights. So that's what we are doing here. So we have clip
tokenizer fast and clip processor. So these are the two uh functions or class
that you have to uh call before uh you use the model. So this is from the
transformer library. We have clip tokenizer fast and clip processor. So these two are the pre-processors for the
image and the text respectively and this is the model. So as I discussed a while back before you pass on your image or
text you have to go through pre-processing and that's what these two instances of this class would do. Okay.
So this is a clip tokenizer which will tokenize any text and this will be the clip processor which will pre-process
any of the image. So let me just show you the image. This is the image of the
dog and the caption is a dog sitting on a field. So this is very much a positive
example. So if we use a clip-based model which in this case is an open AI
clip-based model we expect that the embedding of this image and the embedding of this text should be close to each other. So let's try to see this.
So first thing we have to tokenize this input that is why we have to use this clip tokenizer and we are passing this
uh caption which is the text and we expect the return value would be a tensor a pytor tensor and if you look at
uh the ID okay I think I have not imported this I have not executed this cell so let do
Okay. So now if I run this, you will see that this has tokenized my input a dog sitting on a field into bunch of tokens.
And if you want to see uh those tokens actually uh turned into uh we can just
call this function called or a method called convert ids to tokens. And if you see here we have the exact text a dog
sitting on a field but it has also added two special tokens which is end of the text and start of the text. And if you
carefully notice the token ID of start of the text, this one, this is the first
token, the token ID is 49,46 and the last token, the ID of that is 49,47.
So I guess uh the entire vocabulary size of this tokenizer is I think 4,000 uh 49,48
because it starts with zero. In fact, we can see this. So we can just call clip
tokenizer and we can check the vocabulary size. And as you can see it's 49,48.
That means the these special tokens the the start of the text and end of the text are the last two tokens in the
vocabulary. And if you remember when we discussed about uh bite pair encoding uh we we noticed that at the time of
training the first step is to tokenize it or break the uh sentence into
individual words and add this uh special character slashw right and that is exactly what we see here uh and the
reason is it has used bite pair encoding under the hood right so that's the tokenizer uh that they have used. Okay.
So now that we have processed our uh text uh let's see how we can process u
our uh image. Right? But before that uh let's create the embeddings of this uh
uh text. So far what we have done is we just pre-process the text and we got the token ID. But now we will actually pass
that tokens uh through the model. So that's why we calling this method called get text features and we are sending it
through the model. And if I scroll up uh the model that we are using is the clip model and we loaded this model with this with the weights of this model ID. Okay,
which is a openAI clip- based uh model.
So let's now generate the embeddings for this particular text. And if you can see
the size of the embedding is 512. That means this text this piece of text has
been converted into an array of 512 numbers. So now let's try to do that for
the image. So in this case we will pre-process the image. So this is the image that we have seen an image of a
dog. And for pre-processing uh just similar to uh tokenization here also we are calling clip prep-processor and we
are parsing image in this case and we are also saying that the return should be a pytorch tensor and we expect the
pixel values of that image. So let's see the shape of this image. So the shape of this image is after pre-processing is 1
+ 3 + 224 + 224. So one is because it's it's always uh in in in the format of
batch size, the number of channel and the width and the height or I think height and width but the first is the first number uh denotes the batch size.
So after pre-processing no matter what uh is the size of the actual image it will be pre-processed to uh a size of
224 cross 224 right so that is uh the most important thing here uh to understand. So now if you want to see uh
the pre-processed image how it looked like uh with respect to the image that we have seen uh which is uh quite big in
size and high resolution we can simply just uh perform some numeric uh transformation and we can show this
image using mattplot lib right so and if you see this this image looks of less resolution
intensity of the image is also is uh is quite lower and the size is also got reduced. Right? So this is the image
which will be fed to the model which we expect will generate an embedding uh which should be similar to the embedding
of the text. Right? And if you are curious what we are doing here, uh since our image contains uh this batch size,
we wanted to get rid of that and that's why we use squeeze and squeeze zero means we want to get rid of this uh
dimension. So which is the first dimension that is dimension zero and then we are just trying to change uh the
representation of the pixels. So the original uh data that we have after pre-processing
in pytorch we have the channel and then height and then the width but in
mattplot lib the way that we can visualize is we need to make sure that the channel comes at the end okay uh
whereas here the channel is uh at the very beginning so that's why we are using permute we should have this order
First should be the height, next the width and at the end we want the channels. These are nothing but the
indexes of the dimension. All right. So now that we have this image, we can use
the image embedding uh model which in this case it's the same uh uh model and get the features of this. And if I run
this, you will see that this image also got converted into an array of numbers of dimension 512.
That means the same model can be used to embed image as well as
text. And as we discussed before uh any clip-based model or any multimodal embedding model, we expect the
embeddings of similar things should be very close to each other. So now let's see how similar these two embeddings
are. Uh so in this case we are simply doing a dot product between the text embedding and the image embedding. And
before this these uh few lines of code what we are essentially doing here is we are just normalizing uh the embedding
vectors. And now if we look at the score we see that uh the similarity score is
28. Now this shows that there is some similarity but how would we know that this is actually very close uh I mean how can we interpret uh this uh number.
So for that what we can do is we can take a bunch of images and a bunch of captions and then try to see the
similarity across all of them so that we can have a relative understanding of uh similarity. So in this case we are taking three images. Image of a cat,
image of a car and image of a puppy. And there are three respective um captions
for these three images. And what we are going to do is we are going to uh loop over uh each image and pair it with all
these three uh captions. So in totality we will have nine examples but out of
nine only three are positive and rest six are negative. Right? So let's see how their similarity uh scores uh would
look like. So in this case I'm just looping over uh all of them and
uh we are just uh trying to uh store the embeddings of images as well as uh the
uh text. So let me just run this. What we are essentially doing here is just looping over all the captions and looping over all the images. The code is
exactly same as what we have seen before. And now we can just use the cosine uh similarity which uh the functionality which is uh there in the
scikitlearn package under metrics pair-wise and something that we have done earlier but we have done it uh kind
of manually using um numpy but here not numpy sorry pytorch as you can see here
we are just doing a dot product between two matrices or two vectors but now we are using scikitlearn. So you can use whatever you
feel like. So if I run this, this similarity matrix should contain all the
information. And here we can visualize that. So you can simply ignore the entire code and just print uh this uh
similarity uh metrics v uh variable and you will see the uh similarity score.
But this is just to show the output in a much more visually appealing way. And if you see this, these three images have a
very high similarity score with respect to the three captions which they belong to. And all these offdagonal numbers
shows the similarity score between let's say this car and this text a pixel image of a cute cat which is certainly not the
case. And if you see this the similarity score is very low. So this shows that our embedding model is working pretty
good with images as well as text. So this is just an example but you can always try with different multimodal
embedding model and see that which one works best for you. Okay. So now that uh
we learned about uh uh clip architecture and we used uh open clip and we explored
that uh how uh we can make use of these models to get the embeddings. We might have noticed that there is an extra step
before we pass on uh the input whether it's text or image to the model. So we have to pre-process that. Now there are
uh different models which are available like uh there is a sentence bird which is which is an extension of uh the very
famous bird architecture and uh there uh if you use the clip model using sentence
transformer you don't have to do that pre-processing or pre-processing of the text or the image. So in this case if
you see uh I'm just importing uh sentence transformer from sentence transformer here and I am using the clip
vision model and in this case I am not doing any pre-processing like uh I've done uh
earlier here I can simply send the images or the text directly to the model and we can encode this and once we get
the encodings we can perform uh the cosine similarity between all these vectors. So here I'm not printing it uh
in a fancy manner. I just wanted to show you you know how simply you can look into uh the similarities between the
vectors that the model generates for the image and the text. And if you notice here the diagonal uh numbers are pretty
high whereas the offdagonal numbers are very very low. So it's the same model but uh here we are using sentence
transformer. So it is doing the pre-processing on our behalf uh under the hood. So this might be a better
approach uh or to use uh any clip-based model if you just want to experiment with these architectures.
So now that we learned about multimodal embedding model, let's look into multimodal model which can generate
Chapter 7: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models (BLIP-2)
text. So far we have learned about a multimodal embedding model which can take image or text and it can generate
embedding. But now let's look into some of the models which can generate text not just embeddings.
So if you realized we have lot of sophisticated models which are very good
for vision which are vision based transformers and there are very good models uh which are only for text which
are different LLMs which are based on transformers. Now there is a new paper which got published by Salesforce called
Blip 2 which stands for bootstrapping language image pre-training for unified
vision language understanding and this leverages the existing models or existing pre-trained models that we
already have for images or called vision transformers and text which are
different LLMs. So the idea of blip is very straightforward. They wanted to use
the vision transformer and the language uh LLMs or the language model the large language model uh models as a frozen
model that means they want to leverage their learning their understanding uh which are already been pre-trained. Now
the only component that they have added in this new architecture is this middle one which is called quering transformer.
So the core innovation in blip 2 is this Q former or the quering transformer which is a bridge that connects a
pre-trained image encoder example a vision transformer with a pre-trained large language model.
So the Q former is the only trainable component in the blip 2 pipeline and that is what makes it very very
efficient because these vision transformer or this language model are already been trained
with a plethora of data right so there's a large corpus of data which has been used uh to train this model so by using
this bridge technique blip 2 does not need to train the image encoder or uh
the language model from scratch because it is able to leverage both the vision transformer and the language model. So
let's look into this particular building block called quering transformer and see how this actually uh being trained.
So the Q former contains two blocks. So we are talking about this particular block. We already know that it has a
pre-trained vision transformer and a pre-trained LLM. Now let's dive deep into this Q former block. So this
contains an image transformer module and a text transformer module. So the image
transformer module interacts with the vision transformer that means on the left hand side and the text transformer
uh module this module connects with the LLM that means that text transformer within this quering transformer connects
with the large language model or on on the right hand side which is a pre-trained uh LLM. So let's see how this works.
So imagine that you have an image uh as we have already learned before we pass on this image to any vision based uh
transformer or the vision transformer we patch this image we do the uh tokenization and send it to the vision
transformer and then the output of this vision transformer will be fed into fed into this vision transformer block
within this Q former. So within this Q former as we have learned that it contains two modules. One is image
transformer module which is this one and the other module is the text transformer
model which is this one and we have not completed this uh image. So the output
of this query transformer will go to the frozen ln. So that's why they said that this text transformer uh block within
this query transformer is connected to the LLM. Okay, which we will see uh next. So the way that uh this model is
trained is by having three different objective function or three different tasks.
So the input for this model or the data set that we need is similar to a clip
where we should have images along with its caption and uh there could be some positive samples uh there could be some
negative samples but we need data set in a similar format as in clip. uh if I go
back here let's say we have 10 images along with its 10 labels we have to have some other data set where we have the
image along with labels which doesn't belong to those images so similar to clip we should have some positive samples as well as negative samples and
the way that we send this training data during the training process is like this we send this uh image to the vision
transformer and the caption to the text transformer directly.
And these are the three different objective function which we try to adhere to and minimize the loss. And the
three different uh uh tasks uh that we have here are image uh text matching,
image text contrastive learning, image grounded text generation. So as the name suggest the first objective function
called image text matching is a classification task to predict whether an image and a text pair is positive or
negative. That means if you pass a if your data sample or the first data point is a image of a cat and let's say the
caption of that is a pixel image of a cute a cute cat. In that case we know that this image and this caption are
very much positive. So we expect this objective function uh to be positive.
Similarly for a sample where image and labels are not matching we expect this uh objective function to be negative.
Similarly uh the image text contra uh contrastive learning the task of this objective function is to align the pair
of image and text embedding such that they maximize their mutual information.
This is very much similar to uh uh the clip contrastive learning. Similarly the last objective function is to train the
model to generate text based on the information extracted from this image.
So it's basically generating the text based on the image and we already have a positive uh sample here. We know the
description should be like this. So we can always have a loss function which can which can be minimized using what
the model generates. So intuitively we want to make sure that all these
three objective functions are achieved and we if we can minimize the loss by adhering to all these three different
objective function we can assume that the model has now have the capability to
extract a very meaningful information from a given image and that output report will be sent
through a uh a learnable uh projection or uh learned weight to the large
language model. So finally the learned embedding which is the output of this uh query transformer. So whatever uh comes
as the output which will be again an embedding that learned embedding from Q former are passed to the LM. So these
learned embeddings are passed through the LLM not directly but via projection layer. So that means there is another
layer of transformation that we do and then we pass it on to the large language model. So you can think of this input as
a soft visual prompt not an uh prompt that we generally give in the form of text but it's a visual prompt because
this we are getting from this input image and the magic is happening in the
middle wherein we we have forced the objective function in such a way that we expect this model to become very very good at learning visual information.
Okay. So to summarize,
Blip 2 makes intelligent use of existing technology. Uh here the existing technologies are nothing but the vision
uh transformer which is a pre-trained vision transformer and the pre-trained large language model. So it uses the
existing technology by learning only the Q former only this this middle block and
that works as a bridge between the pre-trained vision transformer and a large language model to accomplish a
very powerful vision language understanding and generation.
So that's a core about uh blips. So let's see how we can leverage this using Python. So the first thing that we are
trying to do here is if uh the system is having GPUs or not or MPS since I'm using uh a MacBook so I will not have
CUDA but I'll have MPS. So I just want to check this and in this case I would like to leverage MPS because I'm going
to load some of the blip based model from transformer uh hugging phase library. So it will load uh the blip to
a model uh from Salesforce which we have. So since it's a heavy model uh it would be good to load it on GPU.
So here we are loading uh the auto preprocessor and blip 2 for uh conditional generation. So these are the
uh two classes that we have to uh call and we will pass this as the model ID.
So the model ID is Salesforce blip 2 opt 2.7 billion that means 2.7 uh 7 billion
uh parameters that we have in this model.
So now we will move this model uh to the GPU and this method two will do that job
for us. We already have uh mentioned what is the device. So we are with this here uh we are creating this model
object and we are moving this model uh to MPS. So if you're using GPU it will move the model to the GPU. So this might
take uh some time. So let's give a couple of seconds. Okay. So it seems that the model has been loaded. So now we we should be able to use this model.
So since this model contains uh a visual transformer as well as a language model,
we can very well see this by just reading this parameter called vision model. So model dovision model will tell us what is the vision model that has
been used. Uh similarly we can use model.language language model and it will tell us the language model part of
this blip 2 right and it will also tell tell you all the different layers what are the how the layers uh looks like and
so on and so forth. So if you see this there are K projection V projection. So if you if you have read through the transformer architecture you know what
this uh K projection or value projection or query projection means right. So now that we have loaded our model let's see
how it is able to generate some text for a particular image. In this case we are taking an image of a car. So this is an
image of a card and if you look at the size of this image it is 492 cross 512.
So that is uh the size of this image. So now the first thing that we have to do is we need to pre-process this so that
we can make use uh the blip model. So if you look at the pre-processed output, we will see that this image which was 492 +
512 got converted into an image of 224 cross 224 and it has three channels and
one is the batch size. So now if you want to see how this transformed image looks like before we actually pass this
image to the model we can use numpy and uh pill to print this image or see this
image. So let me run this. And now if you see this the image is pretty small.
And what we are essentially doing here is similar to what we have done before we are changing the dimensions of the
image which here it's a a pytorch object but we are using the image module to
print that image and that takes an numpy array. So what we are essentially doing here is we are changing the dimension.
we are keeping the channel as at the end and width and height as it is right so
that's the only trick that we are performing here and then we are just uh
using minmax scaler so that the features are within this number 0 to 255 these
are nothing but u uh the pixel values uh if you think about it in that way otherwise if you look at these uh pixel
values they range uh differently. So if you want to see this, I can quickly copy this and show it to you. So let's run
this. It's in float 16 format. But if you look at these image input, you will
see that uh it is actually integer and we can actually see that.
So if you see this, these are all uh integers and these integers is between 0 and 255. uh and that's the reason uh
that we were able to print uh this image otherwise it would not work. So that is what we are doing here uh in the minmax
uh scaling. So it's basically uh a feature transformation uh nothing uh beyond that.
So now that we pre-processed an image let's see how we can pre-process a text.
So in this case let's take an example.
So here we have this text as thanks for joining this course. So just like in
image we are prep-processing the text as well and we expect this uh to be a pytorch tensor as a return value and we
are moving this tensor to our device which in this case is MPS but it could be GPU or CPU in your case and we are
also specifying the D type which is of 16. So once we come here we will get the
token ids. So let me just uh comment this and run this and if I just print the token
ids you will see the ids of the token or the
text basically. So you can ignore the initial tokens which which is all same because that is kept for images because
this is a multimodal uh embedding model since we are just passing only the text
we are interested to know the token ids of this text. So now if we just uh
uncomment this and if you want to see what are those uh tokens what are these
ids actually represent we can simply use convert ids to tokens which we have seen earlier as well and we can see the last
few tokens which these are all for image. The last one is the actual text thanks for joining this course. But if
you notice carefully the tokens contains a special character called G dot which
is very weird. Uh and it seems that uh the space got converted into this
particular character. So what has happened is uh actually it is supposed to be a space. uh however and internal
function takes this character uh in certain code point and moved them by 256 just to make it printable. So what we
can do is we can simply replace this character with underscore just to uh recognize that these are uh actually
spaces that's all. So now this looks pretty much like the text that we had.
So let's uh explore few of the use case uh like for example let's start with image captioning. So imagine that you
have an image and you want this multimodal model to generate a caption uh for us. So as before let's
pre-process this image and this is the output of of the
pre-processed uh image. And then if you want to see uh the size of the pixel, we have seen this before. It pre-processed uh any input image into a size of uh 3 +
2 224 cross 224 and three is because it has three channels and the device is
already we know it's MPS uh uh in this case but for you it could be GPU or CPU
as well. So now we can call uh this model by calling this model.generate and
we can pass this uh input and we can say that generate maximum uh 20 tokens and let's see what it generates.
So as you can see it has generated a text saying an orange supercar driving
on the road at a sunset. So which very much uh an accurate description for this
particular image. Right? So if you notice here we have passed on an image and we have mentioned what is the
maximum number of uh tokens that we expect. it actually can generate a text
with that number of maximum tokens. We can in fact try by increasing the token size. So let's say we expect the maximum
token to be let's say 100. Okay. And let's run this and see what description it gives. So in this case it is not generating anything more which is okay.
But later on we will see that how we can pass not only just image but also text
and uh we can enforce the model to generate a bigger text.
Okay. So let's try with uh another image. So let's say this is an image and
if you see this is a black and white image looks like a bat where somebody has drawn this with ink right? So it's
not a very straightforward image to interpret. So let's see if uh this uh blip based multimodal model can
interpret this. So let's take this uh input and pass this image just like
before. And now let's try to generate the caption. Exactly same piece of code
which we have used earlier. And as we can see it has predicted as a black and
white ink drawing of a bat which is very very apt right. So this is the power of
a blip based uh model which can interpret text as well as image and this
is one of its use case that uh given a lot of images you want to put a caption
to all of those images. Right? So this is just one example. Let's look into more interesting example like uh
question and answer where we we will send some image along with that we will ask some question where we expect the
answer is embedded into the image itself or the answer can be found within that image. So let's pick another uh image in
this case and we can look into this image. It is the same image of a car.
And now let's say we want to have a question as this. Write down what you
see in this picture. And we are just starting the response. It's basically giving a hint that okay, your response
should start from here. And the answer we expect is uh from the uh multimodal model. And we are prep-processing this
image just like before. But now our max token is 30 right? So it is not 20 which we have tested before but now it is 30.
So now let's see what the response the model generates. And if you see the response that it generates is from the answer because that is where we ended.
It says a sports car driving on the road at sunset which is very much correct.
And now let's say you want to ask follow-up question, right? So that means you have to add this response in the
prompt itself which we are doing it manually here. Uh like where we we kept this much as it is just like in the
previous prompt but we just copied the response uh what we got from here. So whatever the response that we got from
here we are just adding it. So if you see this portion this is exactly the same answer that we got from uh from the
previous prompt and then we are appending our next question. So this is not ideally you would do in in
production based application. You will use some agentic system or uh you will have some a memory based context uh
which you can get in a lot of SDKs. We will see that uh in bedrock as well. But you can use this uh use any frameworks
like uh lang chain uh or llama index which can enable you to build a chat like prompting with some u memory right
you don't have to create prompt manually like this but this is just to give you an example that how you can keep on
asking question on an image. So in this case uh the follow-up question is what would be the cost of this car and again
we are prep-processing this image and asking or sending this uh image to the model and requesting it to generate the
text and if I run this you will see that uh the answer it is giving is almost
million right so this might have given you an intuition of how a multimodal
model is trained and how you can leverage it in your day in dayout work.
And one of the important thing that uh I missed to explain is that in this case when we process the data the data
contains image as well as the text. So previously we sent only image but in this case we want the model to get the
image along with my text. So that's why we have uh this input containing images and text right and in the next section
we will dive deep into one of those very powerful multimodal model from Amazon called Amazon Nova which we recently
announced during reinvent 2024 and we will dive deep into different multimodal
models from Nova then we will dive deep into multimodal rack which is an
exciting topic topic at least I really enjoyed working on that project and I hope that you will also get some
insights uh about this with that uh I'll see you in the next section on Amazon Nova and multimodal rack.
Chapter 8: Amazon Nova Multimodal Model
So in the previous section we talked about multimodal uh LLMs and we also discussed different techniques of
training a multimodal uh model and in this section we are going to dive deep into Amazon Nova which is the newest
generation of multimodal models from AWS.
So, Amazon Nova is a family of models which has the multimodal understanding and uh creative content uh uh generation
capability with state-of-the-art uh quality and unparallel customization and uh on top of it, it provides you the
best-in-class price performance with all of these models. So, let's uh look into what are the different models that we have and what are their uh capabilities.
So before we dive in, let me show you the notebook that we are uh we are going to work uh for this section. So
this particular notebook called Amazon Nova, you can find this under this folder called U multimodal LLM. Uh I
think we used the first notebook in the previous section. So this is the Amazon Nova notebook which you can find under this section.
All right. So with Amazon Nova we have three different models and one of the model called premier we are we have just
announced and this model will be available maybe uh in mid of 2025. So let's start with the first model called
Amazon Nova micro. So this is a texton model meaning you can send a text and
you can get a text uh as an output. So it is not a multimodal model but it's a very cost effective texton
lightning fast uh model. So if you if you have a use case where you just have to work with text data or textual uh
prompt uh which can be of only text as a modality you may like to prefer Amazon uh Nova micro and then we have uh Amazon
light which is uh one of the fastest most affordable multimodal uh foundational model that we have and it
can take image video and text as an input and it can generate text as an output.
Similarly, we have uh the Amazon Nova Pro, which is the fastest and most cost effective uh state-of-the-art multimodal
model that we have. And as the name suggests, it's a multimodal model. That means that it can take the input as
text, video or image and it can generate text as an output.
So these are the three models that we have which comes under understanding models and we also uh have Amazon Nova
uh premier as I said it is not yet available but it would be available in 2025 and this would be an any to any model
that means it can take input as image text and video and it can also generate image text and video so it's a any to
any uh multimodal model which is pretty exciting. So if you are interested in this uh you may uh keep an eye on this in 2025.
And then we have some creative content generation model and this is very very interesting and these are the models
which can generate images and generate videos. We are not going to dive deep into uh these models but if you are
interested I will share some resources which you can go over and learn it from
there. And uh these models are very very effective. So this has some limitation like in terms of the duration of the
video that it can generate and uh the type of images that it can uh generate.
But if you are uh into creative uh industry, you may like to dive deep into
Nova Canvas, which is a state-of-the-art image generation model and Nova Real,
which is a state-of-the-art video generation model. Okay. So I'm going to share you one link. Uh let me quickly
show it to you. So I think this is the one. Uh if you are interested to know about uh all these
different uh families of foundational models, you may look up into this page which covers uh all these models in bit
more uh details. With that, let me go back to the notebook and focus on different types of multimodal models
that we have specifically the Nova Light and Nova Pro because Nova Micro is text only model. So that is pretty
straightforward. Uh but uh we are going to focus more on light and pro.
So first thing as as we all know we have to uh get the access through UI and or we have seen how to get the access uh
but just to recap if you have uh forgotten how to get the access we can simply go to bedrock
and then we can just scroll down and come to model axis and here we can
select by the model provider uh in this case it's Amazon and we can select the model of our choice. So I already have
uh the access but in case you don't have any access you may like to uh uh click on modify model access select the model
that you would like to get the access and uh submit the request. Okay. So
assume that assuming that you have the access uh now let's let's go ahead and use these models and see uh how we can
actually uh send the APIs uh to these models. Again these are few text which I have just put in this notebook for your
reference. Uh because since we have multiple options the natural question that might come up is when to use uh
which model. So this is just a kind of a decision tree which you can think of in the back of your head and decide which
model to consider. So micro is very straightforward. It's a text only model.
So whenever your requirement is only text, you can go with that. And light and pro is something that you may like to decide based on your use case and the
complexity of your use case. If it requires uh a lot of advanced reasoning and creativity and not only that even
code generation then you may like to use uh Amazon Nova Pro otherwise you may get started with light and see how it is performing with your use case.
So as we know to use any model under bedrock what we have to simply do is we
need to create bedrock uh runtime uh client and specify the model of our choice. So in this case I'm creating
three different variables uh because I will be using uh different models in different model invocation. So I will just refer to different models to their
variable names. So before we send an API uh call and use this model using invoke
model, let's look into the API structure or the request structure and how that
request body would look like. So since this is an multimodal model, the prompt can contain text, image or video.
So that's why you are seeing that we have a key called content and it can be
of type text as you can see here or it could be image or it could be video. Now
text is pretty straightforward. You just pass on the text. So this is going to be your prompt and if it is an image then it supports different types of images.
Again you can refer to the documentation but I just put it together in this notebook so that you don't have to hop around. But uh for the latest features
or latest uh support of different images and videos I would always recommend to refer to the documentation because we keep on updating it uh as we go along.
So in this case uh whatever is the image you can mention that in the format and you have to send the image in a base uh
64 encoded format. In case of video similar to image you have to mention the format. There are different formats
supported like MPG then LV, MP4, MOV. So you can mention that and for video there
are two ways that you can provide because video size are typically pretty big. So at times if the video is very
small you may like to send the video in the form of B 64 encoded string just like the image. But if the video is very
big then it is recommended to upload that video in an S3 location and provide the bucket name. Uh Amazon S3 is an
object- based uh storage service if you have never used it. It's just an object based storage on AWS. So you can upload
the image on S3 bucket and provide the location of the S3 bucket and we are going to see that in the code in a
moment. So that's about the content part like how you will uh parse your uh prompt whether it's text, image or
video. And uh in the later section you can always provide different inference uh parameters like what is the maximum
number of tokens uh that you would like to generate what is the value of temperature what is the value of top p or top k so these are the tunables that
can change the uh response from the model so let's uh look into few of these
parameters in details the maximum new token or max new tokens
dictates the maximum number of tokens that you want the model to generate. So the maximum limit as of today is 5,000.
That means the model can generate up to 5,000 tokens. And if you set the value as let's say 100, then uh the model will
generate maximum 100 uh tokens. So depending on your use case, you may like to change this uh number. And then we
have temperature which dictates the amount of randomness in the response. If the temperature is very high then the
randomness would be more. If the temperature is low the randomness uh would be less. And then we have top P
and uh top K. So top P is also called nucleus sampling. So let me explain this
with an example. So as we know in LLMs what it does at its core is it just
generates one token at a time. So it picks one token from the entire vocabulary. If you think about only
text. So what topy does is it takes the cumulative probability depending on the
value that we give. Imagine that our entire vocabulary uh that the model has is just six right? So there are six
tokens and every time the model generates an output it would pick one of those six tokens and let's say my uh top
p value is set to 7. Okay. So that's the top p value that I have set. So in that
case what would happen is assume that while generating the next token these are the probability of those uh six uh tokens. So my vocap size is six. Okay.
So this is an example that we are just framing. So in that case every time it tries to generate a token it will have a
probability distribution across all the six tokens and for a particular instance let's say the probability distribution is like this and it will be always in
the decreasing order. So the first token is.5 probable the second token is2 and
so on and so forth. Now when the top P is 7 what that means is it will just keep on adding the probability from the
maximum one and keep on going and it will stop at the top P value. So in our case the first two tokens the cumulative
probability density is 7. So what top P.7 would do is it will just take the
first two tokens. So it will take the first two tokens and these are the two tokens. Whatever are these two tokens,
it will just pick one of these two tokens. So it will completely ignore the rest of the four tokens.
So that's about top P. So let's look into other parameters that you may like to change. So the next parameter that we
can change is top K which is again an optional parameter and it samples only from top K tokens. So if we say top K is
10 then it will just pick the top 10 tokens and it will give one token out of those top 10 tokens. So you can very
much put any number in this case. So if you have a very large number that means
you are letting the model uh select from a large number of tokens. But if you make top k as very small then you are
making the search space or basically the sampling space very very small uh not the search space but the sampling space
very small. So you can always use top p and top k uh together but you should understand what you are doing. But uh we
don't recommend to use top P and temperature together. Uh you can use one of them. And then we have another
parameter called stop sequence which contains the array of strings. And what you are essentially telling the model by
setting stop sequence is if you find any of this string which you mention in this array then just stop. So it's basically
a signal which you are trying to give to the model to stop generating the response. So these are some advanced
parameters uh which are very much dependent on your use case and different people uses uh different types of settings before they start working with these models.
So with that let's use these models and see how they respond. So here we are
creating few variables for system prompt then our actual prompt and the inference parameter or the tunables that we have
just seen and we will start off with a synchronous API call that means we will get the response of the model uh right
away but there are different techniques that you can call this model uh apart from synchronous API which we have not
seen so far but we will look into a streaming API as well where you will be able to see every token that the model
generates and we can actually work with that as it generate. So let's start with a synchronous API call. So here we are
putting the system prompt dictating the model that what it should behave as. So
here we are saying that you should respond to all messages in French. So this is kind of the character that we are injecting to the model.
And then we have the message list. So this should contain our actual prompt.
So in this case the role is user because uh we as an end user uh is going to provide the prompt and the text is this
uh we are saying that free code camp is a great platform to learn coding and technology in the field of computer
science. We expect the model to generate the French translated version of this
English text. We are also setting up few of the inference parameters uh like 300 that means it should generate a maximum
300 tokens. We are also using a top P as 90% or 0.9 and top K as 20 and similarly we are also having a temperature of 7.
So as we mentioned before we should not use temperature and top uh together. So I'm going to delete this and we will go with this parameter.
And now what we are going to do is we are going to structure this invocation.
So this is the reason that we have broken our prompt into two pieces. The system list will contain all the system
prompts and the message list will contain all the actual text prompt. So this is the request body that the model
will be expecting from the end user. So it should have a key called messages uh which should have all the messages. Uh
it should have a key called system which should contain all the system prompt and then the inference uh configuration
which are nothing but the tunables that we have set. So if you write your code in this format, it would be easier for
others in the team to read. You can always use frameworks like lang chain or llama index to annotate your prompt or
basically uh structure your prompt in a much better way. But since we are using the native SDK from AWS uh which is
boto3 uh we are structuring it from our side. But the core idea remains the same whether you use AWS SDK or any other
framework like lang chain. So once this is done, we can call the invoke model
API by passing the model ID and in this case we are going to use the Nova light model and we can just send our native
request which is the body for this invoke model API and once we have this we can load the response and see what
the model predicts. So let's execute this. Okay. So I think I have not executed the previous cell. Let me scroll up and run this.
Okay. So now if I come down,
it should work fine. So now what is happening is it took 1 second or so to
generate the response. Since we have used the synchronous API call, it has
generated the response all at once and gave us the output. And later on we will see streaming API where it will stream
token by token. So if you notice the response, it has generated the response
in French. So I don't know French. So I assume that it is correct. But if you notice carefully, it has not converted
or translated this word free code camp into French because it understood that this is a company name or an entity. So
we should not translate this. Right? So that's how you can use a Nova model and in general this is the same structure
that you would use for any model for that matter on bedrop. Maybe this request structure might change a little bit uh depending on a different AI model
provider but overall the structure is pretty standard.
Now let's take an example of an streaming API. The format looks exactly the same but the only difference is now
we are going to use the invoke model with response stream. So that's the only difference. Uh previously we used invoke
model and now we are going to use invoke model with response stream and we can have the same system prompt the same
message and we can always have the inference parameter. So here also uh let me just delete temperature and run this
cell. So in this case we are setting the system prompt as act as an creative
writer assistant. So that means we are expecting the model to generate something as if she's a creative writer
and we are going to provide a topic. So in this case we are giving this text as the topic. So a camping trip and let's
see how the model generates uh the response. And notice here we are setting the maximum number of tokens as 200. So
since in this case we are using model with response stream we have to read the
streamed uh chunk or streamed data and process that and that's why we have this for loop uh which will iterate over and
read uh the uh the response from the model and we are also setting a counter called chunk count as zero and we will
increment that to to validate that the model generates it's uh maximum 200 tokens. So that is just for our own
internal verification. So let me run this cell and if you see this the response that it was generating is one
token at a time. In fact if I just increase the number of tokens. So let me change it to let's say 1,000
and run this. You see this it is generating uh keep on generating tokens and it is getting streamed. So the maximum number of tokens here in this
case is 56 which is okay as long as uh it is not exceeding 1,000 it should be fine right so this is how you can use a
streaming API as well as uh the standard uh API for your use case. So now that uh
we looked into the text understanding of Nova model, let's dive deep into image understanding and learn how Nova model interprets any image.
So with Amazon Nova, you can provide multiple images in the payload. So what that means is you can have multiple
images in your prompt provided that the total size of the payload is not more
than 25 MB which is a limit or uh the maximum size that we have as of today.
So you can always pass your image along with your question and the question could be classify an image or even
asking the model to summarize what it sees uh in that image.
So when the Nova model gets your image,
it tries to capture the best possible information or tries to extract the best possible information from your image and
in a process of doing that it automatically uh rescales your input image by upsampling or downsampling
depending on the aspect ratio of the image. For each image, Amazon Nova will first identify the closest aspect ratio
and it could be 1 is to1, 1 is to2 and so on and so forth as you can see here.
So let's uh take an example for better understanding. So let's say your image
is of size 800 cross 400, right? So that is the input image that you have and
based on this size uh the aspect ratio if you can see from here 800 + 400 is 1
is to2 right. So that is the closest aspect ratio of the image that we have given. So that aspect ratio will be kept
in mind and then Nova will pick the right resolution. So if you see the resolutions uh that we have the right
resolution would be 900 cross 450 because that is the closest resolution with respect to the image that we have
provided of size 800 by 400 keeping the same aspect ratio and the aspect ratio
of our input image and this uh this uh uh uh resized image of 900 + 450 is
same. Right? So what Nova tries to do is uh during the pre-processing of the image it tries to make sure that uh
information should not be tampered beyond a point and this allows Nova to
understand image in a much better way and in this table you can also see what are the estimated number of token counts
with respect to different resolution. So if the size of the image is 900 + 450
the number of tokens that it will have is roughly around 800 and as you increase the resolution for obvious
reasons the estimated token counts uh will increase. All right so let's uh pick an example. So we are going to send
this image as you can see to Nova and we will try to request Nova to generate a
caption. And what we will do is we will request Nova or the model uh that provide three potential titles uh for
this image. Okay. So let's try to uh run this code. And this is exactly the same code as before. But here since we are
not passing only the text, we are passing the image as well. That's why we
have to have a wrapper function which can convert our image into B 64 string.
So that is what we are doing in this few lines of code where we are opening the image and then we are just using B 64 to
encode that data. Okay. So once we have this we are sending this into this image
dictionary and we are also providing a prompt saying that provide the title for this art or for this image and again we have few inference parameters.
Uh again let me just delete a temperature here and we can just use invoke model. So let me execute this and
see what it generates. So if you see this it has generated these three responses which is pretty much accurate
with respect to the image that we have provided. Right? So that's how you can use Nova model for processing any image.
And you might wonder that u how I know the structure of this uh response. Uh I honestly did not know. So what I have
done is I have initially printed the full response and when you do that you actually know the dictionary structure.
You can always refer to the documentation but the way that I feel we can learn quickly is just to see the
response by ourself and pick the right path to get the exact response that we are looking for.
Okay, so that's about one image. But let's say you want to parse more than one image. We learned that Nova supports
multiple images. Provided the maximum size of the payload is within the limit,
which is 25 MB, it should be fine. So in this case, we are going to send two images. One is the image of this cat and another one is the image of this stock.
So let's see how Nova model behaves when we add two images. So in this case, we are processing two images separately.
You may like to have a wrapper function which you can call to do the same thing.
So I think that is more advisable and recommended. We should not have duplicate codes like that. But since this is a demo it's fine. So with this
we are appending the content of two images in this message list and that's why you see two entries to this content
and both are of type uh image and then we have the prompt saying that what is common in these two images. So this is
little tricky right? So we are not asking or to uh to put the caption for these two images but we are trying to
ask something complex we are trying to ask common thing in these two images. So this needs uh some logical thinking or
rather more reasoning right uh so let's see how Nova model respond to this. So let me execute this and see what we get.
So it says that the two image despits animals specifically a dog and cat both of which are pet and they are both
looking directly at the camera. So the response is very very natural right. So when I first read this response uh I was
very happy to see that it was able to understand the image in a much better way and it was able to correlate with this uh images.
Lastly, let's go over video understanding and see how Amazon Nova processes any video.
So, just like in images, you can have images of different file uh different formats. Uh for video as well, you can
have different formats like MP4, MOV, uh MPEG and so on and so forth. And the
difference is here you can provide the video in two different ways. One, you can provide the video in the form of
base 64 encoded string provided that the size of the payload is less than 25 megabytes. And this is exactly same as
the limitation that we have for image understanding. But if your video is longer, which would be the case in in
most of the scenario, in that case, we recommend that you upload the video in an Amazon S3 bucket and use that S3 URL
uh to process that. Right? So there are two ways that you can provide your videos. One is using B 64. The other one
is using Amazon S3. And when you use Amazon S3 the size limitation of the video is a little bit extended. So now
you can have the video of size up to 1 GBTE.
Okay. So that's about the format support and the input methods and I would always recommend that you refer to the user
guide to understand the latest uh supported file formats and what is the limitations that we have. In fact, let
me show you the user guide. So, this is the user guide that we have for Amazon Nova. And if you see here, we have a
section called video understanding limitations and video understanding example. So, I have taken the text from this user guide into the notebook, but
it is always good to refer to the documentation because this we try to keep it updated as we go along. Okay. So
let's see how we process the video information. So as you can see here it says the Amazon video understanding
capability supports multi-pect ratio and all videos are resized with distortion
up or down based on the input to a size of 672 + 672 square dimension before we feed that uh input video to the model.
So that means we do some pre-processing with the support of multi-aspect uh ratio and one of the most important
thing while processing a video is this we process one frame per second as a sampling rate. So that is the sampling
rate that we have and for any video which is less than 16 minutes this is
the sampling ratio that we use. So what that means is let's say you have a
16-minute video and we sample one frame every second. So the total number of frames that we will have would be 960.
So that is very much consistent across all the uh videos no matter what's the
length of the video. So if you have a longer video more than 16 minutes then
just to make this number consistent the frequency of frames per second sampling would be different. What I mean by that
is this. So if you look at this uh this table it will make things very clear. So let's say you have a video of duration
10 seconds. So in that case since we said you can have one frame per second.
So we will have 10 as frames to sample ratio. Similarly, if the video is of 30
seconds, then we will have 30 frames. At max, we can have 960 frames to sample.
So that is what we will do. If your video length is of 16 minutes, but now if your video length is of 20 minutes,
now we cannot have one uh frame per second ratio. So we cannot maintain that since that is the max that we can have.
So that's why the sampling ratio goes down. So now the sample ratio is 75.
Right? Because we will not take one sample every after 1 second. We might take one sample every after 1.25 seconds
or something like that. So we can do the maths. But the idea is this that the frames to sample is capped to 960. So depending on the duration of your video,
we just calibrate. Okay. And just like how we have seen the expected number of
tokens uh depending on the image uh size or the dimension here also uh we are
sharing few of the estimated token counts based on your video length. So
the more or the bigger or the larger the video is, the larger is the estimated token count. Okay. So that's some
internal about video understanding. I don't think you would need to go through all these details when you actually deploy any application or build any
application using Nova. But it's always good to read all these details. And one important thing here is if you read this
line, it says that there is no difference when analyzing a 4K version of video and a full HD version.
Similarly, because the sampling rate is at most one frame per second, a 60fps
video should perform as well as a 30 frames per second video. Right? So this is very very important since our
sampling ratio doesn't change. it's still one frame per second. That's the max that we can have. So it doesn't
matter that you have a 4K video or full HD video, right? So that's very important in terms of understanding how the model analyzes our input video.
Okay? So let's go back to our notebook and just process a few videos and see uh
how it works. So we have a sample uh video here uh which is if I can just play it doesn't have any audio it's just
a sample video of 12 seconds that means when I send this video when Nova will process it will have a sample ratio of
one per second. So total number of frames that it will have is 12.
So in this case we are going to use base 64 based encoding and that's why we are
just encoding the video uh file and then the same input process or the same request structure. We have a system
prompt we have the message block and the inference uh parameter or the configurations for inference.
So here we are providing a text saying that provide a video title for this clip
and the remaining code is exactly same as we have used while invoking this model for images and in this case we are
using the light model but you can always try with Nova Pro. Let me execute this and see what we get.
And if you see here it has provided these three responses which is very much apt with respect to the video that we
have. Okay. So this is about processing video using base 64 encoding. Let's see
how we can process the same video when we upload it on S3 bucket. So in this case I have uploaded the same video on
this S3 bucket and we are keeping the prompt as is. There's no change except
the fact that here we are just using source as S3. If I scroll up you will
see the source was base 64. So that's the only difference except that everything is exactly the same. So let
me execute this code and see what we get.
Okay. So as you can see it has generated three response which is very much apt for this video. So that's all for this
section. In the next section we are going to use Amazon Nova and explore how we can leverage Amazon Nova along with
lang chain and build an end toend multimodal rack system.
Chapter 9: Multimodal RAG
In this section of the course, we are going to dive deep into multimodal rack with Amazon Bedrock, Amazon Nova and Langchain.
But before we get started with multimodal rag, let's understand what is rag.
And to know that we need to first discuss about some of the limitations of large language model so that we can
better appreciate the importance and value of rag.
So let's say you have some questions about your own organization and assume that you are the product manager or a
CEO of an e-commerce platform and you would like to know which are the products got the best reviews on your
platform in last 15 days. So this is a very specific question which can be answered only if the model have the
access to your proprietary data or let's say you would like to know something about an recent event for example who won the Nobel Prize in physics in 2024.
So if you ask these kind of questions where the answer depends on either your own proprietary data or on an recent
event the LLM or the foundational model won't be able to give you the right answer and the reasons are knowledge cutff and hallucination.
So these are the limitations that we have with large language model wherein when we ask a specific question about
our own business where the answer relies on our own proprietary data the model
might generate some response but it will be an hallucinated response because the model has never seen our proprietary
data. It was never available to the model during its training period.
Similarly, when we ask a specific question about an recent event, the model won't be able to generate uh the
response because the model is trained on the data set that was available to it till a certain point in time and when we
ask a specific question that has occurred very recently, the model won't be able to generate the response because
of knowledge cutff. So in lot of the businesses we may not be able to use
large language model as is and to overcome that we need to customize our foundational models. Now there are
different techniques to customize any foundational models and one of them is called fine-tuning
wherein you take your labeled data. So this these are your proprietary data and
then you fine-tune a pre-trained model and once the fine-tuning is done you can
use that model for your production or for your application.
Similarly, we have another technique called continuous pre-training which is very much similar to fine-tuning but
with a small difference that in this case you need unlabeled data. But in both the cases you need some degree of
expertise within your organization and most importantly you need to have a data set in a proper structure or a proper
format. In case of fine-tuning you need labeled set of data. In case of continuous pre-training you need
unlabeled data sets. So this is also a challenge in a lot of organization to even come up with these properly
structured data and that's why we have a third technique which is actually the topic of this uh
section of this course called information retrieval wherein we don't touch uh the pre-trained model. So we
just used the pre-trint model as is. But what we essentially do is we store our
proprietary data in a database. Uh we call it as a vector database because we convert these data into embeddings and
store those embeddings uh in a vector database. And then when we ask a question, we don't ask the question
directly to the pre-trained model, but we first throw that question to the vector database and we do a semantic
search and try to find out relevant chunks which has a high likelihood to
get the answer of our question. And then once we have that relevant chunk with respect to our prompt or with respect to
our question, we send that question along with the context to the large language model. So now when you send
this question to the large language model along with the context, the model should be able to give us the right response because you are helping the model by providing that context.
Right? So let's dive deep little bit more on this information retrieval part and see how it works and once we
understand this we will go back to our multimodal rag pipeline. So let's say we
have our raw data and that raw data could be of any format audio image text and so on and so forth. So the first
thing that we need to do is called embeddings. So we need to convert all these data using any embedding model and we have seen that in the previous
section of the course how you can create embeddings of your data and once you have those embeddings which are nothing
but an array of numbers we need to store this embeddings in some database. So in this case we will be storing it in one
of the vector database. So there are a lot of options that we have in uh uh to to store the vectors. For example, we
you can use open search, you can use Aurora. These are the vector databases that you have on AWS, but you can very
well use uh any open-source or any other vector databases like Pine Cone and so
on. Okay. So once you store your data into a vector database, your data injection part is over. So at this point
in time all your data all your proprietary data is now stored in this vector database.
So at this point in time in your application when you have a question
you will not ask this question directly to the LLM but instead we will ask this
question to the vector database. So when I say ask the question, it actually means we are throwing the question to
get relevant chunks from the vector database. Imagine the way that you should think about it is uh like this.
So let's say I'm a librarian and you have come to me asking about let's say
what is OSI layer. So I know that this question is about networking and as a
librarian what I can do is I can go back and I can give two or three books to you and I can tell that okay go read these
three books you should be able to get the answer. So I have not given the exact answer but I have given some
resource which can help him to get the answer. This is very much analogous to this. So when you send a question or
when you send a query to a vector database, the vector database will do a semantic search and it will give all the
closest match where the system feels that you should be get the answer from these relevant chunks. And now you take
this query and the context and send it to the LLM.
And now the LLM should be able to give you the right response. If you think about it, there are a lot of things that
we are doing here. So we are first throwing this question to the vector database to find the relevant chunk and once we have that we concatenate the
query along with the context and then we send it to the LLM. So there must be someone who should coordinate across all
these activities and this is where we have lot of framework like lang chain right. So you don't have to worry about all these internal workflows.
So this technique is called rag or retrieval augmented generation where you don't ask the question directly to the
LLM but you first perform a semantic search with your query and the database
and then get the right context and then you use that context along with the query to get the right response from the
LLM. So that's about rag. And now that we got a basic intuition and understanding of rag, it's a good time
to dive deep into multimodal rag with Amazon Bedrock, Amazon Nova and Langchain.
But uh before we start, I guess I I I forgot to share a couple of resources in the previous section. Uh so I just
thought to spend couple of minutes uh sharing those before we get started. So one of the book that I would strongly recommend uh you to read is called build
a large language model from scratch by Sebastian. This is a wonderful book if you want to know how to train or how to
pre-train a large language model and how to fine-tune uh a model. So this is a very very good book. Uh it's an
easygoing book. So it's not very complex. In fact we have covered chapter number two when we discussed about embeddings. So I would strongly recommend you to go over uh this book.
The other resource that I would request you to look into is uh this book called hands-on large language models by Jay
Elmar. So he's also a very popular author and an expert in machine learning and I used this book to build the
content of multimodality. uh in fact we have covered chapter number nine in this book uh in this course in the previous
uh section. So these are a couple of the resources uh that would help you to get a better understanding of how LLM work
internally right. So I just thought to share it uh with you because I I missed to share these in the previous section.
So before I could forget I just thought to share it with you. All right. So let's get back to our topic. So now that
we have talked about rag, let's discuss how we can implement a multimodal rag
system. So imagine that you have a data set where the data
contains images, texts and tables because in the real world most of our data that we encounter doesn't contain
only text. So in this case we will assume that we have a bunch of PDF files and those files contains text, images
and tables and what we are essentially targeting to do is we want to build a system such
that we can ask questions about that PDF file. So imagine that we have a file
which contains images, texts and tables and we want to ask some question where the answer lies in one of the image or
one of the table. Right? So we need to build a system which can help us to get us the answer from that kind of complex
data. So the first thing that we would like to do is we would like to extract
tables, images and text from the data and there are multiple frameworks and multiple uh tools available to do that.
In this demo we are going to use one of the framework called PMU but you can always use uh some other framework like
unstructured and uh you can even build your own filters and extract that information.
So once we extract these images, tables and texts, what we can do is we can use
any multimodal embedding model to generate the embeddings of these images,
tables and text. And we have seen few of the multimodal embedding model from Amazon called Amazon Titan. The Titan
embedding model is one of the multimodal model that you can use. But there are other multimodal model available in the
industry as well from few of the AI startups like uh Coher.
So you can pick any of the multimodal model and convert these images, text and
table into embeddings and once you have that you need to store that embeddings in some vector database as we have seen
some time back and once that is done we are kind of sorted with our data injection. So whatever data that we have, we first extracted the images,
tables and text. Then we used one of the embedding model to generate the embeddings and then we finally store those embeddings in a vector database.
So once this task is over, we can let the user ask some question.
Now when we ask a question the first thing that we need to do is we need to perform a semantic search within this
vector database and the vector database will give us some relevant chunk based on our query and once you get that
relevant chunk you can pass on this chunks along with your query to a multimodal LLM and the reason that we
need to use a multimodal LM here is because of the fact that your relevant chunk could be a chunk coming from an
image or uh the chunk might be coming from text or a table. So since the input
can contain image, text or table, we need to use a multimodal LLM. So this is
one of the option to solve this problem and that's why we call this as option one which we are going to implement in
this notebook. But there are other options available as you can see option number two and option number three. So let me briefly talk about option number two and option number three.
So as far as the data injection is concerned it's exactly same. So we first take the data we use some tool to
extract images tables and text and then in the first option we used an multimodal embedding model to generate
the embedding. But in this case we are not going to do that. What we are going to do is we are going to use a machine
learning model which can convert these images, tables and text into their
respective summary. So there are lot of models available which can take an image and create a summary or rather create a
caption or uh generate a description of the image. Similarly, there are lot of models available which can take a text
and summarize that a text. So we will use one of those model and then we will generate the summary of the image,
summary of the table and summary of the text and once we have those summaries then we will use a textbased embedding
model to generate the embedding. So the difference here is we are using a
textbased embedding because all the data that we have are text because we are
generating the summary in the first place. That means we are leaving the raw data uh behind
right. So once we have the summary and its embedding what we can do is we can store the embedding of those summary in the vector database.
So the difference here with respect to the option number one which we have just talked about is that that in this case
we are not storing the raw data. We are storing the summary of our data and what we would also like to store this uh
metadata so that in case we want we can go back to the raw data at later point in time where the metadata will contain
information about the summary and its raw data. Right? So you can think of it as from an implementation standpoint you
will have a dictionary where the key would be the actual entity and the value would be the summary or the other way
around you need to have that hashmap stored somewhere and once you have that then what you can
do is you can ask a question and then that question you will first send it to the vector database and the vector
database will perform a semantics search with all the summaries that it has and then it will give you the relevant chunk. Now the relevant chunk is also a
text because it's it's all summary that are stored in the vector database. So ultimately what you will have would be
the summary and the exact question or the prompt. In this case you can just go with any LLM. You don't need to have a
multimodal LLM because your input is always text. So this is the difference with respect to the first option where
we need to have an multimodal LLM because the context could be an image,
text or table. But in this option context would be always a textbased summary because the summary could be the
summary of a image, summary of a text or summary of a table but we are not using that raw data here. So that's why we can just settle down with a regular LLM.
Now there is a third option that we have which is very much similar to the second option but the only difference is when
we perform the semantic search we will get the summary but we will not send that summary for the actual answer or
the actual uh response. What we will do is we will take that summary and we will go back to that dictionary or the hash
which we have stored and we will try to find out the actual entity for which we have extracted the summary. For example,
let's say you have a question. You ask that question to the vector database and the vector database has given you few
chunks and those few chunks are the summary of an image and summary of some
text. Now what you will do is you will not send those summaries to the LLM. You
will go back to the uh dictionary that you have saved before and you will try to find out whose summary are these. So
you will exactly find out the image, you will exactly find out the text and then you will take that text and image along
with the prompt you will send it uh to the LLM. And since in this case the input could be an image or a text we need to use and a multimodal LLM.
So in option number three and option number one in both the cases to get the final response we need to use a
multimodal LLM but the only thing that we are doing differently here in this option number three is that we are
making the search based on the summary and that is very much helpful in a lot of use cases wherein you might have your
data set such that there are a lot of duplicate data. So in that case when you summarize in the first place you can optimize in
terms of space usage as well as you optimize uh the search space when you do uh when you perform a semantic search.
So the way to think about this is in the option number three we are using summary
just for searching and once we get the relevant chunk we are not using that summary anywhere to generate the
response. We are going back uh to our hash table and finding the actual raw relevant chunks and use them in our final response.
Okay. So we are not going to discuss about option number two and option number three. We are going to discuss about option number one. So let's uh get started with the implementation.
So first we are going to import few libraries and specifically we are going to use tabula. So this is a library that
we are going to use to extract tables from a text file. Then we are going to use PMU PDF to extract images from the
PDF and then of course we will use lang chain to process the text data from the PDF. Okay. So let me execute this cell.
So once we import all the libraries uh the next thing that we need to do is load the data set. So in this case we
are going to use a PDF file which is nothing but the research paper called attention is all you need and what we
are going to do is we are going to download this paper from the internet and if you notice this file got
downloaded under the data folder. So let me show you the notebook uh location uh
and the data folder location as well. So this is the same GitHub repo which we have been following throughout this
course and this is the notebook that we are going over now and it has created a folder called data and this is the PDF
file that we have which contain 15 pages. Okay. So we have downloaded the
data set. Now the next thing that we are going to do is we are going to extract images. We are going to extract tables.
We are going to extract text from this PDF file. Now these are a few of the wrapper functions that I have which I
will go over uh in a moment. But let me show you how we are going to process
this data set. So we are going to use py mu pdf to read the file and extract the
images. And the first thing that we are going to do is we are going to create uh a bunch of directories. And uh this is
needed because we need to store all these information all these extracted
images extracted tables and extracted text and store it somewhere. So we are going to create different folders and if
you look at this function it creates an image folder, it creates a text folder and the table folder. So
these are the three different uh directories that we are going to create uh in which we are going to store all this extracted information. And we are
also going to create a folder called page images wherein we will also store
each page of the PDF as an image. And the reason that we want to store this is
at later point in time when we try for a semantic search we will get some relevant chunk and
let's say the relevant chunk contains a text a paragraph or a chunk of text from
page number 10. So what we can do is we can at the end not only just send that
chunk but also we can send the entire page from where that chunk or from where
that text is coming because we know that if a question can have the answer in a
particular chunk it is very likely the content on that page will also have some
relevant information. So basically you are giving more information to the final LLM to generate the response. So that's
why we are just storing every page as an image as well. Right? Uh so this is kind of optional but we are doing it in case we need it later on in our pipeline.
Essentially we are creating different folders for all these different entities. Okay. So once we create
separate folders, we are creating an object called recursive character text splitter. So this is a functionality or
a or a class within a lang chain which can help us to process any text data. So
here what we are going to do is we are going to extract the text from the PDF
with a chunk size of 700 with an overlap of 200. So what that means is we want
lang chain to chunk the data based on characters and we want every chunk to have a size of 700 and it should have an
overlap of 200. That means the first chunk will contain the first 700 characters and the second chunk will
start from 500 because we have an overlap of 200. So the second chunk will start from 500 till 1200 and then the
third chunk will start from 1,000 till,700 and so on. So these are the parameters
that you can tune, you can change based on your data and you can experiment with it and find out what works best for you.
Right? So there are different techniques uh that we have for chunking. There are very advanced mechanisms that are available like dynamic chunking but uh
for this demo we are just specifying these uh chunk size. Okay. So this is only for extracting the text.
Now next before we go over the whole uh PDF we are creating a list called items
and this is the metadata which we are creating which will contain all the information about all the extracted
entities that we find. So this will become very clear once I show you how we are appending to this list. But this
will contain images, text and tables along with its exact uh location and uh
other metadata. Okay. So once we set up this we can go over the PDF page by page. So that is what we are doing here.
We are looping over the PDF page by page and then we are trying to first find the
uh tables and we are trying to extract tables and then we are trying to find the text and extract the text chunk and
then we are trying to find the images and extract uh the images and similarly at the end we are just processing every
page as an image. So if you go over all these four functions, let's start with process tables. Here what we are doing
is we are using tabular to read the PDF file and extract the tables and once we
have that table in case it identifies any table we are appending to the list
that we have created and the way that we are appending is in the form of a dictionary where a dictionary contains
the page number and the type as table and the exact content of of the table and the path where we are storing the
table. So this is the path within the directory which we have created uh here right so that is what we are doing in
process table. Similarly, in processing text, we are using a lang chain and we are just storing every chunk of data and
appending it to the same items list in the form of dictionary in the same format. But the only difference here is
here the type is text whereas for tables the type is table. Right? So we have processed the tables,
we have processed the text. The last thing that we need to do is processing the images. So we are using pi mu pdfdf
as I mentioned earlier and uh just like before we are just extracting the images and at the end we are appending the
image data into this items list. And since we are going to perform embedding
at a later stage of time, we are using the base 64 encoding because when we perform the embeddings, we need to pass
the image as an encoded image. Right? So let me execute this cell.
As you can see, it is now processing the data. And once that is done, we can look into the specific folders and see what
it has extracted. So now that it is over, we can get inside this data folder
and we can see that there is a separate folder for images which contains only the images that it could find within the
PDF. Similarly, it has a separate folder called table uh which contains all the tables that it could find within our
data set. So that's what we have done so far. So we have extracted the text,
image and table from our data set. And now if you remember we have been adding
all these entities or all these items uh into this items list. So if we just want
to look into the first chunk which which is of type text, we can see this uh by uh by looking into the first element.
And if you see here, it contains some metadata like this chunk is coming from page number zero. The type is text and
this is the actual raw text and this is the location of the text in the folder that we have created. Similarly, if you
want to see the first chunk or first item of type table, we can see that as
well. And in this case we can see that the first table that it has encountered is in page number five and this is the
raw text and this is the location of that table. Similarly for images. Uh the
only difference here for images is that we have the base 64 encoded data for the image. Right? So that's the only
difference. Otherwise all these metadata are similar except we have different types.
Okay. So now that we have our data extracted of different modality what we
can do is we can use a multimodal embedding model and create the embeddings of these data. And what we
will do is after generating the embeddings we will append the embedding into the same dictionary. So now every
entity within this items list contains a dictionary which contains the key called page type text and path. Now after
generating the embeddings we will just have another key called embeddings. So let's go over this wrapper function
which just generates the embedding. It's a very simple function. I don't want to go over this because we have seen this
multiple times. We are using boto 3 and we are creating a bedrock runtime client and we are going to use the multimodal
embedding model from Amazon called Titan embedding image version one. And then we
are just checking the type of of the input. If the input contains an image
then the body should have the request body should have a key called input image. But if the if the input is text
or table which are literally uh text only because table is nothing but uh text with a certain format. uh we are
creating the body with a key called input text. So this is the reason that we have this uh if condition because
there are different modality that we have and the way that the model expects the request or body is little different.
So that's why we are just checking whether we are trying to embed an image or a text. And once we have that body uh
which contains uh not only our prompt but also the length of the embedding
right. So in this case uh I guess we are using an vector embedding length of 384
but you can always change and use the length of the vector which the model supports and also what works for you. So
once we have that we are just calling the model using invoke model function and we are providing the model id and
the JSON body right so let me just execute this and uh now let's call this function so this
might look like 30 40 lines of code but essentially it's just one line so I have written some wrapper code which will
help us to show the progress of embedding So let me execute this and show you what I mean. So if you see this
as it is generating the embedding we can see how many text and how many tables that it is embedding and so on. So just
for this we have some line of code here but essentially we are just calling that function which we have just went over a
while back and we are sending the text along with the embedding length that's
all. So in case of table or text we are just sending the prompt as text but in
case of images we are just sending uh the images as the prompt
right. So at this point in time if I just go back to our architecture
we are at this stage. So we have downloaded the data set then we used pyu
to extract the images and then we use lang chain to extract the text and we also use tabula to extract tables. So
once we extracted all these entities we also created the embeddings using the
titan embedding a multimodal embedding model. So the next step is to store those embeddings into a vector database.
So let's uh scroll down and store all the embeddings that we have generated
into a vector database. So in this case we are going to use a open-source
framework called fast from a meta. But what you can do is for your application
you may like to use any other vector database like Aurora, open search, pine cone, Aperture DB and so on. But for
this case uh since it's a small demo setup we are just using fast which would enable us to create an index in the
memory in our local system. So here we are taking all the embeddings from our item uh items list of all the entities from tables uh embeddings of tables,
embeddings of images, text and so on. So we are taking all the embeddings and storing it into this variable called all
embeddings and we are just adding those embeddings in our fast index. So at this
point once I execute this I have all my data in the form of vectors in a vector
store called index. So that is the fast index that we have. So at this point in
time we are all set for retrieval and generation.
So for generation we are going to use the multimodal model which we have seen in the previous section from Amazon
called Amazon Nova. So this is just a wrapper function to call the model and we have seen this structure. So we have
a system prompt or system message. Uh then we have uh the message uh content
which would contain uh our prompt and then we have the inference parameters
like top P, top K and max tokens and we have seen all of this in the previous section where we talked about Amazon
Nova. Now the only thing that we have to add here is along with the prompt we need to give the relevant chunks. That
means we have to perform vector search in our database and get the relevant chunk and those chunks need to be passed
along with our prompt and that is what we are doing here in this for loop. So this function takes our question along
with the matched context or the relevant chunks and what we are doing in this for
loop is we are going over those relevant chunks and we are appending to our message content. That's all because at
the end of the day uh when we send the final prompt to the model we need to have all the chunks added into the
prompt and that is what we are doing by looping over these uh matched items and
once we have that we can call the same bedrock client. So in this case we are
using client.invoke invoke not the model invoke and the reason is we are not using boto3 in this case we are using
the chat bedrock client so this chat bedrock client is a client that comes with langchain so if I just scroll up
you will see that I have imported chat bedrock from langchain AWS so we could
have easily used the same photo 3 uh but I just wanted to show you how You can use lang chain to interact AWS models
all the models that are available under Amazon bedrock which internally uh uses boto3 but in this case I just thought to
show it to you how we can use lang chain to invoke any model. So we have the model id and we just have to create a
chat bedrock client object similar to how we have created boto3 bedrock runtime client object. So here we are
just creating this and once that is done we can just call the invoke function and
parse our data right and this request contains the uh system message our
message and the inference parameter and this system list or sorry this message list consists of our prompt and the relevant chunks. So let me execute this.
And now we can test our rack pipeline.
Let's say we have this query which optimizer was used when training the
models and we know the answer of this question is present in our data set which in this case is the PDF document.
So before we perform a semantic search for this query on our vector database,
we need to first generate the embedding of this query using the same embedding model which we have used to generate
embeddings of our data set. So that's why we are using the same function which we have used earlier to create the
embeddings of our data set. And once we get the embeddings of the query, we can
send this embeddings of the query to our vector database and perform a semantic search. Not only that, we can also
mention how many relevant chunks we need from the semantic search which in this case
we have mentioned as five. That means we want the top five relevant chunk with
respect to this query from our vector database.
So let me execute this cell and try to get the five top relevant chunks with
respect to this query. And if we now see the result, we can see that these are
the five chunks. These are the index number of the chunks that chunk number 64, chunk number 78, 54, 60 and 14.
These are the most similar or the closest relevant chunk with respect to this query that we have within our
vector database. So now that we have the relevant chunks along with our query, we
can send both of them to invoke our Nova model to get the final response. And
that's what we are going to do here. We are taking the matched items from the
result that we have seen and then we are taking those matched item along with the query and calling this invoke nova
multimodal function which we have seen a while back. So let me execute this cell and see what the model generates. And as
you can see the model has rightly predicted the answer as the optimizer used when training the models was the atom optimizer.
So that's the power of multimodal rag wherein you can have your data of
different modality. You can process it and store it in a in a vector database and you can question your data set. So
this is how you can leverage any foundational models to work with your proprietary data.
Lastly, I have added few sample questions in case you would like to experiment little bit more with this pipeline on this particular data set.
You may like to execute these queries and see it uh yourself. But I would
strongly recommend you to use some data set which is relevant uh to your business or your interest and change the
code use a different frameworks different hyperparameters and see how the response is changing. Uh so that
that would give you a better understanding of different component in this uh pipeline. So that's all for this
uh section. In the next and final section of this course, we are going to learn about agents and knowledge basis.
Knowledge basis is one of the service that we have within Amazon Pedro which enables you to build end toend rag
pipeline and we are going to learn about knowledge bases and agents by taking a
realworld use case in the insurance industry.
Chapter 10: Agents with Knowledge Bases
In this last section of the course, we are going to learn about bedrock agents and bedrock knowledge bases. We haven't
talked about all these so far in this course. But what we will do is we will take a practical use case example. In
this case, it is going to be an insurance claim life cycle automation project. And we will see that how we can
make any insurance claiming life cycle workflow completely automated using
agents and bedrock knowledge bases. So before we dive into this particular use
case, let's talk about bedrock knowledge basis and how it is related to rag and
what are the benefits that you get with knowledge basis. So we have already talked about a rag uh in the previous
section. So to recall we understood that in rag the first part
is data injection wherein you have your data you have to process your data you need to use an embedding model to create
the embeddings of your data and store it in some vector database. And once you have that you can use your application
to send the query and that query need to be embedded first and then it can perform a semantic search on your vector
database to get the context or the relevant chunks based on your query and
once you have that context you can send your query along with the relevant chunk to the large language model to get the
final response. So this is the whole life cycle of rag. And if you think
about it, the bottom part of this architecture is nothing but the data injection workflow because this is
something that you have to do every time you have a new data. You have to first embed them and store it in a vector
database. And the top part is basically the text generation workflow wherein you
actually ask the question and that question goes through a semantic search process to get the context and then you
take that question along with the context which which you get from your proprietary data and finally you get the
response. Now in this whole scenario there are a lot of challenges. One of the challenge is you have lots and lots
of data and in that case managing all those data sources and its vector embeddings is is very cumbersome and one
of the challenge that we often see at different customer places is wherever the data changes very frequently uh you
need to have the team to make sure that the incremental data is added to the
vector database on time so that when you query about a recent event, the relevant chunk should come from that recent data.
So you need to have a entire life cycle of data management in terms of uh data
injection and again you need to have a mature team who can perform all the embeddings who can take the decision of
which embedding model to use what type of chunking strategy to implement and so on and so forth. So there are lot of challenges that we have in traditional
rack if you want to build it of your own. So this is where bedrock knowledge basis uh comes into picture which is a
fully managed service within Amazon bedrock which can help you to do endtoend rag workflow management
and it is powered by different foundational models. So you can select any foundational model of your choice to
embed the data and to finally generate the response and everything under the
hood bedrock knowledge basis will take care on your behalf. So if you think about the architecture that we just
talked about, Amazon Bedrock knowledge basis will completely take over your data injection pipeline. So you don't have to worry about data injection,
vectorizing the data, selecting the vector embeddings, making changes in your data pipeline. Everything will be
taken care by knowledge bases. So basically it does all the heavy lifting on your behalf.
And now that you have everything under knowledge base, what you can do is you can simply use the retrieval API by
sending your prompt to get the relevant chunks. So everything has been abstracted under the hood by knowledge
bases. So you don't have to create the embedding of your query. You don't have to perform the semantic search of your own in your vector database. Everything has been abstracted by knowledge base.
Similarly, we have another API called retrieve and generate which will not only retrieve the chunks but it will
also take those relevant chunks along with your query and send it to the generation model and it will give you
the final response. So if you compare with the previous architecture and this one you will realize that once you have
your knowledge base your application workflow becomes very very straightforward and simple. So all you have to do is call this retrieve and
generate API and we are going to see how you can create a knowledge base. So let
me open the bedrock console and show it to you how you can easily create a knowledge base with your own data.
So once you log in and you come to the landing page of knowledge bases, this is what you will see. And to create a
knowledge base, all you have to do is simply click here on create and select this option knowledge bases with vector
store. I have already created a couple of knowledge bases which we are going to use for our insurance use case specifically. This is the knowledge base
that contains all the information about an insurance company. We mimicked this uh this is not real data but I'll show
you which are the data that we have used to create this knowledge base uh later on. But to create a knowledge base all you have to do is click on knowledge
base with vector store. There are a couple of other options that you have.
You can create a knowledge base with Kendra. You can create a knowledge base with structured data store as well. So this is something that we have
introduced during reinvent 2024 uh where uh you can select a red shift uh cluster
as a data store. So if you are not aware of a red shift, Redshift is one of the fully managed service within AWS for
data warehouse needs. So for this demo we are going to create a knowledge base with vector store. So once I click on
this I get an option to give a name for my knowledge base. So let me give a
name. So let's say KB demo.
So this is just the name of the knowledge base. Uh you can put any meaningful name depending on your use
case. You can put some description. You need to provide an IM role so that the knowledge base can access your data
store. In case you have not created any service role then uh you can select this option create and use a new service role
and bedrock will create a service role on your behalf and if you have an service role already created you can select this option. So let's go ahead
and select this create a new service role. And this is where you can select the data source. So the data source that
you can have could be an Amazon S3 bucket. It could be even a web URL and it will uh it will just crawl through
your website and use that data to create the embeddings and store the embeddings for your retrieval. And you can even
give any third party data source like Confluence, Salesforce, uh, Sharepoint and so on. Okay. So for this we are
going to select S3 and simply click on next.
So there are a few other options that uh you may like to uh set up like this is a a very important uh configuration where
you can enable logging so that you know what is happening in your knowledge base. So when you click on add and you
can always uh do this at later point in time uh but I would highly recommend that you enable log deliveries so that
you can see what is happening in the cloudatch and you have those logs for future analysis on S3. Okay. So this is
just an optional thing that you should enable. So once you click next this is where you need to provide the actual
data source. So since we have selected S3 in the previous visit, we have given the option to select the S3 bucket. So
you can give some meaningful name to your data source. So for us it is going to be the insurance data. So I can say
insurance data and we can select the S3 bucket. So
let's select the S3 bucket that we have.
And these are all the insurance related documents that we want our knowledge base to have. So if you see it has some
claim documentation for different customers. So these are the customer ID and uh these are the claim documents for
different customers. There are some documents like driver insurance file which consists of all the information
that are needed for any customer who takes a new insurance. So when you take an insurance the insurance company asks
you specific details about your driving license, about your vehicle. So all those requirements are mentioned in this
document. So let's select this whole folder and inside this we have seen there are a lot of files. So knowledge
base will extract all the files and create embeddings of its own. So we don't have to do anything. So let's
select this S3 bucket. In your use case you can put the right S3 bucket where you have all your data. And once that is
done, you can use a couple of different strategies to parse your document. So you can always go with the bedrock
default parser, but you can even go further and uh use a foundational model
which can help you to parse your document. Now this is an advanced topic. We are not going to dive deep into this.
But at its core, what you are letting the knowledge base do is uh you are telling that go through my data and use
one of the model clot 3.5 and clot 3 and let the model decide what should be the
right way to parse my document to create the embeddings. And this is very useful when your data is very complex which
contains images, text, uh tables and so on. So if you remember in the previous section we took an example of PDF file
which contains images, text and tables and we actually segregated all those
different entities of our own. So you may like to try a similar data set and use one of the model to parse your data
so that it can perform the chunking and embedding in the right and the most efficient way.
So this is something that you may like to explore in terms of parsing strategy.
Then we have a chunking strategy. So by default you can chunk the data based on
the token sizes that we have. So when you use default chunking what knowledgebased does is it actually
splits the data into a chunk approximately with 300 tokens. And this chunking process honors sentence
boundary and ensures that complete sentence are preserved within each chunk. So this is just one option but
there are many different options that we have. For example, fixed chunking allows you to customize the size of text chunk
by specifying uh the number of tokens per chunk and the amount of overlap between a consecutive chunk. And if you
remember in the previous section uh we used fixed chunking when we chunked our text data using lang chain. So here you
don't have to write any code. You don't have to uh use any framework like lang chain. Everything will be taken care by
knowledge basis. And there is another technique called hierarchical chunking which involves chunking by organizing it
in a nested structure like child and a parent. So in this approach what we do
is knowledge base will chunk your data in parent and child format. So let me show you how it works.
Let's say you have a data and it will chunk the data under parent which would be a bigger
chunk and then within that parent chunk it will have child chunks. So in this case let's say each parent chunk
contains five child chunk. So the way that you should think about it is uh you have a bigger chunk which is a parent
chunk and within that you have a second level of chunking which is called child uh chunks and all these child chunks
will belong to one parent chunk. And what is interesting here is while you do
a semantic search, the semantic search happens on all these child chunks.
And once it find out the relevant child chunk, let's say the most relevant chunk
for a specific query is chunk number 12 and chunk number 13. What knowledge base
will do is it will not send chunk number 12 and 13 but it will send the parent
chunk. So in hierarchical chunking we return parent chunk and the semantic
search is performed on child chunks. So therefore you might see lesser number of search result returned as one parent is
sent at the end of the day. In case it found two or three child chunk but in the retrieval process you will get just
one parent chunk because all those child chunk are part of one single parent.
Right? So this is very efficient in the sense that you are doing the semantic search on a smaller chunk but when you are sending the chunk for downstream
processing or for generation you are sending a bigger chunk. So the bigger chunk will always give a broader context
for the LLM to generate the final response. Now this is beneficial but this also have some side effect that the
moment that you give a bigger chunk to LLM it might contain some noise. So you need to play around with this and find
out which type of chunking or which strategy of chunking works best for you.
Okay. So that is about hierarchical chunking and then you have semantic chunking. So semantic chunking is a
natural language processing technique that divides the text into meaningful and complete chunk based on semantic
similarity calculated by the embedding model. So if you have selected semantic
chunk you are given a few options like what should be the maximum buffer size what are the what is the maximum token
size and the break point. So for example, let's say your buffer size is one. What that means is if you have
three uh sentences uh and the buffer size is one, then it will take three sentences uh the current one, the
previous one and the next one. So let me just uh show you in notepad. If the buffer size is one, so in that case it
will take the current uh the next and the previous
right. So this is what it will take. And if you have a buffer size
of two then it will take the previous
previous one previous two and then current the next one and next two and similarly with buffer three it will take
six chunks. So that is how semantic chunking works. It tries to find the best chunk size based on the context.
Okay. So that is also very much useful in few scenarios and you may like to explore semantic chunk chunking if that
works best for you. So for now we are going to use a default chunking but you can select different types of chunking
techniques uh as mentioned here. And of course there is a technique called no chunking which means there won't be any
chunking and the knowledge base won't be doing any chunking. So it will be like one document one chunk as long as that
fits uh the size uh maximum size uh of for embeddings.
Okay. So let me select default uh chunking and before I go ahead I'm going to share few of the blogs we have and
that will give you more intuition about chunking strategies. So this is one of the blog that I have written uh which
covers all these chunking techniques and I have also mentioned the code how you can parse different configuration for
different chunking strategies. Right? So this will give you an intuition how all of these work in a real world. And then
there is one more blog which is written by one of my colleague Shria Subramani.
And here you will learn about all these different chunking techniques and also he added 5 6 seconds clip of different
chunking techniques so that you can visually understand what these chunking techniques actually does under the hood.
Okay. So I will attach all these blogs in the GitHub repo so that you can refer to them uh as you go along. Okay. So
now that we have selected our data source and we also selected our chunking strategy, we can go ahead and select
next. Okay, I have used foundational model but I have not selected any model that's why it is giving us this error.
So let's go ahead without any foundational model as parser and click on next. And here we have been asked to
select the embedding model. So we need to embed our data uh to build our vector
database. So that's why we have to select one of the embedding model. So let's go ahead and select Titan text
embedding version two. And here we have an option to select any vector database
of our choice. By default, it is going to create an open search serverless instance. But we can always select
vector database of our choice like Aurora, MongoDB, Pine Cone, Reddis and so on. For this demo, we are going to
create a new vector store which is going to be an open search serverless instance. Once that is done, I can click
on next. And here all you have to do is you need to make sure that all these informations are correct and you can simply click on create knowledge base.
So under the hood what is happening at this point in time is it is creating all the resources that are needed to make
your knowledge base ready. So this might take a couple of minutes. So as you can see it has already created the open search vector database and it is ready.
And if I close this message, you will see that it has now started creating the knowledge base. So what we will do is once this process is over,
we will sync the data. So that is the second step that you need to do. So as you can see it is all uh done and let me
just hide this uh testing console. It is saying that sync your data source to
index your content for search. Right? So if you now ask any question you will not get any response because the data is not
yet synced. So the moment your knowledge base is ready what you need to do is you
need to select the data source and click on sync. And when you do that under the hood,
knowledge base will go through all your data and based on the chunking strategy
uh that you have selected, it will chunk your data and it will embed your data based on the embedding model that you
have selected and it will store the data into the vector database. So as you can see the knowledge base is now ready. The
data is uh also being synced. And uh now we are ready to test our knowledge base.
And to perform a test we can click on test here. And here
you get an option called generate response. So if you remember in the presentation we have seen that knowledge
base provides two types of API. one is retrieval and another is retrieval and
generate. So when you disable this what you will get is just relevant chunks.
You will not get the final response. But when you select this option of generate response under the hood it is going to
call retrieve and generate API call. And that's why you have to select a model because now you are telling knowledge
base not only to just retrieve the relevant chunk but also send that chunk along with the query to the model to get
the final response. So let's select one of the model and ask some question.
Let's see what question that we can ask. I guess uh I have drafted few questions.
So let me just find that out. Um yeah so let's ask this question what should be
the driver do after an accident. So this information is there in the documents which we have uploaded on the S3 bucket.
So there is a document where we explain about what are the requirements that driver should do after an accident and
while placing a claim uh request right so let's ask this question to the knowledge base and see what answer we
get. So let me paste this question and click on run.
And as you can see it is able to generate the response based on the data that we have. And not only that it is
also giving some citation. So this is giving us from which chunk or which part of the document it is able to generate
this response. And if I disable this option and if I now ask the same
question at this point it is not giving us the response but it is actually giving us the exact chunk which are semantically closest to our query.
Right? So these are the two APIs that you can have with knowledge bases. one is the retrieval API and the other one
is retrieve and generate API. So this is how you can create a knowledge base in
couple of minutes by selecting the embedding model of your choice, the vector database of your choice and
providing the data source where you have your data. In this case it was S3 but we have seen that it could be a sharepoint
or a website or a confluence page and so on. So that's the beauty of knowledge base where it can do all the heavy
lifting on your behalf and create an end toend rag based uh system so that you
can focus on your business logics and you don't have to worry about LMS vector embeddings and managing the data
sources. In fact, we talked about one of the challenge in rag called incremental
data injection. So this is now very much simplified. So as you can see here, if I
have a new data, I can simply select the data source and click on sync. So we are doing it through UI, but this can be
done through the code as well. You just have to send sync call so that it can synchronize with your data source and
your vector database always contain the latest uh data. Right? So this has eliminated few of the limitations that
we have in a traditional rag if you do it uh yourself and you can also add a different data source at any point in
time. uh it's not like you have to stick with the same data source that you have added at the time of uh creation of of
the knowledge base. So you can always add different data sources at different point in time as your business grows as
your data grows. Okay. So now that we have our knowledge base, we will discuss
about function calling and agents because that is something that we are going to use in our insurance life cycle
automation management system that we are going to build with agents. So before we talk about agents, we need to talk about
function calling. So function calling is a capability that allows any foundational model or large language
model to interact with external tools or APIs or databases. So the way that you
should think about function calling is something like this. Imagine that you need to know what is the present time
and you are asking this question to an LLM. LLM won't be able to give you the right answer because it doesn't have any
live data or it doesn't know the present time. So imagine that you have a function that is a clock function and
you could send that function details and then ask a question.
At that time the LLM might say that okay this question seems like a question about time and you have also provided me
that there is a function called clock so please call this function you should be able to get the answer so that is what function calling is all about so it
doesn't actually execute the function but it is just recommended by the LLM based on your query that it should run
this function. So this is a typical function that we have in any program.
You write different functions and then you call those functions from your application code. So let's say you have
a function one which is a clock function. There's a function two which for multiplication and so on and so forth. In this case in a traditional
regular function you have to decide which function to call and then you have to call that function. And of course you have to write all these functions of your own.
Now this is where function calling comes in where you have your application code
and you also have your function but what you do is you call the LLM with the
function descriptions and your prompt and LLM will tell you which is the right
function to call. Again it is not going to call that function but it will tell you that call this function number one
because this question or the prompt that you have provided can be answered by function number one and then you have to
write the logic in your code to actually call that function. Okay. So with
respect to traditional regular function here we were able to automate certain things like in this case I don't have to
think about which function to call so that help I'm getting from LM but at the end of the day I have to call
that function to make it work. So this is a good amount of automation but it would be great if we have a system where
the LLM would not only select the right function but it will also execute that
function and that is where agents come in. So agents are nothing but an
advanced AI system. You can just intuitively think of it like that which automatically figures out how to best
answer your question. So if we compare function calling with agents, this is
what function calling that we have seen a while back. And what makes agent
different is this. Now when you have a question you will send that question to
the agent and agent will internally ask the question to the LLM. So agents are
nothing but it contains an LLM and it also have lot of tools attached to that and we are going to see how we can
leverage bedrock agent to implement all of this. So at this point in time the LLM within the agent will pick the right
function and it will also execute that function. So agent will decide which
function to select and which function to execute. So now it's completely automated and now you can think of
various scenarios where you can build a fully automated pipeline with agents because now you are having the
capability of reasoning. So given a problem let's say tell me the best route to go to New York from Boston during December. It's a very complex question.
So imagine that you are asking this to an agent and agent has lot of functions and tools added while the system was
built. So first thing that it has to do is it has to know the distance between Boston and New York. So there might be a
function which can find the distance between two location and once that is
done the agent might take the next step to find out the best route to go from
Boston to New York. It could be via flight, it could be via drive and so on and so forth. So with agents you can
make your software much more agile. All you have to do is you need to select an LLM and give the right tools and functions which the agent can use.
Okay. So now that we understood agents,
what we are going to do is we are going to work with agents with knowledge bases. So the way to think about it is
like this. So we already have knowledge bases where we can ask questions and get the response. And now that we learned
about agents, what if we give knowledge base as one of the tool to the agent in that case the agent can go and call the
retrieve API as and when the agent needs this is the advantage of using knowledge
bases with agents. So let's say you have built an agent on bedrock and we are
going to see that in the demo in a couple of minutes but I just wanted to show you how the workflow would logically look like. So you have a
question you ask that question to agent and now the agent will split your
question into multiple task and this intelligence it will get from an LLM. So
this is where the chain of thoughts and reasoning comes into picture. So you ask something agent will break that task
into subtask and each of the subtask will be executed in sequence or in parallel depending on
the subtasks. So let's say the first couple of task it need to send to some action group to get that done. So we
will see what are action groups. But action groups at its core are basically the actual functions or actual business logic which can solve a particular task.
So in our previous example when we created some function to add two numbers some function to calculate the distance
between two location you can think of them as action groups.
Similarly with agents you can also attach knowledge base. So in case any of
the task needs to be searched in a knowledge base, you can actually provide the knowledge base and agent will select that knowledge base to get the relevant
chunks or the response. So you are not doing anything of your own. Everything is taken care by the agent. So you just
asked a question and it breaks down that question into multiple task and those multiple task or subtask gets the right
response from its respective action group or knowledge basis and it is not mandatory to have action groups and
knowledge bases both. These are the options that you have when you create an agent. You can have action groups or
knowledge bases or both of them. And once you get all the response for all the task, you can get that uh response
back and that response is sent to the agent. Now as an end user, you have not yet received the final response. At this
point in time, the agent may decide to send that response to the user as is or
it may decide to refine the response by sending it back to the model and that model will give us the final response.
So if you think about it, everything here starting from prompt, the conversation, the actions, the knowledge
basis, instructions, a task, everything is taken care by the bedrock agent and it has fully automated the whole pipeline.
Okay. So that is what makes agent so so powerful in today's time.
If you go back to our problem of insurance life cycle management, we have different types of data. We have seen
few of the data while creating the knowledge bases. But there are different types of data that we have dumped into
the knowledge bases. And now what we are going to do is we are going to use knowledge bases with agents and see how
we can leverage the power of agents to to make our system more sophisticated.
Now that we learned about what agents does, let's forget about all of this and let's see what kind of question we can
expect the agents to answer on our behalf. So now we can ask a question
like create a new claim and the agent will go ahead and create a new claim based on the action groups that we have created.
We can have some question like this.
What factors uh determine my car insurance premium? So this question can
be answered by the agent if we have a knowledge base attached to that because
all these information is kept in some document based on my insurance company's policy. So what the agent can do is it
could go to the knowledge base send this question find out the relevant chunk and process that with the LLM and send the
response back to the user. Right. So we were able to ask lot of questions
without looking into our backend data and without selecting the right function which can help us to get this questions
answered. So if we look into this workflow and if we ignore all of this
the underlying data flow we will end up into action groups and knowledge base.
So let's focus on this because we have not talked about action groups and knowledge bases. So let's see how action
groups actually works. So when you ask a question, the bedrock agent will trigger
an action group. So there are different action groups which you can add to your agents. And each of these action groups,
the way that you should think about it is the business logic. as I explained earlier or the functions that you would
like to have for your business. For example, in this particular insurance use case,
we have couple of task like creating a claim. So I know that there will be instances when the customers will
request to create a claim. So in that case the agent should have the capability to create a claim. So that's
why we created a action group for creating claim. Similarly, there could be another action which we might get from the end user like gather evidences.
So imagine that I have to ask question to all of our customer to provide all
the relevant documents to process a claim. So that means I have to provide a URL where they can upload all the
documents for a certain claim. So all of that logic like where to upload, what are the documents to upload, all this
logic I can incorporate in an action group and agents can call that action
group if needed. Similarly, I have also have a requirement to send reminders to
different customers for renewals or let's say premium. So in that case I may have a action group
which will go over all the customer ids and send a reminder email automatically.
Right? So all of these business logics can be included in different action group. For example, let's say we have an
action group for create claim. So when a user sends a request create a claim,
that action group create claim will trigger a lambda function. And that lambda function will contain all that
business logic that we talked about. And after creating a claim, it has to stored in some database like Dynamob.
So everything here will be taken care by the agents itself. The only thing that we need to do is we need to provide all
these resources, all these action groups and knowledge bases to the agent. Similarly,
once we create all this um uh once the agent executes all of this, it can send the feedback or send the response back to the agent.
Likewise, there might be situations when you have to ask some question where the answer lies in the knowledge base and
then the knowledge base will be triggered and the agent will get the response from the knowledge base and it
will finally send the response either uh to the user directly or to the LLM and
then the final response from the LLM will be sent back to the end user. user.
Okay, so that's the power of using agents with knowledge base. So let me
show you how you can create an agent and how that action groups and knowledge
bases looks like within an agent. So let me go back to the AWS console and we can click on agents on the left hand side.
And if you see here, I have already created an agent. And the way to create an agent is again very very simple. You
just have to click here and create an agent. Since I already have an agent,
let me click on this and show you what are the things that you see within an agent. So you have this agent name, some
description about this agent. So since this is the agent for insurance claim management, the description is you are
an insurance agent that has the access to domain specific insurance knowledge.
Right? So that is uh the agent description. And if I click on this edit
in agent builder, you will see different action groups and knowledge bases.
So here when you create an uh an action group which I have already created. Uh so let me just show you how we can
create. So when you click on add you will be given an option to enter the name of an action group and then you can
optionally give some description and then this is where your business logic comes in. So you need to create a lambda
function or you can let breadrock to create a lambda function for you and then you can edit that. But you can
create a lambda function which contains the business logic and select the lambda function from here. And here you will be
able to see all the lambda functions that you have uh within that particular region and in your account. And you can
select uh different lambda functions for different action groups. So in this case if you see I have uh a lambda function
to create claim. I have a lambda function to gather evidences. I have a lambda function which will send a
reminder to all the customers. So in that case this lambda function will internally talk to the Dynamob table to
get the information about all the customers and send an email or an SMS to all the customers. So this is how you
can create action groups. Similarly you can also have uh knowledge bases. So let me just
cancel this and you will see that you can also select a knowledge base. So since I have one knowledge base already
created, I have attached that knowledge bases to this agent. And of course agent needs not only a knowledge base and
action groups. The most important thing for agent to work is the large language model. So you need to have a large language model attached to the agent.
And that's what makes the agent as AI powered agent. So you can always select different model. So let's say let's
select Nova Pro. And this is the model that the agent is going to use when I
select it here. And you can always change this model and try out your prompt and see which one works the best
for you. So what I have done is I have created a streamlit application which I'm going to run now so that we don't have to ask a question on the console.
And in the GitHub repository uh which we have for this course if you come to this uh folder folder number four. So this is
the last section of the course you will find a tutorial on how to set up the system. So there is a cloud for template
attached to this repo which will create a Dynamob table which will create the lambda functions and uh all of that. So
you don't have to worry about setting this up. And once you are done with this, what you have to do is you have to
go to agents and within that there is a folder called streamllet and there is a
script called setup streamlit uh environment. So this will create a virtual environment in your system and
then you can simply run this uh bedrock streamlit.py Pi file. So let me go to the CLI and run this.
So this is the streamlit application and this is present under the streamllet folder. So if I run this,
it would open up in a browser and this would be the landing page. And here we have couple of options. So you can ask
any specific question to the knowledge base directly. So in that case you are just asking the question to the
knowledge base. But you can also select agent and select the agent name. Since we have only one agent that's why it is
showing just one but if you have multiple agents configured in your account it will have all the agents here
and then you can select any model for that agent. So let's select Nova Pro. So this is exactly same as selecting a
model in the AWS console which we have seen a while back and then we can ask questions here. So let's try this out.
So let me uh copy u some question. So let's say uh we want to create a claim.
Now when we call this we know that this question cannot be answered by looking into the knowledge base. But to get this
job done this is not actually a question and answer. It's actually a task. So when we ask this question to the agent,
agent should be able to detect that this is a question about creating a claim and
I have a action group which can help me to create that claim. So it will go and call that lambda function and that
lambda function will create a claim and it will update uh the dynamob table and it will send a response back to the end
user. So let's see how this can help us to create a claim automatically. So let me copy this question and paste it here.
But before I do that, it would be great to see the number of items that we have in the Dynamob table so that we can
verify that it is actually creating a claim. So this is the Dynamob console
and if I come to tables and select the table that we have for this which is a life insurance demo
existing claim and if we get the live item count and perform the scan. Now
performing scan is not recommended like this but since I know the size of the table is very small it is okay. So we have 29 items at this point in time.
That means there are 29 customer information present in in this database.
So if I go ahead and ask this question
create claim and hit enter I expect that the agent should be able to call the
action group and the action group will trigger the lambda function and the lambda function will create the claim
and it will store the details in the Dynamob table. As you can see here, it says that the claim has been created
with a claim ID of this, right? So, this is the claim ID that it randomly uh generated. So, this logic is uh mentioned in the lambda function. So,
now if we go back to Dynamob table and if we scan it here again, we expect that the item count should increase by one.
So, let's try and see.
So as you can see the item count is now 30 right. So let's try to ask some more
questions. So let's say we have already created a claim. Now the next natural thing to do is we need to provide a
system or we need to provide a URL to the customer uh so that they can upload
the evidences for this claim. So let's paste the new claim ID which we just got
and copy this question and ask it in our streamlit application.
So let me paste this question and hit enter. So now what the agent is supposed
to do is it is supposed to find out that this question can be answered using an
action group called gather evidences and it should run that lambda function and
here if you see it is saying that to upload all the documents in the below URL for this particular claim. Now this
is a fake URL which I have just mentioned in the lambda function but in real world this would be the actual
uploading website wherever you would like your customer to upload the evidences right so if you think about it
agent is doing everything logically so it's not that I am dictating anything all I have done is I have created an
agent and given that agent all the resources in the form of action groups and knowledge bases so that it can pick
the right one based on the agent's understanding. Right? So let's now ask
some question where the question can be answered from the knowledge base. So let's pick one question. So let's ask
this question. What is recommended for the accident uh report and images? Now
for this particular question, we don't expect the agent to call any action group. So this question can be answered
from the knowledge base. So let's go ahead and hit enter.
And this time it should go and talk to the knowledge base, not the action groups.
So let's wait for a couple of seconds.
So as you can see it says that to submit an automobile accident claim you should provide the following documents the
vehicle registration uh driver's license accident report and accident images.
Okay. So now you might appreciate the fact that how powerful agents are. If you provide
the right set of tools to the agent it can do wonderful things. And this is how
you can fully automate your pipeline and make your application very very powerful
and you can actually make your end user experience better. Right? So that's all
for this particular demo. In case you would like to run this in your account,
as I mentioned earlier, you can come to this uh knowledgebased agents folder that we have within this uh GitHub repo.
And the first thing that you should do is click on a deployment guide. And once you click on this deployment guide, it will tell you how to implement this.
Okay. So it will tell you which are the scripts that you need to run to set up the environment and we have uh a cloud
formation template. So if I go to TNF folder and you see this there is a YAML file which will get executed once you
run the script. Okay. And this will also give you some idea about the cost because there are a lot of components here. For example, there is a lambda
function, there is a DynamoB table and there is a knowledge base and so on and so forth. So you need to know how much cost this might cost when you actually
implement this. But you can always give it a shot and see how things work. Okay.
So that's about this course on multimodality, multimodal rag embeddings, agents and knowledge bases.
We have started with embeddings and then we moved to multimodal embeddings and then to multimodal LLMs and finally we
ended up with agents and knowledge bases. So I hope that you learned a bit about all these and this is not the end.
This is just the beginning and I'm very sure that uh all of this might be little overwhelming and in general this entire
space is little overwhelming at least to me because every day something new is coming up and it is very difficult to
keep up with the pace but what I always found very helpful is if you don't focus on a particular tool or service and
focus on the underlying concepts and foundations it becomes very easy for me to ramp up
on a certain technology. So rather than focusing on lang chain or llama index,
it is better to focus on how prompt engineering works, how different techniques work uh to chunk a data, how
embedding works, how a multimodal model generates an image or how a multimodal model are actually trained. So these
things will help us to understand how a fully managed service work and in that
way you will gain more confidence when you build something and also you can explain to your customers in a much
better and confident way. Okay. So with that I'm going to end this course and thank you so much once again to be with
me throughout this course and I really appreciate that you reached to this point and I would request you to stay
connected with me and I'm going to share my LinkedIn maybe I'll add that on this GitHub page but I will also share my
LinkedIn ID towards the end and I hope that we will be in touch and in case you
face any difficulty while going through these examples and these notebooks, feel free to reach out to me over LinkedIn.
But if you feel that something can be added in this GitHub repo and you would like to contribute to that, feel free to
create a pull request or just ping me directly on a LinkedIn or send an email.
Now before we wrap up one thing which I have not added in this GitHub repo as of now but I think by the time you will
watch this you should be able to see that. So I will add a resource section where I will add all the resources that
we talked about like different blog posts uh then uh different books that I have shown you and also there are some
very good advanced courses around LLMs which I recently have gone through and still going through. you may like to
check them out and I wish you all the very best in this journey of AI engineering and I hope you will build
something meaningful and share it uh with others and hopefully with me as well and I'm looking forward to see what
you build by acquiring all this knowledge. Thank you so much once again for being with me throughout this course.
`
