const clip = `
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
`
