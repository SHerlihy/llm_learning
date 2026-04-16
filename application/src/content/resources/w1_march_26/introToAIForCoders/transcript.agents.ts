const agents = `
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
