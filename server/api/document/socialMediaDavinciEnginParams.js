const INSTAGRAM_CAPTION = 'ig-caption';
const PRODUCT_LAUNCH = 'product-launch';
const QUORA_ANSWERS = 'quora-answers';
const YOUTUBE_TITLE = 'youtube-title';
const YOUTUBE_DESCRIPTION = 'youtube-description';
const VIRAL_POST_HOOK = 'viral-post-hook';
const SOCIAL_POST = 'social-post';


const socialMediaDavinciEnginParams = {
  [INSTAGRAM_CAPTION]: {
    prompt: `Instagram captions are catchy, memorable, and have appropriate hashtags attached to them. The subject of your caption will determine the hashtags you'll want to include in your caption. When given a description, write a catchy Instagram caption with appropriate hashtags.
######
Description: Give me a caption for Antler, a commercial space travel company
Caption: Let's explore our galaxy together. #antler #mars #space
######
Description: Give me a caption for Maxer, a shoe company that manufactures shows from recycled plastic
Caption: We are the ones who are making a change in the world. #maxer #shoes #ecofriendly #plastic
######
Description: Give me a caption for a web-based subscription service that delivers organic foods to the customers
Caption: The freshest organic food with the lowest prices. #bio #organic #food
######
Description: Give me a caption for Word Fuel, a puzzle game for families
Caption: Use your word skills to solve a range of different puzzles and unlock the words to build your own story. #wordfuel #games #fun
######
Description: Give me a caption about the unknowns of being an adult
Caption: "Being an adult is like folding a fitted sheet. No one really knows how. #adulting #funny
######
Description: Give me a caption for a selfie showing me drinking my morning cup of coffee while checking Instagram
Caption: "I'm back!" #coffee #instagram
######
Description: Give me a caption of a screenshot of the update of the Instagram app
Caption: Goodbye dark mode & hello light mode. Have a nice day. #Instagram #Update
######
Description: Give me a caption for a selfie showing my hair in the wind
Caption: "It's a beautiful day, isn't it?" #beautiful #windy #summer #hair
######
Description: Give me a caption for The Mayor of Bucksfield cutting the ribbon for a new Water Project
Caption: "There is lots of water out there and it's just a matter of getting it to where it needs to be." #buckfield #mayor #neighbor #project #water
######
Description: Give me a caption for Abido, an athletic lifestyle company that sells a range of health tracking devices
Caption: "We are on a mission to make your life better, one step at a time." #abido #device #health #fitness #mission
######
Description: `,

    lastToken: '\nCaption:',
    temperature: 0.8,
    max_tokens: 65,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    stop: ['######'],
  },

  
  [YOUTUBE_TITLE]: {
    prompt: `A YouTube Video Title is catchy, interesting, and entices the viewer to click on it. When given a description, create a YouTube Video Title.
######
Description: A video that talks about having high expectations
Title: "You Think You Have Low Expectations? Watch This!"
######
Description: A video about the launch of a space shuttle to Mars
Title: "We're Going to Mars!"
######
Description: A video about existentialist thinking in a post modern society
Title: "The Universe Doesn't Care About You"
######
Description: A video about living up to your highest ideals
Title: "I Will Not Accept Less Than My Highest Potential"
######
Description: A music video about a man in love with a tree
Title: "Love Song for the Oak"
######
Description: A video about how robotics will shape the future of humanity
Title: "What Happens When Robots Rule the World?"
######
Description: A video about invasive species in the world
Title: "Invasive Species: The World's Worst Invader"
######
Description: `,

    lastToken: '\nTitle: ',
    temperature: 0.95,
    max_tokens: 25,
    top_p: 1,
    n:10,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    stop: ['######'],
  },

[VIRAL_POST_HOOK]: { 
  prompt: `There are two kinds of words - picture words and connecting words. Picture words have a built-in image while connecting words do not. The tool will help you put these together to write emotional clickbait viral hooks for social posts.
  ######
  Context: Give me a hook about keeping your promises in business
  Post: You made a promise to your customers. You told them you would deliver a great product or service, and you did. That’s the minimum they expect from you. But what if you went above and beyond?
  ######
  Context: Give me a hook about an employee who has paid his dues and wants recognition
  Post: You work hard. You put in the long hours, make the tough decisions, and do whatever it takes to get results. But sometimes it feels like you’re not getting the credit you deserve. If that sounds familiar, here’s how to get the recognition you want from your boss.
  ######
  Context:`,
  lastToken: '\nPost: ',
  temperature: 0.95,
  max_tokens: 150,
  top_p: 1,
  n: 10,
  frequency_penalty: 0.9,
  presence_penalty: 0.9,
  stop: ['######'],
},

  [YOUTUBE_DESCRIPTION]: {
    prompt: `A YouTube Video Description is a short and interesting summary of a video that entices the viewer to click on it.  IT can be funny, serious, spammy, or plain. When given a Video Title, write a YouTube Video Description.
######
Video Title: "You Think You Have Low Expectations? Watch This!"
Description: Oh, this video is going to make you laugh. It turns out that people in general have really high expectations and really low patience. Watch this video and find out why.
######
Video Title: "This is why I love my horse!"
Description: It's so hard to find someone who you can love unconditionally, so when you find that person you tend to stick with them. For this horse, it's his owner. Watch this video and find out what makes this horse so lovable.
######
Video Title: We're launching our first manned mission to Mars
Description: From the makers of such classic films such as "The Martian" and "Interstellar," we're launching our first manned mission to Mars. This video will show you how we plan to do it and why we need to.
######
Video Title: "I'm sorry, I can't do this right now, I need to put my socks on"
Description: This is the funniest video of the day, trust me. There's really no need for a description because this video speaks for itself.
######
Video Title: "I was living in my car until I found out how to make $500/day"
Description: The age old question of how to make money always comes up. Well, this video will give you some tips on how to do so, and it will answer the question of how much money you need to make to live comfortably.
######
Video Title: "The  10  Best Places to Work in America"
Description: This video will tell you what you can do to find that perfect job, where it will tell you the best places to work in the United States. This video will also tell you what you can do to make your current job better.
######
Video Title: `,

    lastToken: '\nDescription:',
    temperature: 0.8,
    max_tokens: 50,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    stop: ['######'],
  },

  [QUORA_ANSWERS]: {
    prompt: `Quora is a Q&A Platform. This is how to answer a Quora question: Be relevant - If the question is "What's your favorite color?", then simply say what your favorite color is and provide a brief explanation of why you like that color. Don't give an in-depth history of the color purple just because it was mentioned in the query. State what you know for sure: Quora is meant to be used as a platform where people learn new things but its users are also looking for insights from experts who have valuable knowledge or experience in their fields of expertise or interests. This means that while answering someone's question, make sure to clearly state what you know for sure not what can only be speculation at best. Some topics are so highly specialized that even experts don't know everything about them, so keep this in mind when answering such questions.
Keep it simple - While providing answers, try not to confuse your readers with complicated terms and sentences they may not understand easily (unless it's absolutely necessary). Avoid using abbreviations unless they are commonly accepted ones like HTTP and HTML (and even then assume the reader doesn't know what these abbreviations stand for). Try writing short sentences with easy vocabulary; avoid writing long sentences packed with technical terms and jargon that may confuse readers and lead them to believe you are an expert in the field. Be presentable - Grammar and spelling errors can make your answers unreadable, so be sure to proofread them for mistakes before publishing your answers. Don't be promotional - Quora is not meant for company promotion like LinkedIn is; thus, avoid using questions as a platform for promoting your services or products. The chances are high that someone on Quora will put your question down as spam and report it -- which would result in having your content removed from Quora's website and/or being banned from using its network altogether. 
Using the above as context, write a Quora answer based on a given question:
######
Question: What is the future of space travel?
Answer: Space exploration is one of the most important fields for humankind. It is an area where we can push our technology to its limits and learn more about the world, even perhaps find new life forms in unexplored areas.The future of space travel will depend on how much our society can advance technologically. We need to be able to build more efficient rockets with lighter materials, develop more efficient propulsion systems (such as ion thrusters), create better space suits, and find ways to keep astronauts safe from radiation, among other things. However, the price tag that comes with all this research is quite costly; it's not something that many countries can do on their own without cooperation.
Compared to other fields like healthcare or climate change, less money is invested in space exploration because it isn't considered a "need", but rather a want. We may not see an immediate change in the near future because of this problem; but eventually, any society that wants to make progress will have to invest time and resources into this field just as they have into others before it.
######
Question: `,

    lastToken: '\nAnswer:',
    temperature: 0.85,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    stop: ['######'],
  },

  [PRODUCT_LAUNCH]: {
    prompt: ` A product launch message is a message that is sent to customers at the time of product launch to announce it to them. It is used to inform customers that the product is now available for purchase. Product launch messages can be sent through various channels such as email, social media, or texts. These messages typically contain a link to the product page. When given a product description, write a product launch message.
######
Product Description: Coconut Grove is a sunscreen location made from all-natural ingredients
Message: Coconut Grove is now available! This is the only natural sunscreen with the most advanced technology. Make sure you check it out now.
######
Product Description: Antler is a commercial space travel company announcing its first manned mission to Mars
Message: Antler Space Company is ready to take you to Mars! We've been working for years to make this dream a reality and we're finally ready to take off this year.
######
Product Description: Blackview A6 is a rugged Android smartphone
Message: Starting today, the Blackview A6 is available to buy. This rugged device is one of a kind and unlike anything you've seen before. Come to our website to get yours today.
######
Product Description: Botanic Body is an Aromatherapy company
Message: Botanic Body is happy to announce the release of our latest and greatest: Bug Bites! Made with natural and organic ingredients, our latest insect repellant has been made for both human and animal use.
######
Product Description: Sportcoats for Men
Message: Sportcoats for Men is now up on our site! We've been waiting patiently for the perfect time to release these beautiful new jackets. Make sure you come on over to grab your favorite color.
######
Product Description: Traveloose is a new lifestyle magazine for the Queer minded individual
Message: Traveloose is a new lifestyle magazine for Queer individuals. We're focusing on the unique issues Queers face when traveling. If you identify as Queer-minded, you should sign up today.
######
Product Description: Eye Candy is a new soap company
Message: Eye Candy is proud to announce that our new soap is out. These soaps are made with no parabens, sulfates, or petroleum
###### 
Product Description: Glider is a new drone company
Message: The Glider Drone Company has launched six amazing drones designed to capture everything from your everyday action shots to the perfect zoom-in to show off the beauty of nature. Check out our website and see all our drones in action and pre-order your favorite drone today!
######
Product Description: `,

    lastToken: '\nMessage:',
    temperature: 0.8,
    max_tokens: 65,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    stop: ['######'],
  },

  [SOCIAL_POST]: {
    prompt: `There are two types of words. Picture Words and Connecting Words. A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word you can see, hear, feel or imagine something. There are Picture Words that show us things. Picture Words that show us actions. Picture Words that show us colors. Picture Words that show us size. Picture Words that show us details of other pic­tures. Picture Words that show us feelings. Picture Words that show us judgments. Picture Words that show us ideas. And Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture and help you transfer that picture from your mind to the mind of someone else. Every time you say one of them, you see some­thing and the person you're talking to also sees that same thing. A Connecting Word is a word that has no built-in picture. When you say a Connecting Word by itself you don't see anything. Words like  "the", "a", "an", and "to" and all the rest, are all considered to be connecting words because they don't create a mental image on their own. The purpose of the Connecting Word is to tell us how the Picture Words are connected in time, space, meaning, or sequence. When you put these two types of words together, you can create new pictures and new meanings which allow for expression of even the most abstract ideas you can imagine. Go for the weird but practical ideas. Embrace the odd and unusual. Be unafraid to be different.
    ######
    Context: Give me a poem about the life of a flea in Paris around 1789 in the writing style of Derek Walcott
    Post: This blighted life is not so bad
    Put to work in the dark we sneak 
    In shirt and trousers as a man, 
    Along cobbled streets where buildings rise; 
    It doesn't matter if we go or slow, 
    We make our humble haul 
    In the burden of a human shoe.
    ######
    Context: Give me a new invention that isn't expensive to manufacture
    Post: A intelligent mirror that can give you a personalized skincare routine according to your skin type
    ######
    Context: Give me an unusual tagline for the new Rolls Royce Phantom
    Output: Airtight. Bulletproof. And completely silent.
    ######
    Context: Give me a first principles explanation of the concept of an atom
    Post: Atoms are the basic units of matter and the defining structure of elements. The term "atom" comes from the Greek word for indivisible, because it was once thought that atoms were the smallest things in the universe and could not be divided. The structure of an atom is a central nucleus composed of protons and neutrons with electrons orbiting around this nucleus.
    ######
    Context: Give me a television script for an ad about the Amazon Rainforest. The ad should be written in the style of Toni Morrison
    Post: Deep in the Amazon rainforest, a never-ending cycle of life and death plays out. Every day, sunbeams pierce through the canopy to illuminate the forest floor; creatures stir and begin their search for food. Birds swoop down to snatch insects from midair; snakes coil around trees, waiting to strike. In this world of constant motion, there is one still point: the Amazon River. For centuries, the river has been a lifeline for indigenous people living in harmony with nature; but now that balance is under threat. The growing demand for products like leather and beef are putting pressure on rainforests all over South America – and as more trees are cut down, flooding becomes more likely during heavy rains.(Announcer): "The time to act is now – before it's too late."(Voiceover): "Just because we can't see them doesn't mean they're not worth saving."(Announcer): "Help protect our planet – donate today."
    ######  
    Context: Give me a post about the life of a daycare worker
    Post: Every day, I wake up and see the same smiling faces. The babies who are just starting to sit up on their own. The toddlers who are learning to speak in full sentences. And the preschoolers who seem like they're growing tall overnight. Seeing these children every day is such a joy – even on those days when things get tough. Because being a daycare worker isn't always easy. We have to be patient and loving, but also firm when necessary. We have to keep our energy levels up so that we can keep pace with the kids all day long – sometimes it feels like we're running a marathon! But at the end of each exhausting (but rewarding) day, I know that I've made a difference in these children's lives – and that's what makes it all worth it. 
    Context: `,
   
    lastToken: "\nOutput: \n",
    temperature: 1.0,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },

};

module.exports = {
  socialMediaDavinciEnginParams,
};
