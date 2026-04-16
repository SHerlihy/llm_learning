import { ResourceBuilder } from "@/content/resourceBuilder"

const aiImagesAndVideosHowItsMade = new ResourceBuilder('But how do AI images and videos actually work? | Guest video by Welch Labs by 3Blue1Brown')
.setOverview('Video deep diving on how AI images and videos are made and visualising the concepts for easier comprehension.')
.setHref('https://youtu.be/iv-5mZ_9CPY?si=iqbXsnxkdJOoZc6W')
.setDateOfInclusion(new Date(2026, 3, 22, 16))
.setTag('art')
.setTag('coding')
.setFlashcard('Diffusion', 'A process equivalent to Brownian motion with time run backwards in high-dimensional space, used to shape pure noise into realistic images or videos.')
.setFlashcard('Cosine Similarity', 'A metric that measures the similarity between vectors by calculating the cosine of the angle between them in high-dimensional space.')
.setFlashcard('Conditioning', 'A technique where additional information, such as a text vector, is provided as input to a diffusion model to help it more accurately remove noise.')
.setFlashcard('Classifier-free guidance', 'An approach that amplifies the difference between a conditioned and an unconditioned model output to better steer the generation process toward a prompt.')
.setFlashcard('Negative Prompts', 'A strategy where unwanted features are described in text and then subtracted from the model\'s output to steer the generation away from those features.')
.setFlashcard('Cross-attention', 'A mechanism used to couple image and text information within a diffusion model.')
.setFlashcard('DDPM', 'Denoising Diffusion Probabilistic Models; a landmark approach that generates high-quality images by reversing a noise-addition process.')
.setFlashcard('Score Function', 'A learned vector field in diffusion models that points towards more likely, less noisy data distributions.')
.setFlashcard('DDIM', 'Denoising Diffusion Implicit Models; a deterministic approach that generates images faster than DDPM by using an ordinary differential equation.')
.setFlashcard('Fokker-Planck Equation', 'A principle from statistical mechanics used to prove that a deterministic process can achieve the same final distribution as a stochastic one.')
.build()

export default aiImagesAndVideosHowItsMade
