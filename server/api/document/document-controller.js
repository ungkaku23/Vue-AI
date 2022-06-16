const { default: axios } = require("axios");
const cheerio = require("cheerio");
const CollaboratorInvitation = require("../../model/CollaboratorInvitation");
const { v4: uuidv4 } = require("uuid");
const auth = require("../../services/auth-service");
const mail = require("../../services/mail-service");
const Article = require("../../model/Article");
const pdf = require("html-pdf");
const { promoteDavinciEnginParams } = require("./promoteDavinciEnginParams");
const { questionDavinciEnginParams } = require("./questionDavinciEnginParams");
const { messageDavinciEnginParams } = require("./messageDavinciEnginParams");
const {
  socialMediaDavinciEnginParams,
} = require("./socialMediaDavinciEnginParams");
const {
  brainstormDavinciEnginParams,
} = require("./brainstormDavinciEnginParams");
const {
  mediaPitchDavinciEnginParams,
} = require("./mediaPitchDavinciEnginParams");
const { headlineDavinciEnginParams } = require("./headlineDavinciEnginParams");
const { summaryDavinciEnginParams } = require("./summaryDavinciEnginParams");
const { quoteDavinciEnginParams } = require("./quoteDavinciEnginParams");
const {
  freeWriteDavinciEnginParams,
} = require("./freewriteDavinciEnginParams");

const htmlDocx = require("html-docx-js");
const { promptDavinciEnginParams } = require("./promptDavinciEnginParams");
const openAiApiKey = process.env.OPENAI_API_KEY;

const openAiDavinciInstructBetaUrl =
  "https://api.openai.com/v1/engines/text-curie-001/completions";

const openAiDavinciUrl =
  "https://api.openai.com/v1/engines/text-curie-001/completions";

const openAiAxios = axios.create({
  headers: {
    Authorization: `Bearer ${openAiApiKey}`,
  },
});

 const { translate } = require("../../utilities/translate-util");

/* generate answer */
module.exports.generateAnswer = async function (req, res) {
  const { question, new_model, source_lang, target_lang } = req.body;
  const type = req.params.type;
  const requestData = { ...brainstormDavinciEnginParams[type] };
  try {//
    const { translations } = await translate(
      question.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (new_model) {
    let keyword = requestData.keyword;
    if (!keyword) keyword = "";
    requestData.prompt += `${question}${requestData.lastToken}${new_model}
                    ######
    ${keyword}`;
  }
  requestData.prompt += question.trim();
  if (requestData.keyword) {
    delete requestData.keyword;
  }
  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }
  try {
    const { data } = await openAiAxios.post(openAiDavinciUrl, requestData);
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      data,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* Generating a domain name for the article. */
module.exports.generateDomain = async function (req, res) {
  const { article } = req.body;
  const url = "https://questionify.me";
  const data = {
    target: "domain",
    article: article,
    authors: "",
    date: "",
    title: "",
    domain: "",
  };
  try {
    const {
      data: { gen: domain },
    } = await axios.post(url, data);
    return res.status(200).json({
      domain,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Using the OpenAI API to generate headlines. */
module.exports.generateHeadline = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;

  const requestData = { ...headlineDavinciEnginParams[type] };
  // requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* Using the OpenAI API to generate summaries of the text. */
module.exports.generateSummary = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;

  const requestData = { ...summaryDavinciEnginParams[type] };
  // requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* The above code is using the OpenAI API to generate a response to the user's question. */
module.exports.rewriteArticle = async function (req, res) {
  const { text, type } = req.body;

  const requestData = { ...promptDavinciEnginParams[type] };
  requestData.prompt += text.trim();

  try {
    if (type === "expand") {
      const { data: { keywords = [] } = {} } = await axios.get(
        "http://yake.inesctec.pt/yake/v2/extract_keywords",
        {
          params: {
            content: text,
            max_ngram_size: 3,
            number_of_keywords: 10,
            highlight: true,
          },
        }
      );
      requestData.prompt += `>> Keywords: ${keywords
        .map((item) => item.ngram)
        .join(",")}\n>> Output: `;
    } else {
      if (requestData.lastToken) {
        requestData.prompt += requestData.lastToken;
        delete requestData.lastToken;
      }
    }

    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    return res.status(200).json({
      text: data?.choices[0].text.trim() || "",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* A function that takes in a text and a type and returns a generated text. */
module.exports.generateArticleFree = async function (req, res) {
  const { text, type } = req.body;

  const requestData = { ...freeWriteDavinciEnginParams[type] };
  requestData.prompt += text.trim();

  try {
    if (type === "./freewriteDavinciEnginParams") {
      const { data: { keywords = [] } = {} } = await axios.get(
        "http://yake.inesctec.pt/yake/v2/extract_keywords",
        {
          params: {
            content: text,
            max_ngram_size: 3,
            number_of_keywords: 2,
            highlight: false,
          },
        }
      );
      requestData.prompt += `[Story so far]: ${keywords
        .map((item) => item.ngram)
        .join(",")}[Next Chunk]: `;
    } else {
      if (requestData.lastToken) {
        requestData.prompt += requestData.lastToken;
        delete requestData.lastToken;
      }
    }

    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    return res.status(200).json({
      text: data?.choices[0].text.trim() || "",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* This code is generating a pitch for a journalist to write about a company. */
module.exports.generateMediaPitch = async function (req, res) {
  const {
    journalistName,
    name,
    role,
    company = "",
    publication,
    story = "",
    source_lang,
    target_lang,
  } = req.body;
  const baseData = { ...mediaPitchDavinciEnginParams };
  baseData.prompt += `To: ${journalistName}
From: ${name}
Your Role: ${role}
Your Company: ${company}
Writing Style: ${publication}
Overview: ${story}
>>>>>>`;

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      baseData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      baseData,
      messages: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  // try {
  //   const { data } = await openAiAxios.post(
  //     openAiDavinciInstructBetaUrl,
  //     baseData
  //   );
  //   return res.status(200).json({
  //     messages: data?.choices || [],
  //   });
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
};

/* This code is generating a date for a given article. */
// module.exports.generateDate = async function(req, res) {
//   const { date, documentType, keywords, title, authors, domain } = req.body;
//   const data = {
//     target: 'date',
//     article: '',
//     date,
//     title:
//       documentType + ': ' + title + ' ' + (keywords ? keywords.join(' ') : ''),
//     authors,
//     domain,
//   };
//   try {
//     const generatedDate = await groverAPI(data);
//     return res.status(200).json({
//       date: generatedDate,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

/* The above code is generating an article using the Questionify.me API. */
module.exports.generateArticleV2 = async function (req, res) {
  const { date, documentType, keywords, title, authors, domain } = req.body;

  const url = "https://questionify.me";
  const text =
    documentType + ": " + title + " " + (keywords ? keywords.join(" ") : "");
  const dateObj = new Date();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = month + "-" + day + "-" + year;
  const data = {
    article: [
      {
        title: text,
        text: text,
        authors: authors,
        publish_date: date || output,
        domain: domain,
        summary: text,
      },
    ],
  };
  try {
    // console.log(article);
    // await axios.post(url + '/health/config',
    // {
    //   max_position_embeddings: 1024,
    //   top_p: 0.94,
    // });

    const { data: article } = await axios.post(url + "/predict", data);
    const gen = (article[0].data.gens_article[0] + "").split(". ");
    let newArticle = "";
    gen.forEach((pg) => {
      newArticle += "<p>" + pg + ".</p>";
    });
    return res.status(200).json({
      article: newArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.generateArticleDraft = async function (req, res) {
  const {
    date,
    documentType,
    keywords,
    title,
    authors,
    domain,
    source_lang,
    target_lang,
  } = req.body;

  const url = "https://questionify.me";
  const text_src =
    documentType + ": " + title + " " + (keywords ? keywords.join(" ") : "");
  let text = text_src;

  try {//
    const { translations } = await translate(text_src, source_lang, "EN");
    text = translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  const dateObj = new Date();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = month + "-" + day + "-" + year;
  const data = {
    article: [
      {
        title: text,
        text: text,
        authors: authors,
        publish_date: date || output,
        domain: domain,
        summary: text,
      },
    ],
  };
  try {
    // await axios.post(url + '/health/config',
    // {max_position_embeddings: 1024,top_p: 0.94,});
    const { data: article } = await axios.post(url + "/predict", data);
    const gen = (article[0].data.gens_article[0] + "").split(". ");
    let newArticle = "";
    for (const pg of gen) {//
      const { translations } = await translate(pg, "EN", target_lang);
      newArticle += "<p>" + translations[0]["text"] + ".</p>";//
    }
    // gen.forEach(async (pg) => {

    // });

    return res.status(200).json({
      article: newArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.generateArticleOutline = async function (req, res) {
  const { description, documentType, source_lang, target_lang } = req.body;
  const requestData = { ...summaryDavinciEnginParams[documentType] };
  //  requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }
  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );
    let newArticle = "";
    results.forEach((pg) => {
      newArticle += "<p>" + pg.text + ".</p>";
    });
    return res.status(200).json({
      article: newArticle,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.generateArticleFree = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;
  const baseData = { ...freeWriteDavinciEnginParams };
  baseData.prompt += `${description}
  Paragraph: 
  `;
  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      baseData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      baseData,
      results: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* Making a request to the Semantic Scholar API. */
module.exports.getAcademiaInfo = async function (req, res) {
  const url = "https://www.semanticscholar.org/api/1/search";
  const data = {
    queryString: req.body.query,
    page: 1,
    pageSize: 25,
    sort: "relevance",
    authors: [],
    coAuthors: [],
    venues: [],
    yearFilter: null,
    requireViewablePdf: true,
    publicationTypes: [],
    externalContentTypes: [],
    useFallbackRankerService: false,
    useFallbackSearchCluster: false,
    performTitleMatch: "",
    fieldsOfStudy: [],
    hydrateWithDdb: false,
    includeTldrs: true,
    includeBadges: true,
  };
  try {
    const { data: info } = await axios.post(url, data);

    return res.status(200).json({
      ...info,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* This code is fetching the google search results for the query provided by the user. */
module.exports.getGoogleSearchInfo = async function (req, res) {
  try {
    const url = `https://google.com/search?q=${req.body.query}`;
    const USER_AGENT =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36";
    const headers = { "user-agent": USER_AGENT };
    const rt = await axios.get(url, {
      headers: headers,
    });
    const $ = cheerio.load(rt.data);
    let data = [];
    $("div.g").each((i, el) => {
      const title = $(el).find("h3").text();
      const link = $(el).find("a").attr("href");
      const description = $(el).find("span.aCOpRe").text();
      if (title && link && description) {
        data.push({
          title,
          link,
          description,
        });
      }
    });
    return res.status(200).json({ results: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* This code is fetching the news from the Newscatcher API. */
module.exports.getNewsInfo = async function (req, res) {
  const url = "https://newscatcher.p.rapidapi.com/v1/search_free";
  const querystring = {
    media: "True",
    lang: "en",
    q: req.body.query,
    page_size: 25,
  };

  try {
    const { data } = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
      params: querystring,
    });

    return res.status(200).json({ results: data.articles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Using the OpenAI API to generate a fact based on the prompt. */
module.exports.getFactInfo = async function (req, res) {
  const data = {
    prompt: req.body.title,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  try {
    const {
      data: { choices },
    } = await openAiAxios.post(openAiDavinciUrl, data);
    return res.status(200).json({
      results: choices,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Using the OpenAI API to generate a quote. */
module.exports.generateQuote = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;

  const requestData = { ...quoteDavinciEnginParams[type] };
  // requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* Using the OpenAI API to generate ad copy. */
module.exports.generatePromote = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;

  const requestData = { ...promoteDavinciEnginParams[type] };
  // requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* The above code is using the OpenAI API to generate a message. */
module.exports.generateMessage = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;
  const requestData = { ...messageDavinciEnginParams[type] };
  // requestData.prompt += description.trim();

  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* This code is generating social media content. */
module.exports.generateSocialMedia = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;
  const requestData = { ...socialMediaDavinciEnginParams[type] };
  // requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* Using the OpenAI API to generate questions based on the description. */
module.exports.generateQuestion = async function (req, res) {
  const { description, type, source_lang, target_lang } = req.body;
  const requestData = { ...questionDavinciEnginParams[type] };
  // requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }

  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* Using the OpenAI API to generate summaries. */
module.exports.generateSummary = async function (req, res) {
  const { description, new_model, type, source_lang, target_lang } = req.body;
  const requestData = { ...summaryDavinciEnginParams[type] };
  //  requestData.prompt += description.trim();
  try {//
    const { translations } = await translate(
      description.trim(),
      source_lang,
      "EN"
    );
    requestData.prompt += translations[0]["text"];//
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (new_model) {
    let keyword = requestData.keyword;
    if (!keyword) keyword = "";
    requestData.prompt += `${description}${requestData.lastToken}${new_model}
                    ######
    ${keyword}`;
  }
  requestData.prompt += description.trim();
  if (requestData.keyword) {
    delete requestData.keyword;
  }

  if (requestData.lastToken) {
    requestData.prompt += requestData.lastToken;
    delete requestData.lastToken;
  }
  try {
    const { data } = await openAiAxios.post(
      openAiDavinciInstructBetaUrl,
      requestData
    );
    const resultsPromises = (data?.choices || []).map(async function (item) {//
      const { translations } = await translate(
        item.text.trim(),
        "EN",
        target_lang
      );
      return {
        ...item,
        text: translations[0]["text"],//
      };
    });
    let results = await Promise.all(resultsPromises);
    results = results.filter(
      (item) => item.finish_reason === "stop" && item.text
    );

    return res.status(200).json({
      requestData,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* Using the Semantic Scholar API to search for academic papers. */
module.exports.getSemanticScholarAcademicInfo = async function (req, res) {
  const url = "https://api.semanticscholar.org/graph/v1/paper/search";
  const params = {
    query: req.body.query,
    offset: 0,
    limit: 10,
    fields: req.body.fields || "url,title,abstract,authors,venue,year,paperId,",
  };
  try {
    const { data: { total = 0, offset = 0, next = 1, data = [] } = {} } =
      await axios.get(url, { params: params });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/* This is a function that will get the DuckDuckGo info for a given query. */
module.exports.getDuckDuckGoInfo = async function (req, res) {
  const apiKey = process.env.DUCK_GO_RAPID_API_KEY;
  const url = "https://duckduckgo-duckduckgo-zero-click-info.p.rapidapi.com/";
  const params = {
    q: req.body.query,
    format: "json",
    skip_disambig: "1",
    no_redirect: "1",
    no_html: "1",
    // callback: "process_duckduckgo"
  };
  try {
    const {
      data: {
        Abstract,
        Heading,
        AbstractText,
        AbstractSource,
        AbstractURL,
        RelatedTopics = [],
      } = {},
    } = await axios.get(url, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host":
          "duckduckgo-duckduckgo-zero-click-info.p.rapidapi.com",
        useQueryString: true,
      },
      params: params,
    });
    return res.status(200).json({
      abstract: {
        heading: Heading,
        abstract: Abstract,
        abstractText: AbstractText,
        abstractSource: AbstractSource,
        abstractURL: AbstractURL,
      },
      results: RelatedTopics,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* This code is creating a new invitation for a collaborator to join an article. */
module.exports.inviteCollaborator = async function (req, res) {
  const requesterEmail = auth.getEmail(req);
  const inviterName = auth.getUsername(req);
  const { fullName, email, articleId } = req.body;
  const genToken = uuidv4();

  const invitation = new CollaboratorInvitation({
    token: genToken,
    email,
    fullName,
    articleId,
    inviterName,
    inviterId: auth.getUserId(req),
  });

  invitation.save(async (error, invitation) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const collaboratorInvitation = mail.inviteCollaboration(
      requesterEmail,
      email,
      inviterName,
      fullName,
      genToken
    );

    await mail.mg
      .messages()
      .send(collaboratorInvitation, function (error, body) {
        if (error) {
          return res.status(405).json({
            message: error.message,
          });
        } else {
          return res.status(200).json({
            invitation,
            mailInfo: body,
            message: "The Invitation Has Been Sent",
          });
        }
      });
  });
};

/* This code is validating the token that is sent in the request body. */
module.exports.validateCollaboration = async function (req, res) {
  const userEmail = auth.getEmail(req);
  const { token } = req.body;
  CollaboratorInvitation.findOne(
    {
      token: token,
    },
    (error, invitation) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (!invitation) {
        return res.status(500).json({ message: "Invitation Not Found" });
      }
      if (invitation.email != userEmail) {
        return res.status(500).json({ message: "Invitation is invalid" });
      }
      Article.findOne(
        {
          _id: invitation.articleId,
        },
        (error, article) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          if (!article) {
            return res.status(500).json({ message: "Article Not Found" });
          }
          return res.status(200).json({
            article: article,
            message: "The Invitation is valid",
          });
        }
      );
    }
  );
};

/* Creating a docx file from the html content. */
module.exports.downloadDocx = async function (req, res) {
  const { content, title } = req.body;

  const html = `
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
       ${content}
    </body>
  </html>`;
  const blob = htmlDocx.asBlob(html, {
    orientation: "portrait",
    margins: {
      top: 1440, // default 1440, 1in, 2.54cm
      bottom: 1440,
      left: 1440,
      right: 1440,
    },
  });

  res.set("Content-Type", "application/docx");
  res.send(blob);
};

/* The above code is creating a PDF file from the HTML content. */
module.exports.downloadPdf = async function (req, res) {
  const { content, title } = req.body;

  const html = `
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
       ${content}
    </body>
  </html>`;

  await pdf
    .create(html, {
      format: "A4", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
      orientation: "portrait", // portrait or landscape
      // Page options
      // "border": "0",             // default is 0, units: mm, cm, in, px
      // - or -
      border: {
        top: "1in", // default is 0, units: mm, cm, in, px
        right: "1in",
        bottom: "1in",
        left: "1in",
      },
    })
    .toBuffer(function (err, buffer) {
      if (err) {
        return res.status(500).json({ message: new Error(err).message });
      } else {
        res.set("Content-Type", "application/pdf");
        res.send(buffer);
      }
    });
};
