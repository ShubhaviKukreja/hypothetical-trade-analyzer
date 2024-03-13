from django.shortcuts import render
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from . serializers import *
from . utils import *
import datetime
from django.db.models import Sum

# Create your views here.
@api_view(['GET'])
def getstocklist(request):
    data = Stocks.objects.all()
    stocks = StocksSerializer(data,many=True)
    return Response(stocks.data)

@api_view(['GET'])
def getTransactionHis(request):
    data = Transactiontable.objects.filter(user=request.user)
    transaction = TransactiontableSerializer(data,many=True)
    return Response(transaction.data)

@api_view(['GET'])
def getPositionInfo(request):
    data = Positiontable.objects.filter(user=request.user)
    position = PositiontableSerializer(data,many=True)
    return Response(position.data)


@api_view(['GET'])
def getCurrentPNL(request):
    data = Pnltable.objects.filter(user=request.user)
    pnl = PnltableSerializer(data,many=True)
    return Response(pnl.data)

@api_view(['POST'])
def getRiskandPNL(request):
    data=request.data
    risk=compute_risk(data['stk_id'],data['quantity'])
    current_positions = Positiontable.objects.filter(user=request.user)
    _,_,pnl=compute_pnl(data['stk_id'],data['quantity'],current_positions)
    return Response({"risk":risk,"pnl":pnl})

@api_view(['POST'])
def addStock(request):
    print(request.data)
    stockdata = StocksSerializer(data=request.data, many=True)
    if stockdata.is_valid():
        stockdata.save()
        return Response("stock data added successfully")



@api_view(['POST'])
def buyStock(request):
    # print(request.data)
    stockdata = StocksSerializer(data=request.data, many=True)
    qty=request.qty
    cur_date=datetime.date.today()
    cur_stock_price=(Stock_prices.objects.filter(stk_id=stockdata['stk_id'])[0])['stk_price']
    #adding current transaction to transaction table
    txn_obj=Transactiontable(date=cur_date, stk_id=stockdata['stk_id'], user=request.user, txn_qty=qty, txn_price=cur_stock_price, market_value=qty*cur_stock_price, transaction_type=0) #here 0 denotes that type is buy
    txn_obj.save()
    #adding to position table
    pv, weighed_price, pnl=compute_pnl(request.user, stockdata['stk_id'], qty, cur_stock_price)
    psn_obj=Positiontable(user=request.user,stk_id=stockdata['stk_id'], psn_qty=qty, last_price=cur_stock_price,weighed_price=weighed_price, date=cur_date, pv=pv)
    psn_obj.save()
    #adding into pnl table
    pnl_obj=Pnltable(user=request.user,pnl=pnl, date=cur_date)
    pnl_obj.save()

@api_view(['GET'])
def getCurrentPosition(request,stock_name):
    stock=Stocks.objects.get(stk_name=stock_name)
    data = Positiontable.objects.filter(user=request.user,stk_id=stock)
    position = PositiontableSerializer(data,many=True)
    return Response(position.data)







