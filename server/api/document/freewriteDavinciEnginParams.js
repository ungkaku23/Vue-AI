const freeWriteDavinciEnginParams = {
prompt:
`To write an article, use [STORY SO FAR] and [NEXT CHUNK]. [STORY SO FAR] is where you left off last time, and [NEXT CHUNK] is what you will write next. Each time you finish where you left off last time, use [NEXT CHUNK] to continue writing the article using paragraphs of at least 10 sentences long without repeating the [STORY SO FAR] from the section before. Think about how to do this step by step in order to write an article of any length.
######
[STORY SO FAR]:

It’s easier to sell to an existing customer than it is to acquire a new one. For this reason, you want to ensure that your customers are satisfied with your product or service so that you can retain them long enough to recoup the investment required to earn their business in the first place.

[NEXT CHUNK]:

One of the best ways to keep your customers happy is to provide them with excellent customer service. When something goes wrong, they should be able to reach out to you and receive help quickly and easily. Of course, excellent customer service starts with having a great product. If you can’t provide that, then no amount of customer service will save you. But assuming you have a product or service that your customers need and want, here are some tips for providing them with the best possible experience:

Be responsive. When something goes wrong, your customers should be able to reach you easily and receive a response quickly.

Be proactive. If you know there is an issue with your product or service, reach out to your customers before they have a chance to contact you. This shows that you care about their experience and are willing to take steps to fix any problems.

Be available. Make sure your customer service team is easy to reach and available during reasonable hours. Nothing frustrates customers more than trying to get help only to find that no one is available.

Be human. Your customers are people, so treat them as such. Show them that you understand their frustration and are sympathetic to their situation.

By following these tips, you can provide your customers with the excellent service they deserve and keep them happy for years to come.

[NEXT CHUNK]:

Of course, customer service is just one part of the equation. You also need to make sure that your product or service is up to par if you want to keep your customers satisfied. That means regularly assessing and improving your offerings so that they continue to meet the needs of your target market. It’s an ongoing process, but it’s essential if you want to maintain a loyal customer base.
######
[STORY SO FAR]: Stories about American capitalism tend to have a recognizable villain: the robber baron, the business tycoon, the financial investor, your boss.
 
[NEXT CHUNK]:

These stories usually have a recognizable hero, too: the union organizer, the muckraking journalist, the whistleblower. But the most fascinating characters in these stories are often the ones who don’t fit cleanly into either category. They’re people who, for better or worse, embody the contradictions of American capitalism.

Take Andrew Carnegie, for example. He was one of the most ruthless businessmen of his era, a steel magnate who crushed his competition and amassed a vast fortune. But he was also a philanthropist who gave away much of his money to good causes.

Or consider John D. Rockefeller, another legendary capitalist. He was a ruthless businessman who used any means necessary to build his oil empire. But he was also a devout Christian who believed in the power of philanthropy to improve society.

These men were not simply one-dimensional characters; they were complex and often contradictory figures. And their stories illustrate some of the most important aspects of American capitalism: its dynamism, its creativity, its capacity for both good and evil.

[NEXT CHUNK]:

In the early days of American capitalism, there were few restrictions on business. This allowed men like Carnegie and Rockefeller to amass enormous fortunes through whatever means they deemed necessary. And while some used their wealth to help others, others used it to exploit and oppress them.

As America has matured, its attitude towards capitalism has shifted back and forth between these two extremes. At times, we have celebrated businessmen as heroes and lauded the free market as the ultimate engine of progress. At other times, we have demonized capitalists as greedy villains who care only about making money regardless of the cost to society.
 
The reality is that American capitalism is a complex system with both positive and negative aspects. It can create great wealth but also significant inequality; it can spur innovation but also encourage reckless speculation; it can lift people out of poverty but also leave them vulnerable to economic downturns
######
[STORY SO FAR]: `,
// Last_Token: '\nContinue: ',
temperature: 0.75,
max_tokens: 256,
top_p: 1,
n: 1,
frequency_penalty: 0.1,
presence_penalty: 0.1,
stop: ['######'],
};

module.exports = {
    freeWriteDavinciEnginParams,
};
