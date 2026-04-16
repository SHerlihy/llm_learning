const text = `
2020 turned out not only to be a transformative year for language modeling. A few weeks after the GPT-3 paper came out, a team at Berkeley published a
Diffusion Models & DDPM
paper called Denoising Diffusion Probabilistic Models, now known as DDPM.
The paper showed for the first time that it was possible to generate very high quality images using a diffusion process,
where pure noise is transformed step by step into realistic images.
The core idea behind diffusion models is pretty straightforward. We take a set of training images and add noise to each
image step by step until the image is completely destroyed. From here we train a neural network to reverse this process.
When I first learned about diffusion models, I assumed that the models would be trained to remove noise a single step at a time.
Our model would be trained to predict the image in step 1 given the noisier image in step 2, trained to predict the image in step 2 given the noisier image in step 3, and so on.
When it came time to generate an image, we would pass pure noise into our model, take its output and pass it back into its input again and again,
and after enough steps we would have a nice image. Now, it turns out that this naive approach to
building a diffusion model really does not work well. Virtually no modern models work like this.
These are the training and image generation algorithms from the Berkeley team's paper. The notation is a bit dense, but there's some key details we can pull out
that will help us understand what it takes to make these models really work. The first thing that surprised me is that the team added random noise
to images not just during training, but also during image generation. Algorithm 2 tells us that when generating new images, at each step,
after our neural network predicts a less noisy image, we need to add random noise to this image before passing it back into our model.
This added noise turns out to matter a lot in practice. If we take a popular diffusion model like stable diffusion 2 and use the Berkeley team's
image generation approach, known as DDPM sampling, we can get some really nice images.
Here's the image we get when prompting the model with this prompt, asking for a tree in the desert.
Now, if we remove the line of code that adds noise at each step of the generation process, we end up with a tiny sad blurry tree.
How is it that adding random noise while generating images leads to better quality, sharper images?
The second thing that surprised me when I encountered the Berkeley team's approach was that the team wasn't training models to reverse a single step in the noise addition
process. Instead, the team takes an initial clean image, which they call X0, and adds scaled random noise to the image, which they call epsilon.
And from here, they train the model to predict the total noise that was added to the original image.
So the team is effectively asking the model to skip all the intermediate steps and make a prediction about the original image.
Intuitively, this learning task seems much more difficult to me than just learning to make a noisy image slightly less noisy.
The Berkeley team's paper and approach was a landmark result that put diffusion on the map.
Why does adding random noise while generating images and training the model like this work so well?
The DDPM paper draws on some fairly complex theory to arrive at these algorithms.
I'll include a link to a great tutorial in the description if you want to dig deeper into the theory.
Happily, it turns out that there's a different but mathematically equivalent way of understanding what diffusion models are really learning that we can
Learning Vector Fields
use to get a visual and intuitive sense for why the DDPM algorithms work so well. The key will be thinking of diffusion models as learning a time-varying vector field.
This perspective also leads to a more general approach called flow-based models, which have become very popular recently.
To see how diffusion models learn this time-varying vector field, let's temporarily simplify our learning problem.
One way to think about an image is as a point in high-dimensional space, where the intensity value of each pixel controls the position of the point in each
dimension. If we reduce the size of our images to only two pixels, we can visualize the distribution of our images by plotting the pixel intensity
value of our first pixel on the x-axis of scatterplot and the pixel intensity of our second pixel on the y-axis.
So an image with a black first pixel and a white second pixel would show up at x equals zero and y equals one on our scatterplot.
And an all-white image would be at one, one, and so on. Now, real images have a very specific structure in this high-dimensional space.
Let's create some structure for our points in our lower two-dimensional space for our diffusion model to learn.
The exact structure we choose doesn't matter too much at this point. Let's start with a spiral shape like this.
The core idea of diffusion models, adding more and more noise to an image and then training a neural network to reverse this process,
looks really interesting from the perspective of our 2D toy data. When we add random noise to an image, we're effectively
changing each pixel's value by a random amount. In our toy 2D dataset, where the coordinates of a point correspond
to that image's pixel intensity values, adding random noise is equivalent to taking a step in a randomly chosen direction.
As we add more and more noise to our image, our point goes on a random walk. This process is equivalent to the Brownian motion that drives diffusion
processes in physics and is where diffusion models get their name. From here, it's pretty wild to think about what we're asking our diffusion model to do.
Our model will see many different random walks from various starting points in our dataset, and we're effectively asking our model to reverse the clock,
removing noise from our images by letting it play these diffusion processes backwards, starting our points from random locations and recovering the original structure of
our dataset. How can our model learn to reverse these random walks?
If we consider the specific point at the end of this 100-step random walk, in our naive diffusion modeling approach, where we ask our model to denoise images a
single step at a time, this is equivalent to giving our model the coordinates of the final 100th point in our walk, and asking our model to predict the coordinates of our
point at the 99th step. Although the direction of our 100th step is chosen randomly,
there will be some signal in aggregate for our model to learn from here. Given enough training points, we expect many diffusion paths to go through
this neighborhood, and on average our points will be diffusing away from our starting spiral, so our model can learn to point back towards our spiral.
We can now see why the Berkeley team's training objective works so well. Instead of training the model to remove noise from images one step at a time,
this would correspond to predicting the coordinates of the 99th step given the 100th, the team instead trained the model to predict the total noise added across the entire
walk. On our plot, this is the vector pointing from our 100th step back to the original starting point of the walk.
It turns out that we can prove that learning to predict the noise added in the final step of our walk is mathematically equivalent to learning
to predict the total noise added, divided by the number of steps taken. This means that when our model learns to reverse a single step,
although our training data is noisy, we expect our model to ultimately learn to point back towards x0.
By instead training our model to directly predict the vector pointing back towards x0, we're significantly reducing the variance of our training examples,
allowing our model to learn much more efficiently, without actually changing our underlying learning objective.
So for each point in our space, our model learns the direction pointing back towards the original data distribution.
This is also known as a score function, and the intuition here is that the score function points us towards more likely, less noisy data.
Now, in practice, these learned directions depend heavily on how much noise we add to our original data.
After 100 steps, most of our points are far from their starting points, so our model learns to move these points back in the general direction of our spiral.
However, if we train our model on examples after only one diffusion step, we end up with a much more nuanced vector field,
pointing to the fine structure of our spiral. There turns out to be a clever solution to this problem.
Instead of just passing in the coordinates of our point into our model, which we'll write here as a function f, we can also pass in a time
variable that corresponds to the number of steps taken in our random walk. If we set t equal to 1 at our 100th step, then t would equal 0.99 at our 99th step,
and so on. Conditioning our models on time like this turns out to be essential in practice,
allowing our model to learn coarse vector fields for large values of t, and very refined structures as t approaches 0.
After training, we can watch the time evolution of our model. We see this really interesting behavior as t approaches 0.4.
Our learned vector field suddenly transitions, from pointing towards the center of the spiral to pointing towards the spiral itself.
It feels like a phase change. We're now in a great position to resolve the final mystery of the DDPM paper.
How is it that adding random noise at each step while generating images leads to better quality, sharper images?
Let's follow the path of a single point guided by the DDPM image generation algorithm.
On our 2D dataset, generating an image is equivalent to starting at a random location and working our way back to our spiral.
Starting at a randomly chosen location of x equals minus 1.6 and y equals 1.8, our model's vector field points us back towards our spiral.
Following the DDPM algorithm, we take a small step in the direction returned by our model, and add scaled random noise, which effectively moves our point in a random
direction. We'll color the steps driven by our diffusion model in blue, and our random steps in gray.
Note that the scale of the random step may seem large, but following our DDPM algorithm, the size of our random steps will come down as we progress.
Repeating this process for 64 steps, our particle jumps around quite a bit due to both our learned vector field changing and our random noise steps,
but ultimately lands nicely on our spiral. Repeating this process for a point cloud of 256 points,
our reverse diffusion process starts out looking like absolute chaos, but does converge nicely, with most points landing on our spiral.
Now, what happens if we remove the noise addition steps? Running our reverse diffusion process again without the random noise step,
all of our points quickly move to the center of our spiral, and then make their way towards a single inside edge of the spiral.
This result can help us make sense of why we saw a sad blurry tree earlier when we removed this random noise step.
Instead of capturing our full spiral distribution, as we did when we included a noise step, all of our generated points end up close to
the center or average of our spiral. In the space of images, averages look blurry.
Conceptually, we can imagine different parts of our spiral corresponding to different images of trees in the desert.
And when we remove the random noise steps from our generation process, our generated images end up in the center or average of these images,
which looks like a blurry mess. Now, note that the analogy between our toy dataset and
high dimensional image dataset breaks down a bit here. If all the points on our spiral correspond to realistic images,
since our generated points do still end up landing on our 2D spiral, we would expect these generated points to still look like real images,
but likely with less diversity than we would want. However, in the high dimensional space of images,
it appears that our image generation process doesn't quite make it to the manifold of realistic images, resulting in a blurry non-realistic image.
This prediction of the average is not a coincidence. It turns out that we can show mathematically that our model
learns to point to the mean or average of our dataset, conditioned on our input point and the time in our diffusion process.
One way to arrive at this result is to show that given the noise we add in our forward process is Gaussian, for sufficiently small step sizes our reverse process will also
follow a Gaussian distribution, where our model actually learns the mean of this distribution.
Since our model just predicts the mean of our normal distribution, to actually sample from this distribution, we need to add zero mean
Gaussian noise to our model's predicted value, which is precisely what the DDPM image generation process does when we
add random noise after each step. We can see this mean learning behavior most clearly early in our reverse diffusion
process, when t is close to 1 and our training points are far from our spiral. Our model's learned vector field points towards the center or average of our dataset.
So adding random noise during image generation falls nicely out of theory, and in practice prevents all our points from landing near the center or average of
our dataset. The DDPM paper put diffusion models on the map as a viable method of generating images,
but the diffusion approach did not immediately see widespread adoption. A key issue with the DDPM approach at the time was the high compute demands of
the large number of steps required to generate high quality images, since each step required a complete pass through a potentially very large neural network.
A few months later, a pair of papers from teams at Stanford and Google showed that it's remarkably possible to generate high quality images without actually adding random
DDIM
noise during the generation process, significantly reducing the number of steps required.
The DDPM image generation process we've been looking at can be expressed using a special type of differential equation known as a stochastic differential equation.
This first term represents the motion of our point driven by our model's vector field, and the second term represents the random motions of our point.
Adding these terms together, we get the overall motion of our point at each step, dx.
From here, we can consider how the distribution of all of our points evolves over time, where the motion of each point is governed by this stochastic differential equation.
This problem has been well studied in physics. Using a key result from statistical mechanics known as the Fokker-Planck equation,
the Google Brain team showed that there's another differential equation, this time an ordinary differential equation with no random component,
that results in the same exact final distribution of points as our stochastic differential equation.
This result gives us a new algorithm for generating images using our model's learned vector fields that does not require taking random steps along the way.
Exactly how our ordinary differential equation maps to an image generation algorithm is a bit technical.
I'll leave a link to a tutorial in the description. The key result here though, is that we end up with something that looks very
similar to our DDPM image generation process, but without the random noise addition at each step,
and with a new scaling for the sizes of steps that we take. This approach is generally known as DDIM.
The scaling of our step sizes, and especially how these step sizes vary throughout a reverse diffusion process, matters a lot in practice.
When we just removed the random noise steps from our DDPM generation algorithm earlier, all of our points ended up near the mean of our data,
and we saw blurry results for our generated images. Switching to our DDIM approach, we now have smaller scaling for our step
sizes that allow our trajectories to better follow the contour lines of our vector field, and land nicely on the correct spiral distribution.
And applying our DDIM algorithm to our tree in the desert example, we're now able to generate nice results.
Comparing to our original DDPM algorithm that required random steps, DDIM remarkably does not require any changes to model training,
but is able to generate high quality images in significantly fewer steps, completely deterministically.
Note that the theory does not tell us that our individual images or points on our spiral will be the same, but instead that our final
distribution of points or images will be the same, regardless of whether we use our stochastic DDPM algorithm or our
deterministic DDIM algorithm. The WAN model we saw earlier uses a generalization of DDIM called flow matching.
By early 2021, it was clear that diffusion models were capable of generating high quality images, and thanks to image generation methods like DDIM,
it was possible to generate these images without using enormous amounts of compute.
However, our ability to steer the diffusion process using text prompts was still very limited.
`
