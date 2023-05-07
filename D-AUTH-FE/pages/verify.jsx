import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../Common/Header";
import { ethers } from "ethers";
import contr from "../../artifacts/contracts/NFT-MINT.sol/NFT_MINT.json";
import img from "../../NFT_metadata/images/tes.jpg";

export default function RouteName() {
  const [address, setAddress] = useState("");
  const [tkid, settkid] = useState("");
  const [bolval, setbolval] = useState("");
  const [status, res] = useState("");

  const { asPath } = useRouter();
  let provider, contractAddress, ABI;

  useEffect(() => {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } catch (e) {
      alert(
        "Please Install A Wallet First!! Otherwise the website wont work as required"
      );
    }

    contractAddress = "0x1387938C0761C817d2474ae5e0F8BC243C2B4f17";
    ABI = contr.abi;
    const provider_contract = new ethers.Contract(
      contractAddress,
      ABI,
      provider
    );
    async function requestAccount() {
      const accns = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); // prompt the user to connect one of their metamask accounts if they haven't  already connected
      setproviderConnected(true);
    }
  });

  const connectWallet = async () => {
    await requestAccount();
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    signedContract = newsignedContract;
    console.log("connected");
  };

  const verify = async () => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);

    const values = await newsignedContract.Verifier(address);

    settkid(parseInt(values[0]._hex, 16).toString());
    setbolval(values[1].toString());
  };

  return (
    <div className="bg-gradient-to-tr from-[#636161] via-[#313131] to-[#000000]">
    <div className="bg text-orange-500 min-h-screen">
      <Header />
      <div className="p-4">
        <img src={img} alt="" />
        <p className="text-3xl font-bold text-orange-500">Verify NFT</p>
        <p className="text-2xl font-bold text-orange-500">Check if you are verified or not!!</p>
        <div className="flex justify-center items-center pt-4">
          <form className="flex flex-col gap-3 justify-center items-center w-full md:w-2/3 text-orange-500">
          

<TextField
  id="outlined-basic"
  variant="outlined"
  label="Address"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  fullWidth
  style={{ backgroundColor: "#FFF", borderRadius: "5px", color: "#FFA500" }}
/>

            

<Button
  variant="contained"
  fullWidth
  onClick={async () => {
    try {
      await verify();
    } catch (error) {
      alert("WRONG ADDRESS ENTERED!!");
    }

    console.log(address);
    console.log("success");
  }}
  color="secondary"
  style={{ backgroundColor: "#CC5500", borderRadius: "25px" }}
>
  Verify
</Button>

            <p>Verification status : {bolval}</p>
            Token Id : {tkid}
          </form>
        </div>
        <div className="flex flex-col gap-2 items-center ">
          <div className=" justify-center absolute bottom-2">
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
