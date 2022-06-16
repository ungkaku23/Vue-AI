const ARTICLE_HEADLINE = 'article-headline';
const EMAIL_SUBJECT = 'email-subject';
const PRODUCT_NAME = 'product-name';
const BUZZWORD = 'buzzword';
const BOOK_TITLE = 'book-title';
const GENERAL_HEADLINE = 'general-headline';
const WEBSITE_HERO_TITLE = 'website-hero-title';


const headlineDavinciEnginParams = {
[ARTICLE_HEADLINE]: {
prompt: `Given an article description, write an exciting clickbait headline that will entice people to read the article.
######
Description: Give me a headline for an article about Researchers who have found that chronic stress may increase the risk for Alzheimer's
Headline: Can't handle stress? You could be at risk for Alzheimer's, according to new research.
######
Description: Give me a headline for an article about the future of space travel
Headline: The Future of Space Travel: What We Can Expect in the Next 100 Years
######
Description: Give me a headline for an article about the rise of alternative fashion materials made from recycled material
Headline: You Will Love These Hot New Materials Made from Recycled Plastic
######
Description: Give me a headline for a stpry about the co-owner of an SF restaurant who says it's avoided the labor shortage thanks to its staff benefits. Zazie gives workers paid family leave, health and dental insurance, and a 401(k) with employer match. The restaurant also has a no-tip policy and instead shares profits with staff.
Headline: Restaurant Co-Owner Says Paid Leave, Profit-Sharing Keeps Staff Happy and Helps Avoid Labor Shortage
######
Description: Following the previous night’s closing ceremonies, Beijing city officials received numerous reports Monday that the streets were overrun with hundreds of stray Olympians that had been left behind after the 2022 Winter Games.
Headline: Hundreds of Stray Olympians Found on Beijing Streets After Games######
Description:`,
lastToken: '\nHeadline: ',
    temperature: 0.95,
    max_tokens: 64,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.75,
    presence_penalty: 1.75,
    stop: ['######'],
  },

[EMAIL_SUBJECT]: {
   prompt: `Given a context, write an engaging email subject line that will entice someone to read the email.
    ######
    Context: Contact a journalist from Acme, a company that just found a cure for cancer
    Subject Line: A Cure for Cancer? You Won't Believe What We Just Did!
    ######
    Context: Reach out to a vampire saying you want to interview him
    Subject Line: I Want to Interview a Vampire - Do You Know One?
    ######
    Context: Send an email to a lawyer about a new software product for managing client
    Subject Line: Introducing: The World's Most Advanced Legal Case Management Software
    ######
    Context: A promotion to new customers inviting them to open a new account with your bank
    Subject Line: Your New Bank - with the Most Advanced Security Features
    ######
    Context: Unable to host an in-person event last year, Hanover Charities took its fund-raising efforts online. Though the annual Sugar Cane Ball raises much of the funds used to fuel the foundation's work, it could still provide 207 tertiary-level scholarships and distribute over 20,000 packages of food to needy Hanover residents in 2021. Last Saturday, February 19, the Sugar Cane Ball returned.
    Subject Line: You're Invited! The Sugar Cane Ball is Back
    ######
    Context:`,
    lastToken: '\nSubject Line: ',
    temperature: 0.95,
    max_tokens:  64,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.75,
    presence_penalty: 1.75,
    stop: ['######'],
  },

[PRODUCT_NAME]: {
prompt:`To come up with an original name for a product,  you must accurately identify the elements of creativity such as originality, novelty, flexibility, adaptability, and imagination. The name you come up with must be readable and writable.  It should be unique. It should be short, punchy, and memorable. It should look good written down and sound cool to say. And it should evoke an emotion, feeling, or idea. Given a description of a product, create an original product name.
######
Description: Give me a name for a discreet and easy way to relieve yourself outdoors
Product Name: PeePee TeePee
######
Description: Give a name for a salad made with cabbage, kale, and other leafy greens
Product Name: Cabbalaya
######
Description: Give me a name for a toothbrush that also functions as a water flosser
Product Name: Twish
######
Description: Give me a name for a nutritional supplement that helps improve brain function
Product Name: Neurunite
######
Description: Give me a name for strong, lightweight scissors that small hands can use. The product could be made of plastic or metal with an adjustable blade and spring tension lever (to make it easier to cut different thicknesses) as well as removable finger grips to accommodate right-handedness and left-handedness
Product Name: MegaSnip
######
Description:`,  
lastToken: '\nProduct Name: ',
temperature: 1.0,
max_tokens:  64,
top_p: 1,
n: 10,
frequency_penalty: 2.0,
presence_penalty: 2.0,
stop: ['######'],
},

[BUZZWORD]: {
prompt: `This Artificial General Intelligence tool can accurately identify the elements of creativity such as originality, novelty, flexibility, adaptability, and imagination. And when given a context it creates a new word or phrase that doesn't exist.
######
Context: Give me a word that describes people who eat very large meals
Buzzword: Gigantomachians
######
Context: Give me a word that describes a cultural movement where young people are retiring early
Buzzword: YOLOism
######
Context: Give me a word that describes someone who is obsessed with Kim Kardashian
Buzzword: Kimopheliac
######
Context: Give me a name for followers of Donald Trump
Buzzword: Trumpanzees
######
Context:`,  
lastToken: '\nBuzzword: ',
temperature: 0.95,
max_tokens:  64,
top_p: 1,
n: 10,
frequency_penalty: 2.0,
presence_penalty: 2.0,
stop: ['######'],

},

[WEBSITE_HERO_TITLE]: {
  prompt: `A hero title is a title that is used to describe the main content of a web page. It is usually the first thing that a user sees when they visit a web page. When given a hero title, write a hero title following the guidelines.
  ######
  Product Description: Give me website hetro text for Earin, the world's first smart earplugs that let you control what you hear.
  Hero Text: Listen to what you want, when you want.
  ######
  Product Description: Give me website hero text for Home Depot, a leading manufacturer of home improvement products and services.
  Hero Text: Come Home to a Home that's Better Than Ever.
  ######
  Product Description: Give me website hero text for Sandals, an All-Inclusive Hotel Chain.
  Hero Text: All You Need Is Love
  ######
  Product Description: Give me website hero text for Topshop, a leading global fashion retailer.
  Hero Text: The Best Fashion Brands in the World
  ######
  Product Description: Grow healthy is a Medical Marijuana Company.
  Hero Text: Grow Better with Grow Healthy
  ######
  Product Description: `,
  lastToken: '\nHero Text:',
  temperature: 0.95,
  max_tokens: 25,
  top_p: 1,
  n: 10,
  frequency_penalty: 0.9,
  presence_penalty: 2.0,
  stop: ['######'],
},

[GENERAL_HEADLINE]: {
  prompt: `Your ad always begins with the target market and inevitably leads that market into your product. The beginning of your ad— your headline—is the first step in this process. Your headline is based entirely on the answer to these three questions: What is the mass desire that creates this market? (Which we have already discovered.); How much do these people know today about the way your product satisfies this desire? (Their State of Awareness.); How many other products have been presented to them before yours? (Their State of Sophistication.). Your headline has only one job—to stop your prospect and compel him to read the second sentence of your ad. In exactly the same way, your second sentence has only one job—to force him to read the third sentence of your ad. And so on. Your headline is faced with one of seven tasks; To reinforce your prospect's desire for your product; To sharpen his image of the way your product satisfies that desire; To extend his image of where and when your product satisfies that desire; To introduce new proof, details, documentation of the way your product satisfies that desire; To announce a new mechanism in that product to enable it to satisfy that desire e\-en better; To announce a new mechanism in your product that eliminates former limitations; Or to completely change the image or the mechanism of that product, in order to remove it from the competition of other products claiming to satisfy the same desire. This exact forumula should be applied to any kind of headline or title when given a context.
  #####
  Context: Give me a headline for Steinway, a brand of Pianos targeting piano enthusiasts
  Headline: "Steinway—The Instrument of the Immortals."
  ######
  Context: Give me a headline for Rolls Royce, the world's most expensive and popular brand of luxury cars
  Headline: "At 90 miles an hour, the loudest noise in a Rolls Royce is the electric clock." 
  ######
  Context: Give me a headline for Zippo, a brand of lighters that last longer
  Headline: "The amazing story of a Zippo that worked after being taken from the belly of a fish."
  ######
  Context: Give me a headline for Lux is a brand of beauty soap
  Headline: "9 out of 10 screen stars use Lux Toilet Soap for their priceless smooth skins."
  ######
  Context: Give me headline for an ad that appears in the winter when cold drinks are only consumed during the summer
  Headline: "Thirst Knows No Season"
  #####
  Context: Give me the title of a book about creating a positive impression in a professional context. 
  Headline: "How to Win Friends and Influence People"
  ######
  Context: Give me a headline for a brand of bleach targeting housewives
  Headline: "Who else wants a whiter wash—with no hard work"
  ######
  Context: Give me a headline for a news story about a woman who found her long lost love after 50 years
  Headline: "Love Found After 50 Years: They Met Again and Fell in Love all Over Again"
  #####:`,
lastToken: '\nHeadline:',
temperature: 0.95,
max_tokens: 25,
top_p: 1,
n: 10,
frequency_penalty: 0.9,
presence_penalty: 2.0,
stop: ['######'],
},

[BOOK_TITLE]: {
prompt: `Given a description create an original book title.
######
Description: A book about the future of space travel
Book Title: To the Edge of the Universe: A Guide to the Future of Space Travel
######
Description: A book about a family who moves to a new house
Book Title: Home Again
######
Description: A book about human psychology and the impact on social media
Book Title: The Psychology of Social Media: How Our Minds are Changed by Facebook, Twitter, and Instagram
######
Description: A book about a woman who is trying to find her place in the world
Book Title: The Search for Meaning: A Woman's Odyssey
######
Description: The autobiography of a farmer who lived alone on a island
Book Title: Isolated: The Autobiography of a Farmer
######
Description: A book about the impact of Rastafari Culture on Black Racial Identity
Book Title: Rastafari and Black Racial Identity: How a Culture of Rejection Shaped a Movement
######
Description:`,
lastToken: '\nBook Title: ',
temperature: 0.94,
max_tokens:  64,
top_p: 1,
n: 10,
frequency_penalty: 1.5,
presence_penalty: 1.5,
stop: ['######'],
},

};

module.exports = {
  headlineDavinciEnginParams,
};