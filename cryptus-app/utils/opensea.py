from helpers import parse_sale_data
import psycopg2
from pymongo import MongoClient
import requests
import pandas as pd
import time

# Top 10 NFT projects with contract address
dict = {
    "boredapeyachtclub": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "cryptopunks": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    "decentraland": '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
    "mutantapeyachtclub": '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    "sandbox": '0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a',
    "rarible": '0xd07dc4262bcdbf85190c01c996b4c06a461d2430',
    "clonex": '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
    "curiocardswrapper": '0x73da73ef3a6982109c4d5bdb0db9dd3e3783f313',
    "meebits": '0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7',
    "coolcatsnft": '0x1a92f7381b9f03921564a437210bb9396471050c'
}


def insertpostgresql(collectionname, data_collection):
    global connection, cursor
    print("Inserting into Database...")
    try:
        connection = psycopg2.connect(user="qfmbqmtlqxivla",
                                      password="f38c3b193a2d4697d112b4b3e272c484236217c93dc0d65517ac566584fb58cd",
                                      host="ec2-3-215-57-87.compute-1.amazonaws.com",
                                      port="5432",
                                      database="d7i4a0k0e2jgts")
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO marketsales.""" + collectionname + """ (tokenid, timestamp_raw, total_price, payment_token, usd_price, transaction_hash) VALUES (%s,%s,%s,%s,%s,%s) ON CONFLICT (transaction_hash) DO NOTHING"""
        for l in data_collection.to_dict('records'):
            record_to_insert = (l['tokenid'], l['timestamp_raw'], l['total_price'], l['payment_token'], l['usd_price'],
                                l['transaction_hash'])
            cursor.execute(postgres_insert_query, record_to_insert)

        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into " + collectionname + " table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into " + collectionname + " table", error)

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


# MONGODB
def addCollectionDataToDb(name, data):
    client = MongoClient(
        'mongodb+srv://publicwalletadmin:GbTQpZGWOUHZP9jC@publicwallet.qyuie.mongodb.net/DataNFT?retryWrites=true&w=majority')
    collection = client.NFT.get_collection(name)
    # collection.insert_many(data.to_dict('records')) ## Can't upsert , filter these
    for i, row in data.iterrows():
        unique_id = i
        txHash = row['transaction_hash']
        print(unique_id, txHash, data.to_dict('records')[unique_id])
        collection.update_one(
            {'transaction_hash': txHash}, {"$set": data.to_dict('records')[unique_id]},
            upsert=True,
            array_filters=None
        )


def getCollectionData(address, sales_collection, last_unix):
    print("Getting Opensea data on collection : ", address, ' ...')
    url = "https://api.opensea.io/api/v1/events"
    # Query from opensea API occured_before the last added timestamp
    for i in range(0, 35):
        print("Getting range of sales ", i)
        if last_unix is None:
            print('Last unisx is None, FIRST PASS...')
            querystring = {"asset_contract_address": address,
                           "event_type": "successful",
                           "only_opensea": "true",
                           "offset": i * 300,
                           "limit": "300"}
        else:
            print('Last unisx is None, SECOND PASS... with query before unix :', str(last_unix))
            querystring = {"asset_contract_address": address,
                           "event_type": "successful",
                           "only_opensea": "true",
                           "offset": i * 300,
                           "limit": "300",
                           "occurred_before" : str(last_unix)}

        headers = {"Accept": "application/json", "X-API-KEY": "fa7be7363a434196887472587f496844"}
        response = requests.request("GET", url, headers=headers, params=querystring)
        if response.status_code != 200:
            print('API error # ', response.json(), response.status_code)
            break
        # Getting sales data
        sales = response.json()['asset_events']
        if not sales:
            break
        # Parsing sales data
        parsed_sales = [parse_sale_data(sale) for sale in sales]
        # storing parsed data into list/df
        if parsed_sales is not None:
            sales_collection.extend(parsed_sales)
    print('\nDone!')
    return sales_collection


## to return the selected timeframe (can also be done directly with mongoDB
def getPastSales(pastx, dataframe):
    global selected
    current_unix = int(time.time())

    if pastx == 'day':
        print('getting past day data...')
        pastSeconds = current_unix - (3600 * 24 * 1)
        selected = dataframe.loc[dataframe['timestamp_unix'] > pastSeconds]
    elif pastx == 'week':
        print('getting past week data...')
        pastSeconds = current_unix - (3600 * 24 * 7)
        selected = dataframe.loc[dataframe['timestamp_unix'] > pastSeconds]
    elif pastx == 'month':
        print('getting past month data...')
        pastSeconds = current_unix - (3600 * 24 * 30)
        selected = dataframe.loc[dataframe['timestamp_unix'] > pastSeconds]
    elif pastx == 'year':
        print('getting past year data...')
        pastSeconds = current_unix - (3600 * 24 * 365)
        selected = dataframe.loc[dataframe['timestamp_unix'] > pastSeconds]
    else:
        print('Wrong slice date format... try : day, week, month or year')
        return None
    return selected


def getIndicator(df):
    mean = round(df['total_price'].mean(), 2)
    volume = df['total_price'].sum()
    n_sales = len(df['total_price'])
    return [mean, volume, n_sales]


if __name__ == '__main__':
    collectionname = 'boredapeyachtclub'
    last_unix = None
    data = []
    contract_address = dict[collectionname]
    data = getCollectionData(contract_address, data, last_unix)
    sales_df = pd.DataFrame(data)
    df = sales_df
    df['timestamp_unix'] = df['timestamp_raw'].apply(lambda x: int(time.mktime(x.timetuple())))
    last_unix = df['timestamp_unix'].iloc[-1]
    print(df.to_string())
    # Second pass
    data = getCollectionData(contract_address, data, last_unix)
    sales_df = pd.DataFrame(data)
    df = sales_df
    df['timestamp_unix'] = df['timestamp_raw'].apply(lambda x: int(time.mktime(x.timetuple())))
    insertpostgresql(collectionname, df)
    # selected_data = getPastSales('week', data)
    # mean, volume, n_sales = getIndicator(data)

