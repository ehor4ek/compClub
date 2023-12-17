from django.contrib import admin
import compClub.models as mod
# Register your models here.

admin.site.register(mod.Client)
admin.site.register(mod.Service)
admin.site.register(mod.Club)
admin.site.register(mod.Device)
admin.site.register(mod.Price)
admin.site.register(mod.Order)