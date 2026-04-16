const tianEmbedding = `
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
`
