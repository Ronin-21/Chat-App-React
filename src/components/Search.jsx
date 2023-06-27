import { useContext, useState } from 'react';
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/authContext';

const Search = () => {
	const [username, setUsername] = useState('');
	const [user, setUser] = useState(null);
	const [err, setErr] = useState(false);

	const { currentUser } = useContext(AuthContext);

	const handleSearch = async () => {
		const q = query(
			collection(db, 'users'),
			where('displayName', '==', username)
		);

		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});
		} catch (err) {
			setErr(true);
		}
	};

	const handleKey = (e) => {
		e.code === 'Enter' && handleSearch();
	};

	const handleSelect = async () => {
		//check whether the group(chats in firestore) exists, if not create
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;
		try {
			const res = await getDoc(doc(db, 'chats', combinedId));

			if (!res.exists()) {
				//create a chat in chats collection
				await setDoc(doc(db, 'chats', combinedId), { messages: [] });

				//create user chats
				await updateDoc(doc(db, 'userChats', currentUser.uid), {
					[combinedId + '.userInfo']: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combinedId + '.date']: serverTimestamp(),
				});

				await updateDoc(doc(db, 'userChats', user.uid), {
					[combinedId + '.userInfo']: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combinedId + '.date']: serverTimestamp(),
				});
			}
		} catch (err) {
			('');
		}

		setUser(null);
		setUsername('');
	};
	return (
		<div className='border-b border-solid border-[--primary-color]'>
			<div className='p-3'>
				<input
					type='text'
					placeholder='Encuentra un usuario'
					onKeyDown={handleKey}
					onChange={(e) => setUsername(e.target.value)}
					value={username}
					className='bg-transparent outline-none'
				/>
			</div>
			{err && <span>User not found!</span>}
			{user && (
				<div
					className='flex items-center gap-3 p-3 cursor-pointer'
					onClick={handleSelect}>
					<img
						alt='image'
						src={user.photoURL}
						className='object-cover w-12 h-12 rounded-full'
					/>
					<div>
						<span className='text-base font-bold'>{user.displayName}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
