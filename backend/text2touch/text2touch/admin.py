from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from .models import Prompt, Image


class ImageInline(admin.StackedInline):
    model = Image
    max_num = 0
    extra = 0
    can_delete = False

    fields = (
        'preview',
        # 'data',
    )
    readonly_fields = ('preview',)

    @admin.display(description=_('Preview'))
    def preview(self, image):
        return format_html('<img src="data:image/svg+xml;base64,{}" />', image.data)


@admin.register(Prompt)
class PromptAdmin(admin.ModelAdmin):
    list_display = ('prompt', 'method', 'created', 'user')
    list_filter = ('method',)

    search_fields = ('prompt', 'user__username', 'user__email')

    fields = (
        'user',
        'created',
        'prompt',
        'method',
    )
    readonly_fields = ('user', 'created', 'prompt', 'method')

    inlines = (
        ImageInline,
    )
