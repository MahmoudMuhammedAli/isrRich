import './App.scss';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {ReactComponent as Header} from './assets/header.svg'
import {ReactComponent as Logo} from './assets/isrich.svg'
function App() {
	const url = 'https://mainnet.infura.io/v3/e31d6b31abd249718714f1244b8628e7 ';
	const web3 = new Web3(url);
	let address = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
	const [ balance, setBalance  ] = useState(0);
	const howMuch = () => {
		web3.eth.getBalance (address, (err: any, bal: string) => {
			let temp : number = Number(web3.utils.fromWei(bal, 'ether')) 
			setBalance(temp);
		});
	};
	useEffect(
		() => {
			console.log(typeof balance); 
		},
		[ balance ]
	);
	return (
		<div className="main-view">
			<Logo/>
			<Header/> 
			<Button variant="contained" onClick={howMuch}>rich?</Button>
		</div>
	);
}
export default App;
