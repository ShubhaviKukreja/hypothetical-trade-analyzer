from django.db import models

# i've created a rough model for now. we'll change feilds as and when required.
from django.contrib.auth.models import AbstractUser
class Users(AbstractUser):
  username = models.CharField(max_length=255,unique=True)
  password = models.CharField(max_length=500)
  email = models.CharField(max_length=50)
  balance = models.IntegerField()

#list of all stocks 
class AvailableStocks(models.Model):
  company_name=models.CharField(max_length=255)
  current_value=models.IntegerField()

#list of a stocks brought by users
class Stocks_User(models.Model):
  user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="user_stock",null=True)
  stock = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="stock",null=True)
  current_value=models.IntegerField()
  quantity=models.IntegerField()
  profit_till_date=models.IntegerField()
  date_of_purcahse=models.IntegerField(default=0)

class Transactiontable(models.Model):
  user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="user_transtable",null=True)
  stock = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="stock_transtable",null=True)
  quantity=models.IntegerField()
  price=models.IntegerField()
  date=models.DateField()
  market_value=models.IntegerField()
  transaction_id = models.AutoField(primary_key=True)
  transaction_type = models.CharField(max_length=255) # buy or sell

  
class Positiontable(models.Model):
  user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="user_postable",null=True)
  stock = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="stock_postable",null=True)
  quantity=models.IntegerField()
  last_price=models.IntegerField()
  weighed_price=models.IntegerField()
  date=models.DateField()
  position_id = models.AutoField(primary_key=True)
  position_type = models.CharField(max_length=255) # buy or sell

class Pnltable(models.Model):
  pnl_id = models.AutoField(primary_key=True)
  user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="user_pnl",null=True)
  stock = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="stock_pnl",null=True)
  pnl=models.IntegerField()
  date=models.DateField()
  


  

