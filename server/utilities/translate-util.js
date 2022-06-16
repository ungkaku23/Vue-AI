/* DeepL Api */
const { default: axios } = require('axios');
const deepLApiKey = process.env.DEEPL_API_KEY;
const deepLURL = 'https://api.deepl.com/v2/translate';

const deepLAxios = axios.create({
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
    },
});

// const translate = async function(text, src, tar) {
//     const params = new URLSearchParams();
//     params.append('auth_key', deepLApiKey);
//     params.append('text', text);
//     // params.append('source_lang', src);
//     params.append('target_lang', tar);

//     const { data } = await deepLAxios.post(
//         deepLURL,
//         params
//     );
//     return data;
// };

const translate = async function(text, src, tar) {
    return {translations: [{text: text}]}
};
  
module.exports.translate = translate;