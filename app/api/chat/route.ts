import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const userInput = messages[messages.length - 1].content

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are an advanced Reality Algorithm Generator designed to create alternate realities based on user-modifiable parameters.
        User Input: "${userInput}"
        
        Please provide the following:
        1. **Reality Overview**: A description of the new reality.
        2. **Modified Laws**: List the altered laws of nature (e.g., gravity, time, physics).
        3. **Entities and Structures**: Describe entities or beings that exist in this reality.
        4. **Possible Effects**: Any consequences or side effects of the changes.
        5. **Stability Rating**: Rate the stability of this reality, with an explanation.`
      },
      ...messages
    ]
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

