export const FetchNfts = async (owner) => {
    const url =
        "https://api.opensea.io/api/v1/assets?owner=" + owner + "&order_direction=asc&offset=0&limit=50";

    const options = { method: "GET" };
    console.log("tryna do something here", url, options);

    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log("results=", data);

        // const pokemon = results.map((pokeman, index) => {
        //   const paddedId = ("00" + (index + 1)).slice(-3);

        //   const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        //   return { ...pokeman, image };
        // });
        return {
            props: { data },
        };
    } catch (err) {
        console.error(err);
    }
}