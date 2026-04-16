const nova = `
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
`
