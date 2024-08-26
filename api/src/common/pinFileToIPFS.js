const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
// const JWT = process.env.PINATA_APIKEY;
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNDAzZGVlOS1lYjQxLTQ5NWMtOGUwMC1mZDQzZTNmMTMwZjYiLCJlbWFpbCI6ImFuZHJlc3ZpbGFpbmZhbnRlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkMTE1Zjc3YzA4YTkzZTA4YjViYyIsInNjb3BlZEtleVNlY3JldCI6ImViYmZhZmZmMDQ1OGZlOTYzMjdiZjgzZmZkZjc1YjY5ZjdkNTM4NDhkODFiZjUyY2VmYWM1ZTIxMjkxMDBmZTciLCJleHAiOjE3NTU3MTg2MzZ9.8xERC4jQBB2MgD64LqcHeI9fB1-E-3zFJ8RE21lKins";
const pinFileToIPFS = async (src, filename) => {
  const formData = new FormData();

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: filename,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = pinFileToIPFS;
