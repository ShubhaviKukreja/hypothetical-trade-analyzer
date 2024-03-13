from django.db import models

# i've created a rough model for now. we'll change feilds as and when required.
from django.contrib.auth.models import AbstractUser
class Users(AbstractUser):
  user_name = models.CharField(max_length=255,unique=True)
  user_pwd = models.CharField(max_length=500)
  user_email = models.CharField(max_length=50)
 
#list of a stocks
class Stocks(models.Model):
  stk_id=models.IntegerField()
  stk_name=models.CharField(max_length=50)

class Stock_prices(models.Model):
  stk_id=models.ForeignKey(Stocks, on_delete=models.CASCADE,related_name="stock_priceable",null=True)
  stk_price=models.IntegerField()  #average of high , low and close
  date_of_pricing=models.DateTimeField(default=0)

class Transactiontable(models.Model):
  txn_id = models.AutoField(primary_key=True)
  date=models.DateField()
  stk_id = models.ForeignKey(Stocks, on_delete=models.CASCADE,related_name="stock_transtable",null=True)
  user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="user_transtable",null=True)
  txn_qty=models.IntegerField()
  txn_price=models.IntegerField()
  market_value=models.IntegerField()
  transaction_type = models.CharField(max_length=255) # buy(0) or sell(1)

  
class Positiontable(models.Model):
  position_id = models.AutoField(primary_key=True)
  user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="user_postable",null=True)
  stk_id = models.ForeignKey(Stocks, on_delete=models.CASCADE,related_name="stock_postable",null=True)
  psn_qty=models.IntegerField()
  weighed_price=models.IntegerField()
  date=models.DateField()
  pv=models.IntegerField(default=0)

class Pnltable(models.Model):
  user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="user_pnl",null=True)
  pnl=models.IntegerField()
  date=models.DateField()
  stk_id=models.IntegerField()


  

