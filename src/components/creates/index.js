import React, { useState } from "react";
import "./style.scss";
import { hexanftAddress } from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
const projectId = "2JaP53CChDIrbm6yCHCcv9Hgv0G"; // Infura project ID
const projectSecret = "0ed243427fd243738739132c116ce90f"; // Infura project Secret

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const MintingForm = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    royalty: "",
    name: "",
    symbol: "",
    externallink: "",
    description: "",
  });

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://hexa-moon.infura-ipfs.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }

  async function createNFT() {
    const { name, symbol, externallink, royalty, description } = formInput;
    if (
      !name ||
      !symbol ||
      !externallink ||
      !description ||
      !royalty ||
      !fileUrl
    )
      return;
    // upload to IPFS
    const data = JSON.stringify({
      name,
      symbol,
      externallink,
      royalty,
      description,
      image: fileUrl,
    });
    // console.log("data", data);
    try {
      const added = await ipfs.add(data);
      // console.log(added.path);
      const url = `https://hexa-moon.infura-ipfs.io/ipfs/${added.path}`;
      // console.log(url);
      // run a function that creates sale and passes in the url
      // await axios
      //   .post("http://localhost:8000/api/nftdata", {
      //     assetName:name,
      //     assetSymbol:symbol,
      //     externalLinks:externallink,
      //     assetDescription:royalty,
      //     assetRoyalty:description,
      //     assetFile: fileUrl,

      //   })
      //   .then((res) => {
      //     // console.log(res);
      //   })
      //   .catch((err) => {
      //     // console.log(err);
      //   });
      mintingNFT(url);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }

  async function mintingNFT(url) {
    const { account, web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    let Fee = await nftContract.methods.platformFee().call();
    Fee = Fee.toString();
    // console.log(Fee);
    await nftContract.methods
      .mint(account, url)
      .send({ from: account, value: Fee });
  }

  return (
    <div>
      <div className="flex justify-center formcontainer">
        <div className="w-1/2 flex flex-col pb-12 formwrapper">
          <input
            placeholder="Asset Name"
            className="mt-8 border rounded p-4 inputform"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
          <input
            placeholder="Asset Symbol"
            className="mt-2 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, symbol: e.target.value })
            }
          />
          <input
            placeholder="External Links"
            className="mt-2 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, externallink: e.target.value })
            }
          />
          <textarea
            placeholder="Asset Description"
            className="mt-2 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          />
          <input
            placeholder="Asset Royalty in Percent"
            type={"number"}
            className="mt-2 border rounded p-4"
            onChange={(e) =>
              updateFormInput({ ...formInput, royalty: e.target.value })
            }
          />
          <input
            type="file"
            name="Asset"
            className="mt-4"
            onChange={onChange}
          />{" "}
          {fileUrl && (
            <img
              className="rounded mt-4 image"
              width="350px"
              src={fileUrl}
              alt="phto"
            />
          )}
          <button
            onClick={createNFT}
            className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg button"
          >
            Mint NFT
          </button>
        </div>
      </div>
    </div>
  );
};
