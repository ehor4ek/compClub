from django.contrib import admin
import compClub.models as mod
# Register your models here.

class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'login', 'phone', 'name')
    list_display_links = ('login', 'name')
    search_fields = ('login', 'phone', 'name')
    
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    list_display_links = ('name',)
    search_fields = ('name', 'description')
    
class ClubAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'phone')
    list_display_links = ('name',)
    search_fields = ('name', 'address', 'phone')
    
class DeviceAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_club', 'name', 'description')
    list_display_links = ('name',)
    search_fields = ('name', 'description')
    
class PriceAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_device', 'id_service', 'price')
    list_display_links = ('price',)
    search_fields = ('price',)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_client', 'id_price')
    list_display_links = ('id',)
    search_fields = ('id', 'id_client', 'id_price')
    
admin.site.register(mod.Client, ClientAdmin)
admin.site.register(mod.Service, ServiceAdmin)
admin.site.register(mod.Club, ClubAdmin)
admin.site.register(mod.Device, DeviceAdmin)
admin.site.register(mod.Price, PriceAdmin)
admin.site.register(mod.Order, OrderAdmin)