const PROPOSAL_INTRO = "proposal-intro";
const PROPOSAL_SUMMARY = "proposal-summary";
const CREATIVE_RATIONALE = "creative-rationale";
const SIMPLIFY = "simplify";
const SPEECH_INTRO = "speech-intro";
const BLOG_INTRO = "blog-intro";
const BLOG_OUTLINE = "blog-outline";
const ESSAY_INTRO = "essay-intro";
const ESSAY_OUTLINE = "essay-outline";
const LOGLINE = "logline";
const BLURB = "blurb";
const CONCLUSION = "conclusion";
const PLOT_SUMMARY = "plot-summary";
const CHARACTER_SKETCH = "character-sketch";
const FREESTYLE = "freestyle";
const REFRAMER = "reframer";
const BULLET_POINT = "bullet-point";

const summaryDavinciEnginParams = {
  [PROPOSAL_INTRO]: {
    prompt: `A proposal introduction captures the reader's attention and gets them excited to continue reading. The proposal should contain a brief, catchy overview of the project. And should use language that entices the reader to want more information. When given a context, how would you write a proposal introduction?
#####
Brief: A proposal to get Nike to sponsor the super bowl halftime show
Intro: The Super Bowl halftime show is one of the most watched events of the year. This year, we would like to propose that Nike be our sponsor. Their brand is synonymous with athleticism and success, making them the perfect partner for this event. We believe that this partnership would be beneficial for both Nike and the Super Bowl halftime show.
######
Brief: A proposal to create a new national park
Intro: America is blessed with an abundance of natural beauty. Our country is home to some of the most stunning landscapes in the world, and it's time we recognized that by creating a new national park. This park would celebrate our country's rich history and stunning landscapes, and would be a major tourist attraction for years to come.
######
Brief: A proposal to build a new stadium
Intro: As your city grows, the need for a new stadium becomes more and more evident. Our city is in sore need of a modern facility that can accommodate the needs of sports fans and concert-goers. We believe that building a new stadium would be a major boon to the local economy, and would provide a much-needed venue for large events. We hope that you will consider our proposal and grant us the funding necessary to make this dream a reality.
######
Brief:`,
    keyword: "Brief: ",
    lastToken: "\nIntro: ",
    temperature: 0.94,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [CREATIVE_RATIONALE]: {
    prompt: `A creative rationale is a written explanation of why a particular design decision was made. It can be used to help justify a design to others, or to document the thought process behind a design for future reference. A good creative rationale should explain the goal of the design, what design decisions were made in order to achieve that goal, and how those decisions were evaluated. When given a context, how would you write a creative rationale?
    ######
    Context: Write a creative rationale for the design of the United States Olympic team uniforms.
    Rationale: The United States Olympic team uniforms are designed to reflect the spirit of America. They are meant to be modern and patriotic, with a bold red, white, and blue color scheme. The designers wanted to create a sense of unity among the team members, so they used the same design for both the men's and women's uniforms. The uniforms are also designed to be comfortable and practical, with a lightweight fabric that will keep the athletes cool in the summer sun.
    ######
    Context: A creative rationale for the design of a new logo for the Coca Cola brand
    Rationale: The Coca Cola brand is one of the most iconic brands in the world. The new logo is designed to maintain that legacy while also updating the brand for the modern era. The logo is simple and modern, with a minimalistic design that can be easily recognized. The colors are meant to reflect the classic red and white of the Coca Cola brand, while also adding a touch of blue for a fresh and modern look. The logo is meant to be versatile, working well on both digital and print media.
    ######
    Context:`,
    keyword: "Context: ",
    lastToken: "\nRationale: ",
    temperature: 0.94,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [REFRAMER]: {
    prompt: `Before you can reframe an argument, you need to understand what “frames” are in the first places. They’re simply the term psychologists give to the theoretical filters or categories our minds use to help us store, manage, and interpret the meaning of information. A simple way to understand reframing is to understand the two types of words. There are picture words. And there are connecting words. Here are their definitions: A Picture Word is a word that carries a built-in picture within it.  Like Rose. Tree. Boy. Harry. Hit. Itch. Thump. Blue. Swim. Slowly. Explosion. Truth. And all the rest. Each one of these words carries a picture inside itself. That picture stands out by itself. You need no other words to support it. You can see it. Smell it. Taste it. Touch it. Draw it. Show it on film. And, above all, you can be sure when you say it that the other person sees the same picture too. The most powerful tool of all is the Picture Word which shows us more than one kind of picture. They build punch, charm, and humor into your sentences. A Connecting word has no built-in picture within it. When you say a Connecting Word by itself, you don't see anything. Like a, the, in, over, and, yet, to , when, before, is, was, be. And all the rest. Unless you put them in a sentence, they give you no picture at all. They tell us how the Picture Words are connected.  They sort the Picture Words out for us. They arrange them in logical order. This artificial intelligence tool understands these two kinds of words and their underlying beliefs and assumptions. And when given a context, uses this formula to reframe questions, problems, theories, arguments, objections, rebuttals, and all the rest.
    ######
    Context: Give me a reframe when someone says life is difficult. We don’t get what we want, and we get a lot of what we don’t want.
    Reframe: Life may be difficult at times, but it is also full of joy and happiness. We may not always get what we want, but we often get what we need.
    ######
    Context: Give me a reframe for the question: "Have there been times in your life when you learned faster than others?"
    Reframe: Many people find that they learn best when they are challenged. Have there been times in your life when you pushed yourself to learn new things and found that you were able to do so more quickly than usual? 
    ######
    Context: Give me a reframe when a customer says that your service is too expensive for me.
    Reframe: It's understandable that you might feel our service is too expensive. Can I ask what budget you have in mind for this project? I'll see if we can work within your budget and still give you the high quality service you deserve.
    ######
    Context: Give me a reframe when my boss tells me I'm not working hard enough.
    Reframe: It sounds like you're concerned that I'm not putting in enough effort. Can you give me some specific examples of what you've seen that makes you think that? I want to make sure I'm meeting your expectations.
    ######
    Context:`,
    keyword: "Context: ",
    lastToken: "\nReframe: ",
    temperature: 0.94,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [BULLET_POINT]: {
    prompt: `When given a topic, generate an endless list of persuasive bullet points:
    ######
    Topic: The benefits of a good night's sleep
    Bullet Points:
    -Sleep is crucial for our physical and mental health
    -A good night's sleep can improve our mood, memory, and concentration
    -Sleep can help us recover from illness and injury
    -Lack of sleep can lead to serious health problems
    -Getting a good night's sleep is one of the best things we can do for our health
    -There are simple things we can do to improve the quality of our sleep
    -There are many benefits to getting a good night's sleep, and we should make it a priority
    ######
    Topic: Give me an outline for an essay about A Brief History of Time by Stephen Hawking
    Bullet Points:
    - Stephen Hawking was one of the most renowned physicists of our time
    - A Brief History of Time was published in 1988 and became an instant bestseller
    - The book covers a wide range of topics in cosmology and astrophysics
    - Hawking's writing is accessible to a lay audience without compromising on scientific rigor
    - The book has been praised for its ability to communicate complex ideas in a clear and concise way
    - A Brief History of Time is an essential read for anyone interested in cosmology or astrophysics
    ######
    Topic: How to be a more persuasive speaker even if you are shy
    Bullet Points:
    -It is possible to be a more persuasive speaker even if you are shy
    -There are a few key things you can do to be more persuasive
    -Start by focusing on your body language and vocal cues
    -Work on your content by crafting clear and concise arguments
    -Practice your delivery by speaking in front of a mirror or recording yourself
    -Don't be afraid to be passionate about your topic
    -The more you practice, the more confident you will become
    -Remember that you don't have to be the loudest or most extroverted person in the room to be persuasive
    ######
    Topic: The benefits of a plant-based diet
    Bullet Points:
    -A plant-based diet has many health benefits
    -A plant-based diet can lower your risk of heart disease, obesity, and type 2 diabetes
    -A plant-based diet can also help reduce inflammation and improve gut health
    -A plant-based diet is not only good for your health, but it is also good for the environment
    -A plant-based diet is easy to follow and can be tailored to your individual needs
    -There are many delicious plant-based recipes available, so you can still enjoy your favorite foods
    -Making the switch to a plant-based diet is one of the best things you can do for your health and the environment
    ######
    Topic:`,
    keyword: "Topic: ",
    lastToken: "\nBullet Points: ",
    temperature: 0.96,
    max_tokens: 250,
    top_p: 1, 
    n: 5,
    frequency_penalty: 1.61,
    presence_penalty: 1.69,
    stop: ["######"],
  },


  [CHARACTER_SKETCH]: {
      prompt: `A character sketch introduces the reader to a particular character. It includes physical descriptions, personality traits, habits, strengths, weaknesses, and history, amongst other things of the particular character. You want the reader to have a strong mental image of the person including how the person talks, acts and thinks.
      ######
      Context: An astronaut about to take their first space trip
      Sketch: Shea is an incredibly brave and determined astronaut who has always dreamed of traveling to space. When she was younger, Shea was diagnosed with a heart condition that made it seem like her dream might never come true. But she never gave up hope and worked hard to get herself in peak physical condition. Now, after years of training and preparation, she is finally about to take her first trip into orbit. Shea is excited but also nervous about what lies ahead – she knows the dangers involved but is confident in her abilities as an astronaut.
      ######
      Context: A Black female CEO who is about to take over a beleaguered company
      Sketch: Shannon is a Black female CEO who is about to take over a beleaguered company. She is very confident and has a strong vision for the company. Shannon is also very disciplined and demanding, expecting the best from her team. However, she can be quite intimidating and may have difficulty winning over the trust of her employees. Shannon will need to work hard to gain their respect and build morale within the company if she wants to turn it around.
      ######
      Context: The chief communications officer of the world's largest insurance company
      Sketch: Tom is the chief communications officer of the world's largest insurance company. He is a very polished and professional individual, always striving to present the best image for his company. However, he can be quite manipulative and often uses underhanded tactics to get what he wants. He is also very secretive and tight-lipped, never revealing anything that could damage his company's reputation.
      Context:`,
      keyword: "Context: ",
      lastToken: "\nSketch: ",
      temperature: 0.96,
      max_tokens: 250,
      top_p: 1,
      n: 10,
      frequency_penalty: 1.61,
      presence_penalty: 1.69,
      stop: ["######"],
    },
 
  [PROPOSAL_SUMMARY]: {
  prompt: `A proposal summary is a short, catchy summary of the proposal. It should be a short, catchy summary of the project. When given a context, how would you write a proposal summary?
#####
Brief: A proposal to get Nike to sponsor the super bowl halftime show
Summary: Nike is a brand that represents athleticism and success. We believe that this partnership would be beneficial for both Nike and the Super Bowl halftime show.
######
Brief: A proposal to create a new national park
Intro: Our country is filled with natural wonders, and it's time we create a national park to celebrate them. Our proposal would create a new national park that would be home to some of our country's most iconic landscapes.
######
Brief: A proposal to increase the number of police officers
Intro: Our country is in the midst of a crime epidemic, and we need to take action to address it. We propose that the government invest in hiring more police officers to help reduce crime
######
Brief:`,
    keyword: "Brief: ",
    lastToken: "\nSummary: ",
    temperature: 0.94,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [BLOG_INTRO]: {
    prompt: `There are two types of words. Picture Words and Connecting Words. A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word you can see, hear, feel or imagine something. There are Picture Words that show us things. Picture Words that show us actions. Picture Words that show us colors. Picture Words that show us size. Picture Words that show us details of other pic­tures. Picture Words that show us feelings. Picture Words that show us judgments. Picture Words that show us ideas. And Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture and helps you transfer that picture from your mind to the mind of someone else. Every time you say one of them, you see some­thing and the person you're talking to also sees that same thing. A Connecting Word is a word that has no built-in picture. When you say a Connecting Word by itself you don't see anything. Words like  "the", "a", "an", and "to" and all the rest, are all considered to be connecting words because they don't create a mental image on their own. The purpose of the Connecting Word is to tell us how the Picture Words are connected in time, space, meaning, or sequence. When you put these two types of words together, you can create new pictures and new meanings which allow for the expression of even the most abstract ideas you can imagine. You can write anything. You can write exciting introductions to articles, blogs, novels, and stories that tell a dramatic anecdote, reference popular culture, turn conventional wisdom on end, and use wit and irony to point out a contradiction, you can get personal, or deeply emotional. You can write in any writing style or tone.
    #####
    Title: The Sci-Fi Crime Novel That’s a Parable of American Society What China Miéville’s The City & the City tells us about the state of the nation
    Intro: A few weeks ago, a long-ago conversation with a friend came to mind as I tried to bring some order to my bookshelves. My friend was not yet of a certain age, but he had, he confessed, crossed a line: He had made a transition from the curating stage of life to the editing stage. He was no longer collecting; he was deaccessioning. I lack his wisdom and maturity, and rather than editing as I sorted, I instead paused to thumb through and scan. And then I came across a book that made me stop and reread: The City & the City (2009), by the British writer China Miéville. It is a police procedural novel with a background environment that recalls Philip K. Dick. A crime needs to be solved in a society where two different cities—two separate polities, with separate populations, customs, alphabets, religions, and outlooks—coexist within the same small patch of geography. The names of the overlapping cities are Besźel and Ul Qoma.
    ######
    Title: He Lost His Leg, Then Rediscovered the Bicycle. Now he’s Unstoppable. Leo Rodgers is the Irrepressible Gravel-Racing Hero We All Need Right Now
    Intro: Leo Rodgers is in flight. He’s bouncing and sliding in soft sand along an abandoned railway line that runs north from downtown St. Petersburg. As we zigzag past castaway boxcars plastered with graffiti and the agitated guests at a dog kennel, Rodgers hucks his bike off every huckable curb. Many people who ride a lot know what it’s like to sit on the wheel of someone like Leo Rodgers—someone you can trust to pick a good line and call out obstacles and do his or her share of the work and probably drop your ass if they wanted to. Someone who emanates delight. Someone who sits on a bike like that’s where they belong, their upper body still and relaxed as the miles click by.
    ###### 
Title:`,
    keyword: "Title: ",
    lastToken: "\nIntro: ",
    temperature: 1.0,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.5,
    presence_penalty: 0.7,
    stop: ["######"],
  },
  
[PLOT_SUMMARY]: {
  prompt: `A plot is the foundation of a story. All plots follow a logical organization with a beginning, middle, and end. Generally speaking, every plot has these five elements in this order: introduction, rising action, climax/turning point, falling action, resolution/denouement. There are six archetypes that form the building blocks for any plot. Rags to riches – a steady rise from bad to good fortune, Riches to rags – a fall from good to bad, a tragedy, Icarus – a rise then a fall in fortune, Oedipus – a fall, a rise then a fall again, Cinderella – rise, fall, rise, Man in a hole – fall, rise. When given a context, write a story plot.
  ######
  Context: A story of a group of children in a small town
  Plot: In a small town in the middle of nowhere, the only thing to do is get high. The kids have nothing better to do than to find new ways to get wasted. One day, they stumble upon a secret government laboratory hidden in the woods. They break in and start experimenting with the chemicals they find inside. Soon, they realize that they can use these chemicals to make people do anything they want. They start using their power to take over the town and become its rulers. But as their power grows, so does their thirst for more...
  ######
  Context: A young woman discovers her true identity
  Plot: A young woman has always felt out of place in her small town. She's never quite fit in and she's always had a feeling that there was something different about her. One day, she finds a box of old letters hidden in the attic of her house. The letters are from her birth parents and they reveal that she is actually an elf who was left behind in the human world when she was just a baby. With this new knowledge, she decides to set off on a journey to find her real family and learn more about herself.
  ######
  Context:`,
  keyword: "Context: ",
  lastToken: "\nPlot: ",
  temperature: 0.94,
  max_tokens: 150,
  top_p: 1,
  n: 10,
  frequency_penalty: 1.5,
  presence_penalty: 1.5,
  stop: ["######"],
},

  [ESSAY_INTRO]: {
    prompt: `Given a title of an esssay, write the introductory paragraph of the essay.
#####
Title: Getting In - The social logic of Ivy League admissions.
Essay Intro: I applied to college one evening, after dinner, in the fall of my senior year in high school. College applicants in Ontario, in those days, were given a single sheet of paper which listed all the universities in the province. It was my job to rank them in order of preference. Then I had to mail the sheet of paper to a central college-admissions office. The whole process probably took ten minutes. My school sent in my grades separately. I vaguely remember filling out a supplementary two-page form listing my interests and activities. There were no S.A.T. scores to worry about, because in Canada we didn’t have to take the S.A.T.s. I don’t know whether anyone wrote me a recommendation. I certainly never asked anyone to. Why would I? It wasn’t as if I were applying to a private club.
######
Title: Do Parents Matter? Judith Rich Harris and child development
Essay Intro: The idea that will make Judith Rich Harris famous came to her, unbidden, on the afternoon of January 20, 1994. At the time, Harris was a textbook writer, with no doctorate or academic affiliation, working from her home
in suburban New Jersey. Because of a lupus-like illness, she doesn’t have the strength to leave the house, and she’d spent that morning in bed. By early afternoon, though, she was at her desk, glancing through a paper by
a prominent psychologist about juvenile delinquency, and for some reason a couple of unremarkable sentences struck her as odd: “Delinquency must be a social behavior that allows access to some desirable resource. I suggest that
the resource is mature status, with its consequent power and privilege.” It is an observation consistent with our ideas about what it means to grow up. Teen-agers rebel against being teen-agers, against the restrictions imposed
on them by adults. They smoke because only adults are supposed to smoke. They steal cars because they are too young to have cars. But Harris was suddenly convinced that the paper had it backward. “Adolescents aren’t
trying to be like adults--they are trying to contrast themselves with adults,” she explains. “And it was as if a light had gone on in the sky. It was one of the most exciting things that have ever happened to me. In a minute or two,
I had the germ of the theory, and in ten minutes I had enough of it to see that it was important.” 
######
Title:`,
    keyword: "Title: ",
    lastToken: "\nEssay Intro: ",
    temperature: 0.94,
    max_tokens: 185,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

[FREESTYLE]: {
  prompt: `There are two types of words. Picture Words and Connecting Words. A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word you can see, hear, feel or imagine something. There are Picture Words that show us things. Picture Words that show us actions. Picture Words that show us colors. Picture Words that show us size. Picture Words that show us details of other pic­tures. Picture Words that show us feelings. Picture Words that show us judgments. Picture Words that show us ideas. And Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture and helps you transfer that picture from your mind to the mind of someone else. Every time you say one of them, you see some­thing and the person you're talking to also sees that same thing. A Connecting Word is a word that has no built-in picture. When you say a Connecting Word by itself you don't see anything. Words like  "the", "a", "an", and "to" and all the rest, are all considered to be connecting words because they don't create a mental image on their own. The purpose of the Connecting Word is to tell us how the Picture Words are connected in time, space, meaning, or sequence. When you put these two types of words together, you can create new pictures and new meanings which allow for the expression of the most abstract and creative ideas you can imagine. You can use this formula to write anything in any tone or style.
  ######
Context:`,
    keyword: "Context: ",
    lastToken: "\nOutput: ",
    temperature: 0.95,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },


  [BLURB]: {
  prompt: `A blurb is a short promotional piece accompanying a piece of creative work. It may be written by the author or publisher or quote praise from others. A blurb may introduce a newspaper or a book. A blurb often includes a quote from a celebrated person or a brief synopsis of the story. When given a description, write a blurb
######
Description: A book about time management
Blurb: How do you juggle life's many demands? Can you stop worrying and live in the moment? And what is the best way to plan for success? Do you know that time is the most valuable resource you have?
When you read this book, you will learn how to manage time wisely and be able to experience life more fully.
######
Description: An article about the significance of the presidency of Barack Obama
Blurb: Few men will ever lead a country, or the world, with more grace or intelligence or moral power. But all our progress depends on what we do next: we honor him and we carry on his work together.
######
Description: A review of the film Arrival
Blurb: Arrival is brilliantly thought-provoking and suspenseful, and I recommend it for anyone looking to be challenged.
######
Description: This article discusses the moral implications of climate change and denial and how it is a cruel response to the needs of the poorest and most vulnerable.
Blurb: There is no middle ground in the climate change debate. We all have an ethical responsibility to join the fight, to save the future of the earth for everyone.
######
Description: A magazine review of Gucci's Winter Line
Blurb: You'll be amazed by the simplicity and beauty of Gucci's latest line.
######
Description: A review of the broadway play Hamilton
Blurb: This is not only the best musical to come out of Broadway in years, but it is also one of the most innovative, influential, and groundbreaking theatrical productions in recent memory.
###### 
Description: `,
    keyword: "Description: ",
    lastToken: "\nBlurb:",
    temperature: 0.95,
    max_tokens: 50,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [CONCLUSION]: {
    prompt: `A conclusion is a concluding paragraph of a piece of creative work. It may be written by the author or publisher or quote praise from others. A conclusion may introduce a newspaper or a book. A conclusion often includes a quote from a celebrated person or a brief synopsis of the story. When given a context, write a captivating conclusion.
######
Context: An op-ed by Fergus McIntosh titled A Trip to St. Kilda, Scotland's Lost Utopia in the Sea. He's making the case that St. Kilda's inhabitants are not out of touch as so many travelers seem to believe. 
Conclusion: Mainlanders always knew that St. Kilda was there, and to describe its people as uncontacted is hyperbole — so why does it, in common with other abandoned places and lost or threatened cultures, arouse such fascination? Perhaps it’s because, in our globalizing, urbanizing, capitalist age, such places remind us that there are alternative ways to relate to the world, and the people, around us: they spur our utopian imagination.
######
Context: Aviation History delivers an entertaining account and perspective on international aviation history. This book is an excellent resource for students, educators, and aviation enthusiasts. In reviewing this book, the principal criteria included content, organization, and reference sources. While editing errors and organizational incongruities plague some
of the later chapters, many of the shortcomings of this first edition will likely be alleviated by later editions. These problems are only a minor distraction to the story being told. 
Conclusion: Aviation History is a collection of significant events in aviation accented by the people who made it happen and correlated with world affairs. The book’s use of color and vivid stories helps to make the advancements come to life as something more than significant events on a timeline. While at times the stories may clutter the page, they also breathe life into what is considered by many to be a dull subject. The author’s enthusiasm for the topic is obvious throughout the book. More thorough proofreading could help alleviate some of the confusion that is caused by typos and a few mislabeled illustrations. The credibility of the content does not suffer due to these obvious errors which will likely be corrected in the next edition
######
Context: An article about climate change and the future
Conclusion: In the face of climate change, the future is uncertain. But we know that the Earth will continue to warm and that we must take action to mitigate the effects of climate change. We must work together to reduce our greenhouse gas emissions, and adapt to the changing climate. Only by working together can we hope to create a sustainable future for all.
######
Context:`,
keyword: "Context: ",
lastToken: "\nConclusion:",
temperature: 0.95,
max_tokens: 185,
top_p: 1,
n:10,
frequency_penalty: 1.5,
presence_penalty: 1.5,
stop: ["######"],
},

  [SPEECH_INTRO]: {
    prompt: `The opening of a speech is a very important. It is the first thing your audience will hear and should make a good first impression. It should arouse interest. It should make the audience want to hear more. The following are some ways to open speeches when given a topic.
    ######
    Topic: The danger of a single story
    Opening: I'm a storyteller. And I would like to tell you a few personal stories about what I like to call "the danger of the single story." I grew up on a university campus in eastern Nigeria. My mother says that I started reading at the age of two, although I think four is probably close to the truth. So I was an early reader, and what I read were British and American children's books.  I was also an early writer, and when I began to write, at about the age of seven, stories in pencil with crayon illustrations that my poor mother was obligated to read, I wrote exactly the kinds of stories I was reading: All my characters were white and blue-eyed, they played in the snow, they ate apples, and they talked a lot about the weather, how lovely it was that the sun had come out.
    ######
    Topic: What hallucination reveals about our minds
    Opening: We see with the eyes, but we see with the brain as well. And seeing with the brain is often called imagination. And we are familiar with the landscapes of our own imagination, our inscapes. We've lived with them all our lives. But there are also hallucinations as well. And hallucinations are completely different. They don't seem to be of our creation. They don't seem to be under control. They seem to come from the outside and to mimic perception. So I am going to be talking about hallucinations and a particular sort of visual hallucination, which I see among my patients. A few months ago, I got a phone call from a nursing home where I work. They told me that one of their residents, an old lady in her 90s, was seeing things, and they wondered if she'd gone bonkers or, because she was an old lady, whether she'd had a stroke, or whether she had Alzheimer's. 
    ######
    Topic: Why are there so few women leaders?
    Opening: So for any of us in this room today, let's start out by admitting we're lucky. We don't live in the world our mothers lived in, our grandmothers lived in, where career choices for women were so limited. And if you're in this room today, most of us grew up in a world where we have basic civil rights, and amazingly, we still live in a world where some women don't have them. But all that aside, we still have a problem, and it's a real problem. And the problem is this: Women are not making it to the top of any profession anywhere in the world. The numbers tell the story quite clearly. 190 heads of state -- nine are women. Of all the people in parliament in the world, 13 percent are women. In the corporate sector, women at the top, C-level jobs, board seats -- tops out at 15, 16 percent. The numbers have not moved since 2002 and are going in the wrong direction. And even in the non-profit world, a world we sometimes think of as being led by more women, women at the top: 20 percent. 
    ######
    Topic: How to create the perfect pitch
    Opening: There are three ways to communicate. One, you can write it down. Two, you can email it. Three, you can actually have a conversation. And the truth is most of the time that conversation ends up being the most powerful. And that's what I'm going to be talking about today. Because the best pitch, the most memorable pitch, the most successful pitch, is an introduction in person. And I'm going to be discussing why, how to do it, and how to do it in a way that doesn't make you feel like you've got to vomit.
    ######
    Topic: The magic of introverts
    Opening: One of the most striking findings is that the more successful people are, the more alone time they need. Now, this might sound like a contradiction. After all, we're taught from a very young age that the most successful people are gregarious. They're charismatic. They're assertive.  And we're also taught that these are all offshoots of social intelligence. And indeed, there is a connection between social intelligence and success. But here's the paradox: The more social intelligence you have, the more likely you are to want time alone. The better you are with people, the more you need time to yourself.  The best way to explain this is to say, "It's not that introverts don't like people. It's just that they need a break from them." And this is actually a central feature of the personality of an introvert.
    ######
    Topic: `,
    keyword: "Topic: ",
    lastToken: "\nOpening:",
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [ESSAY_OUTLINE]: {
    prompt: `To write a complete outline for an essay, let us think step by step about as many different and divergent ideas as possible and present them in a detailed and coherent manner using an essay outline.
    ######
    Title: Should School Be Mandatory?
    Outline:
    ||Introduction: School has been around for centuries, and it has become a major part of our culture. School helps children to be more educated and develops their minds. It can help them get jobs and contributes to society.||
    ||Thesis Statement: School should not be mandatory.||
    ||Main Point 1:  School is a waste of time and energy.||
    ||Main Point 2:  School teaches pointless information.||
    ||Main Point 3:  School is limiting.||
    ||Conclusion:  School should not be mandatory because it teaches pointless information, wastes time and energy, and is limiting.||
    ######
    Title: Why you should make your bed
    Outline:
    ||Introduction:  Making your bed is such a simple task, but it has many benefits. It makes your room feel neater, and it can help you start your day off so much better. It can also help you have a more restful and relaxed night.||
    ||Thesis Statement: You should always make your bed.||
    ||Main Point 1: Making your bed is a very easy task that can have many positive effects.||
    ||Main Point 2: You will feel more neat and organized when you wake up.||
    ||Main Point 3: You will start your day off much better.||
    ||Conclusion:  Making your bed is the simplest way to have a better day.||
    ######
    Title: `,
    keyword: "Title: ",
    lastToken: "\nOutline:",
    temperature: 0.95,
    max_tokens: 150,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [BLOG_OUTLINE]: {
    prompt: `To write a complete outline of an article, let us think step by step about as many different and divergent ideas as possible and present them in a detailed and coherent manner using a blog outline.
    ######
  ARTICLE: Give me an outline for a blog about late-night eating habits
   OUTLINE:

1) Introduction:

-Introduce the topic of late-night eating habits
-Explain that eating later in the evening can have negative effects on your health

2) Point 1:

-Mention that eating a large meal late in the evening can cause indigestion
-Include information about the link between indigestion and acid reflux
-Explain how acid reflux is a risk factor for other conditions such
as Barrett's Esophagus

3) Point 2:

-Discuss how eating late in the evening can lead to weight gain
-Include information about the link between weight gain and late-night eating
-Provide information about the link between weight gain and heart disease

4) Point 3:

-Provide information about the link between heart disease and stroke
-Mention that risk factors for heart disease and stroke include eating late in the evening
-Include information about the link between stroke and obesity

5) Conclusion:

-Include a call to action
-Ask people to make a decision about whether or not they are going to make changes to their late-night eating habits
-Include a short list of other resources for people to find more information about this topic
######
ARTICLE: Give me an outline for a blog about thermo nuclear energy
OUTLINE:

1) Introduction:

-Introduce the topic of thermonuclear energy
-Explain that this form of energy can power jets, generate electricity, and drive cars

2) Point 1:

-Discuss the advantages and disadvantages of using thermo nuclear energy
-Explore the pros and cons of nuclear energy

3) Point 2:

-Include information about the history of thermonuclear energy
-Include a timeline of the periods in which thermonuclear energy was used

4) Point 3:

-Include information about the difference between nuclear energy and conventional energy sources
-Provide information about the pros and cons of nuclear energy

5) Conclusion:

-Ask people to make a decision about whether or not they are going to make changes to thermonuclear energy
-Include a short list of other resources for people to find more information about this topic
######
    ARTICLE:`,
    keyword: "Context: ",
    lastToken: "\nOUTLINE:",
    temperature: 0.95,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [LOGLINE]: {
    prompt: `The logline is a one or two sentence summary of your film that not only conveys your premise, but also gives the reader emotional insight into the story as a whole. When given a context write a logline.
    ######
    Context: A story about fish
    Logline: A young boy's love for fish is put to the test when he is forced to eat it for the first time.
    ######
    Context: A night at the nightclub
    Logline: In the midst of a night at the nightclub, three friends' night out turns into their worst nightmare.
    ######
    Context: A documentary about a family's journey to find a cure for their child's cancer
    Logline: Ever the fighters, a family on an overwhelming journey comes together to find hope for their son's survival.
    ######
    Context:`,
    keyword: "Context: ",
    lastToken: "\nLogline:",
    temperature: 0.95,
    max_tokens: 85,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ["######"],
  },

  [SIMPLIFY]: {
    prompt: `There are two types of words. Picture Words and Connecting Words. A Picture Word is a word that carries a built-in picture within it. When you say a Picture Word you can see, hear, feel or imagine something. There are Picture Words that show us things. Picture Words that show us actions. Picture Words that show us colors. Picture Words that show us size. Picture Words that show us details of other pic­tures. Picture Words that show us feelings. Picture Words that show us judgments. Picture Words that show us ideas. And Picture Words that show us more than one kind of picture, depending on how they are used in a sentence. Every one of them carries its built-in picture and helps you transfer that picture from your mind to the mind of someone else. Every time you say one of them, you see some­thing and the person you're talking to also sees that same thing. A Connecting Word is a word that has no built-in picture. When you say a Connecting Word by itself you don't see anything. Words like  "the", "a", "an", and "to" and all the rest, are all considered to be connecting words because they don't create a mental image on their own. The purpose of the Connecting Word is to tell us how the Picture Words are connected in time, space, meaning, or sequence. When you put these two types of words together, you can create new pictures and new meanings which allow you to explain even the most abstract ideas to a child.
    ######
    Text: Cohesive teams are critical for organizational success, innovation, and fostering a sense of belonging. Yet one of the greatest challenges facing leaders today is creating a culture of inclusiveness, where all members are treated equitably and feel equally valued. In teaching hundreds of executives and students about leading diverse teams, we’ve found that, although most leaders believe they’re acting inclusively, they’re often inadvertently doing the opposite.
    Simplified: It's important for a group to be united in order to achieve goals and feel like they are part of something bigger. However, one of the challenges that leaders face is making sure everyone feels included and valued equally. We've found that even though most leaders think they're being inclusive, they might actually be doing the opposite without realizing it.
    ######
    Text: Explain the concept of quantum physics so that a five-year-old will understand it
    Simplified: Quantum physics is the study of very small things, like atoms. It's called quantum because it deals with quanta, which are tiny packets of energy. Quantum physics can help us understand how things work on a really small scale.
    ######
    Text: The United States Constitution is the supreme law of the land. It provides the framework for our government and sets forth our rights and responsibilities as citizens. The Constitution was written by men who believed in democracy, individual liberty, and limited government power.
    Simplified: The Constitution is the most important law in our country. It explains how our government works and what rights and responsibilities we have as citizens. The people who wrote it believed in democracy, freedom for each person, and that government should not have too much power over us.
    Text:`,
    keyword: "Text: ",
    lastToken: "\nSimplified: ",
    temperature: 0.94,
    max_tokens: 250,
    top_p: 1,
    n: 10,
    frequency_penalty: 0.1,
    presence_penalty: 0.2,
    stop: ["######"],
  },
};

module.exports = {
  summaryDavinciEnginParams,
};
