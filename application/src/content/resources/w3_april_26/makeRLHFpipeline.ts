import { ResourceBuilder } from "@/content/resourceBuilder";

const makeRlHFpipeline = new ResourceBuilder('Building an RLHF Pipeline for LLMs: A Beginner-Friendly Tutorial by Vi Q. Ha')
.setOverview('An overview of LLM training pipeline leading to creating your own.')
.setHref('https://medium.com/@vi.ha.engr/building-an-rlhf-pipeline-for-llms-a-beginner-friendly-tutorial-21112bfcff9b')
.setDateOfInclusion(new Date(2026, 4, 16, 7))
.setTag('coding')
.setTag('training')
.setFlashcard('RLHF', 'A technique to align LLMs with human preferences by training a reward model and fine-tuning via reinforcement learning.')
.setFlashcard('Pretraining', 'The initial phase of training a language model on vast text data to acquire general knowledge and language understanding.')
.setFlashcard('Supervised Fine-Tuning (SFT)', 'Fine-tuning a pretrained model on curated example prompts and responses to teach specific tasks or styles.')
.setFlashcard('Reward Model (RM)', 'A model trained to score AI outputs based on human preferences, providing a numerical reward signal.')
.setFlashcard('PPO', 'A stable reinforcement learning algorithm used to fine-tune an LLM by maximizing reward model scores.')
.build()

export default makeRlHFpipeline

const transcript = `
Reinforcement Learning from Human Feedback (RLHF) is a powerful technique that has enabled large language models (LLMs) like ChatGPT to better align with what humans want. In a nutshell, RLHF involves training a reward model (a sort of AI judge) on human preferences, and then using that model’s feedback as a reward signal to further fine-tune the LLM via reinforcement learning[1]. This approach shines in scenarios where the desired behavior is hard to define with rules — for example, you can’t easily write a formula for what makes a joke “funny,” but humans can tell you which AI-generated joke is funnier[2]. By leveraging human feedback, RLHF “sandwiches” human judgment into the training loop[3], guiding the LLM to produce more helpful, accurate, and safer responses than standard training alone.

What does an RLHF pipeline look like? Broadly, it has four stages: (1) Pretraining a language model on tons of text, (2) Supervised Fine-Tuning (SFT) on curated examples, (3) training a Reward Model (RM) from human preference data, and (4) Reinforcement Learning (often via PPO) to fine-tune the language model with feedback. In this tutorial, we’ll break down each stage in beginner-friendly terms, then walk through a simple example using open-source tools. By the end, you’ll understand the key concepts and even run a toy RLHF loop on a small model (like GPT-2) using frameworks like Hugging Face Transformers and the trl library. Don’t worry if this sounds complex — we’ll take it step by step, with code snippets and tips along the way. Let’s dive in! 🚀
Press enter or click to view image in full size
What is RLHF and Why Does It Matter?

Reinforcement Learning from Human Feedback (RLHF) is essentially a recipe to fine-tune AI behavior using human preferences as a guide. Instead of just training a model to predict text (like in regular language model training), we introduce a human-informed reward system and use reinforcement learning (RL) to optimize the model for that reward[1]. This method became famous for aligning models like GPT-3.5 and GPT-4 to be more helpful and safe — OpenAI credits RLHF as a core technique for training InstructGPT and ChatGPT to follow instructions better than vanilla GPT-3 models.

Why is RLHF needed? Large language models pretrained on the internet are extremely knowledgeable but not necessarily aligned with human intentions. Think of a raw pretrained model as a super-smart parrot: it has read everything online (the good, the bad, and the ugly). It might output misinformation, offensive content, or just unhelpful rambles if asked a question, because it lacks a built-in notion of what we want. RLHF helps align the model with human values and preferences. By incorporating human feedback (like “this answer is better than that one”), RLHF turns the model from a raw predictor into a more controlled assistant that knows not just how to generate language, but how to generate the right language (helpful, correct, appropriate)[3].

OpenAI’s ChatGPT is a prime example: it was pretrained on a massive text corpus, then fine-tuned on demonstration data, and finally tuned with RLHF using human feedback to ensure it politely refuses unsafe requests, follows instructions, and so on. The result is a model that feels much more aligned with user needs than one trained purely via supervised learning.

Before we jump into building anything, let’s clarify the stages of the RLHF pipeline and what each accomplishes.
Stages of the RLHF Pipeline

RLHF can be understood as a sequence of training phases, each with a specific goal. Here’s an overview of each stage:
1. Pretraining: Building the Foundation

The first stage is pretraining, where we train a language model on a vast corpus of text (often scraped from the web). This is the phase that produces the pretrained LLM (like GPT-2, GPT-3, LLaMA, etc.) that has broad knowledge of language. Pretraining is unsupervised (or self-supervised) learning — the model learns to predict the next word in sentences, absorbing grammar, facts, and even some reasoning from patterns in text[4].

Purpose: Acquire general language understanding and knowledge of the world. By the end of pretraining, the model is a text-generating powerhouse, but it’s untamed in terms of following instructions or behaving nicely. An analogy from the AI community: the pretrained model is like an “untamed monster” — it has read the entire internet, including all the toxic or misleading parts[5]. It knows a lot but has no built-in filter or alignment to human values.

Tools: Pretraining large models requires massive compute (usually done on clusters of GPUs/TPUs with frameworks like PyTorch). As a beginner, you won’t be pretraining a model from scratch (it’s extremely resource-intensive — OpenAI reported that pretraining was ~98% of the total compute for InstructGPT[6]). Instead, you’ll start with an existing pretrained model (for example, downloading GPT-2 or LLaMA-2 weights from Hugging Face Hub).

Note: Pretraining is usually done by big organizations. In this tutorial, we will use a pretrained model (GPT-2) as our starting point, rather than pretrain one ourselves.
2. Supervised Fine-Tuning (SFT): Teaching the Model with Examples

In the second stage, we take the pretrained model and fine-tune it on a supervised dataset of high-quality example prompts and responses. This is often called Instruction Tuning if the data consists of instruction-output pairs (like a question and a helpful answer). The idea is to teach the model the desired style, format, or tasks through examples provided by humans[7].

Purpose: Align the model closer to the task or domain we care about, using explicit demonstrations. For instance, we might fine-tune the model on a dataset of polite question-answer pairs, so it learns to produce helpful answers in a conversational tone. After SFT, the model is much more “civilized” than the raw pretrained model — using the earlier analogy, this stage takes the untamed model and makes it “somewhat socially acceptable” by training on cleaner, curated data[8].

Tools: You can fine-tune using the Hugging Face Transformers library’s Trainer or Accelerate, or the new Hugging Face 🤗 TRL (Transformer Reinforcement Learning) library’s SFT utilities[9]. Fine-tuning on small models (like GPT-2 or a 7B parameter model with techniques like LoRA) can be done on a single GPU. For beginners, platforms like Google Colab or Kaggle Notebooks are convenient — they offer free GPUs you can use for training. We’ll show an example of fine-tuning using the Hugging Face Trainer shortly.

Example: Suppose we have a few hundred example Q&A pairs where humans wrote good answers. We can load a pretrained GPT-2 model and train (fine-tune) it on this Q&A dataset (this is standard supervised learning). After a few epochs, the model will better mimic the style and content of those human-written answers. It’s not perfect or personalized yet, but it’s a big improvement in following instructions compared to the raw model.
3. Reward Modeling: Learning a Preference Function

The third stage introduces a new model in the loop: the Reward Model (RM). The reward model’s job is to assign a score to a model output, reflecting how well that output aligns with human preferences[10]. Essentially, we train a model to be a judge of outputs. How? By using human feedback data.

Typically, human annotators are shown a prompt and two (or more) responses from the SFT model; the humans rank which response is better. This gives data of the form: (prompt, response A, response B, human says A is better than B). From many such comparisons, we can train the reward model to output a higher score for outputs that humans preferred and a lower score for those they didn’t. This is often done by training a binary classifier or regression model: given a (prompt, response) pair, predict a scalar reward that correlates with human preference[10]. In practice, the reward model is usually a copy of the original LLM (or a smaller model) with an extra head that outputs a single value.

Purpose: Provide a quantifiable measure of human preference that our main LLM can optimize against. The reward model turns subjective judgments (“response A is better than response B”) into a number. For example, the reward model might learn to give high scores to answers that are accurate, polite, and thorough, and low scores to answers that are irrelevant or toxic. This numerical reward function is crucial — it lets us apply RL algorithms as if the problem has a math-defined reward, even though the actual preference comes from human judgments[11][10].

Data & Training: To train the reward model, we need a preference dataset. Humans are asked to compare outputs, since it’s easier and more consistent for people to say “out of these two answers, this one is better” than to give an absolute 1–10 score[12]. Each comparison can be turned into a training signal: the reward model should predict a higher score for the winning response and a lower score for the losing one. Using many such examples (OpenAI’s InstructGPT used hundreds of thousands of comparisons[13]), we fine-tune the reward model. After training, we have a model that, given a prompt+response, outputs (for instance) a single scalar — higher means “human would likely prefer this response.”

Tools: This stage is a standard supervised learning problem (the reward model is trained with a cross-entropy or pairwise loss). You can use Hugging Face Transformers to create a sequence classification model (e.g., a GPT-2 or BERT with a linear head that outputs a score) and train it on comparison data. The 🤗 TRL library also offers a RewardTrainer to simplify this[9]. For beginners without access to human annotators, sometimes a proxy reward model is used — for instance, a sentiment classifier could serve as a makeshift reward model if you want the LLM to produce positive sentiment text.

Example: Imagine we want our AI to respond in a friendly manner. We could create a reward model by fine-tuning a BERT classifier on a small dataset of chat responses labeled by humans as “helpful” or “not helpful.” This reward model would then output higher scores for helpful responses. In our walkthrough later, we’ll actually skip training a reward model from scratch (since it needs a lot of data) and instead use a pre-built model (a sentiment analysis pipeline) as an example of a reward function.
4. Reinforcement Learning (Fine-Tuning with Feedback)

Now comes the final stage: using reinforcement learning (RL) to fine-tune the original language model (from stage 2) so that it maximizes the reward model’s score. This is what people typically mean by “RLHF training.” We treat the language model as a policy (in RL terms) that, given a prompt (state), produces a response (action). After the model generates a response, the reward model (our proxy for human feedback) scores it, providing a reward signal. Using this reward, we update the language model’s weights to increase the probability of high-reward responses in the future[14].

The algorithm commonly used here is Proximal Policy Optimization (PPO), a policy-gradient RL method introduced by OpenAI in 2017. PPO is popular because it’s relatively stable and efficient for high-dimension problems like language generation[15][16]. In simple terms, PPO performs multiple small updates rather than one big update, to avoid destabilizing the model. This stability is crucial — without it, the language model could stray off into weird patterns to chase the reward.

Purpose: Fine-tune the language model further so that it actually prefers outputs that humans prefer. The supervised fine-tuned model from stage 2 is like a good student who tries to follow instructions; RLHF turns it into a reinforcement learner that explores slight variations and learns from feedback which variations are better. Over many iterations, the model internalizes the reward model’s preferences.

A key detail in RLHF training is a mechanism to prevent the model from going off the rails while chasing the reward. If we naively optimize only for the reward model’s score, the language model might exploit flaws in the reward model — a phenomenon called reward hacking. For example, if the reward model isn’t perfect, the policy might learn to produce gibberish that somehow tricks the reward model into giving a high score[17]. To mitigate this, RLHF implementations add a penalty term (often using KL divergence) that measures how far the new policy’s output deviates from the original model’s distribution[18]. This effectively says: “don’t move too far from the kind of answers you used to give (which were reasonable due to SFT), unless it truly earns a higher reward.” This KL penalty keeps the model’s updates conservative and maintains output quality, preventing mode collapse or nonsense outputs that would break the user experience[17].

Tools: The Hugging Face TRL library provides a ready-to-use PPOTrainer that handles a lot of the heavy lifting for this stage[19][20]. It integrates with 🤗 Transformers models seamlessly. Under the hood, it requires us to supply the current model (policy), a reference model (usually a frozen copy of the SFT model for computing the KL penalty), a tokenizer, and a way to compute rewards for outputs. Alternatively, you could use RL libraries (like Stable-Baselines3 or OpenAI’s own implementations) to code PPO yourself, but TRL makes it much simpler by providing a high-level API. We’ll demonstrate how to use trl.PPOTrainer in code.

Process: In each RL training iteration, you: (a) sample some prompts (queries), (b) have the model generate responses (this is the rollout step)[21], © evaluate each response with the reward model to get a reward score (evaluation step)[21], and (d) perform a PPO update on the model using those rewards (optimization step)[22][23]. This loop repeats for many batches. Over time, the model learns to produce responses that yield higher reward model scores. Concretely, if the reward model gives high scores to, say, polite and correct answers, the RLHF training will make the language model more likely to produce polite, correct answers.

Example: Let’s say we have a reward model that scores answers based on positivity (it gives higher reward if the response is positive in sentiment). If we use RLHF on a base model with this reward, the language model will gradually learn to produce more positive-sounding answers to any prompt, because those get higher reward. Of course, in a real RLHF scenario, the reward model would capture more complex preferences (not just sentiment).
RLHF Pipeline Summary
1. Pretraining

Goal:
Learn general language patterns and knowledge from large text data. Produces a base LLM (often large and uncensored).

Tools & Methods:

    Unsupervised learning on huge text datasets
    Typically done with PyTorch or TensorFlow at massive scale
    Beginners use pretrained models from Hugging Face Hub

2. Supervised Fine-Tuning (SFT)

Goal:
Teach the model specific tasks, styles, or how to follow instructions using example prompt-response pairs. Aligns the model to be more helpful and controlled.

Tools & Methods:

    Hugging Face Transformers Trainer or 🤗 TRL’s SFT tools
    Requires curated datasets (e.g., human-written Q&A)
    PEFT techniques like LoRA or QLoRA for low-resource fine-tuning

3. Reward Modeling

Goal:
Train a reward function that scores model outputs according to human preferences. Provides a scalar reward signal for the next stage.

Tools & Methods:

    Create a dataset of human comparisons (e.g., “which output is better”)
    Fine-tune a model (e.g., classifier or value-head LLM) to predict higher scores for preferred responses
    Tools: AutoModelForSequenceClassification, TRL’s RewardTrainer

4. Reinforcement Learning (PPO)

Goal:
Further fine-tune the language model using the reward model’s feedback. Optimize the model to maximize reward while keeping updates stable.

Tools & Methods:

    PPO algorithm (Proximal Policy Optimization, OpenAI 2017)
    Hugging Face TRL’s PPOTrainer
    Uses a reference model to apply KL penalty for stability
    Often requires GPUs and optimization tools like accelerate

With the concepts in place, let’s get our hands dirty with a simplified example of an RLHF pipeline. We’ll use Hugging Face Transformers and TRL to illustrate the steps.
`
