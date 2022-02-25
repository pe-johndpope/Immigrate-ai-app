from actions import helpers


class SaskatchewanEligibilty:
    def sk_express_entry(self, tracker):
        return (
            helpers.language_test(tracker, 4)
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("work_experience_global") >= 1
        )

    def sk_employment(self, tracker):
        return (
            helpers.language_test(tracker, 4)
            and tracker.slots.get("work_experience_global") >= 1
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("job_offer")
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    def sk_indemand_occupation(self, tracker):
        return (
            helpers.language_test(tracker, 4)
            and tracker.slots.get("work_experience_global") >= 1
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    def sk_work_permit(self, tracker):
        # 6 month SK work experience
        return helpers.education(
            tracker
        ) >= helpers.EducationLevels.SECONDARY and tracker.slots.get("work_permit")

    def sk_health_professional(self, tracker):
        return tracker.slots.get("health_professional") and tracker.slots.get(
            "job_offer"
        )

    def sk_hospitality(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def sk_truck_driver(self, tracker):
        return helpers.language_test(tracker, 4) and tracker.slots.get("job_offer")

    def sk_students(self, tracker):
        return (
            helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("job_offer")
            and tracker.slots.get("work_permit")
        )

    def sk_entrepreneur(self, tracker):
        return (
            tracker.slots.get("net_worth") >= 500000
            and tracker.slots.get("work_experience_global") >= 3
        )

    def sk_farm_owner(self, tracker):
        return (
            tracker.slots.get("net_worth") >= 500000
            or (
                tracker.slots.get("net_worth") >= 300000
                and self.calculate_age(tracker) <= 40
            )
            and tracker.slots.get("farmer")
        )

    def sk_eligibility(self, tracker):
        eligibility = []
        if self.sk_express_entry(tracker):
            eligibility.append("Saskatchewan Express Entry")
        if self.sk_employment(tracker):
            eligibility.append("Saskatchewan Employment Offer")
        if self.sk_indemand_occupation(tracker):
            eligibility.append("Saskatchewan In-Demand Occupation")
        if self.sk_work_permit(tracker):
            eligibility.append("Saskatchewan Existing Work Permit")
        if self.sk_health_professional(tracker):
            eligibility.append("Saskatchewan Health Professionals")
        if self.sk_hospitality(tracker):
            eligibility.append("Saskatchewan Hospitality Sector Project")
        if self.sk_truck_driver(tracker):
            eligibility.append("Saskatchewan Long-Haul Truck Driver Project")
        if self.sk_students(tracker):
            eligibility.append("Saskatchewan Students")
        if self.sk_entrepreneur(tracker):
            eligibility.append("Saskatchewan Entrepreneur")
        if self.sk_farm_owner(tracker):
            eligibility.append("Saskatchewan Farm Owners and Operators")
        return eligibility
