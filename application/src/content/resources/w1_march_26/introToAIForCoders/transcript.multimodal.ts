const multimodal = `
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
`
