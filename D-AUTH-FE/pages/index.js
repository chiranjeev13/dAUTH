import { useRouter } from "next/router";
import Header from "../Common/Header";
import homeImage from "./Images/home1.gif";
import uploadImage from "./Images/upImage.webp";
import veriImage from "./Images/download1.gif";
import nftImage from "./Images/test3.png";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FaUpload, FaCheck, FaTicketAlt } from "react-icons/fa";

export default function RouteName() {
  const { asPath } = useRouter();

  return (
    // orange website gradient background
    // bg-gradient-to-tr from-[#a19c9c] via-[#554e4e] to-[#000000]"
    // <div className="bg-gradient-to-tr from-[#45647f] via-[#15135a] to-[#09072e]">
    <div className="bg-gradient-to-tr from-[#636161] via-[#313131] to-[#000000]">
        <div className="text-blue-500 min-h-screen">
          <Header />
          <div className="p-4">
            <div className="pb-24 flex flex-row gap-4">
              <div className="flex justify-center items-center">
                <Image
                  src={homeImage}
                  alt="Picture of documents"
                  width="500px"
                  height="500px"
                />
              </div>

              <div className="flex justify-center items-center flex-col gap-2">
                <div className={`${styles.title} p-5 `}>
                  Once authenticated, always aquainted...
                </div>
                <a
                  href="/upload"
                  className="box-border relative z-0 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-orange-300 ring-offset-orange-200 hover:ring-offset-orange-500 ease focus:outline-none"
                >
                  <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                  <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative z-20 flex items-center text-sm">
                    <svg
                      className="relative w-5 h-5 mr-2 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    Get Started
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-6 p-4">
              <div className="flex flex-col items-center justify-center text-2xl font-bold text-orange-500">
                <p className="pb-12">
                  Get your KYC documents Verified using our{" "}
                  <b>Zero Knowledge based Blockchain Technology</b>{" "}
                </p>
                What we do:
                <div className="flex flex-col gap-10 justify-center pt-12">
                  <div class="w-full rounded overflow-hidden shadow-lg hover:shadow-orange-500 animation duration-500 flex flex-col md:flex-row gap-2 p-2 justify-center">
                    <div class="flex justify-center items-center w-full md:w-1/2">
                      <Image
                        src={uploadImage}
                        className="w-full md:w-1/2"
                        height="50px"
                        width="50px"
                        alt="Image"
                      />
                    </div>
                    <div class="px-6 py-4 flex flex-col justify-center items-center w-full md:w-1/2">
                      <div class="font-bold text-2xl mb-2">
                        Upload Information
                      </div>
                      <p class="text-white text-base">
                        Upload the required information and documents you need
                        to get verified wherever needed
                      </p>
                    </div>
                  </div>

                  <div class="w-full rounded overflow-hidden justify-center shadow-lg hover:shadow-orange-500 animation duration-500 flex flex-col md:flex-row gap-2 p-2">
                    <div class="flex justify-center w-full md:w-1/2">
                      <Image
                        width="200px"
                        height="200px"
                        className="w-full md:w-1/2"
                        src={veriImage}
                        alt="SImage"
                      />
                    </div>
                    <div class="px-6 py-4 flex flex-col justify-center items-center w-full md:w-1/2">
                      <div class="font-bold text-2xl mb-2">
                        Get Data Verified
                      </div>
                      <p class="text-white text-base">
                        Get the data you submitted verified using otp. Once the
                        data is verified, the D-Auth's system will initiate NFT
                        generation.
                      </p>
                    </div>
                  </div>

                  <div class="w-full flex flex-col md:flex-row gap-2 rounded justify-center overflow-hidden shadow-lg animation duration-500 hover:shadow-orange-500 p-2">
                    <div class="flex justify-center w-full md:w-1/2">
                      <Image
                        height="50px"
                        width="50px"
                        className="w-full md:w-1/2"
                        src={nftImage}
                        alt="Image"
                      />
                    </div>
                    <div class="px-6 py-4 flex flex-col items-center w-full md:w-1/2 justify-center">
                      <div class="font-bold text-2xl mb-2">Recieve your NFT</div>
                      <p class="text-white text-base">
                        After the verification is completed, user will recieve
                        the NFT based signature for future KYC processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}
