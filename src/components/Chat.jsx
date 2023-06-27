import { useContext } from 'react';
import Add from '../assets/img/add.png';
import Cam from '../assets/img/cam.png';
import More from '../assets/img/more.png';
import { ChatContext } from '../context/chatContext';
import Input from './Input';
import Messages from './Messages';

const Chat = () => {
	const { data } = useContext(ChatContext);

	return (
		<div className='flex-grow-[2] flex flex-col'>
			<div className='h-12 bg-[--secondary-color-light] flex items-center justify-between p-3'>
				<span>{data.user?.displayName}</span>
				<div className='flex gap-3'>
					<img src={Cam} alt='icon' className='h-6 cursor-pointer' />
					<img src={Add} alt='icon' className='h-6 cursor-pointer' />
					<img src={More} alt='icon' className='h-6 cursor-pointer' />
				</div>
			</div>
			<Messages />
			<Input />
		</div>
	);
};

export default Chat;
