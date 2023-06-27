import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { auth } from '../firebase';

const Navbar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className='bg-[--secondary-color-dark] h-12 p-3'>
			<div className='flex justify-between w-full gap-2'>
				<img
					src={currentUser.photoURL}
					alt='avatar'
					className='object-cover w-6 h-6 rounded-full'
				/>
				<span>{currentUser.displayName}</span>
				<button
					onClick={() => signOut(auth)}
					className='bg-[--secondary-color-light] text-xs cursor-pointer rounded-md p-1'>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;
