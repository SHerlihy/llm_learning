const text = `
RLHF can be used to align LLMs with human preferences and values, by eliciting feedback from humans on the LLM’s current behavior and using this feedback to train a reward model. Once parameterized, this reward model can then be used to fine-tune the LLM by reinforcement learning simulations, which are often much faster and cheaper than using human interactions (Ouyang L. et al., 2022). Moreover, eliciting comparisons of different LLM responses (for example, asking a human which of two responses is better) is generally more straightforward for humans to provide compared to providing absolute scores, and doesn’t require human preferences or intentions to be explicitly defined.

Christiano et al. (2017) provided the first evidence that RLHF could be economically scaled up to practical applications. Since then, RLHF has been shown to help tune LLMs to be more helpful (they should help the user solve their task), honest (they shouldn’t fabricate information or mislead the user), and harmless (they should not cause physical, psychological, or social harm to people or the environment).

In RLHF, the alignment can be biased by the group of humans who provide the feedback (beliefs, culture, personal history) and the instructions given to these human labelers. Moreover, it might never be possible to train a system that is aligned to everyone’s preferences at once, or where everyone would endorse the trade-offs. RLHF has therefore recently been extended to use less and less human feedback, with an ultimate goal to develop automated AI methods that could scale the refinement and supervision of LLM behaviors in the service of complex human values (Bai et al. 2022). Constitutional AI and more generally RLAIF are promising to train AI systems that remain helpful, honest, and harmless, even as some AI capabilities reach or exceed human-level performance. This post focuses on RLAIF.

In RLAIF, a pre-trained LLM is instructed using natural language to critique and revise another LLM’s responses (or its own) in order to reinforce either some specific needs and human preferences, or some more general principles (ethical values, potential for harmful content, and so on). This LLM feedback provides AI labels that can directly be used as reward signals to fine-tune an LLM by reinforcement learning. Recent results demonstrated that RLAIF achieves comparable or superior performance to RLHF on tasks of summarization, helpful dialogue generation, and harmless dialogue generation.

Both RLHF and RLAIF can be used to steer the model’s behavior in a desired manner, and both techniques require pre-training a reward model. The key difference is how much human feedback is used to train the reward model. Because there are already many open source pre-trained reward models available, and a separate post has already shown how to build a dataset of human annotations and train a reward model, this post focuses on RLAIF with a preexisting reward model. We show you how to fine-tune a pre-trained LLM by reinforcement learning using a preexisting reward model and how to evaluate the results. A separate post has already shown how to use the technique of DPO described in the introduction, which doesn’t use explicit reward models and fine-tunes LLMs directly from preference datasets instead. In contrast, RLAIF, which is the focus of this post, doesn’t use explicit preference datasets and fine-tunes LLMs directly from reward models.

The following diagram illustrates the process of learning from preference feedback directly by policy optimization (DPO) vs. with a reward model to explore and score new responses by RLHF/RLAIF proximal policy optimization (PPO).

Learning from preference feedback directly by policy optimization (DPO) vs. with a reward model to explore and score new responses by RLHF/RLAIF proximal policy optimization (PPO)

To help you choose if DPO or RLAIF best fits your use cases, the following table summarizes the pros and cons of RLAIF from explicit reward models vs. DPO from explicit preference datasets. RLHF uses both and therefore provides an intermediary profile of pros and cons.

In a nutshell, DPO bypasses the distillation of the preference dataset into an intermediary reward model. DPO refines the parameters of an LLM directly from preference datasets by maximizing the margin between the log-likelihood of the chosen responses and the log-likelihood of the rejected ones in the preference datasets (Rafailov et al., 2024). Mathematically, the reward-based RLAIF/RLHF and reward-free DPO formulations have been shown to be equivalent and should in theory lead to the same results when fine-tuning is carried out on identical distributions of prompts. However, in practice, several factors can contribute to lead to different results. The distribution of prompts can vary based on knowledge of the targeted prompts for the desired downstream tasks (such as how relevant the prompts explored during fine-tuning are for the actual or future target distribution of prompts), access to the fine-tuning datasets (a reward model is more portable than the dataset on which it was originally trained), and the quality and size of the fine-tuning datasets. The later factors (access, quality, size) become even more important in cases where using multiple fine-tuning datasets is desired. This implies the following pros and cons.
  	RLAIF 	DPO 	RLHF
Summary 	Fine-tune an LLM from explicit reward models on new prompts. 	Fine-tune an LLM directly from explicit preference datasets. 	Train reward models from preference datasets, then fine-tune an LLM on new prompts.
Pros 	Fine-tuning is possible without human annotations.
Most efficient in speed, compute, and engineering if:

    Reward models or LLM instructor available.
    Preference data unavailable.
    Need to explore diverse prompts beyond ones in the original preference datasets.
    Online learning desired.

Directly scales beyond human supervision.
Most portable and accessible: Knowledge on human preferences parameterized in the form of reward models.
	Fine-tuning uses explicit human feedback.
Most efficient in speed, compute, and engineering if:

    Reward models unavailable.
    Need to target prompts from available preference datasets.
    Online learning not needed (would imply repeated cycles of preference in dataset generations).

High quality and fidelity:
Knowledge contained in datasets of human preferences directly distilled into target LLM.
	Fine-tuning uses explicit human feedback.
Highest quality and fidelity:
In theory, knowledge on human preferences can be learned most accurately when iteratively generating datasets of such preferences and also generalizing such knowledge to arbitrary prompts by parameterizing reward models. In practice, this is often not the case.
Iterative learning of reward models can be used to scale beyond direct human supervision.
Cons 	Fine-tuning limited to available model of human preferences.
Inefficient if:

    Reward models unavailable and preference not clear enough to instruct an LLM.
    Need to target prompts from available preference datasets.

	Fine-tuning requires a lot of human annotations.
Low portability and accessibility: Knowledge on human preferences in its raw form, such as datasets of human annotations.
Inefficient if:

    Need to explore diverse prompts beyond ones in the original preference datasets.
    Reward models available or preference clear enough to instruct an LLM.

	Fine-tuning requires a lot of human annotations.
Fine-tuning limited to learned models of human preferences.
 
Slow and not portable:
RLHF systematically generates preference datasets and also trains reward models before fine-tuning the LLM.

This table is not exhaustive. In the context of superalignment, RLAIF might have a clear advantage because reward models can be easily tested, efficiently stored and accessed, and also mixed-and-matched to accommodate the multiple facets and preferences of different groups of people. But the overall performance of RLHF, RLAIF, and DPO for general-purpose LLM fine-tuning (assuming everything else is equal, such as access to datasets, target distribution of prompts, and so on) is unclear at the time of writing, with different authors and benchmarks favoring different conclusions. For example, Rafailov et al. (2024) favor DPO whereas Ivison et al. (2024) favor RLHF/RLAIF.

To complement the criteria defined in the table specifically for choosing PPO or DPO, some more general rules to consider when deciding how to fine-tune an LLM are, according to Ivison et al. (2024), in order of importance:

    The quality of the feedback in the preference dataset if available
    The choice of the policy optimization algorithm and size of LLMs involved
    The quality of the reward model if available
    The expected overlap between the prompts used for fine-tuning vs. future target prompts for which the LLM will be ultimately be used
`
