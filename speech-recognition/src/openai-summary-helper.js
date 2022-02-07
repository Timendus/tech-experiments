const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default async function(text, characters) {
  const response = await openai.createCompletion("text-davinci-001", {
    prompt: text,
    temperature: 0.5,
    max_tokens: characters,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    best_of: 5
  });

  console.log(response);
  return response.data.choices[0].text || 'Could not generate summary';
}
