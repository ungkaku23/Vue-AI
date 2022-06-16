const QUOTE = 'Quote';

const quoteDavinciEnginParams = {
[QUOTE]: {
prompt: `When given a description, write an original quote in any given tone.
###
Description: Deny allegations of corporate espionage. The tone should be aggressive.
Quote: "These allegations are completely false and only serve to distract from the greater good of this corporation. I've been working for this company since day one, and I will continue to work for this company until the day I die. The accusations made are baseless and hurtful to both me and my family."
###
Description: Respond to questions about the future of the company. The tone should be friendly.
Quote: "We are always looking to innovate and make this company better for both our shareholders and consumers. We are currently exploring new opportunities in the healthcare industry, but can not comment on any specifics at this time."
###
Description: The death of mineworkers in one of the company's mines. The tone should be sad.
Quote: "We are deeply saddened by the loss of life in our mine. We are working closely with the authorities to understand what went wrong and to ensure that it never happens again."
###
Description: Questions about the company's latest product launch. The tone should be confident.
Quote: "I am happy to announce that our latest product launch, the XB-1, was an outstanding success. The product has exceeded our expectations in terms of sales, and we are confident that it will continue to do so."
###
Description: A warning about a rival company's business practices. The tone should be cautious.
Quote: "We are concerned about the business practices of the rival company. We have been informed that the rival company is engaging in a number of activities that are contrary to our values and our principles. We are concerned about the company's future and we will continue to work with the company to ensure that it does not continue to engage in these activities."
###
Description: A review of the new film "Arrival". The tone should be enthusiastic.
Quote: "Arrival is brilliantly thought-provoking and suspenseful, and I recommend it for anyone looking to be challenged."
###
Tone:`,

    lastToken: "\nQuote: ",
    temperature: 1.0,
    max_tokens: 60,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['###'],
},
};
module.exports = {
  quoteDavinciEnginParams,
};
