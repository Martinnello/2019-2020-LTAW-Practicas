# Generated by Django 2.2.10 on 2020-06-02 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PS4_Games_Store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='descripcion',
            field=models.CharField(default='Indica aqui la descripcion', max_length=50),
        ),
        migrations.AddField(
            model_name='producto',
            name='imagen',
            field=models.CharField(default='Indica url de la imagen', max_length=50),
        ),
        migrations.AddField(
            model_name='producto',
            name='path',
            field=models.CharField(default='Indica url del producto', max_length=50),
        ),
        migrations.AlterField(
            model_name='producto',
            name='precio',
            field=models.FloatField(default=50),
        ),
        migrations.AlterField(
            model_name='producto',
            name='stock',
            field=models.IntegerField(default=5),
        ),
    ]
