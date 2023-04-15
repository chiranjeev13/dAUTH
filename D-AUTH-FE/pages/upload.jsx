import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../Common/Header";
const axios = require("axios").default;
import { useMoralis, useWeb3Contract } from "react-moralis";
import contr from "../../artifacts/contracts/NFT-MINT.sol/NFT_MINT.json";
import { ethers } from "ethers";
import Image from "next/image";
import React from "react";
import Popup from "reactjs-popup";

export default function RouteName() {
  const [name, setName] = useState("");
  const [aadhar, setAadhar] = useState("");
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYmM1MzZmYjYtMzg1ZC00YWZiLTkyMjctNDUxOWU1MjhlOGJjIn0.i5uKmf896BqgaSjZxh0aCFqLI0MRZnW_MjyuOAZ0PCI",
        "X-RapidAPI-Key": "e1588b364fmsh4e12bef5704e29ap107f8djsne8d9cc254653",
        "X-RapidAPI-Host": "d7-verify.p.rapidapi.com",
      },
      data: `{"originator":"SignOTP","recipient":"+91${mobile}","content":"OTP verification code is: {}","expiry":"600","data_coding":"text"}`,
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYmM1MzZmYjYtMzg1ZC00YWZiLTkyMjctNDUxOWU1MjhlOGJjIn0.i5uKmf896BqgaSjZxh0aCFqLI0MRZnW_MjyuOAZ0PCI",
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
    <div className="bg-white text-blue-500 min-h-screen relative">
      <Header />
      <div className="p-4">
        <p className="text-3xl font-bold">Verify Aadhar</p>
        <p>Get your aadhar verified and generate a NFT token</p>
        <div className="flex justify-between gap-2">
          <p className="text-red-500">
            <span className="blink"> Please use Mumbai Testnet network</span>
          </p>
          <div className="flex flex-col gap-2 items-left justify-right mb-12 border-2 border-red-500 p-2">
            <p className="text-red-500">
              <p>
                <span className="blink"> Mumbai Testnet Config:</span>
              </p>
              RPC URL: https://rpc-mumbai.maticvigil.com
              <br />
              Chain ID: 80001
              <br />
              <a
                className=" text-red-500 hover:underline"
                href="https://mumbaifaucet.com"
              >
                Mumbai Testnet Faucet URL
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center pt-4">
          <form className="flex flex-col gap-3 justify-center items-center w-full md:w-2/3">
            <TextField
              label="Name"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            ></TextField>

            <TextField
              label="Aadhaar Number"
              value={aadhar}
              fullWidth
              onChange={(e) => setAadhar(e.target.value)}
            ></TextField>

            <TextField
              InputLabelProps={{ shrink: true }}
              label="DOB"
              type="date"
              fullWidth
            ></TextField>

            <TextField
              label="Number (India only, no need of '+91')"
              value={mobile}
              type="tel"
              fullWidth
              onChange={(e) => setNumber(e.target.value)}
            ></TextField>

            <Button
              variant="contained"
              fullWidth
              color="secondary"
              disabled={otpSent}
              onClick={async () => {
                setOtpSent(true);
                handleSubmit();
              }}
              className="text-purple-800 hover:text-white md:w-auto w-full mt-4"
            >
              Send OTP
            </Button>

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
                  className="text-purple-800 hover:text-white md:w-auto w-full mt-4"
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
        {showStatus && otpStatus === "APPROVED" && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="text-purple-800 hover:text-white w-full md:w-2/5"
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
            <p>Your NFT</p>

            <img src={imageURL} alt="" width={350} height={350} />

            <a href={URI}>Your MetaData click to see...</a>
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
      <div className="flex flex-col gap-2 items-center ">
        <div className="absolute bottom-2">
          <a
            className="hover:underline"
            href="https://mumbai.polygonscan.com/address/0x1387938C0761C817d2474ae5e0F8BC243C2B4f17#code"
          >
            Deployed with ❤️ at Polygon Mumbai testnet Click to see the contract
          </a>
        </div>
      </div>
    </div>
  );
}
