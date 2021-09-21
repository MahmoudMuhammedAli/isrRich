import './App.scss';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { ReactComponent as Header } from './assets/header.svg';
import { ReactComponent as Logo } from './assets/isrich.svg';

import { Modal } from '@mui/material';
const url = 'https://mainnet.infura.io/v3/e31d6b31abd249718714f1244b8628e7 ';
const web3 = new Web3(url);

function App() {
	const [ address, setAddress ] = useState('');
	const [ balance, setBalance ] = useState(0);
	const [ open, setOpen ] = useState(false);
	const [ error, setError ] = useState(false);
	async function howMuch() {
		await web3.eth
			.getBalance(address, (err: any, bal: string) => {
				err && setError(true);
				let temp: number = Number(web3.utils.fromWei(bal, 'ether')); 
				setBalance(temp);
			})
			.then(() => setOpen(true));
	}
	const changePublicKey = (e: React.FormEvent<HTMLInputElement>) => {
		let handler = 	e.currentTarget.value; 
		setAddress(handler);
		handler.length===42 ? setError(false) : setError(true); 
	};
	const handleClose = () => setOpen(false);
	useEffect(
		() => {
			console.log(balance);
		},
		[ balance ]
	);
	return (
		<div className="main-view">
			<Logo className="logo" />
			<div className="content">
				<Header className="header" />
				<div className="inputs">
					<input
						className="public-key"
						type="text"
						name=""
						id=""
						placeholder="Ethereum Address"
						value={address}
						onChange={changePublicKey}
						style={{border:error?  "2px solid #ff0000":" 2px solid #ffe134"}}
						required
					/>
					<button type="submit" className="submit" onClick={howMuch} disabled={error}>
						isRich?
					</button>
				</div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					{error ? (
						<h1>Enter a valid private key</h1>
					) : (
						<div className="modal">
							<div className="left">
								<h1 className="modal-header">{balance > 4 ? 'MF is Rich!🤑' : 'Nope, Poor! 🥺'}</h1>

								<h1 className="title-2">Ether:</h1>

								<h1 className="amount">{balance} Ξ</h1>

								<h1 className="title-2">Dollars:</h1>

								<h1 className="amount">{`${balance * 2912.17} 💲`}</h1>
							</div>
							<div className="right" />
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
}
export default App;
