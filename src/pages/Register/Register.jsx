import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../firebase';
import Add from '../../assets/img/addAvatar.png';

const Register = () => {
	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[3].files[0];

		try {
			//Create user
			const res = await createUserWithEmailAndPassword(auth, email, password);

			//Create a unique image name
			const date = new Date().getTime();
			const storageRef = ref(storage, `${displayName + date}`);

			await uploadBytesResumable(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(async (downloadURL) => {
					try {
						//Update profile
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						});
						//create user on firestore
						await setDoc(doc(db, 'users', res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});

						//create empty user chats on firestore
						await setDoc(doc(db, 'userChats', res.user.uid), {});
						navigate('/');
					} catch (err) {
						console.log(err);
						setErr(true);
						setLoading(false);
					}
				});
			});
		} catch (err) {
			setErr(true);
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center gap-3 px-16 py-5 bg-white rounded-lg'>
			<span className='text-[--secondary-color] font-bold text-2xl'>
				Lama Chat
			</span>
			<span className='text-[--secondary-color] text-sm font-bold'>Register</span>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 text-[--secondary-color]'>
				<input
					required
					type='text'
					placeholder='Nombre'
					className='p-4 w-60 border-b border-solid border-[--primary-color] outline-none'
				/>
				<input
					required
					type='email'
					placeholder='Email'
					className='p-4 w-60 border-b border-solid border-[--primary-color] outline-none'
				/>
				<input
					required
					type='password'
					placeholder='Contraseña'
					className='p-4 w-60 border-b border-solid border-[--primary-color] outline-none'
				/>
				<input required type='file' id='file' className='hidden' />
				<label
					htmlFor='file'
					className='flex items-center gap-3 text-xs text-[--primary-color] cursor-pointer'>
					<img src={Add} alt='uploaded image' className='w-8' />
					<span>Add an avatar</span>
				</label>
				<button
					disabled={loading}
					className='bg-[--primary-color] hover:bg-[--primary-color-dark] text-white p-3 font-bold border-none cursor-pointer'>
					Sign up
				</button>
				{loading && 'Uploading and compressing the image please wait...'}
				{err && <span>Something went wrong</span>}
			</form>
			<p className='text-[--secondary-color-light] text-xs mt-2'>
				You do have an account?{' '}
				<Link to='/register' className='font-bold'>
					Login
				</Link>
			</p>
		</div>
	);
};

export default Register;
