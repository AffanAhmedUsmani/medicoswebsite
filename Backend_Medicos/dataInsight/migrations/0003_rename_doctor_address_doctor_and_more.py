# Generated by Django 5.0.4 on 2024-05-02 18:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dataInsight', '0002_doctors_address_phonenumber'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='Doctor',
            new_name='doctor',
        ),
        migrations.RenameField(
            model_name='phonenumber',
            old_name='Doctor',
            new_name='doctor',
        ),
    ]