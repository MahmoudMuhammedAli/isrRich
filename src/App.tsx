import './App.scss';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {ReactComponent as Header} from './assets/header.svg'
import {ReactComponent as Logo} from './assets/isrich.svg'
const url = 'https://mainnet.infura.io/v3/e31d6b31abd249718714f1244b8628e7 ';
const web3 = new Web3(url);
function App() {
	const [address, setAddress] = useState("")
	const [ balance, setBalance  ] = useState(0);
	const [open, setOpen] = useState(false);
	 async function  howMuch  () {
		await  web3.eth.getBalance (address, (err: any, bal: string) => {
			let temp : number =  Number(web3.utils.fromWei(bal, 'ether')) 
			 setBalance(temp)	
		}).then(setOpen(true))
	};
	const changePublicKey = (e : React.FormEvent<HTMLInputElement>)=>{
		setAddress ( e.currentTarget.value)
	}
	const handleClose = () => setOpen(false);
	useEffect(
		() => {
			console.log(balance); 
		}, 
		[ balance ]
	);
	return (
		<div className="main-view">
			<Logo/>
			<div className="content">

			<Header/> 
		
				<input type="text" name="" id="" placeholder="Public Key" value = {address}className="public-key" onChange={changePublicKey} required/>
				<button type="submit" className="submit" onClick={howMuch} disabled={!address} >rich?</button>
			

			</div>
		</div>
	);
}
export default App;
