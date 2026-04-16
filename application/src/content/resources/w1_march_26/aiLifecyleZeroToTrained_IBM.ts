import { ResourceBuilder } from "@/content/resourceBuilder"

const aiLifecycleZeroToTrained_IBM = new ResourceBuilder("AI Lifecyle Zero to Trained by IBM")
.setHref("https://www.ibm.com/think/topics/ai-lifecycle")
.setOverview("An overview of the stages to create a trained AI with links to deeper learning.")
.setDateOfInclusion(new Date(2026, 3, 9))
.setTag("chill")
.setFlashcard('AI Lifecycle', 'A structured, iterative process of planning, training, deploying, and maintaining AI systems, encompassing everything from initial problem definition to active use in a real-world workflow.')
.setFlashcard('MLOps (Machine Learning Operations)', 'A discipline focused on systematic approaches to AI development, governance, and maintenance to ensure the sustained efficacy of dynamic AI systems.')
.setFlashcard('Feature Engineering', 'A prominent part of the data preparation process where raw data is preprocessed and structured to make it suitable for machine learning pipelines.')
.setFlashcard('Overfitting', 'The machine learning equivalent of "teaching to the test," where a model achieves high accuracy on its training data but fails to generalize well to new, unseen data.')
.setFlashcard('Model Drift', 'The phenomenon where a deployed model suffers from performance degradation over time due to changing real-world circumstances and data patterns.')
.setFlashcard('Data Governance', 'An essential component of AI explainability and regulatory compliance, ensuring data is stored and maintained for audits, performance debugging, and meeting legal requirements.')
.setFlashcard('Supervised Learning', 'A machine learning approach that requires data labeling, which often involves manual human intervention to ensure the labels are accurate and relevant to the specific use case.')
.setFlashcard('Benchmark Evaluations', 'Standardized tests used to determine which models excel at specific tasks, though custom benchmarks are often developed for better alignment with unique project goals.')
.setFlashcard('Synthetic Data', 'Artificially generated data used to fill gaps in training datasets when high-quality real-world data is prohibitively scarce or expensive.')
.setFlashcard('Deployment Environments', 'The infrastructure where a model operates, ranging from on-premise hardware and cloud data centers to edge devices and end-user hardware like smartphones.')
.build()

export default aiLifecycleZeroToTrained_IBM

const transcript = `
 The AI lifecycle, explained

The AI lifecycle is a structured, iterative process of planning, training, deploying and maintaining AI systems. It entails not only the training of machine learning models, but also the collection and preparation of training data, systems for evaluating and improving model performance, and the integration of trained models into real-world AI applications.

The AI lifecycle comprises everything from the initial decision to solve a specific problem with artificial intelligence, through the active use of a trained model in a real-world workflow. The notion of AI lifecycles is closely connected to the disciplines of machine learning operations (MLOps) and AI management systems (AIMS), both of which entail systematic approaches to AI development, governance and maintenance.

Central to the concept of AI development lifecycles is the fact that AI solutions are not designed or deployed in a vacuum: they’re dynamic systems whose sustained efficacy depends on careful planning and diligent monitoring. There are essential dependencies between each step of the AI development and implementation process, and understanding these dependencies is essential to building AI-powered solutions that are successful, scalable and sustainable.

This article will break down each of the essential steps in the AI lifecycle.
The latest AI trends, brought to you by experts

The first and arguably most important phase of AI lifecycle management is the planning phase, in which you identify the use case for your AI application: the problem you’re using AI to help solve and the specific tasks AI can perform to help solve it. All subsequent decisions should refer back to decisions made during the planning process.

It’s essential to be thorough and account for any and all contingencies. Skipping over certain considerations does not save work: it only postpones and exacerbates that work. All relevant stakeholders should be included and consulted in the planning phase, both to benefit from their particular expertise or perspective and to ensure consensus on how things will proceed from here.

    Define the scope of your AI project. What aspects of your problem will your AI solution perform or help with? Which aspects are out of bounds?

    Define your needs. Within the problem areas for which you’ll be enlisting AI, what exactly do you need it to do? It’s important to understand what’s feasible and what isn’t, whether in terms of existing AI capabilities or the resources available to pursue this project.

    Define success. Both qualitatively and (especially) quantitatively, what qualifies as a successful outcome? Establishing success metrics early allows them to guide design decisions and govern the development and optimization of your AI system.

    Assess risks. Identify any ways your AI solution, as scoped thus far, might adversely affect your organization or users. Ethical risks, reputational risks and financial risks  should be flagged and address before moving on to the data collection phase—especially given that inadequate data management is often the source of such risks.

Data collection and data preparation

On a technical level, the quality and quantity of your training data is the single most important factor in the strength of your AI models. 
Data collection

Consider that all machine learning relies on applied pattern recognition. A trained machine learning model uses the patterns it has “learned” from its training data to infer the optimal output for a given input. Sufficient data quality is necessary to ensure that the patterns it learns match those of the new data it will perform inference on in real-world applications. Sufficient data volume is necessary to ensure that the model has learned all the patterns it will need to draw upon, as well as to avoid overfitting. 

Evaluate the relevant data sources available to you, from open source datasets available through platforms such as Hugging Face or Kaggle to web scraping to making use of your organization’s own proprietary data. When high-quality data is prohibitively scarce or expensive, synthetic data can sometimes fill in the gaps. can sometimes fill in the gaps.
Data preparation

Raw data is rarely ready for machine learning: it usually requires some degree of preprocessing prior to its use in model training pipelines. Feature engineering is a prominent part of this process.

Supervised learning requires data labeling, which often requires at least some degree of time-consuming manual human intervention (though automation can often streamline the process). Labeling in some specialized data domains will require expert input. Even datasets containing pre-labeled data should be inspected to ensure the labels’ accuracy and relevance to your specific use case.

Data drawn from different data sources needs to be normalized and made uniform in terms of units and format: for instance, training a model on weather data presented in both Celsius and Fahrenheit will inevitably lead to failure. 
Data governance

Data should not be simply discarded after model training. It should be stored and maintained in the event that you ever need to audit your system, explore performance issues, replicate your models or comply with the regulatory requirements of GDPR or similar frameworks.

Proper data governance is an essential component of AI explainability, data privacy and regulatory compliance, particularly in industries and use cases that involve data containing sensitive information. It’s also a necessary component of establishing data pipelines to streamline scalable data sourcing, especially when your AI workflow makes use of continuously updated proprietary data.
Model selection

Next is model selection: choosing the model architecture that best fits your use case, training data and computational resources. There exists a massive range of machine learning algorithms, ranging from small and simple regression models to massive, state-of-the-art neural networks. The biggest, fanciest model is not always wisest choice: there are tasks for which huge deep learning models are overkill, and even tasks in which conventional machine learning models outperform their deep learning counterparts.

When it comes to generative AI, training LLMs and other types of generative models from scratch requires a massive investment in time, data, hardware and energy. In most cases, the need for a customized generative model is better met by fine-tuning a pretrained model. But even within the world of readymade models, there’s a huge spectrum in terms of model size, architecture and capabilities.

Benchmark evaluations are a helpful guide to determining which models are good at what, but they shouldn’t be taken as gospel. If your problem is well-defined, it’s worth exploring the feasibility of developing custom benchmarks that directly reflect performance on the specific tasks you’ll need a model to perform. This will also be useful for the model evaluation phase later on.
Model training

Generative AI aside, most AI solutions will entail training your own model. Our model training explainer provides more information about the model development process, from the different kinds of machine learning to choosing a loss function (or, in reinforcement learning, a reward function) to optimizing model parameters (and hyperparameters). Some degree of experimentation is usually necessary before arriving at the ideal architecture and learning scheme.

Ultimately, the goal of model training is to adjust model parameters until the model’s performance on the examples in its training dataset reaches some acceptable threshold of accuracy.

Model training is an iterative process, and doesn’t always proceed in a steady, linear fashion. It’s important to periodically save “checkpoints” of model weights throughout the training process. In the absence of such version control, a single model update could be disastrous and force you to start again. Version control is also a necessary practice for debugging, reproducibility and collaboration between teams.
Model evaluation

Optimizing a model’s performance on training data is not, unto itself, the fundamental goal of model training. The true goal of model training is developing a model that generalizes well to new data it hasn’t yet seen. Care must be taken to avoid overfitting, which can be understood as the machine learning equivalent of “teaching to the test,” closer to rote memorization than actual “knowledge. 

Post-training evaluation is essential to confirm that the model generalizes well to unseen data. This validation process tests model output quality on a separate dataset of new inputs that resemble real-world tasks. Validation can use a much wider variety of performance metrics than those suitable for the loss functions that measure model accuracy during training.

Model evaluation and model training typically constitute two parts of one iterative cycle: 

    First, models are trained until loss or reward meets some acceptable threshold.

    Then, model performance is validated on a new set of tasks, often using different performance metrics.

    If the results of model evaluation aren’t satisfactory, the model undergoes further training—usually, with strategic tweaks intended to address any shortcoming identified in the validation phase.

AI Academy
Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.
Watch the series
Model deployment

Once a model has been trained and successfully validated, it moves on to the deployment phase, during which you operationalize the model in an actual production environment and integrate it with existing systems and APIs. Ideally, the model evaluation phase has validated the model’s performance on tasks that use or at least approximate these real-world workflows.

There are many configurations to consider in model deployment, but perhaps the most important decision is the type of deployment environment in which it will operate.
Deployment environments

    On-premise deployment: The model is run on physical hardware—usually AI accelerators—that you (or your organization) own and maintain. This provides the most control, but also requires the most upfront investment.

    Cloud deployment: The model is run on hardware owned and operated by third-party cloud providers, physically located elsewhere in a large data center. Cloud deployment is generally the quickest route to scalability. 

    Edge deployment: The model is deployed across a distributed local network of “edge devices,” such as sensors or internet of things (IoT) devices.

    On-device deployment: The model is run directly on the end user’s device, such as a laptop or smartphone. 

Model monitoring

A deployed model should rarely be thought of as an inert, “finished” product. Proper AI governance entails continuous monitoring of model performance metrics and user feedback.

It’s almost inevitable that in a real-world application, unforeseen problems and edge cases will arise, no matter how thoroughly you plan, test and red team beforehand. Furthermore, even an optimally trained model might, over time, suffer from performance degradation due to issues such as model drift.

Deployed models therefore typically require periodic retraining to maintain adequate performance and adjust to changing circumstances. Once again, thoughtful versioning schemas are important for debugging, accountability and safely making updates to critical systems.
`
