import Extension from './plugin'

let apikey: string | undefined

new Extension({
  id: 'openai',
  name: 'ChatGPT',
  color1: '#0e0e0e',
  blocks: [
    {
      opcode: 'ask',
      blockType: 'reporter',
      text: 'Ask ChatGPT [message:string]',
      default: { message: '' },
      bind: async ({ message }) => {
        const content: string = message.trim()
        if (!content) return 'Please enter the content!'
        try {
          const resp = await fetch('https://chatgpt.deeptrain.net/gpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: content, key: apikey })
          })
          const data = await resp.json()
          return data.message
        } catch (e) {
          console.error(e)
          return 'Too many requests, please try again later!'
        }
      },
      disableMonitor: true
    },
    {
      opcode: 'donate',
      blockType: 'command',
      text: 'donate',
      bind: () => window.open('https://afdian.net/@zmh-program')
    },
    {
      opcode: 'set',
      blockType: 'command',
      text: 'customize the apikey [apikey:string]',
      default: { apikey: 'sk-' },
      bind: ({ apikey: key }) => {
        apikey = key
        return 'The openai apikey has been set. Note that customizing the apikey is risky!'
      }
    }
  ]
}).register()
