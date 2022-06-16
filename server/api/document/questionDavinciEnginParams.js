const QUESTION = 'Question';


/*
1. `QUESTION` is the name of the context.
2. `prompt` is the prompt that will be displayed to the user.
3. `lastToken` is the token that will be appended to the end of the prompt.
4. `max_tokens` is the maximum number of tokens that will be generated.
5. `temperature` is the temperature of the softmax function.
6. `top_p` is the top-p value of the nucleus sampling.
7. `n` is the number of samples to generate.
8. `presence_penalty` is the presence penalty of nucleus sampling.
9. `frequency_penalty` is the frequency penalty of nucleus sampling.
10. `stop` is the list of tokens that will stop the generation.
*/
/* It's a dictionary of parameters for the question generation. */
const questionDavinciEnginParams = {
  [QUESTION]: {
    prompt: `Write a thought-provoking question when given a context.
    ######
    Context: The benefits of starting young
    Question: What are the main benefits of reading for early childhood development?
    ######
    Context: On Turning 40
    Question: Is turning 40 a cause for celebration or reflection?
    ######
    Context: The pros and cons of sports fandom
    Question: Would you follow a team that was on a losing streak if they had your favorite player on the team?
    ######
    Context: The way that news has become more transparent
    Question: What impacts has the 24-hour news cycle had on our society?
    ######
    Context: The dangers of texting while driving
    Question: Is texting while driving a risk to your health?
    ######
    Context: An interview with a vampire
    Question: Werewolves and vampires have a tons of lore about them. What is one thing that's never been brought up that you would like others to know about them?
    ######
    Context:`,
    lastToken: "\nQuestion: ",
    max_tokens: 64,
    temperature: 0.98,
    top_p: 1,
    n: 10,
    presence_penalty: 2,
    frequency_penalty: 2,
    stop: ['######'],
  },
};
module.exports = {
  questionDavinciEnginParams,
};
