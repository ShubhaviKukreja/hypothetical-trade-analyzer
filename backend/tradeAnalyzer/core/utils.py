from . models import *
import datetime
from django.db.models import Sum
import pandas as pd
import numpy as np

# Function to calculate covariance matrix
def calculate_covariance_matrix(returns):
    covariance_matrix = np.cov(returns)
    return covariance_matrix

# Function to calculate correlation matrix
def calculate_correlation_matrix(returns):
    correlation_matrix = np.corrcoef(returns)
    return correlation_matrix

# Function to compute risk of new transaction
def compute_transaction_risk(psn_qtys, covariance_matrix, correlation_matrix):
    weights = [row[1] for row in psn_qtys]
    sum_weights=sum(weights)
    weights=[i/sum_weights for i in weights] # Normalize the weight
    weights=np.array(weights,dtype=float)
    weights = weights.reshape(1, -1)
    variance_covariance = np.dot(weights, np.dot(covariance_matrix, weights.T))
    std_dev_covariance=np.sqrt(variance_covariance)
    variance_correlation = np.dot(weights, np.dot(correlation_matrix, weights.T))
    std_dev_correlation=np.sqrt(variance_correlation)
    return variance_covariance, variance_correlation, std_dev_covariance, std_dev_correlation


def compute_risk(request):
    data = Positiontable.objects.filter(user=request.user) #users position
    stk_ids = [entry.stk_id.stk_id for entry in data] #stocks in users position
    psn_qtys = [[entry.stk_id.stk_id, entry.psn_qty] for entry in data] #quantity of stocks in users position
    stock_df=pd.read_csv("/Users/prajaktadarade/Documents/Deshaw/Hypothetical Trade Analyzer/hypothetical-trade-analyzer/csv_files/Stock_prices.csv")
    returns=[] 
    new_stock_name = request.data['stk_id'] #input stock 
    new_quantity = request.data['quantity'] #input quantity

    for i in psn_qtys:
        if i[0]==new_stock_name:
            i[1]+=float(new_quantity) #update the quantity of stock if it already exists in the position
            break
    
    for stk_id in stk_ids:
        ret = stock_df.loc[stock_df['stk_id']==stk_id][:5] #get the last 5 days stock prices
        shifted=ret.shift(1) #shift the stock prices by 1 day
        shifted = shifted.interpolate(method='linear', axis=0, limit_direction='forward')
        #get percentage change in prices of this stock for last 5 days
        l1=list(ret['Close/Last'])
        l2=list(shifted['Close/Last'])
        if(len(l2)!=1):
            l2[0]=l2[1]
        else:
            l2[0]=0
        lst = [float(float(ret_val.replace('$', '')) - float(shifted_val.replace('$', ''))) for ret_val, shifted_val in zip(l1, l2)]
        returns.append(lst)

    if new_stock_name not in stk_ids:
        ret = stock_df.loc[stock_df['stk_id']==new_stock_name][:5]
        shifted=ret.shift(1)
        l1=list(ret['Close/Last'])
        l2=list(shifted['Close/Last'])
        shifted = shifted.interpolate(method='linear', axis=0, limit_direction='forward')
        if(len(l2)!=1):
            l2[0]=l2[1]
        else:
            l2[0]=0
        lst = [float(float(ret_val.replace('$', '')) - float(shifted_val.replace('$', ''))) for ret_val, shifted_val in zip(l1, l2)]        
        returns.append(lst) 
        psn_qtys.append([new_stock_name,new_quantity])

    covariance_matrix = calculate_covariance_matrix(np.array(returns)) #get covariance matrix 
    correlation_matrix = calculate_correlation_matrix(np.array(returns)) #get correlation matrix


    variance_covariance, variance_correlation, std_dev_covariance, std_dev_correlation = compute_transaction_risk(psn_qtys, covariance_matrix, correlation_matrix)

    return variance_covariance, variance_correlation, std_dev_covariance, std_dev_correlation


def compute_pnl(user, stk_id, qty, cur_stock_price):

    psn_obj=(Positiontable.objects.filter(user=user, stk_id=stk_id)[0])
    print(psn_obj)
    last_pv=(psn_obj).pv
    pv=int(last_pv) + int(cur_stock_price) * int(qty)
    overall_qty=(psn_obj).psn_qty
    weighed_price=pv/overall_qty
    pnl=(cur_stock_price-weighed_price)*overall_qty
    return pv, weighed_price, pnl

def ClosingPrices(request):
    stock_df=pd.read_csv("/Users/prajaktadarade/Documents/Deshaw/Hypothetical Trade Analyzer/hypothetical-trade-analyzer/csv_files/Stock_prices.csv")
    ret = stock_df.loc[stock_df['stk_id']==request.data['stk_id']][:10]
    formatted_prices = []

    for _,price in ret.iterrows():
        formatted_prices.append({'Date': price.Date, 'Close/Last': float(price['Close/Last'].replace('$',''))})  # Adjust this based on your actual data structure

    return formatted_prices

