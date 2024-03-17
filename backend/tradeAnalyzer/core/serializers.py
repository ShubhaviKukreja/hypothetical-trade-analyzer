from rest_framework import serializers

from .models import *

class StocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stocks
        fields = '__all__'

class PositiontableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Positiontable
        fields = '__all__'

class PnltableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pnltable
        fields = '__all__'

class TransactiontableSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Transactiontable
        fields = '__all__'

class Stock_pricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock_prices
        fields = '__all__'

class User_StockSerializer(serializers.ModelSerializer):
    class Meta:
        model=Positiontable
        fields=('stk_id', 'psn_qty')