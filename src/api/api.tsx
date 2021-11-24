import { toast } from 'react-toastify';

export const SendMessage = async ({ messageTo, messageBody }: any) => {
  try {
    const data = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: messageTo,
        body: messageBody
      })
    })
    const status = await data.json()
    
    if (status.success) {
      toast.success("Your message was sent")
    } else {
      toast.error("Your message wasn't sent")
    }

  } catch (err) {
    toast.error("Something went wrong")
  }

}