from . models import *
import datetime
from django.db.models import Sum
import pandas as pd
import numpy as np

# Function to calculate covariance matrix
def calculate_covariance_matrix(returns):
    covariance_matrix = np.cov(returns, rowvar=False)
    return covariance_matrix

# Function to calculate correlation matrix
def calculate_correlation_matrix(returns):
    correlation_matrix = np.corrcoef(returns, rowvar=False)
    return correlation_matrix

# Function to compute risk of new transaction
def compute_transaction_risk(psn_qtys, covariance_matrix, correlation_matrix):
    weights=[i for i in psn_qtys[:,1]]
    risk_covariance = np.dot(weights, np.dot(covariance_matrix, weights.T))
    risk_correlation = np.dot(weights, np.dot(correlation_matrix, weights.T))
    return risk_covariance, risk_correlation


def compute_risk(request):

    data = Positiontable.objects.filter(user=request.user)
    stk_ids = [entry.stk_id for entry in data]
    psn_qtys = [[entry.stk_id,entry.psn_qty] for entry in data]
    stock_df=pd.read_csv("/Users/prajaktadarade/Documents/Deshaw/Hypothetical Trade Analyzer/hypothetical-trade-analyzer/csv_files/Stock_prices.csv")
    returns=[]
    new_stock_name = request.data['stk_id']
    new_quantity = request.data['quantity']

    for i in psn_qtys:
        if i[0]==new_stock_name:
            i[1]+=new_quantity
            break
    
    for stk_id in stk_ids:
        ret = stock_df.loc[stock_df['stk_id']==stk_id]
        shifted=ret.shift(1)
        lst=(list(ret['Close/Last'])-list(shifted['Close/Last']))/shifted.Close
        returns.append(lst)

    if new_stock_name not in stk_ids:
        ret = stock_df.loc[stock_df['stk_id']==new_stock_name]
        shifted=ret.shift(1)
        lst=(list(ret['Close/Last'])-list(shifted['Close/Last']))/shifted.Close
        returns.append(lst) 
        psn_qtys.append([new_stock_name,new_quantity])

    covariance_matrix = calculate_covariance_matrix(returns.numpy())
    correlation_matrix = calculate_correlation_matrix(returns.numpy())



    risk_covariance, risk_correlation = compute_transaction_risk(psn_qtys, covariance_matrix, correlation_matrix)
    print("Risk using Covariance Matrix:", risk_covariance)
    print("Risk using Correlation Matrix:", risk_correlation)


def compute_pnl(user, stk_id, qty, cur_stock_price):
    psn_obj=(Positiontable.objects.filter(user=user, stk_id=stk_id)[0])['pv']
    last_pv=(psn_obj[0])['pv']
    pv=last_pv+cur_stock_price*qty
    overall_qty=psn_obj.aggregate(Sum('psn_qty'))
    weighed_price=pv/overall_qty
    pnl=(cur_stock_price-weighed_price)*overall_qty
    return pv, weighed_price, pnl