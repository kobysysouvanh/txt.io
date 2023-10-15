
import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import EmptyState from '@/app/components/EmptyState'
import Body from '@/app/components/messages/Body'
import Header from '@/app/components/messages/Header'
import MessagesInput from '@/app/components/messages/MessagesBottom'

interface IParams {
    conversationId: string
}


const MessagePage = async ({ params }: { params: IParams}) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState/>
        </div>
      </div>
    )
  }
 
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-screen flex flex-col'>
        <Header conversation={conversation}/>
        <Body initialMessages={messages}/>
        <MessagesInput/>
      </div>
    </div>
  )
}

export default MessagePage