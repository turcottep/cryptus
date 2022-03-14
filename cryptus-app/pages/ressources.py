from helpers import parse_sale_data
import psycopg2
import random
from decouple import config
import requests
import pandas as pd
import time
import numpy as np
from datetime import datetime

# "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "boredapeyachtclub",
# Top 10 NFT projects with contract addresses
dict = {
    "0x1a92f7381b9f03921564a437210bb9396471050c": "cool-cats-nft",
    "0x60e4d786628fea6478f785a6d7e704777c86a7c6": "mutantapeyachtclub",
    "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7": "meebits",
    "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e": "doodles",
    "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6": "cryptoadz-by-gremplin",
    "0xbd3531da5cf5857e7cfaa92426877b022e612cf8": "pudgypenguins",
    "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb": "veefriends",
    "0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d": "fluf-world",
    "0xedb61f74b0d09b2558f1eeb79b247c1f363ae452": "guttercatgang",
    "0x123b30e25973fecd8354dd5f41cc45a3065ef88c": "alienfrensnft",
}

dict_test = {
    "0x123b30e25973fecd8354dd5f41cc45a3065ef88c": "alienfrensnft"
}

def parse_sale_data(sale_dict):
    if sale_dict['asset'] is not None:
        tokenid = sale_dict['asset']['token_id']
    elif sale_dict['asset_bundle'] is not None:
        pass

    timestamp = sale_dict['transaction']['timestamp']
    total_price = float(sale_dict['total_price']) / 1000000000000000000
    payment_token = sale_dict['payment_token']['symbol']
    usd_price = float(sale_dict['payment_token']['usd_price'])
    transaction_hash = sale_dict['transaction']['transaction_hash']
    if None not in (timestamp, total_price, payment_token, usd_price, transaction_hash):
        result = {'tokenid': tokenid,
                  'timestamp_raw': datetime.strptime(timestamp, '%Y-%m-%dT%H:%M:%S'),
                  'total_price': round(total_price, 2),
                  'payment_token': payment_token,
                  'usd_price': usd_price,
                  'transaction_hash': transaction_hash}
    return result

def getACollection(contract_address):
    global df
    print("\nGetting table...")
    connection = psycopg2.connect(user=config('USER'),
                                  password=config('PASSWORD'),
                                  host=config('HOST'),
                                  port=config('PORT'),
                                  database=config('DB'))
    cursor = connection.cursor()
    try:
        postgres_index_query = """SELECT * FROM marketsales.""" + contract_address
        df = pd.read_sql_query(postgres_index_query, connection)
        cursor.execute(postgres_index_query)
        connection.commit()
        count = cursor.rowcount
        print(count, "rows got successfully from " + contract_address + " table")
    except Exception as e:
        print(e)
    return df


def _addindexintable(contract_address):
    print("\nAdding Index to table...")
    connection = psycopg2.connect(user=config('USER'),
                                  password=config('PASSWORD'),
                                  host=config('HOST'),
                                  port=config('PORT'),
                                  database=config('DB'))
    cursor = connection.cursor()
    try:
        postgres_index_query = """CREATE UNIQUE INDEX """ + contract_address + """_transaction_hash_idx ON marketsales.""" + contract_address + """ (transaction_hash);"""
        cursor.execute(postgres_index_query)
        connection.commit()
        count = cursor.rowcount
        print(count, "Index added successfully into " + contract_address + " table")
    except Exception as e:
        print(e)
    finally:
        if connection:
            cursor.close()
            connection.close()


def _createtable(contract_address):
    print("\nCreating table...")
    print("contract_ :", contract_address)
    connection = psycopg2.connect(user=config('USER'),
                                  password=config('PASSWORD'),
                                  host=config('HOST'),
                                  port=config('PORT'),
                                  database=config('DB'))
    cursor = connection.cursor()
    try:
        postgres_insert_query = """ CREATE TABLE marketsales.""" + contract_address + """ (tokenid varchar NULL, total_price float8 NULL, timestamp_raw timestamp NULL, payment_token varchar NULL, usd_price float8 NULL, transaction_hash varchar NULL, timestamp_unix bigint NULL);"""
        cursor.execute(postgres_insert_query)
        connection.commit()
        count = cursor.rowcount
        print(count, "New Table inserted successfully into " + contract_address + " table")
    except Exception as e:
        print(e)
    finally:
        if connection:
            cursor.close()
            connection.close()


def _createtableDifferentials(contract_address):
    print("\nCreating table...")
    print("contract_ :", contract_address)
    connection = psycopg2.connect(user=config('USER'),
                                  password=config('PASSWORD'),
                                  host=config('HOST'),
                                  port=config('PORT'),
                                  database=config('DB'))
    cursor = connection.cursor()
    try:
        postgres_insert_query = """ CREATE TABLE marketsales.""" + contract_address + """ (view varchar NULL, differential varchar NULL, percentage varchar NULL);"""
        cursor.execute(postgres_insert_query)
        connection.commit()
        count = cursor.rowcount
        print(count, "New Table inserted successfully into " + contract_address + " table")
    except Exception as e:
        print(e)
    finally:
        if connection:
            cursor.close()
            connection.close()


def _createtable_averages(contract_address):
    print("\nCreating average table...")
    print("contract_ :", contract_address)
    connection = psycopg2.connect(user=config('USER'),
                                  password=config('PASSWORD'),
                                  host=config('HOST'),
                                  port=config('PORT'),
                                  database=config('DB'))
    cursor = connection.cursor()
    try:
        postgres_insert_query = """ CREATE TABLE marketsales.""" + contract_address + """ (timestamp_raw timestamp NULL, average_price varchar NULL, average_usd_price varchar NULL, count varchar NULL, volume_eth varchar NULL);"""
        cursor.execute(postgres_insert_query)
        connection.commit()
        count = cursor.rowcount
        print(count, "New Table inserted successfully into " + contract_address + " table average")
    except Exception as e:
        print(e)
    finally:
        if connection:
            cursor.close()
            connection.close()


def insertpostgresql(collectionname, data_collection):
    try:
        _createtable(collectionname)
        if 'day' in collectionname or 'week' in collectionname:
            print('Deleting day or week...')
            _deletecontentoftable(collectionname)
        _addindexintable(collectionname)
        connection = psycopg2.connect(user=config('USER'),
                                      password=config('PASSWORD'),
                                      host=config('HOST'),
                                      port=config('PORT'),
                                      database=config('DB'))
        cursor = connection.cursor()
        print("Inserting into Database...")
        postgres_insert_query = """ INSERT INTO marketsales.""" + collectionname + """ (tokenid, timestamp_raw, total_price, payment_token, usd_price, transaction_hash, timestamp_unix) VALUES (%s,%s,%s,%s,%s,%s,%s) ON CONFLICT (transaction_hash) DO NOTHING;"""
        for l in data_collection.to_dict('records'):
            record_to_insert = (l['tokenid'], l['timestamp_raw'], l['total_price'], l['payment_token'], l['usd_price'],
                                l['transaction_hash'], l['timestamp_unix'])
            cursor.execute(postgres_insert_query, record_to_insert)

        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into " + collectionname + " table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into " + collectionname + " table, \nerror :", error)

    finally:
        if connection:
            cursor.close()
            connection.close()


def _deletecontentoftable(collectionname):
    try:
        connection = psycopg2.connect(user=config('USER'),
                                      password=config('PASSWORD'),
                                      host=config('HOST'),
                                      port=config('PORT'),
                                      database=config('DB'))
        cursor = connection.cursor()
        print("Deleting table Database...")
        postgres_insert_query = """ DELETE FROM marketsales.""" + collectionname + """ """
        cursor.execute(postgres_insert_query)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record deleted successfully " + collectionname + " table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to delete " + collectionname + " table, \nerror :", error)


def _insertDifferentials(contract_address, data):
    try:
        _createtableDifferentials(contract_address)
        _deletecontentoftable(contract_address)
        connection = psycopg2.connect(user=config('USER'),
                                      password=config('PASSWORD'),
                                      host=config('HOST'),
                                      port=config('PORT'),
                                      database=config('DB'))
        cursor = connection.cursor()
        print("Inserting into Database...")
        postgres_insert_query = """ INSERT INTO marketsales.""" + contract_address + """ (view, differential, percentage) VALUES (%s,%s,%s)"""
        for l in data.to_dict('records'):
            record_to_insert = (l['view'], l['differential'], l['percentage'])
            cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into " + contract_address + " table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into " + contract_address + " table, \nerror :", error)

    finally:
        if connection:
            cursor.close()
            connection.close()


def insertpostgresql_averages(collectionname, data_collection):
    try:
        _createtable_averages(collectionname)
        _deletecontentoftable(collectionname)
        connection = psycopg2.connect(user=config('USER'),
                                      password=config('PASSWORD'),
                                      host=config('HOST'),
                                      port=config('PORT'),
                                      database=config('DB'))
        cursor = connection.cursor()
        print("Inserting into Database...")
        postgres_insert_query = """ INSERT INTO marketsales.""" + collectionname + """ (timestamp_raw, average_price, average_usd_price, count, volume_eth) VALUES (%s,%s,%s,%s,%s)"""
        for l in data_collection.to_dict('records'):
            record_to_insert = (
                l['timestamp_raw'], l['average_price'], l['average_usd_price'], l['count'], l['volume_eth'])
            cursor.execute(postgres_insert_query, record_to_insert)

        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into " + collectionname + " table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into " + collectionname + " table, \nerror :", error)

    finally:
        if connection:
            cursor.close()
            connection.close()


def getCollectionDataSince(address, last_unix):
    print("Getting Opensea last data on collection : ", address, ' ...')
    url = "https://api.opensea.io/api/v1/events"
    sales_collection = []
    next_cursor = 0
    try:
        while next_cursor is not None:
            # for i in range(0, n_pages):
            print("Getting range of sales ", next_cursor)
            if next_cursor is 0:
                querystring = {"asset_contract_address": address,
                               "event_type": "successful",
                               "only_opensea": "true"}
            else:
                querystring = {"asset_contract_address": address,
                               "event_type": "successful",
                               "only_opensea": "true",
                               "cursor": next_cursor}
            headers = {
                'referrer': url, "X-API-KEY": config('KEY')}
            response = requests.request("GET", url, headers=headers, params=querystring)
            if response.status_code != 200:
                print('API error # ', response.json(), response.status_code)
                print('Broke  1')
                break
            # Getting sales data
            next_cursor = response.json()['next']
            sales = response.json()['asset_events']
            if not sales:
                print('Broke  2')
                return None
            # Parsing sales data
            parsed_sales = [parse_sale_data(sale) for sale in sales]
            if parsed_sales is not None:
                sales_df = pd.DataFrame(parsed_sales)
                sales_df['timestamp_unix'] = sales_df['timestamp_raw'].apply(lambda x: int(time.mktime(x.timetuple())))
                sales_collection.extend(parsed_sales)
                print("Last unix :", last_unix)
                print("sales_df .values() : ", sales_df['timestamp_unix'].values)
                if last_unix in sales_df['timestamp_unix'].values:
                    return sales_collection

    except Exception as e:
        print("\nException :")
        print(e)

    print('\nDone!')
    return sales_collection


def getCollectionData(address, sales_collection, last_unix):
    print("Getting Opensea data on collection : ", address, ' ...')
    url = "https://api.opensea.io/api/v1/events"
    try:
        for i in range(0, 50):
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
                               "occurred_before": str(last_unix)}

            headers = {
                'referrer': url, "X-API-KEY": config('KEY')}
            response = requests.request("GET", url, headers=headers, params=querystring)
            if response.status_code != 200:
                print('API error # ', response.json(), response.status_code)
                print('BRoke  1')
                break
            # Getting sales data
            sales = response.json()['asset_events']
            if not sales:
                print('BRoke  2')
                break
            # Parsing sales data
            parsed_sales = [parse_sale_data(sale) for sale in sales]
            # storing parsed data into list/df
            if parsed_sales is not None:
                sales_collection.extend(parsed_sales)
    except Exception as e:
        print("\nException :")
        print(e)

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
        pastSeconds = current_unix - (3600 * 24 * 31)
        selected = dataframe.loc[dataframe['timestamp_unix'] > pastSeconds]
    elif pastx == '3month':
        print('getting past 3month data...')
        pastSeconds = current_unix - (3600 * 24 * 31 * 3)
        selected = dataframe.loc[dataframe['timestamp_unix'] > pastSeconds]
    elif pastx == 'year':
        print('getting past year data...')
        pastSeconds = current_unix - (3600 * 24 * 365)
        selected = dataframe.loc[dataframe['timestamp_unix'] > pastSeconds]
    else:
        print('Wrong slice date format... try : day, week, month or year')
        return None
    return selected


def samplemonths(df):
    count = df.resample('D', on='timestamp_raw', kind='timestamp').count()
    count = count['tokenid']
    test = df.resample('D', on='timestamp_raw', kind='timestamp').mean()
    test = pd.DataFrame(test)
    test.rename(columns={'total_price': 'average_price'}, inplace=True)
    test.rename(columns={'usd_price': 'average_usd_price'}, inplace=True)
    del test["timestamp_unix"]
    test['count'] = count.array
    test['volume_eth'] = round(test['count'] * test['average_price'], 2)
    test['average_price'] = round(test['average_price'], 2)
    test['average_usd_price'] = round(test['average_usd_price'], 2)
    test.reset_index(level=0, inplace=True)
    print('\n Test : \n ', test)
    return test


def sample3months(df):
    count = df.resample('2D', on='timestamp_raw', kind='timestamp').count()
    count = count['tokenid']
    test = df.resample('2D', on='timestamp_raw', kind='timestamp').mean()
    test = pd.DataFrame(test)
    test.rename(columns={'total_price': 'average_price'}, inplace=True)
    test.rename(columns={'usd_price': 'average_usd_price'}, inplace=True)
    del test["timestamp_unix"]
    test['count'] = count.array
    test['volume_eth'] = round(test['count'] * test['average_price'], 2)
    test['average_price'] = round(test['average_price'], 2)
    test['average_usd_price'] = round(test['average_usd_price'], 2)
    test.reset_index(level=0, inplace=True)
    print('\n Test : \n ', test)
    return test


def sampleyear(df):
    count = df.resample('W', on='timestamp_raw', kind='timestamp').count()
    count = count['tokenid']
    test = df.resample('W', on='timestamp_raw', kind='timestamp').mean()
    test = pd.DataFrame(test)
    test.rename(columns={'total_price': 'average_price'}, inplace=True)
    test.rename(columns={'usd_price': 'average_usd_price'}, inplace=True)
    del test["timestamp_unix"]
    test['count'] = count.array
    test['volume_eth'] = round(test['count'] * test['average_price'], 2)
    test['average_price'] = round(test['average_price'], 2)
    test['average_usd_price'] = round(test['average_usd_price'], 2)
    test.reset_index(level=0, inplace=True)
    print('\n Test : \n ', test.head(3))
    return test


# +/- 0.2 Eth/ 5% for each collection view.
def getAndAddDifferentials(contract_address):
    table_name = contract_address + '_differentials'
    print("Getting Data...")
    df_day = getACollection(contract_address + '_day')
    df_week = getACollection(contract_address + '_week')
    df_month = getACollection(contract_address + '_month')
    df_3month = getACollection(contract_address + '_3month')
    df_year = getACollection(contract_address + '_year')
    print("Calculate Differentials...")
    # day
    if not df_day.tail(1).empty:
        diff_day = np.round(df_day.tail(1)['total_price'].item() - df_day.head(1)['total_price'].item(), 2)
        percentage_day = np.round(diff_day / df_day.tail(1)['total_price'].item() * 100, 2)
    else:
        diff_day = 0
        percentage_day = 0
    # week
    diff_week = np.round(df_week.tail(1)['total_price'].item() - df_week.head(1)['total_price'].item(), 2)
    percentage_week = np.round(diff_week / df_week.tail(1)['total_price'].item() * 100, 2)
    # month
    diff_month = np.round(
        float(df_month.tail(1)['average_price'].item()) - float(df_month.head(1)['average_price'].item()), 2)
    percentage_month = np.round(diff_month / float(df_month.tail(1)['average_price'].item()) * 100, 2)
    # 3month
    diff_3month = np.round(
        float(df_3month.tail(1)['average_price'].item()) - float(df_3month.head(1)['average_price'].item()), 2)
    percentage_3month = np.round(diff_3month / float(df_3month.tail(1)['average_price'].item()) * 100, 2)
    # year
    diff_year = np.round(
        float(df_year.tail(1)['average_price'].item()) - float(df_year.head(1)['average_price'].item()), 2)
    percentage_year = np.round(diff_year / float(df_year.tail(1)['average_price'].item()) * 100, 2)
    print("Adding Differential to table...")
    data = {'view': ['day', 'week', 'month', '3month', 'year'],
            'differential': [diff_day, diff_week, diff_month, diff_3month, diff_year],
            'percentage': [percentage_day, percentage_week, percentage_month, percentage_3month, percentage_year]}
    dataframe = pd.DataFrame(data)
    _insertDifferentials(contract_address=table_name, data=dataframe)


def getLastUnix(address_raw):
    data = getACollection(address_raw)
    sales_df = pd.DataFrame(data)
    last_unix = sales_df['timestamp_unix'].sort_values().iloc[-1]
    return last_unix