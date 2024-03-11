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

@api_view(['GET'])
def getRiskOnCurrentPosition(request,stock_name):
    stock=Stocks.objects.get(stk_name=stock_name)
    data = Positiontable.objects.filter(user=request.user,stk_id=stock)
    position = PositiontableSerializer(data,many=True)    
    risk = compute_risk(position.data)
    return Response(risk)

@api_view(['GET'])
def getPNL(request,stock_name):
    stock=Stocks.objects.get(stk_name=stock_name)
    data = Pnltable.objects.filter(user=request.user,stk_id=stock)
    pnl = PnltableSerializer(data,many=True)
    return Response(pnl.data)

@api_view(['POST'])
def addTransaction(request):
    transaction = TransactiontableSerializer(data=request.data)
    if transaction.is_valid():
        transaction.save()
    return Response("Transaction added successfully")

@api_view(['UPDATE'])
def updatePosition(request):
    pos=Positiontable.objects.get(user=request.user,stk_id=request.data['company_name'])
    position = PositiontableSerializer(instance=pos,data=request.data)
    if position.is_valid():
        position.save()
    return Response("Position updated successfully")



