### Immigrate.ai Rasa Chatbot 

This document goes over some of the fundamental Rasa concepts so that you can get up to speed on how to use Rasa in no time!

### NLU (Natural Language Understanding)
`ai/data/nlu.yml`

Contains information about how to _understand_ the messages that are read in by the user. Our NLU contains two types of data:
`intent`s and `lookup`s. 

Intents are actions that the user is taking (eg. greeting) or requesting us to take (eg. request_agent). You think of them like verbs (most of them are verbs). For each intent listed in the NLU
file, there is a corresponding list of examples. For a `greeting` intent, for instance, there are examples: `hi`, `hello`, `hey`, `good morning`, etc. Rasa uses
the examples in order to train the bot to interpret messages that _look like_ the example as the corresponding intent (`hi` --> `greet`, `help me` --> `request_help`, etc).
Each intent requests are least two examples, however, the more the merrier.

To correctly respond to intents sometimes we need to know specifics. For instance, if a user wants to `inform` (intent) us about why they
are moving to Canada, we will need to pull the answer - the why - out of their message. Our bot needs to be able to look at `I'd like to _move_ there.` and 
identify `move` as their answer. This allows us to respond in different ways to messages with similar structures. This is accomplished with lookups in Rasa.

Lookups allow us to pull structured data out of the intents the bot receives. Just like with intents, all lookups come with a corresponding set of examples.
A lookup `travel_purpose` might include examples: `move`, `vacation`, `work`, etc. Lookups are used inside of the examples we write for intents in order
to allow us to extract specifics from responses. With lookups we can create examples like `I'd like to [vacation](travel_purpose)`. Rasa will then interpret
this example such that any message it receives of the form `I'd like to <answer>` will be read (although this is an oversimplification) as:
`{ intent: "inform", "travel_purpose": "<answer>" }`.


