from rest_framework import serializers

from .models import *

class AvailableStocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableStocks
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
