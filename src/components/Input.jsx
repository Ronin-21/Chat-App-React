import { useContext, useState } from 'react';
import Img from '../assets/img/img.png';
import Attach from '../assets/img/attach.png';
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';

const Input = () => {
	const [text, setText] = useState('');
	const [img, setImg] = useState(null);

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async () => {
		if (img) {
			const storageRef = ref(storage, uuid());

			const uploadTask = uploadBytesResumable(storageRef, img);

			uploadTask.on(
				(error) => {
					//TODO:Handle Error
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateDoc(doc(db, 'chats', data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL,
							}),
						});
					});
				}
			);
		} else {
			await updateDoc(doc(db, 'chats', data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}

		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});

		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});

		setText('');
		setImg(null);
	};
	return (
		<div className='flex items-center justify-between h-12 p-3 my-1 bg-white'>
			<input
				type='text'
				placeholder='Type something...'
				onChange={(e) => setText(e.target.value)}
				value={text}
				className='w-full outline-none text-[--secondary-color-dark] text-lg'
			/>
			<div className='flex items-center gap-3'>
				<img src={Attach} alt='' />
				<input
					type='file'
					id='file'
					onChange={(e) => setImg(e.target.files[0])}
					className='hidden'
				/>
				<label htmlFor='file'>
					<img src={Img} alt='' className='h-6 cursor-pointer' />
				</label>
				<button
					onClick={handleSend}
					className='py-3 px-4 bg-[--primary-color] cursor-pointer rounded'>
					Enviar
				</button>
			</div>
		</div>
	);
};

export default Input;
