import Extension from './plugin'
import { Scratch } from './vm'

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
        try {
          const resp = await fetch(`https://chatgpt.deeptrain.net/gpt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: message })
          })
          const data = await resp.json();
          return data.message;
        } catch (e) {
          console.error(e);
          return "请求过多！请稍后重试！"
        }
      },
      disableMonitor: true,
    },
    {
      opcode: 'donate', //@ts-ignore
      blockType: Scratch.BlockType.COMMAND,
      text: "捐赠",
      bind: () => window.open("https://afdian.net/@zmh-program"),
    },
    {
      opcode: 'info', //@ts-ignore
      blockType: Scratch.BlockType.COMMAND,
      text: "(使用过程中有非正常言论请忽略)",
      bind: () => "",
    }
  ]
}).register()
