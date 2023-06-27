import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';

const Home = () => {
	return (
		<div className='rounded-lg w-[50vw] h-[60vh] flex overflow-hidden bg-white'>
			<Sidebar />
			<Chat />
		</div>
	);
};
export default Home;
