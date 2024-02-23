import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
  } from "@metaplex-foundation/js";
  import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
  import bs58 from "bs58";
  
  const connection = new Connection(clusterApiUrl("devnet"));
  
  (async () => {
    //air drop
    const wallet = Keypair.fromSecretKey(bs58.decode("4Suo836P86rZ1n3ZMdCXn5R7YEerQg5D3s862WsdatJYdccPsPmEr1TYuqfsJqVrqF8HAbBdxbaYVqXfWCcgXeKo"));
    console.log("wallet", wallet.publicKey.toString());
  
    const metaplex = Metaplex.make(connection)
  
      .use(keypairIdentity(wallet))
  
      .use(
        bundlrStorage({
          address: "https://devnet.bundlr.network",
  
          providerUrl: "https://api.devnet.solana.com",
  
          timeout: 60000,
        })
      );
    console.log("uploading metadata");
    //upload Metadata
    const { uri } = await metaplex.nfts().uploadMetadata({
      name: "Carry Jani",
      symbol: "CJ",
      description:
        "Carry Jani is most famous for its incredible upset in the 2022 Kentucky Derby, winning the event as an 80-1 underdog. ",
      seller_fee_basis_points: 9900,
      external_url: "undefined",
      image: 'https://tan-distant-locust-825.mypinata.cloud/ipfs/QmUAygziZy7cbk7miYv3FYq3mHcijNj29sa3BKQpeCdZTf',
      attributes: [
        {
          trait_type: "id",
          value: "454",
        },
        {
          trait_type: "rating",
          value: "90",
        },
      ],
    });
  
    console.log("URI: ", uri);
  
    // // mint NFT
    const { nft } = await metaplex.nfts().create(
      {
        uri: uri,
        name: "Carry Jani",
        symbol: "CJ",
        sellerFeeBasisPoints: 0, // Represents 5.00%.
      },
      { commitment: "finalized" }
    );
  
    console.log("Token Address: ", nft);
  })();