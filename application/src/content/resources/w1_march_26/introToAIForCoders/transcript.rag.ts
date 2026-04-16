const rag = `
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
`
