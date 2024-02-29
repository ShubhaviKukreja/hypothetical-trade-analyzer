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
    data = AvailableStocks.objects.all()
    stocks = AvailableStocksSerializer(data,many=True)
    return Response(stocks.data)

@api_view(['GET'])
def getCurrentPosition(request,stock_name):
    stock=AvailableStocks.objects.get(company_name=stock_name)
    data = Positiontable.objects.filter(user=request.user,stock=stock)
    position = PositiontableSerializer(data,many=True)
    return Response(position.data)

@api_view(['GET'])
def getRiskOnCurrentPosition(request,stock_name):
    stock=AvailableStocks.objects.get(company_name=stock_name)
    data = Positiontable.objects.filter(username=request.user,stock=stock)
    position = PositiontableSerializer(data,many=True)    
    risk = compute_risk(position.data)
    return Response(risk)

@api_view(['GET'])
def getPNL(request,stock_name):
    stock=AvailableStocks.objects.get(company_name=stock_name)
    data = Pnltable.objects.filter(username=request.user,stock=stock)
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
    pos=Positiontable.objects.get(username=request.user,company_name=request.data['company_name'])
    position = PositiontableSerializer(instance=pos,data=request.data)
    if position.is_valid():
        position.save()
    return Response("Position updated successfully")



