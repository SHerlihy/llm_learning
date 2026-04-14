const blip2 = `
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
`
