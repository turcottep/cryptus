from datetime import datetime

def parse_sale_data(sale_dict):
    global tokenid, result
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
