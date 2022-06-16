const CAMPAIGN_THEME = "campaign-theme";
const PUBLICITY_STUNT = "publicity-stunt";
const PROBLEM_SOLVER = "problem-solver";
const EVENT_IDEAS = "event-ideas";
const PODCAST_EPISODES = "podcast-episodes";
const BLOG_TOPICS = "blog-topics";
const VIRAL_IDEAS = "viral-ideas";
const CONTEST_IDEAS = "contest-ideas";
const PROMOTION_IDEA = "promotion-idea";
const BIG_IDEAS = "big-ideas";
const VIDEO_TREATMENT = "video-treatment";
const CREATIVE_FREESTYLE = "creative-freestyle";


const brainstormDavinciEnginParams = {
  [PUBLICITY_STUNT]: {
    prompt: `The best publicity stunts give media outlets a great news story and the public something to talk about. When given a product or event description, Generate an infinite range of detailed, exciting, attention-grabbing publicity stunts.
######
Description: Launch of a New Vegan Restaurant in NYC
PR Stunt: Actors dressed as vegetarians are seen protesting outside the new restaurant, carrying signs reading "Forgive them for being carnivores. The vegetarians were successful in attracting large numbers of onlookers to the restaurant. The vegetarians challenge any meat-eaters to try their steak-free burrito bowl, et cetera.
######
Description: Mobile App for American Airlines
PR Stunt: Twenty-five planes will be decorated with giant airplane-shaped balloons and welcoming banners. Local airline counter areas will be set up with educational and promotional materials about the app. There will also be museum-like pictures and items from past and present airlines on display, including uniforms that helped define the airline's brand over time.
######
Description: A hotel in New York City called the “W” is located in the middle of Times Square and wants to attract free media attention
PR Stunt: "The W" will be holding a “Wish” event where a person is chosen for a full day of pampering and indulgence. A media release is sent to key journalists, telling them that someone will have their wishes fulfilled on the day of the event. A series of tweets are issued about this week's "Wish" recipient.
######
Description: New Movie—Lord of the Rings
PR Stunt: The classic movie trilogy will be brought to life via an immersive exhibit in downtown Los Angeles. Visitors can purchase admission to an environment complete with props, costumes, and interactive installations that allow them to step into the Lord of the Rings world.
######
Description: A small food truck is opening the first vegan, organic restaurant in Anchorage
PR Stunt: The opening event will feature a flash mob of dancers who are dressed as vegetables. The flash mob will dance outside the venue to wild applause from passers-by before entering for dinner.
######
Description: A new nature reserve along one of California's beautiful coasts needs publicity
PR Stunt: Once every week, a special contest will be posted on the nature reserve's website, asking people to submit creative ideas about how they would like their day at the park to go. One of those ideas will randomly be chosen and implemented for that week's visitor. The media release is written up as a fun contest for passers-by who happen to stumble upon it or read through newspapers/magazines/blogs every week, increasing awareness and interest in this beautiful area
######
Description: A new underwear company wants to promote their functional, comfortable line of undergarments
PR Stunt: A photo shoot is done of a supermodel wearing the underwear while at her day job. She does all kinds of stuff that normal, everyday people do for their jobs, from making coffee to sweeping floors to filing paperwork and typing letters. The images are then posted on social media with jokes about how she's "just like us!"
######
Description:`,
    keyword: "Description: ",
    lastToken: "\nPR Stunt: \n",
    temperature: 0.85,
    max_tokens: 80,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [VIRAL_IDEAS]: {
    prompt: `A viral video is a short video that, through the use of the internet, becomes so popular that is passed from person to person until it is known by everyone. They are usually fun, silly, interesting, humorous, or informative. When given a description, generate an infinite range of viral video titles along with a brief description of what the video is about.
######
Description: Antler is a commercial space travel company
Viral Video: "Antler's New Flight Attendant" - As a newly hired flight attendant for Antler, a commercial space travel company, you are tasked with a specific set of duties from training to flights to dealing with the public. In the course of your work, you witness a variety of situations that may not be what you're used to.
######
Description: A funny viral video about Yoga
Viral Video: "Yoga Class" - A woman goes to a free yoga class to find out that it's a cult.
######
Description: A viral video about a dog
Viral Video: "The Vacuum Cleaner" - When a cute dog hears the sound of a vacuum cleaner, he runs and hides in the closet.
######
Description: A viral video about eating leftovers
Viral Video: "Leftovers" - Leftovers are something that are thrown away by people that are too lazy to do anything with them. This is a video of a guy that is taking leftovers and making something new out of them.
######
Description: A company launching a new product made from recycled fire hose
Viral Video: "Fire Hose Reclaimed" - This is a video about a company that is taking old fire hose and making new products out of them.
######
Description: A viral video about a man trying to get to work on time
Viral Video: "The Long Run" - A man is running to work and is running out of time.
######
Description: A company with a new product to help people with their carpet stains
Viral Video: "Carpet Stain Game" - This is a game where you try to remove stains from a carpet.
######
Description: `,
    keyword: "Description: ",
    lastToken: "\nViral Video: \n",
    temperature: 1.0,
    max_tokens: 50,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },


  [CONTEST_IDEAS]: {
    prompt: ` Here are some innovative social media contest ideas designed to increase sales and engagement. When given the name of a product and the target customer, generate an infinite range of contest ideas.
######
Description: Good Pickney is an online store that sells clothing for children under 12 years old
Contest Idea: The first five people to come into the store wearing their Halloween costumes who mention the contest will receive a 20% off coupon
######
Description: Rhineland Packaging Products
Contest Idea: Create a 30-second video (or less) telling the story of how you use Rhineland Packaging Products
######
Description: Core Cards
Contest Idea: Core Cards hosts an Instagram caption contest on Core's Facebook and the entry with the most likes by the end of the month wins!
######
Description: Gravity Jackets
Contest Idea: Share Gravity Jackets on social media and tag #GJ1MM (get one month)
######
Description: Crazy Boy's Barbecue
Contest Idea: Crazy Boy's Barbecue, the largest barbecue restaurant in the south, will be giving away $500.00 cash to one lucky winner in the month of November.
######
Description: Hope is a non-profit organization for underprivileged youth
Contest Idea: Hold a live online contest where people tweet, text, or post using the app with the hashtag #hope and the person with the most likes, retweets, or likes will be sent a free Hope backpack.
######
Description`,
    keyword: "Description: ",
    lastToken: "\nContest Idea: \n",
    temperature: 1.0,
    max_tokens: 50,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

  [EVENT_IDEAS]: {
    prompt: `When planning an event, one of the first things you need to decide on is the event theme. A theme is the overarching idea or concept behind your event, that not only gives the event structure, but can inspire guests and reinforce your event message and key takeaways. When given the kind of event, generate an infinite range of creative event themes.
######
Kind of Event: Give me ideas for a Back to School Event for Parents
Event Theme: "Old School Rock" - Turn your attendees into school kids and have them dig out their old school uniforms. This not only creates nostalgia, but also helps to bring people together. You can have staff dressed as teachers with giant digital blackboard graffiti walls and add quirky seating such as retro school writing desks.
######
Kind of Event: Give me ideas for a Birthday Party for a 10-year old girl
Theme: "Minion Madness" - Have your guests dress in Minions costumes, have a Minion cake, have staff in Minion outfits, have a full size Minion squirting water in everyone's faces, have all the food be Minion-themed, supply every guest with  little Minion backpack.
######
Kind of Event: Give me ideas for A 50th Anniversary Celebration for a couple
Event Theme: "50+ Shades of the 50's" - Organize your budget to include all things 50's, from music to food to cakes, to attire, to entertainment. Quirky 60's fun should also be emphasized, letting guests know it's okay to dance to music from either decade.
######
Kind of Event: Give me ideas for A Corporate Networking Event
Event Theme: "Get Your Geek On" - Have your attendees dress as characters from their favorite sci-fi movies, be organized into teams representing their favorite franchises, and work with your within your budget to include some sort of nerdy photo opp, such as a life size replica of the Death Star or a Shrek-themed bounce house.
######
Kind of Event: Give me ideas for A Marriage Anniversary Celebration
Event Theme: "A Taste of the World" - Plan the event with the idea that everyone attending should have a taste of something from their native country. Make food stations reflect the various countries represented--ranging from the representative cuisine to the representative drink--and incorporate their language into signage.
######
Kind of Event: Give me ideas for A Father's Day Celebration
Event Theme: "Father's Favorite Things" - To have a successful Father's Day, you want to include the favorite things your father would've loved when he was your age or things that you remember to be his favorite when you were younger. Depending on the number of children in attendance, one-on-one time with Dad can be planned throughout the day to make it really special.
######
Kind of Event: Give me some ideas for a Sibling Reunion
Event Theme: "Sibling Love Fest" - Get your siblings together for a long overdue reunion. Prepare what they would've enjoyed as kids, including crafting time, or an outdoor obstacle course, or giant memory game, or serenading them with their favorite songs, or digging out home videos of themselves, or having one sibling interview another.
######
Kind of Event: Give me ideas for Fire themed birthday party
Event Theme: "The Great Inferno" - To have a successful fire themed birthday, you want to include the things that are associated with the Great Inferno. Consider turning the event into a hunt for 8 golden coolies (eliminate two-face for this theme), building a campfire in the center of the party, organizing games like Marco Polo in the pool.
######
Kind of Event: `,
    keyword: "Kind of Event: ",
    lastToken: "\nEvent Theme: \n",
    temperature: 1.0,
    max_tokens: 80,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

  [CAMPAIGN_THEME]: {
    prompt: `PR campaigns always have a clear objective. To effectively focus your campaign, you need a campaign theme that make your cause easy for the public to remember. A campaign theme should be a concise, positive, and active public statement that gives a name to your campaign. When given a description, generate an infinite range of unique, memorable PR campaign themes.
######
Description: Save the Whales
Campaign Theme: “Whale conservation starts with you.”
######
Description: Boys Read
Campaign Theme: “It’s time to make reading cool again.”
######
Description: Water Conversation
Campaign Theme:"Save Water. Save the Planet."
######
Description: Preventing Violence
Campaign Theme: "One of us is too many. End it now.”
######
Description: Animal Rights
Campaign Theme: "Protecting Animals, One Heartbeat at a Time!"
######
Description: Food Pantry
Campaign Theme: “A helping hand during tough times.” 
######
Description: `,
    keyword: "Description: ",
    lastToken: "\nCampaign Theme: \n",
    temperature: 0.9,
    max_tokens: 25,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

  [PODCAST_EPISODES]: {
    prompt: `Here is a list of interesting ideas for new podcast episodes. When given a subject, generate an infinite range of podcast titles and summary paragraphs about the episode.
######
Description: How to handle a divorce
Episode: "Breaking Up Isn't Hard to Do" - No matter how it occurred, we know that everyone is free and empowered to terminate the marriage contract because we leave marriages every day. But in this episode we'll explore the different reasons and methods and how much effort and planning and care it takes to break up kindly and lovingly and with the best chance of minimizing the wounds.
######
Description: Raising Up a Curious Child
Episode: "Curiosity Rising" - Children are always asking questions, and parents find themselves at a loss for what they may cling to when inquiry turns to mischief. And so it falls to parents to explore and explore and explore, to create a grownup space, to teach children how to think about things, to reason their way to conclusions, to make way for curiosity. But where should children learn to do all of this, if not in school? In this week's episode, we hear from a few leading minds in the field of educating children about the nature of curiosity and what it means for their own potential.
######
Description: Being Afraid of the Dark
Episode: "Looking at Darkness" - People go out of their way to avoid anything that scares them, yet somehow it becomes personal. Yet there are others who would say what terrifies the human animal is the part of the animal that remains wild. There's something primitive that comes across in the sobbing child hiding in a dark room, hearing shuffling that could be the house coming alive. Everywhere you turn, there are stories of people saying, yeah, I got it bad, but I'm not what you would call weird. The reality of night is gradually being forgotten, while the night's darkness lingers on. Quite the contrary, some people love the dark, love peering into their own nighttime mystery. This is their story.
######
Description: How To Make Friends
Episode: "Or is it Fake Friends? It Depends" - We all should have people in our life, people who love us enough to tell us things should not be so easily swallowed, people who have opinions about the "real" us, people who want us to be our best selves. And so, in this episode, we break down the difference between friends and mere acquaintances, who're both important to have, and how do we know when an acquaintance is really a friend? Play along and let's have a look!
######
Description: Learning about Death
Episode: "A Journey with Death" - Death can be the most difficult thing to deal with, but it shouldn't be the most unfamiliar. One way to explore death is to talk about it openly, to create a vocabulary that helps combat the child's natural fear of the dark, the fear of the place before. This is an opportunity to explore with them what might happen, to help them understand death is a process, not an event.
######
Description: Going Green
Episode: "To be Careful is to be Precious" - For too long, our planet has suffered from extreme human activity. It's not too late to change the way we live, to make it more sustainable, less harmful to the five-sixth of earth that is covered in water. So today on the show, we're going to talk about how one person can make a difference, even if it's just by doing what you can to use less electricity, to conserve water, to buy less stuff. We'll also explore what happens when you share your story with others, how to educate young people with facts, and spark change
######
Description: `,
    keyword: "Description: ",
    lastToken: "\nEpisode: \n",
    temperature: 0.85,
    max_tokens: 150,
    top_p: 1,
    n:10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

  [BLOG_TOPICS]: {
    prompt: `Here is a list of interesting ideas for blog posts. When given a subject, generate an infinite range of  blog titles and a summary paragraphs about the blog.
######
Topic: Machine Learning
Post: "Machine Learning For Beginners" - This blog post aims to help people who are just starting to learn more about machine learning, as well as some of the basics of what machine learning is. The post discusses what machine learning is, why it's important, how it works, and some example techniques.
######
Topic: The Stock Market
Post: "What Causes the Stock Market to Crash" - This article covers the causes of the stock market crashes from the Great Depression, the 1987 crash, and more. Large drops in the stock market have been a regular occurrence for the United States stock market, and the crashes have occurred for a variety of reasons.
######
Topic: Bosses
Post: "5 Things Your Boss Wishes You Knew" - This blog post will cover the 5 things your boss wishes you knew - this includes not running to your boss to tell them about every little thing you do, not appearing in their office when they are in the middle of a meeting, and not starting in with them when they are in the middle of something.
######
Topic: Online Safety
Post: "How to Spot Scams" - This post is about identifying potential scams. Scams are prevalent online because it is easier to make money off of scams online. Scams are often hard to identify, but often have telltale signs.
######
Topic: Charitable Donations
Post: "Why You Should Be Giving More" - This article discusses the importance of giving, for both the giver and the receiver. Giving makes us feel good, and has also been shown to improve our quality of life. It is important to not just give to get something in return.
######
Topic: Makeup Tips
Post: "The Best Foundation for Acne Skin" - Free skin care tips are provided for those with acne skin. This article discusses the benefits of makeup, the recommended makeup products, and how to apply makeup to make your skin look its best.
######
Topic: Philosophical thinking
Post: "The Importance of Philosophy" - This blog post explains the importance of philosophy and what it means to be a philosopher. Philosophy is a practice of thinking through the meaning, knowledge, and truth of a range of issues.
######
Topic: Loyalty
Post: "The Science of Loyalty" - This article explores the science of loyalty, what loyalty is, and the different types of loyalty. Loyalty is a concept that is both subjective and objective. The more people have a sense of loyalty, the more likely they will stay with a business or relationship for a long time.
######
    Topic: `,
    keyword: "Topic: ",
    lastToken: "\nPost: \n",
    temperature: 1.0,
    max_tokens: 80,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },
  [CREATIVE_FREESTYLE]: {
    prompt: `There are two types of words. Picture Words and Connecting Words. A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word you can see, hear, feel or imagine something. There are Picture Words that show us things. Picture Words that show us actions. Picture Words that show us colors. Picture Words that show us size. Picture Words that show us details of other pic­tures. Picture Words that show us feelings. Picture Words that show us judgments. Picture Words that show us ideas. And Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture and help you transfer that picture from your mind to the mind of someone else. Every time you say one of them, you see some­thing and the person you're talking to also sees that same thing. A Connecting Word is a word that has no built-in picture. When you say a Connecting Word by itself you don't see anything. Words like  "the", "a", "an", and "to" and all the rest, are all considered to be connecting words because they don't create a mental image on their own. The purpose of the Connecting Word is to tell us how the Picture Words are connected in time, space, meaning, or sequence. Let's think step by step how to put these two types of words together to create new pictures and new meanings which allow for expression of even the most abstract ideas you can imagine. Go for weird but practical ideas. Embrace the odd and unusual. Be unafraid to be different.
    ######
    Context: Give me a poem about the life of a flea in Paris around 1789 in the writing style of Derek Walcott
    Output: This blighted life is not so bad
    Put to work in the dark we sneak 
    In shirt and trousers as a man, 
    Along cobbled streets where buildings rise; 
    It doesn't matter if we go or slow, 
    We make our humble haul 
    In the burden of a human shoe.
    ######
    Context: Give me a new invention that isn't expensive to manufacture
    Output: A intelligent mirror that can give you a personalized skincare routine according to your skin type
    ######
    Context: Give me an unusual tagline for the new Rolls Royce Phantom
    Output: Airtight. Bulletproof. And completely silent.
    ######
    Context: Give me a first principles explanation of the concept of an atom
    Output: Atoms are the basic units of matter and the defining structure of elements. The term "atom" comes from the Greek word for indivisible, because it was once thought that atoms were the smallest things in the universe and could not be divided. The structure of an atom is a central nucleus composed of protons and neutrons with electrons orbiting around this nucleus.
    ######
    Context: Give me a television script for an ad about the Amazon Rainforest. The ad should be written in the style of Toni Morrison
    Output: Deep in the Amazon rainforest, a never-ending cycle of life and death plays out. Every day, sunbeams pierce through the canopy to illuminate the forest floor; creatures stir and begin their search for food. Birds swoop down to snatch insects from midair; snakes coil around trees, waiting to strike. In this world of constant motion, there is one still point: the Amazon River. For centuries, the river has been a lifeline for indigenous people living in harmony with nature; but now that balance is under threat. The growing demand for products like leather and beef are putting pressure on rainforests all over South America – and as more trees are cut down, flooding becomes more likely during heavy rains.(Announcer): "The time to act is now – before it's too late."(Voiceover): "Just because we can't see them doesn't mean they're not worth saving."(Announcer): "Help protect our planet – donate today."
    ######  
     
Context: `,
    keyword: "Context: ",
    lastToken: "\nOutput: \n",
    temperature: 1.0,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

  [PROBLEM_SOLVER]: {
    prompt: `The best way to solve a hard problem is to break it up into as many components as possible. Here are a few examples of hard problems and the list of steps needed to solve them.
######
Problem: How do I find love?
Answers:
1. Build confidence in yourself. You cannot find love if you do not first love yourself.
2. Be active in the real world. Find hobbies, get involved in organizations, go to the gym, build friends, etc. Before you find a partner you must have friends.
3. Practice communication skills. Learn how to talk about yourself and listen to others. This will help you build better relationships.
4. Get outside your comfort zone. If you are not comfortable talking to strangers, start small. Talk to a cashier, or sit with a stranger at lunch.
######
Problem: How can I get rich without getting lucky?
Answers:
1. Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.
2. Ignore people playing status games. They gain status by attacking people playing wealth creation games.
3. You will get rich by giving society what it wants but does not yet know how to get. At scale.
4. Pick business partners with high intelligence, energy, and, above all, integrity.
######
Problem: How do I get a higher GPA?
Answers:
1. Find a mentor. A good mentor will help you figure out what you do and do not know and set goals for each semester.
2. Make a list of your GPA goals for each semester. Have a goal for each class you take.
3. Have a goal for each class of the GPA you want to have at the end of the semester.
4. Make a list of everything you can do to get that grade.
5. Make a schedule for completing each item on the list.
6. Follow the schedule.
7. Keep going. Do not stop until you get where you want to go.
######
Problem: `,
    keyword: "Problem: ",
    lastToken: "\nAnswers: \n",
    temperature: 1.0,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

  [PROMOTION_IDEA]: {
    prompt: `A promotional idea gets people excited about a product, service, or cause. When given a product description, generate an infinite range of unique promotional ideas.
    ######
    Product Description: A car loan at a competitive rate
    Idea: Give one lucky customer a chance at a free car detailing, waxing, polishing, and vacuum service for the first six months after they sign the loan.
    ######
    Product Description: An eco-friendly computer
    Idea: In celebration of Earth Day, give one customer a chance to attend a workshop on creating an eco-friendly office space, including affordable tips on creating a more sustainable way of working while staying within their budget.
    ######
    Product Description: A weight loss product
    Idea: Introduce a limited edition set of four classes to one lucky customer. Classes include dieting, exercise, yoga, and meditation.
    ######
    Product Description: A new rap album by Nicki Minaj
    Idea: Send one lucky customer a complimentary download of Nicki's Platinum Edition double CD, featuring two brand-new tracks not available on streaming services.
    ######
    Product Description: `,
    keyword: "Product Description:",
    lastToken: "\nIdea: \n",
    temperature: 1.0,
    max_tokens: 60,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

  [VIDEO_TREATMENT]: {
    prompt: `A video treatment is fundamental to the video director. It should be very visual with a lot of visual reference images. Be descriptive and to the point without writing a novel. This treatment is all text. When given a context, write a video treatment.
    ######
    Context: The video treatment for a music video titled “If I Ruled the Rule” by Nas ft. Lauryn Hill
    Treatment: The entire look and feel of this video are that of an abstract painting. The approach is that of a different look in hip-hop music videos derived from ghetto art. The goal is to create new insight for NAS, one that captures the essence of the artist and illustrates properly the feeling of the song and the song lyrics, while taking NAS to the next level visually and artistically. As the song begins, we see various cutaways of the city at night, intertwined in a montage sequence - people, places, city lights, etc. The camera reveals extreme close-ups of Lauryn Hill as she sings the melody. 
    We see a high-angle crane shot of Queens Bridge projects, as the camera booms downwards. We see NAS and the entire "firm" as they are seated on cars - on car roofs, hoods, etc. We see close-ups of their faces in a cross dissolve. First Verse, the camera reveals NAS standing on a 20 foot by 20 foot mirrored platform seemingly "floating" through Times Square at sunset - similar to the style of the Bjork Music Video. In the background, city lights are reflected as NAS performs. Various colored lights slowly change as he "floats" by, as if "lit" by neon lights. Also integrated we see NAS and the "firm" as he performs as if he is telling a story to himself, his friends, etc. First Chorus, We see Lauryn Hill as she also rides a mirrored platform across 7th Avenue - another side of Times Square. Second Verse, the Camera reveals NAS as he drives a gold Mercedes 600 SEC through Queens Bridge. We see money by the tons....crisp, new $100 bills as it "falls" from the sky. People everywhere  - kids, adults - run and grab for the raining money as it rains on the ghetto - Queens Bridge at sunset. In the second Chorus, we see the various neighborhood, nighttime cutaway shots - slow motion....kids playing in the streets, dice rolling, blunt smoking, etc. Third Verse, the Camera reveals a large with 12 foot mirrored walls and mirrored ceiling. We see NAS and the "firm" seated at a long mirrored table - on the table are rows and rows of new $100 bills - over which we see a huge 6-foot crystal chandelier. The camera reveals the "firm" dressed gangster style -nArmani, Versace...shirts, ties, etc. Final Chorus, We see NAS and Lauryn Hill together as they perform throughout Times Square on the mirrored platforms. Intercut with these scenes will be various dissolves and cutaways of the objects and shots that relate to the lyrics: Gold dice rolling Money falling Digital money counters Jewelry Rolex stacks. Also integrated will be performance footage of NAS and Lauryn Hill as they perform in the Caribbean resort of Cape Jalucca in Anguilla -all sunset, very intense.
    ######
    Context:`,    
    keyword: "Context:",
    lastToken: "\nTreatment:",
    temperature: 1.0,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.8,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [BIG_IDEAS]: {
    prompt: `Let's think step by step about how to use the IDEO brainstorming method which when given a topic follows their 7 Rules of Brainstorming - in particular Rule 2 "encourage wild ideas", and Rule 4 "stay focused on the topic" - to generate an infinite range of unique ideas.
######
Topic: The team is developing a new app for a bank to encourage millennials to better utilize savings accounts. How might we help young people turn saving money into a lifelong habit?
Idea: Allow the user to set up “fun budgets” (aka “triggers”) to save more money, e.g. whenever they go to Target, they'd get a pop-up asking if they'd like to put $5 towards savings.
######
Topic: The pandemic has resulted in a 40% drop in global travel, the result being that airlines and destination losing billions in potential revenue. How do we get more people to travel overseas?
Idea: Promote travel overseas by tapping into the power of nostalgia. Come up with a marketing campaign that features photos and stories from previous travelers, highlighting the amazing experiences they had abroad. This would create an emotional connection with potential travelers and encourage them to explore the world for themselves.
######
Topic: A major car company is looking to sell its new line of electric vehicles
Idea:  Create a marketing campaign that encourages people to "switch to the dark side" and buy the electric car. Evil villains could be used in the ads, highlighting how much more sinister and powerful they are when driving an electric car. This would create intrigue and excitement around the new vehicles, helping to boost sales.
######
Topic:`,
    keyword: "Topic:",
    lastToken: "\nIdea: \n",
    temperature: 1.0,
    max_tokens: 100,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },
};

module.exports = {
  brainstormDavinciEnginParams,
};
