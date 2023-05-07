import { useRouter } from "next/router";
import Header from "../Common/Header";
export default function RouteName() {
  const { asPath } = useRouter();
  return (
    <div className="bg-gradient-to-tr from-[#45647f] via-[#15135a] to-[#09072e] text-blue-500 min-h-screen relative">

    <div style={{  color: "#FFA500", minHeight: "100vh" }}>
  <Header />
  <div style={{ padding: "16px" }}>
    <h5>This Project was developed for GeeksforGeeks Hackathon by Chiranjeeev, Pranshu, Raghav</h5>

    <p>
      This project aims for creating a web-3 App which authenticates your web2 financial details like your AADHAR, PAN etc details then mint you an NFT after verification.
    </p>
  </div>
  <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
    
  </div>
</div>

    </div>
  );
}
