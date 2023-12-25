from django.db import models

# Create your models here.

class Client(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name='ФИО')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    login = models.CharField(max_length=255, unique=True, verbose_name='Логин')
    password = models.CharField(max_length=255)
    def __str__(self):
        return self.login + ':' + self.name
    
    class Meta:
        verbose_name = 'Клиенты'
        verbose_name_plural = 'Каталог клиентов'
        ordering = ['id']

class Service(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=255, verbose_name='Название')
    description = models.TextField(max_length=255, verbose_name='Описание')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Услуги'
        verbose_name_plural = 'Каталог услуг'
        ordering = ['name']

class Club(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=255, verbose_name='Название')
    address = models.TextField(max_length=255, verbose_name='Адрес')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    def __str__(self):
        return self.name + ':' + self.address
    
    class Meta:
        verbose_name = 'Клубы'
        verbose_name_plural = 'Каталог клубов'
        ordering = ['name', 'address']
    
class Device(models.Model):
    id = models.AutoField(primary_key=True)
    id_club = models.ForeignKey(Club, to_field="id", 
                              on_delete=models.SET_NULL, null=True, verbose_name='Клуб')
    name = models.TextField(max_length=255, verbose_name='Название')
    description = models.TextField(max_length=255, verbose_name='Описание')
    def __str__(self):
        return self.name + ' ' + str(self.id_club)
    
    class Meta:
        verbose_name = 'Устройства'
        verbose_name_plural = 'Каталог устройств'
        ordering = ['name', 'description']
    
class Price(models.Model):
    id = models.AutoField(primary_key=True)
    id_device = models.ForeignKey(Device, to_field="id", 
                                  on_delete=models.SET_NULL, null=True, verbose_name='Устройство')
    id_service = models.ForeignKey(Service, to_field="id", 
                                  on_delete=models.SET_NULL, null=True, verbose_name='Услуга')
    price = models.IntegerField(verbose_name='Цена')
    def __str__(self):
        return str(self.price) + 'руб.; ' + str(self.id_device) + '; ' + str(self.id_service)
    
    class Meta:
        verbose_name = 'Цены'
        verbose_name_plural = 'Прейскурант цен'
        ordering = ['price']
    
class Order(models.Model):
    id = models.AutoField(primary_key=True)
    id_client = models.ForeignKey(Client, to_field="id", 
                                  on_delete=models.SET_NULL, null=True, verbose_name='Клиент')
    id_price = models.ForeignKey(Price, to_field="id", 
                                  on_delete=models.SET_NULL, null=True, verbose_name='Цена')
    def __str__(self):
        return "Заказ №" + str(self.id)
    
    class Meta:
        verbose_name = 'Заказы'
        verbose_name_plural = 'Журнал заказов'
        ordering = ['id']