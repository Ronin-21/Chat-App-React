import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';

const Chats = () => {
	const [chats, setChats] = useState([]);

	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
				setChats(doc.data());
			});

			return () => {
				unsub();
			};
		};

		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = (u) => {
		dispatch({ type: 'CHANGE_USER', payload: u });
	};

	return (
		<div className='chats'>
			{Object.entries(chats)
				?.sort((a, b) => b[1].date - a[1].date)
				.map((chat) => (
					<div
						className='flex items-center gap-3 p-3 cursor-pointer'
						key={chat[0]}
						onClick={() => handleSelect(chat[1].userInfo)}>
						<img
							src={chat[1].userInfo.photoURL}
							alt='avatar'
							className='object-cover w-12 h-12 rounded-full'
						/>
						<div>
							<span className='text-base font-bold'>
								{chat[1].userInfo.displayName}
							</span>
							<p className='text-sm'>{chat[1].lastMessage?.text}</p>
						</div>
					</div>
				))}
		</div>
	);
};

export default Chats;
