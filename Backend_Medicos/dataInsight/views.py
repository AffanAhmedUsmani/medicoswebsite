from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from .distance import *
from django.http import JsonResponse
from django.views.generic import View
from collections import defaultdict


class NearbyDoctorsAPI(APIView):
    def get(self, request, zipcode, format=None):
        central_lat, central_lon = get_lat_lon_from_zip(zipcode)

        doctors_dict = defaultdict(
            lambda: {
                "id": None,
                "name": "",
                "specialties": "",
                "locations": [],
                "phone_numbers": set(),
            }
        )

        for doctor in Doctors.objects.all():
            doctor_info = doctors_dict[doctor.id]
            doctor_info["id"] = doctor.id
            doctor_info["name"] = doctor.name
            doctor_info["specialties"] = doctor.specialties

            addresses = doctor.addresses.all()
            for address in addresses:
                if address.latitude and address.longitude:
                    distance = haversine(
                        central_lon, central_lat, address.longitude, address.latitude
                    )
                    if distance <= 100:
                        location = {
                            "latitude": address.latitude,
                            "longitude": address.longitude,
                        }
                        if location not in doctor_info["locations"]:
                            doctor_info["locations"].append(location)

            phone_numbers = [
                phone.number
                for phone in doctor.phone_numbers.all()
                if phone.number and phone.number != "null"
            ]
            doctor_info["phone_numbers"].update(phone_numbers)

        # Convert sets to lists and prepare the final list of doctors
        nearby_doctors = []
        for doctor_id, data in doctors_dict.items():
            data["phone_numbers"] = list(data["phone_numbers"])  # Convert set to list
            nearby_doctors.append(data)

        return Response(nearby_doctors)


class DoctorDetailView(APIView):
    def get(self, request, doctor_id, format=None):
        try:
            doctor = Doctors.objects.get(pk=doctor_id)
        except Doctors.DoesNotExist:
            return Response(
                {"message": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = DoctorDetailSerializer(doctor)
        return Response(serializer.data)


class NearbyHospitalsAPI(APIView):
    def get(self, request, zipcode, format=None):
        central_lat, central_lon = get_lat_lon_from_zip(zipcode)
        nearby_hospitals = []
        for hospital in Hospital.objects.all():
            if hospital.latitude and hospital.longitude:
                distance = haversine(
                    central_lon, central_lat, hospital.longitude, hospital.latitude
                )
                if distance <= 100:
                    nearby_hospitals.append(
                        {
                            "id": hospital.id,
                            "name": hospital.name,
                            "address": hospital.address,
                            "latitude": hospital.latitude,
                            "longitude": hospital.longitude,
                            "hospital_types": hospital.hospital_types,
                            "provider_number": hospital.provider_number,
                        }
                    )

        return Response(nearby_hospitals)


class HospitalDetailView(View):
    def get(self, request, hospital_id):
        try:
            hospital = Hospital.objects.get(id=hospital_id)
            serializer = HospitalSerializer(hospital)
            return JsonResponse(serializer.data)
        except Hospital.DoesNotExist:
            return JsonResponse({"error": "Hospital not found"}, status=404)


class NearbyPlansAPI(APIView):
    def get(self, request, zipcode, plan_type, format=None):
        central_lat, central_lon = get_lat_lon_from_zip(zipcode)
        nearby_plans = []
        for plan in PlanOverview.objects.filter(plan_type=plan_type):
            addresses = PlanAddresses.objects.filter(plan=plan)
            for address in addresses:
                if address.latitude and address.longitude:
                    distance = haversine(
                        central_lon, central_lat, address.longitude, address.latitude
                    )

                    if distance <= 100:
                        # Fetch benefits and costs related to the plan
                        benefits_costs = BenefitsAndCosts.objects.filter(plan=plan)

                        # Construct response data
                        plan_data = {
                            "id": plan.id,
                            "plan_name": plan.plan_name,
                            "plan_type": plan.plan_type,
                            "latitude": address.latitude,
                            "longitude": address.longitude,
                            "benefits_and_costs": [],
                        }

                        # Add benefits and costs data to the response
                        for bc in benefits_costs:
                            plan_data["benefits_and_costs"].append(
                                {
                                    "total_monthly_premiums": bc.total_monthly_premiums,
                                    "health_premiums": bc.health_premiums,
                                    "drug_premiums": bc.drug_premiums,
                                    "standard_part_b_premiums": bc.standard_part_b_premiums,
                                    "part_b_premium_reductions": bc.part_b_premium_reductions,
                                    "health_deductibles": bc.health_deductibles,
                                    "drug_deductibles": bc.drug_deductibles,
                                    "max_pay_for_health_services": bc.max_pay_for_health_services,
                                }
                            )

                        nearby_plans.append(plan_data)

        return Response(nearby_plans)


class LocationList(APIView):
    def get(self, request):
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
