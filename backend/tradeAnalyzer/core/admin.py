from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Users)
admin.site.register(Stocks)
admin.site.register(Stock_prices)
admin.site.register(Transactiontable)
admin.site.register(Positiontable)
admin.site.register(Pnltable)
admin.site.register(User)
