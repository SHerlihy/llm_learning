const text = `
Earlier, we saw how CLIP was able to learn a powerful shared representation of images and text by concurrently training image and text encoder models.
Dall E 2
However, these models only go one way, converting text or images into embedding vectors.
These two problems potentially fit together in a really interesting way. Diffusion models are able to potentially reverse the CLIP image encoder,
generating high quality images, and the output vector of the CLIP text encoder could be used to guide our diffusion models toward the images or videos that we want.
So the high level idea here is that we could pass in a prompt into the CLIP text encoder to generate an embedding vector, and use this embedding vector to steer
the diffusion process towards the image or video of what our prompt describes.
A team at OpenAI did exactly this in 2022. Using image and caption pairs to train a diffusion model to invert the CLIP image encoder.
Their approach yielded an incredible level of prompt adherence, capturing an unprecedented level of detail from the input text.
The team called their method unCLIP, but their model is better known by its commercial name, DALI2.
But how do we actually use the embedding vectors for models like CLIP to steer the diffusion process?
Conditioning
One option is to simply pass our text vector as another input into our diffusion model, and train as we normally would to remove noise.
If we train our diffusion model using image and caption pairs, as the OpenAI team did, the idea here is that the model will learn to
use the text information to more accurately remove noise from images, since it now has more context about the image that it's learning to denoise.
This technique is called conditioning. We used a similar approach earlier, when we conditioned our toy diffusion
model on the number of time steps elapsed in the diffusion process, allowing the model to learn coarse structure for large values of t,
and finer structures as our training samples get closer to our original spiral.
Interestingly, there turns out to be a variety of ways we can pass in the text vector into our diffusion model.
Some approaches use a mechanism called cross-attention to couple image and text information.
Other approaches simply add or append the embedded text vector to our diffusion model's input, and some approaches pass in text information in multiple ways at once.
Now it turns out that conditioning alone is not enough to achieve the level of prompt adherence that we see in models like DALI2.
If we take the stable diffusion tree in the desert example we've been experimenting with, and only condition our model with our text inputs,
the model no longer gives us everything we ask for. We get a shadow in a desert, but no tree.
Note that stable diffusion was developed by a team at Heidelberg University around the same time as DALI2, and works in a similar way, but is open source.
It turns out that there's one more powerful idea that we need to effectively steer our diffusion models.
We can see this idea in action by returning to our toy dataset one last time. If our overall spiral corresponds to realistic images,
then different sections of our spiral may correspond to different types of images. Let's say this inner part is images of people, this middle part is images of dogs,
and this outer part is different images of cats. Now let's train the same diffusion model we trained earlier,
but in addition to passing in our starting coordinates and the time of our diffusion process, we'll also pass in the points class.
Person, cat, or dog. This extra signal should allow our model to steer points to the right sections of our spiral, based on each points class.
Running our generation process, after assigning person, dog, or cat labels to each point, we see that we're able to recover the overall structure of our dataset,
but the fit is not great, and we see some confusion here between people and dog images.
Part of the problem here is that we're asking our model to simultaneously learn to point to our overall spiral of realistic images, and toward specific classes on our spiral.
If we consider this cat point for example, it starts off heading towards the center of our spiral, and as our class conditioned vector
field shifts to point towards a cat region of our spiral, our point moves towards this part of the spiral, but it doesn't quite make it.
The modeling task of generally matching our overall spiral has overpowered our model's ability to move our point in the direction of a specific class.
Now, is there a way to decouple and maybe even control these two factors? Remarkably, it turns out that we can.
The trick is to leverage the differences between the unconditional model that is not trained on a specific class, and a model that is conditioned on specific classes.
Guidance
We could do this by training two separate models, but in practice it's more efficient to just leave out the class information for a
subset of our training examples. We now have the option of effectively passing in no class or text
information into our model, and getting back a vector field that points towards our data in general, not towards any specific class.
We can visualize these two vector fields together. Here the gray vectors show our diffusion model points when we don't pass in any class
information, and these yellow vectors show when our model is conditioned on the cat class.
For large values of our diffusion time variable when our training data is far from our spiral, our two vector fields basically point
in the same direction, roughly towards the average of our spiral. But as time approaches zero, our vector fields diverge,
with our cat conditioned vector field pointing more towards the outer cat portion of our spiral.
Now that we have these two separate directions, we can use their differences to push our points more in the direction
of the class we want. Specifically, we take our yellow class conditioned
vector and subtract our gray unconditioned vector. This gives us a new vector pointing from the tip of our
unconditioned vector to the tip of our conditioned vector. The idea from here is that this direction should point more in the direction of our
cat examples, now that we've removed the direction generally pointing towards our data.
We can now amplify this direction by multiplying by a scaling factor, alpha, and replace our original conditioned yellow vector with a vector pointing in this new
direction. Let's follow the trajectory of the same cat point we saw earlier that didn't quite make it onto our spiral.
We'll roll back our diffusion time variable and start a new green point from the same starting location.
If we use our new green vectors to guide the diffusion process instead of our original yellow vectors, the difference between our gray arrows that point towards the center
of our spiral and yellow vectors that start pointing us back towards our cat part of the spiral are amplified, now guiding our point to land nicely on our spiral.
This approach is called classifier-free guidance. Using our new green vectors to guide a set of cat points,
we see a nice tight fit to our spiral for this class. Switching to our dog class, our unconditional gray vector field stays the same,
but our dog conditioned model outputs, shown in magenta, now point us more towards the dog part of our spiral.
And adding guidance amplifies this learned direction. Using our guided vectors and running our generation process,
we see a nice fit for our dog points. Finally, we get a third vector field for our people examples
that again results in nice convergence to our spiral. Classifier-free guidance works remarkably well and has become an
essential part of many modern image and video generation models. Earlier, we saw that if we only conditioned our stable diffusion model,
our image would have a desert and a shadow, but no tree that we asked for in the prompt.
If we add classifier-free guidance to this model, once we reach a guidance scale alpha of around 2,
we start to actually see a tiny tree in our images. And the size and detail of our tree improve as we increase our scaling factor, alpha.
The fact that this works so well is remarkable to me. As we use guidance to point our stable diffusion model's vector field more in the
direction of our prompt, our tree literally grows in size and detail in our images.
Our WAN video generation model takes this guidance approach one step further. Instead of subtracting the output of an unconditioned model with no text input,
Negative Prompts
the WAN team uses what's known as a negative prompt, where they specifically write out all the features they don't want in their video,
and then subtract the resulting vector from the model's conditioned output and amplify the result, steering the diffusion process away from these unwanted features.
Their standard negative prompt is fascinating, including features like extra fingers and walking backwards,
and interestingly is actually passed into their text encoder in Chinese. Here's a video generated using the same astronaut on a horse prompt we used earlier,
but without the negative prompt. It's really interesting to see how the parts of the scene get cartoonish and no longer fit together.
Since the publication of the DDPM paper in the summer of 2020, the field has progressed at a blistering pace,
Outro
leading to the incredible text-to-video models that we see today.
Of all the interesting details that make these models tick, the most astounding thing to me is that the pieces fit together at all.
The fact that we can take a trained text encoder from clip or elsewhere and use its output to actually steer the diffusion process,
which itself is highly complex, seems almost too good to be true.
And on top of that, many of these core ideas can be built from relatively simple geometric intuitions that somehow hold in
the incredibly high dimensional spaces these models operate in. The resulting models feel like a fundamentally new class of machine.
To create incredibly lifelike and beautiful images and video, you no longer need a camera, you don't need to know how to draw or how to paint,
or how to use animation software. All you need is language.
So this, as you can no doubt tell, was a guest video. It comes from Stephen Welsh, who runs the channel WelshLabs.
About guest videos
If somehow you watch this channel and you're not already familiar with WelshLabs, you should absolutely go and just watch everything that he's made.
A while back he made this completely iconic series about imaginary numbers. He actually has since turned it into a book, and consistent with everything he makes,
it's just super high quality, lots of exercises, good stuff like that. More recently he's been doing a lot of machine learning content,
so cannot recommend his stuff highly enough. Now the context on why I'm doing guest videos at all is that very
recently my wife and I had our first baby, which I'm very excited about. And I'm not sure what most solo YouTubers do for paternity leave,
but the way I decided to go about it was to reach out to a few creators whose work I really enjoy, and who I'm quite sure you're going to enjoy, and essentially ask, hey,
what do you feel about me pointing some of the Patreon funds that come towards this channel towards you during this time that I'm away,
and kind of commission pieces to fill the airtime while I'm away. The pieces are actually going to be really great.
I've enjoyed giving some editorial oversight as they're coming in. You know, we've got statistical mechanics, we've got machine learning,
even some modern art. It's going to be a good time. The next guest video is going to be about a combination of modern art and group theory.
It's actually very fun. And like all the other videos on this channel, if you're a Patreon supporter, you can get early views of these ones and provide some feedback before they go live.
Until then, I hope you thoroughly enjoy binge-watching WelshLabs, and again, consider buying the things that he makes.
There is just as much thought and care put into those as there is into the videos.
Bye!
`
