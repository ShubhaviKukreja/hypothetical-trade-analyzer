from django.db import models

# i've created a rough model for now. we'll change feilds as and when required.

class Users(models.Model):
  username = models.CharField(max_length=255)
  password = models.CharField(max_length=500)
  email = models.CharField(max_length=50)
  balance = models.IntegerField()

#list of all stocks 
class AvailableStocks(models.Model):
  company_name=models.CharField(max_length=255)
  current_value=models.IntegerField()

#list of a stocks brought by users
class Stocks_User(models.Model):
  username = models.CharField(max_length=255)
  company_name=models.CharField(max_length=255)
  current_value=models.IntegerField()
  quantity=models.IntegerField()
  profit_till_date=models.IntegerField()
  date_of_purcahse=models.IntegerField(default=0)
