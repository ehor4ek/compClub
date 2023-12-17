from django.db import models

# Create your models here.

class Client(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    login = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

class Service(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=255)
    description = models.TextField(max_length=255)

class Club(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=255)
    address = models.TextField(max_length=255)
    phone = models.CharField(max_length=20)
    
class Device(models.Model):
    id = models.AutoField(primary_key=True)
    id_club = models.ForeignKey(Club, to_field="id", 
                              on_delete=models.SET_NULL, null=True)
    name = models.TextField(max_length=255)
    description = models.TextField(max_length=255)
    
class Price(models.Model):
    id = models.AutoField(primary_key=True)
    id_device = models.ForeignKey(Device, to_field="id", 
                                  on_delete=models.SET_NULL, null=True)
    id_service = models.ForeignKey(Service, to_field="id", 
                                  on_delete=models.SET_NULL, null=True)
    price = models.IntegerField()
    
class Order(models.Model):
    id = models.AutoField(primary_key=True)
    id_client = models.ForeignKey(Client, to_field="id", 
                                  on_delete=models.SET_NULL, null=True)
    id_price = models.ForeignKey(Price, to_field="id", 
                                  on_delete=models.SET_NULL, null=True)
    time1 = models.DateTimeField()
    time2 = models.DateTimeField()

# class Auto(models.Model):
#     id = models.AutoField(primary_key=True)
#     tarif = models.ForeignKey(Tariff, to_field="id", 
#                               on_delete=models.SET_NULL, null=True)
#     place = models.ForeignKey(ParkingPlace, to_field="id", 
#                                on_delete=models.SET_NULL, null=True, unique=True)
#     owner = models.ForeignKey(Client, to_field="id", on_delete=models.CASCADE)
    
#     model = models.CharField(max_length=255)


# class Employee(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=255)
#     parking=  models.ForeignKey(Parking, to_field="id", 
#                                 on_delete=models.SET_NULL, null=True)
#     login = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     type = models.CharField(max_length=20)