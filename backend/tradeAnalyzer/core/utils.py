from . models import *
import datetime
from django.db.models import Sum


def compute_risk():
    pass


def compute_pnl(user, stk_id, qty, cur_stock_price):
    psn_obj=(Positiontable.objects.filter(user=user, stk_id=stk_id)[0])['pv']
    last_pv=(psn_obj[0])['pv']
    pv=last_pv+cur_stock_price*qty
    overall_qty=psn_obj.aggregate(Sum('psn_qty'))
    weighed_price=pv/overall_qty
    pnl=(cur_stock_price-weighed_price)*overall_qty
    return pv, weighed_price, pnl