from django.contrib import admin

from .models import Prompt


@admin.register(Prompt)
class PromptAdmin(admin.ModelAdmin):
    list_display = ('prompt', 'method', 'created', 'user')
    list_filter = ('method',)

    search_fields = ('prompt', 'user__username', 'user__email')

    fieldsets = (
        (
            None,
            {
                'fields': (
                    'user',
                    'created',
                    'prompt',
                    'method',
                ),
            }
        ),
    )
    readonly_fields = ('user', 'created', 'prompt', 'method')
