import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState ,useRef} from "react";
import Header from "../Common/Header";
import Confetti from "react-confetti";
const axios = require("axios").default;
import { useMoralis, useWeb3Contract } from "react-moralis";
import contr from "../../artifacts/contracts/NFT-MINT.sol/NFT_MINT.json";
import { ethers } from "ethers";
import Image from "next/image";
import React from "react";
import Popup from "reactjs-popup";
import  styles from "../styles/Home.module.css";
import YourComponent from "./scanning";

export default function RouteName() {
  const [name, setName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setNumber] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpID, setOtpID] = useState("");
  const [otpStatus, setOtpStatus] = useState("");
  const [error, setError] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [URI, setURI] = useState("");
  const [visible, setVisible] = useState(false);
  const [OpenSea, setOpenSea] = useState(false);
  const [tkid, settkid] = useState("");

  async function handleSubmit() {
    // setting options for sending otp
    const options = {
      method: "POST",
      url: "https://d7-verify.p.rapidapi.com/verify/v1/otp/send-otp",
      headers: {
        "content-type": "application/json",
        Token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYWQ3YWIzODQtZjVjZi00N2NjLTkzNmItNmQ4YWY2YjBlZTI4In0.2-ICcYNn6uoG7lThNtXoffVUt5j_CcXuvrpas39zObs",
        "X-RapidAPI-Key": "e1588b364fmsh4e12bef5704e29ap107f8djsne8d9cc254653",
        "X-RapidAPI-Host": "d7-verify.p.rapidapi.com",
      },
      data: `{"originator":"SignOTP","recipient":"+91${mobile}","content":"OTP verification code is for D-Auth is: {}","expiry":"600","data_coding":"text"}`,
    };

    // posting the request
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setOtpID(response.data.otp_id);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async function verifyOTP() {
    const options = {
      method: "POST",
      url: "https://d7-verify.p.rapidapi.com/verify/v1/otp/verify-otp",
      headers: {
        "content-type": "application/json",
        Token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYWQ3YWIzODQtZjVjZi00N2NjLTkzNmItNmQ4YWY2YjBlZTI4In0.2-ICcYNn6uoG7lThNtXoffVUt5j_CcXuvrpas39zObs",
        "X-RapidAPI-Key": "e1588b364fmsh4e12bef5704e29ap107f8djsne8d9cc254653",
        "X-RapidAPI-Host": "d7-verify.p.rapidapi.com",
      },
      data: `{"otp_id":"${otpID}","otp_code":"${otp}"}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setShowStatus(true);
        setOtpStatus(response.data.status);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  let provider, contractAddress, ABI;
  var tId;

  useEffect(() => {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } catch (e) {
      alert(
        "Please Install A Wallet First!! Otherwise the website wont work as required"
      );
    }

    contractAddress = "0xB425f0CF5232B546841DC8575449e14bB70611e6";
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
  var imgURL, uri;
  const mint = async () => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    //console.log(await newsignedContract.getTokenId());
    try {
      const mintedtx = await newsignedContract.mint();

      const getTokenId = await newsignedContract.getTokenId();
      const tokenId = getTokenId._hex;
      tId = parseInt(tokenId, 16);
      uri = await newsignedContract.tokenURI(tId);
      setURI(uri);
      console.log(uri);
      imgURL = await getImage();
    } catch (error) {
      alert("Address is already Verified");
    }

    async function getImage() {
      try {
        let response = await fetch(uri);
        let responseJson = await response.json();
        return responseJson.images;
      } catch (error) {
        console.error(error);
      }
    }

    // const testmint = await newsignedContract.mint();
    //console.log(testmint.data);
  };
  const displayImg = async (imgUrl) => {
    try {
      <Image src={imgUrl} alt="" width={150} height={150} />;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#45647f] via-[#15135a] to-[#09072e] text-blue-500 min-h-screen relative">
      <Header />
      <div className="p-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center mb-8 animate-pulse">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 11l3-3m0 0l3 3m-3-3v8"
              ></path>
            </svg>
          </div>
          <p className="text-3xl font-bold text-white mb-4">Verify Aadhar</p>
          <p className="text-lg text-gray-300 mb-8">
            Get your Aadhar verified and generate an NFT token
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <YourComponent setAadhar={setAadhar} setDob={setDob} setName={setName} />
        </div>

        <div className="flex justify-between gap-2">
          
          <div className="flex flex-col gap-2 items-left justify-right mb-12 "></div>
        </div>

        <div className="flex justify-center items-center py-8">
          <form className="flex flex-col gap-4 justify-center items-center w-full md:w-2/3 p-8 rounded-lg shadow-lg bg-white">
            <h1 className="text-4xl font-bold text-center text-orange-500 hover:animate-bounce">
              Verify Aadhaar
            </h1>

            <div className="w-full">
              <label className="text-gray-700 font-semibold mb-2 block">
                Full Name
              </label>
              <input
                className="w-full border rounded-md py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your full name"
                style={{ backgroundColor: 'white' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="text-gray-700 font-semibold mb-2 block">
                Aadhaar Number
              </label>
              <input
                className="w-full border rounded-md py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your Aadhaar number"
                style={{ backgroundColor: 'white' }}
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="text-gray-700 font-semibold mb-2 block">
                Date of Birth
              </label>
              <input
                className="w-full border rounded-md py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                style={{ backgroundColor: 'white' }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="text-gray-700 font-semibold mb-2 block">
                Mobile Number
              </label>
              <input
                className="w-full border rounded-md py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                placeholder="Enter your mobile number"
                style={{ backgroundColor: 'white' }}
                value={mobile}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full md:w-auto mt-6"
              type="button"
              disabled={otpSent}
              onClick={async () => {
                setOtpSent(true);
                handleSubmit();
              }}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>

            {otpSent && <button>Resend OTP</button>}

            {error.length !== 0 && (
              <p className="text-red-500 text-lg">{error}</p>
            )}

            {otpSent && (
              <div className="pt-6 flex flex-col justify-center items-center w-full md:w-auto">
                <TextField
                  label="OTP"
                  value={otp}
                  fullWidth
                  onChange={(e) => setOtp(e.target.value)}
                ></TextField>

                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={() => {
                    verifyOTP();
                  }}
                  disabled={otpStatus === "APPROVED"}
                  className="text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3 rounded-md md:w-auto w-full mt-4 transition-all duration-300"
                >
                  Submit
                </Button>

                {showStatus &&
                  (otpStatus === "APPROVED" ? (
                    <div className="pt-4 text-green-500">
                      OTP verified successfully!
                    </div>
                  ) : (
                    <div className="pt-4 text-red-500">
                      OTP verification failed!
                    </div>
                  ))}
              </div>
            )}
          </form>
        </div>
        {showStatus && otpStatus === "APPROVED" &&  (
          <div className="flex flex-col gap-2 items-center justify-center">
            <Button
              variant="contained"
              color="primary"
              className="text-white bg-orange-500 hover:bg-orange-600 w-full md:w-2/5"
              onClick={async () => {
                await mint();
                console.log(imgURL);
                if (imgURL && imgURL.length != 0) {
                  setImageURL(imgURL);
                  setShowImage(true);
                  setOpenSea(true);
                  settkid(tId);
                }
                console.log("Details submitted");
              }}
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
      {showImage && (
        <div>
          <div className="flex flex-col gap-2 items-center justify-center mb-12">
            <div className={`${styles.confettiWrapper} fixed inset-0 z-50`}>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </div>
            <div className={`${styles.modal} fixed inset-0 bg-opacity-50`}>
              <div className={`${styles.modalContent} p-5 rounded-lg bg-white`}>
                <p>Your NFT</p>
                <img src={imageURL} alt="" width={350} height={350} />
                <a href={URI}>Your MetaData click to see...</a>
              </div>
            </div>
          </div>
        </div>
      )}
      {OpenSea && (
        <div>
          <div className="flex flex-col gap-2 items-center justify-center mb-12">
            <a
              className="hover:underline"
              href={`https://testnets.opensea.io/assets/mumbai/0x1387938C0761C817d2474ae5e0F8BC243C2B4f17/${tkid}`}
            >
              Check your NFT on OpenSea testnet
            </a>
          </div>
        </div>
      )}
      {/* <div className="flex flex-col gap-2 items-center ">
        <div className="absolute bottom-2"> */}
      {/* <a
            className="hover:underline"
            href="https://mumbai.polygonscan.com/address/0x1387938C0761C817d2474ae5e0F8BC243C2B4f17#code"
          >
            Deployed with ❤️ at Polygon Mumbai testnet Click to see the contract
          </a> */}
          {/* <Button
              variant="contained"
              color="primary"
              className="text-white bg-orange-500 hover:bg-orange-600 w-full md:w-2/5"
              onClick={async () => {
                await mint();
                console.log(imgURL);
                if (imgURL && imgURL.length != 0) {
                  setImageURL(imgURL);
                  setShowImage(true);
                  setOpenSea(true);
                  settkid(tId);
                }
                console.log("Details submitted");
              }}
            >
              Confirm
            </Button>
    </div> */}
    //</div>
    //</div>
  );
}
