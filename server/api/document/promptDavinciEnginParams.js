const promptDavinciEnginParams = {
  rewrite: {
    prompt: `Rephrase the passage by changing a few words. Details can be removed or expanded. Active voice can be replaced with passive voice. Words can be replaced by their synonyms. The sentence order can also be changed.
    ######
    Passage: Governments' failure to act on climate change will be discussed by world leaders during the upcoming UN Climate Change Conference in Bali, Indonesia in December. 
    Rephrase: During the upcoming UN Climate Change Conference, governments will discuss their failure to act on climate change.
    ######
    Passage: The UN Climate Change Conference in Bali, Indonesia, will be discussing the governments' failure to act on climate change.
    Rephrase: The UN Climate Change Conference in Bali, Indonesia will discuss how governments have failed to act on climate change.
    ######
    Passage: Former national senior women’s football team head coach Vin Blaine returns to the national set-up and will take charge of the Reggae Girlz’s FIFA Women’s World Cup qualification campaign
    Rephrase: Vin Blaine, the former national senior women’s football team head coach, will return to the national set-up to take charge of the Reggae Girlz’s FIFA Women’s World Cup qualification campaign.
    ######
    Passage: The Caribbean Community (CARICOM) and Cuba observed the 49th anniversary of diplomatic relations on Wednesday with the regional integration grouping reiterating its unwavering commitment to the further strengthening and enhancement of the bonds of friendship, cooperation and solidarity which unite us.
    Rephrase: The Caribbean Community (CARICOM) and Cuba observed the 49th anniversary of diplomatic relations on Wednesday by reiterating their commitment to strengthening the bonds of friendship, cooperation and solidarity.
    ######
    Passage: Once you’ve met your most basic needs, riches won't help you feel better about yourself.
    Rephrase: Riches won't help you feel better about yourself once you've met your most basic needs.
    ######
    Passage: Spielberg is an expert at the careful choreography of camera blocking; his gift for legibly communicating complicated sequences of movement on a massive scale is second to none
    Rephrase: Spielberg is an expert at camera blocking, which is the careful choreography of movement on a massive scale. His gift for legibly communicating complicated sequences is second to none.
    ######
    Passage: `,
    lastToken: '\n>> Rephrase: ',
    temperature: 0.9,
    max_tokens: 50,
    top_p: 1,
    n: 1,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },
  expand: {
    prompt: `When given a prompt, continue the train of thought up to 200 words.
    ######
    >> Prompt: An Australian family returns from abroad after 583 days. Here's what happened:  
    >> Keywords: family, australia, travel
    >> Output: The family had been living in Sydney for almost two years when they got the news. Their youngest daughter was born there, and their son had just started school. They loved Australia, but they missed home. So when their visas expired, they packed up their things and flew back to the United States.It was a long flight, and they were all exhausted by the time they arrived in Los Angeles. They went through customs and got their luggage, and then they hailed a cab to take them to their new home. The family was excited to be back in the States, but they quickly realized that things had changed while they were gone. They didn't know anyone anymore, and their old friends had all moved on with their lives. It was going to be hard starting over again, but they were determined to make it work. After a few months, the family was settled into their new life. They had made new friends and were starting to feel at home again. They were happy to be back in the States, and they knew that they would never take their freedom for granted again.
    ######
    >> Prompt: `, 
    temperature: 0.98,
    max_tokens: 250,
    top_p: 1,
    n: 1,
    frequency_penalty: 1.33,
    presence_penalty: 1.36,
    stop: ['######'],
  },

  shorten: {
    prompt: `Compress the paragraph into a concise summary:
    ######
    Paragraph: "In the age of outsourcing, companies have to look outside their core business for renewable power sources and emissions offsets. Now that the private sector is beginning to commit to cutting emissions, and increasing the speed of future investment in clean energy, the government needs to set carbon emission standards. We can prevent this crisis entirely by acting now", said Lorem.
    Summary: Lorem suggested that the crisis can be averted if emissions are cut, clean energy investments are made, and carbon emissions standards are set.
    ######
    Paragraph: Ipsul has established an investor relations consultancy, Generation Inc., in which he serves as chairman. As its founding partner, Ipsul will help private companies understand their unique assets and markets while preserving a culture of innovation. The consultancy will also establish sustainable revenue, earnings and resource relationships.
    Summary: Ipsul has established a company to help private companies innovate and establish sustainable revenue. 
    ######
    Paragraph: He has long been an advocate of sustainable business practices, founding the first-ever environmental law firm in the country in 1971. In the early days of his career, Ipsul pioneered the use of solar and wind power to help companies reduce their carbon footprints.
    Summary: He is a pioneer in solar and wind power and has been an advocate of sustainable business practices for many years.
    ######
    Paragraph: Beta also commented on the government's recent decision to repeal the Clean Power Plan, calling it "a huge mistake."
    Summary: Beta called the government's decision to repeal the Clean Power Plan a mistake.
    ######
    Paragraph: `,
    lastToken: '\nSummary: ',
    temperature: 0.9,
    max_tokens:  50,
    top_p: 1,
    n: 1,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ['######'],
  },
};

module.exports = {
  promptDavinciEnginParams,
};
