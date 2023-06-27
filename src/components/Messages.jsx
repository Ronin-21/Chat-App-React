import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import Message from './Message';
import { ChatContext } from '../context/chatContext';

const Messages = () => {
	const [messages, setMessages] = useState([]);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => {
			unSub();
		};
	}, [data.chatId]);

	console.log(messages);

	return (
		<div className='bg-[--text-color] p-3 overflow-y-scroll h-full'>
			{messages.map((m) => (
				<Message message={m} key={m.id} />
			))}
		</div>
	);
};

export default Messages;
