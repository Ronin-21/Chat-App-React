import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';

const Message = ({ message }) => {
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const ref = useRef();

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	}, [message]);

	return (
		<div
			ref={ref}
			className={`flex gap-5 mb-5 ${
				message.senderId === currentUser.uid && 'flex-row-reverse'
			}`}>
			<div className='flex flex-col font-light'>
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt=''
					className='object-cover w-10 h-10 rounded-full'
				/>
				<span>just now</span>
			</div>
			<div
				className={`max-w-[80%] flex flex-col gap-3 ${
					message.senderId === currentUser.uid && 'items-end'
				}`}>
				<p
					className={`max-w-max flex flex-col gap-3 bg-white py-3 px-5 ${
						message.senderId === currentUser.uid &&
						'bg-[--primary-color] text-[--secondary-color]'
					}`}>
					{message.text}
				</p>
				{message.img && <img src={message.img} alt='' className='w-1/2' />}
			</div>
		</div>
	);
};

export default Message;
