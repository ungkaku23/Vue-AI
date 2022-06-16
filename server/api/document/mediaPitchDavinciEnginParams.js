const mediaPitchDavinciEnginParams = {
  prompt: `A media pitch is a way to get a journalist or publication interested in your news so that they decide to cover it. To use this A.I media pitch generator, provide the name of the journalist or editor you are contacting, your name, your role, your company, a detailed overview of what your story is about, and the URL of the publication you are targeting. The A.I will generate a three to five-word email subject line followed by a media pitch written in the writing style of the publication you are targeting. For example, if you are writing a media pitch to a journalist at the New York Times when you provide the URL nytimes.com, the A.I will generate the subject line and the body of the media pitch in the writing style of The New York Times.  ###### 
  To: John
  From: Paul Terry
   Your Role: Rector
   Your Company: Catholic Archdiocese
   Writing Style: nytimes.com
   Overview: This is a media pitch that talks about the Catholic Archdiocese of Cayman celebrating 100 years
 >>>>>>
 Subject Line: 100 Years of Faith
 
 Dear John,
 
 I am writing to share some exciting news with you – the Catholic Archdiocese of Cayman is celebrating its 100th anniversary this year! Archbishop Paul Terry will be leading a special mass to mark the occasion, and we would love for your publication to cover it.
 
 The Catholic Archdiocese of Cayman has been an important part of the island's history for centuries, and we are proud to have played such a significant role in its development. We believe that our faith has helped make us who we are today, and we hope to continue serving our community for many years to come.
 
 If you are interested in covering this story, please do not hesitate to contact me at [email address]. I would be more than happy to provide you with additional information or answer any questions you may have. Thank you for your time, and I look forward to hearing from you soon.
 
 Best,
 Paul Terry
 >>>>>>
 >>>>>>
To: Kylie Jenner
From: Kim Kardashian-West
Your Role: Media Personality, Entrepreneur, Producer, and Socialite. Founder of KKW Beauty & Skims. Member of the Kardashian family     
Your Company: KUWTK (Keeping Up With The Kardashians), KKW Beauty & Skims    
Writing Style: cosmopolitan.com
Overview: I would like a media pitch about my new beauty line that just launched called "KKW Beauty"
>>>>>>
Subject Line: New KKW Beauty Line
 
Hello Kylie, 
   
I am excited to let you know that my new beauty line just launched and I wanted to share the news with you! The line is called "KKW Beauty" and it offers a range of products for all your makeup needs. Whether you're looking for a new foundation or some contouring powder, we have everything you need to create your perfect look. Plus, our prices are very reasonable – starting at just $18 for our lipsticks! 
   
I really believe this line has something special to offer everyone, and I would be honored if you could feature it on your website or in your publication. If you're interested, please do not hesitate to contact me at [email address].

Thank you so much for your time, and I hope to hear from you soon!

Sincerely, 
Kim Kardashian-West
>>>>>>
>>>>>>
To: Anna Wintour
From: Rafael Nadal
Your Role: Athlete, Spokesperson, and Endorser 
Your Company: Raf
writing Style: vogue.com

Overview: I am looking for a media pitch that talks about my new clothing line with Tommy Hilfiger.
>>>>>>
Subject Line: Tommy x Rafa – New Clothing Collection

Dear Anna,

I am excited to announce my new clothing collection with Tommy Hilfiger – Tommy x Rafa! This line was inspired by my love of tennis and fashion, and it offers a range of stylish yet practical pieces that are perfect for on and off the court. From polo shirts to track jackets, we have everything you need to stay cool and look great while playing your best. 

This is my first foray into the world of fashion design,  and I am passionate about every aspect of this collection. I would be honored if you could feature it in Vogue, and I believe your readers will love it as much as I do. If you are interested, please do not hesitate to contact me at [email address]. 

Thank you for your time, and I look forward to hearing from you soon!

Sincerely, 
Rafael Nadal
>>>>>>
To: Jack Brier
From: Elon Musk
Your Role: CEO
Your Company: SpaceX
Writing Style: businessinsider.com
Overview: Give me a media pitch about Falcon Heavy's Launch
>>>>>>
Subject: SpaceX Launches Falcon Heavy
    
Hey Jack, 
       
Exciting news- SpaceX just launched it's Falcons heavy into space earlier today! This is a remarkable feat not only for my company but also mankind as a whole. As the CEO of SpaceX, I am beyond thrilled at what we have accomplished and where this will lead us in terms of exploration.  
  
This mission has been meticulously planned over years by some of the most brilliant minds in our field ,and I can confidently say that everything went according to plan . The future is looking bright for SpaceX and space travel as a whole ,and I believe this is only possible through constant innovative thinking outside the box.  
  
If you want to hear more about this inspiring story, please don't hesitate reach out so we can discuss further!   
 
Kind Regards, 
Elon Musk
######
`,
  temperature: 0.8,
  max_tokens: 250,
  top_p: 1,
  n: 5,
  frequency_penalty: 0.4,
  presence_penalty: 0.5,
  stop: ["######"],
};

module.exports = {
  mediaPitchDavinciEnginParams,
};
