from ressources import * 
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_update(self):
        # # SERVERLESS #1 : Done Daily!
        # # Get Data from opensea and update main table
        try:
            for i, (address_raw, collectionName) in enumerate(dict.items()):
                address = address_raw[1:]
                last_unix = getLastUnix(address)
                data = getCollectionDataSince(address_raw, last_unix)
                sales_df = pd.DataFrame(data)
                sales_df['timestamp_unix'] = sales_df['timestamp_raw'].apply(lambda x: int(time.mktime(x.timetuple())))
                print(sales_df.to_string())
                insertpostgresql(address, sales_df)
        except Exception as e:
            print(e)

    def do_views(self):
        # SERVERLESS #2 : Done Daily
        # Parse data for views and add to DB
        for i, (address_raw, collectionName) in enumerate(dict.items()):
            collection = address_raw[1:]
            df = getACollection(collection)
            day = getPastSales('day', df)
            week = getPastSales('week', df)
            month = getPastSales('month', df)
            threemonth = getPastSales('3month', df)
            year = getPastSales('year', df)
            alltime = sampleyear(df)
            month = samplemonths(month)
            threemonth = sample3months(threemonth)
            year = sampleyear(year)
            insertpostgresql(collection+ '_day', day)
            insertpostgresql(collection + '_week', week)
            insertpostgresql_averages(collection+'_month', month)
            insertpostgresql_averages(collection + '_3month', threemonth)
            insertpostgresql_averages(collection + '_year', year)
            insertpostgresql_averages(collection + '_alltime', alltime)

    def do_differentials(self):
        #Update each differentials for each view for each collection
        #SERVERLESS #3 : Done Daily!
        for i, (address_raw, collectionName) in enumerate(dict.items()):
            collection = address_raw[1:]
            getAndAddDifferentials(collection)