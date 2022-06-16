const KEY_MESSAGES = 'key-messages';
const TALKING_POINTS = 'talking-points';
const MEDIA_STATEMENT = 'media-statement';
const BRAND_STORY = 'brand-story';
const MISSION_STATEMENT = 'mission-statement';
const CRISIS_RESPONSE   = 'crisis-response';
const POSITIONING_STATEMENT = 'positioning-statement';
const MARKETING_ANGLE = 'marketing-angle';
const APOLOGY = 'apology';
const VALUE_PROPOSITION = 'value-proposition';
const BRAND_ESSENCE = 'brand-essence';
const VISION_STATEMENT = 'vision-statement';
const PRESS_RELEASE = 'press-release';
const ELEVATOR_PITCH = 'elevator-pitch';
const NEWS_HOOK = 'news-hook';
const PROFILE_SUMMARY = "profile-summary";

const messageDavinciEnginParams = {
  [KEY_MESSAGES]: {
    prompt: `Key messages act as a foundation for all communications. Whenever you communicate, you want all your audiences to understand the same basic messages. While each person might remember different details of your communication, they should be able to sum up what’s being said in one or two sentences. Key messages contain the main points of information you want your audience to hear, understand, and remember. They are bite-sized summations that articulate what you do, why you do it, how you are different, and what value you bring to stakeholders. Key messages clarify meaning and provide the takeaway headline of the issue you want to communicate. Key messages are important because they serve as the foundation of an organization’s branding and marketing efforts and should be reflected in all written and spoken communications. Communications cannot always be controlled, but key messages can. They help you to: Prioritize and define information: Esure consistency, continuity and accuracy; Measure and track success; and Stay focused when speaking with the media or stakeholders. Concise: Focus on three to five key messages per topic; write one to three sentences for each key message; should be read or spoken in 30 seconds or less. Strategic: Define, differentiate, and address benefits. Relevant: Balance what you need to communicate with what your audience needs to know. Compelling: Design meaningful information to stimulate action. Simple: Use easy-to-understand language; avoid jargon and acronyms. Memorable: Ensure that messages are easy to recall and repeat; avoid long, run-on sentences. Real: Use active voice, not passive; do not use advertising slogans. Tailored: Communicate effectively with different target audiences by adapting language and depth of information. When given a description of a company, and a target audience, write key messages.
Description: 3M is a global science company that never stops inventing. Using 46 technology platforms, our integrated team of scientists and researchers works with customers to create breakthroughs. Our inventions have improved daily life for hundreds of millions of people all over the world.
Key Messages:
1: 3M is a diversified technology company
2: 3M applies innovation systematically to anticipate and respond to customer needs
3: Practical and ingenious solutions are a strong part of 3M’s legacy. 
4: 3M is a global company with local presence throughout the world.
5: 3M consistently fulfils its commitment to investors, customers, employees and communities. 
6: 3M fosters a culture of leadership at all levels.
7: 3M can be trusted to do the right thing 
######
Description: Inuit, a technology company committed to solving customer’s toughest problems through the development of innovative precision temperature measurement devices
Key Messages: 
1: Inuit is a global technology company committed to solving customer’s toughest problems 
2: Inuit develops innovative technology solutions that are critical to customer success 
3: Inuit’s solutions are used in both off grid and grid connected applications where high performance, precision, long operating life, durability, and versatility are required 
4: Inuit serves customers worldwide, but is deeply committed to the needs of those in the oil and gas industry 
5: Inuit is a participant in the R&D program of the National Energy Sector Framework.
6: Inuit is a technology company with a focus on executing, adapting, and leading innovation to address customer needs
######
Description: Rainforest Alliance is a 501(c)(3) nonprofit organization that connects consumers to products that have been grown responsibly 
Key Messages: 
1: The Rainforest Alliance connects responsible producers to responsible consumers by offering responsible labeling services 
2: The Rainforest Alliance believes that small, well-managed forests are the backbone of life on earth
3: The Rainforest Alliance is working to transform the multi-trillion dollar forest economy—one of the biggest economic sectors on earth—to one that is sustainable for people and the planet
4: The Rainforest Alliance’s work is led by a forward-thinking global team and supported by a robust network of certified forest and footwear companies and producers 
5: The Rainforest Alliance depends on the generous support of people like you to help us grow our impact in communities around the world
######
Description: `,
    lastToken: '\nKey Messages: \n',
    temperature: 0.75,
    max_tokens: 180,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },
  
  [MEDIA_STATEMENT]: {
    prompt: `A media statement is a formal statement to the media in response to a story. Media statements are frequently issued by government departments, politicians, celebrities, sportspeople, and other public figures in response to news articles. When given a description, write a media statement.
######
Description: Statement by Joe Football About His Trade to the Giants 
Statement: Playing for the Giants is a dream come true for me. The Giants are a good fit for my skills, and it's a pleasure to find a home here. I met with the coaches and players this morning and they're excited to have me on the team. The doctor has said that my shoulder has healed up fine, and I'm not worried about losing any time due to injury this year. I feel good about our chances to make the playoffs this season and take a shot at another Super Bowl.
######
Description: Statement by Jane Politician about her decision to run for President of the United States
Statement: I'm excited to announce that I'm running for President of the United States. My belief in the goodness of the American people has never been stronger, and it's my hope that they'll find a new voice in me as President. My opponent has been in office for the past 8 years, and I believe it is time for a change. It is my intention to be honest with the voters about my ideas and what they mean for the country. I want to be a President for the people, not a politician. 
######
Description: Statement by Bob Businessman about his company's decision to close down the business and lay off 500 workers
Statement: Due to the difficult economic times, we've made the difficult decision to close down the business and lay off 500 workers. I'm proud of the business we've built and the contribution we've made to the community, and I regret that closing our doors means that we'll no longer be able to employ the many people who've worked here over the years. We'll be working with those employees who are being laid off to help them find new jobs as quickly as possible.
######
Description: Statement by Jane Celebrity about her decision to retire
Statement: I've decided to retire from my singing career. I've had a wonderful career and I'm very grateful to the fans who've supported me. I'm proud to have made the contributions I've made to the music industry, and I'm confident that I'll be remembered as one of the greats. I feel lucky to have found success in my work and in my personal life, and I'm ready for this next chapter.
######
Description: `,
    lastToken: '\nStatement: \n',
    temperature: 0.75,
    max_tokens: 100,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

  [BRAND_STORY]: {
    prompt: `A brand story is a sales pitch for a company. When given a product name and description, write a compelling brand story.
######
Product: Warby Parker is an EyeWear Company
Brand Story: Warby Parker was founded with a mission: to inspire and impact the world with vision, purpose, and style. We're constantly asking ourselves how we can do more and make a greater impact—and that starts by reimagining everything that a company and industry can be. We want to demonstrate that a business can scale, be profitable, and do good in the world—without charging a premium for it. And we've learned that it takes creativity, empathy, and innovation to achieve that goal.
######
Product: TOM'S is a Shoe Company
Brand Story: We’ve always been in business to improve lives. TOMS founder Blake Mycoskie pioneered the One for One® model. Since then, our community has had a positive impact on over 100,000,000 lives. Today, we commit 1/3 of our profits for grassroots good, supporting people building equity at the local level, and driving progress from the ground up. That’s why our shoes are really something special—especially our classic Alpargata, which we like to think of as the shoe that started it all. Because it doesn’t really matter where you’re going when you’re in your TOMS. You can be sure it’s in the right direction.
######
Product: GoPro is a Camera Company
Brand Story: GoPro helps people capture and share their lives most meaningful experiences with others – to celebrate them together. Like how a day on the mountain with friends is more meaningful than one spent alone, the sharing of our collective experiences makes our lives more fun. The world’s most versatile cameras are what we make. Enabling you to share your life through incredible photos and videos is what we do.
######
Product: Soulcycle is a Fitness Product
Brand Story: We create an alternative to the fitness routines that feel like work. We have developed an inspiring workout that's as efficient as it is joyful — an experience that's the best part of your day, every day, and that transforms your relationship to exercise. Anyone can be an athlete, a rockstar, a warrior... our riders come to us from all backgrounds, levels of fitness, and experience. SoulCycle is for everyone. We could go on and on, but you won’t believe it unless you’ve experienced it yourself. Our community is calling your name, so come in for a ride.... Take your journey. Change your body. Find your Soul.
######
Product: Chipotle is a Tex-Mex restaurant that serves meals with organic ingredients
Brand Story: As a food-focused, people-first company, our mission of Cultivating a Better World means more than just using real ingredients. It means hiring passionate people and investing in their future. It means championing diversity and celebrating inclusion. It means fostering a culture of well-being for our employees and the environment. So whether you grow your career, chase your passion, or just pick up a few skills along the way, we want to help you get a real start.
######
Product: Uber is a car share riding company
Brand Story: Uber seamlessly connects riders to drivers through our apps, we make cities more accessible, opening up more possibilities for riders and more business for drivers.
######
Product:Under Armor is a sports apparel company
Brand Story: Under Armour is the originator of performance apparel, or athletic gear designed to keep athletes “cool, dry and light throughout the course of a game, practice or workout. Under Armour seeks to make all athletes better through passion, design, and the relentless pursuit of innovation.
######
Product:Beats is a manufacturer of premium audio equipment
Brand Story: Beats has introduced an entirely new generation to the possibilities of premium sound entertainment. The brand’s continued success helps bring the energy, emotion, and excitement of playback in the recording studio back to the listening experience for music lovers worldwide.
######
Product: J. Crew is a clothing retailer
Brand Story: J.Crew's story begins in 1978 with a family who cared about staying true to their values, their culture, and their community. These values still guide everything the J.Crew team does from creativity to customer service. We believe there's no better way to be a good neighbor than to hire people from the community. At J.Crew, diverse backgrounds and opinions create a dynamic environment where fresh ideas are heard and embraced.
######
Product: Jermain is a brand of Silk Cashmere Bathrobes
Brand Story: Jermain is the luxury bathrobe brand for those who appreciate the finer things in life. The Jermain range offers a well-tailored selection of luxurious 100% cashmere and silk-cashmere bathrobes and robes, suitable for both men and women. Since the company’s inception, Jermain has been setting a new standard for luxury with a distinctive focus on unparalleled quality, fit, and style. Our expansive range of bathrobes and robes is made from luxurious 100% cashmere and silk-cashmere designs for those who appreciate the finer things in life. Find your way to a more luxurious lifestyle with Jermain, your new destination for the finest in bathrobes and robes. With a distinctive focus on unparalleled quality, fit, and style, our expansive range of bathrobes and robes is made from luxurious 100% cashmere and silk-cashmere designs for those who appreciate the finer things in life. Jermain is the destination for those with a go-getting lifestyle. Our diverse range of high-quality bathrobes and robes is made from luxurious 100% cashmere and silk-cashmere designs, so you can enjoy the benefits of Jermain luxury in the moments before you soak up the spoils of success.
######
Product: `,
    lastToken: '\nBrand Story: \n',
    temperature: 0.75,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

  [NEWS_HOOK]: {
    prompt: `There are two types of words. Picture Words and Connecting Words. A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word you can see, hear, feel or imagine something. There are Picture Words that show us things. Picture Words that show us actions. Picture Words that show us colors. Picture Words that show us size. Picture Words that show us details of other pic­tures. Picture Words that show us feelings. Picture Words that show us judgments. Picture Words that show us ideas. And Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture and helps you transfer that picture from your mind to the mind of someone else. Every time you say one of them, you see some­thing and the person you're talking to also sees that same thing. A Connecting Word is a word that has no built-in picture. When you say a Connecting Word by itself you don't see anything. Words like  "the", "a", "an", and "to" and all the rest, are all considered to be connecting words because they don't create a mental image on their own. The purpose of the Connecting Word is to tell us how the Picture Words are connected in time, space, meaning, or sequence. When you put these two types of words together, you can create new pictures and new meanings. You can write anything. You can write a short, attention-grabbing news hook that captures the attention and interest of both the news media and their audiences.
    ######
Context: Give me a hook for a story about the prevalence of imported hair from Asia, and what one black entrepreneur is doing to make this synthetic hair in America
News Hook: Daring to be different, one black entrepreneur is fighting against the grain by manufacturing synthetic hair in America instead of importing it from Asia.
######
Context: Give me a hook for a story about how different families celebrate Thanksgiving
News Hook: From turkey to stuffing, pumpkin pie to cranberry sauce, each family has its unique way of celebrating Thanksgiving. This year, get a behind-the-scenes look at how four different families across the country will be spending the holiday.
######
Context: Give me a hook for a story about the challenges of parenting a child with ADHD
News Hook: Parenting can be tough, but when you add in a child with ADHD it can feel impossible some days. This candid account from one mother details the challenges and rewards that come along with raising a spirited little one.
######
Context: Give me a hook for a story about Acme, a new company that has just created the world's first invisible cloak
News Hook: Making the impossible a reality, Acme introduces its groundbreaking new invention – the world's first invisible cloak. See how this life-changing technology is being used and what the future holds for those who now have access to it.
Context: `,
lastToken: '\nNewsHook:"',
temperature: 1.0,
max_tokens: 90,
top_p: 1,
n: 10,
frequency_penalty: 1.5,
presence_penalty: 1.5,
stop: ['######'],
},

  [ELEVATOR_PITCH]: {
    prompt: `The best elevator pitches are emotionally driven. Short and sweet. Savvy with stats. Tell a story. End with a poweful one-liner. Think about this step by step, and when I give you a product description, give me the best elevator pitch ever.
   ######
   Product: Project Management Software
   Elevator Pitch: Over one-quarter (26%) of all deadlines are missed each week because of a lack of clarity. But with the right project management tools, that number could be much lower. So the question is, can your business afford not to use project management software? 
   ######
   Product: Project Management Software
   Elevator Pitch: Did you know that despite having more ways to connect remotely, 60% of workers’ time is spent on work coordination with just 26% spent on skilled work and 14% on strategy? No wonder teams need help with project management. Implementing project management tools can decrease time spent on work coordination and help increase skilled work.
   ######
   Product: A company that sells vegan dishes inspired by Africa
   Elevator Pitch: A vegan diet is good for the environment, and it can also be healthy. Our dishes are inspired by Africa, where diets are mostly plant-based and often include fresh fruits and vegetables. We want to introduce people to this kind of cuisine, which is both nutritious and delicious.
   ######
   Product: A company that sells used cans for recycling
   Elevator Pitch: In the United States, 40% of all waste ends up in landfills. That’s a lot of unnecessary pollution! Can you think of something less wasteful than recycling used cans? Not only does it reduce greenhouse gas emissions, but also using recycled cans helps preserve precious resources like energy and metals.
   ######
   Product:`,
   lastToken: "\nElevator Pitch:",
   temperature: 0.95,
   max_tokens: 185,
   top_p: 1,
   n: 10,
   frequency_penalty: 0.5,
   presence_penalty: 0.5,
   stop: ["######"],
   },

  [BRAND_ESSENCE]: {
    prompt: `The brand essence is a single thought, typically expressed in 3-5 words that captures the soul of the brand; the brand's fundamental nature or quality. When given the description of a brand, write the brand's essence.
    ######
    Brand: Disneyland is an amusement park in Anaheim, California
    Brand Essence: Magical Fun
    ######
    Brand: Starbucks Corporation is an American multinational chain of coffeehouses and roastery reserves. It is the world's largest coffeehouse chain.
    Brand Essence: Rewarding Everyday Moments
    ######
    Brand: McDonald's is an American multinational fast food corporation, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States
    Brand Essence:  Food , Folks & Fun
    ######
    Brand: Antler is a commercial space travel company
    Brand Essence: Adventurous Exploration
    ######
    Brand: `,
    lastToken: '\nBrand Essence: \n',
    temperature: 1.0,
    max_tokens: 8,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],

  },
  
  [APOLOGY]: {
    prompt: `These are the Elements of a Good Company Apology: Humility, Taking full responsibility, Assurance of lessons learned, Assurance of future correction, Offering of amends, Assurance of change, Assurance of more information, A pledge to do better, Assurance that company will live up to commitments, An assurance of prompt response if there are more questions, Framing the apology as an act of respect for the people involved, An offer of empathy, An offer of help if the customer needs it. When provided with a description, write a company apology.
######
Description: Apologize for opening your store late, and inconveniencing customers
Apology: We are sorry to have inconvenienced you this morning by opening late. When we were nearing opening time, we received word that there was a power outage at the location where I normally open. It was an unfortunate circumstance, but we knew the seriousness of the issue and acted accordingly.This is a serious issue and we are deeply sorry that you were inconvenienced because of it.
We were able to open at 11:30, but I'm sorry that it wasn't sooner. We took every precaution to make sure that this didn't happen again, and we hope that you will give us another opportunity to serve you.
Thank you for understanding.
######
Description: Apologize for two 737 Max jet crashes, one in October 2018 and one in March 2019, that together killed 346 passengers and crew.
Apology:First, we would like to express our deepest condolences to the families and friends of all those who were lost in the accidents.I would like to personally apologize for any mistrust that has been caused by the Max. We deeply regret any sadness or frustration that it has caused. We are dedicated to investigating the accident and working towards preventing future accidents like it.
While we still don't know what caused the crashes, we are committed to finding the answer.We are also initiating an accelerated software update to the airplane's system that will ensure that the plane's angle of attack will be properly monitored.
We would like to apologize to our customers, our employees, and our partners for any of the inconvenience this may have caused. We will continue to update you on our progress.
We are committed to doing better.
######
Description: A construction company was hired to work on a customer's property. The customer was dissatisfied with the quality of the work and is requesting for the company to fix the issue.
Apology: We are sorry to hear that the work was not up to your standards, and that you are requesting a refund. The company did not provide you with a service that you expected.We understand that the agreement was for a certain time frame, and that the work was not completed in that time frame. The issue was not addressed in the timeframe, and the scope of work was not completed.
We did a quality review to see what we can do to ensure that this problem does not happen again. The company did not give you the service that was expected. We will be doing this type of work in the future, and will be more mindful that it be completed.
We hope that you will allow us to fix the issue.
######
Description: A customer has a question about a specific policy and was not satisfied by the answer.
Apology: We are sorry to hear that the answer was not what you were looking for. We pride ourselves in helping to make sure that all of our customers are taken care of.
We didn't properly address your questions, and apologize if you felt that way. We would be happy to answer your questions to make sure that you are satisfied. It was not our intention to make you feel left out, and we are sorry that this was your experience.
We are here to help.
######
Description: `,
    lastToken: '\nApology: \n',
    temperature: 0.75,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

  [PROFILE_SUMMARY]: {
    prompt: `A Profile Summary gives an interesting and engaging overview of a person's professional life and accomplishments. When given a job title, write a Profile Summary.
######
Job Title: Professional Writer
Profile Summary: I live in a world of words. I'm a professional writer and copyeditor with a penchant for anything from cooking to knitting to kung fu. I love to plot, develop rich characters, and work to build emotional tension. I excel in the art of crafting a gripping plot with a plot twist, a climax, or a satisfying conclusion. I have a diverse range of interests and a love for literature, both modern and classic. I enjoy finding new perspectives on topics and I'm a compulsive learner. Writing is my passion. I love to delve deep into research and work to create new worlds or explore the complexities of contemporary society. I spend my free time reading, writing, and playing with my daughter.
######
Job Title: Elephant Trainer
Profile Summary: I'm the elephant trainer at the circus. I start each day with some gentle brushing, some breakfast, and some banter with old friends. I spend my days walking, training, and trying new games with some of the most intelligent creatures on the planet. Training is my passion, I love nothing more than to watch an elephant learn a new skill or watch them figure out the solution to a problem. I'm constantly learning new ways to train, I learn from my elephants, I learn from other trainers, and I love to read books about the subject. I'm also a passionate reader of all things science, philosophy, and psychology. I'm always on the lookout for new books. I read for myself, but I also read to my elephants. I'm always looking for new tricks to try with them, new skills to teach, or new perspectives on the world. 
######
Job Title: Communications Director of a Religious Non-profit
Profile Summary: A Communications Director is responsible for managing the public image of an organization, company, or person. I'm responsible for the development of media content - promotional, advertising, and informational. I'm also responsible for the development of written communications, including press releases, speeches, and presentations. I love to do research, brainstorm for new ideas, and find new perspectives on topics. I'm constantly reading, thinking, and talking about media, public relations, and communications. I'm also a blogger, a passionate reader, and a seeker of new perspectives.
######
Job Title: `,
    keyword: "Job Title: ",
    lastToken: "\nProfile Summary: ",
    temperature: 0.85,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

[PRESS_RELEASE]: {
  prompt: `A good press release is short and to the point. You should include a concise, attention-grabbing headline; 1-2 paragraphs of context or background information; and 1-2 paragraphs with quotes from people involved in the story. You should also include contact information for someone that reporters can reach out to for more information. When given a context  write a press release
  ######
  Context: The World Travel & Tourism Council reveals a massive increase in global international inbound travel
  Press Release: "The World Travel & Tourism Council reveals a massive increase in global international inbound travel" [Location], [Date], [Publisher] --  The World Travel & Tourism Council (WTTC) and its knowledge partner ForwardKeys have forecast a major increase in global international flights bookings as international travel takes off.
  
  The booking bounce back was revealed at WTTC's prestigious 21st Global Summit, taking place this year in Manila, as the world continues to reopen from the pandemic. News of the strong recovery highlights a promising prospect ahead for summer holiday travel, with sun and sea destinations, such as the Caribbean and Latin America, leading the international inbound bookings.
  
  According to ForwardKeys, a leading travel and analytics company, the countries leading the ranking of top 20 best-performing destinations for the summer are Costa Rica, Aruba, Dominican Republic, and Jamaica, all of which rely heavily upon international travel. These destinations lead the pack with bookings already surpassing pre-pandemic levels.
  
  Last year, the industry's gradual recovery was significantly slowed by the surge in Omicron cases. However, the future is looking brighter for 2022 with positive booking data worldwide. Julia Simpson, WTTC President & CEO said: "WTTC 2022 booking data from ForwardKeys is a firm signal of the strong recovery of the global Travel & Tourism sector."
  ######
  Rewrite the above press release in 350 words or less:
  
  The World Travel & Tourism Council (WTTC) and its knowledge partner ForwardKeys have forecast a major increase in global international flights bookings as international travel takes off.
  
  The booking bounce back was revealed at WTTC's prestigious 21st Global Summit, taking place this year in Manila, as the world continues to reopen from the pandemic. News of the strong recovery highlights a promising prospect ahead for summer holiday travel, with sun and sea destinations, such as the Caribbean and Latin America, leading the international inbound bookings.
  
  According to ForwardKeys, a leading travel and analytics company, the countries leading the ranking of top 20 best-performing destinations for the summer are Costa Rica, Aruba, Dominican Republic, and Jamaica, all of which rely heavily upon international travel. These destinations lead the pack with bookings already surpassing pre-pandemic levels.
  
  Last year, the industry's gradual recovery was significantly slowed by the surge in Omicron cases. However, the future is looking brighter for 2022 with positive booking data worldwide. Julia Simpson, WTTC President & CEO said: "WTTC 2022 booking data from ForwardKeys is a firm signal of the strong recovery of the global Travel & Tourism sector."
  ######
  Context: `,
    lastToken: '\nPress Release: \n',
    temperature: 0.75,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 0.9,
    stop: ['######'],
  },
  
[TALKING_POINTS]: {
  prompt: `Talking points are often used to prepare for a public speech or an interview. The goal of using talking points is to get your point across very quickly, using the fewest possible words. The best talking points are short and concise. To come up with great talking points you must determine the purpose of your talking points, then create two to five main talking points that support your purpose. Your talking points may include a personal story, the win-win benefit of your suggestions, how your argument supports the values, mission, and vision of the organization or group, or any relevant statistics that will make your argument more compelling. When given a brief description, come up with a list of clear, compelling talking points.
######
Description: Company X should implement a flexible work program
Talking Points:
1) Companies that offer flexible work programs see higher levels of employee satisfaction and retention, which can result in higher productivity and reduced turnover
2) A flexible work program can improve the quality of life for employees, their family members, and the community
3) A flexible work program can be beneficial for employees with  giving caregiver responsibilities
4) A flexible work program can be beneficial for employees with health conditions
######
Description: Candidate X is the best person to be Mayor of New York City
Talking Points:
1) Candidate X is the only candidate with the experience needed to be Mayor of New York City
2) Candidate X has the best qualifications of the candidates running for Mayor
3) Candidate X has the leadership skills it takes to be Mayor of New York City
4) Candidate X has the communication skills it takes to get the job done
5) Candidate X has the support of important figures in the community
######
Description: Moving from Coal to Renewable Energy is a bad idea
Talking Points:
1) Moving to renewable energy would cause the price of energy to increase
2) Moving to renewable energy would not solve climate change
3) Comparing renewable energy to coal, coal has more energy density
4) The cost of storage needed to move to renewable energy would increase
######
Description: Tidal is a music streaming service that rivals Spotify, Apple, and YouTube Music
Talking Points:
1) Tidal does not stream in an ad-supported model. It's $9.99 for a high-quality music streaming service
2) Tidal presents high-quality music streaming in a simple and intuitive way
3) Tidal features a 60 percent larger library than Spotify
4) Tidal has better sound quality
5) Tidal has more exclusive albums
######
Description: `,
    lastToken: '\nTalking Points: \n',
    temperature: 0.85,
    max_tokens: 100,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

  [MISSION_STATEMENT]: {
    prompt: `When given the name and description of a company, write an inspiring company mission statement.
######
Company: Amazon
Mission: It's our goal to be Earth's most customer-centric company, where customers can find and discover anything they might want to buy online.
######
Company: Chanel
Mission: To be the Ultimate House of Luxury defining style and creating desire, now and forever.
######
Company: Coca-Cola
Mission: To refresh the world in mind, body and spot. To inspire moments of optimism and happiness through our brands and actions. To create value and make a difference.
######
Company: Facebook
Mission: Facebook's mission is to give people the power to share and make the world more open and connected.
######
Company: Google
Mission: Google's mission is to organise the world's information and make it universally accessible and useful.
######
Company: Ebay
Mission: Provide a global trading platform where practically anyone can trade practically anything.
######
Company: Ford
Mission: We go further to make our cars better, our employees happier and our planet a better place to be.
######
Company: Intel
Mission: Delight our customers, employees and shareholders by relentlessly delivering the platform and technology advancements that become essential to the way we work and live.
######
Company: McDonalds
Mission: McDonald's brand mission is to be our customers' favorite place and way to eat and drink.
######
Company: MicroSoft
Mission: Our mission is to enable people and businesses throughout the world to realize their full potential. We consider our mission statement a commitment to our customers. We deliver on that commitment by striving in create technology that is accessible to everyone-of all ages and abilities.
######
Company: Nike
Mission: To bring inspiration and innovation to every athlete in the world. If you have a body, you are an athlete.
######
Company: Nordstrom
Mission: Offer the customer the best possible service, selection, quality, and value.
######
Company: Toyota
Mission: Toyota will lead the way to the future of mobility, enriching lives around the world with the safest and most responsible ways of moving people.
######
Company: Virgin Atlantic
Mission: Our main statement is simple, yet the foundation of everything we do here at Virgin Atlantic Airways... to embrace the human spirit and let it fly.
######
Company: Twitter
Mission: To give everyone the power to create and share ideas and information instantly, without barriers.
######
Company: Whole Foods
Mission: With great courage, integrity and love-we embrace our responsibility to co-create a world where each of us, out communities, and our planet cam flourish all the while, celebrating the sheer love and joy of food.
######
Company: `,
    lastToken: '\nMission: \n',
    temperature: 0.75,
    max_tokens: 69,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

  [POSITIONING_STATEMENT]: {
    prompt: `A positioning statement is a description of your product and target audience and explains how it fills a market need. Marketing and sales teams use this statement to guide their messaging and make sure all communication is consistent. The following are examples of excellent positioning statements.
######
Description: HubSpot is a developer and marketer of software products for inbound marketing, sales, and customer service.
Positioning Statement: Since 2006, HubSpot has been on a mission to make the world more inbound. Today, over 100,000 total customers in more than 100 countries use HubSpot's award-winning software, services, and support to transform the way they attract, engage, and delight customers. Comprised of HubSpot's CRM, Marketing Hub, Sales Hub, and Service Hub, HubSpot gives companies the tools they need to Grow Better.
######
Description: White Dog Distilling is a Rhode Island based small batch craft distiller specializing in aged and unaged whiskey, gin and rum.
Positioning Statement: White Dog Distilling was founded in 2016 by the husband/wife team of Carlo and Alecia Catucci based on passion, spirit, and the journey from grain to glass. Bolstered by Carlo's background in physics and Alecia's culinary and product development experience, they set forth with one goal in mind: to produce high-quality distilled spirits that could appeal to both novice spirit drinkers and longtime aficionados alike.
######
Description:Alaska Airlines is the fifth largest airline in the United States when measured by fleet size, scheduled passengers carried, and the number of destinations served. 
Positioning Statement: Alaska Airlines is guided by our core values of “own safety”, “do the right thing”, “be kind-hearted”, “deliver performance”, and “be remarkable at work and in our communities.” Alaska Airlines also fosters a diverse and inclusive culture and is an Equal Opportunity Employer.
######
Description: Amazon.com is an American multinational technology company which focuses on e-commerce
Positioning Statement: For consumers who want to purchase a wide range of products online with quick delivery, Amazon provides a one-stop online shopping site. Amazon sets itself apart from other online retailers with its customer obsession, passion for innovation, and commitment to operational excellence.
######
Description: Betterment is an American financial advisory company which provides robo-advising and cash management services
Positioning Statement: Betterment is a fast-growing online investment advisor focused on helping people grow their money through low fees, personalized advice, and the smartest technology available.
######
Description: Facebook is an American for-profit corporation and an online social media and social networking service based in Menlo Park, California.
Positioning Statement: Facebook is a social utility that connects people with friends and others who work, study and live around them. People use Facebook to stay connected with friends and family, to discover what’s going on in the world, and to share and express what matters to them.
######
Description: `,
    lastToken: '\nPositioning Statement: \n',
    temperature: 0.85,
    max_tokens: 65,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

  [CRISIS_RESPONSE]: {
    prompt: `The best way to handle a PR crisis is to describe it in plain language and then develop a step-by-step response plan. When dealing with a hard crisis, you must be aware of the different response options available to you. The following are some great examples of PR crises and how they were handled.
    ######
Crisis: Seven people who had taken Tylenol died from poisoning due to bottle tampering. 
Response: 
1. Immediately run advertisements to alert consumers not to take their product. 
2. Stop production and order a national withdrawal. 
3. Design a triple-lock tamper-resistant container. 
4. Issue a public apology.
5. Support and educate victims' families.
######
Crisis: A company CEO has been accused of sexual assault
Response: 
1. Issue a public statement apologizing and reiterating a zero-tolerance policy for sexual assault in the workplace.
2. Offer a severance package to the accuser.
3. Remove the CEO from any executive committees or board positions.
4. Appoint an independent board of directors to investigate the incident.
5. Review the company's policies on harassment. 
6. Review the company's human resources practices. 
######
Crisis: A company president has been arrested for embezzlement
Response:
1. Immediately suspend the president's duties. 
2. Turn over all the details to the state-level investigators. 
3. Keep the public informed of the president's contact with investigators.
4. Refrain from making any statements to the press.
######
Crisis: The company's computer system has experienced a data breach compromising 100,000 customer accounts.
Response:
1. Place the company's websites under lockdown.
2. Conduct an expedited investigation into the cause of the breach.
3. Immediately notify the customers who have been compromised.
4. Provide customers with account protection services.
5. Mount an immediate email campaign to warn customers of the breach.
6. Educate customers on how to protect themselves. 
######
Crisis:`,
    lastToken: '\nResponse: \n',
    temperature: 0.75,
    max_tokens: 100,
    top_p: 1,
    n: 3,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

[VALUE_PROPOSITION]: {
    prompt: `A value proposition is a description of a product or service that is unique and valuable to the customer. The following are some great examples of value propositions.
    ######
Product Description: Dollar Shave Club delivers razors and other personal grooming products to customers by mail. It delivers razor blades on a monthly basis and offers additional grooming products for home delivery.
Value Proposition: A great shave for a few bucks a month.
######
Product Description: Netflix is a subscription-based streaming service that allows our members to watch TV shows and movies without commercials on an internet-connected device.
Value Proposition: Watch anywhere. Cancel anytime. 
######
Product Description: The MacBook is a line of Macintosh Laptop computers designed by Apple
Value Proposition: Light. Years Ahead.
######
Product Description: Stripe is an online payment processing for internet businesses.
Value Proposition: Payments infrastructure for the internet.
######
Product Description: Bright.com is a company that lets you find a job and apply to companies.
Value Proposition: Get a great new job in just a few minutes.
######
Product Description: Dell Store is a specialized retailer of computers and consumer electronics, with a strong presence in North America, Europe, Africa, and the Middle East.
Value Proposition: Make your computer the way you want it.
######
Product Description: 23andMe is a personal genomics and biotechnology company.
Value Proposition: Giving you insight into what makes you, you.
######
Product Description: `,
lastToken: '\nValue Proposition: \n',
temperature: 0.95,
max_tokens: 65,
top_p: 1,
n: 10,
frequency_penalty: 1.5,
presence_penalty: 1.5,
stop: ['######'],
},

[VISION_STATEMENT]: {
  prompt: `Write a vision statement that describes what a company hopes to become and wants to achieve in the future. The following are some great examples of vision statements.
  ######
  Company Description: Amazon is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.
  Vision Statement: Our vision is to be earth's most customer-centric company; to build a place where people can come to find and discover anything they might want to buy online
  ######
  Company Description: Apple is an American multinational technology company that specializes in consumer electronics, software and online services
  Vision Statement: To make the best products on earth and to leave the world better than we found it.
  ######
  Company Description: HelloScribe is an creative writing and brainstorming platform for PR and Marketing powered by Artificial Intelligence.
  Vision Statement: Creating a world where creative thinkers and communicators are empowered to tell their stories with ease, speed and purpose
  ######
  Company Description: Airbnb is an American company that operates an online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities
  Vision Statement: We believe in a world where anyone can belong anywhere.
  ######
  Company Description: Twitter is an online social networking service on which users post and interact with messages known as "tweets". It offers a news service, microblogging service called "TwitLonger", and an audio video streaming service.
  Vision Statement: To give everyone the power to create and share ideas quickly.
  ###### 
Company: `,
lastToken: '\nVision Statement: \n',
temperature: 0.95,
max_tokens: 40,
top_p: 1,
n: 10,
frequency_penalty: 2,
presence_penalty: 2,
stop: ['######'],
},

  [MARKETING_ANGLE]: {
    prompt: `A marketing angle is a unique, special and different way to market a product. It is a way to market a product that sets it apart from all other products.  When given a brief product description, write a marketing angle.
######
Product Description: Hair Today is a brand of Organic Shampoo
Marketing Angle: For those concerned about the environment and the chemicals found in other common brands of shampoo, Hair Today is the answer. We offer a fresh, safe, and hypoallergenic formula that cleans and refreshes hair without leaving behind any residue.
######
Product Description: AutoScrub is a small hand-held device that easily cleans corners and crevices in showers, bathtubs, and sinks.
Marketing Angle: AutoScrub is the perfect cleaning device for those hard-to-reach places. No need for a bulky vacuum or expensive cleaning solutions - this little gadget does the trick!
######
Product Description: Joy of Life is a broadway play about living in a recession
Marketing Angle: Looking to inject a little bit of joy into your life? Look no further than Joy of Life - a hilarious and heartwarming play about living in a recession. With a talented cast and creative direction, this show is sure to leave you feeling optimistic about the future.
######
Product Description: Dash Water is a beverage made from fruit waste
Marketing Angle:  At Dash we judge our ingredients on taste alone - looks never come into it. So while we are fussy about flavour we don’t care if it’s bumped, curved, broken or squashed. We want to do our bit to cut food waste so by saying yes to produce that others say no to, we make drinks that taste delicious and in a small way help raise awareness about the big issue of waste. One bashed up berry, curly cucumber and lopsided lemon at a time.
######
Product  Description: Applied XL empowers decision-makers to navigate the disruption caused by shifts in human health, local infrastructure, and climate change by detecting early signals in data vetted by experts.
Marketing Angle: At Applied XL, we understand that decision-makers are facing an increasingly complex world. That's why we provide expert-vetted data to help you navigate the disruption caused by shifts in human health, local infrastructure, and climate change. With our cutting-edge technology, you can make informed decisions that will help you thrive in the ever-changing landscape.
######
Product Description: SEA is a new category of materials made from seaweed—a regenerative and carbon-sequestering input. It outperforms carbon-intensive paper products and bioplastics
Marketing Angle: SEA is the future of sustainable materials. Made from seaweed, this new category of materials is regenerative and carbon-sequestering, outperforming carbon-intensive paper products and bioplastics. With SEA, you can reduce your environmental impact while still maintaining the high quality of traditional materials.
######
Product Description: `,
    lastToken: '\nMarketing Angle: \n',
    max_tokens: 110,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

};

module.exports = {
  messageDavinciEnginParams,
};
