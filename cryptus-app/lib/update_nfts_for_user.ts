import { assets } from "../pages/[userId]/feed";

export default async function updateNftsForUser(username: string, address: string, userId: string, absolute = true) {

    let res;
    let nfts_raw;

    try {
        var data;
        //fetch nfts from opensea
        res = await fetch("https://api.opensea.io/api/v1/assets?owner=" + address + "&order_direction=asc&offset=0&limit=50", {
            headers: {
                "Accept": "application/json",
                "X-API-KEY": process.env.OPENSEA_API_KEY,
            },
        });
        // res = await fetch(wallet.external_url);
        data = await res.json();

        nfts_raw = data.assets;
    } catch (err) {
        console.error(err);
        console.log("response = ", res);
        return null;
    }

    console.log("nfts_raw = ", nfts_raw);

    const nft_clean = nfts_raw.map(nft => {
        return {
            name: nft.name ?? nft.collection.name + " #" + nft.id,
            image_url: nft.image_url,
            description: nft.description,
            collection: nft.collection.name,
            collectionId: nft.id,
            external_url: nft.permalink,
            last_sale_price: nft.last_sale ? nft.last_sale.price ?? 0 : 0,
            last_sale_symbol: nft.last_sale ? nft.last_sale.payment_token.symbol : "ETH",
        } as assets
    }
    );

    const base_url = absolute ? process.env.BASE_URL : '/'
    try {
        const res = await fetch(base_url + "api/nfts/update", {
            method: "POST",
            body: JSON.stringify({ nfts: nft_clean, username: username, userId: userId }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Error updating nfts for user");
        }

    } catch (e) {
        console.error("Erreur :", e);
        return null;
    }

    return nft_clean

}