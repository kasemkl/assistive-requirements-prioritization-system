from django.contrib import admin
from .models import Account , Project , ProjectCategory , Requirements

admin.site.register(Account)
admin.site.register(Project)
admin.site.register(ProjectCategory)
admin.site.register(Requirements)
