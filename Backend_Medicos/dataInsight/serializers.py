# location/serializers.py
from rest_framework import serializers
from .models import *


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["address_line", "latitude", "longitude"]


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = ["number"]


class DoctorDetailSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    phone_numbers = PhoneNumberSerializer(many=True, read_only=True)

    class Meta:
        model = Doctors
        fields = [
            "id",
            "name",
            "specialties",
            "consetion",
            "educations",
            "genders",
            "zipcode",
            "addresses",
            "phone_numbers",
        ]


class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = "__all__"
