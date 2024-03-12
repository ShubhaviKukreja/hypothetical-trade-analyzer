from django.shortcuts import render
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from . serializers import *
from . utils import *

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
    pnl=compute_pnl(data['stk_id'],data['quantity'],current_positions)
    return Response({"risk":risk,"pnl":pnl})

@api_view(['POST'])
def addStock(request):
    print(request.data)
    stockdata = StocksSerializer(data=request.data, many=True)
    if stockdata.is_valid():
        stockdata.save()
        return Response("stock data added successfully")


@api_view(['GET'])
def getCurrentPosition(request,stock_name):
    stock=Stocks.objects.get(stk_name=stock_name)
    data = Positiontable.objects.filter(user=request.user,stk_id=stock)
    position = PositiontableSerializer(data,many=True)
    return Response(position.data)







