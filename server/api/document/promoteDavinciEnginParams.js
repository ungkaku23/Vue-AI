const TAGLINE_WRITER = 'tagline-writer';
const HEADLINE_SLOGAN = 'headline-slogan';
const VIDEO_SCRIPT = 'video-script';
const GENERAL_COPY = 'general-copy';
const AIDA = 'aida';
const PAS = 'pas';
const BAB = 'bab';
const FAB = 'fab';
const GOOGLE_ADS = 'google-ads';
const FACEBOOK_ADS = 'facebook-ads';
const AMAZON_ADS = 'amazon-ads';
const BILLBOARD_COPY = 'billboard-copy';
const PRINT_AD = 'print-ad';
const RADIO_AD = 'radio-ad';
const MAGAZINE_AD = 'magazine-ad';
const COPY_FREESTYLE = 'copy-freestyle'
const ADVERTISING_IDEA = 'advertising-idea';

const promoteDavinciEnginParams = {
  [TAGLINE_WRITER]: {
    prompt: `Let's think step by step how to accurately identify the elements of creativity - originality, novelty, flexibility, adaptability, and imagination. And when given a priduct description, write attention-grabbing taglines that are unique, imaginative, and memorable.
######
Product Description: Give me a tagline for Apple, a computer software company that sells Mcintosh Computers
Tagline: "Think Different"
######
Product Description: Give me a tagline for KitKat, a chocolate-covered wafer Candy Bar
Tagline: "Have a Break. Have a KitKat"
######
Product Description: Give me a tagline for McDonald's, a fast-food restaurant
Tagline: "I'm lovin' it"
######
Product Description: Give me a tagline for MTV, a music television station
Tagline: "I want my MTV"
######
Product Description: Give me an ad for Singer, a maker of Sewing Machines
Tagline: "Bringing you joy. One stitch at a time"
######
Product Description: Give me a tagline for HP, a personal computer company that sells Laptops
Tagline: "Good to be different"
######
Product Description: Give me a tagline for General Electric, a business conglomerate that sells electronics and household appliances
Tagline: "Make progress. Together"
######
Product Description:  Give me a tagline for M&M, a brand of chocolate candy
Tagline: "Melts in your mouth. Not in your hand."
######
Product Description: Give me an ad for Rum Bar, a brand of rum that has higher alcohol content than regular rum
Tagline: "Raise the Bar"
######
Product Description: `,
    lastToken: '\nTagline:',
    temperature: 0.95,
    max_tokens: 15,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ['######'],
  },

  [ADVERTISING_IDEA]: {
    prompt:`There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it.  Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. They build punch, charm, and humor into your sentences. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a, the, in, over, and, yet, to , when, before, is, was, be. And all the rest. Unless you put them in a sentence, they give you no picture at all. They tell us how the Picture Words are connected.  They sort the Picture Words out for us. They arrange them in logical order. Let's think step by step how to understand these two kinds of words and their underlying beliefs and assumptions, and when given a brief create original advertising ideas which become the central thought of an advertising campaign.
    ######
    Brief: Old Spice invented body wash for men. But as the category grew, lots of brands tried to get a piece of the pie. The key insight is that 60% of body wash purchases are made by women. How can we provoke a conversation between couples?
    Advertising Idea: The Man Your Man Could Smell Like
    ######
    Brief: Gray's Cookies are the best tasting yet guilt-free pleasure so you can stay in control of your health and mind." It's targeted at suburban working moms, 35-40, who are willing to do whatever it takes to stay healthy. They run, work out and eat right. For many, food can be a stress-reliever and escape even for people who watch what they eat. Once consumers cheat on their diet, it puts their whole willpower at risk. "Once I give in to a cookie, I can't stop myself. They taste too good. It puts my diet at risk of collapsing. I feel so guilty." The main message is that with Gray's Cookies, you can do what you want and stop feeling guilty over eating a damn cookie.
    Advertising Idea: The Cookie That Doesn't Count
    ######
    Brief: The purpose of the ad is to expand Red Bull into the older adult market as a beverage that can give them the focus needed to tackle their deepest desires. The target audience is middle-aged men and women reaching the "midlife crisis" aspect of their lives. They are in need of an internal change and lack the motivation and direction to make it happen. They feel they have wasted away their lives and fear only doom lies ahead. What are the supporting rational and emotional reasons to believe and buy? Red Bull increases performance, increases concentration and reaction speed, improves vigilance, stimulates motivation, and makes you feel more energetic and thus improving your overall well-being. What is the big idea? Get your balls back.
    Advertising Idea: The Fearless Age
    ######
    Brief: `,
    lastToken: "\nAdvertising Idea: \n",
    temperature: 1.0,
    max_tokens: 30,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ["######"],
  },
    
  [HEADLINE_SLOGAN]: {
    prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. It is there. It exists. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. Once again, every time you write or say a Picture Word you see some­ thing. 
    And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a... the... in... over... and... yet. .. to... when... before. And especially is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. Connecting Words tell us how the Picture Words go together. They tell us how the Picture Words are connected to each other. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order. That's why we call them Connecting Words. A Connecting Word is a word that shows us the connection between our Picture Words. We need Picture Words. And we need Connecting Words. We have to point things out. And we have to show how they fit together. And how they connect or relate, to each other. This is grammar in a nutshell. We take two kinds of words. We learn the best ways to put them together. And then we use them to tell other people our thoughts. Let's think step by step how to follow this simple procedure, and when given a brief, write compelling headlines with matching slogans.
######
Description: Give me a headline and slogan for Crest Toothpaste
Headline: Since 1955, Crest has helped 40 million kids prevent cavities
Slogan: Why trust your family's teeth to anything else?
######
Description: Give me a headline and slogan for Berkline Recliners
Headline: The Berkline Recliners. For those who like to mix beauty with pleasure
Slogan: Taking it easy never looked so good.
######
Description: Give me a headline and slogan for Google Pixel 6
Headline: The best just keeps getting better
Slogan: Pixel by Google.
######
Description: Give me a headline and slogan for Excedrin Headache Medicine
Headline: There's no room in my schedule for a headache
Slogan: Powerful relief, Powerful fast.
######
Description: Prudential Life
Headline: I came back to the rock three times
Slogan: Come back to a company people come back to.
######
Description: Give me a headline and slogan for E.F Hutton Investing
Headline: People invest for one reason: to make money
Slogan: When E.F Hutton talks, people listen.
######
Description: Give me an headline and slogan for The New York Times
Headline: Informing America
Slogan: The truth is the truth.
######
Description: `,
    temperature: 0.95,
    max_tokens: 50,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

  [VIDEO_SCRIPT]: {
    prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it.  Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. 
    And there are Picture Words which show us more than one kind of picture. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a, the, in, over, and, yet, to , when, before, is, was, be. And all the rest. Unless you put them in a sentence, they give you no picture at all. They tell us how the Picture Words are connected. They sort the Picture Words out for us. They arrange them in logical order. 
   Let's think step by step how best to understand these two kinds of words and their underlying beliefs and assumptions, and when given a brief which includes the name of a brand, the target audience, the overall message of the ad, and tone of voice, create tv commercials written in any style such as the highly emotional lifestyle branding campaign from Nike. Like these for example:
    #######  
    Product: Give me an ad for Nike Shoes targeting everyday athletes. The tone is motivational.
    Script:
    Title - "Never too far down"
    We've all been underestimated and counted out
    In those moments we felt like it was over
    But it's when we're given no chance
    that we somehow found that last bit of strength to keep fighting
    And then we did what no one thought we could.
    Not even ourselves
    We came back from the impossible
    From being broken
    We're never too far down\
    To come back.
    ######
    Product: Give me an ad for running shoes, Targeting everyday athletes. The tone is deeply emotional.
    Script:
    Title - "Unlimited"
    When we talk about running
    What do we usually think of?
    The finish line
    How many seconds it took to get there
    Our time
    How fast we ran
    Our pace
    How quickly we crossed the line
    But what about the journey
    What about the climb
    The long-distance
    The days and miles to get there
    We're not running because we're done
    We're running to see what's next
    It's because we're not done
    That we can't stop running
    So if you're not done running
    You're not done living
    That's what unlimited is.
    ######
    Product: Give me an ad for Nike Headbands targeting female athletes. The tone is inspirational.
    Script:
    Title - "Dream Crazier"
    If we show emotion
    We're called dramatic
    If we wanna play against men
    We're nuts
    And if we dream of equal opportunity? 
    Delusional
    When we stand for something? 
    We're unhinged
    When we're too good? 
    There's something wrong with us
    So if they wanna call you crazy? 
    Fine
    Show them what you can do
    It's only crazy until you do it
    Dream crazier.
    ######
    Product:`,
    lastToken: '\nScript:',
    temperature: 1.0,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],

  },


  [RADIO_AD]: {
    prompt: `There are two types of words. Picture Words and Connecting Words. A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word you can see, hear, feel or imagine something. There are Picture Words that show us things. Picture Words that show us actions. Picture Words that show us colors. Picture Words that show us size. Picture Words that show us details of other pic­tures. Picture Words that show us feelings. Picture Words that show us judgments. Picture Words that show us ideas. And Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture and helps you transfer that picture from your mind to the mind of someone else. Every time you say one of them, you see some­thing and the person you're talking to also sees that same thing. A Connecting Word is a word that has no built-in picture. When you say a Connecting Word by itself you don't see anything. Words like  "the", "a", "an", and "to" and all the rest, are all considered to be connecting words because they don't create a mental image on their own. The purpose of the Connecting Word is to tell us how the Picture Words are connected in time, space, meaning, or sequence. When you put these two types of words together, you can create new pictures and new meanings which allow for the expression of even the most creative ideas that you can hear, feel, and imagine. To write a Radio Ad that is witty, imaginative, emotional, funny, warm, friendly, luxurious, upbeat - or any other tone, along with appropriate sound effects and stage directions, follow the instructions given in the brief.
    ######
    Brief: Give me a radio ad for  Motel 6. It is a straight announcer ad and the general tone of the music is relaxed yet urgent.
    Script:  {Spoken in a cool and relaxed tone. Picture an old cowboy taking some time off their day to tell you about motel 6}. The copy reads:  Hi! I’m Tom Bodett; apparently, the hip thing for businesses these days is to target millennials. So, it may sound sass coming from this baby boomer but motel 6 is a V great place for your squad to stay woke. Or, asleep. The updated rooms are hashtag blessed with contemporary floors, bedding, and flat-screen TVs that are totally on fleek. Plus their prices are always low AF. I’m Tom Bodett and we’ll keep it lit for ya, book online, at motel 6 dot com
    ###### 
    Brief: Give me an ad for the new Harvey Nichols Beauty Lounge. They've just opened a new location in Knightsbridge. The tone of the ad is charming with a bit of humor at the end.
    Script: We hear a transcript between a man and an emergency services operator. The man sounds annoyed.//999: Emergency services. //Man: Someone just stole our car.//999: OK, where was it stolen?//Man: In front of the house. I saw the whole thing. //999: And did the person force entry? //Man: She had keys.//999: She had keys? OK. Can you describe her to me? //Man: Mid-thirties. Brunette. Really… nice… hair. //999: Can you tell us anything else //Man: Yeah, she was wearing my wife’s leather jacket. She loved that jacket. Hold on… she’s coming back. //999: It’s alright. Just stay with me. //Man: Sorry, she’s trying to say something. //SFX: We hear a car pulling up and a door slamming. In the background, we hear a woman’s voice.c//Woman: I forgot my purse.c//Man: She says she’s forgotten her purse. Oh, hang on… whoops. //SFX: Hangs up, continuous beep tone. //VO: The new Harvey Nichols Beauty Lounge. Now open in Knightsbridge. Careful, they might not recognize you.
    ######
    Brief:`,
    temperature: 1.0,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.0,
    presence_penalty: 1.0,
    stop: ['######'],
  },

  [AIDA]: {
    prompt: `AIDA stands for Attention - Interest - Desire - Action, and is a copywriting formula. Attention: Attracts customers' attention. Interest: Demonstrates the features, advantages, and benefits of the product. Desire: Convinces customers that the product or service is something they want and will satisfy their needs. Action: Tells the reader what to do, like buy or try your product. If given a product description, write sales copy using the AIDA copywriting formula.
######
Product Description: Give me an ad for Acme, makers of the world's first invisible cloak
Attention: It made the creators famous overnight
Interest: Now you can get yours at AcmeForEveryone.com
Desire: The sudden rush to sell the Invisible Cloak has pushed sales to the max
Action: Act before it's too late.
######
Product Description: Give me copy for Saucy, a restaurant that Sells authentic Caribbean Cuisine
Attention: Magazine editors always include this restaurant on their list of best restaurants during Caribbean Month and the holidays
Interest: Menu items are inspired by the native cultures from 35 countries
Desire: Saucy Sells is the best-kept secret in the Caribbean food circuit
Action: Find out why by visiting SaucySells.com and signing up for our newsletter.
######
Product Description: Give me an ad for Aquafina Spring Water
Attention: Enjoy Great Water Nothing Else!
Interest: Aquafina came of age in the early 1990s as consumers increasingly saw bottled water as better than sugary sodas, with fewer calories
Desire: We provide a pure source of drinkable water for the entire family
Action: Can't resist the urge? Easily grab some at local grocery stores, drug stores, or other convenient locations.
######
Product Description: Give me and ad for Kanda Laboratories, a company that sells Botox for Dogs
Attention: Kanda Laboratories unveiled details about the new line of products this week
Interest: As prosperity grew in cities, so did the problem of dogs biting people
Desire: Kanda Laboratories has sold over 5 million doses since its debut six years ago
Action: Now, you can purchase our best selling line of anti-bite remedies online.
######
Product Description: Give me copy for Klipjet, a dental floss/pick with on-point tools on each end
Attention: Klipjet boasts an on-point dental floss feature with extra-thick, Teflon-coated floss
Interest: Also having two of these tools in your mouth- one of which combines a brush and pick
Desire: It's time to go to the dentist for a checkup more frequently
Action: With Klipjet, you can save money on dental treatments for the family.
######
Product Description: Give me copy for Sativa- Sweet Marijuana Seeds
Attention: Sativa- Sweet Marijuana Seeds grow easy and have a sweet taste
Interest: Sativa-Sweet Marijuana, with big yields of the tallest kind of marijuana
Desire: Sativa-Sweet Marijuana Seeds get their name from their sativa traits
Action: Order right now at Sativa-SweetMarijuana.com.
######
Product Description: Give me copy for the Treadmill Desk
Attention: Treadmill Desk is the ultimate all-in-one workout device
Interest: Treadmill Desk combines cardiovascular exercise with workstation ergonomics
Desire: The new Treadmill Desk for Laptops is the world's most lovable treadmill
Action: You can work while expending energy with the Treadmill Desk.
######
Product Description: Give me ad copy for the The Electronic Kangaroo, a toy for babies
Attention: The Electronic Kangaroo automatically bounces your baby to sleep
Interest: The Electronic Kangaroo is the safest way to comfort babies from birth to three years old
Desire: The Electronic Kangaroo mimics the natural soothing effect of holding a parent
Action: Baby will fall asleep faster than ever with the Electronic Kangaroo.
######
Product Description: `,
    temperature: 0.95,
    max_tokens: 85,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

  [PAS]: {
    prompt: `PAS is a copywriting formula in which the copywriter identifies the problem (problem), highlights the problem (agitate), and offers a solution (solve) to the problem. Here are some examples.
######
Product Description: The Skinny Bra is the world's first bra that offers a natural lift
Problem: Bras are uncomfortable and expensive
Agitate: The Skinny Bra offers an ultra-cute look with a natural lift
Solve: The Skinny Bra offers a comfortable and affordable solution for women with a small bust.
######
Product Description: The Freedom Wallet is the world's slimmest form of cash holder
Problem: Clutch Purses are expensive, take up a lot of room, and are hard to use
Agitate: Wallet is cumbersome to carry
Solve: The Freedom Wallet is perfect for those seeking a slimmer, less expensive, and more functional alternative to a traditional wallet.
######
Product Description: The Shelfie is the perfect solution for organizing your never-ending mess
Problem: I need something to help me organize my books
Agitate: Books are overflowing, stacking all over my room
Solve: The Shelfie is stylish, lightweight, and easy to maneuver with elegant design that allows for ample storage with highly organized finishes.
######
Product Description: The Wand Box is a protective wall mount holder with a lightweight design 
Problem: Wires, cords, and cables can be a hassle when trying to find a spot for them
Agitate: Conceptual solution is a mess of wires and cords
Solve: The Wand Box works with any smooth, flat surface and with any cord type, from USB cords to power cords. It cuts down on wall clutter and is ready to go out of the box.
######
Product Description: Clip-it is a coat hook for clothes 
Problem: Hanging clothes is hard!
Agitate: Ordinary hooks get in the way of your clothes
Solve: Clip-It is designed to hang clothes with zero interruptions, much like a clothes rod. The hooks are discreet and stay out of the way of clothes.
######
Product Description: The Envelope is a protective sleeve for laptops 
Problem: Scratches on a laptop make it look old
Agitate: The colors of a laptop fade and it starts to look old
Solve: The Envelope has a soft silicone lining on the inside that prevents scratches and a transparent TPU exterior on the outside that provides a streamlined appearance with a weightless design.
######
Product Description: The Smart Memo is an iOS app
Problem: Typing long memos is cumbersome
Agitate: Typing memos on a phone is difficult
Solve: The Smart Memo app is for people who want to take notes effortlessly on their iphone. 
######
Product Description: The Pee-Shee is the world's first female urination device
Problem: Using a toilet while pregnant is difficult
Agitate: Holding pee while pregnant is uncomfortable
Solve: The Pee-Shee is a short, squat device that can be adjusted to provide a comfortable and convenient way to pee- while pregnant!
######
Product Description: The Cloud Nail Care System
Problem: Filling in nail polish chips is tedious
Agitate: Paint chips on nails are time consuming
Solve: The Cloud Nail Care System provides an easy, do-it-anywhere method to clean, dry, and polish nails without the hassle.
######
Product Description: The Smart Pouch
Problem: Tying up your phone with a lifeline is cumbersome
Agitate: The cords that connect your phone to your charger are tangled
Solve: The Smart Pouch is the best way to charge your device while still feeling free all day.
######
Product Description: `,
    temperature: 0.95,
    max_tokens: 85,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },
  [BAB]: {
    prompt: `The Before-After-Bridge ( BAB) is a formula used in copywriting. When given a product description write sales copy using the BAB copywriting formula.
######
Product Description: HoneyPot helps people save money on online subscriptions
Before: You sign up for a new subscription service…
After: And just like that, you’ve had enough. 
Bridge: This is why HoneyPot exists. To save you from signing up for another subscription service and to save you from having to cancel another service.
######
Product Description: Geico Saves you 15% or more on Car Insurance
Before: What if you could get a 15% discount on car insurance?
After: You’ll have a lot more money to spend on the things you want
Bridge: Start saving today by calling Geico at 1-800-947-Geico.
######
Product Description: Barmdaz is an electric toothbrush
Before: Using a good quality electric toothbrush every day is one of the best ways to take care of your teeth and gums…
After: that is, until you get fed up with charging it every night
Bridge: Welcome to the world of Barmdaz. A toothbrush you never need to charge.
######
Product Description: Pandaa HD Movie Player
Before: If you wanted to watch a movie from 2015 from a curated HD movie streaming service, you would have a lot of options…
After: But a year later a lot a a factors might have changed.
(1) You might have a larger TV.
(2) You might have a better internet connection.
Bridge: That’s why Pandaa HD Movie Player was created. To convert any online video to play on your TV.
######
Product Description: The Habit Habit
Before: You know how it goes, you start your weight-loss journey, join the gym, start eating breakfast, start eating less…
After: But several weeks go by without any real change. You’ve had enough! (cue pain)
Bridge: That’s where The Habit Habit comes into play. It guides you through the process of breaking your bad habits, creating new habits and building the life of your dreams.
######
Product Description: Owk is a Mobile Screen Sharing Software 
Before: It’s annoying to show someone your phone and have them see all kinds of messages, apps and other stuff that you don’t want them seeing…
After: You want everything hidden except for the area that you plan on sharing
Bridge: With Owk, you don’t have to worry about any of that. Just tap to start a session and share your screen.
######
Product Description: Remtoga Eye Drops and Remedies
Before: You get up and right away your eyes feel tired and burned out…
After: You’ve had enough trying to trade off the discomfort
Bridge: Meet Remtoga, the eye drops that fight eye fatigue and other eye issues by safely washing away hidden contaminants and soothing your eyes with the perfect amount of vitamins and antioxidants.
######
Product Description: CleanerKind is a Cleaning Service App 
Before: Trying to find the best cleaning service these days is so frustrating…
After: When most of them keep sending you quotes, don’t even show up on time, or just plainly didn’t do the job
Bridge: CleanerKind is basically Uber for cleaning. You just press “clean”, swipe through the suggestions and then the service only has 60 minutes to respond.
######
Product Description: WonderWebSafe is a Free VPN Software 
Before: When traveling abroad it can be risky connecting the hotel WiFi…
After: Even worse, you could end up having to reset your device to factory settings or worse
Bridge: Welcome to the WonderWebSaFe VPN software. Simply download our install it. Watch your email for an activation link. Celebrate, because now your laptop/tablet is safe from hackers, reporters, crooks, spies, bankers, crooks…
######
Product Description: `,
    temperature: 0.95,
    max_tokens: 100,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

  [FAB]: {
    prompt: `FAB is a copywriting formula that stands for Features, Advantages, Benefits. "Features" describe what your product can do. "Advantages" describe why this is useful to the customer. "Benefits" describe how it will benefit the customer once they buy or use the product. When given a product description, write persuasive sales copy using the FAB copywriting formula.
######
Product Description: JIF® Brand Peanut Butter
Features: Creamy and delicious
Advantages: Made from the finest ingredients nature has to offer, with no added sugars or oils
Benefits: JIF® Brand Peanut Butter is a heart-healthy, gluten-free product that tastes great.
######
Product Description: Snuggie is a Blanket
Features: It's your blanket that has sleeves
Advantages: Keeps you warm without the use of extra covers
Benefits: Snuggie can be worn in multiple ways- as a scarf, shawl, coat, nursing cover, or sleeping bag.
######
Product Description: Ticonderoga Pencils
Features: They are the #1 preferred pencil by teachers for over 125 years
Advantages: Wooden cased, no scratchy eraser pieces, cleanly sharpened point every time
Benefits: The simple joy of writing without worry.
######
Product Description: Hershey's Classic Bar
Features: It's made with 100% chocolate.
Advantages: It has no artificial flavors, synthetic colors, preservatives, or allergens (gluten and peanuts)
Benefits: It's a favorite grown-up treat everyone can enjoy.
######
Product Description: The Goodyear Welted Moc Toe Shoe
Features: Made with the finest materials, they are water-resistant and designed to be durable
Advantages: Item ships free of charge; Made in Ethiopia
Benefits: It's a sturdy and stylish shoe that you'll be able to wear for years.
######
Product Description: Merry Maids® Home Cleaning Service
Features: Provides expert residential, commercial and post-construction cleaning in various areas of over 75 cities
Advantages: Our workers go where others won't! We offer customized plans and convenient scheduling. We always give you up to 3 estimates without any obligation.
Benefits: Let Merry Maids make your life easier! All our products are eco-friendly.
######
Product Description: Lavazza Espresso
Features: It's made with 100% Arabica coffee beans
Advantages: It has no artificial flavors, synthetic colors, preservatives, or allergens (gluten and peanuts)
Benefits: It's the perfect pick-me-up for an energizing start to your day or perfect end to your day.
######
Product Description: SodaStream
Features: It's a state-of-the-art home soda maker with convenient features
Advantages: It comes with a one-year money back guarantee
Benefits: You can create healthy, homemade soda with no sugar or corn syrup.
######
Product Description: Gold Bond® Lotion
Features: It has been a trusted brand for over 75 years
Advantages: It doesn't leave a greasy residue, so it's perfect to wear under makeup 
Benefits: It’s clinically proven to help prevent scaly skin due to minor skin conditions.
######
Product Description: Canon EOS Rebel T6 DSLR
Features: It has a 24.2 megapixel sensor, incredible ISO range, and a vast variety of lenses that you can add
Advantages: Great for photographers of all experience levels with a variety of easy-to-use features
Benefits: Create high-quality photos to share with friends and family.
######
Product Description: `,
    temperature: 0.95,
    max_tokens: 85,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

  [FACEBOOK_ADS ]: {
    prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. It is there. It exists. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. Once again, every time you write or say a Picture Word you see some­ thing. 
    And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a... the... in... over... and... yet. .. to... when... before. And especially is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. Connecting Words tell us how the Picture Words go together. They tell us how the Picture Words are connected to each other. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order. That's why we call them Connecting Words. A Connecting Word is a word that shows us the connection between our Picture Words. We need Picture Words. And we need Connecting Words. We have to point things out. And we have to show how they fit together. And how they connect or relate, to each other. This is grammar in a nutshell. We take two kinds of words. We learn the best ways to put them together. And then we use them to tell other people our thoughts. Everything follows from this simple procedure. When given a product, this artificial general intelligence writes very engaging Facebook Ads that that surprises the reader with a headline that grabs and keeps their attention. Then, like a slippery slope, it takes the reader from one line of copy to the next, keeping them rewarded and interested with language, rhythm, and imagery that convinces the reader to take an action, using the occasional flourish of humor, sarcasm, or wit to make it enjoyable.
    ######
    Product Description: Give me an ad for Nola Bars, a low-carb, keto and paleo-friendly bar with no added sugar
    Facebook Ad:  Nutty and sweet in all the right ways. 🥜 || NEW Nola Bars are low-carb, granola-style bars that are as delicious as they are nutritious. No added sugar. Keto and Paleo-friendly. Powered by clean, plant-based ingredients.|| You'll love, love, love these bars. The perfect keto friendly chewy and crunchy taste you’ve been missing. || Use code: GRAINFREE4ME to claim your FREE box plus FREE shipping || Try them risk-free. If you don't love them, we'll give you a full refund. No questions asked. 💖
    ######
    Product Description: Give me a Facebook Ad for Earin, the world's first smart earplugs that let you control what you hear.
    Facebook Ad:  Listen to what you want, when you want. || Hear what you want, when you want. Earin is the world's first smart earplugs that let you control what you hear. With Earin, you can easily listen to music, podcasts, or spoken word content without disturbing the people around you. Control your listening experience with ease, and get the most out of your Earin earplugs.|| "I'm a long-time Earin user and love these earplugs! I use them to listen to music at work and they help me stay focused. I also like to use them when I travel to block out airplane noise." - Sarah || Get your Earin earplugs today and start controlling your listening experience.
    ######
    Product Description: Give me an ad for Pura Vida Bracelets, handmade bracelets made from organic and Fair Trade materials
    Facebook Ad: Give back with every purchase. || Pura Vida bracelets are more than just beautiful accessories. For every bracelet purchased, Pura Vida donates a portion of the profits to provide sustainable water sources in developing countries. So not only will you look good, you'll feel good too. Shop Pura Vida today and help provide sustainable water sources to those in need.
    ######
    Product Description: `,
    lastToken: '\nFacebook Ad:',
    temperature: 0.95,
    max_tokens: 100,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

[MAGAZINE_AD] : {
  prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. It is there. It exists. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. Once again, every time you write or say a Picture Word you see some­ thing. 
  And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a... the... in... over... and... yet. .. to... when... before. And especially is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. Connecting Words tell us how the Picture Words go together. They tell us how the Picture Words are connected to each other. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order. That's why we call them Connecting Words. A Connecting Word is a word that shows us the connection between our Picture Words. We need Picture Words. And we need Connecting Words. We have to point things out. And we have to show how they fit together. And how they connect or relate, to each other. This is grammar in a nutshell. We take two kinds of words. We learn the best ways to put them together. And then we use them to tell other people our thoughts. Everything follows from this simple procedure. When given a brief, this artificial general intelligence writes ad copy that surprises the reader with a headline that grabs and keeps their attention. Then, like a slippery slope, it takes the reader from one line of copy to the next, keeping them rewarded and interested with language, rhythm, and imagery that convinces the reader to take an action, using the occasional flourish of humor, sarcasm, or wit to make it enjoyable:
  ######
Brief: Give me and ad that excites advertisers about the fact that The Guardian Newspaper is an exciting option for advertisers, especially those who are targeting sports fans.
Copy: the headline reads: "We cannot deny it.  Left Wingers Enjoy the Guardian."  The body copy reads: "It comes as no surprise. A readership so youthful is bound to be a sporting crowd.  Indeed, according to the National Readership Survey, we more all-educate ABC1 readers under 45 that any other quality daily: 342,000. True to form, they dress fashionably and drink stylishly. Better, in fact, than readers of any comparable newspaper. Perhaps they wear well because they lead such active lives.  Among our 1.13 million readers, we can, for instance, count on 125,000 golfers, and 221,000 tennis players. And at least one professional footballer."
  ######
Brief: Give me an ad for the most expensive restaurant in town that wants to advertise to high-end, wealthy clientele
Copy:  The headline reads: "For When Money is No Object". The body copy reads: "Welcome to our world. Here, the finest things in life come at a price - but it's a price we're willing to pay. Because when you have the means, why not enjoy the very best?  Our menu features only the most exotic and luxurious dishes, prepared by our team of Michelin-starred chefs using only the freshest ingredients sourced from around the world. And for those who like their food with a side of excitement, we also offer an extensive wine list featuring some of the rarest vintages in existence. So whether you're looking to indulge your senses or impress business associates, there's no better place than here."
######
Brief: Give me an ad for The Woman's Day magazine who wants to bring awareness to the fact that many baby animals are killed each year in various rituals across the world. They want to support Greenpeace's efforts to stop these atrocities.
Copy:  The headline reads: "How to Kill a Baby". The body copy reads: "It's easy. All you do is walk up to it. It won't run away. Then, as it looks up at you trustingly mistaking you for its mother, you smash in its skull with a baseball bat.  That's what happens to baby seals in Canada every year in a bloody ritual that lasts six weeks. In Japan, they do it a different way. They herd dolphins into the shallows, waiting for the tide to leave them stranded, then go through the same grisly process. Then there's the whales. You know what happens to them. Doing it is dead easy if your mind is warped enough. Stopping it is a whole lot harder, but there is something you can do. In this week's Woman's Day, we're running a thought-provoking article on what's happening to these beautiful creatures. We're also running a simple competition that you and your children can enter. All you have to do is tell us in less than twenty words, what the seals, the dolphins, and the whales would say if they could speak. There are cash prizes, but far more importantly, for every entry in the competition, Woman's Day will donate 10 cents to Greenpeace to help their work in bringing this ghastly business to a halt. Look for this week's Woman's Day. It's the one with the baby seal on the cover, seconds before it dies."
######
  Brief:`,
  lastToken: '\nCopy:',
    temperature: 1.0,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
    stop: ['######'],
},

  [AMAZON_ADS ]: {
    prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. It is there. It exists. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. Once again, every time you write or say a Picture Word you see some­ thing. And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a... the... in... over... and... yet. .. to... when... before. And especially is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. Connecting Words tell us how the Picture Words go together. They tell us how the Picture Words are connected to each other. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order. That's why we call them Connecting Words. A Connecting Word is a word that shows us the connection between our Picture Words. We need Picture Words. And we need Connecting Words. We have to point things out. And we have to show how they fit together. And how they connect or relate, to each other. This is grammar in a nutshell. We take two kinds of words. We learn the best ways to put them together. And then we use them to tell other people our thoughts. Everything follows from this simple procedure. When given a context, this artificial general intelligence writes detailed, engaging Amazon Ads following the Amazon Ad Copy Writing Guidelines.
    ######
    Product: Give me an ad for Lutron Caseta Deluxe Smart Dimmer Switch (2 Count) Kit | Works with Alexa, Apple HomeKit, and the Google Assistant | P-BDG-PKG2W-A | White
    Amazon Ad:
    PEACE OF MIND: Set lights to automatically adjust with changing seasons so your family always comes back to a well-lit home; you can also enable the Smart Away feature to randomly turn your lights on and off to look like you’re home even if you’re away.
    MOST CONNECTED: Caseta connects with more leading smart home devices – including Alexa, Apple HomeKit, the Google Assistant, Serena shades and Sonos – than any other smart lighting control brand
    CONTROL YOUR WAY: Caseta puts the smarts in the switch so you can control your lights a variety of ways – via the free Lutron app, your voice, or from the wall. You can create personalized schedules to turn on, off, or dim lights at set times to best fit your everyday routines, or activate favorite lighting scenes with the touch of a button
    ######
    Product: Give me an ad for Jamaican Black Castor Oil
    Amazon Ad:
    Our Jamaican Black Castor Oil is a carefully designed and crafted product for your health and wellbeing. Our JBCO is 100% pure, all natural with no additives, chemicals or preservatives. It can be used in many ways but our most recommended use of this powerful oil is topically to support hair growth!
    Product Highlights:
    -Helps promote healthy energy production within cells
    -Suitable for Vegans – No Animal Products Used.. Ever! 
    -Black castor oil relieves constipation by slowing down the movement of food through the intestines
    All natural - No additives, chemicals or preservatives 
    -Natural product for promoting healthy hair growth
    Enviro-Friendly
    Enhances cellular energy production and metabolism for promoting healthy skin, hair and nails
    Your support of this product helps to provide low-cost quality Jamaican Black Castor Oil (JBOCO) with a focus on affordability; 100% pure - no additives or preservatives. Help us create local jobs in Jamaica
    ######
    Product: `,
    lastToken: '\nAmazon Ad:',
    temperature: 0.94,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

  [COPY_FREESTYLE]: {
    prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. It is there. It exists. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. Once again, every time you write or say a Picture Word you see some­ thing. And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a... the... in... over... and... yet. .. to... when... before. And especially is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. Connecting Words tell us how the Picture Words go together. They tell us how the Picture Words are connected to each other. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order. That's why we call them Connecting Words. A Connecting Word is a word that shows us the connection between our Picture Words. We need Picture Words. And we need Connecting Words. We have to point things out. And we have to show how they fit together. And how they connect or relate, to each other. This AI tool learns the best ways to put them to tell other people our thoughts and ideas, and sell our products and services. When given a context, it writes copy that is punchy and engaging, but most of all, convincing.
######
Context: Give me an advertising headline for the new Rolls Royce
Copy: At sixty miles per hour, the loudest noise in this new Rolls-Royce comes from the electric clock.
######
Context: Give me a print ad for the Porsche 911 Turbo Cabriolet
Copy: If Pavlov had experimented with humans, he would have used this. A given stimulus produces a given response. Of course, certain stimuli will produce more extraordinary responses than others. Such as a Porsche 911 Turbo Cabriolet. What we've done, quite simply, is uncover one of the world's most exciting cars. The car that Car and Driver tested
from 0 to 60 in 4.6 seconds, and in 13.1 seconds for the quarter-mile. Figures that seem even more impressive with the wind in your hair. We invite you to test your own responses by coming in for a test drive. All we ask is that you try to avoid drooling on the leather.
######
Context: `,
lastToken: '\nCopy:',
temperature: 0.99,
max_tokens: 150,
top_p: 1,
n: 10,
frequency_penalty: 0.9,
presence_penalty: 2.0,
stop: ['######'],
},

  [GOOGLE_ADS]: {
    prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. It is there. It exists. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. Once again, every time you write or say a Picture Word you see some­ thing. And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a... the... in... over... and... yet. .. to... when... before. And especially is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. Connecting Words tell us how the Picture Words go together. They tell us how the Picture Words are connected to each other. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order. That's why we call them Connecting Words. A Connecting Word is a word that shows us the connection between our Picture Words. We need Picture Words. And we need Connecting Words. We have to point things out. And we have to show how they fit together. And how they connect or relate, to each other. This is grammar in a nutshell. We take two kinds of words. We learn the best ways to put them together. . This is grammar in a nutshell. We take two kinds of words. We learn the best ways to put them together. And then we use them to sell products, services, and ideas. Everything follows from this simple procedure. And this artificial general intelligence tool uses this formula to write high-converting Google Ads that strictly follow the Google Advertising guidelines, and are written in follow the following format:
    ######
    Product Description: Give me a Google Ad for an Insurance Company
    Google Ad: |Comprehensive Insurance | Protect Yourself on a Budget | Get Your Free Quote Today| Get affordable & trustworthy insurance. 10% discount on all online quotes. Easily compare insurance plans side-by-side in just a few seconds.
    ######
    Product Description: Give me an ad for Emirate, the largest airline and one of two flag carriers of the United Arab Emirates. Based in Garhoud, Dubai, the airline is a subsidiary of The Emirates Group, which is owned by the government of Dubai's Investment Corporation of Dubai
    Google Ad: |Fly the Emirates | Your first stop for expedited connections | Convenient Service |  It's our commitment to provide our guests with first-class service, exceptional comfort and the widest choice of destinations.
    ######
    Product Description: Give me a Google Ad for a Bedding Store
    Google Ad: |Find Your Dream Duvet Covers | Shop Now at JCPenney.com | Inspired by Designer Styles| We've taken comfort and quality to new heights with our most innovative collection of duvet covers. Choose from solids in soothing neutrals or lively color combinations that inspire your personality and make you smile.
    ######
    Product Description: Give me a Google Ad for a Gym
    Google Ad: |The Fitness Center | A Gym Near You | Get Fit Today | Whether you're looking for personal training, group fitness, a free fitness class, or a cardio machine, we have everything you need to get in shape.
    ######
    Product Description: Give me a Google Ad for a Dry Cleaning Service
    Google Ad: |Cleaning Services | Dry Cleaners Near You | Fast and Efficient Cleaning | Clean your clothes without breaking the bank. We are family-run dry cleaners in the heart of the city.
    ######
   Product Description: Give me a Google Ad for a Lawyer
   Google Ad: |Find An Attorney | Lawyer Near You | Litigation & Trial Legal Services | We are a boutique firm with a focus on litigation and trial.
   ######
  Product Description: Give me a Google Ad for a Bed and Breakfast
  Google Ad: |Find Your Peace of Mind | Your Stress-Free Retreat | Breakfast Included | Find your peace of mind at Heritage Bed and Breakfast. We take care of the details so you can enjoy your stay. Enjoy a full breakfast before you're off to explore the surrounding area.
  ######
  Product Description:`,
    lastToken: '\nGoogle Ad:',
    temperature: 0.8,
    max_tokens: 100,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['######'],
  },

  [BILLBOARD_COPY]: {
    prompt: `There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. It is there. It exists. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. Once again, every time you write or say a Picture Word you see some­ thing. And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a... the... in... over... and... yet. .. to... when... before. And especially is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. Connecting Words tell us how the Picture Words go together. They tell us how the Picture Words are connected to each other. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order. That's why we call them Connecting Words. A Connecting Word is a word that shows us the connection between our Picture Words. We need Picture Words. And we need Connecting Words. We have to point things out. And we have to show how they fit together. And how they connect or relate, to each other. This is grammar in a nutshell. We take two kinds of words. We learn the best ways to put them together. And then we use them to tell other people our thoughts. Everything follows from this simple procedure. When given a context, this artificial general intelligence writes billboard advertisements that catch a person’s attention and create a memorable impression very quickly using a visual idea that is clear, creative and easily understood.
######
Context: Give me an ad for a brand of toothpaste that strengthens enamel
Billboard: A 3-D cut-out of a man biting into a section of a billboard. The copy reads "[Brand] Builds Strong Teeth"
######
Context: Give me an Ad for Road Safety during rainy conditions
 Billboard: A billboard with a child's face that turns bloody when water touches it. The copy reads "Rain changes everything. Please drive to the conditions"
######
Context: Give me an ad for, HelloScribe, a creative writing assistant for PR & Marketing powered by artificial intelligence
Billboard: A billboard with a writing prompt that changes every day. The text reads "Find your creative voice"
######
Context: Give an an for a brand of insect repellent
Billboard: An image of a person being bitten by mosquitoes with the text "Don't let them bite. Use [brand]"
######
Context:`,
    lastToken: '\nBillboard:',
    temperature: 0.95,
    max_tokens: 80,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

  [PRINT_AD]: {
    prompt: `A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. That picture stands out by itself.  You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And you can be sure when you say it that the other person sees the same picture, too. When we want to tell other people our thoughts there are all kinds of Picture Words we can use. There are Picture Words that show us things. There are Picture Words that show us actions. There are Picture Words that show us colors. There are Picture Words that show us size. There are Picture Words that show us details of other pic­tures. There are Picture Words that show us feelings. There are Picture Words that show us judgments. There are Picture Words that show us ideas.  And - as the most powerful tool of all - there are Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture. And they help you transfer that picture from your mind to the mind of someone else. Once again, every time you say one of them, you see some­thing. And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. 
    A Connecting word has no built-in picture within it. When you say a Connecting Word by itself you don't see anything. Like a... the... in... over... and... yet ... to... when... before... is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. So what is their use? Very simple. They tell us how the Picture Words go together. They tell us how the Picture Words are connected. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order - with sentences, and between sentences. That's why we call them Connecting Words. A Connecting Word shows us the connection between our Picture Words. To get our meaning precise - to avoid confu­sion when we talk to someone - we need both kinds of words. We need Picture Words. And we need Connecting Words. This artificial general intelligence tool takes the two kinds of words. And learns the best ways to put them together to write novels, poetry, textbooks, busi­ness reports, songs, speeches, humor, satire, allegory, and any other kind of writing. Given a request, this tool writes print advertisements that contains a headline and a picture concept. 
    ######
    Context: Give me an Ad for the new Audi R8
    Headline: "The new Audi R8. A work of art that moves you." Visual Idea - The new Audi R8 driving down a city street with the headlights on and the driver visible through the windshield.
    The copy reads "When we set out to design the new Audi R8, we wanted to create a work of art that would move you - both emotionally and physically. We think we've succeeded. The new Audi R8 is stunningly beautiful, inside and out. And it's powered by an incredible V10 engine that will take your breath away. Come see for yourself why the new Audi R8 is one of the most exciting cars on the road today".
    And the tagline reads "Art in Motion"
    ######
    Context: Give me an Ad for Nike Football
    Headline: "Rule the field." Visual Idea - A photo of a soccer player diving for the ball with a Nike logo in the corner. The copy reads "From grassroots to professional level, players everywhere are looking to rule their fields. They want gear that will help them up their game whether they're just starting out or vying for that gold medal. Nike provides athletes with state-of-the art equipment and apparel so they can perform at their best. We never stop innovating because we know that victory is always within reach."
    The Nike tagline "Just do it" apears below the copy.
    ######
    Context: Give me an Ad for Coca-Cola
    Headline: "A Coke a day." Visual Idea - An old fashioned glass bottle of Coca Cola with condensation on the outside, being held by someone off screen The copy reads "There's nothing quite like an ice cold Coca-Cola on a hot summer day."
    The tagline below reads "Coca-cola...refreshing".
    ######
    Context: Give me an ad for a new car dealership is opening in town
    Headline: "Get behind the wheel of your dreams" Visual Idea - A photo of a luxury car with the dealership's logo in the corner. The copy reads "We know that everyone has their own idea of what the perfect car looks like. That's why we've got such a wide selection for you to choose from. Come on down and take one for a test drive, we think you'll fall in love at first sight."
    I suggest using the tagline "Drive your dreams."
    ######
    Context: Give me an ad for Holland Village, a strain of marijuana grown in Jamaica
    Headline: "The most beautiful high in the world..." Visual Idea - An artwork styled to be a really simple, ironic garden weed art painting. The copy reads  "What do you get when exceptional marijuana meets exotic paradise? The perfect amends for those of us who've been there and done that. Holland Village is bred from Jamaican fields but grown by Canadians - what's not to love about it?"
    The tagline is the title of a Bob Marley song "Satisfy your soul."
    ######
    Context:`,
    lastToken: '\nHeadline:',
    temperature: 0.95,
    max_tokens: 80,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.3,
    presence_penalty: 2.0,
    stop: ['######'],
  },
    
  [GENERAL_COPY]: {
    prompt: `A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word by itself, you see or hear or feel or imagine something. That picture stands out by itself.  You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And you can be sure when you say it that the other person sees the same picture, too. When we want to tell other people our thoughts there are all kinds of Picture Words we can use. There are Picture Words that show us things. There are Picture Words that show us actions. There are Picture Words that show us colors. There are Picture Words that show us size. There are Picture Words that show us details of other pic­tures. There are Picture Words that show us feelings. There are Picture Words that show us judgments. There are Picture Words that show us ideas.  And - as the most powerful tool of all - there are Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture. And they help you transfer that picture from your mind to the mind of someone else. Once again, every time you say one of them, you see some­thing. And the person you're talking to also sees that same thing. Therefore, they are different from our second kind of word . . . the Connecting Word. 
    A Connecting word has no built-in picture within it. When you say a Connecting Word by itself you don't see anything. Like a... the... in... over... and... yet ... to... when... before... is . .. was... be. And all the rest. Unless you put them in a sentence, they give you no picture at all. So what is their use? Very simple. They tell us how the Picture Words go together. They tell us how the Picture Words are connected. In time. In space. In meaning. And in sequence. They put the Picture Words in their correct places. They sort the Picture Words out for us. They arrange them in logical order - with sentences, and between sentences. That's why we call them Connecting Words. A Connecting Word shows us the connection between our Picture Words. To get our meaning precise - to avoid confu­sion when we talk to someone - we need both kinds of words. We need Picture Words. And we need Connecting Words. This artificial general intelligence tool takes the two kinds of words. And learns the best ways to put them together to write novels, poetry, textbooks, busi­ness reports, songs, speeches, humor, satire, allegory, and any other kind of writing. Given a prompt, this tool can write engaging advertising copy for any product or service.
   ######
 Product Description: Give me a product description for Low Flow Toilet 3000
 Copy: The Low-Flow Toilet 3000 is the perfect way to conserve water in today's drought-stricken world. It uses only 500ml per flush, and there's an optional bidet attachment for those who prefer a clean posterior. This toilet is considered safe by regulatory authorities, and it's perfect for your home!
 ######
 Product Description: Give me ad copy for Hem Socks, the world's first socks made from 100% recycled plastic
 Copy: There are no words to describe the excitement at Hem HQ when we saw the final product! We consider ourselves business people,like you, that want to know our shoes or clothes are sustainable and environmentally friendly. That's why we teamed up with Landfill Relief fiber, a fiber recycling company, and together we've created a pair of socks that is made from 100% post-industrial recycled plastics--the very first in the world.
 ######
 Product Description: Give me ad copy for the Trinket Dog Box
 Copy: At first glance, the world may not know what to think of this unique creation. We wanted to push the boundaries of dog decorating to new levels. Our inspiration was based on antique watch boxes, which people would use for storage long ago. Nowadays there are jewelers that sell many different styles of these vintage boxes, but we found one problem with these models; they are very expensive! We were intent on creating a product that would be both inexpensive and suited to modern-day life with pets--something sleek, functional, and trendy. So now you can buy your favorite furry friend elegant home accessories without breaking the bank!
 ######
 Product Description: Give me copy for Health First, a Holistic Health Center for Veterans
 Copy: Health First is a holistic health center for veterans. Our goal is to teach veterans how to take back control of their lives through better diet, exercise, and holistic healing practices. We offer nutrition education, one-on-one counseling, and group therapy. Our programs are tailored to each veteran's individual needs. We also offer acupuncture, naturopathic medicine, and reiki to complement our services.
 ######
Product Description: Give me copy for The Gourmet Kitchen
Copy: You can't cook good food without good tools. We love to cook, and we know the struggle of trying to cook with an old, beat up kitchen. That's why we created the Gourmet Kitchen, a kitchen that's both efficient and modern. We've taken all of the lessons we've learned cooking for years and put them into one space. We know that every cook is different, but we hope that the Gourmet Kitchen will appeal to most everyone.
######
Product Description: Give me copy for The Perfect Handle
Copy: The Perfect Handle is a door handle for the kitchen, bathroom, and closet. It is designed to be easily installed by the user, and it can be mounted to the side of the door or on the inside. The Perfect Handle is made of durable, long-lasting material that is easy to clean. It's perfect for people who have trouble gripping or have arthritis in their hands. It has a 4-inch long handle that makes it easy to open a door even when your hands are full. It can also be installed on already existing doors, giving you the option to make the change whenever you feel like it.
######
Product Description:Give me copy for Daily Squeeze
Copy: Daily Squeeze is a line of refreshing, all natural bottled juices that are bursting with flavor. Daily Squeeze comes in over fifteen different flavors, including tropical favorites like tomato, pineapple, and apple. Daily Squeeze is high in vitamin C and has 100% of your daily fruit intake without any added sugar. We have premium flavors that taste just like your favorite fruit, or for those with a sweet tooth, there are fruity flavors with added natural sugar. With Daily Squeeze, you can have a fresh, healthy, tasty breakfast on-the-go, or have a refreshing, natural drink any time of the day!
######
Product Description: Give me copy for Hawkeye Security Cameras
Copy: The Hawkeye Security Camera is the newest surveillance camera system in the market. We are the latest in technology in security cameras, in addition to our state of the art in materials. We produce the ability to catch thieves in the act with the latest in anti-theft technology. All black and white Hawkeye Security Camera systems come with two interchangeable lenses-- one for day, one for night.
######
Product Description: `,
    lastToken: '\nCopy:',
    temperature: 0.95,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.9,
    presence_penalty: 2.0,
    stop: ['######'],
  },

};

module.exports = {
  promoteDavinciEnginParams,
};
