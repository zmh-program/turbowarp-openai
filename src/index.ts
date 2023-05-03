import Extension from './plugin'

new Extension({
  id: 'openai',
  name: 'ChatGPT',
  color1: '#0e0e0e',
  blocks: [
    {
      opcode: 'ask', /** @ts-ignore */
      blockType: Scratch.BlockType.REPORTER,
      text: '询问 ChatGPT [message:string]',
      default: { message: '' },
      bind: async ({ message }) => {
        console.log(message);
        return message;
      },
      disableMonitor: true,
    }
  ]
}).register()
