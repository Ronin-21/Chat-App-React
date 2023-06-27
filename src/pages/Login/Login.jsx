import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Login = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (err) {
			setErr(true);
		}
	};
	return (
		<div className='flex flex-col items-center gap-3 px-16 py-5 bg-white rounded-lg'>
			<span className='text-[--secondary-color] font-bold text-2xl'>
				React Chat
			</span>
			<span className='text-[--secondary-color] text-sm font-bold'>Login</span>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 text-[--secondary-color]'>
				<input
					type='email'
					placeholder='email'
					className='p-4 w-60 border-b border-solid border-[--primary-color] outline-none'
				/>
				<input
					type='password'
					placeholder='password'
					className='p-4 w-60 border-b border-solid border-[--primary-color] outline-none'
				/>
				<button className='bg-[--primary-color] hover:bg-[--primary-color-dark] text-white p-3 font-bold border-none cursor-pointer'>
					Sign in
				</button>
				{err && <span>Ocurrió un problema</span>}
			</form>
			<p className='text-[--secondary-color-light] text-xs mt-2'>
				No tienes una cuenta?{' '}
				<Link to='/register' className='font-bold'>
					Regístrate
				</Link>
			</p>
		</div>
	);
};

export default Login;
