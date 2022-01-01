import React from 'react';
import Fav from '../Fav';
import usePrices from '../usePrices';

export default function PricesInRows(props) {
    const { formatDollar } = usePrices();

    return (
        <div className="row mt-3 table-responsive">
            <table className="table table-responsive table-dark table-striped">
                <thead className="thead-dark">
                    <tr style={{ height: "55px" }}>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">ath</th>
                        <th scope="col">24h%</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Circulating Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.coins.map(coin => (

                            <tr style={{ height: "55px" }} key={coin.id}>
                                <td style={{ whiteSpace: "nowrap" }}>
                                    <div className="mx-2"><Fav id={coin.id} tokens={props.favouriteTokens} /></div>
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}>{coin.market_cap_rank}</td>
                                <th><img alt="CoinLogo" src={coin.image} style={{ width: "27px" }} className="mx-2" />{`${coin.name} (${coin.symbol.toUpperCase()})`}</th>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.current_price, 16)}</td>
                                <td className="text-muted">{formatDollar(coin.ath, 16)}</td>
                                <td className={coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>{coin.price_change_percentage_24h + "%"}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.market_cap, 16)}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.circulating_supply, 16)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}